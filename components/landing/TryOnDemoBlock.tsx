'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Sparkles, Loader2, X, ArrowRight } from 'lucide-react';
import { applyWatermark } from '@/lib/watermark';

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
  | 'baby-clothing';

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
  removeWatermark: string;
  tryAnother: string;
  errorGeneric: string;
  errorRate: string;
  errorMissing: string;
  uploadCta: string;
  buyNow: string;
}> = {
  en: {
    sectionTitle: 'Try it free now',
    sectionSubtitle: 'Upload your photo + the product you want to try. First render is free, watermarked. Buy a pack to remove the watermark.',
    yourPhoto: 'Your photo',
    yourPhotoHint: 'A clear photo of you, well-lit',
    productPhoto: 'Product',
    productPhotoHint: 'Photo or screenshot of the item',
    generate: 'Generate',
    generating: 'Generating…',
    result: 'Your result',
    removeWatermark: 'Remove watermark — Buy Now',
    tryAnother: 'Try another',
    errorGeneric: 'Generation failed. Try a different photo.',
    errorRate: 'Please wait a moment and try again.',
    errorMissing: 'Upload both photos first.',
    uploadCta: 'Click to upload',
    buyNow: 'Buy Now',
  },
  es: {
    sectionTitle: 'Pruébalo gratis ahora',
    sectionSubtitle: 'Sube tu foto + el producto que quieres probar. El primer render es gratis, con marca de agua. Compra un pack para quitarla.',
    yourPhoto: 'Tu foto',
    yourPhotoHint: 'Una foto clara tuya, bien iluminada',
    productPhoto: 'Producto',
    productPhotoHint: 'Foto o captura del artículo',
    generate: 'Generar',
    generating: 'Generando…',
    result: 'Tu resultado',
    removeWatermark: 'Quitar marca de agua — Comprar Ahora',
    tryAnother: 'Probar otro',
    errorGeneric: 'Falló la generación. Prueba con otra foto.',
    errorRate: 'Espera un momento e inténtalo de nuevo.',
    errorMissing: 'Sube primero las dos fotos.',
    uploadCta: 'Pulsa para subir',
    buyNow: 'Comprar Ahora',
  },
  fr: {
    sectionTitle: "Essayez gratuitement maintenant",
    sectionSubtitle: "Téléchargez votre photo + le produit. Le premier rendu est gratuit, avec filigrane. Achetez un pack pour le retirer.",
    yourPhoto: 'Votre photo',
    yourPhotoHint: 'Une photo claire, bien éclairée',
    productPhoto: 'Produit',
    productPhotoHint: "Photo ou capture de l'article",
    generate: 'Générer',
    generating: 'Génération…',
    result: 'Votre résultat',
    removeWatermark: 'Retirer le filigrane — Acheter',
    tryAnother: 'Essayer un autre',
    errorGeneric: 'Échec de la génération. Essayez une autre photo.',
    errorRate: 'Patientez un instant puis réessayez.',
    errorMissing: "Téléchargez d'abord les deux photos.",
    uploadCta: 'Cliquez pour téléverser',
    buyNow: 'Acheter',
  },
  pt: {
    sectionTitle: 'Experimente grátis agora',
    sectionSubtitle: 'Carregue a sua foto + o produto. O primeiro resultado é grátis, com marca de água. Compre um pack para a remover.',
    yourPhoto: 'A sua foto',
    yourPhotoHint: 'Uma foto clara, bem iluminada',
    productPhoto: 'Produto',
    productPhotoHint: 'Foto ou captura do artigo',
    generate: 'Gerar',
    generating: 'A gerar…',
    result: 'O seu resultado',
    removeWatermark: 'Remover marca de água — Comprar',
    tryAnother: 'Tentar outro',
    errorGeneric: 'Falha na geração. Tente outra foto.',
    errorRate: 'Aguarde um momento e tente novamente.',
    errorMissing: 'Carregue primeiro as duas fotos.',
    uploadCta: 'Clique para carregar',
    buyNow: 'Comprar',
  },
  de: {
    sectionTitle: 'Jetzt kostenlos ausprobieren',
    sectionSubtitle: 'Foto + Produkt hochladen. Das erste Ergebnis ist kostenlos mit Wasserzeichen. Pack kaufen, um das Wasserzeichen zu entfernen.',
    yourPhoto: 'Ihr Foto',
    yourPhotoHint: 'Ein klares, gut beleuchtetes Foto',
    productPhoto: 'Produkt',
    productPhotoHint: 'Foto oder Screenshot des Artikels',
    generate: 'Generieren',
    generating: 'Wird generiert…',
    result: 'Ihr Ergebnis',
    removeWatermark: 'Wasserzeichen entfernen — Kaufen',
    tryAnother: 'Anderes versuchen',
    errorGeneric: 'Generierung fehlgeschlagen. Anderes Foto versuchen.',
    errorRate: 'Bitte einen Moment warten und erneut versuchen.',
    errorMissing: 'Zuerst beide Fotos hochladen.',
    uploadCta: 'Zum Hochladen klicken',
    buyNow: 'Jetzt kaufen',
  },
  it: {
    sectionTitle: 'Provalo gratis ora',
    sectionSubtitle: "Carica la tua foto + il prodotto. Il primo risultato è gratis con filigrana. Acquista un pack per rimuoverla.",
    yourPhoto: 'La tua foto',
    yourPhotoHint: 'Una foto chiara, ben illuminata',
    productPhoto: 'Prodotto',
    productPhotoHint: "Foto o screenshot dell'articolo",
    generate: 'Genera',
    generating: 'Generando…',
    result: 'Il tuo risultato',
    removeWatermark: 'Rimuovi filigrana — Compra',
    tryAnother: 'Prova un altro',
    errorGeneric: 'Generazione fallita. Prova un altra foto.',
    errorRate: 'Attendi un momento e riprova.',
    errorMissing: 'Carica prima entrambe le foto.',
    uploadCta: 'Clicca per caricare',
    buyNow: 'Compra ora',
  },
};

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

  async function handleGenerate() {
    if (!userImage || !productImage) {
      setError(t.errorMissing);
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    try {
      const userBase64 = userImage.includes(',') ? userImage.split(',')[1] : userImage;
      const productBase64 = productImage.includes(',') ? productImage.split(',')[1] : productImage;
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userImage: userBase64, clothingImage: productBase64, category }),
      });
      if (res.status === 429) {
        setError(t.errorRate);
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      if (data.image) {
        const watermarked = await applyWatermark(data.image);
        setResultImage(watermarked);
      } else {
        setError(data.error || t.errorGeneric);
      }
    } catch {
      setError(t.errorGeneric);
    }
    setIsLoading(false);
  }

  function reset() {
    setResultImage(null);
    setError(null);
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
              <Link
                href="/try-on?plan=test"
                className="w-full max-w-sm inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-colors"
              >
                <Sparkles size={14} />
                {t.removeWatermark}
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
      </div>
    </section>
  );
}
