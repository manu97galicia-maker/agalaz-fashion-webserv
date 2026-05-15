import type { Metadata } from 'next';
import { provadorVirtualZaraPT as data } from '@/data/brandLandings';

const url = 'https://agalaz.com/pt/provador-virtual-zara';
const metaTitle = 'Provador Virtual Zara 2026 — Prova Vestidos, Casacos, Calças com IA';
const metaDescription =
  'Provador virtual Zara: prova qualquer peça (vestidos, casacos, calças, blazers) no teu corpo com IA antes de encomendar. Grátis, sem registo, 30 seg.';
const keywords = [
  'provador virtual zara',
  'zara provador virtual',
  'provador zara virtual',
  'zara provador online',
  'provador virtual',
  'experimentar zara online',
  'zara online provador',
  'provador roupa zara',
  'provador zara online',
  'provador roupa virtual zara',
  'zara try on',
  'zara experimentar virtualmente',
  'zara provar roupa online',
  'zara probador virtual',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'pt': url, 'pt-BR': url, 'pt-PT': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    alternateLocale: ['pt_PT'],
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Provador virtual Zara — Agalaz IA' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/default.png'] },
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
        datePublished: '2026-05-15',
        dateModified: '2026-05-15',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Moda · Provador',
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
          { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/virtual-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Provador virtual Zara', item: url },
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
