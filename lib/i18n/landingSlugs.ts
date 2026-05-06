/**
 * Native-language URL slugs for each product try-on landing.
 *
 * The OUTER key is the canonical English slug (used as the data identifier
 * across the codebase — e.g. in localizedLandings, in the sitemap source list,
 * in the InternalLandingLinks component). The INNER value is the actual URL
 * path segment for each language.
 *
 * Why per-language slugs:
 *   - Google ranks pages partly by URL slug match against the query language.
 *   - A Spanish user searching "probador bikini" gets a much better signal from
 *     /es/probador-bikini than from /es/realistic-swimwear-try-on.
 *   - The previous English-only slugs on localized URLs were a major SEO drag.
 *
 * Backwards compatibility: 50 redirects in next.config.js map the old
 * /{lang}/{en-slug} URLs → the new native ones (301 permanent), so existing
 * external links keep working and Google transfers ranking signals.
 */

export type LandingLang = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it';

export type CanonicalLandingSlug =
  | 'virtual-tattoo-simulator'
  | 'realistic-swimwear-try-on'
  | 'virtual-earring-try-on'
  | 'virtual-wedding-dress-try-on'
  | 'virtual-nail-try-on'
  | 'virtual-glasses-try-on'
  | 'virtual-jewelry-try-on'
  | 'virtual-mens-suit-try-on'
  | 'virtual-pet-clothing-try-on'
  | 'virtual-baby-clothing-try-on'
  | 'virtual-costume-try-on'
  | 'virtual-hairstyle-try-on'
  | 'virtual-cosplay-try-on';

export const CANONICAL_LANDING_SLUGS: readonly CanonicalLandingSlug[] = [
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
] as const;

export const LANDING_SLUGS: Record<CanonicalLandingSlug, Record<LandingLang, string>> = {
  'virtual-tattoo-simulator': {
    en: 'virtual-tattoo-simulator',
    es: 'simulador-tatuaje',
    fr: 'simulateur-tatouage',
    pt: 'simulador-tatuagem',
    de: 'tattoo-simulator',
    it: 'simulatore-tatuaggi',
  },
  'realistic-swimwear-try-on': {
    en: 'realistic-swimwear-try-on',
    es: 'probador-bikini',
    fr: 'essayage-bikini',
    pt: 'provador-biquini',
    de: 'bikini-anprobieren',
    it: 'prova-bikini',
  },
  'virtual-earring-try-on': {
    en: 'virtual-earring-try-on',
    es: 'probador-pendientes',
    fr: 'essayage-boucles-oreilles',
    pt: 'provador-brincos',
    de: 'ohrringe-anprobieren',
    it: 'prova-orecchini',
  },
  'virtual-wedding-dress-try-on': {
    en: 'virtual-wedding-dress-try-on',
    es: 'probador-vestido-novia',
    fr: 'essayage-robe-mariee',
    pt: 'provador-vestido-noiva',
    de: 'brautkleid-anprobieren',
    it: 'prova-abito-sposa',
  },
  'virtual-nail-try-on': {
    en: 'virtual-nail-try-on',
    es: 'probador-unas',
    fr: 'simulateur-vernis-ongles',
    pt: 'simulador-unhas',
    de: 'naegel-simulator',
    it: 'simulatore-unghie',
  },
  'virtual-glasses-try-on': {
    en: 'virtual-glasses-try-on',
    es: 'probador-gafas',
    fr: 'essayage-lunettes',
    pt: 'provador-oculos',
    de: 'brille-anprobieren',
    it: 'prova-occhiali',
  },
  'virtual-jewelry-try-on': {
    en: 'virtual-jewelry-try-on',
    es: 'probador-joyas',
    fr: 'essayage-bijoux',
    pt: 'provador-joias',
    de: 'schmuck-anprobieren',
    it: 'prova-gioielli',
  },
  'virtual-mens-suit-try-on': {
    en: 'virtual-mens-suit-try-on',
    es: 'probador-traje-hombre',
    fr: 'essayage-costume-homme',
    pt: 'provador-fato-homem',
    de: 'herrenanzug-anprobieren',
    it: 'prova-abito-uomo',
  },
  'virtual-pet-clothing-try-on': {
    en: 'virtual-pet-clothing-try-on',
    es: 'probador-ropa-mascotas',
    fr: 'essayage-vetements-animal',
    pt: 'provador-roupa-animal',
    de: 'haustierkleidung-anprobieren',
    it: 'prova-vestiti-animali',
  },
  'virtual-baby-clothing-try-on': {
    en: 'virtual-baby-clothing-try-on',
    es: 'probador-ropa-bebe',
    fr: 'essayage-vetements-bebe',
    pt: 'provador-roupa-bebe',
    de: 'babykleidung-anprobieren',
    it: 'prova-vestiti-neonato',
  },
  'virtual-costume-try-on': {
    en: 'virtual-costume-try-on',
    es: 'probador-disfraces',
    fr: 'essayage-deguisements',
    pt: 'provador-fatos-carnaval',
    de: 'kostueme-anprobieren',
    it: 'prova-costumi',
  },
  'virtual-hairstyle-try-on': {
    en: 'virtual-hairstyle-try-on',
    es: 'probador-peinados',
    fr: 'essayage-coiffures',
    pt: 'provador-penteados',
    de: 'frisuren-anprobieren',
    it: 'prova-acconciature',
  },
  'virtual-cosplay-try-on': {
    en: 'virtual-cosplay-try-on',
    es: 'probador-cosplay',
    fr: 'essayage-cosplay',
    pt: 'provador-cosplay',
    de: 'cosplay-anprobieren',
    it: 'prova-cosplay',
  },
};

const BASE_URL = 'https://agalaz.com';

/**
 * Returns the absolute native URL for a given (canonical slug, language) pair.
 * Example: nativeLandingUrl('virtual-pet-clothing-try-on', 'es') →
 *          'https://agalaz.com/es/probador-ropa-mascotas'
 */
export function nativeLandingUrl(canonical: CanonicalLandingSlug, lang: LandingLang): string {
  const slug = LANDING_SLUGS[canonical][lang];
  if (lang === 'en') return `${BASE_URL}/${slug}`;
  return `${BASE_URL}/${lang}/${slug}`;
}

/** Path-only variant (no host) — handy for `<Link href={...}>` */
export function nativeLandingPath(canonical: CanonicalLandingSlug, lang: LandingLang): string {
  const slug = LANDING_SLUGS[canonical][lang];
  if (lang === 'en') return `/${slug}`;
  return `/${lang}/${slug}`;
}

/**
 * Returns all alternate language URLs for the given canonical slug — used in
 * <link rel="alternate" hreflang> chains across both EN and localized layouts.
 */
export function landingHreflangAlternates(canonical: CanonicalLandingSlug): Record<string, string> {
  const langs: LandingLang[] = ['en', 'es', 'fr', 'pt', 'de', 'it'];
  const alts: Record<string, string> = {};
  for (const l of langs) alts[l] = nativeLandingUrl(canonical, l);
  alts['x-default'] = nativeLandingUrl(canonical, 'en');
  return alts;
}
