import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { CanonicalLandingSlug, LandingLang } from '@/lib/i18n/landingSlugs';

interface Props {
  /** Canonical EN slug of the landing — controls which "store type" wording to render. */
  category: CanonicalLandingSlug;
  /** Page language — controls all copy + the /partners link locale. */
  lang: LandingLang;
}

/**
 * Contextual B2B upsell that sits BETWEEN the triptych transformation and the
 * rest of the landing. Once a visitor has seen "before / item / after" they
 * already understand the product visually — that's the right moment to plant
 * "do you sell this kind of thing? embed our widget on your store".
 *
 * Copy is per-(category, language) so a Spanish baby-clothing visitor reads
 * "¿Tienes una tienda online de ropa de bebé?" while a German glasses
 * visitor reads "Betreiben Sie ein Online-Brillengeschäft?".
 */

// Headline — full localized phrase per (category, language). 10 × 6 = 60 strings.
const HEADLINE: Record<CanonicalLandingSlug, Record<LandingLang, string>> = {
  'virtual-tattoo-simulator': {
    en: 'Running a tattoo studio?',
    es: '¿Tienes un estudio de tatuajes?',
    fr: 'Vous tenez un studio de tatouage ?',
    pt: 'Tens um estúdio de tatuagens?',
    de: 'Sie betreiben ein Tattoo-Studio?',
    it: 'Gestisci uno studio di tatuaggi?',
  },
  'realistic-swimwear-try-on': {
    en: 'Selling swimwear or bikinis online?',
    es: '¿Vendes bañadores o bikinis online?',
    fr: 'Vous vendez des maillots de bain en ligne ?',
    pt: 'Vendes biquínis ou fatos de banho online?',
    de: 'Verkaufen Sie Bademode online?',
    it: 'Vendi costumi da bagno o bikini online?',
  },
  'virtual-earring-try-on': {
    en: 'Running an earring or jewelry shop online?',
    es: '¿Tienes una tienda de pendientes o joyería online?',
    fr: 'Vous tenez une boutique de boucles d’oreilles en ligne ?',
    pt: 'Tens uma loja de brincos ou joias online?',
    de: 'Sie betreiben einen Online-Schmuckshop?',
    it: 'Gestisci un negozio di orecchini o gioielli online?',
  },
  'virtual-wedding-dress-try-on': {
    en: 'Running a bridal boutique?',
    es: '¿Tienes una tienda de vestidos de novia?',
    fr: 'Vous tenez une boutique de robes de mariée ?',
    pt: 'Tens uma loja de vestidos de noiva?',
    de: 'Sie betreiben ein Brautmodengeschäft?',
    it: 'Gestisci un negozio di abiti da sposa?',
  },
  'virtual-nail-try-on': {
    en: 'Running a nail salon or polish brand?',
    es: '¿Tienes un salón de uñas o marca de esmaltes?',
    fr: 'Vous tenez un salon d’ongles ou une marque de vernis ?',
    pt: 'Tens um salão de unhas ou marca de vernizes?',
    de: 'Sie betreiben ein Nagelstudio oder eine Lackmarke?',
    it: 'Gestisci un salone di unghie o un brand di smalti?',
  },
  'virtual-glasses-try-on': {
    en: 'Running an online optical shop?',
    es: '¿Tienes una óptica online?',
    fr: 'Vous tenez une boutique de lunettes en ligne ?',
    pt: 'Tens uma ótica online?',
    de: 'Betreiben Sie ein Online-Brillengeschäft?',
    it: 'Gestisci un negozio di occhiali online?',
  },
  'virtual-jewelry-try-on': {
    en: 'Running an online jewelry brand?',
    es: '¿Tienes una joyería online?',
    fr: 'Vous tenez une bijouterie en ligne ?',
    pt: 'Tens uma joalharia online?',
    de: 'Sie betreiben einen Online-Schmuckshop?',
    it: 'Gestisci una gioielleria online?',
  },
  'virtual-mens-suit-try-on': {
    en: 'Running a menswear or tailoring shop?',
    es: '¿Tienes una sastrería o tienda de trajes online?',
    fr: 'Vous tenez une boutique de costumes pour hommes ?',
    pt: 'Tens uma loja de fatos masculinos online?',
    de: 'Sie betreiben einen Herrenmoden- oder Maßschneider-Shop?',
    it: 'Gestisci una sartoria o un negozio di abiti da uomo?',
  },
  'virtual-pet-clothing-try-on': {
    en: 'Selling pet clothing online?',
    es: '¿Vendes ropa para mascotas online?',
    fr: 'Vous vendez des vêtements pour animaux en ligne ?',
    pt: 'Vendes roupa para animais online?',
    de: 'Verkaufen Sie Haustierkleidung online?',
    it: 'Vendi abiti per animali online?',
  },
  'virtual-baby-clothing-try-on': {
    en: 'Running a baby clothing store online?',
    es: '¿Tienes una tienda online de ropa de bebé?',
    fr: 'Vous tenez une boutique de vêtements bébé en ligne ?',
    pt: 'Tens uma loja online de roupa de bebé?',
    de: 'Betreiben Sie einen Online-Shop für Babykleidung?',
    it: 'Gestisci un negozio online di abiti per neonati?',
  },
  'virtual-costume-try-on': {
    en: 'Running a costume or party shop?',
    es: '¿Tienes una tienda de disfraces o artículos para fiestas?',
    fr: 'Vous tenez une boutique de déguisements ou d’articles de fête ?',
    pt: 'Tens uma loja de fatos de carnaval ou artigos de festa?',
    de: 'Sie betreiben einen Kostüm- oder Partyshop?',
    it: 'Gestisci un negozio di costumi o articoli per feste?',
  },
  'virtual-hairstyle-try-on': {
    en: 'Running a salon or hair brand?',
    es: '¿Tienes un salón de peluquería o marca de productos para el pelo?',
    fr: 'Vous tenez un salon de coiffure ou une marque capillaire ?',
    pt: 'Tens um salão de cabeleireiro ou marca capilar?',
    de: 'Sie betreiben einen Friseursalon oder eine Haarpflegemarke?',
    it: 'Gestisci un salone di parrucchiere o un brand per capelli?',
  },
  'virtual-cosplay-try-on': {
    en: 'Running a cosplay shop or convention store?',
    es: '¿Tienes una tienda de cosplay o de productos para eventos?',
    fr: 'Vous tenez une boutique de cosplay ou pour conventions ?',
    pt: 'Tens uma loja de cosplay ou de eventos?',
    de: 'Sie betreiben einen Cosplay- oder Convention-Shop?',
    it: 'Gestisci un negozio di cosplay o per fiere?',
  },
};

// Body & CTA — the same value pitch in every language (varies copy lightly).
const BODY: Record<LandingLang, string> = {
  en: 'Apply to our Partners program and let shoppers preview the item on themselves before buying. More conversions, far fewer returns, longer time-on-site.',
  es: 'Aplica a nuestro programa de Partners y deja que tus clientes se previsualicen el producto antes de comprar. Más conversiones, muchas menos devoluciones y mayor retención en tu tienda.',
  fr: 'Rejoignez notre programme Partenaires et laissez vos clients essayer le produit virtuellement avant d’acheter. Plus de conversions, beaucoup moins de retours, temps de visite plus long.',
  pt: 'Candidata-te ao nosso programa Partners e permite que os teus clientes pré-visualizem o produto antes de comprar. Mais conversões, muito menos devoluções e maior retenção no site.',
  de: 'Bewerben Sie sich für unser Partner-Programm und lassen Sie Kunden das Produkt vor dem Kauf an sich selbst sehen. Mehr Conversions, deutlich weniger Retouren, längere Verweildauer.',
  it: 'Candidati al nostro programma Partner e permetti ai clienti di vedere il prodotto su di sé prima di acquistarlo. Più conversioni, molti meno resi, maggiore tempo sul sito.',
};

const CTA: Record<LandingLang, string> = {
  en: 'Apply now',
  es: 'Solicitar acceso',
  fr: 'Demander l’accès',
  pt: 'Solicitar acesso',
  de: 'Zugang anfordern',
  it: 'Richiedi accesso',
};

const EYEBROW: Record<LandingLang, string> = {
  en: 'For shop owners',
  es: 'Para dueños de tienda',
  fr: 'Pour les propriétaires de boutique',
  pt: 'Para donos de loja',
  de: 'Für Shop-Inhaber',
  it: 'Per proprietari di negozio',
};

// Three quick-win bullets that work universally for every category.
const STAT_BULLETS: Record<LandingLang, [string, string, string]> = {
  en: ['+3-7× conversion lift', '−40-80% returns', '+2-3× time on site'],
  es: ['+3-7× conversión', '−40-80% devoluciones', '+2-3× tiempo en sitio'],
  fr: ['+3-7× conversions', '−40-80% retours', '+2-3× temps sur le site'],
  pt: ['+3-7× conversão', '−40-80% devoluções', '+2-3× tempo no site'],
  de: ['+3-7× Conversion', '−40-80% Retouren', '+2-3× Verweildauer'],
  it: ['+3-7× conversione', '−40-80% resi', '+2-3× tempo sul sito'],
};

export default function PartnerCtaBlock({ category, lang }: Props) {
  const partnersHref = lang === 'en' ? '/partners' : `/${lang}/partners`;
  const headline = HEADLINE[category][lang];
  const body = BODY[lang];
  const cta = CTA[lang];
  const eyebrow = EYEBROW[lang];
  const stats = STAT_BULLETS[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 0%, transparent 40%), radial-gradient(circle at 70% 80%, white 0%, transparent 40%)' }} />
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-5">
            <TrendingUp size={12} />
            {eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-[1.05] md:leading-[0.95] max-w-3xl mx-auto">
            {headline}
          </h2>
          <p className="text-white/85 text-sm md:text-base font-light leading-relaxed mt-5 max-w-2xl mx-auto">
            {body}
          </p>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {stats.map((s) => (
              <li key={s} className="px-3 md:px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[11px] md:text-xs font-bold tracking-wide">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Link
              href={partnersHref}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-700 font-black uppercase tracking-[0.18em] text-xs hover:bg-indigo-50 transition-colors rounded-full shadow-lg"
            >
              {cta}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
