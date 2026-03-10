import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/components/LanguageProvider';
import './globals.css';

const BASE_URL = 'https://agalaz.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Agalaz — AI Virtual Try-On | See Clothes On Your Real Body Before You Buy',
    template: '%s | Agalaz Fashion',
  },
  description:
    'Upload your photo and try on any clothing instantly with AI. See how clothes fit your real body before buying — reduce returns by 80%. Free to try, no credit card needed.',
  keywords: [
    'virtual try-on',
    'AI fashion',
    'try clothes online',
    'try before you buy',
    'virtual fitting room',
    'AI clothing try on',
    'see clothes on my body',
    'online shopping returns',
    'how to know if clothes will fit',
    'try on clothes with AI',
    'virtual dressing room',
    'Agalaz Fashion',
    'prueba de ropa virtual',
    'probador virtual IA',
    'ver como me queda la ropa',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Agalaz',
  },
  openGraph: {
    title: 'Agalaz — Try Any Clothing On Your Real Body With AI',
    description: 'Upload your photo, pick any garment and see how it looks on you instantly. AI-powered virtual try-on. Free to start.',
    type: 'website',
    siteName: 'Agalaz Fashion',
    url: BASE_URL,
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agalaz — AI Virtual Try-On',
    description: 'See how any clothing looks on your real body before buying. Try free.',
    creator: '@agalaz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': BASE_URL,
      'es-ES': BASE_URL,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'fashion',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Agalaz',
      url: BASE_URL,
      description: 'AI-powered virtual try-on platform that lets you see how clothes look on your real body before buying.',
      email: 'infoagalaz@gmail.com',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Agalaz Fashion',
      description: 'AI Virtual Try-On — See clothes on your real body before you buy',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: ['en-US', 'es-ES'],
    },
    {
      '@type': 'WebApplication',
      name: 'Agalaz Virtual Try-On',
      url: `${BASE_URL}/try-on`,
      applicationCategory: 'FashionApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free AI virtual try-on renders',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="canonical" href={BASE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Datafast analytics - queue before main script loads */}
        <script
          id="datafast-queue"
          dangerouslySetInnerHTML={{ __html: `window.datafast=window.datafast||function(){window.datafast.q=window.datafast.q||[];window.datafast.q.push(arguments)};` }}
        />
        <script
          defer
          data-website-id="df_84522e2590a419984da5c71b1f3f4abcd0e9fbd7408d0013"
          src="https://datafa.st/js/script.js"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased overscroll-none">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
