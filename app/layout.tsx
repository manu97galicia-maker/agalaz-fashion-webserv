import type { Metadata } from 'next';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { LanguageProvider } from '@/components/LanguageProvider';
import type { Locale } from '@/lib/i18n/dictionaries';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agalaz - Prueba Ropa con Inteligencia Artificial | AI Virtual Try-On',
  description:
    'Sube tu foto, elige cualquier prenda y ve como te queda al instante. Upload your photo, choose any garment and see how it looks. Virtual Try-On con IA.',
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
      'Prueba cualquier prenda antes de comprar. Try any garment before you buy. AI-powered virtual try-on.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Agalaz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agalaz - Virtual Try-On con IA',
    description:
      'Prueba cualquier prenda antes de comprar. AI that respects your real body.',
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
