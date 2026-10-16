/* ==========================================================================
   PAWTRAIT ATELIER — RTL / LTR Direction Toggle
   --------------------------------------------------------------------------
   File   : assets/js/rtl.js
   Notes  : Persistent LTR / RTL direction switcher. Swaps Bootstrap CSS
            build and sets <html dir="rtl|ltr">.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "pet-portrait-dir";
  var RTL_CSS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";
  var LTR_CSS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

  function applyRTL(isRtl) {
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    var linkTag = document.querySelector("link[data-bs-css]");
    if (linkTag) {
      linkTag.href = isRtl ? RTL_CSS : LTR_CSS;
    }
    try {
      localStorage.setItem(STORAGE_KEY, isRtl ? "rtl" : "ltr");
    } catch (e) {
      /* ignore storage error */
    }
  }

  function isRTL() {
    return document.documentElement.getAttribute("dir") === "rtl";
  }

  function bindToggles() {
    var toggles = document.querySelectorAll(".rtl-toggle");
    toggles.forEach(function (btn) {
      if (btn.dataset.rtlBound) return;
      btn.dataset.rtlBound = "1";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        applyRTL(!isRTL());
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToggles);
  } else {
    bindToggles();
  }
  window.addEventListener("load", bindToggles);

  window.AtelierRTL = {
    isRTL: isRTL,
    apply: applyRTL,
    bind: bindToggles
  };
})();
