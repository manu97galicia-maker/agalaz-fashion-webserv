import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Virtual Earring Try-On | See Piercings & Earrings on Your Photo with AI',
  description:
    'Try earrings and ear piercings on your photo with our free AI simulator. See how studs, hoops, dangles, and cartilage piercings look on your ears before buying. Instant and photorealistic.',
  keywords: [
    'virtual earring try on',
    'ear piercing simulator',
    'try earrings on photo',
    'AI earring visualizer',
    'virtual piercing placement',
    'earring try on app free',
    'see earrings on my face',
    'ear piercing preview tool',
    'jewelry try on online',
    'virtual jewelry fitting',
  ],
  openGraph: {
    title: 'Free Virtual Earring Try-On | Agalaz AI',
    description: 'See how earrings and piercings look on YOUR ears before buying. Upload a selfie, choose a design, and get a photorealistic AI preview instantly.',
    url: 'https://agalaz.com/virtual-earring-try-on',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Earring Try-On — See Piercings on Your Photo with AI',
    description: 'Upload your photo, pick earrings or piercings, and see a photorealistic preview. Free, instant, private.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-earring-try-on',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
