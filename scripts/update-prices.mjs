// One-shot batch replacement of stale pricing copy across the site after the
// 2026-05-10 paywall restructure (Trial dropped, Starter 6→8, Pro 12→20).
//
// Touched files: ChatBot, virtual-try-on FAQ, Asian landings FAQs, the
// localizedLandings master data file, layout.tsx JSON-LD, and the two old
// landing layouts that hardcoded offers in their description.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

// Each entry runs all 6-language patterns at once. Order matters when one
// pattern is a prefix of another — longer/specific first.
const REPLACEMENTS = [
  // --- ChatBot (ES) ---
  {
    files: ['components/ChatBot.tsx'],
    swaps: [
      // ES variant — "Two one-time packs" answer
      [
        '💰 Dos packs de pago único:\\n\\n• **Starter $4,99** — 10 renders ($0,50 por render)\\n• **Style Pro $9,99** — 25 renders ($0,40 por render, AHORRA 20%)\\n\\nSin suscripción, sin renovación automática. Comprar Ahora en /try-on.',
        '💰 Plan gratuito + 2 packs de pago único:\\n\\n• **Gratis** — 1 render HD al día, login requerido\\n• **Starter $4,99** — 8 renders HD ($0,62 por render)\\n• **Pro $9,99** — 15 + 5 gratis = 20 renders HD ($0,50 por render)\\n\\nUsa el código AGALAZ15 en Pro para 15% OFF. Sin suscripción. Comprar Ahora en /try-on.',
      ],
      // EN variant — "Two one-time packs" answer
      [
        '💰 Two one-time packs:\\n\\n• **Starter $4.99** — 10 renders ($0.50 per render)\\n• **Style Pro $9.99** — 25 renders ($0.40 per render, SAVE 20%)\\n\\nNo subscription, no auto-renewal. Buy Now at /try-on.',
        '💰 Free tier + 2 one-time packs:\\n\\n• **Free** — 1 HD render per day, sign-in required\\n• **Starter $4.99** — 8 HD renders ($0.62 per render)\\n• **Pro $9.99** — 15 + 5 free = 20 HD renders ($0.50 per render)\\n\\nUse code AGALAZ15 on Pro for 15% OFF. No subscription. Buy Now at /try-on.',
      ],
      // ES — "2 renders gratis" framing
      [
        '🎁 Tienes 2 renders 100% gratis sin tarjeta — pruébalo en /try-on. Si te gusta, el pack Starter es $4,99 (10 renders) o Style Pro $9,99 por 25 renders (AHORRA 20%). Pago único, sin suscripción. Comprar Ahora en /try-on.',
        '🎁 Tienes 1 render HD gratis cada día (login requerido) — pruébalo en /try-on. Si te gusta, el pack Starter es $4,99 (8 renders HD) o Pro $9,99 por 20 renders HD (15 + 5 gratis). Pago único, sin suscripción. Código AGALAZ15 = 15% OFF en Pro.',
      ],
      // EN — "2 free renders" framing
      [
        '🎁 You get 2 renders 100% free, no card needed — try it at /try-on. If you like it, the Starter pack is $4.99 (10 renders) or Style Pro $9.99 for 25 renders (SAVE 20%). One-time payment, no subscription. Buy Now at /try-on.',
        '🎁 You get 1 free HD render every day (sign-in required) — try it at /try-on. If you like it, the Starter pack is $4.99 (8 HD renders) or Pro $9.99 for 20 HD renders (15 + 5 free). One-time payment, no subscription. Code AGALAZ15 = 15% OFF on Pro.',
      ],
    ],
  },
  // --- virtual-try-on FAQ (en/es/fr/pt/de/it × text + JSON-LD = 12 lines) ---
  {
    files: ['app/virtual-try-on/page.tsx'],
    swaps: [
      [
        'Yes! Agalaz gives you 2 free virtual try-on renders, no card required. After that, one-time credit packs: Starter $4.99 (10 renders) or Style Pro $9.99 (25 renders, 20% cheaper per render).',
        'Yes! Agalaz gives you 1 free HD render every day (sign-in required). After that, one-time credit packs: Starter $4.99 (8 HD renders) or Pro $9.99 (15 + 5 free = 20 HD renders). Use code AGALAZ15 for 15% off Pro.',
      ],
      [
        'Si! Agalaz te da 2 renders de probador virtual gratis, sin tarjeta. Despues, packs one-time: Starter $4,99 (10 renders) o Style Pro $9,99 (25 renders, 20% mas barato por render).',
        'Si! Agalaz te da 1 render HD gratis cada dia (login requerido). Despues, packs one-time: Starter $4,99 (8 renders HD) o Pro $9,99 (15 + 5 gratis = 20 renders HD). Codigo AGALAZ15 = 15% OFF en Pro.',
      ],
      [
        'Oui ! Agalaz vous offre 2 rendus d’essayage virtuel gratuits, sans carte. Ensuite, packs en paiement unique : Starter 4,99 $ (10 rendus) ou Style Pro 9,99 $ (25 rendus, 20 % moins cher par rendu).',
        'Oui ! Agalaz vous offre 1 rendu HD gratuit par jour (connexion requise). Ensuite, packs en paiement unique : Starter 4,99 $ (8 rendus HD) ou Pro 9,99 $ (15 + 5 gratuits = 20 rendus HD). Code AGALAZ15 = 15 % de remise sur Pro.',
      ],
      [
        'Sim! A Agalaz oferece-lhe 2 renderizacoes gratuitas no provador virtual, sem cartao. Depois, packs de pagamento unico: Starter 4,99 $ (10 renders) ou Style Pro 9,99 $ (25 renders, 20% mais barato por render).',
        'Sim! A Agalaz oferece-lhe 1 render HD gratis por dia (login necessario). Depois, packs de pagamento unico: Starter 4,99 $ (8 renders HD) ou Pro 9,99 $ (15 + 5 gratis = 20 renders HD). Codigo AGALAZ15 = 15% off em Pro.',
      ],
      [
        'Ja! Agalaz schenkt Ihnen 2 kostenlose Renderings der virtuellen Anprobe, ohne Karte. Danach Einmalzahlungs-Packs: Starter 4,99 $ (10 Renderings) oder Style Pro 9,99 $ (25 Renderings, 20% gunstiger pro Rendering).',
        'Ja! Agalaz schenkt Ihnen taglich 1 kostenloses HD-Rendering (Anmeldung erforderlich). Danach Einmalzahlungs-Packs: Starter 4,99 $ (8 HD-Renderings) oder Pro 9,99 $ (15 + 5 gratis = 20 HD-Renderings). Code AGALAZ15 = 15% Rabatt auf Pro.',
      ],
      [
        'Si! Agalaz vi offre 2 rendering gratuiti del camerino virtuale, senza carta. Dopodiche, pack a pagamento unico: Starter 4,99 $ (10 rendering) o Style Pro 9,99 $ (25 rendering, 20% piu economico per rendering).',
        'Si! Agalaz vi offre 1 rendering HD gratuito al giorno (accesso richiesto). Dopodiche, pack a pagamento unico: Starter 4,99 $ (8 rendering HD) o Pro 9,99 $ (15 + 5 gratis = 20 rendering HD). Codice AGALAZ15 = 15% di sconto su Pro.',
      ],
    ],
  },
  // --- Asian landings (5 files, EN-only price answers) ---
  {
    files: [
      'app/ar/hijab/page.tsx',
      'app/zh/qipao/page.tsx',
      'app/ja/kimono/page.tsx',
      'app/ko/hanbok/page.tsx',
      'app/hi/saree/page.tsx',
    ],
    swaps: [
      // AR
      [
        'أول تجربتين مجانيتان، بدون بطاقة ائتمانية. بعدها: باقة Starter بـ 4.99 دولار (10 صور بـ 0.50 دولار للصورة) أو Style Pro بـ 9.99 دولار (25 صورة بـ 0.40 دولار للصورة، توفير 20%). دفعة واحدة فقط، بدون اشتراك.',
        'تجربة HD مجانية واحدة يوميا، تتطلب تسجيل الدخول. بعدها: باقة Starter بـ 4.99 دولار (8 صور HD، 0.62 دولار للصورة) أو Pro بـ 9.99 دولار (15 + 5 مجانية = 20 صورة HD، 0.50 دولار للصورة). استخدم الكود AGALAZ15 لخصم 15% على Pro. دفعة واحدة، بدون اشتراك.',
      ],
      // ZH
      [
        '前两次试穿完全免费,无需绑定信用卡。之后:Starter 套餐 $4.99(10 张图,每张 $0.50)或 Style Pro 套餐 $9.99(25 张图,每张 $0.40 — 节省 20%)。一次性付款,不订阅。',
        '每天 1 张 HD 免费试穿,需要登录。之后:Starter 套餐 $4.99(8 张 HD 图,每张 $0.62)或 Pro 套餐 $9.99(15 + 5 免费 = 20 张 HD 图,每张 $0.50)。使用代码 AGALAZ15 在 Pro 上享 15% 折扣。一次性付款,不订阅。',
      ],
      // JA
      [
        '最初の2回は無料、カード登録不要。その後はStarter $4.99(10枚、1枚$0.50)またはStyle Pro $9.99(25枚、1枚$0.40 — 20%お得)。一回払い、サブスクリプションなし。',
        '毎日1枚のHDレンダーが無料(ログインが必要)。その後はStarter $4.99(HD8枚、1枚$0.62)またはPro $9.99(HD15枚+5枚無料=20枚、1枚$0.50)。コードAGALAZ15でProが15%OFF。一回払い、サブスクリプションなし。',
      ],
      // KO
      [
        '첫 두 번 시도는 무료, 카드 등록 불필요. 이후 Starter $4.99(10장, 장당 $0.50) 또는 Style Pro $9.99(25장, 장당 $0.40 — 20% 할인). 일회성 결제, 정기 구독 없음.',
        '매일 1장의 HD 렌더가 무료 (로그인 필요). 이후 Starter $4.99(HD 8장, 장당 $0.62) 또는 Pro $9.99(HD 15 + 5 무료 = 20장, 장당 $0.50). 코드 AGALAZ15로 Pro에서 15% 할인. 일회성 결제, 정기 구독 없음.',
      ],
      // HI
      [
        'पहली दो ट्राय बिल्कुल मुफ्त, बिना क्रेडिट कार्ड के। इसके बाद: Starter प्लान $4.99 (10 तस्वीरें, $0.50 प्रति तस्वीर) या Style Pro $9.99 (25 तस्वीरें, $0.40 प्रति तस्वीर — 20% बचत)। एक बार का भुगतान, कोई सब्सक्रिप्शन नहीं।',
        'हर दिन 1 HD रेंडर मुफ्त (लॉगिन आवश्यक)। इसके बाद: Starter प्लान $4.99 (8 HD तस्वीरें, $0.62 प्रति तस्वीर) या Pro $9.99 (15 + 5 मुफ्त = 20 HD तस्वीरें, $0.50 प्रति तस्वीर)। कोड AGALAZ15 से Pro पर 15% की छूट। एक बार का भुगतान, कोई सब्सक्रिप्शन नहीं।',
      ],
    ],
  },
  // --- localizedLandings.ts: same FAQ answer repeats many times across landings.
  //     6 patterns (ES/FR/PT/DE/IT × old/new) cover ~80 occurrences.
  {
    files: ['data/localizedLandings.ts'],
    swaps: [
      [
        'Las primeras 2 pruebas son gratis, sin tarjeta. Después: pack Starter $4,99 (10 renders, $0,50 cada uno) o Style Pro $9,99 (25 renders, $0,40 por render, AHORRA 20%). Pago único.',
        '1 render HD gratis cada día (login requerido). Después: pack Starter $4,99 (8 renders HD, $0,62 cada uno) o Pro $9,99 (15 + 5 gratis = 20 renders HD, $0,50 por render). Código AGALAZ15 = 15% OFF en Pro. Pago único.',
      ],
      [
        'Les 2 premiers essayages sont gratuits, sans carte. Ensuite : pack Starter 4,99 $ (10 rendus, 0,50 $ par rendu) ou Style Pro 9,99 $ (25 rendus, 0,40 $ par rendu, ÉCONOMISEZ 20 %). Paiement unique.',
        '1 rendu HD gratuit par jour (connexion requise). Ensuite : pack Starter 4,99 $ (8 rendus HD, 0,62 $ par rendu) ou Pro 9,99 $ (15 + 5 gratuits = 20 rendus HD, 0,50 $ par rendu). Code AGALAZ15 = 15 % off sur Pro. Paiement unique.',
      ],
      [
        'Os 2 primeiros provadores são grátis, sem cartão. Depois: pack Starter 4,99 $ (10 renders, 0,50 $ cada) ou Style Pro 9,99 $ (25 renders, 0,40 $ por render, POUPE 20%). Pagamento único.',
        '1 render HD grátis por dia (login necessário). Depois: pack Starter 4,99 $ (8 renders HD, 0,62 $ cada) ou Pro 9,99 $ (15 + 5 grátis = 20 renders HD, 0,50 $ por render). Código AGALAZ15 = 15% off em Pro. Pagamento único.',
      ],
      [
        'Die ersten 2 Anproben sind kostenlos, keine Karte erforderlich. Danach: Starter-Pack 4,99 $ (10 Renders, 0,50 $ pro Render) oder Style Pro 9,99 $ (25 Renders, 0,40 $ pro Render, 20% SPAREN). Einmalige Zahlung.',
        'Täglich 1 kostenloser HD-Render (Anmeldung erforderlich). Danach: Starter-Pack 4,99 $ (8 HD-Renders, 0,62 $ pro Render) oder Pro 9,99 $ (15 + 5 gratis = 20 HD-Renders, 0,50 $ pro Render). Code AGALAZ15 = 15% Rabatt auf Pro. Einmalige Zahlung.',
      ],
      [
        'Le prime 2 prove sono gratuite, senza carta. Poi: pack Starter 4,99 $ (10 render, 0,50 $ ciascuno) o Style Pro 9,99 $ (25 render, 0,40 $ per render, RISPARMI 20%). Pagamento unico.',
        '1 render HD gratuito al giorno (accesso richiesto). Poi: pack Starter 4,99 $ (8 render HD, 0,62 $ ciascuno) o Pro 9,99 $ (15 + 5 gratis = 20 render HD, 0,50 $ per render). Codice AGALAZ15 = 15% di sconto su Pro. Pagamento unico.',
      ],
    ],
  },
  // --- Root layout.tsx JSON-LD offers (Schema.org pricing) ---
  {
    files: ['app/layout.tsx'],
    swaps: [
      [
        'Starter pack — 10 renders ($0.50 per render). One-time payment.',
        'Starter pack — 8 HD renders ($0.62 per render). One-time payment.',
      ],
      [
        'Style Pro pack — 25 renders ($0.40 per render, save 20%). One-time payment.',
        'Pro pack — 15 + 5 free = 20 HD renders ($0.50 per render, AGALAZ15 = 15% off). One-time payment.',
      ],
      [
        "name: 'Style Pro pack',",
        "name: 'Pro pack',",
      ],
    ],
  },
];

let totalSwaps = 0;
let totalFiles = 0;

for (const group of REPLACEMENTS) {
  for (const rel of group.files) {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) {
      console.log(`✗  miss   ${rel}`);
      continue;
    }
    let src = fs.readFileSync(file, 'utf8');
    let touched = false;
    let swapsApplied = 0;
    for (const [from, to] of group.swaps) {
      const before = src;
      // \\n in source represents the literal two chars "\n" inside a JS string literal.
      // We handle that by leaving the string raw — both file and pattern are JS source.
      while (src.includes(from)) {
        src = src.replace(from, to);
        swapsApplied++;
        touched = true;
      }
      if (before !== src) {
        // counted above
      }
    }
    if (touched) {
      fs.writeFileSync(file, src);
      totalFiles++;
      totalSwaps += swapsApplied;
      console.log(`✓  ${swapsApplied.toString().padStart(2)} swap(s)  ${rel}`);
    } else {
      console.log(`-  no-match  ${rel}`);
    }
  }
}

console.log(`\nUpdated ${totalFiles} files · ${totalSwaps} replacements total.`);
