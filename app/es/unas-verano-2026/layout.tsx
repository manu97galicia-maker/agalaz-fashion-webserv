import type { Metadata } from 'next';
import { unasVerano2026 as data } from '@/data/longtailLandingsRound7';

const url = 'https://agalaz.com/es/unas-verano-2026';
const metaTitle = 'Uñas Verano 2026 — Tendencias, Coral, Glazed, Milky White (Probador IA Gratis)';
const metaDescription =
  'Uñas verano 2026: tendencias, coral, glazed donut, milky white, francesita colorida, frutas. 40 diseños con probador IA gratis — pruébalos en tu mano real en 30 seg.';
const keywords = [
  'uñas verano 2026',
  'uñas verano',
  'uñas verano 2025',
  'uñas en verano',
  'tendencia uñas verano',
  'uñas primavera 2026',
  'uñas primaverales 2025',
  'uñas primavera 2025',
  'unas verano',
  'unas verano 2026',
  'uñas coral verano',
  'uñas glazed donut',
  'uñas milky white',
];

export const metadata: Metadata = {
  title: metaTitle, description: metaDescription, keywords,
  alternates: { canonical: url, languages: { 'es': url, 'es-ES': url, 'es-MX': url, 'es-AR': url } },
  openGraph: {
    title: metaTitle, description: metaDescription, type: 'article', url,
    siteName: 'Agalaz Fashion', locale: 'es_ES',
    alternateLocale: ['es_MX', 'es_AR'],
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Uñas verano 2026 — probador IA Agalaz' }],
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
        articleSection: 'Uñas · Tendencias verano',
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
          { '@type': 'ListItem', position: 3, name: 'Uñas verano 2026', item: url },
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
