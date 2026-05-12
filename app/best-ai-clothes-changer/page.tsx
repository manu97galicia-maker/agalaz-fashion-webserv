import BestXLanding from '@/components/landing/BestXLanding';
import { getBestXContent } from '@/data/bestXLandings';

export default function Page() {
  return <BestXLanding content={getBestXContent('best-ai-clothes-changer')} />;
}
