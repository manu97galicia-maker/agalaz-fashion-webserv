/**
 * Localized body content for the 3 B2B landings (shopify, woocommerce, developers).
 *
 * Previously the body of /shopify, /woocommerce, /developers was hardcoded EN,
 * and /es/shopify et al. simply re-exported the EN component with localized
 * metadata. Search Console snippets appeared translated but visitors landed on
 * an EN page. This dictionary fixes that — every visible string ships in all
 * 6 supported languages (en/es/fr/pt/de/it). Pages pick the right block at
 * render time via useLang().
 */

import type { Lang } from '@/components/LanguageProvider';

export interface FaqItem {
  q: string;
  a: string;
}

export interface PlanItem {
  name: string;
  price: string;
  meta: string;
}

export interface StepItem {
  title: string;
  desc: string;
  note?: string;
}

export interface ShopifyContent {
  topBarCta: string;
  badge: string;
  heroH1Main: string;
  heroH1Highlight: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroMicrocopy: string;
  whyTitleLead: string;
  whyTitleBrand: string;
  whyCards: Array<{ title: string; desc: string }>;
  featuresTitle: string;
  features: Array<{ title: string; desc: string }>;
  howTitleLead: string;
  howTitleHighlight: string;
  steps: StepItem[];
  pricingTitle: string;
  pricingSubtitle: string;
  plans: PlanItem[];
  pricingCta: string;
  faqTitle: string;
  faqs: FaqItem[];
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonials: Array<{ q: string; a: string }>;
  finalCtaTitle: string;
  finalCtaBody: string;
  finalCtaBtn: string;
}

export interface WooContent extends ShopifyContent {}

export interface DevelopersContent {
  topBarCta: string;
  badge: string;
  heroH1Main: string;
  heroH1Highlight: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroMicrocopy: string;
  whyTitleLead: string;
  whyTitleHighlight: string;
  whyCards: Array<{ title: string; desc: string }>;
  quickstartTitleLead: string;
  quickstartTitleHighlight: string;
  step1Title: string;
  step1Body: string;
  step2Title: string;
  step2Body: string;
  step3Title: string;
  step3Body: string;
  endpointTitle: string;
  endpointSubtitle: string;
  endpointSummary: string;
  headersTitle: string;
  bodyParamsTitle: string;
  jsExampleTitle: string;
  pythonExampleTitle: string;
  statusCodesTitle: string;
  tableHeaderCol: string;
  tableValueCol: string;
  tableFieldCol: string;
  tableTypeCol: string;
  tableRequiredCol: string;
  tableDescriptionCol: string;
  tableCodeCol: string;
  tableMeaningCol: string;
  yes: string;
  no: string;
  oneOf: string;
  paramDescs: {
    userImage: string;
    garmentUrl: string;
    clothingImage: string;
    currentSize: string;
    previewSize: string;
  };
  statusDescs: {
    s200: string;
    s400: string;
    s401: string;
    s402: string;
    s5xx: string;
  };
  pricingTitle: string;
  pricingSubtitle: string;
  pricingPlanLabels: { trial: string; starter: string; growth: string };
  pricingCallsLabel: { trial: string; starter: string; growth: string };
  pricingCta: string;
  faqTitle: string;
  faqs: FaqItem[];
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonials: Array<{ q: string; a: string }>;
  finalCtaTitle: string;
  finalCtaBody: string;
  finalCtaBtn: string;
}

// ───────────────────────────────────────────────────────────── SHOPIFY ──────

const SHOPIFY_EN: ShopifyContent = {
  topBarCta: 'Start free trial',
  badge: 'For Shopify merchants',
  heroH1Main: 'Shopify Virtual Try-On',
  heroH1Highlight: 'in 2 lines of code.',
  heroSubtitle:
    'Add an AI fitting room to every product page on your Shopify store. Customers preview clothing, glasses, jewelry and accessories on themselves before buying. Higher conversion, fewer returns, zero plugin installs.',
  ctaPrimary: 'Start 7-day free trial',
  ctaSecondary: 'See a live demo',
  heroMicrocopy: '50 renders included · No setup fee · Cancel anytime',
  whyTitleLead: 'Why Shopify stores choose',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    {
      title: 'Fewer fashion returns',
      desc: 'The #1 reason shoppers return clothing online is fit anxiety. When customers see the garment on their own body before buying, return rates drop sharply.',
    },
    {
      title: 'Higher product-page conversion',
      desc: 'Try-on engagement keeps visitors on the product page longer and replaces the doubt of "will this look right on me?" with a concrete preview. Conversion lifts on every category.',
    },
    {
      title: 'Privacy-first by default',
      desc: 'Customer photos are processed in real time and never stored. Domain allowlisting per API key prevents anyone else from using your widget on another store.',
    },
  ],
  featuresTitle: 'Built for Shopify, not bolted on.',
  features: [
    { title: 'Auto-detects product images', desc: 'Recognises every standard Shopify product gallery markup (Dawn, Debut, Sense, Refresh, Studio and most third-party themes). No theme edits beyond the script tag.' },
    { title: 'Two-line install', desc: 'Paste a <script> tag in theme.liquid (just before </head>) and a <div id="agalaz-tryon"></div> in product.liquid. Done.' },
    { title: 'Works on Online Store 2.0 and legacy themes', desc: 'Same script tag, both major Shopify theme generations. No theme-specific build steps.' },
    { title: 'Multi-category by design', desc: 'Clothing, eyewear, jewelry, hats, footwear, bags, plus tattoos and nail art. The AI auto-detects the category from the product image.' },
    { title: 'Lightning-fast renders', desc: 'Around 10 seconds per try-on. The script defers, so your Lighthouse and Core Web Vitals scores stay where they are.' },
    { title: 'No app to approve', desc: 'Agalaz is a script, not a Shopify App Store app. Zero app permissions, zero app fees on top of your subscription, zero migration risk if you switch themes.' },
  ],
  howTitleLead: 'Install on Shopify in',
  howTitleHighlight: '3 minutes',
  steps: [
    { title: 'Sign up and grab your API key', desc: 'Sign in with Google on the Agalaz Partners page and start your 7-day free trial. You get a domain-scoped API key you copy from the dashboard.' },
    { title: 'Paste the script in theme.liquid', desc: 'Open Online Store → Themes → Edit code → theme.liquid. Just before </head>, paste:' },
    { title: 'Drop the div into product.liquid', desc: 'In your product template (or a section visible on every product page), add:', note: 'Save. Refresh a product page. The "Try it on with AI" button is live.' },
  ],
  pricingTitle: 'Pricing for Shopify merchants',
  pricingSubtitle: 'One subscription. No per-render Shopify App Store fees on top. Cancel anytime.',
  plans: [
    { name: 'Free trial', price: '€0', meta: '7 days · 50 renders' },
    { name: 'Starter', price: '€150/mo', meta: '200 renders / month' },
    { name: 'Growth', price: '€499/mo', meta: '1,000 renders / month' },
  ],
  pricingCta: 'Get my Shopify install snippet',
  faqTitle: 'Shopify try-on FAQ',
  faqs: [
    { q: 'Does this work with my Shopify theme?', a: 'Yes. Agalaz works with every Shopify theme including Dawn, Debut, Sense, Refresh, Studio and any custom theme. Both Online Store 2.0 and legacy 1.0 themes are supported. The widget auto-detects the product image from the standard Shopify product page markup, so no theme-specific configuration is needed.' },
    { q: 'Do I need to install a Shopify app from the App Store?', a: 'No. Agalaz is not a Shopify app — it is a lightweight script you paste into your theme. This means no app permissions to approve, no app fees on top of your subscription, and no app removal headaches if you ever switch off the widget. You install it the same way you install Google Analytics: a script tag and a div.' },
    { q: 'How does the AI know which product to try on?', a: 'On Shopify product pages, Agalaz auto-detects the main product image from the standard Liquid markup (img.product__media, img.product-single__photo, etc.). For collection pages or custom layouts you can pass the image URL explicitly with a data-garment attribute on the div.' },
    { q: 'How fast is the rendering on Shopify product pages?', a: 'Average render time is around 10 seconds per try-on. The widget loads asynchronously so it never blocks the product page itself — your Lighthouse and Core Web Vitals scores stay intact.' },
    { q: "Do you store my customers' photos?", a: 'No. Customer photos are processed in real time and discarded immediately. We have a zero data retention policy on customer-uploaded images. Your shoppers can use the try-on without any privacy concern.' },
    { q: 'How much does it cost?', a: 'You start with a 7-day free trial (50 renders included, no setup fee). After the trial the Starter plan is €150/month for 200 renders, or Growth at €499/month for 1,000 renders. You can cancel anytime from your Stripe customer portal.' },
    { q: 'Will the widget slow down my Shopify store?', a: 'No. The script is loaded with the defer attribute and only activates when a customer clicks "Try it on with AI". The product page itself is unaffected and your Lighthouse scores stay the same.' },
  ],
  testimonialsTitle: 'What Shopify merchants say',
  testimonialsSubtitle: 'Quotes from early-program merchants. Attribution anonymised at their request.',
  testimonials: [
    { q: 'Setup was actually 2 lines of code. I was sceptical — every vendor says "easy install" — but with Agalaz the script tag IS the install. Lighthouse score didn\'t change.', a: 'Founder, sustainable fashion DTC (Madrid)' },
    { q: 'We replaced a Shopify App that was eating into our app fees with Agalaz\'s script. Same try-on quality, no marketplace fee on top of the subscription, and one less app permission flow to maintain.', a: 'E-commerce manager, mid-market womenswear (Lisbon)' },
    { q: 'Returns on our top 20 dresses dropped from 38% to 27% in two months. The size chart was already solid; the try-on closed the remaining doubt at the buy button.', a: 'Head of growth, occasionwear brand (Barcelona)' },
  ],
  finalCtaTitle: 'Ready to add try-on to your Shopify store?',
  finalCtaBody: 'Start with 50 free renders. Two lines of code, three minutes of setup, one less reason for your customers to return their order.',
  finalCtaBtn: 'Start 7-day free trial',
};

const SHOPIFY_ES: ShopifyContent = {
  topBarCta: 'Empezar prueba gratis',
  badge: 'Para tiendas Shopify',
  heroH1Main: 'Probador Virtual para Shopify',
  heroH1Highlight: 'en 2 líneas de código.',
  heroSubtitle:
    'Añade un probador con IA en cada ficha de producto de tu Shopify. Tus clientes se prueban ropa, gafas, joyería y accesorios sobre su propio cuerpo antes de comprar. Más conversión, menos devoluciones, sin instalar plugins.',
  ctaPrimary: 'Empezar 7 días gratis',
  ctaSecondary: 'Ver demo en vivo',
  heroMicrocopy: '50 renders incluidos · Sin coste de setup · Cancela cuando quieras',
  whyTitleLead: 'Por qué las tiendas Shopify eligen',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Menos devoluciones de moda', desc: 'La razón #1 por la que se devuelve ropa online es la duda con la talla. Cuando el cliente ve la prenda sobre su propio cuerpo antes de comprar, las devoluciones bajan en picado.' },
    { title: 'Más conversión en ficha de producto', desc: 'El probador retiene al visitante más tiempo en la ficha y sustituye el "¿me quedará bien?" por una previsualización real. La conversión sube en todas las categorías.' },
    { title: 'Privacidad por defecto', desc: 'Las fotos del cliente se procesan en tiempo real y nunca se almacenan. La API key está restringida a tu dominio, así nadie más puede usar tu widget en otra tienda.' },
  ],
  featuresTitle: 'Hecho para Shopify, no añadido encima.',
  features: [
    { title: 'Detecta automáticamente la imagen del producto', desc: 'Reconoce el markup estándar de cualquier theme Shopify (Dawn, Debut, Sense, Refresh, Studio y la mayoría de themes de terceros). No tocas el theme más allá del script.' },
    { title: 'Instalación en 2 líneas', desc: 'Pega una etiqueta <script> en theme.liquid (justo antes de </head>) y un <div id="agalaz-tryon"></div> en product.liquid. Listo.' },
    { title: 'Funciona en Online Store 2.0 y themes legacy', desc: 'Mismo script para las dos generaciones de themes de Shopify. Sin builds específicos.' },
    { title: 'Multi-categoría', desc: 'Ropa, gafas, joyería, sombreros, calzado, bolsos, tatuajes y manicura. La IA detecta la categoría desde la imagen del producto.' },
    { title: 'Renders muy rápidos', desc: 'Alrededor de 10 segundos por prueba. El script carga con defer, así tu Lighthouse y Core Web Vitals no se mueven.' },
    { title: 'Sin app que aprobar', desc: 'Agalaz no es una app del Shopify App Store, es un script. Sin permisos de app que aprobar, sin fee del marketplace encima de tu suscripción, sin riesgo si cambias de theme.' },
  ],
  howTitleLead: 'Instálalo en Shopify en',
  howTitleHighlight: '3 minutos',
  steps: [
    { title: 'Regístrate y consigue tu API key', desc: 'Entra con Google en la página de Partners de Agalaz y empieza tu prueba de 7 días. Recibes una API key vinculada a tu dominio que copias desde el panel.' },
    { title: 'Pega el script en theme.liquid', desc: 'Abre Online Store → Themes → Edit code → theme.liquid. Justo antes de </head>, pega:' },
    { title: 'Añade el div en product.liquid', desc: 'En tu plantilla de producto (o en una sección visible en todas las fichas), añade:', note: 'Guarda. Recarga una ficha de producto. El botón "Pruébatelo con IA" ya está activo.' },
  ],
  pricingTitle: 'Precios para tiendas Shopify',
  pricingSubtitle: 'Una sola suscripción. Sin fees del Shopify App Store por encima. Cancela cuando quieras.',
  plans: [
    { name: 'Prueba gratis', price: '€0', meta: '7 días · 50 renders' },
    { name: 'Starter', price: '€150/mes', meta: '200 renders / mes' },
    { name: 'Growth', price: '€499/mes', meta: '1.000 renders / mes' },
  ],
  pricingCta: 'Obtener mi snippet para Shopify',
  faqTitle: 'FAQ del probador Shopify',
  faqs: [
    { q: '¿Funciona con mi theme de Shopify?', a: 'Sí. Agalaz funciona con todos los themes de Shopify, incluidos Dawn, Debut, Sense, Refresh, Studio y cualquier theme custom. Soporta tanto Online Store 2.0 como la versión 1.0 legacy. El widget detecta la imagen del producto desde el markup estándar de la ficha, sin configuración específica por theme.' },
    { q: '¿Tengo que instalar una app del Shopify App Store?', a: 'No. Agalaz no es una app de Shopify, es un script ligero que pegas en tu theme. Esto significa cero permisos de app que aprobar, cero fees encima de tu suscripción y cero quebraderos si más adelante quitas el widget. Lo instalas igual que Google Analytics: una etiqueta script y un div.' },
    { q: '¿Cómo sabe la IA qué producto probar?', a: 'En las fichas de producto, Agalaz detecta automáticamente la imagen principal desde el markup estándar de Liquid (img.product__media, img.product-single__photo, etc.). Para páginas de colección o layouts personalizados puedes pasar la URL de la imagen explícitamente con el atributo data-garment en el div.' },
    { q: '¿Cómo de rápido es el render en ficha de producto?', a: 'Tiempo medio de render: unos 10 segundos por prueba. El widget carga de forma asíncrona y nunca bloquea la ficha — tu Lighthouse y Core Web Vitals se mantienen intactos.' },
    { q: '¿Almacenáis las fotos de mis clientes?', a: 'No. Las fotos del cliente se procesan en tiempo real y se descartan inmediatamente. Política de retención cero en imágenes subidas por usuarios. Tus compradores pueden usar el probador sin preocupación por su privacidad.' },
    { q: '¿Cuánto cuesta?', a: 'Empiezas con una prueba de 7 días (50 renders incluidos, sin coste de setup). Tras la prueba, el plan Starter es €150/mes para 200 renders, o Growth a €499/mes para 1.000 renders. Cancelas cuando quieras desde el portal de cliente de Stripe.' },
    { q: '¿El widget ralentizará mi tienda Shopify?', a: 'No. El script se carga con el atributo defer y solo se activa cuando un cliente pulsa "Pruébatelo con IA". La ficha de producto no se ve afectada y tu puntuación de Lighthouse se mantiene.' },
  ],
  testimonialsTitle: 'Lo que dicen las tiendas Shopify',
  testimonialsSubtitle: 'Testimonios de comerciantes del programa inicial. Atribución anonimizada a petición suya.',
  testimonials: [
    { q: 'La instalación fueron realmente 2 líneas de código. Era escéptico — todos los proveedores dicen "easy install" — pero con Agalaz la etiqueta script ES la instalación. El Lighthouse no se movió.', a: 'Fundador, marca DTC de moda sostenible (Madrid)' },
    { q: 'Sustituimos una Shopify App que nos comía margen por el script de Agalaz. Misma calidad de prueba, sin fee del marketplace encima de la suscripción y un flujo de permisos menos que mantener.', a: 'Responsable de e-commerce, marca de mujer mid-market (Lisboa)' },
    { q: 'Las devoluciones de nuestros 20 vestidos top bajaron del 38% al 27% en dos meses. La guía de tallas ya era buena; el probador cerró la duda restante justo en el botón de compra.', a: 'Head of Growth, marca de ceremonia (Barcelona)' },
  ],
  finalCtaTitle: '¿Listo para añadir probador virtual a tu Shopify?',
  finalCtaBody: 'Empieza con 50 renders gratis. Dos líneas de código, tres minutos de instalación, una razón menos para que tus clientes devuelvan el pedido.',
  finalCtaBtn: 'Empezar 7 días gratis',
};

const SHOPIFY_FR: ShopifyContent = {
  topBarCta: "Essai gratuit",
  badge: 'Pour marchands Shopify',
  heroH1Main: 'Essayage Virtuel Shopify',
  heroH1Highlight: 'en 2 lignes de code.',
  heroSubtitle:
    "Ajoutez une cabine d'essayage IA sur chaque fiche produit de votre boutique Shopify. Vos clients essaient vêtements, lunettes, bijoux et accessoires sur leur propre corps avant d'acheter. Plus de conversion, moins de retours, aucun plugin à installer.",
  ctaPrimary: 'Démarrer 7 jours gratuits',
  ctaSecondary: 'Voir une démo en direct',
  heroMicrocopy: '50 rendus inclus · Sans frais de setup · Résiliable à tout moment',
  whyTitleLead: 'Pourquoi les boutiques Shopify choisissent',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Moins de retours mode', desc: "La raison #1 des retours en ligne est le doute sur la taille. Quand le client voit le vêtement sur son propre corps avant d'acheter, les retours chutent." },
    { title: 'Plus de conversion en fiche produit', desc: "L'essayage garde le visiteur plus longtemps sur la fiche et remplace le « est-ce que ça m'ira ? » par un aperçu concret. La conversion grimpe sur chaque catégorie." },
    { title: 'Confidentialité par défaut', desc: "Les photos clients sont traitées en temps réel et jamais stockées. La clé API est restreinte à votre domaine, personne d'autre ne peut utiliser votre widget ailleurs." },
  ],
  featuresTitle: 'Conçu pour Shopify, pas greffé dessus.',
  features: [
    { title: "Détecte l'image produit automatiquement", desc: "Reconnaît le markup standard de chaque thème Shopify (Dawn, Debut, Sense, Refresh, Studio et la plupart des thèmes tiers). Aucune édition de thème au-delà du script." },
    { title: 'Installation en 2 lignes', desc: 'Collez une balise <script> dans theme.liquid (juste avant </head>) et un <div id="agalaz-tryon"></div> dans product.liquid. Terminé.' },
    { title: 'Compatible Online Store 2.0 et legacy', desc: 'Même balise script, les deux générations majeures de thèmes Shopify. Aucun build spécifique.' },
    { title: 'Multi-catégorie', desc: "Vêtements, lunettes, bijoux, chapeaux, chaussures, sacs, tatouages et manucure. L'IA détecte la catégorie depuis l'image produit." },
    { title: 'Rendus ultra-rapides', desc: "Environ 10 secondes par essayage. Le script charge en defer, votre Lighthouse et Core Web Vitals restent intacts." },
    { title: "Pas d'app à approuver", desc: "Agalaz n'est pas une app du Shopify App Store, c'est un script. Zéro permission d'app, zéro frais marketplace au-dessus de votre abonnement, zéro risque si vous changez de thème." },
  ],
  howTitleLead: 'Installez sur Shopify en',
  howTitleHighlight: '3 minutes',
  steps: [
    { title: 'Inscrivez-vous et récupérez votre clé API', desc: "Connectez-vous avec Google sur la page Partners d'Agalaz et lancez votre essai de 7 jours. Vous recevez une clé API liée à votre domaine, à copier depuis le dashboard." },
    { title: 'Collez le script dans theme.liquid', desc: 'Ouvrez Online Store → Themes → Edit code → theme.liquid. Juste avant </head>, collez :' },
    { title: 'Ajoutez le div dans product.liquid', desc: 'Dans votre template produit (ou une section visible sur chaque fiche), ajoutez :', note: 'Sauvegardez. Rechargez une fiche produit. Le bouton « Essayer avec IA » est actif.' },
  ],
  pricingTitle: 'Tarifs pour marchands Shopify',
  pricingSubtitle: "Un abonnement. Pas de frais Shopify App Store en plus. Résiliable à tout moment.",
  plans: [
    { name: 'Essai gratuit', price: '€0', meta: '7 jours · 50 rendus' },
    { name: 'Starter', price: '€150/mois', meta: '200 rendus / mois' },
    { name: 'Growth', price: '€499/mois', meta: '1 000 rendus / mois' },
  ],
  pricingCta: 'Obtenir mon snippet Shopify',
  faqTitle: 'FAQ essayage Shopify',
  faqs: [
    { q: 'Ça marche avec mon thème Shopify ?', a: 'Oui. Agalaz fonctionne avec tous les thèmes Shopify : Dawn, Debut, Sense, Refresh, Studio et tout thème custom. Online Store 2.0 et la version 1.0 legacy sont supportés. Le widget détecte automatiquement l\'image produit depuis le markup standard, aucune config spécifique au thème.' },
    { q: 'Dois-je installer une app du Shopify App Store ?', a: "Non. Agalaz n'est pas une app Shopify, c'est un script léger collé dans votre thème. Donc zéro permission d'app, zéro frais en plus de l'abonnement, et zéro complication si vous retirez le widget. Vous l'installez comme Google Analytics : une balise script et un div." },
    { q: "Comment l'IA sait quel produit essayer ?", a: "Sur les fiches produit, Agalaz détecte automatiquement l'image principale depuis le markup Liquid standard (img.product__media, img.product-single__photo, etc.). Pour les pages collection ou layouts personnalisés, vous pouvez passer l'URL de l'image avec l'attribut data-garment sur le div." },
    { q: 'À quelle vitesse rend le widget sur les fiches ?', a: 'Temps moyen : environ 10 secondes par essayage. Le widget charge en asynchrone et ne bloque jamais la fiche — vos scores Lighthouse et Core Web Vitals restent intacts.' },
    { q: 'Stockez-vous les photos de mes clients ?', a: 'Non. Les photos sont traitées en temps réel et supprimées immédiatement. Politique zéro rétention sur les images uploadées. Vos acheteurs utilisent le widget sans souci de confidentialité.' },
    { q: 'Combien ça coûte ?', a: "Vous démarrez avec un essai 7 jours (50 rendus inclus, pas de setup). Ensuite Starter à €150/mois pour 200 rendus, ou Growth à €499/mois pour 1 000 rendus. Résiliable à tout moment depuis le portail client Stripe." },
    { q: 'Le widget va-t-il ralentir ma boutique Shopify ?', a: "Non. Le script charge avec l'attribut defer et ne s'active que quand un client clique sur « Essayer avec IA ». La fiche elle-même n'est pas impactée et votre Lighthouse reste identique." },
  ],
  testimonialsTitle: 'Ce que disent les marchands Shopify',
  testimonialsSubtitle: 'Témoignages de marchands du programme early-access. Attribution anonymisée à leur demande.',
  testimonials: [
    { q: "L'installation tenait vraiment en 2 lignes. J'étais sceptique — tous les vendeurs disent « easy install » — mais avec Agalaz la balise script EST l'installation. Le Lighthouse n'a pas bougé.", a: 'Fondateur, marque DTC mode durable (Madrid)' },
    { q: "On a remplacé une Shopify App qui rognait nos marges par le script Agalaz. Même qualité d'essayage, plus de frais marketplace, et un flow de permissions en moins à maintenir.", a: 'Responsable e-commerce, marque femme mid-market (Lisbonne)' },
    { q: 'Les retours sur nos 20 robes phares sont passés de 38% à 27% en deux mois. Le guide des tailles était déjà bon ; l\'essayage a levé le doute restant juste avant le bouton acheter.', a: 'Head of Growth, marque cérémonie (Barcelone)' },
  ],
  finalCtaTitle: 'Prêt à ajouter l\'essayage à votre boutique Shopify ?',
  finalCtaBody: "Commencez avec 50 rendus gratuits. Deux lignes de code, trois minutes de setup, une raison de moins pour que vos clients retournent leur commande.",
  finalCtaBtn: 'Démarrer 7 jours gratuits',
};

const SHOPIFY_PT: ShopifyContent = {
  topBarCta: 'Começar teste grátis',
  badge: 'Para lojas Shopify',
  heroH1Main: 'Provador Virtual Shopify',
  heroH1Highlight: 'em 2 linhas de código.',
  heroSubtitle:
    'Adiciona um provador com IA em todas as fichas de produto da tua loja Shopify. Os clientes experimentam roupa, óculos, joalheria e acessórios no próprio corpo antes de comprar. Mais conversão, menos devoluções, zero plugins.',
  ctaPrimary: 'Começar 7 dias grátis',
  ctaSecondary: 'Ver demo ao vivo',
  heroMicrocopy: '50 renders incluídos · Sem custo de setup · Cancela quando quiseres',
  whyTitleLead: 'Porque as lojas Shopify escolhem',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Menos devoluções de moda', desc: 'A razão #1 das devoluções online é a dúvida com o tamanho. Quando o cliente vê a peça no próprio corpo antes de comprar, as devoluções caem a pique.' },
    { title: 'Mais conversão na ficha de produto', desc: 'O provador retém o visitante mais tempo na ficha e troca o "ficar-me-á bem?" por uma previsualização real. A conversão sobe em todas as categorias.' },
    { title: 'Privacidade por defeito', desc: 'As fotos dos clientes são processadas em tempo real e nunca armazenadas. A API key fica restrita ao teu domínio, ninguém mais pode usar o widget noutra loja.' },
  ],
  featuresTitle: 'Feito para Shopify, não colado por cima.',
  features: [
    { title: 'Deteta automaticamente a imagem do produto', desc: 'Reconhece o markup padrão de qualquer tema Shopify (Dawn, Debut, Sense, Refresh, Studio e a maioria de temas de terceiros). Sem mexer no tema além do script.' },
    { title: 'Instalação em 2 linhas', desc: 'Cola uma tag <script> em theme.liquid (mesmo antes de </head>) e um <div id="agalaz-tryon"></div> em product.liquid. Pronto.' },
    { title: 'Funciona em Online Store 2.0 e temas legacy', desc: 'Mesmo script para as duas gerações de temas Shopify. Sem builds específicos.' },
    { title: 'Multi-categoria', desc: 'Roupa, óculos, joalheria, chapéus, calçado, malas, tatuagens e nail art. A IA deteta a categoria a partir da imagem do produto.' },
    { title: 'Renders ultra-rápidos', desc: 'Cerca de 10 segundos por prova. O script carrega com defer, por isso o Lighthouse e Core Web Vitals não mexem.' },
    { title: 'Sem app para aprovar', desc: 'O Agalaz não é uma app da Shopify App Store, é um script. Zero permissões de app, zero fees do marketplace em cima da subscrição, zero risco se mudares de tema.' },
  ],
  howTitleLead: 'Instala no Shopify em',
  howTitleHighlight: '3 minutos',
  steps: [
    { title: 'Regista-te e obtém a tua API key', desc: 'Entra com Google na página Partners do Agalaz e começa o teu teste de 7 dias. Recebes uma API key ligada ao teu domínio que copias do dashboard.' },
    { title: 'Cola o script em theme.liquid', desc: 'Abre Online Store → Themes → Edit code → theme.liquid. Mesmo antes de </head>, cola:' },
    { title: 'Adiciona o div em product.liquid', desc: 'No template do produto (ou numa secção visível em todas as fichas), adiciona:', note: 'Guarda. Recarrega uma ficha de produto. O botão "Experimenta com IA" está ativo.' },
  ],
  pricingTitle: 'Preços para lojas Shopify',
  pricingSubtitle: 'Uma subscrição. Sem fees da Shopify App Store por cima. Cancela quando quiseres.',
  plans: [
    { name: 'Teste grátis', price: '€0', meta: '7 dias · 50 renders' },
    { name: 'Starter', price: '€150/mês', meta: '200 renders / mês' },
    { name: 'Growth', price: '€499/mês', meta: '1.000 renders / mês' },
  ],
  pricingCta: 'Obter o meu snippet para Shopify',
  faqTitle: 'FAQ provador Shopify',
  faqs: [
    { q: 'Funciona com o meu tema Shopify?', a: 'Sim. O Agalaz funciona com todos os temas Shopify incluindo Dawn, Debut, Sense, Refresh, Studio e qualquer tema custom. Suporta tanto Online Store 2.0 como a versão 1.0 legacy. O widget deteta a imagem do produto pelo markup padrão, sem config específica por tema.' },
    { q: 'Tenho de instalar uma app da Shopify App Store?', a: 'Não. O Agalaz não é uma app Shopify — é um script leve que colas no tema. Logo zero permissões de app, zero fees em cima da subscrição, zero dores de cabeça se desligares o widget. Instalas como o Google Analytics: uma tag script e um div.' },
    { q: 'Como sabe a IA que produto experimentar?', a: 'Nas fichas de produto, o Agalaz deteta automaticamente a imagem principal a partir do markup Liquid padrão (img.product__media, img.product-single__photo, etc.). Para páginas de coleção ou layouts custom, podes passar a URL da imagem explicitamente com data-garment no div.' },
    { q: 'Quão rápido é o render nas fichas?', a: 'Tempo médio: cerca de 10 segundos por prova. O widget carrega de forma assíncrona, nunca bloqueia a ficha — o Lighthouse e Core Web Vitals ficam intactos.' },
    { q: 'Guardam as fotos dos meus clientes?', a: 'Não. As fotos do cliente são processadas em tempo real e descartadas imediatamente. Política de retenção zero em imagens carregadas. Os teus compradores usam o provador sem preocupações de privacidade.' },
    { q: 'Quanto custa?', a: 'Começas com um teste de 7 dias (50 renders incluídos, sem custo de setup). Depois o plano Starter é €150/mês para 200 renders, ou Growth a €499/mês para 1.000 renders. Cancelas quando quiseres pelo portal de cliente Stripe.' },
    { q: 'O widget vai abrandar a minha loja Shopify?', a: 'Não. O script carrega com o atributo defer e só ativa quando o cliente clica em "Experimenta com IA". A ficha não é afetada e o teu Lighthouse mantém-se.' },
  ],
  testimonialsTitle: 'O que dizem os lojistas Shopify',
  testimonialsSubtitle: 'Testemunhos de comerciantes do programa inicial. Atribuição anonimizada a pedido.',
  testimonials: [
    { q: 'A instalação foram mesmo 2 linhas de código. Estava cético — todos os fornecedores dizem "easy install" — mas com o Agalaz a tag script É a instalação. O Lighthouse não mexeu.', a: 'Fundador, marca DTC de moda sustentável (Madrid)' },
    { q: 'Substituímos uma Shopify App que comia margem pelo script do Agalaz. Mesma qualidade de prova, sem fee do marketplace em cima da subscrição e um fluxo de permissões a menos para manter.', a: 'Gestor de e-commerce, marca de mulher mid-market (Lisboa)' },
    { q: 'As devoluções dos nossos 20 vestidos top caíram de 38% para 27% em dois meses. O guia de tamanhos já era bom; o provador fechou a dúvida restante mesmo no botão de comprar.', a: 'Head of Growth, marca de cerimónia (Barcelona)' },
  ],
  finalCtaTitle: 'Pronto para adicionar provador virtual ao teu Shopify?',
  finalCtaBody: 'Começa com 50 renders grátis. Duas linhas de código, três minutos de instalação, uma razão a menos para os teus clientes devolverem.',
  finalCtaBtn: 'Começar 7 dias grátis',
};

const SHOPIFY_DE: ShopifyContent = {
  topBarCta: 'Kostenlos starten',
  badge: 'Für Shopify-Händler',
  heroH1Main: 'Shopify Virtuelle Anprobe',
  heroH1Highlight: 'in 2 Zeilen Code.',
  heroSubtitle:
    'Füge eine KI-Umkleidekabine zu jeder Produktseite deines Shopify-Shops hinzu. Kunden probieren Kleidung, Brillen, Schmuck und Accessoires an ihrem echten Körper an, bevor sie kaufen. Höhere Conversion, weniger Retouren, kein Plugin nötig.',
  ctaPrimary: '7 Tage kostenlos testen',
  ctaSecondary: 'Live-Demo ansehen',
  heroMicrocopy: '50 Renderings inklusive · Keine Setup-Gebühr · Jederzeit kündbar',
  whyTitleLead: 'Warum Shopify-Shops sich für',
  whyTitleBrand: 'Agalaz entscheiden',
  whyCards: [
    { title: 'Weniger Mode-Retouren', desc: 'Grund #1 für Online-Retouren ist die Größenunsicherheit. Wenn der Kunde das Kleidungsstück an seinem eigenen Körper sieht, sinken die Retouren drastisch.' },
    { title: 'Höhere Conversion auf der Produktseite', desc: 'Die Anprobe hält Besucher länger auf der Produktseite und ersetzt das „Wird mir das stehen?" durch eine konkrete Vorschau. Conversion steigt in jeder Kategorie.' },
    { title: 'Datenschutz von Anfang an', desc: 'Kundenfotos werden in Echtzeit verarbeitet und nie gespeichert. Der API-Key ist an deine Domain gebunden — niemand sonst kann dein Widget in einem anderen Shop verwenden.' },
  ],
  featuresTitle: 'Für Shopify gebaut, nicht draufgesetzt.',
  features: [
    { title: 'Produktbild wird automatisch erkannt', desc: 'Erkennt das Standard-Markup jedes Shopify-Themes (Dawn, Debut, Sense, Refresh, Studio und die meisten Drittanbieter-Themes). Keine Theme-Änderungen außer dem Script-Tag.' },
    { title: 'Installation in 2 Zeilen', desc: 'Füge ein <script>-Tag in theme.liquid ein (direkt vor </head>) und ein <div id="agalaz-tryon"></div> in product.liquid. Fertig.' },
    { title: 'Online Store 2.0 und Legacy-Themes', desc: 'Gleiches Script-Tag für beide großen Shopify-Theme-Generationen. Keine theme-spezifischen Build-Schritte.' },
    { title: 'Multi-Kategorie', desc: 'Kleidung, Brillen, Schmuck, Hüte, Schuhe, Taschen plus Tattoos und Nageldesign. Die KI erkennt die Kategorie aus dem Produktbild.' },
    { title: 'Blitzschnelle Renderings', desc: 'Rund 10 Sekunden pro Anprobe. Das Script lädt mit defer, dein Lighthouse und Core Web Vitals bleiben unverändert.' },
    { title: 'Keine App-Genehmigung nötig', desc: 'Agalaz ist kein Shopify-App-Store-App, sondern ein Script. Null App-Berechtigungen, null App-Gebühren über deinem Abo, null Risiko beim Theme-Wechsel.' },
  ],
  howTitleLead: 'Installation in Shopify in',
  howTitleHighlight: '3 Minuten',
  steps: [
    { title: 'Registrieren und API-Key holen', desc: 'Melde dich mit Google auf der Agalaz-Partners-Seite an und starte deinen 7-Tage-Test. Du bekommst einen domain-gebundenen API-Key, den du im Dashboard kopierst.' },
    { title: 'Script in theme.liquid einfügen', desc: 'Öffne Online Store → Themes → Edit code → theme.liquid. Direkt vor </head> einfügen:' },
    { title: 'Div in product.liquid einfügen', desc: 'In deinem Produkt-Template (oder einer auf allen Produktseiten sichtbaren Section) hinzufügen:', note: 'Speichern. Produktseite neu laden. Der Button „Mit KI anprobieren" ist live.' },
  ],
  pricingTitle: 'Preise für Shopify-Händler',
  pricingSubtitle: 'Ein Abo. Keine Shopify-App-Store-Gebühren obendrauf. Jederzeit kündbar.',
  plans: [
    { name: 'Kostenloser Test', price: '€0', meta: '7 Tage · 50 Renderings' },
    { name: 'Starter', price: '€150/Mon.', meta: '200 Renderings / Monat' },
    { name: 'Growth', price: '€499/Mon.', meta: '1.000 Renderings / Monat' },
  ],
  pricingCta: 'Mein Shopify-Snippet holen',
  faqTitle: 'Shopify-Anprobe FAQ',
  faqs: [
    { q: 'Funktioniert es mit meinem Shopify-Theme?', a: 'Ja. Agalaz funktioniert mit jedem Shopify-Theme inkl. Dawn, Debut, Sense, Refresh, Studio und jedem Custom-Theme. Online Store 2.0 und Legacy 1.0 werden unterstützt. Das Widget erkennt das Produktbild automatisch aus dem Standard-Markup — keine theme-spezifische Konfiguration nötig.' },
    { q: 'Muss ich eine App aus dem Shopify App Store installieren?', a: 'Nein. Agalaz ist keine Shopify-App, sondern ein leichtgewichtiges Script, das du in dein Theme einfügst. Heißt: null App-Berechtigungen zum Genehmigen, null App-Gebühren über deinem Abo, null Aufwand beim Entfernen. Du installierst es wie Google Analytics: ein Script-Tag und ein Div.' },
    { q: 'Woher weiß die KI, welches Produkt sie anprobieren soll?', a: 'Auf Produktseiten erkennt Agalaz automatisch das Hauptbild aus dem Standard-Liquid-Markup (img.product__media, img.product-single__photo etc.). Für Collection-Seiten oder Custom-Layouts kannst du die Bild-URL explizit über das data-garment-Attribut am Div übergeben.' },
    { q: 'Wie schnell ist das Rendering auf Produktseiten?', a: 'Durchschnittliche Render-Zeit: ca. 10 Sekunden pro Anprobe. Das Widget lädt asynchron und blockiert die Produktseite nie — dein Lighthouse und Core Web Vitals bleiben intakt.' },
    { q: 'Speichert ihr die Fotos meiner Kunden?', a: 'Nein. Kundenfotos werden in Echtzeit verarbeitet und sofort verworfen. Zero-Retention-Policy für hochgeladene Bilder. Deine Kunden nutzen die Anprobe ohne Datenschutzbedenken.' },
    { q: 'Was kostet es?', a: 'Du startest mit einem 7-Tage-Test (50 Renderings inklusive, keine Setup-Gebühr). Danach Starter €150/Monat für 200 Renderings oder Growth €499/Monat für 1.000 Renderings. Jederzeit über das Stripe-Kundenportal kündbar.' },
    { q: 'Verlangsamt das Widget meinen Shopify-Shop?', a: 'Nein. Das Script lädt mit defer-Attribut und aktiviert sich erst, wenn ein Kunde auf „Mit KI anprobieren" klickt. Die Produktseite selbst wird nicht beeinflusst, dein Lighthouse-Score bleibt gleich.' },
  ],
  testimonialsTitle: 'Was Shopify-Händler sagen',
  testimonialsSubtitle: 'Zitate aus dem Early-Access-Programm. Attribution auf Wunsch anonymisiert.',
  testimonials: [
    { q: 'Die Installation waren tatsächlich 2 Zeilen Code. Ich war skeptisch — jeder Anbieter sagt „einfache Installation" — aber bei Agalaz IST das Script-Tag die Installation. Lighthouse hat sich nicht verändert.', a: 'Gründer, nachhaltige Fashion-DTC-Marke (Madrid)' },
    { q: 'Wir haben eine Shopify-App, die unsere Margen aufgefressen hat, durch das Agalaz-Script ersetzt. Gleiche Anprobe-Qualität, keine Marketplace-Gebühren mehr, ein Berechtigungs-Flow weniger zu pflegen.', a: 'E-Commerce-Manager, Mid-Market-Damenmode (Lissabon)' },
    { q: 'Die Retouren auf unsere Top-20-Kleider sind in zwei Monaten von 38% auf 27% gefallen. Die Größentabelle war schon solide; die Anprobe hat den letzten Zweifel am Kaufbutton beseitigt.', a: 'Head of Growth, Anlassmoden-Marke (Barcelona)' },
  ],
  finalCtaTitle: 'Bereit, die Anprobe zu deinem Shopify-Shop hinzuzufügen?',
  finalCtaBody: 'Starte mit 50 kostenlosen Renderings. Zwei Zeilen Code, drei Minuten Setup, ein Grund weniger für Kunden, ihre Bestellung zurückzuschicken.',
  finalCtaBtn: '7 Tage kostenlos testen',
};

const SHOPIFY_IT: ShopifyContent = {
  topBarCta: 'Inizia prova gratuita',
  badge: 'Per merchant Shopify',
  heroH1Main: 'Prova Virtuale Shopify',
  heroH1Highlight: 'in 2 righe di codice.',
  heroSubtitle:
    'Aggiungi un camerino IA su ogni scheda prodotto del tuo store Shopify. I clienti provano vestiti, occhiali, gioielli e accessori sul proprio corpo prima di comprare. Più conversioni, meno resi, zero plugin da installare.',
  ctaPrimary: 'Inizia 7 giorni gratis',
  ctaSecondary: 'Vedi una demo live',
  heroMicrocopy: '50 render inclusi · Senza setup fee · Disdici quando vuoi',
  whyTitleLead: 'Perché gli store Shopify scelgono',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Meno resi moda', desc: 'Il motivo #1 dei resi online è il dubbio sulla taglia. Quando il cliente vede il capo sul proprio corpo prima di comprare, i resi crollano.' },
    { title: 'Più conversione sulla scheda prodotto', desc: 'La prova tiene il visitatore più a lungo sulla scheda e sostituisce il "starà bene su di me?" con un\'anteprima concreta. La conversione sale in ogni categoria.' },
    { title: 'Privacy by default', desc: 'Le foto dei clienti vengono elaborate in tempo reale e mai memorizzate. L\'API key è vincolata al tuo dominio, nessun altro può usare il widget su un altro store.' },
  ],
  featuresTitle: 'Costruito per Shopify, non incollato sopra.',
  features: [
    { title: "Rileva l'immagine prodotto automaticamente", desc: 'Riconosce il markup standard di ogni tema Shopify (Dawn, Debut, Sense, Refresh, Studio e la maggior parte dei temi di terze parti). Nessuna modifica al tema oltre allo script.' },
    { title: 'Installazione in 2 righe', desc: 'Incolla un tag <script> in theme.liquid (subito prima di </head>) e un <div id="agalaz-tryon"></div> in product.liquid. Fatto.' },
    { title: 'Funziona su Online Store 2.0 e temi legacy', desc: 'Stesso script per entrambe le generazioni principali di temi Shopify. Nessun build specifico.' },
    { title: 'Multi-categoria', desc: 'Vestiti, occhiali, gioielli, cappelli, calzature, borse, tatuaggi e nail art. L\'IA rileva la categoria dall\'immagine del prodotto.' },
    { title: 'Render fulminei', desc: 'Circa 10 secondi per prova. Lo script carica con defer, il tuo Lighthouse e Core Web Vitals restano intatti.' },
    { title: 'Nessuna app da approvare', desc: 'Agalaz non è una app del Shopify App Store, è uno script. Zero permessi app, zero fee marketplace sopra l\'abbonamento, zero rischio se cambi tema.' },
  ],
  howTitleLead: 'Installa su Shopify in',
  howTitleHighlight: '3 minuti',
  steps: [
    { title: 'Registrati e ottieni la tua API key', desc: 'Accedi con Google sulla pagina Partners di Agalaz e inizia la tua prova di 7 giorni. Ricevi una API key legata al tuo dominio da copiare dal dashboard.' },
    { title: 'Incolla lo script in theme.liquid', desc: 'Apri Online Store → Themes → Edit code → theme.liquid. Subito prima di </head>, incolla:' },
    { title: 'Aggiungi il div in product.liquid', desc: 'Nel template prodotto (o in una sezione visibile su ogni scheda), aggiungi:', note: 'Salva. Ricarica una scheda prodotto. Il pulsante "Provalo con IA" è attivo.' },
  ],
  pricingTitle: 'Prezzi per merchant Shopify',
  pricingSubtitle: 'Un solo abbonamento. Nessun fee dello Shopify App Store sopra. Disdici quando vuoi.',
  plans: [
    { name: 'Prova gratuita', price: '€0', meta: '7 giorni · 50 render' },
    { name: 'Starter', price: '€150/mese', meta: '200 render / mese' },
    { name: 'Growth', price: '€499/mese', meta: '1.000 render / mese' },
  ],
  pricingCta: 'Ottieni il mio snippet per Shopify',
  faqTitle: 'FAQ prova Shopify',
  faqs: [
    { q: 'Funziona con il mio tema Shopify?', a: 'Sì. Agalaz funziona con tutti i temi Shopify incluso Dawn, Debut, Sense, Refresh, Studio e qualsiasi tema custom. Supporta Online Store 2.0 e la versione 1.0 legacy. Il widget rileva l\'immagine del prodotto dal markup standard, nessuna config specifica per tema.' },
    { q: 'Devo installare una app dal Shopify App Store?', a: 'No. Agalaz non è una app Shopify, è uno script leggero da incollare nel tema. Quindi zero permessi app da approvare, zero fee sopra l\'abbonamento e zero grattacapi se rimuovi il widget. Lo installi come Google Analytics: un tag script e un div.' },
    { q: 'Come fa l\'IA a sapere quale prodotto provare?', a: 'Sulle schede prodotto, Agalaz rileva automaticamente l\'immagine principale dal markup Liquid standard (img.product__media, img.product-single__photo, ecc.). Per pagine di collezione o layout custom puoi passare l\'URL dell\'immagine esplicitamente con l\'attributo data-garment sul div.' },
    { q: 'Quanto è veloce il render sulle schede?', a: 'Tempo medio: circa 10 secondi per prova. Il widget carica in modo asincrono, non blocca mai la scheda — il tuo Lighthouse e Core Web Vitals restano intatti.' },
    { q: 'Conservate le foto dei miei clienti?', a: 'No. Le foto dei clienti vengono elaborate in tempo reale e scartate subito. Policy a zero retention sulle immagini caricate. I tuoi acquirenti usano la prova senza problemi di privacy.' },
    { q: 'Quanto costa?', a: 'Inizi con una prova di 7 giorni (50 render inclusi, nessun setup fee). Dopo, il piano Starter è €150/mese per 200 render, o Growth a €499/mese per 1.000 render. Disdici quando vuoi dal portale clienti Stripe.' },
    { q: 'Il widget rallenterà il mio store Shopify?', a: 'No. Lo script carica con l\'attributo defer e si attiva solo quando un cliente clicca "Provalo con IA". La scheda prodotto non è influenzata e il tuo Lighthouse resta uguale.' },
  ],
  testimonialsTitle: 'Cosa dicono i merchant Shopify',
  testimonialsSubtitle: 'Testimonianze dal programma early-access. Attribuzione anonimizzata su richiesta.',
  testimonials: [
    { q: 'L\'installazione sono davvero 2 righe di codice. Ero scettico — ogni vendor dice "facile installazione" — ma con Agalaz il tag script È l\'installazione. Il Lighthouse non si è mosso.', a: 'Fondatore, marca DTC moda sostenibile (Madrid)' },
    { q: 'Abbiamo sostituito una Shopify App che ci mangiava i margini con lo script di Agalaz. Stessa qualità di prova, niente fee marketplace sopra l\'abbonamento, un flow di permessi in meno da mantenere.', a: 'E-commerce manager, marca donna mid-market (Lisbona)' },
    { q: 'I resi sui nostri 20 vestiti top sono scesi dal 38% al 27% in due mesi. La guida alle taglie era già solida; la prova ha chiuso il dubbio rimanente proprio al pulsante di acquisto.', a: 'Head of Growth, marca da cerimonia (Barcellona)' },
  ],
  finalCtaTitle: 'Pronto ad aggiungere la prova al tuo Shopify?',
  finalCtaBody: 'Inizia con 50 render gratis. Due righe di codice, tre minuti di setup, una ragione in meno per cui i tuoi clienti restituiscono l\'ordine.',
  finalCtaBtn: 'Inizia 7 giorni gratis',
};

export const SHOPIFY_CONTENT: Record<Lang, ShopifyContent> = {
  en: SHOPIFY_EN,
  es: SHOPIFY_ES,
  fr: SHOPIFY_FR,
  pt: SHOPIFY_PT,
  de: SHOPIFY_DE,
  it: SHOPIFY_IT,
};

// ───────────────────────────────────────────────────────── WOOCOMMERCE ──────

const WOO_EN: WooContent = {
  topBarCta: 'Start free trial',
  badge: 'For WooCommerce stores',
  heroH1Main: 'WooCommerce Virtual Try-On',
  heroH1Highlight: 'with no plugin to install.',
  heroSubtitle:
    'Add an AI fitting room to every product page on your WooCommerce store. Customers preview clothing, eyewear, jewelry and accessories on themselves before buying. Higher conversion, fewer returns, zero plugin maintenance.',
  ctaPrimary: 'Start 7-day free trial',
  ctaSecondary: 'See a live demo',
  heroMicrocopy: '50 renders included · No plugin to install · Cancel anytime',
  whyTitleLead: 'Why WooCommerce stores choose',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Fewer fashion returns', desc: 'Fit anxiety is the #1 reason apparel returns happen on WooCommerce. Letting customers see the garment on their real body removes the doubt before checkout.' },
    { title: 'Higher product-page conversion', desc: 'The try-on widget keeps shoppers on the product page longer and replaces "I\'m not sure" with a concrete preview, lifting conversion across every category.' },
    { title: 'Privacy-first by default', desc: 'Customer photos are processed in real time and never stored. Your API key is locked to your domain, so no one else can use the widget elsewhere.' },
  ],
  featuresTitle: 'Built for WooCommerce, not bolted on.',
  features: [
    { title: 'No plugin to install', desc: 'Agalaz is a script you paste into your theme or header.php. No WordPress plugin to install, update or audit. Zero risk of plugin-vs-plugin conflicts.' },
    { title: 'Auto-detects product images', desc: 'Recognises the standard WooCommerce product gallery markup (woocommerce-product-gallery__image, wp-post-image) on all major themes including Storefront, Astra, Kadence and OceanWP.' },
    { title: 'Three-line install', desc: 'A <script> tag in your theme header and a single shortcode (or a <div id="agalaz-tryon"></div>) on the product page. Done.' },
    { title: 'Works with Elementor / Divi / Gutenberg', desc: 'Drop the div block (or shortcode) into any page builder. Elementor, Divi, Bricks, Beaver Builder, Gutenberg blocks — all supported.' },
    { title: 'Lightning-fast renders', desc: 'Around 10 seconds per try-on. The script loads with defer, so your Lighthouse and Core Web Vitals scores stay intact.' },
    { title: 'GDPR-friendly', desc: 'Zero data retention on customer photos. EU servers available on request. The widget never tracks visitors who do not click it.' },
  ],
  howTitleLead: 'Install on WooCommerce in',
  howTitleHighlight: '3 minutes',
  steps: [
    { title: 'Sign up and grab your API key', desc: 'Sign in with Google on the Agalaz Partners page and start your 7-day free trial. You get a domain-scoped API key from the dashboard.' },
    { title: 'Add the script to your theme header', desc: 'In Appearance → Theme File Editor, open header.php (or your child theme equivalent) and add the following just before </head>:' },
    { title: 'Add the div to the product template', desc: 'Place a shortcode or div on your single-product page. The simplest option is the [agalaz_tryon] shortcode in a custom HTML block; advanced users can drop a div directly:', note: 'Save. Refresh a product page. The "Try it on with AI" button is live.' },
  ],
  pricingTitle: 'Pricing for WooCommerce stores',
  pricingSubtitle: 'One subscription. No per-render fees. No WordPress plugin licence. Cancel anytime.',
  plans: [
    { name: 'Free trial', price: '€0', meta: '7 days · 50 renders' },
    { name: 'Starter', price: '€150/mo', meta: '200 renders / month' },
    { name: 'Growth', price: '€499/mo', meta: '1,000 renders / month' },
  ],
  pricingCta: 'Get my WooCommerce snippet',
  faqTitle: 'WooCommerce try-on FAQ',
  faqs: [
    { q: 'Do I need a WordPress plugin?', a: 'No. Agalaz works without a plugin. You paste a script tag in your theme header (or via Snippets / Code Manager) and a single div or shortcode on product pages. This avoids plugin conflicts, plugin update breakage and security audit overhead.' },
    { q: 'Does it work with my theme (Storefront / Astra / Kadence / Divi…)?', a: 'Yes. Agalaz auto-detects WooCommerce product images from the standard gallery markup used by Storefront, Astra, Kadence, OceanWP, Flatsome, Divi, Avada and most modern themes. For unusual themes or custom layouts, pass the image URL explicitly via a data-garment attribute.' },
    { q: 'Will it slow down my WordPress site?', a: 'No. The script is loaded with defer and only fires when a customer clicks "Try it on with AI". The product page itself is unaffected and Lighthouse / Core Web Vitals stay where they are.' },
    { q: 'Is it GDPR compliant?', a: 'Yes. Customer photos are processed in real time and immediately discarded — we have a zero retention policy on customer-uploaded images. EU server routing is available on request for stores with strict residency requirements.' },
    { q: 'Can I use it inside Elementor or Gutenberg?', a: 'Yes. Drop the [agalaz_tryon] shortcode into any Elementor Shortcode widget, Gutenberg Custom HTML block, Divi Code module, or directly into the page builder source. The widget renders inside whichever block you place it in.' },
    { q: 'How much does it cost?', a: 'You start with a 7-day free trial (50 renders included, no setup fee). After the trial the Starter plan is €150/month for 200 renders, or Growth at €499/month for 1,000 renders. Cancel anytime from your Stripe customer portal.' },
    { q: 'Can I uninstall easily?', a: 'Yes. Remove the script tag and the div/shortcode and the widget is gone. No leftover database entries, no scheduled tasks, no orphaned plugin folders.' },
  ],
  testimonialsTitle: 'What WooCommerce stores say',
  testimonialsSubtitle: 'Quotes from early-program merchants. Attribution anonymised at their request.',
  testimonials: [
    { q: 'I run a Storefront-based WooCommerce store and was tired of plugins breaking on every WordPress update. Agalaz being a script tag instead of a plugin was the deciding factor.', a: 'Owner, women\'s ready-to-wear (Valencia)' },
    { q: 'We A/B tested for two weeks: the product pages with the try-on lifted conversion by ~9% vs. control. The bigger surprise was returns dropping a month later.', a: 'Head of e-commerce, swimwear brand (Marseille)' },
    { q: 'GDPR was a hard requirement — most try-on vendors store images. Zero retention plus EU routing on request was enough for our DPO to greenlight it.', a: 'CTO, French DTC eyewear (Lyon)' },
  ],
  finalCtaTitle: 'Ready to add try-on to your WooCommerce store?',
  finalCtaBody: 'Start with 50 free renders. Three lines, three minutes, one less reason for your customers to return their order.',
  finalCtaBtn: 'Start 7-day free trial',
};

const WOO_ES: WooContent = {
  topBarCta: 'Empezar prueba gratis',
  badge: 'Para tiendas WooCommerce',
  heroH1Main: 'Probador Virtual WooCommerce',
  heroH1Highlight: 'sin plugin que instalar.',
  heroSubtitle:
    'Añade un probador con IA en cada ficha de producto de tu tienda WooCommerce. Tus clientes se prueban ropa, gafas, joyería y accesorios sobre su propio cuerpo antes de comprar. Más conversión, menos devoluciones, cero plugins que mantener.',
  ctaPrimary: 'Empezar 7 días gratis',
  ctaSecondary: 'Ver demo en vivo',
  heroMicrocopy: '50 renders incluidos · Sin plugin · Cancela cuando quieras',
  whyTitleLead: 'Por qué las tiendas WooCommerce eligen',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Menos devoluciones de moda', desc: 'La duda con la talla es la razón #1 por la que se devuelve ropa en WooCommerce. Cuando el cliente ve la prenda sobre su cuerpo real, la duda desaparece antes del checkout.' },
    { title: 'Más conversión en ficha de producto', desc: 'El probador retiene al visitante en la ficha y sustituye el "no estoy seguro" por una previsualización concreta. La conversión sube en todas las categorías.' },
    { title: 'Privacidad por defecto', desc: 'Las fotos del cliente se procesan en tiempo real y nunca se almacenan. Tu API key está restringida a tu dominio, así nadie más puede usar el widget.' },
  ],
  featuresTitle: 'Hecho para WooCommerce, no añadido encima.',
  features: [
    { title: 'Sin plugin que instalar', desc: 'Agalaz es un script que pegas en tu theme o header.php. Sin plugin de WordPress que instalar, actualizar o auditar. Cero riesgo de conflictos entre plugins.' },
    { title: 'Detecta automáticamente la imagen del producto', desc: 'Reconoce el markup estándar de la galería WooCommerce (woocommerce-product-gallery__image, wp-post-image) en todos los themes principales: Storefront, Astra, Kadence, OceanWP.' },
    { title: 'Instalación en 3 líneas', desc: 'Una etiqueta <script> en el header de tu theme y un shortcode (o un <div id="agalaz-tryon"></div>) en la página de producto. Listo.' },
    { title: 'Funciona con Elementor / Divi / Gutenberg', desc: 'Inserta el div o shortcode en cualquier page builder. Elementor, Divi, Bricks, Beaver Builder, bloques de Gutenberg — todos soportados.' },
    { title: 'Renders muy rápidos', desc: 'Alrededor de 10 segundos por prueba. El script carga con defer, así tu Lighthouse y Core Web Vitals no se mueven.' },
    { title: 'Compatible con RGPD', desc: 'Cero retención de fotos de clientes. Servidores en la UE bajo petición. El widget no rastrea a visitantes que no lo abren.' },
  ],
  howTitleLead: 'Instálalo en WooCommerce en',
  howTitleHighlight: '3 minutos',
  steps: [
    { title: 'Regístrate y consigue tu API key', desc: 'Entra con Google en la página de Partners de Agalaz y empieza tu prueba de 7 días. Recibes una API key vinculada a tu dominio desde el panel.' },
    { title: 'Añade el script al header de tu theme', desc: 'En Apariencia → Editor de archivos de tema, abre header.php (o su equivalente en tu child theme) y añade justo antes de </head>:' },
    { title: 'Añade el div al template de producto', desc: 'Coloca un shortcode o un div en la página de producto único. La opción más simple es el shortcode [agalaz_tryon] en un bloque HTML; los avanzados pueden insertar un div directamente:', note: 'Guarda. Recarga una ficha de producto. El botón "Pruébatelo con IA" ya está activo.' },
  ],
  pricingTitle: 'Precios para tiendas WooCommerce',
  pricingSubtitle: 'Una sola suscripción. Sin fee por render. Sin licencia de plugin. Cancela cuando quieras.',
  plans: [
    { name: 'Prueba gratis', price: '€0', meta: '7 días · 50 renders' },
    { name: 'Starter', price: '€150/mes', meta: '200 renders / mes' },
    { name: 'Growth', price: '€499/mes', meta: '1.000 renders / mes' },
  ],
  pricingCta: 'Obtener mi snippet para WooCommerce',
  faqTitle: 'FAQ del probador WooCommerce',
  faqs: [
    { q: '¿Necesito un plugin de WordPress?', a: 'No. Agalaz funciona sin plugin. Pegas una etiqueta script en el header del theme (o vía Snippets / Code Manager) y un único div o shortcode en las páginas de producto. Esto evita conflictos entre plugins, fallos por actualizaciones y la sobrecarga de auditorías de seguridad.' },
    { q: '¿Funciona con mi theme (Storefront / Astra / Kadence / Divi…)?', a: 'Sí. Agalaz detecta automáticamente las imágenes de producto WooCommerce desde el markup estándar de la galería usado en Storefront, Astra, Kadence, OceanWP, Flatsome, Divi, Avada y la mayoría de themes modernos. Para themes raros o layouts custom, pasa la URL de la imagen explícitamente con un atributo data-garment.' },
    { q: '¿Va a ralentizar mi WordPress?', a: 'No. El script carga con defer y solo se ejecuta cuando el cliente pulsa "Pruébatelo con IA". La ficha de producto no se ve afectada y tu Lighthouse / Core Web Vitals se mantienen.' },
    { q: '¿Cumple con RGPD?', a: 'Sí. Las fotos del cliente se procesan en tiempo real y se descartan inmediatamente — política de retención cero sobre imágenes subidas por usuarios. Hay enrutamiento por servidores en la UE bajo petición para tiendas con requisitos estrictos de residencia.' },
    { q: '¿Puedo usarlo dentro de Elementor o Gutenberg?', a: 'Sí. Inserta el shortcode [agalaz_tryon] en cualquier widget Shortcode de Elementor, bloque HTML personalizado de Gutenberg, módulo Code de Divi, o directamente en el código del page builder. El widget se renderiza dentro del bloque donde lo coloques.' },
    { q: '¿Cuánto cuesta?', a: 'Empiezas con prueba de 7 días (50 renders incluidos, sin coste de setup). Tras la prueba, plan Starter €150/mes para 200 renders, o Growth a €499/mes para 1.000 renders. Cancelas cuando quieras desde el portal de cliente de Stripe.' },
    { q: '¿Se desinstala fácil?', a: 'Sí. Quita la etiqueta script y el div/shortcode y el widget desaparece. Sin entradas residuales en base de datos, sin tareas programadas, sin carpetas huérfanas de plugin.' },
  ],
  testimonialsTitle: 'Lo que dicen las tiendas WooCommerce',
  testimonialsSubtitle: 'Testimonios de comerciantes del programa inicial. Atribución anonimizada a petición suya.',
  testimonials: [
    { q: 'Llevo una tienda WooCommerce sobre Storefront y estaba harto de plugins rompiéndose en cada actualización de WordPress. Que Agalaz fuera un script en vez de un plugin fue el factor decisivo.', a: 'Propietario, prêt-à-porter mujer (Valencia)' },
    { q: 'Hicimos A/B test durante dos semanas: las fichas con probador subieron la conversión ~9% vs control. La sorpresa mayor fueron las devoluciones bajando un mes después.', a: 'Responsable e-commerce, marca de bañadores (Marsella)' },
    { q: 'El RGPD era requisito duro — la mayoría de proveedores de probador almacenan imágenes. Retención cero más enrutamiento en UE bajo petición fue suficiente para que nuestro DPO diera luz verde.', a: 'CTO, DTC francesa de gafas (Lyon)' },
  ],
  finalCtaTitle: '¿Listo para añadir probador virtual a tu WooCommerce?',
  finalCtaBody: 'Empieza con 50 renders gratis. Tres líneas, tres minutos, una razón menos para que tus clientes devuelvan el pedido.',
  finalCtaBtn: 'Empezar 7 días gratis',
};

const WOO_FR: WooContent = {
  topBarCta: 'Essai gratuit',
  badge: 'Pour boutiques WooCommerce',
  heroH1Main: 'Essayage Virtuel WooCommerce',
  heroH1Highlight: 'sans extension à installer.',
  heroSubtitle:
    "Ajoutez une cabine d'essayage IA sur chaque fiche produit de votre boutique WooCommerce. Vos clients essaient vêtements, lunettes, bijoux et accessoires sur leur propre corps avant d'acheter. Plus de conversion, moins de retours, aucune extension à maintenir.",
  ctaPrimary: 'Démarrer 7 jours gratuits',
  ctaSecondary: 'Voir une démo en direct',
  heroMicrocopy: "50 rendus inclus · Sans extension · Résiliable à tout moment",
  whyTitleLead: 'Pourquoi les boutiques WooCommerce choisissent',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Moins de retours mode', desc: "L'incertitude sur la taille est la raison #1 des retours mode sur WooCommerce. Voir le vêtement sur son propre corps lève le doute avant le checkout." },
    { title: 'Plus de conversion en fiche produit', desc: "L'essayage retient le visiteur sur la fiche et remplace « je ne suis pas sûr » par un aperçu concret, ce qui fait grimper la conversion partout." },
    { title: 'Confidentialité par défaut', desc: "Les photos clients sont traitées en temps réel et jamais stockées. Votre clé API est verrouillée sur votre domaine — personne d'autre ne peut utiliser le widget ailleurs." },
  ],
  featuresTitle: 'Conçu pour WooCommerce, pas greffé dessus.',
  features: [
    { title: "Aucune extension à installer", desc: "Agalaz est un script collé dans votre thème ou header.php. Pas d'extension WordPress à installer, mettre à jour ou auditer. Zéro risque de conflit entre extensions." },
    { title: "Détection automatique de l'image produit", desc: "Reconnaît le markup standard de la galerie WooCommerce (woocommerce-product-gallery__image, wp-post-image) sur tous les thèmes majeurs : Storefront, Astra, Kadence, OceanWP." },
    { title: 'Installation en 3 lignes', desc: "Une balise <script> dans le header de votre thème et un shortcode (ou un <div id=\"agalaz-tryon\"></div>) sur la fiche produit. Terminé." },
    { title: 'Compatible Elementor / Divi / Gutenberg', desc: 'Insérez le div ou shortcode dans tout page builder. Elementor, Divi, Bricks, Beaver Builder, blocs Gutenberg — tous supportés.' },
    { title: 'Rendus ultra-rapides', desc: "Environ 10 secondes par essayage. Le script charge en defer, votre Lighthouse et Core Web Vitals restent intacts." },
    { title: 'Conforme RGPD', desc: 'Zéro rétention sur les photos clients. Serveurs UE sur demande. Le widget ne suit pas les visiteurs qui ne cliquent pas dessus.' },
  ],
  howTitleLead: 'Installez sur WooCommerce en',
  howTitleHighlight: '3 minutes',
  steps: [
    { title: 'Inscrivez-vous et récupérez votre clé API', desc: "Connectez-vous avec Google sur la page Partners Agalaz et lancez votre essai 7 jours. Vous obtenez une clé API liée à votre domaine depuis le dashboard." },
    { title: "Ajoutez le script au header de votre thème", desc: 'Dans Apparence → Éditeur de fichiers, ouvrez header.php (ou son équivalent dans votre thème enfant) et ajoutez juste avant </head> :' },
    { title: 'Ajoutez le div au template produit', desc: 'Placez un shortcode ou un div sur la fiche produit unique. Option la plus simple : le shortcode [agalaz_tryon] dans un bloc HTML ; les utilisateurs avancés peuvent insérer un div directement :', note: 'Sauvegardez. Rechargez une fiche produit. Le bouton « Essayer avec IA » est actif.' },
  ],
  pricingTitle: 'Tarifs pour boutiques WooCommerce',
  pricingSubtitle: "Un abonnement. Pas de frais par rendu. Pas de licence d'extension. Résiliable à tout moment.",
  plans: [
    { name: 'Essai gratuit', price: '€0', meta: '7 jours · 50 rendus' },
    { name: 'Starter', price: '€150/mois', meta: '200 rendus / mois' },
    { name: 'Growth', price: '€499/mois', meta: '1 000 rendus / mois' },
  ],
  pricingCta: 'Obtenir mon snippet WooCommerce',
  faqTitle: 'FAQ essayage WooCommerce',
  faqs: [
    { q: "Ai-je besoin d'une extension WordPress ?", a: "Non. Agalaz fonctionne sans extension. Vous collez une balise script dans le header du thème (ou via Snippets / Code Manager) et un seul div ou shortcode sur les fiches produit. Cela évite les conflits entre extensions, les bugs lors de mises à jour et la surcharge d'audit de sécurité." },
    { q: 'Ça marche avec mon thème (Storefront / Astra / Kadence / Divi…) ?', a: "Oui. Agalaz détecte automatiquement les images produit WooCommerce depuis le markup standard de la galerie utilisé par Storefront, Astra, Kadence, OceanWP, Flatsome, Divi, Avada et la plupart des thèmes modernes. Pour les thèmes atypiques ou layouts personnalisés, passez l'URL de l'image via un attribut data-garment." },
    { q: 'Ça va ralentir mon site WordPress ?', a: "Non. Le script charge en defer et ne s'exécute que quand un client clique sur « Essayer avec IA ». La fiche elle-même n'est pas impactée et votre Lighthouse / Core Web Vitals restent intacts." },
    { q: 'Est-ce conforme au RGPD ?', a: 'Oui. Les photos clients sont traitées en temps réel et supprimées immédiatement — politique zéro rétention sur les images uploadées. Routage par serveurs UE disponible sur demande pour les boutiques avec exigences strictes de résidence des données.' },
    { q: "Puis-je l'utiliser dans Elementor ou Gutenberg ?", a: "Oui. Insérez le shortcode [agalaz_tryon] dans tout widget Shortcode Elementor, bloc HTML personnalisé Gutenberg, module Code Divi, ou directement dans la source du page builder. Le widget se rend dans le bloc où vous le placez." },
    { q: 'Combien ça coûte ?', a: "Vous démarrez avec un essai 7 jours (50 rendus inclus, pas de setup). Ensuite Starter à €150/mois pour 200 rendus, ou Growth à €499/mois pour 1 000 rendus. Résiliable à tout moment depuis le portail client Stripe." },
    { q: 'Désinstallation facile ?', a: 'Oui. Retirez la balise script et le div/shortcode et le widget disparaît. Aucune entrée résiduelle en base, aucune tâche planifiée, aucun dossier orphelin.' },
  ],
  testimonialsTitle: 'Ce que disent les boutiques WooCommerce',
  testimonialsSubtitle: 'Témoignages de marchands du programme early-access. Attribution anonymisée à leur demande.',
  testimonials: [
    { q: "Je gère une boutique WooCommerce sur Storefront et j'en avais marre des extensions qui cassent à chaque update de WordPress. Qu'Agalaz soit un script et pas une extension a été déterminant.", a: 'Propriétaire, prêt-à-porter femme (Valence)' },
    { q: 'Nous avons fait un A/B test sur deux semaines : les fiches avec essayage ont fait grimper la conversion de ~9% vs contrôle. La vraie surprise a été la baisse des retours un mois plus tard.', a: 'Responsable e-commerce, marque de maillots (Marseille)' },
    { q: "Le RGPD était une exigence dure — la plupart des fournisseurs d'essayage stockent les images. Zéro rétention plus routage UE sur demande ont suffi à notre DPO pour valider.", a: 'CTO, DTC lunettes (Lyon)' },
  ],
  finalCtaTitle: "Prêt à ajouter l'essayage à votre boutique WooCommerce ?",
  finalCtaBody: "Commencez avec 50 rendus gratuits. Trois lignes, trois minutes, une raison de moins pour que vos clients retournent leur commande.",
  finalCtaBtn: 'Démarrer 7 jours gratuits',
};

const WOO_PT: WooContent = {
  topBarCta: 'Começar teste grátis',
  badge: 'Para lojas WooCommerce',
  heroH1Main: 'Provador Virtual WooCommerce',
  heroH1Highlight: 'sem plugin para instalar.',
  heroSubtitle:
    'Adiciona um provador com IA em todas as fichas de produto da tua loja WooCommerce. Os clientes experimentam roupa, óculos, joalheria e acessórios no próprio corpo antes de comprar. Mais conversão, menos devoluções, zero plugins para manter.',
  ctaPrimary: 'Começar 7 dias grátis',
  ctaSecondary: 'Ver demo ao vivo',
  heroMicrocopy: '50 renders incluídos · Sem plugin · Cancela quando quiseres',
  whyTitleLead: 'Porque as lojas WooCommerce escolhem',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Menos devoluções de moda', desc: 'A dúvida com o tamanho é a razão #1 das devoluções de moda em WooCommerce. Ver a peça no próprio corpo elimina a dúvida antes do checkout.' },
    { title: 'Mais conversão na ficha de produto', desc: 'O provador retém o visitante na ficha e troca o "não tenho a certeza" por uma previsualização concreta, fazendo subir a conversão em todas as categorias.' },
    { title: 'Privacidade por defeito', desc: 'As fotos dos clientes são processadas em tempo real e nunca armazenadas. A tua API key fica restrita ao teu domínio, ninguém mais pode usar o widget noutro lado.' },
  ],
  featuresTitle: 'Feito para WooCommerce, não colado por cima.',
  features: [
    { title: 'Sem plugin para instalar', desc: 'O Agalaz é um script que colas no tema ou no header.php. Sem plugin WordPress para instalar, atualizar ou auditar. Zero risco de conflitos entre plugins.' },
    { title: 'Deteta automaticamente a imagem do produto', desc: 'Reconhece o markup padrão da galeria WooCommerce (woocommerce-product-gallery__image, wp-post-image) em todos os temas principais: Storefront, Astra, Kadence, OceanWP.' },
    { title: 'Instalação em 3 linhas', desc: 'Uma tag <script> no header do tema e um shortcode (ou um <div id="agalaz-tryon"></div>) na página de produto. Pronto.' },
    { title: 'Funciona com Elementor / Divi / Gutenberg', desc: 'Insere o div ou shortcode em qualquer page builder. Elementor, Divi, Bricks, Beaver Builder, blocos Gutenberg — todos suportados.' },
    { title: 'Renders ultra-rápidos', desc: 'Cerca de 10 segundos por prova. O script carrega com defer, o teu Lighthouse e Core Web Vitals ficam intactos.' },
    { title: 'Conforme RGPD', desc: 'Zero retenção em fotos de clientes. Servidores na UE a pedido. O widget não rastreia visitantes que não cliquem nele.' },
  ],
  howTitleLead: 'Instala no WooCommerce em',
  howTitleHighlight: '3 minutos',
  steps: [
    { title: 'Regista-te e obtém a tua API key', desc: 'Entra com Google na página Partners do Agalaz e começa o teu teste de 7 dias. Recebes uma API key ligada ao teu domínio a partir do dashboard.' },
    { title: 'Adiciona o script ao header do tema', desc: 'Em Aparência → Editor de Ficheiros do Tema, abre header.php (ou o equivalente no teu child theme) e adiciona mesmo antes de </head>:' },
    { title: 'Adiciona o div ao template do produto', desc: 'Coloca um shortcode ou div na página de produto único. A opção mais simples é o shortcode [agalaz_tryon] num bloco HTML; utilizadores avançados podem inserir um div diretamente:', note: 'Guarda. Recarrega uma ficha de produto. O botão "Experimenta com IA" está ativo.' },
  ],
  pricingTitle: 'Preços para lojas WooCommerce',
  pricingSubtitle: 'Uma subscrição. Sem fee por render. Sem licença de plugin. Cancela quando quiseres.',
  plans: [
    { name: 'Teste grátis', price: '€0', meta: '7 dias · 50 renders' },
    { name: 'Starter', price: '€150/mês', meta: '200 renders / mês' },
    { name: 'Growth', price: '€499/mês', meta: '1.000 renders / mês' },
  ],
  pricingCta: 'Obter o meu snippet WooCommerce',
  faqTitle: 'FAQ provador WooCommerce',
  faqs: [
    { q: 'Preciso de um plugin WordPress?', a: 'Não. O Agalaz funciona sem plugin. Colas uma tag script no header do tema (ou via Snippets / Code Manager) e um único div ou shortcode nas páginas de produto. Isto evita conflitos entre plugins, bugs em atualizações e a sobrecarga de auditorias de segurança.' },
    { q: 'Funciona com o meu tema (Storefront / Astra / Kadence / Divi…)?', a: 'Sim. O Agalaz deteta automaticamente as imagens de produto WooCommerce a partir do markup padrão da galeria usado por Storefront, Astra, Kadence, OceanWP, Flatsome, Divi, Avada e a maioria dos temas modernos. Para temas atípicos ou layouts custom, passa a URL da imagem explicitamente via um atributo data-garment.' },
    { q: 'Vai abrandar o meu site WordPress?', a: 'Não. O script carrega com defer e só dispara quando o cliente clica em "Experimenta com IA". A ficha do produto não é afetada e o Lighthouse / Core Web Vitals ficam intactos.' },
    { q: 'Está em conformidade com o RGPD?', a: 'Sim. As fotos dos clientes são processadas em tempo real e descartadas imediatamente — política de retenção zero em imagens carregadas. Routing por servidores na UE disponível a pedido para lojas com requisitos rígidos de residência.' },
    { q: 'Posso usá-lo dentro do Elementor ou Gutenberg?', a: 'Sim. Insere o shortcode [agalaz_tryon] num widget Shortcode do Elementor, bloco HTML personalizado do Gutenberg, módulo Code do Divi, ou diretamente no código do page builder. O widget renderiza-se dentro do bloco onde o colocares.' },
    { q: 'Quanto custa?', a: 'Começas com teste de 7 dias (50 renders incluídos, sem custo de setup). Depois plano Starter €150/mês para 200 renders, ou Growth a €499/mês para 1.000 renders. Cancelas quando quiseres pelo portal de cliente Stripe.' },
    { q: 'Posso desinstalar facilmente?', a: 'Sim. Remove a tag script e o div/shortcode e o widget desaparece. Sem entradas residuais na base de dados, sem tarefas agendadas, sem pastas de plugin órfãs.' },
  ],
  testimonialsTitle: 'O que dizem as lojas WooCommerce',
  testimonialsSubtitle: 'Testemunhos de comerciantes do programa inicial. Atribuição anonimizada a pedido.',
  testimonials: [
    { q: 'Giro uma loja WooCommerce sobre Storefront e estava farto de plugins partirem-se a cada atualização do WordPress. Que o Agalaz fosse um script em vez de plugin foi o fator decisivo.', a: 'Proprietário, prêt-à-porter de mulher (Valência)' },
    { q: 'Fizemos um A/B test durante duas semanas: as fichas com provador subiram a conversão ~9% vs controlo. A maior surpresa foram as devoluções a baixar um mês depois.', a: 'Responsável e-commerce, marca de fatos de banho (Marselha)' },
    { q: 'O RGPD era requisito rígido — a maioria dos fornecedores de provador armazena imagens. Zero retenção mais routing UE a pedido foi suficiente para o nosso DPO dar luz verde.', a: 'CTO, DTC francesa de óculos (Lyon)' },
  ],
  finalCtaTitle: 'Pronto para adicionar provador virtual ao teu WooCommerce?',
  finalCtaBody: 'Começa com 50 renders grátis. Três linhas, três minutos, uma razão a menos para os teus clientes devolverem o pedido.',
  finalCtaBtn: 'Começar 7 dias grátis',
};

const WOO_DE: WooContent = {
  topBarCta: 'Kostenlos starten',
  badge: 'Für WooCommerce-Shops',
  heroH1Main: 'WooCommerce Virtuelle Anprobe',
  heroH1Highlight: 'ohne Plugin-Installation.',
  heroSubtitle:
    'Füge eine KI-Umkleidekabine zu jeder Produktseite deines WooCommerce-Shops hinzu. Kunden probieren Kleidung, Brillen, Schmuck und Accessoires an ihrem echten Körper an, bevor sie kaufen. Höhere Conversion, weniger Retouren, kein Plugin-Wartungsaufwand.',
  ctaPrimary: '7 Tage kostenlos testen',
  ctaSecondary: 'Live-Demo ansehen',
  heroMicrocopy: '50 Renderings inklusive · Kein Plugin · Jederzeit kündbar',
  whyTitleLead: 'Warum WooCommerce-Shops sich für',
  whyTitleBrand: 'Agalaz entscheiden',
  whyCards: [
    { title: 'Weniger Mode-Retouren', desc: 'Größenunsicherheit ist Grund #1 für Bekleidungsretouren auf WooCommerce. Wenn der Kunde das Kleidungsstück an seinem echten Körper sieht, verschwindet der Zweifel vor dem Checkout.' },
    { title: 'Höhere Conversion auf der Produktseite', desc: 'Das Try-on-Widget hält Shopper länger auf der Produktseite und ersetzt „Ich bin mir nicht sicher" durch eine konkrete Vorschau — Conversion steigt in jeder Kategorie.' },
    { title: 'Datenschutz von Anfang an', desc: 'Kundenfotos werden in Echtzeit verarbeitet und nie gespeichert. Dein API-Key ist auf deine Domain beschränkt, sodass niemand anderes das Widget anderswo verwenden kann.' },
  ],
  featuresTitle: 'Für WooCommerce gebaut, nicht draufgesetzt.',
  features: [
    { title: 'Kein Plugin zu installieren', desc: 'Agalaz ist ein Script, das du in dein Theme oder header.php einfügst. Kein WordPress-Plugin zum Installieren, Aktualisieren oder Auditieren. Null Risiko für Plugin-Konflikte.' },
    { title: 'Produktbild wird automatisch erkannt', desc: 'Erkennt das Standard-Markup der WooCommerce-Produktgalerie (woocommerce-product-gallery__image, wp-post-image) auf allen großen Themes: Storefront, Astra, Kadence, OceanWP.' },
    { title: 'Installation in 3 Zeilen', desc: 'Ein <script>-Tag im Theme-Header und ein Shortcode (oder ein <div id="agalaz-tryon"></div>) auf der Produktseite. Fertig.' },
    { title: 'Funktioniert mit Elementor / Divi / Gutenberg', desc: 'Füge den Div-Block oder Shortcode in jeden Page-Builder ein. Elementor, Divi, Bricks, Beaver Builder, Gutenberg-Blöcke — alle unterstützt.' },
    { title: 'Blitzschnelle Renderings', desc: 'Rund 10 Sekunden pro Anprobe. Das Script lädt mit defer, dein Lighthouse und Core Web Vitals bleiben intakt.' },
    { title: 'DSGVO-freundlich', desc: 'Null Retention bei Kundenfotos. EU-Server auf Anfrage. Das Widget trackt keine Besucher, die nicht darauf klicken.' },
  ],
  howTitleLead: 'Installation in WooCommerce in',
  howTitleHighlight: '3 Minuten',
  steps: [
    { title: 'Registrieren und API-Key holen', desc: 'Melde dich mit Google auf der Agalaz-Partners-Seite an und starte deinen 7-Tage-Test. Du bekommst einen domain-gebundenen API-Key vom Dashboard.' },
    { title: 'Script in den Theme-Header einfügen', desc: 'In Design → Theme-Dateien-Editor öffne header.php (oder das Äquivalent in deinem Child-Theme) und füge direkt vor </head> ein:' },
    { title: 'Div in die Produkt-Template einfügen', desc: 'Platziere einen Shortcode oder Div auf der Einzelprodukt-Seite. Einfachste Option: der Shortcode [agalaz_tryon] in einem Custom-HTML-Block; fortgeschrittene Nutzer können einen Div direkt einfügen:', note: 'Speichern. Produktseite neu laden. Der Button „Mit KI anprobieren" ist live.' },
  ],
  pricingTitle: 'Preise für WooCommerce-Shops',
  pricingSubtitle: 'Ein Abo. Keine Pro-Rendering-Gebühren. Keine WordPress-Plugin-Lizenz. Jederzeit kündbar.',
  plans: [
    { name: 'Kostenloser Test', price: '€0', meta: '7 Tage · 50 Renderings' },
    { name: 'Starter', price: '€150/Mon.', meta: '200 Renderings / Monat' },
    { name: 'Growth', price: '€499/Mon.', meta: '1.000 Renderings / Monat' },
  ],
  pricingCta: 'Mein WooCommerce-Snippet holen',
  faqTitle: 'WooCommerce-Anprobe FAQ',
  faqs: [
    { q: 'Brauche ich ein WordPress-Plugin?', a: 'Nein. Agalaz funktioniert ohne Plugin. Du fügst ein Script-Tag in den Theme-Header ein (oder via Snippets / Code Manager) und einen einzelnen Div oder Shortcode auf den Produktseiten. Das vermeidet Plugin-Konflikte, kaputte Plugin-Updates und Sicherheitsaudits.' },
    { q: 'Funktioniert es mit meinem Theme (Storefront / Astra / Kadence / Divi…)?', a: 'Ja. Agalaz erkennt WooCommerce-Produktbilder automatisch aus dem Standard-Galerie-Markup, das von Storefront, Astra, Kadence, OceanWP, Flatsome, Divi, Avada und den meisten modernen Themes verwendet wird. Für ungewöhnliche Themes oder Custom-Layouts kannst du die Bild-URL explizit über ein data-garment-Attribut übergeben.' },
    { q: 'Wird das meine WordPress-Seite verlangsamen?', a: 'Nein. Das Script lädt mit defer und feuert nur, wenn ein Kunde auf „Mit KI anprobieren" klickt. Die Produktseite selbst wird nicht beeinflusst und Lighthouse / Core Web Vitals bleiben gleich.' },
    { q: 'Ist es DSGVO-konform?', a: 'Ja. Kundenfotos werden in Echtzeit verarbeitet und sofort verworfen — Zero-Retention-Policy für hochgeladene Bilder. EU-Server-Routing ist auf Anfrage verfügbar für Shops mit strikten Datenresidenz-Anforderungen.' },
    { q: 'Kann ich es in Elementor oder Gutenberg verwenden?', a: 'Ja. Füge den Shortcode [agalaz_tryon] in einen Elementor-Shortcode-Widget, einen Gutenberg-Custom-HTML-Block, ein Divi-Code-Modul oder direkt in den Page-Builder-Quellcode ein. Das Widget rendert innerhalb des Blocks, in dem du es platzierst.' },
    { q: 'Was kostet es?', a: 'Du startest mit einem 7-Tage-Test (50 Renderings inklusive, keine Setup-Gebühr). Danach Starter €150/Monat für 200 Renderings oder Growth €499/Monat für 1.000 Renderings. Jederzeit über das Stripe-Kundenportal kündbar.' },
    { q: 'Kann ich einfach deinstallieren?', a: 'Ja. Entferne das Script-Tag und den Div/Shortcode und das Widget ist weg. Keine zurückbleibenden DB-Einträge, keine geplanten Tasks, keine verwaisten Plugin-Ordner.' },
  ],
  testimonialsTitle: 'Was WooCommerce-Shops sagen',
  testimonialsSubtitle: 'Zitate aus dem Early-Access-Programm. Attribution auf Wunsch anonymisiert.',
  testimonials: [
    { q: 'Ich betreibe einen Storefront-basierten WooCommerce-Shop und hatte genug von Plugins, die bei jedem WordPress-Update kaputtgehen. Dass Agalaz ein Script-Tag statt Plugin ist, war der entscheidende Faktor.', a: 'Inhaberin, Damen-Konfektion (Valencia)' },
    { q: 'Wir haben zwei Wochen lang A/B-getestet: die Produktseiten mit Try-on haben die Conversion um ~9% gegenüber Kontrolle gesteigert. Die größere Überraschung war der Rückgang der Retouren einen Monat später.', a: 'Head of E-Commerce, Bademoden-Marke (Marseille)' },
    { q: 'DSGVO war ein harter Anforderung — die meisten Try-on-Anbieter speichern Bilder. Zero Retention plus EU-Routing auf Anfrage hat unserem DSB für die Freigabe gereicht.', a: 'CTO, französisches DTC-Brillen (Lyon)' },
  ],
  finalCtaTitle: 'Bereit, die Anprobe zu deinem WooCommerce-Shop hinzuzufügen?',
  finalCtaBody: 'Starte mit 50 kostenlosen Renderings. Drei Zeilen, drei Minuten, ein Grund weniger für Kunden, ihre Bestellung zurückzuschicken.',
  finalCtaBtn: '7 Tage kostenlos testen',
};

const WOO_IT: WooContent = {
  topBarCta: 'Inizia prova gratuita',
  badge: 'Per store WooCommerce',
  heroH1Main: 'Prova Virtuale WooCommerce',
  heroH1Highlight: 'senza plugin da installare.',
  heroSubtitle:
    'Aggiungi un camerino IA su ogni scheda prodotto del tuo store WooCommerce. I clienti provano vestiti, occhiali, gioielli e accessori sul proprio corpo prima di comprare. Più conversioni, meno resi, zero manutenzione di plugin.',
  ctaPrimary: 'Inizia 7 giorni gratis',
  ctaSecondary: 'Vedi una demo live',
  heroMicrocopy: '50 render inclusi · Senza plugin · Disdici quando vuoi',
  whyTitleLead: 'Perché gli store WooCommerce scelgono',
  whyTitleBrand: 'Agalaz',
  whyCards: [
    { title: 'Meno resi moda', desc: 'Il dubbio sulla taglia è il motivo #1 dei resi di abbigliamento su WooCommerce. Vedere il capo sul proprio corpo elimina il dubbio prima del checkout.' },
    { title: 'Più conversione sulla scheda prodotto', desc: 'Il widget di prova tiene lo shopper più a lungo sulla scheda e sostituisce "non sono sicuro" con un\'anteprima concreta, alzando la conversione su ogni categoria.' },
    { title: 'Privacy by default', desc: 'Le foto dei clienti vengono elaborate in tempo reale e mai memorizzate. La tua API key è vincolata al tuo dominio, nessun altro può usare il widget altrove.' },
  ],
  featuresTitle: 'Costruito per WooCommerce, non incollato sopra.',
  features: [
    { title: 'Nessun plugin da installare', desc: 'Agalaz è uno script da incollare nel tema o in header.php. Nessun plugin WordPress da installare, aggiornare o auditare. Zero rischio di conflitti tra plugin.' },
    { title: "Rileva l'immagine prodotto automaticamente", desc: 'Riconosce il markup standard della galleria WooCommerce (woocommerce-product-gallery__image, wp-post-image) su tutti i temi principali: Storefront, Astra, Kadence, OceanWP.' },
    { title: 'Installazione in 3 righe', desc: 'Un tag <script> nell\'header del tema e uno shortcode (o un <div id="agalaz-tryon"></div>) sulla pagina prodotto. Fatto.' },
    { title: 'Funziona con Elementor / Divi / Gutenberg', desc: 'Inserisci il div o lo shortcode in qualsiasi page builder. Elementor, Divi, Bricks, Beaver Builder, blocchi Gutenberg — tutti supportati.' },
    { title: 'Render fulminei', desc: 'Circa 10 secondi per prova. Lo script carica con defer, il tuo Lighthouse e Core Web Vitals restano intatti.' },
    { title: 'Conforme GDPR', desc: 'Zero retention sulle foto dei clienti. Server UE su richiesta. Il widget non traccia i visitatori che non ci cliccano.' },
  ],
  howTitleLead: 'Installa su WooCommerce in',
  howTitleHighlight: '3 minuti',
  steps: [
    { title: 'Registrati e ottieni la tua API key', desc: 'Accedi con Google sulla pagina Partners di Agalaz e inizia la tua prova di 7 giorni. Ricevi una API key vincolata al tuo dominio dal dashboard.' },
    { title: "Aggiungi lo script nell'header del tema", desc: 'In Aspetto → Editor file del tema, apri header.php (o il suo equivalente nel tuo child theme) e aggiungi subito prima di </head>:' },
    { title: 'Aggiungi il div al template prodotto', desc: 'Piazza uno shortcode o div sulla pagina del singolo prodotto. L\'opzione più semplice è lo shortcode [agalaz_tryon] in un blocco HTML; gli avanzati possono inserire un div direttamente:', note: 'Salva. Ricarica una scheda prodotto. Il pulsante "Provalo con IA" è attivo.' },
  ],
  pricingTitle: 'Prezzi per store WooCommerce',
  pricingSubtitle: 'Un solo abbonamento. Senza fee per render. Senza licenza plugin. Disdici quando vuoi.',
  plans: [
    { name: 'Prova gratuita', price: '€0', meta: '7 giorni · 50 render' },
    { name: 'Starter', price: '€150/mese', meta: '200 render / mese' },
    { name: 'Growth', price: '€499/mese', meta: '1.000 render / mese' },
  ],
  pricingCta: 'Ottieni il mio snippet WooCommerce',
  faqTitle: 'FAQ prova WooCommerce',
  faqs: [
    { q: 'Mi serve un plugin WordPress?', a: 'No. Agalaz funziona senza plugin. Incolli un tag script nell\'header del tema (o via Snippets / Code Manager) e un singolo div o shortcode sulle pagine prodotto. Questo evita conflitti tra plugin, rotture su aggiornamenti e sovraccarico di audit di sicurezza.' },
    { q: 'Funziona con il mio tema (Storefront / Astra / Kadence / Divi…)?', a: 'Sì. Agalaz rileva automaticamente le immagini prodotto WooCommerce dal markup standard della galleria usato da Storefront, Astra, Kadence, OceanWP, Flatsome, Divi, Avada e dalla maggior parte dei temi moderni. Per temi atipici o layout custom, passa l\'URL dell\'immagine esplicitamente via attributo data-garment.' },
    { q: 'Rallenterà il mio sito WordPress?', a: 'No. Lo script carica con defer e si attiva solo quando un cliente clicca "Provalo con IA". La pagina prodotto non è influenzata e Lighthouse / Core Web Vitals restano intatti.' },
    { q: 'È conforme al GDPR?', a: 'Sì. Le foto dei clienti vengono elaborate in tempo reale e scartate subito — policy zero retention sulle immagini caricate. Routing su server UE disponibile su richiesta per store con requisiti rigorosi di residenza.' },
    { q: 'Posso usarlo in Elementor o Gutenberg?', a: 'Sì. Inserisci lo shortcode [agalaz_tryon] in qualsiasi widget Shortcode di Elementor, blocco HTML Custom di Gutenberg, modulo Code di Divi, o direttamente nel codice del page builder. Il widget si renderizza dentro al blocco in cui lo piazzi.' },
    { q: 'Quanto costa?', a: 'Inizi con prova di 7 giorni (50 render inclusi, nessun setup fee). Dopo, piano Starter €150/mese per 200 render, o Growth a €499/mese per 1.000 render. Disdici quando vuoi dal portale clienti Stripe.' },
    { q: 'Posso disinstallare facilmente?', a: 'Sì. Rimuovi il tag script e il div/shortcode e il widget è sparito. Nessuna voce residua nel database, nessun task pianificato, nessuna cartella di plugin orfana.' },
  ],
  testimonialsTitle: 'Cosa dicono gli store WooCommerce',
  testimonialsSubtitle: 'Testimonianze dal programma early-access. Attribuzione anonimizzata su richiesta.',
  testimonials: [
    { q: 'Gestisco uno store WooCommerce su Storefront ed ero stanco di plugin che si rompono ad ogni update di WordPress. Che Agalaz fosse uno script invece di un plugin è stato il fattore decisivo.', a: 'Proprietaria, prêt-à-porter donna (Valencia)' },
    { q: 'Abbiamo fatto A/B test per due settimane: le pagine prodotto con prova hanno alzato la conversione di ~9% vs controllo. La sorpresa più grande sono stati i resi calati un mese dopo.', a: 'Responsabile e-commerce, marca di costumi (Marsiglia)' },
    { q: 'Il GDPR era requisito rigido — la maggior parte dei vendor di prova memorizza le immagini. Zero retention più routing UE su richiesta è bastato per dare il via libera dal nostro DPO.', a: 'CTO, DTC francese di occhiali (Lione)' },
  ],
  finalCtaTitle: 'Pronto ad aggiungere la prova al tuo WooCommerce?',
  finalCtaBody: 'Inizia con 50 render gratis. Tre righe, tre minuti, una ragione in meno per cui i tuoi clienti restituiscono l\'ordine.',
  finalCtaBtn: 'Inizia 7 giorni gratis',
};

export const WOO_CONTENT: Record<Lang, WooContent> = {
  en: WOO_EN,
  es: WOO_ES,
  fr: WOO_FR,
  pt: WOO_PT,
  de: WOO_DE,
  it: WOO_IT,
};
