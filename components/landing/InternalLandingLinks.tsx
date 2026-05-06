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

  return (
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
  );
}
