'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  RefreshCcw,
  Shirt,
  Fingerprint,
  AlertCircle,
  Target,
  ShieldCheck,
  UserSquare2,
  X,
  Loader2,
  ArrowLeft,
  Download,
  Share2,
  ImagePlus,
} from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { onAuthStateChange, signInWithGoogle, type AppUser } from '@/services/authService';
import { Role, type ChatMessage } from '@/types';
import { useLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function TryOnPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  const [user, setUser] = useState<AppUser | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [renderCount, setRenderCount] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [chatAttachment, setChatAttachment] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [gateReady, setGateReady] = useState(false);
  const chatFileRef = useRef<HTMLInputElement>(null);

  // Gate: check auth → check subscription → allow or redirect
  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Check subscription / credits
        try {
          const res = await fetch('/api/subscription');
          if (res.ok) {
            const status = await res.json();
            if (status.creditsRemaining <= 0) {
              router.push('/paywall');
              return;
            }
          }
        } catch {}
        setGateReady(true);
      } else {
        // Not logged in — show login immediately
        setShowLogin(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  // Track successful subscription from Stripe redirect
  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('subscribed') === 'true') {
      (window as any).datafast?.('subscription_success');
    }
  }, []);

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
    setRenderCount(0);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const saveToGallery = (imageUrl: string) => {
    try {
      const gallery = JSON.parse(localStorage.getItem('agalaz-gallery') || '[]');
      gallery.unshift({
        id: `render-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        dataUrl: imageUrl,
        createdAt: Date.now(),
      });
      if (gallery.length > 50) gallery.length = 50;
      localStorage.setItem('agalaz-gallery', JSON.stringify(gallery));
    } catch {}
  };

  const handleStartAnalysis = async () => {
    if (!faceImage || !bodyImage) {
      setError(t.missingPhotos);
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

    // Track render attempt
    (window as any).datafast?.('render_start', { has_clothing: clothingImage ? 'yes' : 'no' });

    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ faceImage, bodyImage, clothingImage }),
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

  const handleChatFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        setChatAttachment(base64);
      };
      reader.readAsDataURL(file);
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
                faceImage,
                bodyImage,
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
      } catch {}
    }
  };

  const handleDownloadImage = (imageUrl: string) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'agalaz-tryon.png';
    a.click();
  };

  const isLoading = isAnalyzing || isGeneratingImage;
  const canRender = faceImage && bodyImage && !isLoading;

  // Show loading spinner while checking auth + subscription
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
        {/* Nav — same style as landing */}
        <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ArrowLeft size={18} className="text-slate-400" />
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
              <LanguageToggle />
              {(faceImage || messages.length > 0) && (
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
          style={{ paddingBottom: messages.length > 0 ? 160 : 24 }}
        >
          {messages.length === 0 ? (
            <div className="max-w-lg mx-auto space-y-8 animate-fade-in">
              <div className="text-center space-y-3 px-4 pt-6">
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {lang === 'es' ? 'Probador Virtual IA' : 'AI Virtual Try-On'}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[0.9]">
                  {t.preserveTitle}
                  <br />
                  <span className="italic text-slate-400">{t.preserveHighlight}</span>
                </h2>
                <p className="text-slate-500 text-sm font-light max-w-sm mx-auto">{t.preserveDesc}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <ImageUploader
                    label={t.faceLabel}
                    type="user"
                    image={faceImage}
                    onImageSelect={setFaceImage}
                    icon={<Fingerprint size={20} className="text-indigo-600" />}
                  />
                  <div>
                    <ImageUploader
                      label={t.bodyLabel}
                      type="user"
                      image={bodyImage}
                      onImageSelect={setBodyImage}
                      icon={<UserSquare2 size={20} className="text-indigo-600" />}
                    />
                    <p className="text-[9px] font-bold text-slate-300 text-center mt-1.5">
                      {t.bodyHint}
                    </p>
                  </div>
                </div>
                <ImageUploader
                  label={`${t.clothingLabel} (${t.optional})`}
                  type="clothing"
                  image={clothingImage}
                  onImageSelect={setClothingImage}
                  icon={<Shirt size={20} className="text-indigo-600" />}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3 animate-fade-in">
                  <AlertCircle size={18} className="text-red-500 shrink-0" />
                  <span className="text-xs font-bold text-red-600">{error}</span>
                </div>
              )}

              <button
                onClick={handleStartAnalysis}
                disabled={!canRender}
                className={`w-full py-4 flex items-center justify-center gap-3 transition-all font-black uppercase tracking-[0.2em] text-xs ${
                  canRender
                    ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg'
                    : 'bg-slate-100 text-slate-300 border border-slate-200'
                }`}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                {t.renderBtn}
              </button>
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
                    <div className="w-full space-y-3" style={{ maxWidth: '95%' }}>
                      <button
                        onClick={() => setFullscreenImage(msg.image!)}
                        className="block rounded-2xl overflow-hidden border-2 border-slate-100 w-full hover:border-indigo-200 transition-colors"
                      >
                        <div className="relative">
                          <img
                            src={msg.image}
                            alt="Try-on result"
                            className="w-full"
                            style={{ aspectRatio: '9 / 16', objectFit: 'cover' }}
                          />
                          <div className="absolute top-3 left-3 space-y-1.5">
                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                              <Target size={10} className="text-indigo-600" />
                              <span className="text-[8px] font-black uppercase tracking-widest text-slate-700">
                                {t.outfitPreserved}
                              </span>
                            </div>
                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                              <ShieldCheck size={10} className="text-emerald-600" />
                              <span className="text-[8px] font-black uppercase tracking-widest text-slate-700">
                                {t.seamlessId}
                              </span>
                            </div>
                          </div>
                          <div className="absolute bottom-3 right-3 flex gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDownloadImage(msg.image!); }}
                              className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-sm hover:bg-white transition-colors"
                            >
                              <Download size={14} className="text-slate-700" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleShareImage(msg.image!); }}
                              className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-sm hover:bg-white transition-colors"
                            >
                              <Share2 size={14} className="text-slate-700" />
                            </button>
                          </div>
                        </div>
                      </button>
                      {msg.text && (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 ml-3">
                          <p className="text-[11px] font-bold text-slate-500 leading-tight italic">
                            &ldquo;{msg.text}&rdquo;
                          </p>
                        </div>
                      )}
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
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-full flex items-center gap-3">
                    <Loader2 size={14} className="text-indigo-600 animate-spin" />
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                      {t.protectingOutfit}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input */}
        {messages.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-slate-100 z-20" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
            {!isLoading && messages.some(m => m.image) && (
              <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto hide-scrollbar">
                {(lang === 'es'
                  ? ['Manga larga', 'Cambiar color', 'Más oscuro', 'Sin logo', 'Más ajustado']
                  : ['Long sleeves', 'Change color', 'Darker', 'No logo', 'Tighter fit']
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
                  {lang === 'es' ? 'Referencia adjunta' : 'Reference attached'}
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
                  className="flex-1 px-2 py-2.5 text-[13px] font-bold text-slate-900 placeholder:text-slate-300 bg-transparent outline-none"
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

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowLogin(false)}>
          <div className="bg-white mx-6 p-8 rounded-2xl max-w-sm w-full text-center space-y-6 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-serif font-black text-2xl italic">A</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-black text-slate-900 tracking-tight">
                {lang === 'es' ? 'Inicia sesión' : 'Sign in'}
              </h3>
              <p className="text-slate-400 text-sm mt-2 font-light">
                {lang === 'es' ? 'Necesitas una cuenta para usar el probador virtual' : 'You need an account to use the virtual try-on'}
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
              {lang === 'es' ? 'Continuar con Google' : 'Continue with Google'}
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className="text-slate-300 text-xs font-bold hover:text-slate-500 transition-colors"
            >
              {lang === 'es' ? 'Cancelar' : 'Cancel'}
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
