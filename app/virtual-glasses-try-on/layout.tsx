import type { Metadata } from 'next';

const FAQ = [
  { q: 'How does the virtual glasses try-on work?', a: 'Upload a front-facing photo and a photo of the frames. The AI maps them onto your face in 30 seconds, preserving your face shape, skin tone, hair, and lighting.' },
  { q: 'Can I try frames from any optician or brand?', a: 'Yes. Ray-Ban, Persol, Tom Ford, Warby Parker, GENTLE MONSTER, indie, vintage, your local optician — any photo of glasses works.' },
  { q: 'Will it tell me which frames suit my face shape?', a: 'Yes. Ask the AI chat after the first render, or read our face-shape guides for diamond, oval, round, and square faces.' },
  { q: 'Can I try sunglasses and prescription frames?', a: 'Yes. Tinted, clear, blue-light, prescription, reading, sport — same flow, same accuracy.' },
  { q: 'Useful for opticians and retailers?', a: 'Very. Embed on product pages — typical 3-5x conversion lift on eyewear and a measurable drop in returns. Partner pricing available.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone or desktop. First try-on is free, no account.' },
];

export const metadata: Metadata = {
  title: 'Virtual Glasses Try-On — See Any Frames On Your Face | Agalaz',
  description:
    'Try any glasses on your real face with AI before buying. Ray-Ban, Persol, Warby Parker, optician frames — see them on you in 30 seconds. Free, no app.',
  keywords: [
    'virtual glasses try on',
    'try on glasses online',
    'ai glasses try on',
    'see glasses on me',
    'virtual eyewear try on',
    'glasses simulator online',
    'try sunglasses online',
    'frames try on online',
    'virtual frames fitting',
    'glasses face shape simulator',
  ],
  openGraph: {
    title: 'Virtual Glasses Try-On — See Any Frames On You',
    description: 'Upload your photo, drop in any glasses, see them on your real face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-glasses-try-on',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Virtual Glasses Try-On — See Any Frames On You', description: 'Upload a photo, drop any frames, render in 30 seconds.' },
  alternates: {
    canonical: 'https://agalaz.com/virtual-glasses-try-on',
    languages: { en: 'https://agalaz.com/virtual-glasses-try-on', es: 'https://agalaz.com/virtual-glasses-try-on', 'x-default': 'https://agalaz.com/virtual-glasses-try-on' },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Glasses Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-glasses-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Glasses Try-On', item: 'https://agalaz.com/virtual-glasses-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
