import Link from 'next/link';
import { Sparkles, Check, ArrowRight, Camera, Shield, Clock } from 'lucide-react';

export const revalidate = 86400;

const STYLES = [
  { name: 'シースルーバング', desc: '透け感のある軽い前髪。額がほんのり見える。2024-26年最大のトレンド。', suits: 'ほとんどの顔型に合う' },
  { name: 'ぱっつん前髪', desc: 'まっすぐ揃えた前髪。重さがあり、大人っぽい印象。', suits: '面長・丸顔の方に' },
  { name: 'アイドル前髪 (エアバング)', desc: 'ふんわり浮く軽さ。額にほぼ触れない。K-POPアイドルの定番。', suits: '細毛〜普通の毛量に最適' },
  { name: 'カーテンバング', desc: 'センター分け、頬骨くらいの長さ。顔を縦に区切る効果。', suits: '丸顔・四角顔に' },
  { name: 'サイドバング', desc: '横に流す前髪。Korean lightness を保ちながら大人っぽく。', suits: 'どの顔型でも' },
  { name: 'ベビーバング', desc: '眉上の超ショート前髪。大胆だが軽さがある。', suits: '小顔・ハート型に' },
];

const AVOID = [
  { name: '一度に厚く切りすぎる', why: '韓国・日本のトレンド前髪は「軽さ」が命。2010年代の重いぱっつんは古く見えます。「シースルーで」と参考写真を見せてください。' },
  { name: '濡れた状態だけで切る', why: '前髪は乾くと縮みます。美容師さんに「濡れた状態でカット → 乾燥チェック → 微調整」の順でお願いしてください。' },
  { name: 'つむじが強いのにぱっつんを試す', why: 'つむじや生え癖がある場合、ぱっつん前髪は割れます。事前にAIで確認してから決めましょう。' },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-[family-name:var(--font-noto-jp)]">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black">Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/korean-bangs" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">English</Link>
            <Link
              href="/try-on?category=hairstyle"
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-700 transition-colors"
            >
              今すぐ試着
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 text-center">
        <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
          バーチャル前髪試着 · AI 30秒
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
          前髪を切る前に、<br />
          <span className="italic text-indigo-500">AIで先に試着。</span>
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          シースルーバング、ぱっつん前髪、アイドル前髪、カーテンバング、サイドバング — どんな前髪も30秒でご自身の本当のお顔に。
          美容院に行く前に、自分に似合うかをスマホで確認。無料、登録不要、アプリ不要。
        </p>
        <Link
          href="/try-on?category=hairstyle"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
        >
          <Sparkles size={14} />
          無料で前髪を試着
          <ArrowRight size={14} />
        </Link>
        <p className="text-[11px] text-slate-400 mt-4">
          ✓ 無料 · ✓ 登録不要 · ✓ 30秒
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 mb-3 text-center">なぜAIで先に試着するのか?</h2>
        <p className="text-slate-600 max-w-3xl mx-auto text-center leading-relaxed mb-8">
          前髪は失敗すると伸びるまで2〜3ヶ月かかります。雑誌のモデルや K-POP アイドルの写真は、彼女・彼の顔の上での見え方。
          あなたの顔の上では、骨格、生え癖、髪質、肌色 — すべてが違います。Agalaz は、ご自身の本当のお顔に前髪を描き、
          美容院に行く前に「似合うかどうか」を確認できるツールです。
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <Camera size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">ご自身のお顔のまま</h3>
            <p className="text-sm text-slate-500 leading-relaxed">スタジオモデルではなく、ご自身のセルフィーに直接適用。骨格・肌色・髪質を尊重します。</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <Clock size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">30秒で結果</h3>
            <p className="text-sm text-slate-500 leading-relaxed">セルフィーをアップロード、前髪スタイルを選択。30秒後に結果が表示されます。</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <Shield size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">プライバシー保護</h3>
            <p className="text-sm text-slate-500 leading-relaxed">お写真はリアルタイムで処理され、すぐに削除されます。データの保存は一切ありません。</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 mb-3 text-center">2026年の前髪スタイル6種類</h2>
          <p className="text-slate-500 text-center mb-12">それぞれの顔型に合う前髪を確認しましょう</p>
          <div className="grid md:grid-cols-2 gap-5">
            {STYLES.map((s) => (
              <div key={s.name} className="bg-white border border-slate-100 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Check size={18} className="text-indigo-600 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1.5">{s.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">{s.desc}</p>
                    <p className="text-xs text-indigo-600 font-bold">{s.suits}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">前髪を切る前に避けたい3つの失敗</h2>
        <div className="space-y-4">
          {AVOID.map((a, i) => (
            <div key={i} className="border border-rose-100 bg-rose-50/40 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">✗ {a.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{a.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-black mb-4">美容院に行く前に試そう</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
            4〜5パターンの前髪をご自身のお顔で試して、最も似合うスタイルをスクリーンショット。
            美容師さんに見せれば、伝達ミスもなくなります。
          </p>
          <Link
            href="/try-on?category=hairstyle"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-100 transition-colors"
          >
            <Sparkles size={14} />
            無料で前髪を試着
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 mb-10 text-center">よくある質問</h2>
        <div className="space-y-3">
          {[
            { q: 'バーチャル前髪試着はどう動きますか?', a: 'ご自身の正面のセルフィー写真をアップロードして、試したい前髪スタイルを選ぶか参考画像をアップロードしてください。AIが30秒で、ご自身の本当のお顔に前髪を再現します。' },
            { q: 'どんな前髪スタイルを試せますか?', a: 'シースルーバング、ぱっつん前髪、アイドル前髪(エアバング)、韓国風カーテンバング、サイドバング、ベビーバング、K-POPアイドル(IVE、NewJeans、aespa、LE SSERAFIM、Stray Kids、ENHYPEN)のスタイルなど、Pinterest や Instagram のスクリーンショットからどんなスタイルでも試せます。' },
            { q: '本当の顔のまま見られますか?', a: 'はい。お顔の補正も、目の形の編集もしません。ご自身のお顔の上に前髪だけを描き加えます。' },
            { q: '同じスタイルで違う長さを見られますか?', a: 'はい。最初の試着後、「もう少し短く」「もう少し長く」「サイドに流して」と伝えれば再生成されます。' },
            { q: '料金はいくらですか?', a: '最初のレンダーは無料(登録もカードも不要)。その後、5枚パック ¥750(約$4.99)または15枚パック ¥1,500(約$9.99)。一回払いのみ。' },
          ].map((f, i) => (
            <details key={i} className="group border border-slate-200 rounded-2xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                <span className="font-bold text-slate-900 pr-4">{f.q}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <span className="font-serif text-sm font-black tracking-[0.15em] text-slate-700">AGALAZ</span>
          <nav className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-slate-700">ホーム</Link>
            <Link href="/korean-bangs" className="hover:text-slate-700">English</Link>
            <Link href="/try-on" className="hover:text-slate-700">試着</Link>
            <Link href="/privacy" className="hover:text-slate-700">プライバシー</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
