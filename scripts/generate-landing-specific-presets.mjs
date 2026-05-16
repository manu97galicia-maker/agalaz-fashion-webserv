// Generate 2 content-aware preset images per landing (not per category).
// Per the user: "que sean acordes al contenido de la web" — so the wedding-
// dress page shows wedding dresses (mermaid + princess), not generic
// "black midi dress" from the clothing category fallback.
//
// SEO-friendly filenames: {landing-slug}-{preset-slug}.png with descriptive
// preset slugs (rather than -1, -2) so Google Image search picks up the
// alt-text + filename signal.

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
if (!API_KEY) { console.error('GEMINI_API_KEY missing'); process.exit(1); }
const ai = new GoogleGenAI({ apiKey: API_KEY });
const MODEL = 'gemini-3.1-flash-image-preview';

// Each entry: landingSlug → 2 preset specs.
// slug = SEO-friendly descriptor used both as filename and as default alt.
const LANDINGS = {
  // Wedding dress (PT-BR audience)
  'pt-vestido-de-noiva': [
    { slug: 'mermaid-lace-ivory', label: { pt: 'Sereia em renda', es: 'Sirena de encaje', en: 'Mermaid lace', fr: 'Sirène dentelle', de: 'Meerjungfrau Spitze', it: 'Sirena pizzo' }, prompt: 'Studio product photo of a mermaid silhouette wedding dress in ivory lace with long sleeves and a sweetheart neckline, hourglass curve to the knee then fishtail flare, displayed on a clean white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'princess-tulle-aline', label: { pt: 'Princesa em tule', es: 'Princesa de tul', en: 'Princess tulle', fr: 'Princesse tulle', de: 'Prinzessin Tüll', it: 'Principessa tulle' }, prompt: 'Studio product photo of an A-line princess wedding dress in ivory satin with a strapless sweetheart neckline and full tulle skirt with a small chapel train, displayed on a clean white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],

  // Wedding guest (ES audience, summer Zara/Mango aesthetic)
  'es-vestido-invitada-boda': [
    { slug: 'satin-emerald-midi', label: { es: 'Satén esmeralda midi', en: 'Emerald satin midi', fr: 'Satin émeraude midi', pt: 'Cetim esmeralda midi', de: 'Satin smaragd midi', it: 'Raso smeraldo midi' }, prompt: 'Studio product photo of an elegant emerald green satin midi dress with thin spaghetti straps, cowl neckline and slight A-line skirt, ideal for a wedding guest in summer, displayed flat on a plain white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'lilac-tulle-floral-long', label: { es: 'Lila tul floral', en: 'Lilac tulle floral', fr: 'Lilas tulle floral', pt: 'Lilás tule floral', de: 'Lila Tüll floral', it: 'Lilla tulle floreale' }, prompt: 'Studio product photo of a romantic lilac long tulle dress with delicate floral embroidery, V-neckline and long sleeves, ideal for a wedding guest, displayed on a clean white background, photorealistic, soft lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],

  // Festa Junina (PT-BR — June Brazilian rural-themed party)
  'pt-look-festa-junina': [
    { slug: 'chita-floral-red-dress', label: { pt: 'Vestido chita floral', es: 'Vestido chita floral', en: 'Floral chita dress', fr: 'Robe chita floral', de: 'Chita-Blumenkleid', it: 'Vestito chita floreale' }, prompt: 'Studio product photo of a traditional Brazilian Festa Junina dress in red chita fabric with white floral pattern, knee-length, puff sleeves, gathered waist with white ribbon belt, displayed flat on a plain white background, photorealistic, soft lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'xadrez-shirt-jeans-caipira', label: { pt: 'Xadrez caipira', es: 'Cuadros caipira', en: 'Plaid caipira', fr: 'Carreaux caipira', de: 'Karo Caipira', it: 'Quadri caipira' }, prompt: 'Studio product photo of a Brazilian Festa Junina caipira outfit: red and white plaid long-sleeve shirt knotted at the waist, paired with light blue denim shorts with white patches, displayed flat on a plain white background, photorealistic, soft lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],

  // Female haircut (PT-BR — biggest single keyword cluster)
  'pt-corte-de-cabelo-feminino': [
    { slug: 'chanel-bob-brown-bangs', label: { pt: 'Chanel com franja', es: 'Chanel con flequillo', en: 'Bob with bangs', fr: 'Carré frange', de: 'Bob mit Pony', it: 'Bob con frangia' }, prompt: 'Studio editorial portrait of a woman with a classic French chanel bob haircut, just below the chin, glossy chestnut brown hair, blunt-cut full bangs framing the eyebrows, clean studio white background, looking at camera, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
    { slug: 'long-layers-curtain-bangs', label: { pt: 'Camadas longas franja cortina', es: 'Capas largas flequillo cortina', en: 'Long layers curtain bangs', fr: 'Longues couches frange rideau', de: 'Lange Stufen Vorhang Pony', it: 'Strati lunghi frangia tendina' }, prompt: 'Studio editorial portrait of a woman with long brown hair past the shoulders, soft face-framing layers and curtain bangs parted in the middle, glossy shine, clean studio white background, looking at camera, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
  ],

  // Zara virtual try-on (PT-BR — brand-specific)
  'pt-provador-virtual-zara': [
    { slug: 'oversized-blazer-black-zara', label: { pt: 'Blazer oversized preto', es: 'Blazer oversized negro', en: 'Oversized black blazer', fr: 'Blazer oversized noir', de: 'Oversized Blazer schwarz', it: 'Blazer oversize nero' }, prompt: 'Studio product photo of an oversized double-breasted black wool blazer with structured shoulders, gold buttons, slightly cropped length, Zara-aesthetic minimalist styling, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'denim-wide-leg-cropped', label: { pt: 'Jeans wide leg', es: 'Jeans wide leg', en: 'Wide-leg jeans', fr: 'Jean wide leg', de: 'Wide-Leg Jeans', it: 'Jeans wide leg' }, prompt: 'Studio product photo of high-waisted light wash wide-leg cropped jeans with a clean hem, Zara-aesthetic minimalist styling, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],

  // Disenos de uñas (ES — nail designs distinct from PT-BR unhas decoradas)
  'es-disenos-de-unas': [
    { slug: 'gel-french-pearl-accent', label: { es: 'Francesa gel perla', en: 'Pearl french gel', fr: 'French gel perles', pt: 'Francesa gel pérola', de: 'French Gel Perle', it: 'French gel perla' }, prompt: 'Editorial close-up photo of one elegant feminine hand with five medium almond-shaped fingernails. Classic French manicure: nude pink base with clean white tips on all nails plus tiny pearl beads accent on the ring finger, glossy gel finish, perfect manicure. Fingers slightly curled, palm down, resting on a clean off-white marble background, soft natural daylight, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.' },
    { slug: 'chrome-mirror-silver', label: { es: 'Cromado espejo plata', en: 'Chrome mirror silver', fr: 'Chrome miroir argent', pt: 'Cromado espelho prata', de: 'Chrom Spiegel Silber', it: 'Cromato specchio argento' }, prompt: 'Editorial close-up photo of one elegant feminine hand with five medium almond-shaped fingernails. Each nail painted with a high-shine mirror chrome silver finish, perfect reflection, gel base coat visible at cuticle, glossy. Fingers slightly fanned, palm down, resting on a clean off-white marble background, soft natural daylight, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.' },
  ],
};

async function generate(prompt) {
  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });
  const parts = result.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) if (p.inlineData?.data) return p.inlineData.data;
  return null;
}

async function main() {
  const outDir = 'public/images/presets';
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = {};

  for (const [landing, items] of Object.entries(LANDINGS)) {
    console.log(`\n── ${landing} ──`);
    manifest[landing] = [];
    for (const item of items) {
      const filename = `${landing}-${item.slug}.png`;
      const dest = path.join(outDir, filename);
      if (fs.existsSync(dest)) {
        console.log(`  ${item.slug} (already exists)`);
        manifest[landing].push({ slug: item.slug, label: item.label, src: `/images/presets/${filename}` });
        continue;
      }
      process.stdout.write(`  ${item.slug} ... `);
      try {
        const b64 = await generate(item.prompt);
        if (!b64) { console.log('FAILED'); continue; }
        fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
        const stat = fs.statSync(dest);
        console.log(`OK (${Math.round(stat.size / 1024)} KB)`);
        manifest[landing].push({ slug: item.slug, label: item.label, src: `/images/presets/${filename}` });
      } catch (e) {
        console.log(`ERR: ${e.message?.slice(0, 80)}`);
      }
      await new Promise(r => setTimeout(r, 800));
    }
  }

  fs.writeFileSync(path.join(outDir, 'landing-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${Object.values(manifest).flat().length} images saved.`);
}

main().catch(e => { console.error(e); process.exit(1); });
