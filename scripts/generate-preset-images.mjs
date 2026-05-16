// Generate preset reference images for the try-on demo.
// Each landing category gets 2 ready-to-use "product" images so visitors
// only need to upload their own photo. Pure text-to-image via the same
// gemini-3.1-flash-image-preview model used for try-on renders.
//
// Run: node scripts/generate-preset-images.mjs [category1 category2 ...]
//   - No args → generates ALL categories
//   - Args   → generates only those categories
//
// Output: public/images/presets/{category}-1.png ... {category}-2.png

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

function loadEnv() {
  const f = '.env.local';
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)$/);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('GEMINI_API_KEY missing in .env.local');
  process.exit(1);
}

const MODEL = 'gemini-3.1-flash-image-preview';
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Each preset: { id (short slug), label (PT-friendly display name), prompt }
const PRESETS = {
  nail: [
    {
      id: 'pink-floral',
      label: 'Rosa floral',
      prompt:
        'Editorial close-up photo of one elegant feminine hand with five short almond-shaped fingernails. Each nail is painted with a soft pastel pink base and delicate tiny white daisy flowers (5 petals each) hand-painted on top, glossy gel finish, perfect manicure. Fingers slightly curled, palm down, resting on a clean off-white marble background, soft natural daylight from the upper left, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.',
    },
    {
      id: 'french-glitter',
      label: 'Francesinha glitter',
      prompt:
        'Editorial close-up photo of one elegant feminine hand with five short oval fingernails. Classic French manicure with nude pink base and clean white tips on four nails, and the ring finger has subtle gold micro-glitter sparkle accent on a nude base, glossy gel finish, perfect manicure. Fingers fanned, palm down, resting on a clean off-white marble background, soft natural daylight from the upper left, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.',
    },
  ],
  clothing: [
    {
      id: 'beige-blazer',
      label: 'Blazer bege',
      prompt:
        'Studio product photo of an oversized double-breasted beige wool blazer on a plain white background, flat lay style, neatly arranged with collar and lapels visible, gold buttons, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'black-midi-dress',
      label: 'Vestido midi preto',
      prompt:
        'Studio product photo of an elegant black satin midi dress with thin spaghetti straps and a slight A-line skirt, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
  ],
  glasses: [
    {
      id: 'black-rectangle',
      label: 'Retangulares pretas',
      prompt:
        'Studio product photo of a pair of classic black acetate rectangular eyeglass frames, slim arms, slight cat-eye tilt, displayed against a plain white background facing camera, photorealistic, soft even lighting, no person, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'aviator-gold',
      label: 'Aviador dourado',
      prompt:
        'Studio product photo of a pair of classic gold metal aviator sunglasses with green-tinted lenses, displayed against a plain white background facing camera, photorealistic, soft even lighting, no person, no text, no watermark, square 1:1 framing.',
    },
  ],
  hairstyle: [
    {
      id: 'long-bob-bangs',
      label: 'Long bob com franja',
      prompt:
        'Studio editorial portrait of a woman with a sleek long bob haircut just past the shoulders, glossy chestnut brown hair, soft curtain bangs framing the face, clean studio white background, looking at camera, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'short-pixie',
      label: 'Pixie curto',
      prompt:
        'Studio editorial portrait of a woman with a short modern pixie haircut, textured top, dark brown almost black hair, clean studio white background, looking at camera, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.',
    },
  ],
  jewelry: [
    {
      id: 'gold-chain',
      label: 'Corrente dourada',
      prompt:
        'Studio product photo of a delicate 18k gold thin chain necklace with a small pendant in the shape of a heart, displayed flat on a plain white background, photorealistic, soft directional lighting, no model, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'diamond-studs',
      label: 'Brincos diamante',
      prompt:
        'Studio product photo of a pair of small round solitaire diamond stud earrings set in white gold, displayed side by side on a plain white background, sparkly facets visible, photorealistic, soft directional lighting, no model, no text, no watermark, square 1:1 framing.',
    },
  ],
  'mens-suit': [
    {
      id: 'navy-2pc',
      label: 'Terno azul marinho',
      prompt:
        'Studio product photo of a slim-fit two-piece navy blue wool mens suit, jacket and matching pants laid flat side by side on a plain white background, single-breasted notch lapel, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'charcoal-3pc',
      label: 'Terno cinza 3 peças',
      prompt:
        'Studio product photo of a slim-fit three-piece charcoal grey wool mens suit, jacket and waistcoat and pants laid flat on a plain white background, single-breasted peak lapel, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
  ],
  costume: [
    {
      id: 'witch-classic',
      label: 'Bruxa clássica',
      prompt:
        'Studio product photo of a classic Halloween witch costume: black long dress with tattered sleeves, black pointy witch hat with a thin band, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'vampire-cape',
      label: 'Vampiro com capa',
      prompt:
        'Studio product photo of a classic Halloween vampire costume: black formal jacket with red silk lining, attached high-collar black cape with red interior, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
  ],
  cosplay: [
    {
      id: 'anime-sailor',
      label: 'Anime escolar',
      prompt:
        'Studio product photo of an anime-inspired Japanese schoolgirl uniform cosplay: white sailor-collar top with navy blue trim, red ribbon at the chest, pleated navy skirt, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'fantasy-elf',
      label: 'Elfo de fantasia',
      prompt:
        'Studio product photo of a fantasy elf cosplay outfit: forest green leather corset top with brown straps, brown skirt with tassels, elven pointed-ear headband, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
  ],
  'pet-clothing': [
    {
      id: 'dog-raincoat',
      label: 'Capa de chuva pet',
      prompt:
        'Studio product photo of a small dog yellow raincoat with reflective stripes and a hood, displayed flat on a plain white background, photorealistic, soft even lighting, no animal, no model, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'dog-bandana',
      label: 'Bandana pet',
      prompt:
        'Studio product photo of a small triangular red and white plaid pet bandana, displayed flat on a plain white background, photorealistic, soft even lighting, no animal, no model, no text, no watermark, square 1:1 framing.',
    },
  ],
  'baby-clothing': [
    {
      id: 'baby-romper',
      label: 'Macacão bebê',
      prompt:
        'Studio product photo of a soft white organic cotton baby romper onesie with small embroidered yellow stars pattern, short sleeves, displayed flat on a plain white background, photorealistic, soft even lighting, no baby, no model, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'baby-knit-set',
      label: 'Conjunto tricô',
      prompt:
        'Studio product photo of a baby pastel pink knit two-piece set: cardigan with wooden buttons and matching booties, displayed flat on a plain white background, photorealistic, soft even lighting, no baby, no model, no text, no watermark, square 1:1 framing.',
    },
  ],
  'wedding-dress': [
    {
      id: 'mermaid-lace',
      label: 'Sereia em renda',
      prompt:
        'Studio product photo of a mermaid silhouette wedding dress in ivory lace with long sleeves and a sweetheart neckline, displayed on a clean white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
    {
      id: 'princess-aline',
      label: 'Princesa A-line',
      prompt:
        'Studio product photo of an A-line princess wedding dress in ivory satin with a strapless sweetheart neckline and full skirt with a small train, displayed on a clean white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.',
    },
  ],
};

async function generate(prompt) {
  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });
  const parts = result.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    if (p.inlineData?.data) {
      return p.inlineData.data;
    }
  }
  return null;
}

async function main() {
  const argv = process.argv.slice(2);
  const targetCategories = argv.length > 0 ? argv : Object.keys(PRESETS);

  const outDir = 'public/images/presets';
  fs.mkdirSync(outDir, { recursive: true });

  const manifest = {};

  for (const category of targetCategories) {
    if (!PRESETS[category]) {
      console.log(`  ! unknown category "${category}" — skipping`);
      continue;
    }
    console.log(`\n── ${category} ──`);
    manifest[category] = [];
    const items = PRESETS[category];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const dest = path.join(outDir, `${category}-${i + 1}.png`);
      if (fs.existsSync(dest)) {
        console.log(`  ${i + 1}. ${item.id} (skipped — already exists)`);
        manifest[category].push({ id: item.id, label: item.label, src: `/images/presets/${category}-${i + 1}.png` });
        continue;
      }
      process.stdout.write(`  ${i + 1}. ${item.id} ... `);
      try {
        const b64 = await generate(item.prompt);
        if (!b64) {
          console.log('FAILED (no image in response)');
          continue;
        }
        fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
        const stat = fs.statSync(dest);
        console.log(`OK (${Math.round(stat.size / 1024)} KB)`);
        manifest[category].push({ id: item.id, label: item.label, src: `/images/presets/${category}-${i + 1}.png` });
      } catch (e) {
        console.log(`ERR: ${e.message?.slice(0, 80)}`);
      }
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${Object.values(manifest).flat().length} images saved.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
