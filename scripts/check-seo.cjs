const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
const ts=require('typescript');
const root=path.resolve(__dirname,'..');
const resolve=Module._resolveFilename;
Module._resolveFilename=function(name,...args){return resolve.call(this,name.startsWith('@/')?path.join(root,name.slice(2)):name,...args)};
for(const extension of ['.ts','.tsx'])require.extensions[extension]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true,jsx:ts.JsxEmit.ReactJSX}}).outputText,filename);
const {packages}=require(path.join(root,'data/packages.ts'));
const {seoPages}=require(path.join(root,'data/seo-pages.ts'));
const {publicSeoPaths}=require(path.join(root,'data/publicSeoPaths.ts'));
const {packageSearchIntents,packageDescription,serializeJsonLd}=require(path.join(root,'lib/siteSeo.ts'));
const sitemap=require(path.join(root,'app/sitemap.ts')).default();
const urls=new Set(sitemap.map(entry=>entry.url));
assert.equal(urls.size,sitemap.length,'duplicate sitemap URLs');
for(const entry of sitemap){
  assert.equal(new URL(entry.url).origin,'https://www.onlyroadtrip.com');
  assert.ok(!/^\/(book|payment|api|admin|google-ads)(\/|-|$)/.test(new URL(entry.url).pathname),'private/transactional URL in sitemap');
  assert.equal(entry.lastModified,undefined,'invented modification date');
}
for(const pkg of packages){
  assert.ok(urls.has('https://www.onlyroadtrip.com/packages/'+pkg.slug),pkg.slug);
  const imageEntry=sitemap.find(entry=>entry.url==='https://www.onlyroadtrip.com/packages/'+pkg.slug);
  assert.deepEqual(imageEntry.images,['https://www.onlyroadtrip.com'+pkg.image]);
  const description=packageDescription(pkg);
  assert.ok(description.includes(pkg.title)&&description.includes(pkg.duration));
  assert.ok(description.includes('door-to-door travel planning across India'));
  assert.ok(!/worldwide pickup|included pickup|guaranteed/i.test(description));
  const phrases=packageSearchIntents(pkg);
  assert.equal(new Set(phrases).size,phrases.length);
  assert.ok(phrases.includes(pkg.title+' itinerary'));
}
for(const slug of publicSeoPaths)assert.ok(fs.existsSync(path.join(root,'app',slug,'page.tsx')),slug);
for(const slug of Object.keys(seoPages))assert.ok(urls.has('https://www.onlyroadtrip.com/'+slug),slug);
assert.deepEqual(JSON.parse(serializeJsonLd({name:'</script><script>test</script>'})),{name:'</script><script>test</script>'});
assert.ok(!serializeJsonLd({name:'</script>'}).includes('<'));
assert.ok(!fs.readFileSync(path.join(root,'app/layout.tsx'),'utf8').includes('alternates: { canonical: "/" }'));
for(const folder of ['book/[slug]','payment','payment-cancelled'])assert.match(fs.readFileSync(path.join(root,'app',folder,'layout.tsx'),'utf8'),/index: false/);
for(const file of fs.readdirSync(path.join(root,'public/images/hero')).filter(file=>/^hero(?:-\d+)?\.png$/.test(file)))assert.ok(fs.existsSync(path.join(root,'public/images/hero',file.replace('.png','.webp'))));
async function checkRenderedPackages(){
  const robots=require(path.join(root,'app/robots.ts')).default();
  for(const agent of ['OAI-SearchBot','Claude-SearchBot','Claude-User','PerplexityBot','Perplexity-User']){
    const rule=robots.rules.find(rule=>[rule.userAgent].flat().includes(agent));
    assert.ok(rule,agent+' search access rule');
    assert.equal(rule.allow,'/');
    assert.ok(rule.disallow.includes('/api/')&&rule.disallow.includes('/admin/'));
  }
  assert.equal(robots.sitemap,'https://www.onlyroadtrip.com/sitemap.xml');
  const indexResponse=require(path.join(root,'app/llms.txt/route.ts')).GET();
  assert.equal(fs.existsSync(path.join(root,'public/llms.txt')),false,'active discovery route must not conflict with a public file');
  assert.equal(indexResponse.status,200);
  assert.equal(indexResponse.headers.get('content-type'),'text/plain; charset=utf-8');
  const index=await indexResponse.text();
  const indexLinks=[...index.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(match=>match[1]);
  assert.equal(new Set(indexLinks).size,indexLinks.length);
  for(const url of indexLinks)assert.ok(urls.has(url)||url==='https://www.onlyroadtrip.com/sitemap.xml',url+' discovery URL');
  for(const pkg of packages)assert.ok(indexLinks.includes('https://www.onlyroadtrip.com/packages/'+pkg.slug));
  assert.ok(index.includes('across India')&&index.includes('quotation'));
  const page=require(path.join(root,'app/packages/[slug]/page.tsx'));
  const {isGroupTourBookingPaused}=require(path.join(root,'data/groupTourBookingPause.ts'));
  for(const pkg of packages){
    const props={params:Promise.resolve({slug:pkg.slug})};
    const metadata=await page.generateMetadata(props);
    assert.equal(metadata.alternates.canonical,'/packages/'+pkg.slug);
    const element=await page.default(props);
    let headings=0, bookingAnchor=false, trip=null, webpage=null, faqPage=null;
    const visibleFaqs=[];
    function walk(node){
      if(Array.isArray(node)){node.forEach(walk);return;}
      if(!node||typeof node!=='object'||!node.props)return;
      if(node.type==='h1')headings++;
      if(node.props.id==='booking')bookingAnchor=true;
      if(node.type==='details' && Array.isArray(node.props.children) && node.props.children[0]?.type==='summary' && node.props.children[1]?.type==='p') visibleFaqs.push({question:node.props.children[0].props.children,answer:node.props.children[1].props.children});
      if(node.type==='script'&&node.props.type==='application/ld+json'){
        const value=JSON.parse(node.props.dangerouslySetInnerHTML.__html);
        if(value['@type']==='TouristTrip')trip=value;
        if(value['@type']==='WebPage')webpage=value;
        if(value['@type']==='FAQPage')faqPage=value;
      }
      walk(node.props.children);
    }
    walk(element);
    assert.equal(headings,1,pkg.slug+' H1 count');
    assert.ok(bookingAnchor,pkg.slug+' booking anchor');
    assert.equal(trip.name,pkg.title);
    const canonical='https://www.onlyroadtrip.com/packages/'+pkg.slug;
    assert.equal(webpage.url,canonical,pkg.slug+' landing URL');
    assert.equal(webpage.name,pkg.title);
    assert.equal(webpage.description,pkg.overview.replace(/\s+/g,' ').trim());
    assert.equal(webpage.mainEntity['@id'],trip['@id']);
    assert.equal(webpage.isPartOf['@id'],'https://www.onlyroadtrip.com/#website');
    assert.equal(faqPage.isPartOf['@id'],webpage['@id']);
    assert.ok(webpage.hasPart.some(part=>part['@id']===faqPage['@id']));
    assert.ok(webpage.hasPart.some(part=>part['@id']==='https://www.onlyroadtrip.com/#header'));
    assert.ok(webpage.hasPart.some(part=>part['@id']==='https://www.onlyroadtrip.com/#footer'));
    const {buildPackageFaqs}=require(path.join(root,'data/packageCustomerCopy.ts'));
    const {travellerSafetyFaqs,travellerTermsUrl}=require(path.join(root,'lib/travellerTermsSeo.ts'));
    const {isExcludedSeoPath}=require(path.join(root,'lib/seoWorkScope.ts'));
    const groupTerms=pkg.themes?.some(theme=>theme.toLowerCase()==='group tour') || pkg.category?.toLowerCase()==='weekend';
    const expectedFaqs=[...buildPackageFaqs(pkg),...(groupTerms&&!isExcludedSeoPath(pkg.slug)?travellerSafetyFaqs:[])];
    assert.deepEqual(visibleFaqs,expectedFaqs,pkg.slug+' visible FAQs and scoped safety facts');
    assert.deepEqual(faqPage.mainEntity.map(question=>({question:question.name,answer:question.acceptedAnswer.text})),visibleFaqs,pkg.slug+' schema matches visible answers');
    assert.equal(webpage.relatedLink,groupTerms&&!isExcludedSeoPath(pkg.slug)?travellerTermsUrl:undefined,pkg.slug+' group terms link scope');
    assert.deepEqual(trip.touristType,pkg.category?[pkg.category]:undefined);
    assert.equal(trip.offers?.availability,undefined,'unconfirmed inventory');
    if(isGroupTourBookingPaused(pkg.slug))assert.equal(trip.offers,undefined,'paused offer');
    else assert.equal(Number(trip.offers.price),pkg.price,pkg.slug+' schema price');
  }
  for(const [file,type,id] of [['Header.tsx','WPHeader','header'],['Footer.tsx','WPFooter','footer']]){
    const source=fs.readFileSync(path.join(root,'components',file),'utf8');
    assert.ok(source.includes('itemScope itemType="https://schema.org/'+type+'" itemID="https://www.onlyroadtrip.com/#'+id+'"'));
  }
  console.log('PASS: '+packages.length+' rendered package landing pages, H1s, metadata, linked WebPage/trip/FAQ/header/footer schema; '+sitemap.length+' sitemap URLs; transaction noindex, JSON-LD escaping and generated hero assets.');
}
checkRenderedPackages().catch(error=>{console.error(error);process.exitCode=1});
