import type { Metadata } from 'next';

const FAQ = [
  { q: 'How does the virtual saree and Indian-wear try-on work?', a: 'Upload a clear photo of yourself and a photo of the saree, kurta, sherwani, lehenga, salwar-kameez or dhoti. The AI maps the weave, zari and drape onto your real face in 30 seconds, preserving features, complexion and lighting.' },
  { q: 'Which Indian garments and silks can I try?', a: 'Banarasi, Kanjivaram, Patola, Chanderi, Paithani, Mysore silk, Tussar, Bandhani, Chikankari sarees. Lehengas, anarkalis, sharara, gharara. Sherwani, bandhgala, kurta-pyjama, dhoti. Any boutique — Aza, Pernia\'s, Manyavar, Fabindia, Sabyasachi-style.' },
  { q: 'Can I try different sari draping styles?', a: 'Yes. Ask the AI: "Bengali drape", "Maharashtrian nauvari", "Gujarati seedha pallu", "Coorgi", "Madisar". The same saree re-renders in regional drape styles, your face preserved.' },
  { q: 'Will it preserve my complexion?', a: 'Yes. The AI keeps your real skin tone, eye shape, hair and jawline. No fairness filters, no Westernised face edits — the saree on YOU.' },
  { q: 'Is it ready for shaadi season?', a: 'Yes — built for it. Plan bridal red, sangeet sharara, mehendi yellow and Karwa Chauth saree months ahead, on you, before the tailor queue closes.' },
  { q: 'Useful for Indian-wear designers?', a: 'Yes. Embed on product pages — typical 3-5x lift on bridal lehengas and sherwanis, plus a sharp drop in returns. Partner pricing available.' },
];

export const metadata: Metadata = {
  title: 'Virtual Saree Try-On — See Sarees, Lehengas & Sherwanis On Your Face | Agalaz',
  description:
    'Try sarees, lehengas, sherwanis, salwar-kameez and kurtas on your real face with AI before buying or stitching. Banarasi, Kanjivaram, Sabyasachi-style — see weave, zari and drape on YOU in 30 seconds. Free.',
  keywords: [
    'virtual saree try on',
    'saree try on online',
    'lehenga try on',
    'virtual sherwani try on',
    'salwar kameez try on',
    'kurta try on',
    'banarasi try on',
    'kanjivaram try on',
    'bridal lehenga visualizer',
    'see saree on my face',
    'indian wear try on ai',
    'sabyasachi try on',
  ],
  openGraph: {
    title: 'Virtual Saree Try-On — See Indian Wear On Your Face',
    description: 'Upload your photo, drop in any saree, lehenga or sherwani, see it on YOUR face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-saree-try-on',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'hi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Saree & Indian-Wear Try-On',
    description: 'Upload your photo, drop any saree or lehenga, render in 30 seconds.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-saree-try-on',
    languages: {
      en: 'https://agalaz.com/virtual-saree-try-on',
      hi: 'https://agalaz.com/hi/saree',
      'x-default': 'https://agalaz.com/virtual-saree-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Saree Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-saree-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Saree Try-On', item: 'https://agalaz.com/virtual-saree-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
