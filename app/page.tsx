'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  Layers,
  Shirt,
  ShieldCheck,
  Zap,
  Sparkles,
  Target,
  Palette,
  Store,
  Glasses,
  Gem,
  Crown,
  Footprints,
  ShoppingBag,
  Pen,
  Hand,
  Menu,
  X,
} from 'lucide-react';
import { useLang, pickLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ChatBot } from '@/components/ChatBot';
import { track } from '@/lib/analytics';

const STEP_ICONS = [Camera, Layers, Shirt];
const FEATURE_ICONS = [ShieldCheck, Target, Zap];
const CAPABILITY_ICONS = [Shirt, Glasses, Gem, Crown, Footprints, ShoppingBag, Pen, Hand];

const COLOR_SWATCHES = [
  { color: 'bg-red-500', ring: 'ring-red-500' },
  { color: 'bg-blue-900', ring: 'ring-blue-900' },
  { color: 'bg-emerald-600', ring: 'ring-emerald-600' },
  { color: 'bg-black', ring: 'ring-black' },
];

const landingText = {
  en: {
    badge: 'The #1 AI Virtual Try-On',
    strip: ['Any Garment', 'Any Color', 'Your Real Body', 'Instant Preview'],
    colorExplorer: {
      label: 'AI Virtual Fitting Room — Free Trial',
      title: 'See It On You.',
      titleHighlight: 'Before You Buy.',
      subtitle: 'Upload your photo. Choose any garment. Our AI shows you exactly how it looks on your real body — clothing, glasses, jewelry, tattoos and more. Try 2 renders free.',
      colors: ['Red', 'Navy', 'Emerald', 'Black'],
      cta: 'Try It Free Now',
    },
    capabilities: {
      label: 'What You Can Try On',
      title: 'Not Just',
      titleHighlight: 'Clothing.',
      items: [
        { title: 'Clothing', desc: 'Shirts, dresses, pants, jackets, coats, skirts, sweaters, hoodies — any garment, any style.' },
        { title: 'Glasses', desc: 'Sunglasses, prescription frames, goggles — see how they look on your face before buying.' },
        { title: 'Jewelry', desc: 'Necklaces, earrings, bracelets, rings, watches — placed on the correct body part automatically.' },
        { title: 'Headwear', desc: 'Hats, caps, beanies, headbands — see how they fit with your face and hair.' },
        { title: 'Shoes', desc: 'Sneakers, heels, boots, sandals — see them on your feet with realistic shadows.' },
        { title: 'Bags', desc: 'Handbags, backpacks, clutches, totes — held or worn naturally on your body.' },
        { title: 'Tattoos', desc: 'Try any tattoo design on your skin — follows your body contours and muscle definition.' },
        { title: 'Nail Art', desc: 'Manicure styles, nail polish colors — preview any nail design on your actual hands.' },
      ],
    },
    tryBefore: {
      label: 'How It Works',
      title: '1 Photo.',
      titleHighlight: '1 Render.',
      subtitle: 'Upload a photo of yourself — selfie, half body or full body. Add a garment optionally. Our AI does the rest.',
      steps: [
        { num: '01', title: 'Your Photo', desc: 'Upload any photo of yourself — selfie, half body, or full body. One photo is all you need.' },
        { num: '02', title: 'Your Garment, Accessory or Tattoo', desc: 'Optionally upload a photo of the garment, accessory or tattoo you want to try on.' },
        { num: '03', title: 'AI Render', desc: 'Our AI generates a photorealistic image of you wearing the garment in under 60 seconds.' },
      ],
    },
    features: {
      label: 'Technology',
      title: 'Surgical',
      titleHighlight: 'Precision',
      subtitle: 'AI virtual try-on for clothes, glasses, jewelry, shoes and more — your face, body and background stay untouched.',
      items: [
        { title: 'Total Preservation', desc: 'Your pants, shoes and original background stay untouched. We only change what you ask.' },
        { title: 'Real Face Mapping', desc: 'Agalaz integrates your identity onto your real body, respecting your features and neckline.' },
        { title: 'Color & Style', desc: 'We extract the DNA of the new garment and adapt it to your silhouette without distortion.' },
      ],
    },
    stats: { users: 'Users', perRender: 'Per Render', precision: 'Precision' },
    partners: {
      label: 'For Online Stores',
      title: 'Reduce Returns.',
      titleHighlight: 'Boost Sales.',
      subtitle: 'Add AI virtual try-on to your store. Your customers try before they buy — fewer returns, higher conversion.',
      cta: 'Become a Partner',
      setup: 'Setup fee',
      month: '/mo',
      renders: 'renders/mo',
      extraRender: '/extra render',
      popular: 'Most Popular',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Mid-size Store', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Large Retailer', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'Real ROI by store size',
      savingsLabel: 'Saved in returns',
      extraSalesLabel: 'Extra revenue',
      totalLabel: 'Total monthly value',
      roiLabel: 'ROI',
      docs: 'See installation guide',
    },
    cta: { title: 'Try It Now.', subtitle: 'Upload your photos and see the result in seconds.', button: 'Start Now' },
    footer: { privacy: 'Privacy', terms: 'Terms', contact: 'Contact', copyright: '© 2025 Agalaz — AI Virtual Try-On for Clothes, Glasses & Accessories' },
  },
  es: {
    badge: 'El Mejor Probador Virtual con IA',
    strip: ['Cualquier Prenda', 'Cualquier Color', 'Tu Cuerpo Real', 'Vista Previa Instantánea'],
    colorExplorer: {
      label: 'Probador Virtual con IA — Prueba Gratis',
      title: 'Míratelo Puesto.',
      titleHighlight: 'Antes de Comprar.',
      subtitle: 'Sube tu foto. Elige cualquier prenda. Nuestra IA te muestra exactamente cómo te queda en tu cuerpo real — ropa, gafas, joyería, tatuajes y más. Prueba 2 renders gratis.',
      colors: ['Rojo', 'Marino', 'Esmeralda', 'Negro'],
      cta: 'Probar Gratis Ahora',
    },
    capabilities: {
      label: 'Qué Puedes Probar',
      title: 'No Solo',
      titleHighlight: 'Ropa.',
      items: [
        { title: 'Ropa', desc: 'Camisetas, vestidos, pantalones, chaquetas, abrigos, faldas, sudaderas — cualquier prenda, cualquier estilo.' },
        { title: 'Gafas', desc: 'Gafas de sol, monturas graduadas, gafas deportivas — ve cómo quedan en tu cara antes de comprar.' },
        { title: 'Joyería', desc: 'Collares, pendientes, pulseras, anillos, relojes — colocados automáticamente en la parte correcta del cuerpo.' },
        { title: 'Sombreros', desc: 'Gorras, gorros, diademas, turbantes — ve cómo combinan con tu cara y pelo.' },
        { title: 'Zapatos', desc: 'Zapatillas, tacones, botas, sandalias — pruébalos con sombras realistas.' },
        { title: 'Bolsos', desc: 'Bolsos de mano, mochilas, clutches, totes — llevados de forma natural en tu cuerpo.' },
        { title: 'Tatuajes', desc: 'Prueba cualquier diseño de tatuaje en tu piel — sigue los contornos de tu cuerpo.' },
        { title: 'Uñas', desc: 'Estilos de manicura, colores de esmalte — previsualiza cualquier diseño en tus manos.' },
      ],
    },
    tryBefore: {
      label: 'Cómo Funciona',
      title: '1 Foto.',
      titleHighlight: '1 Render.',
      subtitle: 'Sube una foto tuya — selfie, medio cuerpo o cuerpo entero. Añade una prenda opcionalmente. Nuestra IA hace el resto.',
      steps: [
        { num: '01', title: 'Tu Foto', desc: 'Sube cualquier foto tuya — selfie, medio cuerpo o cuerpo entero. Una foto es todo lo que necesitas.' },
        { num: '02', title: 'Tu Prenda, Accesorio o Tatuaje', desc: 'Opcionalmente sube una foto de la prenda, accesorio o tatuaje que quieras probarte.' },
        { num: '03', title: 'Render IA', desc: 'Nuestra IA genera una imagen fotorrealista de ti con la prenda en menos de 60 segundos.' },
      ],
    },
    features: {
      label: 'Tecnología',
      title: 'Precisión',
      titleHighlight: 'Quirúrgica',
      subtitle: 'Probador virtual con IA para ropa, gafas, joyería, zapatos y más — tu cara, cuerpo y fondo se mantienen intactos.',
      items: [
        { title: 'Preservación Total', desc: 'Tus pantalones, calzado y fondo original se mantienen intactos. Solo cambiamos lo que pidas.' },
        { title: 'Mapeo Facial Real', desc: 'Agalaz integra tu identidad sobre tu cuerpo real, respetando tu fisonomía y cuello.' },
        { title: 'Color & Estilo', desc: 'Extraemos el ADN de la prenda nueva y lo adaptamos a tu silueta sin deformaciones.' },
      ],
    },
    stats: { users: 'Usuarios', perRender: 'Por Render', precision: 'Precisión' },
    partners: {
      label: 'Para Tiendas Online',
      title: 'Menos Devoluciones.',
      titleHighlight: 'Más Ventas.',
      subtitle: 'Añade prueba virtual con IA a tu tienda. Tus clientes se prueban la ropa antes de comprar — menos devoluciones, más conversión.',
      cta: 'Hazte Partner',
      setup: 'Alta',
      month: '/mes',
      renders: 'renders/mes',
      extraRender: '/render extra',
      popular: 'Más Popular',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Tienda Mediana', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Gran Retailer', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'ROI real según tamaño de tienda',
      savingsLabel: 'Ahorro en devoluciones',
      extraSalesLabel: 'Ventas extra',
      totalLabel: 'Valor mensual total',
      roiLabel: 'ROI',
      docs: 'Ver guía de instalación',
    },
    cta: { title: 'Pruébalo Ahora.', subtitle: 'Sube tus fotos y ve el resultado en segundos.', button: 'Empezar Ahora' },
    footer: { privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto', copyright: '© 2025 Agalaz — Probador Virtual con IA para Ropa, Gafas y Accesorios' },
  },
  fr: {
    badge: 'Le N°1 des Essayages Virtuels IA',
    strip: ['N\'importe quel Vêtement', 'N\'importe quelle Couleur', 'Votre Corps Réel', 'Aperçu Instantané'],
    colorExplorer: {
      label: 'Cabine d\'Essayage Virtuelle IA — Essai Gratuit',
      title: 'Voyez-le sur Vous.',
      titleHighlight: 'Avant d\'Acheter.',
      subtitle: 'Téléchargez votre photo. Choisissez n\'importe quel vêtement. Notre IA vous montre exactement comment il vous va sur votre corps réel — vêtements, lunettes, bijoux, tatouages et plus. 2 essais gratuits.',
      colors: ['Rouge', 'Marine', 'Émeraude', 'Noir'],
      cta: 'Essayer Gratuitement',
    },
    capabilities: {
      label: 'Ce Que Vous Pouvez Essayer',
      title: 'Pas Seulement',
      titleHighlight: 'des Vêtements.',
      items: [
        { title: 'Vêtements', desc: 'Chemises, robes, pantalons, vestes, manteaux, jupes, pulls, sweats — n\'importe quel vêtement, n\'importe quel style.' },
        { title: 'Lunettes', desc: 'Solaires, montures de vue, lunettes sport — voyez comment elles vous vont avant d\'acheter.' },
        { title: 'Bijoux', desc: 'Colliers, boucles d\'oreilles, bracelets, bagues, montres — placés automatiquement sur la bonne partie du corps.' },
        { title: 'Chapeaux', desc: 'Chapeaux, casquettes, bonnets, bandeaux — voyez comment ils s\'accordent à votre visage et vos cheveux.' },
        { title: 'Chaussures', desc: 'Baskets, talons, bottes, sandales — voyez-les à vos pieds avec des ombres réalistes.' },
        { title: 'Sacs', desc: 'Sacs à main, sacs à dos, pochettes, totes — portés naturellement sur votre corps.' },
        { title: 'Tatouages', desc: 'Essayez n\'importe quel tatouage sur votre peau — suit les contours et la définition musculaire.' },
        { title: 'Manucure', desc: 'Styles de manucure, couleurs de vernis — prévisualisez n\'importe quel design sur vos vraies mains.' },
      ],
    },
    tryBefore: {
      label: 'Comment Ça Marche',
      title: '1 Photo.',
      titleHighlight: '1 Rendu.',
      subtitle: 'Téléchargez une photo de vous — selfie, demi-corps ou plein corps. Ajoutez un vêtement en option. Notre IA fait le reste.',
      steps: [
        { num: '01', title: 'Votre Photo', desc: 'Téléchargez n\'importe quelle photo de vous — selfie, demi-corps ou plein corps. Une seule photo suffit.' },
        { num: '02', title: 'Votre Vêtement, Accessoire ou Tatouage', desc: 'Téléchargez en option une photo du vêtement, accessoire ou tatouage à essayer.' },
        { num: '03', title: 'Rendu IA', desc: 'Notre IA génère une image photoréaliste de vous portant le vêtement en moins de 60 secondes.' },
      ],
    },
    features: {
      label: 'Technologie',
      title: 'Précision',
      titleHighlight: 'Chirurgicale',
      subtitle: 'Essayage virtuel IA pour vêtements, lunettes, bijoux, chaussures et plus — votre visage, corps et arrière-plan restent intacts.',
      items: [
        { title: 'Préservation Totale', desc: 'Votre pantalon, vos chaussures et votre arrière-plan d\'origine restent intacts. Nous ne changeons que ce que vous demandez.' },
        { title: 'Mappage Facial Réel', desc: 'Agalaz intègre votre identité sur votre corps réel, en respectant vos traits et votre encolure.' },
        { title: 'Couleur & Style', desc: 'Nous extrayons l\'ADN du nouveau vêtement et l\'adaptons à votre silhouette sans déformation.' },
      ],
    },
    stats: { users: 'Utilisateurs', perRender: 'Par Rendu', precision: 'Précision' },
    partners: {
      label: 'Pour Boutiques en Ligne',
      title: 'Moins de Retours.',
      titleHighlight: 'Plus de Ventes.',
      subtitle: 'Ajoutez l\'essayage virtuel IA à votre boutique. Vos clients essaient avant d\'acheter — moins de retours, plus de conversion.',
      cta: 'Devenir Partenaire',
      setup: 'Frais de mise',
      month: '/mois',
      renders: 'rendus/mois',
      extraRender: '/rendu extra',
      popular: 'Le Plus Populaire',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Boutique Moyenne', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Grand Distributeur', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'ROI réel par taille de boutique',
      savingsLabel: 'Économisé sur retours',
      extraSalesLabel: 'Revenus supplémentaires',
      totalLabel: 'Valeur mensuelle totale',
      roiLabel: 'ROI',
      docs: 'Voir guide d\'installation',
    },
    cta: { title: 'Essayez Maintenant.', subtitle: 'Téléchargez vos photos et voyez le résultat en quelques secondes.', button: 'Commencer' },
    footer: { privacy: 'Confidentialité', terms: 'Conditions', contact: 'Contact', copyright: '© 2025 Agalaz — Essayage Virtuel IA pour Vêtements, Lunettes et Accessoires' },
  },
  pt: {
    badge: 'O Provador Virtual com IA Nº 1',
    strip: ['Qualquer Peça', 'Qualquer Cor', 'O Teu Corpo Real', 'Visualização Instantânea'],
    colorExplorer: {
      label: 'Provador Virtual com IA — Teste Grátis',
      title: 'Vê-o em Ti.',
      titleHighlight: 'Antes de Comprar.',
      subtitle: 'Carrega a tua foto. Escolhe qualquer peça. A nossa IA mostra-te exatamente como te fica no teu corpo real — roupa, óculos, joias, tatuagens e mais. 2 renders grátis.',
      colors: ['Vermelho', 'Marinho', 'Esmeralda', 'Preto'],
      cta: 'Experimentar Grátis',
    },
    capabilities: {
      label: 'O Que Podes Experimentar',
      title: 'Não Só',
      titleHighlight: 'Roupa.',
      items: [
        { title: 'Roupa', desc: 'Camisas, vestidos, calças, casacos, sobretudos, saias, camisolas — qualquer peça, qualquer estilo.' },
        { title: 'Óculos', desc: 'Óculos de sol, armações graduadas, óculos desportivos — vê como te ficam antes de comprar.' },
        { title: 'Joias', desc: 'Colares, brincos, pulseiras, anéis, relógios — colocados automaticamente na parte certa do corpo.' },
        { title: 'Chapéus', desc: 'Bonés, chapéus, gorros, bandanas — vê como combinam com o teu rosto e cabelo.' },
        { title: 'Sapatos', desc: 'Ténis, saltos, botas, sandálias — vê-os nos teus pés com sombras realistas.' },
        { title: 'Malas', desc: 'Malas de mão, mochilas, clutches, totes — usadas de forma natural no teu corpo.' },
        { title: 'Tatuagens', desc: 'Experimenta qualquer tatuagem na tua pele — segue os contornos do corpo e a definição muscular.' },
        { title: 'Unhas', desc: 'Estilos de manicure, cores de verniz — pré-visualiza qualquer design nas tuas mãos reais.' },
      ],
    },
    tryBefore: {
      label: 'Como Funciona',
      title: '1 Foto.',
      titleHighlight: '1 Render.',
      subtitle: 'Carrega uma foto tua — selfie, meio corpo ou corpo inteiro. Adiciona uma peça opcionalmente. A nossa IA faz o resto.',
      steps: [
        { num: '01', title: 'A Tua Foto', desc: 'Carrega qualquer foto tua — selfie, meio corpo ou corpo inteiro. Uma foto é tudo o que precisas.' },
        { num: '02', title: 'A Tua Peça, Acessório ou Tatuagem', desc: 'Opcionalmente carrega uma foto da peça, acessório ou tatuagem que queres experimentar.' },
        { num: '03', title: 'Render IA', desc: 'A nossa IA gera uma imagem fotorrealista de ti com a peça em menos de 60 segundos.' },
      ],
    },
    features: {
      label: 'Tecnologia',
      title: 'Precisão',
      titleHighlight: 'Cirúrgica',
      subtitle: 'Provador virtual com IA para roupa, óculos, joias, sapatos e mais — o teu rosto, corpo e fundo permanecem intactos.',
      items: [
        { title: 'Preservação Total', desc: 'As tuas calças, calçado e fundo original permanecem intactos. Só mudamos o que pedires.' },
        { title: 'Mapeamento Facial Real', desc: 'Agalaz integra a tua identidade no teu corpo real, respeitando os teus traços e decote.' },
        { title: 'Cor & Estilo', desc: 'Extraímos o ADN da peça nova e adaptamo-lo à tua silhueta sem deformações.' },
      ],
    },
    stats: { users: 'Utilizadores', perRender: 'Por Render', precision: 'Precisão' },
    partners: {
      label: 'Para Lojas Online',
      title: 'Menos Devoluções.',
      titleHighlight: 'Mais Vendas.',
      subtitle: 'Adiciona prova virtual com IA à tua loja. Os teus clientes provam antes de comprar — menos devoluções, mais conversão.',
      cta: 'Torna-te Parceiro',
      setup: 'Setup',
      month: '/mês',
      renders: 'renders/mês',
      extraRender: '/render extra',
      popular: 'Mais Popular',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Loja Média', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Grande Retalhista', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'ROI real por tamanho de loja',
      savingsLabel: 'Poupado em devoluções',
      extraSalesLabel: 'Vendas extra',
      totalLabel: 'Valor mensal total',
      roiLabel: 'ROI',
      docs: 'Ver guia de instalação',
    },
    cta: { title: 'Experimenta Agora.', subtitle: 'Carrega as tuas fotos e vê o resultado em segundos.', button: 'Começar Agora' },
    footer: { privacy: 'Privacidade', terms: 'Termos', contact: 'Contacto', copyright: '© 2025 Agalaz — Provador Virtual com IA para Roupa, Óculos e Acessórios' },
  },
  de: {
    badge: 'Die Nr. 1 KI-Anprobe',
    strip: ['Jedes Kleidungsstück', 'Jede Farbe', 'Dein echter Körper', 'Sofortige Vorschau'],
    colorExplorer: {
      label: 'KI-Anprobekabine — Kostenloser Test',
      title: 'Sieh es an dir.',
      titleHighlight: 'Vor dem Kauf.',
      subtitle: 'Lade dein Foto hoch. Wähle ein beliebiges Kleidungsstück. Unsere KI zeigt dir genau, wie es an deinem echten Körper aussieht — Kleidung, Brillen, Schmuck, Tattoos und mehr. 2 Renderings gratis.',
      colors: ['Rot', 'Marine', 'Smaragd', 'Schwarz'],
      cta: 'Jetzt kostenlos probieren',
    },
    capabilities: {
      label: 'Was du anprobieren kannst',
      title: 'Nicht nur',
      titleHighlight: 'Kleidung.',
      items: [
        { title: 'Kleidung', desc: 'Hemden, Kleider, Hosen, Jacken, Mäntel, Röcke, Pullover, Hoodies — jedes Teil, jeder Stil.' },
        { title: 'Brillen', desc: 'Sonnenbrillen, Sehbrillen, Sportbrillen — sieh, wie sie an deinem Gesicht aussehen, bevor du kaufst.' },
        { title: 'Schmuck', desc: 'Halsketten, Ohrringe, Armbänder, Ringe, Uhren — automatisch an der richtigen Körperstelle platziert.' },
        { title: 'Kopfbedeckungen', desc: 'Hüte, Caps, Mützen, Stirnbänder — sieh, wie sie zu deinem Gesicht und Haar passen.' },
        { title: 'Schuhe', desc: 'Sneakers, Heels, Stiefel, Sandalen — sieh sie an deinen Füßen mit realistischen Schatten.' },
        { title: 'Taschen', desc: 'Handtaschen, Rucksäcke, Clutches, Totes — natürlich an deinem Körper getragen.' },
        { title: 'Tattoos', desc: 'Probiere jedes Tattoo-Design auf deiner Haut — folgt deinen Körperkonturen und Muskeldefinition.' },
        { title: 'Nageldesign', desc: 'Maniküre-Stile, Nagellackfarben — sieh dir jedes Design an deinen echten Händen an.' },
      ],
    },
    tryBefore: {
      label: 'So funktioniert\'s',
      title: '1 Foto.',
      titleHighlight: '1 Rendering.',
      subtitle: 'Lade ein Foto von dir hoch — Selfie, Halbkörper oder Ganzkörper. Optional ein Kleidungsstück. Unsere KI macht den Rest.',
      steps: [
        { num: '01', title: 'Dein Foto', desc: 'Lade ein beliebiges Foto von dir hoch — Selfie, Halbkörper oder Ganzkörper. Ein Foto reicht.' },
        { num: '02', title: 'Dein Kleidungsstück, Accessoire oder Tattoo', desc: 'Lade optional ein Foto des Kleidungsstücks, Accessoires oder Tattoos hoch, das du anprobieren willst.' },
        { num: '03', title: 'KI-Rendering', desc: 'Unsere KI erstellt in unter 60 Sekunden ein fotorealistisches Bild von dir mit dem Kleidungsstück.' },
      ],
    },
    features: {
      label: 'Technologie',
      title: 'Chirurgische',
      titleHighlight: 'Präzision',
      subtitle: 'KI-Anprobe für Kleidung, Brillen, Schmuck, Schuhe und mehr — dein Gesicht, Körper und Hintergrund bleiben unberührt.',
      items: [
        { title: 'Vollständige Erhaltung', desc: 'Deine Hose, Schuhe und der ursprüngliche Hintergrund bleiben unberührt. Wir ändern nur, was du verlangst.' },
        { title: 'Echte Gesichtsabbildung', desc: 'Agalaz integriert deine Identität auf deinem echten Körper und respektiert deine Züge und Halslinie.' },
        { title: 'Farbe & Stil', desc: 'Wir extrahieren die DNA des neuen Kleidungsstücks und passen es ohne Verzerrung an deine Silhouette an.' },
      ],
    },
    stats: { users: 'Nutzer', perRender: 'Pro Rendering', precision: 'Präzision' },
    partners: {
      label: 'Für Online-Shops',
      title: 'Weniger Retouren.',
      titleHighlight: 'Mehr Verkäufe.',
      subtitle: 'Füge KI-Anprobe zu deinem Shop hinzu. Deine Kunden probieren vor dem Kauf — weniger Retouren, höhere Konversion.',
      cta: 'Partner werden',
      setup: 'Einrichtung',
      month: '/Monat',
      renders: 'Renderings/Monat',
      extraRender: '/Extra-Rendering',
      popular: 'Am beliebtesten',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Mittelgroßer Shop', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Großhändler', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'Echter ROI nach Shop-Größe',
      savingsLabel: 'Eingespart bei Retouren',
      extraSalesLabel: 'Zusätzlicher Umsatz',
      totalLabel: 'Gesamter monatlicher Wert',
      roiLabel: 'ROI',
      docs: 'Installationsanleitung ansehen',
    },
    cta: { title: 'Jetzt ausprobieren.', subtitle: 'Lade deine Fotos hoch und sieh das Ergebnis in Sekunden.', button: 'Jetzt starten' },
    footer: { privacy: 'Datenschutz', terms: 'AGB', contact: 'Kontakt', copyright: '© 2025 Agalaz — KI-Anprobe für Kleidung, Brillen und Accessoires' },
  },
  it: {
    badge: 'La Prova Virtuale IA #1',
    strip: ['Qualsiasi Capo', 'Qualsiasi Colore', 'Il Tuo Corpo Reale', 'Anteprima Istantanea'],
    colorExplorer: {
      label: 'Camerino Virtuale IA — Prova Gratuita',
      title: 'Vedilo Addosso.',
      titleHighlight: 'Prima di Comprare.',
      subtitle: 'Carica la tua foto. Scegli qualsiasi capo. La nostra IA ti mostra esattamente come ti sta sul corpo reale — abbigliamento, occhiali, gioielli, tatuaggi e altro. 2 render gratis.',
      colors: ['Rosso', 'Blu Marino', 'Smeraldo', 'Nero'],
      cta: 'Prova Gratis Ora',
    },
    capabilities: {
      label: 'Cosa Puoi Provare',
      title: 'Non Solo',
      titleHighlight: 'Vestiti.',
      items: [
        { title: 'Vestiti', desc: 'Camicie, vestiti, pantaloni, giacche, cappotti, gonne, maglioni, felpe — qualsiasi capo, qualsiasi stile.' },
        { title: 'Occhiali', desc: 'Da sole, da vista, sportivi — vedi come ti stanno prima di comprare.' },
        { title: 'Gioielli', desc: 'Collane, orecchini, bracciali, anelli, orologi — posizionati automaticamente sulla parte giusta del corpo.' },
        { title: 'Cappelli', desc: 'Cappelli, berretti, fasce, bandane — vedi come si abbinano al tuo viso e ai capelli.' },
        { title: 'Scarpe', desc: 'Sneakers, tacchi, stivali, sandali — vedili ai tuoi piedi con ombre realistiche.' },
        { title: 'Borse', desc: 'Borse a mano, zaini, pochette, tote — portate naturalmente sul tuo corpo.' },
        { title: 'Tatuaggi', desc: 'Prova qualsiasi tatuaggio sulla tua pelle — segue i contorni del corpo e la definizione muscolare.' },
        { title: 'Unghie', desc: 'Stili di manicure, colori di smalto — visualizza qualsiasi design sulle tue mani reali.' },
      ],
    },
    tryBefore: {
      label: 'Come Funziona',
      title: '1 Foto.',
      titleHighlight: '1 Render.',
      subtitle: 'Carica una foto di te — selfie, mezzo busto o corpo intero. Aggiungi un capo opzionalmente. La nostra IA fa il resto.',
      steps: [
        { num: '01', title: 'La Tua Foto', desc: 'Carica una foto qualsiasi di te — selfie, mezzo busto o corpo intero. Una foto è tutto ciò che serve.' },
        { num: '02', title: 'Il Tuo Capo, Accessorio o Tatuaggio', desc: 'Opzionalmente carica una foto del capo, accessorio o tatuaggio che vuoi provare.' },
        { num: '03', title: 'Render IA', desc: 'La nostra IA genera un\'immagine fotorealistica di te con il capo in meno di 60 secondi.' },
      ],
    },
    features: {
      label: 'Tecnologia',
      title: 'Precisione',
      titleHighlight: 'Chirurgica',
      subtitle: 'Prova virtuale IA per vestiti, occhiali, gioielli, scarpe e altro — il tuo viso, corpo e sfondo restano intatti.',
      items: [
        { title: 'Preservazione Totale', desc: 'I tuoi pantaloni, scarpe e sfondo originale rimangono intatti. Cambiamo solo ciò che chiedi.' },
        { title: 'Mappatura Facciale Reale', desc: 'Agalaz integra la tua identità sul tuo corpo reale, rispettando i tuoi tratti e la scollatura.' },
        { title: 'Colore & Stile', desc: 'Estraiamo il DNA del nuovo capo e lo adattiamo alla tua silhouette senza deformazioni.' },
      ],
    },
    stats: { users: 'Utenti', perRender: 'Per Render', precision: 'Precisione' },
    partners: {
      label: 'Per Negozi Online',
      title: 'Meno Resi.',
      titleHighlight: 'Più Vendite.',
      subtitle: 'Aggiungi la prova virtuale IA al tuo negozio. I tuoi clienti provano prima di comprare — meno resi, più conversione.',
      cta: 'Diventa Partner',
      setup: 'Setup',
      month: '/mese',
      renders: 'render/mese',
      extraRender: '/render extra',
      popular: 'Il Più Popolare',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Negozio Medio', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Grande Retailer', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'ROI reale per dimensione negozio',
      savingsLabel: 'Risparmiato su resi',
      extraSalesLabel: 'Vendite extra',
      totalLabel: 'Valore mensile totale',
      roiLabel: 'ROI',
      docs: 'Vedi guida d\'installazione',
    },
    cta: { title: 'Provalo Ora.', subtitle: 'Carica le tue foto e vedi il risultato in pochi secondi.', button: 'Inizia Ora' },
    footer: { privacy: 'Privacy', terms: 'Termini', contact: 'Contatto', copyright: '© 2025 Agalaz — Prova Virtuale IA per Vestiti, Occhiali e Accessori' },
  },
} as const;

const HERO_CATEGORIES = {
  en: ['Clothing', 'Glasses', 'Jewelry', 'Headwear', 'Shoes', 'Bags'],
  es: ['Ropa', 'Gafas', 'Joyería', 'Sombreros', 'Zapatos', 'Bolsos'],
  fr: ['Vêtements', 'Lunettes', 'Bijoux', 'Chapeaux', 'Chaussures', 'Sacs'],
  pt: ['Roupa', 'Óculos', 'Joias', 'Chapéus', 'Sapatos', 'Malas'],
  de: ['Kleidung', 'Brillen', 'Schmuck', 'Hüte', 'Schuhe', 'Taschen'],
  it: ['Vestiti', 'Occhiali', 'Gioielli', 'Cappelli', 'Scarpe', 'Borse'],
};

export default function HomePage() {
  const { lang, t } = useLang();
  // landingText has all 6 locales (en/es/fr/pt/de/it). Falls back to en only if
  // an unknown lang code is passed (defensive).
  const lt = landingText[lang as keyof typeof landingText] || landingText.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroWordIdx, setHeroWordIdx] = useState(0);

  useEffect(() => {
    track('landing_view');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroWordIdx((prev) => (prev + 1) % HERO_CATEGORIES.en.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        {/* Top bar for ecommerce — visible on all devices */}
        <div className="bg-indigo-600 text-center py-2">
          <Link href="/partners" className="text-[11px] md:text-xs text-white font-bold hover:text-white/90 transition-colors">
            <Store size={12} className="inline mr-1.5 -mt-0.5" />
            {pickLang(
              lang,
              'Have an ecommerce? Become a Partner → Free trial',
              '¿Tienes un ecommerce? Hazte Partner → Prueba gratis',
              'Vous avez un e-commerce ? Devenez Partenaire → Essai gratuit',
              'Tem um e-commerce? Torne-se Parceiro → Teste grátis',
              'Sie haben einen Onlineshop? Werden Sie Partner → Kostenlos testen',
              'Hai un e-commerce? Diventa Partner → Prova gratuita',
            )}
            <ArrowRight size={12} className="inline ml-1 -mt-0.5" />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            AGALAZ
          </Link>
          <div className="flex items-center gap-5">
            {/* Desktop links */}
            <Link
              href="/partners"
              className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.12em] rounded-full hover:bg-indigo-100 transition-colors hidden md:block"
            >
              {pickLang(lang, 'Become a Partner', 'Hazte Partner', 'Devenir Partenaire', 'Torne-se Parceiro', 'Partner werden', 'Diventa Partner')}
            </Link>
            <LanguageToggle />
            <Link
              href="/try-on"
              className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-slate-800 transition-colors"
            >
              {t.tryNow}
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {menuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-1 animate-fade-in">
            <Link
              href="/partners"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Partners</span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {pickLang(
                  lang,
                  'For online stores — reduce returns, boost sales',
                  'Para tiendas online — reduce devoluciones, aumenta ventas',
                  'Pour les boutiques en ligne — réduisez les retours, augmentez les ventes',
                  'Para lojas online — reduza devoluções, aumente vendas',
                  'Für Onlineshops — weniger Retouren, mehr Umsatz',
                  'Per negozi online — meno resi, più vendite',
                )}
              </p>
            </Link>
            <Link
              href="/partners#faq"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">FAQ</span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {pickLang(
                  lang,
                  'Frequently asked questions',
                  'Preguntas frecuentes',
                  'Questions fréquentes',
                  'Perguntas frequentes',
                  'Häufig gestellte Fragen',
                  'Domande frequenti',
                )}
              </p>
            </Link>
            <Link
              href="/partners#contact"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">
                {pickLang(lang, 'Contact', 'Contacto', 'Contact', 'Contacto', 'Kontakt', 'Contatto')}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">infoagalaz@gmail.com</p>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative max-w-7xl mx-auto px-5 md:px-12 pt-12 pb-10 md:pt-32 md:pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 md:mb-8 animate-fade-in">
              {lt.badge}
            </span>

            <h1 className="font-serif text-[2.5rem] leading-[0.95] sm:text-5xl sm:leading-[0.9] md:text-7xl lg:text-8xl text-slate-900 tracking-tight animate-fade-in">
              <span className="font-black">{pickLang(lang, 'TRY', 'PRUEBA', 'ESSAYEZ', 'EXPERIMENTE', 'PROBIEREN', 'PROVA')}</span>
              {' '}
              <span key={heroWordIdx} className="italic font-normal text-indigo-500 inline-block transition-all duration-500 animate-fade-in">
                {(HERO_CATEGORIES[lang as keyof typeof HERO_CATEGORIES] || HERO_CATEGORIES.en)[heroWordIdx]}
              </span>
              <br />
              <span className="font-black">{pickLang(lang, 'BEFORE YOU BUY.', 'ANTES DE COMPRAR.', 'AVANT D’ACHETER.', 'ANTES DE COMPRAR.', 'BEVOR SIE KAUFEN.', 'PRIMA DI COMPRARE.')}</span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-delay">
              {pickLang(
                lang,
                'Upload your photo and try on any garment, glasses, jewelry or accessory with AI. See how it looks on your real body before you buy.',
                'Sube tu foto y pruébate cualquier prenda, gafa, joya o accesorio con IA. Ve cómo te queda en tu cuerpo real antes de comprar.',
                'Téléversez votre photo et essayez n’importe quel vêtement, lunettes, bijou ou accessoire avec l’IA. Voyez le rendu sur votre corps réel avant d’acheter.',
                'Carregue a sua foto e experimente qualquer peça de roupa, óculos, joia ou acessório com IA. Veja como fica no seu corpo real antes de comprar.',
                'Laden Sie Ihr Foto hoch und probieren Sie mit KI jedes Kleidungsstück, jede Brille, jeden Schmuck oder jedes Accessoire an. Sehen Sie, wie es an Ihrem echten Körper aussieht, bevor Sie kaufen.',
                'Carica la tua foto e prova qualsiasi capo, occhiali, gioiello o accessorio con l’IA. Vedi come ti sta sul tuo corpo reale prima di comprare.',
              )}
            </p>

            <div className="mt-10 animate-fade-in-delay">
              <Link
                href="/try-on"
                data-fast-goal="hero_cta_click"
                className="group inline-flex items-center gap-3 px-6 md:px-10 py-4 min-h-[56px] bg-slate-900 text-white font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm hover:bg-indigo-600 active:bg-indigo-700 transition-all"
              >
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                {t.tryNow}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Strip */}
        <div className="relative border-y border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
            {lt.strip.map((item, i) => (
              <div
                key={i}
                className={`py-4 px-6 text-center ${i < 3 ? 'border-r border-slate-200' : ''} ${i < 2 ? 'border-b md:border-b-0 border-slate-200' : i === 2 ? 'border-b md:border-b-0 border-slate-200' : ''}`}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Explorer */}
      <section className="py-24 md:py-32 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
              {lt.colorExplorer.label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[1.05] md:leading-[0.9]">
              {lt.colorExplorer.title}{' '}
              <span className="italic text-slate-400">{lt.colorExplorer.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              {lt.colorExplorer.subtitle}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Before → Garment → After real transformation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              {/* Before */}
              <div className="group text-center">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-slate-200 relative shadow-sm group-hover:shadow-lg transition-all bg-slate-100">
                  <img src="/images/before.png" alt={pickLang(lang, 'Original photo', 'Foto original', 'Photo originale', 'Foto original', 'Originalfoto', 'Foto originale')} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {pickLang(lang, 'Your photo', 'Tu foto', 'Votre photo', 'A sua foto', 'Ihr Foto', 'La tua foto')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow + Garment */}
              <div className="flex flex-col items-center gap-4">
                <div className="hidden md:flex items-center gap-3 text-slate-300">
                  <div className="w-12 h-[2px] bg-slate-200" />
                  <Sparkles size={20} className="text-indigo-500 animate-pulse" />
                  <div className="w-12 h-[2px] bg-slate-200" />
                </div>
                <div className="aspect-square w-40 md:w-48 rounded-2xl overflow-hidden border-2 border-indigo-200 bg-white shadow-md relative">
                  <img src="/images/garment.jpg" alt={pickLang(lang, 'Garment', 'Prenda', 'Vêtement', 'Peça de roupa', 'Kleidungsstück', 'Capo')} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600/90 backdrop-blur-sm rounded-full">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white">
                      {pickLang(lang, 'Garment', 'Prenda', 'Vêtement', 'Peça de roupa', 'Kleidungsstück', 'Capo')}
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-3 text-slate-300">
                  <div className="w-12 h-[2px] bg-slate-200" />
                  <ArrowRight size={20} className="text-indigo-500" />
                  <div className="w-12 h-[2px] bg-slate-200" />
                </div>
                <div className="md:hidden flex items-center gap-3 text-slate-300 my-2">
                  <ArrowRight size={20} className="text-indigo-500 rotate-90" />
                </div>
              </div>

              {/* After */}
              <div className="group text-center">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-indigo-300 relative shadow-lg group-hover:shadow-xl transition-all ring-4 ring-indigo-100 bg-indigo-50">
                  <img src="/images/after.png" alt="AI try-on result" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-600/90 backdrop-blur-sm rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">
                      AI Result
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-14">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-3 px-6 md:px-10 py-4 min-h-[56px] bg-indigo-600 text-white font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
            >
              <Palette size={16} className="group-hover:rotate-12 transition-transform" />
              {lt.colorExplorer.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">
              {lt.capabilities.label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[1.05] md:leading-[0.9]">
              {lt.capabilities.title}{' '}
              <span className="italic text-slate-400">{lt.capabilities.titleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {lt.capabilities.items.map((item, i) => {
              const Icon = CAPABILITY_ICONS[i] || Sparkles;
              return (
                <div key={i} className="group p-5 md:p-6 border border-slate-200 hover:border-indigo-300 transition-colors hover:shadow-lg hover:shadow-indigo-50 bg-white rounded-xl">
                  <div className="w-10 h-10 bg-slate-900 group-hover:bg-indigo-600 transition-colors flex items-center justify-center mb-4 rounded-lg">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Try Before You Buy — step by step */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
              {lt.tryBefore.label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[1.05] md:leading-[0.9]">
              {lt.tryBefore.title}{' '}
              <span className="italic text-slate-400">{lt.tryBefore.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              {lt.tryBefore.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {lt.tryBefore.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={i} className="group relative">
                  <div className="p-8 md:p-10 border border-slate-200 hover:border-slate-300 transition-colors bg-white hover:shadow-lg hover:shadow-slate-100">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-slate-900 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="font-serif text-5xl font-black text-slate-100 italic">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full items-center justify-center border border-slate-200 shadow-sm">
                      <ArrowRight size={12} className="text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Demo video */}
          <div className="mt-16 max-w-3xl mx-auto">
            <video
              src="/agalaz-tryon-demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl shadow-2xl shadow-slate-200 border border-slate-200"
            />
          </div>

          <div className="text-center mt-14">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              {t.tryNow}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">
              {lt.features.label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.05] md:leading-[0.9]">
              {lt.features.title}{' '}
              <span className="italic text-slate-400">{lt.features.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-6 max-w-md mx-auto text-sm font-light">
              {lt.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lt.features.items.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={i} className="p-8 md:p-10 bg-slate-50 border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-shadow">
                  <div className="w-12 h-12 bg-indigo-600 flex items-center justify-center mb-8">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners CTA Banner */}
      <section id="partners" className="py-20 md:py-28 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            <Store size={12} className="inline mr-2 -mt-0.5" />
            {pickLang(
              lang,
              'Have an ecommerce?',
              '¿Tienes un ecommerce?',
              'Vous avez un e-commerce ?',
              'Tem um e-commerce?',
              'Sie haben einen Onlineshop?',
              'Hai un e-commerce?',
            )}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] md:leading-[0.9] mb-6">
            {pickLang(
              lang,
              'Skyrocket your sales.',
              'Dispara tus ventas.',
              'Faites décoller vos ventes.',
              'Faça as suas vendas decolar.',
              'Bringen Sie Ihren Umsatz zum Steigen.',
              'Fai decollare le tue vendite.',
            )}{' '}
            <br className="hidden md:block" />
            <span className="italic text-indigo-400">{pickLang(
              lang,
              'Reduce returns.',
              'Reduce devoluciones.',
              'Réduisez les retours.',
              'Reduza as devoluções.',
              'Reduzieren Sie Retouren.',
              'Riduci i resi.',
            )}</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            {pickLang(
              lang,
              'Add Agalaz virtual try-on to your store in 2 lines of code. Your customers try before they buy — fewer returns, higher conversion. Start with a free trial.',
              'Añade el probador virtual de Agalaz a tu tienda online en 2 líneas de código. Tus clientes se prueban la ropa antes de comprar — menos devoluciones, más conversión. Empieza con prueba gratis.',
              'Ajoutez l’essayage virtuel Agalaz à votre boutique en 2 lignes de code. Vos clients essaient avant d’acheter — moins de retours, plus de conversion. Commencez par un essai gratuit.',
              'Adicione o provador virtual Agalaz à sua loja em 2 linhas de código. Os seus clientes experimentam antes de comprar — menos devoluções, mais conversão. Comece com um teste grátis.',
              'Fügen Sie Agalaz Virtual Try-On in 2 Codezeilen zu Ihrem Shop hinzu. Ihre Kunden probieren, bevor sie kaufen — weniger Retouren, höhere Conversion. Starten Sie mit einer kostenlosen Testphase.',
              'Aggiungi il camerino virtuale Agalaz al tuo negozio in 2 righe di codice. I tuoi clienti provano prima di comprare — meno resi, più conversioni. Inizia con una prova gratuita.',
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/partners"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 hover:text-white transition-all"
            >
              <Store size={16} className="group-hover:scale-110 transition-transform" />
              {pickLang(
                lang,
                'Apply now — free trial',
                'Aplica ahora — prueba gratis',
                'Postulez maintenant — essai gratuit',
                'Candidate-se agora — teste grátis',
                'Jetzt bewerben — kostenlos testen',
                'Candidati ora — prova gratuita',
              )}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-white/30 text-xs font-bold">
              {pickLang(
                lang,
                '5 free renders · No setup fee',
                '5 renders gratis · Sin coste de instalación',
                '5 rendus gratuits · Aucuns frais d’installation',
                '5 renders grátis · Sem custos de instalação',
                '5 kostenlose Renders · Keine Einrichtungsgebühr',
                '5 render gratuiti · Nessun costo di installazione',
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] md:leading-[0.9] mb-6">
            {lt.cta.title}
          </h2>
          <p className="text-white/40 text-sm mb-12 max-w-md mx-auto font-light">
            {lt.cta.subtitle}
          </p>
          <Link
            href="/try-on"
            data-fast-goal="footer_cta_click"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 hover:text-white transition-all"
          >
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
            {lt.cta.button}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.9] mb-12 text-center">
            {pickLang(lang, 'FAQ', 'Preguntas Frecuentes', 'Questions Fréquentes', 'Perguntas Frequentes', 'Häufige Fragen', 'Domande Frequenti')}
          </h2>
          <div className="space-y-6">
            {pickLang(
              lang,
              [
                { q: 'Is it free to try?', a: 'Yes. You get 2 free renders, no card required. After that: Starter pack $4.99 (10 renders, $0.50 per render) or Style Pro pack $9.99 (25 renders, $0.40 per render — SAVE 20%). One-time payment.' },
                { q: 'Which pack should I pick?', a: 'To try the platform: Starter $4.99 (10 renders at $0.50 each). For regular use: Style Pro $9.99 (25 renders at just $0.40 each — 20% cheaper per render than Starter).' },
                { q: 'Is this a subscription?', a: 'No. Both packs are one-time payments. No auto-renewal, no lock-in, nothing to cancel. You buy the pack and the renders sit in your account.' },
                { q: 'Do my renders expire?', a: 'No. Once you buy a pack, the renders stay in your account until you use them. Buy when you need them, no rush.' },
                { q: 'What happens to my photos?', a: 'Processed in real time, never stored on our servers. Full privacy — your photos are never saved nor used to train AI.' },
                { q: 'How do I buy a pack?', a: 'Tap "Buy Now" on any landing or go to /try-on. Pick the pack and complete payment in 30 seconds with Stripe (card, Apple Pay, or Google Pay).' },
              ],
              [
                { q: '¿Es gratis para probar?', a: 'Sí. Tienes 2 renders gratis sin tarjeta. Después: pack Starter $4,99 (10 renders, $0,50 por render) o pack Style Pro $9,99 (25 renders, $0,40 por render — AHORRA 20%). Pago único.' },
                { q: '¿Cuál pack me conviene?', a: 'Para probar la plataforma: Starter $4,99 (10 renders a $0,50 cada uno). Para uso regular: Style Pro $9,99 (25 renders por solo $0,40 cada uno, ahorras un 20% frente al Starter).' },
                { q: '¿Es una suscripción?', a: 'No. Ambos packs son pago único. Sin renovación automática, sin permanencia, sin nada que cancelar. Pagas el pack y los renders están en tu cuenta.' },
                { q: '¿Mis renders caducan?', a: 'No. Una vez compras un pack, los renders se quedan en tu cuenta hasta que los uses. Cómpralos cuando los necesites.' },
                { q: '¿Qué pasa con mis fotos?', a: 'Se procesan en tiempo real y no se almacenan en nuestros servidores. Privacidad total — tus fotos nunca se guardan ni se usan para entrenar IA.' },
                { q: '¿Cómo compro un pack?', a: 'Pulsa "Comprar Ahora" en cualquier landing o ve a /try-on. Eliges el pack y completas el pago en 30 segundos con Stripe (tarjeta, Apple Pay o Google Pay).' },
              ],
              [
                { q: 'Est-ce gratuit à essayer ?', a: 'Oui. Vous avez 2 rendus gratuits, sans carte. Ensuite : pack Starter 4,99 $ (10 rendus, 0,50 $ par rendu) ou pack Style Pro 9,99 $ (25 rendus, 0,40 $ par rendu — ÉCONOMISEZ 20 %). Paiement unique.' },
                { q: 'Quel pack choisir ?', a: 'Pour tester la plateforme : Starter 4,99 $ (10 rendus à 0,50 $ chacun). Pour un usage régulier : Style Pro 9,99 $ (25 rendus à seulement 0,40 $ chacun, soit 20 % de moins par rendu que Starter).' },
                { q: 'Est-ce un abonnement ?', a: 'Non. Les deux packs sont des paiements uniques. Pas de renouvellement automatique, pas d’engagement, rien à annuler. Vous achetez le pack et les rendus restent sur votre compte.' },
                { q: 'Mes rendus expirent-ils ?', a: 'Non. Une fois le pack acheté, les rendus restent sur votre compte jusqu’à utilisation. Achetez-les quand vous en avez besoin.' },
                { q: 'Que deviennent mes photos ?', a: 'Traitées en temps réel, jamais stockées sur nos serveurs. Confidentialité totale — vos photos ne sont jamais sauvegardées ni utilisées pour entraîner l’IA.' },
                { q: 'Comment acheter un pack ?', a: 'Cliquez sur "Acheter maintenant" sur n’importe quelle page ou allez sur /try-on. Choisissez le pack et payez en 30 secondes avec Stripe (carte, Apple Pay ou Google Pay).' },
              ],
              [
                { q: 'É grátis para experimentar?', a: 'Sim. Tem 2 renders gratuitos, sem cartão. Depois: pack Starter 4,99 $ (10 renders, 0,50 $ por render) ou pack Style Pro 9,99 $ (25 renders, 0,40 $ por render — POUPE 20%). Pagamento único.' },
                { q: 'Qual pack devo escolher?', a: 'Para experimentar a plataforma: Starter 4,99 $ (10 renders a 0,50 $ cada). Para uso regular: Style Pro 9,99 $ (25 renders por apenas 0,40 $ cada — 20% mais barato por render do que o Starter).' },
                { q: 'É uma subscrição?', a: 'Não. Ambos os packs são pagamento único. Sem renovação automática, sem permanência, nada para cancelar. Compra o pack e os renders ficam na sua conta.' },
                { q: 'Os meus renders caducam?', a: 'Não. Depois de comprar um pack, os renders ficam na sua conta até serem usados. Compre quando precisar, sem pressa.' },
                { q: 'O que acontece às minhas fotos?', a: 'Processadas em tempo real, nunca armazenadas nos nossos servidores. Privacidade total — as suas fotos nunca são guardadas nem utilizadas para treinar IA.' },
                { q: 'Como compro um pack?', a: 'Toque em "Comprar agora" em qualquer página ou vá a /try-on. Escolha o pack e complete o pagamento em 30 segundos com Stripe (cartão, Apple Pay ou Google Pay).' },
              ],
              [
                { q: 'Ist das Testen kostenlos?', a: 'Ja. Sie erhalten 2 kostenlose Renders, keine Karte erforderlich. Danach: Starter-Pack 4,99 $ (10 Renders, 0,50 $ pro Render) oder Style-Pro-Pack 9,99 $ (25 Renders, 0,40 $ pro Render — 20% SPAREN). Einmalige Zahlung.' },
                { q: 'Welches Pack soll ich wählen?', a: 'Zum Testen der Plattform: Starter 4,99 $ (10 Renders zu je 0,50 $). Für regelmäßige Nutzung: Style Pro 9,99 $ (25 Renders zu je nur 0,40 $ — 20% günstiger pro Render als Starter).' },
                { q: 'Ist das ein Abo?', a: 'Nein. Beide Packs sind Einmalzahlungen. Keine automatische Verlängerung, keine Bindung, nichts zu kündigen. Sie kaufen das Pack und die Renders bleiben auf Ihrem Konto.' },
                { q: 'Verfallen meine Renders?', a: 'Nein. Sobald Sie ein Pack kaufen, bleiben die Renders auf Ihrem Konto, bis Sie sie verwenden. Kaufen Sie sie, wenn Sie sie brauchen.' },
                { q: 'Was passiert mit meinen Fotos?', a: 'In Echtzeit verarbeitet, nie auf unseren Servern gespeichert. Volle Privatsphäre — Ihre Fotos werden weder gespeichert noch zum KI-Training verwendet.' },
                { q: 'Wie kaufe ich ein Pack?', a: 'Tippen Sie auf einer beliebigen Seite auf "Jetzt kaufen" oder gehen Sie zu /try-on. Wählen Sie das Pack und schließen Sie die Zahlung in 30 Sekunden mit Stripe ab (Karte, Apple Pay oder Google Pay).' },
              ],
              [
                { q: 'È gratis da provare?', a: 'Sì. Hai 2 render gratuiti, senza carta. Poi: pack Starter 4,99 $ (10 render, 0,50 $ per render) o pack Style Pro 9,99 $ (25 render, 0,40 $ per render — RISPARMI 20%). Pagamento unico.' },
                { q: 'Quale pack mi conviene?', a: 'Per provare la piattaforma: Starter 4,99 $ (10 render a 0,50 $ ciascuno). Per uso regolare: Style Pro 9,99 $ (25 render a soli 0,40 $ ciascuno — 20% più economico per render rispetto a Starter).' },
                { q: 'È un abbonamento?', a: 'No. Entrambi i pack sono pagamenti unici. Nessun rinnovo automatico, nessun vincolo, niente da disdire. Compri il pack e i render restano sul tuo account.' },
                { q: 'I miei render scadono?', a: 'No. Una volta acquistato un pack, i render restano sul tuo account finché non li usi. Comprali quando ti servono, senza fretta.' },
                { q: 'Cosa succede alle mie foto?', a: 'Elaborate in tempo reale, mai salvate sui nostri server. Privacy totale — le tue foto non vengono mai memorizzate né usate per addestrare l’IA.' },
                { q: 'Come compro un pack?', a: 'Tocca "Compra ora" su qualsiasi pagina o vai su /try-on. Scegli il pack e completa il pagamento in 30 secondi con Stripe (carta, Apple Pay o Google Pay).' },
              ],
            ).map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <span className="text-slate-300 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Pricing tiers + Buy Now CTAs */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Starter</div>
              <div className="text-3xl font-black text-slate-900 mb-1">$4,99</div>
              <div className="text-xs text-slate-500 font-light mb-4">
                {pickLang(
                  lang,
                  '10 renders · $0.50 per render · one-time',
                  '10 renders · $0,50 por render · pago único',
                  '10 rendus · 0,50 $ par rendu · paiement unique',
                  '10 renders · 0,50 $ por render · pagamento único',
                  '10 Renders · 0,50 $ pro Render · einmalig',
                  '10 render · 0,50 $ per render · pagamento unico',
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-light mb-5">
                {pickLang(
                  lang,
                  'Try the platform',
                  'Prueba la plataforma',
                  'Testez la plateforme',
                  'Experimente a plataforma',
                  'Plattform testen',
                  'Prova la piattaforma',
                )}
              </p>
              <Link
                href="/try-on?plan=test"
                className="block w-full py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-indigo-600 transition-colors"
              >
                {pickLang(lang, 'Buy Now', 'Comprar Ahora', 'Acheter maintenant', 'Comprar agora', 'Jetzt kaufen', 'Compra ora')}
              </Link>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                {pickLang(lang, 'SAVE 20%', 'AHORRA 20%', 'ÉCONOMISEZ 20 %', 'POUPE 20%', '20% SPAREN', 'RISPARMI 20%')}
              </div>
              <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Style Pro</div>
              <div className="text-3xl font-black text-slate-900 mb-1">$9,99</div>
              <div className="text-xs text-slate-500 font-light mb-4">
                {pickLang(
                  lang,
                  '25 renders · $0.40 per render · one-time',
                  '25 renders · $0,40 por render · pago único',
                  '25 rendus · 0,40 $ par rendu · paiement unique',
                  '25 renders · 0,40 $ por render · pagamento único',
                  '25 Renders · 0,40 $ pro Render · einmalig',
                  '25 render · 0,40 $ per render · pagamento unico',
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-light mb-5">
                {pickLang(lang, 'Most popular', 'El más popular', 'Le plus populaire', 'O mais popular', 'Am beliebtesten', 'Il più popolare')}
              </p>
              <Link
                href="/try-on?plan=popular"
                className="block w-full py-3 bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-indigo-700 transition-colors"
              >
                {pickLang(lang, 'Buy Now', 'Comprar Ahora', 'Acheter maintenant', 'Comprar agora', 'Jetzt kaufen', 'Compra ora')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mb-8">
            {pickLang(
              lang,
              'AI Fashion Resources',
              'Recursos de Moda con IA',
              'Ressources Mode IA',
              'Recursos de Moda com IA',
              'KI-Mode-Ressourcen',
              'Risorse di Moda con IA',
            )}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/virtual-try-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(
                  lang,
                  'AI Virtual Try On',
                  'Probador Virtual con IA',
                  'Essayage Virtuel IA',
                  'Provador Virtual com IA',
                  'KI Virtual Try-On',
                  'Camerino Virtuale con IA',
                )}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(
                lang,
                'See how clothes look on you',
                'Ve como te queda la ropa',
                'Voyez le rendu des vêtements sur vous',
                'Veja como a roupa fica em si',
                'Sehen Sie, wie Kleidung an Ihnen aussieht',
                'Vedi come ti sta la roba',
              )}</p>
            </Link>
            <Link href="/blog/best-way-to-try-on-clothes-online-with-ai" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Try On Clothes Online With AI', 'Probar Ropa Online con IA', 'Essayer des Vêtements en Ligne avec l\'IA', 'Experimentar Roupa Online com IA', 'Kleidung online mit KI anprobieren', 'Provare Vestiti Online con l\'IA')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Complete guide', 'Guia completa', 'Guide complet', 'Guia completo', 'Vollständige Anleitung', 'Guida completa')}</p>
            </Link>
            <Link href="/blog/how-to-reduce-online-shopping-returns" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Reduce Shopping Returns', 'Reducir Devoluciones', 'Réduire les Retours d\'Achat', 'Reduzir Devoluções de Compras', 'Rücksendungen reduzieren', 'Ridurre i Resi degli Acquisti')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Save money and time', 'Ahorra dinero y tiempo', 'Économisez temps et argent', 'Poupe dinheiro e tempo', 'Sparen Sie Geld und Zeit', 'Risparmia tempo e denaro')}</p>
            </Link>
            <Link href="/blog/how-to-know-if-clothes-will-fit-without-trying-them-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Know If Clothes Will Fit', 'Saber Si la Ropa Te Queda', 'Savoir si les Vêtements Vous Iront', 'Saber Se a Roupa Lhe Serve', 'Wissen, ob Kleidung passt', 'Sapere Se i Vestiti Vi Stanno')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, '7 proven methods', '7 metodos probados', '7 méthodes éprouvées', '7 métodos comprovados', '7 bewährte Methoden', '7 metodi collaudati')}</p>
            </Link>
            <Link href="/blog/how-to-get-accurate-body-measurements-for-virtual-try-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Body Measurements for Try-On', 'Medidas para Probador Virtual', 'Mensurations pour l\'Essayage', 'Medidas para o Provador Virtual', 'Körpermaße für die Anprobe', 'Misure per il Camerino Virtuale')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Pro guide', 'Guía profesional', 'Guide professionnel', 'Guia profissional', 'Profi-Anleitung', 'Guida professionale')}</p>
            </Link>
            <Link href="/blog/best-free-virtual-dressing-room-apps-android-ios-2026" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Best Virtual Dressing Room Apps 2026', 'Mejores Apps Probador Virtual 2026', 'Meilleures Apps de Cabine d\'Essayage 2026', 'Melhores Apps de Provador Virtual 2026', 'Beste Virtual-Umkleide-Apps 2026', 'Migliori App Camerino Virtuale 2026')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Android vs iOS', 'Android vs iOS', 'Android vs iOS', 'Android vs iOS', 'Android vs iOS', 'Android vs iOS')}</p>
            </Link>
            <Link href="/blog/virtual-try-on-office-siren-aesthetic-glasses" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Office Siren Glasses — Virtual Try-On', 'Gafas Office Siren — Prueba Virtual', 'Lunettes Office Siren — Essayage Virtuel', 'Óculos Office Siren — Prova Virtual', 'Office-Siren-Brillen — Virtuelle Anprobe', 'Occhiali Office Siren — Prova Virtuale')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Find your perfect frame', 'Encuentra tu montura perfecta', 'Trouvez votre monture idéale', 'Encontre a sua armação perfeita', 'Finden Sie Ihre perfekte Fassung', 'Trovate la vostra montatura perfetta')}</p>
            </Link>
            <Link href="/blog/best-glasses-colors-deep-autumn-skin-tone" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Glasses Colors for Deep Autumn', 'Colores de Gafas para Otoño Profundo', 'Couleurs de Lunettes pour Automne Profond', 'Cores de Óculos para Outono Profundo', 'Brillenfarben für Deep Autumn', 'Colori degli Occhiali per Autunno Profondo')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Color analysis + AI', 'Análisis de color + IA', 'Analyse colorimétrique + IA', 'Análise de cor + IA', 'Farbanalyse + KI', 'Analisi colore + AI')}</p>
            </Link>
            <Link href="/blog/free-ai-glasses-stylist-diamond-face-shape" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'AI Glasses Stylist — Diamond Face', 'Estilista IA para Cara Diamante', 'Styliste IA Lunettes — Visage Diamant', 'Estilista IA de Óculos — Rosto Diamante', 'KI-Brillenstylist — Diamantgesicht', 'Stilista IA Occhiali — Viso a Diamante')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Frames that flatter you', 'Monturas que te favorecen', 'Des montures qui vous mettent en valeur', 'Armações que o favorecem', 'Fassungen, die Ihnen schmeicheln', 'Montature che vi valorizzano')}</p>
            </Link>
            <Link href="/blog/virtual-try-on-glasses-hide-dark-circles" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Glasses That Hide Dark Circles', 'Gafas para Ocultar Ojeras', 'Lunettes qui Cachent les Cernes', 'Óculos que Disfarçam Olheiras', 'Brillen, die Augenringe kaschieren', 'Occhiali che Nascondono le Occhiaie')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Virtual try-on + guide', 'Prueba virtual + guía', 'Essayage virtuel + guide', 'Prova virtual + guia', 'Virtuelle Anprobe + Anleitung', 'Prova virtuale + guida')}</p>
            </Link>
            <Link href="/blog/coquette-aesthetic-spring-nails-virtual-try-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Coquette Spring Nails Try-On', 'Uñas Coquette Primavera', 'Essayage Ongles Coquette Printemps', 'Prova Unhas Coquette Primavera', 'Coquette-Frühlingsnägel — Anprobe', 'Prova Unghie Coquette Primavera')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Bows, pearls & soft pink', 'Lazos, perlas y rosa suave', 'Nœuds, perles et rose doux', 'Laços, pérolas e rosa suave', 'Schleifen, Perlen und zartes Rosa', 'Fiocchi, perle e rosa tenue')}</p>
            </Link>
            <Link href="/blog/short-almond-spring-nails-clean-girl-look" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Clean Girl Almond Nails', 'Uñas Almendra Clean Girl', 'Ongles Amande Clean Girl', 'Unhas Amêndoa Clean Girl', 'Clean-Girl-Mandelnägel', 'Unghie a Mandorla Clean Girl')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Minimal guide + virtual try-on', 'Guía minimal + prueba virtual', 'Guide minimaliste + essayage virtuel', 'Guia minimal + prova virtual', 'Minimal-Anleitung + virtuelle Anprobe', 'Guida minimal + prova virtuale')}</p>
            </Link>
            <Link href="/blog/pastel-chrome-nails-2026-futuristic-spring-trend" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Pastel Chrome Nails 2026', 'Uñas Chrome Pastel 2026', 'Ongles Chromés Pastel 2026', 'Unhas Chrome Pastel 2026', 'Pastell-Chrome-Nägel 2026', 'Unghie Chrome Pastello 2026')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Futuristic spring trend', 'Tendencia futurista', 'Tendance printanière futuriste', 'Tendência futurista de primavera', 'Futuristischer Frühlingstrend', 'Tendenza primaverile futuristica')}</p>
            </Link>
            <Link href="/blog/why-clothes-look-different-online-vs-in-person" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Why Clothes Look Different Online', 'Por Qué la Ropa Se Ve Diferente Online', 'Pourquoi les Vêtements Paraissent Différents en Ligne', 'Porque a Roupa Parece Diferente Online', 'Warum Kleidung online anders aussieht', 'Perché i Vestiti Sembrano Diversi Online')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Colors, fit & fabric', 'Colores, ajuste y telas', 'Couleurs, coupe et tissus', 'Cores, caimento e tecidos', 'Farben, Passform und Stoffe', 'Colori, vestibilità e tessuti')}</p>
            </Link>
            <Link href="/blog/how-to-dress-for-your-body-type-without-a-stylist" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Dress for Your Body Type', 'Vestir para Tu Tipo de Cuerpo', 'S\'Habiller Selon Sa Morphologie', 'Vestir-se de Acordo com o Seu Tipo de Corpo', 'Kleiden Sie sich nach Ihrer Figur', 'Vestire in Base alla Vostra Silhouette')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Without a stylist', 'Sin estilista', 'Sans styliste', 'Sem estilista', 'Ohne Stylisten', 'Senza stilista')}</p>
            </Link>
            <Link href="/blog/online-shopping-mistakes-that-lead-to-returns" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Online Shopping Mistakes', 'Errores al Comprar Online', 'Erreurs d\'Achat en Ligne', 'Erros nas Compras Online', 'Fehler beim Online-Shopping', 'Errori negli Acquisti Online')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Avoid returns', 'Evita devoluciones', 'Évitez les retours', 'Evite devoluções', 'Vermeiden Sie Rücksendungen', 'Evitate i resi')}</p>
            </Link>
            <Link href="/blog/what-to-wear-to-a-job-interview-2026" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'What to Wear to a Job Interview', 'Qué Ponerte en una Entrevista 2026', 'Que Porter à un Entretien d\'Embauche', 'O Que Vestir numa Entrevista de Emprego', 'Was zum Vorstellungsgespräch tragen', 'Cosa Indossare a un Colloquio di Lavoro')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'By industry guide', 'Guía por sector', 'Guide par secteur', 'Guia por setor', 'Anleitung nach Branche', 'Guida per settore')}</p>
            </Link>
            <Link href="/blog/best-colors-to-wear-for-your-skin-tone" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Best Colors for Your Skin Tone', 'Mejores Colores para Tu Tono de Piel', 'Meilleures Couleurs pour Votre Carnation', 'Melhores Cores para o Seu Tom de Pele', 'Beste Farben für Ihren Hautton', 'Migliori Colori per il Vostro Incarnato')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Color analysis', 'Análisis de color', 'Analyse colorimétrique', 'Análise de cor', 'Farbanalyse', 'Analisi del colore')}</p>
            </Link>
            <Link href="/blog/how-to-style-oversized-clothes-without-looking-sloppy" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Style Oversized Clothes', 'Estilizar Ropa Oversized', 'Styliser des Vêtements Oversize', 'Estilizar Roupa Oversized', 'Oversized-Kleidung stylen', 'Abbinare Capi Oversize')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Without looking sloppy', 'Sin verte descuidado', 'Sans avoir l\'air négligé', 'Sem parecer descuidado', 'Ohne nachlässig auszusehen', 'Senza apparire trasandati')}</p>
            </Link>
            <Link href="/blog/capsule-wardrobe-guide-30-outfits-15-pieces" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Capsule Wardrobe: 30 Outfits, 15 Pieces', 'Armario Cápsula: 30 Outfits, 15 Prendas', 'Garde-Robe Capsule : 30 Tenues, 15 Pièces', 'Guarda-Roupa Cápsula: 30 Looks, 15 Peças', 'Capsule-Wardrobe: 30 Outfits, 15 Teile', 'Guardaroba Capsula: 30 Outfit, 15 Capi')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Complete guide', 'Guía completa', 'Guide complet', 'Guia completo', 'Vollständige Anleitung', 'Guida completa')}</p>
            </Link>
            <Link href="/blog/barrel-leg-jeans-styling-guide" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Barrel Leg Jeans Styling Guide', 'Guía de Estilo: Barrel Leg Jeans', 'Guide de Style : Jeans Barrel Leg', 'Guia de Estilo: Jeans Barrel Leg', 'Style-Guide: Barrel-Leg-Jeans', 'Guida allo Stile: Jeans Barrel Leg')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Denim trend 2026', 'Tendencia denim 2026', 'Tendance denim 2026', 'Tendência denim 2026', 'Denim-Trend 2026', 'Tendenza denim 2026')}</p>
            </Link>
            <Link href="/blog/digital-nomad-corporate-crease-free-office-wear" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Digital Nomad Office Wear', 'Ropa de Oficina para Nómadas Digitales', 'Tenue de Bureau pour Nomades Numériques', 'Roupa de Escritório para Nómadas Digitais', 'Bürokleidung für digitale Nomaden', 'Abbigliamento da Ufficio per Nomadi Digitali')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Crease-free & stylish', 'Sin arrugas, con estilo', 'Sans plis et avec style', 'Sem rugas e com estilo', 'Knitterfrei und stilvoll', 'Senza pieghe e con stile')}</p>
            </Link>
            <Link href="/blog/jellyfish-silhouette-styling-guide" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Jellyfish Silhouette Guide', 'Guía Silueta Jellyfish', 'Guide Silhouette Jellyfish', 'Guia da Silhueta Jellyfish', 'Jellyfish-Silhouette: Anleitung', 'Guida alla Silhouette Jellyfish')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Viral trend', 'Tendencia viral', 'Tendance virale', 'Tendência viral', 'Viraler Trend', 'Tendenza virale')}</p>
            </Link>
            <Link href="/blog/spring-wedding-guest-mother-of-groom-dresses-2026" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Spring Wedding Guest Dresses 2026', 'Vestidos Boda Primavera 2026', 'Robes d\'Invitée Mariage Printemps 2026', 'Vestidos de Convidada Casamento Primavera 2026', 'Hochzeitsgast-Kleider Frühling 2026', 'Abiti da Invitata Matrimonio Primavera 2026')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Guest & mother of groom', 'Invitada y madrina', 'Invitée et mère du marié', 'Convidada e mãe do noivo', 'Gast und Bräutigammutter', 'Invitata e madre dello sposo')}</p>
            </Link>
            <Link href="/blog/ai-clothes-changer-online-free-trial" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'AI Clothes Changer Online', 'Cambiador de Ropa con IA', 'Changeur de Vêtements IA en Ligne', 'Trocador de Roupa com IA Online', 'KI-Kleiderwechsler Online', 'Cambia Vestiti IA Online')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Free trial', 'Prueba gratis', 'Essai gratuit', 'Teste grátis', 'Kostenlos testen', 'Prova gratuita')}</p>
            </Link>
            <Link href="/blog/como-reducir-devoluciones-tienda-ropa-online" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Reduce Returns in Your Store', 'Reducir Devoluciones en Tu Tienda', 'Réduire les Retours dans Votre Boutique', 'Reduzir Devoluções na Sua Loja', 'Rücksendungen in Ihrem Shop reduzieren', 'Ridurre i Resi nel Vostro Negozio')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'E-commerce guide', 'Guía para e-commerce', 'Guide e-commerce', 'Guia para e-commerce', 'E-Commerce-Anleitung', 'Guida e-commerce')}</p>
            </Link>
            <Link href="/blog/virtual-dressing-room-online-free" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Virtual Dressing Room Free', 'Probador Virtual Online Gratis', 'Cabine d\'Essayage Virtuelle Gratuite', 'Provador Virtual Online Grátis', 'Virtuelle Umkleide kostenlos', 'Camerino Virtuale Online Gratis')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'No app download', 'Sin descargar app', 'Sans téléchargement d\'app', 'Sem instalar app', 'Ohne App-Download', 'Senza scaricare app')}</p>
            </Link>
            <Link href="/blog/1-5-carat-vs-2-carat-diamond-on-hand" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, '1.5 vs 2 Carat Diamond on Hand', '1.5 vs 2 Quilates en la Mano', 'Diamant 1,5 vs 2 Carats sur la Main', 'Diamante 1,5 vs 2 Quilates na Mão', '1,5 vs 2 Karat Diamant an der Hand', 'Diamante 1,5 vs 2 Carati sulla Mano')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'Real size comparison', 'Comparativa real', 'Comparaison de taille réelle', 'Comparação real de tamanho', 'Realer Größenvergleich', 'Confronto di taglia reale')}</p>
            </Link>
            <Link href="/blog/diamond-carat-size-on-hand-simulator" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {pickLang(lang, 'Diamond Size on Hand Simulator', 'Simulador de Diamantes en la Mano', 'Simulateur de Diamants sur la Main', 'Simulador de Diamantes na Mão', 'Diamantgrößen-Simulator an der Hand', 'Simulatore di Diamanti sulla Mano')}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{pickLang(lang, 'AI-powered simulator', 'Prueba con IA', 'Simulateur propulsé par IA', 'Simulador com IA', 'KI-gestützter Simulator', 'Simulatore basato sull\'IA')}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Specific guides — internal linking to long-tail / face-shape /
          seasonal landings so authority flows from the homepage to the
          URLs Google hasn't indexed yet. Language-aware. */}
      <section className="border-t border-slate-100 bg-slate-50 py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-[10px] font-black text-pink-600 uppercase tracking-[0.2em]">
              {lang === 'es' ? 'Guías destacadas' : 'Featured guides'}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-slate-900 tracking-tight leading-tight mt-2">
              {lang === 'es' ? 'Looks específicos para probar' : 'Specific looks to try'}
            </h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {(lang === 'es' ? [
              { href: '/es/vestido-invitada-boda',    t: 'Vestido invitada boda',  s: 'Verano, Zara, Mango' },
              { href: '/es/disfraz-de-halloween',     t: 'Disfraz Halloween',      s: 'Catrina, Wednesday, Barbie' },
              { href: '/es/disfraz-halloween-pareja', t: 'Disfraz pareja',         s: 'Barbie & Ken, Wednesday & Enid' },
              { href: '/es/disfraz-carnaval',         t: 'Disfraz Carnaval',       s: 'Cádiz, Tenerife' },
              { href: '/es/disfraces-caseros',        t: 'Disfraces caseros',      s: 'Fáciles, baratos, sin coser' },
              { href: '/es/cosplay',                  t: 'Cosplay',                s: 'Anime, videojuegos, OC' },
              { href: '/haircut-for-round-face',      t: 'Corte cara redonda',     s: 'Los mejores cortes' },
              { href: '/curtain-bangs-haircut',       t: 'Flequillo cortina',      s: 'Pruébatelo en tu cara' },
              { href: '/wolf-cut-hairstyles',         t: 'Wolf cut',               s: 'Long, short, asian' },
              { href: '/haircut-for-oval-face',       t: 'Corte cara ovalada',    s: 'Estilos para cara ovalada' },
              { href: '/natural-makeup-look',         t: 'Maquillaje natural',     s: 'No-makeup makeup' },
              { href: '/engagement-ring-on-which-hand', t: 'Anillo compromiso mano', s: 'Qué dedo por cultura' },
            ] : [
              { href: '/curtain-bangs-haircut',       t: 'Curtain bangs',          s: 'Try the cut on your face' },
              { href: '/wolf-cut-hairstyles',         t: 'Wolf cut',               s: 'Long, short, mullet, asian' },
              { href: '/haircut-for-round-face',     t: 'Round face haircuts',    s: 'Best cuts that flatter' },
              { href: '/haircut-for-oval-face',      t: 'Oval face haircuts',     s: 'Styles for oval faces' },
              { href: '/haircut-for-square-face',    t: 'Square face haircuts',   s: 'Soften the jawline' },
              { href: '/haircut-for-diamond-face',   t: 'Diamond face haircuts',  s: 'Balance the cheekbones' },
              { href: '/wedding-guest-outfit',       t: 'Wedding guest outfit',   s: 'Spring, summer, fall, winter' },
              { href: '/bridesmaid-dress-try-on',    t: 'Bridesmaid dresses',     s: 'Cheap, sage green, Azazie' },
              { href: '/halloween-couples-costumes', t: 'Couples halloween',      s: 'Funny, easy, scary, DIY' },
              { href: '/natural-makeup-look',        t: 'Natural makeup',         s: 'No-makeup makeup tutorial' },
              { href: '/engagement-ring-on-which-hand', t: 'Engagement ring hand', s: 'Which finger by culture' },
              { href: '/ja/yukata',                  t: 'Yukata',                 s: 'Japanese summer kimono' },
            ]).map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group block h-full bg-white border border-slate-200 hover:border-pink-300 hover:shadow-md p-4 rounded-xl transition-all"
                >
                  <h3 className="font-serif text-sm md:text-base font-black text-slate-900 tracking-tight leading-tight">{g.t}</h3>
                  <p className="text-[11px] md:text-xs text-slate-500 font-light mt-1 leading-snug">{g.s}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </span>
          <div className="flex items-center gap-6">
            <Link href="/virtual-try-on" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Virtual Try On
            </Link>
            <Link href="/blog" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Blog
            </Link>
            <Link href="/partners" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Partners
            </Link>
            <Link href="/privacy" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {lt.footer.privacy}
            </Link>
            <Link href="/terms" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {lt.footer.terms}
            </Link>
            <a href="mailto:infoagalaz@gmail.com" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {lt.footer.contact}
            </a>
          </div>
        </div>
        <p className="text-slate-300 text-[11px] font-light text-center">
          {lt.footer.copyright} — infoagalaz@gmail.com
        </p>
      </footer>

      {/* FAQPage JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": (lang === 'es' ? [
              { q: '¿Es gratis para probar?', a: 'Sí. Tienes 2 renders gratis sin tarjeta. Después: pack Starter $4,99 (10 renders, $0,50 por render) o pack Style Pro $9,99 (25 renders, $0,40 por render — AHORRA 20%). Pago único.' },
              { q: '¿Cuál pack me conviene?', a: 'Para probar la plataforma: Starter $4,99 (10 renders a $0,50 cada uno). Para uso regular: Style Pro $9,99 (25 renders por solo $0,40 cada uno, ahorras un 20%).' },
              { q: '¿Es una suscripción?', a: 'No. Ambos packs son pago único. Sin renovación automática, sin permanencia, sin nada que cancelar.' },
              { q: '¿Mis renders caducan?', a: 'No. Una vez compras un pack, los renders se quedan en tu cuenta hasta que los uses.' },
              { q: '¿Qué pasa con mis fotos?', a: 'Se procesan en tiempo real y no se almacenan en nuestros servidores. Privacidad total.' },
              { q: '¿Cómo compro un pack?', a: 'Pulsa Comprar Ahora en cualquier landing o ve a /try-on. Eliges el pack y completas el pago en 30 segundos con Stripe (tarjeta, Apple Pay, Google Pay).' },
            ] : [
              { q: 'Is it free to try?', a: 'Yes. You get 2 free renders, no card required. After that: Starter pack $4.99 (10 renders, $0.50 per render) or Style Pro pack $9.99 (25 renders, $0.40 per render — SAVE 20%). One-time payment.' },
              { q: 'Which pack should I pick?', a: 'To try the platform: Starter $4.99 (10 renders at $0.50 each). For regular use: Style Pro $9.99 (25 renders at just $0.40 each — 20% cheaper per render).' },
              { q: 'Is this a subscription?', a: 'No. Both packs are one-time payments. No auto-renewal, no lock-in, nothing to cancel.' },
              { q: 'Do my renders expire?', a: 'No. Once you buy a pack, the renders stay in your account until you use them.' },
              { q: 'What happens to my photos?', a: 'Processed in real time, never stored on our servers. Full privacy.' },
              { q: 'How do I buy a pack?', a: 'Tap Buy Now on any landing or go to /try-on. Pick the pack and complete payment in 30 seconds with Stripe (card, Apple Pay, Google Pay).' },
            ]).map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
}
