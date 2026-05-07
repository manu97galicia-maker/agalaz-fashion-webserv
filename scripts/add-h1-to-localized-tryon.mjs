// Bing flagged the 5 localized /try-on routes (es/fr/pt/de/it) as
// missing <h1>. They each just re-export the EN client component, so the
// SSR HTML has no h1 at all (the EN /try-on/layout.tsx renders an sr-only
// h1, but localized pages don't share that layout).
//
// Fix: wrap the re-export in a tiny server component that renders an
// sr-only <h1> with the localized title before mounting the imported
// (client) Page. Identical edit across all 5 files.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const LANGS = ['es', 'fr', 'pt', 'de', 'it'];

let updated = 0;

for (const lang of LANGS) {
  const file = path.join(ROOT, 'app', lang, 'try-on', 'page.tsx');
  if (!fs.existsSync(file)) {
    console.log(`✗  miss   ${lang}/try-on/page.tsx`);
    continue;
  }

  const src = fs.readFileSync(file, 'utf8');
  if (/export default function/.test(src)) {
    console.log(`-  skip   ${lang}/try-on/page.tsx  (already wrapped)`);
    continue;
  }

  // The file ends with `export default Page;`. Replace with a wrapper that
  // renders the sr-only H1 + the (client) Page component.
  const newSrc = src.replace(
    /export default Page;\s*$/,
    `export default function TryOnLocalizedPage() {
  return (
    <>
      <h1 className="sr-only">{meta.title}</h1>
      <Page />
    </>
  );
}\n`,
  );

  if (newSrc === src) {
    console.log(`✗  no-pattern  ${lang}/try-on/page.tsx`);
    continue;
  }

  fs.writeFileSync(file, newSrc);
  console.log(`✓  done   ${lang}/try-on/page.tsx`);
  updated++;
}

console.log(`\nUpdated ${updated} of ${LANGS.length} files.`);
