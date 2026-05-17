import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';

export const metadata: Metadata = {
  title: {
    absolute: 'Virtual Try On — Free AI Clothing Fitting Room | Agalaz',
  },
  description:
    'Free AI virtual try-on tool. Upload your photo and see how any clothing looks on your real body instantly. No downloads, no sign-up hassle. Try clothes online before buying — reduce returns by 80%.',
  keywords: [
    'virtual try on',
    'virtual try-on',
    'AI virtual try on',
    'try on clothes online',
    'virtual fitting room',
    'online try on',
    'try clothes on my body',
    'AI clothing try on',
    'virtual dressing room',
    'see how clothes look on me',
    'try on clothes with AI',
    'virtual try on free',
    'online fitting room',
    'photo try on clothes',
    'AI outfit preview',
    'probador virtual',
    'probar ropa online',
    'probador virtual IA',
    'probar ropa con IA',
  ],
  openGraph: {
    title: 'Virtual Try On — See Any Clothing On Your Real Body',
    description:
      'Upload your photo, pick any garment and see how it looks on you. AI-powered virtual try-on. Free to start, no app download required.',
    type: 'website',
    url: `${BASE_URL}/try-on`,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Virtual Try On — See Any Clothing On Your Real Body' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Try On — AI Clothing Try-On Tool',
    description: 'See how any clothing looks on your real body before buying. Free AI virtual try-on.',
  },
  alternates: {
    canonical: `${BASE_URL}/try-on`,
    languages: {
      en: `${BASE_URL}/try-on`,
      es: `${BASE_URL}/es/try-on`,
      fr: `${BASE_URL}/fr/try-on`,
      pt: `${BASE_URL}/pt/try-on`,
      de: `${BASE_URL}/de/try-on`,
      it: `${BASE_URL}/it/try-on`,
      'x-default': `${BASE_URL}/try-on`,
    },
  },
};

export default function TryOnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">Virtual Try-On — See Clothes On Your Real Body With AI</h1>
      {children}
    </>
  );
}
