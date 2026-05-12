import type { Metadata } from 'next';
import { howToStyleOversizedClothes as data } from '@/data/longtailLandingsRound6';

const url = 'https://agalaz.com/how-to-style-oversized-clothes';
const metaTitle = 'How to Style Oversized Clothes Without Looking Sloppy — Free AI Try-On 2026';
const metaDescription =
  "How to style oversized clothes without looking sloppy: 8 outfit formulas, 5 rules, body-type specific tips. Try the looks on YOUR body with free AI in 30 seconds.";
const keywords = [
  'how to style oversized clothes',
  'how to style oversized clothes without looking sloppy',
  'oversized outfit formulas',
  'oversized blazer outfit',
  'oversized sweatshirt outfit',
  'oversized clothes for petite',
  'oversized clothes for curvy',
  'oversized clothes 2026',
  'effortless oversized outfit',
  'boyfriend jeans styling',
  'how to wear oversized blazer',
  'oversized hoodie outfit',
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
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'How to style oversized clothes — AI try-on Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/default.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
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
        articleSection: 'Styling · Fashion',
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
          { '@type': 'ListItem', position: 2, name: 'Virtual try-on', item: 'https://agalaz.com/virtual-try-on' },
          { '@type': 'ListItem', position: 3, name: 'How to style oversized', item: url },
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
