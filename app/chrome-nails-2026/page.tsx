import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { chromeNails2026 } from '@/data/longtailLandingsRound6';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={chromeNails2026} />;
}
