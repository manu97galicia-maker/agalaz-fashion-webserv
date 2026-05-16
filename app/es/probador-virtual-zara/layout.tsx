import type { Metadata } from 'next';
import { probadorVirtualZaraES as data } from '@/data/brandLandings';

const url = 'https://agalaz.com/es/probador-virtual-zara';
const metaTitle = 'Probador Virtual Zara 2026 — Pruébate Cualquier Prenda con IA';
const metaDescription =
  'Probador virtual Zara: prueba cualquier prenda (vestidos, blazers, pantalones, abrigos) en tu cuerpo con IA antes de pedir. Gratis, sin registro, 30 seg.';
const keywords = [
  'probador virtual zara',
  'zara probador virtual',
  'probador zara virtual',
  'zara probador online',
  'probador virtual',
  'probarse zara online',
  'probador ropa zara',
  'probador zara online',
  'probarse ropa zara virtual',
  'zara try on',
  'zara probar prenda online',
  'probador virtual de ropa zara',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: {
      es: url,
      'es-ES': url,
      'es-MX': url,
      pt: 'https://agalaz.com/pt/provador-virtual-zara',
      'x-default': url,
    },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    alternateLocale: ['es_MX', 'es_AR'],
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Probador virtual Zara — Agalaz IA' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/default.png'] },
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
        datePublished: '2026-05-16',
        dateModified: '2026-05-16',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Moda · Probador',
        inLanguage: 'es-ES',
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
          { '@type': 'ListItem', position: 2, name: 'Probador virtual', item: 'https://agalaz.com/es/virtual-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Probador virtual Zara', item: url },
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
