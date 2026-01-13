document.addEventListener('DOMContentLoaded', () => {
  // 1. i18n init
  if (typeof i18n !== 'undefined') i18n.init();

  // 2. Dynamic Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 3. Card Animations & Fallback
  const card = document.getElementById('card');
  const animWrap = document.getElementById('lottie-hero');
  const fallback = document.getElementById('lottie-fallback');

  if (card) {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    window.requestAnimationFrame(()=> {
      setTimeout(()=> {
        card.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // 4. TG Badge Logic (Modified: No forced "3" count)
  (function initTGBadge(){
    const badge = document.getElementById('tgBadge');
    const cntEl = document.getElementById('tgCount');
    if (!badge) return;
    
    // Helper to set count (if needed in future)
    window.TG = window.TG || {};
    window.TG.setCount = (n) => {
      if(!cntEl) return;
      cntEl.textContent = n > 99 ? '99+' : String(n);
      cntEl.style.display = n > 0 ? 'inline-block' : 'none';
    };

    // Initialize as 0/Hidden (User request: remove demo unread)
    window.TG.setCount(0);
  })();

  // 5. REMOVED Cursor Follower Logic (User request: keep mouse normal)

  // 6. Parallax Effect (Keep only on Desktop for performance)
  (function addParallax() {
    if (!card || window.innerWidth < 900) return;
    const maxTilt = 8;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -maxTilt; // Rotate X axis
      const rotateY = ((x - centerX) / centerX) * maxTilt;  // Rotate Y axis

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  })();

  // 7. Lottie Loader
  (function tryLoadLottie() {
    if (!window.lottie || !animWrap) return;
    const path = 'assets/lottie/hero.json';
    // Simple check if file exists (optional, can just try load)
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
  })();

  // 8. Onboarding Modal Logic (New)
  (function initModal() {
    const modal = document.getElementById('onboardingModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    const form = modal.querySelector('form');
    
    // Check if seen before
    const hasSeen = localStorage.getItem('zayn1x_modal_seen');
    
    if (!hasSeen) {
      setTimeout(() => {
        modal.classList.add('active');
      }, 5000); // 5 seconds delay
    }

    function closeModal() {
      modal.classList.remove('active');
      localStorage.setItem('zayn1x_modal_seen', 'true');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Handle dummy form submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Welcome to the inner circle!');
        closeModal();
      });
    }
  })();

  // 9. Counters & FAQ
  (function initCountersAndFAQ(){
    const stats = document.querySelectorAll('.stat');
    stats.forEach(s => {
      const target = parseInt(s.getAttribute('data-count') || 0, 10);
      const el = s.querySelector('.num');
      if(!el) return;
      // Intersection Observer to start counting when visible
      const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting){
          let cur = 0;
          const step = Math.ceil(target / 60);
          const id = setInterval(()=> {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(id); }
            el.textContent = cur;
          }, 20);
          observer.disconnect();
        }
      });
      observer.observe(s);
    });

    // FAQ Accordion
    document.querySelectorAll('.qa .q').forEach(btn=>{
      btn.addEventListener('click', ()=> {
        const ans = btn.nextElementSibling;
        const icon = btn.querySelector('.toggle-icon'); // if we add one later
        if(!ans) return;
        const isOpen = ans.style.display === 'block';
        
        // Close others
        document.querySelectorAll('.qa .a').forEach(a=>a.style.display = 'none');
        
        ans.style.display = isOpen ? 'none' : 'block';
      });
    });
  })();

  // 10. Language Toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle && typeof i18n !== 'undefined') {
    i18n.setLangBtn && i18n.setLangBtn(langToggle);
    langToggle.addEventListener('click', () => {
      i18n.toggle();
      i18n.setLangBtn && i18n.setLangBtn(langToggle);
    });
  }
});
