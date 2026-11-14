// =====================================================
// /// ICONOS PROPIOS (reemplazan a los emojis)
// Uso en HTML:  <svg class="icon"><use href="#i-download"></use></svg>
// Uso en JS:    icon("download")
// =====================================================
(() => {
  const paths = {
    home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v11h14V10"/><path d="M10 21v-7h4v7"/>',
    cube: '<path d="M12 2 21 7v10l-9 5-9-5V7z"/><path d="m3 7 9 5 9-5"/><path d="M12 12v10"/>',
    book: '<path d="M3 4h6l3 2 3-2h6v15h-6l-3 2-3-2H3z"/><path d="M12 6v15"/>',
    doc: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path d="M9 13h7M9 17h7"/>',
    play: '<path d="M7 4 20 12 7 20z" fill="currentColor"/>',
    chat: '<path d="M4 4h16v12h-9l-5 5v-5H4z"/>',
    download: '<path d="M12 3v12"/><path d="m6 10 6 6 6-6"/><path d="M4 21h16"/>',
    grid: '<path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/>',
    image: '<path d="M3 3h18v18H3z"/><path d="m3 16 6-6 5 5 3-3 4 4"/><circle cx="15.5" cy="8.5" r="1.5"/>',
    puzzle: '<path d="M4 8h5V6a2 2 0 0 1 4 0v2h5v5h2a2 2 0 0 1 0 4h-2v4H4z"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    film: '<path d="M3 4h18v16H3z"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    pickaxe: '<path d="M15 9 4 20"/><path d="M8 4c6-1 13 6 12 12"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    check: '<path d="m4 12 6 6L20 6"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6"/>',
    up: '<path d="M12 20V5"/><path d="m5 11 7-7 7 7"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5.5 5.5"/>',
    tag: '<path d="M3 3h9l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  const symbols = Object.entries(paths).map(([name, d]) =>
    `<symbol id="i-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">${d}</symbol>`).join("");
  document.body.insertAdjacentHTML("afterbegin",
    `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">${symbols}</svg>`);

  // Crea un icono desde JavaScript
  window.icon = name => {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS(ns, "use");
    use.setAttribute("href", `#i-${name}`);
    svg.appendChild(use);
    return svg;
  };
})();
