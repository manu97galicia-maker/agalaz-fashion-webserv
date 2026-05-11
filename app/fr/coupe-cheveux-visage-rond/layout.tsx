import type { Metadata } from 'next';
import { coupeCheveuxVisageRond as data } from '@/data/longtailLandings2026';

const url = 'https://agalaz.com/fr/coupe-cheveux-visage-rond';
const metaTitle = 'Coupe de Cheveux pour Visage Rond — Essayage IA Gratuit | Agalaz';
const metaDescription =
  'Coupe de cheveux pour visage rond — court, long, avec frange, avec lunettes ou ultra court pour cheveux gris. Essayez 8 coupes sur votre photo avec l\'IA en 30 secondes. Gratuit.';
const keywords = [
  'coupe de cheveux pour visage rond',
  'coupe de cheveux visage rond',
  'quelle coupe de cheveux pour visage rond',
  'coupe de cheveux femme visage rond',
  'coupe de cheveux court visage rond',
  'coupe de cheveux court pour visage rond',
  'coupe de cheveux courte pour femme visage rond',
  'coupe de cheveux pour visage rond avec lunettes',
  'visage rond coupe ultra courte femme cheveux gris',
  'coupe ultra courte femme visage rond',
  'carré plongeant visage rond',
  'long bob visage rond',
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
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Coupe de cheveux pour visage rond — essayage IA Agalaz' }],
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
        datePublished: '2026-05-11',
        dateModified: '2026-05-11',
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
          { '@type': 'ListItem', position: 2, name: 'Coiffure virtuelle', item: 'https://agalaz.com/fr/essayage-coiffures' },
          { '@type': 'ListItem', position: 3, name: 'Coupe pour visage rond', item: url },
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
