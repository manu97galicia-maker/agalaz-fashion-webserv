import Link from 'next/link';
import TriptychDemo from '@/components/TriptychDemo';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, Eye } from 'lucide-react';

const FAQ = [
  {
    q: '가상 한복 입어보기는 어떻게 작동하나요?',
    a: '본인의 사진(얼굴과 어깨, 또는 치마 실루엣을 보고 싶다면 전신)과 입어보고 싶은 한복(저고리, 치마, 당의, 전복, 활옷) 사진을 업로드하면, AI가 30초 안에 한복을 입혀드립니다. 고름과 옷고름 매듭, 치마 주름까지 자연스럽게 표현되고 — 본인의 얼굴, 머리, 피부톤, 조명은 그대로 유지됩니다.',
  },
  {
    q: '어떤 한복을 입어볼 수 있나요?',
    a: '여성 전통 한복(저고리+치마, 당의, 원삼, 활옷, 궁중 한복), 남성 한복(저고리+바지, 두루마기, 전복, 갓), 모던 퓨전 한복(리슬, 차이김영진, 단하, 한복린, 손짱). 결혼식 활옷·원삼·신랑 단령포 폐백복, 돌잔치 색동 한복, 어린이 한복까지. 쿠팡, 네이버 스마트스토어, Etsy, 인사동·북촌 대여샵 인스타그램 — 어떤 사진이든 가능합니다.',
  },
  {
    q: '색상이나 매치를 다르게 볼 수 있나요?',
    a: '가능합니다. 첫 렌더링 후 AI 채팅으로 "남색 치마에 살구색 저고리", "색동 무지개 소매", "모노톤 모던 한복", "치마 길이 길게"라고 말하면 동일한 한복이 다른 색상·실루엣으로 다시 렌더링됩니다 — 얼굴과 포즈는 그대로.',
  },
  {
    q: '제 얼굴을 그대로 유지하나요?',
    a: '네. 피부 보정도, 눈 모양 수정도 없습니다. 본인의 진짜 얼굴 위에 한복만 입혀집니다. 어떤 색이 본인의 피부톤과 진짜로 어울리는지 — 대여샵 모델이 아닌 본인 기준으로 — 확인할 수 있습니다.',
  },
  {
    q: '추석, 설날, 돌, 폐백에 적합한가요?',
    a: '바로 그 용도입니다. 가족 추석 한복, 설날 세배 한복, 자녀의 돌잡이 한복, 신부 폐백 활옷·원삼 — 인사동·북촌 대여샵이 마감되기 전에 미리 본인 얼굴에 입혀보세요.',
  },
  {
    q: '가격은 얼마인가요?',
    a: '첫 두 번 시도는 무료, 카드 등록 불필요. 이후 Starter $4.99(10장, 장당 $0.50) 또는 Style Pro $9.99(25장, 장당 $0.40 — 20% 할인). 일회성 결제, 정기 구독 없음.',
  },
  {
    q: '앱을 다운로드해야 하나요?',
    a: '아니요. 휴대폰이나 노트북의 어떤 브라우저에서도 작동합니다. 첫 시도는 무료, 계정 가입 없이.',
  },
];

const TRIPTYCH_LABELS_KO = {
  title: '어떻게 작동하는지 보세요',
  subtitle: '실제 예시: 같은 사람, 전과 후.',
  before: '본인 사진',
  item: '한복',
  after: '결과',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-[family-name:var(--font-noto-kr)]">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/virtual-hanbok-try-on" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">English</Link>
            <Link
              href="/try-on?category=clothing"
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-pink-600 transition-colors"
            >
              지금 입어보기
            </Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-hanbok-try-on" labels={TRIPTYCH_LABELS_KO} />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-800 text-[11px] font-bold rounded-full mb-6">
            한국 한복 AI
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            가상 한복
            <br />
            <span className="italic text-slate-400">입어보기.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            전통, 모던 퓨전, 결혼식 활옷, 돌 한복까지 — 모든 치마와 저고리가{' '}
            <strong className="text-slate-900 font-bold">진짜 내 얼굴</strong>에 어떻게 어울리는지 북촌 대여샵 예약 전에 미리 확인하세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=clothing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-sm hover:bg-pink-600 transition-colors"
            >
              <Sparkles size={16} />
              한복 무료로 입어보기
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">다운로드 없음 · 카드 없음 · 30초</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">추석·설날 쇼핑객이 사랑하는 서비스</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">사진 절대 저장 안 함</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30초 만에 렌더링</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold text-pink-700">왜 미리 입어봐야 할까?</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              대여샵 모델은 한 명. 본인은 그 모델이 아닙니다.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: '본인의 진짜 톤', body: '연분홍 저고리는 밝은 피부에서 다르고, 웜톤·올리브톤에서 완전히 다르게 보입니다. 본인 피부 위에서 먼저 확인하세요.' },
              { icon: Heart, title: '추석, 설날, 돌, 폐백', body: '가족 추석 한복, 자녀의 돌잡이 한복, 신부 폐백 활옷 — 대여샵 예약이 마감되기 전에 미리 계획하세요.' },
              { icon: Camera, title: '경복궁 준비 완료', body: '궁궐로 가기 전에 한복을 본인 얼굴에 미리. 사진에 잘 나오는 치마 색을 골라보세요.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-pink-50 flex items-center justify-center mb-5"><Icon size={18} className="text-pink-700" /></div>
                <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-pink-700">3단계</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            사진 → 한복 → 본인에게.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: '본인 사진 업로드', body: '저고리는 얼굴-어깨, 치마 실루엣을 보고 싶다면 전신. 햇빛 아래 휴대폰 사진으로 충분합니다.' },
            { n: '02', title: '한복 사진 추가', body: '리슬, 단하, 차이김영진, 쿠팡, 북촌 대여샵 인스타그램, Etsy — 어떤 사진이든.' },
            { n: '03', title: '30초 만에 결과', body: 'AI가 저고리, 고름, 치마 드레이프를 본인에게 입혀드립니다 — 얼굴과 조명은 그대로.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-pink-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">대여샵 예약 전에 모든 한복을.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['여성 전통 한복', '저고리+치마, 당의, 원삼, 활옷, 궁중 한복'],
              ['남성 전통 한복', '저고리+바지, 두루마기, 전복, 갓'],
              ['모던 퓨전 한복', '리슬, 차이김영진, 단하, 손짱 — 일상복 실루엣'],
              ['결혼식 한복', '신부 활옷, 원삼, 신랑 단령포, 폐백복'],
              ['돌·아동 한복', '돌잡이 한복, 색동 무지개 소매, 형제자매 한복'],
              ['명절 한복', '추석 가족 세트, 설날 세배 한복, 궁궐 대여용'],
              ['궁중·예복', '조선 궁중 복원, 사극 스타일 화보용 한복'],
              ['부티크·디자이너', '한복린, 김미희, Etsy 인디 한복 장인'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
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
          <span className="text-[11px] font-bold text-pink-700">자주 묻는 질문</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            한복 쇼핑객이 묻는 모든 것.
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

      <section className="bg-gradient-to-br from-pink-50 via-white to-pink-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            행거 위에서 예쁘게.
            <br />
            <span className="italic text-pink-600">본인 위에서 더 예쁘게.</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">
            사진 한 장. 어떤 한복이든. 30초. 본인에게 진짜 어울리는 치마와 저고리.
          </p>
          <Link
            href="/try-on?category=clothing"
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold text-sm hover:bg-pink-600 transition-colors"
          >
            <Sparkles size={16} />
            한복 무료로 입어보기
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/virtual-hanbok-try-on" className="hover:text-slate-600 transition-colors font-light">English</Link>
            <Link href="/" className="hover:text-slate-600 transition-colors font-light">홈</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">입어보기</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">개인정보</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
