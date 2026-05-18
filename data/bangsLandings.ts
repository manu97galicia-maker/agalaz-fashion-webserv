/**
 * Korean / wispy / curtain bangs landings — research 2026-05-17.
 *
 * Japan dominates demand (前髪 90K/mo KD 0, シースルーバング 49K/mo, etc.) —
 * that market gets a standalone /ja/maegami page in native Japanese.
 *
 * For the global English market, /korean-bangs captures the secondary
 * "korean bangs / see-through bangs / wispy bangs" demand (~10-15K/mo).
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

export const koreanBangsEN: LongtailContent = {
  lang: 'en',
  category: 'hairstyle',
  theme: 'curtain-bangs',
  productLabel: 'Bangs reference photo',
  yourPhotoLabel: 'Your selfie',
  yourPhotoHint: 'Front-facing, hair clearly visible',
  productHint: 'Korean / see-through / wispy bangs reference (Pinterest, K-pop idol)',
  accent: 'hair',

  badge: 'Korean Bangs · AI Try-On',
  h1Top: 'Korean bangs',
  h1Italic: 'try see-through, wispy and idol-style bangs on your face in 30 sec.',
  hero:
    'See-through bangs, wispy bangs, idol bangs, blunt fringe — the Korean-Japanese bangs trend has 20+ named styles. Upload your selfie + any reference, AI shows the cut on YOUR face in 30 seconds. Free, no signup.',
  ctaPrimary: 'Try Korean bangs on me',
  ctaCaption: '✓ Free · ✓ No signup · ✓ 30 sec',

  whatTitle: 'Why Korean bangs are different',
  whatBody:
    'Korean bangs (and the Japanese シースルーバング / see-through bangs that birthed the trend) are surgically light — wispy, often parted, the forehead visible through them. The opposite of the 2010s heavy blunt fringe. They photograph soft, suit oval / heart / square faces, and grow out into curtain bangs gracefully. The catch: the cut is HARD to do without showing your stylist a clear reference. Agalaz lets you preview the cut on YOUR face, then bring the screenshot to the salon.',
  howKnowTitle: 'How to pick the right bangs style',
  howKnowBullets: [
    'See-through (シースルーバング) — Very light, forehead visible. Best for round/oval faces.',
    'Wispy bangs — Slightly heavier than see-through, more texture. Best for heart and square faces.',
    'Curtain bangs (Korean variant) — Longer, parted, frames the face. Best for round faces.',
    'Blunt fringe (ぱっつん) — Straight-cut, dense. Best for oblong / long faces.',
    'Air bangs / idol bangs — Very airy, hair barely touches the forehead. K-pop idol staple.',
  ],

  recommendedBadge: 'The 6 bangs styles to know',
  recommendedTitle: '6 Korean / K-style bangs and who they suit',
  recommended: [
    { name: 'See-through bangs (シースルーバング)', why: 'Light, parted at the middle of the forehead, hair almost translucent. The defining 2024-26 style. Best on most face shapes.' },
    { name: 'Wispy bangs', why: 'Slightly heavier, texturized. Frames the eyebrows. Best for heart and square faces.' },
    { name: 'Korean curtain bangs', why: 'Center-parted, longer than US curtain bangs (cheek length). Universally flattering.' },
    { name: 'Air bangs (エアバング)', why: 'Floaty, hair barely touches the brow. K-pop idol favorite. Best on fine to medium hair.' },
    { name: 'Side-swept Korean bangs', why: 'Like side-bangs but with Korean lightness — wispy and asymmetric.' },
    { name: 'Baby bangs (Korean version)', why: 'Above-brow, fringe sits high. Bold but balanced with see-through density.' },
  ],

  avoidBadge: 'Common bangs mistakes',
  avoidTitle: 'What NOT to do when getting Korean bangs',
  avoid: [
    { name: 'Cutting too thick on the first try', why: 'Korean bangs are LIGHT. Heavy 2010s blunt fringe will look dated. Ask for "see-through" or show your stylist the reference.' },
    { name: 'Cutting them dry without checking damp drape', why: 'Bangs shrink when dry. Stylist should cut damp, then dry-check, then adjust.' },
    { name: 'Getting bangs with a strong cowlick', why: 'Cowlicks at the hairline split blunt bangs. AI preview shows this BEFORE the cut.' },
  ],

  midCtaTitle: 'Before the chop',
  midCtaBody:
    'Bangs are 8-12 weeks of growing out if you regret them. Preview 4 styles on your face virtually first, pick the one that suits YOUR face, walk into the salon with confidence.',
  midCtaButton: 'Try Korean bangs now',

  faqTitle: 'Korean bangs AI try-on — FAQ',
  faq: [
    { q: 'Does it work with K-pop idol reference photos?', a: 'Yes. Screenshot any K-pop idol\'s bangs (Jungkook\'s curtain bangs, Lisa\'s see-through, Karina\'s air bangs) and the AI applies the style to your face in 30 seconds.' },
    { q: 'Will the AI keep my face / not morph me?', a: 'It keeps YOUR face, skin, body and background identical. Only the hair changes.' },
    { q: 'Can I see different lengths of the same bangs style?', a: 'Yes. After the first render, ask "longer" or "shorter" or "side-swept" and it re-renders in seconds.' },
    { q: 'What if I have a cowlick?', a: 'Upload your real selfie — the AI uses your actual hair pattern. If a style doesn\'t work due to a cowlick, you\'ll see it before committing.' },
    { q: 'How much does it cost?', a: 'First render is free, no signup. Packs from $4.99 (5 renders) or $9.99 (15). One-time.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Virtual try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=hairstyle',
};

// ───────────────────────────────────────────────────────────── ES ──────
//
// /es/flequillo-cortina — España, 18,100/mo `flequillo cortina` KD 0
// + 12,100/mo `flequillo` KD 3 + 8,100/mo `flequillo mariposa` KD 0
// + 3,600/mo `tipos de flequillo` KD 0 + 3,600/mo `pelo rizado con
// flequillo` KD 0 = ~50K/mo addressable.

export const flequilloCortinaES: LongtailContent = {
  lang: 'es',
  category: 'hairstyle',
  theme: 'curtain-bangs',
  productLabel: 'Foto de flequillo de referencia',
  yourPhotoLabel: 'Tu selfie',
  yourPhotoHint: 'De frente, pelo visible',
  productHint: 'Captura de flequillo (Pinterest, ídolo K-pop, IG)',
  accent: 'hair',

  badge: 'Flequillo cortina · Prueba virtual IA',
  h1Top: 'Flequillo cortina',
  h1Italic: 'pruébate el flequillo en tu cara antes de pisar la peluquería.',
  hero:
    'Flequillo cortina, mariposa, francés, see-through (estilo coreano), wispy, micro — sube un selfie + cualquier referencia y la IA aplica el flequillo en TU cara en 30 segundos. Antes de cortarlo (porque tarda 2-3 meses en crecer si te equivocas). Gratis, sin registro.',
  ctaPrimary: 'Prueba un flequillo en mi cara',
  ctaCaption: '✓ Gratis · ✓ Sin registro · ✓ 30 seg',

  whatTitle: 'Por qué el flequillo cortina arrasa en 2026',
  whatBody:
    'El flequillo cortina (también "flequillo Brigitte Bardot" o el coreano "see-through bangs") domina TikTok y Pinterest desde 2023 y se consolida en 2026. Es la apuesta segura para quien quiere flequillo SIN comprometerse a ojos cubiertos — se aparta naturalmente a los lados, crece en curtain shape, y enmarca caras redondas, cuadradas y corazón. Mariposa, francés, wispy, see-through, micro: hay 7+ variantes y la que te favorece depende de TU forma de cara. Antes de la cita, Agalaz te muestra las opciones en TI.',
  howKnowTitle: 'Cómo elegir el flequillo que te queda',
  howKnowBullets: [
    'See-through (coreano) — translúcido, frente visible. Ideal para cara redonda u ovalada.',
    'Wispy — algo más denso, textura. Cara corazón o cuadrada.',
    'Cortina largo (versión española / Brigitte) — abierto al medio, hasta el pómulo. Universal.',
    'Mariposa — capas que enmarcan + flequillo cortina. La versión 2024-26 viral.',
    'Francés (micro) — corto, encima de las cejas. Cara ovalada y corazón.',
  ],

  recommendedBadge: '6 flequillos que se llevan en 2026',
  recommendedTitle: '6 estilos de flequillo y a quién favorecen',
  recommended: [
    { name: 'Flequillo cortina clásico', why: 'Abierto al centro, cae a los pómulos. Universal — funciona en casi cualquier forma de cara y crece bien. El más seguro como primer flequillo.' },
    { name: 'Flequillo mariposa', why: 'Capas largas que enmarcan la cara + cortina al frente. La tendencia viral 2024-26. Mejor para pelo medio-grueso y caras corazón/cuadradas.' },
    { name: 'Flequillo see-through (coreano)', why: 'Translúcido, ligero, frente parcialmente visible. La revolución K-pop. Universal para casi cualquier cara.' },
    { name: 'Flequillo wispy', why: 'Algo más denso, texturizado. Enmarca cejas y pómulos. Mejor en cara corazón, cuadrada y diamante.' },
    { name: 'Flequillo francés / micro', why: 'Corto, encima de la ceja. Atrevido. Mejor para caras ovaladas y cuerpos pequeños — Audrey Hepburn coded.' },
    { name: 'Flequillo lateral', why: 'Asimétrico, suaviza la frente. Para alguien que quiere flequillo pero teme comprometerse — fácil de revertir hacia los lados.' },
  ],

  avoidBadge: 'Errores comunes al cortarse flequillo',
  avoidTitle: 'Lo que NO hay que hacer',
  avoid: [
    { name: 'Cortarlo todo de golpe sin probar', why: 'El flequillo es 2-3 meses de cara cubierta si te equivocas. Antes de la cita, prueba 3-4 estilos en tu cara con IA. Llevas la captura a la peluquería y le dices "este exacto".' },
    { name: 'Pedir flequillo si tienes remolino fuerte en la frente', why: 'El remolino divide el flequillo en dos partes que se separan solas — luce mal y no hay forma de domarlo sin tirones diarios. La IA te muestra si te va a pasar antes de cortarlo.' },
    { name: 'Cortar en seco sin chequeo en mojado', why: 'El pelo se encoge al secarse. La peluquera debe cortar húmedo → secar → ajustar. Si te cortan en seco sin secarte luego, el flequillo queda 1-2cm más corto del previsto.' },
  ],

  midCtaTitle: 'Antes de cortarlo',
  midCtaBody:
    'El flequillo es un compromiso de 8-12 semanas si te arrepientes. Pruébalo en TU cara virtualmente primero (mariposa vs cortina vs see-through), elige el que más te favorece, ve a la peluquería con la captura. Cero sorpresas.',
  midCtaButton: 'Probar flequillo ahora',

  faqTitle: 'Flequillo cortina prueba virtual IA — FAQ',
  faq: [
    { q: '¿Funciona con fotos de Pinterest / Instagram?', a: 'Sí. Sube cualquier captura de flequillo (de TikTok, Pinterest, ídolo K-pop, Vogue, etc.) + tu selfie de frente. La IA aplica ese flequillo exacto a TU cara en 30 segundos.' },
    { q: '¿La IA mantiene mi cara o me transforma?', a: 'Mantiene tu cara, piel, ojos y fondo idénticos. SOLO cambia el flequillo. No es un filtro — es una previsualización de cómo te vas a ver con ese corte.' },
    { q: '¿Puedo ver el mismo flequillo con largos distintos?', a: 'Sí. Tras el primer render, pídele "más corto", "más largo", "lateral", "más wispy" y rerenderiza en segundos.' },
    { q: '¿Funciona si tengo pelo rizado / afro / texturizado?', a: 'Sí. La IA respeta tu textura natural — el flequillo aparece adaptado a tu pelo (rizo apretado, ondas, liso). No te endereza el pelo a menos que se lo pidas.' },
    { q: '¿Y si tengo remolino o entradas?', a: 'La IA usa tu selfie real con tu hairline natural. Si un estilo no funciona por tu remolino o entradas, lo verás en el render antes de cortarlo. Justo el caso de uso.' },
    { q: '¿Cuánto cuesta?', a: 'Primer render gratis, sin registro. Después, packs de $4,99 (5 renders) o $9,99 (15). Pago único.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Prueba virtual',
  privacyLabel: 'Privacidad',
  tryOnHref: '/try-on?category=hairstyle',
};

// ───────────────────────────────────────────────────────────── PT ──────
//
// /pt/franja-cortininha — Brasil, 40,500/mo `franja` KD 0 +
// 12,100/mo `franja cortininha` KD 0 + 9,900/mo `franja lateral`
// KD 0 + 8,100/mo `tipos de franja` KD 0 + 6,600/mo `franja curtain
// bangs` KD 0 = ~75K/mo addressable.

export const franjaCortininhaPT: LongtailContent = {
  lang: 'pt',
  category: 'hairstyle',
  theme: 'curtain-bangs',
  productLabel: 'Foto de franja de referência',
  yourPhotoLabel: 'O teu selfie',
  yourPhotoHint: 'De frente, com o cabelo visível',
  productHint: 'Print de franja (Pinterest, ídolo K-pop, IG)',
  accent: 'hair',

  badge: 'Franja cortininha · Provador virtual IA',
  h1Top: 'Franja cortininha',
  h1Italic: 'experimenta a franja no teu rosto antes de ir ao cabeleireiro.',
  hero:
    'Franja cortininha, lateral, repicada, see-through (estilo coreano), micro, mariposa — carrega um selfie + qualquer referência e a IA aplica a franja no TEU rosto em 30 segundos. Antes de cortar (porque demora 2-3 meses a crescer se errares). Grátis, sem cadastro.',
  ctaPrimary: 'Experimentar franja no meu rosto',
  ctaCaption: '✓ Grátis · ✓ Sem cadastro · ✓ 30 seg',

  whatTitle: 'Por que a franja cortininha bombou em 2026',
  whatBody:
    'A franja cortininha (curtain bangs em inglês, "see-through" no estilo coreano) domina o TikTok e o Pinterest brasileiros desde 2023 e consolidou-se em 2026. É a opção mais segura para quem quer franja SEM compromisso de olhos cobertos — abre naturalmente para os lados, cresce no formato cortina, e enquadra rostos redondos, quadrados e em forma de coração. Cortininha, lateral, repicada, mariposa, micro: há 7+ variações e qual te favorece depende do TEU formato de rosto. Antes da consulta, o Agalaz mostra-te as opções em TI.',
  howKnowTitle: 'Como escolher a franja certa',
  howKnowBullets: [
    'Cortininha clássica — abre ao meio, cai nos pómulos. Universal.',
    'See-through (coreana) — translúcida, testa parcialmente visível. Ideal para rosto redondo ou oval.',
    'Mariposa — camadas longas que enquadram + cortininha à frente. A tendência viral 2024-26.',
    'Lateral — assimétrica, suaviza a testa. Fácil de reverter se mudares de ideia.',
    'Repicada — pontas desfiadas, leveza. Cabelo grosso ou ondulado.',
  ],

  recommendedBadge: '6 franjas que estão a bombar em 2026',
  recommendedTitle: '6 estilos de franja e a quem favorecem',
  recommended: [
    { name: 'Franja cortininha clássica', why: 'Aberta ao meio, cai nos pómulos. Universal — funciona em quase qualquer rosto e cresce bem. A escolha mais segura para uma primeira franja.' },
    { name: 'Franja mariposa', why: 'Camadas longas que enquadram + cortininha à frente. A tendência viral 2024-26. Melhor para cabelo médio-grosso e rosto coração/quadrado.' },
    { name: 'Franja see-through (coreana)', why: 'Translúcida, leve, testa parcialmente visível. A revolução K-pop. Universal para quase qualquer rosto.' },
    { name: 'Franja repicada', why: 'Pontas desfiadas, leveza, sem peso. Melhor para cabelos grossos ou ondulados que querem volume sem volume excessivo na franja.' },
    { name: 'Franja micro / curta', why: 'Acima da sobrancelha. Ousada. Melhor para rostos ovais e pequenos — vibe Audrey Hepburn.' },
    { name: 'Franja lateral', why: 'Assimétrica, suaviza a testa. Para quem quer franja mas tem receio do compromisso — fácil de reverter prendendo de lado.' },
  ],

  avoidBadge: 'Erros comuns ao cortar franja',
  avoidTitle: 'O que NÃO fazer',
  avoid: [
    { name: 'Cortar tudo de uma vez sem testar', why: 'A franja é 2-3 meses de rosto coberto se erras. Antes da consulta, testa 3-4 estilos no teu rosto com IA. Levas o print ao cabeleireiro e dizes "esta exacta".' },
    { name: 'Pedir franja se tens redemoinho forte na testa', why: 'O redemoinho divide a franja em duas partes que se separam sozinhas — fica feio e não há como domar sem puxões diários. A IA mostra se te vai acontecer antes de cortar.' },
    { name: 'Cortar com cabelo seco sem verificar molhado', why: 'O cabelo encolhe ao secar. A cabeleireira deve cortar molhado → secar → ajustar. Se cortam com cabelo seco e depois te secam, a franja fica 1-2cm mais curta do que esperavas.' },
  ],

  midCtaTitle: 'Antes de cortar',
  midCtaBody:
    'A franja é um compromisso de 8-12 semanas se te arrependeres. Experimenta no TEU rosto virtualmente primeiro (mariposa vs cortininha vs see-through), escolhe a que mais te favorece, vai ao cabeleireiro com o print. Zero surpresas.',
  midCtaButton: 'Experimentar franja agora',

  faqTitle: 'Franja cortininha provador virtual IA — FAQ',
  faq: [
    { q: 'Funciona com fotos do Pinterest / Instagram?', a: 'Sim. Carrega qualquer print de franja (do TikTok, Pinterest, ídolo K-pop, Vogue, etc.) + o teu selfie de frente. A IA aplica essa franja exacta ao TEU rosto em 30 segundos.' },
    { q: 'A IA mantém o meu rosto ou transforma-me?', a: 'Mantém o teu rosto, pele, olhos e fundo idênticos. SÓ muda a franja. Não é um filtro — é uma previsão de como vais ficar com aquele corte.' },
    { q: 'Posso ver a mesma franja com comprimentos diferentes?', a: 'Sim. Após o primeiro render, pede "mais curta", "mais comprida", "lateral", "mais leve" e re-renderiza em segundos.' },
    { q: 'Funciona com cabelo cacheado / afro / com textura?', a: 'Sim. A IA respeita a tua textura natural — a franja aparece adaptada ao teu cabelo (cacho apertado, ondas, liso). Não te alisa o cabelo a menos que peças.' },
    { q: 'E se tenho redemoinho ou entradas?', a: 'A IA usa o teu selfie real com a tua linha do cabelo natural. Se um estilo não funciona pelo teu redemoinho ou entradas, vais ver no render antes de cortar. É exactamente o caso de uso.' },
    { q: 'Quanto custa?', a: 'Primeiro render grátis, sem cadastro. Depois, packs de $4,99 (5 renders) ou $9,99 (15). Pagamento único.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador virtual',
  privacyLabel: 'Privacidade',
  tryOnHref: '/try-on?category=hairstyle',
};
