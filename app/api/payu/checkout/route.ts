import { getCloudflareContext } from "@opennextjs/cloudflare";
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
      return NextResponse.json(
        { error: "Customer and product details are required." },
        { status: 400 },
      );
    }

    const context = await getCloudflareContext({ async: true });
    const runtimeEnv = (context?.env ?? {}) as Record<string, string | undefined>;

    const readEnv = (name: string) => runtimeEnv[name] || process.env[name];

    const environment = String(readEnv("PAYU_ENVIRONMENT") || "test")
      .trim()
      .toLowerCase();

    const isProduction = environment === "production" || environment === "prod";

    const key = String(
      readEnv(isProduction ? "PAYU_KEY" : "PAYU_TEST_KEY") ||
        (isProduction ? "" : readEnv("PAYU_KEY")) ||
        "",
    ).trim();

    const salt = String(
      readEnv(isProduction ? "PAYU_SALT" : "PAYU_TEST_SALT") ||
        (isProduction ? "" : readEnv("PAYU_SALT")) ||
        "",
    ).trim();

    if (!key || !salt) {
      return NextResponse.json(
        {
          error: isProduction
            ? "PayU production key/salt are not configured."
            : "PayU test key/salt are not configured.",
        },
        { status: 500 },
      );
    }

    const configuredBaseUrl = String(
      readEnv(isProduction ? "PAYU_BASE_URL" : "PAYU_TEST_BASE_URL") ||
        (isProduction ? "https://secure.payu.in" : "https://test.payu.in/_payment"),
    ).trim().replace(/\/$/, "");

    const actionUrl = configuredBaseUrl.endsWith("/_payment")
      ? configuredBaseUrl
      : `${configuredBaseUrl}/_payment`;

    const origin = new URL(request.url).origin;
    const txnid = `ORT${Date.now()}`.slice(0, 25);
    const productinfo = String(body.productinfo).slice(0, 100);
    const firstname = String(body.firstname).trim().slice(0, 60);
    const email = String(body.email).trim().slice(0, 50);
    const phone = String(body.phone).trim().slice(0, 50);
    const bookingNumber = String(body.bookingNumber || "").trim().slice(0, 50);
    const formattedAmount = amount.toFixed(2);
    const surl = `${origin}/api/payment/payu/callback`;
    const furl = `${origin}/api/payment/payu/callback`;
    const udf1 = bookingNumber;
    const udf2 = "payu";

    // PayU Hosted Checkout request hash:
    // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
    const hashString = [
      key,
      txnid,
      formattedAmount,
      productinfo,
      firstname,
      email,
      udf1,
      udf2,
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
    ].join("|");

    const hash = await sha512(hashString);

    return NextResponse.json({
      environment: isProduction ? "production" : "test",
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
        udf1,
        udf2,
        udf3: "",
        udf4: "",
        udf5: "",
      },
    });
  } catch (err: any) {
    console.error("PayU checkout initialization error:", err);
    return NextResponse.json(
      { error: err?.message || "Unable to prepare PayU checkout." },
      { status: 500 },
    );
  }
}
