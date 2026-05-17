import type { Metadata } from 'next';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  { q: 'How does the virtual qipao and hanfu try-on work?', a: 'Upload a clear photo of yourself and a photo of the qipao, cheongsam, hanfu, tang suit or changshan. The AI dresses you in 30 seconds — mandarin collar, pankou knots, slit, embroidery — preserving your real face and lighting.' },
  { q: 'Which Chinese garments can I try?', a: 'Qipao / cheongsam (1920s Shanghai, modern slim-fit, modest long-sleeve, bridal red), hanfu — Tang ruqun, Song beizi, Ming aoqun, Wei-Jin daxiushan. Tang suit, changshan, magua jacket, kids tangzhuang, wedding qun-gua and xiu-he.' },
  { q: 'Can I see different colours and pankou variations?', a: 'Yes. Ask the AI: "show this in jade green", "swap pankou", "longer side slit", "switch to Ming aoqun". Re-renders preserving face and pose.' },
  { q: 'Will it respect my features?', a: 'Yes. No whitening filters, no Westernised edits, no body reshaping. The qipao or hanfu on YOU.' },
  { q: 'Is it ready for Lunar New Year, weddings, hanfu festivals?', a: 'Yes — built for it. Plan the New Year red qipao, the wedding qun-gua and xiu-he, the Hanfu Day photoshoot, weeks before the Shanghai or Suzhou tailor queue closes.' },
  { q: 'Useful for qipao tailors and hanfu shops?', a: 'Yes. Embed on product pages — typical 3-5x lift on bridal qipao and hanfu sets. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Qipao Try-On — Cheongsam, Hanfu Dress Online | AI',
  description:
    'Try any qipao, cheongsam, hanfu or tang suit on your real face with AI. Cheongsam dress, qipao dress — see mandarin collar and silk on YOU in 30 seconds.',
  keywords: [
    'qipao',
    'cheongsam',
    'qipao cheongsam',
    'cheongsam qipao',
    'qipao dress',
    'qipao dresses',
    'cheongsam dress',
    'qipao cheongsam dress',
    'hanfu',
    'tang suit',
    'virtual qipao try on',
    'cheongsam try on online',
    'hanfu try on',
    'bridal qipao try on',
    'qun gua try on',
    'xiu he fu try on',
    'lunar new year qipao',
  ],
  openGraph: {
    title: 'Virtual Qipao Try-On — See Cheongsam & Hanfu On Your Face',
    description: 'Upload your photo, drop in any qipao or hanfu, see it on YOUR face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-qipao-try-on',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    images: [{ url: '/og/virtual-qipao-try-on.png', width: 1200, height: 630, alt: 'Virtual Qipao Try-On — See Cheongsam & Hanfu On Your Face' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Qipao & Hanfu Try-On',
    description: 'Upload your photo, drop any qipao or hanfu, render in 30 seconds.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-qipao-try-on',
    languages: {
      en: 'https://agalaz.com/virtual-qipao-try-on',
      zh: 'https://agalaz.com/zh/qipao',
      'x-default': 'https://agalaz.com/virtual-qipao-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Qipao Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-qipao-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Qipao Try-On', item: 'https://agalaz.com/virtual-qipao-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-qipao-try-on" lang="en" pageUrl="https://agalaz.com/virtual-qipao-try-on" />
      <HowToSchemaScript slug="virtual-qipao-try-on" lang="en" pageUrl="https://agalaz.com/virtual-qipao-try-on" />{children}</>);
}
