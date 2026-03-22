'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, X, Camera, ImagePlus, Check, Download } from 'lucide-react';

// Standalone embed page for B2B widget — no Supabase auth required
// URL: /embed?key=API_KEY&garment=GARMENT_URL&lang=es

export default function EmbedPage() {
  const [apiKey, setApiKey] = useState('');
  const [garmentUrl, setGarmentUrl] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'upload' | 'result'>('upload');
  const [currentSize, setCurrentSize] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState<string | null>(null);

  const userRef = useRef<HTMLInputElement>(null);
  const garmentRef = useRef<HTMLInputElement>(null);

  const t = lang === 'es' ? {
    title: 'Prueba Virtual',
    subtitle: 'Sube tu foto y pruébate esta prenda',
    photo: 'Tu foto',
    photoHint: 'Selfie, medio cuerpo o cuerpo entero',
    generate: 'Probar prenda',
    generating: 'Generando...',
    loadingHint: 'Puede tardar 30s - 1 min',
    result: 'Tu prueba virtual',
    tryAgain: 'Probar de nuevo',
    download: 'Guardar',
    poweredBy: 'Powered by Agalaz',
    errorGeneric: 'No se pudo generar. Intenta con otra foto.',
    errorNoPhoto: 'Sube una foto para continuar.',
  } : {
    title: 'Virtual Try-On',
    subtitle: 'Upload your photo and try on this garment',
    photo: 'Your photo',
    photoHint: 'Selfie, half body, or full body',
    generate: 'Try it on',
    generating: 'Generating...',
    loadingHint: 'This may take 30s - 1 min',
    result: 'Your virtual try-on',
    tryAgain: 'Try again',
    download: 'Save',
    poweredBy: 'Powered by Agalaz',
    errorGeneric: 'Generation failed. Try a different photo.',
    errorNoPhoto: 'Upload a photo to continue.',
  };

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setApiKey(params.get('key') || '');
    setGarmentUrl(params.get('garment') || null);
    if (params.get('lang') === 'es') setLang('es');
  }, []);

  const [garmentError, setGarmentError] = useState(false);

  // Load garment image from URL if provided — retry up to 2 times
  useEffect(() => {
    if (!garmentUrl) return;
    let cancelled = false;
    async function loadGarment() {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const base64 = await fetchImageAsBase64(garmentUrl!);
          if (!cancelled && base64 && base64.length > 100) {
            setGarmentImage(base64);
            setGarmentError(false);
            return;
          }
        } catch { /* retry */ }
        if (attempt < 1) await new Promise(r => setTimeout(r, 1000));
      }
      if (!cancelled) setGarmentError(true);
    }
    loadGarment();
    return () => { cancelled = true; };
  }, [garmentUrl]);

  // Check if base64 string is actually an image (not HTML/JSON/text)
  function isValidImageBase64(b64: string): boolean {
    if (!b64 || b64.length < 100) return false;
    // Check magic bytes
    if (b64.startsWith('/9j/')) return true;  // JPEG
    if (b64.startsWith('iVBOR')) return true;  // PNG
    if (b64.startsWith('UklGR')) return true;  // WebP
    if (b64.startsWith('R0lG')) return true;   // GIF
    // Reject known non-image formats
    if (b64.startsWith('PCFET0') || b64.startsWith('PGh0bW') || b64.startsWith('eyJ')) return false; // HTML/JSON
    return true; // unknown binary — probably ok
  }

  async function fetchImageAsBase64(url: string): Promise<string> {
    // Use our server-side image proxy to bypass CORS
    const proxyUrl = `/api/v1/image-proxy?url=${encodeURIComponent(url)}`;

    // Method 1: fetch via proxy (most reliable)
    try {
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const blob = await res.blob();
        const b64: string = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        if (isValidImageBase64(b64)) return b64;
        console.warn('[Agalaz] Proxy returned non-image data (HTML?), skipping');
      }
    } catch { /* continue to fallbacks */ }

    // Method 2: direct fetch (works if same-origin or CORS enabled)
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (res.ok) {
        const blob = await res.blob();
        const b64: string = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        if (isValidImageBase64(b64)) return b64;
        console.warn('[Agalaz] Direct fetch returned non-image data, skipping');
      }
    } catch { /* continue to fallback */ }

    // Method 3: img element + canvas
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const MIN_DIM = 768;
        const MAX_DIM = 1280;
        let w = img.naturalWidth, h = img.naturalHeight;
        if (w < MIN_DIM || h < MIN_DIM) {
          const scale = MIN_DIM / Math.min(w, h);
          w = Math.round(w * scale);
          h = Math.round(h * scale);
        }
        if (w > MAX_DIM || h > MAX_DIM) {
          const scale = MAX_DIM / Math.max(w, h);
          w = Math.round(w * scale);
          h = Math.round(h * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
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
        console.log(`[Agalaz] Garment image: ${w}x${h}, ${Math.round(base64.length / 1024)}KB base64`);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1280;
          const MIN_DIM = 768;
          let { width, height } = img;
          // Upscale small images so Gemini can process them
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
          // Try high quality first, then check size
          let dataUrl = canvas.toDataURL('image/jpeg', 0.90);
          let base64 = dataUrl.split(',')[1];
          // If still too small (< 40KB base64 ~ 30KB image), use max quality
          if (base64.length < 40000) {
            dataUrl = canvas.toDataURL('image/jpeg', 0.97);
            base64 = dataUrl.split(',')[1];
          }
          // If STILL too small, use PNG for lossless
          if (base64.length < 30000) {
            dataUrl = canvas.toDataURL('image/png');
            base64 = dataUrl.split(',')[1];
          }
          console.log(`[Agalaz] Compressed image: ${width}x${height}, ${Math.round(base64.length / 1024)}KB base64`);
          resolve(base64);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function handleFile(setter: (v: string | null) => void) {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const base64 = await compressImage(file);
        setter(base64);
      } catch {
        const reader = new FileReader();
        reader.onload = () => setter((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    };
  }

  async function handleGenerate() {
    if (!userImage) {
      setError(t.errorNoPhoto);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Build payload — always include garmentUrl as fallback for server-side fetch
    const payload: Record<string, any> = { userImage };
    if (garmentImage) payload.clothingImage = garmentImage;
    if (garmentUrl) payload.garmentUrl = garmentUrl;  // ALWAYS send URL as backup
    if (currentSize) payload.currentSize = currentSize;
    if (previewSize) payload.previewSize = previewSize;

    console.log('[Agalaz] Generate payload:', { hasUser: !!userImage, hasGarmentBase64: !!garmentImage, garmentUrl: garmentUrl || 'none' });

    try {
      const res = await fetch('/api/v1/tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Embed generation failed:', JSON.stringify(data));
        const debugStr = data.debug ? ` [${Object.entries(data.debug).map(([k, v]) => `${k}:${v}`).join(', ')}]` : '';
        setError((data.error || t.errorGeneric) + debugStr);
        setIsLoading(false);
        return;
      }

      if (data.image) {
        setResultImage(data.image);
        setStep('result');
        // Notify parent window
        window.parent.postMessage({ type: 'agalaz:result', image: data.image }, '*');
      } else {
        setError(t.errorGeneric);
      }
    } catch {
      setError(t.errorGeneric);
    }

    setIsLoading(false);
  }

  function handleDownload() {
    if (!resultImage) return;
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = 'virtual-tryon.png';
    a.click();
  }

  function handleReset() {
    setUserImage(null);
    setResultImage(null);
    setCurrentSize(null);
    setPreviewSize(null);
    setError(null);
    setStep('upload');
  }

  function ImageSlot({
    image,
    inputRef,
    label,
    hint,
    icon,
    onClear,
  }: {
    image: string | null;
    inputRef: React.RefObject<HTMLInputElement | null>;
    label: string;
    hint: string;
    icon: React.ReactNode;
    onClear: () => void;
  }) {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
          {label}
        </span>
        <div
          className={`relative w-full rounded-xl overflow-hidden transition-all ${
            image
              ? 'ring-2 ring-indigo-200'
              : 'border-2 border-dashed border-slate-200 bg-slate-50'
          }`}
          style={{ aspectRatio: '3 / 4' }}
        >
          {image ? (
            <div className="w-full h-full relative group">
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={label}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-emerald-500 rounded-full p-1 shadow-sm">
                <Check size={12} className="text-white" />
              </div>
              <button
                onClick={onClear}
                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <X size={14} className="text-slate-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full h-full p-4 hover:bg-indigo-50/50 transition-all"
            >
              <div className="p-3 bg-white border border-slate-200 rounded-xl mb-3 shadow-sm">
                {icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                Upload
              </span>
              <ImagePlus size={12} className="text-slate-200 mt-2" />
            </button>
          )}
        </div>
        <p className="text-[9px] font-bold text-slate-300 text-center">{hint}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-600" />
          <span className="text-sm font-black text-slate-900 tracking-tight">{t.title}</span>
          <span className="text-[8px] text-slate-300 font-bold">•</span>
          <a
            href="https://agalaz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-bold text-slate-300 hover:text-indigo-500 transition-colors"
          >
            powered by <span className="text-indigo-400">agalaz.com</span>
          </a>
        </div>
        <button
          onClick={() => window.parent.postMessage({ type: 'agalaz:close' }, '*')}
          className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={18} className="text-slate-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {step === 'upload' ? (
          <div className="max-w-sm mx-auto space-y-6">
            <p className="text-center text-slate-400 text-xs font-light">{t.subtitle}</p>

            {/* Photo upload */}
            <div className="max-w-[200px] mx-auto">
              <ImageSlot
                image={userImage}
                inputRef={userRef}
                label={t.photo}
                hint={t.photoHint}
                icon={<Camera size={20} className="text-indigo-600" />}
                onClear={() => setUserImage(null)}
              />
            </div>

            {/* Size selector (optional) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {lang === 'es' ? 'Talla (opcional)' : 'Size (optional)'}
              </span>
              <div>
                <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                  {lang === 'es' ? 'Tu talla actual' : 'Your current size'}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => { setCurrentSize(currentSize === size ? null : size); if (currentSize === size) setPreviewSize(null); }}
                      className={`px-2 py-1 rounded-md text-[9px] font-black transition-all ${
                        currentSize === size
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-400 hover:border-indigo-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {currentSize && (
                <div>
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                    {lang === 'es' ? 'Previsualizar en talla' : 'Preview in size'}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].filter(s => s !== currentSize).map((size) => (
                      <button
                        key={size}
                        onClick={() => setPreviewSize(previewSize === size ? null : size)}
                        className={`px-2 py-1 rounded-md text-[9px] font-black transition-all ${
                          previewSize === size
                            ? 'bg-slate-900 text-white'
                            : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Garment preview or upload */}
            {garmentImage ? (
              <div className="flex items-center gap-3 p-3 rounded-xl border bg-indigo-50 border-indigo-100">
                <div className="w-12 h-16 rounded-lg overflow-hidden ring-2 ring-indigo-200 shrink-0">
                  <img
                    src={`data:image/jpeg;base64,${garmentImage}`}
                    alt="Garment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">
                    {lang === 'es' ? 'Prenda seleccionada' : 'Selected garment'}
                  </span>
                  <p className="text-[10px] text-indigo-400 mt-0.5">
                    {lang === 'es' ? 'Se aplicará automáticamente' : 'Will be applied automatically'}
                  </p>
                </div>
                <button
                  onClick={() => { setGarmentImage(null); garmentRef.current?.click(); }}
                  className="p-1.5 hover:bg-indigo-100 rounded-full transition-colors"
                >
                  <X size={14} className="text-indigo-400" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {garmentUrl && (
                  <div className="flex items-center gap-3 p-3 rounded-xl border bg-amber-50 border-amber-200">
                    <div className="w-12 h-16 rounded-lg overflow-hidden ring-2 ring-amber-200 shrink-0">
                      <img
                        src={`/api/v1/image-proxy?url=${encodeURIComponent(garmentUrl)}`}
                        alt="Garment"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">
                        {lang === 'es' ? 'Prenda detectada' : 'Garment detected'}
                      </span>
                      <p className="text-[10px] text-amber-500 mt-0.5">
                        {lang === 'es' ? 'Se cargará desde el servidor' : 'Will load server-side'}
                      </p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => garmentRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all"
                >
                  <ImagePlus size={16} className="text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {lang === 'es' ? 'Subir prenda manualmente' : 'Upload garment manually'}
                  </span>
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!userImage || isLoading}
              className={`w-full py-4 flex items-center justify-center gap-3 rounded-xl transition-all font-black uppercase tracking-[0.15em] text-xs ${
                userImage && !isLoading
                  ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg'
                  : 'bg-slate-100 text-slate-300'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <div className="flex flex-col items-center">
                    <span>{t.generating}</span>
                    <span className="text-[10px] font-normal normal-case tracking-normal text-slate-300 mt-1">{t.loadingHint}</span>
                  </div>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  {t.generate}
                </>
              )}
            </button>
          </div>
        ) : (
          /* Result view */
          <div className="max-w-sm mx-auto space-y-4">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t.result}
            </p>

            <div className="rounded-2xl overflow-hidden border-2 border-slate-100">
              <img
                src={resultImage!}
                alt="Try-on result"
                className="w-full"
                style={{ aspectRatio: '9 / 16', objectFit: 'cover' }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-colors"
              >
                {t.tryAgain}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} />
                {t.download}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-100 px-4 py-1.5 text-center bg-white">
        <a
          href="https://agalaz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[8px] font-bold text-slate-200 hover:text-indigo-400 transition-colors"
        >
          agalaz.com
        </a>
      </div>

      {/* Hidden file inputs */}
      <input ref={userRef} type="file" accept="image/*" onChange={handleFile(setUserImage)} className="hidden" />
      <input ref={garmentRef} type="file" accept="image/*" onChange={handleFile(setGarmentImage)} className="hidden" />
    </div>
  );
}
