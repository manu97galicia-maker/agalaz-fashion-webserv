// Audit any title in app/blog/articles.ts that is > 60 chars (Bing limit).
// Reports both `title` (en) and `titleEs` (es) lengths.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const file = path.join(ROOT, 'app', 'blog', 'articles.ts');
const src = fs.readFileSync(file, 'utf8');

const slugMatches = [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const titleMatches = [...src.matchAll(/title:\s*['"]([^'"\\]*(?:\\.[^'"\\]*)*)['"]/g)];
const titleEsMatches = [...src.matchAll(/titleEs:\s*['"]([^'"\\]*(?:\\.[^'"\\]*)*)['"]/g)];

const total = Math.min(slugMatches.length, titleMatches.length, titleEsMatches.length);

let longCount = 0;
for (let i = 0; i < total; i++) {
  const slug = slugMatches[i][1];
  const title = titleMatches[i][1];
  const titleEs = titleEsMatches[i][1];

  if (title.length > 60 || titleEs.length > 60) {
    longCount++;
    console.log(`\n${slug}`);
    if (title.length > 60) console.log(`  EN  (${title.length})  ${title}`);
    if (titleEs.length > 60) console.log(`  ES  (${titleEs.length})  ${titleEs}`);
  }
}

console.log(`\nTotal long: ${longCount}`);
