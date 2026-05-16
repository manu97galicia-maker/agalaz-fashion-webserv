import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { unasVerano2026 } from '@/data/longtailLandingsRound7';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={unasVerano2026} />;
}
