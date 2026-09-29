import { getCloudflareContext } from "@opennextjs/cloudflare";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Database = { prepare: (sql: string) => { bind: (...values: unknown[]) => { run: () => Promise<unknown> } } };
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c] || c);

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const fullName = clean(body.fullName, 120);
    const mobile = clean(body.mobile, 25);
    const email = clean(body.email, 160);
    const pickupCity = clean(body.pickupCity, 120);
    const destination = clean(body.destination, 160);
    const travelDate = clean(body.travelDate, 20);
    const travellers = clean(String(body.travellers ?? ""), 5);
    const travellerCategory = clean(body.travellerCategory, 100);
    const homePickup = clean(body.homePickup, 30);
    const mobilityAssistance = clean(body.mobilityAssistance, 50);
    const message = clean(body.message, 2000);

    if (!fullName || !/^[+\d\s()-]{6,25}$/.test(mobile) || !pickupCity || !destination ||
        !/^\d{4}-\d{2}-\d{2}$/.test(travelDate) || !/^[1-9]\d{0,2}$/.test(travellers) ||
        !travellerCategory || !message || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: "Please check the required enquiry details." }, { status: 400 });
    }

    const context = await getCloudflareContext({ async: true });
    const env = (context?.env ?? {}) as Record<string, unknown>;
    const db = env.DB as Database | undefined;
    if (!db) return NextResponse.json({ error: "Enquiry service is temporarily unavailable." }, { status: 503 });

    const readEnv = (...keys: string[]) => {
      for (const key of keys) {
        const value = env[key];
        if (typeof value === "string" && value.trim()) return value.trim();
        if (process.env[key]?.trim()) return process.env[key]!.trim();
      }
      return undefined;
    };

    const leadId = `ORT-DD-${Date.now()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const details = `Pickup city: ${pickupCity}\nHome pickup and return drop: ${homePickup || "Please discuss"}\nMobility assistance: ${mobilityAssistance || "Please discuss"}\n\n${message}`;
    await db.prepare(`
      INSERT INTO leads (
        lead_id, full_name, mobile, email, destination, travel_date,
        travellers, travel_type, budget, message, source, source_page
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(leadId, fullName, mobile, email || null, destination, travelDate,
      travellers, travellerCategory, null, details, "door-to-door",
      new URL("/door-to-door-travel", request.url).toString()).run();

    const host = readEnv("SMTP_HOST", "ZOHO_SMTP_HOST") || "smtp.zoho.in";
    const port = Number(readEnv("SMTP_PORT", "ZOHO_SMTP_PORT") || "465");
    const user = readEnv("SMTP_USER", "ZOHO_SMTP_USER");
    const pass = readEnv("SMTP_PASSWORD", "ZOHO_SMTP_PASSWORD");
    const from = readEnv("SMTP_FROM", "ENQUIRY_TO_EMAIL", "ZOHO_FROM_EMAIL") || user;
    const to = readEnv("SMTP_TO", "ENQUIRY_TO_EMAIL", "TRAVEL_ENQUIRY_TO") || "info@onlyroadtrip.com";
    const cc = readEnv("SMTP_CC", "ENQUIRY_CC_EMAIL", "TRAVEL_ENQUIRY_CC");

    if (!user || !pass || !from || !Number.isInteger(port) || port < 1 || port > 65535) {
      await db.prepare("UPDATE leads SET email_status = ?, email_error = ?, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ?")
        .bind("FAILED", "Email configuration unavailable", leadId).run();
      return NextResponse.json({ success: true, leadId, notificationPending: true });
    }

    try {
      const transporter = nodemailer.createTransport({
        host, port,
        secure: String(readEnv("SMTP_SECURE") ?? (port === 465)).toLowerCase() === "true",
        auth: { user, pass },
      });
      const rows = [
        ["Lead ID", leadId], ["Name", fullName], ["Mobile", mobile],
        ["Email", email || "Not provided"], ["Pickup city", pickupCity],
        ["Destination", destination], ["Travel date", travelDate],
        ["Travellers", travellers], ["Traveller category", travellerCategory],
        ["Home pickup / return drop", homePickup || "Please discuss"],
        ["Mobility assistance", mobilityAssistance || "Please discuss"], ["Requirements", message],
      ];
      await transporter.sendMail({
        from, to, cc: cc || undefined, replyTo: email || undefined,
        subject: `Door-to-Door Enquiry — ${destination} — ${fullName}`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;color:#0f172a"><h1>New Door-to-Door Travel Enquiry</h1>${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join("")}<p>Only Road Trip · Swastik Tour And Travels Private Limited</p></div>`,
      });
      await db.prepare("UPDATE leads SET email_status = ?, email_error = NULL, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ?")
        .bind("SENT", leadId).run();
      return NextResponse.json({ success: true, leadId });
    } catch (error) {
      console.error("Door-to-door email notification failed", error);
      await db.prepare("UPDATE leads SET email_status = ?, email_error = ?, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ?")
        .bind("FAILED", "Email delivery failed", leadId).run();
      return NextResponse.json({ success: true, leadId, notificationPending: true });
    }
  } catch (error) {
    console.error("Door-to-door enquiry failed", error);
    return NextResponse.json({ error: "Unable to send your enquiry right now. Please try again." }, { status: 500 });
  }
}
