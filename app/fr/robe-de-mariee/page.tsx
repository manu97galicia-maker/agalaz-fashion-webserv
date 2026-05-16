import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { robeDeMarieeFR } from '@/data/longtailLandingsRound8';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={robeDeMarieeFR} />;
}
