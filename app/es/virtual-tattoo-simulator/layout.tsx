import type { Metadata } from 'next';

const baseUrl = 'https://agalaz.com';
const pageUrl = `${baseUrl}/es/virtual-tattoo-simulator`;
const enUrl = `${baseUrl}/virtual-tattoo-simulator`;

export const metadata: Metadata = {
  title: 'Simulador Virtual de Tatuajes Gratis | Prueba Tatuajes en tu Foto con IA',
  description: 'Prueba tatuajes en tu foto con nuestro simulador IA gratis. Colocación realista en brazo, piernas, pecho. Para artistas y estudios.',
  alternates: {
    canonical: pageUrl,
    languages: {
      'en': enUrl,
      'es': pageUrl,
      'fr': `${baseUrl}/fr/virtual-tattoo-simulator`,
      'pt': `${baseUrl}/pt/virtual-tattoo-simulator`,
      'de': `${baseUrl}/de/virtual-tattoo-simulator`,
      'it': `${baseUrl}/it/virtual-tattoo-simulator`,
      'x-default': enUrl,
    },
  },
  openGraph: {
    title: 'Simulador Virtual de Tatuajes Gratis | Prueba Tatuajes en tu Foto con IA',
    description: 'Prueba tatuajes en tu foto con nuestro simulador IA gratis. Colocación realista en brazo, piernas, pecho. Para artistas y estudios.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
