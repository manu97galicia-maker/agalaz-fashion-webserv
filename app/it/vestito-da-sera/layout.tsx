import type { Metadata } from 'next';
import { vestitoDaSeraIT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/it/vestito-da-sera';
const metaTitle = 'Vestito da Sera 2026 — Provatore Virtuale con IA Gratis';
const metaDescription =
  'Vestito da sera 2026: prova qualsiasi vestito sul tuo corpo reale con IA in 30 sec. Pinko, Liu Jo, Twin-Set, Maliparmi. Gratis.';
const keywords = [
    'vestito da sera',
    'vestiti da sera',
    'vestito da sera lungo',
    'vestito da sera midi',
    'vestito da sera nero',
    'vestito da sera pinko',
    'vestito da sera liu jo',
    'provatore vestito da sera',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'it': 'https://agalaz.com/it/vestito-da-sera', 'it-IT': 'https://agalaz.com/it/vestito-da-sera', 'x-default': 'https://agalaz.com/it/vestito-da-sera' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/wedding-guest-outfit.png', width: 1200, height: 630, alt: 'Vestito da Sera — Agalaz' }],
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
        articleSection: 'Vestiti · Sera',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
        { '@type': 'ListItem', position: 2, name: 'Provatore virtuale', item: 'https://agalaz.com/it/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestito da Sera', item: url },
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
