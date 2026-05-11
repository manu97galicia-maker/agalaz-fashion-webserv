import type { Metadata } from 'next';
import { cosplayEsLanding as data } from '@/data/longtailLandingsRound4';

const url = 'https://agalaz.com/es/cosplay';
const metaTitle = 'Cosplay — Pruébalo en Tu Cuerpo con IA Antes de Gastar | Agalaz';
const metaDescription =
  'Cosplay de anime, videojuegos, Marvel, Star Wars u OC. Visualiza el cosplay (peluca, traje, props) sobre tu cuerpo real con IA antes de invertir en peluca y armadura. La Mole, Comic-Con. Gratis.';
const keywords = [
  'cosplay',
  'cosplay anime',
  'cosplay barato',
  'cosplay mexicano',
  'cosplay genshin',
  'cosplay demon slayer',
  'cosplay marvel',
  'cosplay pareja',
  'cosplay original',
  'tienda cosplay',
  'cosplay la mole',
  'cosplay comic con',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: {
      'es': url,
      'es-MX': url,
      'es-ES': url,
      'es-AR': url,
      'es-CL': url,
    },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_MX',
    alternateLocale: ['es_ES', 'es_AR'],
    images: [{ url: '/og/virtual-cosplay-try-on.png', width: 1200, height: 630, alt: 'Cosplay AI — probador virtual Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/virtual-cosplay-try-on.png'],
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
        articleSection: 'Cosplay · Anime',
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
          { '@type': 'ListItem', position: 2, name: 'Probador cosplay', item: 'https://agalaz.com/es/probador-cosplay' },
          { '@type': 'ListItem', position: 3, name: 'Cosplay', item: url },
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
