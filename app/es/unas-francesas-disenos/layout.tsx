import type { Metadata } from 'next';
import { unasFrancesasDisenos as data } from '@/data/longtailLandingsRound7';

const url = 'https://agalaz.com/es/unas-francesas-disenos';
const metaTitle = 'Uñas Francesas 2026 — Diseños Francesita, Micro-French, Colorida (Probador IA Gratis)';
const metaDescription =
  'Uñas francesas, francesita, micro-french, francesa colorida 2026. 30 diseños con probador IA gratis — prueba en tu mano real en 30 segundos antes de la manicura.';
const keywords = [
  'uñas francesas',
  'uñas francesa',
  'uñas francesita',
  'uñas con francesa',
  'francesas uñas',
  'frances en uñas',
  'francesita uñas',
  'uñas francesa moderna',
  'micro french uñas',
  'francesita colorida',
  'uñas francesa pastel',
  'uñas francesa invertida',
  'francesa gel uñas',
  'manicura francesa',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': url, 'es-ES': url, 'es-MX': url, 'es-AR': url, 'es-CL': url },
  },
  openGraph: {
    title: metaTitle, description: metaDescription, type: 'article', url,
    siteName: 'Agalaz Fashion', locale: 'es_ES',
    alternateLocale: ['es_MX', 'es_AR'],
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Uñas francesas — probador IA Agalaz' }],
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
        articleSection: 'Uñas · Manicura',
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
          { '@type': 'ListItem', position: 3, name: 'Uñas francesas', item: url },
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
