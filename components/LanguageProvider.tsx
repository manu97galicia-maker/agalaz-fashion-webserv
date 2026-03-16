'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Lang = 'en' | 'es';

const translations = {
  en: {
    // Nav & general
    start: 'Get Started',
    tryNow: 'Try Now Free',
    howItWorks: 'How it works',

    // Hero
    heroLine1: 'TRY IT',
    heroLine2: 'BEFORE YOU',
    heroLine3: 'BUY.',
    heroDesc: 'Upload your photo and any garment you own or want to buy — see how it looks on your real body instantly.',
    activeUsers: '+10,000 active users',

    // Features
    featuresTitle: 'Surgical',
    featuresTitleHighlight: 'Precision',
    featuresSubtitle: 'Component Engine V7.0 — every pixel preserved, every garment respected.',
    feat1Title: 'Total Preservation',
    feat1Desc: 'Your pants, shoes and original background stay untouched. We only change what you ask.',
    feat2Title: 'Real Face Mapping',
    feat2Desc: 'Agalaz integrates your identity onto your real body, respecting your features and neckline.',
    feat3Title: 'Color & Style',
    feat3Desc: 'We extract the DNA of the new garment and adapt it to your silhouette without distortion.',

    // How it works
    stepsTitle: '3 Photos.',
    stepsTitleHighlight: '1 Render.',
    step1Label: 'Face ID',
    step1Desc: 'Upload a photo of your face for facial mapping.',
    step2Label: 'Base Photo',
    step2Desc: 'A full-body photo — we preserve everything except the top garment.',
    step3Label: 'New Garment',
    step3Desc: 'Upload a photo of your garment or one you want to buy — we extract its color and style.',

    // CTA
    ctaLabel: 'Start Free',
    ctaTitle: 'Your Style,',
    ctaTitleHighlight: 'Preserved.',
    ctaDesc: '10 free renders. No credit card. No commitment.',

    // Footer
    footerCopy: '© 2025 Agalaz Labs. Precision Engine V7.0',
    privacy: 'Privacy',
    terms: 'Terms',

    // Try-on
    preserveTitle: 'Virtual',
    preserveHighlight: 'Try-On.',
    preserveDesc: 'Upload your photos, choose a garment, and hit Render. Then use the chat to refine: change color, size, sleeves, fit — anything you want.',
    faceLabel: 'Your Face',
    faceHint: 'Front-facing selfie looking at camera',
    bodyLabel: 'Full Body',
    clothingLabel: 'Garment',
    renderBtn: 'Render',
    uploadPhoto: 'Upload Photo',
    uploadGarment: 'Upload Garment',
    missingPhotos: 'Please upload both your face photo and a full-body photo to start the render.',
    protectingOutfit: 'Generating your try-on...',
    engineError: 'Something went wrong. Please try again — if it keeps failing, try using different photos with better lighting.',
    precisionError: 'We couldn\'t process your photos. Make sure your body photo is front-facing, full-body (head to feet), and well-lit.',
    updateError: 'Couldn\'t apply the change. Try rephrasing your request or start a new render with different photos.',
    editBtn: 'Edit',
    chatPlaceholder: 'e.g. "Change to size L", "Make it blue", "Long sleeves"...',
    outfitPreserved: 'Outfit Preserved',
    seamlessId: 'Seamless ID',
    segmented: 'Outfit segmented. Pants and background preserved.',

    // Try-on extras
    bodyHint: 'Full body, head to feet, facing the camera',
    optional: 'optional',
    chatTip: 'After rendering, use the chat to ask for changes: different color, size, sleeves, fit...',

    // Onboarding
    next: 'Next',
    begin: 'Begin',

    // Paywall
    auraPro: 'Agalaz Pro',
    precisionTotal: 'Total',
    precisionTitle: 'Precision',
    getPro: 'Get Pro $4.99/mo',
    payFeat1: 'Original outfit preservation',
    payFeat2: 'Seamless face mapping',
    payFeat3: '14 renders per week',
    payFeat4: 'Background & environment protected',
    payFeat5: 'Support for complex garments',
    restorePurchase: 'Restore Purchase',

    // Profile
    profileTitle: 'My Profile',
    myGallery: 'My Gallery',
    referralTitle: 'Your Referral Link',
    referralDesc: 'Share this link and earn bonus credits when friends subscribe.',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    noImages: 'No renders yet. Try your first one!',
    deleteImage: 'Delete',
    plan: 'Plan',
    credits: 'Credits',
    free: 'Free',
    galleryCount: 'renders saved',
  },
  es: {
    start: 'Empezar',
    tryNow: 'Probar Ahora Gratis',
    howItWorks: 'Cómo funciona',

    heroLine1: 'PRUEBA',
    heroLine2: 'ANTES DE',
    heroLine3: 'COMPRAR.',
    heroDesc: 'Sube tu foto y cualquier prenda que tengas o quieras comprar — ve cómo te queda en tu cuerpo real al instante.',
    activeUsers: '+10,000 usuarios activos',

    featuresTitle: 'Precisión',
    featuresTitleHighlight: 'Quirúrgica',
    featuresSubtitle: 'Motor de componentes V7.0 — cada píxel preservado, cada prenda respetada.',
    feat1Title: 'Preservación Total',
    feat1Desc: 'Tus pantalones, calzado y fondo original se mantienen intactos. Solo cambiamos lo que pidas.',
    feat2Title: 'Mapeo Facial Real',
    feat2Desc: 'Agalaz integra tu identidad sobre tu cuerpo real, respetando tu fisonomía y cuello.',
    feat3Title: 'Color & Estilo',
    feat3Desc: 'Extraemos el ADN de la prenda nueva y lo adaptamos a tu silueta sin deformaciones.',

    stepsTitle: '3 Fotos.',
    stepsTitleHighlight: '1 Render.',
    step1Label: 'ID Rostro',
    step1Desc: 'Sube una foto de tu cara para el mapeo facial.',
    step2Label: 'Foto Base',
    step2Desc: 'Una foto de cuerpo completo — preservamos todo excepto la prenda superior.',
    step3Label: 'Prenda Nueva',
    step3Desc: 'Sube una foto de tu prenda o una que quieras comprar — extraemos su color y estilo.',

    ctaLabel: 'Comienza Gratis',
    ctaTitle: 'Tu Estilo,',
    ctaTitleHighlight: 'Preservado.',
    ctaDesc: '10 renders gratuitos. Sin tarjeta de crédito. Sin compromisos.',

    footerCopy: '© 2025 Agalaz Labs. Motor de Precisión V7.0',
    privacy: 'Privacidad',
    terms: 'Términos',

    preserveTitle: 'Probador',
    preserveHighlight: 'Virtual.',
    preserveDesc: 'Sube tus fotos, elige una prenda y dale a Render. Luego usa el chat para ajustar: cambiar color, talla, mangas, ajuste — lo que quieras.',
    faceLabel: 'Tu Cara',
    faceHint: 'Selfie frontal mirando a la cámara',
    bodyLabel: 'Cuerpo Completo',
    clothingLabel: 'Prenda',
    renderBtn: 'Renderizar',
    uploadPhoto: 'Subir Foto',
    uploadGarment: 'Subir Prenda',
    missingPhotos: 'Sube una foto de tu cara y una de cuerpo completo para empezar el render.',
    protectingOutfit: 'Generando tu prueba virtual...',
    engineError: 'Algo salió mal. Inténtalo de nuevo — si sigue fallando, prueba con fotos diferentes y mejor iluminación.',
    precisionError: 'No pudimos procesar tus fotos. Asegúrate de que la foto de cuerpo sea frontal, de cuerpo completo (cabeza a pies) y con buena luz.',
    updateError: 'No se pudo aplicar el cambio. Intenta reformular tu petición o empieza un nuevo render con fotos diferentes.',
    editBtn: 'Editar',
    chatPlaceholder: 'Ej: "Cámbiala a talla L", "Hazla azul", "Manga larga"...',
    outfitPreserved: 'Outfit Preservado',
    seamlessId: 'Seamless ID',
    segmented: 'Outfit segmentado. Pantalones y fondo preservados.',

    bodyHint: 'Cuerpo entero, de cabeza a pies, mirando a la cámara',
    optional: 'opcional',
    chatTip: 'Después del render, usa el chat para pedir cambios: otro color, talla, mangas, ajuste...',

    next: 'Siguiente',
    begin: 'Comenzar',

    auraPro: 'Agalaz Pro',
    precisionTotal: 'Total',
    precisionTitle: 'Precisión',
    getPro: 'Obtener Pro $4.99/mes',
    payFeat1: 'Preservación de outfit original',
    payFeat2: 'Mapeo facial sin costuras',
    payFeat3: '14 renders por semana',
    payFeat4: 'Fondo y entorno protegidos',
    payFeat5: 'Soporte para prendas complejas',
    restorePurchase: 'Restaurar Compra',

    // Profile
    profileTitle: 'Mi Perfil',
    myGallery: 'Mi Galería',
    referralTitle: 'Tu Link de Referido',
    referralDesc: 'Comparte este link y gana créditos extra cuando tus amigos se suscriban.',
    copyLink: 'Copiar Link',
    copied: '¡Copiado!',
    noImages: 'Aún no tienes renders. ¡Prueba tu primero!',
    deleteImage: 'Eliminar',
    plan: 'Plan',
    credits: 'Créditos',
    free: 'Gratis',
    galleryCount: 'renders guardados',
  },
} as const;

type Translations = (typeof translations)[Lang];

type TranslationKeys = { [K in keyof typeof translations.en]: string };

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationKeys;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en as TranslationKeys,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(c => c.startsWith('agalaz-lang='));
    const saved = cookie?.split('=')[1] as Lang | undefined;
    if (saved === 'es' || saved === 'en') {
      setLangState(saved);
    } else {
      const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
      setLangState(browserLang);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    document.cookie = `agalaz-lang=${newLang}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as TranslationKeys }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
