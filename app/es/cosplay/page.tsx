import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { cosplayEsLanding } from '@/data/longtailLandingsRound4';

export default function Page() {
  return <LongtailLandingTemplate content={cosplayEsLanding} />;
}
