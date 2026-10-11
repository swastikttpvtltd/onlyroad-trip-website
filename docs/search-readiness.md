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

`node scripts/indexnow.mjs https://www.onlyroadtrip.com/packages/char-dham-yatra` previews public URLs without network requests.

After owner approval, create an 8–128 character alphanumeric/dash ownership key, place its exact value in `public/KEY.txt`, deploy the key file, then set `INDEXNOW_KEY` and use `--submit`. The script verifies the live key and live public sitemap before contacting IndexNow. Private, transactional, foreign-origin and query-string URLs are rejected. Public URLs submitted to IndexNow are shared among participating search engines. Receipt does not mean indexed.

## Search account verification

Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and/or `NEXT_PUBLIC_BING_SITE_VERIFICATION` only to the owner's actual verification values. They are public ownership markers, not account credentials. No tokens are invented; no account settings changed.

## WebMCP

`public/travel-tools.js` feature-detects `document.modelContext`. It registers two read-only tools: visible package link lookup and current public package summary. No forms, cookies, session data, databases, account lookups, booking confirmation, payments, outbound SDK calls or cross-origin exposure are included. Unsupported browsers render the same website. Output excludes URL query strings; registration is cleaned up on page exit. Browser extension agents remain responsible for user consent and how they use public output. This is progressive enhancement, not a search-ranking mechanism.

## UCP

Not enabled. Google merchant onboarding/eligibility, approved access, valid product feeds and a real order/checkout lifecycle are required. Publishing a fake merchant manifest for travel quotes would misrepresent readiness. Assess eligibility and transaction requirements before any separate implementation.

Official references: https://www.indexnow.org/documentation ; https://developer.chrome.com/docs/ai/webmcp/imperative-api ; https://developer.chrome.com/docs/ai/webmcp/secure-tools ; https://developers.google.com/search/docs/specialty/international/localized-versions ; https://developers.google.com/merchant/ucp/guides/overview .
