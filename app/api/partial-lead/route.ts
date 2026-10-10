import { getCloudflareContext } from "@opennextjs/cloudflare";
import { normalizeLeadContact } from "@/lib/lead-contact";

export const runtime = "nodejs";
type DB = { prepare(sql: string): { bind(...values: unknown[]): { run(): Promise<{ success: boolean }> } } };
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const initialized = new WeakMap<DB, Promise<void>>();

async function ensureTable(db: DB) {
  let ready = initialized.get(db);
  if (!ready) {
    ready = (async () => {
      const result = await db.prepare(`CREATE TABLE IF NOT EXISTS partial_leads (
        partial_id TEXT PRIMARY KEY, full_name TEXT NOT NULL DEFAULT '',
        mobile TEXT NOT NULL DEFAULT '', country_code TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL DEFAULT '', destination TEXT NOT NULL DEFAULT '',
        travel_date TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT 'website',
        source_page TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`).bind().run();
      if (!result.success) throw new Error("Partial lead table unavailable");
    })();
    initialized.set(db, ready);
    ready.catch(() => initialized.delete(db));
  }
  await ready;
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== url.host) return Response.json({ error: "Invalid origin." }, { status: 403 });
    const body = await request.json() as Record<string, unknown>;
    const partialId = clean(body.partialId, 100);
    if (!/^[A-Za-z0-9_-]{10,100}$/.test(partialId)) return Response.json({ error: "Invalid capture ID." }, { status: 400 });
    const contact = normalizeLeadContact(clean(body.mobile, 30), clean(body.countryCode, 10), clean(body.email, 254));
    if (!contact.mobile && !contact.email) return Response.json({ error: "A valid phone number or email is required." }, { status: 400 });
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as Record<string, unknown>).DB as DB | undefined;
    if (!db) return Response.json({ error: "Lead capture is temporarily unavailable." }, { status: 503 });
    await ensureTable(db);
    // Only store the path, never checkout query strings containing customer data.
    const sourcePage = clean(body.sourcePage, 500).split(/[?#]/)[0] || url.pathname;
    const result = await db.prepare(`INSERT INTO partial_leads (
      partial_id, full_name, mobile, country_code, email, destination, travel_date, source, source_page
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'website', ?)
    ON CONFLICT(partial_id) DO UPDATE SET
      full_name = CASE WHEN excluded.full_name <> '' THEN excluded.full_name ELSE partial_leads.full_name END,
      mobile = CASE WHEN excluded.mobile <> '' THEN excluded.mobile ELSE partial_leads.mobile END,
      country_code = CASE WHEN excluded.country_code <> '' THEN excluded.country_code ELSE partial_leads.country_code END,
      email = CASE WHEN excluded.email <> '' THEN excluded.email ELSE partial_leads.email END,
      destination = CASE WHEN excluded.destination <> '' THEN excluded.destination ELSE partial_leads.destination END,
      travel_date = CASE WHEN excluded.travel_date <> '' THEN excluded.travel_date ELSE partial_leads.travel_date END,
      source_page = excluded.source_page, updated_at = CURRENT_TIMESTAMP`)
      .bind(partialId, clean(body.fullName, 120), contact.mobile, clean(body.countryCode, 10), contact.email,
        clean(body.destination, 160), clean(body.travelDate, 20), sourcePage).run();
    if (!result.success) throw new Error("Partial lead save was not confirmed");
    return Response.json({ success: true, partialId });
  } catch (error) {
    console.error("Partial lead capture failed:", error);
    return Response.json({ error: "Unable to capture lead." }, { status: 500 });
  }
}
