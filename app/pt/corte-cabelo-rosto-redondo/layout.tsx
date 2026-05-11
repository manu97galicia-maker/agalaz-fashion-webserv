import type { Metadata } from 'next';
import { corteCabeloRostoRedondo as data } from '@/data/longtailLandings2026';

const url = 'https://agalaz.com/pt/corte-cabelo-rosto-redondo';
const metaTitle = 'Corte de Cabelo para Rosto Redondo — Provador IA Grátis 2026 | Agalaz';
const metaDescription =
  'Corte de cabelo para rosto redondo — chanel longo, médio, franja lateral, pixie ou com papada. Experimente 8 cortes na sua foto com IA em 30 segundos. Grátis.';
const keywords = [
  'corte de cabelo para rosto redondo',
  'corte de cabelo rosto redondo',
  'melhor corte de cabelo para rosto redondo',
  'corte de cabelo médio rosto redondo',
  'corte de cabelo médio para rosto redondo',
  'corte de cabelo para rosto gordo com papada',
  'corte de cabelo para rosto diamante',
  'corte de cabelo para rosto oval',
  'rosto oval corte de cabelo',
  'melhor corte de cabelo para rosto oval',
  'chanel longo rosto redondo',
  'franja lateral rosto redondo',
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
    locale: 'pt_BR',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Corte de cabelo para rosto redondo — provador IA Agalaz' }],
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
        articleSection: 'Cabelo · Beleza',
        inLanguage: 'pt-BR',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
          { '@type': 'ListItem', position: 2, name: 'Provador de penteados', item: 'https://agalaz.com/pt/provador-penteados' },
          { '@type': 'ListItem', position: 3, name: 'Corte para rosto redondo', item: url },
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
