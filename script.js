// script.js - control de logo + anclado de barra + gestión del banner visible
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('banner');
  let spacer = document.getElementById('banner-spacer');
  const nav = document.getElementById('banner-buttons');
  const logo = document.getElementById('logo');
  const perfil = document.getElementById('perfil');
  const orden = document.getElementById('orden');
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Quitar "active" de todos los botones
      buttons.forEach(btn => btn.classList.remove("active"));
      // Quitar "active" de todo el contenido
      contents.forEach(content => content.classList.remove("active"));

      // Activar el botón clickeado
      button.classList.add("active");
      // Mostrar el contenido correspondiente
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Quitar clase "active" de todo
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    // Activar el botón y el contenido correcto
    button.classList.add("active");
    const targetId = button.dataset.tab;
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});

  if (!banner || !nav || !logo) return;

  // crear spacer si no existe (evita saltos)
  if (!spacer) {
    spacer = document.createElement('div');
    spacer.id = 'banner-spacer';
    spacer.style.height = '0px';
    spacer.style.transition = 'height 280ms ease';
    banner.parentNode.insertBefore(spacer, banner.nextSibling);
  }

  let bannerHeight = banner.offsetHeight;
  let navHeight = nav.offsetHeight;
  let anchored = false;
  const margin = 8; // histéresis px

  // recalcula dimensiones (al resize)
  function recalc() {
    bannerHeight = banner.offsetHeight;
    navHeight = nav.offsetHeight;
  }
  window.addEventListener('resize', recalc);

  // helper: altura que ocupa el logo cuando está reducido
  function logoOffset() {
    if (logo.classList.contains('small')) {
      // altura visible del logo reducido
      return Math.round(logo.getBoundingClientRect().height) + 8;
    }
    return 0;
  }

  // calcula triggerY en coordenadas de documento, sólo válido cuando NAV está en flujo normal
  function computeTriggerY() {
    // posición del top de nav en coordenadas documento (antes de anclar)
    const navTopDoc = nav.getBoundingClientRect().top + window.scrollY;
    const topOffset = logoOffset();
    // queremos anclar cuando la parte superior del nav alcance 'topOffset'
    return navTopDoc - topOffset;
  }

  let savedTriggerY = null; // se guarda cuando no anclado, para usar con histéresis

  function anchorBannerAndNav(topOffset) {
    // reserva espacio completo para evitar salto
    spacer.style.height = bannerHeight + 'px';

    // fijar banner: sólo dejamos visible la franja igual a navHeight (la parte donde están botones)
    banner.classList.add('anchored');
    banner.style.position = 'fixed';
    banner.style.left = '0';
    // colocamos el banner de forma que sólo su franja inferior (navHeight) quede visible
    banner.style.top = `${topOffset - (bannerHeight - navHeight)}px`;
    banner.style.width = '100%';
    banner.style.zIndex = '9980';

    // fijar nav justo debajo del logo reducido (topOffset)
    nav.classList.add('fixed');
    nav.style.position = 'fixed';
    nav.style.top = `${topOffset}px`;
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.zIndex = '9990';

    anchored = true;
  }

  function unanchorBannerAndNav() {
    // quitar reservas y volver a comportamiento normal
    spacer.style.height = '0px';

    banner.classList.remove('anchored');
    banner.style.position = '';
    banner.style.left = '';
    banner.style.top = '';
    banner.style.width = '';
    banner.style.zIndex = '';

    nav.classList.remove('fixed');
    nav.style.position = '';
    nav.style.top = '';
    nav.style.left = '';
    nav.style.width = '';
    nav.style.zIndex = '';

    anchored = false;
    savedTriggerY = null;
  }

  // controla logo small + anclado, llamado en scroll
  function onScroll() {
    const scrollY = window.scrollY;

    // 1) Logo behavior (igual que ya tenías)
    if (scrollY > 80) logo.classList.add('small');
    else logo.classList.remove('small');

    // 2) Fade-in (perfil y orden)
    const winH = window.innerHeight;
    if (perfil) {
      const pt = perfil.getBoundingClientRect().top;
      if (pt < winH * 0.8) perfil.classList.add('fade-in');
      else perfil.classList.remove('fade-in');
    }
    if (orden) {
      const ot = orden.getBoundingClientRect().top;
      if (ot < winH * 0.8) orden.classList.add('fade-in');
      else orden.classList.remove('fade-in');
    }

    // 3) Anchoring logic
    // Si no estamos anclados, calculamos triggerY dinámicamente (toma en cuenta logo small actual)
    if (!anchored) {
      // recalc dimensiones por si algo cambió (logo width etc.)
      recalc();
      const triggerY = computeTriggerY();
      savedTriggerY = triggerY;

      if (scrollY >= triggerY + margin) {
        // anclar
        const topOffset = logoOffset();
        anchorBannerAndNav(topOffset);
      }
    } else {
      // si ya estamos anclados, usamos savedTriggerY para decidir soltarnos
      if (savedTriggerY == null) {
        // por seguridad recomputar
        savedTriggerY = computeTriggerY();
      }
      if (scrollY < savedTriggerY - margin) {
        unanchorBannerAndNav();
      } else {
        // además actualizamos posición del nav si el logo cambió (p. ej. pequeño) 
        const topOffset = logoOffset();
        nav.style.top = `${topOffset}px`;
        // y mantenemos el banner alineado a esa topOffset
        banner.style.top = `${topOffset - (bannerHeight - navHeight)}px`;
      }
    }
  }

  // bind
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', () => { recalc(); onScroll(); });

  // init
  recalc();
  onScroll();

  // botones: scroll suave (si usan data-target)
  document.querySelectorAll('#banner-buttons button[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.target;
      const el = document.getElementById(id);
      if (!el) return;
      // altura visible del nav (cuando esté fijo)
      const topOffset = logo.classList.contains('small') ? logo.getBoundingClientRect().height + 8 : 0;
      const navH = nav.offsetHeight;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - topOffset - navH - 8;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})
})