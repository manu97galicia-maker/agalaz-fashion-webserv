// Inventory of every keyword present in the site's metadata, used to size up
// a DataForSEO bulk lookup ($0.01 per task + $0.0001 per keyword item).

import fs from 'fs';
import path from 'path';

function findFiles(dir, ext, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === 'node_modules' || f.name.startsWith('.')) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) findFiles(p, ext, out);
    else if (f.name.endsWith(ext)) out.push(p);
  }
  return out;
}

const all = new Set();
const filesScanned = ['app', 'lib'].flatMap((d) =>
  findFiles(d, '.tsx').concat(findFiles(d, '.ts'))
);

let pagesWithArrays = 0;
for (const f of filesScanned) {
  const src = fs.readFileSync(f, 'utf8');
  const m = src.match(/keywords:\s*\[([\s\S]*?)\]/g);
  if (m) {
    for (const block of m) {
      const items = [...block.matchAll(/['"`]([^'"`]+)['"`]/g)];
      if (items.length > 0) pagesWithArrays++;
      for (const x of items) {
        const kw = x[1].trim().toLowerCase();
        if (kw.length > 2 && kw.length < 100) all.add(kw);
      }
    }
  }
}

// Blog articles each have a `keyword:` (singular) primary target.
const articlesSrc = fs.readFileSync('app/blog/articles.ts', 'utf8');
let blogKwCount = 0;
for (const m of articlesSrc.matchAll(/keyword:\s*['"`]([^'"`]+)['"`]/g)) {
  const kw = m[1].trim().toLowerCase();
  if (kw.length > 2) { all.add(kw); blogKwCount++; }
}

// Blog title strings are also indexable as long-tail queries.
const titles = [...articlesSrc.matchAll(/^\s*title:\s*['"`]([^'"`]+)['"`]/gm)].length;
const titlesEs = [...articlesSrc.matchAll(/^\s*titleEs:\s*['"`]([^'"`]+)['"`]/gm)].length;

console.log('=== KEYWORD INVENTORY ===');
console.log(`Pages with metadata keywords[] array:  ${pagesWithArrays}`);
console.log(`Blog articles with primary keyword:    ${blogKwCount}`);
console.log(`Blog titles EN:                        ${titles}`);
console.log(`Blog titles ES:                        ${titlesEs}`);
console.log(`Unique keywords pool:                  ${all.size}\n`);

function cost(n) {
  const tasks = Math.ceil(n / 1000);
  const taskCost = tasks * 0.01;
  const itemCost = n * 0.0001;
  return { tasks, taskCost, itemCost, total: taskCost + itemCost };
}

const c = cost(all.size);
console.log('=== COST: analyze ONLY current site keywords ===');
console.log(`Tasks needed:  ${c.tasks} × $0.01  = $${c.taskCost.toFixed(2)}`);
console.log(`Items:         ${all.size} × $0.0001 = $${c.itemCost.toFixed(4)}`);
console.log(`TOTAL:         $${c.total.toFixed(4)}\n`);

// What if you expand to include long-tail variations? Each landing typically
// generates ~5-10 long-tail variants from the title (e.g. "best free virtual
// try-on", "ai virtual try-on free", etc.). Conservative ×3 multiplier.
const expanded = all.size * 3;
const ce = cost(expanded);
console.log('=== COST: expand to long-tail (×3 variants per keyword) ===');
console.log(`Total keywords: ${expanded}`);
console.log(`Tasks:          ${ce.tasks} × $0.01  = $${ce.taskCost.toFixed(2)}`);
console.log(`Items:          ${expanded} × $0.0001 = $${ce.itemCost.toFixed(4)}`);
console.log(`TOTAL:          $${ce.total.toFixed(4)}\n`);

console.log('=== COST: full competitive sweep (1,000 keywords) ===');
const c1k = cost(1000);
console.log(`TOTAL:          $${c1k.total.toFixed(4)}`);
console.log('\n=== COST: industry-wide (10,000 keywords) ===');
const c10k = cost(10000);
console.log(`TOTAL:          $${c10k.total.toFixed(4)}`);
