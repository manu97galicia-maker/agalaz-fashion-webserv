// Find current Google ranking position of agalaz.com for a given keyword.
import fs from 'fs';
import path from 'path';

function loadEnvLocal() {
  const file = path.join(process.cwd(), '.env.local');
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
loadEnvLocal();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

// Keywords to check + location
const CHECKS = [
  { kw: 'look festa junina',          lang: 'pt', loc: 2076 }, // BR
  { kw: 'fantasia festa junina',      lang: 'pt', loc: 2076 },
  { kw: 'vestido invitada boda',      lang: 'es', loc: 2724 }, // ES
  { kw: 'cheap bridesmaid dress',     lang: 'en', loc: 2840 }, // US
  { kw: 'almond nails',               lang: 'en', loc: 2840 },
  { kw: 'couples halloween costumes', lang: 'en', loc: 2840 },
  { kw: 'haircut for oval face',      lang: 'en', loc: 2840 },
  { kw: 'tenue bapteme femme',        lang: 'fr', loc: 2250 },
];

async function fetchSerp({ kw, lang, loc }) {
  const body = [{ keyword: kw, language_code: lang, location_code: loc, depth: 100, device: 'desktop' }];
  const res = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return (json.tasks?.[0]?.result?.[0]?.items || []).filter((it) => it.type === 'organic');
}

for (const c of CHECKS) {
  process.stdout.write(`[${c.lang}] ${c.kw.padEnd(35)} `);
  try {
    const items = await fetchSerp(c);
    const hit = items.findIndex((it) => (it.url || '').includes('agalaz.com'));
    const pos = hit === -1 ? null : (items[hit].rank_absolute ?? hit + 1);
    if (pos) {
      console.log(`agalaz.com @ pos ${pos} → ${items[hit].url}`);
    } else {
      // Show what's in top 5 so user understands the competition
      const top5 = items.slice(0, 5).map((it, i) => `#${i + 1} ${it.url?.replace(/^https?:\/\//, '').split('/')[0]}`).join(', ');
      console.log(`NOT in top 100. Top 5: ${top5}`);
    }
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}
