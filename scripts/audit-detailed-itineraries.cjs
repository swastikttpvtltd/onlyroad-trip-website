// Run with: node scripts/audit-detailed-itineraries.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, resolveJsonModule: true },
  }).outputText;
  module._compile(output, filename);
};
const { packages } = require(path.join(root, 'data/packages.ts'));
const details = require(path.join(root, 'data/detailedItineraries.json'));
const { formatItineraryDay } = require(path.join(root, 'data/itineraryDay.ts'));
assert.equal(formatItineraryDay('Day 1', 1), 'Day 1');
assert.equal(formatItineraryDay('Day Day 1', 1), 'Day 1');
assert.equal(formatItineraryDay(0, 1), 'Day 0');
assert.equal(formatItineraryDay('Day 0', 1), 'Day 0');
assert.equal(formatItineraryDay(undefined, 3), 'Day 3');
assert.equal(packages.length, 107);
assert.equal(new Set(packages.map(p=>p.slug)).size, 107);
assert.deepEqual(Object.keys(details).sort(), packages.map(p=>p.slug).sort());
let entries = 0, overnightJourneys = 0;
for (const p of packages) {
  assert.ok(p.packageId.startsWith('ORT-'), p.slug);
  const expectedDays = Number(p.duration.match(/(\d+)\s*Days?/i)[1]);
  assert.equal(p.itinerary.filter(d=>d.day !== 'Day 0').length, expectedDays, p.slug);
  const expectedNights = Number(p.duration.match(/(\d+)\s*Nights?/i)[1]);
  assert.equal(p.itinerary.filter(d=>d.day !== 'Day 0' && !d.overnightStay.startsWith('No overnight')).length, expectedNights, p.slug);
  const start = p.itinerary[0].day === 'Day 0' ? 0 : 1;
  for (const [i,d] of p.itinerary.entries()) {
    entries++;
    assert.equal(d.day, `Day ${start+i}`, `${p.slug} day order`);
    assert.equal(d.itineraryId, `${p.packageId}-D${start+i}`);
    assert.ok(d.description.length >= 40, `${p.slug} description`);
    assert.ok(d.meals && d.overnightStay, `${p.slug} meal / night halt`);
    for (const period of ['morning','afternoon','evening']) {
      assert.ok(Array.isArray(d[period]), `${p.slug} ${period}`);
      for (const line of d[period]) assert.ok(!/^(Drive|Sightseeing|Drop|Return|Stay|Dinner|Breakfast)\.?$/.test(line), `${p.slug} bare activity`);
    }
    if(d.day==='Day 0') {
      overnightJourneys++;
      assert.equal(d.morning.length, 0);
      assert.equal(d.afternoon.length, 0);
      assert.ok(d.evening.some(s=>s.includes('8:00 PM')), p.slug);
    }
  }
}
assert.equal(entries, 493);
assert.equal(overnightJourneys, 6);
const kanha = packages.find(p=>p.slug==='kanha-bandhavgarh');
assert.ok(kanha.itinerary[1].attractions.some(s=>s.includes('Kanha National Park')));
assert.ok(kanha.itinerary[3].attractions.some(s=>s.includes('Bandhavgarh National Park')));
assert.ok(kanha.itinerary[1].optionalActivities.some(s=>/additional safari|separately confirmed/.test(s)));
const dwarka = packages.find(p=>p.slug==='dwarka-somnath');
assert.ok(dwarka.itinerary[2].afternoon.some(s=>s.includes('Sudarshan Setu')));
assert.ok(packages.find(p=>p.slug==='gangtok-lachen-lachung').itinerary.some(d=>d.notes.some(s=>s.includes('not permitted for foreign tourists'))));
console.log(`PASS: ${packages.length} packages, ${entries} itinerary entries, ${overnightJourneys} Day 0 journeys; day order, IDs, meals, night halts and conditional activities checked.`);
