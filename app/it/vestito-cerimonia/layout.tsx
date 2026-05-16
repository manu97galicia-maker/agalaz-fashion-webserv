import type { Metadata } from 'next';
import { vestitoCerimoniaIT as data } from '@/data/bigVolumeLandings';

const url = 'https://agalaz.com/it/vestito-cerimonia';
const metaTitle = 'Vestito da Cerimonia 2026 — Prova Virtuale con IA Gratis';
const metaDescription =
  'Vestito da cerimonia 2026: prova qualsiasi vestito sul tuo corpo con IA in 30 sec. Zara, Mango, Maliparmi, Twin-Set, Pinterest. Gratis, senza registrazione.';
const keywords = [
  'vestito cerimonia',
  'vestiti cerimonia',
  'vestito da cerimonia',
  'vestiti da cerimonia',
  'vestito invitata matrimonio',
  'vestiti invitata matrimonio',
  'vestito matrimonio invitata',
  'vestito cerimonia 2026',
  'vestito cerimonia lungo',
  'vestito cerimonia corto',
  'vestito cerimonia battesimo',
  'vestito cerimonia comunione',
  'prova virtuale vestito cerimonia',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { it: url, 'it-IT': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Vestito cerimonia prova virtuale IA — Agalaz' }],
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
        articleSection: 'Vestiti · Cerimonia',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
        { '@type': 'ListItem', position: 2, name: 'Prova virtuale', item: 'https://agalaz.com/it/virtual-try-on' },
        { '@type': 'ListItem', position: 3, name: 'Vestito cerimonia', item: url },
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
