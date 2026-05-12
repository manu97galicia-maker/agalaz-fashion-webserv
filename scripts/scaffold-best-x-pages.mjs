// One-shot scaffolder: writes the page.tsx + layout.tsx pair for each entry
// in data/bestXLandings.ts. Re-runnable — overwrites whatever is there so the
// generated files stay in sync with the data file's slug list.

import fs from 'fs';
import path from 'path';

const SLUGS = [
  'best-virtual-try-on-app',
  'best-ai-clothes-changer',
  'free-virtual-fitting-room',
  'best-hairstyle-try-on-app',
  'best-ai-nail-try-on',
];

const PAGE_TEMPLATE = (slug) => `import BestXLanding from '@/components/landing/BestXLanding';
import { getBestXContent } from '@/data/bestXLandings';

export default function Page() {
  return <BestXLanding content={getBestXContent('${slug}')} />;
}
`;

const LAYOUT_TEMPLATE = (slug) => `import type { Metadata } from 'next';
import { getBestXContent, buildBestXJsonLd } from '@/data/bestXLandings';

const content = getBestXContent('${slug}');
const url = \`https://agalaz.com/\${content.slug}\`;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  keywords: content.keywords,
  alternates: { canonical: url, languages: { en: url, 'x-default': url } },
  openGraph: {
    title: content.title,
    description: content.description,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: content.heroTitle }],
  },
  twitter: { card: 'summary_large_image', title: content.title, description: content.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = buildBestXJsonLd(content);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
`;

let made = 0;
for (const slug of SLUGS) {
  const dir = path.join('app', slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), PAGE_TEMPLATE(slug));
  fs.writeFileSync(path.join(dir, 'layout.tsx'), LAYOUT_TEMPLATE(slug));
  console.log(`OK  ${dir}`);
  made++;
}
console.log(`\nScaffolded ${made} best-X landing folders.`);
