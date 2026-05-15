import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  CANONICAL_LANDING_SLUGS,
  type CanonicalLandingSlug,
  type LandingLang,
  nativeLandingPath,
} from '@/lib/i18n/landingSlugs';

interface Props {
  /** The canonical slug of the page this block is rendered on (so we exclude it from the list).
   *  Omit to show ALL 10 product try-on landings — useful on main pages (/, /partners, /shopify, etc.)
   *  that aren't themselves a product landing. */
  currentSlug?: CanonicalLandingSlug;
  /** Language for both the URL slugs and the labels. */
  lang: LandingLang;
}

/**
 * Per-language labels for each landing — used as the link title in the
 * "More try-ons" cross-link block on every landing. Internal linking with
 * native-language anchor text + native-language URL = strong topical signal
 * to Google about the language and topic of the page.
 */
const CARD_LABELS: Record<CanonicalLandingSlug, Record<LandingLang, { title: string; subtitle: string }>> = {
  'virtual-tattoo-simulator': {
    en: { title: 'Tattoo simulator', subtitle: 'Try any design on your skin' },
    es: { title: 'Simulador de tatuajes', subtitle: 'Prueba cualquier diseño en tu piel' },
    fr: { title: 'Simulateur de tatouages', subtitle: 'Essayez n\'importe quel motif' },
    pt: { title: 'Simulador de tatuagens', subtitle: 'Experimente qualquer design' },
    de: { title: 'Tattoo-Simulator', subtitle: 'Jedes Design auf der Haut testen' },
    it: { title: 'Simulatore tatuaggi', subtitle: 'Prova qualsiasi disegno' },
  },
  'realistic-swimwear-try-on': {
    en: { title: 'Bikini & swimwear', subtitle: 'See it on your real body' },
    es: { title: 'Probador de bikini', subtitle: 'Mira cómo te queda en tu cuerpo' },
    fr: { title: 'Essayage de bikini', subtitle: 'Voyez-le sur votre corps' },
    pt: { title: 'Provador de biquíni', subtitle: 'Veja como fica no seu corpo' },
    de: { title: 'Bikini-Anprobe', subtitle: 'Sehen Sie es an Ihrem Körper' },
    it: { title: 'Prova bikini', subtitle: 'Vedi come ti sta sul corpo' },
  },
  'virtual-earring-try-on': {
    en: { title: 'Earrings', subtitle: 'See them on your ears' },
    es: { title: 'Probador de pendientes', subtitle: 'Mira cómo te quedan' },
    fr: { title: 'Boucles d\'oreilles', subtitle: 'Voyez-les sur vos oreilles' },
    pt: { title: 'Provador de brincos', subtitle: 'Veja como ficam' },
    de: { title: 'Ohrringe anprobieren', subtitle: 'An Ihren Ohren sehen' },
    it: { title: 'Prova orecchini', subtitle: 'Vedi come stanno' },
  },
  'virtual-wedding-dress-try-on': {
    en: { title: 'Wedding dresses', subtitle: 'Before booking the boutique' },
    es: { title: 'Probador vestido novia', subtitle: 'Antes de reservar la boutique' },
    fr: { title: 'Robes de mariée', subtitle: 'Avant la boutique' },
    pt: { title: 'Vestidos de noiva', subtitle: 'Antes da boutique' },
    de: { title: 'Brautkleider', subtitle: 'Vor dem Boutique-Termin' },
    it: { title: 'Abiti da sposa', subtitle: 'Prima della boutique' },
  },
  'virtual-nail-try-on': {
    en: { title: 'Nail try-on', subtitle: 'Any design on your hands' },
    es: { title: 'Probador de uñas', subtitle: 'Cualquier diseño en tus manos' },
    fr: { title: 'Essai vernis & ongles', subtitle: 'Tout design sur vos mains' },
    pt: { title: 'Simulador de unhas', subtitle: 'Qualquer design nas suas mãos' },
    de: { title: 'Nägel-Simulator', subtitle: 'Jedes Design an Ihren Händen' },
    it: { title: 'Simulatore unghie', subtitle: 'Ogni design sulle tue mani' },
  },
  'virtual-glasses-try-on': {
    en: { title: 'Glasses & sunglasses', subtitle: 'Frames on your face' },
    es: { title: 'Probador de gafas', subtitle: 'Monturas en tu cara' },
    fr: { title: 'Essai de lunettes', subtitle: 'Montures sur votre visage' },
    pt: { title: 'Provador de óculos', subtitle: 'Armações no seu rosto' },
    de: { title: 'Brille anprobieren', subtitle: 'Fassungen auf Ihrem Gesicht' },
    it: { title: 'Prova occhiali', subtitle: 'Montature sul viso' },
  },
  'virtual-jewelry-try-on': {
    en: { title: 'Jewelry', subtitle: 'Necklaces, rings, bracelets' },
    es: { title: 'Probador de joyas', subtitle: 'Collares, anillos, pulseras' },
    fr: { title: 'Essai de bijoux', subtitle: 'Colliers, bagues, bracelets' },
    pt: { title: 'Provador de joias', subtitle: 'Colares, anéis, pulseiras' },
    de: { title: 'Schmuck anprobieren', subtitle: 'Ketten, Ringe, Armbänder' },
    it: { title: 'Prova gioielli', subtitle: 'Collane, anelli, bracciali' },
  },
  'virtual-mens-suit-try-on': {
    en: { title: 'Men\'s suits', subtitle: 'Try the cut before the tailor' },
    es: { title: 'Probador traje hombre', subtitle: 'Prueba el corte antes del sastre' },
    fr: { title: 'Costumes homme', subtitle: 'Essayez avant le tailleur' },
    pt: { title: 'Fatos de homem', subtitle: 'Prove antes do alfaiate' },
    de: { title: 'Herrenanzüge', subtitle: 'Vor dem Schneider testen' },
    it: { title: 'Abiti uomo', subtitle: 'Prova prima del sarto' },
  },
  'virtual-pet-clothing-try-on': {
    en: { title: 'Pet clothing', subtitle: 'On your real dog or cat' },
    es: { title: 'Ropa para mascotas', subtitle: 'En tu perro o gato real' },
    fr: { title: 'Vêtements pour animaux', subtitle: 'Sur votre vrai chien ou chat' },
    pt: { title: 'Roupa para animais', subtitle: 'No seu cão ou gato real' },
    de: { title: 'Haustierkleidung', subtitle: 'An Ihrem echten Hund oder Katze' },
    it: { title: 'Abiti per animali', subtitle: 'Sul tuo vero cane o gatto' },
  },
  'virtual-baby-clothing-try-on': {
    en: { title: 'Baby clothing', subtitle: 'On your real baby' },
    es: { title: 'Ropa de bebé', subtitle: 'En tu bebé real' },
    fr: { title: 'Vêtements bébé', subtitle: 'Sur votre vrai bébé' },
    pt: { title: 'Roupa de bebé', subtitle: 'No seu bebé real' },
    de: { title: 'Babykleidung', subtitle: 'An Ihrem echten Baby' },
    it: { title: 'Abiti neonato', subtitle: 'Sul tuo vero neonato' },
  },
  'virtual-costume-try-on': {
    en: { title: 'Costumes', subtitle: 'Halloween, parties, cosplay' },
    es: { title: 'Disfraces', subtitle: 'Halloween, fiestas, cosplay' },
    fr: { title: 'Déguisements', subtitle: 'Halloween, fêtes, cosplay' },
    pt: { title: 'Fatos de carnaval', subtitle: 'Halloween, festas, cosplay' },
    de: { title: 'Kostüme', subtitle: 'Halloween, Partys, Cosplay' },
    it: { title: 'Costumi', subtitle: 'Halloween, feste, cosplay' },
  },
  'virtual-hairstyle-try-on': {
    en: { title: 'Hairstyles', subtitle: 'See it before the salon' },
    es: { title: 'Peinados', subtitle: 'Míralo antes del salón' },
    fr: { title: 'Coiffures', subtitle: 'Voyez avant le salon' },
    pt: { title: 'Penteados', subtitle: 'Veja antes do salão' },
    de: { title: 'Frisuren', subtitle: 'Vor dem Salon sehen' },
    it: { title: 'Acconciature', subtitle: 'Vedi prima del salone' },
  },
  'virtual-cosplay-try-on': {
    en: { title: 'Cosplay', subtitle: 'Anime, games, conventions' },
    es: { title: 'Cosplay', subtitle: 'Anime, videojuegos, eventos' },
    fr: { title: 'Cosplay', subtitle: 'Anime, jeux vidéo, conventions' },
    pt: { title: 'Cosplay', subtitle: 'Anime, jogos, eventos' },
    de: { title: 'Cosplay', subtitle: 'Anime, Games, Conventions' },
    it: { title: 'Cosplay', subtitle: 'Anime, videogiochi, fiere' },
  },
};

const SECTION_LABELS: Record<LandingLang, { eyebrow: string; title: string }> = {
  en: { eyebrow: 'More try-ons', title: 'Try anything else on you' },
  es: { eyebrow: 'Más probadores', title: 'Pruébate cualquier otra cosa' },
  fr: { eyebrow: 'Plus d\'essais', title: 'Essayez tout le reste' },
  pt: { eyebrow: 'Mais provadores', title: 'Experimente tudo o resto' },
  de: { eyebrow: 'Weitere Anproben', title: 'Probieren Sie alles andere' },
  it: { eyebrow: 'Altre prove', title: 'Prova anche tutto il resto' },
};

/**
 * Curated featured guides cross-linked from every landing. These are the
 * long-tail / face-shape / seasonal pages that need authority distribution
 * from the indexed try-on landings. Picked by SEO priority — high volume +
 * realistic-to-rank target keywords (curtain bangs, wolf cut, face-shape
 * haircuts, wedding guest, halloween couples, bridesmaid, makeup).
 *
 * Language-aware: we surface the ES disfraces landings to es/, the FR/IT
 * carrés/tagli landings to their langs, and the universal EN guides for the
 * rest. The labels match the page's H1 so the anchor text reinforces topical
 * relevance for Google.
 */
const FEATURED_GUIDES: Record<LandingLang, Array<{ href: string; title: string; subtitle: string }>> = {
  en: [
    { href: '/virtual-engagement-ring-try-on', title: 'Engagement ring try-on', subtitle: 'See solitaire, halo, pavé on your hand' },
    { href: '/virtual-wig-try-on',            title: 'Virtual wig try-on',   subtitle: 'Lace-front, curly, color, cosplay' },
    { href: '/best-virtual-try-on-app',       title: 'Best virtual try-on app', subtitle: 'Compared 6 tools in 2026' },
    { href: '/best-ai-clothes-changer',       title: 'Best AI clothes changer', subtitle: 'Which one keeps your face' },
    { href: '/best-hairstyle-try-on-app',     title: 'Best hairstyle try-on app', subtitle: 'Cut + color compared' },
    { href: '/best-ai-nail-try-on',           title: 'Best AI nail try-on',  subtitle: 'Gel, French, designs 2026' },
    { href: '/free-virtual-fitting-room',     title: 'Free virtual fitting room', subtitle: '5 apps that actually are free' },
    { href: '/chrome-nails-2026',             title: 'Chrome nails 2026',    subtitle: 'Pastel, mirror, glazed donut' },
    { href: '/how-to-style-oversized-clothes', title: 'Style oversized clothes', subtitle: 'Without looking sloppy' },
    { href: '/curtain-bangs-haircut',         title: 'Curtain bangs',      subtitle: 'Try the cut on your face' },
    { href: '/wolf-cut-hairstyles',           title: 'Wolf cut',           subtitle: 'Long, short, mullet, asian' },
    { href: '/haircut-for-round-face',        title: 'Round face haircuts', subtitle: 'Best cuts that flatter' },
    { href: '/haircut-for-oval-face',         title: 'Oval face haircuts', subtitle: 'Styles for oval faces' },
    { href: '/haircut-for-square-face',       title: 'Square face haircuts', subtitle: 'Soften the jawline' },
    { href: '/haircut-for-diamond-face',      title: 'Diamond face haircuts', subtitle: 'Balance the cheekbones' },
    { href: '/wedding-guest-outfit',          title: 'Wedding guest outfit', subtitle: 'Spring, summer, fall, winter' },
    { href: '/bridesmaid-dress-try-on',       title: 'Bridesmaid dresses', subtitle: 'Cheap, sage green, Azazie' },
    { href: '/halloween-couples-costumes',    title: 'Couples halloween costumes', subtitle: 'Funny, easy, scary, DIY' },
    { href: '/natural-makeup-look',           title: 'Natural makeup look', subtitle: 'No-makeup makeup tutorial' },
    { href: '/engagement-ring-on-which-hand', title: 'Engagement ring hand', subtitle: 'Which finger by culture' },
  ],
  es: [
    { href: '/es/vestido-invitada-boda',      title: 'Vestido invitada boda', subtitle: 'Verano, Zara, Mango' },
    { href: '/es/disenos-de-unas',            title: 'Diseños de uñas',      subtitle: 'Verano 2026, francesa, gel' },
    { href: '/es/unas-de-gel-disenos',        title: 'Uñas de gel',          subtitle: 'Diseños 2026, manicure' },
    { href: '/es/unas-francesas-disenos',     title: 'Uñas francesas',       subtitle: 'Clásicas, color, glitter' },
    { href: '/es/unas-verano-2026',           title: 'Uñas verano 2026',     subtitle: 'Tendencias y tonos' },
    { href: '/es/disfraz-de-halloween',       title: 'Disfraz Halloween',   subtitle: 'Catrina, Wednesday, Barbie' },
    { href: '/es/disfraz-halloween-pareja',   title: 'Disfraz pareja Halloween', subtitle: 'Barbie & Ken, Wednesday & Enid' },
    { href: '/es/disfraz-carnaval',           title: 'Disfraz Carnaval',    subtitle: 'Cádiz, Tenerife, Las Palmas' },
    { href: '/es/disfraces-caseros',          title: 'Disfraces caseros',   subtitle: 'Fáciles, baratos, sin coser' },
    { href: '/es/cosplay',                    title: 'Cosplay',             subtitle: 'Anime, videojuegos, OC' },
    { href: '/haircut-for-round-face',        title: 'Corte cara redonda',  subtitle: 'Los mejores cortes' },
    { href: '/curtain-bangs-haircut',         title: 'Flequillo cortina',   subtitle: 'Pruébatelo en tu cara' },
  ],
  fr: [
    { href: '/fr/robe-de-mariee',             title: 'Robe de mariée',      subtitle: 'Bohème, sirène, princesse' },
    { href: '/fr/carre-frange-rideau',        title: 'Carré frange rideau', subtitle: 'Court, long, plongeant' },
    { href: '/fr/coupe-cheveux-visage-rond',  title: 'Coupe visage rond',   subtitle: 'Avec lunettes, courte, longue' },
    { href: '/fr/tenue-bapteme',              title: 'Tenue de baptême',    subtitle: 'Femme, homme, enfant' },
    { href: '/curtain-bangs-haircut',         title: 'Curtain bangs',       subtitle: 'Try the cut on your face' },
    { href: '/wolf-cut-hairstyles',           title: 'Wolf cut',            subtitle: 'Long, short, asian, mullet' },
    { href: '/haircut-for-round-face',        title: 'Haircuts round face', subtitle: 'Best cuts that flatter' },
    { href: '/natural-makeup-look',           title: 'Natural makeup',      subtitle: 'No-makeup makeup look' },
  ],
  pt: [
    { href: '/pt/provador-virtual-zara',      title: 'Provador virtual Zara', subtitle: 'Roupa Zara no teu corpo, IA' },
    { href: '/pt/unhas-decoradas',            title: 'Unhas decoradas',     subtitle: 'Gel, simples, francesinha 2026' },
    { href: '/pt/vestido-de-noiva',           title: 'Vestido de noiva',    subtitle: 'Sereia, princesa, civil, simples' },
    { href: '/pt/corte-de-cabelo-feminino',   title: 'Corte cabelo feminino', subtitle: 'Curto, médio, chanel, franja' },
    { href: '/pt/corte-cabelo-rosto-redondo', title: 'Corte rosto redondo', subtitle: 'Chanel, médio, franja lateral' },
    { href: '/pt/unhas-curtas-ideias',        title: 'Unhas curtas',        subtitle: 'Decoradas, simples, ideias' },
    { href: '/pt/look-festa-junina',          title: 'Look festa junina',   subtitle: 'Caipira, moderno, casal' },
    { href: '/curtain-bangs-haircut',         title: 'Curtain bangs',       subtitle: 'No seu rosto, com IA' },
    { href: '/wolf-cut-hairstyles',           title: 'Wolf cut',            subtitle: 'Long, short, mullet' },
    { href: '/haircut-for-round-face',        title: 'Cortes rosto redondo', subtitle: 'Cortes que mais valorizam' },
  ],
  de: [
    { href: '/curtain-bangs-haircut',         title: 'Curtain bangs',       subtitle: 'On your face, in 30 sec' },
    { href: '/wolf-cut-hairstyles',           title: 'Wolf cut',            subtitle: 'Long, short, mullet, asian' },
    { href: '/haircut-for-round-face',        title: 'Round face haircuts', subtitle: 'Best cuts that flatter' },
    { href: '/haircut-for-oval-face',         title: 'Oval face haircuts',  subtitle: 'Styles for oval faces' },
    { href: '/wedding-guest-outfit',          title: 'Wedding guest outfit', subtitle: 'Spring, summer, fall, winter' },
    { href: '/natural-makeup-look',           title: 'Natural makeup look', subtitle: 'No-makeup makeup tutorial' },
  ],
  it: [
    { href: '/it/unghie-corte-semplici',      title: 'Unghie corte',        subtitle: 'Semplici ma belle, francese' },
    { href: '/it/taglio-capelli-viso-tondo',  title: 'Taglio viso tondo',   subtitle: 'Long bob, frangia tendina' },
    { href: '/it/vestito-comunione',          title: 'Vestito comunione',   subtitle: 'Bambina, bambino, mamma' },
    { href: '/curtain-bangs-haircut',         title: 'Curtain bangs',       subtitle: 'Provala sul tuo viso' },
    { href: '/wolf-cut-hairstyles',           title: 'Wolf cut',            subtitle: 'Long, short, asian' },
    { href: '/haircut-for-round-face',        title: 'Haircuts viso tondo', subtitle: 'Best cuts that flatter' },
  ],
};

const FEATURED_HEADINGS: Record<LandingLang, { eyebrow: string; title: string }> = {
  en: { eyebrow: 'Featured guides',  title: 'Specific looks you can try' },
  es: { eyebrow: 'Guías destacadas', title: 'Looks específicos para probar' },
  fr: { eyebrow: 'Guides à la une',  title: 'Looks spécifiques à essayer' },
  pt: { eyebrow: 'Guias em destaque', title: 'Looks específicos para experimentar' },
  de: { eyebrow: 'Empfohlene Guides', title: 'Spezifische Looks zum Ausprobieren' },
  it: { eyebrow: 'Guide in evidenza', title: 'Look specifici da provare' },
};

/**
 * Cross-links to all OTHER product try-on landings in the same language.
 * Renders 9 cards in a responsive grid with native-language anchor text +
 * native-language URLs (via `nativeLandingPath`). Place this near the bottom
 * of every landing component (above the footer) so the link equity loop is
 * complete and Google sees the topical clustering.
 */
export default function InternalLandingLinks({ currentSlug, lang }: Props) {
  const others = currentSlug
    ? CANONICAL_LANDING_SLUGS.filter((s) => s !== currentSlug)
    : [...CANONICAL_LANDING_SLUGS];
  const headings = SECTION_LABELS[lang];
  const featured = FEATURED_GUIDES[lang];
  const featuredHeadings = FEATURED_HEADINGS[lang];

  return (
    <>
      <section className="border-t border-slate-100 bg-slate-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{headings.eyebrow}</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mt-2">{headings.title}</h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {others.map((slug) => {
              const card = CARD_LABELS[slug][lang];
              return (
                <li key={slug}>
                  <Link
                    href={nativeLandingPath(slug, lang)}
                    className="group block h-full bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md p-4 md:p-5 rounded-xl transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-serif text-sm md:text-base font-black text-slate-900 tracking-tight leading-tight">{card.title}</h3>
                        <p className="text-[11px] md:text-xs text-slate-500 font-light mt-1 leading-snug">{card.subtitle}</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Featured guides — long-tail + face-shape + seasonal landings that
          need authority distribution from every indexed try-on landing.
          Same component, different bucket. */}
      <section className="border-t border-slate-100 bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[10px] font-black text-pink-600 uppercase tracking-[0.2em]">{featuredHeadings.eyebrow}</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mt-2">{featuredHeadings.title}</h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featured.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group block h-full bg-slate-50 border border-slate-200 hover:border-pink-300 hover:shadow-md p-4 md:p-5 rounded-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-sm md:text-base font-black text-slate-900 tracking-tight leading-tight">{g.title}</h3>
                      <p className="text-[11px] md:text-xs text-slate-500 font-light mt-1 leading-snug">{g.subtitle}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-pink-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
