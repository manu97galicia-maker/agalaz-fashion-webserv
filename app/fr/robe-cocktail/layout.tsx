import type { Metadata } from 'next';
import { robeCocktailFR as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/fr/robe-cocktail';
const metaTitle = 'Robe Cocktail 2026 — Essayage Virtuel IA Gratuit';
const metaDescription =
  'Robe cocktail 2026 : essayez n\'importe quelle robe sur votre corps avec IA en 30 sec. Sandro, Maje, Sézane. Gratuit, sans inscription.';
const keywords = [
    'robe cocktail',
    'robes cocktail',
    'robe cocktail mariage',
    'robe cocktail femme',
    'robe cocktail midi',
    'robe cocktail noire',
    'essayage virtuel cocktail',
    'robe cocktail 2026',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'fr': 'https://agalaz.com/fr/robe-cocktail', 'fr-FR': 'https://agalaz.com/fr/robe-cocktail', 'x-default': 'https://agalaz.com/fr/robe-cocktail' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/wedding-guest-outfit.png', width: 1200, height: 630, alt: 'Robe Cocktail — Agalaz' }],
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
        articleSection: 'Robes · Cocktail',
        inLanguage: 'fr-FR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com/fr' },
        { '@type': 'ListItem', position: 2, name: 'Essayage virtuel', item: 'https://agalaz.com/fr/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Robe Cocktail', item: url },
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
