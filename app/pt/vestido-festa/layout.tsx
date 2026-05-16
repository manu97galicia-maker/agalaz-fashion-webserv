import type { Metadata } from 'next';
import { vestidoFestaPT as data } from '@/data/bigVolumeLandings';

const url = 'https://agalaz.com/pt/vestido-festa';
const metaTitle = 'Vestido de Festa 2026 — Provador Virtual com IA Grátis';
const metaDescription =
  'Vestido de festa 2026: teste qualquer vestido no seu corpo com IA em 30 seg. Renner, Shein, AMARO, Animale, Pinterest. Grátis, sem cadastro.';
const keywords = [
  'vestido festa',
  'vestido pp festa',
  'vestido para festa',
  'vestido para festa de',
  'vestido festa 2026',
  'vestido festa casamento',
  'vestido festa formatura',
  'vestido festa 15 anos',
  'vestido festa midi',
  'vestido festa longo',
  'vestido festa curto',
  'vestido festa cetim',
  'vestido festa convidada',
  'vestido festa virtual',
  'provador vestido festa',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { pt: url, 'pt-BR': url, 'pt-PT': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    alternateLocale: ['pt_PT'],
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Vestido de festa provador virtual IA — Agalaz' }],
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
        articleSection: 'Vestidos · Festa',
        inLanguage: 'pt-BR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
        { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/virtual-try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestido de festa', item: url },
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
