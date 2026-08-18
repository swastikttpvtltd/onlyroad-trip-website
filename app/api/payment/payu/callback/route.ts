import { NextResponse } from "next/server";

async function sha512(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function resultUrl(
  request: Request,
  path: "/payment/success" | "/payment/failure",
  status: string,
  data: Record<string, string>,
) {
  const url = new URL(path, request.url);
  url.searchParams.set("status", status);
  url.searchParams.set("gateway", "payu");
  for (const [key, value] of Object.entries(data)) {
    if (value) url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url, 303);
}

async function handleCallback(request: Request) {
  try {
    const form = await request.formData();
    const data = Object.fromEntries(form.entries());
    const value = (key: string) => String(data[key] ?? "");

    // Production credentials. The old TEST_* names are kept only as a
    // backward-compatible fallback so an older deployment does not break.
    const key = String(
      process.env.PAYU_KEY || process.env.PAYU_MERCHANT_KEY || process.env.PAYU_TEST_KEY || "",
    ).trim();
    const salt = String(
      process.env.PAYU_SALT || process.env.PAYU_MERCHANT_SALT || process.env.PAYU_TEST_SALT || "",
    ).trim();

    const txnid = value("txnid");
    const status = value("status").toLowerCase();
    const receivedHash = value("hash").toLowerCase();
    const bookingNumber = value("udf1");

    if (!key || !salt) {
      return resultUrl(request, "/payment/failure", "configuration_error", {
        txnid,
        booking: bookingNumber,
      });
    }

    const reverseHashString = [
      salt,
      status,
      "",
      "",
      "",
      "",
      "",
      value("udf5"),
      value("udf4"),
      value("udf3"),
      value("udf2"),
      value("udf1"),
      value("email"),
      value("firstname"),
      value("productinfo"),
      value("amount"),
      txnid,
      key,
    ].join("|");

    const calculatedHash = (await sha512(reverseHashString)).toLowerCase();

    if (!receivedHash || calculatedHash !== receivedHash) {
      console.error("PayU callback hash verification failed", { txnid, status });
      return resultUrl(request, "/payment/failure", "verification_failed", {
        txnid,
        booking: bookingNumber,
      });
    }

    const common = {
      txnid,
      booking: bookingNumber,
      mihpayid: value("mihpayid"),
      amount: value("amount"),
    };

    if (status === "success") {
      return resultUrl(request, "/payment/success", "success", common);
    }

    return resultUrl(request, "/payment/failure", status || "failed", {
      ...common,
      error: value("error_Message"),
    });
  } catch (error) {
    console.error("PayU callback error:", error);
    return resultUrl(request, "/payment/failure", "callback_error", {});
  }
}

export async function POST(request: Request) {
  return handleCallback(request);
}

export async function GET(request: Request) {
  return resultUrl(request, "/payment/failure", "invalid_callback", {});
}
