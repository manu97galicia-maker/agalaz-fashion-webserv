import type { Metadata } from 'next';
import { unhasDecoradasPT as data } from '@/data/longtailLandingsRound8';

const url = 'https://agalaz.com/pt/unhas-decoradas';
const metaTitle = 'Unhas Decoradas 2026: Em Gel, Simples, Elaboradas (Provador IA Grátis)';
const metaDescription =
  'Unhas decoradas 2026: em gel, simples, elaboradas, francesinha colorida, glazed donut, baby boomer, flores 3D. Provador IA grátis — testa o design na tua mão real em 30 seg.';
const keywords = [
  'unhas decoradas',
  'unhas decoradas em gel',
  'unhas decoradas simples',
  'unhas decoradas elaboradas',
  'unhas decoradas 2026',
  'unhas/decoradas',
  'ideias unhas decoradas',
  'francesinha colorida',
  'glazed donut unhas',
  'baby boomer unhas',
  'unhas pretas decoradas',
  'unhas bicolores',
];

export const metadata: Metadata = {
  title: metaTitle, description: metaDescription, keywords,
  alternates: { canonical: url, languages: { 'pt': url, 'pt-BR': url, 'pt-PT': url } },
  openGraph: {
    title: metaTitle, description: metaDescription, type: 'article', url,
    siteName: 'Agalaz Fashion', locale: 'pt_BR',
    alternateLocale: ['pt_PT'],
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Unhas decoradas — provador IA Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-nail-try-on.png'] },
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
        mainEntityOfPage: { '@type': 'WebPage', '@id': url }, articleSection: 'Unhas · Decoração', inLanguage: 'pt-BR', keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
          { '@type': 'ListItem', position: 2, name: 'Simulador unhas', item: 'https://agalaz.com/pt/simulador-unhas' },
          { '@type': 'ListItem', position: 3, name: 'Unhas decoradas', item: url },
        ]},
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
