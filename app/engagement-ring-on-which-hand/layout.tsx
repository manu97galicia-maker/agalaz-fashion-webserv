import type { Metadata } from 'next';
import { ENGAGEMENT_RING_FAQ as FAQ_DATA } from '@/data/engagementRingHand';

const url = 'https://agalaz.com/engagement-ring-on-which-hand';

export const metadata: Metadata = {
  title: 'What Hand Does the Engagement Ring Go On? + AI Try-On',
  description:
    'Engagement ring on which hand? Left in the US/UK, right in Spain/Latin America/Russia/India. Full guide by country + try any ring on YOUR hand with AI. Free.',
  keywords: [
    // Primary high-volume cluster (8.1K/mo each, KD 0-1)
    'what hand does the engagement ring go on',
    'what hand does engagement ring go on',
    'what hand does an engagement ring go on',
    'what hand engagement ring goes on',
    'engagement ring on which hand',
    'which hand engagement ring',
    'engagement ring to be worn on which hand',
    'which finger engagement ring',
    'engagement ring finger',
    'ring finger left or right',
    // Try-on intent
    'engagement ring on hand simulator',
    'engagement ring on my hand',
    'see engagement ring on hand',
    'try engagement ring online',
    'virtual engagement ring try on',
    // Cultural / by country
    'engagement ring hand uk',
    'engagement ring hand usa',
    'engagement ring hand spain',
    'engagement ring hand russia',
    'engagement ring hand india',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'What Hand Does the Engagement Ring Go On? + AI Try-On',
    description:
      'Left in the US/UK, right in Spain/Latin America/Russia/India. Full guide + try any engagement ring on YOUR own hand with AI in 30 seconds.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-jewelry-try-on.png', width: 1200, height: 630, alt: 'Engagement ring on which hand — Agalaz AI try-on' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Hand Does the Engagement Ring Go On?',
    description: 'Country-by-country guide + try any ring on YOUR hand with AI in 30 seconds. Free.',
    images: ['/og/virtual-jewelry-try-on.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'jewelry',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'What Hand Does the Engagement Ring Go On?',
        description:
          'Comprehensive guide to which hand the engagement ring is worn on across cultures, plus an AI try-on simulator.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Jewelry',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Jewelry', item: 'https://agalaz.com/virtual-jewelry-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Engagement ring on which hand', item: url },
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
