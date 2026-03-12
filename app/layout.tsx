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
    'try on my own clothes',
    'see how clothes look on me',
    'AI outfit preview',
    'online fitting room free',
    'try clothes without buying',
    'virtual wardrobe',
    'photo try on clothes',
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
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-ES': '/',
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
          price: '0',
          priceCurrency: 'USD',
          description: '2 free renders to try',
        },
        {
          '@type': 'Offer',
          price: '4.99',
          priceCurrency: 'USD',
          description: 'Weekly plan — 14 renders per week',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '4.99',
            priceCurrency: 'USD',
            billingDuration: 'P1W',
          },
        },
        {
          '@type': 'Offer',
          price: '59.99',
          priceCurrency: 'USD',
          description: 'Yearly plan — 14 renders per week, includes free trial',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '59.99',
            priceCurrency: 'USD',
            billingDuration: 'P1Y',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      <body className="bg-white text-slate-900 antialiased overscroll-none">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
