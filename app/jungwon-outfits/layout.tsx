import type { Metadata } from 'next';
import { jungwonOutfitsEN as data } from '@/data/jungwonLanding';

const url = 'https://agalaz.com/jungwon-outfits';
const metaTitle = 'Jungwon Outfits — Try ENHYPEN Leader\'s Style on Yourself (Free AI)';
const metaDescription =
  'Try Jungwon\'s outfits on yourself with AI in 30 sec. Stage looks, airport fashion, Gap hoodie, Dior fittings, MAESTRO & ROMANCE:UNTOLD era. Free, no signup.';
const keywords = [
  'jungwon',
  'jungwon outfit',
  'jungwon outfits',
  'jungwon fashion',
  'jungwon style',
  'jungwon enhypen',
  'enhypen jungwon',
  'yang jungwon',
  'jungwon gap hoodie',
  'jungwon airport fashion',
  'jungwon stage outfit',
  'jungwon dior',
  'enhypen outfit',
  'enhypen outfits',
  'kpop outfit',
  'enhypen jungwon pictures',
  'jungwon mona lisa outfit',
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
    images: [{ url: '/og/virtual-cosplay-try-on.png', width: 1200, height: 630, alt: 'Jungwon outfit AI try-on — Agalaz' }],
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
        articleSection: 'K-pop · ENHYPEN · Jungwon',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
        about: {
          '@type': 'Person',
          name: 'Yang Jungwon',
          alternateName: ['Jungwon', 'ENHYPEN Jungwon', '양정원'],
          jobTitle: 'Singer, Leader of ENHYPEN',
          sameAs: [
            'https://en.wikipedia.org/wiki/Jungwon_(singer)',
            'https://www.instagram.com/won_b_/',
          ],
        },
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Jungwon Outfits', item: url },
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
