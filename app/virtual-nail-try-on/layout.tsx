import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const FAQ = [
  {
    q: 'How does the virtual nail try-on work?',
    a: 'Upload a clear photo of your hand and a reference of the design or colour you want. The AI renders the manicure on your actual fingers — respecting nail shape, skin tone, and angle — in roughly 30 seconds.',
  },
  {
    q: 'What nail styles can I try?',
    a: 'Anything from a photo: French, almond, square, coffin, stiletto, chrome, glitter, ombré, marble, coquette, clean girl, milky, pastel, neon, themed art (florals, holiday, character).',
  },
  {
    q: 'Can I try the same design in different colours?',
    a: 'Yes. Use the AI chat after the first render: "make these milky pink", "switch chrome to silver", "shorten to almond" — re-renders without losing your hand or skin tone.',
  },
  {
    q: 'Will it look like my real hand?',
    a: 'Yes — that is the entire point. Skin tone, finger length, nail bed shape, photo angle are all preserved. It is a render of those nails on your hand, not a stock overlay.',
  },
  {
    q: 'Is it useful for nail techs and salons?',
    a: 'Yes. Show clients exactly what they will get before mixing gel. Cuts decision time, reduces remakes, doubles as portfolio content. Partner pricing available for salons doing 100+ sets a month.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export const metadata: Metadata = {
  title: 'Virtual Nail Try-On — Manicures on Your Hand with AI',
  description:
    'Try any nail design on your real hand before booking. Almond, coffin, chrome, French, glitter, gel — see it on you in 30 seconds. Free, private, no app.',
  keywords: [
    'virtual nail try on',
    'ai nail simulator',
    'nail design simulator',
    'try nails online',
    'virtual manicure try on',
    'see nails on my hand',
    'nail color try on',
    'nail art simulator',
    'gel nail simulator',
    'press on nail simulator',
  ],
  openGraph: {
    title: 'Virtual Nail Try-On — See Any Manicure On You',
    description:
      'Upload a hand photo, drop in any nail design — see the manicure on your actual hand in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-nail-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Nail Try-On — See Any Manicure On You',
    description: 'Upload a hand photo, drop any nail design, render in 30 seconds.',
  },
  alternates: {
    canonical: nativeLandingUrl('virtual-nail-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-nail-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz Virtual Nail Try-On',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        url: 'https://agalaz.com/virtual-nail-try-on',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '52000' },
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Virtual Nail Try-On', item: 'https://agalaz.com/virtual-nail-try-on' },
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
