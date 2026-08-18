import { NextResponse } from "next/server";

export const runtime = "edge";

async function sha512(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function clean(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const data = Object.fromEntries(form.entries());
    const status = clean(data.status).toLowerCase();
    const txnid = clean(data.txnid);
    const amount = clean(data.amount);
    const key = clean(data.key);
    const salt = clean(process.env.PAYU_TEST_SALT);

    // Cloudflare runtime variables are available through the request context in
    // the main payment route. For this callback, also support the standard
    // Cloudflare Pages/Workers environment injection when available.
    let configuredSalt = salt;
    try {
      const { getCloudflareContext } = await import("@opennextjs/cloudflare");
      const { env } = getCloudflareContext();
      const runtimeEnv = env as unknown as Record<string, string | undefined>;
      configuredSalt = clean(runtimeEnv.PAYU_TEST_SALT) || configuredSalt;
    } catch {
      // Local Next.js execution may not expose Cloudflare context.
    }

    let verified = false;
    const responseHash = clean(data.hash);

    if (configuredSalt && responseHash && key && txnid && amount) {
      const reverseHashString = [
        configuredSalt,
        status,
        "",
        "",
        "",
        "",
        "",
        clean(data.udf5),
        clean(data.udf4),
        clean(data.udf3),
        clean(data.udf2),
        clean(data.udf1),
        clean(data.email),
        clean(data.firstname),
        clean(data.productinfo),
        amount,
        txnid,
        key,
      ].join("|");
      const calculatedHash = await sha512(reverseHashString);
      verified = calculatedHash.toLowerCase() === responseHash.toLowerCase();
    }

    const result = verified && status === "success" ? "success" : verified ? "failure" : "unverified";
    const query = new URLSearchParams({
      result,
      txnid,
      amount,
      mihpayid: clean(data.mihpayid),
      message: clean(data.error_Message || data.field9 || data.unmappedstatus),
    });

    return NextResponse.redirect(new URL(`/payu-test/result?${query.toString()}`, request.url), 303);
  } catch (error) {
    console.error("PayU callback error:", error);
    const url = new URL("/payu-test/result", request.url);
    url.searchParams.set("result", "unverified");
    return NextResponse.redirect(url, 303);
  }
}

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/payu-test/result?result=unverified", request.url), 303);
}
