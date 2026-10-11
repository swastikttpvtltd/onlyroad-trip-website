const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'public/travel-tools.js'), 'utf8');
const registered = [];
const anchors = [
  { href: '/packages/char-dham-yatra?customer=private', text: 'Char Dham' },
  { href: '/book/char-dham-yatra', text: 'Booking form' },
  { href: 'https://external.example/packages/char-dham-yatra', text: 'External' },
  { href: '/packages/char-dham-yatra', text: 'Char Dham Yatra' },
].map(({ href, text }) => ({ getClientRects: () => [1], closest: () => null, getAttribute: () => href, textContent: text }));
let handler;
const document = {
  modelContext: { registerTool: (tool, options) => registered.push({ tool, options }) },
  querySelectorAll: selector => selector === 'a[href]' ? anchors : selector === 'section' ? [{ textContent: 'Package ID123Duration10 Nights / 11 DaysDestinationIndiaBest TimeSummer' }] : [{ textContent: JSON.stringify({ '@type': 'TouristTrip', name: 'Char Dham', description: 'Published itinerary' }) }],
};
const sandbox = { document, location: { href: 'https://www.onlyroadtrip.com/packages/char-dham-yatra?private=1', origin: 'https://www.onlyroadtrip.com', pathname: '/packages/char-dham-yatra' }, URL, AbortController, addEventListener: (_, fn) => handler = fn };
vm.runInNewContext(source, sandbox);
assert.equal(registered.length, 2);
(async () => {
  for (const { tool } of registered) assert.equal(tool.annotations.readOnlyHint, true);
  const search = registered[0].tool;
  const results = JSON.parse(await search.execute({ query: 'Char' }));
  assert.equal(results.packages.length, 1);
  assert.equal(results.packages[0].url, 'https://www.onlyroadtrip.com/packages/char-dham-yatra');
  assert.equal(await search.execute({ query: 'a'.repeat(101) }), 'Invalid query');
  const detail = JSON.parse(await registered[1].tool.execute({}));
  assert.equal(detail.duration, '10 Nights / 11 Days');
  assert.ok(!JSON.stringify(detail).includes('private'));
  sandbox.location.pathname = '/payment';
  assert.equal(await registered[1].tool.execute({}), 'Open a package page first');
  handler();
  assert.ok(registered.every(item => item.options.signal.aborted));
  vm.runInNewContext(source, { document: {} });
  vm.runInNewContext(source, { ...sandbox, document: { modelContext: { registerTool: () => { throw new Error('unsupported'); } } } });
  const dryRun = execFileSync(process.execPath, [path.join(root, 'scripts/indexnow.mjs'), 'https://www.onlyroadtrip.com/packages/char-dham-yatra'], { encoding: 'utf8' });
  assert.equal(JSON.parse(dryRun).mode, 'dry-run');
  for (const url of ['https://external.example/', 'https://www.onlyroadtrip.com/book/test', 'https://www.onlyroadtrip.com/payment?email=x', 'https://www.onlyroadtrip.com/packages/test?email=x']) {
    assert.throws(() => execFileSync(process.execPath, [path.join(root, 'scripts/indexnow.mjs'), url], { stdio: 'pipe' }));
  }
  console.log('PASS: public-only tools, unsupported browsers, cleanup, query redaction and IndexNow submission safeguards');
})().catch(error => { console.error(error); process.exitCode = 1; });
