import type { Metadata } from 'next';

const url = 'https://agalaz.com/virtual-engagement-ring-try-on';

const FAQ = [
  { q: 'How does the virtual engagement ring try-on work?', a: 'Upload a photo of your hand and a photo of any engagement ring. The AI places the ring on your finger in 30 seconds — preserving skin tone, lighting, and finger curvature so you see how the carat, setting, band, and metal colour actually look on YOUR hand.' },
  { q: 'Can I try rings from Tiffany, Cartier, Brilliant Earth, James Allen?', a: 'Yes. Any engagement ring photo works — Tiffany, Cartier, Harry Winston, Brilliant Earth, James Allen, Blue Nile, Etsy custom designers, vintage stores or a Pinterest screenshot. As long as the ring is visible on a clean background, the AI can render it on your finger.' },
  { q: 'Can I compare 1 carat vs 1.5 carat vs 2 carat on my hand?', a: 'Yes. Use the carat-size pages on the site, or upload three reference photos and run them side by side. You see exactly how the proportional weight changes on your finger length — essential before spending $5K-$20K on a stone.' },
  { q: 'Can I see different settings (solitaire, halo, pavé, three-stone)?', a: 'Yes. Upload separate references for solitaire, halo, hidden halo, pavé band, three-stone, east-west, or vintage settings. The AI swaps the setting and band while keeping your finger and skin tone identical so you compare fair.' },
  { q: 'Does it work with different metal colours (yellow gold, white gold, rose gold, platinum)?', a: 'Yes. Yellow gold, white gold, rose gold and platinum each render with their real reflectivity. After the first render you can ask the AI to swap the metal in chat without re-uploading your hand.' },
  { q: 'How private is my hand photo?', a: 'Photos are processed only to generate your render — never shared, never sold, never used to train AI models. Zero retention: removed from memory immediately.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone, tablet or desktop. The first try-on is free with no account required.' },
];

export const metadata: Metadata = {
  title: 'Engagement Ring Virtual Try-On — Solitaire, Halo, Pavé · Free AI',
  description:
    'Try any engagement ring on your real hand with AI. Compare 1 vs 1.5 vs 2 carat, solitaire vs halo, gold vs platinum — before spending $5K. Free, 30 sec.',
  keywords: [
    'engagement ring virtual try on',
    'virtual engagement ring try on',
    'try on virtual engagement ring',
    'try on virtual engagement rings',
    'virtual engagement ring try-on',
    'virtual try on engagement ring',
    'virtual try on engagement rings',
    'try on engagement ring virtual',
    'try on engagement rings virtual',
    'engagement rings virtual try on',
    'engagement ring try on online',
    'engagement ring simulator',
    'see engagement ring on my hand',
    'ai engagement ring try on',
    'engagement ring visualizer',
    '1 carat vs 1.5 carat ring on hand',
    'virtual ring try on',
    'try on virtual ring',
    'ring try on virtual',
  ],
  openGraph: {
    title: 'Virtual Engagement Ring Try-On — See Any Ring On Your Hand',
    description:
      'Upload your hand and any engagement ring photo — see exactly how the carat, setting and metal look on your real finger in 30 seconds. Free, private, no app.',
    url,
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-jewelry-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Engagement Ring Try-On' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Engagement Ring Try-On — See Any Ring On Your Hand',
    description: 'Upload a hand photo, drop in any engagement ring, see it on your finger in 30 seconds.',
  },
  alternates: { canonical: url, languages: { en: url, 'en-US': url, 'en-GB': url, 'x-default': url } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz Virtual Engagement Ring Try-On',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        url,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '38000' },
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Virtual Jewelry Try-On', item: 'https://agalaz.com/virtual-jewelry-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Virtual Engagement Ring Try-On', item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
