// Adds a full openGraph block to the 12 minimal landing layouts that only
// have title/description/alternates. Without their own openGraph, Ahrefs sees
// `og:url = https://agalaz.com` (root) inherited from the parent layout, which
// is the "incomplete OG / wrong canonical" warning on the report.
//
// Each of these layouts already imports `nativeLandingUrl` and uses it for the
// canonical, so we reuse that to set `openGraph.url` correctly.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const APP = path.join(ROOT, 'app');

// Map: layout path → { canonical, lang, locale }
const TARGETS = [
  ['de/bikini-anprobieren',         'realistic-swimwear-try-on', 'de', 'de_DE'],
  ['de/ohrringe-anprobieren',       'virtual-earring-try-on',    'de', 'de_DE'],
  ['de/tattoo-simulator',           'virtual-tattoo-simulator',  'de', 'de_DE'],
  ['fr/essayage-bikini',            'realistic-swimwear-try-on', 'fr', 'fr_FR'],
  ['fr/essayage-boucles-oreilles',  'virtual-earring-try-on',    'fr', 'fr_FR'],
  ['fr/simulateur-tatouage',        'virtual-tattoo-simulator',  'fr', 'fr_FR'],
  ['it/prova-bikini',               'realistic-swimwear-try-on', 'it', 'it_IT'],
  ['it/prova-orecchini',            'virtual-earring-try-on',    'it', 'it_IT'],
  ['it/simulatore-tatuaggi',        'virtual-tattoo-simulator',  'it', 'it_IT'],
  ['pt/provador-biquini',           'realistic-swimwear-try-on', 'pt', 'pt_PT'],
  ['pt/provador-brincos',           'virtual-earring-try-on',    'pt', 'pt_PT'],
  ['pt/simulador-tatuagem',         'virtual-tattoo-simulator',  'pt', 'pt_PT'],
];

let updated = 0;

for (const [routePath, canonical, lang, locale] of TARGETS) {
  const file = path.join(APP, routePath, 'layout.tsx');
  const src = fs.readFileSync(file, 'utf8');

  if (/openGraph:\s*\{/.test(src)) {
    console.log(`-  skip   ${routePath}  (already has openGraph)`);
    continue;
  }

  // Match the alternates block — we'll inject openGraph right after the closing }, of alternates
  const altMatch = src.match(/(alternates:\s*\{[\s\S]*?\n\s*\},)/);
  if (!altMatch) {
    console.log(`✗  fail   ${routePath}  (no alternates block to anchor on)`);
    continue;
  }

  // Pull the title/description literals VERBATIM (with their original quotes
  // and escapes) so we don't double-escape apostrophes in fr/de/pt strings.
  const titleLit = src.match(/title:\s*(['"][^\n]*?['"]),/);
  const descLit = src.match(/description:\s*(['"][^\n]*?['"]),/);
  const title = titleLit ? titleLit[1] : "'Agalaz Fashion'";
  const description = descLit ? descLit[1] : "'AI Virtual Try-On'";

  const ogBlock = `
  openGraph: {
    title: ${title},
    description: ${description},
    type: 'website',
    url: nativeLandingUrl('${canonical}', '${lang}'),
    siteName: 'Agalaz Fashion',
    locale: '${locale}',
    images: [{ url: '/og/${canonical}.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },`;

  const newSrc = src.replace(altMatch[1], altMatch[1] + ogBlock);
  fs.writeFileSync(file, newSrc);
  console.log(`✓  done   ${routePath}`);
  updated++;
}

console.log(`\nUpdated ${updated} layouts.`);
