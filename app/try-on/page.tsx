'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  RefreshCcw,
  Shirt,
  AlertCircle,
  X,
  Loader2,
  ArrowLeft,
  Download,
  Zap,
  Share2,
  ImagePlus,
  Camera,
} from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { onAuthStateChange, signInWithGoogle, signInWithOtp, type AppUser } from '@/services/authService';
import { Role, type ChatMessage } from '@/types';
import { useLang, pickLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { nativeLandingPath, type LandingLang } from '@/lib/i18n/landingSlugs';

export default function TryOnPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  const [user, setUser] = useState<AppUser | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [tryOnCategory, setTryOnCategory] = useState<string>('auto');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [renderCount, setRenderCount] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [chatAttachment, setChatAttachment] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [gateReady, setGateReady] = useState(false);

  async function handleLoginOtp() {
    if (!otpEmail || !otpEmail.includes('@')) return;
    try {
      (window as any).datafast?.('signup_click', { provider: 'email', source: 'try-on' });
      await signInWithOtp(otpEmail, '/try-on');
      setOtpSent(true);
    } catch {}
  }
  const [showCreditShop, setShowCreditShop] = useState(false);
  const [creditQty, setCreditQty] = useState(1);
  const chatFileRef = useRef<HTMLInputElement>(null);

  // Gate: check auth → check subscription → allow or redirect
  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        try {
          const res = await fetch('/api/subscription');
          if (res.ok) {
            const status = await res.json();
            // Only redirect to paywall if NOT pro AND no credits
            // Pro users with 0 credits will get lazy-reset by the API
            if (status.creditsRemaining <= 0 && !status.isPro) {
              router.push('/paywall');
              return;
            }
          } else {
            router.push('/paywall');
            return;
          }
        } catch {
          router.push('/paywall');
          return;
        }
        setGateReady(true);
      } else {
        setShowLogin(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    (window as any).datafast?.('tryon_view');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('subscribed') === 'true') {
      fetch('/api/subscription').then(r => r.json()).then(status => {
        if (status.plan === 'yearly' && status.creditsRemaining <= 2) {
          (window as any).datafast?.('trial_start', { plan: 'yearly' });
        } else {
          (window as any).datafast?.('subscription_success', { plan: status.plan || 'weekly' });
        }
      }).catch(() => {
        (window as any).datafast?.('subscription_success');
      });
    }
    // Credit pack purchase redirect
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('credits_purchased')) {
      (window as any).datafast?.('credits_purchased', { amount: 20 });
    }
    // Pre-select category from URL param (e.g. from landing pages)
    if (typeof window !== 'undefined') {
      const cat = new URLSearchParams(window.location.search).get('category');
      if (cat) setTryOnCategory(cat);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);
    }
  }, [messages, isAnalyzing, isGeneratingImage]);

  const trackAndSetUser = (img: string | null) => {
    setUserImage(img);
    if (img) (window as any).datafast?.('photo_upload', { type: 'user' });
  };
  const trackAndSetClothing = (img: string | null) => {
    setClothingImage(img);
    if (img) (window as any).datafast?.('photo_upload', { type: 'clothing' });
  };

  const resetApp = () => {
    setUserImage(null);
    setClothingImage(null);
    setTryOnCategory('auto');
    setMessages([]);
    setInputValue('');
    setError(null);
    setRenderCount(0);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const saveToGallery = (_imageUrl: string) => {
    // Images are not saved to protect user privacy
  };

  const handleStartAnalysis = async () => {
    if (!userImage) {
      setError(pickLang(lang, 'Upload a photo of yourself to start', 'Sube una foto tuya para empezar', 'Téléchargez une photo de vous pour commencer', 'Carregue uma foto sua para começar', 'Lade ein Foto von dir hoch, um zu starten', 'Carica una tua foto per iniziare'));
      return;
    }
    if (!user) {
      setShowLogin(true);
      return;
    }

    setIsAnalyzing(true);
    setIsGeneratingImage(true);
    setError(null);
    setMessages([]);

    (window as any).datafast?.('render_start', { has_clothing: clothingImage ? 'yes' : 'no' });

    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userImage, clothingImage, category: tryOnCategory !== 'auto' ? tryOnCategory : undefined }),
        });
        const data = await res.json();

        if (res.status === 403 && data.error === 'NO_CREDITS') {
          router.push('/paywall');
          return;
        }

        if (data.image) {
          setMessages([{
            role: Role.MODEL,
            text: clothingImage ? t.segmented : t.seamlessId,
            image: data.image,
          }]);
          setRenderCount((prev) => prev + 1);
          saveToGallery(data.image);
          (window as any).datafast?.('render_complete', { render_number: String(renderCount + 1) });
          break;
        } else if (retries < maxRetries) {
          retries++;
          continue;
        } else {
          setError(data.error || t.precisionError);
        }
      } catch {
        if (retries < maxRetries) {
          retries++;
          continue;
        }
        setError(t.engineError);
      }
      break;
    }

    setIsAnalyzing(false);
    setIsGeneratingImage(false);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1280;
          const MIN_DIM = 768;
          let { width, height } = img;
          if (width < MIN_DIM || height < MIN_DIM) {
            const scale = MIN_DIM / Math.min(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          if (width > MAX_DIM || height > MAX_DIM) {
            const scale = MAX_DIM / Math.max(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/jpeg', 0.90);
          let base64 = dataUrl.split(',')[1];
          if (base64.length < 40000) {
            dataUrl = canvas.toDataURL('image/jpeg', 0.97);
            base64 = dataUrl.split(',')[1];
          }
          if (base64.length < 30000) {
            dataUrl = canvas.toDataURL('image/png');
            base64 = dataUrl.split(',')[1];
          }
          resolve(base64);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleChatFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await compressImage(file);
        setChatAttachment(base64);
      } catch {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setChatAttachment(result.split(',')[1]);
        };
        reader.readAsDataURL(file);
      }
    }
    e.target.value = '';
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isAnalyzing || isGeneratingImage) return;

    const attachedImage = chatAttachment;
    setChatAttachment(null);

    setMessages((prev) => [...prev, {
      role: Role.USER,
      text: attachedImage ? `${text} [+image]` : text,
      image: attachedImage ? `data:image/jpeg;base64,${attachedImage}` : undefined,
    }]);
    setInputValue('');
    setIsAnalyzing(true);
    setError(null);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const chatData = await chatRes.json();
      const modelText = chatData.text || 'Adjusting...';

      setMessages((prev) => [...prev, { role: Role.MODEL, text: modelText }]);
      setIsAnalyzing(false);

      const hasExistingImage = messages.some((m) => m.image);
      if (hasExistingImage) {
        setIsGeneratingImage(true);
        const lastImage = [...messages].reverse().find((m) => m.image && m.role === Role.MODEL)?.image;
        const effectiveClothing = attachedImage || clothingImage;

        let genData: any = null;
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const genRes = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userImage,
                clothingImage: effectiveClothing,
                modificationPrompt: text,
                lastRenderedImage: lastImage,
              }),
            });
            const genResData = await genRes.json();

            if (genRes.status === 403 && genResData.error === 'NO_CREDITS') {
              router.push('/paywall');
              return;
            }

            genData = genResData;
            if (genData.image) break;
          } catch {
            if (attempt === 1) break;
          }
        }

        if (genData?.image) {
          setMessages((prev) => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];
            if (lastMsg && lastMsg.role === Role.MODEL) {
              lastMsg.image = genData.image;
            }
            return newMsgs;
          });
          saveToGallery(genData.image);
        }
        setIsGeneratingImage(false);
      }
    } catch {
      setError(t.updateError);
      setIsAnalyzing(false);
      setIsGeneratingImage(false);
    }
  };

  const handleShareImage = async (imageUrl: string) => {
    if (navigator.share) {
      try {
        const blob = await fetch(imageUrl).then(r => r.blob());
        const file = new File([blob], 'agalaz-tryon.png', { type: 'image/png' });
        await navigator.share({ files: [file], title: 'Agalaz Fashion' });
        (window as any).datafast?.('result_share');
      } catch {}
    }
  };

  const handleDownloadImage = (imageUrl: string) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'agalaz-tryon.png';
    a.click();
    (window as any).datafast?.('result_download');
  };

  const isLoading = isAnalyzing || isGeneratingImage;
  const canRender = userImage && !isLoading;

  if (!gateReady && !showLogin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Nav */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                aria-label={pickLang(lang, 'Back to home', 'Volver al inicio', 'Retour à l’accueil', 'Voltar ao início', 'Zurück zur Startseite', 'Torna alla home')}
                className="p-2.5 -ml-1.5 hover:bg-slate-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-slate-500" />
              </button>
              {user ? (
                <button
                  onClick={() => router.push('/profile')}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-indigo-200">
                    <img
                      src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-900 tracking-tight hidden sm:block">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <Link href="/" className="font-serif text-xl tracking-[0.15em] text-slate-900 font-black">
                  AGALAZ
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Buy credits button */}
              {user && (
                <button
                  onClick={() => { setCreditQty(1); setShowCreditShop(true); }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] bg-amber-50 border border-amber-200 rounded-full hover:bg-amber-100 transition-colors"
                  aria-label={pickLang(lang, 'Buy credits', 'Comprar créditos', 'Acheter des crédits', 'Comprar créditos', 'Credits kaufen', 'Acquista crediti')}
                >
                  <Zap size={14} className="text-amber-600" />
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-wide">
                    +{pickLang(lang, 'Credits', 'Créditos', 'Crédits', 'Créditos', 'Credits', 'Crediti')}
                  </span>
                </button>
              )}
              <LanguageToggle />
              {(userImage || messages.length > 0) && (
                <>
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                    >
                      <Shirt size={12} className="text-slate-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">
                        {t.editBtn}
                      </span>
                    </button>
                  )}
                  <button
                    onClick={resetApp}
                    className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCcw size={14} className="text-slate-400" />
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Render counter */}
        {renderCount > 0 && (
          <div className="flex justify-center py-3 border-b border-slate-100">
            <div className="flex items-center gap-3 px-4 py-1.5">
              <Sparkles size={12} className="text-indigo-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                {renderCount} renders
              </span>
              <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((renderCount / 14) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 hide-scrollbar"
          style={{ paddingBottom: 'max(120px, 18vh)' }}
        >
          {messages.length === 0 ? (
            <div className="max-w-lg mx-auto space-y-8 animate-fade-in">
              <div className="text-center space-y-3 px-4 pt-6">
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {pickLang(lang, 'AI Virtual Try-On', 'Probador Virtual IA', 'Essayage Virtuel AI', 'Provador Virtual AI', 'AI Virtuelle Anprobe', 'Camerino Virtuale AI')}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[0.9]">
                  {t.preserveTitle}
                  <br />
                  <span className="italic text-slate-400">{t.preserveHighlight}</span>
                </h1>
                <p className="text-slate-500 text-sm font-light max-w-sm mx-auto">
                  {pickLang(lang,
                    'Upload a photo of yourself and the garment you want to try on',
                    'Sube una foto tuya y la prenda que quieras probarte',
                    'Téléchargez une photo de vous et le vêtement que vous voulez essayer',
                    'Carregue uma foto sua e a peça que quer experimentar',
                    'Lade ein Foto von dir und das Kleidungsstück hoch, das du anprobieren möchtest',
                    'Carica una tua foto e il capo che vuoi provare')}
                </p>
              </div>

              <div className="space-y-4">
                {/* Category selector */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">1</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {pickLang(lang, 'What to try on', 'Qué quieres probar', 'Que voulez-vous essayer', 'O que quer experimentar', 'Was möchtest du anprobieren', 'Cosa vuoi provare')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { value: 'auto', es: 'Auto-detectar', en: 'Auto-detect', fr: 'Détection auto', pt: 'Detecção automática', de: 'Auto-Erkennung', it: 'Rilevamento automatico', icon: '✨' },
                      { value: 'clothing', es: 'Ropa', en: 'Clothing', fr: 'Vêtements', pt: 'Roupa', de: 'Kleidung', it: 'Abbigliamento', icon: '👕' },
                      { value: 'glasses', es: 'Gafas', en: 'Glasses', fr: 'Lunettes', pt: 'Óculos', de: 'Brille', it: 'Occhiali', icon: '👓' },
                      { value: 'jewelry', es: 'Joyería', en: 'Jewelry', fr: 'Bijoux', pt: 'Joias', de: 'Schmuck', it: 'Gioielli', icon: '💎' },
                      { value: 'headwear', es: 'Sombreros', en: 'Headwear', fr: 'Chapeaux', pt: 'Chapéus', de: 'Kopfbedeckung', it: 'Cappelli', icon: '🎩' },
                      { value: 'shoes', es: 'Zapatos', en: 'Shoes', fr: 'Chaussures', pt: 'Sapatos', de: 'Schuhe', it: 'Scarpe', icon: '👟' },
                      { value: 'bags', es: 'Bolsos', en: 'Bags', fr: 'Sacs', pt: 'Bolsas', de: 'Taschen', it: 'Borse', icon: '👜' },
                      { value: 'tattoo', es: 'Tatuajes', en: 'Tattoos', fr: 'Tatouages', pt: 'Tatuagens', de: 'Tattoos', it: 'Tatuaggi', icon: '🪡' },
                      { value: 'nails', es: 'Uñas / Nail Art', en: 'Nails / Nail Art', fr: 'Ongles / Nail Art', pt: 'Unhas / Nail Art', de: 'Nägel / Nail Art', it: 'Unghie / Nail Art', icon: '💅' },
                      { value: 'ring-sizer', es: 'Talla de anillo', en: 'Ring Sizer', fr: 'Taille de bague', pt: 'Tamanho do anel', de: 'Ringgröße', it: 'Misura anello', icon: '💍' },
                    ].map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setTryOnCategory(cat.value)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-1.5 ${
                          tryOnCategory === cat.value
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-50 border border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-600'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        {pickLang(lang, cat.en, cat.es, cat.fr, cat.pt, cat.de, cat.it)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo upload */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">2</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {tryOnCategory === 'ring-sizer'
                        ? pickLang(lang, 'Photo of your hand', 'Foto de tu mano', 'Photo de votre main', 'Foto da sua mão', 'Foto deiner Hand', 'Foto della tua mano')
                        : pickLang(lang, 'Your photo', 'Tu foto', 'Votre photo', 'A sua foto', 'Dein Foto', 'La tua foto')}
                    </span>
                  </div>
                  <ImageUploader
                    label={tryOnCategory === 'ring-sizer'
                      ? pickLang(lang, 'Photo of your hand', 'Foto de tu mano', 'Photo de votre main', 'Foto da sua mão', 'Foto deiner Hand', 'Foto della tua mano')
                      : pickLang(lang, 'Your photo', 'Tu foto', 'Votre photo', 'A sua foto', 'Dein Foto', 'La tua foto')}
                    type="user"
                    image={userImage}
                    onImageSelect={trackAndSetUser}
                    icon={<Camera size={20} className="text-indigo-600" />}
                  />
                  <p className="text-[9px] font-bold text-slate-300 text-center mt-1.5">
                    {tryOnCategory === 'ring-sizer'
                      ? pickLang(lang, 'Clear photo of your hand with fingers extended', 'Foto clara de tu mano con los dedos extendidos', 'Photo claire de votre main avec les doigts tendus', 'Foto nítida da sua mão com os dedos esticados', 'Klares Foto deiner Hand mit ausgestreckten Fingern', 'Foto chiara della tua mano con le dita distese')
                      : pickLang(lang, 'Selfie, half body, or full body', 'Selfie, medio cuerpo o cuerpo entero', 'Selfie, demi-corps ou corps entier', 'Selfie, meio corpo ou corpo inteiro', 'Selfie, halbkörper oder ganzkörper', 'Selfie, mezzo busto o corpo intero')}
                  </p>
                </div>

                {/* Garment upload */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">3</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {pickLang(lang, 'Garment, accessory or tattoo', 'Prenda, accesorio o tatuaje', 'Vêtement, accessoire ou tatouage', 'Peça, acessório ou tatuagem', 'Kleidungsstück, Accessoire oder Tattoo', 'Capo, accessorio o tatuaggio')} ({t.optional})
                    </span>
                  </div>
                  <ImageUploader
                    label={pickLang(lang, `Garment, accessory or tattoo (${t.optional})`, `Prenda, accesorio o tatuaje (${t.optional})`, `Vêtement, accessoire ou tatouage (${t.optional})`, `Peça, acessório ou tatuagem (${t.optional})`, `Kleidungsstück, Accessoire oder Tattoo (${t.optional})`, `Capo, accessorio o tatuaggio (${t.optional})`)}
                    type="clothing"
                    image={clothingImage}
                    onImageSelect={trackAndSetClothing}
                    icon={<Shirt size={20} className="text-indigo-600" />}
                  />
                </div>

                {/* Chat tip */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-start gap-2.5">
                  <Send size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-bold text-indigo-600/70 leading-relaxed">
                    {pickLang(lang,
                      'Use the chat to describe what you want before or after the render: size, color, sleeves, tattoo, nails...',
                      'Usa el chat para describir lo que quieres antes o después del render: talla, color, manga, tatuaje, uñas...',
                      'Utilisez le chat pour décrire ce que vous voulez avant ou après le render : taille, couleur, manches, tatouage, ongles...',
                      'Use o chat para descrever o que quer antes ou depois do render: tamanho, cor, mangas, tatuagem, unhas...',
                      'Nutze den Chat, um zu beschreiben, was du vor oder nach dem Render möchtest: Größe, Farbe, Ärmel, Tattoo, Nägel...',
                      'Usa la chat per descrivere ciò che vuoi prima o dopo il render: taglia, colore, maniche, tatuaggio, unghie...')}
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3 animate-fade-in">
                  <AlertCircle size={18} className="text-red-500 shrink-0" />
                  <span className="text-xs font-bold text-red-600">{error}</span>
                </div>
              )}

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
                    <Sparkles size={24} className="text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-sm font-black text-slate-700 tracking-tight">
                    {pickLang(lang, 'Generating your virtual try-on...', 'Generando tu prueba virtual...', 'Génération de votre essayage virtuel...', 'A gerar o seu provador virtual...', 'Erstelle deine virtuelle Anprobe...', 'Generazione del tuo camerino virtuale...')}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {pickLang(lang, 'This may take up to 1 minute', 'Puede tardar hasta 1 minuto', 'Cela peut prendre jusqu\'à 1 minute', 'Pode demorar até 1 minuto', 'Dies kann bis zu 1 Minute dauern', 'Può richiedere fino a 1 minuto')}
                  </p>
                  <a href="https://agalaz.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-6 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full hover:border-indigo-300 transition-colors">
                    <Sparkles size={12} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-400">Powered by</span>
                    <span className="text-xs font-black text-indigo-600">agalaz.com</span>
                  </a>
                </div>
              ) : (
                <button
                  onClick={handleStartAnalysis}
                  disabled={!canRender}
                  className={`w-full py-4 min-h-[56px] flex items-center justify-center gap-3 transition-all font-black uppercase tracking-[0.2em] text-xs md:text-sm rounded-xl ${
                    canRender
                      ? 'bg-slate-900 text-white hover:bg-indigo-600 active:bg-indigo-700 shadow-lg'
                      : 'bg-slate-100 text-slate-300 border border-slate-200'
                  }`}
                >
                  <Sparkles size={18} />
                  {t.renderBtn}
                </button>
              )}
            </div>
          ) : (
            <div className="max-w-lg mx-auto space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === Role.USER ? 'items-end' : 'items-start'} animate-fade-in-up`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {msg.role === Role.USER && msg.image ? (
                    <div className="max-w-[85%] space-y-2">
                      <div className="bg-slate-900 rounded-2xl rounded-br-sm p-4">
                        <p className="text-[13px] font-bold text-white">{msg.text.replace(' [+image]', '')}</p>
                      </div>
                      <div className="w-16 h-16 rounded-lg overflow-hidden ring-2 ring-indigo-200 ml-auto">
                        <img src={msg.image} alt="Reference" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ) : msg.image ? (
                    <div className="w-full space-y-3">
                      <button
                        onClick={() => setFullscreenImage(msg.image!)}
                        className="block rounded-2xl overflow-hidden w-full hover:ring-2 hover:ring-indigo-200 transition-all"
                        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
                      >
                        <img
                          src={msg.image}
                          alt="Try-on result"
                          className="w-full"
                          style={{ aspectRatio: '3 / 4', objectFit: 'cover' }}
                        />
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownloadImage(msg.image!)}
                          className="flex-1 py-2.5 flex items-center justify-center gap-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <Download size={14} className="text-slate-500" />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {pickLang(lang, 'Save', 'Guardar', 'Enregistrer', 'Guardar', 'Speichern', 'Salva')}
                          </span>
                        </button>
                        <button
                          onClick={() => handleShareImage(msg.image!)}
                          className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                        >
                          <Share2 size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {pickLang(lang, 'Share', 'Compartir', 'Partager', 'Partilhar', 'Teilen', 'Condividi')}
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] p-4 ${
                        msg.role === Role.USER
                          ? 'bg-slate-900 text-white rounded-2xl rounded-br-sm'
                          : 'bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-sm'
                      }`}
                    >
                      <p className={`text-[13px] font-bold ${
                        msg.role === Role.USER ? 'text-white' : 'text-slate-500'
                      }`}>
                        {msg.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
                    <Sparkles size={24} className="text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-sm font-black text-slate-700 tracking-tight">
                    {pickLang(lang, 'Generating your virtual try-on...', 'Generando tu prueba virtual...', 'Génération de votre essayage virtuel...', 'A gerar o seu provador virtual...', 'Erstelle deine virtuelle Anprobe...', 'Generazione del tuo camerino virtuale...')}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {pickLang(lang, 'This may take up to 1 minute', 'Puede tardar hasta 1 minuto', 'Cela peut prendre jusqu\'à 1 minute', 'Pode demorar até 1 minuto', 'Dies kann bis zu 1 Minute dauern', 'Può richiedere fino a 1 minuto')}
                  </p>
                  <a href="https://agalaz.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-6 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full hover:border-indigo-300 transition-colors">
                    <Sparkles size={12} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-400">Powered by</span>
                    <span className="text-xs font-black text-indigo-600">agalaz.com</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input */}
        {(
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-slate-100 z-20" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
            {!isLoading && messages.some(m => m.image) && (
              <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto hide-scrollbar">
                {pickLang(lang,
                  ['Bigger size', 'Smaller size', 'Long sleeves', 'Change color', 'Tighter fit'],
                  ['Talla más grande', 'Talla más pequeña', 'Manga larga', 'Cambiar color', 'Más ajustado'],
                  ['Plus grand', 'Plus petit', 'Manches longues', 'Changer de couleur', 'Plus ajusté'],
                  ['Tamanho maior', 'Tamanho menor', 'Manga comprida', 'Mudar cor', 'Mais justo'],
                  ['Größere Größe', 'Kleinere Größe', 'Lange Ärmel', 'Farbe ändern', 'Engerer Sitz'],
                  ['Taglia più grande', 'Taglia più piccola', 'Maniche lunghe', 'Cambia colore', 'Più aderente']
                ).map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="shrink-0 px-3 py-1.5 border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            {chatAttachment && (
              <div className="px-4 pt-2 flex items-center gap-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden ring-2 ring-indigo-200">
                  <img src={`data:image/jpeg;base64,${chatAttachment}`} alt="Attached" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setChatAttachment(null)}
                    className="absolute -top-0.5 -right-0.5 bg-slate-900 rounded-full p-0.5"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </div>
                <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">
                  {pickLang(lang, 'Reference attached', 'Referencia adjunta', 'Référence jointe', 'Referência anexada', 'Referenz angehängt', 'Riferimento allegato')}
                </span>
              </div>
            )}
            <div className="max-w-lg mx-auto flex items-center gap-2 p-2 px-4">
              <div className="flex-1 flex items-center gap-2 p-1 border border-slate-200 rounded-xl bg-white">
                <button
                  onClick={() => chatFileRef.current?.click()}
                  className="p-2.5 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
                >
                  <ImagePlus size={16} className={chatAttachment ? 'text-indigo-600' : 'text-slate-300'} />
                </button>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage(inputValue);
                  }}
                  placeholder={t.chatPlaceholder}
                  className="flex-1 px-2 py-2.5 text-base sm:text-[13px] font-bold text-slate-900 placeholder:text-slate-300 bg-transparent outline-none"
                  enterKeyHint="send"
                  autoComplete="off"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-2.5 rounded-lg transition-all ${
                    !inputValue.trim() || isLoading
                      ? 'bg-slate-50'
                      : 'bg-slate-900 hover:bg-indigo-600 shadow-sm'
                  }`}
                >
                  <Send size={16} className={!inputValue.trim() || isLoading ? 'text-slate-300' : 'text-white'} />
                </button>
              </div>
            </div>
            <input
              ref={chatFileRef}
              type="file"
              accept="image/*"
              onChange={handleChatFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* SEO footer — gives Ahrefs-visible outgoing links from /try-on (and its
          5 localized re-exports) so the route stops being flagged as "page
          with no outgoing links". Locale-aware native-slug URLs via
          nativeLandingPath. */}
      <footer className="border-t border-slate-100 bg-slate-50/50 mt-auto">
        <div className="max-w-5xl mx-auto px-5 py-10 text-sm text-slate-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
                {pickLang(lang, 'Try-on', 'Probador', 'Essayage', 'Provador', 'Anprobe', 'Camerino')}
              </h3>
              <ul className="space-y-2">
                <li><Link href={nativeLandingPath('virtual-wedding-dress-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Wedding dresses', 'Vestidos de novia', 'Robes de mariée', 'Vestidos de noiva', 'Brautkleider', 'Abiti da sposa')}</Link></li>
                <li><Link href={nativeLandingPath('realistic-swimwear-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Bikinis', 'Bikinis', 'Bikinis', 'Biquínis', 'Bikinis', 'Bikini')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-jewelry-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Jewelry', 'Joyas', 'Bijoux', 'Joias', 'Schmuck', 'Gioielli')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-glasses-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Glasses', 'Gafas', 'Lunettes', 'Óculos', 'Brillen', 'Occhiali')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
                {pickLang(lang, 'Beauty', 'Belleza', 'Beauté', 'Beleza', 'Beauty', 'Beauty')}
              </h3>
              <ul className="space-y-2">
                <li><Link href={nativeLandingPath('virtual-tattoo-simulator', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Tattoo simulator', 'Simulador de tatuajes', 'Simulateur tatouage', 'Simulador de tatuagem', 'Tattoo-Simulator', 'Simulatore tatuaggi')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-nail-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Nails', 'Uñas', 'Vernis ongles', 'Unhas', 'Nägel', 'Unghie')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-hairstyle-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Hairstyles', 'Peinados', 'Coiffures', 'Penteados', 'Frisuren', 'Acconciature')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-earring-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Earrings', 'Pendientes', 'Boucles d\'oreilles', 'Brincos', 'Ohrringe', 'Orecchini')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
                {pickLang(lang, 'Categories', 'Categorías', 'Catégories', 'Categorias', 'Kategorien', 'Categorie')}
              </h3>
              <ul className="space-y-2">
                <li><Link href={nativeLandingPath('virtual-mens-suit-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Men\'s suits', 'Trajes hombre', 'Costumes homme', 'Fatos masculinos', 'Herrenanzüge', 'Abiti uomo')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-baby-clothing-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Baby clothing', 'Ropa de bebé', 'Vêtements bébé', 'Roupa de bebê', 'Babykleidung', 'Vestiti neonato')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-pet-clothing-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Pet clothing', 'Ropa de mascotas', 'Vêtements animaux', 'Roupa de animal', 'Haustierkleidung', 'Vestiti animali')}</Link></li>
                <li><Link href={nativeLandingPath('virtual-costume-try-on', lang as LandingLang)} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Costumes', 'Disfraces', 'Déguisements', 'Fatos de carnaval', 'Kostüme', 'Costumi')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
                {pickLang(lang, 'Company', 'Empresa', 'Entreprise', 'Empresa', 'Unternehmen', 'Azienda')}
              </h3>
              <ul className="space-y-2">
                <li><Link href={lang === 'en' ? '/' : `/${lang}`} className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Home', 'Inicio', 'Accueil', 'Início', 'Startseite', 'Home')}</Link></li>
                <li><Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link></li>
                <li><Link href="/partners" className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Partners', 'Partners', 'Partenaires', 'Parceiros', 'Partner', 'Partner')}</Link></li>
                <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Privacy', 'Privacidad', 'Confidentialité', 'Privacidade', 'Datenschutz', 'Privacy')}</Link></li>
                <li><Link href="/terms" className="hover:text-slate-900 transition-colors">{pickLang(lang, 'Terms', 'Términos', 'Conditions', 'Termos', 'AGB', 'Termini')}</Link></li>
              </ul>
            </div>
          </div>
          <p className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500">
            © {new Date().getFullYear()} Agalaz Fashion · infoagalaz@gmail.com
          </p>
        </div>
      </footer>

      {/* Credit Shop Modal */}
      {showCreditShop && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowCreditShop(false)}>
          <div className="bg-white mx-4 md:mx-6 p-5 md:p-7 rounded-2xl max-w-md w-full text-center space-y-5 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mx-auto">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-black text-slate-900 tracking-tight">
                {pickLang(lang, 'Buy Now', 'Comprar Ahora', 'Acheter Maintenant', 'Comprar Agora', 'Jetzt Kaufen', 'Acquista Ora')}
              </h3>
              <p className="text-slate-400 text-sm mt-2 font-light">
                {pickLang(lang, 'One-time payment · no subscription · no expiry', 'Pago único · sin suscripción · sin caducidad', 'Paiement unique · sans abonnement · sans expiration', 'Pagamento único · sem subscrição · sem expiração', 'Einmalzahlung · kein Abo · keine Ablauf', 'Pagamento unico · senza abbonamento · senza scadenza')}
              </p>
            </div>

            {/* Two-tier pack selection */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  plan: 'test',
                  name: 'Starter',
                  price: '$4,99',
                  description: pickLang(lang, '10 renders · $0.50 each', '10 renders · $0,50 cada uno', '10 rendus · 0,50 $ chacun', '10 renders · $0,50 cada um', '10 Renders · $0,50 pro Stück', '10 render · $0,50 ciascuno'),
                  hint: pickLang(lang, 'Try the platform', 'Prueba la plataforma', 'Testez la plateforme', 'Experimente a plataforma', 'Plattform testen', 'Prova la piattaforma'),
                  credits: 10,
                  bg: 'bg-white',
                  border: 'border-slate-200',
                  badge: null as string | null,
                },
                {
                  plan: 'popular',
                  name: 'Style Pro',
                  price: '$9,99',
                  description: pickLang(lang, '25 renders · $0.40 each', '25 renders · $0,40 cada uno', '25 rendus · 0,40 $ chacun', '25 renders · $0,40 cada um', '25 Renders · $0,40 pro Stück', '25 render · $0,40 ciascuno'),
                  hint: pickLang(lang, 'SAVE 20%', 'AHORRA 20%', 'ÉCONOMISEZ 20%', 'POUPE 20%', 'SPARE 20%', 'RISPARMIA 20%'),
                  credits: 25,
                  bg: 'bg-indigo-50',
                  border: 'border-indigo-300',
                  badge: pickLang(lang, 'POPULAR', 'POPULAR', 'POPULAIRE', 'POPULAR', 'BELIEBT', 'POPOLARE'),
                },
              ].map((tier) => (
                <button
                  key={tier.plan}
                  onClick={async () => {
                    if (!user) { setShowLogin(true); return; }
                    (window as any).datafast?.('credits_pack_purchase', { plan: tier.plan, credits: tier.credits });
                    try {
                      const { createBrowserClient } = await import('@supabase/ssr');
                      const sb = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
                      const { data: { user: sbUser } } = await sb.auth.getUser();
                      if (!sbUser) { alert(pickLang(lang, 'Auth error. Please reload.', 'Error de autenticación. Recarga la página.', 'Erreur d\'authentification. Veuillez recharger.', 'Erro de autenticação. Recarregue a página.', 'Authentifizierungsfehler. Bitte neu laden.', 'Errore di autenticazione. Ricarica la pagina.')); return; }
                      const res = await fetch('/api/stripe/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ plan: tier.plan, email: user.email, userId: sbUser.id }),
                      });
                      const data = await res.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        console.error('Stripe checkout error:', data.error);
                        alert(pickLang(lang, 'Stripe connection error. Please try again.', 'Error al conectar con Stripe. Inténtalo de nuevo.', 'Erreur de connexion à Stripe. Veuillez réessayer.', 'Erro de ligação ao Stripe. Tente novamente.', 'Stripe-Verbindungsfehler. Bitte versuche es erneut.', 'Errore di connessione a Stripe. Riprova.'));
                      }
                    } catch (err) {
                      console.error('Credit purchase error:', err);
                      alert(pickLang(lang, 'Purchase error. Please try again.', 'Error al procesar la compra. Inténtalo de nuevo.', 'Erreur de paiement. Veuillez réessayer.', 'Erro na compra. Tente novamente.', 'Kauffehler. Bitte versuche es erneut.', 'Errore nell\'acquisto. Riprova.'));
                    }
                  }}
                  className={`relative ${tier.bg} ${tier.border} border-2 rounded-2xl p-4 text-left hover:shadow-md transition-all`}
                >
                  {tier.badge && (
                    <span className="absolute -top-2 right-3 bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {tier.badge}
                    </span>
                  )}
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{tier.name}</div>
                  <div className="text-2xl font-black text-slate-900 mb-1">{tier.price}</div>
                  <div className="text-[11px] text-slate-500 font-light leading-tight mb-2">{tier.description}</div>
                  <div className="text-[10px] text-indigo-600 font-bold">{tier.hint}</div>
                  <div className="mt-3 text-[11px] font-black text-slate-900 uppercase tracking-widest">
                    {pickLang(lang, 'Buy Now →', 'Comprar Ahora →', 'Acheter Maintenant →', 'Comprar Agora →', 'Jetzt Kaufen →', 'Acquista Ora →')}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCreditShop(false)}
              className="text-slate-300 text-xs font-bold hover:text-slate-500 transition-colors"
            >
              {pickLang(lang, 'Cancel', 'Cancelar', 'Annuler', 'Cancelar', 'Abbrechen', 'Annulla')}
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowLogin(false)}>
          <div className="bg-white mx-4 md:mx-6 p-5 md:p-8 rounded-2xl max-w-sm w-full text-center space-y-5 md:space-y-6 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-serif font-black text-2xl italic">A</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-black text-slate-900 tracking-tight">
                {pickLang(lang, 'Sign in', 'Inicia sesión', 'Connectez-vous', 'Iniciar sessão', 'Anmelden', 'Accedi')}
              </h3>
              <p className="text-slate-400 text-sm mt-2 font-light">
                {pickLang(lang, 'You need an account to use the virtual try-on', 'Necesitas una cuenta para usar el probador virtual', 'Vous avez besoin d\'un compte pour utiliser l\'essayage virtuel', 'Precisa de uma conta para usar o provador virtual', 'Du brauchst ein Konto, um die virtuelle Anprobe zu nutzen', 'Hai bisogno di un account per usare il camerino virtuale')}
              </p>
            </div>
            <button
              onClick={async () => {
                try { (window as any).datafast?.('signup_click', { provider: 'google' }); await signInWithGoogle(); } catch {}
              }}
              className="w-full py-4 bg-slate-900 text-white rounded-lg flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors font-black uppercase tracking-[0.15em] text-xs"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {pickLang(lang, 'Continue with Google', 'Continuar con Google', 'Continuer avec Google', 'Continuar com Google', 'Mit Google fortfahren', 'Continua con Google')}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">{pickLang(lang, 'or', 'o', 'ou', 'ou', 'oder', 'o')}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {otpSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-bold text-emerald-600">
                  {pickLang(lang, 'Check your inbox', 'Revisa tu correo', 'Vérifiez votre boîte de réception', 'Verifique a sua caixa de entrada', 'Prüfe dein Postfach', 'Controlla la tua casella di posta')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {pickLang(lang, 'We sent you a magic link. Click it to sign in.', 'Te enviamos un enlace mágico. Haz clic para entrar.', 'Nous vous avons envoyé un lien magique. Cliquez pour vous connecter.', 'Enviámos-lhe um link mágico. Clique para entrar.', 'Wir haben dir einen Magic Link geschickt. Klicke ihn an, um dich anzumelden.', 'Ti abbiamo inviato un magic link. Cliccalo per accedere.')}
                </p>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={otpEmail}
                  onChange={(e) => setOtpEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLoginOtp(); }}
                  placeholder={pickLang(lang, 'your@email.com', 'tu@email.com', 'votre@email.com', 'seu@email.com', 'deine@email.com', 'tua@email.com')}
                  className="flex-1 px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleLoginOtp}
                  className="px-4 py-3 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-500 transition-colors shrink-0"
                >
                  {pickLang(lang, 'Send', 'Enviar', 'Envoyer', 'Enviar', 'Senden', 'Invia')}
                </button>
              </div>
            )}

            <button
              onClick={() => { setShowLogin(false); setOtpSent(false); setOtpEmail(''); }}
              className="text-slate-300 text-xs font-bold hover:text-slate-500 transition-colors"
            >
              {pickLang(lang, 'Cancel', 'Cancelar', 'Annuler', 'Cancelar', 'Abbrechen', 'Annulla')}
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Image Overlay */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in-scale"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
            style={{ top: 'max(1.5rem, env(safe-area-inset-top))' }}
          >
            <X size={22} className="text-white" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3" style={{ bottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
            <button
              onClick={(e) => { e.stopPropagation(); handleDownloadImage(fullscreenImage); }}
              className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <Download size={16} className="text-white/80" />
              <span className="text-xs font-bold text-white/80">Save</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleShareImage(fullscreenImage); }}
              className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <Share2 size={16} className="text-white/80" />
              <span className="text-xs font-bold text-white/80">Share</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
