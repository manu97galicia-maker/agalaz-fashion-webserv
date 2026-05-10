import type { Metadata } from 'next';

const FAQ = [
  { q: 'How does the virtual kimono and yukata try-on work?', a: 'Upload a clear photo of yourself and a photo of the kimono, yukata, haori, hakama or furisode. The AI dresses you in 30 seconds — including obi tie, eri collar layering and sleeve length — preserving your face and lighting.' },
  { q: 'Which kimono types can I try?', a: 'Furisode, tomesode, houmongi, summer yukata (hanami, hanabi, ryokan), haori jackets, men\'s montsuki and hakama, wedding shiromuku and uchikake, kids shichi-go-san. Any source — Wargo, Yumeyakata, Mercari, vintage Kyoto shops.' },
  { q: 'Can I see different obi and collar combos?', a: 'Yes. Ask the AI: "switch to a red-and-gold maru obi", "softer pastel collar", "longer sleeves", "tie obi in taiko musubi". Re-renders preserving face and pose.' },
  { q: 'Will it respect my real features?', a: 'Yes. The AI keeps your face, eyes and skin tone exactly as they are. The kimono on YOU, not on a Kyoto studio model.' },
  { q: 'Is it ready for shichi-go-san, seijin shiki, hanami?', a: 'Yes — built for it. Preview your daughter\'s shichi-go-san, your seijin shiki furisode, the hanami yukata, the wedding shiromuku, before booking a Kyoto rental.' },
  { q: 'Useful for kimono shops and rentals?', a: 'Yes. Embed on rental pages — typical 3-5x lift on furisode and tourist yukata rentals. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Virtual Kimono Try-On — Kimono & Yukata on Your Face',
  description:
    'Try kimono, yukata, haori, hakama and furisode on your real face with AI before booking a Kyoto rental or buying. See silk, obi and sleeves on YOU in 30 seconds. Free, no app.',
  keywords: [
    'virtual kimono try on',
    'kimono try on online',
    'yukata try on',
    'furisode try on',
    'haori try on',
    'hakama try on',
    'kimono visualizer',
    'shichi-go-san kimono try on',
    'seijin shiki furisode',
    'kyoto kimono rental virtual',
    'see kimono on my face',
    'wedding shiromuku try on',
  ],
  openGraph: {
    title: 'Virtual Kimono Try-On — See Kimono & Yukata On Your Face',
    description: 'Upload your photo, drop in any kimono or yukata, see it on YOUR face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-kimono-try-on',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ja',
    images: [{ url: '/og/virtual-kimono-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Kimono & Yukata Try-On',
    description: 'Upload your photo, drop any kimono, render in 30 seconds.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-kimono-try-on',
    languages: {
      en: 'https://agalaz.com/virtual-kimono-try-on',
      ja: 'https://agalaz.com/ja/kimono',
      'x-default': 'https://agalaz.com/virtual-kimono-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Kimono Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-kimono-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Kimono Try-On', item: 'https://agalaz.com/virtual-kimono-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
