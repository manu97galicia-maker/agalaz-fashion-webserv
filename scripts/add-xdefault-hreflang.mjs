// Add `'x-default'` to the languages map in every long-tail / blog landing
// layout that's missing it. The x-default tells Google which URL to serve
// users from countries/languages we don't have an explicit hreflang for.
//
// Targets (12 layouts): the ones Ahrefs flagged as missing x-default.
// We append `'x-default': url` immediately after the existing language
// entries inside `languages: { ... }`.
//
// Idempotent — bails if the file already contains `'x-default'`.

import fs from 'fs';

const TARGETS = [
  // ES nail cluster (Round 7)
  'app/es/unas-verano-2026/layout.tsx',
  'app/es/disenos-de-unas/layout.tsx',
  'app/es/unas-de-gel-disenos/layout.tsx',
  'app/es/unas-francesas-disenos/layout.tsx',
  // ES costume cluster
  'app/es/disfraces-caseros/layout.tsx',
  'app/es/cosplay/layout.tsx',
  'app/es/disfraz-carnaval/layout.tsx',
  'app/es/disfraz-halloween-pareja/layout.tsx',
  'app/es/disfraz-de-halloween/layout.tsx',
  // PT mega-landings (Round 8)
  'app/pt/unhas-decoradas/layout.tsx',
  'app/pt/vestido-de-noiva/layout.tsx',
  'app/pt/corte-de-cabelo-feminino/layout.tsx',
  // FR mega-landing (Round 8)
  'app/fr/robe-de-mariee/layout.tsx',
];

let touched = 0;
let skipped = 0;
let missing = 0;

for (const file of TARGETS) {
  if (!fs.existsSync(file)) {
    console.log(`MISS ${file}`);
    missing++;
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  if (src.includes("'x-default'") || src.includes('"x-default"')) {
    console.log(`SKIP ${file} (already has x-default)`);
    skipped++;
    continue;
  }

  // Match patterns like:
  //   languages: { 'pt': url, 'pt-BR': url, 'pt-PT': url }
  //   languages: { 'fr': url, 'fr-FR': url, 'fr-BE': url, 'fr-CA': url }
  // We insert 'x-default': url just before the closing brace.
  const updated = src.replace(
    /(languages:\s*\{[^}]*?)(\s*\})/,
    (_match, body, close) => {
      // If the body already ends with a comma, keep it; otherwise add one.
      const trimmed = body.trimEnd();
      const sep = trimmed.endsWith(',') ? ' ' : ', ';
      return `${trimmed}${sep}'x-default': url${close}`;
    },
  );

  if (updated === src) {
    console.log(`FAIL ${file} (couldn't match languages pattern)`);
    continue;
  }

  fs.writeFileSync(file, updated);
  console.log(`OK   ${file}`);
  touched++;
}

console.log(`\n${touched} updated, ${skipped} already done, ${missing} missing.`);
