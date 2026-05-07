// Shorten metadata.title strings flagged by Bing as "Title too long" (>60 chars).
// Targets only the FIRST `title:` in each layout (the meta title). Leaves
// openGraph.title and twitter.title alone — those have higher char limits.
//
// Each entry: [relative path, NEW title]. Pre-validated to be ≤58 chars and
// keep the primary keyword for SEO.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const UPDATES = [
  // EN landings
  ['app/virtual-nail-try-on/layout.tsx',
    'Virtual Nail Try-On — Manicures on Your Hand with AI'],
  ['app/virtual-costume-try-on/layout.tsx',
    'Virtual Costume Try-On — Halloween & Cosplay AI'],
  ['app/virtual-hairstyle-try-on/layout.tsx',
    'Virtual Hairstyle Try-On — Cuts & Colour Before Salon'],
  ['app/virtual-baby-clothing-try-on/layout.tsx',
    'Virtual Baby Clothing Try-On — Outfits On Your Baby'],
  ['app/virtual-pet-clothing-try-on/layout.tsx',
    'Virtual Pet Clothing Try-On — Outfits On Your Pet'],
  ['app/virtual-wedding-dress-try-on/layout.tsx',
    'Virtual Wedding Dress Try-On — Any Gown with AI'],
  ['app/virtual-earring-try-on/layout.tsx',
    'Virtual Earring Try-On — Piercings on Your Photo'],
  ['app/virtual-glasses-try-on/layout.tsx',
    'Virtual Glasses Try-On — Any Frames On Your Face'],
  ['app/virtual-jewelry-try-on/layout.tsx',
    'Virtual Jewelry Try-On — Necklaces & Rings AI'],
  ['app/virtual-mens-suit-try-on/layout.tsx',
    'Virtual Suit Try-On — Any Suit On You with AI'],
  ['app/virtual-cosplay-try-on/layout.tsx',
    'Virtual Cosplay Try-On — Anime & Game Cosplay AI'],
  ['app/virtual-saree-try-on/layout.tsx',
    'Virtual Saree Try-On — Indian Wear on Your Face'],
  ['app/virtual-hanbok-try-on/layout.tsx',
    'Virtual Hanbok Try-On — Korean Hanbok on Your Face'],
  ['app/virtual-veil-try-on/layout.tsx',
    'Virtual Veil & Hijab Try-On — Modest Fashion AI'],
  ['app/realistic-swimwear-try-on/layout.tsx',
    'Bikini AI Try-On — Free Virtual Swimwear Try-On'],

  // ES landings
  ['app/es/probador-bikini/layout.tsx',
    'Probador Virtual de Bañadores — IA Gratis'],
  ['app/es/simulador-tatuaje/layout.tsx',
    'Simulador de Tatuajes Gratis — Prueba con IA'],
  ['app/es/probador-pendientes/layout.tsx',
    'Probador Virtual de Pendientes — IA Gratis'],

  // FR landings
  ['app/fr/essayage-bikini/layout.tsx',
    'Essayage Virtuel de Maillots — Bikinis IA'],
  ['app/fr/simulateur-tatouage/layout.tsx',
    'Simulateur de Tatouage Gratuit — IA'],
  ['app/fr/essayage-boucles-oreilles/layout.tsx',
    'Essayage Virtuel de Boucles d\'Oreilles IA'],

  // DE landings
  ['app/de/bikini-anprobieren/layout.tsx',
    'Bikini-Anprobe — Bademoden am Echten Körper KI'],
  ['app/de/tattoo-simulator/layout.tsx',
    'Tattoo-Simulator Kostenlos — Tattoos auf Foto'],
  ['app/de/ohrringe-anprobieren/layout.tsx',
    'Virtuelle Ohrring-Anprobe mit KI'],

  // IT landings
  ['app/it/prova-bikini/layout.tsx',
    'Prova Virtuale Bikini — Costumi sul Corpo Reale'],
  ['app/it/simulatore-tatuaggi/layout.tsx',
    'Simulatore Tatuaggi Virtuale — Prova con IA'],
  ['app/it/prova-orecchini/layout.tsx',
    'Prova Virtuale Orecchini IA'],

  // PT landings
  ['app/pt/provador-biquini/layout.tsx',
    'Provador Virtual de Biquínis — IA Realista'],
  ['app/pt/simulador-tatuagem/layout.tsx',
    'Simulador de Tatuagem Grátis — Teste com IA'],
  ['app/pt/provador-brincos/layout.tsx',
    'Provador Virtual de Brincos com IA'],
];

let okCount = 0;
let warnCount = 0;
let missCount = 0;

for (const [rel, newTitle] of UPDATES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.log(`✗  miss   ${rel}`);
    missCount++;
    continue;
  }

  const src = fs.readFileSync(file, 'utf8');

  // Replace ONLY the first `title:` line — this is the metadata.title.
  // Match a single-quoted title up to the comma (allowing escaped quotes).
  const re = /(\bmetadata:\s*Metadata\s*=\s*\{[\s\S]*?\btitle:\s*)(['"][\s\S]*?['"])(\s*,)/m;
  const m = src.match(re);
  if (!m) {
    console.log(`✗  no-title-match  ${rel}`);
    missCount++;
    continue;
  }

  const oldTitle = m[2];
  const newSrc = src.replace(m[0], `${m[1]}'${newTitle.replace(/'/g, "\\'")}'${m[3]}`);
  fs.writeFileSync(file, newSrc);

  const len = newTitle.length;
  const flag = len <= 55 ? '✓' : len <= 60 ? '~' : '!';
  if (len > 60) warnCount++;
  console.log(`${flag}  ${len.toString().padStart(2)} chars  ${rel.padEnd(50)}  ${oldTitle} → '${newTitle}'`);
  okCount++;
}

console.log(`\nUpdated: ${okCount}   Warnings (>60): ${warnCount}   Missed: ${missCount}`);
