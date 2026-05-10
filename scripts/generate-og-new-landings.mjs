// Generates a single 1200x630 OG image per new informational landing using
// Imagen 4 fast. Different output type from generate-landing-images.mjs (which
// makes triptychs for product try-on demos) — these guides need a single
// brand-aligned image, not a before/item/after sequence.
//
// Pipeline per slug:
//   1. Imagen 4 fast → 1:1 1024x1024 hero image of the topic
//   2. sharp → letterbox to 1200x630 on warm-white canvas with tiny brand
//      sparkle pill in bottom-right (visual consistency with watermark.ts)
//   3. Save to public/og/{slug}.png
//
// Idempotent: skips a slug if the file already exists.
//
// Run with:    node --env-file=.env.local scripts/generate-og-new-landings.mjs
//   (or)       GEMINI_API_KEY=xxx node scripts/generate-og-new-landings.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/og');

const API_KEY = process.env.GEMINI_API_KEY;
const IMAGEN_MODEL = process.env.IMAGEN_MODEL || 'imagen-4.0-fast-generate-001';
const IMAGEN_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${API_KEY}`;

if (!API_KEY) {
  console.error('GEMINI_API_KEY missing. Run with `node --env-file=.env.local …`');
  process.exit(1);
}

const STYLE =
  'Editorial fashion / lifestyle photography. Clean natural light, soft shadows, photo-realistic. Composition leaves negative space top-left for OG text overlay. STRICT: no text, no captions, no watermarks, no logos, no typography of any kind.';

// 15 new landings shipped between 2026-05-09 and 2026-05-10. Each prompt was
// tuned to the landing's hero copy + audience.
const LANDINGS = [
  {
    slug: 'haircut-round-face',
    prompt: `Editorial three-quarter portrait of a young woman with a soft round face shape, wearing a flattering long layered lob (long bob) haircut with side-swept fringe. Hair has natural movement and shine. Neutral cream background, professional studio lighting. ${STYLE}`,
  },
  {
    slug: 'haircut-oval-face',
    prompt: `Editorial three-quarter portrait of a young woman with an oval face shape, wearing a sleek collarbone bob with curtain bangs. Hair sleek and polished. Soft daylight, neutral warm cream background. ${STYLE}`,
  },
  {
    slug: 'haircut-diamond-face',
    prompt: `Editorial three-quarter portrait of a young woman with a diamond face shape (prominent cheekbones, narrow forehead and chin), wearing a chin-length side-parted bob with face-framing layers. Cream background, soft daylight. ${STYLE}`,
  },
  {
    slug: 'haircut-square-face',
    prompt: `Editorial three-quarter portrait of a young woman with a strong angular jawline (square face shape), wearing long wavy layers below the jaw with a side-swept fringe to soften the jaw. Cream background, soft daylight. ${STYLE}`,
  },
  {
    slug: 'engagement-ring-hand',
    prompt: `Hyper-detailed close-up of a young woman's manicured left hand resting elegantly on a soft cream linen surface, wearing a classic round brilliant solitaire engagement ring on her ring finger. Soft natural daylight, marble accents. Romantic but minimalist. ${STYLE}`,
  },
  {
    slug: 'look-festa-junina',
    prompt: `Editorial three-quarter portrait of a young Brazilian woman wearing a modern festa-junina outfit — chita-print midi dress in red and yellow checks, a single straw hat, soft braided hair with red ribbons, painted faux freckles. Warm golden-hour daylight, faintly visible string-light bunting in the bokeh. Cinematic Brazilian summer-festival vibe. ${STYLE}`,
  },
  {
    slug: 'tenue-bapteme',
    prompt: `Editorial photograph of a young woman in a French baptism guest outfit — pastel powder-pink midi dress with delicate lace details, low ballerina-style flats, holding a small structured beige clutch. Soft natural daylight in front of a stone French church wall. Tasteful, elegant. ${STYLE}`,
  },
  {
    slug: 'vestito-comunione',
    prompt: `Editorial product photograph of a traditional white Italian first-communion dress in cotton with delicate lace details, displayed on an elegant antique mannequin against a soft cream background. White ballerina flats and a small white floral crown placed on a wooden table next to it. Soft natural daylight from a French window. Tasteful, photographic realism. NO PEOPLE in the frame, NO children, NO models — only the dress and accessories. ${STYLE}`,
  },
  {
    slug: 'lehenga-online',
    prompt: `Editorial photograph of a young Indian woman in a contemporary lehenga choli — emerald-green skirt with gold zardozi embroidery, matching choli, sheer dupatta draped over one shoulder. Soft natural daylight, neutral terracotta background, jhumka earrings visible. Modern bridal-guest aesthetic. ${STYLE}`,
  },
  {
    slug: 'bridesmaid-dress',
    prompt: `Editorial group photograph of three young women in mismatched bridesmaid dresses in the same sage-green colour palette — different cuts (halter, sweetheart, off-shoulder) but cohesive shade. Soft daylight, outdoor garden setting with subtle bokeh. Each holds a small bouquet of white peonies. ${STYLE}`,
  },
  {
    slug: 'halloween-couples',
    prompt: `Editorial photograph of a happy young couple in matching pink Barbie & Ken halloween costumes — she in a hot-pink sequin dress, he in a pastel blue suit with open shirt. Studio lighting, pink gradient background, both smiling, mid-pose. Iconic, photogenic, instantly recognisable. ${STYLE}`,
  },
  {
    slug: 'yukata',
    prompt: `Editorial three-quarter portrait of a young Japanese woman wearing a traditional indigo-blue cotton yukata with delicate white floral pattern, half-width red obi tied in a butterfly knot, hair in a soft up-do with a small floral hair-pin. Background: warm summer-festival lanterns slightly out of focus. Tasteful and elegant, photographic realism. ${STYLE}`,
  },
  {
    slug: 'wedding-guest-outfit',
    prompt: `Editorial photograph of a young woman in a fall wedding-guest outfit — burgundy midi-length wrap dress, gold pumps, simple gold jewelry, low chignon hair. Soft autumn daylight in a vineyard outdoor setting with subtle bokeh of warm leaves. Elegant, photo-ready. ${STYLE}`,
  },
  {
    slug: 'vestido-invitada-boda',
    prompt: `Fotografía editorial de una mujer joven con vestido midi de invitada de boda en color azul empolvado, zapatos slingback de tacón medio, bolso estructurado beige, recogido bajo. Iluminación natural suave en exterior con flores blancas desenfocadas al fondo. Elegante, sofisticado. ${STYLE}`,
  },
  {
    slug: 'natural-makeup',
    prompt: `Tight beauty close-up portrait of a young woman with flawless natural-glow makeup — dewy skin tint, peach cream blush, soft brown smokey eye, a subtle MLBB pink lip. Soft daylight from above, neutral cream background, focus on the face. Editorial beauty photography. ${STYLE}`,
  },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function imagen(prompt) {
  const res = await fetch(IMAGEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '16:9',
        personGeneration: 'allow_adult',
      },
    }),
  });
  if (!res.ok) throw new Error(`Imagen ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const b64 = json.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error('No image bytes returned');
  return Buffer.from(b64, 'base64');
}

let processed = 0;
let skipped = 0;
let failed = 0;

for (const { slug, prompt } of LANDINGS) {
  const out = path.join(OUT_DIR, `${slug}.png`);
  if (fs.existsSync(out)) {
    console.log(`-  skip   ${slug}.png  (already exists)`);
    skipped++;
    continue;
  }

  process.stdout.write(`→  gen    ${slug.padEnd(28)} `);
  try {
    const buf = await imagen(prompt);
    // Imagen 16:9 returns ~1408x768 typically; resize to exact 1200x630.
    await sharp(buf)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .png({ quality: 92, compressionLevel: 9 })
      .toFile(out);
    const size = fs.statSync(out).size;
    console.log(`OK ${(size / 1024).toFixed(0)} KB`);
    processed++;
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 120)}`);
    failed++;
  }

  // Polite pause between Imagen calls
  await new Promise((r) => setTimeout(r, 800));
}

console.log(`\nDone. Processed ${processed}, skipped ${skipped}, failed ${failed}.`);
