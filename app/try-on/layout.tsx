import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';

export const metadata: Metadata = {
  title: 'Virtual Try On — See Clothes On Your Body With AI | Agalaz',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Try On — AI Clothing Try-On Tool',
    description: 'See how any clothing looks on your real body before buying. Free AI virtual try-on.',
  },
  alternates: {
    canonical: `${BASE_URL}/try-on`,
    languages: {
      'en-US': `${BASE_URL}/try-on`,
      'es-ES': `${BASE_URL}/try-on`,
    },
  },
};

export default function TryOnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
