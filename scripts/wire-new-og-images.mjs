// Patches each new landing's layout.tsx OG image reference from the
// inherited `/og/virtual-X.png` (legacy product triptych) to the
// purpose-built `/og/{new-slug}.png` we just generated with Imagen 4.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const PATCHES = [
  ['app/haircut-for-round-face/layout.tsx',     '/og/haircut-round-face.png'],
  ['app/haircut-for-oval-face/layout.tsx',      '/og/haircut-oval-face.png'],
  ['app/haircut-for-diamond-face/layout.tsx',   '/og/haircut-diamond-face.png'],
  ['app/haircut-for-square-face/layout.tsx',    '/og/haircut-square-face.png'],
  ['app/engagement-ring-on-which-hand/layout.tsx', '/og/engagement-ring-hand.png'],
  ['app/pt/look-festa-junina/layout.tsx',       '/og/look-festa-junina.png'],
  ['app/fr/tenue-bapteme/layout.tsx',           '/og/tenue-bapteme.png'],
  ['app/it/vestito-comunione/layout.tsx',       '/og/vestito-comunione.png'],
  ['app/hi/lehenga/layout.tsx',                 '/og/lehenga-online.png'],
  ['app/bridesmaid-dress-try-on/layout.tsx',    '/og/bridesmaid-dress.png'],
  ['app/halloween-couples-costumes/layout.tsx', '/og/halloween-couples.png'],
  ['app/ja/yukata/layout.tsx',                  '/og/yukata.png'],
  ['app/wedding-guest-outfit/layout.tsx',       '/og/wedding-guest-outfit.png'],
  ['app/es/vestido-invitada-boda/layout.tsx',   '/og/vestido-invitada-boda.png'],
  ['app/natural-makeup-look/layout.tsx',        '/og/natural-makeup.png'],
];

let updated = 0;

for (const [rel, newOg] of PATCHES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.log(`✗  miss   ${rel}`);
    continue;
  }
  let src = fs.readFileSync(file, 'utf8');
  // Replace the FIRST occurrence of `url: '/og/<anything>.png'` inside
  // openGraph.images[0]. Both occurrences (openGraph + twitter) get patched
  // since they're both /og/X.png — replaceAll is safe here because each
  // layout only references one OG image path.
  const re = /'\/og\/[a-z0-9-]+\.png'/g;
  const before = src;
  src = src.replace(re, `'${newOg}'`);
  if (src === before) {
    console.log(`-  no-match  ${rel}`);
    continue;
  }
  fs.writeFileSync(file, src);
  console.log(`✓  ${rel.padEnd(50)} → ${newOg}`);
  updated++;
}

console.log(`\nUpdated ${updated} of ${PATCHES.length} layouts.`);
