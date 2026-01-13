// app/js/i18n.js
window.i18n = (function(){
  const KEY = 'zayn1x_lang';
  const defaults = 'en';
  const dict = {
    en: {
      'splash.title': 'ZAYN1x',
      'splash.sub': 'Premium motion-first affiliate brand',
      'splash.enter': 'Enter',
      'nav.home': 'Home',
      'nav.guide': 'Guide',
      'nav.join': 'Join',
      'hero.title': 'ZAYN1x — Build. Recruit. Earn.',
      'hero.lead': 'Premium motion-first affiliate brand — recruitment, management and creative for sportsbook promo.',
      'hero.cta': 'Get started',
      'hero.contact': 'Contact on Telegram',
      'hero.caption': 'Real affiliates. Real payouts. Real support.',
      'stats.aff': '1K+',
      'stats.affLabel': 'Affiliates',
      'stats.revLabel': 'Revenue Share',
      'stats.pay': 'Binance',
      'stats.payLabel': 'Payouts',
      
      // Features & FAQ (Newly Added)
      'feat.title': 'What you get',
      'feat.payouts.t': 'Fast payouts',
      'feat.payouts.d': 'Binance & local methods, simple withdrawals and timely processing.',
      'feat.creative.t': 'Creative packs',
      'feat.creative.d': 'Ads, short videos and banners tailor-made to convert in MENA.',
      'feat.track.t': 'Tracking & reports',
      'feat.track.d': 'Simple dashboards, weekly deep dives and affiliate coaching.',
      'stat.avgRev': 'Avg Rev %',
      'stat.ftd': 'FTD rate',
      'faq.title': 'Quick FAQ',
      'faq.q1': 'How do payouts work?',
      'faq.a1': 'We use Binance wallets and local methods, paid weekly on approval.',
      'faq.q2': 'How do I track my players?',
      'faq.a2': 'We give a tracking dashboard or you can request periodic reports.',

      'about.title': 'About',
      'about.copy': 'We help recruit and manage affiliates for sportsbook campaigns. Replace copy and Lottie with your assets to fully brand this page.',
      'join.title': 'Ready to join?',
      'join.copy': 'Register via the link or message me on Telegram — I\'ll walk you through the setup and best performing funnels.',
      'join.cta': 'Contact on Telegram',
      
      // Page 2 (Guide)
      'page2.title': 'Affiliate Guide',
      'page2.subtitle': 'Onboarding, Offers & Scripts',
      'page2.step1': 'Step 1: Get Creatives',
      'page2.step1d': 'Download our high-converting video packs designed for TikTok and Instagram Reels.',
      'page2.step2': 'Step 2: Get Your Link',
      'page2.step2d': 'Register to generate your unique tracking link. All FTDs are monitored in real-time.',
      'page2.step3': 'Step 3: Launch & Scale',
      'page2.step3d': 'Post content daily. We analyze your traffic weekly and optimize your deal.',
      'page2.offer.title': 'Current CPA Offer',
      'page2.offer.desc': 'Exclusive sports welcome bonus. High conversion rate for MENA traffic.',
      'page2.download': 'Download Assets'
    },
    ar: {
      'splash.title': 'ZAYN1x',
      'splash.sub': 'علامة احترافية للتسويق بالعمولة (أفلييت)',
      'splash.enter': 'دخول',
      'nav.home': 'الرئيسية',
      'nav.guide': 'الدليل',
      'nav.join': 'انضم',
      'hero.title': 'ZAYN1x — بناء. تجنيد. ربح.',
      'hero.lead': 'تصميم متحرك ومخصص للتسويق بالعمولة — تجنيد، إدارة وإبداع للحملات الرياضية.',
      'hero.cta': 'ابدأ الآن',
      'hero.contact': 'تواصل على تيليجرام',
      'hero.caption': 'شركاء حقيقيون. دفعات حقيقة. دعم فعّال.',
      'stats.aff': '1ألف+',
      'stats.affLabel': 'الشركاء',
      'stats.revLabel': 'نسبة الأرباح',
      'stats.pay': 'Binance',
      'stats.payLabel': 'المدفوعات',
      
      // Features & FAQ (Arabic)
      'feat.title': 'ماذا نقدم؟',
      'feat.payouts.t': 'دفعات سريعة',
      'feat.payouts.d': 'عبر Binance وطرق محلية، سحب بسيط ومعالجة فورية.',
      'feat.creative.t': 'محتوى إبداعي',
      'feat.creative.d': 'إعلانات، فيديوهات قصيرة وبانرات مخصصة لزيادة التحويل.',
      'feat.track.t': 'تتبع وتقارير',
      'feat.track.d': 'لوحات تحكم بسيطة، تحليلات أسبوعية وتدريب للشركاء.',
      'stat.avgRev': 'متوسط الربح',
      'stat.ftd': 'معدل التحويل',
      'faq.title': 'أسئلة شائعة',
      'faq.q1': 'كيف تتم المدفوعات؟',
      'faq.a1': 'نستخدم محافظ Binance والطرق المحلية، وتدفع أسبوعياً عند الاعتماد.',
      'faq.q2': 'كيف أتتبع اللاعبين؟',
      'faq.a2': 'نوفر لوحة تحكم للتتبع أو يمكنك طلب تقارير دورية.',

      'about.title': 'من نحن',
      'about.copy': 'نساعد في تجنيد وإدارة شركاء التسويق بالعمولة للحملات الرياضية. استبدل النص والـ Lottie لتخصيص الصفحة.',
      'join.title': 'مستعد تنضم؟',
      'join.copy': 'سجل عبر الرابط أو راسلني على تيليجرام — سأرشدك للبدء وأفضل القنوات.',
      'join.cta': 'تواصل على تيليجرام',
      
      // Page 2 (Arabic)
      'page2.title': 'دليل الشركاء',
      'page2.subtitle': 'البداية، العروض والنصوص',
      'page2.step1': '1. احصل على التصاميم',
      'page2.step1d': 'حمل حزمة الفيديوهات عالية التحويل المصممة خصيصاً لـ TikTok و Reels.',
      'page2.step2': '2. استلم رابطك',
      'page2.step2d': 'سجل لتوليد رابط التتبع الخاص بك. يتم رصد النتائج فورياً.',
      'page2.step3': '3. انشر وتوسع',
      'page2.step3d': 'انشر المحتوى يومياً. نحلل زياراتك أسبوعياً ونحسن عرضك.',
      'page2.offer.title': 'عرض CPA الحالي',
      'page2.offer.desc': 'مكافأة ترحيبية رياضية حصرية. معدل تحويل مرتفع للجمهور العربي.',
      'page2.download': 'تحميل الملفات'
    }
  };

  function getCurrent(){
    return localStorage.getItem(KEY) || defaults;
  }

  function setLang(lang){
    if (!dict[lang]) lang = defaults;
    localStorage.setItem(KEY, lang);
    apply(lang);
  }

  function toggle(){
    const cur = getCurrent();
    const next = cur === 'en' ? 'ar' : 'en';
    setLang(next);
    // dispatch event so other components can react if needed
    window.dispatchEvent(new CustomEvent('lang-change', { detail: next }));
  }

  function apply(lang){
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.setAttribute('dir', 'ltr');
    }
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[lang] && dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });
    
    // Update all toggle buttons found in DOM
    document.querySelectorAll('.lang-btn .lang-label').forEach(lbl => {
        lbl.textContent = lang === 'en' ? 'AR' : 'EN';
    });
  }

  // Helper to init buttons
  function setLangBtn(btn){
    if (!btn) return;
    const lang = getCurrent();
    const s = btn.querySelector('.lang-label');
    if(s) s.textContent = lang === 'en' ? 'AR' : 'EN';
  }

  function init(){
    const lang = getCurrent();
    apply(lang);
    const btns = document.querySelectorAll('.lang-btn'); // Select by class to catch all
    btns.forEach(b => setLangBtn(b));
  }

  return { init, toggle, setLang, getCurrent, setLangBtn };
})();
