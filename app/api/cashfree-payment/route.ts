import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);
    const environment = process.env.CASHFREE_ENVIRONMENT === "production" ? "production" : "sandbox";
    const appId = String(process.env.CASHFREE_APP_ID || "").trim();
    const secretKey = String(process.env.CASHFREE_SECRET_KEY || "").trim();

    if (!appId || !secretKey) return NextResponse.json({ error: "Cashfree credentials are not configured. Check CASHFREE_APP_ID and CASHFREE_SECRET_KEY in .env.local." }, { status: 500 });
    if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: "Invalid payment amount." }, { status: 400 });
    if (!body.customerName || !body.customerEmail || !body.customerPhone || !body.packageTitle) return NextResponse.json({ error: "Customer name, email, mobile and package are required." }, { status: 400 });

    const endpoint = environment === "production" ? "https://api.cashfree.com/pg/orders" : "https://sandbox.cashfree.com/pg/orders";
    const configuredReturnUrl = String(process.env.CASHFREE_RETURN_URL || "").trim();
    const orderId = `ORT_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const origin = new URL(request.url).origin;
    const returnUrl = configuredReturnUrl || `${origin}/payment-success?order_id={order_id}`;

    const payload = {
      order_id: orderId,
      order_amount: Math.round(amount * 100) / 100,
      order_currency: "INR",
      customer_details: {
        customer_id: `ORT_${String(body.customerPhone).replace(/\D/g, "").slice(-10) || Date.now()}`,
        customer_name: String(body.customerName).trim(),
        customer_email: String(body.customerEmail).trim(),
        customer_phone: String(body.customerPhone).replace(/\D/g, "").slice(-15),
      },
      order_meta: { return_url: returnUrl },
      order_note: `Only Road Trip booking - ${String(body.packageTitle).slice(0, 180)}`,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-version": "2026-01-01", "x-client-id": appId, "x-client-secret": secretKey },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: data?.message || data?.message_text || data?.error_description || "Cashfree could not create the payment order." }, { status: response.status });
    if (!data?.payment_session_id) return NextResponse.json({ error: "Cashfree created the order but did not return a payment session." }, { status: 502 });

    return NextResponse.json({ orderId, paymentSessionId: data.payment_session_id });
  } catch (error) {
    console.error("Cashfree payment order failed:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create Cashfree payment order." }, { status: 500 });
  }
}
