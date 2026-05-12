// Adds region-specific keyword variants to localized landing data so each
// language captures BOTH regional vocabularies (Spain vs Latin America for
// ES, Portugal vs Brazil for PT, etc.) — not just the literal translation
// of the English term.
//
// Each entry: { findExact: string, addAfter: string[] }. We append the new
// keywords to the existing array — non-destructive, keeps Spain/Portugal
// targeting intact while adding LATAM/Brazil reach.

import fs from 'fs';
import path from 'path';

const FILE = 'data/localizedLandings.ts';
const src = fs.readFileSync(FILE, 'utf8');

// Find each Spanish/Portuguese keywords array we want to expand. The
// `marker` string is unique enough to locate the right block without false
// positives (it's the last keyword in the existing array of that landing).
const PATCHES = [
  // ── SPANISH (ES) — add LATAM variants ─────────────────────────────────────
  {
    name: 'es earrings — add LATAM aretes',
    marker: "'try on earrings es'", // earring landing's last EN-leak entry
    extra: [
      'probador virtual aretes',
      'aretes virtuales ia',
      'simulador aretes online',
      'aretes mexicanos virtuales',
      'pendientes vs aretes',
    ],
  },
  {
    name: 'es swimwear — add LATAM bañador/malla/traje de baño',
    marker: "'bikini virtual probador'",
    extra: [
      'probador virtual traje de baño',
      'traje de baño virtual ia',
      'malla virtual probador',
      'bañador virtual ia',
      'bikini probador online mexico',
    ],
  },
  {
    name: 'es glasses — add LATAM lentes',
    marker: "'try on gafas sol'",
    extra: [
      'probador virtual lentes',
      'lentes virtuales ia',
      'simulador lentes online',
      'lentes de sol virtual',
      'lentes graduados probador',
      'lentes vs gafas',
    ],
  },
  {
    name: 'es jewelry — add LATAM joyería terms',
    marker: "'try on joyas'",
    extra: [
      'probador virtual joyería',
      'collar virtual ia',
      'anillos online virtual',
      'pulsera probador online',
      'simulador joyería',
    ],
  },

  // ── PORTUGUESE (PT) — add Brazilian variants where landing uses pt-PT ────
  {
    name: 'pt costume → add fantasia (PT-BR)',
    marker: "'cosplay halloween provador'",
    extra: [
      'provador virtual fantasia',
      'fantasia carnaval virtual',
      'fantasia halloween ia',
      'fantasia cosplay simulador',
      'experimentar fantasia online',
    ],
  },
];

let appliedCount = 0;
let modifiedSrc = src;

for (const patch of PATCHES) {
  const idx = modifiedSrc.indexOf(patch.marker);
  if (idx === -1) {
    console.log(`-  not-found  ${patch.name}  (marker: ${patch.marker})`);
    continue;
  }
  // Add new entries after the marker, before the closing bracket of the keywords array.
  // We look for the next ']' after the marker.
  const closingBracket = modifiedSrc.indexOf(']', idx);
  if (closingBracket === -1) {
    console.log(`✗  no-bracket  ${patch.name}`);
    continue;
  }
  const newKeywords = patch.extra.map((kw) => `, '${kw}'`).join('');
  modifiedSrc = modifiedSrc.slice(0, closingBracket) + newKeywords + modifiedSrc.slice(closingBracket);
  console.log(`✓  ${patch.name}  (+${patch.extra.length} keywords)`);
  appliedCount++;
}

if (appliedCount > 0) {
  fs.writeFileSync(FILE, modifiedSrc);
  console.log(`\nWrote ${FILE} with ${appliedCount} patches applied.`);
}
