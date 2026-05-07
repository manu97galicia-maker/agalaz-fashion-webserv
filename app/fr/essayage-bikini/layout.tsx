import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Essayage Virtuel de Maillots Réaliste | Bikinis sur Votre Vrai Corps',
  description: 'Le premier essayeur virtuel IA de maillots pour vrais corps. Téléchargez votre photo et essayez des bikinis instantanément. Réduisez les retours avec Agalaz AI.',
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'fr'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
  openGraph: {
    title: 'Essayage Virtuel de Maillots Réaliste | Bikinis sur Votre Vrai Corps',
    description: 'Le premier essayeur virtuel IA de maillots pour vrais corps. Téléchargez votre photo et essayez des bikinis instantanément. Réduisez les retours avec Agalaz AI.',
    type: 'website',
    url: nativeLandingUrl('realistic-swimwear-try-on', 'fr'),
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
