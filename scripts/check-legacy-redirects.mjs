import assert from 'node:assert/strict';
const base=process.env.PREVIEW_ORIGIN||'http://127.0.0.1:3016';
const redirects=new Map([
['/door-to-door-travelPosted','/door-to-door-travel'],
['/char-dham-yatra-package','/packages/char-dham-yatra'],
['/kashi-yatra-package','/packages/varanasi-kashi'],
['/kedarnath-yatra-package','/packages/kedarnath-yatra'],
['/jyotirlinga-yatra','/packages?theme=spiritual&q=jyotirlinga'],
]);
for(const [source,target] of redirects){
 const response=await fetch(base+source,{redirect:'manual',signal:AbortSignal.timeout(30000)});
 assert.equal(response.status,308,source+' permanent redirect');
 const dest=new URL(response.headers.get('location'),base);
 assert.equal(dest.pathname+dest.search,target,source+' correct replacement');
 const page=await fetch(dest,{signal:AbortSignal.timeout(30000)});
 assert.equal(page.status,200,target+' destination available');
 const html=await page.text(); assert.ok(/<h1\b/i.test(html),target+' destination has visible page heading');
 console.log('PASS '+source+' -> '+target+' (308 then 200)');
}
const query=await fetch(base+'/door-to-door-travelPosted?fbclid=public-test',{redirect:'manual'});
assert.equal(new URL(query.headers.get('location'),base).searchParams.get('fbclid'),'public-test');
console.log('PASS existing query parameters survive redirect');
