import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

function calculateReturnDate(date: string, duration: string) {
  if (!date) return "";
  const nights = Number(String(duration).match(/(\d+)\s*Nights?/i)?.[1] ?? 0);
  if (!nights) return "";
  const d = new Date(`${date}T12:00:00`);
  d.setDate(d.getDate() + nights);
  return d.toISOString().slice(0, 10);
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return jsonError("Enter a valid payment amount.", 400);
    }

    const name = String(body.customer_name || "").trim();
    const email = String(body.customer_email || "").trim();
    const phone = String(body.customer_phone || "").trim();
    const purpose = String(body.purpose || "").trim();

    if (!name || !email || !phone || !purpose) {
      return jsonError("Customer name, email, mobile and payment purpose are required.", 400);
    }

    const origin = new URL(request.url).origin;
    const bookingNumber = String(body.bookingNumber || `ORT-${Date.now().toString(36).slice(-8).toUpperCase()}`).trim();

    // This endpoint is also used by the original booking form to hand the
    // customer over to the payment-selection page. Keep that path extremely
    // light: do not import the full package catalogue into the Worker.
    if (body.action !== "create_cashfree") {
      const title = String(body.packageTitle || purpose.split(" | ")[0] || "Only Road Trip Booking").trim();
      const duration = String(body.duration || "").trim();
      const date = String(body.date || "").trim();
      const travellers = Number(body.travellers || 1);
      const advance = amount;
      const total = Number(body.total || Math.round(advance / 0.3));
      const rate = Number(body.rate || (travellers ? Math.round(total / travellers) : total));
      const returnDate = String(body.returnDate || calculateReturnDate(date, duration));
      const balance = Number(body.balance ?? Math.max(0, total - advance));

      const params = new URLSearchParams({
        title,
        packageId: String(body.packageId || ""),
        duration,
        date,
        returnDate,
        sharing: String(body.sharing || ""),
        travellers: String(travellers),
        rate: String(rate),
        total: String(total),
        advance: String(advance),
        balance: String(balance),
        name,
        phone,
        email,
        purpose: purpose.slice(0, 500),
      });

      return NextResponse.json(
        { link_url: `${origin}/payment?${params.toString()}`, mode: "payment_selection" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    let env: Record<string, string | undefined>;
    try {
      const context = getCloudflareContext();
      env = (context.env || {}) as unknown as Record<string, string | undefined>;
    } catch (contextError: any) {
      console.error("Cashfree Cloudflare context error:", contextError);
      return jsonError("Cashfree server configuration is unavailable. Please try again in a moment.", 503);
    }

    const environment = String(env.CASHFREE_ENVIRONMENT || "production").trim().toLowerCase() === "sandbox" ? "sandbox" : "production";
    const clientId = String(env.CASHFREE_APP_ID || env.CASHFREE_CLIENT_ID || "").trim();
    const clientSecret = String(env.CASHFREE_SECRET_KEY || env.CASHFREE_CLIENT_SECRET || "").trim();

    if (!clientId || !clientSecret) {
      return jsonError("Cashfree API credentials are not configured on the server.", 500);
    }

    const endpoint = environment === "production"
      ? "https://api.cashfree.com/pg/links"
      : "https://sandbox.cashfree.com/pg/links";

    const linkId = `ORT-${Date.now()}`;
    const returnUrl = `${origin}/api/payment/cashfree/callback?link_id=${encodeURIComponent(linkId)}&booking=${encodeURIComponent(bookingNumber)}`;

    const payload = {
      link_id: linkId,
      link_amount: amount,
      link_currency: "INR",
      link_purpose: `${purpose.slice(0, 450)} | ${bookingNumber}`,
      customer_details: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
      link_meta: { return_url: returnUrl },
      link_notify: { send_sms: true, send_email: true },
      link_auto_reminders: true,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const raw = await response.text();
    let data: any = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      console.error("Cashfree returned non-JSON response:", response.status, raw.slice(0, 500));
      return jsonError("Cashfree returned an unexpected response. Please try again.", 502);
    }

    if (!response.ok) {
      const message = data?.message || data?.message_text || data?.error_description || "Cashfree could not create the payment link.";
      return jsonError(String(message), response.status);
    }

    if (!data?.link_url) {
      return jsonError("Cashfree responded successfully but did not return a payment link.", 502);
    }

    return NextResponse.json(
      { link_url: data.link_url, link_id: data?.link_id || linkId },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err: any) {
    console.error("Cashfree payment-link initialization error:", err);
    return jsonError(err?.message || "Unable to create Cashfree payment link.", 500);
  }
}
