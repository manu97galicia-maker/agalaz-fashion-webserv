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
const MODEL = process.env.IMAGEN_MODEL || 'imagen-4.0-fast-generate-001';
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

// Build a clean editorial prompt. Earlier versions referenced "Vogue / Elle"
// style — Imagen interpreted that as licence to embed actual magazine
// branding (VOGUE wordmarks, fake mastheads), which is a trademark issue.
// The current prompt avoids any real publication name and adds an explicit
// negative-constraint sentence the model usually respects.
// Some slugs need an explicit framing because the keyword alone is too
// abstract for Imagen (e.g. "spring nails" without "hands" yields empty
// rooms). The map below converts that abstract topic into a concrete,
// photographable subject sentence.
function subjectOverride(slug) {
  if (/nail/.test(slug)) return 'A tight close-up of one woman\'s beautifully manicured hands resting elegantly on a neutral surface. The nail design is the clear visual focus.';
  if (/glasses|earring|piercing|ear/.test(slug)) return 'A clean studio portrait of a woman from the shoulders up, three-quarter angle. The accessory on her face / ears is the clear visual focus.';
  if (/diamond|carat|jewelry/.test(slug)) return 'A close-up of a woman\'s hand, slightly raised, with the ring or jewellery as the clear visual focus.';
  if (/swimwear|bikini/.test(slug)) return 'An outdoor lifestyle photograph of a woman in swimwear by a pool or beach. Tasteful, magazine-style, full-body framing.';
  if (/tattoo/.test(slug)) return 'A close-up of inked skin (forearm, shoulder, or back) showing a tattoo design clearly. Studio lighting, neutral background.';
  if (/wedding|gown|bridal/.test(slug)) return 'A full-length editorial portrait of a woman in a wedding gown, soft natural daylight, minimalist architectural background.';
  if (/face-shape|interview|office|corporate|job/.test(slug)) return 'A clean studio portrait of a woman in tailored, modern outfit, three-quarter angle, professional yet approachable.';
  return null;
}

function buildPrompt({ slug, title, keyword, category }) {
  const base = [
    'High-end editorial fashion photograph, 16:9 widescreen format.',
    'Minimalist, modern, aspirational composition.',
    'Soft natural daylight, neutral palette (cream, beige, off-white, warm taupe, muted slate) with at most one quiet accent color.',
    'Shallow depth of field, gentle film grain, subtle shadows on a clean studio or architectural backdrop.',
    'Photographic realism — looks captured by a professional photographer, not AI-generated.',
    'STRICT: no text, no letters, no words, no captions, no watermarks, no logos, no brand names, no magazine cover elements, no mastheads, no typography of any kind anywhere in the frame.',
  ].join(' ');

  const subject = subjectOverride(slug) || `Visual focus: ${keyword}.`;

  return `${base}\n\n${subject}\n\nMood / theme to evoke: "${title}". Category: ${category || 'fashion'}.`;
}

async function generateOne({ slug, title, keyword, category }) {
  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
  if (fs.existsSync(outputPath)) {
    console.log(`-  skip  ${slug} (already exists)`);
    return { slug, status: 'skipped' };
  }

  const prompt = buildPrompt({ slug, title, keyword, category });

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
