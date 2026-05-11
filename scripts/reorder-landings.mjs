// Reorder all landings: TryOnDemoBlock right after TriptychDemo,
// PartnerCtaBlock right before PartnersUpsellBlock (or InternalLandingLinks).
//
// Line-by-line approach instead of regex magic. Each JSX element we care
// about is a single line in these files.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FILES = [
  'components/landing/BabyClothingTryOn.tsx',
  'components/landing/BridesmaidDress.tsx',
  'components/landing/CosplayTryOn.tsx',
  'components/landing/CostumeTryOn.tsx',
  'components/landing/EarringTryOn.tsx',
  'components/landing/EngagementRingHand.tsx',
  'components/landing/GlassesTryOn.tsx',
  'components/landing/HaircutByFaceShape.tsx',
  'components/landing/HairstyleTryOn.tsx',
  'components/landing/HalloweenCouples.tsx',
  'components/landing/HanbokTryOn.tsx',
  'components/landing/JewelryTryOn.tsx',
  'components/landing/KimonoTryOn.tsx',
  'components/landing/LehengaOnline.tsx',
  'components/landing/LookFestaJunina.tsx',
  'components/landing/MensSuitTryOn.tsx',
  'components/landing/NailTryOn.tsx',
  'components/landing/NaturalMakeup.tsx',
  'components/landing/PetClothingTryOn.tsx',
  'components/landing/QipaoTryOn.tsx',
  'components/landing/SareeTryOn.tsx',
  'components/landing/SwimwearTryOn.tsx',
  'components/landing/TattooSimulator.tsx',
  'components/landing/TenueBapteme.tsx',
  'components/landing/VeilTryOn.tsx',
  'components/landing/VestidoInvitadaBoda.tsx',
  'components/landing/VestitoComunione.tsx',
  'components/landing/WeddingDressTryOn.tsx',
  'components/landing/WeddingGuestOutfit.tsx',
  'components/landing/Yukata.tsx',
  'components/localized/LocalizedLanding.tsx',
];

// Find the index of a JSX self-closing element (e.g. <TryOnDemoBlock ... />).
// Only matches USAGE (with `<`), not imports. Returns -1 if not found.
function findJsxLine(lines, componentName) {
  const open = `<${componentName}`;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (trimmed.startsWith(open)) return i;
  }
  return -1;
}

// Detect whether the preceding lines are part of a JSX comment block ({/* … */}).
// If so, the start of the comment-comment+element block is earlier than the
// element line. We move the comment with the element so context is preserved.
function elementStartIncludingComment(lines, elementIdx) {
  let i = elementIdx - 1;
  // Skip a single blank line directly above
  if (i >= 0 && lines[i].trim() === '') i--;
  // If the line above ends with `*/}` it's the end of a JSX comment block.
  if (i >= 0 && lines[i].trimEnd().endsWith('*/}')) {
    // Walk up until we find the line that starts with `{/*`
    while (i >= 0 && !lines[i].trimStart().startsWith('{/*')) i--;
    if (i >= 0) return i;
  }
  return elementIdx;
}

const summary = [];

for (const rel of FILES) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) { summary.push(`SKIP ${rel}: not found`); continue; }
  const src = fs.readFileSync(full, 'utf8');
  let lines = src.split('\n');

  const tryOnIdx = findJsxLine(lines, 'TryOnDemoBlock');
  const triptychIdx = findJsxLine(lines, 'TriptychDemo');
  const partnerCtaIdx = findJsxLine(lines, 'PartnerCtaBlock');
  const partnersUpsellIdx = findJsxLine(lines, 'PartnersUpsellBlock');
  const internalLinksIdx = findJsxLine(lines, 'InternalLandingLinks');

  if (tryOnIdx < 0 || triptychIdx < 0) {
    summary.push(`SKIP ${rel}: missing TryOnDemoBlock or TriptychDemo`);
    continue;
  }
  // Idempotency: if TryOnDemoBlock is already within 2 lines below TriptychDemo,
  // assume the move already happened on a previous run and only handle the
  // PartnerCtaBlock relocation (which may or may not have run).
  const tryOnAlreadyMoved =
    tryOnIdx === triptychIdx + 1 || tryOnIdx === triptychIdx + 2;
  // Also skip if PartnerCtaBlock is already near the end of the file (close to PartnersUpsellBlock).
  const partnerAlreadyMoved =
    partnerCtaIdx < 0 ||
    (partnersUpsellIdx > 0 && Math.abs(partnerCtaIdx - partnersUpsellIdx) <= 3) ||
    (internalLinksIdx > 0 && partnerCtaIdx > internalLinksIdx);
  if (tryOnAlreadyMoved && partnerAlreadyMoved) {
    summary.push(`OK   ${rel}  (already reordered, no change)`);
    continue;
  }

  // Step 1: extract TryOnDemoBlock block (with leading comment if present)
  const tryOnStart = elementStartIncludingComment(lines, tryOnIdx);
  const tryOnBlock = lines.slice(tryOnStart, tryOnIdx + 1);
  // Replace with empty so we can reinsert. Trim trailing blank line that would result.
  lines.splice(tryOnStart, tryOnIdx - tryOnStart + 1);

  // Recompute indices after the splice (everything below tryOnStart shifted up
  // by tryOnBlock.length lines)
  const shift = tryOnBlock.length;
  let newTriptychIdx = triptychIdx;
  let newPartnerCtaIdx = partnerCtaIdx;
  let newPartnersUpsellIdx = partnersUpsellIdx;
  let newInternalLinksIdx = internalLinksIdx;
  if (triptychIdx > tryOnStart) newTriptychIdx -= shift;
  if (partnerCtaIdx > tryOnStart) newPartnerCtaIdx -= shift;
  if (partnersUpsellIdx > tryOnStart) newPartnersUpsellIdx -= shift;
  if (internalLinksIdx > tryOnStart) newInternalLinksIdx -= shift;

  // Step 2: insert TryOnDemoBlock right after TriptychDemo line (with a blank line before for visual separation)
  const insertAt = newTriptychIdx + 1;
  // If the line after triptych is blank, insert after that blank line; else just insert and add a blank line before
  const blockToInsert = ['', ...tryOnBlock];
  lines.splice(insertAt, 0, ...blockToInsert);
  const blockSize = blockToInsert.length;

  // Recompute indices after the insert (shift down by blockSize for indices >= insertAt)
  if (newPartnerCtaIdx >= insertAt) newPartnerCtaIdx += blockSize;
  if (newPartnersUpsellIdx >= insertAt) newPartnersUpsellIdx += blockSize;
  if (newInternalLinksIdx >= insertAt) newInternalLinksIdx += blockSize;

  let movedPartner = false;
  if (newPartnerCtaIdx >= 0) {
    // Step 3: move PartnerCtaBlock to right before PartnersUpsellBlock,
    // or before InternalLandingLinks if no upsell, or before </main>.
    const partnerStart = elementStartIncludingComment(lines, newPartnerCtaIdx);
    const partnerBlock = lines.slice(partnerStart, newPartnerCtaIdx + 1);
    lines.splice(partnerStart, newPartnerCtaIdx - partnerStart + 1);
    const pShift = partnerBlock.length;

    // Recompute anchor indices after this removal
    if (newPartnersUpsellIdx > partnerStart) newPartnersUpsellIdx -= pShift;
    if (newInternalLinksIdx > partnerStart) newInternalLinksIdx -= pShift;

    let anchorIdx = -1;
    if (newPartnersUpsellIdx >= 0) anchorIdx = newPartnersUpsellIdx;
    else if (newInternalLinksIdx >= 0) anchorIdx = newInternalLinksIdx;
    else {
      // Find </main> as last resort
      anchorIdx = lines.findIndex((l) => l.includes('</main>'));
    }

    if (anchorIdx >= 0) {
      // Insert before the anchor with a blank line before for spacing
      lines.splice(anchorIdx, 0, '', ...partnerBlock);
      movedPartner = true;
    } else {
      // Could not move — re-insert at original position to avoid breaking
      lines.splice(partnerStart, 0, ...partnerBlock);
    }
  }

  fs.writeFileSync(full, lines.join('\n'));
  summary.push(`OK   ${rel}  tryOnMoved=yes partnerMoved=${movedPartner ? 'yes' : 'n/a'}`);
}

for (const s of summary) console.log(s);
const ok = summary.filter((s) => s.startsWith('OK')).length;
const skip = summary.filter((s) => s.startsWith('SKIP')).length;
console.log(`\n${ok} files reordered, ${skip} skipped`);
