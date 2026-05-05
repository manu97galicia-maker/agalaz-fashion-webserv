import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('virtual-earring-try-on', 'es');
const enUrl = nativeLandingUrl('virtual-earring-try-on', 'en');

export const metadata: Metadata = {
  title: 'Probador Virtual de Pendientes — IA Gratis | Agalaz',
  description: 'Pruébate cualquier par de pendientes en tu foto con IA. Encuentra el modelo perfecto antes de comprar.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'es'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
  openGraph: {
    title: 'Probador Virtual de Pendientes — IA Gratis | Agalaz',
    description: 'Pruébate cualquier par de pendientes en tu foto con IA. Encuentra el modelo perfecto antes de comprar.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
