import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { disenosDeUnas } from '@/data/longtailLandingsRound7';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={disenosDeUnas} />;
}
