// Check the real SERP for "unhas decoradas" cluster in Brazil + agalaz's
// current position. Used to estimate how much a single palettehunt
// backlink would actually move the needle.

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

const QUERIES = [
  'unhas decoradas',
  'unhas decoradas simples',
  'unhas decoradas 2026',
  'unhas francesinha',
  'unhas de gel',
  'design de unhas',
];

console.log('=== Brazil PT — "unhas decoradas" cluster SERP analysis ===\n');
console.log('  pos   vol     kd   query                     agalaz URL (if ranking)   top 3');
console.log('  ----  ------  --   ------------------------  ------------------------  -------');

for (const q of QUERIES) {
  try {
    const serp = await dfs('serp/google/organic/live/advanced', [{
      keyword: q, language_code: 'pt', location_code: 2076, depth: 100, device: 'desktop',
    }]);
    const organic = (serp?.items ?? []).filter((i) => i.type === 'organic');
    const ours = organic.find((i) => i.url && i.url.includes('agalaz.com'));
    const pos = ours ? ours.rank_absolute : '>100';
    const ourUrl = ours ? ours.url.replace('https://agalaz.com', '') : '—';
    const top3 = organic.slice(0, 3).map((i) => i.domain).join(', ');

    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [q], language_code: 'pt', location_code: 2076 }]);
    const vol = ov?.items?.[0]?.keyword_info?.search_volume ?? 0;
    const kd = ov?.items?.[0]?.keyword_properties?.keyword_difficulty ?? 0;

    console.log(`  ${String(pos).padStart(4)}  ${vol.toString().padStart(6)}  ${kd.toString().padStart(2)}   ${q.padEnd(26)} ${ourUrl.padEnd(26)} ${top3}`);
  } catch (e) {
    console.log(`  ERR ${q}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

// Also check palettehunt's authority by looking at one of their pages
console.log('\n=== Palettehunt.com authority signals ===');
try {
  const meta = await dfs('dataforseo_labs/google/domain_metrics/live', [{
    targets: ['palettehunt.com'], language_code: 'pt', location_code: 2076,
  }]);
  const m = meta?.items?.[0]?.metrics?.organic;
  if (m) {
    console.log(`  Palettehunt PT/BR: ${m.count} keywords, ETV ${m.etv?.toFixed(0)}/mo`);
  }
} catch (e) { /* ignore */ }

try {
  const bl = await dfs('backlinks/summary/live', [{ target: 'palettehunt.com' }]);
  if (bl) {
    console.log(`  Backlinks total: ${bl.backlinks ?? '?'}`);
    console.log(`  Referring domains: ${bl.referring_domains ?? '?'}`);
    console.log(`  Domain rank (DataForSEO 0-1000): ${bl.rank ?? '?'}`);
  }
} catch (e) { console.log(`  Backlinks API blocked`); }

console.log('\nDone.');
