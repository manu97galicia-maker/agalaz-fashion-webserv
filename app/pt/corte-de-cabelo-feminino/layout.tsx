import type { Metadata } from 'next';
import { corteCabeloFemininoPT as data } from '@/data/longtailLandingsRound8';

const url = 'https://agalaz.com/pt/corte-de-cabelo-feminino';
const metaTitle = 'Corte de Cabelo Feminino 2026: Curto, Cacheado, Liso, Médio (Provador IA Grátis)';
const metaDescription =
  'Corte de cabelo feminino 2026: curto, cacheado, liso, médio, longo, chanel, long bob, wolf cut, franja. Cortes para afinar rosto redondo. Testa no teu rosto com IA em 30 seg.';
const keywords = [
  'corte de cabelo feminino',
  'corte feminino de cabelo',
  'corte de cabelo curtíssimo feminino',
  'corte de cabelo curto feminino',
  'corte de cabelo médio feminino',
  'corte de cabelo longo feminino',
  'corte de cabelo feminino cacheado',
  'corte de cabelo cacheado feminino',
  'corte de cabelo feminino curto cacheado',
  'corte de cabelo curto cacheado feminino',
  'corte de cabelo feminino curto liso',
  'corte de cabelo liso feminino curto',
  'corte de cabelo feminino 2025',
  'corte de cabelo feminino 2026',
  'corte de cabelo para afinar o rosto redondo feminino',
  'corte chanel feminino',
  'long bob',
  'wolf cut feminino',
  'curtain bangs',
  'corte de cabelo feminino com franja',
  'corte de cabelo feminino em camadas',
];

export const metadata: Metadata = {
  title: metaTitle, description: metaDescription, keywords,
  alternates: { canonical: url, languages: { 'pt': url, 'pt-BR': url, 'pt-PT': url, 'x-default': url } },
  openGraph: {
    title: metaTitle, description: metaDescription, type: 'article', url,
    siteName: 'Agalaz Fashion', locale: 'pt_BR',
    alternateLocale: ['pt_PT'],
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Corte de cabelo feminino — provador IA Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/haircut-round-face.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'beauty',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: metaTitle, description: metaDescription, url, datePublished: '2026-05-12', dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url }, articleSection: 'Cabelo · Cortes', inLanguage: 'pt-BR', keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
          { '@type': 'ListItem', position: 2, name: 'Provador penteados', item: 'https://agalaz.com/pt/provador-penteados' },
          { '@type': 'ListItem', position: 3, name: 'Corte de cabelo feminino', item: url },
        ]},
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
