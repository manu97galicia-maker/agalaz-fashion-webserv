import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { unhasCurtasIdeias } from '@/data/longtailLandings2026';

export default function Page() {
  return <LongtailLandingTemplate content={unhasCurtasIdeias} />;
}
