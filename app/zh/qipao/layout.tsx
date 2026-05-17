import type { Metadata } from 'next';
import { Noto_Sans_SC } from 'next/font/google';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

// Noto Sans SC — clean Simplified Chinese web font with full glyph coverage.
// Loaded with Latin subset too so brand "AGALAZ" stays consistent.
const notoSc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sc',
});

export const metadata: Metadata = {
  title: '虚拟旗袍试穿 | 阿加拉兹',
  description:
    '旗袍、长衫、汉服、唐装、马褂 — 用 AI 把任何中式传统服装试穿在自己真实的脸上。立领、盘扣、刺绣、开衩 — 30秒清楚看到面料、剪裁、颜色在你身上的效果。春节、婚礼、汉服日、定制旗袍试样、新中式婚礼都适用。免费,无需注册,无需下载,手机或电脑在线即用。',
  keywords: [
    '虚拟 旗袍 试穿',
    '旗袍 在线试穿',
    '汉服 试穿',
    '唐装 试穿',
    '马褂 试穿',
    '婚礼 旗袍',
    '春节 旗袍',
    '裙褂 试穿',
    '秀禾服 试穿',
    '汉服 复兴',
    'virtual qipao try on chinese',
    'cheongsam try on',
  ],
  openGraph: {
    title: '虚拟旗袍试穿 | 阿加拉兹',
    description: '用 AI 把旗袍或汉服穿在自己脸上,30秒搞定。',
    url: 'https://agalaz.com/zh/qipao',
    siteName: 'Agalaz',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    images: [{ url: '/og/virtual-qipao-try-on.png', width: 1200, height: 630, alt: '虚拟旗袍试穿 | 阿加拉兹' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: '虚拟旗袍试穿',
    description: '把旗袍穿在自己脸上,30秒。免费。',
  },
  alternates: {
    canonical: 'https://agalaz.com/zh/qipao',
    languages: {
      en: 'https://agalaz.com/virtual-qipao-try-on',
      zh: 'https://agalaz.com/zh/qipao',
      'x-default': 'https://agalaz.com/virtual-qipao-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: '虚拟旗袍试穿 — 30秒AI体验',
        description: '丝绸旗袍、改良旗袍、新中式连衣裙、汉服 — AI在30秒内为您试穿在真实脸上。婚礼、春节、元宵节、传统场合首选。',
        url: 'https://agalaz.com/zh/qipao',
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://agalaz.com/zh/qipao' },
        articleSection: '旗袍 · 传统服饰',
        inLanguage: 'zh-CN',
      },
      {
        '@type': 'SoftwareApplication',
        name: '阿加拉兹 虚拟旗袍试穿',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },
        url: 'https://agalaz.com/zh/qipao',
        inLanguage: 'zh-CN',
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: '旗袍试穿', item: 'https://agalaz.com/zh/qipao' },
        ],
      },
    ],
  };
  return (
    <div lang="zh" className={`${notoSc.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-qipao-try-on" lang="zh" pageUrl="https://agalaz.com/zh/qipao" />
      <HowToSchemaScript slug="virtual-qipao-try-on" lang="zh" pageUrl="https://agalaz.com/zh/qipao" />
      {children}
    </div>
  );
}
