// Injects <HowToSchemaScript ... /> next to the existing <ImageSchemaScript>
// in every triptych-bearing layout (18 EN canonical + 5 Asian/Arabic +
// LocalizedLanding's buildLocalizedJsonLd path).
//
// For the EN canonical and Asian/Arabic layouts we add the JSX tag.
// For the 50 localized layouts (which go through buildLocalizedJsonLd) we
// instead extend that helper to also emit HowTo — but that lives in
// LocalizedLanding.tsx, edited manually.
//
// Idempotent — bails if the file already imports HowToSchemaScript.

import fs from 'fs';
import path from 'path';

// EN canonical layouts that already have <ImageSchemaScript .../>
const EN_LAYOUTS = [
  ['app/virtual-tattoo-simulator/layout.tsx',     'virtual-tattoo-simulator',     'en', 'https://agalaz.com/virtual-tattoo-simulator'],
  ['app/realistic-swimwear-try-on/layout.tsx',    'realistic-swimwear-try-on',    'en', 'https://agalaz.com/realistic-swimwear-try-on'],
  ['app/virtual-earring-try-on/layout.tsx',       'virtual-earring-try-on',       'en', 'https://agalaz.com/virtual-earring-try-on'],
  ['app/virtual-wedding-dress-try-on/layout.tsx', 'virtual-wedding-dress-try-on', 'en', 'https://agalaz.com/virtual-wedding-dress-try-on'],
  ['app/virtual-nail-try-on/layout.tsx',          'virtual-nail-try-on',          'en', 'https://agalaz.com/virtual-nail-try-on'],
  ['app/virtual-glasses-try-on/layout.tsx',       'virtual-glasses-try-on',       'en', 'https://agalaz.com/virtual-glasses-try-on'],
  ['app/virtual-jewelry-try-on/layout.tsx',       'virtual-jewelry-try-on',       'en', 'https://agalaz.com/virtual-jewelry-try-on'],
  ['app/virtual-mens-suit-try-on/layout.tsx',     'virtual-mens-suit-try-on',     'en', 'https://agalaz.com/virtual-mens-suit-try-on'],
  ['app/virtual-pet-clothing-try-on/layout.tsx',  'virtual-pet-clothing-try-on',  'en', 'https://agalaz.com/virtual-pet-clothing-try-on'],
  ['app/virtual-baby-clothing-try-on/layout.tsx', 'virtual-baby-clothing-try-on', 'en', 'https://agalaz.com/virtual-baby-clothing-try-on'],
  ['app/virtual-costume-try-on/layout.tsx',       'virtual-costume-try-on',       'en', 'https://agalaz.com/virtual-costume-try-on'],
  ['app/virtual-hairstyle-try-on/layout.tsx',     'virtual-hairstyle-try-on',     'en', 'https://agalaz.com/virtual-hairstyle-try-on'],
  ['app/virtual-cosplay-try-on/layout.tsx',       'virtual-cosplay-try-on',       'en', 'https://agalaz.com/virtual-cosplay-try-on'],
  ['app/virtual-veil-try-on/layout.tsx',          'virtual-veil-try-on',          'en', 'https://agalaz.com/virtual-veil-try-on'],
  ['app/virtual-saree-try-on/layout.tsx',         'virtual-saree-try-on',         'en', 'https://agalaz.com/virtual-saree-try-on'],
  ['app/virtual-hanbok-try-on/layout.tsx',        'virtual-hanbok-try-on',        'en', 'https://agalaz.com/virtual-hanbok-try-on'],
  ['app/virtual-kimono-try-on/layout.tsx',        'virtual-kimono-try-on',        'en', 'https://agalaz.com/virtual-kimono-try-on'],
  ['app/virtual-qipao-try-on/layout.tsx',         'virtual-qipao-try-on',         'en', 'https://agalaz.com/virtual-qipao-try-on'],
  // Asian/Arabic single-locale pages
  ['app/ar/hijab/layout.tsx',  'virtual-veil-try-on',   'ar', 'https://agalaz.com/ar/hijab'],
  ['app/hi/saree/layout.tsx',  'virtual-saree-try-on',  'hi', 'https://agalaz.com/hi/saree'],
  ['app/ko/hanbok/layout.tsx', 'virtual-hanbok-try-on', 'ko', 'https://agalaz.com/ko/hanbok'],
  ['app/ja/kimono/layout.tsx', 'virtual-kimono-try-on', 'ja', 'https://agalaz.com/ja/kimono'],
  ['app/zh/qipao/layout.tsx',  'virtual-qipao-try-on',  'zh', 'https://agalaz.com/zh/qipao'],
];

let touched = 0;
for (const [file, slug, lang, pageUrl] of EN_LAYOUTS) {
  if (!fs.existsSync(file)) { console.log(`MISS ${file}`); continue; }
  let src = fs.readFileSync(file, 'utf8');
  const alreadyHasTag = /<HowToSchemaScript\b/.test(src);
  if (alreadyHasTag) { console.log(`SKIP ${file}`); continue; }

  // 1) Add the import once (no-op if already there).
  if (!/import HowToSchemaScript /.test(src)) {
    src = src.replace(
      /(import ImageSchemaScript from '@\/components\/ImageSchemaScript';)/,
      `$1\nimport HowToSchemaScript from '@/components/HowToSchemaScript';`,
    );
  }

  // 2) Add the JSX tag right after <ImageSchemaScript ... />.
  //    Use [^>]* so URLs with slashes in attribute values still match.
  const before = src;
  src = src.replace(
    /(<ImageSchemaScript[^>]*\/>)/,
    `$1\n      <HowToSchemaScript slug="${slug}" lang="${lang}" pageUrl="${pageUrl}" />`,
  );
  if (src === before) {
    console.log(`FAIL ${file} (no ImageSchemaScript tag found)`);
    continue;
  }

  fs.writeFileSync(file, src);
  console.log(`OK   ${file}`);
  touched++;
}
console.log(`\nUpdated ${touched} files.`);
