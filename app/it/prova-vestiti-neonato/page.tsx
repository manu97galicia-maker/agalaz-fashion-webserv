import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-baby-clothing-try-on']['it'].content} enHref="/virtual-baby-clothing-try-on" slug="virtual-baby-clothing-try-on" lang="it" />;
}
