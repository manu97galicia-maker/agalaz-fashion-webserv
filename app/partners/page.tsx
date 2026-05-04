'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Copy, Check, ArrowRight, ChevronRight, Shield, Zap, Globe, Code2, ChevronDown, ShoppingBag, TrendingDown, BarChart3 } from 'lucide-react';
import { useLang, pickLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ChatBot } from '@/components/ChatBot';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 150,
    renders: 200,
    extra: '0,75',
    features: ['200 renders/mes', 'Widget personalizable'],
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 499,
    renders: 1000,
    extra: '0,50',
    features: ['1.000 renders/mes', 'Widget personalizable'],
    popular: true,
  },
];

interface PartnerProfile {
  id: string;
  store_name: string;
  store_url: string;
  plan: string;
  is_active: boolean;
  credits_remaining: number;
  api_key_prefix: string | null;
  has_api_key: boolean;
  has_subscription: boolean;
}

// New flow: url → login → free trial (5 credits) → paywall → choose plan → subscribe
type FlowStep = 'loading' | 'landing' | 'login' | 'has_key' | 'paywall' | 'subscribed';

export default function PartnersPage() {
  return <PartnersContent />;
}

function PartnersContent() {
  const { lang } = useLang();
  // SSR-visible landing: render the marketing content immediately so crawlers
  // (and unauthenticated visitors) see it without waiting for the auth check.
  // Authenticated users transition to has_key/subscribed in the mount effect below.
  const [step, setStep] = useState<FlowStep>('landing');
  const [storeUrl, setStoreUrl] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<PartnerProfile | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [catalogStats, setCatalogStats] = useState<{ total: number; classified: number; last_synced: string | null } | null>(null);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  // Captcha gate for register + sync. Token comes from Cloudflare Turnstile.
  const [captchaPurpose, setCaptchaPurpose] = useState<null | 'register' | 'sync'>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

  // Lazy-load Turnstile script once
  useEffect(() => {
    if (!turnstileSiteKey) return;
    if (document.getElementById('cf-turnstile-script')) return;
    const s = document.createElement('script');
    s.id = 'cf-turnstile-script';
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, [turnstileSiteKey]);

  // Render the widget when the modal opens
  useEffect(() => {
    if (!captchaPurpose || !turnstileSiteKey) return;
    let cancelled = false;
    function tryRender() {
      const ts = (window as any).turnstile;
      if (!ts) { setTimeout(() => { if (!cancelled) tryRender(); }, 100); return; }
      const el = document.getElementById('agalaz-partners-turnstile');
      if (!el) return;
      el.innerHTML = '';
      ts.render('#agalaz-partners-turnstile', {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          const purpose = captchaPurpose;
          setCaptchaPurpose(null);
          if (purpose === 'register') runRegister(token);
          else if (purpose === 'sync') runSync(token);
        },
      });
    }
    tryRender();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaPurpose]);

  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
  }

  // Check auth on mount
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
        setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || null);
        loadPartnerProfile(user.id);
      } else {
        setStep('landing');
      }
    });
  }, []);

  // Post-payment redirect (covers both trial start and paid subscription activation).
  // Reads the query string from window.location instead of useSearchParams so this
  // page does NOT trigger a full-page Suspense boundary that would block SSR of the
  // marketing landing for crawlers.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const subscribed = params.get('subscribed');
    const partnerIdFromUrl = params.get('partner_id');
    if (subscribed !== 'true') return;
    // Surface the API key stashed pre-Stripe (works for both authed and anonymous flows)
    try {
      const stashed = sessionStorage.getItem('agalaz_partner_api_key');
      if (stashed) {
        setApiKey(stashed);
        sessionStorage.removeItem('agalaz_partner_api_key');
      }
    } catch {}
    if (userId) {
      loadPartnerProfile(userId);
    } else if (partnerIdFromUrl) {
      loadPartnerProfile(partnerIdFromUrl, 'partner_id');
    }
  }, [userId]);

  async function loadPartnerProfile(id: string, mode: 'user_id' | 'partner_id' = 'user_id') {
    try {
      const res = await fetch(`/api/partners/profile?${mode}=${encodeURIComponent(id)}`);
      if (res.ok) {
        const data = await res.json();
        setPartnerProfile(data.partner);
        if (data.partner.has_subscription) {
          setStep('subscribed');
        } else if (data.partner.has_api_key && data.partner.credits_remaining > 0) {
          setStep('has_key');
        } else if (data.partner.has_api_key && data.partner.credits_remaining <= 0) {
          setStep('paywall');
        } else {
          // Has partner record but no key yet — generate it
          setStep('has_key');
        }
        if (data.partner?.id) loadCatalogStats(data.partner.id);
      } else {
        // No partner record — show login step
        const savedUrl = localStorage.getItem('agalaz_partner_url');
        if (savedUrl) setStoreUrl(savedUrl);
        setStep('login');
      }
    } catch {
      setStep('landing');
    }
  }

  async function loadCatalogStats(partnerId: string) {
    try {
      const res = await fetch(`/api/partners/sync-catalog?partner_id=${encodeURIComponent(partnerId)}`);
      if (res.ok) {
        const data = await res.json();
        setCatalogStats({ total: data.total || 0, classified: data.classified || 0, last_synced: data.last_synced || null });
      }
    } catch { /* ignore */ }
  }

  function handleSyncCatalog() {
    if (!partnerProfile?.id) return;
    if (turnstileSiteKey) {
      setCaptchaPurpose('sync');
    } else {
      runSync('');
    }
  }

  async function runSync(turnstileToken: string) {
    if (!partnerProfile?.id) return;
    setSyncLoading(true);
    setSyncMessage(null);
    try {
      const res = await fetch('/api/partners/sync-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner_id: partnerProfile.id, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSyncMessage({ type: 'error', text: data.error || 'Sync failed' });
      } else {
        setSyncMessage({
          type: 'success',
          text: pickLang(
            lang,
            'Sync started. Products will appear in 1–3 min.',
            'Sincronización iniciada. Los productos aparecerán en 1–3 min.',
            'Synchronisation lancée. Les produits apparaîtront dans 1 à 3 min.',
            'Sincronização iniciada. Os produtos aparecerão em 1–3 min.',
            'Synchronisierung gestartet. Die Produkte erscheinen in 1–3 Min.',
            'Sincronizzazione avviata. I prodotti appariranno in 1–3 min.'
          ),
        });
        // Poll stats a few times
        for (const delay of [8000, 20000, 45000]) {
          setTimeout(() => loadCatalogStats(partnerProfile.id), delay);
        }
      }
    } catch {
      setSyncMessage({ type: 'error', text: 'Network error' });
    }
    setSyncLoading(false);
  }

  // Google login
  async function handleLogin() {
    // Save store URL for after login
    if (storeUrl) {
      localStorage.setItem('agalaz_partner_url', storeUrl);
    }
    const supabase = getSupabase();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/partners` },
    });
  }

  // Register partner → generate API key → redirect to Stripe 7-day free trial checkout.
  // Webhook activates partner (+ 50 credits) when checkout completes.
  // Captcha gate: open modal first, then runRegister(token) after success.
  function handleRegisterAndGetKey() {
    if (!userEmail) return;
    const url = storeUrl || localStorage.getItem('agalaz_partner_url') || '';
    if (!url) {
      setError('Introduce la URL de tu tienda');
      return;
    }
    setError(null);
    if (turnstileSiteKey) {
      setCaptchaPurpose('register');
    } else {
      runRegister('');
    }
  }

  async function runRegister(turnstileToken: string) {
    if (!userEmail) return;
    const url = storeUrl || localStorage.getItem('agalaz_partner_url') || '';
    if (!url) {
      setError('Introduce la URL de tu tienda');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Register partner
      const registerRes = await fetch('/api/partners/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId || undefined,
          email: userEmail,
          store_name: new URL(url.startsWith('http') ? url : `https://${url}`).hostname,
          store_url: url,
          plan: 'trial',
          turnstileToken,
        }),
      });
      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        if (registerRes.status === 409) {
          // Already registered — load profile
          if (userId) loadPartnerProfile(userId);
          setIsSubmitting(false);
          return;
        }
        setError(registerData.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      const partnerId = registerData.partner.id;

      // 2. Generate API key (no credits granted here anymore — webhook grants 50 on trial start)
      const keyRes = await fetch('/api/partners/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner_id: partnerId }),
      });
      const keyData = await keyRes.json();

      if (keyRes.ok && keyData.api_key) {
        // Stash the raw key in sessionStorage so we can display it once on return from Stripe.
        try { sessionStorage.setItem('agalaz_partner_api_key', keyData.api_key); } catch {}
      }

      // 3. Kick off Stripe checkout with 7-day trial (starter price, $0 today, auto-bills day 7)
      const checkoutRes = await fetch('/api/partners/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'trial', partnerId, email: userEmail }),
      });
      const checkoutData = await checkoutRes.json();

      if (checkoutRes.ok && checkoutData.url) {
        localStorage.removeItem('agalaz_partner_url');
        window.location.href = checkoutData.url;
        return;
      }

      setError(checkoutData.error || 'Failed to start free trial');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  }

  // Subscribe to plan (after trial ends)
  async function handleSubscribe() {
    if (!partnerProfile || !userEmail) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/partners/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          partnerId: partnerProfile.id,
          email: userEmail,
          action: 'subscribe',
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to start checkout');
      }
    } catch {
      setError('Something went wrong');
    }
    setIsSubmitting(false);
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  const currentPlan = PLANS.find(p => p.id === (partnerProfile?.plan || selectedPlan));

  // ─── LOADING ───
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm font-bold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl tracking-[0.15em] text-slate-900 font-black">
            AGALAZ
          </a>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              Partners
            </span>
            {userName && (
              <span className="text-xs text-slate-400 font-bold">{userName}</span>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ═══ STEP: LANDING (not logged in) ═══ */}
        {(step === 'landing' || step === 'login') && (
          <>
            {/* ── HERO ── */}
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full">
                <Sparkles size={14} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">
                  {pickLang(lang, 'Become a Partner', 'Hazte Partner', 'Devenez Partenaire', 'Torne-se Parceiro', 'Partner werden', 'Diventa Partner')}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {pickLang(
                  lang,
                  <>Your customers try on<br /><span className="italic text-indigo-600">before they buy.</span></>,
                  <>Tus clientes se prueban<br /><span className="italic text-indigo-600">antes de comprar.</span></>,
                  <>Vos clients essaient<br /><span className="italic text-indigo-600">avant d&apos;acheter.</span></>,
                  <>Os seus clientes experimentam<br /><span className="italic text-indigo-600">antes de comprar.</span></>,
                  <>Ihre Kunden probieren an<br /><span className="italic text-indigo-600">bevor sie kaufen.</span></>,
                  <>I vostri clienti provano<br /><span className="italic text-indigo-600">prima di comprare.</span></>
                )}
              </h1>
              <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                {pickLang(
                  lang,
                  'By adding a try-on button before buying, let your customers preview clothing, glasses, jewelry and accessories on themselves with AI. Boost conversions, maximize time on site and reduce returns.',
                  'Añadiendo el botón de probarse la ropa antes de comprar, permite a tus clientes previsualizar ropa, gafas, joyería y accesorios sobre ellos mismos con IA. Aumenta conversiones, maximiza el tiempo en tu web y reduce devoluciones.',
                  'En ajoutant un bouton d\'essayage avant l\'achat, vos clients peuvent prévisualiser vêtements, lunettes, bijoux et accessoires sur eux-mêmes grâce à l\'IA. Augmentez les conversions, maximisez le temps passé sur votre site et réduisez les retours.',
                  'Ao adicionar um botão de prova antes da compra, permita que os seus clientes pré-visualizem roupa, óculos, joias e acessórios em si mesmos com IA. Aumente conversões, maximize o tempo no site e reduza devoluções.',
                  'Mit einem Anprobe-Button vor dem Kauf können Ihre Kunden Kleidung, Brillen, Schmuck und Accessoires per AI an sich selbst vorschauen. Steigern Sie die Conversion, maximieren Sie die Verweildauer und reduzieren Sie Retouren.',
                  'Aggiungendo un pulsante di prova prima dell\'acquisto, permettete ai vostri clienti di visualizzare in anteprima abbigliamento, occhiali, gioielli e accessori su sé stessi con AI. Aumentate le conversioni, massimizzate il tempo sul sito e riducete i resi.'
                )}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600 font-semibold pt-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <TrendingDown size={20} className="text-emerald-500" />
                  </div>
                  <span>{pickLang(lang, 'Fewer returns', 'Menos devoluciones', 'Moins de retours', 'Menos devoluções', 'Weniger Retouren', 'Meno resi')}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <BarChart3 size={20} className="text-indigo-500" />
                  </div>
                  <span>{pickLang(lang, 'More conversions', 'Más conversiones', 'Plus de conversions', 'Mais conversões', 'Mehr Conversions', 'Più conversioni')}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <Zap size={20} className="text-amber-500" />
                  </div>
                  <span>{pickLang(lang, 'Higher retention', 'Mayor retención', 'Meilleure rétention', 'Maior retenção', 'Höhere Bindung', 'Maggiore retention')}</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-medium pt-2">
                {pickLang(
                  lang,
                  'Works on Shopify, WooCommerce, or any platform. 2 lines of code.',
                  'Funciona en Shopify, WooCommerce o cualquier plataforma. 2 líneas de código.',
                  'Fonctionne sur Shopify, WooCommerce ou n\'importe quelle plateforme. 2 lignes de code.',
                  'Funciona em Shopify, WooCommerce ou qualquer plataforma. 2 linhas de código.',
                  'Funktioniert mit Shopify, WooCommerce oder jeder Plattform. 2 Zeilen Code.',
                  'Funziona su Shopify, WooCommerce o qualsiasi piattaforma. 2 righe di codice.'
                )}
              </p>
            </div>

            {/* ── 3-STEP VISUAL FLOW: Before → Try On Button → After ── */}
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-16">
              {/* 1. Before */}
              <button onClick={() => setExpandedImage('/images/before.png')} className="cursor-zoom-in group text-center space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{pickLang(lang, 'Your customer', 'Tu cliente', 'Votre client', 'O seu cliente', 'Ihr Kunde', 'Il vostro cliente')}</span>
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group-hover:border-indigo-300 group-hover:shadow-lg transition-all">
                  <img src="/images/before.png" alt="Before try-on" className="w-32 md:w-44 h-auto" />
                </div>
              </button>

              <ChevronRight size={22} className="text-indigo-400 shrink-0 mt-6" />

              {/* 2. Product page with Try On button */}
              <button onClick={() => setExpandedImage('/images/Agalaz try on button.png')} className="cursor-zoom-in group text-center space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">{pickLang(lang, 'Tries it on', 'Se lo prueba', 'L\'essaie', 'Experimenta', 'Probiert es an', 'Lo prova')}</span>
                <div className="rounded-2xl overflow-hidden border-2 border-indigo-300 shadow-lg group-hover:border-indigo-500 group-hover:shadow-xl transition-all">
                  <img src="/images/Agalaz try on button.png" alt="Product page with Try On button" className="w-32 md:w-44 h-auto" />
                </div>
              </button>

              <ChevronRight size={22} className="text-indigo-400 shrink-0 mt-6" />

              {/* 3. After - result */}
              <button onClick={() => setExpandedImage('/images/after.png')} className="cursor-zoom-in group text-center space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">{pickLang(lang, 'Result', 'Resultado', 'Résultat', 'Resultado', 'Ergebnis', 'Risultato')}</span>
                <div className="rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-md group-hover:border-emerald-500 group-hover:shadow-lg transition-all">
                  <img src="/images/after.png" alt="Try-on result" className="w-32 md:w-44 h-auto" />
                </div>
              </button>
            </div>

            {/* ── IMAGE LIGHTBOX ── */}
            {expandedImage && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in cursor-zoom-out"
                onClick={() => setExpandedImage(null)}
              >
                <div className="relative max-w-3xl max-h-[85vh] mx-4">
                  <img src={expandedImage} alt="Expanded view" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
                </div>
              </div>
            )}

            {/* ── START: Enter URL + Email — No login required ── */}
            <div id="apply" className="max-w-md mx-auto mb-20 scroll-mt-20">
              <div className="border-2 border-indigo-400 rounded-2xl p-8 space-y-6 bg-gradient-to-b from-indigo-50 to-white shadow-xl shadow-indigo-100">
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-black text-slate-900">{pickLang(lang, 'Start for free', 'Empieza gratis', 'Commencez gratuitement', 'Comece grátis', 'Kostenlos starten', 'Inizia gratis')}</h2>
                  <p className="text-indigo-600 text-sm font-black uppercase tracking-widest">
                    {pickLang(lang, '7-day free trial · 50 renders', '7 días gratis · 50 renders', 'Essai gratuit 7 jours · 50 renders', 'Teste grátis 7 dias · 50 renders', '7 Tage gratis · 50 Renders', 'Prova gratuita 7 giorni · 50 render')}
                  </p>
                  <p className="text-slate-400 text-xs font-light">
                    {pickLang(
                      lang,
                      'Card required but not charged for 7 days. If you don\'t cancel before day 7, Starter ($150/mo) activates automatically.',
                      'Introduces tu tarjeta pero no se cobra durante 7 días. Si no cancelas antes del día 7, se activa Starter (150€/mes) automáticamente.',
                      'Carte requise mais non débitée pendant 7 jours. Si vous n\'annulez pas avant le 7e jour, Starter (150 €/mois) s\'active automatiquement.',
                      'Cartão obrigatório mas não cobrado durante 7 dias. Se não cancelar antes do dia 7, o Starter (150 €/mês) é ativado automaticamente.',
                      'Karte erforderlich, wird aber 7 Tage lang nicht belastet. Wenn Sie vor Tag 7 nicht kündigen, wird Starter (150 €/Mon.) automatisch aktiviert.',
                      'Carta richiesta ma non addebitata per 7 giorni. Se non disdici prima del giorno 7, lo Starter (150 €/mese) si attiva automaticamente.'
                    )}
                  </p>
                </div>

                {/* Store URL */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {pickLang(lang, 'Your store URL', 'URL de tu tienda', 'URL de votre boutique', 'URL da sua loja', 'URL Ihres Shops', 'URL del vostro negozio')}
                  </label>
                  <input
                    type="text"
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all bg-white"
                    placeholder="https://mitienda.com"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    value={userEmail || ''}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all bg-white"
                    placeholder="tu@email.com"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                    {error}
                  </div>
                )}

                {/* Direct registration — no Google login */}
                <button
                  onClick={() => {
                    if (!storeUrl) {
                      setError(pickLang(lang, 'Enter your store URL', 'Introduce la URL de tu tienda', 'Saisissez l\'URL de votre boutique', 'Introduza o URL da sua loja', 'Geben Sie die URL Ihres Shops ein', 'Inserisci l\'URL del tuo negozio'));
                      return;
                    }
                    if (!userEmail) {
                      setError(pickLang(lang, 'Enter your email', 'Introduce tu email', 'Saisissez votre email', 'Introduza o seu email', 'Geben Sie Ihre E-Mail ein', 'Inserisci la tua email'));
                      return;
                    }
                    setError(null);
                    handleRegisterAndGetKey();
                  }}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  {isSubmitting
                    ? pickLang(lang, 'Redirecting to Stripe...', 'Redirigiendo a Stripe...', 'Redirection vers Stripe...', 'A redirecionar para Stripe...', 'Weiterleitung zu Stripe...', 'Reindirizzamento a Stripe...')
                    : pickLang(lang, 'Start free trial', 'Empezar prueba gratis', 'Démarrer l\'essai gratuit', 'Começar teste grátis', 'Gratis-Testphase starten', 'Inizia prova gratuita')}
                  <ArrowRight size={16} />
                </button>

                <p className="text-center text-[10px] text-slate-400 font-bold">
                  {pickLang(lang, '$0 today · Cancel before day 7 and pay nothing', '0€ hoy · Cancela antes del día 7 y no pagas nada', '0 € aujourd\'hui · Annulez avant le 7e jour et ne payez rien', '0 € hoje · Cancele antes do dia 7 e não paga nada', '0 € heute · Vor Tag 7 kündigen und nichts zahlen', '0 € oggi · Disdici prima del giorno 7 e non paghi nulla')}
                </p>
              </div>
            </div>

            {/* ── DEMO VIDEO ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">{pickLang(lang, 'See it in action', 'Míralo en acción', 'Voyez-le en action', 'Veja em ação', 'In Aktion sehen', 'Guardalo in azione')}</span>
                <h2 className="font-serif text-3xl font-black text-slate-900">{pickLang(lang, 'Virtual Try-On for Your Store', 'Probador Virtual para Tu Tienda', 'Essayage virtuel pour votre boutique', 'Provador Virtual para a Sua Loja', 'Virtuelle Anprobe für Ihren Shop', 'Camerino Virtuale per il Vostro Negozio')}</h2>
              </div>
              <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
                <video
                  src="/demo-tryon.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full"
                />
              </div>
              <p className="text-center text-[10px] text-slate-300 mt-4">
                {pickLang(
                  lang,
                  'Real demo — AI virtual try-on running on an ecommerce product page',
                  'Demo real — probador virtual con IA en una página de producto ecommerce',
                  'Démo réelle — essayage virtuel AI sur une page produit ecommerce',
                  'Demo real — provador virtual com AI numa página de produto ecommerce',
                  'Echte Demo — virtuelle AI-Anprobe auf einer E-Commerce-Produktseite',
                  'Demo reale — camerino virtuale AI su una pagina prodotto ecommerce'
                )}
              </p>
            </div>

            {/* ── FEATURES ── */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {pickLang(
                lang,
                [
                  { icon: <Code2 size={20} />, title: '2 Lines of Code', desc: 'Paste our script tag + a div on your product page. That\'s it. No server setup, no complex integration.' },
                  { icon: <Shield size={20} />, title: 'Secure by Default', desc: 'Domain allowlisting, SHA-256 hashed API keys, rate limits. We never store your customers\' photos.' },
                  { icon: <Sparkles size={20} />, title: 'AI-Powered Results', desc: 'Photorealistic try-on for clothing, glasses, jewelry, hats, shoes, bags — even tattoos and nail art.' },
                ],
                [
                  { icon: <Code2 size={20} />, title: '2 Líneas de Código', desc: 'Pega nuestro script + un div en tu página de producto. Listo. Sin servidor, sin integración compleja.' },
                  { icon: <Shield size={20} />, title: 'Seguro por Defecto', desc: 'Allowlisting de dominios, claves API con SHA-256, límites de peticiones. Nunca almacenamos las fotos de tus clientes.' },
                  { icon: <Sparkles size={20} />, title: 'Resultados con IA', desc: 'Probador fotorrealista para ropa, gafas, joyería, sombreros, zapatos, bolsos — incluso tatuajes y nail art.' },
                ],
                [
                  { icon: <Code2 size={20} />, title: '2 lignes de code', desc: 'Collez notre script + un div sur votre page produit. C\'est tout. Pas de serveur, pas d\'intégration complexe.' },
                  { icon: <Shield size={20} />, title: 'Sécurisé par défaut', desc: 'Allowlisting de domaines, clés API hashées SHA-256, limites de requêtes. Nous ne stockons jamais les photos de vos clients.' },
                  { icon: <Sparkles size={20} />, title: 'Résultats par AI', desc: 'Essayage photoréaliste pour vêtements, lunettes, bijoux, chapeaux, chaussures, sacs — et même tatouages et nail art.' },
                ],
                [
                  { icon: <Code2 size={20} />, title: '2 linhas de código', desc: 'Cole o nosso script + um div na sua página de produto. Pronto. Sem servidor, sem integração complexa.' },
                  { icon: <Shield size={20} />, title: 'Seguro por defeito', desc: 'Allowlisting de domínios, chaves API com SHA-256, limites de pedidos. Nunca armazenamos as fotos dos seus clientes.' },
                  { icon: <Sparkles size={20} />, title: 'Resultados com AI', desc: 'Provador fotorrealista para roupa, óculos, joias, chapéus, sapatos, malas — incluindo tatuagens e nail art.' },
                ],
                [
                  { icon: <Code2 size={20} />, title: '2 Zeilen Code', desc: 'Fügen Sie unser Script + ein Div auf Ihrer Produktseite ein. Fertig. Kein Server, keine komplexe Integration.' },
                  { icon: <Shield size={20} />, title: 'Standardmäßig sicher', desc: 'Domain-Allowlisting, SHA-256-gehashte API-Schlüssel, Rate-Limits. Wir speichern niemals Kundenfotos.' },
                  { icon: <Sparkles size={20} />, title: 'AI-gestützte Ergebnisse', desc: 'Fotorealistische Anprobe für Kleidung, Brillen, Schmuck, Hüte, Schuhe, Taschen — sogar Tattoos und Nail Art.' },
                ],
                [
                  { icon: <Code2 size={20} />, title: '2 righe di codice', desc: 'Incollate il nostro script + un div sulla pagina prodotto. Fatto. Niente server, nessuna integrazione complessa.' },
                  { icon: <Shield size={20} />, title: 'Sicuro di default', desc: 'Allowlisting dei domini, chiavi API con hash SHA-256, rate limit. Non memorizziamo mai le foto dei vostri clienti.' },
                  { icon: <Sparkles size={20} />, title: 'Risultati con AI', desc: 'Prova fotorealistica per abbigliamento, occhiali, gioielli, cappelli, scarpe, borse — anche tatuaggi e nail art.' },
                ]
              ).map((f, i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-3">
                  <div className="text-indigo-600">{f.icon}</div>
                  <h3 className="font-black text-slate-900 text-sm">{f.title}</h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* ── HOW IT WORKS ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-10">
                <h2 className="font-serif text-3xl font-black text-slate-900">{pickLang(lang, 'How to Get Started', 'Cómo Empezar', 'Comment démarrer', 'Como Começar', 'So fangen Sie an', 'Come iniziare')}</h2>
                <p className="text-slate-400 text-sm font-light">{pickLang(lang, 'From sign-up to live widget in under 5 minutes.', 'Del registro al widget en menos de 5 minutos.', 'De l\'inscription au widget en moins de 5 minutes.', 'Do registo ao widget em menos de 5 minutos.', 'Von der Anmeldung zum Live-Widget in unter 5 Minuten.', 'Dalla registrazione al widget live in meno di 5 minuti.')}</p>
              </div>

              <div className="space-y-0 max-w-lg mx-auto">
                {pickLang(
                  lang,
                  [
                    { step: '1', title: 'Enter your store URL', desc: 'Tell us where your store lives. We\'ll allowlist the domain automatically.' },
                    { step: '2', title: 'Start 7-day free trial · 50 renders', desc: 'Instantly receive your secure API key and activate a 7-day free trial with 50 renders. Card required but nothing is charged until day 7 — cancel anytime before and pay nothing.' },
                    { step: '3', title: 'Install the widget (2 lines of code)', desc: 'Copy the <script> tag into your store\'s <head>, and place a <div> on your product pages. Auto-detects images on Shopify & WooCommerce.' },
                  ],
                  [
                    { step: '1', title: 'Introduce la URL de tu tienda', desc: 'Dinos dónde está tu tienda. Autorizaremos el dominio automáticamente.' },
                    { step: '2', title: 'Empieza 7 días gratis · 50 renders', desc: 'Recibe al instante tu API key y activa el trial de 7 días con 50 renders. Introduces tarjeta pero no se cobra hasta el día 7. Cancela antes y no pagas nada.' },
                    { step: '3', title: 'Instala el widget (2 líneas de código)', desc: 'Copia el <script> en el <head> de tu tienda y coloca un <div> en tus páginas de producto. Detecta imágenes automáticamente en Shopify y WooCommerce.' },
                  ],
                  [
                    { step: '1', title: 'Saisissez l\'URL de votre boutique', desc: 'Indiquez-nous où se trouve votre boutique. Nous autoriserons le domaine automatiquement.' },
                    { step: '2', title: 'Démarrez l\'essai gratuit de 7 jours · 50 renders', desc: 'Recevez instantanément votre API key et activez l\'essai de 7 jours avec 50 renders. Carte requise mais aucun débit avant le 7e jour — annulez avant et ne payez rien.' },
                    { step: '3', title: 'Installez le widget (2 lignes de code)', desc: 'Copiez la balise <script> dans le <head> de votre boutique et placez un <div> sur vos pages produit. Détection automatique des images sur Shopify et WooCommerce.' },
                  ],
                  [
                    { step: '1', title: 'Introduza o URL da sua loja', desc: 'Diga-nos onde está a sua loja. Autorizaremos o domínio automaticamente.' },
                    { step: '2', title: 'Comece o teste grátis de 7 dias · 50 renders', desc: 'Receba instantaneamente a sua API key e ative o teste de 7 dias com 50 renders. Cartão obrigatório mas nada é cobrado até ao dia 7 — cancele antes e não paga nada.' },
                    { step: '3', title: 'Instale o widget (2 linhas de código)', desc: 'Copie a tag <script> para o <head> da sua loja e coloque um <div> nas páginas de produto. Deteta imagens automaticamente em Shopify e WooCommerce.' },
                  ],
                  [
                    { step: '1', title: 'Geben Sie die URL Ihres Shops ein', desc: 'Sagen Sie uns, wo Ihr Shop liegt. Wir nehmen die Domain automatisch in die Allowlist auf.' },
                    { step: '2', title: 'Starten Sie 7 Tage gratis · 50 Renders', desc: 'Erhalten Sie sofort Ihren API-Schlüssel und aktivieren Sie die 7-tägige Testphase mit 50 Renders. Karte erforderlich, aber bis Tag 7 wird nichts belastet — vorher kündigen, nichts zahlen.' },
                    { step: '3', title: 'Installieren Sie das Widget (2 Zeilen Code)', desc: 'Kopieren Sie das <script>-Tag in den <head> Ihres Shops und platzieren Sie ein <div> auf Ihren Produktseiten. Automatische Bilderkennung in Shopify und WooCommerce.' },
                  ],
                  [
                    { step: '1', title: 'Inserisci l\'URL del tuo negozio', desc: 'Diteci dov\'è il vostro negozio. Autorizzeremo il dominio automaticamente.' },
                    { step: '2', title: 'Inizia la prova gratuita di 7 giorni · 50 render', desc: 'Ricevete subito la vostra API key e attivate la prova di 7 giorni con 50 render. Carta richiesta ma nessun addebito fino al giorno 7 — disdici prima e non paghi nulla.' },
                    { step: '3', title: 'Installa il widget (2 righe di codice)', desc: 'Copiate il tag <script> nel <head> del vostro negozio e inserite un <div> nelle pagine prodotto. Rileva automaticamente le immagini su Shopify e WooCommerce.' },
                  ]
                ).map((item, i) => (
                  <div key={i} className="flex gap-5 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                        {item.step}
                      </div>
                      {i < 2 && <div className="w-px flex-1 bg-indigo-200 mt-2" />}
                    </div>
                    <div className="pt-2 pb-4">
                      <h3 className="font-black text-slate-900 text-sm">{item.title}</h3>
                      <p className="text-slate-400 text-xs font-light mt-1 leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CROSS-SELL — NEW FEATURE ── */}
            <div className="mb-20">
              <div className="bg-gradient-to-br from-violet-50 via-indigo-50 to-white border-2 border-violet-200 rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-violet-600 text-white text-[9px] font-black uppercase tracking-wider rounded-full">
                    {pickLang(lang, 'NEW', 'NUEVO', 'NOUVEAU', 'NOVO', 'NEU', 'NUOVO')}
                  </span>
                  <ShoppingBag size={18} className="text-violet-600" />
                </div>
                <h2 className="font-serif text-3xl font-black text-slate-900 mb-3">
                  {pickLang(lang, 'AI-Powered Smart Cross-Sell', 'Cross-Sell Inteligente con IA', 'Cross-Sell intelligent par AI', 'Cross-Sell Inteligente com AI', 'Smartes Cross-Selling mit AI', 'Cross-Sell Intelligente con AI')}
                </h2>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 max-w-xl">
                  {pickLang(
                    lang,
                    'When a customer tries on an item, our AI recommends complementary products from your catalog. Tried a shirt? We suggest matching pants. A ring? We show matching earrings. Fully automatic, based on style, color harmony, and category.',
                    'Cuando un cliente se prueba una prenda, nuestra IA le recomienda productos complementarios de tu catálogo. ¿Se probó una camiseta? Le sugerimos pantalones que combinan. ¿Un anillo? Le mostramos pendientes a juego. Todo automático, basado en estilo, color y categoría.',
                    'Lorsqu\'un client essaie un article, notre AI recommande des produits complémentaires de votre catalogue. Un t-shirt essayé ? Nous suggérons un pantalon assorti. Une bague ? Nous montrons des boucles d\'oreilles assorties. Entièrement automatique, basé sur le style, l\'harmonie des couleurs et la catégorie.',
                    'Quando um cliente experimenta um artigo, a nossa AI recomenda produtos complementares do seu catálogo. Experimentou uma camisa? Sugerimos calças a condizer. Um anel? Mostramos brincos a combinar. Totalmente automático, baseado em estilo, harmonia de cor e categoria.',
                    'Wenn ein Kunde einen Artikel anprobiert, empfiehlt unsere AI passende Produkte aus Ihrem Katalog. Hemd anprobiert? Wir schlagen passende Hosen vor. Ein Ring? Wir zeigen passende Ohrringe. Vollautomatisch, basierend auf Stil, Farbharmonie und Kategorie.',
                    'Quando un cliente prova un articolo, la nostra AI raccomanda prodotti complementari dal vostro catalogo. Provata una maglietta? Suggeriamo pantaloni abbinati. Un anello? Mostriamo orecchini coordinati. Completamente automatico, basato su stile, armonia dei colori e categoria.'
                  )}
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {pickLang(
                    lang,
                    [
                      { icon: '👕→👖', title: 'By category', desc: 'Shirt → pants, dress → shoes, ring → earrings' },
                      { icon: '🎨', title: 'By color', desc: 'Recommends colors that harmonize with what they just tried' },
                      { icon: '✨', title: 'AI style note', desc: '"This blue tone enhances your complexion!" — personalized message with each render' },
                    ],
                    [
                      { icon: '👕→👖', title: 'Por categoría', desc: 'Camiseta → pantalón, vestido → zapatos, anillo → pendientes' },
                      { icon: '🎨', title: 'Por color', desc: 'Recomienda colores que armonizan con lo que ya se probó' },
                      { icon: '✨', title: 'Nota de estilo IA', desc: '"¡Este azul realza tu tez!" — mensaje personalizado con cada render' },
                    ],
                    [
                      { icon: '👕→👖', title: 'Par catégorie', desc: 'T-shirt → pantalon, robe → chaussures, bague → boucles d\'oreilles' },
                      { icon: '🎨', title: 'Par couleur', desc: 'Recommande des couleurs qui s\'harmonisent avec ce qui vient d\'être essayé' },
                      { icon: '✨', title: 'Note de style AI', desc: '« Ce bleu rehausse votre teint ! » — message personnalisé à chaque render' },
                    ],
                    [
                      { icon: '👕→👖', title: 'Por categoria', desc: 'Camisa → calças, vestido → sapatos, anel → brincos' },
                      { icon: '🎨', title: 'Por cor', desc: 'Recomenda cores que harmonizam com o que acabaram de experimentar' },
                      { icon: '✨', title: 'Nota de estilo AI', desc: '"Este azul realça a sua tez!" — mensagem personalizada com cada render' },
                    ],
                    [
                      { icon: '👕→👖', title: 'Nach Kategorie', desc: 'Hemd → Hose, Kleid → Schuhe, Ring → Ohrringe' },
                      { icon: '🎨', title: 'Nach Farbe', desc: 'Empfiehlt Farben, die zu dem gerade Anprobierten harmonieren' },
                      { icon: '✨', title: 'AI-Stilhinweis', desc: '„Dieses Blau betont Ihren Teint!" — persönliche Nachricht bei jedem Render' },
                    ],
                    [
                      { icon: '👕→👖', title: 'Per categoria', desc: 'Maglietta → pantaloni, abito → scarpe, anello → orecchini' },
                      { icon: '🎨', title: 'Per colore', desc: 'Raccomanda colori che si armonizzano con ciò che è stato appena provato' },
                      { icon: '✨', title: 'Nota di stile AI', desc: '"Questo blu valorizza la vostra carnagione!" — messaggio personalizzato a ogni render' },
                    ]
                  ).map((item, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-xl p-4">
                      <span className="text-2xl">{item.icon}</span>
                      <h4 className="font-bold text-sm text-slate-900 mt-2">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-violet-100 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                    <Zap size={14} className="text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {lang === 'es' ? 'Activación en 1 clic' : 'One-click activation'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {lang === 'es'
                        ? 'Desde tu dashboard de Agalaz, haz clic en "Sync My Catalog" y el cross-sell se activa automáticamente. Sin código, sin configuración.'
                        : 'From your Agalaz dashboard, click "Sync My Catalog" and cross-sell activates automatically. No code, no configuration.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PRICING ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-8">
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Precios' : 'Pricing'}</h2>
                <p className="text-slate-400 text-sm font-light">{lang === 'es' ? 'Sin coste de alta. Cancela cuando quieras.' : 'No setup fees. Cancel anytime.'}</p>
              </div>

              {/* ── FEATURED: 7-day Free Trial (primary CTA) ── */}
              <div
                onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative max-w-2xl mx-auto mb-6 p-6 md:p-8 rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 shadow-xl shadow-emerald-100/60 cursor-pointer hover:shadow-2xl hover:border-emerald-500 transition-all"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  {lang === 'es' ? '🎁 Empieza aquí' : '🎁 Start here'}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="text-center md:text-left space-y-2">
                    <h3 className="font-black text-slate-900 text-xl md:text-2xl">
                      {lang === 'es' ? 'Prueba gratis 7 días' : '7-day free trial'}
                    </h3>
                    <p className="text-emerald-700 font-black text-base md:text-lg">
                      {lang === 'es' ? '50 renders · 0€ hoy' : '50 renders · $0 today'}
                    </p>
                    <p className="text-slate-500 text-xs font-light max-w-md">
                      {lang === 'es'
                        ? 'Introduces tu tarjeta pero no se cobra durante 7 días. Si no cancelas antes del día 7, se activa Starter (150€/mes) automáticamente.'
                        : 'Card required but not charged for 7 days. If you don\'t cancel before day 7, Starter (€150/mo) activates automatically.'}
                    </p>
                  </div>
                  <button className="shrink-0 px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors shadow-lg">
                    {lang === 'es' ? 'Empezar gratis →' : 'Start free →'}
                  </button>
                </div>
              </div>

              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">
                {lang === 'es' ? 'El día 7 se activa uno de estos planes' : 'On day 7 one of these activates'}
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-xl ${
                      plan.popular
                        ? 'border-indigo-600 shadow-lg shadow-indigo-100'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                        {lang === 'es' ? 'Más Popular' : 'Most Popular'}
                      </div>
                    )}
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mt-2">
                          <span className="font-serif text-4xl font-black text-slate-900">{plan.price}</span>
                          <span className="text-slate-400 text-sm font-bold">&euro;/{lang === 'es' ? 'mes' : 'month'}</span>
                        </div>
                        <p className="text-xs text-emerald-600 font-bold mt-1">
                          {lang === 'es' ? 'Sin coste de alta' : 'No setup fee'}
                        </p>
                      </div>
                      <ul className="space-y-2.5">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check size={14} className="text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROI CALCULATOR ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-10">
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Retorno de Inversión' : 'Return on Investment'}</h2>
                <p className="text-slate-400 text-sm font-light">{lang === 'es' ? '¿Cuánto puede ahorrar el probador virtual a tu negocio?' : 'How much can virtual try-on save your business?'}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {(lang === 'es' ? [
                  { type: 'Boutique', orders: '500 pedidos/mes', returns: '25% → 15%', saved: '50 devoluciones menos/mes', value: '~1.500€/mes ahorrados', cost: 'Starter: 150€/mes', roi: '10x ROI', roiColor: 'text-emerald-600' },
                  { type: 'Tienda Mediana', orders: '2.000 pedidos/mes', returns: '30% → 18%', saved: '240 devoluciones menos/mes', value: '~7.200€/mes ahorrados', cost: 'Growth: 499€/mes', roi: '14x ROI', roiColor: 'text-indigo-600' },
                  { type: 'Gran Retailer', orders: '10.000 pedidos/mes', returns: '35% → 20%', saved: '1.500 devoluciones menos/mes', value: '~45.000€/mes ahorrados', cost: 'Plan personalizado', roi: '50x+ ROI', roiColor: 'text-amber-600' },
                ] : [
                  { type: 'Boutique', orders: '500 orders/mo', returns: '25% → 15%', saved: '50 fewer returns/mo', value: '~€1,500/mo saved', cost: 'Starter: €150/mo', roi: '10x ROI', roiColor: 'text-emerald-600' },
                  { type: 'Mid-size Store', orders: '2,000 orders/mo', returns: '30% → 18%', saved: '240 fewer returns/mo', value: '~€7,200/mo saved', cost: 'Growth: €499/mo', roi: '14x ROI', roiColor: 'text-indigo-600' },
                  { type: 'Large Retailer', orders: '10,000 orders/mo', returns: '35% → 20%', saved: '1,500 fewer returns/mo', value: '~€45,000/mo saved', cost: 'Custom plan', roi: '50x+ ROI', roiColor: 'text-amber-600' },
                ]).map((tier, i) => (
                  <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-4">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">{tier.type}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tier.orders}</p>
                    </div>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Reducción devoluciones' : 'Returns reduction'}</span><span className="font-bold text-emerald-600">{tier.returns}</span></div>
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Devoluciones evitadas' : 'Returns avoided'}</span><span className="font-bold">{tier.saved}</span></div>
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Ahorro estimado' : 'Estimated savings'}</span><span className="font-bold text-slate-900">{tier.value}</span></div>
                      <div className="h-px bg-slate-100" />
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Coste Agalaz' : 'Agalaz cost'}</span><span className="font-bold">{tier.cost}</span></div>
                    </div>
                    <div className={`text-center py-3 bg-slate-50 rounded-xl font-black text-lg ${tier.roiColor}`}>
                      {tier.roi}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-[10px] text-slate-300 mt-4">
                {lang === 'es' ? '* Basado en un coste medio de 30€ por devolución procesada. Sin costes de alta.' : '* Based on average €30 return processing cost. ROI improved vs old plans — no setup fees.'}
              </p>
            </div>

            {/* ── FAQ ── */}
            <div id="faq" className="mb-20 scroll-mt-20">
              <div className="text-center space-y-3 mb-10">
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</h2>
              </div>

              <div className="max-w-2xl mx-auto space-y-3">
                {(lang === 'es' ? [
                  { q: '¿Cómo funciona la prueba gratis?', a: 'Introduce la URL de tu tienda, inicia sesión con Google, introduces tu tarjeta y activas 7 días gratis con 50 renders. No se te cobra nada durante los primeros 7 días. Si no cancelas antes del séptimo día, se activa automáticamente el plan Starter (150€/mes, 200 renders). Cancela cuando quieras.' },
                  { q: '¿Qué pasa cuando se acaban los 7 días o los 50 renders?', a: 'El día 7 se activa automáticamente el plan Starter (150€/mes, 200 renders) salvo que canceles antes. Puedes cambiar a Growth (499€/mes, 1.000 renders) desde el dashboard. Sin coste de alta.' },
                  { q: '¿Hay coste de alta?', a: 'No. Hemos eliminado los costes de alta. Solo pagas la suscripción mensual cuando estés listo para lanzar.' },
                  { q: '¿Qué pasa si no cancelo la suscripción?', a: 'La suscripción se renueva automáticamente cada mes. Si no cancelas antes del siguiente ciclo de facturación, se te cobrará el siguiente mes. Puedes cancelar en cualquier momento desde tu portal de cliente en Stripe.' },
                  { q: '¿Qué plataformas son compatibles?', a: 'El widget funciona en cualquier web: Shopify, WooCommerce, PrestaShop, Magento, Wix, Squarespace y cualquier tienda personalizada. Detecta automáticamente las imágenes de producto en Shopify y WooCommerce. Para otras plataformas, pasa la URL de la imagen en el atributo data-garment.' },
                  { q: '¿Qué artículos pueden probarse los clientes?', a: 'Ropa (camisetas, vestidos, pantalones, chaquetas), gafas y gafas de sol, joyería (collares, pendientes, pulseras, anillos, relojes), sombreros, zapatos, bolsos, e incluso tatuajes o nail art. La IA detecta el tipo de artículo automáticamente.' },
                  { q: '¿Qué velocidad tiene el renderizado?', a: 'El tiempo medio de render es ~10 segundos dependiendo de la calidad de la imagen. La IA genera una imagen fotorrealista del cliente con el artículo puesto.' },
                  { q: '¿Almacenáis las fotos de los clientes?', a: 'No. Las imágenes de los clientes se procesan en tiempo real y nunca se almacenan en nuestros servidores. Política de retención de datos cero.' },
                  { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí. Las suscripciones mensuales se pueden cancelar en cualquier momento. Mantienes el acceso hasta el final de tu período de facturación.' },
                ] : [
                  { q: 'How does the free trial work?', a: 'Enter your store URL, sign in with Google, add your card and start a 7-day free trial with 50 renders. Nothing is charged during the trial. If you don\'t cancel before day 7, the Starter plan (€150/mo, 200 renders) activates automatically. Cancel anytime.' },
                  { q: 'What happens after the 7 days (or the 50 renders)?', a: 'On day 7 the Starter plan (€150/mo, 200 renders) activates automatically unless you cancel before. You can upgrade to Growth (€499/mo, 1,000 renders) from the dashboard. No setup fee.' },
                  { q: 'Is there a setup fee?', a: 'No. We eliminated setup fees. You only pay the monthly subscription when you\'re ready to go live.' },
                  { q: 'What happens if I don\'t cancel the subscription?', a: 'The subscription renews automatically each month. If you don\'t cancel before the next billing cycle, you will be charged for the next month. You can cancel anytime from your Stripe customer portal. Annual plans are also available — if you switch to annual and don\'t cancel, the full year is charged at renewal.' },
                  { q: 'What platforms are supported?', a: 'The widget works on any website: Shopify, WooCommerce, PrestaShop, Magento, Wix, Squarespace, and any custom-built store. It auto-detects product images on Shopify and WooCommerce. For other platforms, just pass the image URL in the data-garment attribute.' },
                  { q: 'What items can customers try on?', a: 'Clothing (shirts, dresses, pants, jackets), glasses & sunglasses, jewelry (necklaces, earrings, bracelets, rings, watches), hats, shoes, bags, and even tattoos or nail art. The AI detects the item type automatically.' },
                  { q: 'How fast is the rendering?', a: 'Average render time is ~10 seconds depending on image quality. The AI generates a photorealistic image of the customer wearing the item.' },
                  { q: 'Do you store customer photos?', a: 'No. Customer images are processed in real-time and never stored on our servers. Zero data retention policy.' },
                  { q: 'Can I cancel anytime?', a: 'Yes. Monthly subscriptions can be cancelled anytime. You keep access until the end of your billing period.' },
                ]).map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-sm pr-4">{faq.q}</span>
                      <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 -mt-1">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── BOTTOM CTA ── */}
            <div id="contact" className="text-center space-y-4 scroll-mt-20">
              <h2 className="font-serif text-2xl font-black text-slate-900">{lang === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}</h2>
              <p className="text-slate-400 text-sm font-light">{lang === 'es' ? '7 días gratis · 50 renders · 0€ hoy · cancela antes del día 7 y no pagas nada.' : '7-day free trial · 50 renders · $0 today · cancel before day 7 and pay nothing.'}</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors inline-flex items-center gap-3"
              >
                <Sparkles size={16} />
                {lang === 'es' ? 'Empezar Prueba Gratis' : 'Start Free Trial'}
                <ArrowRight size={14} />
              </button>
              <div className="pt-4 space-y-2">
                <Link href="/blog/virtual-dressing-room-online-free" className="text-[10px] text-indigo-500 font-bold hover:text-indigo-700 transition-colors block">
                  {lang === 'es' ? 'Más info: ¿Qué es un Probador Virtual? →' : 'Learn more: What is a Virtual Dressing Room? →'}
                </Link>
                <p className="text-xs text-slate-400">
                  {lang === 'es' ? '¿Preguntas?' : 'Questions?'} <a href="mailto:infoagalaz@gmail.com" className="text-indigo-600 font-bold hover:text-indigo-800">infoagalaz@gmail.com</a>
                </p>
              </div>
            </div>
          </>
        )}

        {/* ═══ STEP: HAS_KEY — Full dashboard + detailed integration ═══ */}
        {step === 'has_key' && (
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">Your account is ready</h1>
              <p className="text-slate-400 text-sm font-light">
                {partnerProfile?.credits_remaining || 5} free renders available — follow the steps below to go live
              </p>
            </div>

            {/* Trial credits counter */}
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Free Trial</span>
                  <p className="text-sm font-bold text-indigo-900 mt-1">
                    {partnerProfile?.credits_remaining || 0} / 50 renders remaining
                  </p>
                </div>
                <Zap size={24} className="text-indigo-300" />
              </div>
              <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${((partnerProfile?.credits_remaining || 0) / 50) * 100}%` }} />
              </div>
              <p className="text-[10px] text-indigo-400">
                Each time a customer generates a virtual try-on, 1 render credit is consumed. On day 7 the Starter plan activates automatically — cancel anytime before to pay nothing.
              </p>
            </div>

            {/* Catalog sync panel — enables AI cross-sell */}
            <div className="p-6 bg-gradient-to-br from-violet-50 via-indigo-50 to-white border border-violet-200 rounded-2xl space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest">
                    {lang === 'es' ? 'Cross-Sell con IA' : 'AI Cross-Sell'}
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {lang === 'es' ? 'Sincroniza tu catálogo' : 'Sync your catalog'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {lang === 'es'
                      ? 'Sincronizamos tus productos desde tu tienda Shopify y los clasificamos con IA para recomendar prendas combinables tras cada prueba virtual.'
                      : 'We sync products from your Shopify store and classify them with AI to recommend matching items after each try-on.'}
                  </p>
                </div>
                <ShoppingBag size={22} className="text-violet-500 shrink-0" />
              </div>

              {catalogStats && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-white rounded-lg border border-violet-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'es' ? 'Productos' : 'Products'}
                    </p>
                    <p className="text-lg font-black text-slate-900 mt-0.5">{catalogStats.total}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-violet-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'es' ? 'Clasificados' : 'Classified'}
                    </p>
                    <p className="text-lg font-black text-slate-900 mt-0.5">{catalogStats.classified}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-violet-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'es' ? 'Último sync' : 'Last sync'}
                    </p>
                    <p className="text-[10px] font-bold text-slate-600 mt-1">
                      {catalogStats.last_synced
                        ? new Date(catalogStats.last_synced).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
                        : (lang === 'es' ? 'Nunca' : 'Never')}
                    </p>
                  </div>
                </div>
              )}

              {syncMessage && (
                <div className={`p-3 rounded-lg text-[11px] font-bold ${
                  syncMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {syncMessage.text}
                </div>
              )}

              <button
                onClick={handleSyncCatalog}
                disabled={syncLoading}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  syncLoading
                    ? 'bg-violet-200 text-violet-400 cursor-not-allowed'
                    : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm'
                }`}
              >
                {syncLoading
                  ? (lang === 'es' ? 'Sincronizando…' : 'Syncing…')
                  : (catalogStats && catalogStats.total > 0
                      ? (lang === 'es' ? 'Re-sincronizar catálogo' : 'Re-sync catalog')
                      : (lang === 'es' ? 'Sincronizar mi catálogo' : 'Sync my catalog'))}
              </button>

              <p className="text-[10px] text-slate-400 leading-relaxed">
                {lang === 'es'
                  ? 'Solo funciona con tiendas Shopify (dominio público *.myshopify.com o custom). Cooldown de 1 hora entre sincronizaciones.'
                  : 'Works only with Shopify stores (*.myshopify.com or custom domain). 1-hour cooldown between syncs.'}
              </p>
            </div>

            {/* ── 1. API KEY ── */}
            {apiKey && (
              <div className="space-y-3">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">1</div>
                  Save your API Key
                </h2>
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-amber-600" />
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                      Secret key — save it now
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-4 py-3 rounded-lg text-sm font-mono text-slate-900 border border-amber-200 break-all">
                      {apiKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(apiKey, 'key')}
                      className="p-3 bg-white border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors shrink-0"
                    >
                      {copied === 'key' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} className="text-amber-600" />}
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-amber-600 font-bold">
                      This key is shown only once. Copy it and store it somewhere safe.
                    </p>
                    <p className="text-[10px] text-amber-500">
                      Your key authenticates all try-on requests from your store. It is hashed on our servers — we cannot retrieve it for you. If you lose it, you will need to generate a new one.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── 2. INTEGRATION GUIDE ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '2' : '1'}</div>
                Install the widget on your store
              </h2>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                The Agalaz widget consists of two pieces: a <strong className="text-slate-600">script tag</strong> that loads our widget engine, and a <strong className="text-slate-600">div element</strong> on each product page where the &ldquo;Try it on&rdquo; button will appear. The widget automatically detects the product image on Shopify and WooCommerce. For other platforms, you pass the image URL manually.
              </p>

              {/* Step 2a: Script tag */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Step A — Add the script to your store&apos;s {'<head>'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(`<script src="https://agalaz.com/widget.js" data-api-key="${apiKey || partnerProfile?.api_key_prefix + '...'}"></script>`, 'script')}
                    className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                  >
                    {copied === 'script' ? <Check size={12} /> : <Copy size={12} />}
                    {copied === 'script' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {`<script src="https://agalaz.com/widget.js" data-api-key="${apiKey || partnerProfile?.api_key_prefix + '...'}"></script>`}
                </code>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  This script is lightweight (~3KB). It loads asynchronously and does not affect your page speed. It only activates on pages that contain the try-on div below.
                </p>
              </div>

              {/* Step 2b: Div */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Step B — Place the try-on button on product pages
                  </span>
                  <button
                    onClick={() => copyToClipboard('<div id="agalaz-tryon" data-garment="PRODUCT_IMAGE_URL"></div>', 'div')}
                    className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                  >
                    {copied === 'div' ? <Check size={12} /> : <Copy size={12} />}
                    {copied === 'div' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {'<div id="agalaz-tryon" data-garment="PRODUCT_IMAGE_URL"></div>'}
                </code>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Place this div where you want the &ldquo;Try it on with AI&rdquo; button to appear — typically below the product image or near the &ldquo;Add to cart&rdquo; button. Replace <code className="text-indigo-600 font-bold">PRODUCT_IMAGE_URL</code> with the direct URL of the product image (must be a real image URL ending in .jpg/.png/.webp, not a page URL).
                </p>
              </div>
            </div>

            {/* ── 3. PLATFORM GUIDES ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '3' : '2'}</div>
                Platform-specific instructions
              </h2>

              {/* Shopify */}
              <div className="p-5 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-green-100 flex items-center justify-center text-[10px]">🛒</span>
                  Shopify
                </h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
                  <li>Go to <strong>Online Store → Themes → Edit code</strong></li>
                  <li>Open <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">theme.liquid</code></li>
                  <li>Paste the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">{'<script>'}</code> tag just before <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">{'</head>'}</code></li>
                  <li>Open your product template (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">sections/main-product.liquid</code>)</li>
                  <li>Add the div where you want the button:</li>
                </ol>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {'<div id="agalaz-tryon" data-garment="{{ product.featured_image | image_url: width: 800 }}"></div>'}
                </code>
                <p className="text-[10px] text-emerald-600 font-bold">
                  The widget also auto-detects Shopify product images — so even without data-garment, it usually works automatically.
                </p>
              </div>

              {/* WooCommerce */}
              <div className="p-5 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center text-[10px]">🔮</span>
                  WooCommerce (WordPress)
                </h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
                  <li>Install a plugin like <strong>&ldquo;Insert Headers and Footers&rdquo;</strong> (by WPCode)</li>
                  <li>Paste the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">{'<script>'}</code> tag in the Header section</li>
                  <li>To add the button, edit your product template or use a shortcode plugin to insert:</li>
                </ol>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {'<div id="agalaz-tryon"></div>'}
                </code>
                <p className="text-[10px] text-emerald-600 font-bold">
                  WooCommerce product images are auto-detected — no data-garment attribute needed.
                </p>
              </div>

              {/* PrestaShop / Magento / Other */}
              <div className="p-5 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-[10px]">🌐</span>
                  PrestaShop, Magento, Wix, or any other platform
                </h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
                  <li>Add the script tag to the global header/head of your store</li>
                  <li>On your product page template, add the div with <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">data-garment</code> pointing to the product image URL</li>
                  <li>Make sure the URL is a <strong>direct image link</strong> (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">https://cdn.store.com/product.jpg</code>), not a page URL</li>
                </ol>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  For platforms where the widget can&apos;t auto-detect images, the <code className="text-indigo-600">data-garment</code> attribute is required. The URL must return an actual image file (JPEG, PNG, or WebP) — not an HTML page.
                </p>
              </div>
            </div>

            {/* ── 4. HOW IT WORKS FOR YOUR CUSTOMERS ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '4' : '3'}</div>
                How it works for your customers
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { num: '1', title: 'See the button', desc: 'A "Try it on with AI" button appears on your product pages, next to the product image.' },
                  { num: '2', title: 'Upload a photo', desc: 'Your customer uploads a selfie, half body, or full body photo. Photos are never stored — zero data retention.' },
                  { num: '3', title: 'AI generates the result', desc: 'In ~10 seconds, our AI generates a photorealistic image of the customer wearing the product. 1 render credit is used.' },
                  { num: '4', title: 'Buy with confidence', desc: 'The customer sees exactly how the product looks on their real body. Fewer returns, higher conversion, happier customers.' },
                ].map((s, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-xl space-y-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-sm mx-auto">{s.num}</div>
                    <h4 className="font-black text-slate-900 text-xs">{s.title}</h4>
                    <p className="text-[10px] text-slate-400 font-light leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. WHAT CAN CUSTOMERS TRY ON ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '5' : '4'}</div>
                Supported items
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { item: 'Clothing', examples: 'Shirts, dresses, pants, jackets, coats, skirts' },
                  { item: 'Glasses', examples: 'Sunglasses, prescription frames, goggles' },
                  { item: 'Jewelry', examples: 'Necklaces, earrings, bracelets, rings, watches' },
                  { item: 'Headwear', examples: 'Hats, caps, beanies, headbands' },
                  { item: 'Shoes', examples: 'Sneakers, heels, boots, sandals' },
                  { item: 'Bags', examples: 'Handbags, backpacks, clutches' },
                  { item: 'Tattoos', examples: 'Temporary tattoos, body art designs' },
                  { item: 'Nail art', examples: 'Manicure styles, nail polish colors' },
                ].map((cat, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <h4 className="font-black text-slate-900 text-xs">{cat.item}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{cat.examples}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-300">
                The AI automatically detects what type of item is in the garment image and applies it to the correct body area.
              </p>
            </div>

            {/* ── 6. SECURITY & PRIVACY ── */}
            <div className="space-y-3">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '6' : '5'}</div>
                Security & privacy
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Domain allowlisting', desc: 'Your API key only works from your registered domain. Requests from unauthorized domains are blocked automatically.' },
                  { title: 'Zero data retention', desc: 'Customer photos are processed in real-time and immediately discarded. We never store, log, or train on customer images.' },
                  { title: 'SHA-256 hashed keys', desc: 'Your API key is hashed before storage. Even if our database were compromised, your key cannot be recovered.' },
                ].map((s, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-xl space-y-2">
                    <Shield size={16} className="text-emerald-600" />
                    <h4 className="font-black text-slate-900 text-xs">{s.title}</h4>
                    <p className="text-[10px] text-slate-400 font-light leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── WHAT'S NEXT ── */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h3 className="font-black text-slate-900 text-sm">What happens next?</h3>
              <div className="space-y-3">
                {[
                  { status: 'now', label: '7-day free trial active', desc: `You have ${partnerProfile?.credits_remaining || 50} renders to test the widget on your real store with real customers. $0 today.` },
                  { status: 'soon', label: 'Day 7 — Starter activates', desc: 'On day 7 the Starter plan (€150/mo, 200 renders) activates automatically unless you cancel before. You can cancel anytime from the dashboard.' },
                  { status: 'later', label: 'Upgrade when you grow', desc: 'Switch to Growth (€499/mo, 1,000 renders) from the dashboard whenever you need more capacity. No setup fee.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.status === 'now' ? 'bg-emerald-500' : item.status === 'soon' ? 'bg-amber-400' : 'bg-slate-300'
                    }`} />
                    <div>
                      <span className="text-xs font-black text-slate-900">{item.label}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── NEED HELP ── */}
            <div className="text-center space-y-2 pt-4">
              <p className="text-xs text-slate-400">
                Need help with the integration? Contact us at{' '}
                <a href="mailto:infoagalaz@gmail.com" className="text-indigo-600 font-bold hover:text-indigo-800">infoagalaz@gmail.com</a>
              </p>
              <Link href="/blog/virtual-dressing-room-online-free" className="text-[10px] text-indigo-500 font-bold hover:text-indigo-700 transition-colors inline-block">
                Learn more: What is a Virtual Dressing Room? →
              </Link>
            </div>
          </div>
        )}

        {/* ═══ STEP: PAYWALL — Trial ended, choose plan ═══ */}
        {step === 'paywall' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                <Zap size={32} className="text-amber-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">Trial ended</h1>
              <p className="text-slate-400 text-sm font-light">
                Your trial ended. Choose a plan to continue.
              </p>
            </div>

            {/* Plan selection */}
            <div className="grid md:grid-cols-2 gap-6">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedPlan === plan.id
                      ? 'border-indigo-600 shadow-lg shadow-indigo-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="font-serif text-4xl font-black text-slate-900">{plan.price}</span>
                        <span className="text-slate-400 text-sm font-bold">&euro;/month</span>
                      </div>
                      <p className="text-xs text-emerald-600 font-bold mt-1">No setup fee</p>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check size={14} className="text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                      <li className="flex items-center gap-2 text-xs text-slate-400">
                        <ArrowRight size={14} className="text-slate-300 shrink-0" />
                        Extra: {plan.extra}&euro;/render
                      </li>
                    </ul>
                    <div className={`w-full py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all ${
                      selectedPlan === plan.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {selectedPlan === plan.id ? 'Selected' : 'Select'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-700 transition-colors inline-flex items-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Redirecting to Stripe...' : `Subscribe — ${PLANS.find(p => p.id === selectedPlan)?.price}€/month`}
                <ArrowRight size={16} />
              </button>
              <p className="text-[10px] text-slate-300 mt-3">Cancel anytime. No setup fee.</p>
            </div>
          </div>
        )}

        {/* ═══ STEP: SUBSCRIBED — Active plan ═══ */}
        {step === 'subscribed' && (
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">Plan active</h1>
              <p className="text-slate-400 text-sm font-light">
                {currentPlan?.name} — {partnerProfile?.credits_remaining} renders available
              </p>
            </div>

            {/* API Key reveal — full key if we have it from sessionStorage, else prefix only */}
            {apiKey && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                    Your API key (save it now)
                  </span>
                  <button
                    onClick={() => copyToClipboard(apiKey, 'apiKey')}
                    className="text-[10px] font-black text-amber-700 hover:text-amber-900 uppercase tracking-widest"
                  >
                    {copied === 'apiKey' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="block text-xs font-mono text-slate-900 bg-white p-3 rounded-lg border border-amber-200 break-all">
                  {apiKey}
                </code>
                <p className="text-[10px] text-amber-700 font-light leading-relaxed">
                  This is shown once. After leaving this page you cannot recover it — only rotate to a new one.
                </p>
              </div>
            )}

            {/* Integration instructions */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Globe size={16} className="text-indigo-600" />
                Integration
              </h2>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Widget script
                </span>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {`<script src="https://agalaz.com/widget.js" data-api-key="${apiKey || (partnerProfile?.api_key_prefix ? partnerProfile.api_key_prefix + '...' : 'agz_live_...')}"></script>`}
                </code>
              </div>
            </div>

            {/* Lost the key? Rotate to a new one */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3">
              <div>
                <h3 className="font-black text-slate-900 text-sm">Lost your API key?</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed mt-1">
                  Generate a new one. The old key stops working immediately — update it everywhere you use it.
                </p>
              </div>
              <button
                onClick={async () => {
                  if (!partnerProfile?.id) return;
                  if (!confirm('Rotate your API key? The old key will stop working immediately.')) return;
                  setIsSubmitting(true);
                  try {
                    const res = await fetch('/api/partners/rotate-key', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ partner_id: partnerProfile.id }),
                    });
                    const data = await res.json();
                    if (res.ok && data.api_key) {
                      setApiKey(data.api_key);
                      setPartnerProfile({ ...partnerProfile, api_key_prefix: data.api_key_prefix });
                    } else {
                      alert(data.error || 'Rotation failed');
                    }
                  } catch {
                    alert('Network error');
                  }
                  setIsSubmitting(false);
                }}
                disabled={isSubmitting}
                className="w-full py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.15em] hover:bg-indigo-600 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Rotating…' : 'Rotate API Key'}
              </button>
            </div>

            {/* Usage */}
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    {currentPlan?.name} plan active
                  </span>
                  <p className="text-sm font-bold text-emerald-900 mt-1">
                    {partnerProfile?.credits_remaining} / {currentPlan?.renders} renders this month
                  </p>
                </div>
                <Check size={24} className="text-emerald-400" />
              </div>
              <div className="mt-3 h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all"
                  style={{ width: `${((partnerProfile?.credits_remaining || 0) / (currentPlan?.renders || 200)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatBot />

      {/* Captcha modal — guards register + sync-catalog */}
      {captchaPurpose && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <p className="text-center text-sm font-black text-slate-900 tracking-tight">
              {lang === 'es' ? 'Confirma que no eres un robot' : 'Confirm you are human'}
            </p>
            <div id="agalaz-partners-turnstile" className="flex justify-center min-h-[65px] items-center">
              <span className="text-[10px] text-slate-400">{lang === 'es' ? 'Verificando...' : 'Verifying...'}</span>
            </div>
            <button
              onClick={() => setCaptchaPurpose(null)}
              className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
            >
              {lang === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
