// Phase 2: generate ~40 new theme presets covering the rest of the landing
// taxonomy. Themes are universal — one image pair serves all language
// variants of the same theme (wedding-dress works for PT, EN, FR, ES, DE, IT
// since the dress looks the same). Labels translate per language.
//
// Themes added on top of what we already have in /public/images/presets:
//   - face-round-haircut, curtain-bangs, wolf-cut, wig
//   - engagement-ring, earrings, veil
//   - bikini, tattoo, makeup-natural
//   - carnival-costume, halloween-couples
//   - chrome-nails, coquette-nails
//   - saree, lehenga, hanbok, kimono, qipao, yukata

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

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-3.1-flash-image-preview';

const THEMES = {
  // Hairstyle deep cuts
  'face-round-haircut': [
    { slug: 'long-bob-side-part', prompt: 'Studio editorial portrait of a woman with a face-flattering long bob haircut just below the chin, deep side part with a soft swoop covering one cheekbone, chestnut brown hair, glossy. Round-face flattering silhouette. Clean studio white background, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
    { slug: 'medium-shag-bangs', prompt: 'Studio editorial portrait of a woman with a medium-length textured shag haircut just past the shoulders, soft curtain bangs, choppy layers around the jaw to elongate a round face, dark caramel brown hair. Clean studio white background, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
  ],
  'curtain-bangs': [
    { slug: 'long-hair-curtain-bangs', prompt: 'Studio editorial portrait of a woman with long brown hair past the shoulders and classic 70s-inspired curtain bangs parted in the middle, the bangs gracefully framing the eyebrows and cheekbones, glossy shine. Clean studio white background, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
    { slug: 'short-bob-curtain-bangs', prompt: 'Studio editorial portrait of a woman with a chin-length bob and parted middle curtain bangs, dark brown hair with subtle copper highlights. Clean studio white background, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
  ],
  'wolf-cut': [
    { slug: 'wolf-cut-shaggy-layers', prompt: 'Studio editorial portrait of a woman with a modern wolf cut hairstyle: short choppy crown layers with longer wispy ends past the shoulders, mullet-shag hybrid, dark brown hair with subtle ash highlights, very textured. Clean studio white background, neutral expression, soft lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
    { slug: 'wolf-cut-asian-soft', prompt: 'Studio editorial portrait of a woman with a soft Asian-style wolf cut: airy face-framing layers, mid-length, glossy black hair with subtle brown highlights, slight wavy texture. Clean studio white background, neutral expression, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
  ],
  'wig': [
    { slug: 'lace-front-long-straight', prompt: 'Studio product photo of a long straight lace-front wig in glossy dark brown, displayed on a clean white background on a transparent invisible mannequin head (face not visible), photorealistic, soft even lighting, no model, no text, no watermark, square 1:1 framing.' },
    { slug: 'curly-afro-shoulder', prompt: 'Studio product photo of a shoulder-length curly afro lace wig in natural dark brown, well-defined curl pattern, displayed on a clean white background on a transparent invisible mannequin head (face not visible), photorealistic, soft even lighting, no model, no text, no watermark, square 1:1 framing.' },
  ],

  // Jewelry deep cuts
  'engagement-ring': [
    { slug: 'solitaire-1ct-white-gold', prompt: 'Studio macro product photo of a classic solitaire engagement ring with a 1-carat round brilliant diamond on a thin white-gold band, four-prong setting, displayed standing upright on a clean white background, sparkly reflections, photorealistic, soft directional lighting, no model, no text, no watermark, square 1:1 framing.' },
    { slug: 'halo-pave-rose-gold', prompt: 'Studio macro product photo of a halo engagement ring with a cushion-cut center diamond surrounded by a halo of small pavé diamonds on a delicate rose-gold band with pavé diamonds along the band, displayed standing upright on a clean white background, sparkly facets, photorealistic, soft directional lighting, no model, no text, no watermark, square 1:1 framing.' },
  ],
  'earrings': [
    { slug: 'pearl-drop-studs', prompt: 'Studio product photo of a pair of pearl drop earrings: small gold studs with a single round white freshwater pearl dangling from a delicate gold chain, displayed flat side by side on a plain white background, photorealistic, soft directional lighting, no model, no text, no watermark, square 1:1 framing.' },
    { slug: 'gold-hoops-medium', prompt: 'Studio product photo of a pair of medium-sized 18k yellow gold tube hoop earrings, polished finish, displayed flat side by side on a plain white background, photorealistic, soft directional lighting, no model, no text, no watermark, square 1:1 framing.' },
  ],
  'veil': [
    { slug: 'cathedral-lace-trim', prompt: 'Studio product photo of a long cathedral wedding veil in ivory tulle with delicate lace trim edge along the bottom, gracefully spread on a clean white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'birdcage-vintage', prompt: 'Studio product photo of a short birdcage wedding veil in ivory mesh with a small flower-and-pearl hairpin attachment, vintage 1950s style, displayed on a clean white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],

  // Swimwear + body
  'bikini': [
    { slug: 'triangle-black-classic', prompt: 'Studio product photo of a classic two-piece triangle bikini in solid black: triangle top with tie straps and matching low-rise tie-side bottoms, displayed flat side by side on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'tropical-print-balconette', prompt: 'Studio product photo of a tropical-print two-piece bikini: green and white palm-leaf-pattern balconette top with underwire support and matching high-waist bottoms, displayed flat side by side on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],

  // Tattoo
  'tattoo': [
    { slug: 'floral-blackwork-rose', prompt: 'Close-up product photo of a single black-ink fine-line tattoo design on plain white paper: a delicate stem of three roses with leaves and tiny stars, blackwork style, isolated on white background, photorealistic, no model, no skin, no text, no watermark, square 1:1 framing.' },
    { slug: 'minimalist-geometric-moon', prompt: 'Close-up product photo of a minimalist black-ink tattoo design on plain white paper: a crescent moon with a small geometric triangle and three dots, single-line minimalist style, isolated on white background, photorealistic, no model, no skin, no text, no watermark, square 1:1 framing.' },
  ],

  // Makeup
  'makeup-natural': [
    { slug: 'no-makeup-glow', prompt: 'Studio close-up portrait of a young woman with natural "no-makeup makeup look": dewy glowing skin, light freckles visible, soft pink rosy cheeks, nude pink glossy lips, light brown soft-focus brows, peachy bronze eyeshadow with mascara, no eyeliner, neutral expression. Clean studio white background, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
    { slug: 'soft-glam-bronze', prompt: 'Studio close-up portrait of a young woman with soft glam makeup: warm bronze smoky eyeshadow blended toward the temples, dramatic mascara and subtle false lashes, contoured cheekbones with peach blush, nude pink matte lipstick, sculpted brows. Clean studio white background, soft beauty lighting, photorealistic, no text, no watermark, square 1:1 framing.' },
  ],

  // Costumes — seasonal
  'carnival-costume': [
    { slug: 'samba-rio-feathers', prompt: 'Studio product photo of a Rio Carnival samba dancer costume: red and gold sequined bikini-cut bodice with large feather headdress and matching feather wrist cuffs, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'venetian-mask-cloak', prompt: 'Studio product photo of a Venetian carnival costume: ornate gold and white half-face mask with feather trim, paired with a deep purple velvet cloak with gold embroidery, displayed flat on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],
  'halloween-couples': [
    { slug: 'barbie-ken-pink', prompt: 'Studio product photo of a Barbie and Ken couples Halloween costume: a hot-pink bedazzled jumpsuit with a Barbie sash next to a denim sleeveless vest with "I am KENough" pink sweater, displayed flat side by side on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'wednesday-enid-school', prompt: 'Studio product photo of a Wednesday Addams and Enid Sinclair couples costume: black Nevermore Academy uniform with white collar and pleated tie next to a colorful rainbow-pastel cardigan with knee-high socks, displayed flat side by side on a plain white background, photorealistic, soft even lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],

  // More nail variants
  'chrome-nails': [
    { slug: 'mirror-silver-chrome', prompt: 'Editorial close-up photo of one elegant feminine hand with five medium almond-shaped fingernails. Each nail painted with a high-shine mirror chrome silver finish, perfect reflection, gel base coat, glossy. Fingers slightly curled, palm down, resting on a clean off-white marble background, soft natural daylight, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.' },
    { slug: 'rose-gold-pastel-chrome', prompt: 'Editorial close-up photo of one elegant feminine hand with five medium almond-shaped fingernails. Each nail painted with a soft pastel rose-gold chrome finish (powdery shimmer, not full mirror), gel base coat, glossy, perfect manicure. Fingers slightly fanned, palm down, resting on a clean off-white marble background, soft natural daylight, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.' },
  ],
  'coquette-nails': [
    { slug: 'pink-bows-pearls', prompt: 'Editorial close-up photo of one elegant feminine hand with five short almond-shaped fingernails. Soft baby-pink jelly base on all nails with tiny 3D white bow accents on two nails plus tiny pearls on a third nail, coquette feminine aesthetic, glossy gel finish. Fingers slightly curled, palm down, resting on a clean off-white marble background, soft natural daylight, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.' },
    { slug: 'milky-white-hearts', prompt: 'Editorial close-up photo of one elegant feminine hand with five short almond-shaped fingernails. Milky-white opaque base on all nails with tiny red hand-painted hearts on two nails and a French-tip variant on a third nail, coquette romantic aesthetic, glossy gel finish. Fingers slightly fanned, palm down, resting on a clean off-white marble background, soft natural daylight, photorealistic, no jewelry, no rings, no text, no watermark, square 1:1 framing centered on the nails.' },
  ],

  // Asian / traditional
  'saree': [
    { slug: 'silk-red-gold-zari', prompt: 'Studio product photo of a luxurious red silk saree with intricate gold zari embroidery along the border and pallu, displayed elegantly draped on a clean white background, traditional Indian wedding aesthetic, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'pastel-blue-floral', prompt: 'Studio product photo of a delicate pastel blue georgette saree with subtle floral embroidery and a thin silver border, displayed elegantly draped on a clean white background, modern Indian aesthetic, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],
  'lehenga': [
    { slug: 'royal-blue-gold-bridal', prompt: 'Studio product photo of a royal-blue heavy-bridal lehenga: long flared embroidered skirt, matching short choli blouse with elaborate gold embroidery, and matching long dupatta with golden tassels, displayed flat side by side on a clean white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'pastel-pink-sequin', prompt: 'Studio product photo of a pastel pink modern lehenga: sequined skirt with floral motifs, matching choli top with sweetheart neckline, and sheer organza dupatta with subtle pink sequins, displayed flat on a clean white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],
  'hanbok': [
    { slug: 'traditional-pink-jade', prompt: 'Studio product photo of a traditional Korean hanbok: full long skirt (chima) in soft pink silk with subtle floral pattern, paired with a jade-green jeogori (short jacket) with white collar trim and a thin pink ribbon tie, displayed side by side flat on a clean white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'modern-navy-white', prompt: 'Studio product photo of a modern Korean hanbok variation: navy-blue silk chima skirt with a clean cream-white jeogori jacket with simple navy collar trim and matching ribbon, minimalist contemporary styling, displayed flat side by side on a clean white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],
  'kimono': [
    { slug: 'red-cherry-blossom-silk', prompt: 'Studio product photo of a traditional Japanese kimono in deep red silk with hand-painted cherry blossom (sakura) pattern, wide gold obi belt, displayed flat fully unfolded on a clean white background to show the full pattern, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'indigo-crane-yukata', prompt: 'Studio product photo of a traditional Japanese yukata kimono in indigo blue cotton with a white crane and wave pattern, paired with a simple white obi belt, displayed flat on a clean white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
  ],
  'qipao': [
    { slug: 'red-silk-gold-dragon', prompt: 'Studio product photo of a traditional Chinese qipao (cheongsam) dress in red silk with gold dragon embroidery, mandarin collar, frog button closure along the side, slits up the sides, knee-length, displayed flat on a clean white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
    { slug: 'navy-floral-modern', prompt: 'Studio product photo of a modern Chinese qipao dress in navy blue silk with subtle white floral motifs, mandarin collar, side slits, ankle-length, contemporary minimalist styling, displayed flat on a clean white background, photorealistic, soft directional lighting, no model, no mannequin, no text, no watermark, square 1:1 framing.' },
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

  let total = 0;
  for (const [theme, items] of Object.entries(THEMES)) {
    console.log(`\n── ${theme} ──`);
    for (const item of items) {
      const filename = `theme-${theme}-${item.slug}.png`;
      const dest = path.join(outDir, filename);
      if (fs.existsSync(dest)) { console.log(`  ${item.slug} (already exists)`); total++; continue; }
      process.stdout.write(`  ${item.slug} ... `);
      try {
        const b64 = await generate(item.prompt);
        if (!b64) { console.log('FAILED'); continue; }
        fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
        const stat = fs.statSync(dest);
        console.log(`OK (${Math.round(stat.size / 1024)} KB)`);
        total++;
      } catch (e) { console.log(`ERR: ${e.message?.slice(0, 80)}`); }
      await new Promise(r => setTimeout(r, 800));
    }
  }
  console.log(`\nDone. ${total} images saved.`);
}

main().catch(e => { console.error(e); process.exit(1); });
