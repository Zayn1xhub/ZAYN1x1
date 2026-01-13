// app/js/main.js
// Handles: i18n init (if present), lottie loading, parallax, transitions, cursor follower, TG badge, counters, FAQ, safe back
document.addEventListener('DOMContentLoaded', () => {
  // init i18n if loaded
  if (typeof i18n !== 'undefined') i18n.init();

  // year (if exists)
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const card = document.getElementById('card');
  const animWrap = document.getElementById('lottie-hero');
  const fallback = document.getElementById('lottie-fallback');

  // APP ENTRY animation classes
  document.body.classList.add('app-enter');
  window.requestAnimationFrame(() => {
    setTimeout(()=> {
      document.body.classList.remove('app-enter');
      document.body.classList.add('app-ready');
    }, 80);
  });

  // card entrance fallback for pages with #card
  if (card) {
    card.style.opacity = 0;
    card.style.transform = 'translateY(18px)';
    window.requestAnimationFrame(()=> {
      setTimeout(()=> {
        card.style.transition = 'opacity .7s cubic-bezier(.2,.9,.3,1), transform .7s cubic-bezier(.2,.9,.3,1)';
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, 80);
    });
  }

  // TG badge init (badge exists both on splash and app)
  (function initTGBadge(){
    const badge = document.getElementById('tgBadge');
    const cntEl = document.getElementById('tgCount');
    if (!badge) return;
    window.TG = window.TG || {};
    window.TG.setCount = (n) => {
      if(!cntEl) return;
      cntEl.textContent = n > 99 ? '99+' : String(n);
      cntEl.style.display = n > 0 ? 'inline-block' : 'none';
    };
    // demo unread count
    window.TG.setCount(3);
    // hover micro-interaction
    badge.addEventListener('mouseenter', ()=> badge.style.transform = 'translateY(-4px) scale(1.02)');
    badge.addEventListener('mouseleave', ()=> badge.style.transform = '');
  })();

  // Cursor follower
  (function cursorFollower() {
    const follower = document.getElementById('cursor-follower');
    if (!follower) return;
    let lastX = window.innerWidth / 2, lastY = window.innerHeight / 2;
    document.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      follower.style.opacity = 1;
      follower.style.transform = `translate(${lastX}px, ${lastY}px) scale(1)`;
    });
    document.addEventListener('mouseleave', () => follower.style.opacity = 0);
    // enlarge follower on interactive elements
    const interactive = document.querySelectorAll('a, button, .btn, .animWrap');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.transform = `translate(${lastX}px, ${lastY}px) scale(1.6)`;
        follower.style.transition = 'transform .12s ease, opacity .12s ease';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.transform = `translate(${lastX}px, ${lastY}px) scale(1)`;
      });
    });
  })();

  // Parallax on card
  (function addParallax() {
    if (!card) return;
    const maxTilt = 10;
    const maxRotate = 6;
    let rect = null;
    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = (e.clientX - cx) / (rect.width/2);
      const dy = (e.clientY - cy) / (rect.height/2);
      const tx = dx * maxTilt;
      const ty = dy * maxTilt * -1;
      const rz = dx * maxRotate;
      card.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateZ(${rz}deg) scale(1.004)`;
      if (animWrap) animWrap.style.transform = `translate3d(${tx * 0.6}px, ${ty * 0.6}px, 0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if (animWrap) animWrap.style.transform = '';
      rect = null;
    });
  })();

  // safe back links handler (listens to [data-back] links)
  (function safeBackLinks(){
    document.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (history.length > 1) {
          history.back();
          setTimeout(() => {
            // if still here, fallback
            if (location.pathname.endsWith('/page2.html')) {
              location.href = './index.html';
            }
          }, 400);
        } else {
          location.href = './index.html';
        }
      });
    });
  })();

  // load lottie if present
  (function tryLoadLottie() {
    if (!window.lottie || !animWrap) return;
    const path = 'assets/lottie/hero.json';
    fetch(path, { method: 'HEAD' }).then(res => {
      if (res.ok) {
        try {
          lottie.loadAnimation({
            container: animWrap,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: path
          });
          if (fallback) fallback.style.display = 'none';
        } catch (err) {
          console.warn('Lottie load error', err);
        }
      } else {
        // fallback remains visible
      }
    }).catch(()=>{});
  })();

  // counters & FAQ
  (function initCountersAndFAQ(){
    const stats = document.querySelectorAll('.stat');
    stats.forEach(s => {
      const target = parseInt(s.getAttribute('data-count') || 0, 10);
      const el = s.querySelector('.num');
      if(!el) return;
      let cur = 0;
      const step = Math.max(1, Math.round(target / 80));
      const id = setInterval(()=> {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(id); }
        el.textContent = cur;
      }, 14);
    });

    // FAQ accordion
    document.querySelectorAll('.qa .q').forEach(btn=>{
      btn.addEventListener('click', ()=> {
        const ans = btn.nextElementSibling;
        if(!ans) return;
        const open = ans.style.display === 'block';
        document.querySelectorAll('.qa .a').forEach(a=>a.style.display = 'none');
        ans.style.display = open ? 'none' : 'block';
      });
    });
  })();

  // language toggle binding: updates label safely
  const langToggle = document.getElementById('langToggle');
  if (langToggle && typeof i18n !== 'undefined') {
    i18n.setLangBtn && i18n.setLangBtn(langToggle);
    langToggle.addEventListener('click', () => {
      i18n.toggle();
      i18n.setLangBtn && i18n.setLangBtn(langToggle);
    });
  }
});
