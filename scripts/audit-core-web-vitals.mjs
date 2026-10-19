#!/usr/bin/env node
/** Read-only CrUX field-data audit. Requires CRUX_API_KEY.
 * Example: CRUX_API_KEY=... node scripts/audit-core-web-vitals.mjs
 * Google's CrUX API requires a configured key and sufficient field traffic.
 */
const key = process.env.CRUX_API_KEY;
if (!key) { console.error("CRUX_API_KEY is required; no performance score has been measured."); process.exit(2); }
const origin = process.env.SEO_BASE_URL || "https://www.onlyroadtrip.com";
for (const formFactor of ["PHONE", "DESKTOP"]) {
  const res = await fetch(`https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${encodeURIComponent(key)}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, formFactor, metrics: ["largest_contentful_paint", "cumulative_layout_shift", "interaction_to_next_paint"] })
  });
  const body = await res.json();
  if (!res.ok) { console.error(formFactor, JSON.stringify(body)); process.exitCode = 1; continue; }
  const metrics = body.record?.metrics || {};
  console.log(JSON.stringify({ formFactor, origin, p75: Object.fromEntries(Object.entries(metrics).map(([k, v]) => [k, v.percentiles?.p75 ?? null])) }, null, 2));
}
