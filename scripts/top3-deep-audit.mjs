// Deep audit of agalaz's top 3 priority URLs (the highest-potential
// combination of volume × KD × content readiness × competition beatable):
//   1. /pt/unhas-decoradas
//   2. /pt/corte-de-cabelo-feminino
//   3. /pt/vestido-de-noiva
//
// For each URL: scan 8-12 cluster keywords, return current position, KD,
// volume, top 5 competitors, and the realistic path to top 5.

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

const URLS = [
  {
    url: '/pt/unhas-decoradas',
    name: 'Unhas decoradas (BR)',
    lang: 'pt', loc: 2076,
    queries: [
      'unhas decoradas',
      'unhas decoradas simples',
      'unhas decoradas 2026',
      'unhas francesinha',
      'unhas de gel',
      'unhas de gel curtas',
      'design de unhas',
      'unhas decoradas delicadas',
    ],
  },
  {
    url: '/pt/corte-de-cabelo-feminino',
    name: 'Corte cabelo feminino (BR)',
    lang: 'pt', loc: 2076,
    queries: [
      'corte de cabelo feminino',
      'corte de cabelo curto feminino',
      'corte de cabelo medio',
      'corte chanel',
      'corte bob',
      'franja',
      'corte de cabelo para rosto redondo',
      'corte repicado',
    ],
  },
  {
    url: '/pt/vestido-de-noiva',
    name: 'Vestido de noiva (BR)',
    lang: 'pt', loc: 2076,
    queries: [
      'vestido de noiva',
      'vestido de noiva simples',
      'vestido de noiva 2026',
      'vestido de noiva sereia',
      'vestido de noiva princesa',
      'vestido de noiva civil',
      'vestido de madrinha',
      'vestidos de noiva curtos',
    ],
  },
];

const allResults = [];

for (const target of URLS) {
  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`${target.name}  →  ${target.url}`);
  console.log(`══════════════════════════════════════════════════════════`);
  console.log('  POS  VOL      KD  QUERY                              TOP 5 COMPETITORS');
  console.log('  ───  ───────  ──  ─────────────────────────────────  ────────────────────');

  let totalVol = 0;
  let totalKwInTop100 = 0;
  let totalCapturable = 0;

  for (const q of target.queries) {
    try {
      const serp = await dfs('serp/google/organic/live/advanced', [{
        keyword: q, language_code: target.lang, location_code: target.loc, depth: 100, device: 'desktop',
      }]);
      const organic = (serp?.items ?? []).filter((i) => i.type === 'organic');
      const ours = organic.find((i) => i.url && i.url.includes('agalaz.com'));
      const pos = ours ? ours.rank_absolute : '>100';
      const top5 = organic.slice(0, 5).map((i) => i.domain.replace('www.', '')).join(', ');

      const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
        [{ keywords: [q], language_code: target.lang, location_code: target.loc }]);
      const vol = ov?.items?.[0]?.keyword_info?.search_volume ?? 0;
      const kd = ov?.items?.[0]?.keyword_properties?.keyword_difficulty ?? 0;

      totalVol += vol;
      if (pos !== '>100') totalKwInTop100++;
      // Capturable estimate: capture rate ~2-5% if you reach top 10, scaled by KD
      const captureMonthly = vol * (kd <= 10 ? 0.04 : kd <= 20 ? 0.025 : 0.015);
      totalCapturable += captureMonthly;

      allResults.push({ url: target.url, query: q, vol, kd, pos, top5 });
      console.log(`  ${String(pos).padStart(3)}  ${vol.toString().padStart(7)}  ${kd.toString().padStart(2)}  ${q.padEnd(34)} ${top5.slice(0, 80)}`);
    } catch (e) {
      console.log(`  ERR  ${q}: ${e.message?.slice(0, 50)}`);
    }
    await new Promise((r) => setTimeout(r, 280));
  }

  console.log(`\n  TOTAL cluster vol/mes:     ${totalVol.toLocaleString()}`);
  console.log(`  KW en top 100 actuales:    ${totalKwInTop100}/${target.queries.length}`);
  console.log(`  Capturable estimate (top 10): ${Math.round(totalCapturable).toLocaleString()}/mes`);
}

fs.writeFileSync('tmp/top3-deep-audit.json', JSON.stringify(allResults, null, 2));
console.log('\n\n=== Done. Wrote tmp/top3-deep-audit.json ===');
