import type { MetadataRoute } from 'next';
import { articles } from './blog/articles';
import { CANONICAL_LANDING_SLUGS, nativeLandingUrl, type LandingLang } from '@/lib/i18n/landingSlugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agalaz.com';

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [`${baseUrl}/blog/${article.slug}/opengraph-image`],
  }));

  // Localized variants of the 7 main pages (home, try-on, virtual-try-on, partners, shopify, woocommerce, developers) in es/fr/pt/de/it
  const mainLocalized: MetadataRoute.Sitemap = (['es', 'fr', 'pt', 'de', 'it'] as const).flatMap((lang) =>
    ['', '/try-on', '/virtual-try-on', '/partners', '/shopify', '/woocommerce', '/developers'].map((p) => ({
      url: `${baseUrl}/${lang}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 0.95 : 0.85,
    })),
  );

  // Product try-on landings — EN canonical + 5 native-language variants per slug.
  // URLs come from `nativeLandingUrl` so that localized URLs use native slugs
  // (e.g. /es/probador-bikini, NOT /es/realistic-swimwear-try-on).
  const ALL_LANGS: LandingLang[] = ['en', 'es', 'fr', 'pt', 'de', 'it'];
  const productLandings: MetadataRoute.Sitemap = CANONICAL_LANDING_SLUGS.flatMap((slug) =>
    ALL_LANGS.map((lang) => ({
      url: nativeLandingUrl(slug, lang),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: lang === 'en' ? 0.9 : 0.85,
    })),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...mainLocalized,
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shopify`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/woocommerce`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/developers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...blogEntries,
    // 10 product try-on landings × 6 languages — URLs come from the central slug
    // map so localized URLs use native-language slugs (e.g. /es/probador-bikini).
    ...productLandings,
    // Standalone veils & hijab landings — EN + AR only, kept outside the slug map
    // since they target only those two languages (no ES/FR/PT/DE/IT variant exists).
    {
      url: `${baseUrl}/virtual-veil-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ar/hijab`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Standalone Asian-traditional-wear landings — each is an EN + native pair
    // outside the 6-language slug map.
    {
      url: `${baseUrl}/virtual-saree-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/hi/saree`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/virtual-hanbok-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ko/hanbok`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/virtual-kimono-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ja/kimono`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/virtual-qipao-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/zh/qipao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Long-tail informational landings — high volume, low SEO difficulty,
    // verified via DataForSEO scan (find-longtail-opportunities.mjs) 2026-05.
    {
      url: `${baseUrl}/engagement-ring-on-which-hand`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pt/look-festa-junina`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // bumped during Mai-Jun ramp; quiet rest of year
      priority: 0.85,
    },
    {
      url: `${baseUrl}/fr/tenue-bapteme`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/it/vestito-comunione`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // peak Mar-Jun for first-communion season
      priority: 0.85,
    },
    {
      url: `${baseUrl}/hi/lehenga`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Haircut by face shape — long-tail informational landings (KD 0-8 each).
    // 60K+ combined monthly volume across the 4 shapes per DataForSEO 2026-05.
    {
      url: `${baseUrl}/haircut-for-round-face`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/haircut-for-oval-face`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/haircut-for-diamond-face`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/haircut-for-square-face`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
