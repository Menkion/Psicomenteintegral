const banner = document.getElementById("static-banner");
const logo = document.getElementById("logo");
const perfil = document.getElementById('perfil');
const orden = document.getElementById('orden');
const trayectoria = document.getElementById('trayectoria');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// LÓGICA SCROLL
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const bannerHeight = banner.offsetHeight;

  // Banner scroll
  if (scrollY >= bannerHeight * 0.2) {
    document.body.classList.add("scrolled-banner");
  } else {
    document.body.classList.remove("scrolled-banner");
  }

  // Logo shrink
  if (scrollY > 50) {
    document.body.classList.add("scrolled-logo");
  } else {
    document.body.classList.remove("scrolled-logo");
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

// Ir arriba al hacer clic en el logo
logo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Tabs
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(c => c.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});
