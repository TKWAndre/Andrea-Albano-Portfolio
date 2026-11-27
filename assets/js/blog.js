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
