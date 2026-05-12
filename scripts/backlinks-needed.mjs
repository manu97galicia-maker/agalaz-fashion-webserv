// For each top-priority URL, calculate the backlink threshold needed
// to rank in top 10. Method: get the actual top-10 SERP for the keyword,
// fetch each competitor's referring-domain count, and use the median +
// 25th percentile to estimate the floor for entering top 10.
//
// Output also includes estimated freelancer cost based on common rates
// for niche edits / guest posts in fashion/beauty verticals.

import fs from 'fs';

function loadEnv() {
  const file = '.env.local';
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key]) continue;
    let val = raw.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[key] = val;
  }
}
loadEnv();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

// Priority URLs — the highest-volume targets we care about ranking.
const TARGETS = [
  { url: '/es/vestido-invitada-boda',      kw: 'vestido invitada boda',           lang: 'es', loc: 2724, vol: 165000, locName: 'Spain' },
  { url: '/wedding-guest-outfit',          kw: 'wedding guest outfit',            lang: 'en', loc: 2840, vol: 301000, locName: 'US' },
  { url: '/ar/hijab',                      kw: 'hijab',                           lang: 'ar', loc: 2682, vol: 246000, locName: 'Egypt' },
  { url: '/hi/saree',                      kw: 'saree',                           lang: 'hi', loc: 2356, vol: 110000, locName: 'India' },
  { url: '/es/disfraz-de-halloween',       kw: 'disfraz de halloween',            lang: 'es', loc: 2484, vol: 165000, locName: 'Mexico' },
  { url: '/ja/yukata',                     kw: 'yukata',                          lang: 'ja', loc: 2392, vol: 201000, locName: 'Japan' },
  { url: '/it/prova-abito-sposa',          kw: 'abito da sposa',                  lang: 'it', loc: 2380, vol: 40500,  locName: 'Italy' },
  { url: '/halloween-couples-costumes',    kw: 'couples halloween costumes',      lang: 'en', loc: 2840, vol: 110000, locName: 'US' },
  { url: '/bridesmaid-dress-try-on',       kw: 'cheap bridesmaid dress',          lang: 'en', loc: 2840, vol: 74000,  locName: 'US' },
  { url: '/haircut-for-oval-face',         kw: 'haircut for oval face',           lang: 'en', loc: 2840, vol: 33100,  locName: 'US' },
];

async function dfs(endpoint, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return json.tasks?.[0]?.result?.[0];
}

async function fetchSerp(t) {
  const r = await dfs('serp/google/organic/live/advanced',
    [{ keyword: t.kw, language_code: t.lang, location_code: t.loc, depth: 10, device: 'desktop' }]);
  return (r?.items || []).filter((it) => it.type === 'organic').slice(0, 10);
}

async function backlinks(target) {
  try {
    const res = await fetch('https://api.dataforseo.com/v3/backlinks/summary/live',
      { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
        body: JSON.stringify([{ target, internal_list_limit: 1 }]) });
    const json = await res.json();
    const r = json.tasks?.[0]?.result?.[0];
    return {
      refDomains: r?.referring_main_domains ?? r?.referring_domains ?? 0,
      backlinks: r?.backlinks ?? 0,
      rank: r?.rank ?? 0,
    };
  } catch { return { refDomains: 0, backlinks: 0, rank: 0 }; }
}

function apexOf(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, '').split('.').slice(-2).join('.'); } catch { return ''; }
}

// Median + percentile
const median = (arr) => { const s = [...arr].sort((a, b) => a - b); return s[Math.floor(s.length / 2)] || 0; };
const p25 = (arr) => { const s = [...arr].sort((a, b) => a - b); return s[Math.floor(s.length * 0.25)] || 0; };

// Get agalaz.com's current referring domains
console.log('\n=== AGALAZ.COM CURRENT BACKLINK PROFILE ===');
const agalazBl = await backlinks('agalaz.com');
console.log(`  Referring domains:  ${agalazBl.refDomains}`);
console.log(`  Total backlinks:    ${agalazBl.backlinks}`);
console.log(`  Domain rank (DFS):  ${agalazBl.rank}`);

console.log('\n\n=== COMPETITOR BACKLINK ANALYSIS — TOP 10 PER KEYWORD ===\n');

const summaries = [];
for (const t of TARGETS) {
  console.log(`\n[${t.locName}] ${t.kw}  (vol: ${t.vol.toLocaleString()}/mo)`);
  console.log('  Pos  Ref.domains  Backlinks  Rank  Domain');
  try {
    const serp = await fetchSerp(t);
    const competitors = [];
    for (const [i, item] of serp.entries()) {
      const apex = apexOf(item.url || '');
      if (!apex || apex.includes('agalaz')) continue;
      const bl = await backlinks(apex);
      competitors.push({ pos: i + 1, apex, ...bl });
      console.log(`  ${(i + 1).toString().padStart(3)}  ${bl.refDomains.toString().padStart(11)}  ${bl.backlinks.toString().padStart(9)}  ${bl.rank.toString().padStart(4)}  ${apex}`);
      await new Promise((r) => setTimeout(r, 200));
    }
    if (competitors.length) {
      const refs = competitors.map((c) => c.refDomains).filter((n) => n > 0);
      const med = median(refs);
      const p25v = p25(refs);
      const min = Math.min(...refs);
      const gap = Math.max(0, p25v - agalazBl.refDomains);
      summaries.push({ ...t, median: med, p25: p25v, min, gap, currentAgalaz: agalazBl.refDomains });
      console.log(`  ─────────────────────────────────────`);
      console.log(`  Median ref.domains in top 10: ${med}`);
      console.log(`  25th percentile (floor):       ${p25v}`);
      console.log(`  Min in top 10:                  ${min}`);
      console.log(`  → Agalaz needs ~${p25v} ref.domains to break into top 10 (gap: ${gap})`);
    }
  } catch (e) {
    console.log(`  FAIL: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 250));
}

// ── Final summary ─────────────────────────────────────────────────────────
console.log('\n\n=== TARGETS — HOW MANY BACKLINKS YOU NEED ===\n');
console.log('  Country  URL                              Vol/mo    Current  Floor  Median  Gap to top 10');
console.log('  -------  -------------------------------  --------  -------  -----  ------  -------------');
for (const s of summaries) {
  console.log(
    `  ${s.locName.padEnd(7)}  ${s.url.padEnd(31)}  ${s.vol.toLocaleString().padStart(8)}  ${s.currentAgalaz.toString().padStart(7)}  ${s.p25.toString().padStart(5)}  ${s.median.toString().padStart(6)}  ${s.gap.toString().padStart(13)}`,
  );
}

// Total budget calculation
const totalGap = summaries.reduce((sum, s) => sum + s.gap, 0);
const dedupedGap = Math.round(totalGap * 0.4); // 60% reduction because backlinks help multiple URLs simultaneously
console.log('\n\n=== FREELANCER BUDGET ESTIMATE ===\n');
console.log(`  Total individual gap (sum):  ${totalGap} ref.domains`);
console.log(`  Realistic deduped target:    ${dedupedGap} unique ref.domains  (a single backlink to agalaz.com boosts ALL pages on agalaz)`);

const tiers = [
  { label: 'BUDGET (DA 20-35, fashion/beauty niche)',      pricePerLink: 60,   pct: 0.4 },
  { label: 'MID (DA 35-55, guest posts on real blogs)',     pricePerLink: 180, pct: 0.5 },
  { label: 'PREMIUM (DA 55+, press/editorial mentions)',    pricePerLink: 500, pct: 0.1 },
];
let totalCost = 0;
for (const t of tiers) {
  const count = Math.round(dedupedGap * t.pct);
  const cost = count * t.pricePerLink;
  totalCost += cost;
  console.log(`  ${t.label.padEnd(48)} → ${count.toString().padStart(3)} links × $${t.pricePerLink.toString().padStart(3)} = $${cost.toLocaleString().padStart(6)}`);
}
console.log(`  ─────────────────────────────────────────────────────────────────────────`);
console.log(`  TOTAL ESTIMATED COST:                                                       $${totalCost.toLocaleString()}`);
console.log(`  Time to acquire:  2-4 months (5-10 links/week realistic with 2-3 freelancers)`);

fs.writeFileSync('tmp/backlinks-needed.json', JSON.stringify({ agalazBl, summaries }, null, 2));
console.log('\nWrote tmp/backlinks-needed.json');
