const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
}).outputText, filename);
const { packages } = require(path.join(root, "data/packages.ts"));
const pricing = require(path.join(root, "data/packagePricing.ts"));
const { GROUP_SIZES, rateForTravellerCount } = require(path.join(root, "data/groupRateMatrix.ts"));
const { isGroupTourPackage } = require(path.join(root, "data/groupTourPricing.ts"));
let checked = 0;
for (const pkg of packages) {
  const rates = pkg.groupRates;
  const sharing = rates.sharingRates;
  if (!isGroupTourPackage(pkg)) {
    assert.deepEqual(Object.keys(rates).filter(key => /^\d+$/.test(key)), ["2"], pkg.slug + ": only two-person pricing");
    assert.deepEqual(sharing, [], pkg.slug + ": no extra sharing prices");
    assert.equal(pkg.price, rates[2], pkg.slug + ": per-person display rate");
    assert(Number.isFinite(rates[2]) && rates[2] > 0);
    assert.equal(rateForTravellerCount(rates, 4), 0);
    checked++;
    continue;
  }

  assert.equal(Object.keys(rates).filter(key => /^\d+$/.test(key)).length, 50, pkg.slug);
  const nights = Number(pkg.duration.match(/(\d+)\s*Nights?/i)?.[1] ?? 0);
  for (const pax of GROUP_SIZES) {
    const price = rates[pax];
    assert(Number.isFinite(price) && price > 0, pkg.slug + ": " + pax);
    assert.equal(rateForTravellerCount(rates, pax), price);
    assert(price >= Math.ceil(rates[2] * (1 - pricing.MAX_GROUP_DISCOUNT)), pkg.slug + ": discount limit");
    if (sharing.length) {
      assert.equal(price, Math.max(...sharing.map(rate => rate.price)), pkg.slug + ": fixed double sharing");
    } else {
      const baseCost = pricing.estimatedCostFor(pkg.state, pkg.title, nights, 2);
      const allowance = Math.max(0, rates[2] / 1.05 * .82 - baseCost);
      const cost = pricing.estimatedCostFor(pkg.state, pkg.title, nights, pax) + allowance;
      const margin = 1 - cost / (price / 1.05);
      assert(margin >= .17995, pkg.slug + ": estimated margin for " + pax);
    }
    checked++;
  }
  assert.equal(rateForTravellerCount(rates, 1), rates[2]);
  assert.equal(rateForTravellerCount(rates, 7), rates[6]);
  assert.equal(rateForTravellerCount(rates, 99), rates[98]);
  assert.equal(rateForTravellerCount(rates, 101), 0);
  assert.equal(rateForTravellerCount(rates, 2.5), 0);
}
assert.equal(pricing.TARGET_MARGIN, .18);
assert(pricing.transportFactorFor(100) >= 3 * pricing.transportFactorFor(30), "Large groups require more transport");
assert.equal(packages.find(pkg => pkg.slug === "varanasi-prayagraj-ayodhya").groupRates[2], 22000);
assert.equal(packages.find(pkg => pkg.slug === "varanasi-ayodhya-prayagraj-gaya-bodh-gaya").groupRates[2], 27000);
console.log("PASS: " + packages.length + " packages, " + checked + " rates; booking lookup, discount limit, margin floor and vehicle scaling.");
