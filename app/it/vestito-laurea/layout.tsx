import type { Metadata } from 'next';
import { vestitoLaureaIT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/it/vestito-laurea';
const metaTitle = 'Vestito per Laurea 2026 — Provatore Virtuale IA Gratis';
const metaDescription =
  'Vestito per laurea 2026: prova qualsiasi vestito sul tuo corpo con IA in 30 sec. Zara, Pinko, Liu Jo, Mango. Gratis, senza registrazione.';
const keywords = [
    'vestito laurea',
    'vestito da laurea',
    'vestito per laurea',
    'vestito laurea triennale',
    'vestito laurea magistrale',
    'vestito laurea elegante',
    'tubino laurea',
    'provatore vestito laurea',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'it': 'https://agalaz.com/it/vestito-laurea', 'it-IT': 'https://agalaz.com/it/vestito-laurea', 'x-default': 'https://agalaz.com/it/vestito-laurea' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/wedding-guest-outfit.png', width: 1200, height: 630, alt: 'Vestito Laurea — Agalaz' }],
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
        articleSection: 'Vestiti · Laurea',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
        { '@type': 'ListItem', position: 2, name: 'Provatore virtuale', item: 'https://agalaz.com/it/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestito Laurea', item: url },
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
