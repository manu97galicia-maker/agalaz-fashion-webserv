import type { Metadata } from 'next';
import { VESTITO_COMUNIONE_FAQ as FAQ_DATA } from '@/data/vestitoComunione';

const url = 'https://agalaz.com/it/vestito-comunione';

export const metadata: Metadata = {
  title: 'Vestito Comunione 2026 — Bambina, Bambino + Prova IA',
  description:
    'Vestito da comunione: 7 modelli per bambina e bambino + tenuta mamma. Prova ogni abito sulla foto reale con IA. Gratis, primo render senza carta.',
  keywords: [
    // High-volume cluster from DataForSEO scan (6.6K each, KD 0)
    'vestito comunione',
    'vestito da comunione',
    'vestito per la comunione',
    'vestito per comunione',
    'vestito comunione bambina',
    'vestito da comunione bambina',
    'vestito per comunione bambina',
    'vestito per la comunione bambina',
    'vestito bambina comunione',
    'comunione vestito bambina',
    'comunione vestito',
    'abito comunione bambina',
    'vestiti comunione bambina',
    'vestito comunione bambino',
    'vestiti prima comunione',
    'tailleur mamma comunione',
    'vestito mamma comunione',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Vestito Comunione 2026 — 7 Modelli + Prova Virtuale IA',
    description: '7 vestiti da comunione (bambina, bambino, mamma) + prova ogni abito sulla foto reale con IA in 30 secondi. Gratis.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: 'Vestito comunione — prova virtuale Agalaz IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vestito Comunione 2026 — Prova IA',
    description: '7 modelli + prova virtuale sulla foto reale. Gratis, 30 sec.',
    images: ['/og/virtual-wedding-dress-try-on.png'],
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
        headline: 'Vestito Comunione 2026 — 7 Modelli + Prova IA',
        description: 'Guida completa di vestiti per la prima comunione con 7 modelli pronti e prova virtuale IA.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Moda · Cerimonia',
        inLanguage: 'it-IT',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Camerino virtuale', item: 'https://agalaz.com/it/try-on' },
          { '@type': 'ListItem', position: 3, name: 'Vestito comunione', item: url },
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
