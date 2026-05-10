import type { Metadata } from 'next';
import { WEDDING_GUEST_FAQ as FAQ_DATA } from '@/data/weddingGuestOutfit';

const url = 'https://agalaz.com/wedding-guest-outfit';

export const metadata: Metadata = {
  title: 'Wedding Guest Outfit 2026 — Try It On You with AI',
  description:
    'Wedding guest outfit ideas for spring, summer, fall, winter + black-tie + beach. Try any dress on YOUR body with AI in 30 seconds. Free first render.',
  keywords: [
    // Top cluster from DataForSEO scan: 7 variants ALL at 301,000/mo, KD 0
    'wedding guest outfit',
    'wedding guest outfits',
    'guest outfit for wedding',
    'guest outfit for a wedding',
    'wedding outfit for guest',
    'wedding outfit for a guest',
    'outfit for a wedding guest',
    'outfit for wedding guest',
    'wedding outfit guest',
    'outfit for guest at wedding',
    // Seasonal subclusters
    'wedding guest fall outfit',
    'wedding guest spring outfit',
    'wedding guest summer outfit',
    'wedding guest winter outfit',
    'fall wedding guest outfit',
    'summer wedding guest outfit',
    'spring wedding guest outfit',
    'winter wedding guest outfit',
    // Specific
    'beach wedding guest outfit',
    'black tie wedding guest outfit',
    'casual wedding guest outfit',
    'wedding guest outfit men',
    'wedding guest outfit ideas',
    'wedding guest dress',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Wedding Guest Outfit 2026 — Try Any Dress on You with AI',
    description: '8 wedding guest outfits + AI virtual try-on. Spring, summer, fall, winter, black-tie, beach. See it on YOU before paying. Free, 30 sec.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/wedding-guest-outfit.png', width: 1200, height: 630, alt: 'Wedding guest outfit AI try-on — Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Guest Outfit AI Try-On',
    description: '8 outfit ideas + AI try-on. See it on YOU. Free, 30 sec.',
    images: ['/og/wedding-guest-outfit.png'],
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
        headline: 'Wedding Guest Outfit 2026 — Try It On You with AI',
        description: '8 wedding guest outfit ideas by season and dress code with AI virtual try-on.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Wedding Guest · Fashion',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Wedding', item: 'https://agalaz.com/virtual-wedding-dress-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Wedding guest outfit', item: url },
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
