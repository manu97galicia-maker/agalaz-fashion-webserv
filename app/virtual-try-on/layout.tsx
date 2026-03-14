import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';

export const metadata: Metadata = {
  title: 'Virtual Try On — AI Clothing Try-On Tool | See Clothes On Your Body',
  description:
    'Try on clothes virtually with AI. Upload your photo and see how any garment looks on your real body before buying. Free virtual try-on tool — no app download needed. Reduce online shopping returns by 80%.',
  keywords: [
    'virtual try on',
    'virtual try-on',
    'try on clothes virtually',
    'AI virtual try on',
    'virtual try on clothes',
    'online virtual try on',
    'virtual try on app',
    'virtual try on free',
    'try on clothes online free',
    'AI try on clothes',
    'virtual fitting room online',
    'virtual dressing room',
    'see clothes on my body online',
    'try on outfits online',
    'virtual try on AI free',
    'clothes try on online',
    'probador virtual',
    'probar ropa virtualmente',
    'probador de ropa virtual',
    'probador virtual IA gratis',
  ],
  openGraph: {
    title: 'Virtual Try On — See Any Clothing On Your Real Body With AI',
    description:
      'Free AI virtual try-on: upload your photo, pick any clothing, and see how it looks on your real body in seconds. No downloads needed.',
    type: 'website',
    url: `${BASE_URL}/virtual-try-on`,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Try On — Free AI Clothing Try-On Tool',
    description: 'See how any clothing looks on your real body. Free AI virtual try-on by Agalaz.',
  },
  alternates: {
    canonical: `${BASE_URL}/virtual-try-on`,
    languages: {
      'en-US': `${BASE_URL}/virtual-try-on`,
      'es-ES': `${BASE_URL}/virtual-try-on`,
    },
  },
};

export default function VirtualTryOnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
