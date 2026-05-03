import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Kostenloser Virtueller Tattoo-Simulator | Tattoos auf Foto mit KI',
  description: 'Probiere Tattoos auf deinem Foto mit unserem kostenlosen KI-Simulator. Realistische Platzierung auf Armen, Beinen oder Brust. Für Tätowierer und Studios.',
  alternates: {
    canonical: 'https://agalaz.com/de/virtual-tattoo-simulator',
    languages: {
      'en': 'https://agalaz.com/virtual-tattoo-simulator',
      'fr': 'https://agalaz.com/fr/virtual-tattoo-simulator',
      'pt': 'https://agalaz.com/pt/virtual-tattoo-simulator',
      'de': 'https://agalaz.com/de/virtual-tattoo-simulator',
      'it': 'https://agalaz.com/it/virtual-tattoo-simulator',
      'x-default': 'https://agalaz.com/virtual-tattoo-simulator',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
