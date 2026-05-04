import type { Metadata } from 'next';

const baseUrl = 'https://agalaz.com';
const pageUrl = `${baseUrl}/es/realistic-swimwear-try-on`;
const enUrl = `${baseUrl}/realistic-swimwear-try-on`;

export const metadata: Metadata = {
  title: 'Probador Virtual de Bañadores Realista — IA Gratis | Agalaz',
  description: 'Pruébate cualquier bañador en tu foto con IA. Realista, instantáneo y privado. Decide la talla y el corte antes de comprar.',
  alternates: {
    canonical: pageUrl,
    languages: {
      'en': enUrl,
      'es': pageUrl,
      'fr': `${baseUrl}/fr/realistic-swimwear-try-on`,
      'pt': `${baseUrl}/pt/realistic-swimwear-try-on`,
      'de': `${baseUrl}/de/realistic-swimwear-try-on`,
      'it': `${baseUrl}/it/realistic-swimwear-try-on`,
      'x-default': enUrl,
    },
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
