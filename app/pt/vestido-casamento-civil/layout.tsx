import type { Metadata } from 'next';
import { vestidoCasamentoCivilPT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/pt/vestido-casamento-civil';
const metaTitle = 'Vestido Casamento Civil 2026 — Provador Virtual IA Grátis';
const metaDescription =
  'Vestido casamento civil 2026: experimenta o vestido no teu corpo com IA em 30 segundos. AMARO, Renner, Animale. Grátis, sem cadastro.';
const keywords = [
    'vestido casamento civil',
    'vestido para casamento civil',
    'vestido de casamento civil',
    'vestido casamento civil curto',
    'vestido casamento civil branco',
    'vestido casamento dia',
    'provador casamento civil',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'pt': 'https://agalaz.com/pt/vestido-casamento-civil', 'pt-BR': 'https://agalaz.com/pt/vestido-casamento-civil', 'x-default': 'https://agalaz.com/pt/vestido-casamento-civil' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    images: [{ url: '/og/wedding-guest-outfit.png', width: 1200, height: 630, alt: 'Casamento Civil — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/wedding-guest-outfit.png'] },
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
        articleSection: 'Casamento · Civil',
        inLanguage: 'pt-BR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
        { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Casamento Civil', item: url },
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
