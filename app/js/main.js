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

  // 2. UPGRADED PROFIT CALCULATOR/QUIZ LOGIC
  const slider = document.getElementById('ftdRange');
  const ftdDisplay = document.getElementById('ftdValue');
  const earningsDisplay = document.getElementById('earningsValue');
  const quizResult = document.getElementById('quizResult');
  const gateForm = document.getElementById('gateForm');
  const quizStep1 = document.getElementById('quizStep1');
  const quizStep2 = document.getElementById('quizStep2');
  
  if (slider && ftdDisplay && earningsDisplay) {
    const avgPlayerValue = 45; // $45 average value
    const revShare = 0.35; // 35%
    
    window.nextQuizStep = function() {
      quizStep1.style.display = 'none';
      quizStep2.style.display = 'block';
    };
    
    window.calculateEarnings = function() {
      const ftds = parseInt(slider.value);
      ftdDisplay.textContent = ftds + ' FTDs';
      slider.setAttribute('aria-valuenow', ftds);
      const total = Math.round(ftds * avgPlayerValue * revShare);
      earningsDisplay.textContent = '$' + total.toLocaleString();
      
      // Personalized tip based on quiz
      const region = document.getElementById('audienceRegion').value;
      quizResult.textContent = region === 'mena' ? 'Personalized tip: For MENA traffic, expect +10% boost!' : 'Personalized tip: Global traffic scales fast!';
      quizResult.style.display = 'block';
      
      // Gate full details
      gateForm.style.display = 'block';
    };
    
    window.submitQuizLead = function() {
      const contact = document.getElementById('quizContact').value;
      if (contact) {
        alert(`Thanks! I'll use ${contact} to send your full report and handle signup.`);
        // TODO: Integrate real backend (e.g., fetch to Zapier webhook)
      }
    };
    
    slider.addEventListener('input', () => {
      const ftds = parseInt(slider.value);
      ftdDisplay.textContent = ftds + ' FTDs';
      const percentage = (ftds / slider.max) * 100;
      slider.style.background = `linear-gradient(90deg, #2b65ff ${percentage}%, #334155 ${percentage}%)`;
    });
    // Initial setup (no auto-calc until quiz complete)
  }

  // 3. LIVE TICKER POPULATION (with i18n support)
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
      
      for(let i=0; i<12; i++) {
        const n = names[Math.floor(Math.random() * names.length)];
        const a = actions[Math.floor(Math.random() * actions.length)];
        const isPayout = a.type === 'payout';
        
        const actionText = isPayout ? 
          `<span style="color:#4ade80">${currentLang === 'ar' ? 'تم تحويل دفعة' : 'received'} $${a.amt} (USDT)</span>` : 
          `<span style="color:#fff">${currentLang === 'ar' ? 'انضم للفريق' : 'joined the team'}</span>`;
        
        html += `<div class="ticker-item"><strong>${n}</strong> ${actionText}</div>`;
      }
      ticker.innerHTML = html;
    }
    
    populateTicker();
    
    if (window.i18n) {
      const langToggle = document.getElementById('langToggle');
      if (langToggle) {
        langToggle.addEventListener('click', () => {
          setTimeout(populateTicker, 100);
        });
      }
    }
  }

  // 4. Modal Logic (Now Multi-Step)
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

  // 5. Counters
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
  stats.forEach(s => observer.observe(s));

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
