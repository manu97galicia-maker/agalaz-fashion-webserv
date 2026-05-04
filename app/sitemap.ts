import type { MetadataRoute } from 'next';
import { articles } from './blog/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agalaz.com';

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [`${baseUrl}/blog/${article.slug}/opengraph-image`],
  }));

  // Localized variants of the 4 main pages (home, try-on, virtual-try-on, partners) in es/fr/pt/de/it
  const mainLocalized: MetadataRoute.Sitemap = (['es', 'fr', 'pt', 'de', 'it'] as const).flatMap((lang) =>
    ['', '/try-on', '/virtual-try-on', '/partners'].map((p) => ({
      url: `${baseUrl}/${lang}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 0.95 : 0.85,
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
    {
      url: `${baseUrl}/virtual-tattoo-simulator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/realistic-swimwear-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-earring-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-wedding-dress-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-nail-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-glasses-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-jewelry-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-mens-suit-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-pet-clothing-try-on`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Localized landing pages (ES, FR, PT, DE, IT) — 9 categories × 5 languages = 45 URLs
    ...(['es', 'fr', 'pt', 'de', 'it'] as const).flatMap((lang) =>
      [
        'virtual-tattoo-simulator',
        'realistic-swimwear-try-on',
        'virtual-earring-try-on',
        'virtual-wedding-dress-try-on',
        'virtual-nail-try-on',
        'virtual-glasses-try-on',
        'virtual-jewelry-try-on',
        'virtual-mens-suit-try-on',
        'virtual-pet-clothing-try-on',
      ].map((slug) => ({
        url: `${baseUrl}/${lang}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      })),
    ),
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
