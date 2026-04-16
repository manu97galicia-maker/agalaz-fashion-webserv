// Shared UI strings used across landing pages (tattoo, swimwear, earring).
// These are not specific to any category, so they live in a shared dictionary.

import type { LandingLang } from './landingTranslations';

export interface UiStrings {
  process: string;
  benefits: string;
  useCases: string;
  forBusiness: string;
  topBar: string;
  errGeneration: string;
  errConnection: string;
  emailSent: string;
  emailSentHint: string;
  emailPlaceholder: string;
  send: string;
  orDivider: string;
  cancel: string;
}

const ui: Record<LandingLang, UiStrings> = {
  en: {
    process: 'Process', benefits: 'Benefits', useCases: 'Use cases', forBusiness: 'For business',
    topBar: 'Integrate the simulator on your site',
    errGeneration: 'Generation failed. Try another photo.',
    errConnection: 'Connection error. Try again.',
    emailSent: 'Email sent!', emailSentHint: 'Check your inbox and click the link.',
    emailPlaceholder: 'your@email.com', send: 'Send', orDivider: 'or', cancel: 'Cancel',
  },
  es: {
    process: 'Proceso', benefits: 'Ventajas', useCases: 'Casos de uso', forBusiness: 'Para negocios',
    topBar: 'Integra el simulador en tu web',
    errGeneration: 'No se pudo generar. Intenta con otra foto.',
    errConnection: 'Error de conexión. Inténtalo de nuevo.',
    emailSent: '¡Email enviado!', emailSentHint: 'Revisa tu bandeja de entrada y haz clic en el link.',
    emailPlaceholder: 'tu@email.com', send: 'Enviar', orDivider: 'o', cancel: 'Cancelar',
  },
  fr: {
    process: 'Processus', benefits: 'Avantages', useCases: 'Cas d\'usage', forBusiness: 'Pour entreprises',
    topBar: 'Intégrez le simulateur sur votre site',
    errGeneration: 'Échec de la génération. Essayez une autre photo.',
    errConnection: 'Erreur de connexion. Réessayez.',
    emailSent: 'Email envoyé !', emailSentHint: 'Vérifiez votre boîte mail et cliquez sur le lien.',
    emailPlaceholder: 'votre@email.com', send: 'Envoyer', orDivider: 'ou', cancel: 'Annuler',
  },
  pt: {
    process: 'Processo', benefits: 'Vantagens', useCases: 'Casos de uso', forBusiness: 'Para empresas',
    topBar: 'Integre o simulador no seu site',
    errGeneration: 'Falha ao gerar. Tente outra foto.',
    errConnection: 'Erro de conexão. Tente novamente.',
    emailSent: 'Email enviado!', emailSentHint: 'Verifique sua caixa de entrada e clique no link.',
    emailPlaceholder: 'seu@email.com', send: 'Enviar', orDivider: 'ou', cancel: 'Cancelar',
  },
  de: {
    process: 'Ablauf', benefits: 'Vorteile', useCases: 'Anwendungsfälle', forBusiness: 'Für Unternehmen',
    topBar: 'Integriere den Simulator auf deiner Seite',
    errGeneration: 'Generierung fehlgeschlagen. Versuche ein anderes Foto.',
    errConnection: 'Verbindungsfehler. Versuche es erneut.',
    emailSent: 'E-Mail gesendet!', emailSentHint: 'Prüfe dein Postfach und klicke auf den Link.',
    emailPlaceholder: 'deine@email.com', send: 'Senden', orDivider: 'oder', cancel: 'Abbrechen',
  },
  it: {
    process: 'Processo', benefits: 'Vantaggi', useCases: 'Casi d\'uso', forBusiness: 'Per aziende',
    topBar: 'Integra il simulatore sul tuo sito',
    errGeneration: 'Generazione fallita. Prova un\'altra foto.',
    errConnection: 'Errore di connessione. Riprova.',
    emailSent: 'Email inviata!', emailSentHint: 'Controlla la tua casella e clicca sul link.',
    emailPlaceholder: 'tuo@email.com', send: 'Invia', orDivider: 'oppure', cancel: 'Annulla',
  },
};

export function getUi(lang: LandingLang): UiStrings {
  return ui[lang] || ui.en;
}
