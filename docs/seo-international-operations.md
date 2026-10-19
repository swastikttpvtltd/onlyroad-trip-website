# Only Road Trip — Worldwide Search Operations

## Scope
This is an implementation and verification checklist, not a claim of rankings, indexed pages, overseas offices, or live traffic.

## International landing pages
The English-language market pages under /india-tours-from/{country} target US, UK, Canada and Australia. They do not claim a physical presence outside India. Do not add alternate-language hreflang links unless translated equivalents exist and are reciprocal. Never copy the same English page to dozens of country URLs with only the country name changed; expand each page with genuinely useful, verified market-specific information before scaling.

## Country and language keyword mapping
See data/internationalMarkets.ts. Keywords are editorial seed phrases, **not** verified search-volume or ranking data. Validate with Search Console, Bing Webmaster Tools and permitted keyword tools before publishing claims.

## Google Business Profile / local records
Owner action required: verify the listing, primary category, official NAP (name, address, phone), opening hours, website, service area, photos and business verification. Do not fabricate additional addresses or international offices. Maintain the same verified NAP on the website and other directories.

## Webmaster records
Verify ownership in Google Search Console and Bing Webmaster Tools. Submit https://www.onlyroadtrip.com/sitemap.xml and inspect coverage. DNS/HTML verification must use tokens obtained from the account, never invented tokens.

## Core Web Vitals
Run scripts/audit-core-web-vitals.mjs with a legitimate CrUX API key. Assess p75 LCP <= 2500ms, CLS <= 0.1 and INP <= 200ms. If CrUX has insufficient data, use PageSpeed Insights / Lighthouse lab data and label it accordingly.

## Broken URLs
Run scripts/audit-public-links.mjs to check sitemap URLs for 4xx/5xx. This is a sitemap-URL audit, not a full internal-link graph crawler. Run against preview before production, respecting server load.

## AI crawler / Cloudflare
robots.ts contains explicit crawler policies. Independently inspect Cloudflare WAF, bot management, logs and live /robots.txt. An allow directive does not override WAF blocking. Respect differences between search and training bots.

## Publishing and quality gate
Run npm run build and all audits. Check live rendered metadata, JSON-LD, canonical, page HTTP status, internal navigation and international pages before approving deployment. Do not publish fake reviews, unverifiable ratings, fabricated availability or unsupported price claims.
