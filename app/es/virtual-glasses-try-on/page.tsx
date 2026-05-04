import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-glasses-try-on']['es'].content} enHref="/virtual-glasses-try-on" slug="virtual-glasses-try-on" lang="es" />;
}
