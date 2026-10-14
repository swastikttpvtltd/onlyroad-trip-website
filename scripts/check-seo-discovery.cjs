const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
globalThis.AsyncLocalStorage=require('node:async_hooks').AsyncLocalStorage;
const root=path.resolve(__dirname,'..'),resolve=Module._resolveFilename;
Module._resolveFilename=function(name,...args){return resolve.call(this,name.startsWith('@/')?path.join(root,name.slice(2)):name,...args)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);
const {packages}=require('../data/packages.ts');
const {destinationGuides}=require('../data/destinationGuides.ts');
const {getDestinationPackages}=require('../lib/destinationPackages.ts');
const {canonicalHostRedirect}=require('../lib/seoRedirects.ts');
const {currencyFaq,currencyGuideFaqs}=require('../data/currencyContent.ts');
const {buildPackageFaqs}=require('../data/packageCustomerCopy.ts');
const {getRedirectUrl,unstable_getResponseFromNextConfig}=require('next/experimental/testing/server');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const DestinationLandingPage=require('../components/DestinationLandingPage.tsx').default;
const directory=require('../components/DestinationDirectory.tsx').default;
const sitemap=require('../app/sitemap.ts').default();
const urls=new Set(sitemap.map(x=>x.url));
for(const guide of destinationGuides){
 assert(urls.has('https://www.onlyroadtrip.com'+guide.path),guide.path+' sitemap inclusion');
 const matches=getDestinationPackages(packages,guide);
 const html=renderToStaticMarkup(React.createElement(DestinationLandingPage,guide));
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
 const list=schemas[0]['@graph'].find(x=>x['@type']==='ItemList');
 assert.equal(list.numberOfItems,matches.length);
 assert.equal(list.itemListElement.length,matches.length);
 for(const pkg of matches)assert(html.includes('/packages/'+pkg.slug),'All matching routes remain discoverable');
 if(!matches.length){assert(html.includes('not currently published'));assert(!html.includes('/packages/dwarka-somnath'),'No unrelated fallback catalogue');}
}
const goa=getDestinationPackages(packages,destinationGuides.find(g=>g.title==='Goa'));
assert(goa.length>0);assert(goa.every(p=>p.state==='Goa'));
for(const title of ['Odisha','Lakshadweep'])assert.equal(getDestinationPackages(packages,destinationGuides.find(g=>g.title===title)).length,0,title+' must not show Shivpuri/beach matches');
const kedarnath=getDestinationPackages(packages,destinationGuides.find(g=>g.title==='Kedarnath'));
assert(kedarnath.every(p=>/kedarnath/i.test(p.title+' '+p.destination)));assert(!kedarnath.some(p=>p.slug==='corporate-mussoorie-retreat'));
const hub=renderToStaticMarkup(React.createElement(directory));
for(const guide of destinationGuides)assert(hub.includes(guide.path));
assert(hub.includes('/travel-agent-in-noida')&&hub.includes('/travel-agent-in-gurgaon'));
assert(urls.has('https://www.onlyroadtrip.com/pricing-and-currencies'));
assert(!sitemap.some(x=>/[?&](currency|language)=/.test(x.url)));
for(const pkg of packages)assert(buildPackageFaqs(pkg).some(faq=>faq.question===currencyFaq.question));
const currencyHtml=renderToStaticMarkup(React.createElement(require('../app/pricing-and-currencies/page.tsx').default));
for(const faq of currencyGuideFaqs)assert(currencyHtml.includes(faq.question));
(async()=>{
 const nextConfig={redirects:async()=>[canonicalHostRedirect]};
 for(const route of ['/','/destinations/uttarakhand','/packages/corporate-mussoorie-retreat','/pricing-and-currencies','/packages?state=Goa&currency=USD','/sitemap.xml']){
   const response=await unstable_getResponseFromNextConfig({url:'https://onlyroadtrip.com'+route,nextConfig});
   assert.equal(response.status,308,route);assert.equal(getRedirectUrl(response),'https://www.onlyroadtrip.com'+route,route+' query preserved');
 }
 for(const route of ['/api/partial-lead','/api/currency-rates','/api/payment/cashfree/callback','/api/payment/payu/callback','/book/test','/payment','/payment/success','/payment-cancelled','/_next/image','/admin'])assert.equal((await unstable_getResponseFromNextConfig({url:'https://onlyroadtrip.com'+route,nextConfig})).status,200,route+' origin preserved');
 for(const host of ['https://www.onlyroadtrip.com','http://127.0.0.1:3000'])assert.equal((await unstable_getResponseFromNextConfig({url:host+'/packages',nextConfig})).status,200,'No redirect loop or preview redirect');
 console.log('PASS geographic relevance, all regional/city discovery links, truthful empty states, currency FAQ/sitemap consistency, public canonical redirects and unchanged lead/payment origins');
})().catch(error=>{console.error(error);process.exitCode=1});
