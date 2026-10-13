// Progressive enhancement: public page information only; no accounts, forms or payments.
(() => {
  const excluded = /(?:varanasi|kashi|char-dham|do-dham|gujarat|dwarka-somnath|gir-national-park|rann-utsav|saputara|statue-of-unity)/i;
  if (excluded.test(location.pathname) || /^\/(?:book|payment|api|admin)(?:\/|-|$)/.test(location.pathname)) return;
  const context = document.modelContext;
  if (!context || typeof context.registerTool !== 'function') return;
  const controller = new AbortController();
  const annotations = { readOnlyHint: true, consequentialHint: false, untrustedContentHint: true };
  const register = (tool) => {
    try {
      Promise.resolve(context.registerTool({ ...tool, annotations }, { signal: controller.signal })).catch(() => {});
    } catch { /* Unsupported experimental API must not affect the website. */ }
  };
  register({
    name: 'find_visible_packages',
    description: 'Find public package links on the current page. Returns up to five matches. Open a package URL for its itinerary. Does not search private data or submit an enquiry.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', maxLength: 100 } }, required: ['query'], additionalProperties: false },
    execute: async (input) => {
      if (!input || typeof input.query !== 'string' || input.query.length > 100) return 'Invalid query';
      const query = input.query.trim().toLowerCase();
      const links = new Map();
      for (const anchor of document.querySelectorAll('a[href]')) {
        if (!anchor.getClientRects().length || anchor.closest('[hidden], [aria-hidden="true"]')) continue;
        const url = new URL(anchor.getAttribute('href'), location.href);
        if (url.origin !== location.origin || !/^\/packages\/[a-z0-9-]+\/?$/.test(url.pathname) || excluded.test(url.pathname)) continue;
        const title = (anchor.closest('article')?.querySelector('h3')?.textContent || anchor.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100);
        if ((title + ' ' + url.pathname).toLowerCase().includes(query)) links.set(url.pathname, { title, url: location.origin + url.pathname });
        if (links.size === 5) break;
      }
      return JSON.stringify({ packages: [...links.values()], scope: 'Visible links on this page only' });
    },
  });
  register({
    name: 'read_current_package',
    description: 'Read the current public package title, duration, description and canonical URL. Pickup is coordinated across India and requires confirmation. Never confirms availability, final price or booking.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    execute: async () => {
      if (!/^\/packages\/[a-z0-9-]+\/?$/.test(location.pathname)) return 'Open a package page first';
      for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
        try {
          const data = JSON.parse(script.textContent || '{}');
          const objects = Array.isArray(data) ? data : data['@graph'] || [data];
          const trip = objects.find(item => item && item['@type'] === 'TouristTrip');
          const facts = [...document.querySelectorAll('section')].find(section => section.textContent?.includes('Package ID') && section.textContent?.includes('Best Time') && section.textContent?.includes('Duration'));
          const duration = facts?.textContent?.match(/Duration\s*(.*?)(?:Destination|Best Time)/)?.[1]?.trim() || '';
          if (trip) return JSON.stringify({ title: String(trip.name || '').slice(0, 150), description: String(trip.description || '').slice(0, 700), duration: duration.slice(0, 80), url: location.origin + location.pathname, pickup: 'Across India; confirm arrangements and quote with the travel team.' });
        } catch { /* Skip unrelated malformed schema. */ }
      }
      return 'Package information is unavailable on this page';
    },
  });
  addEventListener('pagehide', () => controller.abort(), { once: true });
})();
