'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Send,
  RefreshCcw,
  Shirt,
  Star,
  Fingerprint,
  AlertCircle,
  Target,
  Paperclip,
  Eye,
  ShieldCheck,
  UserSquare2,
  X,
  Loader2,
} from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { useLanguage } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { onAuthStateChange, signInWithGoogle, signInWithApple, type AppUser } from '@/services/authService';
import { Role, type ChatMessage } from '@/types';
import { useSubscription } from '@/lib/useSubscription';
import { createBrowserClient } from '@supabase/ssr';

const IMAGE_KEYWORDS = [
  'color', 'talla', 'peinado', 'cambia', 'pon', 'ajusta', 'vea', 'prenda',
  'adjuntar', 'mira', 'foto', 'render', 'estilo', 'look', 'quede', 'prueba',
  'cuerpo', 'realista', 'luz',
  'change', 'put', 'adjust', 'try', 'garment', 'style', 'sleeve', 'body', 'realistic',
];

function compressChatImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      const MAX = 1024;
      if (width > MAX || height > MAX) {
        const ratio = Math.min(MAX / width, MAX / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7).split(',')[1]);
    };
    img.onerror = () => reject(new Error('Error loading image'));
    img.src = URL.createObjectURL(file);
  });
}

export default function TryOnPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatFileRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const [user, setUser] = useState<AppUser | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const { isPro, creditsRemaining, creditsResetAt, referralCode, loading: subLoading, refresh: refreshSub } = useSubscription();
  const [copied, setCopied] = useState(false);

  // Check auth state on mount - show login if not authenticated
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    );
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const meta = data.user.user_metadata || {};
        setUser({
          name: meta.full_name || meta.name || data.user.email?.split('@')[0] || 'Usuario',
          email: data.user.email || '',
          avatar: meta.avatar_url || meta.picture || '',
          provider: data.user.app_metadata?.provider || 'email',
        });
      }
      setAuthChecked(true);
    });

    const { data: { subscription } } = onAuthStateChange((authUser) => {
      if (authUser) {
        setUser(authUser);
        setShowLogin(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribed') === 'true') {
      refreshSub();
      window.history.replaceState({}, '', '/try-on');
    }
  }, [refreshSub]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);
    }
  }, [messages, isAnalyzing, isGeneratingImage]);

  const resetApp = () => {
    setFaceImage(null);
    setBodyImage(null);
    setClothingImage(null);
    setMessages([]);
    setInputValue('');
    setError(null);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleStartAnalysis = async () => {
    if (!faceImage || !bodyImage) {
      setError(t.tryOn.errorMissingPhotos);
      return;
    }
    if (!user) {
      setShowLogin(true);
      return;
    }
    if (creditsRemaining <= 0) {
      router.push('/paywall');
      return;
    }

    setIsAnalyzing(true);
    setIsGeneratingImage(true);
    setError(null);
    setMessages([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faceImage, bodyImage, clothingImage }),
      });
      const data = await res.json();

      if (data.image) {
        setMessages([{
          role: Role.MODEL,
          text: t.tryOn.resultSuccess,
          image: data.image,
        }]);
        refreshSub();
      } else if (data.error === 'NO_CREDITS') {
        router.push('/paywall');
      } else {
        setError(data.error || t.tryOn.errorPrecision);
      }
    } catch {
      setError(t.tryOn.errorComponent);
    } finally {
      setIsAnalyzing(false);
      setIsGeneratingImage(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isAnalyzing || isGeneratingImage) return;

    setMessages((prev) => [...prev, { role: Role.USER, text }]);
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
      const modelText = chatData.text || t.tryOn.adjusting;

      setMessages((prev) => [...prev, { role: Role.MODEL, text: modelText }]);
      setIsAnalyzing(false);

      const query = text.toLowerCase();
      const needsImage = IMAGE_KEYWORDS.some((k) => query.includes(k));

      if (needsImage) {
        setIsGeneratingImage(true);
        const lastImage = [...messages].reverse().find((m) => m.image)?.image;
        const genRes = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            faceImage,
            bodyImage,
            clothingImage,
            modificationPrompt: text,
            lastRenderedImage: lastImage,
          }),
        });
        const genData = await genRes.json();

        if (genData.image) {
          setMessages((prev) => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];
            if (lastMsg && lastMsg.role === Role.MODEL) {
              lastMsg.image = genData.image;
            }
            return newMsgs;
          });
        }
        setIsGeneratingImage(false);
      }
    } catch {
      setError(t.tryOn.errorVisualUpdate);
      setIsAnalyzing(false);
      setIsGeneratingImage(false);
    }
  };

  const handleChatGarment = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await compressChatImage(file);
      setClothingImage(base64);
      setMessages((prev) => [...prev, { role: Role.USER, text: t.tryOn.newGarmentAttached }]);
      setIsGeneratingImage(true);
      setError(null);

      const lastImage = [...messages].reverse().find((m) => m.image)?.image;
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          faceImage,
          bodyImage,
          clothingImage: base64,
          lastRenderedImage: lastImage,
        }),
      });
      const data = await res.json();
      if (data.image) {
        setMessages((prev) => [...prev, { role: Role.MODEL, text: t.tryOn.resultSuccess, image: data.image }]);
        refreshSub();
      } else if (data.error === 'NO_CREDITS') {
        router.push('/paywall');
      } else {
        setError(data.error || t.tryOn.errorPrecision);
      }
    } catch {
      setError(t.tryOn.errorComponent);
    } finally {
      setIsGeneratingImage(false);
      e.target.value = '';
    }
  };

  const isLoading = isAnalyzing || isGeneratingImage;
  const canRender = faceImage && bodyImage && !isLoading && !subLoading;

  const copyReferralCode = () => {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header — editorial style */}
        <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user ? (
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-100">
                  <img
                    src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
              <span className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black">
                AGALAZ
              </span>
              {isPro && (
                <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-white" />
                  PRO
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle variant="light" />
              {(faceImage || messages.length > 0) && (
                <>
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <Shirt size={16} className="text-slate-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {t.tryOn.editButton}
                      </span>
                    </button>
                  )}
                  <button
                    onClick={resetApp}
                    className="p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <RefreshCcw size={18} className="text-slate-500" />
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: messages.length > 0 ? 120 : 20 }}
        >
          {messages.length === 0 ? (
            <div className="max-w-lg mx-auto space-y-8 px-6 py-10 md:py-16">
              {/* Editorial heading */}
              <div className="text-center space-y-4">
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full animate-fade-in">
                  {t.tryOn.engineBadge}
                </span>
                <h2
                  className="font-serif text-5xl md:text-6xl text-slate-900 tracking-tight animate-fade-in"
                  style={{ lineHeight: 0.95 }}
                >
                  <span className="font-black">{t.tryOn.preserveTitle}</span>
                  <br />
                  <span className="italic text-indigo-600">{t.tryOn.preserveHighlight}</span>
                </h2>
                <p className="text-slate-500 text-sm font-light max-w-xs mx-auto animate-fade-in-delay">
                  {t.tryOn.preserveSubtitle}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <ImageUploader
                    label={t.tryOn.labelFace}
                    type="user"
                    image={faceImage}
                    onImageSelect={setFaceImage}
                    icon={<Fingerprint size={20} className="text-slate-400" />}
                    hint={t.tryOn.hintFace}
                  />
                  <ImageUploader
                    label={t.tryOn.labelBody}
                    type="user"
                    image={bodyImage}
                    onImageSelect={setBodyImage}
                    icon={<UserSquare2 size={20} className="text-slate-400" />}
                    hint={t.tryOn.hintBody}
                  />
                </div>
                <ImageUploader
                  label={t.tryOn.labelClothing}
                  type="clothing"
                  image={clothingImage}
                  onImageSelect={setClothingImage}
                  icon={<Shirt size={20} className="text-slate-400" />}
                  hint={t.tryOn.hintClothing}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3">
                  <AlertCircle size={18} className="text-red-600 shrink-0" />
                  <span className="text-[11px] font-bold text-red-600">{error}</span>
                </div>
              )}

              <button
                onClick={handleStartAnalysis}
                disabled={!canRender}
                className={`group w-full py-5 flex items-center justify-center gap-3 transition-all cursor-pointer ${
                  canRender ? 'bg-slate-900 hover:bg-indigo-600' : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 size={18} className="text-white animate-spin" />
                ) : (
                  <Sparkles size={18} className="text-white group-hover:rotate-12 transition-transform" />
                )}
                <span className="text-white font-black uppercase tracking-[0.2em] text-xs">
                  {t.tryOn.renderButton}
                </span>
              </button>

              <p className="text-[10px] text-slate-400 font-light text-center">
                {creditsRemaining} {t.tryOn.creditsRemaining}
                {creditsResetAt && ` · ${t.tryOn.creditsReset} ${new Date(creditsResetAt).toLocaleDateString()}`}
              </p>

              {/* Referral share section */}
              {referralCode && (
                <div className="border border-slate-200 rounded-2xl p-4 space-y-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {t.referral.yourCode}
                  </p>
                  <button
                    onClick={copyReferralCode}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-black text-slate-900 tracking-[0.3em]">{referralCode}</span>
                    {copied ? (
                      <span className="text-[10px] font-bold text-emerald-600">{t.referral.copied}</span>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    )}
                  </button>
                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <p>{t.referral.bonusWeekly}</p>
                    <p>{t.referral.bonusYearly}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-lg mx-auto space-y-8 px-4 py-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === Role.USER ? 'items-end' : 'items-start'}`}
                >
                  {msg.image ? (
                    <div className="w-full space-y-3" style={{ maxWidth: '95%' }}>
                      <button
                        onClick={() => setFullscreenImage(msg.image!)}
                        className="block rounded-[2.5rem] overflow-hidden border-[8px] border-white w-full cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={msg.image}
                            alt="Try-on result"
                            className="w-full"
                            style={{ aspectRatio: '9 / 16', objectFit: 'cover' }}
                          />
                          <div className="absolute top-4 left-4 space-y-2">
                            <div className="bg-indigo-600/90 px-3 py-1.5 rounded-full flex items-center gap-2">
                              <Target size={14} className="text-white" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-white">
                                {t.tryOn.badgeOutfit}
                              </span>
                            </div>
                            <div className="bg-emerald-600/90 px-3 py-1.5 rounded-full flex items-center gap-2">
                              <ShieldCheck size={14} className="text-white" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-white">
                                {t.tryOn.badgeSeamless}
                              </span>
                            </div>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-white/20 rounded-full p-3">
                            <Eye size={20} className="text-white" />
                          </div>
                        </div>
                      </button>
                      {msg.text && (
                        <div className="bg-white/80 p-4 rounded-3xl border border-slate-100 ml-4 -mt-6 relative z-10">
                          <p className="text-[12px] font-bold text-slate-800 leading-tight italic">
                            &ldquo;{msg.text}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] p-4 ${
                        msg.role === Role.USER
                          ? 'bg-indigo-600 rounded-[1.5rem] rounded-br-none'
                          : 'bg-white rounded-[1.5rem] rounded-bl-none border border-slate-100'
                      }`}
                    >
                      <p
                        className={`text-[13px] font-bold ${
                          msg.role === Role.USER ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {msg.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-6 py-4 rounded-full border border-slate-100 flex items-center gap-3">
                    <Loader2 size={16} className="text-indigo-500 animate-spin" />
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      {t.tryOn.loading}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input */}
        {messages.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white/90 backdrop-blur-sm z-20 border-t border-slate-100">
            <div className="max-w-lg mx-auto flex items-center gap-2 p-2 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-lg">
              <input
                ref={chatFileRef}
                type="file"
                accept="image/*"
                onChange={handleChatGarment}
                className="hidden"
              />
              <button
                onClick={() => chatFileRef.current?.click()}
                className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title={t.tryOn.chatAttach}
              >
                <Paperclip size={20} className="text-slate-400" />
              </button>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputValue);
                }}
                placeholder={t.tryOn.chatPlaceholder}
                className="flex-1 px-2 py-3 text-[13px] font-bold text-slate-800 placeholder:text-slate-400 bg-transparent outline-none"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  !inputValue.trim() || isLoading
                    ? 'bg-indigo-600/20'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal — editorial style */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-8 space-y-6 animate-fade-in">
            {/* Close */}
            <div className="flex justify-end">
              <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Badge */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full">
                <Sparkles size={12} className="text-white" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  AGALAZ
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h2
                className="font-serif text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
                style={{ lineHeight: 1.05 }}
              >
                {t.login.title.split(' ').slice(0, 2).join(' ')}
                <br />
                <span className="italic text-indigo-600">{t.login.title.split(' ').slice(2).join(' ') || t.login.title}</span>
              </h2>
              <p className="text-slate-500 text-sm font-light max-w-xs mx-auto">{t.login.subtitle}</p>
            </div>

            {/* Google button */}
            <button
              onClick={async () => {
                setAuthLoading(true);
                try { await signInWithGoogle(); } catch { setAuthLoading(false); }
              }}
              disabled={authLoading}
              className="w-full py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-slate-700 text-sm">{t.login.google}</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center font-light">{t.login.terms}</p>
          </div>
        </div>
      )}

      {/* Fullscreen Image Overlay */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-pointer"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10 cursor-pointer"
          >
            <X size={24} className="text-white" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}
