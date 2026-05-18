'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, Sparkles, Loader2, X, ArrowRight, Download, Clock } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { signInWithGoogle, signInWithOtp } from '@/services/authService';
import { track } from '@/lib/analytics';
import { applyWatermark } from '@/lib/watermark';

export type DemoLang = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it';
export type DemoCategory =
  | 'tattoo'
  | 'clothing'
  | 'jewelry'
  | 'glasses'
  | 'hat'
  | 'shoes'
  | 'bag'
  | 'nail'
  | 'pet-clothing'
  | 'baby-clothing'
  | 'costume'
  | 'hairstyle'
  | 'cosplay';

/**
 * Optional preset product for the right-hand side of the demo. When provided
 * (typically 2 per landing), the user can pick one with a single tap instead
 * of having to source their own reference image — collapsing the funnel from
 * 2 uploads to 1. "+ Custom" always remains as the third option.
 */
export interface DemoPreset {
  /** Public URL of the product image (e.g. '/images/presets/nail-1.png'). */
  src: string;
  /** Short label shown under the thumbnail (per-language). */
  label: string;
  /** Optional SEO-friendly alt text for the image (Google Image search +
   *  accessibility). When omitted, PresetPicker constructs a default
   *  combining label + landing context + brand. */
  alt?: string;
}

/**
 * Identifier for the topical theme of a landing — picked over plain category
 * when we want more specific presets (e.g. wedding-dress instead of generic
 * clothing). Set on a LongtailContent.theme field or passed as a prop.
 */
export type PresetTheme =
  | 'wedding-dress' | 'wedding-guest' | 'bridesmaid' | 'veil'
  | 'nail-decorated' | 'nail-elegant' | 'chrome-nails' | 'coquette-nails'
  | 'glasses'
  | 'hairstyle-feminine' | 'face-round-haircut' | 'curtain-bangs' | 'wolf-cut' | 'wig'
  | 'jewelry' | 'engagement-ring' | 'earrings'
  | 'mens-suit'
  | 'pet-clothing' | 'baby-clothing'
  | 'costume' | 'cosplay' | 'carnival-costume' | 'halloween-couples'
  | 'bikini' | 'tattoo' | 'makeup-natural'
  | 'saree' | 'lehenga' | 'hanbok' | 'kimono' | 'qipao'
  | 'festa-junina' | 'zara-fashion';

/**
 * Category → 2 ready-made presets, with 6-language labels.
 * Images generated 2026-05-16 via scripts/generate-preset-images.mjs
 * (gemini-3.1-flash-image-preview text-to-image). Lets every landing using
 * TryOnDemoBlock pick up presets automatically — no per-page wiring needed
 * unless a page wants to override via the `presets` prop.
 */
type PresetLabels = Record<DemoLang, string>;
type CategoryPresets = Array<{ src: string; labels: PresetLabels }>;

const CATEGORY_PRESETS: Partial<Record<DemoCategory, CategoryPresets>> = {
  nail: [
    { src: '/images/presets/nail-1.png', labels: { en: 'Pink floral', es: 'Floral rosa', fr: 'Floral rose', pt: 'Rosa floral', de: 'Rosa floral', it: 'Floreale rosa' } },
    { src: '/images/presets/nail-2.png', labels: { en: 'French glitter', es: 'Francesa glitter', fr: 'French paillettes', pt: 'Francesinha glitter', de: 'French Glitter', it: 'French glitter' } },
  ],
  clothing: [
    { src: '/images/presets/clothing-1.png', labels: { en: 'Beige blazer', es: 'Blazer beige', fr: 'Blazer beige', pt: 'Blazer bege', de: 'Beige Blazer', it: 'Blazer beige' } },
    { src: '/images/presets/clothing-2.png', labels: { en: 'Black midi dress', es: 'Vestido midi negro', fr: 'Robe midi noire', pt: 'Vestido midi preto', de: 'Schwarzes Midikleid', it: 'Abito midi nero' } },
  ],
  glasses: [
    { src: '/images/presets/glasses-1.png', labels: { en: 'Rectangle black', es: 'Rectangulares negras', fr: 'Rectangulaires noires', pt: 'Retangulares pretas', de: 'Eckig schwarz', it: 'Rettangolari nere' } },
    { src: '/images/presets/glasses-2.png', labels: { en: 'Gold aviator', es: 'Aviador dorado', fr: 'Aviateur doré', pt: 'Aviador dourado', de: 'Pilotenbrille gold', it: 'Aviatore oro' } },
  ],
  hairstyle: [
    { src: '/images/presets/hairstyle-1.png', labels: { en: 'Long bob bangs', es: 'Long bob flequillo', fr: 'Long bob frange', pt: 'Long bob com franja', de: 'Long Bob Pony', it: 'Long bob frangia' } },
    { src: '/images/presets/hairstyle-2.png', labels: { en: 'Short pixie', es: 'Pixie corto', fr: 'Pixie court', pt: 'Pixie curto', de: 'Pixie kurz', it: 'Pixie corto' } },
  ],
  jewelry: [
    { src: '/images/presets/jewelry-1.png', labels: { en: 'Gold heart chain', es: 'Cadena corazón oro', fr: 'Chaîne cœur or', pt: 'Corrente coração ouro', de: 'Gold Herzkette', it: 'Catenina cuore oro' } },
    { src: '/images/presets/jewelry-2.png', labels: { en: 'Diamond studs', es: 'Brillantes diamante', fr: 'Clous diamant', pt: 'Brincos diamante', de: 'Diamantstecker', it: 'Punti diamante' } },
  ],
  costume: [
    { src: '/images/presets/costume-1.png', labels: { en: 'Witch classic', es: 'Bruja clásica', fr: 'Sorcière classique', pt: 'Bruxa clássica', de: 'Klassische Hexe', it: 'Strega classica' } },
    { src: '/images/presets/costume-2.png', labels: { en: 'Vampire cape', es: 'Vampiro con capa', fr: 'Vampire cape', pt: 'Vampiro com capa', de: 'Vampir mit Umhang', it: 'Vampiro con mantello' } },
  ],
  cosplay: [
    { src: '/images/presets/cosplay-1.png', labels: { en: 'Anime school', es: 'Anime escolar', fr: 'Anime école', pt: 'Anime escolar', de: 'Anime Schule', it: 'Anime scuola' } },
    { src: '/images/presets/cosplay-2.png', labels: { en: 'Fantasy elf', es: 'Elfo fantasía', fr: 'Elfe fantasy', pt: 'Elfo de fantasia', de: 'Fantasy-Elf', it: 'Elfo fantasy' } },
  ],
  // mens-suit, pet-clothing, baby-clothing, and wedding-dress (NOT a DemoCategory
  // — wedding dress uses 'clothing' category) get added here once the matching
  // PNG files land in public/images/presets/.
  'pet-clothing': [
    { src: '/images/presets/pet-clothing-1.png', labels: { en: 'Yellow raincoat', es: 'Capa de lluvia', fr: 'Imperméable jaune', pt: 'Capa de chuva', de: 'Regenmantel', it: 'Impermeabile' } },
    { src: '/images/presets/pet-clothing-2.png', labels: { en: 'Plaid bandana', es: 'Bandana cuadros', fr: 'Bandana à carreaux', pt: 'Bandana xadrez', de: 'Karo-Bandana', it: 'Bandana scozzese' } },
  ],
  'baby-clothing': [
    { src: '/images/presets/baby-clothing-1.png', labels: { en: 'Star romper', es: 'Pelele estrellas', fr: 'Combinaison étoiles', pt: 'Macacão estrelas', de: 'Sternen-Strampler', it: 'Tutina stelle' } },
    { src: '/images/presets/baby-clothing-2.png', labels: { en: 'Pink knit set', es: 'Conjunto punto rosa', fr: 'Ensemble tricot rose', pt: 'Conjunto tricô rosa', de: 'Strickset rosa', it: 'Completo maglia rosa' } },
  ],
};

/**
 * Theme → 2 thematic presets. Used when a landing wants more specific
 * imagery than its DemoCategory can express (e.g. "wedding-dress" is a more
 * focused theme than the broader "clothing" category). Themes reuse Phase 1
 * per-landing images where possible and supplement with Phase 2 universal
 * images (theme-*.png) where the topic is shared across languages.
 *
 * Resolution order in TryOnDemoBlock:
 *   1. explicit `presets` prop
 *   2. `theme` prop / LongtailContent.theme → THEME_PRESETS lookup
 *   3. `category` prop → CATEGORY_PRESETS fallback
 *   4. no presets → classic single-dropzone upload
 */
const THEME_PRESETS: Record<PresetTheme, CategoryPresets> = {
  'wedding-dress': [
    { src: '/images/presets/pt-vestido-de-noiva-mermaid-lace-ivory.png', labels: { en: 'Mermaid lace', es: 'Sirena de encaje', fr: 'Sirène dentelle', pt: 'Sereia em renda', de: 'Meerjungfrau Spitze', it: 'Sirena pizzo' } },
    { src: '/images/presets/pt-vestido-de-noiva-princess-tulle-aline.png', labels: { en: 'Princess tulle', es: 'Princesa de tul', fr: 'Princesse tulle', pt: 'Princesa em tule', de: 'Prinzessin Tüll', it: 'Principessa tulle' } },
  ],
  'wedding-guest': [
    { src: '/images/presets/es-vestido-invitada-boda-satin-emerald-midi.png', labels: { en: 'Emerald satin midi', es: 'Satén esmeralda midi', fr: 'Satin émeraude midi', pt: 'Cetim esmeralda midi', de: 'Satin smaragd midi', it: 'Raso smeraldo midi' } },
    { src: '/images/presets/es-vestido-invitada-boda-lilac-tulle-floral-long.png', labels: { en: 'Lilac tulle floral', es: 'Lila tul floral', fr: 'Lilas tulle floral', pt: 'Lilás tule floral', de: 'Lila Tüll floral', it: 'Lilla tulle floreale' } },
  ],
  bridesmaid: [
    { src: '/images/presets/es-vestido-invitada-boda-satin-emerald-midi.png', labels: { en: 'Sage satin', es: 'Salvia satén', fr: 'Sauge satin', pt: 'Sálvia cetim', de: 'Salbei Satin', it: 'Salvia raso' } },
    { src: '/images/presets/es-vestido-invitada-boda-lilac-tulle-floral-long.png', labels: { en: 'Lilac tulle', es: 'Lila tul', fr: 'Lilas tulle', pt: 'Lilás tule', de: 'Lila Tüll', it: 'Lilla tulle' } },
  ],
  veil: [
    { src: '/images/presets/theme-veil-cathedral-lace-trim.png', labels: { en: 'Cathedral lace', es: 'Catedral con encaje', fr: 'Cathédrale dentelle', pt: 'Catedral com renda', de: 'Kathedrale Spitze', it: 'Cattedrale pizzo' } },
    { src: '/images/presets/theme-veil-birdcage-vintage.png', labels: { en: 'Birdcage vintage', es: 'Velo birdcage vintage', fr: 'Birdcage vintage', pt: 'Birdcage vintage', de: 'Birdcage Vintage', it: 'Birdcage vintage' } },
  ],
  'nail-decorated': [
    { src: '/images/presets/nail-1.png', labels: { en: 'Pink floral', es: 'Floral rosa', fr: 'Floral rose', pt: 'Rosa floral', de: 'Rosa floral', it: 'Floreale rosa' } },
    { src: '/images/presets/nail-2.png', labels: { en: 'French glitter', es: 'Francesa glitter', fr: 'French paillettes', pt: 'Francesinha glitter', de: 'French Glitter', it: 'French glitter' } },
  ],
  'nail-elegant': [
    { src: '/images/presets/es-disenos-de-unas-gel-french-pearl-accent.png', labels: { en: 'Pearl french gel', es: 'Francesa gel perla', fr: 'French gel perles', pt: 'Francesa gel pérola', de: 'French Gel Perle', it: 'French gel perla' } },
    { src: '/images/presets/es-disenos-de-unas-chrome-mirror-silver.png', labels: { en: 'Chrome mirror silver', es: 'Cromado espejo plata', fr: 'Chrome miroir argent', pt: 'Cromado espelho prata', de: 'Chrom Spiegel Silber', it: 'Cromato specchio argento' } },
  ],
  'chrome-nails': [
    { src: '/images/presets/theme-chrome-nails-mirror-silver-chrome.png', labels: { en: 'Mirror silver chrome', es: 'Cromado espejo plata', fr: 'Chrome miroir argent', pt: 'Cromado espelho prata', de: 'Chrom Spiegel Silber', it: 'Specchio cromato argento' } },
    { src: '/images/presets/theme-chrome-nails-rose-gold-pastel-chrome.png', labels: { en: 'Rose gold chrome', es: 'Cromado oro rosa', fr: 'Chrome or rose', pt: 'Cromado ouro rosa', de: 'Roségold Chrom', it: 'Cromato oro rosa' } },
  ],
  'coquette-nails': [
    { src: '/images/presets/theme-coquette-nails-pink-bows-pearls.png', labels: { en: 'Pink bows + pearls', es: 'Lacitos rosas + perlas', fr: 'Nœuds roses + perles', pt: 'Lacinhos rosa + pérolas', de: 'Rosa Schleifen + Perlen', it: 'Fiocchi rosa + perle' } },
    { src: '/images/presets/theme-coquette-nails-milky-white-hearts.png', labels: { en: 'Milky white hearts', es: 'Blanco lechoso corazones', fr: 'Blanc laiteux cœurs', pt: 'Branco leitoso corações', de: 'Milchweiß Herzen', it: 'Bianco latte cuori' } },
  ],
  glasses: [
    { src: '/images/presets/glasses-1.png', labels: { en: 'Rectangle black', es: 'Rectangulares negras', fr: 'Rectangulaires noires', pt: 'Retangulares pretas', de: 'Eckig schwarz', it: 'Rettangolari nere' } },
    { src: '/images/presets/glasses-2.png', labels: { en: 'Gold aviator', es: 'Aviador dorado', fr: 'Aviateur doré', pt: 'Aviador dourado', de: 'Pilotenbrille gold', it: 'Aviatore oro' } },
  ],
  'hairstyle-feminine': [
    { src: '/images/presets/pt-corte-de-cabelo-feminino-chanel-bob-brown-bangs.png', labels: { en: 'Bob with bangs', es: 'Chanel con flequillo', fr: 'Carré frange', pt: 'Chanel com franja', de: 'Bob mit Pony', it: 'Bob con frangia' } },
    { src: '/images/presets/pt-corte-de-cabelo-feminino-long-layers-curtain-bangs.png', labels: { en: 'Long layers + curtain bangs', es: 'Capas largas + flequillo cortina', fr: 'Longues couches + frange rideau', pt: 'Camadas longas + franja cortina', de: 'Lange Stufen + Vorhang-Pony', it: 'Strati lunghi + frangia tendina' } },
  ],
  'face-round-haircut': [
    { src: '/images/presets/theme-face-round-haircut-long-bob-side-part.png', labels: { en: 'Long bob side part', es: 'Long bob raya lateral', fr: 'Long bob raie côté', pt: 'Long bob risca lateral', de: 'Long Bob Seitenscheitel', it: 'Long bob riga laterale' } },
    { src: '/images/presets/theme-face-round-haircut-medium-shag-bangs.png', labels: { en: 'Medium shag + bangs', es: 'Shag medio + flequillo', fr: 'Shag mi-long + frange', pt: 'Shag médio + franja', de: 'Shag mittel + Pony', it: 'Shag medio + frangia' } },
  ],
  'curtain-bangs': [
    { src: '/images/presets/theme-curtain-bangs-long-hair-curtain-bangs.png', labels: { en: 'Long + curtain bangs', es: 'Largo + flequillo cortina', fr: 'Longs + frange rideau', pt: 'Longo + franja cortina', de: 'Lang + Vorhang-Pony', it: 'Lunghi + frangia tendina' } },
    { src: '/images/presets/theme-curtain-bangs-short-bob-curtain-bangs.png', labels: { en: 'Short bob + curtain bangs', es: 'Bob corto + flequillo cortina', fr: 'Carré court + frange rideau', pt: 'Bob curto + franja cortina', de: 'Kurzer Bob + Vorhang-Pony', it: 'Bob corto + frangia tendina' } },
  ],
  'wolf-cut': [
    { src: '/images/presets/theme-wolf-cut-wolf-cut-shaggy-layers.png', labels: { en: 'Shaggy layers wolf', es: 'Wolf cut shag', fr: 'Wolf cut shag', pt: 'Wolf cut em camadas', de: 'Wolf Cut Shaggy', it: 'Wolf cut a strati' } },
    { src: '/images/presets/theme-wolf-cut-wolf-cut-asian-soft.png', labels: { en: 'Soft asian wolf', es: 'Wolf cut asiático suave', fr: 'Wolf cut asiatique doux', pt: 'Wolf cut asiático suave', de: 'Asian Wolf Cut weich', it: 'Wolf cut asiatico soft' } },
  ],
  wig: [
    { src: '/images/presets/theme-wig-lace-front-long-straight.png', labels: { en: 'Lace-front long straight', es: 'Lace-front largo liso', fr: 'Lace-front long lisse', pt: 'Lace-front longo liso', de: 'Lace-Front lang glatt', it: 'Lace-front lungo liscio' } },
    { src: '/images/presets/theme-wig-curly-afro-shoulder.png', labels: { en: 'Curly afro shoulder', es: 'Afro rizado hombro', fr: 'Afro bouclé épaules', pt: 'Afro encaracolado ombro', de: 'Lockiges Afro Schulter', it: 'Afro riccio spalla' } },
  ],
  jewelry: [
    { src: '/images/presets/jewelry-1.png', labels: { en: 'Gold heart chain', es: 'Cadena corazón oro', fr: 'Chaîne cœur or', pt: 'Corrente coração ouro', de: 'Gold Herzkette', it: 'Catenina cuore oro' } },
    { src: '/images/presets/jewelry-2.png', labels: { en: 'Diamond studs', es: 'Brillantes diamante', fr: 'Clous diamant', pt: 'Brincos diamante', de: 'Diamantstecker', it: 'Punti diamante' } },
  ],
  'engagement-ring': [
    { src: '/images/presets/theme-engagement-ring-solitaire-1ct-white-gold.png', labels: { en: 'Solitaire 1ct white gold', es: 'Solitario 1ct oro blanco', fr: 'Solitaire 1ct or blanc', pt: 'Solitário 1ct ouro branco', de: 'Solitär 1ct Weißgold', it: 'Solitario 1ct oro bianco' } },
    { src: '/images/presets/theme-engagement-ring-halo-pave-rose-gold.png', labels: { en: 'Halo + pavé rose gold', es: 'Halo + pavé oro rosa', fr: 'Halo + pavé or rose', pt: 'Halo + pavê ouro rosa', de: 'Halo + Pavé Roségold', it: 'Halo + pavé oro rosa' } },
  ],
  earrings: [
    { src: '/images/presets/theme-earrings-pearl-drop-studs.png', labels: { en: 'Pearl drop earrings', es: 'Pendientes perla', fr: 'Boucles perles pendantes', pt: 'Brincos pérola pendentes', de: 'Perlentropfen-Ohrringe', it: 'Orecchini perla pendenti' } },
    { src: '/images/presets/theme-earrings-gold-hoops-medium.png', labels: { en: 'Gold hoops', es: 'Aros oro', fr: 'Créoles or', pt: 'Argolas ouro', de: 'Gold-Creolen', it: 'Cerchi oro' } },
  ],
  'mens-suit': [
    { src: '/images/presets/mens-suit-1.png', labels: { en: 'Navy 2-piece suit', es: 'Traje azul marino 2 piezas', fr: 'Costume bleu marine 2 pièces', pt: 'Fato azul marinho 2 peças', de: 'Marineblau 2-teiliger Anzug', it: 'Abito blu navy 2 pezzi' } },
    { src: '/images/presets/mens-suit-2.png', labels: { en: 'Charcoal 3-piece', es: 'Gris carbón 3 piezas', fr: 'Anthracite 3 pièces', pt: 'Cinza carvão 3 peças', de: 'Anthrazit 3-teilig', it: 'Antracite 3 pezzi' } },
  ],
  'pet-clothing': [
    { src: '/images/presets/pet-clothing-1.png', labels: { en: 'Yellow raincoat', es: 'Impermeable amarillo', fr: 'Imperméable jaune', pt: 'Capa de chuva amarela', de: 'Gelber Regenmantel', it: 'Impermeabile giallo' } },
    { src: '/images/presets/pet-clothing-2.png', labels: { en: 'Plaid bandana', es: 'Bandana cuadros', fr: 'Bandana à carreaux', pt: 'Bandana xadrez', de: 'Karo-Bandana', it: 'Bandana a quadri' } },
  ],
  'baby-clothing': [
    { src: '/images/presets/baby-clothing-1.png', labels: { en: 'Star romper', es: 'Pelele estrellas', fr: 'Combinaison étoiles', pt: 'Macacão estrelas', de: 'Sternen-Strampler', it: 'Tutina stelle' } },
    { src: '/images/presets/baby-clothing-2.png', labels: { en: 'Pink knit set', es: 'Conjunto punto rosa', fr: 'Ensemble tricot rose', pt: 'Conjunto tricô rosa', de: 'Strickset rosa', it: 'Completo maglia rosa' } },
  ],
  costume: [
    { src: '/images/presets/costume-1.png', labels: { en: 'Classic witch', es: 'Bruja clásica', fr: 'Sorcière classique', pt: 'Bruxa clássica', de: 'Klassische Hexe', it: 'Strega classica' } },
    { src: '/images/presets/costume-2.png', labels: { en: 'Vampire cape', es: 'Vampiro con capa', fr: 'Vampire cape', pt: 'Vampiro com capa', de: 'Vampir mit Umhang', it: 'Vampiro con mantello' } },
  ],
  cosplay: [
    { src: '/images/presets/cosplay-1.png', labels: { en: 'Anime school', es: 'Anime escolar', fr: 'Anime école', pt: 'Anime escolar', de: 'Anime Schule', it: 'Anime scuola' } },
    { src: '/images/presets/cosplay-2.png', labels: { en: 'Fantasy elf', es: 'Elfo fantasía', fr: 'Elfe fantasy', pt: 'Elfo de fantasia', de: 'Fantasy-Elf', it: 'Elfo fantasy' } },
  ],
  'carnival-costume': [
    { src: '/images/presets/theme-carnival-costume-samba-rio-feathers.png', labels: { en: 'Rio samba feathers', es: 'Samba Río con plumas', fr: 'Samba de Rio à plumes', pt: 'Samba Rio com plumas', de: 'Rio Samba mit Federn', it: 'Samba Rio con piume' } },
    { src: '/images/presets/theme-carnival-costume-venetian-mask-cloak.png', labels: { en: 'Venetian mask + cloak', es: 'Máscara veneciana + capa', fr: 'Masque vénitien + cape', pt: 'Máscara veneziana + capa', de: 'Venezianische Maske + Umhang', it: 'Maschera veneziana + mantello' } },
  ],
  'halloween-couples': [
    { src: '/images/presets/theme-halloween-couples-barbie-ken-pink.png', labels: { en: 'Barbie + Ken', es: 'Barbie + Ken', fr: 'Barbie + Ken', pt: 'Barbie + Ken', de: 'Barbie + Ken', it: 'Barbie + Ken' } },
    { src: '/images/presets/theme-halloween-couples-wednesday-enid-school.png', labels: { en: 'Wednesday + Enid', es: 'Wednesday + Enid', fr: 'Wednesday + Enid', pt: 'Wednesday + Enid', de: 'Wednesday + Enid', it: 'Wednesday + Enid' } },
  ],
  bikini: [
    { src: '/images/presets/theme-bikini-triangle-black-classic.png', labels: { en: 'Black triangle', es: 'Triángulo negro', fr: 'Triangle noir', pt: 'Triângulo preto', de: 'Schwarzes Triangel', it: 'Triangolo nero' } },
    { src: '/images/presets/theme-bikini-tropical-print-balconette.png', labels: { en: 'Tropical balconette', es: 'Balconette tropical', fr: 'Balconnet tropical', pt: 'Balconete tropical', de: 'Tropisches Balconette', it: 'Balconcino tropicale' } },
  ],
  tattoo: [
    { src: '/images/presets/theme-tattoo-floral-blackwork-rose.png', labels: { en: 'Floral roses blackwork', es: 'Rosas florales blackwork', fr: 'Roses florales blackwork', pt: 'Rosas florais blackwork', de: 'Florale Rosen Blackwork', it: 'Rose floreali blackwork' } },
    { src: '/images/presets/theme-tattoo-minimalist-geometric-moon.png', labels: { en: 'Minimalist moon', es: 'Luna minimalista', fr: 'Lune minimaliste', pt: 'Lua minimalista', de: 'Minimalistischer Mond', it: 'Luna minimalista' } },
  ],
  'makeup-natural': [
    { src: '/images/presets/theme-makeup-natural-no-makeup-glow.png', labels: { en: 'No-makeup glow', es: 'No-makeup glow', fr: 'No-makeup glow', pt: 'No-makeup glow', de: 'No-Makeup Glow', it: 'No-makeup glow' } },
    { src: '/images/presets/theme-makeup-natural-soft-glam-bronze.png', labels: { en: 'Soft glam bronze', es: 'Soft glam bronce', fr: 'Soft glam bronze', pt: 'Soft glam bronze', de: 'Soft Glam Bronze', it: 'Soft glam bronzo' } },
  ],
  saree: [
    { src: '/images/presets/theme-saree-silk-red-gold-zari.png', labels: { en: 'Red silk gold zari', es: 'Sari rojo seda con zari dorado', fr: 'Soie rouge zari or', pt: 'Sari seda vermelha com zari', de: 'Rote Seide mit Goldzari', it: 'Seta rossa con zari oro' } },
    { src: '/images/presets/theme-saree-pastel-blue-floral.png', labels: { en: 'Pastel blue floral', es: 'Sari azul pastel floral', fr: 'Bleu pastel floral', pt: 'Sari azul pastel floral', de: 'Pastellblau floral', it: 'Sari azzurro floreale' } },
  ],
  lehenga: [
    { src: '/images/presets/theme-lehenga-royal-blue-gold-bridal.png', labels: { en: 'Royal blue bridal', es: 'Lehenga azul real nupcial', fr: 'Lehenga bleu royal nuptial', pt: 'Lehenga azul real nupcial', de: 'Königsblau Brautlehenga', it: 'Lehenga blu reale sposa' } },
    { src: '/images/presets/theme-lehenga-pastel-pink-sequin.png', labels: { en: 'Pastel pink sequin', es: 'Lehenga rosa pastel lentejuelas', fr: 'Lehenga rose pastel paillettes', pt: 'Lehenga rosa pastel lantejoulas', de: 'Pastellrosa Pailletten', it: 'Lehenga rosa pastello paillettes' } },
  ],
  hanbok: [
    { src: '/images/presets/theme-hanbok-traditional-pink-jade.png', labels: { en: 'Traditional pink + jade', es: 'Hanbok tradicional rosa + jade', fr: 'Hanbok traditionnel rose + jade', pt: 'Hanbok tradicional rosa + jade', de: 'Traditioneller Hanbok rosa + jade', it: 'Hanbok tradizionale rosa + giada' } },
    { src: '/images/presets/theme-hanbok-modern-navy-white.png', labels: { en: 'Modern navy + white', es: 'Hanbok moderno marino + blanco', fr: 'Hanbok moderne marine + blanc', pt: 'Hanbok moderno marinho + branco', de: 'Moderner Hanbok marine + weiß', it: 'Hanbok moderno blu + bianco' } },
  ],
  kimono: [
    { src: '/images/presets/theme-kimono-red-cherry-blossom-silk.png', labels: { en: 'Red sakura silk', es: 'Kimono seda roja sakura', fr: 'Soie rouge sakura', pt: 'Kimono seda vermelha sakura', de: 'Rote Sakura-Seide', it: 'Seta rossa sakura' } },
    { src: '/images/presets/theme-kimono-indigo-crane-yukata.png', labels: { en: 'Indigo crane yukata', es: 'Yukata índigo grullas', fr: 'Yukata indigo grues', pt: 'Yukata índigo garças', de: 'Indigo Kranich Yukata', it: 'Yukata indaco gru' } },
  ],
  qipao: [
    { src: '/images/presets/theme-qipao-red-silk-gold-dragon.png', labels: { en: 'Red silk gold dragon', es: 'Qipao seda roja dragón oro', fr: 'Qipao soie rouge dragon or', pt: 'Qipao seda vermelha dragão ouro', de: 'Rote Seide Golddrache', it: 'Qipao seta rossa drago oro' } },
    { src: '/images/presets/theme-qipao-navy-floral-modern.png', labels: { en: 'Navy floral modern', es: 'Qipao moderno marino floral', fr: 'Qipao moderne marine floral', pt: 'Qipao moderno marinho floral', de: 'Moderner Qipao marine floral', it: 'Qipao moderno blu floreale' } },
  ],
  'festa-junina': [
    { src: '/images/presets/pt-look-festa-junina-chita-floral-red-dress.png', labels: { en: 'Floral chita dress', es: 'Vestido chita floral', fr: 'Robe chita floral', pt: 'Vestido chita floral', de: 'Chita-Blumenkleid', it: 'Vestito chita floreale' } },
    { src: '/images/presets/pt-look-festa-junina-xadrez-shirt-jeans-caipira.png', labels: { en: 'Plaid caipira', es: 'Cuadros caipira', fr: 'Carreaux caipira', pt: 'Xadrez caipira', de: 'Karo Caipira', it: 'Quadri caipira' } },
  ],
  'zara-fashion': [
    { src: '/images/presets/pt-provador-virtual-zara-oversized-blazer-black-zara.png', labels: { en: 'Oversized black blazer', es: 'Blazer oversized negro', fr: 'Blazer oversized noir', pt: 'Blazer oversized preto', de: 'Oversized Blazer schwarz', it: 'Blazer oversize nero' } },
    { src: '/images/presets/pt-provador-virtual-zara-denim-wide-leg-cropped.png', labels: { en: 'Wide-leg jeans', es: 'Jeans wide leg', fr: 'Jean wide leg', pt: 'Jeans wide leg', de: 'Wide-Leg Jeans', it: 'Jeans wide leg' } },
  ],
};

interface Props {
  category: DemoCategory;
  lang: DemoLang;
  /** override the default product label, e.g. "Wedding dress" instead of generic "Product" */
  productLabel?: string;
  /** override the default left-box label, e.g. "A foto da tua mão" for nail landings */
  yourPhotoLabel?: string;
  /** override the default left-box hint */
  yourPhotoHint?: string;
  /** override the default right-box hint */
  productHint?: string;
  /** Optional ready-made product options. When set, the right-hand box shows
   *  a grid of [preset thumbs ... + Custom]. When empty, falls back to the
   *  classic single-dropzone upload flow. */
  presets?: DemoPreset[];
  /** Optional theme key — looked up in THEME_PRESETS for more specific
   *  imagery than the broad DemoCategory. Resolution order:
   *  explicit `presets` > `theme` > `category` > none. */
  theme?: PresetTheme;
}

const LABELS: Record<DemoLang, {
  sectionTitle: string;
  sectionSubtitle: string;
  yourPhoto: string;
  yourPhotoHint: string;
  productPhoto: string;
  productPhotoHint: string;
  generate: string;
  generating: string;
  result: string;
  download: string;
  buyMore: string;
  tryAnother: string;
  errorGeneric: string;
  errorRate: string;
  errorMissing: string;
  errorCaptcha: string;
  /** Shown when the visitor's daily-free render quota is spent (HTTP 402). */
  errorQuotaSpent: string;
  /** Label of the CTA button next to errorQuotaSpent that links to /paywall. */
  errorQuotaSpentCta: string;
  /** Shown when there's a network failure (catch block). */
  errorNetwork: string;
  uploadCta: string;
  // Login gate (replaces dropzones until user is authenticated)
  loginGateTitle: string;
  loginGateSubtitle: string;
  loginGateCta: string;
  // Login modal
  signInTitle: string;
  signInSubtitle: string;
  signInGoogle: string;
  signInOr: string;
  signInEmailPlaceholder: string;
  signInEmailSend: string;
  signInEmailSent: string;
  signInEmailSentHint: string;
  signInSenderHint: string;
  signInCodeLabel: string;
  signInCodePlaceholder: string;
  signInCodeVerify: string;
  signInCodeVerifying: string;
  signInCodeError: string;
  signInChangeEmail: string;
  signInCancel: string;
}> = {
  en: {
    sectionTitle: 'Try it free now',
    sectionSubtitle: 'Sign in and get one free HD render every day. Upload your photo + the product you want to try.',
    yourPhoto: 'Your photo',
    yourPhotoHint: 'Selfie or waist-up — not the product',
    productPhoto: 'Product',
    productPhotoHint: 'Photo or screenshot of the item',
    generate: 'Generate HD',
    generating: 'Generating… under 1 min',
    result: 'Your result',
    download: 'Download HD',
    buyMore: 'Get more renders',
    tryAnother: 'Try another',
    errorGeneric: "The AI couldn't complete this render. Tap GENERATE again — second tries usually work. If it keeps failing, upload a clearer waist-up selfie for tops/blazers, or a full-body shot for dresses/pants.",
    errorRate: 'Too many requests in a short time. Wait 30 seconds and try again.',
    errorMissing: 'Upload both photos first.',
    errorCaptcha: 'Verification failed. Please refresh and try again.',
    errorQuotaSpent: "You've already used your free render today. Come back tomorrow for another free one, or grab a pack to keep going right now.",
    errorQuotaSpentCta: 'Get a pack',
    errorNetwork: 'Connection issue — check your internet and try again.',
    uploadCta: 'Click to upload',
    loginGateTitle: 'Try it free by signing in',
    loginGateSubtitle: 'One free HD render every day. No card, no spam. Upload after sign-in.',
    loginGateCta: 'Sign in free',
    signInTitle: 'Sign in for your free HD render',
    signInSubtitle: 'One free HD render every day. No card, no spam.',
    signInGoogle: 'Continue with Google',
    signInOr: 'or',
    signInEmailPlaceholder: 'your@email.com',
    signInEmailSend: 'Send code',
    signInEmailSent: 'Check your inbox',
    signInEmailSentHint: 'Enter the verification code we just sent to your email below.',
    signInSenderHint: "If you don't see it, check your spam folder — the link may end up there.",
    signInCodeLabel: 'Enter the verification code',
    signInCodePlaceholder: '12345678',
    signInCodeVerify: 'Verify',
    signInCodeVerifying: 'Verifying…',
    signInCodeError: 'Invalid or expired code. Try again or request a new one.',
    signInChangeEmail: 'Use a different email',
    signInCancel: 'Cancel',
  },
  es: {
    sectionTitle: 'Pruébalo gratis ahora',
    sectionSubtitle: 'Inicia sesión y consigue un render HD gratis cada día. Sube tu foto + el producto que quieres probar.',
    yourPhoto: 'Tu foto',
    yourPhotoHint: 'Selfie o de cintura para arriba — no el producto',
    productPhoto: 'Producto',
    productPhotoHint: 'Foto o captura del artículo',
    generate: 'Generar HD',
    generating: 'Generando… menos de 1 min',
    result: 'Tu resultado',
    download: 'Descargar HD',
    buyMore: 'Más renders',
    tryAnother: 'Probar otro',
    errorGeneric: 'La IA no pudo completar este render. Pulsa GENERAR otra vez — los segundos intentos suelen funcionar. Si sigue fallando, sube un selfie más claro de cintura para arriba (tops/blazers) o cuerpo entero (vestidos/pantalones).',
    errorRate: 'Demasiadas peticiones seguidas. Espera 30 segundos y vuelve a intentarlo.',
    errorMissing: 'Sube primero las dos fotos.',
    errorCaptcha: 'Fallo de verificación. Recarga e inténtalo de nuevo.',
    errorQuotaSpent: 'Ya usaste tu render gratis de hoy. Vuelve mañana para otro gratis, o consigue un pack para seguir ahora mismo.',
    errorQuotaSpentCta: 'Consigue un pack',
    errorNetwork: 'Problema de conexión — revisa tu internet y vuelve a intentarlo.',
    uploadCta: 'Pulsa para subir',
    loginGateTitle: 'Prueba gratis iniciando sesión',
    loginGateSubtitle: 'Un render HD gratis cada día. Sin tarjeta, sin spam. Sube tus fotos al iniciar sesión.',
    loginGateCta: 'Iniciar sesión gratis',
    signInTitle: 'Inicia sesión para tu render HD gratis',
    signInSubtitle: 'Un render HD gratis cada día. Sin tarjeta, sin spam.',
    signInGoogle: 'Continuar con Google',
    signInOr: 'o',
    signInEmailPlaceholder: 'tu@email.com',
    signInEmailSend: 'Enviar código',
    signInEmailSent: 'Revisa tu correo',
    signInEmailSentHint: 'Introduce abajo el código de verificación que te acabamos de enviar al correo.',
    signInSenderHint: 'Si no lo ves, revisa la carpeta de spam — el enlace puede acabar ahí.',
    signInCodeLabel: 'Pon el código de verificación',
    signInCodePlaceholder: '12345678',
    signInCodeVerify: 'Verificar',
    signInCodeVerifying: 'Verificando…',
    signInCodeError: 'Código inválido o caducado. Prueba otra vez o pide uno nuevo.',
    signInChangeEmail: 'Usar otro email',
    signInCancel: 'Cancelar',
  },
  fr: {
    sectionTitle: 'Essayez gratuitement maintenant',
    sectionSubtitle: 'Connectez-vous et obtenez un rendu HD gratuit chaque jour. Téléchargez votre photo + le produit.',
    yourPhoto: 'Votre photo',
    yourPhotoHint: 'Selfie ou buste — pas le produit',
    productPhoto: 'Produit',
    productPhotoHint: "Photo ou capture de l'article",
    generate: 'Générer HD',
    generating: 'Génération… moins d\'1 min',
    result: 'Votre résultat',
    download: 'Télécharger HD',
    buyMore: 'Plus de rendus',
    tryAnother: 'Essayer un autre',
    errorGeneric: "L'IA n'a pas pu compléter ce rendu. Réessayez GÉNÉRER — le deuxième essai marche en général. Si ça échoue encore, téléchargez un selfie plus clair (buste pour les tops, corps entier pour robes/pantalons).",
    errorRate: 'Trop de tentatives en peu de temps. Attendez 30 secondes et réessayez.',
    errorMissing: "Téléchargez d'abord les deux photos.",
    errorCaptcha: 'Vérification échouée. Rafraîchissez et réessayez.',
    errorQuotaSpent: 'Vous avez déjà utilisé votre rendu gratuit du jour. Revenez demain pour un autre, ou prenez un pack pour continuer maintenant.',
    errorQuotaSpentCta: 'Obtenir un pack',
    errorNetwork: 'Problème de connexion — vérifiez votre internet et réessayez.',
    uploadCta: 'Cliquez pour téléverser',
    loginGateTitle: 'Essayez gratuitement en vous connectant',
    loginGateSubtitle: 'Un rendu HD gratuit chaque jour. Sans carte, sans spam. Téléchargez après la connexion.',
    loginGateCta: 'Se connecter gratuit',
    signInTitle: 'Connectez-vous pour votre rendu HD gratuit',
    signInSubtitle: 'Un rendu HD gratuit chaque jour. Sans carte, sans spam.',
    signInGoogle: 'Continuer avec Google',
    signInOr: 'ou',
    signInEmailPlaceholder: 'votre@email.com',
    signInEmailSend: 'Envoyer le code',
    signInEmailSent: 'Vérifiez votre boîte',
    signInEmailSentHint: 'Saisissez ci-dessous le code de vérification que nous venons d\'envoyer à votre email.',
    signInSenderHint: 'Si vous ne voyez rien, vérifiez le dossier spam — le lien peut s\'y trouver.',
    signInCodeLabel: 'Entrez le code de vérification',
    signInCodePlaceholder: '12345678',
    signInCodeVerify: 'Vérifier',
    signInCodeVerifying: 'Vérification…',
    signInCodeError: 'Code invalide ou expiré. Réessayez ou demandez-en un nouveau.',
    signInChangeEmail: 'Changer d\'email',
    signInCancel: 'Annuler',
  },
  pt: {
    sectionTitle: 'Experimente grátis agora',
    sectionSubtitle: 'Inicia sessão e obtém um render HD grátis todos os dias. Carrega a tua foto + o produto.',
    yourPhoto: 'A tua foto',
    yourPhotoHint: 'Selfie ou da cintura para cima — não o produto',
    productPhoto: 'Produto',
    productPhotoHint: 'Foto ou captura do artigo',
    generate: 'Gerar HD',
    generating: 'A gerar… menos de 1 min',
    result: 'O teu resultado',
    download: 'Descarregar HD',
    buyMore: 'Mais renders',
    tryAnother: 'Tentar outro',
    errorGeneric: 'A IA não conseguiu completar este render. Toque em GERAR novamente — segunda tentativa costuma funcionar. Se continuar falhando, suba um selfie mais claro (da cintura para cima para tops/casacos, corpo inteiro para vestidos/calças).',
    errorRate: 'Demasiadas tentativas em pouco tempo. Espera 30 segundos e tenta novamente.',
    errorMissing: 'Suba primeiro as duas fotos.',
    errorCaptcha: 'Verificação falhou. Recarregue e tente novamente.',
    errorQuotaSpent: 'Você já usou seu render grátis de hoje. Volte amanhã para outro grátis, ou pegue um pack para continuar agora.',
    errorQuotaSpentCta: 'Pegar um pack',
    errorNetwork: 'Problema de conexão — verifique sua internet e tente novamente.',
    uploadCta: 'Toque para carregar',
    loginGateTitle: 'Experimenta grátis iniciando sessão',
    loginGateSubtitle: 'Um render HD grátis todos os dias. Sem cartão, sem spam. Carrega as fotos após iniciar sessão.',
    loginGateCta: 'Iniciar sessão grátis',
    signInTitle: 'Inicia sessão para o teu render HD grátis',
    signInSubtitle: 'Um render HD grátis todos os dias. Sem cartão, sem spam.',
    signInGoogle: 'Continuar com Google',
    signInOr: 'ou',
    signInEmailPlaceholder: 'o-teu@email.com',
    signInEmailSend: 'Enviar código',
    signInEmailSent: 'Verifica a tua caixa',
    signInEmailSentHint: 'Insere abaixo o código de verificação que acabámos de enviar para o teu email.',
    signInSenderHint: 'Se não vires, verifica a pasta de spam — o link pode estar lá.',
    signInCodeLabel: 'Insere o código de verificação',
    signInCodePlaceholder: '12345678',
    signInCodeVerify: 'Verificar',
    signInCodeVerifying: 'A verificar…',
    signInCodeError: 'Código inválido ou expirado. Tenta de novo ou pede um novo.',
    signInChangeEmail: 'Usar outro email',
    signInCancel: 'Cancelar',
  },
  de: {
    sectionTitle: 'Jetzt kostenlos ausprobieren',
    sectionSubtitle: 'Melde dich an und hol dir jeden Tag einen kostenlosen HD-Render. Lade dein Foto + Produkt hoch.',
    yourPhoto: 'Dein Foto',
    yourPhotoHint: 'Selfie oder Oberkörper — nicht das Produkt',
    productPhoto: 'Produkt',
    productPhotoHint: 'Foto oder Screenshot des Artikels',
    generate: 'HD generieren',
    generating: 'Wird generiert… unter 1 Min',
    result: 'Dein Ergebnis',
    download: 'HD herunterladen',
    buyMore: 'Mehr Renders',
    tryAnother: 'Anderes versuchen',
    errorGeneric: 'Die KI konnte dieses Rendering nicht abschließen. Tippe nochmal auf GENERIEREN — der zweite Versuch klappt meistens. Wenn es weiter scheitert, lade ein klareres Selfie hoch (Oberkörper für Tops/Blazer, Ganzkörper für Kleider/Hosen).',
    errorRate: 'Zu viele Anfragen in kurzer Zeit. Warte 30 Sekunden und versuche es erneut.',
    errorMissing: 'Zuerst beide Fotos hochladen.',
    errorCaptcha: 'Verifizierung fehlgeschlagen. Seite neu laden und erneut versuchen.',
    errorQuotaSpent: 'Du hast dein kostenloses Tages-Rendering bereits genutzt. Komm morgen für ein weiteres zurück, oder hol dir ein Paket, um sofort weiterzumachen.',
    errorQuotaSpentCta: 'Paket holen',
    errorNetwork: 'Verbindungsproblem — prüfe dein Internet und versuche es erneut.',
    uploadCta: 'Zum Hochladen klicken',
    loginGateTitle: 'Probiere kostenlos — melde dich an',
    loginGateSubtitle: 'Ein kostenloser HD-Render pro Tag. Keine Karte, kein Spam. Foto-Upload nach Anmeldung.',
    loginGateCta: 'Kostenlos anmelden',
    signInTitle: 'Anmelden für deinen kostenlosen HD-Render',
    signInSubtitle: 'Ein kostenloser HD-Render jeden Tag. Keine Karte, kein Spam.',
    signInGoogle: 'Mit Google fortfahren',
    signInOr: 'oder',
    signInEmailPlaceholder: 'deine@email.com',
    signInEmailSend: 'Code senden',
    signInEmailSent: 'Posteingang prüfen',
    signInEmailSentHint: 'Gib unten den Bestätigungscode ein, den wir gerade an deine E-Mail gesendet haben.',
    signInSenderHint: 'Falls du nichts siehst, prüfe den Spam-Ordner — der Link kann dort landen.',
    signInCodeLabel: 'Gib den Bestätigungscode ein',
    signInCodePlaceholder: '12345678',
    signInCodeVerify: 'Verifizieren',
    signInCodeVerifying: 'Wird verifiziert…',
    signInCodeError: 'Ungültiger oder abgelaufener Code. Erneut versuchen oder neuen anfordern.',
    signInChangeEmail: 'Andere E-Mail verwenden',
    signInCancel: 'Abbrechen',
  },
  it: {
    sectionTitle: 'Provalo gratis ora',
    sectionSubtitle: 'Accedi e ottieni un render HD gratuito ogni giorno. Carica la tua foto + il prodotto.',
    yourPhoto: 'La tua foto',
    yourPhotoHint: 'Selfie o mezzo busto — non il prodotto',
    productPhoto: 'Prodotto',
    productPhotoHint: "Foto o screenshot dell'articolo",
    generate: 'Genera HD',
    generating: 'Generando… meno di 1 min',
    result: 'Il tuo risultato',
    download: 'Scarica HD',
    buyMore: 'Più render',
    tryAnother: 'Prova un altro',
    errorGeneric: "L'IA non è riuscita a completare questo render. Tocca GENERA di nuovo — il secondo tentativo di solito funziona. Se continua a fallire, carica un selfie più chiaro (mezzo busto per top/blazer, corpo intero per vestiti/pantaloni).",
    errorRate: 'Troppe richieste in poco tempo. Aspetta 30 secondi e riprova.',
    errorMissing: 'Carica prima entrambe le foto.',
    errorCaptcha: 'Verifica fallita. Ricarica e riprova.',
    errorQuotaSpent: 'Hai già usato il tuo render gratuito di oggi. Torna domani per un altro gratuito, o prendi un pacchetto per continuare ora.',
    errorQuotaSpentCta: 'Prendi un pacchetto',
    errorNetwork: 'Problema di connessione — controlla la tua internet e riprova.',
    uploadCta: 'Clicca per caricare',
    loginGateTitle: 'Prova gratis accedendo',
    loginGateSubtitle: 'Un render HD gratuito ogni giorno. Senza carta, senza spam. Carica le foto dopo l\'accesso.',
    loginGateCta: 'Accedi gratis',
    signInTitle: 'Accedi per il tuo render HD gratuito',
    signInSubtitle: 'Un render HD gratuito ogni giorno. Senza carta, senza spam.',
    signInGoogle: 'Continua con Google',
    signInOr: 'o',
    signInEmailPlaceholder: 'tua@email.com',
    signInEmailSend: 'Invia codice',
    signInEmailSent: 'Controlla la tua casella',
    signInEmailSentHint: 'Inserisci sotto il codice di verifica che ti abbiamo appena inviato per email.',
    signInSenderHint: 'Se non lo vedi, controlla la cartella spam — il link può finire lì.',
    signInCodeLabel: 'Inserisci il codice di verifica',
    signInCodePlaceholder: '12345678',
    signInCodeVerify: 'Verifica',
    signInCodeVerifying: 'Verifica…',
    signInCodeError: 'Codice non valido o scaduto. Riprova o richiedine uno nuovo.',
    signInChangeEmail: 'Usa un\'altra email',
    signInCancel: 'Annulla',
  },
};

// Category-specific overrides for `yourPhotoHint` and `errorGeneric`.
// LABELS already covers the "person" default (clothing, costume, cosplay,
// glasses, jewelry, hat, bag, baby-clothing, shoes, tattoo) — a selfie or
// waist-up shot exposes face, hands, torso so the model has what it needs.
// Only nail, pet-clothing and hairstyle need a fundamentally different
// photo, so only those three are overridden here.
type CategoryGuidance = { hint: string; error: string };
const CATEGORY_GUIDANCE: Partial<Record<DemoCategory, Record<DemoLang, CategoryGuidance>>> = {
  nail: {
    en: { hint: 'Photo of your hand, fingers visible', error: "The AI couldn't apply the design this time. Tap GENERATE again — it usually works on the second try. If it keeps failing, try a fresh photo with your fingers more spread apart and good lighting." },
    es: { hint: 'Foto de tu mano, con los dedos visibles', error: 'La IA no pudo aplicar el diseño esta vez. Pulsa GENERAR otra vez — suele funcionar al segundo intento. Si vuelve a fallar, prueba con una foto nueva con los dedos más separados y mejor luz.' },
    fr: { hint: 'Photo de votre main, doigts visibles', error: "L'IA n'a pas pu appliquer le motif cette fois. Réessayez GÉNÉRER — ça marche souvent au deuxième essai. Si ça échoue encore, essayez une photo plus claire avec les doigts plus écartés." },
    pt: { hint: 'Foto da tua mão, com os dedos visíveis', error: 'A IA não conseguiu aplicar o design dessa vez. Toque em GERAR novamente — costuma funcionar na segunda tentativa. Se continuar falhando, tente uma foto nova com os dedos mais separados e boa luz.' },
    de: { hint: 'Foto deiner Hand mit sichtbaren Fingern', error: 'Die KI konnte das Design diesmal nicht anwenden. Tippe nochmal auf GENERIEREN — beim zweiten Versuch klappt es meistens. Wenn es weiter scheitert, versuche ein frisches Foto mit gespreizten Fingern und guter Beleuchtung.' },
    it: { hint: 'Foto della tua mano, dita visibili', error: "L'IA non è riuscita ad applicare il design questa volta. Tocca GENERA di nuovo — di solito funziona al secondo tentativo. Se continua a fallire, prova una foto nuova con le dita più aperte e buona luce." },
  },
  'pet-clothing': {
    en: { hint: 'Photo of your pet — full body works best', error: 'The AI struggled with this render. Tap GENERATE again — second tries usually work. If not, upload a clearer full-body photo of your pet, well-lit and uncluttered background.' },
    es: { hint: 'Foto de tu mascota — mejor cuerpo entero', error: 'La IA tuvo problemas con este render. Pulsa GENERAR otra vez — los segundos intentos suelen funcionar. Si no, sube una foto más clara de cuerpo entero, bien iluminada y con fondo limpio.' },
    fr: { hint: 'Photo de votre animal — corps entier idéalement', error: "L'IA a eu du mal avec ce rendu. Réessayez GÉNÉRER — le deuxième essai marche en général. Sinon, téléchargez une photo plus claire en corps entier, bien éclairée." },
    pt: { hint: 'Foto do teu animal — melhor corpo inteiro', error: 'A IA teve problemas com este render. Toque em GERAR novamente — segunda tentativa costuma funcionar. Se não, carregue uma foto mais clara de corpo inteiro, bem iluminada.' },
    de: { hint: 'Foto deines Haustiers — Ganzkörper ist am besten', error: 'Die KI hatte Probleme mit diesem Rendering. Tippe nochmal auf GENERIEREN — der zweite Versuch klappt meistens. Sonst lade ein klareres Ganzkörperfoto deines Haustiers hoch.' },
    it: { hint: 'Foto del tuo animale — meglio corpo intero', error: "L'IA ha avuto problemi con questo render. Tocca GENERA di nuovo — il secondo tentativo di solito funziona. Altrimenti, carica una foto più chiara a corpo intero, ben illuminata." },
  },
  hairstyle: {
    en: { hint: 'Selfie with face and current hair clearly visible', error: 'The AI struggled with this render. Tap GENERATE again — it usually works on retry. If it keeps failing, upload a clearer front-facing selfie with your hair fully visible.' },
    es: { hint: 'Selfie con la cara y el pelo actual bien visibles', error: 'La IA tuvo problemas con este render. Pulsa GENERAR otra vez — suele funcionar al reintentar. Si sigue fallando, sube un selfie más claro de frente con todo el pelo visible.' },
    fr: { hint: 'Selfie avec visage et cheveux actuels bien visibles', error: "L'IA a eu du mal avec ce rendu. Réessayez GÉNÉRER — ça marche en général au deuxième essai. Si ça échoue encore, téléchargez un selfie plus clair de face avec tous vos cheveux visibles." },
    pt: { hint: 'Selfie com a cara e o cabelo atual bem visíveis', error: 'A IA teve problemas com este render. Toque em GERAR novamente — costuma funcionar ao tentar de novo. Se continuar falhando, carregue um selfie mais claro de frente com todo o cabelo visível.' },
    de: { hint: 'Selfie mit Gesicht und aktuellen Haaren klar sichtbar', error: 'Die KI hatte Probleme mit diesem Rendering. Tippe nochmal auf GENERIEREN — beim Wiederholen klappt es meistens. Sonst lade ein klareres Frontalselfie hoch mit gut sichtbaren Haaren.' },
    it: { hint: 'Selfie con viso e capelli attuali ben visibili', error: "L'IA ha avuto problemi con questo render. Tocca GENERA di nuovo — di solito funziona al riprovare. Altrimenti, carica un selfie più chiaro frontale con tutti i capelli visibili." },
  },
};

// localStorage key used to survive the auth redirect (Google or OTP magic
// link). Saved BEFORE the user clicks Continue/Send and restored on mount
// once the auth listener confirms a session — at which point the queued
// generation fires automatically.
const PENDING_DEMO_KEY = 'agalaz_demo_pending';
const PENDING_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Promo codes shown in the post-render inline paywall. Same codes as /paywall.
// Users paste these at Stripe checkout (allow_promotion_codes: true).
const STARTER_PROMO_CODE = 'HELLO';      // 10% off Starter
const PRO_PROMO_CODE = 'AGALAZ15';       // 15% off Style Pro
const PROMO_COUNTDOWN_SECONDS = 2 * 60 + 8;

function ImageDropzone({
  label,
  hint,
  uploadCta,
  src,
  onChange,
  onClear,
}: {
  label: string;
  hint: string;
  uploadCta: string;
  src: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  return (
    <div>
      {src ? (
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={label} className="w-full h-full object-cover" />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
            aria-label="Clear"
            type="button"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        // <label> + invisible <input> sibling covering the area:
        //  - Native browser behavior triggers the file picker on tap/click
        //    anywhere in the box (no JS ref.current?.click() that fails on
        //    some mobile browsers / iOS Safari restrictions).
        //  - The input is absolutely positioned over the full surface with
        //    opacity-0, so the OS click target is the entire dashed area,
        //    not just the small upload icon — fixes failed clicks reported
        //    on mobile, tablet and desktop.
        <label className="group relative block w-full aspect-square rounded-2xl border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50/40 to-white hover:border-indigo-500 hover:from-indigo-100 hover:to-indigo-50 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer touch-manipulation">
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={`${label}: ${uploadCta}`}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500 pointer-events-none px-4">
            <div className="w-14 h-14 rounded-full bg-white shadow-md group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-indigo-500 transition-all">
              <Upload size={26} />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-slate-700 text-center">{uploadCta}</span>
            <span className="text-[11px] font-medium text-center text-slate-500 leading-snug">{hint}</span>
          </div>
        </label>
      )}
    </div>
  );
}

/**
 * Right-hand picker shown when the landing provides ready-made product
 * options. Renders a grid of preset thumbnails plus a "+ Custom" tile that
 * opens the native file picker. Tapping a preset commits its src as the
 * productImage and visibly highlights it. Cuts the funnel from 2 uploads
 * down to 1 — the visitor only has to bring their own photo.
 */
function PresetPicker({
  presets,
  selectedSrc,
  onSelect,
  onCustomChange,
  onClear,
  uploadCta,
  customLabel,
}: {
  presets: DemoPreset[];
  selectedSrc: string | null;
  onSelect: (src: string) => void;
  onCustomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  uploadCta: string;
  customLabel: string;
}) {
  // A custom upload is recognized as anything that's not a known preset src
  // (data URL OR a different /images/presets path). We use this to highlight
  // the custom tile + show the preview when the user uploaded their own.
  const customSelected = !!selectedSrc && !presets.some((p) => p.src === selectedSrc);
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {presets.map((p) => {
          const isSelected = selectedSrc === p.src;
          return (
            <button
              type="button"
              key={p.src}
              onClick={() => onSelect(p.src)}
              className={`group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl transition-all focus:outline-none ${
                isSelected
                  ? 'ring-4 ring-indigo-500 ring-offset-2 shadow-xl scale-[0.98]'
                  : 'ring-2 ring-slate-200 hover:ring-indigo-300 hover:shadow-md'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt ?? `${p.label} — virtual try-on preset · Agalaz`}
                title={p.alt ?? p.label}
                width={300}
                height={300}
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-2 py-1.5">
                <span className="text-[10px] md:text-xs font-bold text-white tracking-tight leading-tight line-clamp-2">
                  {p.label}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
        {/* + Custom upload tile (same size as preset thumbs) */}
        <label
          className={`group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl cursor-pointer transition-all touch-manipulation ${
            customSelected
              ? 'ring-4 ring-indigo-500 ring-offset-2 shadow-xl scale-[0.98]'
              : 'ring-2 ring-dashed ring-indigo-300 hover:ring-indigo-500 hover:shadow-md bg-gradient-to-br from-indigo-50/40 to-white'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={onCustomChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={uploadCta}
          />
          {customSelected && selectedSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedSrc} alt={customLabel} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); onClear(); }}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/85 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                aria-label="Clear"
              >
                <X size={11} />
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-slate-500 pointer-events-none px-2">
              <div className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-indigo-500">
                <Upload size={16} />
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-700 text-center leading-tight">
                {customLabel}
              </span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}

export default function TryOnDemoBlock({ category, lang, productLabel, yourPhotoLabel, yourPhotoHint, productHint, presets, theme }: Props) {
  const t = LABELS[lang];
  // Category-specific photo guidance — overrides the generic "selfie or
  // waist-up" hint/error for categories that need a fundamentally different
  // photo (a hand for nails, a pet for pet-clothing, a clear face for hair).
  const guidance = CATEGORY_GUIDANCE[category]?.[lang];

  // Resolve presets: explicit prop wins; otherwise auto-pick from the
  // category map so every landing using TryOnDemoBlock benefits without
  // having to wire props through 30+ data files. Empty array = no presets,
  // falls back to the classic single dropzone.
  // Resolution: explicit `presets` prop > `theme` lookup > `category` fallback.
  const effectivePresets: DemoPreset[] = (() => {
    if (presets && presets.length > 0) return presets;
    if (theme && THEME_PRESETS[theme]) {
      return THEME_PRESETS[theme].map((p) => ({ src: p.src, label: p.labels[lang] ?? p.labels.en }));
    }
    return CATEGORY_PRESETS[category]?.map((p) => ({ src: p.src, label: p.labels[lang] ?? p.labels.en })) ?? [];
  })();

  const [userImage, setUserImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Distinct flag for "free render quota spent" so the UI can render a
  // dedicated explanation + CTA instead of a generic red error string.
  const [quotaSpent, setQuotaSpent] = useState(false);
  // Triggered when the render attempt fails for any non-quota reason
  // (Gemini hiccup, safety filter, low-res photo, network blip). When set
  // we still surface the inline paywall on the right so the user can
  // convert into a paid render attempt instead of bouncing on the error.
  const [renderFailed, setRenderFailed] = useState(false);

  // Faux progress shown the moment the user clicks Generate. The real Gemini
  // call is gated behind login, so to keep the page feeling alive while the
  // login modal is up we ease 0→90% over ~45 s and only jump to 100% once
  // the real /api/demo response lands. No Gemini cost is incurred for users
  // who abandon login — only the visual gives the impression of progress.
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startFakeProgress() {
    if (progressTimerRef.current) return; // already running
    setProgress(1);
    const startedAt = Date.now();
    const FAKE_MS = 45_000; // 45 s to creep to 90%
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      if (elapsed >= FAKE_MS) {
        setProgress(90);
        return;
      }
      const ratio = elapsed / FAKE_MS;
      const eased = 1 - Math.pow(1 - ratio, 2.2); // ease-out, fast start
      setProgress(Math.max(1, Math.min(90, Math.floor(eased * 90))));
    }, 200);
  }

  function stopFakeProgress() {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }

  function completeProgress() {
    stopFakeProgress();
    setProgress(100);
    setTimeout(() => setProgress(0), 1200); // brief 100% flash before unmount
  }

  function resetProgress() {
    stopFakeProgress();
    setProgress(0);
  }

  useEffect(() => () => stopFakeProgress(), []); // cleanup on unmount

  // Promo countdown — starts when a result appears, restarts on each new
  // result so the urgency banner stays fresh. After expiration the banner
  // fades but codes still work at Stripe checkout.
  useEffect(() => {
    if (!resultImage) return;
    const startedAt = Date.now();
    setPromoSecondsLeft(PROMO_COUNTDOWN_SECONDS);
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setPromoSecondsLeft(Math.max(0, PROMO_COUNTDOWN_SECONDS - elapsed));
    }, 1000);
    return () => clearInterval(id);
  }, [resultImage]);

  async function copyStarterCode() {
    try {
      await navigator.clipboard.writeText(STARTER_PROMO_CODE);
      track('promo_code_copy', { code: STARTER_PROMO_CODE, source: 'demo_inline' });
      setStarterCopied(true);
      setTimeout(() => setStarterCopied(false), 1800);
    } catch {}
  }
  async function copyProCode() {
    try {
      await navigator.clipboard.writeText(PRO_PROMO_CODE);
      track('promo_code_copy', { code: PRO_PROMO_CODE, source: 'demo_inline' });
      setProCopied(true);
      setTimeout(() => setProCopied(false), 1800);
    } catch {}
  }

  // Auth state — required to call /api/demo. We listen so the modal closes
  // automatically when the user completes login from another tab/window.
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  // True while a Stripe checkout redirect is in flight. We disable the cards
  // so a frantic double-click doesn't fire two checkout sessions.
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  // Countdown for the post-render promo banner (HELLO + AGALAZ15). Starts
  // when the result first renders; resets each time the user clicks "try
  // another" so urgency stays fresh.
  const [promoSecondsLeft, setPromoSecondsLeft] = useState<number>(PROMO_COUNTDOWN_SECONDS);
  const [starterCopied, setStarterCopied] = useState(false);
  const [proCopied, setProCopied] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  // Pending generation — set when the user clicks Generate before being
  // authenticated. After login completes we kick it off automatically so the
  // user doesn't have to click Generate twice.
  const [pendingGenerate, setPendingGenerate] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    );
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
      setUserEmail(user?.email ?? null);
      setAuthChecked(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
      setUserEmail(session?.user?.email ?? null);
      setAuthChecked(true);
      if (session?.user) {
        setShowLogin(false);
        setOtpSent(false);
        setOtpEmail('');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Detect OTP errors arriving via the magic-link redirect (most common:
  // `error_code=otp_expired`, also `access_denied`). Some email clients
  // pre-scan links and consume them, so the user lands here with the link
  // already invalid. We surface a friendly message and reopen the modal so
  // they can request a fresh link without losing their photos.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get('error_code');
    const errorParam = params.get('error');
    if (!errorCode && !errorParam) return;
    const isOtpExpired = errorCode === 'otp_expired' || errorParam === 'access_denied';
    if (isOtpExpired) {
      setError(
        lang === 'es'
          ? 'El enlace de email caducó (suele pasar si tu cliente de correo lo previsualiza). Pide uno nuevo o usa Google.'
          : lang === 'fr'
          ? "Le lien email a expiré (souvent quand le client mail le pré-scanne). Demandez-en un nouveau ou utilisez Google."
          : lang === 'pt'
          ? 'O link do email caducou (acontece se o teu cliente de email o pré-visualiza). Pede um novo ou usa Google.'
          : lang === 'de'
          ? 'Der E-Mail-Link ist abgelaufen (passiert oft, wenn der Mail-Client ihn vorab scannt). Fordere einen neuen an oder nutze Google.'
          : lang === 'it'
          ? "Il link email è scaduto (capita se il client email lo pre-scansiona). Richiedine uno nuovo o usa Google."
          : 'Your email link expired (this happens when your email client pre-scans the link). Request a new one or use Google.',
      );
      setShowLogin(true);
    }
    // Clean error params from the URL so a refresh doesn't re-trigger.
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    window.history.replaceState({}, '', url.toString());
  }, [lang]);

  // Restore pending generation from localStorage after auth completes.
  // Saved by `savePendingForAuth` right before signInWith{Google,Otp}.
  // We only restore when (a) the user is authenticated, (b) the saved entry
  // is fresh (<30 min), and (c) the user is back on the same landing route.
  useEffect(() => {
    if (!authChecked || !userId) return;
    if (typeof window === 'undefined') return;
    let raw: string | null = null;
    try { raw = localStorage.getItem(PENDING_DEMO_KEY); } catch {}
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      const fresh = Date.now() - (data.savedAt || 0) < PENDING_TTL_MS;
      const samePath = data.landingPath === window.location.pathname;
      if (!fresh || !samePath) {
        localStorage.removeItem(PENDING_DEMO_KEY);
        return;
      }
      if (data.userImage) setUserImage(data.userImage);
      if (data.productImage) setProductImage(data.productImage);
      setPendingGenerate(true);
      localStorage.removeItem(PENDING_DEMO_KEY);
    } catch {
      try { localStorage.removeItem(PENDING_DEMO_KEY); } catch {}
    }
  }, [authChecked, userId]);

  // Snapshot the current photos to localStorage so they survive the auth
  // redirect (which reloads the page and wipes component state).
  function savePendingForAuth() {
    if (typeof window === 'undefined') return;
    if (!userImage || !productImage) return;
    try {
      localStorage.setItem(
        PENDING_DEMO_KEY,
        JSON.stringify({
          userImage,
          productImage,
          category,
          landingPath: window.location.pathname,
          savedAt: Date.now(),
        }),
      );
    } catch {
      // localStorage quota exceeded (large images) — skip silently. The user
      // will need to re-upload after auth, but the login itself still works.
    }
  }

  function handleFile(setter: (v: string | null) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX = 1280;
          let w = img.width;
          let h = img.height;
          if (w > MAX || h > MAX) {
            const s = MAX / Math.max(w, h);
            w = Math.round(w * s);
            h = Math.round(h * s);
          }
          const c = document.createElement('canvas');
          c.width = w;
          c.height = h;
          c.getContext('2d')!.drawImage(img, 0, 0, w, h);
          setter(c.toDataURL('image/jpeg', 0.9));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    };
  }

  async function runGenerate() {
    setIsLoading(true);
    setError(null);
    setQuotaSpent(false);
    setResultImage(null);
    setRenderFailed(false);
    try {
      const userBase64 = userImage!.includes(',') ? userImage!.split(',')[1] : userImage!;
      const productBase64 = productImage!.includes(',') ? productImage!.split(',')[1] : productImage!;
      track('render_start', { source: 'demo', category });
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImage: userBase64,
          clothingImage: productBase64,
          category,
        }),
      });
      if (res.status === 401) {
        // Edge case: cookie expired between mount and click. Re-prompt login.
        setShowLogin(true);
        setIsLoading(false);
        return;
      }
      if (res.status === 402) {
        // Daily free spent + no paid credits. Surface the explanation
        // inline (red banner with a "Get a pack" button) instead of
        // hard-redirecting — that way users actually understand WHY
        // nothing rendered. Auto-redirect kicks in after 6 s as a safety
        // net for anyone who doesn't read the message.
        resetProgress();
        setIsLoading(false);
        setQuotaSpent(true);
        const paywallUrl = `/paywall?from=demo&category=${encodeURIComponent(category || '')}`;
        setTimeout(() => { window.location.href = paywallUrl; }, 6000);
        return;
      }
      if (res.status === 429) {
        setError(t.errorRate);
        // Even a rate-limit failure surfaces the paywall — a paid render
        // doesn't count against the demo rate limit and may complete now.
        setRenderFailed(true);
        resetProgress();
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      if (data.image) {
        // Persist the UNWATERMARKED render to localStorage BEFORE applying
        // the demo watermark. When the user purchases any pack (trial /
        // starter / pro) Stripe redirects to /try-on?credits_purchased=…
        // and that page reads this key to surface the clean version, so
        // they immediately get value for their payment without having to
        // re-upload and re-render.
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(
              'agalaz_demo_unwatermarked',
              JSON.stringify({ image: data.image, t: Date.now(), category }),
            );
          }
        } catch {
          // localStorage can be disabled (private mode, quota) — ignore.
        }

        // Now apply the heavier demo watermark for the displayed copy.
        let finalImage = data.image;
        try {
          finalImage = await applyWatermark(data.image);
        } catch {
          // swallow — better unwatermarked than no result at all
        }
        setResultImage(finalImage);
        completeProgress();
        track('render_complete', { source: 'demo', category, pool: data.source || 'unknown' });
      } else {
        // When generation fails, prefer the category-aware guidance over the
        // API's generic English message — that's the moment we tell the user
        // *what kind of photo* they should have uploaded instead of dropping
        // them on a dead-end error.
        setError(guidance?.error || data.error || t.errorGeneric);
        // Surface the inline paywall on the right column. Paid renders go
        // through /api/generate (not /api/demo) so they bypass whatever
        // safety / quota path caused this failure, and the user converts
        // instead of bouncing on the error.
        setRenderFailed(true);
        resetProgress();
      }
    } catch {
      // Distinct message for the catch path — this fires on fetch failure
      // (offline, DNS, CSP, cancelled), NOT on a Gemini photo-quality issue.
      // The previous shared errorGeneric mixed both, so users blamed their
      // photo when in reality their wifi dropped mid-request.
      setError(t.errorNetwork);
      // Network failure also surfaces the paywall — at least gives the
      // user something actionable instead of a dead-end error state.
      setRenderFailed(true);
      resetProgress();
    }
    setIsLoading(false);
  }

  async function handleGenerate() {
    if (!userImage || !productImage) {
      setError(t.errorMissing);
      return;
    }
    // Anonymous and authenticated users both go to /api/demo directly. The
    // backend handles the IP+cookie/day anonymous quota and returns 402 to
    // redirect to /paywall when spent. No login modal at this step — email
    // is captured at Stripe checkout to keep friction off the first render.
    startFakeProgress();
    runGenerate();
  }

  // Auto-fire the queued generation as soon as login completes.
  useEffect(() => {
    if (userId && pendingGenerate && userImage && productImage) {
      setPendingGenerate(false);
      runGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, pendingGenerate]);

  async function handleLoginGoogle() {
    try {
      track('signup_click', { provider: 'google', source: 'demo' });
      savePendingForAuth();
      // After OAuth roundtrip the user lands back on this page; the auth
      // listener restores photos from localStorage and the queued generate
      // fires automatically.
      await signInWithGoogle(typeof window !== 'undefined' ? window.location.pathname : '/');
    } catch {}
  }

  async function handleLoginOtp() {
    // Stricter format check: must have user@domain.tld pattern. Catches the
    // common "@hotmail" / "@gmail" without TLD typo (the previous
    // `includes('@')` check let those through and Supabase silently rejected
    // them, making the button look broken).
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(otpEmail.trim());
    if (!emailOk) {
      setOtpError(
        lang === 'es' ? 'Introduce un email válido (p.ej. tu@gmail.com).' :
        lang === 'fr' ? 'Entrez une adresse email valide (ex. votre@gmail.com).' :
        lang === 'pt' ? 'Introduz um email válido (ex. o-teu@gmail.com).' :
        lang === 'de' ? 'Gib eine gültige E-Mail-Adresse ein (z. B. du@gmail.com).' :
        lang === 'it' ? "Inserisci un'email valida (es. tua@gmail.com)." :
        'Enter a valid email address (e.g. you@gmail.com).'
      );
      return;
    }
    setOtpError(null);
    try {
      track('signup_click', { provider: 'email', source: 'demo' });
      savePendingForAuth();
      await signInWithOtp(otpEmail.trim(), typeof window !== 'undefined' ? window.location.pathname : '/');
      setOtpSent(true);
    } catch (err) {
      // Bubble the real Supabase error up so the user can act on it instead
      // of seeing a button that "does nothing".
      const msg = err instanceof Error ? err.message : '';
      const lower = msg.toLowerCase();
      let friendly: string;
      if (lower.includes('rate') || lower.includes('too many')) {
        // Supabase's default OTP email rate limit is 4 / hour per address.
        // After hitting it, the reset window is ~1 hour, NOT 1 minute. Tell
        // the user clearly and redirect them to Google sign-in (the button
        // visible above this error message) so they can keep the flow going.
        friendly =
          lang === 'es' ? 'Límite de emails alcanzado. Usa Google (botón arriba) o espera 1 hora.' :
          lang === 'fr' ? "Limite d'emails atteinte. Utilisez Google (bouton ci-dessus) ou attendez 1 h." :
          lang === 'pt' ? 'Limite de emails atingido. Usa o Google (botão acima) ou espera 1 hora.' :
          lang === 'de' ? 'E-Mail-Limit erreicht. Google nutzen (Button oben) oder 1 Std warten.' :
          lang === 'it' ? 'Limite email raggiunto. Usa Google (pulsante sopra) o aspetta 1 ora.' :
          'Email limit reached. Use Google sign-in (button above) or wait 1 hour.';
      } else if (lower.includes('invalid') || lower.includes('email')) {
        friendly =
          lang === 'es' ? 'Email rechazado. Prueba con otra dirección.' :
          lang === 'fr' ? 'Email refusé. Essayez une autre adresse.' :
          lang === 'pt' ? 'Email recusado. Tenta com outro endereço.' :
          lang === 'de' ? 'E-Mail abgelehnt. Andere Adresse versuchen.' :
          lang === 'it' ? "Email rifiutata. Prova un altro indirizzo." :
          'Email rejected. Try a different address.';
      } else {
        friendly =
          lang === 'es' ? 'No se pudo enviar el código. Inténtalo de nuevo.' :
          lang === 'fr' ? "Impossible d'envoyer le code. Réessayez." :
          lang === 'pt' ? 'Não foi possível enviar o código. Tenta de novo.' :
          lang === 'de' ? 'Code konnte nicht gesendet werden. Erneut versuchen.' :
          lang === 'it' ? 'Impossibile inviare il codice. Riprova.' :
          "Couldn't send the code. Try again.";
      }
      setOtpError(friendly);
    }
  }

  // Verify the OTP code the user typed manually. This is the resilient
  // path — magic-link clicks get burned by email-client preview scanners
  // (Outlook Safe Links, etc.) but the human-typed code never is.
  // Supabase default OTPs are 6 digits but the dashboard can be configured
  // to 7 or 8; we accept any length 6-8 so the input stays correct without
  // a code change if you bump the length in the dashboard.
  async function handleVerifyOtp() {
    const code = otpCode.replace(/\D/g, '').slice(0, 8);
    if (code.length < 6 || !otpEmail) {
      setOtpError(t.signInCodeError);
      return;
    }
    setOtpVerifying(true);
    setOtpError(null);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      );
      const { error } = await supabase.auth.verifyOtp({
        email: otpEmail,
        token: code,
        type: 'email',
      });
      if (error) {
        setOtpError(t.signInCodeError);
        setOtpVerifying(false);
        return;
      }
      // Session set — auth listener will close the modal and run the queued
      // generate via the same path as the OAuth/magic-link flows.
    } catch {
      setOtpError(t.signInCodeError);
    }
    setOtpVerifying(false);
  }

  function reset() {
    setResultImage(null);
    setError(null);
    setRenderFailed(false);
    // Also clear the photo selections so "try another" feels like a clean
    // restart (user picks new images instead of re-firing the same combo
    // that just failed).
    setUserImage(null);
    setProductImage(null);
  }

  function downloadResult() {
    if (!resultImage) return;
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = `agalaz-${category}-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    track('result_download', { source: 'demo', category });
  }

  // Inline paywall — fires the same Stripe checkout the dedicated /paywall
  // page uses. After the visitor sees their first HD render we surface the
  // 2 packs in-place so they can buy without leaving the landing.
  async function handleCheckout(plan: 'trial' | 'test' | 'popular') {
    if (!userId || !userEmail) {
      setShowLogin(true);
      return;
    }
    if (checkoutLoading) return;
    setCheckoutLoading(plan);
    track('initiate_checkout', { plan, source: 'demo_inline', category });
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          email: userEmail,
          userId,
          fromCategory: category,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || t.errorGeneric);
        setCheckoutLoading(null);
      }
    } catch {
      setError(t.errorGeneric);
      setCheckoutLoading(null);
    }
  }

  // Plan card data — Unlock ($1.49 for this render alone, lowest friction
  // entry) + Starter + Pro. The Unlock plan reuses the Stripe price
  // `price_1TUQs7DaiRATnL32vWpZzYec` (PACK_CREDITS.trial = 1 credit) so a
  // single payment surfaces the unwatermarked render in /try-on AND leaves
  // the user with 1 paid credit for their next try. Pro stays featured.
  const PLANS: Record<DemoLang, Array<{
    plan: 'trial' | 'test' | 'popular';
    label: string;
    price: string;
    renders: string;
    perRender: string;
    badge?: string;
    pillBadge?: string;
    featured?: boolean;
  }>> = {
    en: [
      { plan: 'trial', label: 'Unlock this render', price: '$1.49', renders: '1 clean HD render', perRender: 'No watermark', pillBadge: 'UNLOCK NOW' },
      { plan: 'test', label: 'Starter', price: '$4.99', renders: '8 HD renders', perRender: '$0.62 per render', pillBadge: 'MOST POPULAR' },
      { plan: 'popular', label: 'Pro', price: '$9.99', renders: '15 + 5 free = 20 HD', perRender: '$0.50 per render', badge: '🎁 +5 FREE', pillBadge: 'BEST VALUE', featured: true },
    ],
    es: [
      { plan: 'trial', label: 'Desbloquear este render', price: '$1,49', renders: '1 render HD sin marca', perRender: 'Sin marca de agua', pillBadge: 'DESBLOQUEAR' },
      { plan: 'test', label: 'Starter', price: '$4,99', renders: '8 renders HD', perRender: '$0,62 por render', pillBadge: 'MÁS POPULAR' },
      { plan: 'popular', label: 'Pro', price: '$9,99', renders: '15 + 5 gratis = 20 HD', perRender: '$0,50 por render', badge: '🎁 +5 GRATIS', pillBadge: 'MEJOR VALOR', featured: true },
    ],
    fr: [
      { plan: 'trial', label: 'Débloquer ce rendu', price: '1,49 $', renders: '1 rendu HD sans marque', perRender: 'Sans filigrane', pillBadge: 'DÉBLOQUER' },
      { plan: 'test', label: 'Starter', price: '4,99 $', renders: '8 rendus HD', perRender: '0,62 $ par rendu', pillBadge: 'PLUS POPULAIRE' },
      { plan: 'popular', label: 'Pro', price: '9,99 $', renders: '15 + 5 gratuits = 20 HD', perRender: '0,50 $ par rendu', badge: '🎁 +5 GRATUITS', pillBadge: 'MEILLEUR PRIX', featured: true },
    ],
    pt: [
      { plan: 'trial', label: 'Desbloquear este render', price: '$1,49', renders: '1 render HD sem marca', perRender: 'Sem marca d\'água', pillBadge: 'DESBLOQUEAR' },
      { plan: 'test', label: 'Starter', price: '$4,99', renders: '8 renders HD', perRender: '$0,62 por render', pillBadge: 'MAIS POPULAR' },
      { plan: 'popular', label: 'Pro', price: '$9,99', renders: '15 + 5 grátis = 20 HD', perRender: '$0,50 por render', badge: '🎁 +5 GRÁTIS', pillBadge: 'MELHOR VALOR', featured: true },
    ],
    de: [
      { plan: 'trial', label: 'Diesen Render freischalten', price: '1,49 $', renders: '1 HD-Render ohne Marke', perRender: 'Ohne Wasserzeichen', pillBadge: 'FREISCHALTEN' },
      { plan: 'test', label: 'Starter', price: '4,99 $', renders: '8 HD-Renders', perRender: '0,62 $ pro Render', pillBadge: 'AM BELIEBTESTEN' },
      { plan: 'popular', label: 'Pro', price: '9,99 $', renders: '15 + 5 gratis = 20 HD', perRender: '0,50 $ pro Render', badge: '🎁 +5 GRATIS', pillBadge: 'BESTER WERT', featured: true },
    ],
    it: [
      { plan: 'trial', label: 'Sblocca questo render', price: '1,49 $', renders: '1 render HD senza marchio', perRender: 'Senza filigrana', pillBadge: 'SBLOCCA' },
      { plan: 'test', label: 'Starter', price: '4,99 $', renders: '8 render HD', perRender: '0,62 $ per render', pillBadge: 'PIÙ POPOLARE' },
      { plan: 'popular', label: 'Pro', price: '9,99 $', renders: '15 + 5 gratis = 20 HD', perRender: '0,50 $ per render', badge: '🎁 +5 GRATIS', pillBadge: 'MIGLIOR PREZZO', featured: true },
    ],
  };

  const plansHeading: Record<DemoLang, string> = {
    en: 'Get more HD renders',
    es: 'Más renders HD',
    fr: 'Plus de rendus HD',
    pt: 'Mais renders HD',
    de: 'Mehr HD-Renders',
    it: 'Più render HD',
  };

  const plansSubheading: Record<DemoLang, string> = {
    en: 'One-time payment · credits never expire · use code AGALAZ15 on Style Pro for 15% off',
    es: 'Pago único · créditos sin caducidad · código AGALAZ15 en Style Pro para 15% off',
    fr: 'Paiement unique · crédits sans expiration · code AGALAZ15 sur Style Pro pour 15%',
    pt: 'Pagamento único · créditos sem expiração · código AGALAZ15 no Style Pro com 15% off',
    de: 'Einmalzahlung · Credits ohne Ablauf · Code AGALAZ15 auf Style Pro für 15% Rabatt',
    it: 'Pagamento singolo · crediti senza scadenza · codice AGALAZ15 su Style Pro per 15% off',
  };

  // Per-language H2 split into prefix + italic-highlighted noun so the
  // section header reads naturally in each locale (matches the surrounding
  // PT/ES/FR/etc. subtitle instead of staying in English).
  const h2: Record<DemoLang, { prefix: string; highlight: string }> = {
    en: { prefix: 'Try it on',           highlight: 'your photo' },
    es: { prefix: 'Pruébalo en',         highlight: 'tu foto' },
    fr: { prefix: 'Essayez-le sur',      highlight: 'votre photo' },
    pt: { prefix: 'Experimenta em',      highlight: 'a tua foto' },
    de: { prefix: 'Probier es an',       highlight: 'deinem Foto' },
    it: { prefix: 'Provalo su',          highlight: 'la tua foto' },
  };

  return (
    <section
      id="try-it"
      className="relative bg-gradient-to-br from-indigo-50 via-white to-pink-50/40 border-y-2 border-indigo-100 scroll-mt-20 overflow-hidden"
    >
      {/* Decorative gradient orbs to make the demo zone unmistakable */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.25em] rounded-full mb-5 shadow-lg shadow-slate-900/20">
            <Sparkles size={14} className="text-indigo-300" />
            {t.sectionTitle}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-[1.05]">
            {h2[lang].prefix} <span className="italic text-indigo-600">{h2[lang].highlight}</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Dropzones + Generate are HIDDEN once a render attempt happens —
            whether it succeeded (resultImage) OR failed (renderFailed). The
            failure card + paywall on the right take over as the only next
            action so the user converts instead of clicking Generate twice. */}
        {!resultImage && !renderFailed && (
          <>
            {/* One-free-render banner — sets explicit expectation that the
                first render is free and signals scarcity so users don't burn
                their attempt on a low-quality photo. Shown only before the
                first render fires; hidden once a result exists. */}
            <div className="max-w-3xl mx-auto mb-5 flex items-center justify-center">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200 rounded-full shadow-sm">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black">1</span>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] text-emerald-900">
                  {lang === 'es' ? '1 render gratis · luego desbloquea más'
                    : lang === 'fr' ? '1 rendu gratuit · puis débloquez plus'
                    : lang === 'pt' ? '1 render grátis · depois desbloqueia mais'
                    : lang === 'de' ? '1 gratis Rendering · dann mehr freischalten'
                    : lang === 'it' ? '1 render gratis · poi sblocca altri'
                    : '1 free render · then unlock more'}
                </span>
              </div>
            </div>

            {/* Step indicators above the dropzones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">1</div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{yourPhotoLabel || t.yourPhoto}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-black">2</div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{productLabel || t.productPhoto}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto p-1.5 bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 ring-1 ring-indigo-100">
              <ImageDropzone
                label={yourPhotoLabel || t.yourPhoto}
                hint={yourPhotoHint || guidance?.hint || t.yourPhotoHint}
                uploadCta={t.uploadCta}
                src={userImage}
                onChange={handleFile(setUserImage)}
                onClear={() => setUserImage(null)}
              />
              {effectivePresets.length > 0 ? (
                <PresetPicker
                  presets={effectivePresets}
                  selectedSrc={productImage}
                  onSelect={(src) => setProductImage(src)}
                  onCustomChange={handleFile(setProductImage)}
                  onClear={() => setProductImage(null)}
                  uploadCta={t.uploadCta}
                  customLabel={lang === 'pt' ? 'Sua foto' : lang === 'es' ? 'Tu foto' : lang === 'fr' ? 'Votre photo' : lang === 'de' ? 'Dein Foto' : lang === 'it' ? 'Tua foto' : 'Custom'}
                />
              ) : (
                <ImageDropzone
                  label={productLabel || t.productPhoto}
                  hint={productHint || t.productPhotoHint}
                  uploadCta={t.uploadCta}
                  src={productImage}
                  onChange={handleFile(setProductImage)}
                  onClear={() => setProductImage(null)}
                />
              )}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              {progress > 0 ? (
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                      <Loader2 size={12} className="animate-spin text-indigo-600" />
                      {t.generating}
                    </span>
                    <span className="text-[11px] font-black text-slate-900 tabular-nums">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !userImage || !productImage}
                  className={`inline-flex items-center gap-3 px-12 py-5 text-sm md:text-base font-black uppercase tracking-[0.2em] rounded-full transition-all ${
                    userImage && productImage
                      ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-2xl shadow-indigo-300/50 hover:scale-[1.03] active:scale-[0.99] animate-pulse-soft'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles size={18} />
                  {t.generate}
                  <ArrowRight size={16} />
                </button>
              )}
              {/* Quota-spent banner: explicit explanation + CTA + safety-net
                  auto-redirect (set in the 402 branch of runGenerate). */}
              {quotaSpent && (
                <div className="mt-3 max-w-md w-full bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3.5 text-left">
                  <p className="text-sm font-bold text-rose-700 leading-snug">
                    {t.errorQuotaSpent}
                  </p>
                  <a
                    href={`/paywall?from=demo&category=${encodeURIComponent(category || '')}`}
                    className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-[0.15em] rounded-full transition-colors"
                  >
                    <Sparkles size={13} />
                    {t.errorQuotaSpentCta}
                    <ArrowRight size={12} />
                  </a>
                </div>
              )}
              {/* Generic error (photo quality, network, rate limit) — only
                  shown when quotaSpent is false so we never stack 2 banners. */}
              {error && !quotaSpent && (
                <p className="mt-3 max-w-md text-xs text-rose-600 font-medium leading-relaxed text-center">{error}</p>
              )}
            </div>
          </>
        )}

        {(resultImage || renderFailed) && (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
            {/* Left column — render result OR failure card */}
            <div>
              {resultImage ? (
                <>
                  <div className="text-center lg:text-left mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.result}</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resultImage} alt={t.result} className="w-full h-auto" />
                  </div>
                  <div className="mt-4 flex flex-col items-center lg:items-start gap-2">
                    <button
                      onClick={downloadResult}
                      className="w-full max-w-sm inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors rounded-lg"
                    >
                      <Download size={14} />
                      {t.download}
                    </button>
                    <button
                      onClick={reset}
                      className="text-xs text-slate-400 font-light hover:text-slate-600 transition-colors"
                    >
                      {t.tryAnother}
                    </button>
                  </div>
                </>
              ) : (
                /* Failure card — render didn't produce an image (Gemini blip,
                   safety filter, network). We still surface the paywall in
                   the right column so the user can convert into a paid retry
                   instead of bouncing on a dead-end error. */
                <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-6 sm:p-8 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-200 rounded-full mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-900">
                      {lang === 'es' ? 'Render no completado'
                        : lang === 'fr' ? 'Rendu non complété'
                        : lang === 'pt' ? 'Render não concluído'
                        : lang === 'de' ? 'Render nicht abgeschlossen'
                        : lang === 'it' ? 'Render non completato'
                        : 'Render didn\'t complete'}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-3 leading-snug">
                    {lang === 'es' ? 'No pudimos generar este render.'
                      : lang === 'fr' ? "Nous n'avons pas pu générer ce rendu."
                      : lang === 'pt' ? 'Não conseguimos gerar este render.'
                      : lang === 'de' ? 'Wir konnten dieses Rendering nicht erstellen.'
                      : lang === 'it' ? 'Non siamo riusciti a generare questo render.'
                      : 'We couldn\'t generate this render.'}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {error || t.errorGeneric}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    {lang === 'es' ? 'Los renders pagados usan un canal diferente y suelen completarse cuando el demo falla. O sube otra foto y reintenta gratis.'
                      : lang === 'fr' ? "Les rendus payants utilisent un canal différent et aboutissent souvent quand la démo échoue. Ou téléchargez une autre photo et réessayez gratuitement."
                      : lang === 'pt' ? 'Renders pagos usam um canal diferente e costumam funcionar quando o demo falha. Ou carregue outra foto e tente de novo grátis.'
                      : lang === 'de' ? 'Bezahlte Renderings nutzen einen anderen Kanal und gelingen oft, wenn der Demo fehlschlägt. Oder lade ein anderes Foto hoch und versuche es gratis nochmal.'
                      : lang === 'it' ? 'I render a pagamento usano un canale diverso e spesso funzionano quando il demo fallisce. Oppure carica un\'altra foto e riprova gratis.'
                      : 'Paid renders use a different pipeline and often succeed where the free demo failed. Or upload a different photo and retry free.'}
                  </p>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-black uppercase tracking-[0.15em] rounded-lg transition-colors"
                  >
                    {t.tryAnother}
                  </button>
                </div>
              )}
            </div>

            {/* Inline paywall — right column on desktop, below on mobile.
                Trial + Starter + Style Pro cards mirror /paywall exactly. */}
            <div>
              <div className="mb-5">
                <h3 className="font-serif text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  {plansHeading[lang]}
                </h3>
                <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-snug">
                  {plansSubheading[lang]}
                </p>
              </div>

              {/* Dual promo banner — both codes with one shared countdown.
                  Same visual language as /paywall but compact so it fits in
                  the right column. After expiration we still keep the codes
                  visible (Stripe still accepts them), just without urgency. */}
              {promoSecondsLeft > 0 && (
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between gap-2 px-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 inline-flex items-center gap-1">
                      <Clock size={11} className="text-amber-600" />
                      {lang === 'es' ? 'Códigos caducan en' : lang === 'fr' ? 'Codes expirent dans' : lang === 'pt' ? 'Códigos expiram em' : lang === 'de' ? 'Codes laufen ab in' : lang === 'it' ? 'Codici scadono in' : 'Codes expire in'}
                    </span>
                    <span className="font-mono font-black text-sm text-amber-700 tabular-nums">
                      {Math.floor(promoSecondsLeft / 60)}:{(promoSecondsLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={copyStarterCode}
                      className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-400 p-2 text-left hover:bg-emerald-100 transition-colors active:scale-[0.99]"
                    >
                      <div className="text-[9px] font-black uppercase tracking-wider text-emerald-700">
                        {lang === 'es' ? '10% desc. · Starter' :
                         lang === 'fr' ? '-10% · Starter' :
                         lang === 'pt' ? '10% desc. · Starter' :
                         lang === 'de' ? '10% Rabatt · Starter' :
                         lang === 'it' ? '-10% · Starter' :
                         '10% off · Starter'}
                      </div>
                      <div className="font-mono font-black text-sm text-slate-900 tracking-wider mt-0.5">
                        {STARTER_PROMO_CODE}
                      </div>
                      <div className="text-[9px] font-bold text-emerald-700/80 mt-0.5">
                        {starterCopied ? (lang === 'es' ? '¡Copiado!' : lang === 'fr' ? 'Copié!' : lang === 'pt' ? 'Copiado!' : lang === 'de' ? 'Kopiert!' : lang === 'it' ? 'Copiato!' : 'Copied!') : (lang === 'es' ? 'Pulsa para copiar' : lang === 'fr' ? 'Cliquer pour copier' : lang === 'pt' ? 'Toque para copiar' : lang === 'de' ? 'Zum Kopieren' : lang === 'it' ? 'Clicca per copiare' : 'Tap to copy')}
                      </div>
                    </button>
                    <button
                      onClick={copyProCode}
                      className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-400 p-2 text-left hover:bg-amber-100 transition-colors active:scale-[0.99]"
                    >
                      <div className="text-[9px] font-black uppercase tracking-wider text-amber-700">
                        {lang === 'es' ? '15% desc. · Style Pro' :
                         lang === 'fr' ? '-15% · Style Pro' :
                         lang === 'pt' ? '15% desc. · Style Pro' :
                         lang === 'de' ? '15% Rabatt · Style Pro' :
                         lang === 'it' ? '-15% · Style Pro' :
                         '15% off · Style Pro'}
                      </div>
                      <div className="font-mono font-black text-sm text-slate-900 tracking-wider mt-0.5">
                        {PRO_PROMO_CODE}
                      </div>
                      <div className="text-[9px] font-bold text-amber-700/80 mt-0.5">
                        {proCopied ? (lang === 'es' ? '¡Copiado!' : lang === 'fr' ? 'Copié!' : lang === 'pt' ? 'Copiado!' : lang === 'de' ? 'Kopiert!' : lang === 'it' ? 'Copiato!' : 'Copied!') : (lang === 'es' ? 'Pulsa para copiar' : lang === 'fr' ? 'Cliquer pour copier' : lang === 'pt' ? 'Toque para copiar' : lang === 'de' ? 'Zum Kopieren' : lang === 'it' ? 'Clicca per copiare' : 'Tap to copy')}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {PLANS[lang].map((p) => (
                  <button
                    key={p.plan}
                    onClick={() => handleCheckout(p.plan)}
                    disabled={checkoutLoading !== null}
                    className={`relative w-full p-4 rounded-xl flex items-center justify-between transition-all text-left disabled:opacity-50 disabled:cursor-wait ${
                      p.featured
                        ? 'bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-500 shadow-xl ring-1 ring-indigo-200 hover:scale-[1.02]'
                        : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {p.pillBadge && (
                      <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow ${
                        p.featured ? 'bg-indigo-600' : 'bg-slate-900'
                      }`}>
                        {p.pillBadge}
                      </div>
                    )}
                    {p.badge && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md rotate-3">
                        {p.badge}
                      </div>
                    )}
                    <div>
                      <span className="font-black text-[14px] text-slate-900">{p.label}</span>
                      <br />
                      <span className="text-[11px] font-bold text-slate-500">{p.renders}</span>
                      <span className="text-[10px] block mt-0.5 text-slate-400">{p.perRender}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black text-lg text-slate-900">{p.price}</span>
                      {checkoutLoading === p.plan ? (
                        <span className="block text-[10px] font-bold text-indigo-600 mt-0.5">
                          <Loader2 size={10} className="inline animate-spin" />
                        </span>
                      ) : (
                        <span className="block text-[10px] font-bold text-slate-400">
                          {lang === 'es' ? 'pago único' : lang === 'fr' ? 'paiement unique' : lang === 'pt' ? 'pagamento único' : lang === 'de' ? 'Einmalzahlung' : lang === 'it' ? 'pagamento singolo' : 'one-time'}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center font-light">
                {lang === 'es' ? 'Pago seguro vía Stripe · Apple Pay · Google Pay' : lang === 'fr' ? 'Paiement sécurisé via Stripe · Apple Pay · Google Pay' : lang === 'pt' ? 'Pagamento seguro via Stripe · Apple Pay · Google Pay' : lang === 'de' ? 'Sichere Zahlung via Stripe · Apple Pay · Google Pay' : lang === 'it' ? 'Pagamento sicuro via Stripe · Apple Pay · Google Pay' : 'Secure payment via Stripe · Apple Pay · Google Pay'}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Login modal — only shown if user clicks Generate without auth */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in p-4"
          onClick={() => { setShowLogin(false); setPendingGenerate(false); resetProgress(); }}
        >
          <div
            className="bg-white p-5 md:p-8 rounded-2xl max-w-sm w-full text-center space-y-5 md:space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 bg-slate-900 flex items-center justify-center mx-auto rounded-xl">
              <span className="text-white font-serif font-black text-2xl italic">A</span>
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {t.signInTitle}
              </h3>
              <p className="text-slate-400 text-sm mt-2 font-light">{t.signInSubtitle}</p>
            </div>
            <button
              onClick={handleLoginGoogle}
              className="w-full py-4 bg-slate-900 text-white flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors font-black uppercase tracking-[0.15em] text-xs rounded-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t.signInGoogle}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">{t.signInOr}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {otpSent ? (
              <div className="space-y-3 text-left">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm font-bold text-emerald-700">{t.signInEmailSent}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.signInEmailSentHint}</p>
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">{t.signInSenderHint}</p>
                </div>
                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {t.signInCodeLabel}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={8}
                    value={otpCode}
                    onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 8)); setOtpError(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleVerifyOtp(); }}
                    placeholder={t.signInCodePlaceholder}
                    className="mt-1.5 w-full px-3 py-3 bg-white border border-slate-200 rounded-xl text-base font-mono tracking-[0.4em] text-center text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </label>
                {otpError && (
                  <p className="text-xs text-rose-600 font-light">{otpError}</p>
                )}
                <button
                  onClick={handleVerifyOtp}
                  disabled={otpVerifying || otpCode.length < 6}
                  className="w-full px-4 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  {otpVerifying ? t.signInCodeVerifying : t.signInCodeVerify}
                </button>
                <button
                  onClick={() => { setOtpSent(false); setOtpCode(''); setOtpError(null); }}
                  className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {t.signInChangeEmail}
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-left">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={otpEmail}
                    onChange={(e) => { setOtpEmail(e.target.value); if (otpError) setOtpError(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleLoginOtp(); }}
                    placeholder={t.signInEmailPlaceholder}
                    className="flex-1 px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleLoginOtp}
                    className="px-4 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-colors shrink-0"
                  >
                    {t.signInEmailSend}
                  </button>
                </div>
                {otpError && (
                  <p className="text-xs text-rose-600 font-medium px-1">{otpError}</p>
                )}
                <p className="text-[10px] text-slate-400 leading-snug px-1">{t.signInSenderHint}</p>
              </div>
            )}

            <button
              onClick={() => { setShowLogin(false); setPendingGenerate(false); setOtpSent(false); setOtpEmail(''); resetProgress(); }}
              className="text-slate-300 text-xs font-bold hover:text-slate-500 transition-colors"
            >
              {t.signInCancel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
