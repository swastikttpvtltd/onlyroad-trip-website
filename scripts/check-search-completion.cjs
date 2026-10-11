const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(name,...args) { return resolve.call(this,name.startsWith('@/')?path.join(root,name.slice(2)):name,...args); };
for (const extension of ['.ts','.tsx']) require.extensions[extension]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true,jsx:ts.JsxEmit.ReactJSX}}).outputText,filename);
const {packages} = require(path.join(root,'data/packages.ts'));
const {packageCardSummary} = require(path.join(root,'lib/packageCardSummary.ts'));
const {isExcludedSeoPath} = require(path.join(root,'lib/seoWorkScope.ts'));
const {validateEnquiry} = require(path.join(root,'lib/enquiryValidation.ts'));
const {conversionPayload} = require(path.join(root,'lib/conversionEvents.ts'));
const {enquiryRoute} = require(path.join(root,'lib/enquiryRoute.ts'));
const cards = packages.map(packageCardSummary);
for(let i=0;i<packages.length;i++) for(const key of Object.keys(cards[i])) assert.deepEqual(cards[i][key],packages[i][key],packages[i].slug+' '+key);
assert.ok(Buffer.byteLength(JSON.stringify(cards)) < Buffer.byteLength(JSON.stringify(packages)) * 0.15,'card payload should exclude itinerary and rate matrices');
for(const page of ['/packages/varanasi-prayagraj-ayodhya','/packages/char-dham-yatra','/packages/do-dham-yatra','/packages/gujarat-grand-tour','/destinations/gujarat']) assert.ok(isExcludedSeoPath(page));
assert.equal(isExcludedSeoPath('/packages/goa-honeymoon'),false);
const valid={fullName:' Test Traveller ',mobile:'+919999999999',email:'',destination:'Goa',travelDate:'2026-12-01',travellers:2,travelType:'Family',message:''};
assert.equal(validateEnquiry(valid).fullName,'Test Traveller');
assert.equal(validateEnquiry(valid).message,'','special request remains optional');
for(const changes of [{travellers:0},{travellers:2.4},{mobile:'bad'},{email:'not-email'},{travelDate:'2026-02-30'},{travelDate:'nonsense'},{fullName:{}},{message:'x'.repeat(3001)}]) assert.throws(()=>validateEnquiry({...valid,...changes}));
assert.deepEqual(conversionPayload('generate_lead','travel-enquiry'),{event:'generate_lead',form_id:'travel-enquiry'});
assert.throws(()=>conversionPayload('generate_lead','email@example.com'));
const enquiry=new URL(enquiryRoute('Goa Honeymoon','2026-12-01'),'https://www.onlyroadtrip.com');
assert.equal(enquiry.pathname,'/plan-your-trip');
assert.equal(enquiry.searchParams.get('destination'),'Goa Honeymoon');
assert.deepEqual([...enquiry.searchParams.keys()],['destination','travelDate']);
const bookingSource=fs.readFileSync(path.join(root,'components/BookingForm.tsx'),'utf8');
const submitSource=bookingSource.slice(bookingSource.indexOf('async function submit'),bookingSource.indexOf('\nreturn <section'));
for(const pathname of ['/book/goa-honeymoon','/book/varanasi-prayagraj-ayodhya','/book/char-dham-yatra','/book/do-dham-yatra','/book/dwarka-somnath']) {
  const routes=[],alerts=[];
  vm.runInNewContext(ts.transpileModule(submitSource+';submit({preventDefault(){}});',{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,{basePP:10000,accepted:true,decision:{bookable:false,reason:'Unavailable date'},packageTitle:'Goa Honeymoon',travelDate:'2026-12-01',isExcludedSeoPath,enquiryRoute,window:{location:{pathname,assign:url=>routes.push(url)}},alert:text=>alerts.push(text)});
  assert.equal(routes.length,isExcludedSeoPath(pathname)?0:1,pathname);
  assert.equal(alerts.length,isExcludedSeoPath(pathname)?1:0,pathname);
}
const seo = require(path.join(root,'components/SeoLandingPage.tsx')).default;
const {seoPages}=require(path.join(root,'data/seo-pages.ts'));
for(const config of Object.values(seoPages)) {
  const tree=seo({config}); const schema=JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  if(isExcludedSeoPath(config.slug)) assert.ok(!schema['@graph'].some(item=>item['@type']==='WebPage'),'protected SEO unchanged');
  else { assert.ok(schema['@graph'].some(item=>item['@type']==='WebPage'));assert.ok(!schema['@graph'].some(item=>item.availability==='https://schema.org/InStock'),'no invented inventory'); }
}
console.log('PASS: unchanged card fields, '+(100-JSON.stringify(cards).length/JSON.stringify(packages).length*100).toFixed(1)+'% smaller serialized card catalogue, excluded scope, enquiry validation and consent-safe event payloads');
