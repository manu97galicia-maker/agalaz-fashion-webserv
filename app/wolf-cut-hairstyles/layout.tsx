import type { Metadata } from 'next';
import { wolfCutHairstyles as data } from '@/data/longtailLandingsRound5';

const url = 'https://agalaz.com/wolf-cut-hairstyles';
const metaTitle = 'Wolf Cut Hairstyles — Free AI Try-On (Long, Short, Curly, Men) 2026';
const metaDescription =
  "Wolf cut hairstyles AI try-on: long, shoulder-length, short, wavy, straight, mullet, asian, middle-part men's. See the wolf cut on YOUR face in 30 seconds before the salon. Free.";
const keywords = [
  'wolf cut',
  'wolf cut hairstyles',
  'wolf cut long',
  'wolf cut long hair',
  'short wolf cut',
  'short haired wolf cut',
  'short hair wolf cut',
  'shoulder length wolf cut',
  'medium wolf cut',
  'wolf cut medium hair',
  'wolf cut wavy hair',
  'wolf cut straight hair',
  'layered wolf cut',
  'layer wolf cut',
  'mullet wolf cut',
  'asian wolf cut',
  'wolf cut on men',
  'wolf cut on man',
  'middle part wolf cut men',
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
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Wolf cut AI try-on — Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/haircut-round-face.png'],
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
        articleSection: 'Hair & Beauty',
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
          { '@type': 'ListItem', position: 2, name: 'Virtual hairstyle', item: 'https://agalaz.com/virtual-hairstyle-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Wolf cut', item: url },
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
