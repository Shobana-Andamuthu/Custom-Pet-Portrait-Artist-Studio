/* ==========================================================================
   PAWTRAIT ATELIER — Core Scripts & Interactions
   --------------------------------------------------------------------------
   File   : assets/js/main.js
   Notes  : Handles preloader, sticky nav scroll state, back-to-top button,
            number counter animations, and image fallback safety.
   ========================================================================== */
(function () {
  "use strict";

  /* 1. Dismiss Preloader */
  var preloaderDismissed = false;
  function dismissPreloader() {
    if (preloaderDismissed) return;
    var p = document.getElementById("preloader");
    if (p) {
      if (window.location.search.indexOf("nopreloader") !== -1) {
        if (p.parentNode) p.parentNode.removeChild(p);
        preloaderDismissed = true;
        return;
      }
      preloaderDismissed = true;
      p.classList.add("fade-out");
      setTimeout(function () {
        if (p && p.parentNode) p.parentNode.removeChild(p);
      }, 480);
    }
  }

  /* 2. Scroll Handlers (Nav shadow & Back to Top) */
  function handleScroll() {
    var nav = document.getElementById("mainNav");
    var topBtn = document.getElementById("backToTop");
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (nav) {
      if (scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    if (topBtn) {
      if (scrollY > 300) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    }
  }

  /* 3. Back to Top Click */
  function bindBackToTop() {
    var topBtn = document.getElementById("backToTop");
    if (topBtn) {
      topBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  }

  /* 4. Number Counters (Intersection Observer) */
  function initCounters() {
    var counters = document.querySelectorAll(".counter[data-target]");
    if (!counters.length) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseFloat(el.getAttribute("data-target")) || 0;
            var isFloat = target % 1 !== 0;
            var duration = 1600;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              // easeOutQuart
              var ease = 1 - Math.pow(1 - progress, 4);
              var cur = ease * target;
              el.childNodes[0].nodeValue = isFloat ? cur.toFixed(1) : Math.floor(cur);

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                el.childNodes[0].nodeValue = isFloat ? target.toFixed(1) : target;
              }
            }

            window.requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.3 });

      counters.forEach(function (c) {
        observer.observe(c);
      });
    }
  }

  /* 5. Live Countdown Timer */
  function initCountdowns() {
    var banners = document.querySelectorAll("[data-countdown]");
    if (!banners.length) return;

    banners.forEach(function (banner) {
      var targetStr = banner.getAttribute("data-countdown");
      var targetDate = new Date(targetStr).getTime();
      if (isNaN(targetDate)) {
        // default 14 days from now if not valid
        targetDate = new Date().getTime() + 14 * 24 * 60 * 60 * 1000;
      }

      var dayEl = banner.querySelector(".cd-days");
      var hourEl = banner.querySelector(".cd-hours");
      var minEl = banner.querySelector(".cd-mins");
      var secEl = banner.querySelector(".cd-secs");

      function update() {
        var now = new Date().getTime();
        var diff = targetDate - now;

        if (diff <= 0) {
          if (dayEl) dayEl.textContent = "00";
          if (hourEl) hourEl.textContent = "00";
          if (minEl) minEl.textContent = "00";
          if (secEl) secEl.textContent = "00";
          return;
        }

        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((diff % (1000 * 60)) / 1000);

        if (dayEl) dayEl.textContent = d < 10 ? "0" + d : d;
        if (hourEl) hourEl.textContent = h < 10 ? "0" + h : h;
        if (minEl) minEl.textContent = m < 10 ? "0" + m : m;
        if (secEl) secEl.textContent = s < 10 ? "0" + s : s;
      }

      update();
      setInterval(update, 1000);
    });
  }

  /* Lifecycle init */
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("DOMContentLoaded", function () {
    bindBackToTop();
    initCounters();
    initCountdowns();
    setTimeout(dismissPreloader, 400);
  });
  window.addEventListener("load", function () {
    bindBackToTop();
    initCounters();
    initCountdowns();
    setTimeout(dismissPreloader, 350);
  });

  // Safety fallback if load event delayed
  setTimeout(dismissPreloader, 1100);
})();
