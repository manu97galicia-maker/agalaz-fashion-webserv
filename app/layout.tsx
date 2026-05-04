import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '@/components/LanguageProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

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
    default: 'Try On Any Clothing Before Buying — Free AI Virtual Try-On',
    template: '%s | Agalaz Fashion',
  },
  description:
    'Upload your photo and see any clothing on your real body with AI. Reduce returns 80%. 2 free renders, no credit card — try free now.',
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
    'try on my own clothes',
    'see how clothes look on me',
    'AI outfit preview',
    'online fitting room free',
    'try clothes without buying',
    'virtual wardrobe',
    'photo try on clothes',
    'best virtual try on',
    'free virtual try on online',
    'virtual try on clothes free',
    'Agalaz Fashion',
    'prueba de ropa virtual',
    'probador virtual IA',
    'ver como me queda la ropa',
    'probar ropa online con IA',
    'probador de ropa gratis',
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
      en: BASE_URL,
      es: `${BASE_URL}/es`,
      fr: `${BASE_URL}/fr`,
      pt: `${BASE_URL}/pt`,
      de: `${BASE_URL}/de`,
      it: `${BASE_URL}/it`,
      'x-default': BASE_URL,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: 'a048b7a9e969765f',
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
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'infoagalaz@gmail.com',
        contactType: 'customer support',
        availableLanguage: ['English', 'Spanish'],
      },
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
      '@type': 'SoftwareApplication',
      name: 'Agalaz Virtual Try-On',
      url: `${BASE_URL}/try-on`,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      description: 'Upload your photo and any garment you own or want to buy. AI shows how it looks on your real body instantly.',
      featureList: 'Virtual try-on, Color exploration, Face mapping, Body preservation, AI garment fitting',
      offers: [
        {
          '@type': 'Offer',
          name: 'Free trial',
          price: '0',
          priceCurrency: 'USD',
          description: '2 free renders to try, no card required',
        },
        {
          '@type': 'Offer',
          name: 'Starter pack',
          price: '4.99',
          priceCurrency: 'USD',
          description: 'Starter pack — 10 renders ($0.50 per render). One-time payment.',
        },
        {
          '@type': 'Offer',
          name: 'Style Pro pack',
          price: '9.99',
          priceCurrency: 'USD',
          description: 'Style Pro pack — 25 renders ($0.40 per render, save 20%). One-time payment.',
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://vpfawwcoqyglclpckrrl.supabase.co" />
        <link rel="dns-prefetch" href="https://vpfawwcoqyglclpckrrl.supabase.co" />
        <link rel="preconnect" href="https://datafa.st" />
        <link rel="dns-prefetch" href="https://datafa.st" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
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
          data-website-id="dfid_pvOMR9IXJLNYSqjS8MdsB"
          data-domain="agalaz.com"
          src="https://datafa.st/js/script.js"
        />
        {/* Bing UET (Microsoft Ads) */}
        <script
          dangerouslySetInnerHTML={{ __html: `(function(w,d,t,u,o){w[u]=w[u]||[],o.ts=(new Date).getTime();var n=d.createElement(t);n.src="https://bat.bing.net/bat.js?ti="+o.ti+("uetq"!=u?"&q="+u:""),n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&"loaded"!==s&&"complete"!==s||(o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad"),n.onload=n.onreadystatechange=null)};var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i)})(window,document,"script","uetq",{ti:"187240634",enableAutoSpaTracking:true});` }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-white text-slate-900 antialiased overscroll-none`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
