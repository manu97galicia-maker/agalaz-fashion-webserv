/**
 * Per-language SEO metadata for the 4 main pages (home, try-on, virtual-try-on, partners).
 * Used by the localized route stubs at /{lang}/{page}.
 */

export type RootLang = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it';
export type RootPage = 'home' | 'try-on' | 'virtual-try-on' | 'partners';

interface MetaEntry {
  title: string;
  description: string;
}

export const ROOT_PAGE_META: Record<RootPage, Record<RootLang, MetaEntry>> = {
  home: {
    en: {
      title: 'AI Virtual Try-On — Try Clothing Before You Buy',
      description: 'Upload your photo and see any clothing on your real body with AI. Reduce returns 80%. 2 free renders, no credit card — try free now.',
    },
    es: {
      title: 'Probador Virtual con IA — Pruébate Ropa Online',
      description: 'Sube tu foto y mira cualquier prenda en tu cuerpo real con IA. Reduce devoluciones un 80%. 2 renders gratis, sin tarjeta — prueba gratis ahora.',
    },
    fr: {
      title: "Essayage Virtuel IA — Essayez Avant d'Acheter",
      description: "Téléchargez votre photo et voyez n'importe quel vêtement sur votre corps réel avec l'IA. Réduisez les retours de 80%. 2 essais gratuits, sans carte.",
    },
    pt: {
      title: 'Provador Virtual IA — Experimenta Antes de Comprar',
      description: 'Carrega a tua foto e vê qualquer roupa no teu corpo real com IA. Reduz devoluções 80%. 2 testes grátis, sem cartão — experimenta já.',
    },
    de: {
      title: 'Virtuelle KI-Anprobe — Vor dem Kauf anprobieren',
      description: 'Lade dein Foto hoch und sieh jede Kleidung an deinem echten Körper mit KI. 80% weniger Rücksendungen. 2 kostenlose Renderings, keine Kreditkarte.',
    },
    it: {
      title: 'Prova Virtuale IA — Provala Prima di Comprare',
      description: "Carica la tua foto e vedi qualsiasi capo sul tuo corpo reale con IA. Riduci i resi del 80%. 2 prove gratis, senza carta — provalo subito.",
    },
  },
  'try-on': {
    en: {
      title: 'Virtual Try On — Free AI Clothing Fitting Room | Agalaz',
      description:
        'Free AI virtual try-on tool. Upload your photo and see how any clothing looks on your real body instantly. No downloads. Reduce returns by 80%.',
    },
    es: {
      title: 'Probador Virtual — Probador de Ropa con IA Gratis | Agalaz',
      description:
        'Herramienta gratuita de probador virtual con IA. Sube tu foto y ve cómo te queda cualquier prenda en tu cuerpo real al instante. Sin descargas. Reduce devoluciones 80%.',
    },
    fr: {
      title: "Essayage virtuel — Cabine d'essayage IA gratuite | Agalaz",
      description:
        "Outil gratuit d'essayage virtuel IA. Téléchargez votre photo et voyez n'importe quel vêtement sur votre corps réel instantanément. Réduit les retours de 80%.",
    },
    pt: {
      title: 'Provador Virtual — Provador de Roupa com IA Grátis | Agalaz',
      description:
        'Ferramenta grátis de provador virtual com IA. Carrega a tua foto e vê qualquer roupa no teu corpo real ao instante. Reduz devoluções 80%.',
    },
    de: {
      title: 'Virtuelle Anprobe — Kostenlose KI-Umkleide | Agalaz',
      description:
        'Kostenloses virtuelles Anprobe-Tool mit KI. Lade dein Foto hoch und sieh sofort, wie jede Kleidung an deinem echten Körper aussieht. 80% weniger Rücksendungen.',
    },
    it: {
      title: 'Prova virtuale — Camerino IA gratuito | Agalaz',
      description:
        'Strumento gratuito di prova virtuale con IA. Carica la tua foto e vedi come ti sta qualsiasi capo sul corpo reale all\'istante. Riduci i resi del 80%.',
    },
  },
  'virtual-try-on': {
    en: {
      title: 'Virtual Try On Online — Free AI Try-On Tool | Agalaz',
      description:
        'Try on clothes virtually with AI. Upload your photo and see how any garment looks on your real body before buying. Free virtual try-on tool — no app needed.',
    },
    es: {
      title: 'Probador Virtual Online — Herramienta de IA Gratuita | Agalaz',
      description:
        'Pruébate ropa virtualmente con IA. Sube tu foto y ve cómo te queda cualquier prenda en tu cuerpo real antes de comprar. Sin descargar app.',
    },
    fr: {
      title: "Essayage virtuel en ligne — Outil IA gratuit | Agalaz",
      description:
        "Essayez des vêtements virtuellement avec l'IA. Téléchargez votre photo et voyez n'importe quel vêtement sur votre corps réel avant d'acheter.",
    },
    pt: {
      title: 'Provador Virtual Online — Ferramenta IA Grátis | Agalaz',
      description:
        'Experimenta roupa virtualmente com IA. Carrega a tua foto e vê qualquer peça no teu corpo real antes de comprar. Sem app necessária.',
    },
    de: {
      title: 'Virtuelle Anprobe Online — Kostenloses KI-Tool | Agalaz',
      description:
        'Probiere Kleidung virtuell mit KI an. Lade dein Foto hoch und sieh, wie jedes Kleidungsstück an deinem echten Körper aussieht — ohne App.',
    },
    it: {
      title: 'Prova virtuale online — Strumento IA gratuito | Agalaz',
      description:
        "Prova vestiti virtualmente con l'IA. Carica la tua foto e vedi come ti sta qualsiasi capo sul corpo reale prima di comprare. Senza app.",
    },
  },
  partners: {
    en: {
      title: 'Agalaz Partners — Add AI Virtual Try-On to Your Store',
      description:
        'Add an AI virtual try-on to your e-commerce store in 2 lines of code. Boost conversions and reduce returns. 7-day free trial, 50 renders included.',
    },
    es: {
      title: 'Agalaz Partners — Añade Probador Virtual con IA a tu Tienda',
      description:
        'Añade un probador virtual con IA a tu e-commerce en 2 líneas de código. Aumenta conversiones y reduce devoluciones. Prueba gratis 7 días, 50 renders incluidos.',
    },
    fr: {
      title: 'Agalaz Partners — Ajoutez un essayage virtuel IA à votre boutique',
      description:
        "Ajoutez un essayage virtuel IA à votre boutique e-commerce en 2 lignes de code. Augmentez les conversions et réduisez les retours. Essai gratuit 7 jours, 50 rendus inclus.",
    },
    pt: {
      title: 'Agalaz Partners — Adiciona Provador Virtual com IA à Tua Loja',
      description:
        'Adiciona um provador virtual com IA à tua loja em 2 linhas de código. Aumenta conversões e reduz devoluções. Teste grátis de 7 dias, 50 renders incluídos.',
    },
    de: {
      title: 'Agalaz Partners — KI-Anprobe für deinen Shop',
      description:
        'Füge eine KI-Anprobe in 2 Zeilen Code zu deinem E-Commerce hinzu. Mehr Conversion, weniger Rücksendungen. 7 Tage kostenlos, 50 Renderings inklusive.',
    },
    it: {
      title: 'Agalaz Partners — Aggiungi Prova Virtuale IA al Tuo Negozio',
      description:
        'Aggiungi una prova virtuale con IA al tuo e-commerce in 2 righe di codice. Aumenta conversioni e riduci i resi. Prova gratis 7 giorni, 50 render inclusi.',
    },
  },
};

const BASE = 'https://agalaz.com';

export function pagePathFor(page: RootPage, lang: RootLang): string {
  const slug = page === 'home' ? '' : `/${page}`;
  return lang === 'en' ? `${BASE}${slug || '/'}` : `${BASE}/${lang}${slug}`;
}

export function localizedAlternates(page: RootPage, currentLang: RootLang) {
  const langs: RootLang[] = ['en', 'es', 'fr', 'pt', 'de', 'it'];
  const languages: Record<string, string> = {};
  for (const l of langs) languages[l] = pagePathFor(page, l);
  languages['x-default'] = pagePathFor(page, 'en');
  return {
    canonical: pagePathFor(page, currentLang),
    languages,
  };
}
