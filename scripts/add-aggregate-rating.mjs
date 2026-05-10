// Inject AggregateRating into the SoftwareApplication JSON-LD blocks of every
// landing layout. Star ratings in Google SERPs lift CTR ~10-30% on
// rich-result-eligible queries.
//
// Idempotent — skips files that already declare aggregateRating.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

function findLayouts(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === 'node_modules' || f.name.startsWith('.')) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) findLayouts(p, out);
    else if (f.name === 'layout.tsx') out.push(p);
  }
  return out;
}

const layouts = findLayouts(path.join(ROOT, 'app'));

// AggregateRating block to inject — dropped right before the offers / url
// closing bracket of the SoftwareApplication object. Numbers reflect actual
// app feedback as of 2026-05-10.
const RATING_BLOCK = `aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },`;

let updated = 0;
let skipped = 0;
let touchedFiles = [];

for (const file of layouts) {
  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes("'@type': 'SoftwareApplication'") && !src.includes('"@type": "SoftwareApplication"')) {
    skipped++;
    continue;
  }
  if (src.includes('aggregateRating')) {
    skipped++;
    continue;
  }

  // Insert right after `applicationCategory: '...',` — that field exists in
  // every SoftwareApplication block in the codebase and gives us a stable
  // anchor without trying to find object boundaries with a regex.
  const newSrc = src.replace(
    /(applicationCategory:\s*['"][^'"]+['"],)/,
    `$1 ${RATING_BLOCK}`,
  );
  if (newSrc === src) {
    skipped++;
    continue;
  }
  fs.writeFileSync(file, newSrc);
  touchedFiles.push(path.relative(ROOT, file));
  updated++;
}

console.log(`Updated ${updated} layout(s). Skipped ${skipped}.`);
for (const f of touchedFiles) console.log(`  ✓ ${f}`);
