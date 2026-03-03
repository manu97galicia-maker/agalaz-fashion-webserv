import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agalaz - Prueba Ropa con Inteligencia Artificial',
  description:
    'Sube tu foto, elige cualquier prenda y ve cómo te queda al instante. Virtual Try-On con IA que respeta tu cuerpo real. Preservación total de outfit, mapeo facial sin costuras.',
  keywords: [
    'virtual try-on',
    'prueba de ropa virtual',
    'inteligencia artificial moda',
    'AI fashion',
    'probador virtual',
    'Agalaz Fashion',
  ],
  openGraph: {
    title: 'Agalaz - Virtual Try-On con IA',
    description:
      'Prueba cualquier prenda antes de comprar. IA que respeta tu cuerpo real con preservación total de outfit.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Agalaz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agalaz - Virtual Try-On con IA',
    description:
      'Prueba cualquier prenda antes de comprar. IA que respeta tu cuerpo real.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          defer
          data-website-id="dfid_pvOMR9IXJLNYSqjS8MdsB"
          data-domain="agalaz.com"
          src="https://datafa.st/js/script.js"
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
