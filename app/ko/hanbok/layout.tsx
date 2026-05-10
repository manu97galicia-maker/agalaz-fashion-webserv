import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

// Noto Sans KR — clean Korean web font with full hangul coverage.
// Loaded with Latin subset too so brand "AGALAZ" stays consistent.
const notoKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-kr',
});

export const metadata: Metadata = {
  title: '가상 한복 입어보기 | 아갈라즈',
  description:
    '한복, 저고리, 치마, 활옷, 두루마기를 AI로 내 얼굴에 입혀보세요. 추석, 설날, 돌, 결혼식 폐백 — 전통·모던·웨딩 한복까지 30초 만에 진짜 내 얼굴 위에. 무료, 앱 없이.',
  keywords: [
    '가상 한복 입어보기',
    '한복 시뮬레이터',
    '한복 가상 피팅',
    '한복 대여 미리보기',
    '추석 한복',
    '설날 한복',
    '결혼식 한복',
    '활옷 입어보기',
    '돌 한복',
    '모던 한복',
    'virtual hanbok try on',
    'hanbok try on korean',
  ],
  openGraph: {
    title: '가상 한복 입어보기 | 아갈라즈',
    description: '내 얼굴에 한복을 AI로 30초 만에 입혀보세요.',
    url: 'https://agalaz.com/ko/hanbok',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    images: [{ url: '/og/virtual-hanbok-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: '가상 한복 입어보기',
    description: '한복을 30초 만에 내 얼굴에. 무료.',
  },
  alternates: {
    canonical: 'https://agalaz.com/ko/hanbok',
    languages: {
      en: 'https://agalaz.com/virtual-hanbok-try-on',
      ko: 'https://agalaz.com/ko/hanbok',
      'x-default': 'https://agalaz.com/virtual-hanbok-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: '아갈라즈 가상 한복 입어보기',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },
        url: 'https://agalaz.com/ko/hanbok',
        inLanguage: 'ko',
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: '한복 입어보기', item: 'https://agalaz.com/ko/hanbok' },
        ],
      },
    ],
  };
  return (
    <div lang="ko" className={`${notoKr.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </div>
  );
}
