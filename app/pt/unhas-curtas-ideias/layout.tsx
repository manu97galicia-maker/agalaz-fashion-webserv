import type { Metadata } from 'next';
import { unhasCurtasIdeias as data } from '@/data/longtailLandings2026';

const url = 'https://agalaz.com/pt/unhas-curtas-ideias';
const metaTitle = 'Ideias de Unhas Curtas Decoradas e Simples — Provador IA Grátis | Agalaz';
const metaDescription =
  'Ideias de unhas curtas decoradas, simples ou minimalistas — francesinha, glazed donut, milky white, coquette. Teste 8 designs na sua mão real com IA em 30 segundos. Grátis.';
const keywords = [
  'ideias de unhas curtas',
  'ideias de unhas curtas decoradas',
  'ideias de unhas simples curtas',
  'ideias de unhas curtas simples',
  'unhas curtas decoradas',
  'unhas curtas simples',
  'unhas curtas elegantes',
  'unhas curtas francesinha',
  'unhas curtas coquette',
  'milky white nails curtas',
  'glazed donut nails curtas',
  'unhas curtas amêndoa',
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
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Ideias de unhas curtas — provador IA Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/virtual-nail-try-on.png'],
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
        articleSection: 'Unhas · Beleza',
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
          { '@type': 'ListItem', position: 2, name: 'Simulador de unhas', item: 'https://agalaz.com/pt/simulador-unhas' },
          { '@type': 'ListItem', position: 3, name: 'Ideias de unhas curtas', item: url },
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
