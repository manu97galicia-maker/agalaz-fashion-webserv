import type { Metadata } from 'next';
import { flequilloCortinaES as data } from '@/data/bangsLandings';

const url = 'https://agalaz.com/es/flequillo-cortina';
const metaTitle = 'Flequillo Cortina — Probador Virtual IA Antes de Cortarlo (Gratis 2026)';
const metaDescription =
  'Flequillo cortina prueba virtual con IA: mariposa, francés, see-through coreano, wispy, micro. Pruébalo en tu cara en 30 segundos antes de la peluquería. Gratis, sin registro.';
const keywords = [
  'flequillo cortina',
  'flequillo',
  'flequillo mariposa',
  'tipos de flequillo',
  'flequillo cortina desfilado',
  'flequillo cortina largo',
  'flequillo cortina corto',
  'flequillo coreano',
  'flequillo see through',
  'flequillo wispy',
  'flequillo lateral',
  'pelo rizado con flequillo',
  'probador virtual flequillo',
  'simulador flequillo',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: {
      es: url,
      'es-ES': url,
      en: 'https://agalaz.com/korean-bangs',
      pt: 'https://agalaz.com/pt/franja-cortininha',
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
    locale: 'es_ES',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Flequillo cortina prueba virtual IA — Agalaz' }],
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
        articleSection: 'Cortes · Flequillo',
        inLanguage: 'es-ES',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Prueba virtual', item: 'https://agalaz.com/es/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Flequillo cortina', item: url },
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
