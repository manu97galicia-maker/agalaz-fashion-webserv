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
