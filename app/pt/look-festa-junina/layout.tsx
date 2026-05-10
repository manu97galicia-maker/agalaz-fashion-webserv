import type { Metadata } from 'next';
import { FESTA_JUNINA_FAQ as FAQ_DATA } from '@/data/festaJunina';

const url = 'https://agalaz.com/pt/look-festa-junina';

export const metadata: Metadata = {
  title: 'Look Festa Junina 2026 — 7 Ideias + Provador IA',
  description:
    'Look para festa junina: 7 ideias prontas, do caipira clássico ao chique. Teste vestido de chita, camisa xadrez e looks completos na sua foto com IA. Grátis.',
  keywords: [
    // Top 2 keywords from DataForSEO scan, 27.100/mo each, KD 0
    'look festa junina',
    'look para festa junina',
    'look festa junina chique',
    'look festa junina elegante',
    'look festa junina feminino',
    'look festa junina masculino',
    'look festa junina infantil',
    'look festa junina moderno',
    'look festa junina simples',
    'look festa junina chique e moderno',
    'roupa festa junina',
    'roupa para festa junina',
    'vestido festa junina',
    'vestido de chita',
    'camisa xadrez festa junina',
    'roupa caipira',
    'roupa caipira chique',
    'maquiagem festa junina',
    'penteado festa junina',
    'arraial roupa',
    'são joão roupa',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Look Festa Junina 2026 — 7 Ideias + Provador Virtual',
    description:
      '7 looks juninos prontos: caipira clássico, chique, street style, infantil. Teste qualquer roupa na sua foto com IA — 30 segundos grátis.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Look festa junina 2026 — provador virtual com IA da Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Look Festa Junina 2026 — Teste com IA',
    description: '7 looks juninos prontos. Suba sua foto e veja como fica em VOCÊ em 30 segundos. Grátis.',
    images: ['/og/realistic-swimwear-try-on.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Look Festa Junina 2026 — 7 Ideias + Provador IA',
        description:
          'Guia completo de looks para festa junina com 7 combinações prontas e provador virtual com IA.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Moda · Festas',
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/try-on' },
          { '@type': 'ListItem', position: 3, name: 'Look festa junina', item: url },
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
