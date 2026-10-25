
// =====================================================
// /// CATÁLOGO: DATOS DESDE js/addons-data.js
// =====================================================
const grid = document.getElementById("addonsGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = [...document.querySelectorAll(".filter")];
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");
const resetButton = document.getElementById("resetButton");
let activeFilter = "todos";

// /// FORMATEAR FECHA
function formatDate(value) {
  if (!value) return "Fecha no indicada";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-CO", {day:"numeric", month:"short", year:"numeric"}).format(date);
}

// /// CÓDIGOS DEL TÍTULO QUE SE CONVIERTEN EN STICKERS CON IMÁGENES
// Coloca tus PNG/WebP en img/stickers/ y cambia las rutas de este mapa.
const titleStickerTypes = {
  "$minecraft": { label: "MINECRAFT", image: "./img/stickers/minecraft.png" },
  "$nuevo": { label: "NUEVO", image: "./img/stickers/nuevo.png" },
  "$popular": { label: "POPULAR", image: "./img/stickers/popular.png" },
  "$destacado": { label: "DESTACADO", image: "./img/stickers/destacado.png" },
  "$actualizado": { label: "ACTUALIZADO", image: "./img/stickers/actualizado.png" },
  "$gratis": { label: "GRATIS", image: "./img/stickers/gratis.png" },
  "$premium": { label: "PREMIUM", image: "./img/stickers/premium.png" },
  "$texturas": { label: "TEXTURAS", image: "./img/stickers/texturas.png" },
  "$addon": { label: "ADDON", image: "./img/stickers/addon.png" },
  "$mapa": { label: "MAPA", image: "./img/stickers/mapa.png" }
};

function getAddonTitle(addon) {
  let title = addon.title || "Addon sin título";
  for (const code of Object.keys(titleStickerTypes)) {
    title = title.replace(new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), " ");
  }
  title = title.replace(/\$sticker\[[^\]]+\]/gi, " ");
  title = title.replace(/\$stickerimg\[[^\]]+\]/gi, " ");
  return title.replace(/\s+/g, " ").trim() || "Addon sin título";
}

function getAddonStickers(addon) {
  const automatic = [];
  const rawTitle = addon.title || "";
  for (const [code, sticker] of Object.entries(titleStickerTypes)) {
    if (new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(rawTitle)) {
      automatic.push({ label: sticker.label, image: sticker.image });
    }
  }

  // Sticker de imagen personalizado: $stickerimg[mi-sticker.png]
  // Las imágenes personalizadas se buscan en ./img/stickers/.
  const customImagePattern = /\$stickerimg\[([^\]]+)\]/gi;
  let imageMatch;
  while ((imageMatch = customImagePattern.exec(rawTitle)) !== null) {
    const filename = imageMatch[1].trim();
    if (filename) automatic.push({ label: filename, image: filename.startsWith("./") ? filename : `./img/stickers/${filename}` });
  }

  // Sticker de texto personalizado anterior: $sticker[✨ MI TEXTO].
  const customStickerPattern = /\$sticker\[([^\]]+)\]/gi;
  let match;
  while ((match = customStickerPattern.exec(rawTitle)) !== null) {
    const customLabel = match[1].trim();
    if (customLabel) automatic.push({ label: customLabel, text: customLabel });
  }

  // Conserva stickers manuales de texto, sin modificar el formato existente.
  const manual = (Array.isArray(addon.stickers) ? addon.stickers : []).map(value => ({ label: value, text: value }));
  const unique = [];
  const seen = new Set();
  for (const sticker of [...automatic, ...manual]) {
    const key = `${sticker.label}|${sticker.image || ""}|${sticker.text || ""}`;
    if (!seen.has(key)) { seen.add(key); unique.push(sticker); }
  }
  return unique;
}

// /// CREAR CADA TARJETA SIN INSERTAR HTML INSEGURO
function createAddonCard(addon) {
  const card = document.createElement("article");
  card.className = "card";

  const image = document.createElement("img");
  image.className = "cover";
  image.alt = `Portada de ${addon.title || "addon"}`;
  image.loading = "lazy";
  image.src = addon.cover_image || "";
  image.addEventListener("error", () => {
    const fallback = document.createElement("div");
    fallback.className = "cover-fallback";
    fallback.textContent = "🧱";
    image.replaceWith(fallback);
  }, {once:true});
  card.appendChild(image);

  // /// MOSTRAR STICKERS MANUALES Y LOS GENERADOS DESDE EL TÍTULO
  const addonStickers = getAddonStickers(addon);
  if (addonStickers.length) {
    const stickerBox = document.createElement("div");
    stickerBox.className = "stickers";
    addonStickers.forEach(value => {
      const sticker = document.createElement(value.image ? "span" : "span");
      sticker.className = value.image ? "sticker sticker-image" : "sticker";
      sticker.dataset.sticker = value.label;
      if (value.image) {
        const stickerImage = document.createElement("img");
        stickerImage.src = value.image;
        stickerImage.alt = value.label;
        stickerImage.loading = "lazy";
        stickerImage.className = "sticker-img";
        stickerImage.addEventListener("error", () => {
          sticker.classList.remove("sticker-image");
          sticker.textContent = value.text || value.label;
        }, { once: true });
        sticker.appendChild(stickerImage);
      } else {
        sticker.textContent = value.text || value.label;
      }
      stickerBox.appendChild(sticker);
    });
    card.appendChild(stickerBox);
  }

  const content = document.createElement("div");
  content.className = "content";

  const pill = document.createElement("span");
  pill.className = "pill";
  pill.textContent = (addon.tags && addon.tags[0]) ? addon.tags[0].toUpperCase() : "ADDON";
  content.appendChild(pill);

  const title = document.createElement("h3");
  title.textContent = getAddonTitle(addon);
  content.appendChild(title);

  const description = document.createElement("p");
  description.textContent = addon.description || "Sin descripción.";
  content.appendChild(description);

  if (Array.isArray(addon.tags) && addon.tags.length) {
    const tags = document.createElement("div");
    tags.className = "tags";
    addon.tags.forEach(value => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = value;
      tags.appendChild(tag);
    });
    content.appendChild(tags);
  }

  const meta = document.createElement("div");
  meta.className = "meta";
  const version = document.createElement("span");
  version.textContent = `Versión ${addon.version || "No indicada"}`;
  const size = document.createElement("span");
  size.textContent = addon.file_size || "Tamaño no indicado";
  meta.append(version, size);
  content.appendChild(meta);

  const date = document.createElement("div");
  date.className = "meta";
  date.textContent = `Actualizado: ${formatDate(addon.last_updated)}`;
  content.appendChild(date);

  const button = document.createElement("a");
  button.className = "btn";
  button.textContent = "⬇ Descargar";
  if (addon.download_link && addon.download_link !== "#") {
    button.href = addon.download_link;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  } else {
    button.href = "#";
    button.classList.add("disabled");
    button.setAttribute("aria-disabled", "true");
    button.title = "Añade el enlace en js/addons-data.js";
  }
  content.appendChild(button);
  card.appendChild(content);
  card.dataset.search = [
    addon.title, addon.description, ...(addon.tags || []), addon.version, addon.file_size
  ].join(" ").toLocaleLowerCase("es");
  card.dataset.tags = (addon.tags || []).join("|").toLocaleLowerCase("es");
  return card;
}

// /// ORDENAR POR FECHA O NOMBRE
function sortAddons(list) {
  const sorted = [...list];
  if (sortSelect.value === "oldest") {
    sorted.sort((a,b) => (a.last_updated || "").localeCompare(b.last_updated || ""));
  } else if (sortSelect.value === "az") {
    sorted.sort((a,b) => (a.title || "").localeCompare(b.title || "", "es", {sensitivity:"base"}));
  } else if (sortSelect.value === "za") {
    sorted.sort((a,b) => (b.title || "").localeCompare(a.title || "", "es", {sensitivity:"base"}));
  } else {
    sorted.sort((a,b) => (b.last_updated || "").localeCompare(a.last_updated || ""));
  }
  return sorted;
}

// /// BUSCADOR Y FILTROS
function renderAddons() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  let list = addonsData.filter(addon => {
    const searchable = [
      addon.title, addon.description, ...(Array.isArray(addon.tags) ? addon.tags : []),
      addon.version, addon.file_size
    ].join(" ").toLocaleLowerCase("es");
    const matchesQuery = searchable.includes(query);
    const tags = Array.isArray(addon.tags) ? addon.tags : [];
    const matchesFilter = activeFilter === "todos" ||
      tags.some(tag => tag.toLocaleLowerCase("es") === activeFilter.toLocaleLowerCase("es"));
    return matchesQuery && matchesFilter;
  });

  list = sortAddons(list);
  grid.replaceChildren();
  list.forEach(addon => grid.appendChild(createAddonCard(addon)));
  resultCount.textContent = `${list.length} ${list.length === 1 ? "publicación" : "publicaciones"}`;
  emptyMessage.hidden = list.length > 0;
}

searchInput.addEventListener("input", renderAddons);
sortSelect.addEventListener("change", renderAddons);
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  activeFilter = button.dataset.filter;
  renderAddons();
}));

// /// BOTÓN PARA RESTABLECER LOS FILTROS
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  activeFilter = "todos";
  sortSelect.value = "newest";
  filterButtons.forEach(item => item.classList.toggle("active", item.dataset.filter === "todos"));
  renderAddons();
});

// /// MENÚ DESPLEGABLE
const menu = document.getElementById("menu");
const menuButton = document.getElementById("menuButton");
menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", event => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});
menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

// /// AÑO AUTOMÁTICO Y ARRANQUE
document.getElementById("year").textContent = new Date().getFullYear();
renderAddons();
