import type { Metadata } from 'next';
import { unhasGelDecoradasPT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/pt/unhas-em-gel-decoradas';
const metaTitle = 'Unhas em Gel Decoradas 2026 — Provador Virtual com IA Grátis';
const metaDescription =
  'Unhas em gel decoradas 2026: experimenta qualquer design na tua mão real com IA em 30 segundos. Glazed donut, francesinha, chrome. Grátis.';
const keywords = [
    'unhas em gel decoradas',
    'unhas decoradas em gel',
    'unhas em gel',
    'unhas em.gel decoradas',
    'unhas decoradas',
    'unhas em gel curtas',
    'unhas em gel coloridas',
    'unhas em gel 2026',
    'provador unhas em gel',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'pt': 'https://agalaz.com/pt/unhas-em-gel-decoradas', 'pt-BR': 'https://agalaz.com/pt/unhas-em-gel-decoradas', 'x-default': 'https://agalaz.com/pt/unhas-em-gel-decoradas' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Unhas em Gel — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-nail-try-on.png'] },
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
        articleSection: 'Unhas · Gel Decoradas',
        inLanguage: 'pt-BR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
        { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Unhas em Gel', item: url },
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
