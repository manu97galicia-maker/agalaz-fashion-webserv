import type { Metadata } from 'next';
import { robeDemoiselleHonneurFR as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/fr/robe-demoiselle-honneur';
const metaTitle = 'Robe Demoiselle d\'Honneur 2026 — Essayage Virtuel IA Gratuit';
const metaDescription =
  'Robe demoiselle d\'honneur 2026 : essayez la robe sur votre corps avec IA en 30 sec. Pronovias, ASOS, Sézane. Gratuit, sans inscription.';
const keywords = [
    'robe demoiselle d\'honneur',
    'robe demoiselle honneur',
    'robe demoiselle',
    'robes demoiselle d\'honneur 2026',
    'robe demoiselle pronovias',
    'essayage robe demoiselle',
    'robe sage demoiselle',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'fr': 'https://agalaz.com/fr/robe-demoiselle-honneur', 'fr-FR': 'https://agalaz.com/fr/robe-demoiselle-honneur', 'x-default': 'https://agalaz.com/fr/robe-demoiselle-honneur' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/bridesmaid-dress.png', width: 1200, height: 630, alt: 'Demoiselle d\'honneur — Agalaz' }],
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
        articleSection: 'Mariage · Demoiselle d\'honneur',
        inLanguage: 'fr-FR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com/fr' },
        { '@type': 'ListItem', position: 2, name: 'Essayage virtuel', item: 'https://agalaz.com/fr/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Demoiselle d\'honneur', item: url },
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
