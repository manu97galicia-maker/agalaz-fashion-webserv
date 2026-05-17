import type { Metadata } from 'next';
import { kpopDemonHuntersEN as data } from '@/data/kpopDemonHuntersLanding';

const url = 'https://agalaz.com/kpop-demon-hunters-outfits';
const metaTitle = 'KPop Demon Hunters Outfits — Try Rumi, Mira, Zoey, Jinu Looks (Free AI)';
const metaDescription =
  'Try KPop Demon Hunters character outfits on yourself with AI. Rumi\'s gold warrior, Mira\'s white stage, Zoey\'s black combat, Jinu\'s Saja Boys. Free, no signup.';
const keywords = [
  'kpop demon hunters outfit',
  'kpop demon hunters outfits',
  'zoey kpop demon hunters outfit',
  'kpop demon hunters zoey outfit',
  'rumi kpop demon hunters outfit',
  'rumi outfit kpop demon hunters',
  'mira kpop demon hunters outfit',
  'mira outfit kpop demon hunters',
  'jinu kpop demon hunters outfit',
  'kpop demon hunters golden outfit',
  'rumi golden outfit kpop demon hunters',
  'golden outfit kpop demon hunters',
  'kpop demon hunters white outfit',
  'rumi kpop demon hunters white outfit',
  'kpop demon hunters black outfit',
  'huntr/x outfit',
  'huntrix outfit',
  'saja boys outfit',
  'kpop demon hunters cosplay',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url, 'en-GB': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-cosplay-try-on.png', width: 1200, height: 630, alt: 'KPop Demon Hunters outfit AI try-on — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-cosplay-try-on.png'] },
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
        articleSection: 'K-pop · Cosplay · Demon Hunters',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
        about: {
          '@type': 'Movie',
          name: 'KPop Demon Hunters',
          alternateName: ['K-Pop Demon Hunters', 'KPop Demon Hunters Netflix'],
          datePublished: '2025',
          genre: ['Animation', 'Fantasy', 'Action'],
          productionCompany: { '@type': 'Organization', name: 'Sony Pictures Animation' },
          sameAs: [
            'https://en.wikipedia.org/wiki/KPop_Demon_Hunters',
            'https://www.netflix.com/title/81620939',
          ],
        },
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'KPop Demon Hunters Outfits', item: url },
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
