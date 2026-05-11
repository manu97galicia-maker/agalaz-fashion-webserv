import type { Metadata } from 'next';
import { VESTIDO_INVITADA_FAQ as FAQ_DATA } from '@/data/vestidoInvitadaBoda';

const url = 'https://agalaz.com/es/vestido-invitada-boda';

export const metadata: Metadata = {
  title: 'Vestido Invitada Boda Verano 2026 — Zara, Mango + Probador IA',
  description:
    'Vestido para invitada de boda de verano, primavera, otoño e invierno — incluye picks de Zara y Mango. Pruébalos en tu foto con IA. Gratis, primer render sin tarjeta.',
  keywords: [
    // Primary cluster from DataForSEO scan: 5 variants ALL at 165,000/mo, KD 0
    'vestido boda invitada',
    'vestido invitada boda',
    'vestido invitada a boda',
    'invitada boda vestido',
    'boda vestido invitada',
    'vestidos invitada boda',
    'vestidos boda invitada',
    'vestido para invitada de boda',
    // Variants
    'vestido invitada boda otoño',
    'vestido invitada boda verano',
    'vestido invitada boda primavera',
    'vestido invitada boda invierno',
    'vestido coctel boda',
    'vestido invitada playa',
    'vestido fiesta boda',
    'vestido madrina',
    'que ponerse en una boda',
    'que ponerse en una boda invitada',
    'vestido invitada boda zara',
    'vestido invitada boda mango',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Vestido Invitada Boda Verano 2026 — Zara, Mango + Probador IA',
    description: 'Vestido invitada boda verano, primavera, otoño — Zara, Mango + probador virtual. Pruébatelo antes de comprar. Gratis, 30 seg.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Vestido invitada boda — probador virtual con IA Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vestido Invitada Boda Verano — Zara, Mango + Probador IA',
    description: 'Verano, primavera, Zara, Mango + probador virtual. Gratis.',
    images: ['/og/vestido-invitada-boda.png'],
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
        headline: 'Vestido Invitada Boda Verano 2026 — Zara, Mango + Probador IA',
        description: 'Guía de vestidos para invitada de boda — verano, primavera, otoño, invierno — con picks de Zara y Mango + probador virtual IA.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Boda · Moda',
        inLanguage: 'es-ES',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Probador virtual', item: 'https://agalaz.com/es/try-on' },
          { '@type': 'ListItem', position: 3, name: 'Vestido invitada boda', item: url },
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
