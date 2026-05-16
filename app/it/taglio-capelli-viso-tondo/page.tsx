import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { taglioCapelliVisoTondo } from '@/data/longtailLandings2026';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={taglioCapelliVisoTondo} />;
}
