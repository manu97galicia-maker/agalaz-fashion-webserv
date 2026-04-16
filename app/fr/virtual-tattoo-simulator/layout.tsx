import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Simulateur de Tatouage Virtuel Gratuit | Essayez des Tatouages avec l\'IA',
  description: 'Essayez des tatouages sur votre photo avec notre simulateur IA gratuit. Placement réaliste sur bras, jambes ou poitrine. Pour artistes et boutiques.',
  alternates: {
    canonical: 'https://agalaz.com/fr/virtual-tattoo-simulator',
    languages: {
      'en': 'https://agalaz.com/virtual-tattoo-simulator',
      'es': 'https://agalaz.com/virtual-tattoo-simulator',
      'fr': 'https://agalaz.com/fr/virtual-tattoo-simulator',
      'pt': 'https://agalaz.com/pt/virtual-tattoo-simulator',
      'de': 'https://agalaz.com/de/virtual-tattoo-simulator',
      'it': 'https://agalaz.com/it/virtual-tattoo-simulator',
      'x-default': 'https://agalaz.com/virtual-tattoo-simulator',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
