// Audit the tattoo-simulator cluster across all live locales — current
// position, volume, KD, top-3 competitors per keyword. Used to plan the
// outreach + content pushes that move agalaz from >100 to top 10.

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
  // EN — agalaz URL: /virtual-tattoo-simulator
  ['tattoo simulator', 'en', 2840, '/virtual-tattoo-simulator'],
  ['virtual tattoo', 'en', 2840, '/virtual-tattoo-simulator'],
  ['tattoo simulator free online', 'en', 2840, '/virtual-tattoo-simulator'],
  ['see tattoo on body', 'en', 2840, '/virtual-tattoo-simulator'],
  ['ai tattoo simulator', 'en', 2840, '/virtual-tattoo-simulator'],
  ['try tattoo on yourself', 'en', 2840, '/virtual-tattoo-simulator'],
  ['tattoo ideas', 'en', 2840, '/virtual-tattoo-simulator'],
  ['tattoo on body', 'en', 2840, '/virtual-tattoo-simulator'],

  // ES — agalaz URL: /es/simulador-tatuaje
  ['simulador de tatuajes', 'es', 2724, '/es/simulador-tatuaje'],
  ['simulador tatuajes', 'es', 2724, '/es/simulador-tatuaje'],
  ['ver tatuaje en el cuerpo', 'es', 2724, '/es/simulador-tatuaje'],
  ['tatuaje virtual', 'es', 2724, '/es/simulador-tatuaje'],
  ['probar tatuaje', 'es', 2724, '/es/simulador-tatuaje'],
  ['ideas de tatuajes', 'es', 2724, '/es/simulador-tatuaje'],
  ['tatuajes mujer', 'es', 2724, '/es/simulador-tatuaje'],

  // FR — agalaz URL: /fr/simulateur-tatouage
  ['simulateur tatouage', 'fr', 2250, '/fr/simulateur-tatouage'],
  ['tatouage virtuel', 'fr', 2250, '/fr/simulateur-tatouage'],
  ['essayer tatouage', 'fr', 2250, '/fr/simulateur-tatouage'],
  ['idée tatouage', 'fr', 2250, '/fr/simulateur-tatouage'],

  // PT/BR — agalaz URL: /pt/simulador-tatuagem
  ['simulador de tatuagem', 'pt', 2076, '/pt/simulador-tatuagem'],
  ['tatuagem virtual', 'pt', 2076, '/pt/simulador-tatuagem'],
  ['ver tatuagem no corpo', 'pt', 2076, '/pt/simulador-tatuagem'],
  ['ideias de tatuagem', 'pt', 2076, '/pt/simulador-tatuagem'],

  // DE — agalaz URL: /de/tattoo-simulator
  ['tattoo simulator', 'de', 2276, '/de/tattoo-simulator'],
  ['tattoo testen', 'de', 2276, '/de/tattoo-simulator'],
  ['virtuelles tattoo', 'de', 2276, '/de/tattoo-simulator'],

  // IT — agalaz URL: /it/simulatore-tatuaggi
  ['simulatore tatuaggi', 'it', 2380, '/it/simulatore-tatuaggi'],
  ['tatuaggio virtuale', 'it', 2380, '/it/simulatore-tatuaggi'],
  ['idee tatuaggi', 'it', 2380, '/it/simulatore-tatuaggi'],
];

console.log('=== Tattoo cluster — SERP audit across 6 locales ===\n');
console.log('  POS  VOL     KD  LOCALE QUERY                         AGALAZ URL                   TOP 3 COMPETITORS');
console.log('  ───  ──────  ──  ───── ────────────────────────────── ──────────────────────────── ─────────────────');

const results = [];
for (const [kw, lang, loc, expectedUrl] of QUERIES) {
  try {
    const serp = await dfs('serp/google/organic/live/advanced', [{
      keyword: kw, language_code: lang, location_code: loc, depth: 100, device: 'desktop',
    }]);
    const organic = (serp?.items ?? []).filter((i) => i.type === 'organic');
    const ours = organic.find((i) => i.url && i.url.includes('agalaz.com'));
    const pos = ours ? ours.rank_absolute : '>100';
    const ourUrl = ours ? ours.url.replace('https://agalaz.com', '') : '—';
    const top3 = organic.slice(0, 3).map((i) => i.domain.replace('www.', '')).join(', ');

    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [kw], language_code: lang, location_code: loc }]);
    const vol = ov?.items?.[0]?.keyword_info?.search_volume ?? 0;
    const kd = ov?.items?.[0]?.keyword_properties?.keyword_difficulty ?? 0;

    results.push({ kw, lang, loc, expectedUrl, pos, ourUrl, vol, kd, top3 });
    console.log(`  ${String(pos).padStart(3)}  ${vol.toString().padStart(6)}  ${kd.toString().padStart(2)}  ${lang.toUpperCase()}    ${kw.padEnd(30)} ${(ourUrl === '—' ? expectedUrl : ourUrl).padEnd(28)} ${top3}`);
  } catch (e) {
    console.log(`  ERR  ${kw}: ${e.message?.slice(0, 60)}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}

// Summary by language: total cluster volume + average position
console.log('\n\n=== Resumen por idioma ===');
console.log('  LOCALE  TOTAL VOL/MO  KW EN TOP 100  KW EN TOP 50  KW EN TOP 20');
const byLang = new Map();
for (const r of results) {
  if (!byLang.has(r.lang)) byLang.set(r.lang, { vol: 0, ranked100: 0, ranked50: 0, ranked20: 0 });
  const b = byLang.get(r.lang);
  b.vol += r.vol;
  if (r.pos !== '>100') {
    const p = parseInt(r.pos);
    if (p <= 100) b.ranked100++;
    if (p <= 50) b.ranked50++;
    if (p <= 20) b.ranked20++;
  }
}
for (const [lang, b] of byLang.entries()) {
  console.log(`  ${lang.toUpperCase()}    ${b.vol.toString().padStart(9)}     ${b.ranked100.toString().padStart(2)}            ${b.ranked50.toString().padStart(2)}             ${b.ranked20.toString().padStart(2)}`);
}

console.log('\nDone.');
fs.writeFileSync('tmp/tattoo-audit.json', JSON.stringify(results, null, 2));
