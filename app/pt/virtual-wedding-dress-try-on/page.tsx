import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-wedding-dress-try-on']['pt'].content} enHref="/virtual-wedding-dress-try-on" />;
}
