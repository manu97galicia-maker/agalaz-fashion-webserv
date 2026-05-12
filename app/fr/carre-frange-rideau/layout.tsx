import type { Metadata } from 'next';
import { carreFrangeRideau as data } from '@/data/longtailLandingsRound5';

const url = 'https://agalaz.com/fr/carre-frange-rideau';
const metaTitle = 'Carré avec Frange Rideau — Essayage IA Gratuit (Court, Long, Plongeant) 2026';
const metaDescription =
  "Carré avec frange rideau — court, long, plongeant, sur cheveux bouclés ou ondulés. Essayez la coupe sur VOTRE visage avec l'IA en 30 secondes avant le coiffeur. Gratuit.";
const keywords = [
  'carre frange rideau',
  'carré frange rideau',
  'carré avec frange rideau',
  'carré long frange rideau',
  'carré court frange rideau',
  'carré plongeant frange rideau',
  'frange rideau cheveux bouclés',
  'frange rideau cheveux ondulés',
  'long bob frange rideau',
  'carré asymétrique frange rideau',
  'carré flou frange rideau',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: { canonical: url },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Carré avec frange rideau — essayage IA Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/haircut-round-face.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'beauty',
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
        datePublished: '2026-05-12',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Coiffure · Beauté',
        inLanguage: 'fr-FR',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com/fr' },
          { '@type': 'ListItem', position: 2, name: 'Essayage coiffures', item: 'https://agalaz.com/fr/essayage-coiffures' },
          { '@type': 'ListItem', position: 3, name: 'Carré frange rideau', item: url },
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
