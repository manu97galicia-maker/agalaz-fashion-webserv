import type { Metadata } from 'next';

const FAQ = [
  { q: 'How does the virtual veil and hijab try-on work?', a: 'Upload a clear photo of yourself and a photo of the hijab, niqab, abaya, or burka. The AI maps the garment onto your real face in 30 seconds, preserving features, skin tone, and lighting.' },
  { q: 'What modest fashion can I try?', a: 'Hijabs (chiffon, jersey, satin, sport), abayas, jilbabs, niqabs, burkas, prayer dresses, modest dresses, modest swimwear (burkinis), kaftans — from any brand (Modanisa, Aab, Haute Hijab, INAYAH, ASOS Modest, custom).' },
  { q: 'Will it preserve my features and skin tone?', a: 'Yes. The AI respects face shape, skin tone, eye colour, and lighting. The render shows the garment on YOU, not a stock model.' },
  { q: 'Can I see the same hijab in different colours?', a: 'Yes. After the first render, ask the AI chat: "show this in dusty rose", "switch to chiffon", "longer drape". Re-renders preserving your face and pose.' },
  { q: 'Is the AI respectful of modesty preferences?', a: 'Yes. We only render the garment — never alter the face, body, or generate a different person. Photos are processed in real time and never stored on our servers.' },
  { q: 'Useful for modest-fashion brands?', a: 'Yes. Embed on product pages — typical 3-5x conversion lift on hijabs and abayas, plus a meaningful drop in returns. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Virtual Veil & Hijab Try-On — Modest Fashion AI',
  description:
    'Try hijabs, abayas, niqabs, burkas, and modest dresses on your real face with AI before buying. From any brand — see colour, drape, coverage on YOU in 30 seconds. Free, no app.',
  keywords: [
    'virtual hijab try on',
    'hijab try on online',
    'abaya try on',
    'virtual modest fashion try on',
    'burka virtual try on',
    'niqab try on',
    'hijab simulator',
    'try on abaya online',
    'modest fashion try on',
    'see hijab on my face',
    'virtual modest dressing room',
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
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Veil & Hijab Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-veil-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Veil & Hijab Try-On', item: 'https://agalaz.com/virtual-veil-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
