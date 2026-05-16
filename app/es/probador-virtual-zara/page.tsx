import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { probadorVirtualZaraES } from '@/data/brandLandings';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={probadorVirtualZaraES} />;
}
