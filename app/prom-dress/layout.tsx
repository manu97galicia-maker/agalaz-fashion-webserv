import type { Metadata } from 'next';
import { promDressEN as data } from '@/data/bigVolumeLandings';

const url = 'https://agalaz.com/prom-dress';
const metaTitle = 'Prom Dress 2026 — Virtual Try-On Any Gown on Your Body Free AI';
const metaDescription =
  'Prom dresses 2026: try any prom gown on YOUR real body with AI in 30 seconds. Lulus, ASOS, Macy\'s, Sherri Hill, Pinterest. Free, no signup, no app.';
const keywords = [
  'prom dress',
  'prom dresses',
  'prom dress 2026',
  'prom dress and',
  'prom dress prom dress',
  'dress of prom',
  'dress from prom',
  'dress dress prom',
  'dress for a prom',
  'prom dress clothes',
  'prom dress prom dresses',
  'dress for the prom',
  'prom dress virtual try on',
  'prom gown virtual try on',
  'try on prom dress online',
  'prom dress simulator',
  'see prom dress on me',
  'ai prom dress try on',
  'prom dress 2026 ai',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url, 'en-GB': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: 'Prom dress AI try-on — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-wedding-dress-try-on.png'] },
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
        articleSection: 'Prom · Dresses',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Prom Dress', item: url },
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
