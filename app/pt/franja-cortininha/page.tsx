import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { franjaCortininhaPT } from '@/data/bangsLandings';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={franjaCortininhaPT} />;
}
