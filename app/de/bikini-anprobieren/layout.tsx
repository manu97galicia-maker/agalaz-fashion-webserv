import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Realistische Virtuelle Bademoden-Anprobe | Bikinis am Echten Körper',
  description: 'Die erste KI-Bademoden-Anprobe für echte Körper. Lade dein Foto hoch und probiere Bikinis sofort. Reduziere Retouren mit Agalaz AI.',
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'de'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
  openGraph: {
    title: 'Realistische Virtuelle Bademoden-Anprobe | Bikinis am Echten Körper',
    description: 'Die erste KI-Bademoden-Anprobe für echte Körper. Lade dein Foto hoch und probiere Bikinis sofort. Reduziere Retouren mit Agalaz AI.',
    type: 'website',
    url: nativeLandingUrl('realistic-swimwear-try-on', 'de'),
    siteName: 'Agalaz Fashion',
    locale: 'de_DE',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
