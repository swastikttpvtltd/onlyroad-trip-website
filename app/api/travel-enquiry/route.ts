import { getCloudflareContext } from "@opennextjs/cloudflare";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, mobile, email, destination, travelDate, travellers, travelType, budget, message } = body;

    if (!fullName || !mobile || !destination || !travelDate || !travellers || !travelType || !message) {
      return NextResponse.json({ error: "Please complete all required travel enquiry fields." }, { status: 400 });
    }

    // On Cloudflare Workers, production variables/secrets are runtime bindings.
    // Read them from the Cloudflare context first, with process.env as a local fallback.
    const cloudflareEnv = getCloudflareContext().env as Record<string, string | undefined>;

    const readEnv = (name: string) => cloudflareEnv[name] || process.env[name];

    const host = readEnv("SMTP_HOST") || readEnv("ZOHO_SMTP_HOST") || "smtp.zoho.in";
    const port = Number(readEnv("SMTP_PORT") || readEnv("ZOHO_SMTP_PORT") || "465");
    const secure = String(readEnv("SMTP_SECURE") ?? (port === 465)).toLowerCase() === "true";
    const user = readEnv("SMTP_USER") || readEnv("ZOHO_SMTP_USER");
    const pass = readEnv("SMTP_PASSWORD") || readEnv("ZOHO_SMTP_PASSWORD");
    const from = readEnv("ENQUIRY_TO_EMAIL") || readEnv("ZOHO_FROM_EMAIL") || user;
    const to = readEnv("ENQUIRY_TO_EMAIL") || readEnv("TRAVEL_ENQUIRY_TO") || "info@onlyroadtrip.com";
    const cc = readEnv("ENQUIRY_CC_EMAIL") || readEnv("TRAVEL_ENQUIRY_CC") || undefined;

    if (!user || !pass || !from) {
      console.error("Email service configuration missing:", {
        hasUser: Boolean(user),
        hasPassword: Boolean(pass),
        hasFrom: Boolean(from),
        hasHost: Boolean(host),
      });
      return NextResponse.json({ error: "Email service is not configured yet." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

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
      ].join("\n"),
      html: `
        <h2>New Travel Enquiry</h2>
        <table cellpadding="8" cellspacing="0" border="0">
          <tr><td><strong>Full Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td><strong>Mobile</strong></td><td>${escapeHtml(mobile)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email || "Not provided")}</td></tr>
          <tr><td><strong>Destination</strong></td><td>${escapeHtml(destination)}</td></tr>
          <tr><td><strong>Travel Date</strong></td><td>${escapeHtml(travelDate)}</td></tr>
          <tr><td><strong>Travellers</strong></td><td>${escapeHtml(String(travellers))}</td></tr>
          <tr><td><strong>Travel Type</strong></td><td>${escapeHtml(travelType)}</td></tr>
          <tr><td><strong>Approx. Budget</strong></td><td>${escapeHtml(budget || "Not specified")}</td></tr>
        </table>
        <h3>Requirements / Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Travel enquiry email failed:", error);
    return NextResponse.json({ error: "Unable to send the enquiry right now. Please try again or contact us directly." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}
