const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
}).outputText, filename);
const { packages } = require(path.join(root, 'data/packages.ts'));
const { buildPackageFaqs } = require(path.join(root, 'data/packageCustomerCopy.ts'));
const { isGroupTourBookingPaused } = require(path.join(root, 'data/groupTourBookingPause.ts'));
for (const pkg of packages) {
  const faqs = buildPackageFaqs(pkg);
  assert.equal(faqs.length, 15, pkg.slug);
  assert.equal(new Set(faqs.map(faq => faq.question)).size, 15, pkg.slug + ' duplicate questions');
  for (const faq of faqs) assert.ok(faq.answer.trim() && !/undefined|NaN|\[object Object\]/.test(faq.answer), pkg.slug);
  const price = faqs.find(faq => faq.question.startsWith('What is the price basis')).answer;
  assert.ok(price.includes('INR ' + pkg.price.toLocaleString('en-IN')), pkg.slug + ' current rate');
  for (const rate of pkg.groupRates.sharingRates) {
    assert.ok(faqs[6].answer.includes(rate.type + ': INR ' + rate.price.toLocaleString('en-IN')), pkg.slug + ' sharing rate');
  }
  assert.equal(faqs[8].answer.includes('Online booking is currently paused'), isGroupTourBookingPaused(pkg.slug), pkg.slug + ' booking state');
  if (!/yatra|kedarnath|badrinath|char.dham|vaishno|amarnath/i.test(pkg.slug + ' ' + pkg.title)) {
    assert.ok(!/horse back|Doli|Helicopter/i.test(price), pkg.slug + ' irrelevant trek charges');
  }
}
// Public policy summaries must fail validation when the underlying policy changes.
// These are source-drift checks, not changes to cancellation/refund business rules.
const policyText = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const cancellation = policyText('app/cancellation-policy/page.tsx');
for (const [period, charge] of [
  ['30 days or more before departure', '10%'], ['15–29 days before departure', '25%'],
  ['07–14 days before departure', '50%'], ['03–06 days before departure', '75%'], ['Less than 72 hours or No Show', '100%']
]) assert.ok(cancellation.includes(period + ' ' + charge + ' of total booking amount'), 'Policy summary needs review: ' + period);
assert.match(cancellation, /above charges are indicative/);
const refund = policyText('app/refund-policy/page.tsx');
assert.match(refund, /within 24–48 hours of approval/);
assert.match(refund, /info@onlyroadtrip.com/);
const privateWeekend = { title: 'Private weekend', destination: 'Test City', duration: '2 Nights / 3 Days', category: 'Weekend & Leisure', quickFacts: { transport: 'Private AC Vehicle' } };
const fallback = buildPackageFaqs(privateWeekend);
assert.match(fallback[4].answer, /for your booked party/);
assert.ok(!fallback[4].answer.includes('shared with tour participants'));
assert.ok(!fallback[7].answer.includes('INR 0'));
assert.ok(!fallback[2].answer.includes('Hari Vilaas'));
console.log('PASS: ' + packages.length + ' packages; live-data FAQ prices/sharing, pause state, policy drift, route relevance and missing-data/private-weekend cases.');
