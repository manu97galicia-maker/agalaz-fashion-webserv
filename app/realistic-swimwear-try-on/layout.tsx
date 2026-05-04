import type { Metadata } from 'next';

const FAQ = [
  { q: 'How does the virtual swimwear try-on work?', a: 'Upload a full-body photo of yourself and a photo of any bikini or one-piece. The AI maps the swimwear onto your real body in 30 seconds — preserving your skin tone, body shape, and proportions — so you see exactly how the cut, coverage, and silhouette look on you before buying.' },
  { q: 'Does it work for every body type?', a: 'Yes. The AI does not assume a "model body" — it respects YOUR shoulders, bust, waist, hips, height, and skin tone. Whether you have a curvy, athletic, petite, plus-size, or hourglass build, the render reflects what the swimwear will actually look like on you.' },
  { q: 'Can I try swimwear from any brand?', a: 'Yes. From Triangl, Solid & Striped, Agent Provocateur, Aerie, Hunza G, Frankie\'s Bikinis, ASOS, Shein, Amazon, vintage finds — any swimwear photo works. As long as the suit is visible, the AI can render it on your body.' },
  { q: 'Can I see the same suit in different colours or coverage?', a: 'Yes. Use the AI chat after the first render: "show this in black", "make it higher coverage", "add a thicker strap". Re-renders without losing your body or skin tone.' },
  { q: 'Will my photo be private?', a: 'Yes. Your photo is processed only to generate your render — never shared, never sold, never used to train models. You can delete any render permanently.' },
  { q: 'Is it useful for swimwear brands?', a: 'Yes. Embed on product pages — typical 3-5x conversion lift on swimwear, especially when shoppers can\'t try in store. Returns drop dramatically. Partner pricing available for swimwear DTC brands.' },
];

export const metadata: Metadata = {
  title: 'Realistic Virtual Swimwear Try-On | See Bikinis on Your Real Body Type',
  description:
    'The first AI swimwear visualizer for real bodies. Upload your photo and try on bikinis instantly. Reduce returns and find your perfect fit with Agalaz AI.',
  keywords: [
    'virtual bikini try on real person',
    'swimsuit simulator for curvy bodies',
    'AI swimwear fit visualizer',
    'virtual swimwear try on',
    'bikini try on app',
    'swimsuit fit tool',
    'try on swimwear online',
    'body type swimwear visualizer',
    'realistic bikini fitting',
    'virtual fitting room swimwear',
  ],
  openGraph: {
    title: 'Realistic Virtual Swimwear Try-On | Agalaz AI',
    description:
      'Stop guessing. Use our AI to visualize swimwear and bikinis on your own photos with 100% realistic fitting.',
    url: 'https://agalaz.com/realistic-swimwear-try-on',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realistic Swimwear Try-On — See Bikinis on Your Real Body',
    description:
      'Upload your photo and try on swimwear instantly. AI-powered, realistic fitting for all body types. Free and private.',
  },
  alternates: {
    canonical: 'https://agalaz.com/realistic-swimwear-try-on',
    languages: {
      'en': 'https://agalaz.com/realistic-swimwear-try-on',
      'es': 'https://agalaz.com/es/realistic-swimwear-try-on',
      'fr': 'https://agalaz.com/fr/realistic-swimwear-try-on',
      'pt': 'https://agalaz.com/pt/realistic-swimwear-try-on',
      'de': 'https://agalaz.com/de/realistic-swimwear-try-on',
      'it': 'https://agalaz.com/it/realistic-swimwear-try-on',
      'x-default': 'https://agalaz.com/realistic-swimwear-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz Virtual Swimwear Try-On',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        url: 'https://agalaz.com/realistic-swimwear-try-on',
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
          { '@type': 'ListItem', position: 2, name: 'Realistic Swimwear Try-On', item: 'https://agalaz.com/realistic-swimwear-try-on' },
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
