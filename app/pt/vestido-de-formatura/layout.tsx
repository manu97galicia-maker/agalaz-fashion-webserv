import type { Metadata } from 'next';
import { vestidoFormaturaPT as data } from '@/data/bigVolumeLandings';

const url = 'https://agalaz.com/pt/vestido-de-formatura';
const metaTitle = 'Vestido de Formatura 2026 — Provador Virtual IA Grátis';
const metaDescription =
  'Vestido de formatura 2026: teste qualquer vestido no seu corpo com IA em 30 segundos. Renner, Animale, AMARO, Pinterest. Grátis, sem cadastro.';
const keywords = [
  'vestido de formatura',
  'vestido formatura',
  'vestido de formatura 2026',
  'vestido formatura longo',
  'vestido formatura curto',
  'vestido formatura sereia',
  'vestido formatura princesa',
  'vestido formatura cintilante',
  'vestido formatura ensino medio',
  'vestido formatura faculdade',
  'provador vestido formatura',
  'vestido formatura virtual',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { pt: url, 'pt-BR': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'pt_BR',
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Vestido de formatura provador IA — Agalaz' }],
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
        articleSection: 'Vestidos · Formatura',
        inLanguage: 'pt-BR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agalaz.com/pt' },
        { '@type': 'ListItem', position: 2, name: 'Provador virtual', item: 'https://agalaz.com/pt/virtual-try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestido de formatura', item: url },
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
