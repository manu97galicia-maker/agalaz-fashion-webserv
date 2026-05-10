import type { Metadata } from 'next';
import { BRIDESMAID_FAQ as FAQ_DATA } from '@/data/bridesmaidDress';

const url = 'https://agalaz.com/bridesmaid-dress-try-on';

export const metadata: Metadata = {
  title: 'Bridesmaid Dress Try-On — See It On You with AI 2026',
  description:
    'Bridesmaid dress AI try-on: see Birdy Grey, Azazie, BHLDN dresses on YOUR body in 30 seconds. 7 styles for every wedding. Free first render, no signup.',
  keywords: [
    // Primary cluster from DataForSEO scan (201K/mo, KD 4-9)
    'bridesmaid dress',
    'bridesmaid dresses',
    'dress for a bridesmaid',
    'dress for the bridesmaid',
    'dress bridesmaid dress',
    'bridesmaid dress online',
    'bridesmaid dress try on',
    'virtual bridesmaid dress try on',
    'bridesmaid dress simulator',
    // Variants
    'sage bridesmaid dress',
    'mismatched bridesmaid dresses',
    'plus size bridesmaid dress',
    'velvet bridesmaid dress',
    'long bridesmaid dress',
    'short bridesmaid dress',
    'cheap bridesmaid dresses',
    'birdy grey dresses',
    'azazie bridesmaid',
    'bhldn bridesmaid',
    'bridesmaid dresses 2026',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Bridesmaid Dress AI Try-On — See It On Your Body',
    description: '7 bridesmaid dress styles + AI try-on. Birdy Grey, Azazie, BHLDN — see it on YOU before paying. Free, 30 sec.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: 'Bridesmaid dress AI try-on — Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridesmaid Dress AI Try-On',
    description: 'See any bridesmaid dress on YOUR body in 30 seconds. Free.',
    images: ['/og/virtual-wedding-dress-try-on.png'],
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
        headline: 'Bridesmaid Dress Try-On — See It On You with AI',
        description: '7 bridesmaid dress styles for every wedding type with AI virtual try-on.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Wedding · Bridal Party',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Wedding', item: 'https://agalaz.com/virtual-wedding-dress-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Bridesmaid dress', item: url },
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
