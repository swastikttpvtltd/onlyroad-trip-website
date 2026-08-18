import { NextResponse } from "next/server";

async function sha512(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function readPayURequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }

  const url = new URL(request.url);
  return Object.fromEntries(url.searchParams.entries());
}

function redirectTo(request: Request, path: string, params: Record<string, string>) {
  const url = new URL(path, request.url);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  return handleCallback(request);
}

export async function GET(request: Request) {
  return handleCallback(request);
}

async function handleCallback(request: Request) {
  try {
    const body = await readPayURequest(request);
    const status = String(body.status || "").trim().toLowerCase();
    const txnid = String(body.txnid || "").trim();
    const mihpayid = String(body.mihpayid || "").trim();
    const key = String(body.key || "").trim();
    const salt = String(process.env.PAYU_TEST_SALT || "").trim();

    // PayU response verification for the normal reverse-hash response.
    // Do not block the customer redirect if PayU omits a response hash on a cancelled attempt;
    // the payment is still treated as failed/cancelled on the customer-facing page.
    let hashValid = true;
    const responseHash = String(body.hash || "").trim().toLowerCase();

    if (responseHash && salt && key) {
      const additionalCharges = String(body.additionalCharges || body.additional_charges || "").trim();
      const reverseString = additionalCharges
        ? `${additionalCharges}|${salt}|${status}|||||||||||${String(body.email || "")}|${String(body.firstname || "")}|${String(body.productinfo || "")}|${String(body.amount || "")}|${txnid}|${key}`
        : `${salt}|${status}|||||||||||${String(body.email || "")}|${String(body.firstname || "")}|${String(body.productinfo || "")}|${String(body.amount || "")}|${txnid}|${key}`;
      const expectedHash = (await sha512(reverseString)).toLowerCase();
      hashValid = expectedHash === responseHash;
    }

    if (status !== "success") {
      return redirectTo(request, "/payment/failure", {
        txnid,
        status: status || "cancelled",
        mihpayid,
        verified: hashValid ? "1" : "0",
      });
    }

    // Success handling will be wired to the final success/booking-confirmation page next.
    // Keeping successful transactions out of the failure page prevents a false failure message.
    return redirectTo(request, "/payment", {
      payment: "success",
      txnid,
      mihpayid,
      verified: hashValid ? "1" : "0",
    });
  } catch (error) {
    console.error("PayU callback handling error:", error);
    return redirectTo(request, "/payment/failure", {
      status: "callback_error",
    });
  }
}
