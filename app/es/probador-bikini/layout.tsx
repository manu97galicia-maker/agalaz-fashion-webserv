import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('realistic-swimwear-try-on', 'es');
const enUrl = nativeLandingUrl('realistic-swimwear-try-on', 'en');

export const metadata: Metadata = {
  title: 'Bañador Mujer 2026: Bikini, Tankini, Decathlon, Shein — Probador IA Gratis',
  description: 'Bikini mujer, bañador, traje de baño Decathlon, Shein, Corte Inglés. Pruébatelo con IA en tu cuerpo antes de comprar. Bikini deportivo, tanga, malla.',
  keywords: [
    'bikini mujer',
    'bikini deportivo mujer',
    'shein bikini mujer',
    'bikini mujer decathlon',
    'bikini mujer corte ingles',
    'bikini tanga mujer',
    'bikini brasileño',
    'bañador mujer',
    'bañador moldeador',
    'traje de baño mujer',
    'malla bikini',
    'probador virtual bañadores',
    'probador bikini online',
    'bikini virtual ia',
    'simulador bañador',
    'malla virtual',
    'trikini virtual',
  ],
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'es'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
  openGraph: {
    title: 'Probador Virtual de Bañadores Realista — IA Gratis | Agalaz',
    description: 'Pruébate cualquier bañador en tu foto con IA. Realista, instantáneo y privado. Decide la talla y el corte antes de comprar.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Bikini Mujer — Probador Virtual con IA Gratis',
        description: 'Pruébate bikinis, bañadores y trajes de baño en tu cuerpo real con IA antes de comprar. Decathlon, Shein, El Corte Inglés.',
        url: pageUrl,
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: baseUrl },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        articleSection: 'Bikini · Bañadores',
        inLanguage: 'es-ES',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${baseUrl}/es` },
          { '@type': 'ListItem', position: 2, name: 'Probador bikini', item: pageUrl },
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
