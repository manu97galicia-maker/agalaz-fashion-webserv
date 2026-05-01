// One-off auditor: simulates the pickRelated logic from app/blog/[slug]/page.tsx
// to show how many inbound "Related Reads" links each article gets.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES = path.join(__dirname, '../app/blog/articles.ts');

const STOPWORDS = new Set(['the','a','an','and','or','but','of','to','in','for','on','with','at','by','from','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','can','could','should','may','might','must','shall','i','you','he','she','it','we','they','this','that','these','those','how','why','what','when','where','which','who','whom','your','my','our','their','his','her','its','not','no','if','then','than','so','as','too','very','best','vs','via','use','using','one','get','make','tips','guide']);

function tokenize(s) {
  return new Set(s.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w)));
}

function similarity(a, b) {
  const aTok = tokenize(`${a.title} ${a.keyword} ${a.category ?? ''}`);
  const bTok = tokenize(`${b.title} ${b.keyword} ${b.category ?? ''}`);
  let overlap = 0;
  for (const t of aTok) if (bTok.has(t)) overlap++;
  const union = new Set([...aTok, ...bTok]).size;
  const jaccard = union ? overlap / union : 0;
  const categoryBoost = a.category && b.category && a.category === b.category ? 0.2 : 0;
  return jaccard + categoryBoost;
}

const text = fs.readFileSync(ARTICLES, 'utf8');
const articles = [];
const slugRe = /slug:\s*'([^']+)'/g;
let sm;
while ((sm = slugRe.exec(text)) !== null) {
  const block = text.slice(sm.index, sm.index + 3000);
  const titleMatch = block.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
  const keywordMatch = block.match(/keyword:\s*'((?:[^'\\]|\\.)*)'/);
  const categoryMatch = block.match(/(?<!Es)category:\s*'((?:[^'\\]|\\.)*)'/);
  if (titleMatch && keywordMatch) {
    articles.push({
      slug: sm[1],
      title: titleMatch[1],
      keyword: keywordMatch[1],
      category: categoryMatch ? categoryMatch[1] : '',
    });
  }
}

console.log(`Parsed ${articles.length} articles\n`);

const inboundCount = {};
for (const a of articles) inboundCount[a.slug] = 0;

for (const a of articles) {
  const top3 = articles
    .filter(b => b.slug !== a.slug)
    .map(b => ({ slug: b.slug, score: similarity(a, b) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, 3);
  for (const t of top3) inboundCount[t.slug]++;
}

const sorted = Object.entries(inboundCount).sort((a, b) => a[1] - b[1]);
for (const [slug, count] of sorted) {
  const flag = count === 0 ? ' ORPHAN' : count === 1 ? ' weak' : '';
  console.log(`${count.toString().padStart(2)} <- ${slug}${flag}`);
}
