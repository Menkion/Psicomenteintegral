// script.js
const banner = document.getElementById('banner');
const logo = document.getElementById('logo');
const perfil = document.getElementById('perfil');
const orden = document.getElementById('orden');
const trayectoria = document.getElementById('trayectoria');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

window.addEventListener('scroll', () => {
  // Sticky banner
  if (window.scrollY > banner.offsetHeight * 0.8) {
    banner.classList.add('sticky');
  } else {
    banner.classList.remove('sticky');
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
  if (window.location.pathname.endsWith('/Psicomenteintegral/') || window.location.pathname.endsWith('/Psicomenteintegral/index.html')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.location.href = window.location.origin + '/Psicomenteintegral/';
  }
});

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(c => c.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});
