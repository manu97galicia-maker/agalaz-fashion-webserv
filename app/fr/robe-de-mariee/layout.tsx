import type { Metadata } from 'next';
import { robeDeMarieeFR as data } from '@/data/longtailLandingsRound8';

const url = 'https://agalaz.com/fr/robe-de-mariee';
const metaTitle = 'Robe de Mariée 2026: Bohème, Sirène, Princesse (Essayage IA Gratuit)';
const metaDescription =
  "Robe de mariée 2026: bohémienne, sirène, princesse, décolleté V, dos nu, simple ou brodée. Essayage IA gratuit — testez n'importe quelle robe sur votre photo avant le showroom.";
const keywords = [
  'robe de mariée',
  'robe de mariée bohémienne',
  'robe de mariée bohème',
  'robe de mariée sirène',
  'robe de mariée princesse',
  'robe de mariée simple',
  'robe de mariée civil',
  'robe de mariée courte',
  'robe de mariée longue',
  'robe de mariée décolleté V',
  'robe de mariée dos nu',
  'robe de mariée 2026',
];

export const metadata: Metadata = {
  title: metaTitle, description: metaDescription, keywords,
  alternates: { canonical: url, languages: { 'fr': url, 'fr-FR': url, 'fr-BE': url, 'fr-CA': url, 'x-default': url } },
  openGraph: {
    title: metaTitle, description: metaDescription, type: 'article', url,
    siteName: 'Agalaz Fashion', locale: 'fr_FR',
    alternateLocale: ['fr_BE', 'fr_CA'],
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: 'Robe de mariée — essayage IA Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-wedding-dress-try-on.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: metaTitle, description: metaDescription, url, datePublished: '2026-05-12', dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url }, articleSection: 'Mariage · Robes', inLanguage: 'fr-FR', keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com/fr' },
          { '@type': 'ListItem', position: 2, name: 'Essayage robe mariée', item: 'https://agalaz.com/fr/essayage-robe-mariee' },
          { '@type': 'ListItem', position: 3, name: 'Robe de mariée', item: url },
        ]},
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
