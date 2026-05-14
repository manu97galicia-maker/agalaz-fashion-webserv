import type { Metadata } from 'next';
import { disfracesCaseros as data } from '@/data/longtailLandingsRound4';

const url = 'https://agalaz.com/es/disfraces-caseros';
const metaTitle = 'Disfraces Caseros — Pruébalos con IA Sin Coser Nada (Halloween + Carnaval) | Agalaz';
const metaDescription =
  'Disfraces caseros para Halloween y Carnaval — fáciles, baratos, sin coser. Visualiza el disfraz casero sobre tu cuerpo con IA antes de comprar la tela. 5 ideas en 5 minutos. Gratis.';
const keywords = [
  'disfraces caseros',
  'disfraz casero',
  'disfraces caseros halloween',
  'disfraces caseros faciles',
  'disfraz casero adulto',
  'disfraces caseros niños',
  'disfraces caseros baratos',
  'disfraz casero sin coser',
  'ideas disfraz casero',
  'disfraz casero pareja',
  'disfraz casero carnaval',
  'diy disfraz halloween',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': url, 'es-ES': url, 'es-MX': url, 'es-AR': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    alternateLocale: ['es_MX', 'es_AR'],
    images: [{ url: '/og/halloween-couples.png', width: 1200, height: 630, alt: 'Disfraces caseros — probador IA Agalaz' }],
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
        articleSection: 'DIY · Disfraces',
        inLanguage: 'es',
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
          { '@type': 'ListItem', position: 3, name: 'Disfraces caseros', item: url },
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
