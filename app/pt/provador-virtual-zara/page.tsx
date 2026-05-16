import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { provadorVirtualZaraPT } from '@/data/brandLandings';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={provadorVirtualZaraPT} />;
}
