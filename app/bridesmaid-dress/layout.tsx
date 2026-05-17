import type { Metadata } from 'next';
import { bridesmaidDressEN as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/bridesmaid-dress';
const metaTitle = 'Bridesmaid Dress AI Try-On — See Any Dress on Your Body Free';
const metaDescription =
  'Bridesmaid dress AI try-on: see Birdy Grey, Azazie, Revolve and ASOS dresses on YOUR body in 30 seconds. Free, no signup, no app.';
const keywords = [
    'bridesmaid dress',
    'bridesmaid dresses',
    'bridesmaid dresses 2026',
    'birdy grey try on',
    'azazie try on',
    'revolve bridesmaid',
    'sage bridesmaid dress',
    'dusty blue bridesmaid',
    'virtual bridesmaid dress',
    'try on bridesmaid dress',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'en': 'https://agalaz.com/bridesmaid-dress', 'en-US': 'https://agalaz.com/bridesmaid-dress', 'en-GB': 'https://agalaz.com/bridesmaid-dress', 'x-default': 'https://agalaz.com/bridesmaid-dress' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/bridesmaid-dress.png', width: 1200, height: 630, alt: 'Bridesmaid Dress — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/bridesmaid-dress.png'] },
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
        articleSection: 'Wedding · Bridesmaid',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Bridesmaid Dress', item: url },
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
