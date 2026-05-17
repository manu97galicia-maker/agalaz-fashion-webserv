import type { Metadata } from 'next';
import { vestidoComunionES as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/es/vestido-comunion';
const metaTitle = 'Vestido de Comunión 2026 — Probador Virtual IA Gratis';
const metaDescription =
  'Vestido de comunión 2026: descubre cómo le queda a tu hija con IA en 30 segundos. Mibebesito, El Corte Inglés, Pinterest. Gratis, sin registro.';
const keywords = [
    'vestido comunion',
    'vestidos comunion',
    'vestido de comunion',
    'vestidos de comunion',
    'vestido comunion 2026',
    'vestido comunion princesa',
    'vestido comunion bohemio',
    'probador vestido comunion',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': 'https://agalaz.com/es/vestido-comunion', 'es-ES': 'https://agalaz.com/es/vestido-comunion', 'x-default': 'https://agalaz.com/es/vestido-comunion' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/vestito-comunione.png', width: 1200, height: 630, alt: 'Vestido Comunión — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/vestito-comunione.png'] },
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
        articleSection: 'Vestidos · Comunión',
        inLanguage: 'es-ES',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Prueba virtual', item: 'https://agalaz.com/es/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestido Comunión', item: url },
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
