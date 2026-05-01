import type { Metadata } from 'next';

const FAQ = [
  { q: 'How does the virtual earring try-on work?', a: 'Upload a selfie that shows your ears clearly and a photo of the earrings or piercing. The AI maps the jewellery onto your real ears in 30 seconds — preserving your skin tone, ear shape, hair, and lighting — so you see exactly how the piece looks before buying or booking the piercing appointment.' },
  { q: 'Can I try studs, hoops, dangles, and ear cuffs?', a: 'Yes. Studs, huggies, hoops (small to oversized), drops, dangles, ear cuffs, statement pieces, climbers, threaders, even cartilage and helix piercings. Anything visible in a photo can be rendered.' },
  { q: 'Can I preview ear piercings before getting one?', a: 'Yes — that is one of the most popular use cases. Test placements (lobe, helix, tragus, conch, daith, rook, industrial) with realistic jewellery before committing. See how the piercing looks healed, with hair down and up.' },
  { q: 'Can I try multiple earrings (stacks, curated ear)?', a: 'Yes. Render the first earring, then ask the AI: "add a small hoop above", "stack a stud in the upper lobe", "add a cuff on the conch". Builds a curated ear look without the trip to the studio.' },
  { q: 'Will it match my skin and hair?', a: 'Yes. The AI preserves skin tone, hair colour and direction, ear shape, and lighting. The earrings sit on YOUR ears — not a stock model.' },
  { q: 'Is it useful for jewellers and piercing studios?', a: 'Very. Show clients curated ear designs before piercing. Cuts decision time, drives studio revenue (clients add earrings on the spot), reduces buyer\'s remorse on fine jewellery. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Free Virtual Earring Try-On | See Piercings & Earrings on Your Photo with AI',
  description:
    'Try earrings and ear piercings on your photo with our free AI simulator. See how studs, hoops, dangles, and cartilage piercings look on your ears before buying. Instant and photorealistic.',
  keywords: [
    'virtual earring try on',
    'ear piercing simulator',
    'try earrings on photo',
    'AI earring visualizer',
    'virtual piercing placement',
    'earring try on app free',
    'see earrings on my face',
    'ear piercing preview tool',
    'jewelry try on online',
    'virtual jewelry fitting',
  ],
  openGraph: {
    title: 'Free Virtual Earring Try-On | Agalaz AI',
    description: 'See how earrings and piercings look on YOUR ears before buying. Upload a selfie, choose a design, and get a photorealistic AI preview instantly.',
    url: 'https://agalaz.com/virtual-earring-try-on',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Earring Try-On — See Piercings on Your Photo with AI',
    description: 'Upload your photo, pick earrings or piercings, and see a photorealistic preview. Free, instant, private.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-earring-try-on',
    languages: {
      'en': 'https://agalaz.com/virtual-earring-try-on',
      'es': 'https://agalaz.com/virtual-earring-try-on',
      'fr': 'https://agalaz.com/fr/virtual-earring-try-on',
      'pt': 'https://agalaz.com/pt/virtual-earring-try-on',
      'de': 'https://agalaz.com/de/virtual-earring-try-on',
      'it': 'https://agalaz.com/it/virtual-earring-try-on',
      'x-default': 'https://agalaz.com/virtual-earring-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz Virtual Earring Try-On',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        url: 'https://agalaz.com/virtual-earring-try-on',
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
          { '@type': 'ListItem', position: 2, name: 'Virtual Earring Try-On', item: 'https://agalaz.com/virtual-earring-try-on' },
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
