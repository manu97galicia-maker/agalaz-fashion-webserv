import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('realistic-swimwear-try-on', 'es');
const enUrl = nativeLandingUrl('realistic-swimwear-try-on', 'en');

export const metadata: Metadata = {
  title: 'Probador Virtual de Bañadores y Bikinis — IA Gratis',
  description: 'Pruébate bañadores, bikinis, trajes de baño o mallas con IA. Realista, instantáneo y privado — decide talla y corte antes de comprar.',
  keywords: [
    'probador virtual bañadores',
    'bañador virtual ia',
    'probador bikini online',
    'bikini virtual ia',
    'simulador bañador',
    'traje de baño virtual',
    'probador traje de baño',
    'malla virtual',
    'malla bikini virtual',
    'malla bikini argentina',
    'vestido de baño virtual',
    'trikini virtual',
    'bañador moldeador probador',
    'bikini brasileño virtual',
    'probador bikini mexico',
  ],
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'es'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
  openGraph: {
    title: 'Probador Virtual de Bañadores Realista — IA Gratis | Agalaz',
    description: 'Pruébate cualquier bañador en tu foto con IA. Realista, instantáneo y privado. Decide la talla y el corte antes de comprar.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
