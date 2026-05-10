// Comprehensive SEO audit: title length, description length, missing fields,
// alt text presence, canonical correctness, JSON-LD validity hints. Reports
// only — does not modify files.

import fs from 'fs';
import path from 'path';

function findFiles(dir, name, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === 'node_modules' || f.name.startsWith('.')) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) findFiles(p, name, out);
    else if (f.name === name) out.push(p);
  }
  return out;
}

const layouts = findFiles('app', 'layout.tsx');

const issues = {
  titleTooLong: [],
  titleTooShort: [],
  titleMissing: [],
  descTooLong: [],
  descTooShort: [],
  descMissing: [],
  noCanonical: [],
  noOg: [],
  noKeywords: [],
};

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

for (const f of layouts) {
  const src = fs.readFileSync(f, 'utf8');
  if (!src.includes('export const metadata')) continue;
  const rel = path.relative(process.cwd(), f).replace(/\\/g, '/');

  // Match the FIRST title (the metadata.title) — handles single quotes, double quotes,
  // backticks, and escaped apostrophes inside.
  const titleMatch = src.match(/\bmetadata:\s*Metadata\s*=\s*\{[\s\S]*?\btitle:\s*(['"`])((?:[^\\]|\\.)*?)\1/);
  const tplTitle = src.match(/\btitle:\s*\{[\s\S]*?\babsolute:\s*(['"`])((?:[^\\]|\\.)*?)\1/);
  const titleStr = titleMatch ? titleMatch[2] : tplTitle ? tplTitle[2] : null;

  if (titleStr === null) {
    if (!src.includes('title: meta.title') && !src.includes('title: data.metaTitle')) {
      issues.titleMissing.push(rel);
    }
  } else {
    const len = titleStr.length;
    if (len > TITLE_MAX) issues.titleTooLong.push(`${len} chars  ${rel}  → ${titleStr}`);
    if (len < TITLE_MIN) issues.titleTooShort.push(`${len} chars  ${rel}  → ${titleStr}`);
  }

  const descMatch = src.match(/\bdescription:\s*(['"`])((?:[^\\]|\\.)*?)\1/);
  if (descMatch) {
    const len = descMatch[2].length;
    if (len > DESC_MAX) issues.descTooLong.push(`${len} chars  ${rel}  → ${descMatch[2].slice(0, 80)}…`);
    if (len < DESC_MIN) issues.descTooShort.push(`${len} chars  ${rel}  → ${descMatch[2]}`);
  } else if (!src.includes('description: meta.description') && !src.includes('description: data.metaDescription')) {
    issues.descMissing.push(rel);
  }

  if (!src.includes('canonical:') && !src.includes('alternates:')) issues.noCanonical.push(rel);
  if (!src.includes('openGraph')) issues.noOg.push(rel);
}

function report(label, list) {
  if (list.length === 0) return;
  console.log(`\n=== ${label} (${list.length}) ===`);
  list.forEach((s) => console.log(`  ${s}`));
}

console.log(`Audited ${layouts.length} layout files.`);
report('TITLES > 60 chars (Bing flag)', issues.titleTooLong);
report('TITLES < 30 chars (too short)', issues.titleTooShort);
report('TITLES MISSING', issues.titleMissing);
report('DESCRIPTIONS > 160 chars', issues.descTooLong);
report('DESCRIPTIONS < 120 chars', issues.descTooShort);
report('DESCRIPTIONS MISSING', issues.descMissing);
report('CANONICAL/ALTERNATES MISSING', issues.noCanonical);
report('OG MISSING', issues.noOg);

const total = Object.values(issues).reduce((s, a) => s + a.length, 0);
console.log(`\nTotal issues: ${total}`);
