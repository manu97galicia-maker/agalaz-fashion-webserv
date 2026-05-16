/**
 * Brand-specific virtual-try-on landings.
 *
 * Each entry targets a high-intent KD-0 keyword cluster around "[brand]
 * provador virtual" — visitors already know the brand they want to try on,
 * which lifts conversion vs generic try-on traffic.
 *
 * Identified via DataForSEO low-KD audit (scripts/low-kd-probador-virtual.mjs).
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

/* ─────────────────── /pt/provador-virtual-zara ───────────────────────────
 * "provador virtual zara" 170/mo BR + "zara probador virtual" 590/mo ES.
 * Bilingual brand intent — BR shoppers searching for Zara try-on.
 */
export const provadorVirtualZaraPT: LongtailContent = {
  lang: 'pt',
  category: 'clothing',
  productLabel: 'Peça Zara que queres provar',
  yourPhotoLabel: 'A tua foto de corpo inteiro',
  yourPhotoHint: 'Corpo inteiro, fundo simples, boa luz',
  productHint: 'Foto da peça Zara (site, app, captura…)',
  accent: 'nail',
  // 2 peças tipo Zara pré-carregadas (Gemini, 2026-05-16).
  presets: [
    { src: '/images/presets/pt-provador-virtual-zara-oversized-blazer-black-zara.png', label: 'Blazer oversized preto', alt: 'Blazer oversized preto estilo Zara — provador virtual Zara Agalaz' },
    { src: '/images/presets/pt-provador-virtual-zara-denim-wide-leg-cropped.png', label: 'Jeans wide leg', alt: 'Calças jeans wide leg estilo Zara — provador virtual Zara Agalaz' },
  ],

  badge: 'Zara × IA · Provador Virtual',
  h1Top: 'Provador virtual Zara',
  h1Italic: 'experimenta qualquer peça antes de encomendar.',
  hero:
    'Provador virtual Zara com IA — carrega a tua foto e a captura de qualquer peça do site Zara (vestidos, calças, blazers, casacos, tops). A IA aplica a peça exata no teu corpo em 30 segundos. Decide a talha e o caimento antes de pagar e evita devoluções.',
  ctaPrimary: 'Provar peça Zara',
  ctaCaption: 'Grátis · Sem registo · 30 seg',

  whatTitle: 'Por que provador virtual para Zara funciona melhor',
  whatBody:
    'A Zara renova a coleção a cada 2 semanas e os tamanhos variam entre TRF, Woman e Basic. Sem prova, taxa de devolução online passa de 30% em vestidos e blazers. Com o provador virtual Agalaz vês a peça aplicada no teu corpo real — caimento, comprimento, decote — antes de adicionar ao carrinho. Reduz devoluções e a frustração de pedir 3 tamanhos para escolher.',
  howKnowTitle: 'Como provar peças Zara virtualmente',
  howKnowBullets: [
    'Carrega uma foto tua de corpo inteiro (frontal, luz natural)',
    'Vai ao site Zara e captura a peça que queres (qualquer página de produto serve)',
    'A IA aplica a peça no teu corpo em 30 segundos',
    'Compara 3-4 peças lado a lado para decidir',
    'Volta à Zara e encomenda apenas a peça que ficou bem',
  ],

  recommendedBadge: 'Categorias Zara que mais funcionam',
  recommendedTitle: 'Peças Zara perfeitas para provar virtualmente',
  recommended: [
    { name: 'Vestidos Zara Woman', why: 'O caimento de um vestido varia muito com a altura e silhueta. Verificar virtualmente antes evita os 35-40% de devoluções típicos.' },
    { name: 'Blazers e casacos', why: 'A largura dos ombros e o comprimento da manga são o ponto crítico. Vê se o blazer fica oversize ou fitted antes.' },
    { name: 'Calças TRF (slim, wide leg)', why: 'O wide leg sobra ou cai bem segundo a altura. Provar virtualmente poupa retornos.' },
    { name: 'Vestidos de festa Zara', why: 'Comprimento exato, ombros descobertos, decote — provar antes da festa para garantir.' },
    { name: 'Camisas e blusas', why: 'Largura, comprimento e transparência — três variáveis que só vês no corpo.' },
    { name: 'Casacos de inverno', why: 'O comprimento (curto, midi, longo) muda totalmente a silhueta. Provar primeiro.' },
  ],

  avoidBadge: 'Atenção',
  avoidTitle: 'O que o provador virtual não substitui',
  avoid: [
    { name: 'Saber o tecido real ao toque', why: 'A IA mostra o caimento visual. Tecido, textura, peso real só sentes na peça física — usa as descrições Zara para isso.' },
    { name: 'Tabela de medidas exatas', why: 'O provador mostra como fica visualmente. Para a talha cruza com a tabela Zara (altura/peito/cintura).' },
  ],

  midCtaTitle: 'Antes de encomendar 3 talhas para devolver 2',
  midCtaBody:
    'A devolução grátis da Zara é cómoda mas custa-te tempo. 1 render virtual em 30s e encomendas só a talha certa.',
  midCtaButton: 'Provar peça Zara',

  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Funciona com qualquer peça do site Zara?',
      a: 'Sim. Captura a foto principal de qualquer produto Zara (vestidos, casacos, calças, tops, fatos) e a IA aplica no teu corpo. Funciona melhor com fotos do modelo Zara de frente sobre fundo neutro.',
    },
    {
      q: 'A IA respeita a cor e o estampado exato da peça Zara?',
      a: 'Sim. Cor, estampado, textura visual, transparências e detalhes (botões, fechos, cintos) são preservados.',
    },
    {
      q: 'Preciso de fazer login para o primeiro render?',
      a: 'Não. O primeiro render é grátis e anónimo — só carregas as fotos e clicas em Gerar. Logins só são pedidos se precisares de mais renders.',
    },
    {
      q: 'Quanto duram as compras Zara que fizeste?',
      a: 'A Zara renova a coleção a cada 2 semanas. Peças que vês hoje podem estar esgotadas em 14 dias. Razão a mais para decidir rápido com o provador.',
    },
    {
      q: 'É melhor que o provador da app Zara?',
      a: 'A app Zara não tem provador virtual. Mostra modelo Zara fixo. O Agalaz mostra a peça no TEU corpo real.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador virtual',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/virtual-try-on',
};

/* ─────────────────── /es/probador-virtual-zara ───────────────────────────
 * "probador virtual zara" 590/mo ES, KD 5. Brand-specific Spain audience.
 * Same images as the PT version (clothes look the same in any country).
 */
export const probadorVirtualZaraES: LongtailContent = {
  lang: 'es',
  category: 'clothing',
  theme: 'zara-fashion',
  productLabel: 'Prenda Zara que quieres probar',
  yourPhotoLabel: 'Tu foto de cuerpo entero',
  yourPhotoHint: 'Cuerpo entero, fondo limpio, buena luz',
  productHint: 'Foto de la prenda Zara (web, app, captura…)',
  accent: 'nail',

  badge: 'Zara × IA · Probador Virtual',
  h1Top: 'Probador virtual Zara',
  h1Italic: 'pruébate cualquier prenda antes de pedirla.',
  hero:
    'Probador virtual Zara con IA — sube tu foto + la captura de cualquier prenda del sitio Zara (vestidos, pantalones, blazers, abrigos, tops). La IA aplica la prenda exacta en tu cuerpo en 30 segundos. Decide la talla y el caimiento antes de pagar y evita devoluciones.',
  ctaPrimary: 'Probar prenda Zara',
  ctaCaption: '✓ Gratis · ✓ Sin registro · ✓ 30 seg',

  whatTitle: 'Por qué el probador virtual para Zara funciona mejor',
  whatBody:
    'Zara renueva colección cada 2 semanas y las tallas varían entre TRF, Woman y Basic. Sin prueba, la tasa de devolución online pasa del 30% en vestidos y blazers. Con el probador virtual Agalaz ves la prenda aplicada en tu cuerpo real — caimiento, longitud, escote — antes de añadir al carrito. Reduce devoluciones y la frustración de pedir 3 tallas para elegir.',
  howKnowTitle: 'Cómo probar prendas Zara virtualmente',
  howKnowBullets: [
    'Sube una foto tuya de cuerpo entero (frontal, luz natural)',
    'Ve a la web Zara y captura la prenda que quieres (cualquier página de producto sirve)',
    'La IA aplica la prenda en tu cuerpo en 30 segundos',
    'Compara 3-4 prendas lado a lado para decidir',
    'Vuelve a Zara y pide solo la prenda que te quedó bien',
  ],

  recommendedBadge: 'Categorías Zara que mejor funcionan',
  recommendedTitle: 'Prendas Zara perfectas para probar virtualmente',
  recommended: [
    { name: 'Vestidos Zara Woman', why: 'El caimiento de un vestido varía mucho con la altura y silueta. Comprobar virtualmente antes evita el 35-40% de devoluciones típicas.' },
    { name: 'Blazers y abrigos', why: 'La anchura de hombros y la longitud de manga son el punto crítico. Mira si el blazer queda oversize o fitted antes.' },
    { name: 'Pantalones TRF (slim, wide leg)', why: 'El wide leg sobra o cae bien según tu altura. Probar virtualmente ahorra retornos.' },
    { name: 'Vestidos de fiesta Zara', why: 'Longitud exacta, hombros descubiertos, escote — probar antes de la fiesta para asegurar.' },
    { name: 'Camisas y blusas', why: 'Anchura, longitud y transparencia — tres variables que solo ves en el cuerpo.' },
    { name: 'Abrigos de invierno', why: 'La longitud (corto, midi, largo) cambia totalmente la silueta. Probar primero.' },
  ],

  avoidBadge: 'Atención',
  avoidTitle: 'Lo que el probador virtual no sustituye',
  avoid: [
    { name: 'Saber el tejido real al tacto', why: 'La IA muestra el caimiento visual. Tejido, textura, peso real solo los sientes en la prenda física — usa las descripciones Zara para eso.' },
    { name: 'Tabla de medidas exactas', why: 'El probador muestra cómo queda visualmente. Para la talla cruza con la tabla Zara (altura/pecho/cintura).' },
  ],

  midCtaTitle: 'Antes de pedir 3 tallas para devolver 2',
  midCtaBody:
    'La devolución gratis de Zara es cómoda pero te cuesta tiempo. 1 render virtual en 30s y pides solo la talla correcta.',
  midCtaButton: 'Probar prenda Zara',

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Funciona con cualquier prenda del sitio Zara?',
      a: 'Sí. Captura la foto principal de cualquier producto Zara (vestidos, abrigos, pantalones, tops, trajes) y la IA aplica en tu cuerpo. Funciona mejor con fotos del modelo Zara de frente sobre fondo neutro.',
    },
    {
      q: '¿La IA respeta el color y estampado exacto de la prenda Zara?',
      a: 'Sí. Color, estampado, textura visual, transparencias y detalles (botones, cremalleras, cinturones) se preservan.',
    },
    {
      q: '¿Necesito hacer login para el primer render?',
      a: 'No. El primer render es gratis y anónimo — solo cargas las fotos y haces clic en Generar. El login solo se pide si necesitas más renders.',
    },
    {
      q: '¿Cuánto duran las prendas Zara que ves?',
      a: 'Zara renueva colección cada 2 semanas. Prendas que ves hoy pueden estar agotadas en 14 días. Razón de más para decidir rápido con el probador.',
    },
    {
      q: '¿Es mejor que el probador de la app Zara?',
      a: 'La app Zara no tiene probador virtual real. Muestra un modelo Zara fijo. Agalaz muestra la prenda en TU cuerpo real.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Probador virtual',
  privacyLabel: 'Privacidad',
  tryOnHref: '/es/virtual-try-on',
};
