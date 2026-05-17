import type { Metadata } from 'next';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  { q: 'How does the virtual hanbok try-on work?', a: 'Upload a clear photo of yourself and a photo of the hanbok — jeogori, chima, dangui, jeonbok, hwarot. The AI dresses you in 30 seconds with the goreum tie and chima silhouette, preserving your real face and lighting.' },
  { q: 'Which hanbok styles can I try?', a: 'Traditional women\'s and men\'s hanbok, modern fusion (Leesle, Tchai Kim, Danha, Hanbok Lynn), wedding hwarot and wonsam, kids dol hanbok with saekdong sleeves, court-style and palace-rental hanbok.' },
  { q: 'Can I see different colour combinations?', a: 'Yes. Ask the AI: "navy chima with peach jeogori", "saekdong rainbow sleeves", "modern monochrome". The same hanbok recolours on you while keeping your face and pose.' },
  { q: 'Will it respect my real features?', a: 'Yes. No skin smoothing, no eye-shape edits — only the garment is rendered. The hanbok on YOU.' },
  { q: 'Is it ready for Chuseok, Seollal, dol, pyebaek?', a: 'Yes — built for it. Plan family Chuseok hanbok, Seollal sebae, your child\'s dol-jabi outfit, the bride\'s pyebaek hwarot, weeks before the rental shop fills up.' },
  { q: 'Useful for hanbok rental shops?', a: 'Yes. Embed on rental pages — typical 3-5x lift in conversion on wedding and Chuseok hanbok, fewer no-shows. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Hanbok Try-On — Korean Hanbok, Hanbok Dress | AI',
  description:
    'Try any hanbok on your real face with AI. Korean hanbok, traditional Korean dress, hanbok rental — see jeogori, chima, hwarot on YOU before booking a Bukchon rental.',
  keywords: [
    'hanbok',
    'korean hanbok',
    'hanbok dress',
    'hanbok clothes',
    'hanbok clothing',
    'hanbok attire',
    'traditional korean clothing hanbok',
    'hanbok traditional korean dress',
    'hanbok rental',
    'hanbok in korean',
    'virtual hanbok try on',
    'hanbok try on online',
    'wedding hanbok try on',
    'modern hanbok try on',
    'jeogori chima try on',
    'chuseok hanbok ai',
    'seollal hanbok try on',
    'dol hanbok try on',
  ],
  openGraph: {
    title: 'Virtual Hanbok Try-On — See Korean Hanbok On Your Face',
    description: 'Upload your photo, drop in any hanbok, see it on YOUR face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-hanbok-try-on',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ko',
    images: [{ url: '/og/virtual-hanbok-try-on.png', width: 1200, height: 630, alt: 'Virtual Hanbok Try-On — See Korean Hanbok On Your Face' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Hanbok Try-On',
    description: 'Upload your photo, drop any hanbok, render in 30 seconds.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-hanbok-try-on',
    languages: {
      en: 'https://agalaz.com/virtual-hanbok-try-on',
      ko: 'https://agalaz.com/ko/hanbok',
      'x-default': 'https://agalaz.com/virtual-hanbok-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Hanbok Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-hanbok-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Hanbok Try-On', item: 'https://agalaz.com/virtual-hanbok-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-hanbok-try-on" lang="en" pageUrl="https://agalaz.com/virtual-hanbok-try-on" />
      <HowToSchemaScript slug="virtual-hanbok-try-on" lang="en" pageUrl="https://agalaz.com/virtual-hanbok-try-on" />{children}</>);
}
