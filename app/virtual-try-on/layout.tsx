import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';

export const metadata: Metadata = {
  title: {
    absolute: 'AI Photo Editor to Change Clothes — Free Virtual Try On',
  },
  description:
    'Free AI photo editor that changes clothes online. Virtual try-on: upload your photo, pick any garment, and see it on your real body in seconds. No app, no signup. Best free AI clothes changer 2026.',
  keywords: [
    'AI photo editor change clothes virtual try on free online',
    'AI photo editor change clothes',
    'change clothes on photo AI',
    'AI clothes changer free online',
    'best free AI clothes changer 2026',
    'best free online AI clothes changer virtual try on 2026',
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
    title: 'AI Photo Editor to Change Clothes — Free Virtual Try On Online',
    description:
      'Free AI photo editor that changes clothes on your picture. Virtual try-on: upload your photo, pick any garment, and see it on your real body in seconds.',
    type: 'website',
    url: `${BASE_URL}/virtual-try-on`,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Photo Editor: Change Clothes — Free Virtual Try On Online',
    description: 'Best free AI clothes changer 2026. Upload your photo and see any garment on your real body. No app, no signup.',
  },
  alternates: {
    canonical: `${BASE_URL}/virtual-try-on`,
    languages: {
      en: `${BASE_URL}/virtual-try-on`,
      es: `${BASE_URL}/es/virtual-try-on`,
      fr: `${BASE_URL}/fr/virtual-try-on`,
      pt: `${BASE_URL}/pt/virtual-try-on`,
      de: `${BASE_URL}/de/virtual-try-on`,
      it: `${BASE_URL}/it/virtual-try-on`,
      'x-default': `${BASE_URL}/virtual-try-on`,
    },
  },
};

export default function VirtualTryOnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
