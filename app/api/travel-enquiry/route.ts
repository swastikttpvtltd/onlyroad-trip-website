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

    const host = process.env.SMTP_HOST || process.env.ZOHO_SMTP_HOST || "smtp.zoho.in";
    const port = Number(process.env.SMTP_PORT || process.env.ZOHO_SMTP_PORT || "465");
    const secure = String(process.env.SMTP_SECURE ?? (port === 465)).toLowerCase() === "true";
    const user = process.env.SMTP_USER || process.env.ZOHO_SMTP_USER;
    const pass = process.env.SMTP_PASSWORD || process.env.ZOHO_SMTP_PASSWORD;
    const from = process.env.ENQUIRY_FROM_EMAIL || process.env.ZOHO_FROM_EMAIL || user;
    const to = process.env.ENQUIRY_TO_EMAIL || process.env.TRAVEL_ENQUIRY_TO || "info@onlyroadtrip.com";
    const cc = process.env.ENQUIRY_CC_EMAIL || process.env.TRAVEL_ENQUIRY_CC || undefined;

    if (!user || !pass || !from) {
      return NextResponse.json({ error: "Email service is not configured. Check SMTP_USER, SMTP_PASSWORD and ENQUIRY_FROM_EMAIL in .env.local." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    // Verify the SMTP connection first so configuration errors are reported clearly.
    await transporter.verify();

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
    const details = error instanceof Error ? error.message : "Unknown email error";
    return NextResponse.json({ error: `Unable to send the enquiry right now. Email server error: ${details}` }, { status: 500 });
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
