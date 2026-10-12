# Customer portal feature — staging handoff

Branch: `feature/customer-portal`. Route: `/customer`. Production deployment, production migrations and live refunds are not performed by this change.

The portal uses the existing website's Geist font, logo, Header/Footer, navy/blue/cyan palette and card style. Customer copy describes the task directly. Preview fixtures are fictional, labelled demo, kept in memory and never sent to a gateway or email provider.

## Implemented and pending

| Area | Delivered | Required before live use |
|---|---|---|
| Login | Email OTP handler, 5-minute challenges, 5 attempt limit, atomic single consumption, hashed 24-hour sessions, Secure/HttpOnly/SameSite cookie, email/IP throttling | Staging D1, verified sender domain, Resend key and independent integration test |
| Google/mobile | Visible, disabled options labelled setup pending | Google OAuth client + callback allowlist + state/PKCE/verified identity implementation; selected SMS/Verify provider + Indian sender/DLT requirements as applicable. These methods are not implemented |
| Customer account | Profile, saved traveller addition, own bookings/payments/documents/cancellation status | Verified booking import/linking; no email or booking-ID-based ownership claims from the browser |
| Documents | Released documents downloaded through owner-checked authenticated route from private R2 | Document generation/upload/release by trusted operations; background delivery emails are not implemented. Demo downloads are text samples, not real vouchers or invoices |
| Payments | Read-only reconciled ledger | Server-priced order creation and durable verified Cashfree payment ingestion; no new checkout/refund API is enabled |
| Cancellation | Booking-bound immutable policy version, integer-paise estimate, paid amount cap, missing-data blocking, written request, acknowledgement, admin approval/rejection, audit events | Approved exact policy and deductions for each booking; operations approval of portal as a written-request channel |
| Admin | Role-checked queue and review, stale-state guards, own-request review blocked | Trusted admin provisioning and operator access review; approval does not cancel a booking or transfer money |

## Existing repository findings

- `app/api/payment-link/route.ts` accepts customer/amount fields from the browser and creates Cashfree links with SMS/email notifications; gateway defaults to production. The new portal never invokes this route.
- Cashfree callback retrieves gateway information. The webhook verifies an HMAC signature but currently logs/acknowledges the event without persisting a customer booking/payment ledger. It has no durable idempotency/reconciliation pipeline.
- No D1 binding, customer schema, existing identity/session layer or customer booking persistence was found in the checked `main` commit. Dashboard-managed Cloudflare bindings may exist externally; their credentials/configuration were not available or inspected.
- Existing `next.config.ts` skips build type errors and CI uses `tsc --noCheck`; these are not reliable type checks. Real `tsc --noEmit` reports six existing `VillageCandidate.slug` errors in `app/village-immersion/[region]/page.tsx`.
- Published cancellation percentages are **indicative**, with supplier-specific overrides. The general page does not establish the contract snapshot for a particular booking. No live policy is seeded by this change.

## Staging setup

1. Use a separate Cloudflare Worker, a new staging D1 database and a private staging R2 bucket. Do not use the production Worker name, self-reference, domain, D1 database or payment credentials. Disable any branch auto-deployment that targets production.
2. Copy the existing OpenNext deployment configuration into a **staging-only configuration**, change Worker name and `WORKER_SELF_REFERENCE.service`, and add the `PORTAL_DB` D1 binding and `PORTAL_DOCUMENTS` R2 binding. This PR intentionally leaves the existing production `wrangler.jsonc` unchanged and contains no deployment workflow.
3. Apply `migrations/0001_customer_portal.sql` only to that new staging database. It contains no demo records. Use synthetic data during initial staging checks.
4. Set `PORTAL_ENABLED=true` and `PORTAL_ORIGIN` to the exact HTTPS staging origin. Set secrets `PORTAL_OTP_SECRET` (random, at least 32 characters), `PORTAL_EMAIL_API_KEY` and `PORTAL_EMAIL_FROM` (verified sender). Never commit these values. Capabilities remain disabled without configuration; there is no demo authentication bypass.
5. Verified email login creates a customer account with the **customer** role. Assign the admin role only through trusted database operations, never through a request field. Every new account starts with no bookings.
6. Trusted ingestion must link bookings to customer IDs using independently verified identity. Store money in integer paise and timestamps as ISO 8601 with timezone. `paid_paise` must equal the sum of server-verified `paid` ledger rows. Never treat a browser redirect, localStorage or a client amount as payment confirmation.
7. Create a policy snapshot with `{ "version": "actual-approved-version", "approved": true, "bands": [{ "minimumHours": 0, "chargeBasisPoints": 10000 }] }` **only with the real approved contractual schedule**, not this illustrative shape. `10000` means 100%. Thresholds must be unique, nonnegative and include zero. Approved rows are immutable; revise with a new version. The booking's bound version cannot be swapped after assignment.
8. `supplier_paise` must be NULL until all applicable extra deductions (supplier costs, non-refundable taxes/gateway/service amounts where the approved contract permits them) are verified and aggregated without double counting the policy charge. Set zero only after verification. An estimate requires team acknowledgement and reconciled payments. The effective time uses acknowledgement as stated on the current published general page; operations must confirm its applicability to each booking.
9. Upload itinerary/voucher/receipt PDFs to private R2. Insert document metadata under the owning booking; set `released_at` only after checks. No public object URL is sent to the browser. Receipts must reflect verified payment events. Production generation and notification delivery need a durable outbox/retry pipeline before being enabled.
10. Exercise real staging email delivery, session expiry/logout, two-customer isolation, private R2 downloads, provider failure, replay/concurrency and admin review on Cloudflare. Local SQLite-backed tests do not replace D1/R2/Worker integration testing. Add cleanup/retention jobs for expired sessions, OTPs and rate-limit rows, operational monitoring, backups and incident procedures before production.

## Documents and communication setup / cost

The portal's Documents section is the download location. The team must generate and release an itinerary, release supplier-confirmed vouchers, and issue receipts from verified payments. Email should notify the customer to sign in and download, keeping private documents behind authentication. WhatsApp/SMS document delivery is not enabled.

Pricing checked 12 Oct 2026 (USD, before tax/currency conversion; usage and provider plans may change):

- [Resend](https://resend.com/pricing): free 3,000 transactional emails/month, limited to 100/day; Pro $20/month for 50,000 emails, extra $0.90/1,000. OTP and later document notifications share this allowance. Endpoint format verified against [Resend Send Email documentation](https://resend.com/docs/api-reference/emails/send-email).
- [Cloudflare D1](https://developers.cloudflare.com/d1/platform/pricing/): Free plan includes 5 million rows read/day, 100,000 rows written/day, 5 GB total storage. Worker hosting, R2 storage/download operations and any existing account charges are additional and must be checked against actual volume.
- Mobile OTP/SMS/WhatsApp prices depend on the selected provider, destination and registered sender/template setup; no made-up price or budget commitment is included. Cashfree charges remain governed by the merchant agreement. No provider was purchased or activated.

## Validation and preview

`node scripts/test-customer-portal.mjs` uses the actual SQL migration in isolated in-memory SQLite and the actual handler/policy source transpiled for testing. It checks policy boundaries, missing inputs, refund caps, policy immutability, unauthenticated/foreign-customer access, admin roles, CSRF, duplicate requests, review prerequisites, verified-payment gating, OTP replay/attempt limits, secure cookies and unconfigured mode. It makes no provider calls.

Build: `npm run build` (existing build skips type validation, so report the separate real TypeScript result). Scoped lint: `npx eslint portal components/customer components/SiteChrome.tsx app/customer app/api/customer scripts/test-customer-portal.mjs`.
The new PR-only workflow also runs a real focused portal type check (`npx tsc --noEmit --project tsconfig.customer-portal.json`), isolated handler tests and scoped lint. It has no deploy step or production secrets.

Local preview: `http://127.0.0.1:3100/customer`, while the local preview process runs. This is a local URL, not a public hosted preview. Screenshots are supplied in the handoff. No production deploy or merge is authorized by this PR; obtain the user's approval before either production deployment or applying migrations to production.

Direct visits to `/customer` skip marketing GTM initialization and its noscript fallback. If the visitor navigates from a marketing page using client-side navigation, already-loaded third-party tags may persist. Before production, enforce portal exclusions in GTM and use full-page entry to the portal (or a separate portal host) to guarantee isolation from marketing scripts. Do not send profile, booking or payment details to analytics.
