// app/js/main.js
// Handles: i18n init, lottie loading, parallax, transitions, cursor follower, and history-safe back
document.addEventListener('DOMContentLoaded', () => {
  
  // TG badge: demo pulse + set/unset unread count API
(function initTGBadge(){
  const badge = document.getElementById('tgBadge');
  const cntEl = document.getElementById('tgCount');
  if (!badge) return;
  // demo unread count (you can update window.TG.setCount from console)
  window.TG = window.TG || {};
  window.TG.setCount = (n) => {
    if(!cntEl) return;
    cntEl.textContent = n > 99 ? '99+' : String(n);
    cntEl.style.display = n > 0 ? 'inline-block' : 'none';
  };
  // start with 3 unread as demo
  window.TG.setCount(3);
  // subtle bounce on hover
  badge.addEventListener('mouseenter', ()=> badge.style.transform = 'translateY(-4px) scale(1.02)');
  badge.addEventListener('mouseleave', ()=> badge.style.transform = '');
})();

  // i18n must be loaded first (i18n.js)
  if (typeof i18n !== 'undefined') i18n.init();

  // set year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const card = document.getElementById('card');
  const animWrap = document.getElementById('lottie-hero');
  const fallback = document.getElementById('lottie-fallback');

  // Smooth app entry: add class and then ready
  document.body.classList.add('app-enter');
  window.requestAnimationFrame(() => {
    setTimeout(()=> {
      document.body.classList.remove('app-enter');
      document.body.classList.add('app-ready');
    }, 80);
  });

  // entrance
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

  // add cursor follower
  (function cursorFollower() {
    const follower = document.getElementById('cursor-follower');
    if (!follower) return;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let raf = null;

    document.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      follower.style.opacity = 1;
      follower.style.transform = `translate(${lastX}px, ${lastY}px) scale(1)`;
    });

    document.addEventListener('mouseleave', () => {
      follower.style.opacity = 0;
    });

    // enlarge follower over interactive elements
    const interactive = document.querySelectorAll('a, button, .btn, .animWrap');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.transform += ' scale(1.6)';
        follower.style.transition = 'transform .12s ease, opacity .12s ease';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.transform = `translate(${lastX}px, ${lastY}px) scale(1)`;
      });
    });
  })();

  // light cursor parallax for depth on card
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

  // history-safe back links (page2)
  // if there is a .back-fallback link we will intercept it in the page html (see page2.html)
  (function safeBackLinks(){
    document.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (history.length > 1) {
          history.back();
          // fallback if not navigated within 400ms
          setTimeout(() => {
            if (location.pathname.endsWith('/page2.html') || location.pathname.endsWith('/page2.html/')) {
              location.href = './index.html';
            }
          }, 400);
        } else {
          // no history: go to app index
          location.href = './index.html';
        }
      });
    });
  })();

  // try load lottie
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

  // language toggle binding (button id langToggle)
  const langToggle = document.getElementById('langToggle');
  if (langToggle && typeof i18n !== 'undefined') {
    langToggle.textContent = i18n.getCurrent() === 'en' ? 'AR' : 'EN';
    langToggle.addEventListener('click', () => {
      i18n.toggle();
      langToggle.textContent = i18n.getCurrent() === 'en' ? 'AR' : 'EN';
    });
  }
});
