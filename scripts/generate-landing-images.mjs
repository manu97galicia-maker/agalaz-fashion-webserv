// Generates one before/item/after triptych per landing page.
// Run with:    GEMINI_API_KEY=xxx node scripts/generate-landing-images.mjs
// Or:          node --env-file=.env.local scripts/generate-landing-images.mjs
//
// Pipeline per landing:
//   1. Imagen 4.0 fast → "before" image (person/subject without the item)
//   2. Imagen 4.0 fast → "item"   image (product on plain background)
//   3. Gemini 3.1 Flash Image (edit) → "after" (same person from step 1 wearing/with the item from step 2)
//   4. sharp composites the three panels into one 1800x600 triptych
//
// Idempotent: skips a slug if the final triptych already exists.
// Intermediate panels are kept (useful for OG images, cards, etc.).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'public/images/landings');

const API_KEY = process.env.GEMINI_API_KEY;
const IMAGEN_MODEL = process.env.IMAGEN_MODEL || 'imagen-4.0-fast-generate-001';
const EDIT_MODEL = process.env.EDIT_MODEL || 'gemini-3.1-flash-image-preview';
const IMAGEN_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${API_KEY}`;

if (!API_KEY) {
  console.error('GEMINI_API_KEY is not set. Add it to .env.local or pass it inline.');
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const PANEL_SIZE = 600;
const GUTTER = 8;
const TRIPTYCH_W = PANEL_SIZE * 3 + GUTTER * 2;
const TRIPTYCH_H = PANEL_SIZE;

const STYLE_BASE =
  'Editorial product photography. Clean studio lighting, neutral background, soft shadows, photographic realism — looks captured by a professional photographer, not AI-generated. STRICT: no text, no letters, no captions, no watermarks, no logos, no typography of any kind.';

const LANDINGS = [
  {
    slug: 'virtual-tattoo-simulator',
    before: `Close-up photograph of a person's bare forearm and shoulder, clean smooth skin, no tattoos, no markings, neutral studio backdrop, soft daylight, square 1:1 framing. ${STYLE_BASE}`,
    item: `Single tattoo design isolated on a pure white background — a detailed black-ink geometric mountain and pine-tree motif, fine linework, traditional tattoo flash sheet style. The artwork fills most of the frame. Square 1:1. ${STYLE_BASE}`,
    edit: 'Apply the tattoo design from the second image onto the visible skin in the first image as if permanently inked. Follow skin contours and natural lighting. Keep the skin tone, pose, lighting and background of the first image identical. Output one photorealistic image.',
  },
  {
    slug: 'realistic-swimwear-try-on',
    before: `Full-body editorial photograph of a young woman in plain casual clothing — high-waist jeans and a simple white t-shirt, standing relaxed by a modern poolside, natural daylight, minimalist architectural background, square 1:1 framing. ${STYLE_BASE}`,
    item: `A single elegant black one-piece swimsuit (full coverage, classic cut) displayed flat on a clean off-white background, premium swimwear product photography. Square 1:1. ${STYLE_BASE}`,
    edit: 'Replace the casual outfit in the first image with the black one-piece swimsuit from the second image. Keep the woman, her face, hair, pose, the poolside background and the lighting identical. Tasteful editorial fashion photography. Output one photorealistic image.',
  },
  {
    slug: 'virtual-earring-try-on',
    before: `Editorial studio portrait of a young woman from the shoulders up, three-quarter angle, hair tucked behind one ear so the earlobe is visible, no jewelry of any kind, neutral cream backdrop, soft daylight. Square 1:1 framing. ${STYLE_BASE}`,
    item: `A single pair of elegant gold statement drop earrings on a pure white background, premium jewelry product photography, both earrings visible side by side. Square 1:1. ${STYLE_BASE}`,
    edit: 'Place the gold drop earrings from the second image onto both earlobes of the woman in the first image. Match perspective and add subtle reflections. Keep her face, hair, pose, lighting and background identical. Output one photorealistic image.',
  },
  {
    slug: 'virtual-wedding-dress-try-on',
    before: `Full-length editorial photograph of a young woman in plain casual outfit — beige knit sweater and slim trousers, standing in a minimalist sunlit interior, soft natural daylight, neutral palette, square 1:1 framing. ${STYLE_BASE}`,
    item: `A single elegant white A-line wedding gown with delicate lace detailing, displayed on a plain mannequin against a clean off-white background, premium bridal product photography. Square 1:1. ${STYLE_BASE}`,
    edit: 'Replace the casual outfit in the first image with the white A-line wedding gown from the second image. Keep the woman, her face, hair, pose, the sunlit interior and the lighting identical. Output one photorealistic image.',
  },
  {
    slug: 'virtual-nail-try-on',
    before: `Tight close-up of a woman's hands resting elegantly on a neutral marble surface, fingers slightly spread so all fingernails are clearly visible, plain unpainted natural nails, soft daylight, square 1:1 framing. ${STYLE_BASE}`,
    item: `A single nail art reference design on a pure white background — short almond-shape nails painted with a glossy soft pink coquette finish and tiny white floral accents, displayed as a manicure swatch sheet. Square 1:1. ${STYLE_BASE}`,
    edit: 'Apply the nail art design from the second image to every visible fingernail in the first image. Match the perspective and curvature of each nail. Keep the hands, skin tone, marble surface and lighting identical. Output one photorealistic image.',
  },
  {
    slug: 'virtual-glasses-try-on',
    before: `Editorial studio portrait of a young person from the shoulders up, looking straight at the camera, no eyewear of any kind, clean cream backdrop, soft daylight, square 1:1 framing. ${STYLE_BASE}`,
    item: `A single pair of designer tortoiseshell-acetate optical eyeglasses with rectangular frames, displayed on a pure white background, premium eyewear product photography. Square 1:1. ${STYLE_BASE}`,
    edit: 'Place the tortoiseshell glasses from the second image onto the bridge of the nose of the person in the first image. Adjust frame width to match face width naturally. Add realistic lens reflections and a subtle shadow on the cheek. Keep face, hair, pose, lighting and background identical. Output one photorealistic image.',
  },
  {
    slug: 'virtual-jewelry-try-on',
    before: `Editorial studio portrait of a young woman from the shoulders up, three-quarter angle, neck and collarbone clearly visible, hair pulled back, no jewelry of any kind, clean neutral backdrop, soft daylight, square 1:1 framing. ${STYLE_BASE}`,
    item: `A single elegant gold pendant necklace with a small teardrop charm, displayed on a clean off-white background, premium jewelry product photography. Square 1:1. ${STYLE_BASE}`,
    edit: 'Drape the gold pendant necklace from the second image around the neck of the woman in the first image. Make the chain follow the collarbone naturally and let the pendant rest below the collarbone notch. Keep face, hair, pose, lighting and background identical. Output one photorealistic image.',
  },
  {
    slug: 'virtual-mens-suit-try-on',
    before: `Full-body editorial photograph of a young man in plain casual clothing — slim blue jeans and a plain grey crewneck t-shirt, standing relaxed against a clean studio backdrop, natural daylight, square 1:1 framing. ${STYLE_BASE}`,
    item: `A single navy-blue two-piece tailored suit (single-breasted blazer + matching trousers) displayed on a plain mannequin against a clean off-white background, premium menswear product photography. Square 1:1. ${STYLE_BASE}`,
    edit: 'Replace the casual jeans and t-shirt in the first image with the navy-blue two-piece tailored suit from the second image, including both jacket and matching trousers. Keep the man, his face, pose, the studio backdrop and the lighting identical. Output one photorealistic image.',
  },
  {
    slug: 'virtual-pet-clothing-try-on',
    before: `Full-body photograph of a small light-brown short-haired dog (Jack Russell or similar) standing in profile on a neutral cream surface, clean studio backdrop, soft daylight, no clothing or accessories. Square 1:1 framing. ${STYLE_BASE}`,
    item: `A single small knitted pet sweater in mustard yellow with a tiny cable-knit pattern, displayed flat on a clean off-white background, premium pet apparel product photography. Square 1:1. ${STYLE_BASE}`,
    edit: 'Dress the dog in the first image with the mustard-yellow knitted pet sweater from the second image. Fit the sweater naturally to the dog\'s body, follow body contours, leave legs and tail uncovered. Keep the dog, its pose, the cream surface and the lighting identical. Output one photorealistic image.',
  },
  {
    slug: 'virtual-baby-clothing-try-on',
    before: `Full-body editorial photograph of a smiling toddler (about 12 months old) sitting on a soft cream blanket, wearing only a plain white short-sleeve onesie with no prints, neutral nursery backdrop, soft window daylight, square 1:1 framing. Tasteful, professional baby photography. ${STYLE_BASE}`,
    item: `A single small pastel-pink ruffled baby dress with tiny bow detail, displayed flat on a clean off-white background, premium baby apparel product photography. Square 1:1. ${STYLE_BASE}`,
    edit: 'Replace the plain white onesie on the toddler in the first image with the pastel-pink ruffled baby dress from the second image. Fit the dress naturally on the baby. Keep the baby, the smile, hair, the cream blanket, the nursery backdrop and the lighting identical. Tasteful baby photography, no text. Output one photorealistic image.',
  },
];

async function imagenGenerate(prompt, personGeneration = 'allow_adult') {
  const res = await fetch(IMAGEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '1:1',
        personGeneration,
        safetyFilterLevel: 'block_only_high',
      },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Imagen HTTP ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`Imagen: no image returned (likely safety-blocked): ${JSON.stringify(data).slice(0, 200)}`);
  return Buffer.from(b64, 'base64');
}

// Fallback when Imagen safety-blocks a prompt (e.g. baby imagery): generate a
// fresh PNG with Gemini 3.1 Flash Image text-to-image. Has more permissive
// filters than Imagen for legitimate non-adult subjects.
async function geminiTextToImage(prompt) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: EDIT_MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { responseModalities: ['TEXT', 'IMAGE'] },
  });
  const parts = response.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    if (p.inlineData?.data) return Buffer.from(p.inlineData.data, 'base64');
  }
  throw new Error(`Gemini text-to-image: no image returned (finishReason=${response.candidates?.[0]?.finishReason})`);
}

// Tries Imagen first; if it returns no image (safety filter), falls back to
// Gemini Flash Image which is more permissive for kids/baby subjects.
async function generatePanel(prompt) {
  try {
    return await imagenGenerate(prompt, 'allow_all');
  } catch (e) {
    if (!String(e.message).includes('Imagen')) throw e;
    console.log(`     ↳ Imagen blocked, retrying via Gemini Flash Image…`);
    return await geminiTextToImage(prompt);
  }
}

async function geminiEdit(beforeBuf, itemBuf, instruction) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: EDIT_MODEL,
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'image/png', data: beforeBuf.toString('base64') } },
          { inlineData: { mimeType: 'image/png', data: itemBuf.toString('base64') } },
          { text: instruction },
        ],
      },
    ],
    config: { responseModalities: ['TEXT', 'IMAGE'] },
  });
  const parts = response.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    if (p.inlineData?.data) return Buffer.from(p.inlineData.data, 'base64');
  }
  throw new Error(`Gemini edit: no image returned (finishReason=${response.candidates?.[0]?.finishReason})`);
}

async function composeTriptych(beforeBuf, itemBuf, afterBuf, outPath) {
  const resize = (buf) =>
    sharp(buf).resize(PANEL_SIZE, PANEL_SIZE, { fit: 'cover' }).png().toBuffer();
  const [b, i, a] = await Promise.all([resize(beforeBuf), resize(itemBuf), resize(afterBuf)]);

  await sharp({
    create: {
      width: TRIPTYCH_W,
      height: TRIPTYCH_H,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      { input: b, left: 0, top: 0 },
      { input: i, left: PANEL_SIZE + GUTTER, top: 0 },
      { input: a, left: (PANEL_SIZE + GUTTER) * 2, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

async function processOne(landing) {
  const { slug } = landing;
  const finalPath = path.join(OUTPUT_DIR, `${slug}.png`);
  const beforePath = path.join(OUTPUT_DIR, `${slug}-before.png`);
  const itemPath = path.join(OUTPUT_DIR, `${slug}-item.png`);
  const afterPath = path.join(OUTPUT_DIR, `${slug}-after.png`);

  if (fs.existsSync(finalPath)) {
    console.log(`-  skip   ${slug} (triptych already exists)`);
    return { slug, status: 'skipped' };
  }

  try {
    let beforeBuf, itemBuf, afterBuf;

    if (fs.existsSync(beforePath)) {
      console.log(`   reuse  ${slug} before`);
      beforeBuf = fs.readFileSync(beforePath);
    } else {
      console.log(`   gen    ${slug} before  (Imagen)`);
      beforeBuf = await generatePanel(landing.before);
      fs.writeFileSync(beforePath, beforeBuf);
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (fs.existsSync(itemPath)) {
      console.log(`   reuse  ${slug} item`);
      itemBuf = fs.readFileSync(itemPath);
    } else {
      console.log(`   gen    ${slug} item    (Imagen)`);
      itemBuf = await generatePanel(landing.item);
      fs.writeFileSync(itemPath, itemBuf);
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (fs.existsSync(afterPath)) {
      console.log(`   reuse  ${slug} after`);
      afterBuf = fs.readFileSync(afterPath);
    } else {
      console.log(`   gen    ${slug} after   (Gemini edit)`);
      afterBuf = await geminiEdit(beforeBuf, itemBuf, landing.edit);
      fs.writeFileSync(afterPath, afterBuf);
      await new Promise((r) => setTimeout(r, 1500));
    }

    await composeTriptych(beforeBuf, itemBuf, afterBuf, finalPath);
    const sizeKB = Math.round(fs.statSync(finalPath).size / 1024);
    console.log(`✓  done   ${slug} → ${path.relative(ROOT, finalPath)} (${sizeKB} KB)`);
    return { slug, status: 'done' };
  } catch (e) {
    console.log(`✗  fail   ${slug} — ${e.message}`);
    return { slug, status: 'failed', error: e.message };
  }
}

async function main() {
  console.log(`Generating ${LANDINGS.length} triptychs to ${path.relative(ROOT, OUTPUT_DIR)}\n`);
  const results = { done: 0, skipped: 0, failed: 0 };
  for (const landing of LANDINGS) {
    const r = await processOne(landing);
    results[r.status]++;
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
