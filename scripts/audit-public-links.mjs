#!/usr/bin/env node
/** Read-only production URL checker. Run: node scripts/audit-public-links.mjs
 * Uses the public sitemap; never modifies the website or sends form requests.
 */
const base = process.env.SEO_BASE_URL || "https://www.onlyroadtrip.com";
const timeoutMs = 12000;
const maxPages = Math.min(Math.max(Number(process.env.SEO_MAX_URLS || 150), 1), 1000);
const errors = [];
async function get(url, method = "GET") {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(url, { method, redirect: "follow", signal: controller.signal, headers: { "User-Agent": "OnlyRoadTrip-SEO-Audit/1.0" } }); }
  finally { clearTimeout(timer); }
}
function urlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m => m[1].replaceAll("&amp;", "&"));
}
const sitemap = await get(new URL("/sitemap.xml", base));
if (!sitemap.ok) throw new Error(`Sitemap HTTP ${sitemap.status}`);
const urls = urlsFromSitemap(await sitemap.text()).filter(u => {
  try { return new URL(u).origin === new URL(base).origin; } catch { return false; }
}).slice(0, maxPages);
for (const [i, url] of urls.entries()) {
  try {
    let response = await get(url, "HEAD");
    if (response.status === 405 || response.status === 501) response = await get(url);
    if (!response.ok) errors.push({ url, status: response.status });
    console.log(`[${i + 1}/${urls.length}] ${response.status} ${url}`);
  } catch (error) { errors.push({ url, error: String(error) }); }
}
console.log(JSON.stringify({ checked: urls.length, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
