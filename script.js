// script.js
const banner = document.getElementById('banner');
const logo = document.getElementById('logo');
const perfil = document.getElementById('perfil');
const orden = document.getElementById('orden');
const trayectoria = document.getElementById('trayectoria');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

window.addEventListener('scroll', () => {
  // Banner static at 20%
  if (window.scrollY > banner.offsetHeight * 0.2) {
    banner.classList.add('static-bg');
  } else {
    banner.classList.remove('static-bg');
  }

  // Logo shrink
  if (window.scrollY > 50) {
    logo.classList.add('shrunk');
    logo.classList.remove('default');
  } else {
    logo.classList.add('default');
    logo.classList.remove('shrunk');
  }

  // Aparecer perfil y orden
  const trayTop = trayectoria.getBoundingClientRect().top;
  const winHeight = window.innerHeight;
  if (trayTop < winHeight && trayTop > 0) {
    perfil.style.opacity = '1';
    orden.style.opacity = '1';
  } else {
    perfil.style.opacity = '0';
    orden.style.opacity = '0';
  }
});

logo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(c => c.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});
