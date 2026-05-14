// Find the optimal anchor text for the (single) palettehunt → agalaz
// /pt/unhas-decoradas backlink. Validates:
//   1. Which natural-language phrases brazilians actually use (so the anchor
//      doesn't look manipulated)
//   2. The volume + KD of each candidate phrase
//   3. Which phrase Google would interpret as a meaningful topical signal
//      WITHOUT triggering exact-match Penguin

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

// Candidate anchor phrases ranked by SEO strategy:
//   Tier A: Generic-but-topical (safest, builds DA without exact match)
//   Tier B: Partial-match (moderate risk, more topical juice)
//   Tier C: Brand-anchored (zero risk, lower SEO juice but absolutely safe)
//   Tier D: Exact-match (DO NOT USE for first link — Penguin trigger)
const ANCHORS = [
  // Tier A — generic-but-topical (RECOMMENDED for first link)
  { phrase: 'experimentar designs de unhas com IA',  tier: 'A' },
  { phrase: 'provador de unhas com IA',              tier: 'A' },
  { phrase: 'ferramenta de design de unhas',         tier: 'A' },
  { phrase: 'simulador de unhas online',             tier: 'A' },
  { phrase: 'ver designs de unhas no seu corpo',     tier: 'A' },
  // Tier B — partial-match
  { phrase: 'designs de unhas',                      tier: 'B' },
  { phrase: 'unhas com inteligência artificial',     tier: 'B' },
  { phrase: 'preview unhas com IA',                  tier: 'B' },
  // Tier C — brand
  { phrase: 'Agalaz',                                tier: 'C' },
  { phrase: 'agalaz.com',                            tier: 'C' },
  // Tier D — exact-match (HIGH RISK)
  { phrase: 'unhas decoradas',                       tier: 'D' },
];

console.log('=== Anchor-text analysis for palettehunt → agalaz/pt/unhas-decoradas ===\n');
console.log('  TIER  VOL/MES  KD   FRASE                                       SAFETY');
console.log('  ────  ───────  ──   ──────────────────────────────────────────  ────────');

const results = [];
for (const a of ANCHORS) {
  try {
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [a.phrase], language_code: 'pt', location_code: 2076 }]);
    const vol = ov?.items?.[0]?.keyword_info?.search_volume ?? 0;
    const kd = ov?.items?.[0]?.keyword_properties?.keyword_difficulty ?? 0;

    let safety;
    if (a.tier === 'A') safety = '✅ SAFE';
    else if (a.tier === 'B') safety = '⚠️  MEDIUM';
    else if (a.tier === 'C') safety = '✅ SAFE (low juice)';
    else safety = '🚨 RISK';

    results.push({ ...a, vol, kd });
    console.log(`  ${a.tier}     ${vol.toString().padStart(7)}  ${kd.toString().padStart(2)}   ${a.phrase.padEnd(44)} ${safety}`);
  } catch (e) {
    console.log(`  ERR  ${a.phrase}: ${e.message?.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 280));
}

// Calculate expected position lift + traffic from 1 palettehunt link
console.log('\n\n=== Expected impact of 1 palettehunt backlink ===\n');
const CLUSTER_VOL = 651500; // unhas BR cluster total verified
const SCENARIOS = [
  { name: 'Mes 1-2 (sandbox break)', positionRange: '40-70', captureRate: 0.002 },
  { name: 'Mes 3-4 (consolidación)', positionRange: '25-40', captureRate: 0.008 },
  { name: 'Mes 5-6 (top 20-30)',     positionRange: '15-25', captureRate: 0.018 },
  { name: 'Mes 7-12 (mejor caso)',   positionRange: '10-15', captureRate: 0.030 },
];

console.log('  PERÍODO                      POSICIÓN  VISITAS/MES         VISITAS/DÍA');
console.log('  ──────────────────────────  ────────  ──────────────────  ──────────────');
for (const s of SCENARIOS) {
  const monthly = Math.round(CLUSTER_VOL * s.captureRate);
  const daily = Math.round(monthly / 30);
  console.log(`  ${s.name.padEnd(28)} ${s.positionRange.padEnd(9)} ${monthly.toLocaleString().padStart(7)} visitas/mes  ${daily.toLocaleString().padStart(5)}/día`);
}

console.log('\nDone.');
