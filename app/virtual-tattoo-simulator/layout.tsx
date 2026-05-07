import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const FAQ = [
  { q: 'Is this a free tattoo simulator?', a: 'Yes — Agalaz is a free tattoo simulator and virtual tattoo viewer. Your first render is free with no signup, no app download and no credit card. Upload a photo of the body part and the design, and the AI places the tattoo on your skin in seconds.' },
  { q: 'How does the virtual tattoo placement work?', a: 'Upload a photo of the body part where you want the tattoo (arm, leg, chest, back, ribs, neck) and a photo of the design. The AI maps the design onto your skin in 30 seconds — respecting curvature, lighting, skin tone, and existing markings. You see exactly how the tattoo will sit before booking the appointment.' },
  { q: 'Can I try any tattoo design?', a: 'Yes. Custom designs from your artist, Pinterest finds, traditional flash sheets, fine line art, blackwork, watercolor, geometric, lettering, full-colour pieces. If you have an image of the design, you can render it.' },
  { q: 'Can I see how the tattoo will look in different sizes or placements?', a: 'Yes. After the first render, ask the AI chat: "make it 30% smaller", "move it 2 inches lower", "rotate slightly". Re-renders without losing the design or your skin tone.' },
  { q: 'Will it look like my real skin?', a: 'Yes. Skin tone, body curvature, existing tattoos, scars, hair direction — everything is preserved. The AI is not a flat overlay; it is a realistic render of how that ink will sit on your body.' },
  { q: 'Is it useful for tattoo artists and shops?', a: 'Hugely. Show clients exactly what they will get before the gun touches skin. Cuts indecision, reduces walk-aways, and works as portfolio content. Partner pricing available for shops doing 50+ pieces a month.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone or desktop. First render is free, no account required.' },
];

export const metadata: Metadata = {
  title: 'Tattoo Simulator: Free Virtual Tattoo Viewer on Your Photo',
  description:
    'Free tattoo simulator and virtual tattoo viewer. Upload your photo, choose any tattoo design, and see realistic AI placement on arms, legs, chest, ribs in seconds. No download, no signup.',
  keywords: [
    'tattoo simulator',
    'virtual tattoo viewer',
    'tattoo simulator free',
    'tattoo simulator online',
    'virtual tattoo simulator',
    'free tattoo simulator on your photo',
    'tattoo visualizer online free',
    'test tattoo on skin photo',
    'realistic tattoo placement tool',
    'tattoo try on app',
    'AI tattoo placement',
    'tattoo preview on body',
    'tattoo design simulator',
    'try tattoo before getting it',
    'tattoo placement app',
  ],
  openGraph: {
    title: 'Tattoo Simulator — Free Virtual Tattoo Viewer | Agalaz AI',
    description:
      'The most realistic free tattoo simulator and virtual tattoo viewer. Upload a photo and see exactly how any tattoo design will fit your body.',
    url: 'https://agalaz.com/virtual-tattoo-simulator',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tattoo Simulator — Virtual Tattoo Viewer on Your Photo',
    description:
      'Upload your photo, choose a tattoo design, and see realistic AI placement on your skin. Free tattoo simulator, instant and private.',
  },
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'en'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz AI Tattoo Simulator',
        operatingSystem: 'WEB',
        applicationCategory: 'DesignApplication',
        url: 'https://agalaz.com/virtual-tattoo-simulator',
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Virtual Tattoo Simulator', item: 'https://agalaz.com/virtual-tattoo-simulator' },
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
