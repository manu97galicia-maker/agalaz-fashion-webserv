import type { Metadata } from 'next';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  { q: 'How does the virtual veil and hijab try-on work?', a: 'Upload a clear photo of yourself and a photo of the hijab, niqab, abaya, or burka. The AI maps the garment onto your real face in 30 seconds, preserving features, skin tone, and lighting.' },
  { q: 'What modest fashion can I try?', a: 'Hijabs (chiffon, jersey, satin, sport), abayas, jilbabs, niqabs, burkas, prayer dresses, modest dresses, modest swimwear (burkinis), kaftans — from any brand (Modanisa, Aab, Haute Hijab, INAYAH, ASOS Modest, custom).' },
  { q: 'Will it preserve my features and skin tone?', a: 'Yes. The AI respects face shape, skin tone, eye colour, and lighting. The render shows the garment on YOU, not a stock model.' },
  { q: 'Can I see the same hijab in different colours?', a: 'Yes. After the first render, ask the AI chat: "show this in dusty rose", "switch to chiffon", "longer drape". Re-renders preserving your face and pose.' },
  { q: 'Is the AI respectful of modesty preferences?', a: 'Yes. We only render the garment — never alter the face, body, or generate a different person. Photos are processed in real time and never stored on our servers.' },
  { q: 'Useful for modest-fashion brands?', a: 'Yes. Embed on product pages — typical 3-5x conversion lift on hijabs and abayas, plus a meaningful drop in returns. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Wedding Veil & Hijab Try-On — Cathedral Veil, Bridal Veil AI',
  description:
    'Try any wedding veil, cathedral veil, hijab or abaya on your real face with AI. Bridal veil, mantilla, blusher, modest fashion — see drape on YOU in 30 sec. Free.',
  keywords: [
    'wedding veil',
    'bridal veil',
    'cathedral veil wedding',
    'cathedral veil',
    'wedding bridal veil',
    'wedding bride veil',
    'mantilla veil',
    'blusher veil',
    'wedding veil styles',
    'virtual veil try on',
    'virtual hijab try on',
    'hijab try on online',
    'abaya try on',
    'modest fashion try on',
    'hijab visualizer ai',
  ],
  openGraph: {
    title: 'Virtual Veil & Hijab Try-On — See Modest Fashion On Your Face',
    description: 'Upload your photo, drop in any hijab or abaya, see it on YOUR face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-veil-try-on',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar',
    images: [{ url: '/og/virtual-veil-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Hijab & Veil Try-On',
    description: 'Upload your photo, drop any hijab or abaya, render in 30 seconds.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-veil-try-on',
    languages: {
      en: 'https://agalaz.com/virtual-veil-try-on',
      ar: 'https://agalaz.com/ar/hijab',
      'x-default': 'https://agalaz.com/virtual-veil-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Veil & Hijab Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-veil-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Veil & Hijab Try-On', item: 'https://agalaz.com/virtual-veil-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-veil-try-on" lang="en" pageUrl="https://agalaz.com/virtual-veil-try-on" />
      <HowToSchemaScript slug="virtual-veil-try-on" lang="en" pageUrl="https://agalaz.com/virtual-veil-try-on" />{children}</>);
}
