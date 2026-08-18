import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const linkId = requestUrl.searchParams.get("link_id") || "";
    const bookingNumber = requestUrl.searchParams.get("booking") || "";

    if (!linkId) {
      return NextResponse.redirect(new URL(`/payment/failure?status=missing_link&gateway=cashfree${bookingNumber ? `&booking=${encodeURIComponent(bookingNumber)}` : ""}`, request.url), 303);
    }

    const { env } = getCloudflareContext();
    const runtimeEnv = env as unknown as Record<string, string | undefined>;
    const environment = String(runtimeEnv.CASHFREE_ENVIRONMENT || "production").trim().toLowerCase() === "sandbox" ? "sandbox" : "production";
    const clientId = String(runtimeEnv.CASHFREE_APP_ID || runtimeEnv.CASHFREE_CLIENT_ID || "").trim();
    const clientSecret = String(runtimeEnv.CASHFREE_SECRET_KEY || runtimeEnv.CASHFREE_CLIENT_SECRET || "").trim();

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(new URL(`/payment/failure?status=configuration_error&gateway=cashfree${bookingNumber ? `&booking=${encodeURIComponent(bookingNumber)}` : ""}`, request.url), 303);
    }

    const endpoint = environment === "production" ? "https://api.cashfree.com/pg/links" : "https://sandbox.cashfree.com/pg/links";
    const response = await fetch(`${endpoint}/${encodeURIComponent(linkId)}/orders?status=ALL`, {
      method: "GET",
      headers: { Accept: "application/json", "x-api-version": "2023-08-01", "x-client-id": clientId, "x-client-secret": clientSecret },
      cache: "no-store",
    });
    const orders = await response.json().catch(() => []);

    if (!response.ok || !Array.isArray(orders)) {
      return NextResponse.redirect(new URL(`/payment/failure?status=verification_failed&gateway=cashfree&link_id=${encodeURIComponent(linkId)}${bookingNumber ? `&booking=${encodeURIComponent(bookingNumber)}` : ""}`, request.url), 303);
    }

    const paid = orders.find((order: any) => String(order?.order_status || "").toUpperCase() === "PAID");
    const latest = orders[orders.length - 1] || {};
    const transactionId = String(paid?.order_id || latest?.order_id || paid?.cf_order_id || latest?.cf_order_id || "");
    const cfOrderId = String(paid?.cf_order_id || latest?.cf_order_id || "");

    if (paid) {
      const success = new URL("/payment/success", request.url);
      success.searchParams.set("status", "success");
      success.searchParams.set("gateway", "cashfree");
      if (bookingNumber) success.searchParams.set("booking", bookingNumber);
      if (transactionId) success.searchParams.set("txnid", transactionId);
      if (cfOrderId) success.searchParams.set("cf_order_id", cfOrderId);
      success.searchParams.set("link_id", linkId);
      return NextResponse.redirect(success, 303);
    }

    const failure = new URL("/payment/failure", request.url);
    failure.searchParams.set("status", "failed");
    failure.searchParams.set("gateway", "cashfree");
    if (bookingNumber) failure.searchParams.set("booking", bookingNumber);
    if (transactionId) failure.searchParams.set("txnid", transactionId);
    if (cfOrderId) failure.searchParams.set("cf_order_id", cfOrderId);
    failure.searchParams.set("link_id", linkId);
    return NextResponse.redirect(failure, 303);
  } catch (error) {
    console.error("Cashfree callback error:", error);
    return NextResponse.redirect(new URL("/payment/failure?status=callback_error&gateway=cashfree", request.url), 303);
  }
}
