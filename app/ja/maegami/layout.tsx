import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

const notoJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-jp',
});

export const metadata: Metadata = {
  title: 'バーチャル前髪試着 — シースルーバング・ぱっつん・アイドル前髪 | アガラズ',
  description:
    'シースルーバング、ぱっつん前髪、アイドル前髪、エアバング、カーテンバング、サイドバング — AIで30秒、ご自身の本当のお顔に試着。美容院に行く前に、自分に似合う前髪を確認。無料、アプリ不要、登録不要。',
  keywords: [
    '前髪',
    '前髪 切り方',
    'シースルーバング',
    'ぱっつん前髪',
    '前髪 ぱっつん',
    'アイドル 前髪',
    'アイドル前髪',
    'カーテンバング',
    '韓国 前髪',
    '前髪 診断',
    '前髪あり ショートボブ',
    'エアバング',
    'サイドバング',
    'バーチャル 前髪 試着',
    '前髪 シミュレーター',
  ],
  openGraph: {
    title: 'バーチャル前髪試着 — AIで30秒 | アガラズ',
    description: 'シースルーバング・ぱっつん・アイドル前髪をご自身の顔に30秒で試着。無料。',
    url: 'https://agalaz.com/ja/maegami',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: 'en_US',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'バーチャル前髪試着 | アガラズ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'バーチャル前髪試着',
    description: 'AIで30秒、ご自身の顔に前髪を試着。無料。',
  },
  alternates: {
    canonical: 'https://agalaz.com/ja/maegami',
    languages: {
      ja: 'https://agalaz.com/ja/maegami',
      en: 'https://agalaz.com/korean-bangs',
      'x-default': 'https://agalaz.com/korean-bangs',
    },
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

const FAQ_JA = [
  {
    q: 'バーチャル前髪試着はどう動きますか?',
    a: 'ご自身の正面のセルフィー写真をアップロードして、試したい前髪スタイル(シースルーバング、ぱっつん、エアバングなど)を選ぶか参考画像をアップロードしてください。AIが30秒で、ご自身の本当のお顔に前髪を再現します。お顔、肌色、髪色、背景はそのまま保たれます。',
  },
  {
    q: 'どんな前髪スタイルを試せますか?',
    a: 'シースルーバング、ぱっつん前髪、アイドル前髪(エアバング)、韓国風カーテンバング、サイドスウェプトバング、ベビーバング、さらにK-POPアイドル(IVE、NewJeans、aespa、LE SSERAFIM、Stray Kids、ENHYPEN)のスタイルもPinterestやInstagramから直接スクリーンショットしてOKです。',
  },
  {
    q: '本当の顔のまま見られますか?',
    a: 'はい。お顔の補正も、目の形の編集もしません。京都やソウルのモデルではなく、ご自身のお顔の上に前髪だけを描き加えます。ご自身のお顔に似合うかどうかを正確にご確認いただけます。',
  },
  {
    q: '同じ前髪スタイルで違う長さを見られますか?',
    a: 'はい。最初の試着後、AIチャットで「もう少し短く」「もう少し長く」「サイドに流して」と伝えれば、同じスタイルが新しい長さで再生成されます。',
  },
  {
    q: '美容院に行く前に確認するメリットは?',
    a: '前髪は失敗すると伸びるまで2〜3ヶ月かかります。実際にカットする前にバーチャルで4〜5パターン試して、ご自身のお顔に最も似合うスタイルを選び、美容師さんにスクリーンショットを見せれば、ミスコミュニケーションがなくなります。',
  },
  {
    q: '料金はいくらですか?',
    a: '最初のレンダーは無料(登録もカードも不要)。その後、5枚パック ¥750(約$4.99)または15枚パック ¥1,500(約$9.99)。一回払いのみ、サブスクリプションなし。',
  },
  {
    q: 'アプリのダウンロードは必要ですか?',
    a: 'いいえ。スマホでもパソコンでも、どのブラウザからでも動きます。最初の試着は無料、アカウント登録も不要です。',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'バーチャル前髪試着 — シースルーバング・ぱっつん・アイドル前髪',
        description: 'AIで30秒、ご自身の本当のお顔に前髪を試着。シースルーバング、ぱっつん前髪、アイドル前髪、カーテンバング、サイドバング。美容院に行く前に確認。',
        url: 'https://agalaz.com/ja/maegami',
        datePublished: '2026-05-17',
        dateModified: '2026-05-17',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://agalaz.com/ja/maegami' },
        articleSection: '前髪 · ヘアスタイル',
        inLanguage: 'ja-JP',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'アガラズ バーチャル前髪試着',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '8521', bestRating: '5', worstRating: '1' },
        url: 'https://agalaz.com/ja/maegami',
        inLanguage: 'ja',
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_JA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: '前髪試着', item: 'https://agalaz.com/ja/maegami' },
        ],
      },
    ],
  };
  return (
    <div lang="ja" className={notoJp.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </div>
  );
}
