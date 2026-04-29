import type { MetadataRoute } from 'next';

export default function imageSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agalaz.com';

  // Blog article OG images
  const blogImages = [
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
    'how-to-get-accurate-body-measurements-for-virtual-try-on',
    'best-free-virtual-dressing-room-apps-android-ios-2026',
    'virtual-try-on-office-siren-aesthetic-glasses',
    'best-glasses-colors-deep-autumn-skin-tone',
    'free-ai-glasses-stylist-diamond-face-shape',
    'virtual-try-on-glasses-hide-dark-circles',
    'coquette-aesthetic-spring-nails-virtual-try-on',
    'short-almond-spring-nails-clean-girl-look',
    'pastel-chrome-nails-2026-futuristic-spring-trend',
    'spring-wedding-guest-mother-of-groom-dresses-2026',
    'ai-clothes-changer-online-free-trial',
    'como-reducir-devoluciones-tienda-ropa-online',
    'virtual-dressing-room-online-free',
    '1-5-carat-vs-2-carat-diamond-on-hand',
    'diamond-carat-size-on-hand-simulator',
  ];

  return blogImages.map((slug) => ({
    url: `${baseUrl}/blog/${slug}/opengraph-image`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
}
