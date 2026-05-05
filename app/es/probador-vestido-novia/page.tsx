import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-wedding-dress-try-on']['es'].content} enHref="/virtual-wedding-dress-try-on" slug="virtual-wedding-dress-try-on" lang="es" />;
}
