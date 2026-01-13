// app/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const card = document.getElementById('card');
  const animWrap = document.getElementById('lottie-hero');
  const fallback = document.getElementById('lottie-fallback');

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
});
