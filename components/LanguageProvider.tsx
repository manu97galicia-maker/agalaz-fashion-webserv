'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export type Lang = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it';

const SUPPORTED_LANGS: ReadonlyArray<Lang> = ['en', 'es', 'fr', 'pt', 'de', 'it'];

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
    precisionError: "We couldn't process your photos. Make sure your body photo is front-facing, full-body (head to feet), and well-lit.",
    updateError: "Couldn't apply the change. Try rephrasing your request or start a new render with different photos.",
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
    activeUsers: '+10.000 usuarios activos',
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
  fr: {
    start: 'Commencer',
    tryNow: 'Essayer maintenant gratuitement',
    howItWorks: 'Comment ça marche',
    heroLine1: 'ESSAYEZ',
    heroLine2: 'AVANT',
    heroLine3: "D'ACHETER.",
    heroDesc: "Téléchargez votre photo et n'importe quel vêtement — voyez comment il vous va sur votre corps réel en un instant.",
    activeUsers: '+10 000 utilisateurs actifs',
    featuresTitle: 'Précision',
    featuresTitleHighlight: 'Chirurgicale',
    featuresSubtitle: 'Moteur de composants V7.0 — chaque pixel préservé, chaque vêtement respecté.',
    feat1Title: 'Préservation Totale',
    feat1Desc: "Votre pantalon, vos chaussures et votre arrière-plan d'origine restent intacts. Nous ne changeons que ce que vous demandez.",
    feat2Title: 'Mappage Facial Réel',
    feat2Desc: 'Agalaz intègre votre identité sur votre corps réel, en respectant vos traits et votre encolure.',
    feat3Title: 'Couleur & Style',
    feat3Desc: "Nous extrayons l'ADN du nouveau vêtement et l'adaptons à votre silhouette sans déformation.",
    stepsTitle: '3 Photos.',
    stepsTitleHighlight: '1 Rendu.',
    step1Label: 'ID Visage',
    step1Desc: 'Téléchargez une photo de votre visage pour le mappage facial.',
    step2Label: 'Photo Pleine',
    step2Desc: 'Une photo en pied — nous préservons tout sauf le vêtement du haut.',
    step3Label: 'Nouveau Vêtement',
    step3Desc: "Téléchargez une photo du vêtement à essayer — nous extrayons sa couleur et son style.",
    ctaLabel: 'Commencer Gratuit',
    ctaTitle: 'Votre Style,',
    ctaTitleHighlight: 'Préservé.',
    ctaDesc: '10 rendus gratuits. Pas de carte. Sans engagement.',
    footerCopy: '© 2025 Agalaz Labs. Moteur de Précision V7.0',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    preserveTitle: 'Essayage',
    preserveHighlight: 'Virtuel.',
    preserveDesc: 'Téléchargez vos photos, choisissez un vêtement et appuyez sur Rendu. Puis utilisez le chat pour affiner : couleur, taille, manches, coupe — tout ce que vous voulez.',
    faceLabel: 'Votre Visage',
    faceHint: 'Selfie de face regardant la caméra',
    bodyLabel: 'Corps Entier',
    clothingLabel: 'Vêtement',
    renderBtn: 'Générer',
    uploadPhoto: 'Téléverser une photo',
    uploadGarment: 'Téléverser le vêtement',
    missingPhotos: 'Téléchargez une photo de votre visage et une photo en pied pour démarrer le rendu.',
    protectingOutfit: 'Génération de votre essayage...',
    engineError: "Une erreur s'est produite. Réessayez — si cela persiste, essayez avec des photos mieux éclairées.",
    precisionError: "Impossible de traiter vos photos. Assurez-vous que la photo du corps est de face, en pied et bien éclairée.",
    updateError: "Impossible d'appliquer la modification. Reformulez votre demande ou recommencez avec d'autres photos.",
    editBtn: 'Modifier',
    chatPlaceholder: 'Ex : "Taille L", "En bleu", "Manches longues"...',
    outfitPreserved: 'Tenue Préservée',
    seamlessId: 'ID Sans Couture',
    segmented: 'Tenue segmentée. Pantalon et arrière-plan préservés.',
    bodyHint: 'Corps entier, de la tête aux pieds, face à la caméra',
    optional: 'optionnel',
    chatTip: 'Après le rendu, utilisez le chat pour demander des changements : couleur, taille, manches, coupe...',
    next: 'Suivant',
    begin: 'Commencer',
    auraPro: 'Agalaz Pro',
    precisionTotal: 'Total',
    precisionTitle: 'Précision',
    getPro: 'Obtenir Pro 4,99 €/mois',
    payFeat1: 'Préservation de la tenue originale',
    payFeat2: 'Mappage facial sans couture',
    payFeat3: '14 rendus par semaine',
    payFeat4: "Arrière-plan et environnement protégés",
    payFeat5: 'Support des vêtements complexes',
    restorePurchase: "Restaurer l'achat",
    profileTitle: 'Mon Profil',
    myGallery: 'Ma Galerie',
    referralTitle: 'Votre lien de parrainage',
    referralDesc: 'Partagez ce lien et gagnez des crédits bonus quand vos amis s\'abonnent.',
    copyLink: 'Copier le lien',
    copied: 'Copié !',
    noImages: "Aucun rendu pour l'instant. Essayez votre premier !",
    deleteImage: 'Supprimer',
    plan: 'Forfait',
    credits: 'Crédits',
    free: 'Gratuit',
    galleryCount: 'rendus enregistrés',
  },
  pt: {
    start: 'Começar',
    tryNow: 'Experimentar agora grátis',
    howItWorks: 'Como funciona',
    heroLine1: 'EXPERIMENTA',
    heroLine2: 'ANTES DE',
    heroLine3: 'COMPRAR.',
    heroDesc: 'Carrega a tua foto e qualquer peça que tenhas ou queiras comprar — vê como te fica no teu corpo real ao instante.',
    activeUsers: '+10.000 utilizadores ativos',
    featuresTitle: 'Precisão',
    featuresTitleHighlight: 'Cirúrgica',
    featuresSubtitle: 'Motor de componentes V7.0 — cada pixel preservado, cada peça respeitada.',
    feat1Title: 'Preservação Total',
    feat1Desc: 'As tuas calças, calçado e fundo original permanecem intactos. Só mudamos o que pedires.',
    feat2Title: 'Mapeamento Facial Real',
    feat2Desc: 'Agalaz integra a tua identidade no teu corpo real, respeitando os teus traços e decote.',
    feat3Title: 'Cor & Estilo',
    feat3Desc: 'Extraímos o ADN da peça nova e adaptamo-lo à tua silhueta sem deformações.',
    stepsTitle: '3 Fotos.',
    stepsTitleHighlight: '1 Render.',
    step1Label: 'ID Rosto',
    step1Desc: 'Carrega uma foto do teu rosto para o mapeamento facial.',
    step2Label: 'Foto Base',
    step2Desc: 'Uma foto de corpo inteiro — preservamos tudo exceto a peça superior.',
    step3Label: 'Peça Nova',
    step3Desc: 'Carrega uma foto da tua peça ou de uma que queiras comprar — extraímos a cor e o estilo.',
    ctaLabel: 'Começar Grátis',
    ctaTitle: 'O teu Estilo,',
    ctaTitleHighlight: 'Preservado.',
    ctaDesc: '10 renders grátis. Sem cartão. Sem compromisso.',
    footerCopy: '© 2025 Agalaz Labs. Motor de Precisão V7.0',
    privacy: 'Privacidade',
    terms: 'Termos',
    preserveTitle: 'Provador',
    preserveHighlight: 'Virtual.',
    preserveDesc: 'Carrega as tuas fotos, escolhe uma peça e clica em Render. Depois usa o chat para ajustar: cor, tamanho, mangas, corte — o que quiseres.',
    faceLabel: 'O teu Rosto',
    faceHint: 'Selfie de frente a olhar para a câmara',
    bodyLabel: 'Corpo Inteiro',
    clothingLabel: 'Peça',
    renderBtn: 'Gerar',
    uploadPhoto: 'Carregar foto',
    uploadGarment: 'Carregar peça',
    missingPhotos: 'Carrega uma foto do rosto e uma de corpo inteiro para começar o render.',
    protectingOutfit: 'A gerar a tua prova...',
    engineError: 'Algo correu mal. Tenta novamente — se continuar, usa fotos com melhor iluminação.',
    precisionError: 'Não conseguimos processar as tuas fotos. Verifica que a foto de corpo é frontal, de corpo inteiro e bem iluminada.',
    updateError: 'Não conseguimos aplicar a alteração. Reformula o pedido ou começa um novo render com outras fotos.',
    editBtn: 'Editar',
    chatPlaceholder: 'Ex: "Tamanho L", "Em azul", "Manga comprida"...',
    outfitPreserved: 'Outfit Preservado',
    seamlessId: 'Seamless ID',
    segmented: 'Outfit segmentado. Calças e fundo preservados.',
    bodyHint: 'Corpo inteiro, da cabeça aos pés, virado para a câmara',
    optional: 'opcional',
    chatTip: 'Após o render, usa o chat para pedir alterações: cor, tamanho, mangas, corte...',
    next: 'Seguinte',
    begin: 'Começar',
    auraPro: 'Agalaz Pro',
    precisionTotal: 'Total',
    precisionTitle: 'Precisão',
    getPro: 'Obter Pro 4,99 €/mês',
    payFeat1: 'Preservação do outfit original',
    payFeat2: 'Mapeamento facial sem costuras',
    payFeat3: '14 renders por semana',
    payFeat4: 'Fundo e ambiente protegidos',
    payFeat5: 'Suporte para peças complexas',
    restorePurchase: 'Restaurar Compra',
    profileTitle: 'O Meu Perfil',
    myGallery: 'A Minha Galeria',
    referralTitle: 'O Teu Link de Referência',
    referralDesc: 'Partilha este link e ganha créditos extra quando os teus amigos subscreverem.',
    copyLink: 'Copiar Link',
    copied: 'Copiado!',
    noImages: 'Ainda não tens renders. Experimenta o primeiro!',
    deleteImage: 'Eliminar',
    plan: 'Plano',
    credits: 'Créditos',
    free: 'Grátis',
    galleryCount: 'renders guardados',
  },
  de: {
    start: 'Loslegen',
    tryNow: 'Jetzt kostenlos ausprobieren',
    howItWorks: "So funktioniert's",
    heroLine1: 'PROBIER',
    heroLine2: 'VOR DEM',
    heroLine3: 'KAUF.',
    heroDesc: 'Lade dein Foto und ein beliebiges Kleidungsstück hoch — sieh sofort, wie es an deinem echten Körper aussieht.',
    activeUsers: '+10.000 aktive Nutzer',
    featuresTitle: 'Chirurgische',
    featuresTitleHighlight: 'Präzision',
    featuresSubtitle: 'Component Engine V7.0 — jedes Pixel erhalten, jedes Kleidungsstück respektiert.',
    feat1Title: 'Vollständige Erhaltung',
    feat1Desc: 'Deine Hose, Schuhe und der ursprüngliche Hintergrund bleiben unberührt. Wir ändern nur, was du verlangst.',
    feat2Title: 'Echte Gesichtsabbildung',
    feat2Desc: 'Agalaz integriert deine Identität auf deinem echten Körper und respektiert deine Züge und Halslinie.',
    feat3Title: 'Farbe & Stil',
    feat3Desc: 'Wir extrahieren die DNA des neuen Kleidungsstücks und passen es ohne Verzerrung an deine Silhouette an.',
    stepsTitle: '3 Fotos.',
    stepsTitleHighlight: '1 Rendering.',
    step1Label: 'Gesichts-ID',
    step1Desc: 'Lade ein Foto deines Gesichts für die Gesichtsabbildung hoch.',
    step2Label: 'Basis-Foto',
    step2Desc: 'Ein Ganzkörperfoto — wir bewahren alles außer dem Oberteil.',
    step3Label: 'Neues Kleidungsstück',
    step3Desc: 'Lade ein Foto deines Kleidungsstücks hoch — wir extrahieren Farbe und Stil.',
    ctaLabel: 'Kostenlos starten',
    ctaTitle: 'Dein Stil,',
    ctaTitleHighlight: 'erhalten.',
    ctaDesc: '10 kostenlose Renderings. Keine Kreditkarte. Keine Verpflichtung.',
    footerCopy: '© 2025 Agalaz Labs. Precision Engine V7.0',
    privacy: 'Datenschutz',
    terms: 'AGB',
    preserveTitle: 'Virtuelle',
    preserveHighlight: 'Anprobe.',
    preserveDesc: 'Lade deine Fotos hoch, wähle ein Kleidungsstück und klicke auf Rendern. Nutze dann den Chat für Anpassungen: Farbe, Größe, Ärmel, Passform — alles, was du willst.',
    faceLabel: 'Dein Gesicht',
    faceHint: 'Frontaler Selfie mit Blick in die Kamera',
    bodyLabel: 'Ganzer Körper',
    clothingLabel: 'Kleidungsstück',
    renderBtn: 'Rendern',
    uploadPhoto: 'Foto hochladen',
    uploadGarment: 'Kleidungsstück hochladen',
    missingPhotos: 'Lade ein Gesichtsfoto und ein Ganzkörperfoto hoch, um zu starten.',
    protectingOutfit: 'Anprobe wird generiert...',
    engineError: 'Etwas ist schiefgelaufen. Versuche es erneut — wenn es weiter fehlschlägt, verwende besser beleuchtete Fotos.',
    precisionError: 'Wir konnten deine Fotos nicht verarbeiten. Stelle sicher, dass das Körperfoto frontal, ganz und gut beleuchtet ist.',
    updateError: 'Änderung konnte nicht angewendet werden. Formuliere deine Anfrage neu oder starte mit anderen Fotos.',
    editBtn: 'Bearbeiten',
    chatPlaceholder: 'Z.B. "Größe L", "In Blau", "Lange Ärmel"...',
    outfitPreserved: 'Outfit erhalten',
    seamlessId: 'Seamless ID',
    segmented: 'Outfit segmentiert. Hose und Hintergrund erhalten.',
    bodyHint: 'Ganzkörper, von Kopf bis Fuß, der Kamera zugewandt',
    optional: 'optional',
    chatTip: 'Nach dem Rendering nutze den Chat für Änderungen: Farbe, Größe, Ärmel, Passform...',
    next: 'Weiter',
    begin: 'Beginnen',
    auraPro: 'Agalaz Pro',
    precisionTotal: 'Total',
    precisionTitle: 'Präzision',
    getPro: 'Pro holen 4,99 €/Mon.',
    payFeat1: 'Erhaltung des Original-Outfits',
    payFeat2: 'Nahtlose Gesichtsabbildung',
    payFeat3: '14 Renderings pro Woche',
    payFeat4: 'Hintergrund & Umgebung geschützt',
    payFeat5: 'Unterstützung für komplexe Kleidungsstücke',
    restorePurchase: 'Kauf wiederherstellen',
    profileTitle: 'Mein Profil',
    myGallery: 'Meine Galerie',
    referralTitle: 'Dein Empfehlungslink',
    referralDesc: 'Teile diesen Link und erhalte Bonus-Credits, wenn Freunde abonnieren.',
    copyLink: 'Link kopieren',
    copied: 'Kopiert!',
    noImages: 'Noch keine Renderings. Probiere dein erstes!',
    deleteImage: 'Löschen',
    plan: 'Plan',
    credits: 'Credits',
    free: 'Kostenlos',
    galleryCount: 'gespeicherte Renderings',
  },
  it: {
    start: 'Inizia',
    tryNow: 'Provalo gratis',
    howItWorks: 'Come funziona',
    heroLine1: 'PROVA',
    heroLine2: 'PRIMA DI',
    heroLine3: 'COMPRARE.',
    heroDesc: 'Carica la tua foto e qualsiasi capo che hai o vuoi comprare — vedi come ti sta sul corpo reale all\'istante.',
    activeUsers: '+10.000 utenti attivi',
    featuresTitle: 'Precisione',
    featuresTitleHighlight: 'Chirurgica',
    featuresSubtitle: 'Component Engine V7.0 — ogni pixel preservato, ogni capo rispettato.',
    feat1Title: 'Preservazione Totale',
    feat1Desc: 'I tuoi pantaloni, scarpe e sfondo originale rimangono intatti. Cambiamo solo ciò che chiedi.',
    feat2Title: 'Mappatura Facciale Reale',
    feat2Desc: 'Agalaz integra la tua identità sul tuo corpo reale, rispettando i tuoi tratti e la scollatura.',
    feat3Title: 'Colore & Stile',
    feat3Desc: "Estraiamo il DNA del nuovo capo e lo adattiamo alla tua silhouette senza deformazioni.",
    stepsTitle: '3 Foto.',
    stepsTitleHighlight: '1 Render.',
    step1Label: 'ID Volto',
    step1Desc: 'Carica una foto del tuo volto per la mappatura facciale.',
    step2Label: 'Foto Base',
    step2Desc: 'Una foto a figura intera — preserviamo tutto tranne il capo superiore.',
    step3Label: 'Nuovo Capo',
    step3Desc: 'Carica una foto del tuo capo o uno che vuoi comprare — estraiamo colore e stile.',
    ctaLabel: 'Inizia Gratis',
    ctaTitle: 'Il tuo stile,',
    ctaTitleHighlight: 'preservato.',
    ctaDesc: '10 render gratis. Senza carta. Senza impegno.',
    footerCopy: '© 2025 Agalaz Labs. Motore di Precisione V7.0',
    privacy: 'Privacy',
    terms: 'Termini',
    preserveTitle: 'Prova',
    preserveHighlight: 'Virtuale.',
    preserveDesc: 'Carica le tue foto, scegli un capo e premi Render. Poi usa la chat per affinare: colore, taglia, maniche, vestibilità — qualsiasi cosa.',
    faceLabel: 'Il tuo Volto',
    faceHint: 'Selfie frontale guardando la fotocamera',
    bodyLabel: 'Corpo Intero',
    clothingLabel: 'Capo',
    renderBtn: 'Render',
    uploadPhoto: 'Carica foto',
    uploadGarment: 'Carica capo',
    missingPhotos: 'Carica una foto del volto e una a figura intera per iniziare.',
    protectingOutfit: 'Generazione della prova...',
    engineError: "Qualcosa è andato storto. Riprova — se continua, usa foto con luce migliore.",
    precisionError: 'Non siamo riusciti a elaborare le foto. Assicurati che la foto del corpo sia frontale, intera e ben illuminata.',
    updateError: 'Modifica non applicata. Riformula la richiesta o inizia un nuovo render con altre foto.',
    editBtn: 'Modifica',
    chatPlaceholder: 'Es: "Taglia L", "In blu", "Manica lunga"...',
    outfitPreserved: 'Outfit Preservato',
    seamlessId: 'Seamless ID',
    segmented: 'Outfit segmentato. Pantaloni e sfondo preservati.',
    bodyHint: 'Corpo intero, dalla testa ai piedi, di fronte alla fotocamera',
    optional: 'opzionale',
    chatTip: 'Dopo il render, usa la chat per chiedere modifiche: colore, taglia, maniche, vestibilità...',
    next: 'Avanti',
    begin: 'Inizia',
    auraPro: 'Agalaz Pro',
    precisionTotal: 'Total',
    precisionTitle: 'Precisione',
    getPro: 'Ottieni Pro 4,99 €/mese',
    payFeat1: 'Preservazione outfit originale',
    payFeat2: 'Mappatura facciale senza giunzioni',
    payFeat3: '14 render a settimana',
    payFeat4: 'Sfondo e ambiente protetti',
    payFeat5: 'Supporto per capi complessi',
    restorePurchase: 'Ripristina acquisto',
    profileTitle: 'Il mio profilo',
    myGallery: 'La mia galleria',
    referralTitle: 'Il tuo link referral',
    referralDesc: 'Condividi questo link e guadagna crediti bonus quando i tuoi amici si iscrivono.',
    copyLink: 'Copia link',
    copied: 'Copiato!',
    noImages: 'Ancora nessun render. Prova il primo!',
    deleteImage: 'Elimina',
    plan: 'Piano',
    credits: 'Crediti',
    free: 'Gratis',
    galleryCount: 'render salvati',
  },
} as const;

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

function detectLangFromPath(pathname: string | null): Lang | null {
  if (!pathname) return null;
  const seg = pathname.split('/')[1];
  if (seg === 'es' || seg === 'fr' || seg === 'pt' || seg === 'de' || seg === 'it') {
    return seg;
  }
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Path-based detection runs on every render so /es/try-on always renders in ES, etc.
  const pathLang = detectLangFromPath(pathname);

  const [lang, setLangState] = useState<Lang>(pathLang ?? 'en');

  useEffect(() => {
    // Path always wins. Otherwise fall back to cookie or browser language.
    if (pathLang) {
      setLangState(pathLang);
      return;
    }
    const cookie = document.cookie.split('; ').find((c) => c.startsWith('agalaz-lang='));
    const saved = cookie?.split('=')[1] as Lang | undefined;
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      setLangState(saved);
      return;
    }
    const browserPrefix = navigator.language.slice(0, 2).toLowerCase();
    const detected = SUPPORTED_LANGS.find((l) => l === browserPrefix);
    setLangState(detected ?? 'en');
  }, [pathLang]);

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

/**
 * Helper for inline ternaries that need translations in all 6 languages.
 * Falls back to EN if a translation is not provided. Pass strings in the canonical en/es/fr/pt/de/it order.
 *
 * Example:
 *   {pickLang(lang, 'Hello', 'Hola', 'Bonjour', 'Olá', 'Hallo', 'Ciao')}
 */
export function pickLang<T>(lang: Lang, en: T, es: T, fr?: T, pt?: T, de?: T, it?: T): T {
  switch (lang) {
    case 'es':
      return es;
    case 'fr':
      return fr ?? en;
    case 'pt':
      return pt ?? en;
    case 'de':
      return de ?? en;
    case 'it':
      return it ?? en;
    default:
      return en;
  }
}
