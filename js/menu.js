// =====================================================
// /// MENÚ LATERAL (sirve en todas las páginas)
// =====================================================
(() => {
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("menuButton");
  const closeButton = document.getElementById("menuClose");
  const backdrop = document.getElementById("menuBackdrop");
  if (!menu || !menuButton) return;

  function openMenu() {
    menu.classList.add("open");
    backdrop.hidden = false;
    document.body.classList.add("menu-abierto");
    menuButton.setAttribute("aria-expanded", "true");
    closeButton.focus();
  }

  function closeMenu(returnFocus = true) {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    backdrop.hidden = true;
    document.body.classList.remove("menu-abierto");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }

  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", () => closeMenu());
  backdrop.addEventListener("click", () => closeMenu());
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu(false)));

  // /// MARCAR LA SECCIÓN EN LA QUE ESTÁS
  const items = [...menu.querySelectorAll(".menu-item")];
  function setCurrent(section) {
    items.forEach(item => {
      if (item.dataset.section === section) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
  }

  if (document.body.dataset.page === "licencia") {
    setCurrent("licencia");
  } else {
    const sections = ["inicio", "catalogo", "como-agregar"]
      .map(id => document.getElementById(id))
      .filter(Boolean);
    setCurrent("inicio");
    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) setCurrent(entry.target.id); });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(section => observer.observe(section));
    }
  }

  // /// AÑO AUTOMÁTICO DEL PIE DE PÁGINA
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
