import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Essayage Virtuel de Maillots Réaliste | Bikinis sur Votre Vrai Corps',
  description: 'Le premier essayeur virtuel IA de maillots pour vrais corps. Téléchargez votre photo et essayez des bikinis instantanément. Réduisez les retours avec Agalaz AI.',
  alternates: {
    canonical: 'https://agalaz.com/fr/realistic-swimwear-try-on',
    languages: {
      'en': 'https://agalaz.com/realistic-swimwear-try-on',
      'fr': 'https://agalaz.com/fr/realistic-swimwear-try-on',
      'pt': 'https://agalaz.com/pt/realistic-swimwear-try-on',
      'de': 'https://agalaz.com/de/realistic-swimwear-try-on',
      'it': 'https://agalaz.com/it/realistic-swimwear-try-on',
      'x-default': 'https://agalaz.com/realistic-swimwear-try-on',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
