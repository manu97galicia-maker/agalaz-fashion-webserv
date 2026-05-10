import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { YUKATA_FAQ as FAQ_DATA } from '@/data/yukata';

// Reuse the Noto Sans JP font already loaded by /ja/kimono so we keep the
// Japanese glyph rendering consistent across the JP cluster.
const notoJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-jp',
});

const url = 'https://agalaz.com/ja/yukata';

export const metadata: Metadata = {
  title: '浴衣 バーチャル試着 | アガラズ AI 2026',
  description:
    '浴衣のバーチャル試着。あなたの写真にAIで浴衣を着せて30秒で確認。夏祭り・花火大会・京都観光の前に、似合う色や柄を試せます。無料、登録不要。',
  keywords: [
    // High-volume Japanese keywords from DataForSEO scan (201K/mo "浴衣", 110K/mo "振袖", KD 9 each)
    '浴衣',
    '浴衣 試着',
    '浴衣 バーチャル試着',
    '浴衣 オンライン',
    '浴衣 似合う',
    '浴衣 セット',
    '浴衣 レディース',
    '浴衣 メンズ',
    '浴衣 子供',
    '浴衣 大人',
    '浴衣 デート',
    '浴衣 花火大会',
    '浴衣 夏祭り',
    '浴衣 京都',
    '浴衣 レンタル',
    '振袖',
    '着物 浴衣 違い',
    'yukata',
    'yukata try on',
    'japanese yukata',
    'summer kimono',
  ],
  alternates: {
    canonical: url,
    languages: {
      ja: url,
      en: 'https://agalaz.com/virtual-kimono-try-on',
      'x-default': 'https://agalaz.com/virtual-kimono-try-on',
    },
  },
  openGraph: {
    title: '浴衣 バーチャル試着 — あなたの写真でAI試着',
    description: '夏祭り・花火大会・京都観光の前に、AIで浴衣を試着。30秒で似合う色・柄が分かります。最初の1枚は無料。',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'ja_JP',
    alternateLocale: 'en_US',
    images: [{ url: '/og/yukata.png', width: 1200, height: 630, alt: '浴衣 バーチャル試着 — Agalaz AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '浴衣 バーチャル試着 AI',
    description: 'あなたの写真で30秒。無料、アプリ不要。',
    images: ['/og/yukata.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: '浴衣 バーチャル試着 2026',
        description: '夏祭りや花火大会のための浴衣ガイド7スタイル + AIバーチャル試着。',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: '和装 · 夏',
        inLanguage: 'ja-JP',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: '着物試着', item: 'https://agalaz.com/ja/kimono' },
          { '@type': 'ListItem', position: 3, name: '浴衣試着', item: url },
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
