import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { vestidoComunionES } from '@/data/round17Landings';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={vestidoComunionES} />;
}
