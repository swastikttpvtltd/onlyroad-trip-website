import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'public/travel-tools.js'), 'utf8');
const registered = [];
const anchors = [
  { href: '/packages/goa-weekend-escape?customer=private', text: 'Goa Weekend Escape' },
  { href: '/book/goa-weekend-escape', text: 'Booking form' },
  { href: 'https://external.example/packages/goa-weekend-escape', text: 'External' },
  { href: '/packages/goa-weekend-escape', text: 'Goa Weekend Escape' },
].map(({ href, text }) => ({ getClientRects: () => [1], closest: () => null, getAttribute: () => href, textContent: text }));
let handler;
const document = {
  modelContext: { registerTool: (tool, options) => registered.push({ tool, options }) },
  querySelectorAll: selector => selector === 'a[href]' ? anchors : selector === 'section' ? [{ textContent: 'Package ID123Duration10 Nights / 11 DaysDestinationIndiaBest TimeSummer' }] : [{ textContent: JSON.stringify({ '@type': 'TouristTrip', name: 'Goa Weekend Escape', description: 'Published itinerary' }) }],
};
const sandbox = { document, location: { href: 'https://www.onlyroadtrip.com/packages/goa-weekend-escape?private=1', origin: 'https://www.onlyroadtrip.com', pathname: '/packages/goa-weekend-escape' }, URL, AbortController, addEventListener: (_, fn) => handler = fn };
vm.runInNewContext(source, sandbox);
assert.equal(registered.length, 2);
(async () => {
  for (const { tool } of registered) assert.equal(tool.annotations.readOnlyHint, true);
  const search = registered[0].tool;
  const results = JSON.parse(await search.execute({ query: 'Goa' }));
  assert.equal(results.packages.length, 1);
  assert.equal(results.packages[0].url, 'https://www.onlyroadtrip.com/packages/goa-weekend-escape');
  assert.equal(await search.execute({ query: 'a'.repeat(101) }), 'Invalid query');
  const detail = JSON.parse(await registered[1].tool.execute({}));
  assert.equal(detail.duration, '10 Nights / 11 Days');
  assert.ok(!JSON.stringify(detail).includes('private'));
  sandbox.location.pathname = '/payment';
  assert.equal(await registered[1].tool.execute({}), 'Open a package page first');
  for (const pathname of ['/packages/varanasi-prayagraj-ayodhya','/packages/char-dham-yatra','/packages/do-dham-yatra','/packages/gujarat-grand-tour','/packages/dwarka-somnath']) {
    const calls=[];
    vm.runInNewContext(source,{...sandbox,location:{...sandbox.location,pathname},document:{modelContext:{registerTool:tool=>calls.push(tool)}}});
    assert.equal(calls.length,0,pathname);
  }
  handler();
  assert.ok(registered.every(item => item.options.signal.aborted));
  vm.runInNewContext(source, { document: {}, location: sandbox.location });
  vm.runInNewContext(source, { ...sandbox, document: { modelContext: { registerTool: () => { throw new Error('unsupported'); } } } });
  const dryRun = execFileSync(process.execPath, [path.join(root, 'scripts/indexnow.mjs'), 'https://www.onlyroadtrip.com/packages/goa-weekend-escape'], { encoding: 'utf8' });
  assert.equal(JSON.parse(dryRun).mode, 'dry-run');
  for (const url of ['https://external.example/', 'https://www.onlyroadtrip.com/book/test', 'https://www.onlyroadtrip.com/payment?email=x', 'https://www.onlyroadtrip.com/packages/test?email=x', 'https://www.onlyroadtrip.com/packages/gujarat-grand-tour', 'https://www.onlyroadtrip.com/packages/char-dham-yatra']) {
    assert.throws(() => execFileSync(process.execPath, [path.join(root, 'scripts/indexnow.mjs'), url], { stdio: 'pipe' }));
  }
  console.log('PASS: public-only tools, unsupported browsers, cleanup, query redaction and IndexNow submission safeguards');
})().catch(error => { console.error(error); process.exitCode = 1; });
