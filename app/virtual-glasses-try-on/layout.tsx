import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import ImageSchemaScript from '@/components/ImageSchemaScript';

const FAQ = [
  { q: 'How does the virtual eyeglasses try-on work?', a: 'Upload a front-facing photo and a photo of the frames or eyewear. The AI maps the eyeglasses onto your face in 30 seconds, preserving your face shape, skin tone, hair, and lighting.' },
  { q: 'Can I try eyeglass frames from any optician or brand?', a: 'Yes. Ray-Ban, Persol, Tom Ford, Warby Parker, GENTLE MONSTER, indie, vintage spectacles, your local optician — any photo of eyewear or eyeglass frames works.' },
  {
    q: 'Best glasses to hide eye bags and dark circles — does the AI help me find them?',
    a: "Yes. Frames that hide eye bags and dark circles share specific design features: thicker bottom rim (draws the eye downward to the rim instead of the under-eye area), tinted lenses (reduces visibility of the shadow), darker frame colors (tortoise, black, dark havana — create contrast that makes circles less noticeable), and slightly oversized lens area (more 'face real estate' covered). Upload your photo and try on heavy-bottom-rimmed acetate frames, larger aviators, or tinted oversized sunglasses. Our chat can suggest specific styles based on your under-eye shadow intensity and face shape — ask 'best glasses to hide my dark circles' after the first render.",
  },
  { q: 'Will it tell me which eyeglass frames suit my face shape?', a: 'Yes. Ask the AI chat after the first render, or read our face-shape guides for diamond, oval, round, and square faces — we suggest frames per face shape.' },
  { q: 'Can I try sunglasses and prescription eyeglasses?', a: 'Yes. Tinted sunglasses, clear glasses, blue-light, prescription eyeglasses, reading spectacles, sport eyewear — same flow, same accuracy.' },
  { q: 'Is the virtual eyewear try-on accurate?', a: 'The AI preserves the bridge fit, lens size relative to your face, and frame thickness. Pupillary distance limitations apply — for prescription orders always confirm PD with your optician.' },
  { q: 'Useful for opticians and eyewear retailers?', a: 'Very. Embed on eyeglass product pages — typical 3-5x conversion lift on eyewear and a measurable drop in returns. Partner pricing available.' },
  { q: 'Do I need to download an app?', a: 'No. The virtual eyeglass try-on works in any browser on phone or desktop. First eyewear try-on is free, no account.' },
];

export const metadata: Metadata = {
  title: 'Eyeglasses Virtual Try-On — Glasses, Sunglasses, Frames for Eye Bags & Dark Circles',
  description:
    'Virtual eyeglass try-on with AI. Upload your photo, drop any eyewear or spectacles — see Ray-Ban, Persol, Warby Parker, optician frames on your face in 30 seconds. Free.',
  keywords: [
    // Primary cluster — virtual eyeglass / eyewear (8.1K/mo each, KD <20)
    'virtual eyeglass try on',
    'virtual eyeglasses try on',
    'virtual eyeglass frames try on',
    'virtual eyewear try on',
    'virtual eyewear try-on',
    'virtual spectacles try on',
    'eyeglass virtual try on',
    'eyeglasses virtual try on',
    'eyewear virtual try on',
    'spectacles virtual try on',
    'eyeglasses with virtual try on',
    'try on virtual eyeglasses',
    // Glasses cluster
    'virtual glasses try on',
    'glasses virtual try on',
    'try on glasses online',
    'ai glasses try on',
    'see glasses on me',
    'glasses simulator online',
    'try sunglasses online',
    'frames try on online',
    'virtual frames fitting',
    'glasses face shape simulator',
    'glasses for round face',
    'glasses for oval face',
    'glasses for diamond face',
    'glasses for square face',
  ],
  openGraph: {
    title: 'Virtual Eyeglass Try-On — Any Frames or Eyewear on Your Face',
    description: 'Upload your photo, drop in any eyeglasses, eyewear or spectacles — see them on your real face in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-glasses-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-glasses-try-on.png', width: 1200, height: 630, alt: 'Virtual eyeglass and eyewear try-on with AI — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: 'Virtual Eyeglass Try-On — Any Frames on You', description: 'Upload a photo, drop any eyewear or spectacles, render in 30 seconds. Free.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-glasses-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-glasses-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Glasses Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-glasses-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Glasses Try-On', item: 'https://agalaz.com/virtual-glasses-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-glasses-try-on" lang="en" pageUrl="https://agalaz.com/virtual-glasses-try-on" />{children}</>);
}
