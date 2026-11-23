# Approved production restoration — 23 November 2026

Source: release/jodhpur-jaisalmer-group-20261123. Base: 07125fa plus the approved Jodhpur release and this restoration.

Preserve: homepage Fixed Departures, all seven fixed-departure routes and their booking flow; Kashmir Valley Group Tour (Triple INR 16,000, Double INR 17,500); Jodhpur–Jaisalmer (Triple INR 21,000, Double INR 23,000, offline only); Corporate Travel across India and Delhi NCR, Gurugram, Bengaluru, Chennai, Hyderabad, Pune and Mumbai coverage. December Jodhpur departure: 21 December 2026; first and third Thursdays from January 2027.

Before deployment run node scripts/check-approved-release.cjs and build. Run node scripts/check-approved-release-live.cjs <candidate-base-url> before publishing and without an argument after publishing. The old feature/hotel-cards-preview snapshot 07125fa omits the restored features and must not replace this release.

Windows: the repository has both public/LLMS.txt and public/llms.txt. Preserve both assets with their original case when preparing Cloudflare assets. The local deployment uses a case-sensitive generated assets-case directory; the committed Cloudflare configuration keeps the portable .open-next/assets directory.
