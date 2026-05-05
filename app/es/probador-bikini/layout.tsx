import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('realistic-swimwear-try-on', 'es');
const enUrl = nativeLandingUrl('realistic-swimwear-try-on', 'en');

export const metadata: Metadata = {
  title: 'Probador Virtual de Bañadores Realista — IA Gratis | Agalaz',
  description: 'Pruébate cualquier bañador en tu foto con IA. Realista, instantáneo y privado. Decide la talla y el corte antes de comprar.',
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
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
