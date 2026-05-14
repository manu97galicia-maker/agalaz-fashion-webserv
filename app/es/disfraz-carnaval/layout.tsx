import type { Metadata } from 'next';
import { disfrazCarnaval as data } from '@/data/longtailLandingsRound4';

const url = 'https://agalaz.com/es/disfraz-carnaval';
const metaTitle = 'Disfraz de Carnaval 2026 — Pruébalo con IA Antes del Desfile (Cádiz, Tenerife, Las Palmas) | Agalaz';
const metaDescription =
  'Disfraz de Carnaval 2026 para Cádiz, Tenerife, Águilas, Las Palmas o Sitges. Pruébate cualquier disfraz en tu foto real con IA antes de comprar tela ni alquilarlo. Chirigotas, comparsas. Gratis.';
const keywords = [
  'disfraz carnaval',
  'disfraz de carnaval',
  'disfraces carnaval',
  'disfraces de carnaval',
  'disfraces carnavaleros',
  'disfraz chirigota',
  'disfraz comparsa carnaval',
  'disfraz carnaval cadiz',
  'disfraz carnaval tenerife',
  'disfraz carnaval las palmas',
  'disfraz carnaval pareja',
  'disfraz carnaval grupo',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': url, 'es-ES': url, 'es-MX': url, 'es-AR': url, 'es-CO': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    alternateLocale: ['es_MX', 'es_AR'],
    images: [{ url: '/og/halloween-couples.png', width: 1200, height: 630, alt: 'Disfraz de Carnaval — probador IA Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/halloween-couples.png'],
  },
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
        datePublished: '2026-05-11',
        dateModified: '2026-05-11',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Carnaval · Disfraces',
        inLanguage: 'es-ES',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
          { '@type': 'ListItem', position: 2, name: 'Probador disfraces', item: 'https://agalaz.com/es/probador-disfraces' },
          { '@type': 'ListItem', position: 3, name: 'Disfraz Carnaval', item: url },
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
