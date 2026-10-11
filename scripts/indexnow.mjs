import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const submit = args.includes('--submit');
const key = process.env.INDEXNOW_KEY || JSON.parse(fs.readFileSync(path.join(root, 'scripts/indexnow-config.json'), 'utf8')).key;
const urls = args.filter(arg => !arg.startsWith('--'));
if (!urls.length) throw new Error('Provide changed public canonical URLs. Dry run is the default.');
for (const value of urls) {
  const url = new URL(value);
  if (url.origin !== 'https://www.onlyroadtrip.com' || url.search || url.hash || /\/(api|admin|book|payment|google-ads)(\/|-|$)/.test(url.pathname)) throw new Error('Only public canonical URLs without query strings are allowed.');
}
if (urls.length > 10000) throw new Error('IndexNow accepts at most 10,000 URLs per batch.');
const payload = { host: 'www.onlyroadtrip.com', key, urlList: [...new Set(urls)] };
if (!submit) {
  console.log(JSON.stringify({ mode: 'dry-run', urls: payload.urlList, ready: /^[a-zA-Z0-9-]{8,128}$/.test(key), note: 'No network request was sent. --submit requires owner approval and a deployed verification key.' }, null, 2));
} else {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Set a valid INDEXNOW_KEY.');
  const keyFile = path.join(root, 'public', key + '.txt');
  if (!fs.existsSync(keyFile) || fs.readFileSync(keyFile, 'utf8').trim() !== key) throw new Error('Create and deploy the public ownership key file before submitting.');
  const verification = await fetch('https://www.onlyroadtrip.com/' + key + '.txt', { signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (!verification.ok || (await verification.text()).trim() !== key) throw new Error('Live ownership verification failed; no URLs submitted.');
  const sitemap = await fetch('https://www.onlyroadtrip.com/sitemap.xml', { signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (!sitemap.ok) throw new Error('Cannot verify public sitemap; no URLs submitted.');
  const publicUrls = new Set([...((await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g))].map(match => match[1].replace(/&amp;/g, '&')));
  if (payload.urlList.some(url => !publicUrls.has(url))) throw new Error('Every submitted URL must appear in the live public sitemap.');
  const response = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (![200, 202].includes(response.status)) throw new Error('IndexNow rejected submission: ' + response.status);
  console.log('IndexNow received the URLs (' + response.status + '); crawling and indexing are not guaranteed.');
}
