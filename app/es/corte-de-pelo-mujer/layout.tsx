import type { Metadata } from 'next';
import { cortePeloMujerES as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/es/corte-de-pelo-mujer';
const metaTitle = 'Corte de Pelo Mujer 2026 — Probador Virtual con IA Gratis';
const metaDescription =
  'Corte de pelo mujer 2026: prueba bob, pixie, long bob y wolf cut en tu cara con IA en 30 segundos. Gratis, sin registro.';
const keywords = [
    'corte de pelo mujer',
    'cortes de pelo mujer',
    'corte de pelo mujer 2026',
    'corte de pelo mujer 2025',
    'corte pelo mujer',
    'cortes de pelo mujer 2026',
    'bob italiano',
    'pixie corto',
    'probador virtual corte pelo',
    'simulador de cortes',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': 'https://agalaz.com/es/corte-de-pelo-mujer', 'es-ES': 'https://agalaz.com/es/corte-de-pelo-mujer', 'x-default': 'https://agalaz.com/es/corte-de-pelo-mujer' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/virtual-hairstyle-try-on.png', width: 1200, height: 630, alt: 'Corte Pelo Mujer — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-hairstyle-try-on.png'] },
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
        articleSection: 'Cortes · Mujer',
        inLanguage: 'es-ES',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Prueba virtual', item: 'https://agalaz.com/es/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Corte Pelo Mujer', item: url },
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
