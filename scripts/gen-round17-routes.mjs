// One-shot generator: creates page.tsx + layout.tsx for each of the 25
// round-17 KD-0 long-tail landings. All content lives in
// data/round17Landings.ts — this script wires it into the route tree.
//
// Idempotent: re-running just overwrites the route files with the latest
// metadata. Safe to re-run after editing this config.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

// Per-route metadata. The body content (FAQ, recommended, etc.) is in
// data/round17Landings.ts — here we only declare the SEO surface.
const ROUTES = [
  // ───────────────────────────────────────────────────────── EN ─────────
  {
    dir: 'nail-designs', slug: 'nail-designs', lang: 'en', loc: 'en_US',
    exportName: 'nailDesignsEN', section: 'Nail Art', og: 'virtual-nail-try-on',
    metaTitle: 'Nail Designs 2026 — AI Try-On on Your Real Hand Free',
    metaDescription: 'Nail designs 2026: try any manicure on your real hand with AI in 30 seconds. Glazed donut, milky French, chrome cherry, micro-floral. Free, no signup.',
    keywords: ['nail designs','nail designs designs','designs on nail','nail design ideas','manicure designs','nail art ideas 2026','glazed donut nails','milky french nails','chrome cherry nails','nail design simulator','try nails online','virtual nail try on'],
    breadcrumbName: 'Nail Designs',
    hreflang: { en: 'https://agalaz.com/nail-designs' },
  },
  {
    dir: 'short-haircuts-women', slug: 'short-haircuts-women', lang: 'en', loc: 'en_US',
    exportName: 'shortHaircutsWomenEN', section: 'Hair · Short Cuts', og: 'virtual-hairstyle-try-on',
    metaTitle: 'Short Haircuts for Women 2026 — AI Try-On Before the Salon',
    metaDescription: 'Short haircuts for women 2026: see Italian bob, pixie, French bob and shag on YOUR face with AI in 30 seconds. Free, no signup.',
    keywords: ['short haircuts women','short haircut for women','short hairstyles 2026','italian bob','french bob','pixie cut','wolf cut','long bob','virtual hairstyle try on','hairstyle simulator'],
    breadcrumbName: 'Short Haircuts',
  },
  {
    dir: 'bridesmaid-dress', slug: 'bridesmaid-dress', lang: 'en', loc: 'en_US',
    exportName: 'bridesmaidDressEN', section: 'Wedding · Bridesmaid', og: 'bridesmaid-dress',
    metaTitle: 'Bridesmaid Dress AI Try-On — See Any Dress on Your Body Free',
    metaDescription: 'Bridesmaid dress AI try-on: see Birdy Grey, Azazie, Revolve and ASOS dresses on YOUR body in 30 seconds. Free, no signup, no app.',
    keywords: ['bridesmaid dress','bridesmaid dresses','bridesmaid dresses 2026','birdy grey try on','azazie try on','revolve bridesmaid','sage bridesmaid dress','dusty blue bridesmaid','virtual bridesmaid dress','try on bridesmaid dress'],
    breadcrumbName: 'Bridesmaid Dress',
  },
  {
    dir: 'cocktail-dress', slug: 'cocktail-dress', lang: 'en', loc: 'en_US',
    exportName: 'cocktailDressEN', section: 'Cocktail · Dresses', og: 'wedding-guest-outfit',
    metaTitle: 'Cocktail Dress AI Try-On — See Any Dress on Your Body Free',
    metaDescription: 'Cocktail dress AI try-on: Reformation, Revolve, Zara, Mango, ASOS — see any dress on YOUR body in 30 seconds. Free, no signup.',
    keywords: ['cocktail dress','cocktail dresses','cocktail dress 2026','reformation cocktail dress','revolve cocktail dress','zara cocktail dress','satin midi dress','wrap midi dress','virtual cocktail dress try on'],
    breadcrumbName: 'Cocktail Dress',
  },
  {
    dir: 'mother-of-bride-dress', slug: 'mother-of-bride-dress', lang: 'en', loc: 'en_US',
    exportName: 'motherOfBrideDressEN', section: 'Wedding · Mother of Bride', og: 'wedding-guest-outfit',
    metaTitle: 'Mother of the Bride Dress AI Try-On — Free Virtual Try-On 2026',
    metaDescription: 'Mother of the bride dresses: try Adrianna Papell, JJ\'s House, M&S and John Lewis dresses on YOUR body with AI in 30 seconds. Free, no signup.',
    keywords: ['mother of bride dress','mother of the bride dress','mother of bride dresses 2026','adrianna papell dress','jjs house dress','john lewis mother of bride','mother of bride virtual try on'],
    breadcrumbName: 'Mother of the Bride',
  },

  // ───────────────────────────────────────────────────────── ES ─────────
  {
    dir: 'es/vestido-graduacion', slug: 'es/vestido-graduacion', lang: 'es', loc: 'es_ES',
    exportName: 'vestidoGraduacionES', section: 'Vestidos · Graduación', og: 'vestido-invitada-boda',
    metaTitle: 'Vestido de Graduación 2026 — Probador Virtual con IA Gratis',
    metaDescription: 'Vestido de graduación 2026: prueba cualquier vestido sobre tu cuerpo real con IA en 30 segundos. Zara, Mango, Bershka, Pinterest. Gratis, sin registro.',
    keywords: ['vestido graduacion','vestidos graduacion','vestido de graduacion','vestidos de graduacion','graduacion vestido','vestido graduacion 2026','vestido graduacion corto','vestido graduacion largo','probador virtual vestido','prueba virtual vestido'],
    breadcrumbName: 'Vestido Graduación',
    hreflang: { es: 'https://agalaz.com/es/vestido-graduacion', 'es-ES': 'https://agalaz.com/es/vestido-graduacion' },
  },
  {
    dir: 'es/vestido-coctel', slug: 'es/vestido-coctel', lang: 'es', loc: 'es_ES',
    exportName: 'vestidoCoctelES', section: 'Vestidos · Cóctel', og: 'vestido-invitada-boda',
    metaTitle: 'Vestido de Cóctel — Probador Virtual con IA Gratis 2026',
    metaDescription: 'Vestido de cóctel 2026: prueba cualquier vestido sobre tu cuerpo con IA en 30 segundos. Zara, Mango, Massimo Dutti, Bershka. Gratis, sin registro.',
    keywords: ['vestido coctel','vestidos coctel','vestido cocktail','vestidos cocktail','vestido coctel mujer','vestido coctel boda','vestido coctel midi','vestido coctel negro','probador virtual cóctel'],
    breadcrumbName: 'Vestido Cóctel',
  },
  {
    dir: 'es/vestido-comunion', slug: 'es/vestido-comunion', lang: 'es', loc: 'es_ES',
    exportName: 'vestidoComunionES', section: 'Vestidos · Comunión', og: 'vestito-comunione',
    metaTitle: 'Vestido de Comunión 2026 — Probador Virtual IA Gratis',
    metaDescription: 'Vestido de comunión 2026: descubre cómo le queda a tu hija con IA en 30 segundos. Mibebesito, El Corte Inglés, Pinterest. Gratis, sin registro.',
    keywords: ['vestido comunion','vestidos comunion','vestido de comunion','vestidos de comunion','vestido comunion 2026','vestido comunion princesa','vestido comunion bohemio','probador vestido comunion'],
    breadcrumbName: 'Vestido Comunión',
  },
  {
    dir: 'es/corte-de-pelo-mujer', slug: 'es/corte-de-pelo-mujer', lang: 'es', loc: 'es_ES',
    exportName: 'cortePeloMujerES', section: 'Cortes · Mujer', og: 'virtual-hairstyle-try-on',
    metaTitle: 'Corte de Pelo Mujer 2026 — Probador Virtual con IA Gratis',
    metaDescription: 'Corte de pelo mujer 2026: prueba bob, pixie, long bob y wolf cut en tu cara con IA en 30 segundos. Gratis, sin registro.',
    keywords: ['corte de pelo mujer','cortes de pelo mujer','corte de pelo mujer 2026','corte de pelo mujer 2025','corte pelo mujer','cortes de pelo mujer 2026','bob italiano','pixie corto','probador virtual corte pelo','simulador de cortes'],
    breadcrumbName: 'Corte Pelo Mujer',
  },
  {
    dir: 'es/melena-larga', slug: 'es/melena-larga', lang: 'es', loc: 'es_ES',
    exportName: 'melenaLargaES', section: 'Cortes · Melena', og: 'virtual-hairstyle-try-on',
    metaTitle: 'Melena Larga — Prueba Virtual con IA Antes de las Extensiones',
    metaDescription: 'Antes de invertir 600€ en extensiones, prueba la melena larga en tu cara con IA en 30 segundos. Distintos largos, capas y colores. Gratis.',
    keywords: ['melena larga','melena larga mujer','melena larga 2026','melena larga capas','melena hasta cintura','extensiones de pelo','probador virtual melena','simulador pelo largo'],
    breadcrumbName: 'Melena Larga',
  },

  // ───────────────────────────────────────────────────────── PT ─────────
  {
    dir: 'pt/vestido-madrinha-casamento', slug: 'pt/vestido-madrinha-casamento', lang: 'pt', loc: 'pt_BR',
    exportName: 'vestidoMadrinhaPT', section: 'Casamento · Madrinha', og: 'bridesmaid-dress',
    metaTitle: 'Vestido de Madrinha de Casamento 2026 — Provador Virtual IA',
    metaDescription: 'Vestido de madrinha 2026: experimenta qualquer vestido no teu corpo com IA em 30 segundos. AMARO, Animale, Renner, Schutz. Grátis, sem cadastro.',
    keywords: ['vestido madrinha casamento','vestidos madrinha casamento','vestido madrinha','vestido madrinha azul','vestido madrinha rosa','vestido madrinha verde','vestido madrinha civil','provador virtual madrinha'],
    breadcrumbName: 'Vestido Madrinha',
    hreflang: { pt: 'https://agalaz.com/pt/vestido-madrinha-casamento', 'pt-BR': 'https://agalaz.com/pt/vestido-madrinha-casamento' },
  },
  {
    dir: 'pt/unhas-em-gel-decoradas', slug: 'pt/unhas-em-gel-decoradas', lang: 'pt', loc: 'pt_BR',
    exportName: 'unhasGelDecoradasPT', section: 'Unhas · Gel Decoradas', og: 'virtual-nail-try-on',
    metaTitle: 'Unhas em Gel Decoradas 2026 — Provador Virtual com IA Grátis',
    metaDescription: 'Unhas em gel decoradas 2026: experimenta qualquer design na tua mão real com IA em 30 segundos. Glazed donut, francesinha, chrome. Grátis.',
    keywords: ['unhas em gel decoradas','unhas decoradas em gel','unhas em gel','unhas em.gel decoradas','unhas decoradas','unhas em gel curtas','unhas em gel coloridas','unhas em gel 2026','provador unhas em gel'],
    breadcrumbName: 'Unhas em Gel',
  },
  {
    dir: 'pt/corte-cabelo-curto-feminino', slug: 'pt/corte-cabelo-curto-feminino', lang: 'pt', loc: 'pt_BR',
    exportName: 'corteCurtoFeminPT', section: 'Cortes · Curto Feminino', og: 'virtual-hairstyle-try-on',
    metaTitle: 'Corte de Cabelo Curto Feminino 2026 — Provador Virtual IA',
    metaDescription: 'Corte de cabelo curto feminino 2026: experimenta chanel, pixie, long bob na tua cara com IA em 30 segundos. Grátis, sem cadastro.',
    keywords: ['corte cabelo curto feminino','corte de cabelo curto feminino','corte de cabelo curtíssimo feminino','corte feminino de cabelo curto','corte chanel feminino','pixie feminino','corte bob feminino','provador corte curto'],
    breadcrumbName: 'Corte Curto Feminino',
  },
  {
    dir: 'pt/vestido-casamento-civil', slug: 'pt/vestido-casamento-civil', lang: 'pt', loc: 'pt_BR',
    exportName: 'vestidoCasamentoCivilPT', section: 'Casamento · Civil', og: 'wedding-guest-outfit',
    metaTitle: 'Vestido Casamento Civil 2026 — Provador Virtual IA Grátis',
    metaDescription: 'Vestido casamento civil 2026: experimenta o vestido no teu corpo com IA em 30 segundos. AMARO, Renner, Animale. Grátis, sem cadastro.',
    keywords: ['vestido casamento civil','vestido para casamento civil','vestido de casamento civil','vestido casamento civil curto','vestido casamento civil branco','vestido casamento dia','provador casamento civil'],
    breadcrumbName: 'Casamento Civil',
  },
  {
    dir: 'pt/unhas-francesinha', slug: 'pt/unhas-francesinha', lang: 'pt', loc: 'pt_BR',
    exportName: 'unhasFrancesinhaPT', section: 'Unhas · Francesinha', og: 'virtual-nail-try-on',
    metaTitle: 'Unhas Francesinha 2026 — Provador Virtual com IA Grátis',
    metaDescription: 'Francesinha clássica, leitosa, micro, colorida — experimenta cada estilo na tua mão com IA em 30 segundos. Grátis, sem cadastro.',
    keywords: ['unhas francesinha','francesinha unhas','unhas francesinha 2026','unhas francesinha leitosa','unhas francesinha colorida','unhas francesinha micro','francesinha invertida','provador francesinha'],
    breadcrumbName: 'Francesinha',
  },

  // ───────────────────────────────────────────────────────── FR ─────────
  {
    dir: 'fr/robe-de-soiree', slug: 'fr/robe-de-soiree', lang: 'fr', loc: 'fr_FR',
    exportName: 'robeDeSoireeFR', section: 'Robes · Soirée', og: 'wedding-guest-outfit',
    metaTitle: 'Robe de Soirée 2026 — Essayage Virtuel IA Gratuit',
    metaDescription: 'Robe de soirée 2026 : essayez n\'importe quelle robe sur votre corps réel avec IA en 30 sec. Sézane, Sandro, Maje, Pinterest. Gratuit, sans inscription.',
    keywords: ['robe de soirée','robe soirée','robe de soiree','robe de soiree longue','robe de soiree midi','robe de soirée sézane','robe de soirée sandro','essayage virtuel robe soirée','robe de soirée 2026'],
    breadcrumbName: 'Robe de Soirée',
    hreflang: { fr: 'https://agalaz.com/fr/robe-de-soiree', 'fr-FR': 'https://agalaz.com/fr/robe-de-soiree', 'fr-BE': 'https://agalaz.com/fr/robe-de-soiree', 'fr-CA': 'https://agalaz.com/fr/robe-de-soiree' },
  },
  {
    dir: 'fr/robe-cocktail', slug: 'fr/robe-cocktail', lang: 'fr', loc: 'fr_FR',
    exportName: 'robeCocktailFR', section: 'Robes · Cocktail', og: 'wedding-guest-outfit',
    metaTitle: 'Robe Cocktail 2026 — Essayage Virtuel IA Gratuit',
    metaDescription: 'Robe cocktail 2026 : essayez n\'importe quelle robe sur votre corps avec IA en 30 sec. Sandro, Maje, Sézane. Gratuit, sans inscription.',
    keywords: ['robe cocktail','robes cocktail','robe cocktail mariage','robe cocktail femme','robe cocktail midi','robe cocktail noire','essayage virtuel cocktail','robe cocktail 2026'],
    breadcrumbName: 'Robe Cocktail',
  },
  {
    dir: 'fr/robe-communion', slug: 'fr/robe-communion', lang: 'fr', loc: 'fr_FR',
    exportName: 'robeCommunionFR', section: 'Communion · Robe', og: 'vestito-comunione',
    metaTitle: 'Robe de Communion 2026 — Essayage Virtuel IA Gratuit',
    metaDescription: 'Robe de communion 2026 : voyez la robe sur votre enfant avec IA en 30 sec. Cyrillus, Jacadi, marques spécialisées. Gratuit, sans inscription.',
    keywords: ['robe de communion','robe communion','robe de communion fille','robe communion 2026','robe communion princesse','robe communion bohème','essayage robe communion'],
    breadcrumbName: 'Robe Communion',
  },
  {
    dir: 'fr/manucure', slug: 'fr/manucure', lang: 'fr', loc: 'fr_FR',
    exportName: 'manucureFR', section: 'Ongles · Manucure', og: 'virtual-nail-try-on',
    metaTitle: 'Manucure 2026 — Essayage Virtuel IA sur Votre Main Gratuit',
    metaDescription: 'Manucure 2026 : essayez n\'importe quel design sur votre main réelle avec IA en 30 sec. Glazed donut, french laiteuse, chrome cerise. Gratuit.',
    keywords: ['manucure','manucure 2026','manucure simple','manucure française','glazed donut nails','manucure chrome','manucure pinterest','essayage manucure virtuel'],
    breadcrumbName: 'Manucure',
  },
  {
    dir: 'fr/robe-demoiselle-honneur', slug: 'fr/robe-demoiselle-honneur', lang: 'fr', loc: 'fr_FR',
    exportName: 'robeDemoiselleHonneurFR', section: 'Mariage · Demoiselle d\'honneur', og: 'bridesmaid-dress',
    metaTitle: 'Robe Demoiselle d\'Honneur 2026 — Essayage Virtuel IA Gratuit',
    metaDescription: 'Robe demoiselle d\'honneur 2026 : essayez la robe sur votre corps avec IA en 30 sec. Pronovias, ASOS, Sézane. Gratuit, sans inscription.',
    keywords: ['robe demoiselle d\'honneur','robe demoiselle honneur','robe demoiselle','robes demoiselle d\'honneur 2026','robe demoiselle pronovias','essayage robe demoiselle','robe sage demoiselle'],
    breadcrumbName: 'Demoiselle d\'honneur',
  },

  // ───────────────────────────────────────────────────────── IT ─────────
  {
    dir: 'it/unghie-estate', slug: 'it/unghie-estate', lang: 'it', loc: 'it_IT',
    exportName: 'unghieEstateIT', section: 'Unghie · Estate', og: 'virtual-nail-try-on',
    metaTitle: 'Unghie Estate 2026 — Provatore Virtuale con IA Gratis',
    metaDescription: 'Unghie estate 2026: prova qualsiasi design sulla tua mano con IA in 30 sec. Mojito, glazed donut, french lattea, chrome ciliegia. Gratis.',
    keywords: ['unghie estate','unghie estate 2026','unghie estate 2025','unghie estive','unghie estate corte','unghie estate gel','unghie mojito','unghie chrome','provatore unghie estate'],
    breadcrumbName: 'Unghie Estate',
    hreflang: { it: 'https://agalaz.com/it/unghie-estate', 'it-IT': 'https://agalaz.com/it/unghie-estate' },
  },
  {
    dir: 'it/taglio-corto-capelli-donna', slug: 'it/taglio-corto-capelli-donna', lang: 'it', loc: 'it_IT',
    exportName: 'taglioCortoCapelliDonnaIT', section: 'Capelli · Taglio Corto', og: 'virtual-hairstyle-try-on',
    metaTitle: 'Taglio Corto Capelli Donna 2026 — Provatore Virtuale IA Gratis',
    metaDescription: 'Taglio corto capelli donna 2026: prova bob, pixie, long bob sul tuo viso con IA in 30 sec. Gratis, senza registrazione.',
    keywords: ['taglio corto capelli donna','tagli corti capelli donna','taglio capelli corto donna','taglio corto donna 2026','bob italiano','pixie corto','long bob','provatore virtuale taglio corto'],
    breadcrumbName: 'Taglio Corto Donna',
  },
  {
    dir: 'it/vestito-da-sera', slug: 'it/vestito-da-sera', lang: 'it', loc: 'it_IT',
    exportName: 'vestitoDaSeraIT', section: 'Vestiti · Sera', og: 'wedding-guest-outfit',
    metaTitle: 'Vestito da Sera 2026 — Provatore Virtuale con IA Gratis',
    metaDescription: 'Vestito da sera 2026: prova qualsiasi vestito sul tuo corpo reale con IA in 30 sec. Pinko, Liu Jo, Twin-Set, Maliparmi. Gratis.',
    keywords: ['vestito da sera','vestiti da sera','vestito da sera lungo','vestito da sera midi','vestito da sera nero','vestito da sera pinko','vestito da sera liu jo','provatore vestito da sera'],
    breadcrumbName: 'Vestito da Sera',
  },
  {
    dir: 'it/vestito-laurea', slug: 'it/vestito-laurea', lang: 'it', loc: 'it_IT',
    exportName: 'vestitoLaureaIT', section: 'Vestiti · Laurea', og: 'wedding-guest-outfit',
    metaTitle: 'Vestito per Laurea 2026 — Provatore Virtuale IA Gratis',
    metaDescription: 'Vestito per laurea 2026: prova qualsiasi vestito sul tuo corpo con IA in 30 sec. Zara, Pinko, Liu Jo, Mango. Gratis, senza registrazione.',
    keywords: ['vestito laurea','vestito da laurea','vestito per laurea','vestito laurea triennale','vestito laurea magistrale','vestito laurea elegante','tubino laurea','provatore vestito laurea'],
    breadcrumbName: 'Vestito Laurea',
  },
  {
    dir: 'it/unghie-francesi', slug: 'it/unghie-francesi', lang: 'it', loc: 'it_IT',
    exportName: 'unghieFrancesiIT', section: 'Unghie · French', og: 'virtual-nail-try-on',
    metaTitle: 'Unghie Francesi 2026 — Provatore Virtuale con IA Gratis',
    metaDescription: 'Unghie francesi 2026: prova classica, lattea, micro, colorata, invertita sulla tua mano con IA in 30 sec. Gratis, senza registrazione.',
    keywords: ['unghie francesi','unghie francesina','french manicure','unghie francesi classiche','unghie francesi colorate','unghie francesi micro','unghie francesi 2026','provatore french'],
    breadcrumbName: 'Unghie Francesi',
  },
];

const HREFLANG_DEFAULTS = {
  en: { en: '{url}', 'en-US': '{url}', 'en-GB': '{url}', 'x-default': '{url}' },
  es: { es: '{url}', 'es-ES': '{url}', 'x-default': '{url}' },
  pt: { pt: '{url}', 'pt-BR': '{url}', 'x-default': '{url}' },
  fr: { fr: '{url}', 'fr-FR': '{url}', 'x-default': '{url}' },
  it: { it: '{url}', 'it-IT': '{url}', 'x-default': '{url}' },
  de: { de: '{url}', 'de-DE': '{url}', 'x-default': '{url}' },
};

const TRY_ON_LABELS = {
  en: 'Virtual Try-On', es: 'Prueba virtual', pt: 'Provador virtual',
  fr: 'Essayage virtuel', it: 'Provatore virtuale', de: 'Virtuelle Anprobe',
};

const HOME_LABELS = {
  en: 'Home', es: 'Inicio', pt: 'Início', fr: 'Accueil', it: 'Home', de: 'Start',
};

const TRY_ON_BASE = {
  en: 'https://agalaz.com/try-on',
  es: 'https://agalaz.com/es/try-on',
  pt: 'https://agalaz.com/pt/try-on',
  fr: 'https://agalaz.com/fr/try-on',
  it: 'https://agalaz.com/it/try-on',
  de: 'https://agalaz.com/de/try-on',
};

const LANG_INLINE = {
  en: 'en-US', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR', it: 'it-IT', de: 'de-DE',
};

function buildAlternates(route, url) {
  const defaults = HREFLANG_DEFAULTS[route.lang];
  const out = {};
  for (const [k, v] of Object.entries(route.hreflang ?? defaults)) {
    out[k] = v.replace('{url}', url);
  }
  return out;
}

function pageContent(route) {
  return `import LongtailLandingTemplate from '@/components/landing/LongtailLandingTemplate';
import { ${route.exportName} } from '@/data/round17Landings';

export const revalidate = 86400;

export default function Page() {
  return <LongtailLandingTemplate content={${route.exportName}} />;
}
`;
}

function escTs(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function layoutContent(route) {
  const url = 'https://agalaz.com/' + route.slug;
  const alts = buildAlternates(route, url);
  const altsStr = Object.entries(alts).map(([k, v]) => `'${k}': '${v}'`).join(', ');
  const keywords = route.keywords.map((k) => `    '${escTs(k)}',`).join('\n');
  const altLine = `${route.breadcrumbName} — Agalaz`;
  return `import type { Metadata } from 'next';
import { ${route.exportName} as data } from '@/data/round17Landings';

const url = '${url}';
const metaTitle = '${escTs(route.metaTitle)}';
const metaDescription =
  '${escTs(route.metaDescription)}';
const keywords = [
${keywords}
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { ${altsStr} },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: '${route.loc}',
    images: [{ url: '/og/${route.og}.png', width: 1200, height: 630, alt: '${escTs(altLine)}' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/${route.og}.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: metaTitle,
        description: metaDescription,
        url,
        datePublished: '2026-05-17',
        dateModified: '2026-05-17',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: '${escTs(route.section)}',
        inLanguage: '${LANG_INLINE[route.lang]}',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: '${HOME_LABELS[route.lang]}', item: 'https://agalaz.com${route.lang === 'en' ? '' : '/' + route.lang}' },
        { '@type': 'ListItem', position: 2, name: '${TRY_ON_LABELS[route.lang]}', item: '${TRY_ON_BASE[route.lang]}' },
        { '@type': 'ListItem', position: 3, name: '${escTs(route.breadcrumbName)}', item: url },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
`;
}

let created = 0;
for (const route of ROUTES) {
  const dir = path.join(ROOT, 'app', route.dir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent(route));
  fs.writeFileSync(path.join(dir, 'layout.tsx'), layoutContent(route));
  created++;
  console.log('  ✓ app/' + route.dir + '/  (' + route.exportName + ')');
}
console.log('\nGenerated ' + created + ' route pairs.');
