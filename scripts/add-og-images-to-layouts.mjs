// Bulk-adds an `images:` field to every layout.tsx that defines openGraph
// without it. Maps each layout to the right OG image:
//   - EN landings:        /og/{slug}.png
//   - localized landings: /og/{en-canonical-slug}.png       (same image, different lang)
//   - Asian natives:      /og/{matching-en-slug}.png
//   - Everything else:    /og/default.png
//
// Idempotent: skips files that already contain an `images:` line inside
// openGraph. Safe to re-run after adding more layouts later.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const APP = path.join(ROOT, 'app');

const CANONICAL_SLUGS = [
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
];

// Native slug → canonical EN slug
const NATIVE_TO_EN = {
  // ES
  'simulador-tatuaje': 'virtual-tattoo-simulator',
  'probador-bikini': 'realistic-swimwear-try-on',
  'probador-pendientes': 'virtual-earring-try-on',
  'probador-vestido-novia': 'virtual-wedding-dress-try-on',
  'probador-unas': 'virtual-nail-try-on',
  'probador-gafas': 'virtual-glasses-try-on',
  'probador-joyas': 'virtual-jewelry-try-on',
  'probador-traje-hombre': 'virtual-mens-suit-try-on',
  'probador-ropa-mascotas': 'virtual-pet-clothing-try-on',
  'probador-ropa-bebe': 'virtual-baby-clothing-try-on',
  'probador-disfraces': 'virtual-costume-try-on',
  'probador-peinados': 'virtual-hairstyle-try-on',
  'probador-cosplay': 'virtual-cosplay-try-on',
  // FR
  'simulateur-tatouage': 'virtual-tattoo-simulator',
  'essayage-bikini': 'realistic-swimwear-try-on',
  'essayage-boucles-oreilles': 'virtual-earring-try-on',
  'essayage-robe-mariee': 'virtual-wedding-dress-try-on',
  'simulateur-vernis-ongles': 'virtual-nail-try-on',
  'essayage-lunettes': 'virtual-glasses-try-on',
  'essayage-bijoux': 'virtual-jewelry-try-on',
  'essayage-costume-homme': 'virtual-mens-suit-try-on',
  'essayage-vetements-animal': 'virtual-pet-clothing-try-on',
  'essayage-vetements-bebe': 'virtual-baby-clothing-try-on',
  'essayage-deguisements': 'virtual-costume-try-on',
  'essayage-coiffures': 'virtual-hairstyle-try-on',
  'essayage-cosplay': 'virtual-cosplay-try-on',
  // PT
  'simulador-tatuagem': 'virtual-tattoo-simulator',
  'provador-biquini': 'realistic-swimwear-try-on',
  'provador-brincos': 'virtual-earring-try-on',
  'provador-vestido-noiva': 'virtual-wedding-dress-try-on',
  'simulador-unhas': 'virtual-nail-try-on',
  'provador-oculos': 'virtual-glasses-try-on',
  'provador-joias': 'virtual-jewelry-try-on',
  'provador-fato-homem': 'virtual-mens-suit-try-on',
  'provador-roupa-animal': 'virtual-pet-clothing-try-on',
  'provador-roupa-bebe': 'virtual-baby-clothing-try-on',
  'provador-fatos-carnaval': 'virtual-costume-try-on',
  'provador-penteados': 'virtual-hairstyle-try-on',
  'provador-cosplay': 'virtual-cosplay-try-on',
  // DE
  'tattoo-simulator': 'virtual-tattoo-simulator',
  'bikini-anprobieren': 'realistic-swimwear-try-on',
  'ohrringe-anprobieren': 'virtual-earring-try-on',
  'brautkleid-anprobieren': 'virtual-wedding-dress-try-on',
  'naegel-simulator': 'virtual-nail-try-on',
  'brille-anprobieren': 'virtual-glasses-try-on',
  'schmuck-anprobieren': 'virtual-jewelry-try-on',
  'herrenanzug-anprobieren': 'virtual-mens-suit-try-on',
  'haustierkleidung-anprobieren': 'virtual-pet-clothing-try-on',
  'babykleidung-anprobieren': 'virtual-baby-clothing-try-on',
  'kostueme-anprobieren': 'virtual-costume-try-on',
  'frisuren-anprobieren': 'virtual-hairstyle-try-on',
  'cosplay-anprobieren': 'virtual-cosplay-try-on',
  // IT
  'simulatore-tatuaggi': 'virtual-tattoo-simulator',
  'prova-bikini': 'realistic-swimwear-try-on',
  'prova-orecchini': 'virtual-earring-try-on',
  'prova-abito-sposa': 'virtual-wedding-dress-try-on',
  'simulatore-unghie': 'virtual-nail-try-on',
  'prova-occhiali': 'virtual-glasses-try-on',
  'prova-gioielli': 'virtual-jewelry-try-on',
  'prova-abito-uomo': 'virtual-mens-suit-try-on',
  'prova-vestiti-animali': 'virtual-pet-clothing-try-on',
  'prova-vestiti-neonato': 'virtual-baby-clothing-try-on',
  'prova-costumi': 'virtual-costume-try-on',
  'prova-acconciature': 'virtual-hairstyle-try-on',
  'prova-cosplay': 'virtual-cosplay-try-on',
};

// Standalone Asian native landings → matching EN triptych slug
const ASIAN_LANDINGS = {
  'zh/qipao': 'virtual-qipao-try-on',
  'ja/kimono': 'virtual-kimono-try-on',
  'ko/hanbok': 'virtual-hanbok-try-on',
  'hi/saree': 'virtual-saree-try-on',
  'ar/hijab': 'virtual-veil-try-on', // veils + hijabs share visual concept
};

function ogImageFor(layoutPath) {
  // Normalize: strip ROOT and `app/`, drop `/layout.tsx`
  const rel = path.relative(APP, layoutPath).replace(/\\/g, '/').replace(/\/layout\.tsx$/, '');
  if (rel === '') return null; // root layout - skip, already manually edited

  // 1. EN canonical landing (top-level slug)
  if (CANONICAL_SLUGS.includes(rel)) return `/og/${rel}.png`;

  // 2. EN-only Asian landings (virtual-veil-try-on, virtual-saree-try-on, etc.)
  const enAsian = [
    'virtual-veil-try-on',
    'virtual-saree-try-on',
    'virtual-hanbok-try-on',
    'virtual-kimono-try-on',
    'virtual-qipao-try-on',
  ];
  if (enAsian.includes(rel)) return `/og/${rel}.png`;

  // 3. Asian native landings
  if (ASIAN_LANDINGS[rel]) return `/og/${ASIAN_LANDINGS[rel]}.png`;

  // 4. Localized landing (lang/native-slug)
  const parts = rel.split('/');
  if (parts.length === 2 && ['es', 'fr', 'pt', 'de', 'it'].includes(parts[0])) {
    const en = NATIVE_TO_EN[parts[1]];
    if (en) return `/og/${en}.png`;
  }

  // 5. Default (developers, partners, blog, try-on, /es/page, etc.)
  return '/og/default.png';
}

function findLayouts(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) findLayouts(p, out);
    else if (e.name === 'layout.tsx') out.push(p);
  }
  return out;
}

const layouts = findLayouts(APP);
console.log(`Found ${layouts.length} layout.tsx files.\n`);

let updated = 0;
let skipped = 0;
let noOpenGraph = 0;

for (const layoutPath of layouts) {
  const rel = path.relative(ROOT, layoutPath);
  let src = fs.readFileSync(layoutPath, 'utf8');

  // Find the openGraph object (first occurrence is the metadata one)
  const ogMatch = src.match(/(\bopenGraph:\s*\{)([\s\S]*?)(^\s*\},\s*$)/m);
  if (!ogMatch) {
    console.log(`-  no-og  ${rel}`);
    noOpenGraph++;
    continue;
  }

  const ogBody = ogMatch[2];
  if (/\bimages:\s*\[/.test(ogBody)) {
    console.log(`-  skip   ${rel}  (already has images)`);
    skipped++;
    continue;
  }

  const imgUrl = ogImageFor(layoutPath);
  if (!imgUrl) {
    console.log(`-  root   ${rel}  (root layout - manual)`);
    skipped++;
    continue;
  }

  // Insert images line just before the closing `},` of openGraph
  // Use a 4-space indent (matches existing fields in all layouts checked)
  const imagesLine = `    images: [{ url: '${imgUrl}', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],\n  `;

  // Replace: insert before the trailing `}` of the openGraph object
  const before = src.slice(0, ogMatch.index);
  const ogStart = ogMatch[1];
  const newOgBody = ogBody.replace(/(\s*)$/, `\n${imagesLine}`);
  const ogEnd = ogMatch[3];
  const after = src.slice(ogMatch.index + ogMatch[0].length);

  const newSrc = before + ogStart + newOgBody + ogEnd + after;
  fs.writeFileSync(layoutPath, newSrc);
  console.log(`✓  done   ${rel.padEnd(60)}  ${imgUrl}`);
  updated++;
}

console.log(`\nSummary:`);
console.log(`  Updated: ${updated}`);
console.log(`  Skipped: ${skipped}`);
console.log(`  No openGraph: ${noOpenGraph}`);
