import type { Metadata } from 'next';
import { franjaCortininhaPT as data } from '@/data/bangsLandings';

const url = 'https://agalaz.com/pt/franja-cortininha';
const metaTitle = 'Franja Cortininha — Provador Virtual IA Antes do Corte (Grátis 2026)';
const metaDescription =
  'Franja cortininha provador virtual com IA: mariposa, lateral, see-through coreana, repicada. Experimenta no teu rosto em 30 segundos antes do cabeleireiro. Grátis, sem cadastro.';
const keywords = [
  'franja',
  'franja cortininha',
  'franja cortina',
  'franja lateral',
  'tipos de franja',
  'tipo de franja',
  'franja curtain bangs',
  'franja repicada',
  'franja mariposa',
  'franja coreana',
  'cabelos curtos com franja',
  'cabelo curto com franja',
  'cabelo com franja',
  'corte de cabelo com franja',
  'provador virtual franja',
  'simulador franja',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: {
      pt: url,
      'pt-BR': url,
      'pt-PT': url,
      en: 'https://agalaz.com/korean-bangs',
      es: 'https://agalaz.com/es/flequillo-cortina',
      ja: 'https://agalaz.com/ja/maegami',
      'x-default': 'https://agalaz.com/korean-bangs',
    },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Franja cortininha provador virtual IA — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/haircut-round-face.png'] },
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
        articleSection: 'Cortes · Franja',
        inLanguage: 'pt-BR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
        { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Franja cortininha', item: url },
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
