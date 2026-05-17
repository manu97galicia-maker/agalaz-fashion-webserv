import type { Metadata } from 'next';
import { vestidoGraduacionES as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/es/vestido-graduacion';
const metaTitle = 'Vestido de Graduación 2026 — Probador Virtual con IA Gratis';
const metaDescription =
  'Vestido de graduación 2026: prueba cualquier vestido sobre tu cuerpo real con IA en 30 segundos. Zara, Mango, Bershka, Pinterest. Gratis, sin registro.';
const keywords = [
    'vestido graduacion',
    'vestidos graduacion',
    'vestido de graduacion',
    'vestidos de graduacion',
    'graduacion vestido',
    'vestido graduacion 2026',
    'vestido graduacion corto',
    'vestido graduacion largo',
    'probador virtual vestido',
    'prueba virtual vestido',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': 'https://agalaz.com/es/vestido-graduacion', 'es-ES': 'https://agalaz.com/es/vestido-graduacion' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Vestido Graduación — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/vestido-invitada-boda.png'] },
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
        articleSection: 'Vestidos · Graduación',
        inLanguage: 'es-ES',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Prueba virtual', item: 'https://agalaz.com/es/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestido Graduación', item: url },
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
