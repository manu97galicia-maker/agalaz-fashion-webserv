import Link from 'next/link';
import TriptychDemo from '@/components/TriptychDemo';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, Eye } from 'lucide-react';

const FAQ = [
  {
    q: '虚拟旗袍和汉服试穿是怎么工作的?',
    a: '上传一张你自己的清晰照片(脸和肩膀,或想看整体轮廓的话上传全身照),再上传你想试的旗袍、长衫、汉服、唐装或马褂的照片。AI 会在 30 秒内为你"穿上"它 — 立领(领子)、盘扣、刺绣、开衩都自然贴合,你的脸、肤色和光线都保持不变。',
  },
  {
    q: '可以试哪些中式服装?',
    a: '旗袍/长衫(1920年代上海经典款、现代修身款、改良款长袖、婚礼大红款)、汉服 — 各朝代形制都有:唐代襦裙、宋代褙子、明代袄裙、魏晋大袖衫。唐装(男女款)、长衫、马褂、童装唐装、婚礼裙褂和秀禾服。来自上海滩、NE-TIGER、Heaven Gaia 盖娅传说、汉服时代、淘宝、Etsy 汉服店、独立设计师 — 任何清晰的产品图都可以。',
  },
  {
    q: '可以看不同颜色和盘扣样式吗?',
    a: '可以。第一次生成后,在 AI 聊天里说:"换成翡翠绿"、"改成传统盘扣"、"开衩再高些"、"换成明制袄裙",同一件衣服会以新的样式重新生成 — 你的脸和姿势保持不变。',
  },
  {
    q: '会保留我真实的样貌吗?',
    a: '会的。没有美白滤镜,没有西式脸部修饰,没有身材重塑。屏幕上的就是穿着旗袍或汉服的真实的你。可以用来挑选真正适合你肤色的颜色 — 而不是品牌模特的肤色。',
  },
  {
    q: '春节、婚礼、汉服节能用吗?',
    a: '正是为这些场景设计的。提前规划春节大红旗袍、婚礼裙褂秀禾服、新郎褂衫、汉服日或中秋节的汉服拍摄 — 在上海、苏州或唐人街裁缝排期前几周就可以确认。',
  },
  {
    q: '价格是多少?',
    a: '每天 1 张 HD 免费试穿,需要登录。之后:Starter 套餐 $4.99(8 张 HD 图,每张 $0.62)或 Pro 套餐 $9.99(15 + 5 免费 = 20 张 HD 图,每张 $0.50)。使用代码 AGALAZ15 在 Pro 上享 15% 折扣。一次性付款,不订阅。',
  },
  {
    q: '需要下载 App 吗?',
    a: '不用。手机或电脑的任何浏览器都能用。第一次试穿免费,无需注册账号。',
  },
];

const TRIPTYCH_LABELS_ZH = {
  title: '看看它怎么工作',
  subtitle: '真实示例:同一个人,前后对比。',
  before: '你的照片',
  item: '衣服',
  after: '结果',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-[family-name:var(--font-noto-sc)]">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/virtual-qipao-try-on" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">English</Link>
            <Link
              href="/try-on?category=clothing"
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-red-700 transition-colors"
            >
              立即试穿
            </Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-qipao-try-on" labels={TRIPTYCH_LABELS_ZH} lang="zh" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-800 text-[11px] font-bold rounded-full mb-6">
            中式高定 AI
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            虚拟旗袍
            <br />
            <span className="italic text-slate-400">试穿。</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            旗袍、长衫、汉服、唐装、马褂 — 立领和盘扣穿在{' '}
            <strong className="text-slate-900 font-bold">真实的你脸上</strong>是什么样,在上海裁缝量身之前就能看到。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=clothing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-sm hover:bg-red-700 transition-colors"
            >
              <Sparkles size={16} />
              免费试穿旗袍
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">无需下载 · 无需绑卡 · 30 秒</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">春节和婚礼买家最爱</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">照片永不保存</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30 秒生成</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold text-red-700">为什么先试穿?</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              上海摄影棚里的旗袍,不等于你身上的旗袍。
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: '你真实的肤色', body: '婚礼大红在不同肤色上读起来可能是绛红或猩红。让裁缝裁布之前,先在你的肌肤上看看。' },
              { icon: Heart, title: '春节、婚礼、汉服节', body: '提前几个月规划春节红旗袍、婚礼裙褂秀禾、汉服日或中秋拍摄 — 在裁缝档期排满之前。' },
              { icon: Camera, title: '汉服复兴准备好了', body: '试遍每个朝代 — 唐代襦裙、宋代褙子、明代袄裙 — 在自己身上,然后再决定哪个形制最适合你。' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-red-50 flex items-center justify-center mb-5"><Icon size={18} className="text-red-700" /></div>
                <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-red-700">3 步搞定</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            照片 → 旗袍 → 穿在你身上。
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: '上传你的照片', body: '看立领就脸和肩膀,看整体和开衩就全身。白天用手机拍的就够。' },
            { n: '02', title: '加入旗袍或汉服', body: '上海滩、NE-TIGER、盖娅传说、汉服时代、淘宝、Etsy 汉服店、设计师 Instagram — 任何图都行。' },
            { n: '03', title: '30 秒出图', body: 'AI 把丝绸、盘扣、刺绣和开衩穿到你身上 — 你的脸和光线都不变。' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-red-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">每件丝绸,在裁缝下剪刀之前。</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['旗袍 / 长衫', '1920 上海经典、现代修身、改良长袖、茶歇长度'],
              ['婚礼旗袍 / 裙褂', '婚礼大红旗袍、龙凤褂、秀禾服、金线刺绣套装'],
              ['汉服 — 唐代', '襦裙、齐胸襦裙、半臂、大袖衫'],
              ['汉服 — 宋明', '褙子、宋制马面裙、明制袄裙、立领、圆领袍'],
              ['唐装 / 长衫', '男女唐装、长衫、马褂'],
              ['儿童中式', '春节童装唐装、儿童汉服、肚兜满月装'],
              ['当代设计师', '上海滩、NE-TIGER、盖娅传说、郭培、Vivienne Tam'],
              ['手工 / 独立', '苏州丝绸裁缝、唐人街老师傅、Etsy 独立汉服店'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
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
          <span className="text-[11px] font-bold text-red-700">常见问题</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            旗袍和汉服买家都在问。
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

      <section className="bg-gradient-to-br from-red-50 via-white to-amber-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            橱窗里好看。
            <br />
            <span className="italic text-red-700">穿你身上更好看。</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">
            一张照片。任何旗袍。30 秒。真正合衬的丝、开衩和盘扣。
          </p>
          <Link
            href="/try-on?category=clothing"
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold text-sm hover:bg-red-700 transition-colors"
          >
            <Sparkles size={16} />
            免费试穿旗袍
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/virtual-qipao-try-on" className="hover:text-slate-600 transition-colors font-light">English</Link>
            <Link href="/" className="hover:text-slate-600 transition-colors font-light">首页</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">试穿</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">隐私</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
