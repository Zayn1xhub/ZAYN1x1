document.addEventListener('DOMContentLoaded', () => {
  if (typeof i18n !== 'undefined') i18n.init();

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 1. Entrance Animation
  const card = document.getElementById('card');
  if (card) {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    setTimeout(()=> {
      card.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 100);
  }

  // 2. ORIGINAL PROFIT CALCULATOR LOGIC (Reverted)
  const slider = document.getElementById('ftdRange');
  const ftdDisplay = document.getElementById('ftdValue');
  const earningsDisplay = document.getElementById('earningsValue');
  
  if (slider && ftdDisplay && earningsDisplay) {
    const avgPlayerValue = 45; // $45 average value
    const revShare = 0.35; // 35%
    
    function updateCalc() {
      const ftds = parseInt(slider.value);
      ftdDisplay.textContent = ftds + ' FTDs';
      
      // Update aria-valuenow for accessibility
      slider.setAttribute('aria-valuenow', ftds);
      
      // Formula: FTDs * AvgValue * RevShare (Simple projection)
      const total = Math.round(ftds * avgPlayerValue * revShare);
      
      // Format currency
      earningsDisplay.textContent = '$' + total.toLocaleString();
      
      // Visual fill for slider
      const percentage = (ftds / slider.max) * 100;
      slider.style.background = `linear-gradient(90deg, #2b65ff ${percentage}%, #334155 ${percentage}%)`;
    }
    
    slider.addEventListener('input', updateCalc);
    updateCalc(); // init
  }

  // 3. LIVE TICKER POPULATION (with i18n support) - Added Click Interactivity
  const ticker = document.querySelector('.ticker-content');
  if(ticker) {
    const names = ['Ahmed S.', 'CryptoKing', 'BetPro_22', 'Sarah_Aff', 'WinTeam', 'Ali_M'];
    const actions = [
      { type: 'payout', amt: 1200 },
      { type: 'payout', amt: 4500 },
      { type: 'payout', amt: 320 },
      { type: 'joined', amt: 0 },
      { type: 'payout', amt: 8900 }
    ];
    
    function populateTicker() {
      let html = '';
      const currentLang = window.i18n ? window.i18n.getCurrent() : 'en';
      
      // Create enough items to scroll
      for(let i=0; i<12; i++) {
        const n = names[Math.floor(Math.random() * names.length)];
        const a = actions[Math.floor(Math.random() * actions.length)];
        const isPayout = a.type === 'payout';
        
        const actionText = isPayout ? 
          `<span style="color:#4ade80">${currentLang === 'ar' ? 'تم تحويل دفعة' : 'received'} $${a.amt} (USDT)</span>` : 
          `<span style="color:#fff">${currentLang === 'ar' ? 'انضم للفريق' : 'joined the team'}</span>`;
        
        html += `<div class="ticker-item" onclick="showTickerPopup('${n}', '${a.type}', ${a.amt})"><strong>${n}</strong> ${actionText}</div>`;
      }
      ticker.innerHTML = html;
    }
    
    populateTicker();
    
    // Repopulate ticker when language changes
    if (window.i18n) {
      const langToggle = document.getElementById('langToggle');
      if (langToggle) {
        langToggle.addEventListener('click', () => {
          setTimeout(populateTicker, 100); // Small delay to let i18n update
        });
      }
    }
  }

  // New: Ticker Popup Function
  window.showTickerPopup = function(name, type, amt) {
    const message = type === 'payout' ? `${name} just received $${amt} USDT! Ready to join?` : `${name} joined the team! You next?`;
    alert(message + ' Click OK to message me on Telegram.');
    // TODO: Replace alert with modal or direct Telegram link: window.open('https://t.me/ZAYN1x');
  };

  // 4. Modal Logic (Multi-Step)
  const modal = document.getElementById('onboardingModal');
  if (modal) {
    const seen = localStorage.getItem('zayn_modal_seen');
    if(!seen) {
      setTimeout(() => modal.classList.add('active'), 15000); // 15s delay
    }
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        localStorage.setItem('zayn_modal_seen', 'true');
      });
    }
    
    const form = document.getElementById('onboardingForm');
    const message = document.getElementById('formMessage');
    window.nextStep = function(step) {
      if (step === 1) {
        const source = document.getElementById('trafficSource').value;
        if (source) {
          document.getElementById('step1').style.display = 'none';
          document.getElementById('step2').style.display = 'block';
        }
      }
    };
    
    form.addEventListener('submit', () => {
      const telegram = document.getElementById('telegramId').value;
      if (telegram) {
        message.style.display = 'block';
        // TODO: Send to backend (e.g., fetch('/lead', {method: 'POST', body: JSON.stringify({telegram})}))
        setTimeout(() => {
          modal.classList.remove('active');
          localStorage.setItem('zayn_modal_seen', 'true');
        }, 2000);
      }
    });
  }

  // 5. Counters - Added Hover Tooltips for Interactivity
  const stats = document.querySelectorAll('.stat');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target.querySelector('.num');
        const target = parseInt(entry.target.getAttribute('data-count'));
        let c = 0;
        const inc = Math.ceil(target / 50);
        const t = setInterval(()=>{
          c+=inc; if(c>=target){c=target; clearInterval(t);}
          el.textContent = c + (entry.target.getAttribute('data-suffix') || '');
        }, 30);
        observer.unobserve(entry.target);
      }
    });
  });
  stats.forEach(s => {
    observer.observe(s);
    // Hover tooltip
    s.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.background = '#334155';
      tooltip.style.padding = '8px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.color = '#fff';
      tooltip.textContent = 'Based on real partner data—join to see yours!';
      s.appendChild(tooltip);
    });
    s.addEventListener('mouseleave', () => {
      const tooltip = s.querySelector('div');
      if (tooltip) tooltip.remove();
    });
  });

  // New: Testimonial Toggle Function
  window.toggleTestimonial = function(card) {
    const short = card.querySelector('.short');
    const full = card.querySelector('.full');
    if (short.style.display === 'none') {
      short.style.display = 'block';
      full.style.display = 'none';
    } else {
      short.style.display = 'none';
      full.style.display = 'block';
    }
  };

  // 6. Language Toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle && window.i18n) {
    i18n.setLangBtn(langToggle);
    langToggle.addEventListener('click', () => {
      i18n.toggle();
      i18n.setLangBtn(langToggle);
    });
  }
});
