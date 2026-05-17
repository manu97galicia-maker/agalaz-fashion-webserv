import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Bikini Damen — Virtuelle Anprobe Calzedonia, Lascana KI',
  description: 'Bikini Damen, Calzedonia, Lascana, micro bikini — virtuell mit KI anprobieren. Bademoden auf deinem echten Körper sehen vor dem Kauf. Kostenlos.',
  keywords: [
    'bikini',
    'bikini damen',
    'calzedonia bikini',
    'lascana bikini',
    'micro bikini',
    'teenager bikini',
    'badeanzug damen',
    'bademode damen',
    'bikini set damen',
    'bikini virtuell anprobieren',
    'bademoden anprobe',
    'badeanzug ki',
    'virtuelle bikini anprobe',
  ],
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
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Realistische Virtuelle Bademoden-Anprobe | Bikinis am Echten Körper' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
