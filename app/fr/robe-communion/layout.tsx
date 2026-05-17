import type { Metadata } from 'next';
import { robeCommunionFR as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/fr/robe-communion';
const metaTitle = 'Robe de Communion 2026 — Essayage Virtuel IA Gratuit';
const metaDescription =
  'Robe de communion 2026 : voyez la robe sur votre enfant avec IA en 30 sec. Cyrillus, Jacadi, marques spécialisées. Gratuit, sans inscription.';
const keywords = [
    'robe de communion',
    'robe communion',
    'robe de communion fille',
    'robe communion 2026',
    'robe communion princesse',
    'robe communion bohème',
    'essayage robe communion',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'fr': 'https://agalaz.com/fr/robe-communion', 'fr-FR': 'https://agalaz.com/fr/robe-communion', 'x-default': 'https://agalaz.com/fr/robe-communion' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/vestito-comunione.png', width: 1200, height: 630, alt: 'Robe Communion — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/vestito-comunione.png'] },
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
        articleSection: 'Communion · Robe',
        inLanguage: 'fr-FR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com/fr' },
        { '@type': 'ListItem', position: 2, name: 'Essayage virtuel', item: 'https://agalaz.com/fr/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Robe Communion', item: url },
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
