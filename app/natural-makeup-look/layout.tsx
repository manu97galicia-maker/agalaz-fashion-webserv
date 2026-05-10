import type { Metadata } from 'next';
import { NATURAL_MAKEUP_FAQ as FAQ_DATA } from '@/data/naturalMakeup';

const url = 'https://agalaz.com/natural-makeup-look';

export const metadata: Metadata = {
  title: 'Natural Makeup Look 2026 — 8 Looks + AI Try-On',
  description:
    'Natural makeup looks for everyday, date night, interview, wedding. No-makeup makeup, soft glam, smokey eye. Try every look on YOUR face with AI. Free, 30 sec.',
  keywords: [
    // Primary cluster ~30 variants at 22,200/mo each, KD 2
    'natural makeup look',
    'natural makeup looks',
    'natural look makeup',
    'natural looking makeup',
    'natural-looking makeup',
    'makeup natural look',
    'makeup natural looking',
    'makeup for natural look',
    'makeup look natural',
    'natural look for makeup',
    'natural looks for makeup',
    'no makeup makeup',
    'no-makeup makeup look',
    // Smokey eye cluster
    'smokey eye makeup',
    'eye makeup smokey',
    'natural smokey eye',
    'soft smokey eye',
    // Specific looks
    'natural makeup for interview',
    'natural makeup for wedding',
    'natural makeup hooded eyes',
    'natural makeup mature skin',
    'soft glam makeup',
    'mlbb makeup',
    'date night makeup natural',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Natural Makeup Look 2026 — 8 Looks + AI Try-On',
    description: '8 natural makeup looks (no-makeup, soft glam, smokey, bridal, hooded eye, mature). Try them on YOUR face with AI in 30 sec. Free.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-hairstyle-try-on.png', width: 1200, height: 630, alt: 'Natural makeup look AI try-on — Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natural Makeup Look AI Try-On',
    description: '8 looks + AI try-on on YOUR face. Free, 30 sec.',
    images: ['/og/virtual-hairstyle-try-on.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'beauty',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Natural Makeup Look 2026 — 8 Looks + AI Try-On',
        description: 'Comprehensive guide to natural makeup looks with 8 occasion-specific tutorials and AI virtual try-on.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Beauty · Makeup',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Beauty', item: 'https://agalaz.com/virtual-hairstyle-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Natural makeup look', item: url },
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
