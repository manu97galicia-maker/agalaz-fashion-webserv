import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Simulatore di Tatuaggi Virtuale Gratis | Prova Tatuaggi con l\'IA',
  description: 'Prova tatuaggi sulla tua foto con il nostro simulatore IA gratuito. Posizionamento realistico su braccia, gambe o petto. Per tatuatori e studi.',
  alternates: {
    canonical: 'https://agalaz.com/it/virtual-tattoo-simulator',
    languages: {
      'en': 'https://agalaz.com/virtual-tattoo-simulator',
      'es': 'https://agalaz.com/es/virtual-tattoo-simulator',
      'fr': 'https://agalaz.com/fr/virtual-tattoo-simulator',
      'pt': 'https://agalaz.com/pt/virtual-tattoo-simulator',
      'de': 'https://agalaz.com/de/virtual-tattoo-simulator',
      'it': 'https://agalaz.com/it/virtual-tattoo-simulator',
      'x-default': 'https://agalaz.com/virtual-tattoo-simulator',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
