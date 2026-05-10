import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('realistic-swimwear-try-on', 'es');
const enUrl = nativeLandingUrl('realistic-swimwear-try-on', 'en');

export const metadata: Metadata = {
  title: 'Bikini Mujer — Probador Virtual Bañadores y Trajes Baño IA',
  description: 'Bikini mujer, bañador, traje de baño Decathlon, Shein, Corte Inglés. Pruébatelo con IA en tu cuerpo antes de comprar. Bikini deportivo, tanga, malla.',
  keywords: [
    'bikini mujer',
    'bikini deportivo mujer',
    'shein bikini mujer',
    'bikini mujer decathlon',
    'bikini mujer corte ingles',
    'bikini tanga mujer',
    'bikini brasileño',
    'bañador mujer',
    'bañador moldeador',
    'traje de baño mujer',
    'malla bikini',
    'probador virtual bañadores',
    'probador bikini online',
    'bikini virtual ia',
    'simulador bañador',
    'malla virtual',
    'trikini virtual',
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
