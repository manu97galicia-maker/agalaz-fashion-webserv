import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { curtainBangsHaircut } from '@/data/longtailLandingsRound5';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={curtainBangsHaircut} />;
}
