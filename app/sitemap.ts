import type { MetadataRoute } from 'next';

const blogSlugs = [
  'how-to-know-if-clothes-will-fit-without-trying-them-on',
  'why-clothes-look-different-online-vs-in-person',
  'how-to-reduce-online-shopping-returns',
  'best-way-to-try-on-clothes-online-with-ai',
  'how-to-dress-for-your-body-type-without-a-stylist',
  'online-shopping-mistakes-that-lead-to-returns',
  'what-to-wear-to-a-job-interview-2026',
  'best-colors-to-wear-for-your-skin-tone',
  'how-to-style-oversized-clothes-without-looking-sloppy',
  'capsule-wardrobe-guide-30-outfits-15-pieces',
  'barrel-leg-jeans-styling-guide',
  'digital-nomad-corporate-crease-free-office-wear',
  'jellyfish-silhouette-styling-guide',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agalaz.com';

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogEntries,
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
