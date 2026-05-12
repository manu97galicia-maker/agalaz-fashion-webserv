// Get authority signals for known Brazilian fashion/beauty/wedding content
// sites — the realistic backlink targets for /pt/unhas-decoradas and the
// rest of the agalaz BR cluster.
//
// Outputs DR, organic BR traffic, top keywords, and backlink stats so the
// user can prioritise outreach by max-impact-per-hour-of-work.

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

const TARGETS = [
  // Wedding-focused BR (huge for /pt/vestido-de-noiva, vestido-madrinha)
  ['casamentos.com.br',       'wedding'],
  ['constancezahn.com',       'wedding-luxury'],
  ['blogdocasamento.com.br',  'wedding'],
  ['noivinhasdeluxo.com.br',  'wedding'],
  ['casarcomgosto.com.br',    'wedding'],
  ['icasei.com.br',           'wedding'],

  // Beauty/Nails BR
  ['blogdamariarita.com',     'beauty-nails'],
  ['unhasvip.com.br',         'beauty-nails'],
  ['unhasestilizadas.com',    'beauty-nails'],
  ['vivamulher.com.br',       'beauty-lifestyle'],
  ['personare.com.br',        'beauty-astrology'],

  // Hair BR (for /pt/corte-de-cabelo-feminino)
  ['cabelos.com.br',          'hair'],
  ['blogdocabelo.com.br',     'hair'],
  ['salaovirtual.com.br',     'hair'],

  // Fashion BR (general)
  ['vestidos.com.br',         'fashion'],
  ['fashionbubbles.com',      'fashion-magazine'],
  ['claudia.uol.com.br',      'fashion-magazine'], // Editora Abril
  ['vogue.com.br',            'fashion-magazine'],

  // Tech/Tools BR (good for AI angle)
  ['canaltech.com.br',        'tech'],
  ['tecmundo.com.br',         'tech'],
  ['olhardigital.com.br',     'tech'],

  // Comparison/social BR
  ['ge.globo.com',            'mass-media'],
  ['uol.com.br',              'mass-media'],
];

console.log('=== Brasil backlink targets — authority + traffic ===\n');
console.log('  DOMAIN                       NICHE             KW(BR)   ETV/mo    TOP KW');
console.log('  ───────────────────────────  ───────────────   ──────   ───────   ──────────────────────');

const results = [];

for (const [target, niche] of TARGETS) {
  try {
    const rk = await dfs('dataforseo_labs/google/domain_rank_overview/live', [{
      target, language_code: 'pt', location_code: 2076,
    }]);
    const m = rk?.items?.[0]?.metrics?.organic;
    const kwCount = m?.count ?? 0;
    const etv = m?.etv ?? 0;

    // Top keyword for context
    let topKw = '';
    try {
      const top = await dfs('dataforseo_labs/google/ranked_keywords/live', [{
        target, language_code: 'pt', location_code: 2076,
        limit: 1, order_by: ['ranked_serp_element.serp_item.etv,desc'],
      }]);
      topKw = top?.items?.[0]?.keyword_data?.keyword ?? '';
    } catch (e) { /* ignore */ }

    results.push({ target, niche, kwCount, etv, topKw });
    console.log(`  ${target.padEnd(28)} ${niche.padEnd(17)} ${kwCount.toString().padStart(6)}   ${Math.round(etv).toString().padStart(7)}   ${topKw.slice(0, 30)}`);
  } catch (e) {
    console.log(`  ${target.padEnd(28)} ${niche.padEnd(17)}  FAIL: ${e.message?.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 280));
}

// Rank by ETV (best outreach targets = highest BR traffic)
results.sort((a, b) => b.etv - a.etv);

console.log('\n\n=== TOP 10 priorización (mayor tráfico BR primero) ===');
console.log('  rank  domain                       BR/mo traffic   outreach difficulty');
console.log('  ────  ───────────────────────────  ─────────────   ───────────────────');

for (let i = 0; i < Math.min(10, results.length); i++) {
  const r = results[i];
  // Heuristic: huge sites (>1M/mo) are hard, medium (50K-500K) are reachable, small (<50K) are easiest
  const difficulty = r.etv > 1000000 ? 'MUY DURA (mass media)' :
                     r.etv > 200000 ? 'difícil (mainstream)' :
                     r.etv > 30000 ? 'media (blog grande)' :
                     r.etv > 5000 ? 'FÁCIL (blog nicho)' : 'muy fácil pero bajo DR';
  console.log(`  #${(i + 1).toString().padStart(2)}   ${r.target.padEnd(28)} ${Math.round(r.etv).toLocaleString().padStart(13)}   ${difficulty}`);
}

fs.writeFileSync('tmp/brasil-targets.json', JSON.stringify(results, null, 2));
console.log('\nWrote tmp/brasil-targets.json');
