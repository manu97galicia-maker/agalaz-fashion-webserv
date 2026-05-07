import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const FAQ = [
  { q: 'How does the virtual men\'s suit try-on work?', a: 'Upload a full-body photo and a photo of any suit, tuxedo, or blazer. The AI maps the garment onto your real body in 30 seconds, preserving your face, skin tone, and proportions.' },
  { q: 'What types of suits can I try?', a: 'Two-piece, three-piece, tuxedo, blazer, peak/notch lapel, slim/classic, double-breasted, business, wedding, prom, smart-casual — from any retailer (SuitSupply, Tom Ford, Hugo Boss, Indochino, ASOS).' },
  { q: 'Can I see different colours and patterns?', a: 'Yes. After the first render, ask the AI: "show this in charcoal", "switch to navy windowpane", "remove the pinstripe". Pattern and colour swap without losing your fit.' },
  { q: 'Will it help me decide between off-the-rack and made-to-measure?', a: 'Yes. Pre-screen before committing to fittings. See if a slim cut works on your build, if a wide lapel suits your shoulders, if 3-piece adds bulk you don\'t want.' },
  { q: 'Useful for menswear retailers and tailors?', a: 'Very. Embed on product pages — typical 3-5x conversion lift on suits, especially for grooms, prom, and corporate. Returns drop dramatically.' },
  { q: 'Do I need to download an app?', a: 'No. Browser-only, phone or desktop. First try-on is free.' },
];

export const metadata: Metadata = {
  title: 'Virtual Suit Try-On — Any Suit On You with AI',
  description:
    'Try any suit, tuxedo, or blazer on your real body before fittings. SuitSupply, Tom Ford, Indochino, vintage — see it on you in 30 seconds. Free, no app.',
  keywords: [
    'virtual mens suit try on',
    'try on suit online',
    'virtual tuxedo try on',
    'ai suit fitting',
    'see suit on me',
    'virtual blazer try on',
    'online suit simulator',
    'wedding suit try on',
    'prom tuxedo try on',
    'mens formal wear simulator',
  ],
  openGraph: {
    title: 'Virtual Men\'s Suit Try-On — See Any Suit On You',
    description: 'Upload a photo, drop in any suit, see it on your real body in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-mens-suit-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-mens-suit-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  
  },
  twitter: { card: 'summary_large_image', title: 'Virtual Men\'s Suit Try-On', description: 'Upload a photo, drop any suit, render in 30 seconds.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-mens-suit-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-mens-suit-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Men\'s Suit Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-mens-suit-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Men\'s Suit Try-On', item: 'https://agalaz.com/virtual-mens-suit-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
