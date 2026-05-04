import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Essayage Virtuel de Boucles d\'Oreilles et Piercings IA',
  description: 'Essayez boucles d\'oreilles et piercings sur votre photo avec l\'IA. Voyez comment les clous, créoles et piercings cartilage rendent sur vos oreilles.',
  alternates: {
    canonical: 'https://agalaz.com/fr/virtual-earring-try-on',
    languages: {
      'en': 'https://agalaz.com/virtual-earring-try-on',
      'es': 'https://agalaz.com/es/virtual-earring-try-on',
      'fr': 'https://agalaz.com/fr/virtual-earring-try-on',
      'pt': 'https://agalaz.com/pt/virtual-earring-try-on',
      'de': 'https://agalaz.com/de/virtual-earring-try-on',
      'it': 'https://agalaz.com/it/virtual-earring-try-on',
      'x-default': 'https://agalaz.com/virtual-earring-try-on',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
