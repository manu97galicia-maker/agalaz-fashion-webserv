import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-cosplay-try-on']['it'].content} enHref="/virtual-cosplay-try-on" slug="virtual-cosplay-try-on" lang="it" />;
}
