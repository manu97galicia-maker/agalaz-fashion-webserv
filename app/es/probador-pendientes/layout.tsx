import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('virtual-earring-try-on', 'es');
const enUrl = nativeLandingUrl('virtual-earring-try-on', 'en');

export const metadata: Metadata = {
  title: 'Pendientes — Probador Virtual Pandora, Tous IA Gratis',
  description: 'Pendientes Pandora, Tous, plata, oro, hombre, mujer. Pruébatelos con IA en tu cara antes de comprar. Aretes, aros, argollas, broqueles, ear cuffs.',
  keywords: [
    'pendientes',
    'pandora pendientes',
    'pendientes pandora',
    'pendientes tous',
    'tous pendientes',
    'pendientes hombre',
    'pendientes de oro',
    'pendientes plata',
    'pendientes singularu',
    'pendientes mujer',
    'aretes',
    'aretes mexicanos',
    'aretes online',
    'aros',
    'aros online',
    'probador virtual pendientes',
    'pendientes virtuales ia',
    'probarse pendientes online',
    'simulador pendientes',
  ],
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
    images: [{ url: '/og/virtual-earring-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
