import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { jungwonOutfitsEN } from '@/data/jungwonLanding';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={jungwonOutfitsEN} />;
}
