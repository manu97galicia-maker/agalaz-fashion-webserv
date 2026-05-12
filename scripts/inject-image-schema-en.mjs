// Injects <ImageSchemaScript ... /> into every EN canonical landing layout so
// each landing emits the triptych JSON-LD `ImageObject` entries that Google
// uses to caption / credit images in Google Images.
//
// Idempotent — bails if the file already imports ImageSchemaScript.

import fs from 'fs';
import path from 'path';

const SLUGS = [
  'virtual-tattoo-simulator',
  'realistic-swimwear-try-on',
  'virtual-earring-try-on',
  'virtual-wedding-dress-try-on',
  'virtual-nail-try-on',
  'virtual-glasses-try-on',
  'virtual-jewelry-try-on',
  'virtual-mens-suit-try-on',
  'virtual-pet-clothing-try-on',
  'virtual-baby-clothing-try-on',
  'virtual-costume-try-on',
  'virtual-hairstyle-try-on',
  'virtual-cosplay-try-on',
  'virtual-veil-try-on',
  'virtual-saree-try-on',
  'virtual-hanbok-try-on',
  'virtual-kimono-try-on',
  'virtual-qipao-try-on',
];

let touched = 0;
for (const slug of SLUGS) {
  const file = path.join('app', slug, 'layout.tsx');
  if (!fs.existsSync(file)) {
    console.log(`MISS ${file}`);
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  if (src.includes('ImageSchemaScript')) {
    console.log(`SKIP ${file} (already wired)`);
    continue;
  }

  // 1) Add the import directly after the last import line.
  const importInsertion = "import ImageSchemaScript from '@/components/ImageSchemaScript';";
  let updated = src;
  const lines = updated.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i])) lastImportIdx = i;
  }
  if (lastImportIdx === -1) {
    console.log(`SKIP ${file} (no imports)`);
    continue;
  }
  lines.splice(lastImportIdx + 1, 0, importInsertion);
  updated = lines.join('\n');

  // 2) Add <ImageSchemaScript slug="..." lang="en" pageUrl={...} /> next to
  //    the existing <script type="application/ld+json"> JSX. We add it
  //    immediately AFTER that script tag so both end up inside the React
  //    fragment that the layout returns.
  const pageUrl = `https://agalaz.com/${slug}`;
  const tag = `      <ImageSchemaScript slug="${slug}" lang="en" pageUrl="${pageUrl}" />`;
  const before = updated;
  updated = updated.replace(
    /(<script type="application\/ld\+json" dangerouslySetInnerHTML=\{\{ __html: JSON\.stringify\(ld\) \}\} \/>)/,
    `$1\n${tag}`,
  );
  if (updated === before) {
    // Some layouts use a different variable name. Try a relaxed match.
    updated = updated.replace(
      /(<script type="application\/ld\+json"[^/]*\/>)/,
      `$1\n${tag}`,
    );
  }
  if (updated === before) {
    console.log(`SKIP ${file} (no JSON-LD script tag found)`);
    continue;
  }

  fs.writeFileSync(file, updated);
  console.log(`OK   ${file}`);
  touched++;
}
console.log(`\nUpdated ${touched} files.`);
