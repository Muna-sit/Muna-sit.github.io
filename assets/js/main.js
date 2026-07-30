/* Saiyma Sittul Muna — portfolio interactions */
(function () {
  "use strict";

  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- theme ---------- */
  $("#theme").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- mobile menu ---------- */
  var burger = $("#burger");
  var menu = $("#menu");

  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });

  $$("#menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- nav background on scroll ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 24); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- scroll-spy ---------- */
  var links = $$("#menu a");
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = $$(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    reveals.forEach(function (el, i) {
      // stagger siblings so grids cascade instead of popping in together
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- publication filters ---------- */
  var pubs = $$(".pub");
  $$(".filters button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.f;
      $$(".filters button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      pubs.forEach(function (p) {
        p.hidden = !(f === "all" || p.dataset.cat === f);
      });
    });
  });

  /* ---------- figure lightbox ---------- */
  var lb = $("#lb"), lbImg = $("#lbimg"), lbCap = $("#lbcap");
  var lastFocus = null;

  function openLb(fig) {
    var img = $("img", fig);
    if (!img) return;
    lastFocus = document.activeElement;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = fig.dataset.cap || "";
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    $("#lbx").focus();
  }

  function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  $$(".pub__fig[data-cap]").forEach(function (fig) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Enlarge figure");
    fig.addEventListener("click", function () { openLb(fig); });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(fig); }
    });
  });

  $("#lbx").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.parentNode === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lb.classList.contains("open")) closeLb();
  });

  /* ---------- footer year ---------- */
  $("#yr").textContent = new Date().getFullYear();
})();
