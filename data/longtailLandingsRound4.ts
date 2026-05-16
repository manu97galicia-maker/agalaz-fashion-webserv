/**
 * Round-4 disfraces / cosplay landings — Spanish (MX + ES targets).
 * Shipped 2026-05-11 after SERP-verifying the Spanish costume cluster.
 *
 * Strategy: target Mexican Spanish (where Pinterest + .com.mx blogs
 * dominate the SERP — soft) and Spain-targeted DIY/ideas queries
 * where Pinterest also dominates. Avoid the Amazon-locked Spain
 * head terms ("disfraz halloween" sin modificador).
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

/* ───────────────────────── /es/disfraz-de-halloween ─────────────────────────
 * Cluster: MX 165K/mo head + ES 33.1K head. KD 0-6. SERP MX top 3: .com.mx
 * + Pinterest (softness 13 — soft). SERP ES: Amazon-locked. We target
 * MX-LATAM primarily with hreflang and Mexican-friendly copy.
 */
export const disfrazDeHalloween: LongtailContent = {
  lang: 'es',
  category: 'costume',
  productLabel: 'Disfraz de referencia',
  accent: 'nail',
  theme: 'costume',

  badge: 'Disfraz Halloween · IA',
  h1Top: 'Disfraz de Halloween',
  h1Italic: 'pruébatelo antes de comprar.',
  hero:
    'Disfraz de Halloween 2026 — mujer, hombre, niñas, en pareja o grupo. Pruébate cualquier disfraz en tu foto real con IA antes de comprar. Catrina, bruja, vampiro, Wednesday, Barbie, Día de Muertos. Gratis, primer render sin tarjeta.',
  ctaPrimary: 'Probar disfraz gratis',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: '¿Buscas el disfraz de Halloween perfecto?',
  whatBody:
    'En 2026 los disfraces más buscados son Wednesday Addams, Barbie y Ken, Catrina mexicana, brujas con estética coquette, vampiros estilo Crepúsculo y payasos a lo Pennywise. El problema: gastas dinero en algo que no te queda bien y la devolución es imposible. Solución: pruébatelo en tu foto con IA primero, en 30 segundos.',
  howKnowTitle: 'Cómo funciona la prueba virtual',
  howKnowBullets: [
    'Subes una foto clara tuya (cuerpo completo o tres cuartos)',
    'Subes una foto del disfraz (referencia de Pinterest, Mercado Libre, Amazon, Liverpool, Walmart)',
    'La IA ajusta el disfraz a tu cuerpo real en 30 segundos',
    'Ves exactamente cómo te queda — tono de piel, proporciones, fit',
    'Decides comprar con certeza, o pruebas otro disfraz gratis',
  ],

  recommendedBadge: 'Más buscados 2026',
  recommendedTitle: 'Disfraces de Halloween en tendencia',
  recommended: [
    { name: 'Catrina mexicana', why: 'El clásico de Día de Muertos. Vestido largo negro o blanco con corona de flores y maquillaje calavera. Funciona en cualquier figura.' },
    { name: 'Wednesday Addams', why: 'Vestido negro con cuello blanco y trenzas. Fácil de armar con ropa propia, perfecto para grupo o pareja.' },
    { name: 'Bruja moderna (Hocus Pocus revival)', why: 'Vestido largo verde, morado o negro con sombrero puntiagudo. Variantes glam o casuales.' },
    { name: 'Vampiro o vampiresa', why: 'Capa negra con cuello alto, camisa blanca y colmillos. Sexy o gótico clásico, dos enfoques.' },
    { name: 'Pareja Barbie y Ken', why: 'Rosa total para ella, traje pastel con cuello en V para él. Atemporal tras la película de Greta Gerwig.' },
    { name: 'Catrín masculino', why: 'Esmoquin negro con chaleco y calavera maquillada. Equivalente masculino de la Catrina.' },
    { name: 'Payaso terrorífico (Pennywise)', why: 'Traje plata o blanco con globo rojo y maquillaje. Impacto visual garantizado.' },
    { name: 'Disfraz de niñas Halloween', why: 'Princesa oscura, bruja mini, Wednesday infantil, calabaza con leggings. Cómodos para trick-or-treat.' },
  ],

  avoidBadge: 'Errores comunes',
  avoidTitle: 'Errores al comprar disfraz Halloween',
  avoid: [
    { name: 'Comprar talla equivocada online sin probar', why: 'Los disfraces vienen pequeños el 60% de las veces. Resultado: incómodo toda la noche, devolución imposible.' },
    { name: 'Disfraz demasiado complicado para la temperatura', why: 'En México hace calor incluso en octubre. Pieles sintéticas pesadas y sudor toda la noche.' },
    { name: 'Maquillaje sin probar antes', why: 'Catrina y payaso requieren práctica. Hazlo 1-2 veces antes del 31 para perfeccionarlo.' },
  ],

  midCtaTitle: 'Pruébate el disfraz antes de gastar',
  midCtaBody:
    'Ver un disfraz en Mercado Libre es una cosa. Verlo en TU cuerpo — tu altura, tu figura, tu tono de piel — es otra. Decide con certeza, sin devoluciones. Primer render gratis, sin tarjeta.',
  midCtaButton: 'Probar disfraz en mi foto',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cuál es el mejor disfraz de Halloween para mujer en 2026?',
      a: 'Los más populares: Wednesday, Catrina, bruja moderna, Barbie y vampiresa. Si tienes pareja, el dúo Barbie y Ken arrasa. Pruébalos todos en tu foto y elige.',
    },
    {
      q: '¿Qué disfraz de Halloween para pareja funciona mejor?',
      a: 'Barbie y Ken, Wednesday y Enid, Bonnie y Clyde, Día de Muertos (Catrina y Catrín), Sandy y Danny de Grease. La IA permite probar ambos disfraces juntos en una foto de pareja.',
    },
    {
      q: '¿Hay disfraces de Halloween para niñas que pruebe la IA?',
      a: 'Sí, soporta disfraces infantiles. Súbele una foto de tu hija más el disfraz que viste en Walmart, Liverpool o Mercado Libre y ve el resultado antes de comprar.',
    },
    {
      q: '¿Cuánto cuesta probarse un disfraz con IA?',
      a: 'Gratis el primer render HD. Después pagas solo si quieres más pruebas, paquete de 8 desde 4.99 USD. Sin suscripción.',
    },
    {
      q: '¿Sirve también para Día de Muertos y Catrina?',
      a: 'Sí. Sube una foto y una referencia de Catrina (vestido, maquillaje y corona de flores). La IA respeta tu rostro y aplica el disfraz completo.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/try-on?category=costume',
};

/* ───────────────────────── /es/cosplay ──────────────────────────────────────
 * Cluster: MX 40.5K + ES 14.8K head. KD 0-11. SERP MX softness 10
 * (Wikipedia + .com.mx + greenstuffworld). ES softness 4 (Wiki + Shein).
 * Mixed informational + commercial intent.
 */
export const cosplayEsLanding: LongtailContent = {
  lang: 'es',
  category: 'cosplay',
  productLabel: 'Referencia cosplay',
  accent: 'nail',
  theme: 'cosplay',

  badge: 'Cosplay · IA',
  h1Top: 'Cosplay',
  h1Italic: 'pruébalo antes de gastar.',
  hero:
    'Cosplay de anime, videojuegos, Marvel, Star Wars o personaje original. Visualiza el cosplay completo (peluca, armadura, props) sobre TU cuerpo real con IA antes de gastar 200 USD en una peluca y tres meses cortando goma EVA. La Mole, Comic-Con Latinoamérica, FACTS Belgium, Japan Expo — llega con el look que de verdad querías.',
  ctaPrimary: 'Probar cosplay gratis',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: '¿Qué es exactamente un cosplay?',
  whatBody:
    'Cosplay (de "costume play") es la práctica de disfrazarse como un personaje de anime, manga, videojuego, comic o cualquier ficción. Combina vestuario, peluca, maquillaje, props y a veces armadura. En México y España la comunidad ha explotado: La Mole, Comic-Con, Otaku Fest, salones nacionales. El reto: el cosplay correcto cuesta dinero y tiempo, y muchos cosplayers acaban con un personaje que no les sienta bien.',
  howKnowTitle: 'Antes de comprar peluca, tela y accesorios',
  howKnowBullets: [
    'Sube tu foto (frente o tres cuartos, cuerpo completo)',
    'Sube referencia del cosplay (screenshot del anime, art oficial, fan art, Etsy, Taobao)',
    'La IA ajusta peluca, traje y props en 30 segundos',
    'Comprueba si el personaje te queda bien antes de gastar miles de pesos',
    'Prueba 3-4 personajes lado a lado sin costo extra',
  ],

  recommendedBadge: 'Cosplays populares 2026',
  recommendedTitle: 'Cosplay para probar antes de la convención',
  recommended: [
    { name: 'Anime: Demon Slayer (Tanjiro, Nezuko, Zenitsu)', why: 'Trajes haori coloridos, peluca específica, máscara de Nezuko. Funciona en cualquier figura.' },
    { name: 'Genshin Impact (Raiden Shogun, Hu Tao, Kazuha)', why: 'Vestidos elaborados con detalles dorados, pelucas largas pastel u oscuras. Inversión alta — pruébalo primero.' },
    { name: 'Marvel: Spider-Verse, Loki, Wanda', why: 'Spandex pegado al cuerpo. Si no te queda bien la silueta, no funciona. La IA muestra el fit real.' },
    { name: 'Star Wars (Rey, Padmé, Mandaloriano)', why: 'Robes, túnicas, armadura. Versátil para cualquier convención.' },
    { name: 'Final Fantasy o Zelda', why: 'Trajes con accesorios complejos (espadas, escudos). Pruébalo antes de comprar la prop.' },
    { name: 'OC (personaje original)', why: 'Tu propio personaje basado en mood-board. Sube referencia y tu foto y la IA te muestra cómo se ve.' },
    { name: 'Cosplay de pareja', why: 'Asuka y Shinji, Eren y Mikasa, Zelda y Link, Hu Tao y Xiao. La IA permite probar ambos en una foto de pareja.' },
    { name: 'Cosplay barato (closet cosplay)', why: 'Personajes que puedes armar con ropa propia (Sailor Moon casual, Tanjiro modo uniforme escolar). La IA confirma si funciona antes.' },
  ],

  avoidBadge: 'Errores caros',
  avoidTitle: 'Errores caros en cosplay',
  avoid: [
    { name: 'Comprar peluca cara sin probar', why: 'Una peluca pastel mal escogida puede arruinar el cosplay completo. Pruébala virtualmente primero.' },
    { name: 'Elegir personaje sin pensar en tu cuerpo', why: 'No todos los personajes funcionan en todas las figuras. La IA muestra el match real antes de gastar.' },
    { name: 'Hacer armadura EVA sin saber si te queda', why: 'Tres meses de trabajo y materiales para descubrir que las hombreras se ven raras. Render virtual primero, ahorrate la frustración.' },
  ],

  midCtaTitle: 'Prueba el cosplay antes de invertir',
  midCtaBody:
    'Ver fan art de Genshin es una cosa. Ver a Raiden Shogun en TU rostro y TU cuerpo es otra. Decide qué personaje cosplayear este año con datos, no con suerte. Primer render gratis.',
  midCtaButton: 'Probar cosplay en mi foto',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cómo elegir mi primer cosplay?',
      a: 'Empieza con un personaje cuya silueta se parezca a la tuya. Anime y manga shōnen suelen tener trajes más universales. Prueba 3-4 candidatos con IA antes de comprar nada.',
    },
    {
      q: '¿Cuánto cuesta un cosplay completo?',
      a: 'Desde 500 MXN (closet cosplay con ropa propia) hasta 8000+ MXN (cosplay competitivo con armadura). La diferencia: planificación. Pruébalo con IA antes de gastar.',
    },
    {
      q: '¿Sirve para cosplay de Genshin u Honkai con vestidos elaborados?',
      a: 'Sí. La IA preserva detalles complejos: bordados, capas, accesorios, armadura. Ideal antes de invertir en una peluca o traje custom de Etsy o Taobao.',
    },
    {
      q: '¿Funciona para crossplay o gender-bend cosplay?',
      a: 'Sí. La IA respeta tu cuerpo real y aplica el cosplay tal como lo referencias, incluyendo versiones genderbend o crossplay.',
    },
    {
      q: '¿Puedo probar cosplay de pareja o grupo?',
      a: 'Sí. Sube una foto en pareja y aplica el cosplay sobre ambos. Útil para Akatsuki en grupo, parejas de Genshin, Stranger Things.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/try-on?category=cosplay',
};

/* ───────────────────────── /es/disfraz-halloween-pareja ────────────────────
 * Cluster: MX 12.1K × 2 variantes + ES "ideas disfraz pareja" 3K. KD 0.
 * SERP softness 9-10 (Pinterest + .com.mx).
 */
export const disfrazHalloweenPareja: LongtailContent = {
  lang: 'es',
  category: 'costume',
  productLabel: 'Disfraz de pareja',
  accent: 'nail',
  theme: 'halloween-couples',

  badge: 'Disfraz pareja Halloween · IA',
  h1Top: 'Disfraz de Halloween',
  h1Italic: 'en pareja.',
  hero:
    'Ideas de disfraz de Halloween en pareja 2026: Barbie y Ken, Wednesday y Enid, Catrina y Catrín, Bonnie y Clyde, Sandy y Danny de Grease. Pruébense ambos disfraces en una foto de pareja con IA antes de comprar. 30 segundos, gratis.',
  ctaPrimary: 'Probar disfraz pareja',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: 'Por qué Halloween en pareja arrasa en 2026',
  whatBody:
    'Los disfraces en pareja generan 3 veces más interacción en redes que los individuales — TikTok, Instagram, fiestas. Pero coordinar dos disfraces es complicado: ¿van a juego? ¿se ven bien juntos? ¿les queda bien la talla? La IA permite probar ambos disfraces sobre ustedes en una foto y decidir con certeza.',
  howKnowTitle: 'Cómo probarlo con IA',
  howKnowBullets: [
    'Una foto de los dos juntos (frente o tres cuartos)',
    'Una foto del disfraz de pareja (Pinterest, Mercado Libre, Amazon, Liverpool)',
    'La IA aplica ambos disfraces respetando ambos cuerpos en 30 segundos',
    'Comprueban si combinan bien antes de gastar',
    'Prueban 3-4 ideas de disfraz lado a lado, gratis',
  ],

  recommendedBadge: 'Ideas 2026',
  recommendedTitle: 'Ideas de disfraz de Halloween en pareja',
  recommended: [
    { name: 'Barbie y Ken (versión Greta Gerwig)', why: 'Pink power para ella, traje pastel con cuello en V para él. Atemporal y reconocible al instante.' },
    { name: 'Wednesday Addams y Enid Sinclair', why: 'Negro gótico vs. arcoíris colorido. Contraste visual perfecto. De moda tras Netflix.' },
    { name: 'Catrina y Catrín (Día de Muertos)', why: 'Vestido largo y corona de flores ella, esmoquin y maquillaje calavera él. Mexicano y elegante.' },
    { name: 'Bonnie y Clyde', why: 'Vestido vintage años 30 con sombrero ella, traje rayas con corbata él. Sexy y narrativo.' },
    { name: 'Sandy y Danny (Grease)', why: 'Sandy de cuero ajustado o falda rosada, Danny con chaqueta T-Birds. Para parejas con sentido del humor.' },
    { name: 'Morticia y Gomez Addams', why: 'Versión clásica de Wednesday. Vestido negro largo, traje rayas. Más adulto, igual de icónico.' },
    { name: 'Joker y Harley Quinn', why: 'Verde y morado con chaleco vs. rojo, negro y bate. Variantes Heath Ledger o Joaquin Phoenix.' },
    { name: 'Hu Tao y Xiao (Genshin) para cosplayers', why: 'Si son fans de Genshin, esta combo cosplay-pareja es brutal en convenciones también.' },
  ],

  avoidBadge: 'Evita',
  avoidTitle: 'Errores en disfraz de pareja',
  avoid: [
    { name: 'Disfraces de pareja descoordinados visualmente', why: 'Si uno va elaborado y otro sencillo, el efecto se pierde. Igualen el nivel de detalle.' },
    { name: 'Comprar ambos por separado sin verlos juntos', why: 'Los colores que en foto se ven similares pueden chocar en persona. Pruébalo con IA primero.' },
    { name: 'Disfraces incómodos para ambos', why: 'Si uno está cómodo y el otro no, la noche se vuelve tensa. Prioricen ambos la comodidad.' },
  ],

  midCtaTitle: 'Pruébense el disfraz juntos antes de gastar',
  midCtaBody:
    'Ver una idea en Pinterest es una cosa. Ver el disfraz sobre USTEDES DOS en una foto real es otra. Decidan con certeza, eviten devoluciones, lleguen a la fiesta con el look ganador. Primer render gratis.',
  midCtaButton: 'Probar disfraz pareja',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cuáles son los mejores disfraces de Halloween en pareja 2026?',
      a: 'Barbie y Ken sigue dominando tras la película. Wednesday y Enid, Catrina y Catrín (Día de Muertos), Bonnie y Clyde, y Sandy y Danny son los top 5.',
    },
    {
      q: '¿Puedo probar el disfraz de pareja en una sola foto?',
      a: 'Sí. Suban una foto de los dos juntos más las referencias de los disfraces. La IA ajusta ambos disfraces respetando ambos cuerpos en una sola imagen.',
    },
    {
      q: '¿Funciona para parejas LGBTQ+?',
      a: 'Sí, la IA respeta cualquier combinación. Catrina y Catrina, Joker y Joker, Wednesday y Wednesday — sin presunciones de género en los disfraces.',
    },
    {
      q: '¿Y si queremos disfraces de pareja originales no típicos?',
      a: 'Súbele una referencia inusual (un meme, una pareja de anime nicho, un cuadro famoso) y la IA lo aplica. No necesita ser un disfraz comercial.',
    },
    {
      q: '¿Cuánto cuesta probarlo?',
      a: 'Primer render HD gratis, sin tarjeta. Después paquetes desde 4.99 USD por 8 renders.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/try-on?category=costume',
};

/* ───────────────────────── /es/disfraces-caseros ────────────────────────────
 * ES 4K/mo. KD 0. SERP softness 9 (Pinterest × 2 + C&A).
 */
export const disfracesCaseros: LongtailContent = {
  lang: 'es',
  category: 'costume',
  productLabel: 'Disfraz casero',
  accent: 'nail',
  theme: 'costume',

  badge: 'Disfraces caseros · IA',
  h1Top: 'Disfraces caseros',
  h1Italic: 'pruébalos sin coser nada.',
  hero:
    'Disfraces caseros para Halloween y Carnaval: fáciles, baratos y sin coser. Visualiza el disfraz casero sobre tu cuerpo con IA antes de comprar la tela o el cartón. Prueba 5 ideas en 5 minutos y elige la que mejor te quede. Gratis.',
  ctaPrimary: 'Probar disfraz casero',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: 'Por qué los disfraces caseros ganan al disfraz comprado',
  whatBody:
    'Un disfraz comprado cuesta entre 40 y 90 euros y se ve genérico. Un disfraz casero bien planeado cuesta entre 5 y 15 euros y es único. El problema: te metes en horas de manualidades sin saber si te va a quedar bien. La IA resuelve esto — pruebas la idea del disfraz casero en tu foto antes de tocar las tijeras.',
  howKnowTitle: 'Cómo planearlo con IA antes de empezar',
  howKnowBullets: [
    'Foto clara tuya (cuerpo completo)',
    'Foto de la inspiración (Pinterest, TikTok, captura de Halloween Costumes)',
    'La IA ajusta el disfraz mental sobre tu cuerpo real',
    'Si te queda bien, ya sabes qué materiales comprar',
    'Si no te queda, pruebas otra idea sin haber gastado nada',
  ],

  recommendedBadge: 'Caseros fáciles 2026',
  recommendedTitle: 'Disfraces caseros que funcionan',
  recommended: [
    { name: 'Esqueleto (camiseta negra con huesos pintados blancos)', why: 'Pintura textil blanca con camiseta y leggings negros. Coste: 8 a 12 euros. Resultado profesional.' },
    { name: 'Bruja moderna minimalista', why: 'Vestido negro de tu armario con sombrero puntiagudo de Amazon (5 euros) y maquillaje verde-tierra. Listo.' },
    { name: 'Tres en uno: Día de Muertos, Catrina y flores', why: 'Vestido largo, corona de flores artificiales (Decathlon, IKEA, Lidl, Mercadona) y maquillaje calavera. Espectacular y económico.' },
    { name: 'Wednesday Addams DIY', why: 'Vestido negro de polo, cuello blanco improvisado y trenzas. Coste: 0 euros si lo tienes en casa.' },
    { name: 'Vampiro o vampiresa con sangre comestible', why: 'Camisa blanca, chaleco oscuro y jarabe de granadina como sangre. Económico y dramático.' },
    { name: 'Disfraz de gato negro (clásico universal)', why: 'Ropa negra, orejas de diadema (3 euros), maquillaje bigotes y cola opcional. 10 minutos.' },
    { name: 'Pareja de pirata y sirena', why: 'Camisa blanca, pañuelo rojo y parche para él. Vestido azul o verde con escamas pintadas para ella. Ambos caseros.' },
    { name: 'Personaje pixelado retro (8-bit)', why: 'Cartulina y pixel art con tu personaje favorito (Mario, Pacman). Único y conversation starter.' },
  ],

  avoidBadge: 'Errores típicos',
  avoidTitle: 'Errores en disfraces caseros',
  avoid: [
    { name: 'Comprar materiales sin haber probado la idea', why: '20 euros en goma EVA que acaba en la basura porque la idea no funcionaba contigo. Visualízalo antes.' },
    { name: 'Disfraz demasiado complicado para el tiempo que tienes', why: 'Empezar el 30 a las 6 de la tarde un disfraz de 10 horas es fracaso garantizado. Elige según tu tiempo real.' },
    { name: 'Maquillaje sin practicar', why: 'Catrina, payaso, vampiro — todos requieren práctica. Practica 1 o 2 veces antes del día.' },
  ],

  midCtaTitle: 'Visualiza el disfraz casero antes de empezar',
  midCtaBody:
    'Ver una idea en Pinterest es una cosa. Verla sobre TU cuerpo real, tu altura, tu figura, es lo que decide si te metes en el proyecto o no. Decide bien, ahorra tiempo y dinero. Primer render gratis.',
  midCtaButton: 'Probar disfraz casero ahora',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Qué disfraz casero se hace en menos de 1 hora?',
      a: 'Gato negro, bruja minimalista, esqueleto pintado, Wednesday con vestido propio. Todos requieren 1-2 elementos comprados (3 a 8 euros) y 30-60 minutos.',
    },
    {
      q: '¿Disfraces caseros para niños fáciles?',
      a: 'Fantasma con sábana blanca, calabaza con sudadera naranja y maquillaje, Catrina infantil con vestido y flores. Todos baratos y rápidos.',
    },
    {
      q: '¿La IA me dice si el disfraz casero me queda bien?',
      a: 'Sí. Subes tu foto y una imagen-referencia del disfraz casero (puede ser un sketch, una foto de Pinterest, otra persona disfrazada). La IA aplica el look sobre tu cuerpo y ves el fit real.',
    },
    {
      q: '¿Cuánto se gasta en un disfraz casero medio?',
      a: 'Entre 5 y 15 euros es lo normal. Lo más caro suelen ser pelucas (10-25 euros) o maquillaje específico (5-15 euros). El resto sale del armario.',
    },
    {
      q: '¿La IA sirve para disfraces de Carnaval también?',
      a: 'Sí, no solo Halloween. Catrinas, payasos, princesas, superhéroes, animales — cualquier disfraz casero se puede probar virtualmente antes.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/try-on?category=costume',
};

/* ───────────────────────── /es/disfraz-carnaval ─────────────────────────────
 * ES 8.1K/mo head + 27.1K "disfraces carnaval" cluster. KD 0-10. SERP
 * softness 5-6 — small retailers, not Amazon-locked.
 */
export const disfrazCarnaval: LongtailContent = {
  lang: 'es',
  category: 'costume',
  productLabel: 'Disfraz de Carnaval',
  accent: 'nail',
  theme: 'carnival-costume',

  badge: 'Carnaval · Disfraz IA',
  h1Top: 'Disfraz de Carnaval',
  h1Italic: 'pruébalo antes del desfile.',
  hero:
    'Disfraz de Carnaval 2026 — para Cádiz, Tenerife, Águilas, Las Palmas, Sitges o cualquier desfile. Pruébate cualquier disfraz de Carnaval en tu foto real con IA antes de comprar tela ni alquilarlo. 30 segundos, sin tarjeta.',
  ctaPrimary: 'Probar disfraz Carnaval',
  ctaCaption: 'Gratis · Sin descarga · 30 segundos',

  whatTitle: '¿Qué buscas para Carnaval 2026?',
  whatBody:
    'En España el Carnaval mueve más disfraces que Halloween. Cádiz, Tenerife, Las Palmas son citas obligatorias. Y a diferencia de Halloween, Carnaval pide originalidad: chirigotas, comparsas, disfraces grupales temáticos. Solución antes de gastar: prueba el disfraz en tu foto real, decide con datos.',
  howKnowTitle: 'Cómo planearlo con IA',
  howKnowBullets: [
    'Foto clara tuya (cuerpo completo si es posible)',
    'Foto del disfraz o de la referencia visual de tu chirigota o comparsa',
    'La IA aplica el disfraz completo sobre ti en 30 segundos',
    'Comprueba si el grupo entero queda coordinado, pruébalo con todos',
    'Decide qué pedir o coser sin malgastar tela ni alquileres',
  ],

  recommendedBadge: 'Tendencias 2026',
  recommendedTitle: 'Disfraces de Carnaval para probar',
  recommended: [
    { name: 'Chirigota gaditana clásica', why: 'Levita, sombrero y cara pintada — el corazón del Carnaval de Cádiz. Funciona en grupo grande.' },
    { name: 'Comparsa de animales temáticos', why: 'Loros, flamencos, pingüinos — disfraces grupales coloridos típicos de Tenerife y Las Palmas.' },
    { name: 'Personaje histórico-irónico', why: 'Reyes y reinas, marineros del siglo XIX, conquistadores. Disfraz solemne con toque irónico de Cádiz.' },
    { name: 'Disfraz de grupo serie o película (Bridgerton, Stranger Things)', why: 'Coordínense en grupo de 4-6 personas con personajes de una misma serie. Súper visual.' },
    { name: 'Disfraz de pareja desfasado (siglo XVIII)', why: 'Vestido amplio con miriñaque y casaca de caballero. Glamour clásico, muy fotografiable.' },
    { name: 'Personajes de cuadros famosos', why: 'La Gioconda, La Maja de Goya, Las Meninas. Pictórico, original, fotogénico.' },
    { name: 'Disfraz futurista cyberpunk', why: 'Maquillaje neón, ropa metalizada y accesorios LED. Para Carnaval moderno con vibe nocturna.' },
    { name: 'Disfraz infantil de Carnaval', why: 'Princesas, dinosaurios, superhéroes — los clásicos que nunca fallan. Comprueba la talla y el fit con IA primero.' },
  ],

  avoidBadge: 'Evita',
  avoidTitle: 'Errores típicos de Carnaval',
  avoid: [
    { name: 'Disfraz demasiado caluroso para días soleados', why: 'En Canarias hace 22 grados en febrero. Pieles sintéticas pesadas y sudor en pleno desfile.' },
    { name: 'Disfraz que no permite moverse', why: 'Carnaval es bailar, andar, posar. Pruébalo con IA y comprueba que tienes movilidad.' },
    { name: 'Comprar talla sin verlo puesto', why: 'Los disfraces de Carnaval suelen venir de tallaje italiano (pequeños). Pruébalo virtualmente antes de comprar.' },
  ],

  midCtaTitle: 'Pruébate el disfraz antes del desfile',
  midCtaBody:
    'Ver un disfraz online es una cosa. Verlo sobre tu cuerpo real, tu altura, tu figura, tu tono, es otra. Llega al desfile con el look ganador, sin haber malgastado en algo que no funcionaba. Primer render gratis.',
  midCtaButton: 'Probar disfraz Carnaval',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cuándo es Carnaval 2026 en España?',
      a: 'Carnaval 2026 comienza el sábado 14 de febrero (en función de la Cuaresma). Cádiz, Tenerife y Las Palmas son los más grandes.',
    },
    {
      q: '¿Cuál es el mejor disfraz para Carnaval de Cádiz?',
      a: 'Chirigota o comparsa tradicional con grupo. Levita, cara pintada y sombrero. La gracia de Cádiz es el grupo coordinado.',
    },
    {
      q: '¿Disfraces de Carnaval para grupos grandes?',
      a: 'Comparsa temática (todos animales, todos personajes de Bridgerton, todos cuadros famosos). Coordínense visualmente y el grupo se vuelve viral.',
    },
    {
      q: '¿Puedo probar mi disfraz de chirigota en pareja o solo?',
      a: 'Ambos. Sube foto individual o de grupo y la referencia del disfraz. La IA aplica el look a todos los que aparezcan en la foto.',
    },
    {
      q: '¿Cuánto cuesta probarse el disfraz?',
      a: 'Primer render gratis, sin tarjeta. Paquetes desde 4,99 euros por 8 renders si quieres comparar más opciones.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/try-on?category=costume',
};
