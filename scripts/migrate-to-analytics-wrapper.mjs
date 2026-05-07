// One-shot migration: replace every `(window as any).datafast?.(name, props)`
// call with `track('name', props)` from the new lib/analytics.ts wrapper.
//
// Touches: app/onboarding/page.tsx, app/page.tsx, app/paywall/page.tsx,
// app/try-on/page.tsx, app/virtual-try-on/page.tsx.
//
// Also injects the import statement at the top if missing.

import fs from 'fs';
import path from 'path';

const FILES = [
  'app/onboarding/page.tsx',
  'app/page.tsx',
  'app/paywall/page.tsx',
  'app/try-on/page.tsx',
  'app/virtual-try-on/page.tsx',
];

const ROOT = process.cwd();
const IMPORT_LINE = "import { track } from '@/lib/analytics';";

let totalReplacements = 0;

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  let src = fs.readFileSync(file, 'utf8');

  // Replace `(window as any).datafast?.('name', { ... })` → `track('name', { ... })`
  // Replace `(window as any).datafast?.('name')` → `track('name')`
  const re = /\(window as any\)\.datafast\?\.\(/g;
  let count = 0;
  const newSrc = src.replace(re, () => { count++; return 'track('; });

  if (count === 0) {
    console.log(`-  skip   ${rel}  (no datafast calls)`);
    continue;
  }

  // Inject import if missing — place it after the last existing `import` line.
  let finalSrc = newSrc;
  if (!finalSrc.includes(IMPORT_LINE)) {
    const importLines = [...finalSrc.matchAll(/^import .*$/gm)];
    if (importLines.length === 0) {
      console.log(`✗  no imports found in ${rel}, skipping import injection`);
    } else {
      const lastImport = importLines[importLines.length - 1];
      const insertAt = lastImport.index + lastImport[0].length;
      finalSrc = finalSrc.slice(0, insertAt) + '\n' + IMPORT_LINE + finalSrc.slice(insertAt);
    }
  }

  fs.writeFileSync(file, finalSrc);
  console.log(`✓  done   ${rel.padEnd(35)}  ${count} call(s) migrated`);
  totalReplacements += count;
}

console.log(`\nTotal: ${totalReplacements} datafast → track migrations.`);
