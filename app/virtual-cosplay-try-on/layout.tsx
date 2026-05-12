import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import ImageSchemaScript from '@/components/ImageSchemaScript';

const FAQ = [
  { q: 'How does the virtual cosplay try-on work?', a: 'Upload a clear photo of yourself and a reference image of the character — anime screenshot, Genshin key art, Etsy cosplay-kit listing, your OC mood-board. The AI maps wig, outfit, props and armour onto your real body in 30 seconds, preserving face, hair line, skin tone and proportions.' },
  { q: 'What cosplays can I try?', a: 'Anime (Demon Slayer, Jujutsu Kaisen, Naruto, One Piece, Sailor Moon, Genshin Impact, My Hero Academia), video games (Final Fantasy, Zelda, League of Legends, Cyberpunk, Witcher), comics and Marvel/DC (Spider-Verse, Loki, Wanda, Wonder Woman), Star Wars, original characters, gender-bend / crossplay versions, idol stage outfits, kids cosplay, fursuits — any clear reference works.' },
  { q: 'Does it handle wigs, props and armour?', a: 'Yes. Long pastel wigs, oversized swords, mecha shoulder pieces, demon horns, glowing eyes, intricate kimono layering, EVA-foam pauldrons — all preserved from the reference. The AI is built for cosplay-specific complexity, not flat T-shirts.' },
  { q: 'Can I see colour variants and alt skins of the same character?', a: 'Yes. After the first render ask in chat: "switch the wig to silver", "show the demon-form variant", "give me the armoured cape version", "swap to the Mode 2 alt skin". The AI re-renders without losing your face.' },
  { q: 'Will it preserve my face?', a: 'Yes. Eye colour, face shape, skin tone, expression — all preserved exactly. The AI is putting the cosplay on YOU, not generating a stock con-girl.' },
  { q: 'Useful for cosplay sellers and convention vendors?', a: 'Yes. Embed on cosplay-shop product pages — typical 3-5x conversion lift on cosplay apparel and a sharp drop in sizing returns. Strong for Etsy cosplay sellers, Taobao reseller stores, wig shops, and convention-floor pre-orders. Partner pricing available.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone or desktop, including con Wi-Fi. First try-on is free, no account required.' },
];

export const metadata: Metadata = {
  title: 'Cosplay Try-On — Cosplay Costume, Anime AI',
  description:
    'Cosplay costume try-on with AI. Anime, Genshin, Demon Slayer, Marvel, Star Wars, original characters — see the cosplay on YOU in 30 seconds. Free, no app.',
  keywords: [
    'cosplay',
    'cosplay costume',
    'cosplay costumes',
    'costume play cosplay',
    'cosplay costume play',
    'costume and cosplay',
    'cosplay meaning',
    'cosplay for women',
    'anime cosplay',
    'virtual cosplay try on',
    'ai cosplay try on',
    'see cosplay on me',
    'genshin cosplay try on',
    'demon slayer cosplay preview',
    'comic con cosplay preview',
    'cosplay wig try on online',
    'crossplay generator ai',
  ],
  openGraph: {
    title: 'Virtual Cosplay Try-On — Anime, Games, Marvel, Original Characters',
    description: 'Upload your photo, drop in any cosplay reference, see it on YOU in 30 seconds. Anime, games, comics, OCs — free.',
    url: 'https://agalaz.com/virtual-cosplay-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-cosplay-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: { card: 'summary_large_image', title: 'Virtual Cosplay Try-On', description: 'Anime, games, Marvel, OCs — see any cosplay on YOUR body in 30 seconds.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-cosplay-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-cosplay-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Cosplay Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-cosplay-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Cosplay Try-On', item: 'https://agalaz.com/virtual-cosplay-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-cosplay-try-on" lang="en" pageUrl="https://agalaz.com/virtual-cosplay-try-on" />{children}</>);
}
