import app from './.open-next/worker.js';
export default {
 async fetch(request, env, ctx) {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/images/')) {
   const response = await env.ASSETS.fetch(request);
   const headers = new Headers(response.headers); headers.set('Access-Control-Allow-Origin','*');
   return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  }
  if (url.pathname === '/instagram' || url.pathname === '/instagram/') return app.fetch(request,env,ctx);
  if (url.pathname === '/sitemap.xml') {
   const original = await env.ORIGINAL_SITE.fetch(request);
   if (!original.ok) return original;
   const body = await original.text();
   const entry = '<url><loc>https://www.onlyroadtrip.com/instagram</loc><lastmod>2026-10-08</lastmod></url>';
   const updated = body.includes('<loc>https://www.onlyroadtrip.com/instagram</loc>') ? body : body.replace('</urlset>',entry+'</urlset>');
   return new Response(updated,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=300'}});
  }
  if (url.pathname === '/llms.txt' || url.pathname === '/LLMS.txt') {
   const originalUrl = new URL(request.url); originalUrl.pathname = '/LLMS.txt';
   const original = await env.ORIGINAL_SITE.fetch(new Request(originalUrl,request));
   const body = original.ok ? await original.text() : '# Only Road Trip\n';
   return new Response(body+'\n\n## Instagram trip collection\n- https://www.onlyroadtrip.com/instagram : Curated weekend and pilgrimage tours, Gujarat, Rajasthan, Kashmir and custom journeys. Starting rates depend on departure, availability and room sharing. Amarnath 2027 dates and fares are to be confirmed.\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
  // All booking, payment and existing website requests go to the unchanged production service.
  return env.ORIGINAL_SITE.fetch(request);
 }
};