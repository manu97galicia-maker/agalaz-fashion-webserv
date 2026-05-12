import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';

// Cairo — modern, clean Arabic typeface. Used only on this Arabic-only landing
// to keep the rest of the site on Inter. Loaded with Latin subset too so brand
// "AGALAZ" / "agalaz.com" stays consistent.
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'تجربة افتراضية للحجاب والعباءة | أغالاز',
  description:
    'جرّبي الحجاب والعباءة والنقاب والبرقع على وجهك الحقيقي بالذكاء الاصطناعي قبل الشراء. اللون والقماش والتصميم — كلها على وجهك في 30 ثانية. مجانًا، بدون تطبيق.',
  keywords: [
    'تجربة حجاب افتراضية',
    'حجاب اون لاين',
    'تجربة عباءة',
    'تجربة نقاب',
    'برقع افتراضي',
    'حجاب على وجهي',
    'محاكي حجاب',
    'تجربة ملابس محتشمة',
    'virtual hijab try on arabic',
    'hijab try on',
  ],
  openGraph: {
    title: 'تجربة افتراضية للحجاب والعباءة | أغالاز',
    description: 'جرّبي الحجاب على وجهك بالذكاء الاصطناعي قبل الشراء.',
    url: 'https://agalaz.com/ar/hijab',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'ar',
    alternateLocale: 'en_US',
    images: [{ url: '/og/virtual-veil-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'تجربة افتراضية للحجاب',
    description: 'جرّبي الحجاب على وجهك في 30 ثانية. مجانًا.',
  },
  alternates: {
    canonical: 'https://agalaz.com/ar/hijab',
    languages: {
      en: 'https://agalaz.com/virtual-veil-try-on',
      ar: 'https://agalaz.com/ar/hijab',
      'x-default': 'https://agalaz.com/virtual-veil-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'تجربة افتراضية للحجاب — بالذكاء الاصطناعي في 30 ثانية',
        description: 'جربي أنواع الحجاب المختلفة، الخمار، الشيلة، التربون على وجهك الحقيقي بالذكاء الاصطناعي. ألوان وأقمشة متعددة.',
        url: 'https://agalaz.com/ar/hijab',
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://agalaz.com/ar/hijab' },
        articleSection: 'الحجاب · أزياء محتشمة',
        inLanguage: 'ar',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'تجربة افتراضية للحجاب من أغالاز',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },
        url: 'https://agalaz.com/ar/hijab',
        inLanguage: 'ar',
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'تجربة الحجاب', item: 'https://agalaz.com/ar/hijab' },
        ],
      },
    ],
  };
  return (
    <div lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </div>
  );
}
