import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { kpopDemonHuntersEN } from '@/data/kpopDemonHuntersLanding';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={kpopDemonHuntersEN} />;
}
