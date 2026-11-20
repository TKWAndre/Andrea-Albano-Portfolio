/* =========================================================
   Andrea Albano · Portfolio
   Tutta l'interattività del sito. Nessuna libreria esterna,
   a parte EmailJS per il modulo contatti.
   ========================================================= */
(() => {
  "use strict";

  const D = window.SITE_DATA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const isTyping = () => /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");

  /* ---------- Lingua ---------- */
  let lang = "it";
  try {
    const q = new URLSearchParams(location.search).get("lang");
    lang = q === "en" || q === "it" ? q : (localStorage.getItem("lang") || "it");
  } catch (_) {}

  const itDom = new Map();
  $$("[data-i18n]").forEach(el => itDom.set(el, el.textContent));
  $$("[data-i18n-html]").forEach(el => itDom.set(el, el.innerHTML));

  const t = (key) => lang === "en"
    ? (window.I18N_EN[key] ?? window.I18N_IT_JS[key] ?? key)
    : (window.I18N_IT_JS[key] ?? key);
  const tx = (obj) => (obj && typeof obj === "object") ? (obj[lang] ?? obj.it) : obj;

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => {
      el.textContent = lang === "en" ? (window.I18N_EN[el.dataset.i18n] ?? itDom.get(el)) : itDom.get(el);
    });
    $$("[data-i18n-html]").forEach(el => {
      el.innerHTML = lang === "en" ? (window.I18N_EN[el.dataset.i18nHtml] ?? itDom.get(el)) : itDom.get(el);
    });
    const btn = $("#lang");
    btn.textContent = lang === "en" ? "IT" : "EN";
    btn.setAttribute("aria-label", lang === "en" ? "Passa all'italiano" : "Switch to English");
    $("#copyState").textContent = t("contact.copy");
    renderFilters(); renderWorks(); renderTimelineLabels(); updateViewer(true); renderChain();
  }
  $("#lang").addEventListener("click", () => {
    lang = lang === "en" ? "it" : "en";
    try { localStorage.setItem("lang", lang); } catch (_) {}
    applyLang();
  });

  /* ---------- Barra superiore e menu ---------- */
  const topbar = $("#topbar");
  const onScroll = () => topbar.classList.toggle("is-solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const burger = $("#burger"), nav = $("#nav");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  const navLinks = $$(".nav a[href^='#']");
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  /* ---------- Timecode REC ---------- */
  const tc = $("#tc"), t0 = performance.now();
  const pad = n => String(n).padStart(2, "0");
  (function tick() {
    const ms = performance.now() - t0;
    const f = Math.floor(ms / 40) % 25, s = Math.floor(ms / 1000);
    tc.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
    requestAnimationFrame(tick);
  })();

  /* ---------- Ruolo che si scrive da solo ---------- */
  const typer = $("#typer");
  const words = ["Social Media Manager", "Video Editor", "Content Creator", "Live Setup Tech"];
  if (!reduced) {
    let wi = 0, ci = words[0].length, del = true;
    const step = () => {
      const w = words[wi];
      if (del) { ci--; if (ci <= 0) { del = false; wi = (wi + 1) % words.length; } }
      else { ci++; if (ci >= words[wi].length) { del = true; typer.textContent = words[wi]; return setTimeout(step, 2200); } }
      typer.textContent = (del ? w : words[wi]).slice(0, Math.max(0, ci)) || "​";
      setTimeout(step, del ? 38 : 70);
    };
    setTimeout(step, 2600);
  }

  /* ---------- Color grading prima/dopo ---------- */
  const LOOKS = {
    duotone: { name: "DUOTONE", filter: "grayscale(1) contrast(1.15) brightness(1.05)", tint: "#ff5a36", blend: "multiply" },
    noir: { name: "NOIR", filter: "grayscale(1) contrast(1.45) brightness(.92)", tint: "radial-gradient(circle at 55% 40%, transparent 30%, #000 95%)", blend: "normal" },
    teal: { name: "TEAL & ORANGE", filter: "saturate(1.35) contrast(1.12)", tint: "linear-gradient(160deg, #0a8a9e 0%, transparent 45%, #ff7a2e 100%)", blend: "soft-light" },
    tokyo: { name: "TOKYO NIGHT", filter: "saturate(1.4) contrast(1.15) brightness(.85) hue-rotate(-12deg)", tint: "linear-gradient(200deg, #ff2e88 0%, #3a1c8f 55%, #00d1ff 100%)", blend: "color" }
  };
  const gStage = $("#gradeStage"), gHandle = $("#gradeHandle"), gAmount = $("#gradeAmount"), gHint = $("#gradeHint");
  let split = 50, gTouched = false;
  const setSplit = (v) => {
    split = clamp(v, 0, 100);
    gStage.style.setProperty("--split", split + "%");
    gHandle.setAttribute("aria-valuenow", Math.round(split));
  };
  const hideHint = () => { if (!gTouched) { gTouched = true; gHint.classList.add("is-gone"); } };
  const setLook = (key) => {
    const L = LOOKS[key];
    gStage.style.setProperty("--g-filter", L.filter);
    gStage.style.setProperty("--g-tint", L.tint);
    gStage.style.setProperty("--g-blend", L.blend);
    $("#gradeName").textContent = L.name;
    $$(".grade__looks button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.look === key)));
  };
  $$(".grade__looks button").forEach(b => b.addEventListener("click", () => { setLook(b.dataset.look); hideHint(); }));
  const setAmount = () => gStage.style.setProperty("--g-amount", gAmount.value / 100);
  gAmount.addEventListener("input", () => { setAmount(); hideHint(); });

  const splitFromEvent = (e) => {
    const r = gStage.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  };
  let gDrag = false;
  gHandle.addEventListener("pointerdown", e => { gDrag = true; gHandle.setPointerCapture(e.pointerId); gHandle.classList.add("is-drag"); hideHint(); });
  gHandle.addEventListener("pointermove", e => { if (gDrag) setSplit(splitFromEvent(e)); });
  const endG = () => { gDrag = false; gHandle.classList.remove("is-drag"); };
  gHandle.addEventListener("pointerup", endG);
  gHandle.addEventListener("pointercancel", endG);
  gStage.addEventListener("click", e => { if (e.target === gHandle || gHandle.contains(e.target)) return; setSplit(splitFromEvent(e)); hideHint(); });
  gHandle.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { setSplit(split - 5); hideHint(); e.preventDefault(); }
    if (e.key === "ArrowRight") { setSplit(split + 5); hideHint(); e.preventDefault(); }
  });
  setLook("duotone"); setAmount(); setSplit(50);

  // piccola dimostrazione automatica all'apertura
  if (!reduced) {
    const demo = [[0, 50], [700, 22], [1500, 78], [2200, 50]];
    const t1 = performance.now() + 900;
    const run = (now) => {
      if (gTouched) return;
      const el = now - t1;
      if (el < 0) return requestAnimationFrame(run);
      for (let i = 0; i < demo.length - 1; i++) {
        const [ta, va] = demo[i], [tb, vb] = demo[i + 1];
        if (el >= ta && el <= tb) {
          const p = (el - ta) / (tb - ta), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          setSplit(va + (vb - va) * e); return requestAnimationFrame(run);
        }
      }
      setSplit(50);
    };
    requestAnimationFrame(run);
  }

  /* ---------- Comparsa allo scroll e contatori ---------- */
  const countUp = (el) => {
    const target = +el.dataset.count, dur = 1100, s = performance.now();
    const f = (n) => { const p = clamp((n - s) / dur, 0, 1); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); };
    reduced ? (el.textContent = target) : requestAnimationFrame(f);
  };
  const rev = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      $$("[data-count]", en.target).forEach(countUp);
      rev.unobserve(en.target);
    });
  }, { threshold: .12 });
  $$(".reveal").forEach(el => rev.observe(el));

  /* ---------- Ruoli ---------- */
  const roles = $$(".role");
  const openRole = (i) => {
    roles.forEach((r, j) => {
      r.classList.toggle("is-open", i === j);
      $(".role__head", r).setAttribute("aria-expanded", String(i === j));
    });
    $("#roles").style.setProperty("--cols", roles.map((_, j) => j === i ? "2.2fr" : "1fr").join(" "));
  };
  roles.forEach((r, i) => {
    $(".role__head", r).addEventListener("click", () => openRole(i));
    if (finePointer) r.addEventListener("mouseenter", () => { if (matchMedia("(min-width: 1000px)").matches) openRole(i); });
  });
  openRole(0);
  $$("[data-filter-go]").forEach(b => b.addEventListener("click", () => {
    setFilter(b.dataset.filterGo);
    $("#lavori").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }));

  /* ---------- Lavori ---------- */
  let filter = "all";
  const filtersEl = $("#filters"), worksEl = $("#works");

  function renderFilters() {
    const used = [...new Set(D.works.flatMap(w => w.roles))];
    const order = Object.keys(D.roles).filter(k => used.includes(k));
    filtersEl.innerHTML = "";
    const mk = (key, label, n) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (filter === key ? " is-on" : "");
      b.dataset.filter = key; b.setAttribute("aria-pressed", String(filter === key));
      b.innerHTML = `${label}<sup>${n}</sup>`;
      b.addEventListener("click", () => setFilter(key));
      filtersEl.appendChild(b);
    };
    mk("all", lang === "en" ? window.I18N_EN["works.all"] : "Tutti", D.works.length);
    order.forEach(k => mk(k, tx(D.roles[k]), D.works.filter(w => w.roles.includes(k)).length));
  }

  function coverHTML(w) {
    const c = w.cover || {};
    if (c.type === "image") return `<img src="${c.src}" alt="" loading="lazy" width="1356" height="569">`;
    if (c.type === "brand") return `<div class="art art--brand"><b>${c.label}</b></div>`;
    if (c.type === "japan") return `<div class="art art--japan"><b>${c.label}</b><i></i></div>`;
    if (c.type === "live") return `<div class="art art--live"><b>${c.label}</b></div>`;
    if (c.type === "code") return `<div class="art art--code"><pre>&lt;section id="lavori"&gt;\n  render(works)\n&lt;/section&gt;</pre><b>${c.label}</b></div>`;
    return `<div class="art art--brand"><b>${tx(w.title)}</b></div>`;
  }

  function renderWorks() {
    worksEl.innerHTML = "";
    const list = D.works.filter(w => filter === "all" || w.roles.includes(filter));
    if (!list.length) { worksEl.innerHTML = `<p class="works__empty">${t("works.empty")}</p>`; return; }
    list.forEach((w, i) => {
      const card = document.createElement("button");
      card.type = "button"; card.className = "work";
      card.style.animation = reduced ? "" : `fadeUp .5s ${i * 60}ms var(--ease) both`;
      card.setAttribute("aria-label", `${tx(w.title)}: ${t("works.open")}`);
      card.innerHTML = `
        <div class="work__cover">
          ${w.status === "soon" ? `<span class="badge-soon">${t("works.soon")}</span>` : ""}
          <span class="work__open" aria-hidden="true">↗</span>
          ${coverHTML(w)}
        </div>
        <div class="work__meta">
          <span class="work__kicker">${tx(w.kicker)} · ${w.year}</span>
          <h3 class="work__title">${tx(w.title)}</h3>
          <div class="work__tags">${w.roles.map(r => `<span>${tx(D.roles[r])}</span>`).join("")}</div>
        </div>`;
      card.addEventListener("click", () => openWork(w));
      if (finePointer && !reduced) {
        card.addEventListener("pointermove", e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
          card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
        });
        card.addEventListener("pointerleave", () => { card.style.transform = ""; });
      }
      worksEl.appendChild(card);
    });
  }

  function setFilter(key) {
    filter = key;
    renderFilters(); renderWorks();
  }

  /* ---------- Finestra di dettaglio ---------- */
  const modal = $("#modal"), modalBody = $("#modalBody");
  const canDialog = typeof modal.showModal === "function";
  const openModal = (html) => {
    modalBody.innerHTML = html;
    if (canDialog) modal.showModal(); else modal.setAttribute("open", "");
    modal.scrollTop = 0;
  };
  const closeModal = () => { if (canDialog) modal.close(); else modal.removeAttribute("open"); };
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  function openWork(w) {
    let media;
    if (w.gallery) {
      media = `<div class="carousel" id="car">
        <div class="carousel__track">${w.gallery.map((src, i) => `<img src="${src}" alt="${tx(w.title)} ${i + 1}" draggable="false">`).join("")}</div>
        <button class="carousel__nav carousel__nav--prev" type="button" aria-label="Precedente">‹</button>
        <button class="carousel__nav carousel__nav--next" type="button" aria-label="Successiva">›</button>
        <div class="carousel__dots">${w.gallery.map((_, i) => `<button type="button" aria-label="${i + 1}"></button>`).join("")}</div>
        <span class="carousel__count"></span>
      </div>`;
    } else {
      media = `<div class="modal__media">${coverHTML(w)}</div>`;
    }
    const link = w.link
      ? `<a class="btn btn--accent" href="${w.link.href}" ${w.link.href.startsWith("#") ? "" : 'target="_blank" rel="noopener"'} data-close>${tx(w.link)} ↗</a>`
      : "";
    openModal(`${media}
      <div class="modal__content">
        <span class="work__kicker">${tx(w.kicker)} · ${w.year}${w.status === "soon" ? " · " + t("works.soon") : ""}</span>
        <h3 id="modalTitle">${tx(w.title)}</h3>
        <p>${tx(w.summary)}</p>
        <ul>${(tx(w.points) || []).map(p => `<li>${p}</li>`).join("")}</ul>
        ${link}
      </div>`);
    $$("[data-close]", modalBody).forEach(a => a.addEventListener("click", () => { if (a.getAttribute("href").startsWith("#")) closeModal(); }));
    if (w.gallery) carousel($("#car"));
  }

  function carousel(root) {
    const track = $(".carousel__track", root), dots = $$(".carousel__dots button", root), count = $(".carousel__count", root);
    const n = dots.length; let i = 0;
    const go = (k) => {
      i = (k + n) % n;
      track.style.transform = `translateX(${-i * 100}%)`;
      dots.forEach((d, j) => d.setAttribute("aria-current", String(j === i)));
      count.textContent = `${i + 1}/${n}`;
    };
    $(".carousel__nav--prev", root).addEventListener("click", () => go(i - 1));
    $(".carousel__nav--next", root).addEventListener("click", () => go(i + 1));
    dots.forEach((d, j) => d.addEventListener("click", () => go(j)));
    let sx = null, dx = 0;
    track.addEventListener("pointerdown", e => { sx = e.clientX; dx = 0; track.style.transition = "none"; track.setPointerCapture(e.pointerId); });
    track.addEventListener("pointermove", e => { if (sx === null) return; dx = e.clientX - sx; track.style.transform = `translateX(calc(${-i * 100}% + ${dx}px))`; });
    const end = () => { if (sx === null) return; track.style.transition = ""; sx = null; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); else go(i); };
    track.addEventListener("pointerup", end); track.addEventListener("pointercancel", end);
    root.tabIndex = 0;
    root.addEventListener("keydown", e => { if (e.key === "ArrowLeft") go(i - 1); if (e.key === "ArrowRight") go(i + 1); });
    go(0);
  }

  /* ---------- Timeline del percorso ---------- */
  const MIN = 2013, now = new Date();
  const NOW = now.getFullYear() + (now - new Date(now.getFullYear(), 0, 1)) / (365.25 * 864e5);
  const MAX = Math.max(2027, Math.ceil(NOW + .02));
  const COLORS = { work: "var(--accent)", project: "var(--blue)", study: "var(--violet)" };
  const MONTHS = { it: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"], en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
  const tlInner = $("#tlInner"), tlScroll = $("#tlScroll"), ruler = $("#tlRuler"), playhead = $("#playhead");
  const pct = (y) => ((y - MIN) / (MAX - MIN)) * 100;
  const items = D.timeline.map(it => ({
    ...it,
    vs: Math.max(it.clipStart ?? it.start, MIN),
    ve: it.end ?? NOW,
    cut: (it.clipStart ?? it.start) < MIN
  }));
  let pos = NOW - .02, playing = 0, lastKey = "";

  // righello
  for (let y = MIN; y <= MAX; y++) {
    const tk = document.createElement("span");
    tk.className = "tl__tick"; tk.style.left = pct(y) + "%"; tk.textContent = y;
    ruler.appendChild(tk);
    if (y < MAX) [.25, .5, .75].forEach(q => {
      const m = document.createElement("span"); m.className = "tl__tick tl__tick--minor"; m.style.left = pct(y + q) + "%"; ruler.appendChild(m);
    });
  }
  // clip
  items.forEach((it, idx) => {
    const track = $(`.tl__track[data-track="${it.track}"]`);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "clip" + (it.end === null ? " clip--open" : "") + (it.cut ? " clip--cut" : "");
    b.style.left = pct(it.vs) + "%"; b.style.width = (pct(it.ve) - pct(it.vs)) + "%";
    b.style.setProperty("--tc", COLORS[it.track]);
    b.dataset.idx = idx;
    b.addEventListener("click", () => { stop(); seek(it.vs + Math.min(.06, (it.ve - it.vs) / 2)); });
    it.el = b;
    track.appendChild(b);
  });
  function renderTimelineLabels() {
    items.forEach(it => { it.el.textContent = tx(it.short ?? it.title); it.el.title = `${tx(it.title)} · ${tx(it.when)}`; });
  }

  const labelOffset = () => ruler.offsetLeft;
  function seek(y, scrollInto = true) {
    pos = clamp(y, MIN, MAX);
    const w = ruler.clientWidth;
    const x = labelOffset() + (pct(pos) / 100) * w;
    playhead.style.left = x + "px";
    playhead.setAttribute("aria-valuenow", pos.toFixed(2));
    playhead.setAttribute("aria-valuetext", fmtYear(pos));
    if (scrollInto) {
      const vw = tlScroll.clientWidth, sl = tlScroll.scrollLeft;
      if (x < sl + labelOffset() + 20 || x > sl + vw - 40) tlScroll.scrollLeft = x - vw / 2;
    }
    updateViewer();
  }
  const fmtYear = (y) => {
    const yr = Math.floor(y), m = clamp(Math.floor((y - yr) * 12), 0, 11);
    return `${MONTHS[lang][m]} ${yr}`;
  };

  const viewerClips = $("#viewerClips"), viewerTc = $("#viewerTc");
  function updateViewer(force = false) {
    viewerTc.textContent = fmtYear(Math.min(pos, NOW)) + (pos >= NOW - .03 ? ` · ${t("path.now")}` : "");
    const act = items.filter(it => pos >= it.vs && pos <= it.ve + .001);
    const key = act.map(a => a.el.dataset.idx).join(",");
    items.forEach(it => it.el.classList.toggle("is-active", act.includes(it)));
    if (key === lastKey && !force) return;
    lastKey = key;
    if (!act.length) { viewerClips.innerHTML = `<p class="viewer__empty">${t("path.empty")}</p>`; return; }
    const trackName = { work: "V1 · " + (lang === "en" ? "Work" : "Lavoro"), project: "V2 · " + (lang === "en" ? "Projects" : "Progetti"), study: "A1 · " + (lang === "en" ? "Education" : "Formazione") };
    viewerClips.innerHTML = act.map(it => `
      <div class="vclip" style="--tc:${COLORS[it.track]}">
        <span class="vclip__track">${trackName[it.track]}</span>
        <h3 class="vclip__title">${tx(it.title)}</h3>
        <span><span class="vclip__org">${tx(it.org)}</span> <span class="vclip__when">· ${tx(it.when)}</span></span>
        <p class="vclip__text">${tx(it.text)}</p>
        ${it.cert ? `<button type="button" class="link-btn vclip__cert" data-cert="${it.el.dataset.idx}">${t("path.cert")} →</button>` : ""}
      </div>`).join("");
    $$("[data-cert]", viewerClips).forEach(b => b.addEventListener("click", () => {
      const it = items[+b.dataset.cert];
      openModal(`<div class="modal__content" style="padding-top:60px">
        <span class="work__kicker">${tx(it.org)} · ${tx(it.when)}</span>
        <h3 id="modalTitle">${tx(it.title)}</h3>
        <img class="modal__cert" src="${it.cert}" alt="${tx(it.title)}" loading="lazy">
        ${it.cert2 ? `<img class="modal__cert" style="margin-top:14px" src="${it.cert2}" alt="${tx(it.title)}" loading="lazy">` : ""}
      </div>`);
    }));
  }

  // trascinamento della testina e del righello
  const yearFromX = (clientX) => {
    const r = ruler.getBoundingClientRect();
    return MIN + ((clientX - r.left) / r.width) * (MAX - MIN);
  };
  let tlDrag = false;
  const startDrag = (e) => { tlDrag = true; stop(); e.currentTarget.setPointerCapture(e.pointerId); seek(yearFromX(e.clientX), false); };
  const moveDrag = (e) => { if (tlDrag) seek(yearFromX(e.clientX), false); };
  const endDrag = () => { tlDrag = false; };
  [playhead, ruler].forEach(el => {
    el.addEventListener("pointerdown", startDrag);
    el.addEventListener("pointermove", moveDrag);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
  });
  playhead.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { stop(); seek(pos - 1 / 12); e.preventDefault(); }
    if (e.key === "ArrowRight") { stop(); seek(pos + 1 / 12); e.preventDefault(); }
  });

  // play, pausa, J K L
  const playBtn = $("#tPlay");
  let lastT = 0;
  function frame(ts) {
    if (!playing) return;
    const dt = lastT ? (ts - lastT) / 1000 : 0; lastT = ts;
    let next = pos + dt * 1.1 * playing;
    if (next >= MAX || next <= MIN) { seek(clamp(next, MIN, MAX)); return stop(); }
    seek(next);
    requestAnimationFrame(frame);
  }
  function play(dir = 1) {
    if (dir > 0 && pos >= NOW - .05) seek(MIN);
    playing = playing && Math.sign(playing) === dir ? clamp(playing * 2, -4, 4) : dir;
    lastT = 0; playBtn.textContent = "❚❚"; playBtn.setAttribute("aria-label", "Pausa");
    requestAnimationFrame(frame);
  }
  function stop() { playing = 0; playBtn.textContent = "▶"; playBtn.setAttribute("aria-label", "Play"); }
  playBtn.addEventListener("click", () => playing ? stop() : play(1));
  const edges = () => [...new Set(items.flatMap(it => [it.vs]).concat(MIN))].sort((a, b) => a - b);
  $("#tPrev").addEventListener("click", () => { stop(); const e = edges().filter(x => x < pos - .02); seek(e.length ? e[e.length - 1] + .01 : MIN); });
  $("#tNext").addEventListener("click", () => { stop(); const e = edges().find(x => x > pos + .02); seek(e !== undefined ? e + .01 : NOW); });

  let editorVisible = false;
  new IntersectionObserver(([en]) => { editorVisible = en.isIntersecting; }, { threshold: .35 }).observe($("#editor"));

  addEventListener("keydown", e => {
    if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
    if (modal.open) return;
    if (/^[1-4]$/.test(e.key)) {
      const sec = $("#ruoli");
      openRole(+e.key - 1);
      const r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) sec.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      return;
    }
    if (!editorVisible) return;
    const k = e.key.toLowerCase();
    if (k === " " && document.activeElement?.tagName !== "BUTTON") { e.preventDefault(); playing ? stop() : play(1); }
    else if (k === "k") stop();
    else if (k === "l") play(1);
    else if (k === "j") play(-1);
    else if ((k === "arrowleft" || k === "arrowright") && document.activeElement === document.body) {
      stop(); seek(pos + (k === "arrowleft" ? -1 : 1) / 12); e.preventDefault();
    }
  });

  addEventListener("resize", () => seek(pos, false));

  /* ---------- Schema del setup ---------- */
  const ICONS = {
    cam: '<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="12" cy="7" r="2"/><path d="M10 18h4"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/></svg>',
    desk: '<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 13h.01M11 13h6"/><path d="M6 20h12"/></svg>',
    cut: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></svg>',
    out: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 16 0"/><path d="M7.5 12a4.5 4.5 0 0 1 9 0"/><circle cx="12" cy="12" r="1.5"/><path d="M12 14v7"/></svg>'
  };
  let mode = "live", activeNode = "phone";
  const chain = $("#chain"), info = $("#setupInfo");
  function renderChain() {
    const ids = D.setup.modes[mode];
    if (!ids.includes(activeNode)) activeNode = ids[0];
    chain.innerHTML = "";
    ids.forEach((id, i) => {
      const n = D.setup.nodes[id];
      const b = document.createElement("button");
      b.type = "button"; b.className = "node" + (id === activeNode ? " is-on" : "");
      b.style.animationDelay = (i * 80) + "ms";
      b.setAttribute("aria-pressed", String(id === activeNode));
      b.innerHTML = `${ICONS[n.icon]}<span class="node__role">${tx(n.role)}</span><span class="node__title">${tx(n.title)}</span><span class="wire" aria-hidden="true"></span>`;
      b.addEventListener("click", () => { activeNode = id; renderChain(); });
      chain.appendChild(b);
    });
    const n = D.setup.nodes[activeNode];
    info.innerHTML = `<h4>${tx(n.title)} · <span class="muted">${tx(n.role)}</span></h4><p>${tx(n.text)}</p>`;
  }
  $$(".mode").forEach(b => b.addEventListener("click", () => {
    mode = b.dataset.mode;
    $$(".mode").forEach(x => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", String(x === b)); });
    renderChain();
  }));

  /* ---------- Contatti ---------- */
  const copyBtn = $("#copyMail");
  copyBtn.addEventListener("click", async () => {
    const mail = copyBtn.dataset.mail;
    try { await navigator.clipboard.writeText(mail); $("#copyState").textContent = t("contact.copied"); }
    catch (_) { location.href = "mailto:" + mail; }
    setTimeout(() => { $("#copyState").textContent = t("contact.copy"); }, 2000);
  });

  const form = $("#contactForm"), subj = $("#f-subject");
  $$("#topics button").forEach(b => b.addEventListener("click", () => {
    $$("#topics button").forEach(x => x.classList.toggle("is-on", x === b));
    subj.value = b.textContent.trim();
    subj.dispatchEvent(new Event("input"));
  }));

  const EMAILJS = { service: "service_de9wyxm", template: "template_0f9xlh8", key: "lvOiba2EF6BEEfMoS" };
  const msg = $("#formMsg"), sendBtn = $("#sendBtn"), sendText = $("#sendText");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    form.classList.add("was-checked");
    msg.className = "form__msg";
    if (!form.checkValidity()) { msg.textContent = t("form.check"); msg.classList.add("err"); return; }
    sendBtn.disabled = true; sendText.textContent = t("form.sending");
    try {
      if (!window.emailjs) throw new Error("EmailJS non caricato");
      emailjs.init({ publicKey: EMAILJS.key });
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form);
      msg.textContent = t("form.ok"); msg.classList.add("ok");
      form.reset(); form.classList.remove("was-checked");
      $$("#topics button").forEach(x => x.classList.remove("is-on"));
    } catch (err) {
      console.error(err);
      msg.textContent = t("form.err"); msg.classList.add("err");
    } finally {
      sendBtn.disabled = false;
      sendText.textContent = lang === "en" ? window.I18N_EN["form.send"] : "Invia messaggio";
    }
  });

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Avvio ---------- */
  applyLang();
  requestAnimationFrame(() => {
    seek(pos, false);
    tlScroll.scrollLeft = tlScroll.scrollWidth;
    seek(pos, false);
  });
})();
