import type { Metadata } from 'next';
import { unghieCorteSemplici as data } from '@/data/longtailLandings2026';

const url = 'https://agalaz.com/it/unghie-corte-semplici';
const metaTitle = 'Unghie Corte Semplici ma Belle — Prova IA Gratis 2026 | Agalaz';
const metaDescription =
  'Unghie corte semplici ma belle — francese, milky white, glazed donut, mandorla, coquette. Prova 8 design sulla tua mano vera con IA in 30 secondi. Gratis.';
const keywords = [
  'unghie corte',
  'unghie semplici corte',
  'unghie semplici ma belle corte',
  'forma unghie corte',
  'forme unghie corte',
  'unghie corte estate 2025',
  'unghie corte estate 2026',
  'unghie corte autunno',
  'unghie corte autunno 2025',
  'unghie corte mandorla',
  'unghie corte francese',
  'unghie corte milky white',
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
    locale: 'it_IT',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Unghie corte semplici — prova IA Agalaz' }],
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
        articleSection: 'Unghie · Bellezza',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
          { '@type': 'ListItem', position: 2, name: 'Simulatore unghie', item: 'https://agalaz.com/it/simulatore-unghie' },
          { '@type': 'ListItem', position: 3, name: 'Unghie corte semplici', item: url },
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
