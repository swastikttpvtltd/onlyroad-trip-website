import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';

fs.mkdirSync('lighthouse-results', { recursive: true });
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3020'], { stdio: 'inherit', env: { ...process.env, ONLYROADTRIP_PREVIEW_NO_BINDINGS:'1' } });
const pages = [['home','/'],['packages','/packages'],['door-to-door','/door-to-door-travel'],['goa','/packages/goa-honeymoon'],['enquiry','/plan-your-trip']];
try {
  let ready=false;
  for(let attempt=0;attempt<60;attempt++) {
    try { const response=await fetch('http://127.0.0.1:3020/',{signal:AbortSignal.timeout(2000)}); if(response.ok){ready=true;break;} } catch {}
    await new Promise(resolve=>setTimeout(resolve,1000));
  }
  if(!ready) throw new Error('Preview server did not start');
  const rows=[];
  for(const [name,route] of pages) {
    const output='lighthouse-results/'+name+'.json';
    const result=spawnSync('npx',['--yes','--package=lighthouse','lighthouse','http://127.0.0.1:3020'+route,'--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage','--only-categories=performance,accessibility,best-practices,seo','--blocked-url-patterns=*googletagmanager.com*,*google-analytics.com*,*clarity.ms*,*facebook.net*,*facebook.com*,*doubleclick.net*','--no-enable-error-reporting','--output=json','--output-path='+output,'--quiet'],{stdio:'inherit',timeout:120000});
    if(result.status!==0) throw new Error('Lighthouse failed for '+name);
    const report=JSON.parse(fs.readFileSync(output,'utf8'));
    if(report.runtimeError) throw new Error(report.runtimeError.message);
    rows.push({name,route,scores:Object.fromEntries(Object.entries(report.categories).map(([key,value])=>[key,Math.round(value.score*100)])),LCPms:report.audits['largest-contentful-paint'].numericValue,CLS:report.audits['cumulative-layout-shift'].numericValue,TBTms:report.audits['total-blocking-time'].numericValue,issues:Object.values(report.audits).filter(a=>a.score!==null&&a.score<1&&a.scoreDisplayMode==='binary').map(a=>({id:a.id,title:a.title,description:a.description}))});
  }
  fs.writeFileSync('lighthouse-results/summary.json',JSON.stringify({note:'Mobile laboratory measurements on isolated localhost production build. Existing third-party trackers blocked. These are not real-user field INP or deployed Cloudflare results.',rows},null,2));
  console.log(JSON.stringify(rows,null,2));
} finally { server.kill('SIGTERM'); }
