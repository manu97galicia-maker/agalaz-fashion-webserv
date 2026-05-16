import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  {
    q: 'Is the tattoo simulator free online with no signup?',
    a: 'Yes. Agalaz is a 100% free online tattoo simulator and virtual tattoo viewer — your first HD render is free, with no signup, no app download, and no credit card required. Upload a photo of the body part and the design, and the AI places the tattoo on your skin in 30 seconds. If you want more renders to compare 3-5 designs side by side before your appointment, packs start at $4.99 USD (8 renders). One-time purchase, no subscription, credits never expire.',
  },
  {
    q: 'Is it a 3D tattoo simulator? Does it follow body curves?',
    a: "Yes — and this is what separates Agalaz from flat 2D tattoo viewers. Other simulators paste the design like a sticker on top of skin; our AI analyzes posture, muscle contours, 3D perspective in your photo, and adapts the design to the real volume of your body. If you upload a side-angle photo, the tattoo follows the curve of your arm in 3D. If the zone has relief (calves, biceps, shoulder blade, ribs), the design realistically deforms across those contours instead of staying flat. It also respects wrinkled skin, body hair, moles, scars — exactly as a real tattoo artist would adapt to your skin.",
  },
  {
    q: 'Where on the body does the AI tattoo simulator work? Arm, leg, ribs, back, hand?',
    a: 'Works on every body zone: arm (forearm, upper arm, full sleeve), leg (thigh, calf, full leg), chest (including under-bust for women), back (upper, lower, full spine), ribs (the most-requested zone and the hardest to picture mentally — this is where the AI really shines), hand (fingers, dorsum, wrist), foot, neck, ear, behind-the-ear, ankle, shoulder, shoulder blade. The AI automatically detects the body zone in your photo and adapts the design to that anatomical region. For high-movement zones (hands, fingers, neck) we recommend smaller, simpler designs — the simulator helps you confirm that decision before committing.',
  },
  {
    q: 'How realistic is the simulation compared to a real tattoo?',
    a: "In 80-90% of cases the AI result predicts your real tattoo's color, size, placement, and visual balance with reasonable fidelity. What it does NOT predict precisely: healing (a fresh tattoo looks more vibrant than a healed one at 6 months), natural ink fading over years, and specific techniques like dotwork or watercolor where the artist's hand is the protagonist. But for the pre-appointment decision (does this design suit me? this size? this placement?) the 3D simulation is accurate enough to prevent expensive irreversible mistakes — and that's the use case it was built for.",
  },
  {
    q: 'Can I try any tattoo design or only certain styles?',
    a: "Any design — custom artwork from your artist, Pinterest finds, traditional flash sheets, fine line, blackwork, watercolor, geometric, lettering, dotwork, full-color realism, neo-traditional, Japanese irezumi, tribal, mandala. If you have an image of the design, you can render it on your skin. Works equally well for first-tattoo planning and cover-ups (upload your existing tattoo + the cover design and see how they layer).",
  },
  {
    q: 'Can I tweak size, placement, rotation after the first render?',
    a: 'Yes. After the first render the AI chat accepts natural-language tweaks: "make it 30% smaller", "move it 2 inches lower toward the elbow", "rotate it 15 degrees clockwise", "switch to black-and-grey", "add red shading to the cherry". Each re-render preserves your skin tone, body, and the design itself — only the requested change applies. Useful for fine-tuning before sending the final image to your tattoo artist.',
  },
  {
    q: 'Is it useful for tattoo artists, studios, and shops?',
    a: 'Hugely. Tattoo artists using Agalaz report (1) a ~40% drop in consultation visits that end without a booking, because clients arrive more decided; (2) calmer clients during the session because they already saw the anticipated result; (3) fewer last-minute design changes during the consultation. We offer a Shopify-style embed widget for artists to install on their own studio website — the client uploads their photo + your flash, and sees the result before requesting an appointment. Partner pricing available — Agalaz already integrates with studios in the US, UK, Spain, Mexico, Argentina, France, Italy, and Germany.',
  },
  {
    q: 'Are my photos private? Does Agalaz store my body images?',
    a: 'Photos are processed in real time and never stored on our servers. The render happens via secure HTTPS, the image is returned to your device, and the original is discarded immediately. We do not train models on user uploads, do not sell data, and the rendered output stays on your device unless you choose to share it. For tattoo artists running consultations, this is GDPR-friendly out of the box.',
  },
  {
    q: 'Do I need to install an app or download anything?',
    a: 'No. Agalaz runs in any modern browser — Chrome, Safari, Firefox, Edge — on phone, tablet, or desktop. No App Store download, no Google Play install, no plugin. Open the page, upload your photo, and render. First render is free with no account.',
  },
];

export const metadata: Metadata = {
  title: 'Tattoo Simulator & Virtual Tattoo Viewer — Try Designs on Your Body Free',
  description:
    'Tattoo simulator + virtual tattoo viewer: try any tattoo design (sleeve, small, color, tribal, placement) on YOUR real body with AI in 30 sec. Free, no signup, no app, no email.',
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
    title: 'Tattoo Simulator + Virtual Tattoo Viewer Free Online — Agalaz',
    description:
      'Free online tattoo simulator with AI. Virtual tattoo viewer + placement simulator. Try any design on your real body — arm, leg, ribs, back — in 30 seconds.',
    url: 'https://agalaz.com/virtual-tattoo-simulator',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tattoo Simulator + Virtual Tattoo Viewer — Free on Your Photo',
    description:
      'Tattoo simulator + viewer + visualizer + placement tool. Upload your photo, see realistic AI placement on your skin. Free, instant, private.',
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
        '@type': 'Article',
        headline: 'Tattoo Simulator Free Online — 3D Virtual Tattoo on Your Body',
        description: 'Free online tattoo simulator with 3D AI. Try any tattoo design on arm, leg, ribs, back, chest, hand — body moves naturally with the design.',
        url: 'https://agalaz.com/virtual-tattoo-simulator',
        datePublished: '2026-04-15',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://agalaz.com/virtual-tattoo-simulator' },
        articleSection: 'Tattoo · Body Art',
        inLanguage: 'en-US',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz AI Tattoo Simulator',
        operatingSystem: 'WEB',
        applicationCategory: 'DesignApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },
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
      <ImageSchemaScript slug="virtual-tattoo-simulator" lang="en" pageUrl="https://agalaz.com/virtual-tattoo-simulator" />
      <HowToSchemaScript slug="virtual-tattoo-simulator" lang="en" pageUrl="https://agalaz.com/virtual-tattoo-simulator" />
      {children}
    </>
  );
}
