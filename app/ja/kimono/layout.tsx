import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

// Noto Sans JP — clean Japanese web font with full kanji + kana coverage.
// Loaded with Latin subset too so brand "AGALAZ" stays consistent.
const notoJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-jp',
});

export const metadata: Metadata = {
  title: 'バーチャル着物試着 | アガラズ',
  description:
    '振袖、浴衣、留袖、訪問着、羽織、袴をAIで自分の本当の顔に試着。京都のレンタル予約や購入の前に、絹と帯のバランスを30秒で確認。成人式、七五三、花見、結婚式に。無料、アプリ不要。',
  keywords: [
    'バーチャル 着物 試着',
    '着物 試着 オンライン',
    '浴衣 試着',
    '振袖 試着',
    '羽織 試着',
    '袴 試着',
    '七五三 着物',
    '成人式 振袖',
    '京都 着物 レンタル',
    '花見 浴衣',
    'virtual kimono try on',
    'kimono try on japanese',
  ],
  openGraph: {
    title: 'バーチャル着物試着 | アガラズ',
    description: '自分の顔に着物をAIで30秒で試着。',
    url: 'https://agalaz.com/ja/kimono',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'バーチャル着物試着',
    description: '着物を30秒で自分の顔に。無料。',
  },
  alternates: {
    canonical: 'https://agalaz.com/ja/kimono',
    languages: {
      en: 'https://agalaz.com/virtual-kimono-try-on',
      ja: 'https://agalaz.com/ja/kimono',
      'x-default': 'https://agalaz.com/virtual-kimono-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'アガラズ バーチャル着物試着',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        url: 'https://agalaz.com/ja/kimono',
        inLanguage: 'ja',
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: '着物試着', item: 'https://agalaz.com/ja/kimono' },
        ],
      },
    ],
  };
  return (
    <div lang="ja" className={`${notoJp.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </div>
  );
}
