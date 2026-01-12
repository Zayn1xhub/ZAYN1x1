// Lottie animation
lottie.loadAnimation({
  container: document.getElementById('lottie-hero'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/lottie/hero.json' // optional
});

// Entrance animation
const card = document.querySelector('.card');
card.style.opacity = 0;
card.style.transform = 'translateY(20px)';

window.addEventListener('load', () => {
  card.style.transition = '0.8s ease';
  card.style.opacity = 1;
  card.style.transform = 'translateY(0)';
});
