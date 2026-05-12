import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import ImageSchemaScript from '@/components/ImageSchemaScript';

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
    '振袖、浴衣、留袖、訪問着、羽織、袴、紋付などの和装を AI で自分の本当の顔に試着。京都のレンタル予約や呉服店での購入の前に、絹の質感、帯のバランス、色合わせを 30 秒で確認。成人式、七五三、卒業式、花見、結婚式、お宮参りに最適。無料、アプリ不要、登録不要、スマホでもパソコンでもブラウザだけで使えます。',
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
    images: [{ url: '/og/virtual-kimono-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
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
        '@type': 'Article',
        headline: 'バーチャル着物試着 — AIで30秒',
        description: '振袖、浴衣、留袖、訪問着、羽織、袴を AI で自分の本当の顔に試着。成人式、七五三、卒業式、花見、結婚式に最適。',
        url: 'https://agalaz.com/ja/kimono',
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://agalaz.com/ja/kimono' },
        articleSection: '着物 · 和装',
        inLanguage: 'ja-JP',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'アガラズ バーチャル着物試着',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },
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
      <ImageSchemaScript slug="virtual-kimono-try-on" lang="ja" pageUrl="https://agalaz.com/ja/kimono" />
      {children}
    </div>
  );
}
