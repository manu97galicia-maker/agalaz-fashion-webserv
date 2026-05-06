import Link from 'next/link';
import TriptychDemo from '@/components/TriptychDemo';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, Eye } from 'lucide-react';

const FAQ = [
  {
    q: 'バーチャル着物・浴衣試着はどう動きますか?',
    a: 'ご自身のお写真(顔と肩、または着物の全身シルエットを見たい場合は全身)と、試着したい着物・浴衣・羽織・袴・振袖のお写真をアップロードしてください。AIが30秒で着付けを行い、帯結び、衿(えり)の重ね、袖丈までリアルに再現します。お顔、髪、肌色、照明はそのまま保たれます。',
  },
  {
    q: 'どんな着物を試せますか?',
    a: 'フォーマル着物(未婚女性の振袖、既婚女性の留袖、訪問着)、夏の浴衣(花見、花火大会、旅館・温泉、祭り)、羽織、男性の紋付・袴、子供の七五三・お宮参り、結婚式の白無垢・色打掛・引き振袖、モダンな普段着着物。京都のレンタル店(夢館、和楽)、メルカリ、ヤフオク、ヴィンテージショップ、由水煌人や紫織庵、Hiromi Asaiなどデザイナー作品 — どんな写真でもOKです。',
  },
  {
    q: '帯や衿の組み合わせを変えて見られますか?',
    a: 'はい。最初の試着後、AIチャットで「赤と金の丸帯に変えて」「もっと淡い衿で」「袖を長めに」「帯を太鼓結びに」と伝えれば、同じ着物が新しい帯や衿で再生成されます — お顔とポーズはそのまま。',
  },
  {
    q: '本当の顔のままですか?',
    a: 'はい。肌の補正も、目の形の編集もしません。京都スタジオのモデルではなく、本当のあなたの顔の上に着物だけを着付けます。ご自身の肌色に絹の色がどう映えるかを正確に確認できます。',
  },
  {
    q: '七五三、成人式、花見、京都レンタルに使えますか?',
    a: 'まさにその用途です。お子様の七五三、成人式の振袖、花見の浴衣、結婚式の白無垢 — 祇園や浅草のレンタル予約、写真スタジオ予約の前に、ご自身のお顔で先に確認できます。',
  },
  {
    q: '料金はいくらですか?',
    a: '最初の2回は無料、カード登録不要。その後はStarter $4.99(10枚、1枚$0.50)またはStyle Pro $9.99(25枚、1枚$0.40 — 20%お得)。一回払い、サブスクリプションなし。',
  },
  {
    q: 'アプリのダウンロードは必要ですか?',
    a: 'いいえ。スマホでもPCでも、どのブラウザからでも動きます。最初の試着は無料、アカウント登録不要です。',
  },
];

const TRIPTYCH_LABELS_JA = {
  title: '動作の様子を見る',
  subtitle: '実例:同じ人、ビフォー・アフター。',
  before: 'お写真',
  item: '着物',
  after: '結果',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-[family-name:var(--font-noto-jp)]">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/virtual-kimono-try-on" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">English</Link>
            <Link
              href="/try-on?category=clothing"
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-700 transition-colors"
            >
              今すぐ試着
            </Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-kimono-try-on" labels={TRIPTYCH_LABELS_JA} />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-800 text-[11px] font-bold rounded-full mb-6">
            和装 AI
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            バーチャル着物
            <br />
            <span className="italic text-slate-400">試着。</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            振袖、浴衣、羽織、袴、七五三 — あらゆる絹と帯が{' '}
            <strong className="text-slate-900 font-bold">本当のあなたの顔</strong>にどう映えるか、京都のレンタル予約の前に確認できます。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=clothing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
            >
              <Sparkles size={16} />
              着物を無料で試着
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">ダウンロードなし · カードなし · 30秒</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">花見・成人式の買い物客に愛用</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">写真は保存されません</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30秒で生成</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold text-indigo-700">なぜ事前に試着?</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              京都スタジオのモデルとあなたは違う。
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'あなたの本当の肌色', body: 'スタジオモデルに映える珊瑚色の振袖が、あなたではピンクオレンジや黄色寄りに見えるかも。先にご自身の肌で確認を。' },
              { icon: Heart, title: '成人式、七五三、花見', body: '成人式の振袖、お子様の七五三、花見の浴衣、結婚式の白無垢 — レンタルとカメラマン予約の前に計画を。' },
              { icon: Camera, title: '京都の準備', body: '祇園や浅草に着く前に、自分の顔で試着。竹林や鳥居に映える帯の色を選びましょう。' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center mb-5"><Icon size={18} className="text-indigo-700" /></div>
                <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-indigo-700">3ステップ</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            写真 → 着物 → あなたへ。
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'お写真をアップロード', body: '衿(えり)を見るなら顔と肩、帯と袖丈を見るなら全身。日中のスマホ写真で十分です。' },
            { n: '02', title: '着物・浴衣の写真を追加', body: '和楽、夢館、メルカリ、ヤフオク、京都のヴィンテージ、デザイナーInstagramのスクショ — どの画像でもOK。' },
            { n: '03', title: '30秒で完成', body: 'AIが絹、帯結び、袖丈をあなたに着付けます — お顔と髪、照明はそのまま。' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-indigo-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">レンタル予約前に、すべての絹を。</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['振袖(フォーマル)', '成人式、大振袖、中振袖、長袖の未婚女性用'],
              ['留袖・訪問着', '既婚女性のフォーマル、結婚式参列、茶会の訪問着'],
              ['浴衣(夏の綿)', '花見、花火大会、祭り、旅館・温泉浴衣'],
              ['男性着物', '紋付、羽織袴、作務衣、男性浴衣'],
              ['結婚式着物', '白無垢、色打掛、引き振袖、新郎の紋付羽織袴'],
              ['子供着物', '七五三(3、5、7歳)、お宮参り、袴着'],
              ['羽織・道行・袴', 'モダン羽織、道行コート、女性の行灯袴'],
              ['ブティック・ヴィンテージ', '京都ヴィンテージ、斉藤上太郎、Hiromi Asai、職人織り'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div>
                  <span className="text-white font-bold text-sm">{title}</span>
                  <span className="text-white/60 font-light text-sm"> — {body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-indigo-700">よくある質問</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            着物のお買い物で皆さんが聞くこと。
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <details key={i} className="group bg-slate-50 border border-slate-100 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-slate-100 transition-colors list-none">
                <span className="font-serif text-base font-bold text-slate-900 tracking-tight">{item.q}</span>
                <span className="text-slate-400 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-5 pb-5 text-slate-500 text-sm font-light leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            ハンガーで美しく。
            <br />
            <span className="italic text-indigo-700">あなたで、もっと。</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">
            写真1枚。どの着物でも。30秒。本当に映える絹と帯。
          </p>
          <Link
            href="/try-on?category=clothing"
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
          >
            <Sparkles size={16} />
            着物を無料で試着
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/virtual-kimono-try-on" className="hover:text-slate-600 transition-colors font-light">English</Link>
            <Link href="/" className="hover:text-slate-600 transition-colors font-light">ホーム</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">試着</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">プライバシー</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
