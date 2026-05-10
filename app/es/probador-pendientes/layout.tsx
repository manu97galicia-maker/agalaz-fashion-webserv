import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('virtual-earring-try-on', 'es');
const enUrl = nativeLandingUrl('virtual-earring-try-on', 'en');

export const metadata: Metadata = {
  title: 'Probador Virtual de Pendientes — IA Gratis',
  description: 'Pruébate pendientes, aretes o aros con IA. Mira los modelos en tu cara antes de comprar — argollas, broqueles, candongas, ear cuffs.',
  keywords: [
    'probador virtual pendientes',
    'pendientes virtuales ia',
    'probarse pendientes online',
    'simulador pendientes',
    'aretes virtuales',
    'aretes online',
    'aretes mexicanos',
    'probador virtual aretes',
    'aros virtuales',
    'aros online',
    'argollas virtuales',
    'broqueles virtuales',
    'candongas online',
    'ear cuffs probador',
    'pendientes vs aretes',
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
