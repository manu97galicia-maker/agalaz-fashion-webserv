'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Sparkles, Loader2, X, ArrowRight, Download } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { signInWithGoogle, signInWithOtp } from '@/services/authService';
import { track } from '@/lib/analytics';

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

interface Props {
  category: DemoCategory;
  lang: DemoLang;
  /** override the default product label, e.g. "Wedding dress" instead of generic "Product" */
  productLabel?: string;
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
  uploadCta: string;
  // Login modal
  signInTitle: string;
  signInSubtitle: string;
  signInGoogle: string;
  signInOr: string;
  signInEmailPlaceholder: string;
  signInEmailSend: string;
  signInEmailSent: string;
  signInEmailSentHint: string;
  signInCancel: string;
}> = {
  en: {
    sectionTitle: 'Try it free now',
    sectionSubtitle: 'Sign in and get one free HD render every day. Upload your photo + the product you want to try.',
    yourPhoto: 'Your photo',
    yourPhotoHint: 'A clear photo of you, well-lit',
    productPhoto: 'Product',
    productPhotoHint: 'Photo or screenshot of the item',
    generate: 'Generate HD',
    generating: 'Generating…',
    result: 'Your result',
    download: 'Download HD',
    buyMore: 'Get more renders',
    tryAnother: 'Try another',
    errorGeneric: 'Generation failed. Try a different photo.',
    errorRate: 'Please wait a moment and try again.',
    errorMissing: 'Upload both photos first.',
    errorCaptcha: 'Verification failed. Please refresh and try again.',
    uploadCta: 'Click to upload',
    signInTitle: 'Sign in for your free HD render',
    signInSubtitle: 'One free HD render every day. No card, no spam.',
    signInGoogle: 'Continue with Google',
    signInOr: 'or',
    signInEmailPlaceholder: 'your@email.com',
    signInEmailSend: 'Send link',
    signInEmailSent: 'Check your inbox',
    signInEmailSentHint: 'We sent you a magic link. Click it to sign in.',
    signInCancel: 'Cancel',
  },
  es: {
    sectionTitle: 'Pruébalo gratis ahora',
    sectionSubtitle: 'Inicia sesión y consigue un render HD gratis cada día. Sube tu foto + el producto que quieres probar.',
    yourPhoto: 'Tu foto',
    yourPhotoHint: 'Una foto clara tuya, bien iluminada',
    productPhoto: 'Producto',
    productPhotoHint: 'Foto o captura del artículo',
    generate: 'Generar HD',
    generating: 'Generando…',
    result: 'Tu resultado',
    download: 'Descargar HD',
    buyMore: 'Más renders',
    tryAnother: 'Probar otro',
    errorGeneric: 'Falló la generación. Prueba con otra foto.',
    errorRate: 'Espera un momento e inténtalo de nuevo.',
    errorMissing: 'Sube primero las dos fotos.',
    errorCaptcha: 'Fallo de verificación. Recarga e inténtalo de nuevo.',
    uploadCta: 'Pulsa para subir',
    signInTitle: 'Inicia sesión para tu render HD gratis',
    signInSubtitle: 'Un render HD gratis cada día. Sin tarjeta, sin spam.',
    signInGoogle: 'Continuar con Google',
    signInOr: 'o',
    signInEmailPlaceholder: 'tu@email.com',
    signInEmailSend: 'Enviar enlace',
    signInEmailSent: 'Revisa tu correo',
    signInEmailSentHint: 'Te enviamos un enlace mágico. Haz clic para entrar.',
    signInCancel: 'Cancelar',
  },
  fr: {
    sectionTitle: 'Essayez gratuitement maintenant',
    sectionSubtitle: 'Connectez-vous et obtenez un rendu HD gratuit chaque jour. Téléchargez votre photo + le produit.',
    yourPhoto: 'Votre photo',
    yourPhotoHint: 'Une photo claire, bien éclairée',
    productPhoto: 'Produit',
    productPhotoHint: "Photo ou capture de l'article",
    generate: 'Générer HD',
    generating: 'Génération…',
    result: 'Votre résultat',
    download: 'Télécharger HD',
    buyMore: 'Plus de rendus',
    tryAnother: 'Essayer un autre',
    errorGeneric: 'Échec de la génération. Essayez une autre photo.',
    errorRate: 'Patientez un instant puis réessayez.',
    errorMissing: "Téléchargez d'abord les deux photos.",
    errorCaptcha: 'Vérification échouée. Rafraîchissez et réessayez.',
    uploadCta: 'Cliquez pour téléverser',
    signInTitle: 'Connectez-vous pour votre rendu HD gratuit',
    signInSubtitle: 'Un rendu HD gratuit chaque jour. Sans carte, sans spam.',
    signInGoogle: 'Continuer avec Google',
    signInOr: 'ou',
    signInEmailPlaceholder: 'votre@email.com',
    signInEmailSend: 'Envoyer le lien',
    signInEmailSent: 'Vérifiez votre boîte',
    signInEmailSentHint: 'Nous avons envoyé un lien magique. Cliquez pour vous connecter.',
    signInCancel: 'Annuler',
  },
  pt: {
    sectionTitle: 'Experimente grátis agora',
    sectionSubtitle: 'Inicia sessão e obtém um render HD grátis todos os dias. Carrega a tua foto + o produto.',
    yourPhoto: 'A tua foto',
    yourPhotoHint: 'Uma foto clara, bem iluminada',
    productPhoto: 'Produto',
    productPhotoHint: 'Foto ou captura do artigo',
    generate: 'Gerar HD',
    generating: 'A gerar…',
    result: 'O teu resultado',
    download: 'Descarregar HD',
    buyMore: 'Mais renders',
    tryAnother: 'Tentar outro',
    errorGeneric: 'Falha na geração. Tenta outra foto.',
    errorRate: 'Aguarda um momento e tenta novamente.',
    errorMissing: 'Carrega primeiro as duas fotos.',
    errorCaptcha: 'Verificação falhou. Recarrega e tenta novamente.',
    uploadCta: 'Clica para carregar',
    signInTitle: 'Inicia sessão para o teu render HD grátis',
    signInSubtitle: 'Um render HD grátis todos os dias. Sem cartão, sem spam.',
    signInGoogle: 'Continuar com Google',
    signInOr: 'ou',
    signInEmailPlaceholder: 'o-teu@email.com',
    signInEmailSend: 'Enviar link',
    signInEmailSent: 'Verifica a tua caixa',
    signInEmailSentHint: 'Enviámos um link mágico. Clica para entrar.',
    signInCancel: 'Cancelar',
  },
  de: {
    sectionTitle: 'Jetzt kostenlos ausprobieren',
    sectionSubtitle: 'Melde dich an und hol dir jeden Tag einen kostenlosen HD-Render. Lade dein Foto + Produkt hoch.',
    yourPhoto: 'Dein Foto',
    yourPhotoHint: 'Ein klares, gut beleuchtetes Foto',
    productPhoto: 'Produkt',
    productPhotoHint: 'Foto oder Screenshot des Artikels',
    generate: 'HD generieren',
    generating: 'Wird generiert…',
    result: 'Dein Ergebnis',
    download: 'HD herunterladen',
    buyMore: 'Mehr Renders',
    tryAnother: 'Anderes versuchen',
    errorGeneric: 'Generierung fehlgeschlagen. Anderes Foto versuchen.',
    errorRate: 'Bitte einen Moment warten und erneut versuchen.',
    errorMissing: 'Zuerst beide Fotos hochladen.',
    errorCaptcha: 'Verifizierung fehlgeschlagen. Seite neu laden und erneut versuchen.',
    uploadCta: 'Zum Hochladen klicken',
    signInTitle: 'Anmelden für deinen kostenlosen HD-Render',
    signInSubtitle: 'Ein kostenloser HD-Render jeden Tag. Keine Karte, kein Spam.',
    signInGoogle: 'Mit Google fortfahren',
    signInOr: 'oder',
    signInEmailPlaceholder: 'deine@email.com',
    signInEmailSend: 'Link senden',
    signInEmailSent: 'Posteingang prüfen',
    signInEmailSentHint: 'Wir haben dir einen Magic Link geschickt. Klicke ihn an.',
    signInCancel: 'Abbrechen',
  },
  it: {
    sectionTitle: 'Provalo gratis ora',
    sectionSubtitle: 'Accedi e ottieni un render HD gratuito ogni giorno. Carica la tua foto + il prodotto.',
    yourPhoto: 'La tua foto',
    yourPhotoHint: 'Una foto chiara, ben illuminata',
    productPhoto: 'Prodotto',
    productPhotoHint: "Foto o screenshot dell'articolo",
    generate: 'Genera HD',
    generating: 'Generando…',
    result: 'Il tuo risultato',
    download: 'Scarica HD',
    buyMore: 'Più render',
    tryAnother: 'Prova un altro',
    errorGeneric: 'Generazione fallita. Prova un altra foto.',
    errorRate: 'Attendi un momento e riprova.',
    errorMissing: 'Carica prima entrambe le foto.',
    errorCaptcha: 'Verifica fallita. Ricarica e riprova.',
    uploadCta: 'Clicca per caricare',
    signInTitle: 'Accedi per il tuo render HD gratuito',
    signInSubtitle: 'Un render HD gratuito ogni giorno. Senza carta, senza spam.',
    signInGoogle: 'Continua con Google',
    signInOr: 'o',
    signInEmailPlaceholder: 'tua@email.com',
    signInEmailSend: 'Invia link',
    signInEmailSent: 'Controlla la tua casella',
    signInEmailSentHint: 'Ti abbiamo inviato un link magico. Cliccalo per accedere.',
    signInCancel: 'Annulla',
  },
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

// localStorage key used to survive the auth redirect (Google or OTP magic
// link). Saved BEFORE the user clicks Continue/Send and restored on mount
// once the auth listener confirms a session — at which point the queued
// generation fires automatically.
const PENDING_DEMO_KEY = 'agalaz_demo_pending';
const PENDING_TTL_MS = 30 * 60 * 1000; // 30 minutes

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
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
      {src ? (
        <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={label} className="w-full h-full object-cover" />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
            aria-label="Clear"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => ref.current?.click()}
          className="w-full aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors flex flex-col items-center justify-center gap-2 text-slate-400"
        >
          <Upload size={24} />
          <span className="text-xs font-bold uppercase tracking-widest">{uploadCta}</span>
          <span className="text-[10px] font-light px-3 text-center">{hint}</span>
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" onChange={onChange} className="hidden" />
    </div>
  );
}

export default function TryOnDemoBlock({ category, lang, productLabel }: Props) {
  const t = LABELS[lang];
  const [userImage, setUserImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth state — required to call /api/demo. We listen so the modal closes
  // automatically when the user completes login from another tab/window.
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  // Pending generation — set when the user clicks Generate before being
  // authenticated. After login completes we kick it off automatically so the
  // user doesn't have to click Generate twice.
  const [pendingGenerate, setPendingGenerate] = useState(false);

  // Cloudflare Turnstile token. Refreshed after each generate so a token can
  // only be redeemed once (matches CF's recommended flow).
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    );
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
      setAuthChecked(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
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

  // Load Turnstile script once, then render the widget invisibly.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const w = window as any;
    function renderWidget() {
      if (!w.turnstile || !turnstileRef.current || turnstileWidgetIdRef.current) return;
      turnstileWidgetIdRef.current = w.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        size: 'invisible',
        callback: (token: string) => setTurnstileToken(token),
        'error-callback': () => setTurnstileToken(null),
        'expired-callback': () => setTurnstileToken(null),
      });
    }
    if (w.turnstile) {
      renderWidget();
    } else if (!document.querySelector('script[data-agalaz-turnstile]')) {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-agalaz-turnstile', '1');
      s.onload = () => renderWidget();
      document.head.appendChild(s);
    } else {
      // Script tag was added by another instance of the component; poll briefly.
      const id = setInterval(() => {
        if ((window as any).turnstile) {
          clearInterval(id);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(id);
    }
  }, []);

  // After a successful generate, reset the token so the next attempt requires
  // a fresh challenge (CF tokens are single-use anyway).
  function refreshTurnstile() {
    const w = window as any;
    if (w.turnstile && turnstileWidgetIdRef.current) {
      try { w.turnstile.reset(turnstileWidgetIdRef.current); } catch {}
    }
    setTurnstileToken(null);
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
    setResultImage(null);
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
          turnstileToken,
        }),
      });
      if (res.status === 401) {
        // Edge case: cookie expired between mount and click. Re-prompt login.
        setShowLogin(true);
        setIsLoading(false);
        return;
      }
      if (res.status === 402) {
        // Daily free already used and no paid credits left.
        window.location.href = `/paywall?from=demo&category=${encodeURIComponent(category || '')}`;
        return;
      }
      if (res.status === 403) {
        setError(t.errorCaptcha);
        refreshTurnstile();
        setIsLoading(false);
        return;
      }
      if (res.status === 429) {
        setError(t.errorRate);
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      if (data.image) {
        setResultImage(data.image);
        track('render_complete', { source: 'demo', category, pool: data.source || 'unknown' });
      } else {
        setError(data.error || t.errorGeneric);
      }
    } catch {
      setError(t.errorGeneric);
    }
    refreshTurnstile();
    setIsLoading(false);
  }

  async function handleGenerate() {
    if (!userImage || !productImage) {
      setError(t.errorMissing);
      return;
    }
    if (!authChecked) return;
    if (!userId) {
      // Login first; runGenerate will fire automatically once auth state changes.
      setPendingGenerate(true);
      setShowLogin(true);
      track('signup_click', { provider: 'modal_open', source: 'demo', category });
      return;
    }
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
    if (!otpEmail || !otpEmail.includes('@')) return;
    try {
      track('signup_click', { provider: 'email', source: 'demo' });
      savePendingForAuth();
      await signInWithOtp(otpEmail, typeof window !== 'undefined' ? window.location.pathname : '/');
      setOtpSent(true);
    } catch {}
  }

  function reset() {
    setResultImage(null);
    setError(null);
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

  return (
    <section id="try-it" className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border-y border-slate-100 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Sparkles size={12} />
            {t.sectionTitle}
          </span>
          <p className="text-slate-500 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {!resultImage && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <ImageDropzone
                label={t.yourPhoto}
                hint={t.yourPhotoHint}
                uploadCta={t.uploadCta}
                src={userImage}
                onChange={handleFile(setUserImage)}
                onClear={() => setUserImage(null)}
              />
              <ImageDropzone
                label={productLabel || t.productPhoto}
                hint={t.productPhotoHint}
                uploadCta={t.uploadCta}
                src={productImage}
                onChange={handleFile(setProductImage)}
                onClear={() => setProductImage(null)}
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !userImage || !productImage}
                className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {isLoading ? t.generating : t.generate}
                {!isLoading && <ArrowRight size={14} />}
              </button>
              {error && <p className="text-xs text-rose-600 font-light">{error}</p>}
            </div>
          </>
        )}

        {resultImage && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.result}</span>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultImage} alt={t.result} className="w-full h-auto" />
            </div>
            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                onClick={downloadResult}
                className="w-full max-w-sm inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors"
              >
                <Download size={14} />
                {t.download}
              </button>
              <Link
                href="/paywall"
                className="w-full max-w-sm inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-colors"
              >
                <Sparkles size={14} />
                {t.buyMore}
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={reset}
                className="text-xs text-slate-400 font-light hover:text-slate-600 transition-colors"
              >
                {t.tryAnother}
              </button>
            </div>
          </div>
        )}

        {/* Cloudflare Turnstile mounting point — invisible widget, no UI */}
        <div ref={turnstileRef} className="hidden" />
      </div>

      {/* Login modal — only shown if user clicks Generate without auth */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in p-4"
          onClick={() => { setShowLogin(false); setPendingGenerate(false); }}
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
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-bold text-emerald-600">{t.signInEmailSent}</p>
                <p className="text-xs text-slate-500 mt-1">{t.signInEmailSentHint}</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={otpEmail}
                  onChange={(e) => setOtpEmail(e.target.value)}
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
            )}

            <button
              onClick={() => { setShowLogin(false); setPendingGenerate(false); setOtpSent(false); setOtpEmail(''); }}
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
