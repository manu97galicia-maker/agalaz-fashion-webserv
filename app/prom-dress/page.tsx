import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { promDressEN } from '@/data/bigVolumeLandings';

// Long-tail prom-dress cluster: 550K/mo head + 10 KD-0/KD-3 variants. 1-day
// ISR — page regenerates max once per day so we don't pay the SSR roundtrip
// on every visit while still picking up landing copy updates within a day.
export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={promDressEN} />;
}
