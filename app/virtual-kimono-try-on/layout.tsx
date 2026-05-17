import type { Metadata } from 'next';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  { q: 'How does the virtual kimono and yukata try-on work?', a: 'Upload a clear photo of yourself and a photo of the kimono, yukata, haori, hakama or furisode. The AI dresses you in 30 seconds — including obi tie, eri collar layering and sleeve length — preserving your face and lighting.' },
  { q: 'Which kimono types can I try?', a: 'Furisode, tomesode, houmongi, summer yukata (hanami, hanabi, ryokan), haori jackets, men\'s montsuki and hakama, wedding shiromuku and uchikake, kids shichi-go-san. Any source — Wargo, Yumeyakata, Mercari, vintage Kyoto shops.' },
  { q: 'Can I see different obi and collar combos?', a: 'Yes. Ask the AI: "switch to a red-and-gold maru obi", "softer pastel collar", "longer sleeves", "tie obi in taiko musubi". Re-renders preserving face and pose.' },
  { q: 'Will it respect my real features?', a: 'Yes. The AI keeps your face, eyes and skin tone exactly as they are. The kimono on YOU, not on a Kyoto studio model.' },
  { q: 'Is it ready for shichi-go-san, seijin shiki, hanami?', a: 'Yes — built for it. Preview your daughter\'s shichi-go-san, your seijin shiki furisode, the hanami yukata, the wedding shiromuku, before booking a Kyoto rental.' },
  { q: 'Useful for kimono shops and rentals?', a: 'Yes. Embed on rental pages — typical 3-5x lift on furisode and tourist yukata rentals. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Kimono Try-On — Japanese Kimono, Yukata, Furisode | AI',
  description:
    'Try any kimono, yukata, furisode, haori or hakama on your real face with AI. Japanese kimono clothes, silk kimono — see it on YOU before booking a Kyoto rental.',
  keywords: [
    'kimono',
    'japanese kimono',
    'japanese kimono clothes',
    'silk kimono',
    'kimono dress',
    'kimono in japanese',
    'kimono of japan',
    'kimono from japan',
    'traditional kimono',
    'wedding kimono',
    'virtual kimono try on',
    'yukata try on',
    'furisode try on',
    'kyoto kimono rental virtual',
    'shichi-go-san kimono try on',
    'wedding shiromuku try on',
    'haori try on',
    'hakama try on',
  ],
  openGraph: {
    title: 'Virtual Kimono Try-On — See Kimono & Yukata On Your Face',
    description: 'Upload your photo, drop in any kimono or yukata, see it on YOUR face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-kimono-try-on',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ja',
    images: [{ url: '/og/virtual-kimono-try-on.png', width: 1200, height: 630, alt: 'Virtual Kimono Try-On — See Kimono & Yukata On Your Face' }],
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
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-kimono-try-on" lang="en" pageUrl="https://agalaz.com/virtual-kimono-try-on" />
      <HowToSchemaScript slug="virtual-kimono-try-on" lang="en" pageUrl="https://agalaz.com/virtual-kimono-try-on" />{children}</>);
}
