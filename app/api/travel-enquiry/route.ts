import { getCloudflareContext } from "@opennextjs/cloudflare";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      mobile,
      email,
      destination,
      travelDate,
      travellers,
      travelType,
      budget,
      message,
    } = body;

    if (
      !fullName ||
      !mobile ||
      !destination ||
      !travelDate ||
      !travellers ||
      !travelType ||
      !message
    ) {
      return NextResponse.json(
        { error: "Please complete all required travel enquiry fields." },
        { status: 400 },
      );
    }

    const context = await getCloudflareContext({ async: true });
    const cloudflareEnv = (context?.env ?? {}) as Record<string, unknown>;
    const db = cloudflareEnv.DB as
      | { prepare: (query: string) => { bind: (...values: unknown[]) => { run: () => Promise<unknown> } } }
      | undefined;

    if (!db) {
      console.error("Travel enquiry database binding is unavailable.");
      return NextResponse.json(
        { error: "Enquiry service is temporarily unavailable." },
        { status: 503 },
      );
    }

    const leadId = `ORT-${Date.now()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const sourcePage = request.headers.get("referer") || new URL(request.url).origin;

    await db
      .prepare(`
        INSERT INTO leads (
          lead_id, full_name, mobile, email, destination, travel_date,
          travellers, travel_type, budget, message, source, source_page
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        leadId,
        String(fullName),
        String(mobile),
        email ? String(email) : null,
        String(destination),
        String(travelDate),
        String(travellers),
        String(travelType),
        budget ? String(budget) : null,
        String(message),
        "website",
        sourcePage,
      )
      .run();

    const readEnv = (...names: string[]) => {
      for (const name of names) {
        const runtimeValue = cloudflareEnv[name];
        if (typeof runtimeValue === "string" && runtimeValue) return runtimeValue;

        const processValue = process.env[name];
        if (processValue) return processValue;
      }
      return undefined;
    };

    // Support both the current SMTP_* names and the existing Zoho variable
    // names already used by the Cloudflare deployment/environment template.
    const host = readEnv("SMTP_HOST", "ZOHO_SMTP_HOST") || "smtp.zoho.in";
    const port = Number(readEnv("SMTP_PORT", "ZOHO_SMTP_PORT") || "465");
    const secure = String(readEnv("SMTP_SECURE") ?? (port === 465)).toLowerCase() === "true";
    const user = readEnv("SMTP_USER", "ZOHO_SMTP_USER");
    const pass = readEnv("SMTP_PASSWORD", "ZOHO_SMTP_PASSWORD");
    const from = readEnv("SMTP_FROM", "ENQUIRY_TO_EMAIL", "ZOHO_FROM_EMAIL") || user;
    const to = readEnv("SMTP_TO", "ENQUIRY_TO_EMAIL", "TRAVEL_ENQUIRY_TO") || "info@onlyroadtrip.com";
    const cc = readEnv("SMTP_CC", "ENQUIRY_CC_EMAIL", "TRAVEL_ENQUIRY_CC") || undefined;

    const missing: string[] = [];
    if (!host) missing.push("SMTP_HOST / ZOHO_SMTP_HOST");
    if (!port) missing.push("SMTP_PORT / ZOHO_SMTP_PORT");
    if (!user) missing.push("SMTP_USER / ZOHO_SMTP_USER");
    if (!pass) missing.push("SMTP_PASSWORD / ZOHO_SMTP_PASSWORD");
    if (!from) missing.push("SMTP_FROM / ZOHO_FROM_EMAIL");

    if (missing.length > 0) {
      console.error("Travel enquiry email configuration missing:", missing);
      await db
        .prepare("UPDATE leads SET email_status = ?, email_error = ?, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ?")
        .bind("FAILED", "Email configuration unavailable", leadId)
        .run();
      return NextResponse.json({ success: true, leadId, notificationPending: true });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    try {
      await transporter.sendMail({
      from,
      to,
      cc,
      replyTo: email || undefined,
      subject: `New Travel Enquiry — ${destination} — ${fullName}`,
      text: [
        "NEW TRAVEL ENQUIRY",
        "",
        `Full Name: ${fullName}`,
        `Mobile: ${mobile}`,
        `Email: ${email || "Not provided"}`,
        `Destination: ${destination}`,
        `Travel Date: ${travelDate}`,
        `Travellers: ${travellers}`,
        `Travel Type: ${travelType}`,
        `Approx. Budget: ${budget || "Not specified"}`,
        "",
        "Requirements / Message:",
        message,
        "",
        "----------------------------------------",
        "Only Road Trip",
        "Swastik Tour And Travels Private Limited",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#0f172a">
          <div style="background:#1e3a8a;color:#fff;padding:24px;border-radius:14px 14px 0 0">
            <div style="font-size:12px;font-weight:bold;letter-spacing:2px;color:#bfdbfe">ONLY ROAD TRIP</div>
            <h1 style="margin:8px 0 0;font-size:25px">New Travel Enquiry</h1>
            <p style="margin:8px 0 0;color:#dbeafe">A new customer enquiry has been received from the website.</p>
          </div>
          <div style="padding:24px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 14px 14px">
            <h2 style="font-size:18px">Customer Details</h2>
            <p><strong>Full Name:</strong> ${escapeHtml(String(fullName))}</p>
            <p><strong>Mobile:</strong> ${escapeHtml(String(mobile))}</p>
            <p><strong>Email:</strong> ${escapeHtml(String(email || "Not provided"))}</p>
            <h2 style="font-size:18px;margin-top:24px">Trip Details</h2>
            <p><strong>Destination:</strong> ${escapeHtml(String(destination))}</p>
            <p><strong>Travel Date:</strong> ${escapeHtml(String(travelDate))}</p>
            <p><strong>Travellers:</strong> ${escapeHtml(String(travellers))}</p>
            <p><strong>Travel Type:</strong> ${escapeHtml(String(travelType))}</p>
            <p><strong>Approx. Budget:</strong> ${escapeHtml(String(budget || "Not specified"))}</p>
            <h2 style="font-size:18px;margin-top:24px">Requirements / Message</h2>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;line-height:1.6">${escapeHtml(String(message)).replace(/\n/g, "<br />")}</div>
            <p style="margin-top:24px;color:#64748b;font-size:12px">Only Road Trip — Swastik Tour And Travels Private Limited</p>
          </div>
        </div>
      `,
      });

      await db
        .prepare("UPDATE leads SET email_status = ?, email_error = NULL, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ?")
        .bind("SENT", leadId)
        .run();

      return NextResponse.json({ success: true, leadId });
    } catch (emailError) {
      console.error("Travel enquiry email failed:", emailError);
      await db
        .prepare("UPDATE leads SET email_status = ?, email_error = ?, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ?")
        .bind("FAILED", "Email delivery failed", leadId)
        .run();
      return NextResponse.json({ success: true, leadId, notificationPending: true });
    }
  } catch (error) {
    console.error("Travel enquiry processing failed:", error);
    return NextResponse.json(
      { error: "Unable to send the enquiry right now. Please try again or contact us directly." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );
}
