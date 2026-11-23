const assert = require('node:assert/strict');
const base = (process.argv[2] || 'https://www.onlyroadtrip.com').replace(/\/$/, '');
const checks = [
 ['/', ['Fixed Departures', '/packages/kashmir-valley-group-tour', '/packages/jodhpur-jaisalmer-group-tour', 'Chennai', 'Mumbai']],
 ['/corporate-travel', ['Corporate travel booking', 'across India.', 'Delhi NCR', 'Gurugram', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Mumbai', 'Corporate Flight Booking', 'Corporate Hotel Reservations', 'MICE &amp; Corporate Events']],
 ['/fixed-departures', ['Char Dham Yatra 2027', 'varanasi-prayagraj-ayodhya']],
 ['/fixed-departures/char-dham-yatra', ['Char Dham Yatra 2027', 'Departure', 'May', '2027']],
 ['/fixed-departures/varanasi-prayagraj-ayodhya', ['Varanasi', 'Ayodhya', 'Prayagraj', 'Departure']],
 ['/fixed-departures/varanasi-ayodhya-prayagraj-gaya-bodh-gaya', ['Varanasi', 'Bodh', 'Departure']],
 ['/packages/kashmir-valley-group-tour', ['Kashmir Valley Group Tour', '16,000', '17,500', 'Book Now', 'Download Complete Itinerary']],
 ['/book/kashmir-valley-group-tour', ['Kashmir Valley Group Tour', 'Triple', 'Double']],
 ['/book/fixed/varanasi-prayagraj-ayodhya?city=Delhi&departureDate=2026-12-03', ['Varanasi', 'Booking Summary']],
 ['/packages/jodhpur-jaisalmer-group-tour', ['Jodhpur &amp; Jaisalmer', '21 December 2026', '21,000', '23,000', 'Contact Team to Book']],
 ['/sitemap.xml', ['/fixed-departures/char-dham-yatra', '/fixed-departures/varanasi-prayagraj-ayodhya', '/packages/kashmir-valley-group-tour', '/packages/jodhpur-jaisalmer-group-tour']],
];
(async () => {
 for (const [path, content] of checks) {
   const response = await fetch(base + path);
   const html = await response.text();
   assert.equal(response.status, 200, path + ' HTTP status');
   assert.ok(!html.includes('Package Not Found'), path + ' must not render a missing-package page');
   for (const text of content) assert.ok(html.includes(text), path + ' missing: ' + text);
   console.log('PASS ' + path);
 }
 console.log('Approved-release live checks passed: ' + checks.length + ' pages.');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
