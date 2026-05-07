import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('virtual-tattoo-simulator', 'es');
const enUrl = nativeLandingUrl('virtual-tattoo-simulator', 'en');

export const metadata: Metadata = {
  title: 'Simulador de Tatuajes Gratis — Prueba con IA',
  description: 'Prueba tatuajes en tu foto con nuestro simulador IA gratis. Colocación realista en brazo, piernas, pecho. Para artistas y estudios.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'es'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
  openGraph: {
    title: 'Simulador Virtual de Tatuajes Gratis | Prueba Tatuajes en tu Foto con IA',
    description: 'Prueba tatuajes en tu foto con nuestro simulador IA gratis. Colocación realista en brazo, piernas, pecho. Para artistas y estudios.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
