// app/js/i18n.js
// Lightweight client-side i18n for EN/AR, persists in localStorage key 'zayn1x_lang'
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
      'about.title': 'About',
      'about.copy': 'We help recruit and manage affiliates for sportsbook campaigns. Replace copy and Lottie with your assets to fully brand this page.',
      'join.title': 'Ready to join?',
      'join.copy': 'Register via the link or message me on Telegram — I\'ll walk you through the setup and best performing funnels.',
      'join.cta': 'Contact on Telegram',
      'page2.title': 'Quick Guide',
      'page2.copy': 'Use this page to add onboarding, CPA offers, best promo examples, scripts, or short video walkthroughs for affiliates.'
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
      'about.title': 'من نحن',
      'about.copy': 'نساعد في تجنيد وإدارة شركاء التسويق بالعمولة للحملات الرياضية. استبدل النص والـ Lottie لتخصيص الصفحة.',
      'join.title': 'مستعد تنضم؟',
      'join.copy': 'سجل عبر الرابط أو راسلني على تيليجرام — سأرشدك للبدء وأفضل القنوات.',
      'join.cta': 'تواصل على تيليجرام',
      'page2.title': 'الدليل السريع',
      'page2.copy': 'استخدم هذه الصفحة لإضافة خطوات الانضمام، عروض CPA، أمثلة ترويجية أو شروحات قصيرة.'
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
  }

  function apply(lang){
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    // set dir for RTL
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.setAttribute('dir', 'ltr');
    }
    // replace text nodes for elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[lang] && dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });
  }

  function init(){
    const lang = getCurrent();
    apply(lang);
  }

  return { init, toggle, setLang, getCurrent };
})();
