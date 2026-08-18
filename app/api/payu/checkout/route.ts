import { NextResponse } from "next/server";

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
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Enter a valid payment amount." }, { status: 400 });
    }
    if (!body.firstname || !body.email || !body.phone || !body.productinfo) {
      return NextResponse.json({ error: "Customer and product details are required." }, { status: 400 });
    }

    // TEST/SANDBOX only. Secrets are read server-side and never sent to the browser.
    const key = String(process.env.PAYU_TEST_KEY || "").trim();
    const salt = String(process.env.PAYU_TEST_SALT || "").trim();
    const environment = String(process.env.PAYU_ENVIRONMENT || "test").trim().toLowerCase();

    if (environment !== "test") {
      return NextResponse.json({ error: "This checkout route is locked to PayU TEST mode." }, { status: 500 });
    }

    if (!key || !salt) {
      return NextResponse.json({ error: "PayU TEST key/salt are not configured for this local environment." }, { status: 500 });
    }

    const origin = new URL(request.url).origin;
    const actionUrl = String(process.env.PAYU_TEST_BASE_URL || "https://test.payu.in/_payment").trim();
    const txnid = `ORT${Date.now()}`.slice(0, 25);
    const productinfo = String(body.productinfo).slice(0, 100);
    const firstname = String(body.firstname).trim().slice(0, 60);
    const email = String(body.email).trim().slice(0, 50);
    const phone = String(body.phone).trim().slice(0, 50);
    const formattedAmount = amount.toFixed(2);
    const surl = `${origin}/api/payment/payu/callback`;
    const furl = `${origin}/api/payment/payu/callback`;

    // PayU's current hosted-checkout formula includes the optional
    // si_details segment after udf5. It must be represented even when empty.
    // key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||si_details|SALT
    const hashParts = [
      key,
      txnid,
      formattedAmount,
      productinfo,
      firstname,
      email,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      salt,
    ];
    const hashString = hashParts.join("|");
    const hash = await sha512(hashString);

    return NextResponse.json({
      actionUrl,
      fields: {
        key,
        txnid,
        amount: formattedAmount,
        productinfo,
        firstname,
        email,
        phone,
        surl,
        furl,
        hash,
        api_version: "7",
        udf1: "",
        udf2: "",
        udf3: "",
        udf4: "",
        udf5: "",
      },
    });
  } catch (err: any) {
    console.error("PayU checkout initialization error:", err);
    return NextResponse.json({ error: err?.message || "Unable to prepare PayU test checkout." }, { status: 500 });
  }
}
