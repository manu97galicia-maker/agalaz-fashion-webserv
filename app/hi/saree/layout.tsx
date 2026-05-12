import type { Metadata } from 'next';
import { Noto_Sans_Devanagari } from 'next/font/google';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

// Noto Sans Devanagari — clean, web-optimized typeface for Hindi.
// Loaded with Latin subset too so brand "AGALAZ" stays consistent.
const notoHi = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-noto-hi',
});

export const metadata: Metadata = {
  title: 'वर्चुअल साड़ी ट्राय-ऑन | अगालाज़',
  description:
    'साड़ी, लहंगा, शेरवानी, सलवार-कमीज़, कुर्ता और धोती को अपने असली चेहरे पर AI से देखें — खरीदने या सिलवाने से पहले। बनारसी, कांजीवरम, सबयासाची स्टाइल — 30 सेकंड में आपके चेहरे पर। मुफ्त, बिना ऐप।',
  keywords: [
    'वर्चुअल साड़ी ट्राय ऑन',
    'साड़ी ऑनलाइन',
    'लहंगा ट्राय ऑन',
    'शेरवानी ट्राय ऑन',
    'दुल्हन का लहंगा',
    'बनारसी साड़ी',
    'कांजीवरम साड़ी',
    'सबयासाची लहंगा',
    'शादी की साड़ी',
    'मेरे चेहरे पर साड़ी',
    'virtual saree try on hindi',
    'saree try on',
  ],
  openGraph: {
    title: 'वर्चुअल साड़ी ट्राय-ऑन | अगालाज़',
    description: 'साड़ी, लहंगा या शेरवानी अपने असली चेहरे पर AI से देखें।',
    url: 'https://agalaz.com/hi/saree',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'hi_IN',
    alternateLocale: 'en_US',
    images: [{ url: '/og/virtual-saree-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'वर्चुअल साड़ी ट्राय-ऑन',
    description: 'अपने चेहरे पर साड़ी 30 सेकंड में देखें। मुफ्त।',
  },
  alternates: {
    canonical: 'https://agalaz.com/hi/saree',
    languages: {
      en: 'https://agalaz.com/virtual-saree-try-on',
      hi: 'https://agalaz.com/hi/saree',
      'x-default': 'https://agalaz.com/virtual-saree-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'वर्चुअल साड़ी ट्राय-ऑन — AI के साथ 30 सेकंड में',
        description: 'बनारसी, कांजीवरम, चंदेरी, बांधनी, सिल्क, कॉटन साड़ियों को AI से अपने असली चेहरे पर पहनें। शादी, दुर्गा पूजा, करवा चौथ, दिवाली के लिए।',
        url: 'https://agalaz.com/hi/saree',
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://agalaz.com/hi/saree' },
        articleSection: 'साड़ी · पारंपरिक',
        inLanguage: 'hi-IN',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'अगालाज़ वर्चुअल साड़ी ट्राय-ऑन',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },
        url: 'https://agalaz.com/hi/saree',
        inLanguage: 'hi',
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'होम', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'साड़ी ट्राय-ऑन', item: 'https://agalaz.com/hi/saree' },
        ],
      },
    ],
  };
  return (
    <div lang="hi" className={`${notoHi.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-saree-try-on" lang="hi" pageUrl="https://agalaz.com/hi/saree" />
      <HowToSchemaScript slug="virtual-saree-try-on" lang="hi" pageUrl="https://agalaz.com/hi/saree" />
      {children}
    </div>
  );
}
