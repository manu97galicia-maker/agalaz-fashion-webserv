// Generates 1200x630 Open Graph images for every landing.
//
// Source:  public/images/landings/{slug}.png        (3-panel triptych, 1816x600)
// Output:  public/og/{slug}.png                     (1200x630, white letterbox)
// Default: public/og/default.png                    (taken from a chosen hero triptych)
//
// The triptychs are 1816x600 (3.03:1). We resize to fit width=1200 (→ 1200x396)
// and center on a 1200x630 white canvas. Looks clean, preserves the
// before/item/after story which is the single best visual we have.
//
// Run with:  node scripts/generate-og-images.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'images', 'landings');
const OUT_DIR = path.join(ROOT, 'public', 'og');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 630;

const slugs = fs
  .readdirSync(SRC_DIR)
  .filter((f) => f.endsWith('.png') && !/-before|-after|-item/.test(f))
  .map((f) => f.replace(/\.png$/, ''));

console.log(`Found ${slugs.length} triptych slugs.`);

let processed = 0;
for (const slug of slugs) {
  const src = path.join(SRC_DIR, `${slug}.png`);
  const dst = path.join(OUT_DIR, `${slug}.png`);

  const meta = await sharp(src).metadata();
  const targetW = W;
  const targetH = Math.round((meta.height / meta.width) * targetW);

  const triptych = await sharp(src).resize(targetW, targetH).png().toBuffer();

  const yOffset = Math.round((H - targetH) / 2);

  await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .composite([{ input: triptych, top: yOffset, left: 0 }])
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(dst);

  const size = fs.statSync(dst).size;
  console.log(`  ${slug.padEnd(40)}  ${(size / 1024).toFixed(0)} KB`);
  processed++;
}

// Default OG: copy from a chosen hero (wedding-dress is a strong, broad-appeal visual)
const defaultSrc = path.join(OUT_DIR, 'virtual-wedding-dress-try-on.png');
const defaultDst = path.join(OUT_DIR, 'default.png');
if (fs.existsSync(defaultSrc)) {
  fs.copyFileSync(defaultSrc, defaultDst);
  console.log(`\nDefault OG  ←  virtual-wedding-dress-try-on.png`);
}

console.log(`\nDone. ${processed} OG images written to public/og/`);
