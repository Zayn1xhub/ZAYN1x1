window.i18n = (function(){
  const KEY = 'zayn1x_lang';
  const defaults = 'en';
  const dict = {
    en: {
      'splash.title': 'ZAYN1x',
      'splash.sub': 'Senior Affiliate Manager | 1xBet',
      'splash.enter': 'Access Dashboard',
      'nav.home': 'Dashboard',
      'nav.guide': 'Academy',
      'nav.join': 'Join',
      'hero.title': 'I Turn Traffic Into Crypto.',
      'hero.lead': 'Stop sending traffic to dead offers. I provide the highest converting funnels, private creatives, and weekly USDT payouts.',
      'hero.cta': 'Start Earning',
      'hero.contact': 'Direct Message Me',
      'hero.caption': 'Accepting new partners for Q4 2024',
      
      // Calculator
      'calc.title': 'Calculate Your Potential',
      'calc.label': 'Monthly FTDs (First Time Depositors)',
      'calc.result': 'Est. Monthly Earnings',
      'calc.sub': 'Based on average $45 player value & 35% RevShare',

      // Features
      'feat.title': 'Why Work With Me?',
      'feat.payouts.t': 'Weekly Payouts',
      'feat.payouts.d': 'No net-30 delays. You generate traffic this week, you get paid next Tuesday via USDT/Binance.',
      'feat.creative.t': 'Private Creatives',
      'feat.creative.d': 'Access my personal library of viral TikTok/Reels hooks that are currently crushing it.',
      'feat.track.t': 'VIP Conditions',
      'feat.track.d': 'Skip the queue. Get bumped to 35% RevShare or hybrid deals immediately.',
      
      'stat.avgRev': 'Avg RevShare',
      'stat.ftd': 'Conversion Rate',
      'stat.partners': 'Active Partners',

      // FAQ
      'faq.title': 'FAQs',
      'faq.q1': 'How do I get paid?',
      'faq.a1': 'USDT (TRC20), Bitcoin, or Local Bank Transfer. Minimum withdrawal is $30.',
      'faq.q2': 'Do you provide demo accounts?',
      'faq.a2': 'Yes. Once you register, DM me and I will set up a funded demo account for your content.',

      'about.title': 'The Mission',
      'about.copy': 'I am not customer support. I am a growth partner. My job is to make sure your audience converts. I handle the tech, the tracking, and the payments. You handle the content.',
      'join.title': 'Stop Leaving Money on the Table',
      'join.copy': 'My top partners are doing $5k - $50k monthly. Are you next?',
      'join.cta': 'Message Me Now',

      // Ticker
      'ticker.payout': 'received',
      'ticker.joined': 'joined the team',
      
      // Page 2
      'page2.title': 'Partner Academy',
      'page2.subtitle': 'Private Resources & Scripts',
      'page2.step1': '01. The Hook',
      'page2.step1d': 'Grab attention in the first 3 seconds. Download my "Top 10 Viral Hooks" PDF.',
      'page2.step2': '02. The Funnel',
      'page2.step2d': 'Don\'t send direct to home. Use the "Registration Landing Page". Link in bio strategies.',
      'page2.step3': '03. The Retention',
      'page2.step3d': 'How to use promo code "ZAYN1x" to lock players to your account forever.',
      'page2.offer.title': 'Flash Bonus Offer',
      'page2.offer.desc': 'Use this creative for the Champions League Final. High conversion expected.',
      'page2.download': 'Download Assets Pack'
    },
    ar: {
      'splash.title': 'ZAYN1x',
      'splash.sub': 'مدير تسويق أول | 1xBet',
      'splash.enter': 'دخول المنصة',
      'nav.home': 'الرئيسية',
      'nav.guide': 'الأكاديمية',
      'nav.join': 'انضم',
      'hero.title': 'حول ترافيكك إلى أرباح.',
      'hero.lead': 'توقف عن إرسال الزوار لعروض ميتة. أوفر لك أفضل مسارات التحويل، وتصاميم حصرية، ودفعات USDT أسبوعية.',
      'hero.cta': 'ابدأ الربح',
      'hero.contact': 'راسلني مباشرة',
      'hero.caption': 'نقبل شركاء جدد للربع الرابع 2024',
  
      
      // Calculator
      'calc.title': 'احسب أرباحك المتوقعة',
      'calc.label': 'عدد المودعين الجدد شهرياً (FTDs)',
      'calc.result': 'الأرباح الشهرية المتوقعة',
      'calc.sub': 'بناءً على متوسط قيمة لاعب 45$ ونسبة 35%',

      // Features
      'feat.title': 'لماذا تعمل معي؟',
      'feat.payouts.t': 'دفعات أسبوعية',
      'feat.payouts.d': 'لا تأخيرات. حقق نتائج هذا الأسبوع، استلم أرباحك الثلاثاء القادم عبر USDT.',
      'feat.creative.t': 'مكتبة إبداعية',
      'feat.creative.d': 'احصل على مكتبتي الخاصة من أفكار الفيديوهات الناجحة حالياً على تيك توك وريلز.',
      'feat.track.t': 'شروط VIP',
      'feat.track.d': 'تجاوز الانتظار. احصل مباشرة على نسبة 35% أو صفقات Hybrid خاصة.',
      
      'stat.avgRev': 'نسبة الأرباح',
      'stat.ftd': 'معدل التحويل',
      'stat.partners': 'شريك نشط',

      // FAQ
      'faq.title': 'أسئلة شائعة',
      'faq.q1': 'كيف استلم أرباحي؟',
      'faq.a1': 'USDT (TRC20)، بيتكوين، أو تحويل بنكي محلي. الحد الأدنى للسحب 30$.',
      'faq.q2': 'هل توفر حسابات ديمو (تجريبية)؟',
      'faq.a2': 'نعم. بمجرد التسجيل، راسلني وسأقوم بتجهيز حساب ديمو مشحون لصناعة المحتوى.',

      'about.title': 'المهمة',
      'about.copy': 'أنا لست خدمة عملاء. أنا شريك نمو. وظيفتي هي التأكد من أن جمهورك يتحول إلى لاعبين. أنا أتولى التقنية والتتبع والدفع. أنت تتولى المحتوى.',
      'join.title': 'لا تضيع الفرصة',
      'join.copy': 'شركائي يحققون بين 5,000$ إلى 50,000$ شهرياً. هل أنت التالي؟',
      'join.cta': 'راسلني الآن',

      // Ticker
      'ticker.payout': 'تم تحويل دفعة',
      'ticker.joined': 'انضم للفريق',

      // Page 2
      'page2.title': 'أكاديمية الشركاء',
      'page2.subtitle': 'مصادر ونصوص خاصة',
      'page2.step1': '01. الخطف (The Hook)',
      'page2.step1d': 'اجذب الانتباه في أول 3 ثوان. حمل ملف "أفضل 10 مقدمات فيرال".',
      'page2.step2': '02. القمع (The Funnel)',
      'page2.step2d': 'لا ترسل للرئيسية مباشرة. استخدم رابط صفحة التسجيل. استراتيجيات الرابط في البايو.',
      'page2.step3': '03. الحفاظ (Retention)',
      'page2.step3d': 'كيف تستخدم كود البرومو "ZAYN1x" لربط اللاعبين بحسابك للأبد.',
      'page2.offer.title': 'عرض بونص سريع',
      'page2.offer.desc': 'استخدم هذا الإعلان لنهائي دوري الأبطال. متوقع تحويل عالي جداً.',
      'page2.download': 'تحميل الحزمة'
    }
  };

  function getCurrent(){ return localStorage.getItem(KEY) || defaults; }
  function setLang(lang){ if (!dict[lang]) lang = defaults; localStorage.setItem(KEY, lang); apply(lang); }
  function toggle(){ const cur = getCurrent(); const next = cur === 'en' ? 'ar' : 'en'; setLang(next); }
  function apply(lang){
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
    });
    document.querySelectorAll('.lang-btn .lang-label').forEach(lbl => lbl.textContent = lang === 'en' ? 'AR' : 'EN');
  }
  function setLangBtn(btn){ if (!btn) return; const s = btn.querySelector('.lang-label'); if(s) s.textContent = getCurrent() === 'en' ? 'AR' : 'EN'; }
  function init(){ apply(getCurrent()); document.querySelectorAll('.lang-btn').forEach(b => setLangBtn(b)); }
  return { init, toggle, setLangBtn, getCurrent };
})();
