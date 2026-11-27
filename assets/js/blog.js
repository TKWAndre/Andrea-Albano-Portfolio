/* Andrea Albano · Blog: menu, filtri e barra di lettura. */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Menu su telefono */
  const burger = $("#burger"), nav = $("#nav");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* Filtri per categoria */
  const filters = $("#blogFilters");
  if (filters) {
    const cards = $$("#cards .card"), empty = $("#cardsEmpty");
    filters.addEventListener("click", e => {
      const b = e.target.closest("button[data-cat]"); if (!b) return;
      $$("button", filters).forEach(x => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", String(on)); });
      let shown = 0;
      cards.forEach(c => { const ok = b.dataset.cat === "all" || c.dataset.cat === b.dataset.cat; c.classList.toggle("is-hidden", !ok); shown += ok; });
      empty.hidden = shown > 0;
    });
  }

  /* Sopra la copertina il menu è trasparente; scorrendo diventa pieno */
  const topbar = $("#topbar");
  if (document.body.classList.contains("has-hero")) {
    const onScroll = () => topbar.classList.toggle("is-solid", scrollY > innerHeight * .55);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* Gallerie: ogni foto dice il suo formato, così le righe si compongono da sole */
  $$(".gallery__item img").forEach(img => {
    const set = () => { if (img.naturalWidth) img.parentElement.style.setProperty("--r", (img.naturalWidth / img.naturalHeight).toFixed(4)); };
    img.complete ? set() : img.addEventListener("load", set, { once: true });
  });

  /* Visore a schermo intero: tutte le foto del post, con frecce, tastiera e swipe */
  const lb = $("#lb");
  const shots = [];
  $$("[data-zoom] img, .gallery__item img, .prose p > img").forEach(img => {
    const fig = img.closest("figure");
    const cap = fig && !fig.classList.contains("gallery") ? $(".photo__cap", fig)?.textContent : "";
    const link = img.closest("a.gallery__item");
    shots.push({ src: link ? link.href : (img.currentSrc || img.src), alt: img.alt, cap: cap || "" });
    const i = shots.length - 1;
    const open = e => { e.preventDefault(); show(i); };
    (link || img).addEventListener("click", open);
    if (!link) {
      img.tabIndex = 0; img.setAttribute("role", "button");
      img.setAttribute("aria-label", (img.alt ? img.alt + ". " : "") + "Apri la foto a schermo intero");
      img.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") open(e); });
    }
  });
  let cur = 0, opener = null;
  const lbImg = $("#lbImg"), lbCap = $("#lbCap"), lbCount = $("#lbCount");
  function show(i) {
    if (!lb || !shots.length) return;
    cur = (i + shots.length) % shots.length;
    const s = shots[cur];
    lbImg.classList.add("is-loading");
    lbImg.onload = () => lbImg.classList.remove("is-loading");
    lbImg.src = s.src; lbImg.alt = s.alt;
    lbCap.textContent = s.cap;
    lbCount.textContent = `${cur + 1} / ${shots.length}`;
    lb.classList.toggle("is-single", shots.length < 2);
    if (!lb.open) { opener = document.activeElement; lb.showModal(); }
    if (shots.length > 1) new Image().src = shots[(cur + 1) % shots.length].src;
  }
  if (lb) {
    $("#lbClose").addEventListener("click", () => lb.close());
    $("#lbPrev").addEventListener("click", () => show(cur - 1));
    $("#lbNext").addEventListener("click", () => show(cur + 1));
    lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb__fig")) lb.close(); });
    lb.addEventListener("close", () => { lbImg.removeAttribute("src"); opener?.focus?.(); });
    lb.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") show(cur + 1);
      if (e.key === "ArrowLeft") show(cur - 1);
    });
    let x0 = null;
    lb.addEventListener("pointerdown", e => { x0 = e.clientX; });
    lb.addEventListener("pointerup", e => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50 && shots.length > 1) show(cur + (dx < 0 ? 1 : -1));
    });
  }

  /* Lettura come timeline: la barra sotto il menu avanza e il timecode conta i minuti */
  const scrub = $("#scrub"), tc = $("#readTc"), prose = $(".prose");
  if (scrub && prose) {
    const words = prose.textContent.trim().split(/\s+/).length;
    const total = Math.max(1, Math.floor(words / 200)) * 60;
    const pad = n => String(n).padStart(2, "0");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = prose.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
      scrub.parentElement.style.setProperty("--p", p.toFixed(4));
      const s = Math.round(p * total);
      if (tc) tc.textContent = `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
    };
    addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    addEventListener("resize", update); update();
  }
})();
