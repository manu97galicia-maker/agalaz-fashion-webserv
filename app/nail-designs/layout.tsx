import type { Metadata } from 'next';
import { nailDesignsEN as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/nail-designs';
const metaTitle = 'Nail Designs 2026 — AI Try-On on Your Real Hand Free';
const metaDescription =
  'Nail designs 2026: try any manicure on your real hand with AI in 30 seconds. Glazed donut, milky French, chrome cherry, micro-floral. Free, no signup.';
const keywords = [
    'nail designs',
    'nail designs designs',
    'designs on nail',
    'nail design ideas',
    'manicure designs',
    'nail art ideas 2026',
    'glazed donut nails',
    'milky french nails',
    'chrome cherry nails',
    'nail design simulator',
    'try nails online',
    'virtual nail try on',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'en': 'https://agalaz.com/nail-designs' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Nail Designs — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-nail-try-on.png'] },
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
        datePublished: '2026-05-17',
        dateModified: '2026-05-17',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Nail Art',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Nail Designs', item: url },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
