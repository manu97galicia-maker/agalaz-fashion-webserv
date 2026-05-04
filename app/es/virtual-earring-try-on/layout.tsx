import type { Metadata } from 'next';

const baseUrl = 'https://agalaz.com';
const pageUrl = `${baseUrl}/es/virtual-earring-try-on`;
const enUrl = `${baseUrl}/virtual-earring-try-on`;

export const metadata: Metadata = {
  title: 'Probador Virtual de Pendientes — IA Gratis | Agalaz',
  description: 'Pruébate cualquier par de pendientes en tu foto con IA. Encuentra el modelo perfecto antes de comprar.',
  alternates: {
    canonical: pageUrl,
    languages: {
      'en': enUrl,
      'es': pageUrl,
      'fr': `${baseUrl}/fr/virtual-earring-try-on`,
      'pt': `${baseUrl}/pt/virtual-earring-try-on`,
      'de': `${baseUrl}/de/virtual-earring-try-on`,
      'it': `${baseUrl}/it/virtual-earring-try-on`,
      'x-default': enUrl,
    },
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
