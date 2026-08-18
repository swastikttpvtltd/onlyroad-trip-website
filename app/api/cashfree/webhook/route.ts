import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-webhook-signature") || "";
    const timestamp = request.headers.get("x-webhook-timestamp") || "";

    const { env } = getCloudflareContext();
    const runtimeEnv = env as unknown as Record<string, string | undefined>;
    const secret = String(runtimeEnv.CASHFREE_SECRET_KEY || runtimeEnv.CASHFREE_CLIENT_SECRET || "").trim();

    if (!secret || !signature || !timestamp) {
      return NextResponse.json({ error: "Webhook configuration/signature missing" }, { status: 401 });
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(timestamp + rawBody)
      .digest("base64");

    const signaturesMatch =
      expected.length === signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

    if (!signaturesMatch) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody) as Record<string, any>;
    const eventType = String(payload?.type || payload?.event_type || "");
    const orderId = String(
      payload?.data?.order?.order_id ||
      payload?.data?.order_id ||
      payload?.data?.order?.cf_order_id ||
      "",
    );
    const paymentStatus = String(
      payload?.data?.payment?.payment_status ||
      payload?.data?.order?.order_status ||
      "",
    );

    console.log("Cashfree webhook received", {
      eventType,
      orderId,
      paymentStatus,
    });

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Cashfree webhook error:", error);
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    service: "cashfree-webhook",
    message: "Cashfree webhook endpoint is active",
  });
}
