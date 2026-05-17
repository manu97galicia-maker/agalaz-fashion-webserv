// One-shot: replace generic `alt: 'Agalaz — AI Virtual Try-On'` in every
// layout.tsx with a page-specific alt derived from the openGraph title.
// Idempotent — files without the generic alt are skipped.

import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'app');
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'layout.tsx') files.push(p);
  }
}
walk(APP_DIR);

const GENERIC = "alt: 'Agalaz — AI Virtual Try-On'";
let touched = 0, skipped = 0;

for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  if (!txt.includes(GENERIC)) { skipped++; continue; }

  let ogTitle = null;
  const ogMatch = txt.match(/openGraph\s*:\s*\{[\s\S]{0,400}?title\s*:\s*['"`]([^'"`]+)['"`]/);
  if (ogMatch) ogTitle = ogMatch[1];
  if (!ogTitle) {
    const titleMatch = txt.match(/metadata\s*:\s*Metadata\s*=\s*\{[\s\S]{0,400}?title\s*:\s*['"`]([^'"`]+)['"`]/);
    if (titleMatch) ogTitle = titleMatch[1];
  }
  if (!ogTitle) {
    const rel = path.relative(APP_DIR, path.dirname(f));
    const slug = rel.replace(/[\\/]/g, ' ').replace(/-/g, ' ');
    ogTitle = slug + ' — Agalaz AI Virtual Try-On';
  }

  // Escape single quotes inside the title for safe TS string interpolation
  const safe = ogTitle.replace(/'/g, "\\'");
  const replacement = "alt: '" + safe + "'";
  const newTxt = txt.split(GENERIC).join(replacement);

  if (newTxt !== txt) {
    fs.writeFileSync(f, newTxt);
    touched++;
    console.log('  ' + path.relative(process.cwd(), f) + '  →  "' + ogTitle.slice(0, 70) + '"');
  }
}
console.log('\nTouched: ' + touched + ' files. Skipped: ' + skipped + '.');
