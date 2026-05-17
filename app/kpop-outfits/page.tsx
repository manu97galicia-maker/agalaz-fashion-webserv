import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { kpopOutfitsEN } from '@/data/kpopOutfitsLanding';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={kpopOutfitsEN} />;
}
