import type { Metadata } from 'next';
import { vestidoCoctelES as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/es/vestido-coctel';
const metaTitle = 'Vestido de Cóctel — Probador Virtual con IA Gratis 2026';
const metaDescription =
  'Vestido de cóctel 2026: prueba cualquier vestido sobre tu cuerpo con IA en 30 segundos. Zara, Mango, Massimo Dutti, Bershka. Gratis, sin registro.';
const keywords = [
    'vestido coctel',
    'vestidos coctel',
    'vestido cocktail',
    'vestidos cocktail',
    'vestido coctel mujer',
    'vestido coctel boda',
    'vestido coctel midi',
    'vestido coctel negro',
    'probador virtual cóctel',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': 'https://agalaz.com/es/vestido-coctel', 'es-ES': 'https://agalaz.com/es/vestido-coctel', 'x-default': 'https://agalaz.com/es/vestido-coctel' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Vestido Cóctel — Agalaz' }],
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
        articleSection: 'Vestidos · Cóctel',
        inLanguage: 'es-ES',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Prueba virtual', item: 'https://agalaz.com/es/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestido Cóctel', item: url },
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
