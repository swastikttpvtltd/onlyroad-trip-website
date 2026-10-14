import { currencies, RATE_TTL, validRates, type Rates } from "@/lib/currency";

export const dynamic = "force-dynamic";
let cached: { at: number; rates: Rates } | undefined;
let pending: Promise<void> | undefined;

async function refresh() {
  // Server fetching avoids browser CORS restrictions and blocked third-party requests.
  const response = await fetch("https://open.er-api.com/v6/latest/INR", {
    next: { revalidate: 86400 }, signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("FX provider unavailable");
  const data = await response.json();
  if (data.result !== "success" || data.base_code !== "INR" || !validRates(data.rates)) throw new Error("Invalid FX rates");
  cached = { at: Date.now(), rates: Object.fromEntries(currencies.map(code => [code, data.rates[code]])) as Rates };
}

export async function GET() {
  if (!cached || Date.now() - cached.at >= RATE_TTL) {
    pending ??= refresh().finally(() => { pending = undefined; });
    try { await pending; } catch { /* Retain verified rates during an outage. */ }
  }
  if (!cached) return Response.json({ error: "Exchange rates temporarily unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  const stale = Date.now() - cached.at >= RATE_TTL;
  return Response.json({ ...cached, stale }, { headers: { "Cache-Control": stale ? "no-store" : "public, max-age=3600, s-maxage=86400" } });
}
