/*
=====================================================
/// AQUÍ COLOCAS SOLO LOS DATOS DE TUS ADDONS
=====================================================
Copia un objeto para añadir otro. Separa objetos con coma.

Campos:
id, title, description, cover_image, version, download_link,
tags, stickers (opcional), last_updated (AAAA-MM-DD), file_size.
La imagen debe estar en la carpeta img/.

CÓDIGOS AUTOMÁTICOS EN title:
$minecraft, $nuevo, $popular, $destacado, $actualizado, $gratis,
$premium, $texturas, $addon y $mapa.
Puedes combinar varios códigos. Se mostrarán como stickers con imágenes y se quitarán
del título visible. Guarda cada imagen en img/stickers/ con el nombre indicado en script.js.
Para una imagen propia escribe: $stickerimg[mi-sticker.png] en title y guarda el archivo
en img/stickers/mi-sticker.png. La propiedad stickers sigue funcionando normalmente.
*/

const addonsData = [
  {
    id: 1,
    title: "$nuevo StickMenuV1",
    description: "Usa un palo para abrir un menú: modos de juego, tiempo, clima, efectos, utilidades y más. Sin desactivar logros. Creditos : Edward Gamer",
    cover_image: "./img/StickMenuV1.png",
    version: "1.26.60.4",
    download_link: "https://www.mediafire.com/file/1947m3r2uui5rqp/StickMenu_v1.1.mcpack/file",
    tags: ["Addon", "Ilegal 😱", "Sin Desatvar Logros"],
    stickers: ["⭐ Destacado", "👑 Nuevo"],
    last_updated: "2026-10-28",
    file_size: "50.52 K"
}

  /*
  /// EJEMPLO PARA AÑADIR OTRO OBJETO:
  ,
  {
    id: 2,
    title: "$nuevo $gratis Nombre de tu addon",
    description: "Escribe aquí la descripción.",
    cover_image: "./img/mi-portada.jpg",
    version: "1.21.XX",
    download_link: "https://enlace-real-de-descarga.com/archivo",
    tags: ["Addon", "Herramientas"],
    stickers: ["⭐ Destacado"],
    last_updated: "2026-10-25",
    file_size: "5 MB"
  }
  */
];
