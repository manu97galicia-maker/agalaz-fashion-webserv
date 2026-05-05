import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-pet-clothing-try-on']['it'].content} enHref="/virtual-pet-clothing-try-on" slug="virtual-pet-clothing-try-on" lang="it" />;
}
