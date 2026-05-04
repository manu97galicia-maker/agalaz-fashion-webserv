/**
 * Per-language SEO metadata for the 3 B2B landings (shopify, woocommerce, developers).
 * Used by the localized route stubs at /{lang}/{page}.
 *
 * Body content stays EN (the existing /shopify, /woocommerce, /developers pages target
 * English-language B2B keywords with code snippets and FAQ in EN). The localized
 * versions surface in Search Console with translated titles + descriptions, signal
 * hreflang correctly, and let non-English merchants discover the offering by search.
 */

import type { RootLang } from './rootPageMeta';

export type B2BPage = 'shopify' | 'woocommerce' | 'developers';

interface MetaEntry {
  title: string;
  description: string;
}

export const B2B_PAGE_META: Record<B2BPage, Record<RootLang, MetaEntry>> = {
  shopify: {
    en: {
      title: 'Shopify Virtual Try-On App — AI Fitting Room Widget | Agalaz',
      description:
        'Add an AI virtual try-on to your Shopify store in 2 lines of code. Auto-detects product images, works with every theme, no plugin to install. 7-day free trial.',
    },
    es: {
      title: 'App de Probador Virtual para Shopify — Widget IA | Agalaz',
      description:
        'Añade un probador virtual con IA a tu tienda Shopify en 2 líneas de código. Detecta imágenes de producto, funciona con cualquier theme, sin plugin. 7 días gratis.',
    },
    fr: {
      title: "Essayage Virtuel Shopify — Widget IA d'Essayage | Agalaz",
      description:
        "Ajoutez un essayage virtuel IA à votre boutique Shopify en 2 lignes de code. Détecte les images produit, fonctionne avec tout thème, sans extension. 7 jours gratuits.",
    },
    pt: {
      title: 'Provador Virtual para Shopify — Widget IA | Agalaz',
      description:
        'Adiciona um provador virtual com IA à tua loja Shopify em 2 linhas de código. Deteta imagens de produto, funciona com qualquer tema, sem app. 7 dias grátis.',
    },
    de: {
      title: 'Shopify Virtuelle Anprobe — KI-Anprobe-Widget | Agalaz',
      description:
        'Füge in 2 Zeilen Code eine KI-Anprobe zu deinem Shopify-Shop hinzu. Erkennt Produktbilder, funktioniert mit jedem Theme, keine App nötig. 7 Tage kostenlos.',
    },
    it: {
      title: 'App Prova Virtuale per Shopify — Widget IA | Agalaz',
      description:
        'Aggiungi una prova virtuale con IA al tuo negozio Shopify in 2 righe di codice. Rileva immagini prodotto, funziona con ogni tema, senza app. 7 giorni gratis.',
    },
  },
  woocommerce: {
    en: {
      title: 'WooCommerce Virtual Try-On Plugin — AI Fitting Room | Agalaz',
      description:
        'Add AI virtual try-on to your WooCommerce store with no plugin to install — just a snippet. Auto-detects product images. 7-day free trial, 50 renders.',
    },
    es: {
      title: 'Probador Virtual para WooCommerce — Sin Plugin | Agalaz',
      description:
        'Añade un probador virtual con IA a tu tienda WooCommerce sin instalar ningún plugin — solo un snippet. Detecta imágenes de producto. 7 días gratis, 50 renders.',
    },
    fr: {
      title: 'Essayage Virtuel WooCommerce — Sans Plugin | Agalaz',
      description:
        "Ajoutez un essayage virtuel IA à votre boutique WooCommerce sans installer de plugin — juste un snippet. Détecte les images produit. 7 jours gratuits, 50 rendus.",
    },
    pt: {
      title: 'Provador Virtual WooCommerce — Sem Plugin | Agalaz',
      description:
        'Adiciona um provador virtual com IA à tua loja WooCommerce sem instalar plugin — só um snippet. Deteta imagens de produto. 7 dias grátis, 50 renders.',
    },
    de: {
      title: 'WooCommerce Virtuelle Anprobe — Ohne Plugin | Agalaz',
      description:
        'Füge eine KI-Anprobe zu deinem WooCommerce-Shop hinzu — ohne Plugin, nur ein Snippet. Erkennt Produktbilder. 7 Tage kostenlos, 50 Renderings inklusive.',
    },
    it: {
      title: 'Prova Virtuale WooCommerce — Senza Plugin | Agalaz',
      description:
        'Aggiungi una prova virtuale con IA al tuo negozio WooCommerce senza installare plugin — solo uno snippet. Rileva immagini prodotto. 7 giorni gratis, 50 render.',
    },
  },
  developers: {
    en: {
      title: 'Virtual Try-On API for Developers — REST + JSON | Agalaz',
      description:
        'Integrate AI virtual try-on into your app with the Agalaz REST API. POST a photo + a garment, get back a photorealistic image in ~10s. Bearer-key auth, CORS-ready.',
    },
    es: {
      title: 'API de Probador Virtual para Devs — REST + JSON | Agalaz',
      description:
        'Integra probador virtual IA en tu app con la API REST de Agalaz. POST foto + prenda, recibe imagen fotorrealista en ~10s. Auth Bearer, CORS-ready.',
    },
    fr: {
      title: "API Essayage Virtuel pour Développeurs — REST + JSON | Agalaz",
      description:
        "Intégrez l'essayage virtuel IA dans votre app avec l'API REST Agalaz. POST photo + vêtement, recevez une image photoréaliste en ~10s. Auth Bearer, CORS-ready.",
    },
    pt: {
      title: 'API de Provador Virtual para Devs — REST + JSON | Agalaz',
      description:
        'Integra provador virtual IA na tua app com a API REST Agalaz. POST foto + peça, recebe imagem fotorrealista em ~10s. Auth Bearer, CORS-ready.',
    },
    de: {
      title: 'Virtuelle Anprobe API für Entwickler — REST + JSON | Agalaz',
      description:
        'Integriere die KI-Anprobe in deine App mit der Agalaz REST-API. POST Foto + Kleidungsstück, erhalte ein fotorealistisches Bild in ~10s. Bearer-Auth, CORS-ready.',
    },
    it: {
      title: 'API Prova Virtuale per Sviluppatori — REST + JSON | Agalaz',
      description:
        "Integra la prova virtuale IA nella tua app con l'API REST Agalaz. POST foto + capo, ricevi immagine fotorealistica in ~10s. Bearer-auth, CORS-ready.",
    },
  },
};

const BASE = 'https://agalaz.com';

export function b2bPagePathFor(page: B2BPage, lang: RootLang): string {
  return lang === 'en' ? `${BASE}/${page}` : `${BASE}/${lang}/${page}`;
}

export function b2bLocalizedAlternates(page: B2BPage, currentLang: RootLang) {
  const langs: RootLang[] = ['en', 'es', 'fr', 'pt', 'de', 'it'];
  const languages: Record<string, string> = {};
  for (const l of langs) languages[l] = b2bPagePathFor(page, l);
  languages['x-default'] = b2bPagePathFor(page, 'en');
  return {
    canonical: b2bPagePathFor(page, currentLang),
    languages,
  };
}
