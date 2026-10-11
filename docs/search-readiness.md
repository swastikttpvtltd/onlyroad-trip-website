# Search and AI readiness

Target: onlyroad-trip-website, https://www.onlyroadtrip.com. Production deployment requires owner approval.

| Area | Implemented code | Remaining work |
| --- | --- | --- |
| Technical SEO | Canonical metadata, public route registry, transactional noindex, build/type checks | Measure production CPU failures and real-user Core Web Vitals; a pass is not a ranking score |
| On-page | Route-specific titles, descriptions, search intents and existing headings on 105 package landing pages | Search Console evidence for future editorial changes; no hidden keyword stuffing |
| Indexing | Public sitemap and robots rules; IndexNow dry-run/submission safeguards | Owner-approved ownership key deployment and public URL submission; indexing not guaranteed |
| Structured data | TravelAgency, WebSite, package WebPage/TouristTrip, visible FAQs, breadcrumbs, header/footer identity | Validate any future business claims against real content |
| Performance | Optimized existing WebP assets, homepage first hero preload, transport cache | Field measurement and further profiling before claiming a performance percentage |
| Images/video | Package images in sitemap, existing image descriptions/social images | No VideoObject until real public video data is supplied |
| Local SEO | India service area, existing business/contact identity; India-wide pickup planning wording | Owner-managed Business Profile verification, consistent citations and real reviews |
| International | Public English India destination pages accessible internationally | Real translated pages and reciprocal hreflang require chosen languages and translations; do not invent worldwide pickup |
| AEO | Machine-readable published FAQs and itinerary; public read-only browser tools | Monitor actual answer/search citations; no inclusion guarantee |
| GEO/AI/LLM | Search bot access, llms.txt, public structured information and experimental WebMCP | WebMCP needs browser support/origin-trial activation; no claim of universal agent availability |
| Authority/off-page | Existing verified business links retained | Real partnerships, editorial references and approved outreach; cannot be installed with code |
| Measurement/CRO | Existing instrumentation retained; optional Google/Bing verification metadata configuration | Account tokens, access approval and explicit permission for additional tracking/customer-data transmission |

## IndexNow

`node scripts/indexnow.mjs https://www.onlyroadtrip.com/packages/goa-honeymoon` previews public URLs without network requests.

An ownership key and matching public text file are prepared in this branch. This protocol key is a public domain-verification marker, not an account credential. After owner-approved deployment, use `--submit` only with explicit approval to notify participating engines of the selected public URLs. `INDEXNOW_KEY` can override the bundled key if a matching key file is deployed. The script verifies the live key and live public sitemap before contacting IndexNow. Private, transactional, foreign-origin and query-string URLs are rejected. Public URLs submitted to IndexNow are shared among participating search engines. Receipt does not mean indexed.

## Search account verification

Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and/or `NEXT_PUBLIC_BING_SITE_VERIFICATION` only to the owner's actual verification values. They are public ownership markers, not account credentials. No tokens are invented; no account settings changed.

## WebMCP

`public/travel-tools.js` feature-detects `document.modelContext`. It registers two read-only tools: visible package link lookup and current public package summary. No forms, cookies, session data, databases, account lookups, booking confirmation, payments, outbound SDK calls or cross-origin exposure are included. Unsupported browsers render the same website. Output excludes URL query strings; registration is cleaned up on page exit. Browser extension agents remain responsible for user consent and how they use public output. This is progressive enhancement, not a search-ranking mechanism.

## UCP

Not enabled. Google merchant onboarding/eligibility, approved access, valid product feeds and a real order/checkout lifecycle are required. Publishing a fake merchant manifest for travel quotes would misrepresent readiness. Assess eligibility and transaction requirements before any separate implementation.

## Current completion scope

Varanasi/Kashi, Char Dham, Do Dham and Gujarat are excluded from new metadata, schema, browser tools, measurement and IndexNow notifications. All 105 package layouts, prices and itinerary data remain unchanged. Preservation checks compare protected metadata/schema and visible component output against the GitHub baseline.

Homepage client components receive card summaries instead of full itinerary/rate records. Serialized card data is 96.8% smaller; this is not a whole-site speed percentage. English pages use their real existing English URL for language discovery; no translated pages are claimed.

Unprotected unavailable-date enquiries open the existing enquiry page using only package title/date. Enquiry input is validated before database access. Unfinished forms require explicit capture consent outside the excluded routes. Conversion and Web Vitals events stay in the browser by default; optional analytics requires both configuration and explicit consent, and excludes contact details.

CI runs mobile Lighthouse against five isolated production-build pages with third-party trackers blocked. Public production checks found Cloudflare resource-limit failures on some routes; this branch does not claim hosting limits or field performance resolved. Private Search Console, Bing and Business Profile accounts are outside the approved scope. Deployment and IndexNow submission require separate owner approval.

Official references: https://www.indexnow.org/documentation ; https://developer.chrome.com/docs/ai/webmcp/imperative-api ; https://developer.chrome.com/docs/ai/webmcp/secure-tools ; https://developers.google.com/search/docs/specialty/international/localized-versions ; https://developers.google.com/merchant/ucp/guides/overview .
