import Link from 'next/link';
import { Store, ArrowRight, Code2, Check } from 'lucide-react';

export type B2BLang = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it';

interface Props {
  lang: B2BLang;
}

const LABELS: Record<B2BLang, {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  bullets: string[];
  cta: string;
  hint: string;
}> = {
  en: {
    badge: 'For ecommerce stores',
    title: 'Run an online store?',
    highlight: 'Add this try-on for your customers.',
    subtitle:
      "The same AI virtual try-on you just used can run on your Shopify, WooCommerce or any custom store. Two lines of code — your customers preview the product on themselves before buying. Higher conversion, fewer returns.",
    bullets: [
      'Install in 2 lines of code — script tag + div',
      'Auto-detects product images on Shopify, WooCommerce, PrestaShop, Magento, Wix',
      'Multi-category: clothing, glasses, jewelry, hats, shoes, bags, tattoos, nail art',
    ],
    cta: 'Become a Partner',
    hint: '7-day free trial · 50 renders included · No setup fee',
  },
  es: {
    badge: 'Para tiendas online',
    title: '¿Tienes una tienda online?',
    highlight: 'Implementa este probador para tus clientes.',
    subtitle:
      'El mismo probador virtual con IA que acabas de usar puede correr en tu Shopify, WooCommerce o cualquier tienda. Dos líneas de código — tus clientes ven el producto sobre ellos mismos antes de comprar. Más conversión, menos devoluciones.',
    bullets: [
      'Instala en 2 líneas de código — script tag + div',
      'Detecta imágenes de producto automáticamente en Shopify, WooCommerce, PrestaShop, Magento, Wix',
      'Multi-categoría: ropa, gafas, joyería, sombreros, zapatos, bolsos, tatuajes, uñas',
    ],
    cta: 'Hazte Partner',
    hint: 'Prueba gratis 7 días · 50 renders incluidos · Sin coste de instalación',
  },
  fr: {
    badge: 'Pour les boutiques en ligne',
    title: 'Vous avez une boutique en ligne ?',
    highlight: 'Ajoutez cet essayage pour vos clients.',
    subtitle:
      "Le même essayage virtuel avec IA que vous venez d'utiliser peut tourner sur votre Shopify, WooCommerce ou toute boutique. Deux lignes de code — vos clients voient le produit sur eux avant d'acheter. Plus de conversions, moins de retours.",
    bullets: [
      'Installation en 2 lignes de code — script tag + div',
      "Détecte automatiquement les images produit sur Shopify, WooCommerce, PrestaShop, Magento, Wix",
      'Multi-catégorie : vêtements, lunettes, bijoux, chapeaux, chaussures, sacs, tatouages, nail art',
    ],
    cta: 'Devenir Partenaire',
    hint: "Essai gratuit 7 jours · 50 rendus inclus · Aucun frais d'installation",
  },
  pt: {
    badge: 'Para lojas online',
    title: 'Tem uma loja online?',
    highlight: 'Adicione este provador aos seus clientes.',
    subtitle:
      'O mesmo provador virtual com IA que acabou de usar pode correr na sua Shopify, WooCommerce ou qualquer loja. Duas linhas de código — os seus clientes vêem o produto neles antes de comprar. Mais conversão, menos devoluções.',
    bullets: [
      'Instala em 2 linhas de código — script tag + div',
      'Deteta automaticamente imagens de produto em Shopify, WooCommerce, PrestaShop, Magento, Wix',
      'Multi-categoria: roupa, óculos, joias, chapéus, calçado, malas, tatuagens, unhas',
    ],
    cta: 'Tornar-me Parceiro',
    hint: 'Teste grátis 7 dias · 50 renderizações incluídas · Sem custo de configuração',
  },
  de: {
    badge: 'Für Online-Shops',
    title: 'Haben Sie einen Online-Shop?',
    highlight: 'Bauen Sie diese Anprobe für Ihre Kunden ein.',
    subtitle:
      'Dieselbe virtuelle KI-Anprobe, die Sie gerade benutzt haben, läuft auf Ihrem Shopify, WooCommerce oder jedem Shop. Zwei Zeilen Code — Ihre Kunden sehen das Produkt an sich, bevor sie kaufen. Höhere Conversion, weniger Rücksendungen.',
    bullets: [
      'Installation in 2 Zeilen Code — Script-Tag + Div',
      'Erkennt Produktbilder automatisch auf Shopify, WooCommerce, PrestaShop, Magento, Wix',
      'Mehrere Kategorien: Kleidung, Brillen, Schmuck, Hüte, Schuhe, Taschen, Tattoos, Nail Art',
    ],
    cta: 'Partner werden',
    hint: '7 Tage kostenlos · 50 Renderings inklusive · Keine Einrichtungsgebühr',
  },
  it: {
    badge: 'Per negozi online',
    title: 'Hai un negozio online?',
    highlight: 'Aggiungi questa prova per i tuoi clienti.',
    subtitle:
      "La stessa prova virtuale con IA che hai appena usato può girare sul tuo Shopify, WooCommerce o qualsiasi negozio. Due righe di codice — i tuoi clienti vedono il prodotto su loro stessi prima di comprare. Più conversioni, meno resi.",
    bullets: [
      'Installazione in 2 righe di codice — tag script + div',
      'Rileva automaticamente le immagini prodotto su Shopify, WooCommerce, PrestaShop, Magento, Wix',
      'Multi-categoria: abbigliamento, occhiali, gioielli, cappelli, scarpe, borse, tatuaggi, nail art',
    ],
    cta: 'Diventa Partner',
    hint: '7 giorni di prova gratis · 50 render inclusi · Nessun costo di setup',
  },
};

export default function PartnersUpsellBlock({ lang }: Props) {
  const t = LABELS[lang];
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Store size={12} />
            {t.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            {t.title}
            <br />
            <span className="italic font-normal text-indigo-300">{t.highlight}</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <ul className="max-w-2xl mx-auto space-y-3 mb-10">
          {t.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-200 font-light">
              <Check size={18} className="text-indigo-300 mt-0.5 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-100 transition-colors"
          >
            <Code2 size={14} />
            {t.cta}
            <ArrowRight size={14} />
          </Link>
          <p className="text-[11px] text-slate-400 mt-4 font-light">{t.hint}</p>
        </div>
      </div>
    </section>
  );
}
