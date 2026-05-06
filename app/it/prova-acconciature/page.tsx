import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-hairstyle-try-on']['it'].content} enHref="/virtual-hairstyle-try-on" slug="virtual-hairstyle-try-on" lang="it" />;
}
