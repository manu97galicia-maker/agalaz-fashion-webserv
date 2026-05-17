import type { Metadata } from 'next';
import { vestidoMadrinhaPT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/pt/vestido-madrinha-casamento';
const metaTitle = 'Vestido de Madrinha de Casamento 2026 — Provador Virtual IA';
const metaDescription =
  'Vestido de madrinha 2026: experimenta qualquer vestido no teu corpo com IA em 30 segundos. AMARO, Animale, Renner, Schutz. Grátis, sem cadastro.';
const keywords = [
    'vestido madrinha casamento',
    'vestidos madrinha casamento',
    'vestido madrinha',
    'vestido madrinha azul',
    'vestido madrinha rosa',
    'vestido madrinha verde',
    'vestido madrinha civil',
    'provador virtual madrinha',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'pt': 'https://agalaz.com/pt/vestido-madrinha-casamento', 'pt-BR': 'https://agalaz.com/pt/vestido-madrinha-casamento' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    images: [{ url: '/og/bridesmaid-dress.png', width: 1200, height: 630, alt: 'Vestido Madrinha — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/bridesmaid-dress.png'] },
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
        articleSection: 'Casamento · Madrinha',
        inLanguage: 'pt-BR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
        { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestido Madrinha', item: url },
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
