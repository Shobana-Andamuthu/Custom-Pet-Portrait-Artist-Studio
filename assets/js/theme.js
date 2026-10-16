/* ==========================================================================
   PAWTRAIT ATELIER — Theme (Light / Dark) Toggle
   --------------------------------------------------------------------------
   File   : assets/js/theme.js
   Notes  : Persistent Light / Dark mode switcher. Saves preference in
            localStorage under "pet-portrait-theme".
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "pet-portrait-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore local storage access exceptions */
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
  }

  function bindToggles() {
    var toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach(function (btn) {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var next = currentTheme() === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });
  }

  // Bind immediately and re-bind once DOM or dynamic navbar loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToggles);
  } else {
    bindToggles();
  }
  window.addEventListener("load", bindToggles);

  // Expose global helper if needed
  window.AtelierTheme = {
    current: currentTheme,
    apply: applyTheme,
    bind: bindToggles
  };
})();
