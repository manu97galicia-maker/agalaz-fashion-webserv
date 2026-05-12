import type { MetadataRoute } from 'next';
import { articles } from './blog/articles';
import { CANONICAL_LANDING_SLUGS, nativeLandingUrl, type LandingLang } from '@/lib/i18n/landingSlugs';

/**
 * Sitemap with PER-SECTION static lastModified dates instead of `new Date()`
 * everywhere. Google penalizes sitemaps where every URL claims it was just
 * updated — the signal becomes meaningless. We bump dates manually when the
 * actual content of that section changes (paywall update, new schema, copy
 * refresh).
 *
 * Image entries are attached to product landings + Asian + long-tail
 * landings so they appear in Google Image search and AI overviews —
 * `/og/{slug}.png` is the already-generated 1200×630 triptych.
 */

const LAST_MOD = {
  // Bump when /paywall, root layout JSON-LD, or hero copy ships a change
  home: '2026-05-10',
  // Product try-on landings (the 13 canonical EN + 5 localized variants each)
  productLandings: '2026-05-10',
  // Asian native landings (ar/hijab, hi/saree, ko/hanbok, ja/kimono, zh/qipao)
  asianLandings: '2026-05-10',
  // B2B / dev pages
  b2b: '2026-05-08',
  // Long-tail informational landings shipped 2026-05-10
  longtail: '2026-05-10',
  // Legal pages (privacy/terms) rarely change
  legal: '2026-04-01',
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agalaz.com';

  // Blog articles — each carries its own date for honest signal.
  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [`${baseUrl}/blog/${article.slug}/opengraph-image`],
  }));

  // Localized variants of the 7 main pages (home, try-on, virtual-try-on,
  // partners, shopify, woocommerce, developers) in es/fr/pt/de/it.
  const mainLocalized: MetadataRoute.Sitemap = (['es', 'fr', 'pt', 'de', 'it'] as const).flatMap((lang) =>
    ['', '/try-on', '/virtual-try-on', '/partners', '/shopify', '/woocommerce', '/developers'].map((p) => ({
      url: `${baseUrl}/${lang}${p}`,
      lastModified: new Date(LAST_MOD.home),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 0.9 : 0.8,
    })),
  );

  // Product try-on landings — EN canonical + 5 native-language variants per slug.
  // Image attached so they appear in Google Image search.
  const ALL_LANGS: LandingLang[] = ['en', 'es', 'fr', 'pt', 'de', 'it'];
  const productLandings: MetadataRoute.Sitemap = CANONICAL_LANDING_SLUGS.flatMap((slug) =>
    ALL_LANGS.map((lang) => ({
      url: nativeLandingUrl(slug, lang),
      lastModified: new Date(LAST_MOD.productLandings),
      changeFrequency: 'weekly' as const,
      priority: lang === 'en' ? 0.9 : 0.85,
      images: [`${baseUrl}/og/${slug}.png`],
    })),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(LAST_MOD.home),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/try-on`,
      lastModified: new Date(LAST_MOD.home),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-try-on`,
      lastModified: new Date(LAST_MOD.home),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/og/default.png`],
    },
    // Round 12: "best X AI tool" review landings — designed for LLM citation.
    ...[
      'best-virtual-try-on-app',
      'best-ai-clothes-changer',
      'free-virtual-fitting-room',
      'best-hairstyle-try-on-app',
      'best-ai-nail-try-on',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date('2026-05-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...mainLocalized,
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(LAST_MOD.home),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(LAST_MOD.b2b),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shopify`,
      lastModified: new Date(LAST_MOD.b2b),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/default.png`],
    },
    {
      url: `${baseUrl}/woocommerce`,
      lastModified: new Date(LAST_MOD.b2b),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/default.png`],
    },
    {
      url: `${baseUrl}/developers`,
      lastModified: new Date(LAST_MOD.b2b),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...blogEntries,
    ...productLandings,
    // Asian-traditional-wear standalone landings — EN + native pair.
    {
      url: `${baseUrl}/virtual-veil-try-on`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-veil-try-on.png`],
    },
    {
      url: `${baseUrl}/ar/hijab`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-veil-try-on.png`],
    },
    {
      url: `${baseUrl}/virtual-saree-try-on`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-saree-try-on.png`],
    },
    {
      url: `${baseUrl}/hi/saree`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-saree-try-on.png`],
    },
    {
      url: `${baseUrl}/virtual-hanbok-try-on`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-hanbok-try-on.png`],
    },
    {
      url: `${baseUrl}/ko/hanbok`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-hanbok-try-on.png`],
    },
    {
      url: `${baseUrl}/virtual-kimono-try-on`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-kimono-try-on.png`],
    },
    {
      url: `${baseUrl}/ja/kimono`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-kimono-try-on.png`],
    },
    {
      url: `${baseUrl}/virtual-qipao-try-on`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-qipao-try-on.png`],
    },
    {
      url: `${baseUrl}/zh/qipao`,
      lastModified: new Date(LAST_MOD.asianLandings),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${baseUrl}/og/virtual-qipao-try-on.png`],
    },
    // Long-tail informational landings — high volume, low SEO difficulty,
    // verified via DataForSEO scan. Priority 0.9-0.95 for the mega-clusters.
    {
      url: `${baseUrl}/wedding-guest-outfit`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.95, // top of long-tail tier (2.1M/mo cluster, KD 0)
      images: [`${baseUrl}/og/wedding-guest-outfit.png`],
    },
    {
      url: `${baseUrl}/es/vestido-invitada-boda`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.95, // 825K/mo cluster, KD 0
      images: [`${baseUrl}/og/vestido-invitada-boda.png`],
    },
    {
      url: `${baseUrl}/bridesmaid-dress-try-on`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.9, // 201K/mo, KD 9
      images: [`${baseUrl}/og/bridesmaid-dress.png`],
    },
    {
      url: `${baseUrl}/halloween-couples-costumes`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly', // Sept-Oct peak
      priority: 0.9, // 1M+/mo cluster, KD 2-3
      images: [`${baseUrl}/og/halloween-couples.png`],
    },
    {
      url: `${baseUrl}/ja/yukata`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly', // June-Aug peak
      priority: 0.9, // 201K/mo, KD 9
      images: [`${baseUrl}/og/yukata.png`],
    },
    {
      url: `${baseUrl}/natural-makeup-look`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // ~600K/mo cluster, KD 1-2
      images: [`${baseUrl}/og/natural-makeup.png`],
    },
    {
      url: `${baseUrl}/engagement-ring-on-which-hand`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/engagement-ring-hand.png`],
    },
    {
      url: `${baseUrl}/pt/look-festa-junina`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly', // Mai-Jun peak
      priority: 0.85,
      images: [`${baseUrl}/og/look-festa-junina.png`],
    },
    {
      url: `${baseUrl}/fr/tenue-bapteme`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/tenue-bapteme.png`],
    },
    {
      url: `${baseUrl}/it/vestito-comunione`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly', // Mar-Jun peak
      priority: 0.85,
      images: [`${baseUrl}/og/vestito-comunione.png`],
    },
    {
      url: `${baseUrl}/hi/lehenga`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/lehenga-online.png`],
    },
    // Round-3 ultra-easy long-tail landings (2026-05-11) — verified soft SERPs
    {
      url: `${baseUrl}/fr/coupe-cheveux-visage-rond`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // ~7.9K/mo FR cluster, KD 0
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    {
      url: `${baseUrl}/pt/corte-cabelo-rosto-redondo`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // ~3.6K/mo PT-BR cluster, KD 0
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    {
      url: `${baseUrl}/pt/unhas-curtas-ideias`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // ~2.2K/mo PT-BR cluster, KD 0, Pinterest SERP
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    {
      url: `${baseUrl}/it/unghie-corte-semplici`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // ~3.6K/mo IT cluster, KD 0
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    {
      url: `${baseUrl}/it/taglio-capelli-viso-tondo`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // ~1.4K/mo IT cluster, KD 0
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    // Round-4 disfraces/cosplay ES landings (2026-05-11) — SERP-verified
    {
      url: `${baseUrl}/es/disfraz-de-halloween`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly', // Sep-Nov peak
      priority: 0.95, // ~165K/mo MX head term, soft SERP
      images: [`${baseUrl}/og/halloween-couples.png`],
    },
    {
      url: `${baseUrl}/es/cosplay`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.9, // ~55K/mo combined ES+MX head term
      images: [`${baseUrl}/og/virtual-cosplay-try-on.png`],
    },
    {
      url: `${baseUrl}/es/disfraz-halloween-pareja`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.9, // ~27K/mo couples cluster
      images: [`${baseUrl}/og/halloween-couples.png`],
    },
    {
      url: `${baseUrl}/es/disfraces-caseros`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // 4K/mo, KD 0, Pinterest SERP
      images: [`${baseUrl}/og/halloween-couples.png`],
    },
    {
      url: `${baseUrl}/es/disfraz-carnaval`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly', // Feb peak
      priority: 0.85, // 8.1K/mo ES + 27K cluster
      images: [`${baseUrl}/og/halloween-couples.png`],
    },
    // Round-5 ultra-soft top-5 mega-clusters (2026-05-12) — SERP-verified
    {
      url: `${baseUrl}/curtain-bangs-haircut`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.95, // ~30K/mo cluster, KD 0-3, Pinterest+Reddit SERP
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    {
      url: `${baseUrl}/wolf-cut-hairstyles`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.95, // ~38K/mo cluster, KD 0-4, Pinterest+YouTube SERP
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    {
      url: `${baseUrl}/fr/carre-frange-rideau`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85, // ~12K/mo FR cluster, KD 0
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    // Round-6 landings driven by Google Search Console impression data (2026-05-12)
    {
      url: `${baseUrl}/how-to-style-oversized-clothes`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.9, // 36 imp/mo already from Google with no dedicated page
      images: [`${baseUrl}/og/default.png`],
    },
    {
      url: `${baseUrl}/chrome-nails-2026`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.95, // chrome nails cluster: 13 query variants in GSC impressions
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    // Round-7 ES nail mega-clusters (2026-05-12) — DataForSEO verified
    {
      url: `${baseUrl}/es/unas-francesas-disenos`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.95, // 323K/mo cluster, KD 0-8
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    {
      url: `${baseUrl}/es/unas-verano-2026`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly', // seasonal mayo-agosto peak
      priority: 0.95, // 120K/mo cluster, KD 0
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    {
      url: `${baseUrl}/es/unas-de-gel-disenos`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.95, // 200K/mo cluster, KD 0
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    {
      url: `${baseUrl}/es/disenos-de-unas`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.9, // 80K/mo cluster, KD 0
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    // Round-8 ghost-keyword recoveries (2026-05-12) — 4 highest-vol clusters
    {
      url: `${baseUrl}/pt/unhas-decoradas`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.98, // 368K/mo PT-BR, KD 0
      images: [`${baseUrl}/og/virtual-nail-try-on.png`],
    },
    {
      url: `${baseUrl}/pt/corte-de-cabelo-feminino`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.98, // 246K/mo PT-BR, KD 0
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    {
      url: `${baseUrl}/pt/vestido-de-noiva`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.98, // 165K/mo PT-BR, KD 5
      images: [`${baseUrl}/og/virtual-wedding-dress-try-on.png`],
    },
    {
      url: `${baseUrl}/fr/robe-de-mariee`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'weekly',
      priority: 0.98, // 110K/mo FR, KD 0
      images: [`${baseUrl}/og/virtual-wedding-dress-try-on.png`],
    },
    // Haircut by face shape — long-tail informational (KD 0-8 each)
    {
      url: `${baseUrl}/haircut-for-round-face`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/haircut-round-face.png`],
    },
    {
      url: `${baseUrl}/haircut-for-oval-face`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/haircut-oval-face.png`],
    },
    {
      url: `${baseUrl}/haircut-for-diamond-face`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/haircut-diamond-face.png`],
    },
    {
      url: `${baseUrl}/haircut-for-square-face`,
      lastModified: new Date(LAST_MOD.longtail),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/haircut-square-face.png`],
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(LAST_MOD.legal),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(LAST_MOD.legal),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
