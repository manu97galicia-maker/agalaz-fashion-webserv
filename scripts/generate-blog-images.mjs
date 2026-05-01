// Generates one hero image per blog article using Google Imagen 3.
// Run with:    GEMINI_API_KEY=xxx node scripts/generate-blog-images.mjs
// Idempotent: skips slugs that already have an image in public/blog-images/.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_PATH = path.join(ROOT, 'app/blog/articles.ts');
const OUTPUT_DIR = path.join(ROOT, 'public/blog-images');

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.IMAGEN_MODEL || 'imagen-3.0-generate-002';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;

if (!API_KEY) {
  console.error('GEMINI_API_KEY is not set. Get one at https://aistudio.google.com/apikey');
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Parse articles.ts as text — extracts slug, title, keyword, category.
function parseArticles() {
  const text = fs.readFileSync(ARTICLES_PATH, 'utf8');
  const articles = [];
  const slugRe = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = slugRe.exec(text)) !== null) {
    const block = text.slice(m.index, m.index + 3000);
    const titleMatch = block.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
    const keywordMatch = block.match(/keyword:\s*'((?:[^'\\]|\\.)*)'/);
    const categoryMatch = block.match(/(?<!Es)category:\s*'((?:[^'\\]|\\.)*)'/);
    if (titleMatch && keywordMatch) {
      articles.push({
        slug: m[1],
        title: titleMatch[1].replace(/\\'/g, "'"),
        keyword: keywordMatch[1],
        category: categoryMatch ? categoryMatch[1] : '',
      });
    }
  }
  return articles;
}

// Build a Vogue-editorial prompt that nudges Imagen toward the brand aesthetic
// (minimalist, magazine cover, neutral with one accent) and away from generic
// stock-photo collages.
function buildPrompt({ title, keyword, category }) {
  const base = [
    'Editorial fashion magazine hero photograph, 16:9 widescreen.',
    'Minimalist, high-end aesthetic — Vogue / Elle / Harper\'s Bazaar style.',
    'Soft natural light, neutral palette (cream, beige, off-white, muted slate) with one quiet accent color.',
    'Premium camera depth-of-field, slight film grain, subtle shadows.',
    'Composition leaves room for a headline (clean negative space, no text in the image itself).',
    'Subject feels modern, aspirational, NOT stock-photo or AI-obvious.',
  ].join(' ');

  return `${base}\n\nArticle topic: "${title}"\nVisual focus: ${keyword}.\nCategory: ${category || 'fashion'}.`;
}

async function generateOne({ slug, title, keyword, category }) {
  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
  if (fs.existsSync(outputPath)) {
    console.log(`-  skip  ${slug} (already exists)`);
    return { slug, status: 'skipped' };
  }

  const prompt = buildPrompt({ title, keyword, category });

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '16:9',
        personGeneration: 'allow_adult',
        safetyFilterLevel: 'block_only_high',
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log(`✗  fail  ${slug} — HTTP ${res.status}: ${errText.slice(0, 200)}`);
    return { slug, status: 'failed', error: `HTTP ${res.status}` };
  }

  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) {
    console.log(`✗  fail  ${slug} — no image returned: ${JSON.stringify(data).slice(0, 200)}`);
    return { slug, status: 'failed', error: 'no image in response' };
  }

  fs.writeFileSync(outputPath, Buffer.from(b64, 'base64'));
  const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`✓  done  ${slug} (${sizeKB} KB)`);
  return { slug, status: 'done', sizeKB };
}

async function main() {
  const articles = parseArticles();
  console.log(`Found ${articles.length} articles. Generating images to ${OUTPUT_DIR}\n`);

  const results = { done: 0, skipped: 0, failed: 0 };
  for (const article of articles) {
    const r = await generateOne(article);
    results[r.status]++;
    // Imagen rate limit ~ 5 req/s on paid tier, much lower on free. Be polite.
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  console.log(`\nDone: ${results.done} generated, ${results.skipped} skipped, ${results.failed} failed.`);
  if (results.failed > 0) {
    console.log('Re-run the script to retry only the failed ones (idempotent).');
  }
}

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
