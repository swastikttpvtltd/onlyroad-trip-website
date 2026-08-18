import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const runtime = "edge";

function clean(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function makeTxnId() {
  return `ORT${Date.now()}${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
}

async function sha512(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount);
    const firstname = clean(body?.firstname);
    const email = clean(body?.email);
    const phone = clean(body?.phone);
    const productinfo = clean(body?.productinfo, "Only Road Trip Booking");

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Enter a valid payment amount." }, { status: 400 });
    }

    if (!firstname || !email || !phone) {
      return NextResponse.json({ error: "Name, email and mobile number are required." }, { status: 400 });
    }

    const { env } = getCloudflareContext();
    const runtimeEnv = env as unknown as Record<string, string | undefined>;
    const key = clean(runtimeEnv.PAYU_TEST_KEY) || clean(process.env.PAYU_TEST_KEY);
    const salt = clean(runtimeEnv.PAYU_TEST_SALT) || clean(process.env.PAYU_TEST_SALT);
    const paymentUrl = clean(runtimeEnv.PAYU_TEST_BASE_URL, "https://test.payu.in/_payment");

    if (!key || !salt) {
      return NextResponse.json(
        { error: "PayU TEST credentials are not configured on the server." },
        { status: 500 },
      );
    }

    const origin = new URL(request.url).origin;
    const txnid = makeTxnId();
    const amountText = amount.toFixed(2);

    // PayU Hosted Checkout hash for the standard _payment flow.
    // Keep this calculation server-side; the salt must never reach the browser.
    const hashString = [
      key,
      txnid,
      amountText,
      productinfo,
      firstname,
      email,
      clean(body?.udf1),
      clean(body?.udf2),
      clean(body?.udf3),
      clean(body?.udf4),
      clean(body?.udf5),
      "",
      "",
      "",
      "",
      "",
      salt,
    ].join("|");

    const hash = await sha512(hashString);

    const fields: Record<string, string> = {
      key,
      txnid,
      amount: amountText,
      productinfo,
      firstname,
      lastname: clean(body?.lastname),
      email,
      phone,
      surl: `${origin}/api/payment/payu/callback`,
      furl: `${origin}/api/payment/payu/callback`,
      hash,
      udf1: clean(body?.udf1),
      udf2: clean(body?.udf2),
      udf3: clean(body?.udf3),
      udf4: clean(body?.udf4),
      udf5: clean(body?.udf5),
    };

    return NextResponse.json({
      paymentUrl,
      txnid,
      fields,
      environment: "test",
    });
  } catch (error) {
    console.error("PayU test initialization error:", error);
    return NextResponse.json({ error: "Unable to initialize PayU test payment." }, { status: 500 });
  }
}
