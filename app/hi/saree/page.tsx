import Link from 'next/link';
import TriptychDemo from '@/components/TriptychDemo';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, Eye } from 'lucide-react';

const FAQ = [
  {
    q: 'वर्चुअल साड़ी और इंडियन-वियर ट्राय-ऑन कैसे काम करता है?',
    a: 'अपनी साफ तस्वीर (चेहरा और कंधे, या लहंगा-शेरवानी के लिए पूरी बॉडी) और साड़ी, लहंगा, शेरवानी, सलवार-कमीज़, कुर्ता या धोती की तस्वीर अपलोड करें। AI 30 सेकंड में आपकी असली त्वचा-रंग और रोशनी को बरकरार रखते हुए कपड़ा आप पर डाल देता है — बनारसी की ज़री, कांजीवरम का बॉर्डर, सबकुछ आपके चेहरे पर।',
  },
  {
    q: 'कौन-कौन सी साड़ियाँ और इंडियन-वियर ट्राय कर सकती हूँ?',
    a: 'हर बुनावट: बनारसी, कांजीवरम, पटोला, चंदेरी, पैठणी, मैसूर सिल्क, टसर, बंधनी, चिकनकारी, ऑर्गेंज़ा, जॉर्जेट, नेट। लहंगा (दुल्हन रेड, सबयासाची स्टाइल, अनिता डोंगरे, मनीष मल्होत्रा), अनारकली, शरारा, घरारा, सलवार-कमीज़, कुर्ती। पुरुषों के लिए: शेरवानी, बंधगला, नेहरू जैकेट, कुर्ता-पजामा, धोती-कुर्ता, मुंडू। FabIndia, मन्यवर, Aza, Pernia\'s Pop-Up, Etsy, Instagram डिज़ाइनर — कोई भी साफ प्रोडक्ट तस्वीर चलेगी।',
  },
  {
    q: 'क्या मैं अलग-अलग साड़ी ड्रेपिंग स्टाइल देख सकती हूँ?',
    a: 'बिल्कुल। पहले रेंडर के बाद AI चैट से कहें: "बंगाली स्टाइल में पल्लू", "महाराष्ट्रियन नौवारी", "गुजराती सीधा पल्लू", "कूर्गी ड्रेप", "मद्रासी मडिसार"। वही साड़ी अलग ड्रेप में रेंडर हो जाएगी, चेहरा और पोज़ वही रहेंगे।',
  },
  {
    q: 'क्या यह मेरी असली रंगत बरकरार रखेगा?',
    a: 'हाँ। AI आपकी असली त्वचा-रंगत, आँखों का आकार, बाल और जॉलाइन वैसे ही रखता है — कोई फेयरनेस फ़िल्टर नहीं, कोई पश्चिमी चेहरा-एडिट नहीं। मैजेंटा बनारसी और मेहेंदी-ग्रीन में से कौन सी आप पर सच में जँचती है, वही दिखेगा।',
  },
  {
    q: 'क्या यह शादी सीज़न, दिवाली, करवा चौथ के लिए तैयार है?',
    a: 'बिल्कुल इसी के लिए बना है। दुल्हन की लाल बनारसी, संगीत की शरारा, मेहेंदी की पीली, करवा चौथ की साड़ी — सब महीनों पहले अपने चेहरे पर देख लें, टेलर की कतार बंद होने से पहले।',
  },
  {
    q: 'इसकी कीमत क्या है?',
    a: 'हर दिन 1 HD रेंडर मुफ्त (लॉगिन आवश्यक)। इसके बाद: Starter प्लान $4.99 (8 HD तस्वीरें, $0.62 प्रति तस्वीर) या Pro $9.99 (15 + 5 मुफ्त = 20 HD तस्वीरें, $0.50 प्रति तस्वीर)। कोड AGALAZ15 से Pro पर 15% की छूट। एक बार का भुगतान, कोई सब्सक्रिप्शन नहीं।',
  },
  {
    q: 'क्या ऐप डाउनलोड करनी होगी?',
    a: 'नहीं। फोन या लैपटॉप के किसी भी ब्राउज़र में चलता है। पहली ट्राय मुफ्त, बिना अकाउंट।',
  },
];

const TRIPTYCH_LABELS_HI = {
  title: 'देखें यह कैसे काम करता है',
  subtitle: 'सच्चा उदाहरण: एक ही व्यक्ति, पहले और बाद में।',
  before: 'आपकी तस्वीर',
  item: 'कपड़ा',
  after: 'नतीजा',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-[family-name:var(--font-noto-hi)]">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/virtual-saree-try-on" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">English</Link>
            <Link
              href="/try-on?category=clothing"
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-emerald-700 transition-colors"
            >
              अभी ट्राय करें
            </Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-saree-try-on" labels={TRIPTYCH_LABELS_HI} lang="hi" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full mb-6">
            इंडियन कूतूर AI
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            वर्चुअल साड़ी
            <br />
            <span className="italic text-slate-400">ट्राय-ऑन।</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            बनारसी, कांजीवरम, लहंगा, शेरवानी, सलवार-कमीज़, धोती — हर बुनावट, हर ड्रेप अपने{' '}
            <strong className="text-slate-900 font-bold">असली चेहरे</strong> पर देखें — टेलर के कैंची उठाने से पहले। पल्लू का अंदाज़ा अब नहीं।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=clothing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-sm hover:bg-emerald-700 transition-colors"
            >
              <Sparkles size={16} />
              मुफ्त साड़ी ट्राय करें
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">कोई डाउनलोड नहीं · कोई कार्ड नहीं · 30 सेकंड</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">दुल्हनों और शादी की खरीदारी करने वालों की पसंद</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">तस्वीरें कभी सेव नहीं</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30 सेकंड में रेंडर</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold text-emerald-700">क्यों पहले ट्राय करें?</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              मॉडल पर बनारसी और आप पर बनारसी — एक चीज़ नहीं।
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'आपकी असली रंगत', body: 'गेहुँआ, साँवला, गोरा, गहरा — हर रंगत अलग है। मॉडल पर चमकती मैजेंटा कांजीवरम आप पर फीकी पड़ सकती है। पहले अपने चेहरे पर देखें।' },
              { icon: Heart, title: 'शादी, दिवाली, करवा चौथ', body: 'दुल्हन की लाल, संगीत की शरारा, मेहेंदी की पीली, करवा चौथ की साड़ी — महीनों पहले अपने चेहरे पर। टेलर की कतार के डर से नहीं।' },
              { icon: Camera, title: 'सबयासाची बिना ट्रायल', body: 'सबयासाची-स्टाइल लहंगा या मनीष मल्होत्रा अनारकली अपने चेहरे पर देखें — मुंबई के ट्रायल रूम में जाने से पहले। तय करें कतार लायक क्या है।' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-emerald-50 flex items-center justify-center mb-5"><Icon size={18} className="text-emerald-700" /></div>
                <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-emerald-700">3 आसान कदम</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            तस्वीर → साड़ी → आप पर।
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'अपनी तस्वीर अपलोड करें', body: 'साड़ी के लिए चेहरा-कंधे, लहंगा-शेरवानी के लिए पूरी बॉडी। दिन के उजाले में फोन से ली तस्वीर काफी है।' },
            { n: '02', title: 'साड़ी या लहंगा डालें', body: 'कोई भी तस्वीर — Aza, Pernia\'s, मन्यवर, FabIndia, Etsy, या किसी डिज़ाइनर के Instagram का स्क्रीनशॉट।' },
            { n: '03', title: '30 सेकंड में नतीजा', body: 'AI बुनावट, ज़री और ड्रेप आप पर डाल देता है — रंगत और रोशनी जस की तस।' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-emerald-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">हर इंडियन-वियर पीस — डिलीवरी से पहले।</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['साड़ियाँ — सिल्क बुनावटें', 'बनारसी, कांजीवरम, पटोला, चंदेरी, पैठणी, मैसूर, टसर'],
              ['साड़ियाँ — हल्की और मॉडर्न', 'ऑर्गेंज़ा, जॉर्जेट, शिफॉन, नेट, बंधनी, चिकनकारी, हैंड-पेंटेड'],
              ['लहंगा-चोली', 'दुल्हन रेड, संगीत, रिसेप्शन, सबयासाची-स्टाइल, अनिता डोंगरे'],
              ['सलवार सूट', 'अनारकली, स्ट्रेट-कट, पाकिस्तानी स्टाइल, शरारा, घरारा, पलाज़ो'],
              ['शेरवानी और बंधगला', 'दूल्हे की कशीदाकारी शेरवानी, नेहरू जैकेट, इंडो-वेस्टर्न अचकन'],
              ['कुर्ता-पजामा और धोती', 'फेस्टिवल कुर्ता, मुंडू/धोती, पठानी, पाकिस्तानी कुर्ता-शलवार'],
              ['ड्रेप और क्षेत्रीय कट', 'निवी, बंगाली, महाराष्ट्रियन नौवारी, गुजराती, कूर्गी, मडिसार'],
              ['बुटीक और डिज़ाइनर', 'सबयासाची-स्टाइल, मनीष मल्होत्रा, JJ Valaya, Etsy के बुनकर'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
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
          <span className="text-[11px] font-bold text-emerald-700">अक्सर पूछे जाने वाले सवाल</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            दुल्हनें और शादी की खरीदार जो पूछती हैं।
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

      <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            पुतले पर खूबसूरत।
            <br />
            <span className="italic text-emerald-700">आप पर और भी।</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">
            एक तस्वीर। कोई भी साड़ी। 30 सेकंड। बुनावट और पल्लू जो वाक़ई फबे।
          </p>
          <Link
            href="/try-on?category=clothing"
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold text-sm hover:bg-emerald-700 transition-colors"
          >
            <Sparkles size={16} />
            मुफ्त साड़ी ट्राय करें
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/virtual-saree-try-on" className="hover:text-slate-600 transition-colors font-light">English</Link>
            <Link href="/" className="hover:text-slate-600 transition-colors font-light">होम</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">ट्राय करें</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">गोपनीयता</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
