// Fix the 15 page.tsx files that render <TriptychDemo /> ON TOP of a
// component that ALSO renders <TriptychDemo /> internally. The duplicate
// makes the "Mira cómo funciona" / "Voir comment ça marche" section
// appear twice on the page (visual bug confirmed by user screenshot of
// /es/simulador-tatuaje).
//
// Strategy: rewrite each affected page.tsx to ONLY render the component,
// removing the redundant TriptychDemo import + usage at the page level.

import fs from 'fs';
import path from 'path';

const FILES = [
  // SwimwearTryOn variants
  'app/de/bikini-anprobieren/page.tsx',
  'app/es/probador-bikini/page.tsx',
  'app/fr/essayage-bikini/page.tsx',
  'app/it/prova-bikini/page.tsx',
  'app/pt/provador-biquini/page.tsx',
  // EarringTryOn variants
  'app/de/ohrringe-anprobieren/page.tsx',
  'app/es/probador-pendientes/page.tsx',
  'app/fr/essayage-boucles-oreilles/page.tsx',
  'app/it/prova-orecchini/page.tsx',
  'app/pt/provador-brincos/page.tsx',
  // TattooSimulator variants
  'app/de/tattoo-simulator/page.tsx',
  'app/es/simulador-tatuaje/page.tsx',
  'app/fr/simulateur-tatouage/page.tsx',
  'app/it/simulatore-tatuaggi/page.tsx',
  'app/pt/simulador-tatuagem/page.tsx',
];

let fixed = 0;
let skipped = 0;
const errors = [];

for (const rel of FILES) {
  const full = path.resolve(rel);
  if (!fs.existsSync(full)) { errors.push(`${rel}: not found`); continue; }
  const src = fs.readFileSync(full, 'utf8');

  // Sanity: must have exactly one <TriptychDemo and one component named import
  const triptychCount = (src.match(/<TriptychDemo\b/g) || []).length;
  if (triptychCount !== 1) {
    errors.push(`${rel}: expected 1 <TriptychDemo, found ${triptychCount}, skipping`);
    skipped++;
    continue;
  }

  // Extract the component import (the non-TriptychDemo capitalised import)
  const compImportMatch = src.match(/import\s+([A-Z][A-Za-z]+)\s+from\s+['"](@\/components\/landing\/[^'"]+)['"]/);
  if (!compImportMatch) {
    errors.push(`${rel}: could not find component import`);
    skipped++;
    continue;
  }
  const [, compName, compPath] = compImportMatch;

  // Extract the lang the component is called with (`lang="es"` etc.)
  const langMatch = src.match(new RegExp(`<${compName}\\s+lang=["']([a-z]{2})["']\\s*/>`));
  if (!langMatch) {
    errors.push(`${rel}: could not find <${compName} lang="..." />`);
    skipped++;
    continue;
  }
  const lang = langMatch[1];

  // Rewrite as a minimal page that only renders the component.
  const next = `import ${compName} from '${compPath}';

export default function Page() {
  return <${compName} lang="${lang}" />;
}
`;
  fs.writeFileSync(full, next);
  fixed++;
  console.log(`  ✓ ${rel}  (${compName} lang="${lang}")`);
}

console.log(`\nFixed ${fixed} page.tsx files, skipped ${skipped}, errors ${errors.length}`);
errors.forEach((e) => console.log(`  - ${e}`));
