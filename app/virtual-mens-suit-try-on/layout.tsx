import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import ImageSchemaScript from '@/components/ImageSchemaScript';

const FAQ = [
  { q: 'How does the virtual men\'s suit try-on work?', a: 'Upload a full-body photo and a photo of any suit, tuxedo, or blazer. The AI maps the garment onto your real body in 30 seconds, preserving your face, skin tone, and proportions.' },
  { q: 'What types of suits can I try?', a: 'Two-piece, three-piece, tuxedo, blazer, peak/notch lapel, slim/classic, double-breasted, business, wedding, prom, smart-casual — from any retailer (SuitSupply, Tom Ford, Hugo Boss, Indochino, ASOS).' },
  { q: 'Can I see different colours and patterns?', a: 'Yes. After the first render, ask the AI: "show this in charcoal", "switch to navy windowpane", "remove the pinstripe". Pattern and colour swap without losing your fit.' },
  { q: 'Will it help me decide between off-the-rack and made-to-measure?', a: 'Yes. Pre-screen before committing to fittings. See if a slim cut works on your build, if a wide lapel suits your shoulders, if 3-piece adds bulk you don\'t want.' },
  { q: 'Useful for menswear retailers and tailors?', a: 'Very. Embed on product pages — typical 3-5x conversion lift on suits, especially for grooms, prom, and corporate. Returns drop dramatically.' },
  { q: 'Do I need to download an app?', a: 'No. Browser-only, phone or desktop. First try-on is free.' },
];

export const metadata: Metadata = {
  title: "Men's Suit 2026: Wedding, Prom, Business, Slim Fit — Free AI Try-On",
  description:
    "Men's suit 2026: wedding suits, prom tuxedos, business suits, slim fit, navy, gray, black. Try any suit on your real body with AI in 30 seconds before buying. Free.",
  keywords: [
    'mens suit',
    'mens tailored suit',
    'mens suit tailor',
    'tailor mens suit',
    'suit for mens',
    'suit for mens near me',
    'black mens suit shoes',
    'mens suit shoes',
    'mens suit colors',
    'wedding suit men',
    'prom tuxedo',
    'virtual mens suit try on',
    'try on suit online',
    'virtual tuxedo try on',
    'ai suit fitting',
    'virtual blazer try on',
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
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Men\'s Suit Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-mens-suit-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Men\'s Suit Try-On', item: 'https://agalaz.com/virtual-mens-suit-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-mens-suit-try-on" lang="en" pageUrl="https://agalaz.com/virtual-mens-suit-try-on" />{children}</>);
}
