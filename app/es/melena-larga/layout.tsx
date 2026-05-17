import type { Metadata } from 'next';
import { melenaLargaES as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/es/melena-larga';
const metaTitle = 'Melena Larga — Prueba Virtual con IA Antes de las Extensiones';
const metaDescription =
  'Antes de invertir 600€ en extensiones, prueba la melena larga en tu cara con IA en 30 segundos. Distintos largos, capas y colores. Gratis.';
const keywords = [
    'melena larga',
    'melena larga mujer',
    'melena larga 2026',
    'melena larga capas',
    'melena hasta cintura',
    'extensiones de pelo',
    'probador virtual melena',
    'simulador pelo largo',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': 'https://agalaz.com/es/melena-larga', 'es-ES': 'https://agalaz.com/es/melena-larga', 'x-default': 'https://agalaz.com/es/melena-larga' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/virtual-hairstyle-try-on.png', width: 1200, height: 630, alt: 'Melena Larga — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-hairstyle-try-on.png'] },
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
        articleSection: 'Cortes · Melena',
        inLanguage: 'es-ES',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Prueba virtual', item: 'https://agalaz.com/es/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Melena Larga', item: url },
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
