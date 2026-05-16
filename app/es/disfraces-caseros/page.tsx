import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { disfracesCaseros } from '@/data/longtailLandingsRound4';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={disfracesCaseros} />;
}
