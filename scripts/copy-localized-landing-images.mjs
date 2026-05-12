// Copies each /public/images/landings/{en-slug}-{panel}.png to a sibling
// file named with the native-language slug. Google Image Search reads the
// filename as a ranking signal; an English filename on a Spanish landing
// throws away that signal. The pages themselves switch to the localized
// URL via getTriptychSrc() in lib/imageSeo.ts.

import fs from 'fs';
import path from 'path';

// Mirrors lib/i18n/landingSlugs.ts. Kept inline because this is a node
// script (no TS import resolution).
const LANDING_SLUGS = {
  'virtual-tattoo-simulator':       { es: 'simulador-tatuaje',         fr: 'simulateur-tatouage',     pt: 'simulador-tatuagem',     de: 'tattoo-simulator',         it: 'simulatore-tatuaggi' },
  'realistic-swimwear-try-on':      { es: 'probador-bikini',           fr: 'essayage-bikini',         pt: 'provador-biquini',       de: 'bikini-anprobieren',       it: 'prova-bikini' },
  'virtual-earring-try-on':         { es: 'probador-pendientes',       fr: 'essayage-boucles-oreilles', pt: 'provador-brincos',     de: 'ohrringe-anprobieren',     it: 'prova-orecchini' },
  'virtual-wedding-dress-try-on':   { es: 'probador-vestido-novia',    fr: 'essayage-robe-mariee',    pt: 'provador-vestido-noiva', de: 'brautkleid-anprobieren',   it: 'prova-abito-sposa' },
  'virtual-nail-try-on':            { es: 'probador-unas',             fr: 'simulateur-vernis-ongles', pt: 'simulador-unhas',       de: 'naegel-simulator',         it: 'simulatore-unghie' },
  'virtual-glasses-try-on':         { es: 'probador-gafas',            fr: 'essayage-lunettes',       pt: 'provador-oculos',        de: 'brille-anprobieren',       it: 'prova-occhiali' },
  'virtual-jewelry-try-on':         { es: 'probador-joyas',            fr: 'essayage-bijoux',         pt: 'provador-joias',         de: 'schmuck-anprobieren',      it: 'prova-gioielli' },
  'virtual-mens-suit-try-on':       { es: 'probador-traje-hombre',     fr: 'essayage-costume-homme',  pt: 'provador-fato-homem',    de: 'herrenanzug-anprobieren',  it: 'prova-abito-uomo' },
  'virtual-pet-clothing-try-on':    { es: 'probador-ropa-mascotas',    fr: 'essayage-vetements-animal', pt: 'provador-roupa-animal',de: 'haustierkleidung-anprobieren', it: 'prova-vestiti-animali' },
  'virtual-baby-clothing-try-on':   { es: 'probador-ropa-bebe',        fr: 'essayage-vetements-bebe', pt: 'provador-roupa-bebe',    de: 'babykleidung-anprobieren', it: 'prova-vestiti-neonato' },
  'virtual-costume-try-on':         { es: 'probador-disfraces',        fr: 'essayage-deguisements',   pt: 'provador-fatos-carnaval',de: 'kostueme-anprobieren',     it: 'prova-costumi' },
  'virtual-hairstyle-try-on':       { es: 'probador-peinados',         fr: 'essayage-coiffures',      pt: 'provador-penteados',     de: 'frisuren-anprobieren',     it: 'prova-acconciature' },
  'virtual-cosplay-try-on':         { es: 'probador-cosplay',          fr: 'essayage-cosplay',        pt: 'provador-cosplay',       de: 'cosplay-anprobieren',      it: 'prova-cosplay' },
};

const PANELS = ['before', 'item', 'after'];
const LANDINGS_DIR = path.join('public', 'images', 'landings');

let copied = 0;
let skipped = 0;
let missing = 0;
for (const [enSlug, byLang] of Object.entries(LANDING_SLUGS)) {
  for (const [lang, nativeSlug] of Object.entries(byLang)) {
    for (const panel of PANELS) {
      const source = path.join(LANDINGS_DIR, `${enSlug}-${panel}.png`);
      const target = path.join(LANDINGS_DIR, `${nativeSlug}-${panel}.png`);
      if (!fs.existsSync(source)) {
        missing++;
        console.log(`MISS  ${source}`);
        continue;
      }
      if (fs.existsSync(target)) {
        skipped++;
        continue;
      }
      fs.copyFileSync(source, target);
      copied++;
      console.log(`COPY  ${enSlug} → ${lang}/${nativeSlug}-${panel}.png`);
    }
  }
}
console.log(`\n${copied} copied, ${skipped} already existed, ${missing} source missing.`);
