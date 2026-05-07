/**
 * Maps a blog article (slug + category) to its best-matching product landing.
 *
 * Why: a reader on "Pastel Chrome Nails 2026" who clicks "Try Now" is far more
 * likely to convert if they land on /virtual-nail-try-on (which speaks
 * directly to the topic) than on the generic /try-on app. Same idea per
 * category — wedding readers → wedding-dress landing, glasses readers →
 * glasses landing, etc.
 *
 * Strategy:
 *   1. Slug keyword match (most specific signal — beats category).
 *   2. Category match (fallback for slugs that don't mention the product).
 *   3. /try-on (final fallback for general-style articles).
 *
 * Returns a path (no host) ready to feed to next/link `href`.
 */

import { LANDING_SLUGS, type LandingLang, type CanonicalLandingSlug } from '@/lib/i18n/landingSlugs';

// Slug-keyword → canonical landing. Order matters when a slug contains
// multiple keywords — the FIRST match wins, so put the more specific ones up
// top (e.g. "wedding-dress" before "dress").
const SLUG_KEYWORDS: Array<[RegExp, CanonicalLandingSlug]> = [
  [/\btattoo/i, 'virtual-tattoo-simulator'],
  [/\bswimwear|\bswim-?suit|\bbikini|\bbathing/i, 'realistic-swimwear-try-on'],
  [/\bearring|\bpendiente/i, 'virtual-earring-try-on'],
  [/\bwedding|\bbride|\bbridal|\bnovia/i, 'virtual-wedding-dress-try-on'],
  [/\bnail|\bmanicure|\bu(ñ|n)as?\b/i, 'virtual-nail-try-on'],
  [/\bglasses|\beyewear|\bsunglasses|\bgafas\b/i, 'virtual-glasses-try-on'],
  [/\bjewel(le)?ry|\bring\b|\bnecklace|\bjoyer(í|i)a/i, 'virtual-jewelry-try-on'],
  [/\bsuit\b|\bblazer|\btraje\b|\bhombre\b/i, 'virtual-mens-suit-try-on'],
  [/\bpet|\bdog|\bcat\b|\bmascota/i, 'virtual-pet-clothing-try-on'],
  [/\bbaby|\binfant|\bbeb(é|e)/i, 'virtual-baby-clothing-try-on'],
  [/\bcostume|\bcosplay|\bdisfraz/i, 'virtual-costume-try-on'],
  [/\bhairstyle|\bhaircut|\bpeinado|\bpelo\b/i, 'virtual-hairstyle-try-on'],
];

// Blog category → canonical landing. Used when slug keywords don't match.
// Categories not listed fall through to /try-on.
const CATEGORY_TO_LANDING: Record<string, CanonicalLandingSlug> = {
  'Nails & Beauty': 'virtual-nail-try-on',
  'Uñas y Belleza': 'virtual-nail-try-on',
  'Glasses & Eyewear': 'virtual-glasses-try-on',
  'Face Shape & Glasses': 'virtual-glasses-try-on',
  'Gafas y Accesorios': 'virtual-glasses-try-on',
  'Forma de Cara y Gafas': 'virtual-glasses-try-on',
  'Jewelry & Rings': 'virtual-jewelry-try-on',
  'Joyería y Anillos': 'virtual-jewelry-try-on',
  'Wedding & Events': 'virtual-wedding-dress-try-on',
  'Bodas y Eventos': 'virtual-wedding-dress-try-on',
  'Work Wear': 'virtual-mens-suit-try-on',
  'Ropa de Trabajo': 'virtual-mens-suit-try-on',
};

/**
 * Resolve the best landing path for a given blog article.
 *
 * @param slug      - article URL slug (e.g. "coquette-aesthetic-spring-nails")
 * @param category  - article.category or article.categoryEs
 * @param lang      - 'en' or one of the supported landing langs
 * @returns         - path to the matching landing, or '/try-on' as fallback
 */
export function blogCtaPath(slug: string, category: string | undefined, lang: LandingLang): string {
  // 1. Slug keyword match
  for (const [pattern, canonical] of SLUG_KEYWORDS) {
    if (pattern.test(slug)) {
      return landingPathFor(canonical, lang);
    }
  }

  // 2. Category match
  if (category) {
    const canonical = CATEGORY_TO_LANDING[category];
    if (canonical) return landingPathFor(canonical, lang);
  }

  // 3. Fallback: generic try-on app
  return lang === 'en' ? '/try-on' : `/${lang}/try-on`;
}

function landingPathFor(canonical: CanonicalLandingSlug, lang: LandingLang): string {
  const slug = LANDING_SLUGS[canonical][lang];
  return lang === 'en' ? `/${slug}` : `/${lang}/${slug}`;
}
