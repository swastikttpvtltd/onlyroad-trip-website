import { NextResponse } from "next/server";

async function sha512(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function redirectToResult(request: Request, status: string, txnid: string, extra: Record<string, string> = {}) {
  const url = new URL("/payment/failure", request.url);
  url.searchParams.set("status", status);
  if (txnid) url.searchParams.set("txnid", txnid);
  for (const [key, value] of Object.entries(extra)) {
    if (value) url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url, 303);
}

async function handleCallback(request: Request) {
  try {
    const form = await request.formData();
    const data = Object.fromEntries(form.entries());
    const value = (key: string) => String(data[key] ?? "");

    const key = String(process.env.PAYU_TEST_KEY || "").trim();
    const salt = String(process.env.PAYU_TEST_SALT || "").trim();
    const txnid = value("txnid");
    const status = value("status").toLowerCase();
    const receivedHash = value("hash").toLowerCase();

    if (!key || !salt) {
      return redirectToResult(request, "configuration_error", txnid);
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
      return redirectToResult(request, "verification_failed", txnid);
    }

    if (status === "success") {
      const successUrl = new URL("/payment/success", request.url);
      successUrl.searchParams.set("status", "success");
      if (txnid) successUrl.searchParams.set("txnid", txnid);
      const mihpayid = value("mihpayid");
      if (mihpayid) successUrl.searchParams.set("mihpayid", mihpayid);
      return NextResponse.redirect(successUrl, 303);
    }

    return redirectToResult(request, status || "failed", txnid, {
      error: value("error_Message"),
      mihpayid: value("mihpayid"),
    });
  } catch (error) {
    console.error("PayU callback error:", error);
    return redirectToResult(request, "callback_error");
  }
}

export async function POST(request: Request) {
  return handleCallback(request);
}

export async function GET(request: Request) {
  return redirectToResult(request, "invalid_callback");
}
