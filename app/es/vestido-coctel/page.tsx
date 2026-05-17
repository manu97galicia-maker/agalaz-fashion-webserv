import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { vestidoCoctelES } from '@/data/round17Landings';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={vestidoCoctelES} />;
}
