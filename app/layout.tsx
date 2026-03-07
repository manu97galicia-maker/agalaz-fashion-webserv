import type { Metadata } from 'next';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { LanguageProvider } from '@/components/LanguageProvider';
import type { Locale } from '@/lib/i18n/dictionaries';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agalaz — Probador Virtual de Ropa con IA | AI Virtual Try-On',
  description:
    'El probador virtual #1 con inteligencia artificial. Sube tu foto, elige cualquier prenda, color o talla y ve como te queda en tu cuerpo real. Fotorrealista e instantaneo. The #1 AI virtual try-on.',
  keywords: [
    'virtual try-on',
    'probador virtual',
    'prueba de ropa virtual',
    'inteligencia artificial moda',
    'AI fashion try-on',
    'probador de ropa IA',
    'Agalaz',
    'try on clothes online',
    'virtual fitting room',
    'prueba ropa online',
    'ver como me queda la ropa',
    'AI clothing try-on',
  ],
  metadataBase: new URL('https://agalaz.com'),
  alternates: {
    canonical: '/',
    languages: { 'es': '/', 'en': '/' },
  },
  openGraph: {
    title: 'Agalaz — Probador Virtual de Ropa con IA',
    description:
      'Prueba cualquier prenda antes de comprar. Ve como te queda en tu cuerpo real con IA. Cualquier color, cualquier talla, cualquier prenda.',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    siteName: 'Agalaz',
    url: 'https://agalaz.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agalaz — Probador Virtual de Ropa con IA',
    description:
      'Prueba cualquier prenda antes de comprar. Tu cuerpo real, tu rostro, tu nuevo look. Fotorrealista e instantaneo.',
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('agalaz-lang')?.value;
  const locale: Locale = langCookie === 'en' || langCookie === 'es' ? langCookie : 'es';

  return (
    <html lang={locale}>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <LanguageProvider initialLocale={locale}>
          {children}
        </LanguageProvider>
        <Script
          defer
          data-website-id="dfid_pvOMR9IXJLNYSqjS8MdsB"
          data-domain="agalaz.com"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
