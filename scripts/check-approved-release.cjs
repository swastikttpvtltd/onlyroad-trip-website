const fs = require('node:fs');
const assert = require('node:assert/strict');
function source(file) { assert.ok(fs.existsSync(file), 'Missing approved route or component: ' + file); return fs.readFileSync(file, 'utf8'); }
const home = source('app/page.tsx');
assert.match(home, /<FixedDeparturesShowcase\s*\/>/, 'Homepage must retain Fixed Departures');
for (const file of ['app/fixed-departures/page.tsx', 'app/fixed-departures/[slug]/page.tsx', 'app/book/fixed/[slug]/page.tsx', 'app/packages/kashmir-valley-group-tour/page.tsx', 'app/book/kashmir-valley-group-tour/page.tsx', 'app/packages/jodhpur-jaisalmer-group-tour/page.tsx']) source(file);
const catalogue = source('data/packages.ts');
assert.match(catalogue, /\.\.\.kashmirGroupTour/, 'Kashmir group tour must remain in the catalogue');
assert.match(catalogue, /slug: jodhpurTour.slug/, 'Jodhpur group tour must remain in the catalogue');
const corporate = source('app/corporate-travel/page.tsx');
assert.match(corporate, /across India\./, 'Corporate heading must remain across India');
for (const city of ['Delhi NCR', 'Gurugram', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Mumbai']) assert.ok(corporate.includes(city), 'Missing corporate city: ' + city);
const itinerary = source('data/jodhpurJaisalmerGroupTour.ts');
assert.match(itinerary, /departureDates: \["2026-12-21"\]/, 'Approved December departure is 21 December');
assert.match(itinerary, /Triple Sharing", price: 21000/, 'Preserve approved Jodhpur triple price');
assert.match(itinerary, /Double Sharing", price: 23000/, 'Preserve approved Jodhpur double price');
console.log('Approved-release source guard passed.');
