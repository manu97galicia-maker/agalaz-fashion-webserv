import type { Metadata } from 'next';
import { cocktailDressEN as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/cocktail-dress';
const metaTitle = 'Cocktail Dress AI Try-On — See Any Dress on Your Body Free';
const metaDescription =
  'Cocktail dress AI try-on: Reformation, Revolve, Zara, Mango, ASOS — see any dress on YOUR body in 30 seconds. Free, no signup.';
const keywords = [
    'cocktail dress',
    'cocktail dresses',
    'cocktail dress 2026',
    'reformation cocktail dress',
    'revolve cocktail dress',
    'zara cocktail dress',
    'satin midi dress',
    'wrap midi dress',
    'virtual cocktail dress try on',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'en': 'https://agalaz.com/cocktail-dress', 'en-US': 'https://agalaz.com/cocktail-dress', 'en-GB': 'https://agalaz.com/cocktail-dress', 'x-default': 'https://agalaz.com/cocktail-dress' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/wedding-guest-outfit.png', width: 1200, height: 630, alt: 'Cocktail Dress — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/wedding-guest-outfit.png'] },
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
        articleSection: 'Cocktail · Dresses',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Cocktail Dress', item: url },
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
