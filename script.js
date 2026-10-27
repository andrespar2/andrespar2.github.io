/**
 * ParFlix — sitio oficial.
 *
 * JavaScript mínimo y sin dependencias:
 *  - Cabecera con estado al desplazar.
 *  - Animaciones de entrada respetando "prefers-reduced-motion".
 *  - Actualización opcional de la versión desde la API pública de GitHub.
 *  - Comprobación visual de los espacios publicitarios (sin recargas).
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------------------------------------------------------------
     Cabecera
     --------------------------------------------------------------------- */

  const header = document.querySelector("[data-header]");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------------------------------------------------------------------
     Animaciones de entrada
     --------------------------------------------------------------------- */

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    let ticking = false;

    const revealVisible = () => {
      ticking = false;
      const limit = window.innerHeight * 0.96;
      revealItems.forEach((item) => {
        if (item.classList.contains("is-visible")) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > 0) {
          item.classList.add("is-visible");
        }
      });
    };

    const requestReveal = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(revealVisible);
    };

    revealVisible();
    window.addEventListener("scroll", requestReveal, { passive: true });
    window.addEventListener("resize", requestReveal, { passive: true });

    // Red de seguridad para navegadores que restauran el scroll sin emitir
    // eventos: revela lo que ya esté dentro de la ventana.
    window.setTimeout(revealVisible, 1200);
  }

  /* ---------------------------------------------------------------------
     Última release (mejora progresiva)
     --------------------------------------------------------------------- */

  const RELEASE_API = "https://api.github.com/repos/andrespar2/ParFlix/releases/latest";
  const fallbackDate = "27 de octubre de 2026";

  function formatDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat("es", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  function applyRelease(release) {
    if (!release || !release.tag_name) return;

    const versionNodes = document.querySelectorAll("[data-release-version]");
    versionNodes.forEach((node) => {
      node.textContent = release.tag_name;
    });

    const dateNodes = document.querySelectorAll("[data-release-date]");
    const dateText = formatDate(release.published_at) || fallbackDate;
    dateNodes.forEach((node) => {
      node.textContent = dateText;
      node.setAttribute("datetime", (release.published_at || "").slice(0, 10));
    });

    const releaseUrl = release.html_url || "https://github.com/andrespar2/ParFlix/releases/latest";
    document.querySelectorAll("[data-release-link]").forEach((link) => {
      link.href = releaseUrl;
    });

    const apk = Array.isArray(release.assets)
      ? release.assets.find((asset) => /\.apk$/i.test(asset.name || ""))
      : null;

    if (apk && apk.browser_download_url) {
      document.querySelectorAll("[data-download]").forEach((link) => {
        link.href = apk.browser_download_url;
      });
    }
  }

  if ("fetch" in window && navigator.onLine) {
    fetch(RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then(applyRelease)
      .catch(() => {
        /* Se conserva la versión publicada estáticamente. */
      });
  }

  /* ---------------------------------------------------------------------
     Espacios publicitarios
     ---------------------------------------------------------------------
     No se recargan scripts ni se reintenta la carga. Solo se añade una clase
     cuando el proveedor ya insertó contenido, para ajustar el contenedor.
     --------------------------------------------------------------------- */

  const adSlots = document.querySelectorAll(".ad-slot, .ad-native");

  function markFilled(slot) {
    const body = slot.querySelector(".ad-slot__body, .ad-native__body");
    if (!body) return;
    const filled = Boolean(body.querySelector("iframe, img, ins, a, video, canvas"));
    if (filled) slot.classList.add("is-filled");
  }

  adSlots.forEach((slot) => {
    // El script del proveedor puede insertar contenido antes o después de
    // este código. Se comprueba en momentos acotados; no se recarga nada ni
    // se generan solicitudes adicionales al proveedor.
    [0, 1800, 4500].forEach((delay) => {
      window.setTimeout(() => markFilled(slot), delay);
    });
  });
})();
