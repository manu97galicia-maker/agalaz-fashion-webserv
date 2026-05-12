// Adds `triptychSlug` + `triptychLang` to every `buildLocalizedJsonLd()` call
// across the 50 localized landing layouts. The slug + lang are parsed from the
// `localizedLandings[<slug>][<lang>]` lookup that already exists at the top of
// each file, so no manual edits are needed.

import fs from 'fs';
import path from 'path';

const ROOT = 'app';
const LANGS = ['es', 'fr', 'pt', 'de', 'it'];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name === 'layout.tsx') out.push(p);
  }
  return out;
}

let touched = 0;
for (const file of walk(ROOT)) {
  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes('buildLocalizedJsonLd(')) continue;
  if (src.includes('triptychSlug')) continue; // already done

  // Parse: const data = localizedLandings['<slug>']['<lang>'];
  const m = src.match(/localizedLandings\[\s*['"]([^'"]+)['"]\s*\]\[\s*['"]([^'"]+)['"]\s*\]/);
  if (!m) {
    console.log(`SKIP ${file} (no localizedLandings[slug][lang] line)`);
    continue;
  }
  const [, slug, lang] = m;
  if (!LANGS.includes(lang)) {
    console.log(`SKIP ${file} (lang=${lang} not in supported set)`);
    continue;
  }

  // Find the closing brace + paren of buildLocalizedJsonLd({...})
  // Pattern is multi-line, ends with `});` — we inject before the `});`.
  const updated = src.replace(
    /(buildLocalizedJsonLd\(\{[\s\S]*?breadcrumbName:[^,]+,)(\s*\}\);)/,
    (_, head, tail) => `${head}\n  triptychSlug: '${slug}',\n  triptychLang: '${lang}',${tail}`,
  );
  if (updated === src) {
    console.log(`SKIP ${file} (could not match buildLocalizedJsonLd block)`);
    continue;
  }
  fs.writeFileSync(file, updated);
  console.log(`OK   ${file} → slug=${slug} lang=${lang}`);
  touched++;
}
console.log(`\nUpdated ${touched} files.`);
