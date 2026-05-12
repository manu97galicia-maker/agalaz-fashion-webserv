// Honest reality audit: for EVERY URL we've created/modified, show:
//   1. Is it indexed in Google? (via site:agalaz.com/URL)
//   2. HTTP status (is it actually live?)
//   3. Current position for its target keyword
//   4. Days since URL went live (commit history)
//   5. Brutal honest verdict
//
// This is the diagnostic that explains WHY a URL isn't ranking #1 yet.

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

// URLs we've created or significantly modified in the last 7 days
// (Rounds 3-8), with their target keyword
const URLS = [
  // Round 8 (today)
  { url: '/pt/unhas-decoradas',                kw: 'unhas decoradas',                  lang: 'pt', loc: 2076, age: 'today' },
  { url: '/pt/corte-de-cabelo-feminino',       kw: 'corte de cabelo feminino',         lang: 'pt', loc: 2076, age: 'today' },
  { url: '/pt/vestido-de-noiva',               kw: 'vestido de noiva',                 lang: 'pt', loc: 2076, age: 'today' },
  { url: '/fr/robe-de-mariee',                 kw: 'robe de mariée',                   lang: 'fr', loc: 2250, age: 'today' },
  // Round 7
  { url: '/es/unas-francesas-disenos',         kw: 'uñas francesas',                   lang: 'es', loc: 2724, age: '1 day' },
  { url: '/es/unas-verano-2026',               kw: 'uñas verano',                      lang: 'es', loc: 2724, age: '1 day' },
  { url: '/es/unas-de-gel-disenos',            kw: 'uñas de gel',                      lang: 'es', loc: 2724, age: '1 day' },
  { url: '/es/disenos-de-unas',                kw: 'diseños de uñas',                  lang: 'es', loc: 2724, age: '1 day' },
  // Round 5
  { url: '/curtain-bangs-haircut',             kw: 'curtain bangs haircut',            lang: 'en', loc: 2840, age: '2 days' },
  { url: '/wolf-cut-hairstyles',               kw: 'wolf cut',                         lang: 'en', loc: 2840, age: '2 days' },
  { url: '/fr/carre-frange-rideau',            kw: 'carré frange rideau',              lang: 'fr', loc: 2250, age: '2 days' },
  // Round 4
  { url: '/es/disfraz-de-halloween',           kw: 'disfraz de halloween',             lang: 'es', loc: 2484, age: '3 days' },
  { url: '/es/disfraz-halloween-pareja',       kw: 'disfraz de halloween en pareja',   lang: 'es', loc: 2484, age: '3 days' },
  { url: '/es/cosplay',                        kw: 'cosplay',                          lang: 'es', loc: 2484, age: '3 days' },
  { url: '/es/disfraces-caseros',              kw: 'disfraces caseros',                lang: 'es', loc: 2724, age: '3 days' },
  { url: '/es/disfraz-carnaval',               kw: 'disfraz carnaval',                 lang: 'es', loc: 2724, age: '3 days' },
  // Round 3
  { url: '/fr/coupe-cheveux-visage-rond',      kw: 'coupe de cheveux pour visage rond', lang: 'fr', loc: 2250, age: '4 days' },
  { url: '/pt/corte-cabelo-rosto-redondo',     kw: 'melhor corte de cabelo para rosto redondo', lang: 'pt', loc: 2076, age: '4 days' },
  { url: '/pt/unhas-curtas-ideias',            kw: 'ideias de unhas curtas decoradas', lang: 'pt', loc: 2076, age: '4 days' },
  { url: '/it/unghie-corte-semplici',          kw: 'unghie semplici ma belle corte',   lang: 'it', loc: 2380, age: '4 days' },
  { url: '/it/taglio-capelli-viso-tondo',      kw: 'taglio capelli viso tondo e paffuto', lang: 'it', loc: 2380, age: '4 days' },
];

async function dfs(endpoint, body) {
  const r = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.status_code !== 20000) throw new Error(j.status_message);
  return j.tasks?.[0]?.result?.[0];
}

async function httpStatus(path) {
  try {
    const res = await fetch(`https://agalaz.com${path}`, { method: 'HEAD', redirect: 'manual' });
    return res.status;
  } catch { return 0; }
}

async function isGoogleIndexed(path) {
  const r = await dfs('serp/google/organic/live/advanced',
    [{ keyword: `site:agalaz.com${path}`, language_code: 'en', location_code: 2840, depth: 10 }]);
  return (r?.items ?? []).filter((it) => it.type === 'organic').length > 0;
}

const results = [];

console.log('=== HONEST STATUS AUDIT — actual current state of our URLs ===\n');

for (const t of URLS) {
  process.stdout.write(`[${t.age.padEnd(7)}] ${t.url.padEnd(42)} `);
  try {
    const [status, indexed] = await Promise.all([httpStatus(t.url), isGoogleIndexed(t.url)]);
    await new Promise((r) => setTimeout(r, 200));

    let pos = null;
    if (indexed) {
      const serp = await dfs('serp/google/organic/live/advanced',
        [{ keyword: t.kw, language_code: t.lang, location_code: t.loc, depth: 100 }]);
      const items = (serp?.items ?? []).filter((it) => it.type === 'organic');
      const hit = items.findIndex((it) => (it.url || '').includes(`agalaz.com${t.url}`));
      pos = hit === -1 ? null : (items[hit].rank_absolute ?? hit + 1);
    }

    const verdict = !status ? '🔴 DOWN'
      : status !== 200 ? `🔴 HTTP ${status}`
      : !indexed ? '🟠 NOT INDEXED (Google has not seen it)'
      : !pos ? '🟡 INDEXED but ranks >100 (too new + needs authority)'
      : pos <= 10 ? `🟢 POS ${pos} (top 10!)`
      : pos <= 30 ? `🟡 POS ${pos} (climbing)`
      : `🟠 POS ${pos} (long way to go)`;

    console.log(`http:${status}  idx:${indexed ? '✓' : '✗'}  ${verdict}`);
    results.push({ ...t, status, indexed, pos, verdict });
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 250));
}

// Aggregate
const live = results.filter((r) => r.status === 200);
const indexed = results.filter((r) => r.indexed);
const top10 = results.filter((r) => r.pos && r.pos <= 10);
const top30 = results.filter((r) => r.pos && r.pos <= 30);
const top100 = results.filter((r) => r.pos && r.pos <= 100);

console.log('\n=== AGGREGATE ===');
console.log(`  URLs live (HTTP 200):       ${live.length} / ${results.length}`);
console.log(`  URLs indexed in Google:     ${indexed.length} / ${results.length}`);
console.log(`  URLs ranking top 10:        ${top10.length}`);
console.log(`  URLs ranking top 30:        ${top30.length}`);
console.log(`  URLs ranking top 100:       ${top100.length}`);
console.log(`  URLs >100 or not indexed:   ${results.length - top100.length}`);

fs.writeFileSync('tmp/honest-status-audit.json', JSON.stringify(results, null, 2));
console.log('\nWrote tmp/honest-status-audit.json');
