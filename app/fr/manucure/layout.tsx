import type { Metadata } from 'next';
import { manucureFR as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/fr/manucure';
const metaTitle = 'Manucure 2026 — Essayage Virtuel IA sur Votre Main Gratuit';
const metaDescription =
  'Manucure 2026 : essayez n\'importe quel design sur votre main réelle avec IA en 30 sec. Glazed donut, french laiteuse, chrome cerise. Gratuit.';
const keywords = [
    'manucure',
    'manucure 2026',
    'manucure simple',
    'manucure française',
    'glazed donut nails',
    'manucure chrome',
    'manucure pinterest',
    'essayage manucure virtuel',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'fr': 'https://agalaz.com/fr/manucure', 'fr-FR': 'https://agalaz.com/fr/manucure', 'x-default': 'https://agalaz.com/fr/manucure' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Manucure — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-nail-try-on.png'] },
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
        articleSection: 'Ongles · Manucure',
        inLanguage: 'fr-FR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com/fr' },
        { '@type': 'ListItem', position: 2, name: 'Essayage virtuel', item: 'https://agalaz.com/fr/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Manucure', item: url },
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
