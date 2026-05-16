import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { vestidoFestaPT } from '@/data/bigVolumeLandings';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={vestidoFestaPT} />;
}
