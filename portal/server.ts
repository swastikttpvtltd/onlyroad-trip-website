import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import { createHash, createHmac, randomBytes, randomInt } from "node:crypto";
import { refundQuote, type Policy } from "./policy";

type Statement = { bind(...values: unknown[]): Statement; first<T>(): Promise<T | null>; all<T>(): Promise<{ results: T[] }>; run(): Promise<{ meta: { changes: number } }> };
type Database = { prepare(sql: string): Statement; batch(statements: Statement[]): Promise<unknown> };
type Env = { PORTAL_ENABLED?: string; PORTAL_DB?: Database; PORTAL_ORIGIN?: string; PORTAL_OTP_SECRET?: string; PORTAL_EMAIL_API_KEY?: string; PORTAL_EMAIL_FROM?: string; PORTAL_DOCUMENTS?: { get(key: string): Promise<{ body: ReadableStream } | null> } };
type Customer = { id: string; email: string; name: string; phone: string; role: string };
type Booking = { id: string; customer_id: string; total_paise: number; paid_paise: number; supplier_paise: number | null; departure: string; policy_version: string | null; status: string };
class PortalError extends Error { constructor(message: string, public status: number) { super(message); } }
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
const cookieName = "ort_portal_session";
function runtime(): Env {
  try { return getCloudflareContext().env as unknown as Env; } catch { return {}; }
}
function requireDb(env: Env): Database {
  if (env.PORTAL_ENABLED !== "true" || !env.PORTAL_DB || !env.PORTAL_ORIGIN) throw new PortalError("Customer portal is awaiting staging configuration. You can explore the demo.", 503);
  return env.PORTAL_DB;
}
function sameOrigin(request: NextRequest, env: Env) {
  if (!env.PORTAL_ORIGIN || request.headers.get("origin") !== new URL(env.PORTAL_ORIGIN).origin) throw new PortalError("Invalid request origin.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new PortalError("JSON is required.", 415);
}
async function body(request: NextRequest): Promise<Record<string, unknown>> {
  const raw = await request.text();
  if (raw.length > 8192) throw new PortalError("Request is too large.", 413);
  try { const value = JSON.parse(raw); if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(); return value; } catch { throw new PortalError("Invalid request.", 400); }
}
function text(value: unknown, max = 200): string { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
async function customer(request: NextRequest, db: Database): Promise<Customer> {
  const token = request.cookies.get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) throw new PortalError("Please sign in to continue.", 401);
  const user = await db.prepare("SELECT c.id,c.email,c.name,c.phone,c.role FROM portal_sessions s JOIN portal_customers c ON c.id=s.customer_id WHERE s.token_hash=? AND s.expires_at>?").bind(hash(token), Date.now()).first<Customer>();
  if (!user) throw new PortalError("Your session has expired. Please sign in again.", 401);
  return user;
}
async function rateLimit(db: Database, bucket: string, limit: number) {
  const now = Date.now();
  await db.prepare("INSERT INTO portal_rate_limits(bucket,count,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=CASE WHEN expires_at<=? THEN 1 ELSE count+1 END, expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END").bind(bucket, now + 600000, now, now).run();
  const row = await db.prepare("SELECT count FROM portal_rate_limits WHERE bucket=?").bind(bucket).first<{ count: number }>();
  if (!row || row.count > limit) throw new PortalError("Too many attempts. Please try again in 10 minutes.", 429);
}
function audit(db: Database, actor: string, action: string, resource: string) { return db.prepare("INSERT INTO portal_audit(id,actor_id,action,resource_id) VALUES(?,?,?,?)").bind(crypto.randomUUID(), actor, action, resource); }
async function quote(db: Database, booking: Booking, acknowledgedAt: string | null) {
  const payments = await db.prepare("SELECT COALESCE(SUM(amount_paise),0) AS verified_paid FROM portal_payments WHERE booking_id=? AND status='paid' AND verified_at IS NOT NULL").bind(booking.id).first<{ verified_paid: number }>();
  if (!payments || payments.verified_paid !== booking.paid_paise) return { available: false, paidPaise: booking.paid_paise, reason: "Verified payment reconciliation is required before a refund estimate can be shown." };
  const row = booking.policy_version ? await db.prepare("SELECT snapshot_json,approved FROM portal_policies WHERE version=?").bind(booking.policy_version).first<{ snapshot_json: string; approved: number }>() : null;
  let policy: Policy | null = null;
  if (row?.approved === 1) { try { policy = { ...JSON.parse(row.snapshot_json), version: booking.policy_version, approved: true }; } catch { /* fail closed */ } }
  return refundQuote({ policy, totalPaise: booking.total_paise, paidPaise: booking.paid_paise, supplierPaise: booking.supplier_paise, departure: booking.departure, acknowledgedAt });
}
export async function portalHandler(request: NextRequest, path: string[]) {
  try {
    const env = runtime();
    const action = path.join("/");
    if (action === "capabilities" && request.method === "GET") return json({ email: env.PORTAL_ENABLED === "true" && !!env.PORTAL_DB && !!env.PORTAL_ORIGIN && !!env.PORTAL_OTP_SECRET && !!env.PORTAL_EMAIL_API_KEY && !!env.PORTAL_EMAIL_FROM, google: false, mobile: false, demo: true });
    const db = requireDb(env);
    if (request.method !== "GET") sameOrigin(request, env);
    if (action === "auth/email/start" && request.method === "POST") {
      if (!env.PORTAL_OTP_SECRET || env.PORTAL_OTP_SECRET.length < 32 || !env.PORTAL_EMAIL_API_KEY || !env.PORTAL_EMAIL_FROM) throw new PortalError("Email sign-in is not configured yet.", 503);
      const input = await body(request), email = text(input.email, 254).toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new PortalError("Enter a valid email address.", 400);
      await rateLimit(db, `email:${hash(email)}`, 3);
      await rateLimit(db, `ip:${hash(request.headers.get("cf-connecting-ip") || "local")}`, 10);
      const id = crypto.randomUUID(), code = String(randomInt(100000, 1000000));
      const codeHash = createHmac("sha256", env.PORTAL_OTP_SECRET).update(`${id}:${code}`).digest("hex");
      await db.prepare("INSERT INTO portal_challenges(id,email,code_hash,expires_at) VALUES(?,?,?,?)").bind(id, email, codeHash, Date.now() + 300000).run();
      const result = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.PORTAL_EMAIL_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: env.PORTAL_EMAIL_FROM, to: [email], subject: "Your Only Road Trip sign-in code", text: `Your sign-in code is ${code}. It expires in 5 minutes. If you did not request this, ignore this email.` }) });
      if (!result.ok) { await db.prepare("DELETE FROM portal_challenges WHERE id=?").bind(id).run(); throw new PortalError("We couldn’t send your code. Please try later.", 502); }
      return json({ challengeId: id, message: "Check your email for your 6-digit code." });
    }
    if (action === "auth/email/verify" && request.method === "POST") {
      if (!env.PORTAL_OTP_SECRET) throw new PortalError("Sign-in is unavailable.", 503);
      const input = await body(request), id = text(input.challengeId, 80), code = text(input.code, 6);
      await rateLimit(db, `verify:${hash(request.headers.get("cf-connecting-ip") || "local")}`, 20);
      const challenge = await db.prepare("SELECT email,code_hash FROM portal_challenges WHERE id=? AND expires_at>? AND consumed=0 AND attempts<5").bind(id, Date.now()).first<{ email: string; code_hash: string }>();
      const attempt = await db.prepare("UPDATE portal_challenges SET attempts=attempts+1 WHERE id=? AND expires_at>? AND consumed=0 AND attempts<5").bind(id, Date.now()).run();
      const valid = /^[0-9]{6}$/.test(code) && createHmac("sha256", env.PORTAL_OTP_SECRET).update(`${id}:${code}`).digest("hex") === challenge?.code_hash;
      if (!valid || !challenge || attempt.meta.changes !== 1) throw new PortalError("Code is invalid or expired.", 400);
      const consumed = await db.prepare("UPDATE portal_challenges SET consumed=1 WHERE id=? AND consumed=0 AND expires_at>?").bind(id, Date.now()).run();
      if (consumed.meta.changes !== 1) throw new PortalError("Code has already been used.", 400);
      await db.prepare("INSERT INTO portal_customers(id,email) VALUES(?,?) ON CONFLICT(email) DO NOTHING").bind(crypto.randomUUID(), challenge.email).run();
      const user = await db.prepare("SELECT id FROM portal_customers WHERE email=?").bind(challenge.email).first<{ id: string }>();
      if (!user) throw new PortalError("Sign-in failed.", 500);
      const token = randomBytes(32).toString("hex");
      await db.batch([db.prepare("INSERT INTO portal_sessions(token_hash,customer_id,expires_at) VALUES(?,?,?)").bind(hash(token), user.id, Date.now() + 86400000), audit(db, user.id, "login", user.id)]);
      const response = json({ success: true });
      response.cookies.set(cookieName, token, { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 86400 });
      return response;
    }
    const user = await customer(request, db);
    if (action === "auth/logout" && request.method === "POST") {
      await db.prepare("DELETE FROM portal_sessions WHERE token_hash=?").bind(hash(request.cookies.get(cookieName)!.value)).run();
      const response = json({ success: true }); response.cookies.set(cookieName, "", { maxAge: 0, path: "/", httpOnly: true, secure: true, sameSite: "strict" }); return response;
    }
    if (action === "overview" && request.method === "GET") {
      const [bookings, travellers, payments, documents, cancellations] = await Promise.all([
        db.prepare("SELECT * FROM portal_bookings WHERE customer_id=? ORDER BY departure DESC").bind(user.id).all(),
        db.prepare("SELECT id,name,relation FROM portal_travellers WHERE customer_id=?").bind(user.id).all(),
        db.prepare("SELECT p.* FROM portal_payments p JOIN portal_bookings b ON b.id=p.booking_id WHERE b.customer_id=?").bind(user.id).all(),
        db.prepare("SELECT d.id,d.name,d.kind,d.released_at,d.booking_id FROM portal_documents d JOIN portal_bookings b ON b.id=d.booking_id WHERE b.customer_id=?").bind(user.id).all(),
        db.prepare("SELECT id,booking_id,status,requested_at,acknowledged_at,quote_json,review_note FROM portal_cancellations WHERE customer_id=?").bind(user.id).all(),
      ]);
      return json({ customer: user, bookings: bookings.results, travellers: travellers.results, payments: payments.results, documents: documents.results, cancellations: cancellations.results });
    }
    if (action === "profile" && request.method === "POST") {
      const input = await body(request), name = text(input.name, 100), phone = text(input.phone, 20);
      if (!name || (phone && !/^\+?[0-9]{7,15}$/.test(phone))) throw new PortalError("Enter your name and a valid mobile number.", 400);
      await db.batch([db.prepare("UPDATE portal_customers SET name=?,phone=? WHERE id=?").bind(name, phone, user.id), audit(db, user.id, "profile_updated", user.id)]); return json({ success: true });
    }
    if (action === "travellers" && request.method === "POST") {
      const input = await body(request), name = text(input.name, 100), relation = text(input.relation, 40);
      if (!name || !relation) throw new PortalError("Traveller name and relationship are required.", 400);
      const id = crypto.randomUUID();
      await db.batch([db.prepare("INSERT INTO portal_travellers(id,customer_id,name,relation) VALUES(?,?,?,?)").bind(id, user.id, name, relation), audit(db, user.id, "traveller_added", id)]); return json({ id }, 201);
    }
    if (path[0] === "documents" && path.length === 2 && request.method === "GET") {
      const doc = await db.prepare("SELECT d.object_key,d.name,d.content_type FROM portal_documents d JOIN portal_bookings b ON b.id=d.booking_id WHERE d.id=? AND b.customer_id=? AND d.released_at IS NOT NULL").bind(path[1], user.id).first<{ object_key: string; name: string; content_type: string }>();
      if (!doc) throw new PortalError("Document not found or not released.", 404);
      if (!env.PORTAL_DOCUMENTS) throw new PortalError("Document storage is not configured.", 503);
      const object = await env.PORTAL_DOCUMENTS.get(doc.object_key);
      if (!object) throw new PortalError("Document unavailable.", 404);
      return new NextResponse(object.body, { headers: { "Content-Type": "application/octet-stream", "Content-Disposition": `attachment; filename="${doc.name.replace(/[^a-zA-Z0-9._ -]/g, "_")}.pdf"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
    }
    if (path[0] === "bookings" && path[2] === "cancellation" && path.length === 3) {
      const booking = await db.prepare("SELECT * FROM portal_bookings WHERE id=? AND customer_id=?").bind(path[1], user.id).first<Booking>();
      if (!booking) throw new PortalError("Booking not found.", 404);
      if (request.method === "GET") {
        const cancellation = await db.prepare("SELECT acknowledged_at FROM portal_cancellations WHERE booking_id=?").bind(booking.id).first<{ acknowledged_at: string | null }>();
        return json(await quote(db, booking, cancellation?.acknowledged_at ?? null));
      }
      if (request.method === "POST") {
        const input = await body(request), reason = text(input.reason, 1000);
        if (reason.length < 10 || input.confirm !== true) throw new PortalError("Confirm your written request and provide a reason of at least 10 characters.", 400);
        if (booking.status !== "confirmed") throw new PortalError("This booking cannot accept a new cancellation request.", 409);
        const id = crypto.randomUUID();
        const result = await db.prepare("INSERT INTO portal_cancellations(id,booking_id,customer_id,reason) VALUES(?,?,?,?) ON CONFLICT(booking_id) DO NOTHING").bind(id, booking.id, user.id, reason).run();
        if (result.meta.changes !== 1) throw new PortalError("A cancellation request already exists for this booking.", 409);
        await audit(db, user.id, "cancellation_requested", booking.id).run();
        return json({ id, status: "requested", message: "Written request received. Effective cancellation time and estimate are confirmed after acknowledgement by our team." }, 201);
      }
    }
    if (path[0] === "admin") {
      if (user.role !== "admin") throw new PortalError("Admin access required.", 403);
      if (action === "admin/cancellations" && request.method === "GET") return json((await db.prepare("SELECT c.*,b.title FROM portal_cancellations c JOIN portal_bookings b ON b.id=c.booking_id ORDER BY c.requested_at DESC").all()).results);
      if (path[1] === "cancellations" && path.length === 3 && request.method === "POST") {
        const input = await body(request), decision = text(input.decision), note = text(input.note, 1000);
        if (!["acknowledge", "approve", "reject"].includes(decision) || note.length < 10) throw new PortalError("A decision and review note are required.", 400);
        const row = await db.prepare("SELECT * FROM portal_cancellations WHERE id=?").bind(path[2]).first<{ booking_id: string; status: string; acknowledged_at: string | null; customer_id: string }>();
        if (!row || !["requested", "acknowledged"].includes(row.status)) throw new PortalError("Request is no longer pending.", 409);
        if (row.customer_id === user.id) throw new PortalError("You cannot review your own request.", 403);
        const booking = await db.prepare("SELECT * FROM portal_bookings WHERE id=?").bind(row.booking_id).first<Booking>();
        if (!booking) throw new PortalError("Booking not found.", 404);
        const acknowledged = row.acknowledged_at || new Date().toISOString();
        const estimate = await quote(db, booking, acknowledged);
        if (decision === "approve" && (row.status !== "acknowledged" || !estimate.available)) throw new PortalError("Acknowledge the request and resolve policy/payment/supplier verification before approval.", 409);
        const status = decision === "acknowledge" ? "acknowledged" : decision === "approve" ? "approved" : "rejected";
        const update = await db.prepare("UPDATE portal_cancellations SET status=?,acknowledged_at=?,quote_json=?,reviewed_by=?,review_note=?,reviewed_at=? WHERE id=? AND status=?").bind(status, acknowledged, JSON.stringify(estimate), user.id, note, new Date().toISOString(), path[2], row.status).run();
        if (update.meta.changes !== 1) throw new PortalError("Request changed. Refresh before reviewing.", 409);
        await audit(db, user.id, `cancellation_${status}`, path[2]).run();
        return json({ status, estimate, refundExecution: "disabled" });
      }
    }
    throw new PortalError("Portal endpoint not found.", 404);
  } catch (error) {
    if (error instanceof PortalError) return json({ error: error.message }, error.status);
    // No provider responses, tokens or customer details are logged.
    return json({ error: "Customer service is temporarily unavailable. Please try again later." }, 500);
  }
}
