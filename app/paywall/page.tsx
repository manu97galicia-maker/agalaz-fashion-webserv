'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Check, Shield, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { signInWithGoogle, signInWithOtp } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';
import { track } from '@/lib/analytics';

type Plan = 'test' | 'popular';

// Promo codes displayed in the paywall countdown banners. Users paste at
// Stripe checkout (allow_promotion_codes: true is set server-side).
//   AGALAZ15 — 15% off Style Pro (popular plan)
//   HELLO    — 10% off Starter (test plan), one-time
// If you rename either coupon in Stripe, update these constants AND the
// promo_code IDs in dashboard (promo_1TVwZcDa1RAThL32 etc.).
const STYLE_PRO_PROMO_CODE = 'AGALAZ15';
const STARTER_PROMO_CODE = 'HELLO';
// Countdown duration: 2 minutes 8 seconds. Resets per paywall mount so the
// urgency banner is always ticking when a user opens the page. (Tried session-
// storage persistence but expired sessions hid the banner from returning
// visitors which kills conversion.)
const COUNTDOWN_SECONDS = 2 * 60 + 8;

// Full 6-language localisation for the paywall. AGALAZ15 / HELLO are
// brand constants and intentionally NEVER translated. Currency is always
// USD ("$") because Stripe is configured in USD across all locales.
type PaywallLang = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it';
const PAYWALL_COPY: Record<PaywallLang, {
  heroTitle: string; heroHighlight: string; heroSubtitle: string;
  features: string[];
  starterLabel: string; starterRenders: string; starterSub: string; starterBadge: string;
  proLabel: string; proRenders: string; proSub: string; proBadge: string; proPillBadge: string;
  oneTime: string;
  banner15: string; banner10: string; tapCopy: string; copied: string;
  onlyValidPro: string; onlyValidStarter: string;
  loading: string; buyNow: string;
  trustLine: string;
  signInTitle: string; signInSubtitle: string; signInGoogle: string;
  or: string; emailPlaceholder: string; sendBtn: string;
  inboxTitle: string; inboxHint: string; cancel: string;
}> = {
  en: {
    heroTitle: 'Try It', heroHighlight: 'On You.',
    heroSubtitle: 'Clothing, glasses, jewelry, tattoos — see how anything looks on your real body before you buy. One-time purchase, no subscription.',
    features: ['Credits never expire', 'Clothing, glasses, jewelry, tattoos & more', 'AI chat to adjust size, color, fit', 'Download & share your renders', 'Buy again anytime — no subscription'],
    starterLabel: 'Starter', starterRenders: '8 HD renders', starterSub: '$0.62 per render', starterBadge: 'MOST POPULAR',
    proLabel: 'Pro', proRenders: '15 + 5 free = 20 HD', proSub: `$0.50 per render · 15% off with ${STYLE_PRO_PROMO_CODE}`, proBadge: '🎁 +5 FREE', proPillBadge: 'BEST VALUE',
    oneTime: 'one-time',
    banner15: '15% OFF · expires in', banner10: '10% OFF · expires in', tapCopy: 'Tap to copy', copied: 'Copied!',
    onlyValidPro: 'Only valid for Style Pro', onlyValidStarter: 'Only valid for Starter',
    loading: 'Loading…', buyNow: 'Buy Now',
    trustLine: 'One-time payment · Credits never expire · Secure via Stripe',
    signInTitle: 'Sign in first', signInSubtitle: 'Sign in to start your free trial', signInGoogle: 'Continue with Google',
    or: 'or', emailPlaceholder: 'your@email.com', sendBtn: 'Send',
    inboxTitle: 'Check your inbox', inboxHint: 'We sent you a magic link. Click it to sign in.', cancel: 'Cancel',
  },
  es: {
    heroTitle: 'Pruébatelo', heroHighlight: 'Todo.',
    heroSubtitle: 'Ropa, gafas, joyería, tatuajes — mira cómo te queda cualquier cosa en tu cuerpo real antes de comprar. Pago único, sin suscripción.',
    features: ['Créditos sin caducidad', 'Ropa, gafas, joyería, tatuajes y más', 'Chat IA para ajustar talla, color, ajuste', 'Descarga y comparte tus renders', 'Vuelve a comprar cuando quieras — sin suscripción'],
    starterLabel: 'Starter', starterRenders: '8 renders HD', starterSub: '$0,62 por render', starterBadge: 'MÁS POPULAR',
    proLabel: 'Pro', proRenders: '15 + 5 gratis = 20 HD', proSub: `$0,50 por render · 15% off con ${STYLE_PRO_PROMO_CODE}`, proBadge: '🎁 +5 GRATIS', proPillBadge: 'MEJOR VALOR',
    oneTime: 'pago único',
    banner15: '15% OFF · caduca en', banner10: '10% OFF · caduca en', tapCopy: 'Pulsa para copiar', copied: '¡Copiado!',
    onlyValidPro: 'Solo válido para Style Pro', onlyValidStarter: 'Solo válido para Starter',
    loading: 'Cargando…', buyNow: 'Comprar Ahora',
    trustLine: 'Pago único · Créditos sin caducidad · Seguro con Stripe',
    signInTitle: 'Inicia sesión', signInSubtitle: 'Inicia sesión para empezar tu prueba gratis', signInGoogle: 'Continuar con Google',
    or: 'o', emailPlaceholder: 'tu@email.com', sendBtn: 'Enviar',
    inboxTitle: 'Revisa tu correo', inboxHint: 'Te enviamos un enlace mágico. Haz clic para entrar.', cancel: 'Cancelar',
  },
  fr: {
    heroTitle: 'Essayez-le', heroHighlight: 'sur Vous.',
    heroSubtitle: 'Vêtements, lunettes, bijoux, tatouages — voyez comment tout cela vous va sur votre corps réel avant d\'acheter. Achat unique, sans abonnement.',
    features: ['Crédits sans expiration', 'Vêtements, lunettes, bijoux, tatouages et plus', 'Chat IA pour ajuster taille, couleur, coupe', 'Téléchargez et partagez vos rendus', 'Achetez à nouveau quand vous voulez — sans abonnement'],
    starterLabel: 'Starter', starterRenders: '8 rendus HD', starterSub: '0,62 $ par rendu', starterBadge: 'PLUS POPULAIRE',
    proLabel: 'Pro', proRenders: '15 + 5 gratuits = 20 HD', proSub: `0,50 $ par rendu · 15% off avec ${STYLE_PRO_PROMO_CODE}`, proBadge: '🎁 +5 GRATUITS', proPillBadge: 'MEILLEUR PRIX',
    oneTime: 'achat unique',
    banner15: '15% OFF · expire dans', banner10: '10% OFF · expire dans', tapCopy: 'Cliquer pour copier', copied: 'Copié !',
    onlyValidPro: 'Valable uniquement pour Style Pro', onlyValidStarter: 'Valable uniquement pour Starter',
    loading: 'Chargement…', buyNow: 'Acheter',
    trustLine: 'Paiement unique · Crédits sans expiration · Sécurisé via Stripe',
    signInTitle: 'Connectez-vous', signInSubtitle: 'Connectez-vous pour commencer votre essai gratuit', signInGoogle: 'Continuer avec Google',
    or: 'ou', emailPlaceholder: 'votre@email.com', sendBtn: 'Envoyer',
    inboxTitle: 'Vérifiez votre boîte', inboxHint: 'Nous vous avons envoyé un lien magique. Cliquez pour vous connecter.', cancel: 'Annuler',
  },
  pt: {
    heroTitle: 'Experimenta', heroHighlight: 'em Ti.',
    heroSubtitle: 'Roupa, óculos, joias, tatuagens — vê como te fica qualquer coisa no teu corpo real antes de comprar. Compra única, sem assinatura.',
    features: ['Créditos sem expiração', 'Roupa, óculos, joias, tatuagens e mais', 'Chat IA para ajustar tamanho, cor, corte', 'Descarrega e partilha os teus renders', 'Compra de novo quando quiseres — sem assinatura'],
    starterLabel: 'Starter', starterRenders: '8 renders HD', starterSub: '$0,62 por render', starterBadge: 'MAIS POPULAR',
    proLabel: 'Pro', proRenders: '15 + 5 grátis = 20 HD', proSub: `$0,50 por render · 15% off com ${STYLE_PRO_PROMO_CODE}`, proBadge: '🎁 +5 GRÁTIS', proPillBadge: 'MELHOR VALOR',
    oneTime: 'compra única',
    banner15: '15% OFF · expira em', banner10: '10% OFF · expira em', tapCopy: 'Toca para copiar', copied: 'Copiado!',
    onlyValidPro: 'Válido apenas para Style Pro', onlyValidStarter: 'Válido apenas para Starter',
    loading: 'A carregar…', buyNow: 'Comprar Agora',
    trustLine: 'Compra única · Créditos sem expiração · Seguro via Stripe',
    signInTitle: 'Inicia sessão', signInSubtitle: 'Inicia sessão para começar o teu teste grátis', signInGoogle: 'Continuar com Google',
    or: 'ou', emailPlaceholder: 'o-teu@email.com', sendBtn: 'Enviar',
    inboxTitle: 'Verifica o teu email', inboxHint: 'Enviámos-te um link mágico. Clica para entrar.', cancel: 'Cancelar',
  },
  de: {
    heroTitle: 'Probier es', heroHighlight: 'an Dir.',
    heroSubtitle: 'Kleidung, Brillen, Schmuck, Tattoos — sieh, wie alles an deinem echten Körper aussieht, bevor du kaufst. Einmalkauf, kein Abo.',
    features: ['Credits ohne Ablauf', 'Kleidung, Brillen, Schmuck, Tattoos und mehr', 'KI-Chat zum Anpassen von Größe, Farbe, Passform', 'Renderings herunterladen und teilen', 'Jederzeit nachkaufen — kein Abo'],
    starterLabel: 'Starter', starterRenders: '8 HD-Renderings', starterSub: '0,62 $ pro Render', starterBadge: 'AM BELIEBTESTEN',
    proLabel: 'Pro', proRenders: '15 + 5 gratis = 20 HD', proSub: `0,50 $ pro Render · 15% Rabatt mit ${STYLE_PRO_PROMO_CODE}`, proBadge: '🎁 +5 GRATIS', proPillBadge: 'BESTER WERT',
    oneTime: 'einmalig',
    banner15: '15% OFF · läuft ab in', banner10: '10% OFF · läuft ab in', tapCopy: 'Zum Kopieren tippen', copied: 'Kopiert!',
    onlyValidPro: 'Nur für Style Pro gültig', onlyValidStarter: 'Nur für Starter gültig',
    loading: 'Lädt…', buyNow: 'Jetzt kaufen',
    trustLine: 'Einmalzahlung · Credits ohne Ablauf · Sicher über Stripe',
    signInTitle: 'Zuerst anmelden', signInSubtitle: 'Melde dich an, um die kostenlose Probe zu starten', signInGoogle: 'Mit Google fortfahren',
    or: 'oder', emailPlaceholder: 'deine@email.com', sendBtn: 'Senden',
    inboxTitle: 'Posteingang prüfen', inboxHint: 'Wir haben einen Magic Link gesendet. Klicken zum Anmelden.', cancel: 'Abbrechen',
  },
  it: {
    heroTitle: 'Provalo', heroHighlight: 'su di Te.',
    heroSubtitle: 'Vestiti, occhiali, gioielli, tatuaggi — guarda come ti sta tutto sul corpo reale prima di comprare. Acquisto singolo, senza abbonamento.',
    features: ['Crediti senza scadenza', 'Vestiti, occhiali, gioielli, tatuaggi e altro', 'Chat IA per regolare taglia, colore, vestibilità', 'Scarica e condividi i tuoi render', 'Riacquista quando vuoi — senza abbonamento'],
    starterLabel: 'Starter', starterRenders: '8 render HD', starterSub: '0,62 $ per render', starterBadge: 'PIÙ POPOLARE',
    proLabel: 'Pro', proRenders: '15 + 5 gratis = 20 HD', proSub: `0,50 $ per render · 15% off con ${STYLE_PRO_PROMO_CODE}`, proBadge: '🎁 +5 GRATIS', proPillBadge: 'MIGLIOR PREZZO',
    oneTime: 'acquisto singolo',
    banner15: '15% OFF · scade tra', banner10: '10% OFF · scade tra', tapCopy: 'Tocca per copiare', copied: 'Copiato!',
    onlyValidPro: 'Valido solo per Style Pro', onlyValidStarter: 'Valido solo per Starter',
    loading: 'Caricamento…', buyNow: 'Acquista Ora',
    trustLine: 'Pagamento singolo · Crediti senza scadenza · Sicuro tramite Stripe',
    signInTitle: 'Accedi prima', signInSubtitle: 'Accedi per iniziare la tua prova gratuita', signInGoogle: 'Continua con Google',
    or: 'o', emailPlaceholder: 'tua@email.com', sendBtn: 'Invia',
    inboxTitle: 'Controlla la tua casella', inboxHint: 'Ti abbiamo inviato un link magico. Cliccalo per accedere.', cancel: 'Annulla',
  },
};

export default function PaywallPage() {
  const router = useRouter();
  const { t, lang } = useLang();
  const T = PAYWALL_COPY[(lang as PaywallLang)] || PAYWALL_COPY.en;
  // Default to Starter — the on-ramp for new buyers. Pro stays visually
  // featured via gradient + ring + +5 FREE badge so the eye drifts there
  // and "upgrade" feels like a smart decision rather than a default.
  const [selected, setSelected] = useState<Plan>('test');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [fromCategory, setFromCategory] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(COUNTDOWN_SECONDS);
  const [codeCopied, setCodeCopied] = useState(false);
  const [helloCopied, setHelloCopied] = useState(false);

  async function handleLoginOtp() {
    if (!otpEmail || !otpEmail.includes('@')) return;
    try {
      track('signup_click', { provider: 'email', source: 'paywall' });
      await signInWithOtp(otpEmail, '/paywall');
      setOtpSent(true);
    } catch {}
  }

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    );
    // Initial hydration
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || null);
        setUserId(user.id);
      }
      setAuthChecked(true);
    });
    // Keep state in sync (handles login completing while paywall is open)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUserEmail(session.user.email || null);
        setUserId(session.user.id);
        setShowLogin(false);
      } else {
        setUserEmail(null);
        setUserId(null);
      }
      setAuthChecked(true);
    });
    track('paywall_view');
    // Read category from landing page redirect
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    if (from) setFromCategory(from);
    return () => subscription.unsubscribe();
  }, []);

  // Promo code countdown — restarts on every paywall mount so the urgency
  // banner is always visible and ticking when a user opens the page. (We
  // tried sessionStorage-persisted timers, but expired sessions hid the
  // banner from returning visitors which kills conversion.)
  useEffect(() => {
    const startedAt = Date.now();
    track('promo_code_view', { code: STYLE_PRO_PROMO_CODE });
    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setSecondsLeft(Math.max(0, COUNTDOWN_SECONDS - elapsed));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const promoActive = secondsLeft > 0;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timerStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(STYLE_PRO_PROMO_CODE);
      track('promo_code_copy', { code: STYLE_PRO_PROMO_CODE });
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 1800);
    } catch {}
  };

  const handleCopyHello = async () => {
    try {
      await navigator.clipboard.writeText(STARTER_PROMO_CODE);
      track('promo_code_copy', { code: STARTER_PROMO_CODE });
      setHelloCopied(true);
      setTimeout(() => setHelloCopied(false), 1800);
    } catch {}
  };

  const features = T.features;

  const plans = {
    test: {
      price: '4,99', currency: '$',
      label: T.starterLabel, renders: T.starterRenders, sub: T.starterSub, badge: T.starterBadge,
    },
    popular: {
      price: '9,99', currency: '$',
      label: T.proLabel, renders: T.proRenders, sub: T.proSub, badge: T.proBadge, pillBadge: T.proPillBadge,
    },
  };

  const handleSubscribe = async () => {
    if (!authChecked) return;
    if (!userId || !userEmail) {
      setShowLogin(true);
      return;
    }
    setLoading(true);
    track('initiate_checkout', { plan: selected });
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selected, email: userEmail, userId, fromCategory }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-5 md:px-6 py-8 md:py-20">
        <>
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-5 md:mb-6">
            Agalaz
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[1.05] md:leading-[0.9]">
            {T.heroTitle}
            {' '}
            <span className="italic text-slate-400">{T.heroHighlight}</span>
          </h1>
          <p className="text-slate-500 mt-6 max-w-md mx-auto text-sm font-light leading-relaxed">
            {T.heroSubtitle}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-slate-600 font-bold text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Limited-time promo banner — visible while countdown > 0. The code is
            displayed prominently and copyable; users paste at Stripe checkout
            (allow_promotion_codes is enabled server-side). After expiry the
            banner disappears so the urgency cue stays honest. */}
        {promoActive && (
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-400 p-4 md:p-5 shadow-lg animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                    {T.banner15}
                  </p>
                  <span className="font-mono font-black text-base md:text-lg text-amber-900 tabular-nums">
                    {timerStr}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="mt-2 w-full flex items-center justify-between gap-2 rounded-lg bg-white border-2 border-dashed border-amber-400 px-3 py-2 hover:bg-amber-50 transition-colors active:scale-[0.99]"
                >
                  <span className="font-mono font-black text-base md:text-lg text-slate-900 tracking-wider">
                    {STYLE_PRO_PROMO_CODE}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    {codeCopied ? T.copied : T.tapCopy}
                  </span>
                </button>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-indigo-600 text-white">
                  <Sparkles size={10} />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {T.onlyValidPro}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HELLO promo banner — 10% off Starter. Same visual format as the
            AGALAZ15 banner above so users instantly read it as "another
            urgent code". Tied visually to the Starter card directly below. */}
        {promoActive && (
          <div className="mb-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 p-4 md:p-5 shadow-lg animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                    {T.banner10}
                  </p>
                  <span className="font-mono font-black text-base md:text-lg text-emerald-900 tabular-nums">
                    {timerStr}
                  </span>
                </div>
                <button
                  onClick={handleCopyHello}
                  className="mt-2 w-full flex items-center justify-between gap-2 rounded-lg bg-white border-2 border-dashed border-emerald-400 px-3 py-2 hover:bg-emerald-50 transition-colors active:scale-[0.99]"
                >
                  <span className="font-mono font-black text-base md:text-lg text-slate-900 tracking-wider">
                    {STARTER_PROMO_CODE}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    {helloCopied ? T.copied : T.tapCopy}
                  </span>
                </button>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900 text-white">
                  <Sparkles size={10} />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {T.onlyValidStarter}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan selector — Starter (Most Popular) · Pro (Best Value, featured) */}
        <div className="space-y-3 mb-8">
          {/* Starter — Most Popular tier, the natural on-ramp */}
          <button
            onClick={() => { setSelected('test'); track('plan_select', { plan: 'test' }); }}
            className={`relative w-full p-4 md:p-5 rounded-xl flex items-center justify-between transition-all ${
              selected === 'test'
                ? 'bg-slate-900 text-white shadow-lg ring-2 ring-indigo-400'
                : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow">
              {plans.test.badge}
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === 'test' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-300'
              }`}>
                {selected === 'test' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="text-left">
                <span className={`font-black text-[15px] ${selected === 'test' ? 'text-white' : 'text-slate-900'}`}>
                  {plans.test.label}
                </span>
                <br />
                <span className={`text-[11px] font-bold ${selected === 'test' ? 'text-white/60' : 'text-slate-500'}`}>
                  {plans.test.renders}
                </span>
                <span className={`text-[10px] block mt-0.5 ${selected === 'test' ? 'text-white/40' : 'text-slate-400'}`}>
                  {plans.test.sub}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-black text-xl ${selected === 'test' ? 'text-white' : 'text-slate-900'}`}>
                {plans.test.currency}{plans.test.price}
              </span>
              <span className={`block text-[10px] font-bold ${selected === 'test' ? 'text-white/40' : 'text-slate-400'}`}>
                {T.oneTime}
              </span>
            </div>
          </button>

          {/* Pro — Best Value, +5 FREE, 15% promo eligible. Permanent ring +
              shadow + scale even when NOT selected so the eye drifts here. */}
          <button
            onClick={() => { setSelected('popular'); track('plan_select', { plan: 'popular' }); }}
            className={`relative w-full p-4 md:p-5 rounded-xl flex items-center justify-between transition-all ${
              selected === 'popular'
                ? 'bg-slate-900 text-white shadow-xl ring-2 ring-indigo-400 scale-[1.02]'
                : 'bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-500 hover:border-indigo-600 shadow-xl ring-1 ring-indigo-200 hover:scale-[1.02]'
            }`}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow">
              {plans.popular.pillBadge}
            </div>
            <div className="absolute -top-2 -right-2 px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md rotate-3">
              {plans.popular.badge}
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === 'popular' ? 'border-indigo-400 bg-indigo-500' : 'border-indigo-400'
              }`}>
                {selected === 'popular' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="text-left">
                <span className={`font-black text-[15px] ${selected === 'popular' ? 'text-white' : 'text-slate-900'}`}>
                  {plans.popular.label}
                </span>
                <br />
                <span className={`text-[11px] font-bold ${selected === 'popular' ? 'text-white/60' : 'text-indigo-600'}`}>
                  {plans.popular.renders}
                </span>
                <span className={`text-[10px] block mt-0.5 ${selected === 'popular' ? 'text-white/40' : 'text-slate-400'}`}>
                  {plans.popular.sub}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-black text-xl ${selected === 'popular' ? 'text-white' : 'text-slate-900'}`}>
                {plans.popular.currency}{plans.popular.price}
              </span>
              <span className={`block text-[10px] font-bold ${selected === 'popular' ? 'text-white/40' : 'text-slate-400'}`}>
                {T.oneTime}
              </span>
            </div>
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubscribe}
          disabled={loading || !authChecked}
          className="w-full py-4 min-h-[56px] bg-slate-900 text-white flex items-center justify-center gap-3 hover:bg-indigo-600 active:bg-indigo-700 transition-all font-black uppercase tracking-[0.2em] text-xs md:text-sm disabled:opacity-50"
        >
          {loading || !authChecked ? (
            <span>{T.loading}</span>
          ) : (
            <>
              <Sparkles size={16} />
              {T.buyNow}
              <ArrowRight size={14} />
            </>
          )}
        </button>

        {/* Trust signals */}
        <div className="mt-4 space-y-2 text-center">
          <p className="text-slate-400 text-[11px] font-bold">
            {T.trustLine}
          </p>
          <div className="flex items-center justify-center gap-4 pt-1">
            <button className="flex items-center gap-1.5 py-2">
              <Shield size={12} className="text-slate-300" />
              <span className="text-slate-300 font-bold text-[11px]">{t.restorePurchase}</span>
            </button>
          </div>
        </div>
        </>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowLogin(false)}>
          <div className="bg-white mx-4 md:mx-6 p-5 md:p-8 rounded-2xl max-w-sm w-full text-center space-y-5 md:space-y-6 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-slate-900 flex items-center justify-center mx-auto">
              <span className="text-white font-serif font-black text-2xl italic">A</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-black text-slate-900 tracking-tight">
                {T.signInTitle}
              </h3>
              <p className="text-slate-400 text-sm mt-2 font-light">
                {T.signInSubtitle}
              </p>
            </div>
            <button
              onClick={async () => {
                try {
                  track('signup_click', { provider: 'google', source: 'paywall' });
                  await signInWithGoogle('/paywall');
                } catch {}
              }}
              className="w-full py-4 bg-slate-900 text-white flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors font-black uppercase tracking-[0.15em] text-xs"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {T.signInGoogle}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">{T.or}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {otpSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-bold text-emerald-600">
                  {T.inboxTitle}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {T.inboxHint}
                </p>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={otpEmail}
                  onChange={(e) => setOtpEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLoginOtp(); }}
                  placeholder={T.emailPlaceholder}
                  className="flex-1 px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleLoginOtp}
                  className="px-4 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-colors shrink-0"
                >
                  {T.sendBtn}
                </button>
              </div>
            )}

            <button
              onClick={() => { setShowLogin(false); setOtpSent(false); setOtpEmail(''); }}
              className="text-slate-300 text-xs font-bold hover:text-slate-500 transition-colors"
            >
              {T.cancel}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
