// Shorten the 13 blog titles flagged as >60 chars by Bing.
// Each entry: [slug, oldTitle, newTitle]. Matches by exact-string within
// articles.ts so we don't accidentally edit a different article's title.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const FILE = path.join(ROOT, 'app', 'blog', 'articles.ts');

const REPLACEMENTS = [
  // [slug-for-context, oldTitle, newTitle]
  ['how-to-know-if-clothes-will-fit-without-trying-them-on',
    'How to Know If a Shirt or Clothes Will Fit Without Trying It On',
    'How to Know If Clothes Will Fit Without Trying'],

  ['how-to-reduce-online-shopping-returns-es',
    'Deja de Perder Dinero: 6 Formas de Reducir Devoluciones un 80%',
    'Reduce Devoluciones un 80%: 6 Formas Probadas'],

  ['online-shopping-mistakes-that-lead-to-returns-es',
    '7 Errores de Compras Online Que Llevan a Devoluciones Costosas',
    '7 Errores Online Que Causan Devoluciones Caras'],

  ['what-to-wear-to-a-job-interview-2026-es',
    'Atuendo Apropiado para una Entrevista de Trabajo 2026 (Por Sector)',
    'Atuendo para Entrevista de Trabajo 2026 (Por Sector)'],

  ['best-free-virtual-dressing-room-apps-android-ios-2026-en',
    'Best Free Virtual Dressing Room Apps for Android vs iOS (2026)',
    'Best Free Virtual Dressing Room Apps 2026 (iOS/Android)'],
  ['best-free-virtual-dressing-room-apps-android-ios-2026-es',
    'Mejores Apps Gratuitas de Probador Virtual para Android vs iOS (2026)',
    'Mejores Apps Gratuitas de Probador Virtual 2026'],

  ['ai-clothes-changer-online-free-trial-es',
    'Mejor Cambiador de Ropa IA Gratis 2026: Probador Virtual Online',
    'Cambiador de Ropa IA Gratis — Probador Online'],

  ['virtual-dressing-room-online-free-es',
    'Probador Virtual Gratis: Prueba Cualquier Outfit Online (2026)',
    'Probador Virtual Gratis — Prueba Outfits Online'],

  ['best-shopify-virtual-try-on-apps-2026-es',
    'Mejores Apps de Probador Virtual para Shopify en 2026: Comparativa Honesta',
    'Mejores Apps Probador Virtual Shopify 2026'],

  ['how-to-add-virtual-try-on-to-woocommerce-en',
    'How to Add Virtual Try-On to WooCommerce (Without a Plugin) in 2026',
    'How to Add Virtual Try-On to WooCommerce in 2026'],
  ['how-to-add-virtual-try-on-to-woocommerce-es',
    'Cómo Añadir Probador Virtual a WooCommerce (Sin Plugin) en 2026',
    'Probador Virtual para WooCommerce Sin Plugin 2026'],

  ['reducing-fashion-ecommerce-returns-complete-guide-es',
    'Cómo Reducir Devoluciones en E-commerce de Moda: Guía Completa 2026',
    'Reducir Devoluciones en E-commerce de Moda 2026'],

  ['agalaz-vs-auglio-comparison-en',
    'Agalaz vs Auglio: Which Virtual Try-On Should Your Store Pick in 2026?',
    'Agalaz vs Auglio: Virtual Try-On Comparison 2026'],

  ['agalaz-vs-genlook-comparison-en',
    'Agalaz vs Genlook: Multi-Platform vs Shopify-Only Generative Try-On',
    'Agalaz vs Genlook: Multi-Platform vs Shopify-Only'],

  ['agalaz-vs-mirrar-comparison-en',
    'Agalaz vs mirrAR: Generative AI vs Traditional AR for Fashion Stores',
    'Agalaz vs mirrAR: Generative AI vs Traditional AR'],
  ['agalaz-vs-mirrar-comparison-es',
    'Agalaz vs mirrAR: IA Generativa vs AR Tradicional para Tiendas de Moda',
    'Agalaz vs mirrAR: IA Generativa vs AR Tradicional'],
];

let src = fs.readFileSync(FILE, 'utf8');
let updates = 0;
let misses = 0;

for (const [slug, oldTitle, newTitle] of REPLACEMENTS) {
  // Quote the old title literally and replace with the new one.
  // We embed the title inside the matched string with surrounding single
  // quotes so we don't accidentally replace inside descriptions or content.
  const search = `'${oldTitle}'`;
  if (!src.includes(search)) {
    console.log(`✗  miss   ${slug}  → ${oldTitle.slice(0, 50)}…`);
    misses++;
    continue;
  }
  src = src.replace(search, `'${newTitle.replace(/'/g, "\\'")}'`);
  console.log(`✓  ${newTitle.length.toString().padStart(2)}  ${slug.padEnd(60)}  ${newTitle}`);
  updates++;
}

fs.writeFileSync(FILE, src);
console.log(`\nUpdated: ${updates}   Missed: ${misses}`);
