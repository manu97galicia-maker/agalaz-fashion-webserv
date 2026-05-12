import type { Metadata } from 'next';
import { unasGelDisenos as data } from '@/data/longtailLandingsRound7';

const url = 'https://agalaz.com/es/unas-de-gel-disenos';
const metaTitle = 'Uñas de Gel: Diseños 2026 — Semipermanentes, Gelish, Decoradas (Probador IA Gratis)';
const metaDescription =
  'Uñas de gel, semipermanentes y gelish — 30 diseños que duran 3-4 semanas. Probador IA gratis: pruébalos en tu mano antes de la sesión. Decoradas, francesitas, glazed.';
const keywords = [
  'uñas de gel',
  'uñas de gel diseños',
  'de uñas de gel',
  'uñas de gel decoradas',
  'uñas decoradas en gel',
  'uñas de gelatina',
  'uñas semipermanente',
  'uñas semipermanentes',
  'uñas semi permanente',
  'uñas con semipermanente',
  'unas gelish',
  'gelish uñas',
  'uñas gel cortas',
  'manicura gel',
];

export const metadata: Metadata = {
  title: metaTitle, description: metaDescription, keywords,
  alternates: { canonical: url, languages: { 'es': url, 'es-ES': url, 'es-MX': url } },
  openGraph: {
    title: metaTitle, description: metaDescription, type: 'article', url,
    siteName: 'Agalaz Fashion', locale: 'es_ES',
    alternateLocale: ['es_MX', 'es_AR'],
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Uñas de gel diseños — probador IA Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-nail-try-on.png'] },
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
        articleSection: 'Uñas · Gel y Semipermanente',
        inLanguage: 'es',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
          { '@type': 'ListItem', position: 2, name: 'Probador uñas', item: 'https://agalaz.com/es/probador-unas' },
          { '@type': 'ListItem', position: 3, name: 'Uñas de gel', item: url },
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
