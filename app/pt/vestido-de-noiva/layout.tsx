import type { Metadata } from 'next';
import { vestidoDeNoivaPT as data } from '@/data/longtailLandingsRound8';

const url = 'https://agalaz.com/pt/vestido-de-noiva';
const metaTitle = 'Vestido de Noiva 2026: Civil, Princesa, Sereia, Aluguel, Mãe da Noiva (Provador IA)';
const metaDescription =
  'Vestido de noiva 2026: civil, princesa, sereia, simples elegante, minimalista, aluguel, vestido para mãe da noiva. Testa qualquer vestido na tua foto com IA em 30 seg.';
const keywords = [
  'vestido de noiva',
  'vestido noiva',
  'vestido de noiva civil',
  'vestido de noiva do civil',
  'vestido de noiva de civil',
  'vestido de noiva princesa',
  'vestido princesa de noiva',
  'vestido de princesa de noiva',
  'vestido de noiva sereia',
  'vestido de noiva simples',
  'vestido simples de noiva',
  'vestido de noiva simples mas elegante',
  'vestido de noiva elegante e simples',
  'vestido de noiva minimalista',
  'aluguel de vestido de noiva',
  'aluguel vestido de noiva',
  'aluguel de um vestido de noiva',
  'vestido para mãe de noiva',
  'vestido mãe de noiva',
  'mãe de noiva vestido',
  'vestido de mãe da noiva',
  'vestido de noiva longo',
  'vestido de noiva curto',
  'vestido de noiva online',
  'vestido noiva 2026',
];

export const metadata: Metadata = {
  title: metaTitle, description: metaDescription, keywords,
  alternates: { canonical: url, languages: { 'pt': url, 'pt-BR': url, 'pt-PT': url, 'x-default': url } },
  openGraph: {
    title: metaTitle, description: metaDescription, type: 'article', url,
    siteName: 'Agalaz Fashion', locale: 'pt_BR',
    alternateLocale: ['pt_PT'],
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: 'Vestido de noiva — provador IA Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-wedding-dress-try-on.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: metaTitle, description: metaDescription, url, datePublished: '2026-05-12', dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url }, articleSection: 'Casamento · Vestidos', inLanguage: 'pt-BR', keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
          { '@type': 'ListItem', position: 2, name: 'Provador vestido', item: 'https://agalaz.com/pt/provador-vestido-noiva' },
          { '@type': 'ListItem', position: 3, name: 'Vestido de noiva', item: url },
        ]},
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
