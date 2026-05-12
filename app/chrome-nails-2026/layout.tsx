import type { Metadata } from 'next';
import { chromeNails2026 as data } from '@/data/longtailLandingsRound6';

const url = 'https://agalaz.com/chrome-nails-2026';
const metaTitle = 'Chrome Nails 2026 — Pastel, French, Mirror, Glazed Donut (Free AI Try-On)';
const metaDescription =
  "Chrome nails 2026 trend: pastel chrome, mirror, french chrome, glazed donut, chrome pedicure, holographic. Try every chrome design on YOUR real hands with free AI before the salon.";
const keywords = [
  'chrome nails 2026',
  'chrome nails ideas',
  'chrome nails design 2026',
  'chrome nail ideas',
  'chrome nails trend 2026',
  'chrome nails for spring 2026',
  'pastel chrome nails 2026',
  'pastel chrome nails',
  'chrome pastels',
  'chrome french nails',
  'chrome french tips',
  'chrome pedicure',
  'chrome pedicure ideas',
  'glazed donut chrome nails',
  'mirror chrome nails',
  'holographic chrome nails',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: { canonical: url },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Chrome nails 2026 — AI try-on Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/virtual-nail-try-on.png'],
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
        headline: metaTitle,
        description: metaDescription,
        url,
        datePublished: '2026-05-12',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Nails · Beauty',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Virtual nail try-on', item: 'https://agalaz.com/virtual-nail-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Chrome nails 2026', item: url },
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
