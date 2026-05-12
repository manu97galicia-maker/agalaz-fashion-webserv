// Fetch palettehunt.com's top 25 ranking URLs (with actual page paths) so we
// know exactly which articles to edit when placing the 15 contextual editorial
// backlinks. Without exact URLs, the strategy is abstract.

import fs from 'fs';
function loadEnv() {
  const file = '.env.local';
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)$/);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live',
  { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify([{ target: 'palettehunt.com', location_code: 2840, language_code: 'en', limit: 100,
      order_by: ['ranked_serp_element.serp_item.etv,desc'],
      filters: [['ranked_serp_element.serp_item.rank_absolute', '<=', 15]] }]) });
const j = await res.json();
const items = j.tasks?.[0]?.result?.[0]?.items ?? [];

// Group by URL — keep best (highest-traffic) keyword per page
const byUrl = new Map();
for (const it of items) {
  const url = it.ranked_serp_element?.serp_item?.url;
  if (!url) continue;
  const etv = it.ranked_serp_element?.serp_item?.etv ?? 0;
  const pos = it.ranked_serp_element?.serp_item?.rank_absolute ?? 99;
  const kw = it.keyword_data?.keyword ?? '';
  const vol = it.keyword_data?.keyword_info?.search_volume ?? 0;
  if (!byUrl.has(url) || byUrl.get(url).etv < etv) {
    byUrl.set(url, { url, kw, vol, pos, etv });
  }
}

const sorted = [...byUrl.values()].sort((a, b) => b.etv - a.etv).slice(0, 25);
console.log('Top 25 palettehunt.com pages (by est. organic traffic in top 15):\n');
console.log('  pos  visits/mo  vol/mo  url');
console.log('  ---  ---------  ------  ---');
for (const p of sorted) {
  console.log(`  ${p.pos.toString().padStart(3)}  ${p.etv.toFixed(0).padStart(9)}  ${p.vol.toString().padStart(6)}  ${p.url}`);
}
fs.writeFileSync('tmp/palettehunt-top-pages.json', JSON.stringify(sorted, null, 2));
