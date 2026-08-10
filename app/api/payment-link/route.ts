import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);
    const environment = body.environment === "production" ? "production" : "sandbox";
    const clientId = String(body.client_id || process.env.CASHFREE_CLIENT_ID || "").trim();
    const clientSecret = String(body.client_secret || process.env.CASHFREE_CLIENT_SECRET || "").trim();

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Cashfree Client ID and Secret Key are required." }, { status: 400 });
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Enter a valid payment amount." }, { status: 400 });
    }
    if (!body.customer_name || !body.customer_email || !body.customer_phone || !body.purpose) {
      return NextResponse.json({ error: "Customer name, email, mobile and payment purpose are required." }, { status: 400 });
    }

    const endpoint = environment === "production"
      ? "https://api.cashfree.com/pg/links"
      : "https://sandbox.cashfree.com/pg/links";

    const linkId = `ORT-${Date.now()}`;
    const payload = {
      link_id: linkId,
      link_amount: amount,
      link_currency: "INR",
      link_purpose: String(body.purpose).slice(0, 500),
      customer_details: {
        customer_name: String(body.customer_name),
        customer_email: String(body.customer_email),
        customer_phone: String(body.customer_phone),
      },
      link_meta: body.return_url ? { return_url: String(body.return_url) } : undefined,
      link_notify: { send_sms: true, send_email: true },
      link_auto_reminders: true,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.message || data?.message_text || data?.error_description || "Cashfree could not create the payment link.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    return NextResponse.json({ link_url: data?.link_url, link_id: data?.link_id || linkId });
  } catch {
    return NextResponse.json({ error: "Unable to create payment link. Please check the credentials and try again." }, { status: 500 });
  }
}
