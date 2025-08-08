// --- Referencias ---
const logo = document.getElementById("logo");
const perfil = document.getElementById("perfil");
const orden = document.getElementById("orden");

// --- Evento de scroll ---
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // --- Logo se achica y se mueve ---
  if (scrollY > 100) {
    logo.classList.add("logo-scrolled");
  } else {
    logo.classList.remove("logo-scrolled");
  }

  // --- Mostrar imagen de perfil ---
  if (perfil) {
    const perfilTop = perfil.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (perfilTop < windowHeight * 0.8) {
      perfil.classList.add("fade-in");
    } else {
      perfil.classList.remove("fade-in");
    }
  }

  // --- Mostrar imagen de fondo orden ---
  if (orden) {
    const ordenTop = orden.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (ordenTop < windowHeight * 0.8) {
      orden.classList.add("fade-in");
    } else {
      orden.classList.remove("fade-in");
    }
  }
});

// --- Logo clicable para volver arriba ---
logo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
