import type { Metadata } from 'next';
import { HALLOWEEN_COUPLES_FAQ as FAQ_DATA } from '@/data/halloweenCouples';

const url = 'https://agalaz.com/halloween-couples-costumes';

export const metadata: Metadata = {
  title: 'Couples Halloween Costumes 2026 — Funny, Easy, Scary Ideas + AI',
  description:
    'Couples halloween costumes 2026: funny, easy, scary and last-minute ideas — Barbie & Ken, Wednesday, Mario & Peach, Bonnie & Clyde. Try them on you and your partner with AI. Free.',
  keywords: [
    // Primary cluster from DataForSEO scan (110K/mo each, KD 2)
    'couples halloween costume',
    'couples halloween costumes',
    'couple halloween costume',
    'partner halloween costume',
    'costume halloween couple',
    'costume halloween couples',
    'costume for halloween couple',
    'costume for halloween couples',
    'halloween costume for a couple',
    'halloween costume for couples',
    'halloween costume couples',
    // Specific
    'barbie ken couple costume',
    'wednesday addams couple costume',
    'mario peach costume',
    'pulp fiction costume',
    'grease couple costume',
    'salt and pepper couples costume',
    // Adjacent
    'easy couples costume',
    'last minute couples costume',
    'sexy couples costume',
    'funny couples costume',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Couples Halloween Costumes 2026 — Funny, Easy, Scary Ideas',
    description: 'Funny, easy, scary couples halloween costume ideas + AI virtual try-on. See it on YOU and your partner before paying. Free, 30 sec.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/halloween-couples.png', width: 1200, height: 630, alt: 'Couples halloween costumes AI try-on — Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Couples Halloween Costume AI Try-On',
    description: 'See couples costumes on YOU and your partner. 8 ideas + AI try-on. Free.',
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
        headline: 'Couples Halloween Costumes 2026 — Funny, Easy, Scary Ideas + AI',
        description: 'Funny, easy, scary and last-minute couples halloween costume ideas with AI virtual try-on for both partners.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Halloween · Costumes',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Costumes', item: 'https://agalaz.com/virtual-costume-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Couples halloween costumes', item: url },
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
