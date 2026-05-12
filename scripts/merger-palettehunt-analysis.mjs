// Hard-data assessment of merging agalaz.com INTO palettehunt.com.
// Returns: each domain's real organic traffic, top-ranking keywords,
// keyword overlap, and topical overlap.

import fs from 'fs';
function loadEnv() {
  const f = '.env.local';
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)$/);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

async function dfs(endpoint, body) {
  const r = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.status_code !== 20000) throw new Error(j.status_message);
  return j.tasks?.[0]?.result?.[0];
}

console.log('=== Merger analysis: agalaz.com → palettehunt.com ===\n');

for (const target of ['palettehunt.com', 'agalaz.com']) {
  console.log(`\n──── ${target.toUpperCase()} ────`);
  try {
    const rk = await dfs('dataforseo_labs/google/domain_rank_overview/live', [{
      target, language_code: 'en', location_code: 2840,
    }]);
    const m = rk?.items?.[0]?.metrics;
    if (m?.organic) {
      console.log(`  Organic keywords (US):    ${m.organic.count}`);
      console.log(`  Estimated traffic (US):   ${m.organic.etv?.toFixed(0)}/mo`);
      console.log(`  Estimated traffic value:  $${m.organic.estimated_paid_traffic_cost?.toFixed(0)}/mo`);
    }
  } catch (e) { console.log(`  FAIL US: ${e.message}`); }

  try {
    const rkEs = await dfs('dataforseo_labs/google/domain_rank_overview/live', [{
      target, language_code: 'es', location_code: 2724,
    }]);
    const m = rkEs?.items?.[0]?.metrics;
    if (m?.organic) {
      console.log(`  Organic keywords (ES):    ${m.organic.count}`);
      console.log(`  Estimated traffic (ES):   ${m.organic.etv?.toFixed(0)}/mo`);
    }
  } catch (e) { console.log(`  FAIL ES: ${e.message}`); }

  // Top 15 keywords this domain ranks for
  try {
    const ranked = await dfs('dataforseo_labs/google/ranked_keywords/live', [{
      target, language_code: 'en', location_code: 2840,
      limit: 15, order_by: ['ranked_serp_element.serp_item.etv,desc'],
    }]);
    const top = ranked?.items ?? [];
    if (top.length) {
      console.log(`\n  Top 15 ranking keywords (US/EN):`);
      for (const k of top) {
        const kw = k.keyword_data?.keyword;
        const pos = k.ranked_serp_element?.serp_item?.rank_absolute;
        const vol = k.keyword_data?.keyword_info?.search_volume ?? 0;
        const etv = k.ranked_serp_element?.serp_item?.etv?.toFixed(0) ?? 0;
        console.log(`    #${String(pos).padStart(3)}  vol:${vol.toString().padStart(6)}  ~${String(etv).padStart(5)} v/mo  ${kw}`);
      }
    }
  } catch (e) { console.log(`  FAIL ranked: ${e.message}`); }
}

console.log('\n\n=== Backlink summary ===');
for (const target of ['palettehunt.com', 'agalaz.com']) {
  try {
    const bl = await dfs('backlinks/summary/live', [{ target }]);
    if (bl) {
      console.log(`  ${target.padEnd(20)} backlinks: ${bl.backlinks ?? '?'}  referring domains: ${bl.referring_domains ?? '?'}  rank: ${bl.rank ?? '?'}`);
    }
  } catch (e) { console.log(`  ${target}: backlinks API blocked (${e.message})`); }
}

console.log('\nDone.');
