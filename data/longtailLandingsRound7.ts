/**
 * Round-7 — Spanish nail mega-clusters (DataForSEO 2026-05-12 verified).
 *
 * User insight: /es/probador-unas (existing localized landing) targets
 * "probador de uñas online" which has 0 monthly searches. Meanwhile huge
 * clusters exist:
 *   uñas francesas cluster:    323K/mo combined, KD 0-8
 *   uñas verano cluster:       120K/mo combined, KD 0 (seasonal)
 *   uñas de gel cluster:       200K/mo combined, KD 0
 *   diseños de uñas cluster:    80K/mo combined, KD 0
 *
 * These 4 new landings capture the head terms + cluster variants and
 * cross-link to /es/probador-unas for the try-on action.
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

/* ───────────────────────── /es/unas-francesas-disenos ───────────────────
 * 323K/mo combined cluster: "uñas francesas" (40.5K) + variantes.
 * KD 0-8. SERP: blogs de belleza + Pinterest + Instagram.
 */
export const unasFrancesasDisenos: LongtailContent = {
  lang: 'es',
  category: 'nail',
  productLabel: 'Referencia uñas francesas',
  accent: 'nail',

  badge: 'Uñas Francesas · IA Probador',
  h1Top: 'Uñas Francesas',
  h1Italic: 'diseños 2026 con probador IA.',
  hero:
    'Uñas francesas, francesita, francesa colorida, francesa invertida, micro-french — los 30 diseños más buscados de 2026 con probador virtual IA. Sube tu foto de mano y prueba cualquier diseño en 30 segundos antes de marcar la manicura.',
  ctaPrimary: 'Probar uñas francesas',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: '¿Por qué las uñas francesas siguen siendo el #1 en 2026?',
  whatBody:
    'La francesa (también llamada francesita o francesa clásica) es el diseño de uñas más versátil de la historia — combina con cualquier outfit, dura el doble que diseños cargados porque la punta blanca disimula el crecimiento, y funciona en cualquier longitud de uña. En 2026 ha evolucionado: micro-french (punta minúscula), francesa de colores, francesa invertida (la curva en la base en lugar de la punta), francesa con detalles dorados. Sigue siendo el corte más pedido en cabinas de manicura porque NUNCA pasa de moda.',
  howKnowTitle: 'Cómo probar el diseño antes de la sesión',
  howKnowBullets: [
    'Sube una foto clara de tu mano (palma o dorso, fondo claro)',
    'Sube la referencia del diseño francés que te gusta (Pinterest, Instagram, foto del salón)',
    'La IA aplica el diseño exacto en tus uñas reales en 30 segundos',
    'Compara 3-4 variantes lado a lado: clásica vs micro vs colorida',
    'Llega a la manicura sabiendo EXACTAMENTE qué pedir',
  ],

  recommendedBadge: '2026 Variantes en tendencia',
  recommendedTitle: 'Tipos de uñas francesas para probar',
  recommended: [
    { name: 'Francesa clásica (la atemporal)', why: 'Base nude rosado o transparente + punta blanca de 2-3mm. La opción más segura, combina con todo, dura hasta 4 semanas con esmalte semipermanente.' },
    { name: 'Micro-french (la trendy 2026)', why: 'Variante minimalista — la punta blanca es ULTRA fina (apenas 1mm). Look "clean girl" sofisticado. Funciona mejor en uñas amendra o ovaladas cortas.' },
    { name: 'Francesa colorida (lavanda, melocotón, verde menta)', why: 'Misma técnica clásica pero con la punta en color pastel suave en lugar de blanco. Permite expresarse sin perder elegancia. En tendencia: lavanda y verde menta 2026.' },
    { name: 'Francesa invertida / reverse french', why: 'La curva blanca va en la BASE de la uña (cerca de la cutícula), no en la punta. Look editorial. Perfecto para fotos pero no resiste tan bien el crecimiento.' },
    { name: 'Francesa con detalles dorados', why: 'Línea entre el nude y el blanco marcada con purpurina dorada fina o pegatina metálica. Para ocasiones especiales (boda, evento).' },
    { name: 'Francesa de gel (semipermanente)', why: 'La misma estética pero ejecutada con esmalte de gel/semipermanente. Dura 3-4 semanas en lugar de 5-7 días. La opción más rentable.' },
    { name: 'Francesita en uñas cortas / mordidas', why: 'Para quienes tienen uñas muy cortas o mordidas: micro-french funciona porque la proporción punta-base se mantiene incluso con poca longitud. La mejor "primera manicura".' },
    { name: 'Francesa "ombré" / degradada', why: 'Transición suave entre nude y blanco, sin línea marcada. Look airbrush. Más caro y técnico, pero muy elegante.' },
  ],

  avoidBadge: 'Errores típicos',
  avoidTitle: 'Errores comunes con la francesa',
  avoid: [
    { name: 'Punta blanca demasiado gruesa (>4mm)', why: 'Cuando la punta blanca es muy gruesa, la uña parece más pequeña y el efecto se vuelve "ochentero". Mantén entre 2-3mm para look 2026.' },
    { name: 'Sin base translucida (uña al desnudo)', why: 'La francesa NECESITA una base nude o rosa pálido para que la punta blanca destaque. Sin base se ve incompleta.' },
    { name: 'Usar blanco puro en piel oscura', why: 'Sobre piel morena u oscura, el blanco puro crea contraste excesivo. Mejor: blanco roto, beige o nude muy clarito como "blanco".' },
  ],

  midCtaTitle: 'Prueba tu francesa ideal antes del salón',
  midCtaBody:
    'Ver una francesa en Pinterest es una cosa. Verla sobre TUS uñas reales (tu tono de piel, tu forma de uña, tu longitud) es otra. Decide con datos: probador IA gratis, primer render sin tarjeta. Ahorra el "no me gustó cómo me quedó" de 30€ tirados.',
  midCtaButton: 'Probar francesa en mis uñas',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cuál es el diseño de uñas francesas más popular en 2026?',
      a: 'Micro-french en formato amendra o ovaladas cortas. Es la versión minimalista (punta blanca de 1mm), encaja con la estética clean girl, dura mejor que las versiones gruesas, y queda bien en cualquier longitud. Le sigue la francesa colorida (lavanda, verde menta).',
    },
    {
      q: '¿Diferencia entre uñas francesas y francesitas?',
      a: 'En España "francesita" es término más coloquial/diminutivo para la misma cosa. En México y LATAM se usa más "francesa". Técnica y diseño idénticos.',
    },
    {
      q: '¿Las uñas francesas funcionan en uñas cortas?',
      a: 'Sí — pero solo si usas la versión micro-french (punta de 1mm). Con punta clásica gruesa en uñas muy cortas la uña parece todavía más pequeña.',
    },
    {
      q: '¿Cuánto dura una francesa en gel / semipermanente?',
      a: 'En esmalte normal: 5-7 días. En semipermanente: 3-4 semanas con retoque de cutícula. En acrílico/gel UV de manicura: 4-6 semanas con rellenado.',
    },
    {
      q: '¿La IA respeta la forma real de mis uñas en el probador?',
      a: 'Sí. La IA preserva tu forma de uña (amendra, cuadrada, ovalada, redonda), longitud actual, y tono de piel. Solo aplica el diseño francés sobre TU uña real. Sube una foto y compáralo en 30 segundos.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador uñas',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/probador-unas',
};

/* ───────────────────────── /es/unas-verano-2026 ─────────────────────────
 * 120K/mo cluster: "uñas verano 2025" (74K) + variantes estacionales.
 * KD 0. Pico estacional mayo-agosto. SERP: blogs + Pinterest.
 */
export const unasVerano2026: LongtailContent = {
  lang: 'es',
  category: 'nail',
  productLabel: 'Diseño uñas verano',
  accent: 'nail',

  badge: 'Uñas Verano · IA Probador',
  h1Top: 'Uñas verano 2026',
  h1Italic: 'tendencias y probador IA gratis.',
  hero:
    '40+ diseños de uñas para verano 2026 — coral, azul cielo, milky white, glazed donut, francesita colorida, frutas, conchas marinas, neón pastel. Pruébalos en tus manos reales con IA antes de marcar la cita de manicura. Gratis, primer render sin tarjeta.',
  ctaPrimary: 'Probar uñas verano',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: 'Las tendencias de uñas que arrasarán en verano 2026',
  whatBody:
    'El verano 2026 reescribe las reglas: los tonos pastel saturados se imponen sobre los neón (saturación baja gana a saturación alta), el "glazed donut" sigue siendo el efecto más buscado pero ahora en versiones azul cielo y coral además del clásico nacarado, las francesitas vuelven en colores frutales (sandía, melón, kiwi), y las uñas "ojo de tigre" con efecto cromado mineral se imponen como tendencia editorial. Aquí están las 8 tendencias que verás en cada salón de manicura entre mayo y agosto 2026.',
  howKnowTitle: 'Antes de marcar la manicura',
  howKnowBullets: [
    'Sube una foto de tu mano (palma o dorso)',
    'Sube la referencia del diseño veraniego que te gusta (Pinterest, Instagram, captura)',
    'La IA aplica el diseño en tus uñas en 30 segundos',
    'Compara 3-4 tendencias del verano 2026 lado a lado',
    'Decide con seguridad qué pedir en la sesión',
  ],

  recommendedBadge: 'Tendencias verano 2026',
  recommendedTitle: 'Diseños de uñas para verano 2026',
  recommended: [
    { name: 'Coral saturado baja', why: 'El color del verano 2026. Coral con menor saturación que el flúor clásico — más sofisticado, igual de veraniego. Va bien en cualquier tono de piel.' },
    { name: 'Glazed donut azul cielo', why: 'El efecto "rocío matinal" de Hailey Bieber, ahora en azul cielo en lugar de nacarado. Combina con looks playeros y mediterráneos.' },
    { name: 'Milky white (uñas blancas lechosas)', why: 'Blanco translúcido tipo "porcelana". Combina con todo, mantiene el bronceado de fondo. Look clean girl puro.' },
    { name: 'Francesita coral / sandía', why: 'Francesa clásica pero con la punta en coral, sandía o melón. La versión 2026 de la francesa colorida.' },
    { name: 'Ojo de tigre / efecto cromado mineral', why: 'Esmalte con polvo cromado que refleja como las gemas. Editorial pero usable. Marrón-dorado o azul-plata.' },
    { name: 'Pastel neón (lavanda, verde menta, melocotón)', why: 'Pasteles con un punto de saturación. Más "happy" que pasteles puros sin saber a flúor.' },
    { name: 'Frutas pintadas (sandía, kiwi, limón)', why: 'Una uña de cada mano con fruta detallada, el resto en nude o esmalte de color sólido. Para gente que se atreve.' },
    { name: 'Uñas primaverales 2025 reciclables a verano', why: 'Los diseños primaverales (florales, mariposas, libélulas) funcionan también en verano si las cambias a paleta más cálida (coral, amarillo dorado, verde manzana).' },
  ],

  avoidBadge: 'Evita en verano',
  avoidTitle: 'Diseños que NO funcionan en verano 2026',
  avoid: [
    { name: 'Esmalte oscuro (negro, burdeos, gris)', why: 'Visualmente recargan demasiado contra piel bronceada y outfits ligeros. Resérvalos para otoño-invierno.' },
    { name: 'Diseños navideños / florales invernales', why: 'Obvio pero sucede — copos, hojas otoñales, terciopelos. Cámbialos a paleta verano.' },
    { name: 'Acrílicos muy largos (>2cm)', why: 'Verano = playa, piscina, comida fresca. Uñas muy largas son incómodas y se rompen más con la actividad veraniega. Mejor longitud media-corta.' },
  ],

  midCtaTitle: 'Llega a la manicura con la decisión clara',
  midCtaBody:
    'Ver 100 diseños de verano en Pinterest no te ayuda — te paraliza. Sube tu foto + la referencia que más te gusta, y comprueba en 30 segundos si te queda bien antes de pagar 25-50€. Primer render gratis, sin tarjeta.',
  midCtaButton: 'Probar uñas verano',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cuál es la tendencia de uñas más fuerte para el verano 2026?',
      a: 'Coral saturado bajo (no flúor, más sofisticado) y glazed donut en versión azul cielo. Ambos compatibles con cualquier estilo, ambos viralizados ya en TikTok en marzo-abril 2026.',
    },
    {
      q: '¿Qué uñas usar en la playa / piscina sin que se estropeen?',
      a: 'Esmalte semipermanente (gel) en lugar de esmalte normal — el cloro y el sol degradan el esmalte normal en 2-3 días. Semipermanente aguanta 3-4 semanas incluso con uso intensivo.',
    },
    {
      q: '¿Diseños veraniegos para uñas cortas o mordidas?',
      a: 'Micro-french coral, milky white, glazed donut en formato corto. Todos funcionan perfectamente en uñas cortas — la longitud no condiciona el color, solo el tipo de nail art muy elaborado.',
    },
    {
      q: '¿Uñas primaverales 2025 se pueden mantener para verano?',
      a: 'Sí, con ajuste de paleta. Los diseños florales se mantienen pero cámbialos de tonos pastel fríos (rosa pálido) a cálidos (coral, melocotón). Las francesitas pastel se mantienen igual.',
    },
    {
      q: '¿La IA respeta mi tono de piel real para ver cómo me queda el coral?',
      a: 'Sí. Esto es exactamente lo que más importa con coral, salmón, melocotón — el contraste con TU tono de piel real. La IA preserva tu piel y solo aplica el color en tus uñas. Pruébalo gratis.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador uñas',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/probador-unas',
};

/* ───────────────────────── /es/unas-de-gel-disenos ──────────────────────
 * 200K/mo cluster: "uñas de gel" + "semipermanentes" + "gelish".
 * KD 0. Transaccional. SERP: blogs + retailers de manicura.
 */
export const unasGelDisenos: LongtailContent = {
  lang: 'es',
  category: 'nail',
  productLabel: 'Diseño uñas gel',
  accent: 'nail',

  badge: 'Uñas de Gel · IA Probador',
  h1Top: 'Uñas de gel',
  h1Italic: 'diseños y probador IA gratis.',
  hero:
    'Diseños de uñas de gel, semipermanentes y gelish — 30+ ideas que duran 3-4 semanas sin descascarillarse. Decoradas, francesitas, glazed donut, ojo de tigre, milky white. Pruébalos en tus manos reales con IA antes del salón. Gratis.',
  ctaPrimary: 'Probar uñas de gel',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: 'Diferencias entre gel, semipermanente y gelish — todo lo que importa',
  whatBody:
    'Hay confusión total entre estos términos. **Gel** (UV/LED): construcción sobre la uña con producto que se cura bajo lámpara. Más resistente, hasta 6 semanas. **Semipermanente**: esmalte que se cura bajo lámpara LED pero NO construye sobre la uña — solo da color. Dura 3-4 semanas. **Gelish**: una marca específica de semipermanente (popular en LATAM y por eso muchos la confunden con la técnica). Para el USUARIO la diferencia clave es duración y precio: semipermanente 15-30€ cada 3-4 semanas, gel construido 25-50€ cada 5-6 semanas. La elección depende de cuánto te aburres del diseño y cuánto presupuesto inviertes.',
  howKnowTitle: 'Cómo decidir el diseño antes de pagar 30-50€',
  howKnowBullets: [
    'Sube una foto de tu mano',
    'Sube la referencia del diseño que has visto en Instagram, Pinterest o el catálogo del salón',
    'La IA aplica el diseño exacto en 30 segundos',
    'Decide con confianza qué pedir: francesita, glazed, decorada, lisa',
    'Llega al salón sabiendo qué quieres EXACTAMENTE',
  ],

  recommendedBadge: 'Diseños 2026 más pedidos',
  recommendedTitle: 'Diseños de uñas de gel que duran y favorecen',
  recommended: [
    { name: 'Gel francesita clásica', why: 'La opción más versátil. Dura 3-4 semanas, va con todo, fácil de retocar. El 40% de las clientas piden esto.' },
    { name: 'Gel glazed donut nacarado', why: 'Efecto "rocío" con cromado fino. Más duradero que el efecto en esmalte normal porque el gel preserva el brillo.' },
    { name: 'Gel decorado con detalles dorados', why: 'Base nude o blanco + detalles dorados (purpurina, foil, pegatinas). El gel sella los detalles → duran las 4 semanas completas.' },
    { name: 'Semipermanente lisa milky white', why: 'Blanco lechoso translúcido. Va con cualquier outfit, esconde imperfecciones, dura mejor que el blanco puro.' },
    { name: 'Gel ojo de tigre / efecto magnético', why: 'Esmalte de gel con polvo magnético que crea efecto 3D al pasar un imán. Editorial pero usable a diario.' },
    { name: 'Gel decoradas con flores 3D', why: 'Microflores en relieve aplicadas con técnica acrílica + gel encima. Aguantan el mes completo.' },
    { name: 'Gelish color sólido (rojo, burdeos, nude)', why: 'La elección práctica — gelish en un color sólido bonito = 20€ y 3 semanas tranquila. Sin nail art.' },
    { name: 'Semi permanente con baby boomer', why: 'Degradado suave de nude a blanco. Manicura editorial / nupcial. Dura 3-4 semanas.' },
  ],

  avoidBadge: 'Errores con gel/semi',
  avoidTitle: 'Errores comunes al elegir gel',
  avoid: [
    { name: 'Pedir gel construido cuando solo quieres color', why: 'Si solo quieres COLOR (no longitud extra), pide semipermanente, no gel. Gel construido para alargar = 50€ vs semipermanente plano = 20€.' },
    { name: 'Esmalte muy oscuro sin base preparada', why: 'Negro / burdeos / azul marino mancha la uña natural cuando lo retiren. Pide siempre base protectora antes del color oscuro.' },
    { name: 'Decoración muy elaborada en gel pero sobre uña corta', why: 'El detalle elaborado pierde impacto en uña muy corta. Si tu uña es <8mm de longitud, opta por color sólido o francesita.' },
  ],

  midCtaTitle: 'Antes de gastar 30-50€, prueba el diseño',
  midCtaBody:
    'Una manicura de gel mal elegida = 3-4 semanas viéndotela y odiándola. La IA te muestra cómo te queda EXACTAMENTE en tu mano antes de pagar. Primer render gratis, sin tarjeta.',
  midCtaButton: 'Probar uñas de gel ahora',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cuánto duran las uñas de gel comparadas con el esmalte normal?',
      a: 'Gel construido: 5-7 semanas con rellenado. Semipermanente (gelish): 3-4 semanas. Esmalte normal: 4-7 días. La diferencia es enorme — gel es la inversión rentable si haces manicura mensual.',
    },
    {
      q: '¿Qué uñas de gel decoradas duran más?',
      a: 'Las que tienen el decoro SELLADO bajo capa de top coat gel: francesita, detalles dorados con foil, flores 3D bien cubiertas. Las que se descascarillan primero: glitter sobre base sin top coat, stickers no sellados.',
    },
    {
      q: '¿Es lo mismo gelish que semipermanente?',
      a: 'Gelish es una MARCA de semipermanente (de Nail Alliance, popular en LATAM). Semipermanente es la TÉCNICA — esmalte con curado UV/LED. Todas las gelish son semi, no todas las semi son gelish.',
    },
    {
      q: '¿Cómo se quita el gel correctamente sin dañar la uña?',
      a: 'NUNCA tires con los dientes ni tijeras. En el salón: limado superior + acetona + papel aluminio durante 15 min, retiran con palillo de naranjo. En casa: misma técnica si tienes acetona pura. Dañas la uña natural si retiras sin acetona.',
    },
    {
      q: '¿La IA puede mostrar el diseño con el efecto gel/brillo?',
      a: 'Sí. La IA preserva el brillo y la textura típica del gel (más reflectante que esmalte mate). Sube la referencia con efecto gel y verás cómo te queda con ese mismo acabado.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador uñas',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/probador-unas',
};

/* ───────────────────────── /es/disenos-de-unas ──────────────────────────
 * 80K/mo cluster: "diseños de uñas" (27K) + "uñas decoradas" (22K) +
 * variantes. KD 0. Informacional. SERP: blogs + Pinterest.
 */
export const disenosDeUnas: LongtailContent = {
  lang: 'es',
  category: 'nail',
  productLabel: 'Diseño de uñas',
  accent: 'nail',

  badge: 'Diseños de Uñas · IA Probador',
  h1Top: 'Diseños de uñas',
  h1Italic: 'decoradas 2026 con probador IA gratis.',
  hero:
    '50+ diseños de uñas decoradas, francesitas, glazed, milky white, coquette, ojo de tigre, gel — clasificados por temporada, tipo de uña y nivel de dificultad. Pruébalos en tu mano real con IA en 30 segundos antes de marcar la manicura.',
  ctaPrimary: 'Probar diseño',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: 'Por dónde empezar a elegir un diseño de uñas',
  whatBody:
    'Ante 1.000 referencias en Pinterest, paralisis. La regla práctica para decidir rápido: empieza por la PERMANENCIA (cuántas semanas quieres llevarlo) → eso decide la técnica (esmalte normal vs gel). Luego decide la INTENSIDAD (cuánto destacas) → eso decide entre color sólido, francesita, decorado simple o nail art. Por último elige el COLOR según la temporada o el outfit dominante. En este orden, llegas al diseño correcto en 5 minutos en lugar de 2 horas mirando Pinterest.',
  howKnowTitle: 'Probador IA: el atajo a la decisión',
  howKnowBullets: [
    'Sube una foto clara de tu mano',
    'Sube la referencia del diseño candidato (Pinterest, Instagram, captura del salón)',
    'La IA aplica el diseño en tus uñas reales en 30 segundos',
    'Compara 4-5 candidatos lado a lado',
    'Decide con confianza — sin perder 2 horas mirando referencias',
  ],

  recommendedBadge: 'Por categoría',
  recommendedTitle: 'Diseños de uñas más buscados 2026',
  recommended: [
    { name: 'Diseños de uñas francesitas (la opción atemporal)', why: 'Punta blanca o de color sobre base nude. Va con todo, dura más que diseños cargados, queda bien en cualquier longitud. Empieza por aquí si dudas.' },
    { name: 'Diseños de uñas decoradas con flores', why: 'Flores blancas o pasteles sobre base nude o esmalte sólido. Versión 2026: flores 3D minimalistas en solo 1-2 uñas por mano.' },
    { name: 'Diseños de uñas en gel con dorado', why: 'Base de color sólido + detalles dorados (purpurina, foil, líneas finas). Look elegante para ocasiones especiales o uso diario sofisticado.' },
    { name: 'Diseños de uñas glazed donut / cromado', why: 'Efecto perlado / cromado en tonos nude, rosa, azul o plata. Una de las tendencias más virales de 2024-2026.' },
    { name: 'Diseños de uñas amendra cortas', why: 'Forma amendra (punta ligeramente redondeada) en longitud corta. La forma más versátil — alarga visualmente los dedos sin dramatismo.' },
    { name: 'Diseños de uñas coquette (rosa con lazos)', why: 'Base rosa pálido + mini lazos, perlas o detalles barrocos en 1-2 uñas. Tendencia 2024-2026.' },
    { name: 'Diseños de uñas con francesa coloreada', why: 'La técnica clásica con la punta en lavanda, melón, verde menta o cualquier pastel. Vuelta de la francesita en versión moderna.' },
    { name: 'Diseños de uñas geométricos minimalistas', why: 'Líneas finas geométricas (un triángulo, un círculo, una L) en negro o dorado sobre base nude. Look editorial sin exceso.' },
  ],

  avoidBadge: 'Cuidado con',
  avoidTitle: 'Errores típicos al elegir diseño',
  avoid: [
    { name: 'Saturar las 10 uñas con nail art elaborado', why: 'Regla 1-2 uñas decoradas, resto sólido. Las 10 uñas decoradas saturan visualmente y aburren a los 3 días.' },
    { name: 'Elegir el diseño solo por Pinterest sin probarlo en TU mano', why: 'El mismo diseño cae distinto en cada tono de piel + forma de uña. Pruébalo virtualmente antes de pagar 25-50€.' },
    { name: 'Diseños muy intricados en uña muy corta', why: 'Nail art elaborado pierde impacto en uñas <8mm. Para uñas cortas: color sólido o francesita.' },
  ],

  midCtaTitle: 'Salta el "no me gusta cómo me quedó"',
  midCtaBody:
    'Una sesión de manicura mal elegida = 3-4 semanas mirándotela. La IA te muestra cómo te queda EXACTAMENTE en TU mano antes de gastar. Primer render gratis, sin tarjeta.',
  midCtaButton: 'Probar diseño en mi mano',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cuáles son los diseños de uñas más populares en 2026?',
      a: 'Top 5 más pedidos en salones de manicura España y LATAM: micro-french, glazed donut nacarado, milky white, francesita coloreada (pastel) y diseños minimalistas con detalle dorado. Coquette sigue fuerte pero ya menos viral.',
    },
    {
      q: '¿Qué uñas decoradas duran más?',
      a: 'Las hechas en GEL/semipermanente con decoro SELLADO bajo top coat: francesitas, líneas finas con foil, flores 3D bien cubiertas. Duran 3-4 semanas. Las que se descascarillan primero: stickers no sellados, glitter sin top coat.',
    },
    {
      q: '¿Diseños de uñas para uñas cortas?',
      a: 'Micro-french, milky white, glazed donut, francesita coloreada, color sólido con UN detalle dorado en una uña. Evita nail art muy elaborado — no destaca en longitudes <8mm.',
    },
    {
      q: '¿Cuánto cuesta un diseño de uñas en España y México?',
      a: 'España: 25-50€ semipermanente decorada, 35-70€ gel construido. México: 250-600 MXN semipermanente decorada, 400-900 MXN gel. Precios típicos en salones de calidad media.',
    },
    {
      q: '¿La IA respeta el efecto brillo / mate / cromado del diseño?',
      a: 'Sí. La IA preserva acabados (mate, brillo gel, cromado, perlado, glazed). Sube la referencia con el acabado deseado y la verás reproducida en tu uña real.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador uñas',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/probador-unas',
};
