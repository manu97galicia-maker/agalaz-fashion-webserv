import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { unghieCorteSemplici } from '@/data/longtailLandings2026';

export default function Page() {
  return <LongtailLandingTemplate content={unghieCorteSemplici} />;
}
