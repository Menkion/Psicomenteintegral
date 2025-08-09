document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner");
  const spacer = document.getElementById("banner-spacer");
  const logo = document.getElementById("logo");
  const perfil = document.getElementById("perfil");
  const orden = document.getElementById("orden");
  const trayectoria = document.getElementById("trayectoria");

  if (!banner || !spacer) return; // seguridad

  // valores iniciales
  let bannerHeight = banner.offsetHeight;
  let visibleHeight = Math.round(bannerHeight * 0.2); // 20%

  // recalcular en resize
  function recalcHeights() {
    bannerHeight = banner.offsetHeight;
    visibleHeight = Math.round(bannerHeight * 0.2);
  }
  window.addEventListener("resize", recalcHeights);

  // handler unificado
  function onScroll() {
    const scrollY = window.scrollY;
    const trigger = bannerHeight - visibleHeight; // cuando queda sólo el 20% visible

    // --- Logo pequeño ---
    if (scrollY > 50) {
      logo.classList.add("small");
    } else {
      logo.classList.remove("small");
    }

    // --- Perfil y orden: fade-in cuando estén cerca del viewport ---
    const winH = window.innerHeight;
    if (perfil) {
      const pTop = perfil.getBoundingClientRect().top;
      if (pTop < winH * 0.8) perfil.classList.add("fade-in");
      else perfil.classList.remove("fade-in");
    }
    if (orden) {
      const oTop = orden.getBoundingClientRect().top;
      if (oTop < winH * 0.8) orden.classList.add("fade-in");
      else orden.classList.remove("fade-in");
    }

    // --- Docking del banner ---
    if (scrollY >= trigger) {
      if (!banner.classList.contains("docked")) {
        // fijar banner en la posición donde sólo queda visibleHeight
        banner.classList.add("docked");
        // posición para que solo quede la porción visible en la parte superior:
        banner.style.top = `-${bannerHeight - visibleHeight}px`;
        // este spacer desplaza el contenido suavemente hacia abajo (evita salto)
        spacer.style.height = `${visibleHeight}px`;
      }
    } else {
      if (banner.classList.contains("docked")) {
        banner.classList.remove("docked");
        banner.style.top = "";
        spacer.style.height = `0px`;
      }
    }
  }

  // bind
  window.addEventListener("scroll", onScroll);

  // ejecutar una vez al inicio por si ya estamos scrolleados
  recalcHeights();
  onScroll();

  // Logo clicable vuelve arriba
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
