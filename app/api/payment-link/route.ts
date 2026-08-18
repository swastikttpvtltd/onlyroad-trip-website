import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { packages } from "@/data/packages";

function calculateReturnDate(date: string, duration: string) {
  if (!date) return "";
  const nights = Number(String(duration).match(/(\d+)\s*Nights?/i)?.[1] ?? 0);
  if (!nights) return "";
  const d = new Date(`${date}T12:00:00`);
  d.setDate(d.getDate() + nights);
  return d.toISOString().slice(0, 10);
}

function getBookingMeta(body: any, amount: number) {
  const purpose = String(body.purpose || "");
  const parts = purpose.split(" | ");
  const title = String(parts[0] || "Only Road Trip Booking").trim();
  const sharing = String(parts[1] || "").replace(/\s*sharing$/i, "").trim();
  const date = String(parts[2] || "").trim();
  const travellersMatch = String(parts[3] || "").match(/(\d+)/);
  const travellers = Number(travellersMatch?.[1] || 1);
  const pkg = packages.find((item: any) => String(item.title).toLowerCase() === title.toLowerCase()) as any;
  const duration = String(pkg?.duration || "");
  const total = Math.round(amount / 0.3);
  const rate = travellers ? Math.round(total / travellers) : total;
  return {
    title,
    packageId: String(pkg?.packageId || ""),
    duration,
    sharing,
    date,
    returnDate: calculateReturnDate(date, duration),
    travellers,
    rate,
    total,
    advance: amount,
    balance: Math.max(0, total - amount),
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Enter a valid payment amount." }, { status: 400 });
    }
    if (!body.customer_name || !body.customer_email || !body.customer_phone || !body.purpose) {
      return NextResponse.json({ error: "Customer name, email, mobile and payment purpose are required." }, { status: 400 });
    }

    const booking = getBookingMeta(body, amount);
    const origin = new URL(request.url).origin;

    // The original booking form posts here. Before a gateway is selected,
    // send the customer to the new payment-selection page instead of opening
    // Cashfree directly. The actual Cashfree request uses action=create_cashfree.
    if (body.action !== "create_cashfree") {
      const params = new URLSearchParams({
        title: booking.title,
        packageId: booking.packageId,
        duration: booking.duration,
        date: booking.date,
        returnDate: booking.returnDate,
        sharing: booking.sharing,
        travellers: String(booking.travellers),
        rate: String(booking.rate),
        total: String(booking.total),
        advance: String(booking.advance),
        balance: String(booking.balance),
        name: String(body.customer_name).trim(),
        phone: String(body.customer_phone).trim(),
        email: String(body.customer_email).trim(),
        purpose: String(body.purpose).slice(0, 500),
      });
      return NextResponse.json({ link_url: `${origin}/payment?${params.toString()}`, mode: "payment_selection" });
    }

    const { env } = getCloudflareContext();
    const runtimeEnv = env as unknown as Record<string, string | undefined>;
    const environment = String(runtimeEnv.CASHFREE_ENVIRONMENT || "production").trim().toLowerCase() === "sandbox" ? "sandbox" : "production";
    const clientId = String(runtimeEnv.CASHFREE_APP_ID || runtimeEnv.CASHFREE_CLIENT_ID || "").trim();
    const clientSecret = String(runtimeEnv.CASHFREE_SECRET_KEY || runtimeEnv.CASHFREE_CLIENT_SECRET || "").trim();

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Cashfree API credentials are not configured on the server." }, { status: 500 });
    }

    const endpoint = environment === "production" ? "https://api.cashfree.com/pg/links" : "https://sandbox.cashfree.com/pg/links";
    const linkId = `ORT-${Date.now()}`;
    const configuredReturnUrl = String(runtimeEnv.CASHFREE_RETURN_URL || `${origin}/payment/success`).trim();
    const payload = {
      link_id: linkId,
      link_amount: amount,
      link_currency: "INR",
      link_purpose: String(body.purpose).slice(0, 500),
      customer_details: {
        customer_name: String(body.customer_name).trim(),
        customer_email: String(body.customer_email).trim(),
        customer_phone: String(body.customer_phone).trim(),
      },
      ...(configuredReturnUrl ? { link_meta: { return_url: configuredReturnUrl } } : {}),
      link_notify: { send_sms: true, send_email: true },
      link_auto_reminders: true,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-version": "2023-08-01", "x-client-id": clientId, "x-client-secret": clientSecret },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.message || data?.message_text || data?.error_description || "Cashfree could not create the payment link.";
      return NextResponse.json({ error: message }, { status: response.status });
    }
    if (!data?.link_url) return NextResponse.json({ error: "Cashfree responded successfully but did not return a payment link." }, { status: 502 });
    return NextResponse.json({ link_url: data.link_url, link_id: data?.link_id || linkId });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unable to create payment link." }, { status: 500 });
  }
}
