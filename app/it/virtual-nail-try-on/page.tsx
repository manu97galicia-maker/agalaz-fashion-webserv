import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-nail-try-on']['it'].content} enHref="/virtual-nail-try-on" slug="virtual-nail-try-on" lang="it" />;
}
