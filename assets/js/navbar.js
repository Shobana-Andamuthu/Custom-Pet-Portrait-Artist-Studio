/* ==========================================================================
   PAWTRAIT ATELIER — Reusable Shared Navigation Bar
   --------------------------------------------------------------------------
   File   : assets/js/navbar.js
   Usage  : Include <div id="navbar-container"></div> in the page body, then
            load this script before main.js.
   ========================================================================== */
(function () {
  "use strict";

  var CONTACT = {
    phone: "+1 (800) 584-PAWS",
    phoneHref: "tel:+18005847297",
    email: "atelier@pawtraitstudio.art",
    emailHref: "mailto:atelier@pawtraitstudio.art",
    hours: "Studio Hours: Tue – Sat: 10:00 – 18:00"
  };

  var SOCIALS = [
    { icon: "bi-instagram", href: "https://www.instagram.com/", label: "Instagram" },
    { icon: "bi-pinterest", href: "https://www.pinterest.com/", label: "Pinterest" },
    { icon: "bi-youtube", href: "https://www.youtube.com/", label: "YouTube" },
    { icon: "bi-facebook", href: "https://www.facebook.com/", label: "Facebook" }
  ];

  /* ------------------------------------------------------------
     NAV DATA
     ------------------------------------------------------------ */
  var NAV = [
    {
      label: "Home",
      href: "index.html",
      dropdown: [
        { label: "Home 1 — Atelier Classic", href: "index.html", icon: "bi-palette", desc: "Signature oil & watercolor presentation" },
        { label: "Home 2 — Artist Showcase", href: "home-2.html", icon: "bi-brush", desc: "Curated mediums, framing & lookbook" }
      ]
    },
    { label: "Portfolio", href: "portfolio.html" },
    { label: "Commission Process", href: "commission-process.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" }
  ];

  function currentFile() {
    var p = window.location.pathname.split("/").pop();
    return p || "index.html";
  }

  function active(href) {
    var target = href.split("?")[0];
    var cur = currentFile();
    return target === cur;
  }

  function childActive(item) {
    if (item.dropdown) {
      return item.dropdown.some(function (c) {
        return active(c.href);
      });
    }
    return false;
  }

  /* ------------------------------------------------------------
     Brand Logo
     ------------------------------------------------------------ */
  var BRAND_LOGO_HTML =
    '<span class="brand-logo-wrap">' +
      '<img src="assets/images/logo/logo.png" alt="Paw & Brush Custom Pet Portrait Studio" class="brand-logo-img" width="46" height="46">' +
    '</span>';

  /* ------------------------------------------------------------
     Desktop Nav Items
     ------------------------------------------------------------ */
  function desktopNavItems() {
    return NAV.map(function (item) {
      var isCurActive = active(item.href) || childActive(item);
      if (item.dropdown) {
        return (
          '<li class="nav-item dropdown custom-nav-dropdown' + (isCurActive ? " active" : "") + '">' +
            '<a class="nav-link dropdown-toggle' + (isCurActive ? " active" : "") + '" href="#" role="button" data-nav-dropdown aria-expanded="false" aria-haspopup="true">' +
              item.label + '<i class="bi bi-chevron-down ms-1 dropdown-chevron" style="font-size:0.75rem"></i>' +
            '</a>' +
            '<ul class="dropdown-menu shadow-lg border-0">' +
              item.dropdown.map(function (c) {
                return (
                  '<li><a class="dropdown-item' + (active(c.href) ? " active" : "") + '" href="' + c.href + '">' +
                    '<i class="bi ' + c.icon + '"></i>' +
                    '<div>' +
                      '<span class="item-title">' + c.label + '</span>' +
                      '<span class="item-desc">' + c.desc + '</span>' +
                    '</div>' +
                  '</a></li>'
                );
              }).join("") +
            '</ul>' +
          '</li>'
        );
      }
      return (
        '<li class="nav-item">' +
          '<a class="nav-link' + (active(item.href) ? " active" : "") + '" href="' + item.href + '">' + item.label + '</a>' +
        '</li>'
      );
    }).join("");
  }

  /* ------------------------------------------------------------
     Mobile Nav Items
     ------------------------------------------------------------ */
  /* ------------------------------------------------------------
     Mobile Nav Items
     ------------------------------------------------------------ */
  function mobileNavItems() {
    return NAV.map(function (item) {
      var isActive = active(item.href) || childActive(item);
      var act = isActive ? " active" : "";
      if (item.dropdown) {
        return (
          '<li class="nav-item mobile-dropdown-item mb-1">' +
            '<div class="mobile-nav-heading-row d-flex align-items-center justify-content-between w-100' + act + '" data-mobile-toggle role="button" tabindex="0">' +
              '<span class="mobile-nav-title">' + item.label + '</span>' +
              '<i class="bi bi-chevron-down mobile-chevron"></i>' +
            '</div>' +
            '<ul class="dropdown-menu mobile-sub-menu shadow-sm" style="display:none;padding:0.5rem;border-radius:14px;margin:0.35rem 0 0.5rem 0;background:var(--surface);border:1px solid var(--border-soft);width:100%;">' +
              item.dropdown.map(function (c) {
                return (
                  '<li><a class="dropdown-item py-2' + (active(c.href) ? " active" : "") + '" href="' + c.href + '">' +
                    '<i class="bi ' + c.icon + ' me-2"></i><span>' + c.label + '</span>' +
                  '</a></li>'
                );
              }).join("") +
            '</ul>' +
          '</li>'
        );
      }
      return (
        '<li class="nav-item mb-1">' +
          '<a class="mobile-nav-link w-100 d-flex align-items-center' + act + '" href="' + item.href + '">' + item.label + '</a>' +
        '</li>'
      );
    }).join("");
  }

  /* ------------------------------------------------------------
     Navbar HTML Markup
     ------------------------------------------------------------ */
  var headerHTML =
    '<header class="site-header fixed-top" id="siteHeader">' +
      '<nav class="navbar navbar-expand-xxl main-nav" id="mainNav" aria-label="Main navigation">' +
        '<div class="container">' +
          /* Brand logo */
          '<a class="navbar-brand d-flex align-items-center gap-2" href="index.html" aria-label="Paw & Brush — Custom Pet Portrait Studio Home">' +
            BRAND_LOGO_HTML +
            '<span class="brand-name">' +
              '<span class="brand-name-top">PAW &<span class="brand-name-accent"> BRUSH</span></span>' +
              '<span class="brand-name-sub">Custom Pet Portrait Studio</span>' +
            '</span>' +
          '</a>' +

          /* Right Header Actions */
          '<div class="d-flex align-items-center gap-2 order-xxl-3 header-actions">' +
            /* Theme Toggle (Hidden on mobile < 768px via CSS, active on >= 768px) */
            '<button type="button" class="theme-toggle icon-btn d-none d-md-inline-flex" id="themeToggle" title="Toggle dark / light mode" aria-label="Toggle dark mode">' +
              '<i class="bi bi-moon-stars"></i><i class="bi bi-sun"></i>' +
            '</button>' +

            /* RTL Toggle (Hidden on mobile < 768px via CSS, active on >= 768px) */
            '<button type="button" class="rtl-toggle icon-btn d-none d-md-inline-flex" id="rtlToggle" title="Toggle RTL / LTR layout" aria-label="Toggle RTL layout">' +
              '<i class="bi bi-arrow-left-right"></i>' +
            '</button>' +

            /* Commission Artwork CTA (Visible only on wide desktop >= 1400px) */
            '<a href="contact.html" class="btn btn-brand btn-sm d-none d-xxl-inline-flex align-items-center gap-1 ms-1" aria-label="Commission Artwork">' +
              '<i class="bi bi-brush-fill"></i><span>Commission Artwork</span>' +
            '</a>' +

            /* Mobile & Tablet Toggler (Active on screens < 1400px) */
            '<button class="navbar-toggler border-0 d-xxl-none icon-btn ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav" aria-label="Toggle navigation">' +
              '<i class="bi bi-list fs-4"></i>' +
            '</button>' +
          '</div>' +

          /* Centered Nav Links (Desktop >= 1400px) */
          '<div class="collapse navbar-collapse order-xxl-2 d-none d-xxl-flex justify-content-center">' +
            '<ul class="navbar-nav">' + desktopNavItems() + '</ul>' +
          '</div>' +
        '</div>' +
      '</nav>' +

      /* Mobile Offcanvas Drawer */
      '<div class="offcanvas offcanvas-end mobile-nav" tabindex="-1" id="mobileNav" aria-labelledby="mobileNavLabel">' +
        '<div class="offcanvas-header">' +
          '<div class="d-flex align-items-center gap-2" id="mobileNavLabel">' +
            BRAND_LOGO_HTML +
            '<span class="brand-name">' +
              '<span class="brand-name-top" style="font-size:1.15rem">PAW &<span class="brand-name-accent"> BRUSH</span></span>' +
              '<span class="brand-name-sub">Custom Pet Portrait Studio</span>' +
            '</span>' +
          '</div>' +
          '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
        '</div>' +
        '<div class="offcanvas-body pt-3">' +
          '<ul class="navbar-nav flex-column mb-4 w-100">' + mobileNavItems() + '</ul>' +
          '<div class="d-grid gap-2 pt-3 border-top">' +
            '<a href="contact.html" class="btn btn-brand w-100"><i class="bi bi-brush-fill me-2"></i>Commission Artwork</a>' +
            '<div class="row g-2 mt-2 pt-2 border-top w-100 m-0">' +
              '<div class="col-6 ps-0 pe-1">' +
                '<button type="button" class="btn btn-soft w-100 theme-toggle" id="themeToggleMobile" style="height:44px;font-size:0.88rem;display:inline-flex;align-items:center;justify-content:center;gap:0.4rem;">' +
                  '<i class="bi bi-moon-stars"></i><span>Theme</span>' +
                '</button>' +
              '</div>' +
              '<div class="col-6 ps-1 pe-0">' +
                '<button type="button" class="btn btn-soft w-100 rtl-toggle" id="rtlToggleMobile" style="height:44px;font-size:0.88rem;display:inline-flex;align-items:center;justify-content:center;gap:0.4rem;">' +
                  '<i class="bi bi-arrow-left-right"></i><span>RTL / LTR</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</header>';

  var host = document.getElementById("navbar-container");
  if (host) {
    host.innerHTML = headerHTML;

    // Dropdown toggle logic
    host.querySelectorAll("[data-nav-dropdown]").forEach(function (toggle) {
      var parent = toggle.closest(".dropdown");
      var menu = parent ? parent.querySelector(".dropdown-menu") : null;

      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var isOpen = menu && menu.classList.contains("show");
        host.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
          m.classList.remove("show");
        });
        host.querySelectorAll("[data-nav-dropdown]").forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
          if (t.closest(".dropdown")) t.closest(".dropdown").classList.remove("show");
        });

        if (!isOpen && menu) {
          menu.classList.add("show");
          toggle.classList.add("show");
          toggle.setAttribute("aria-expanded", "true");
          if (parent) parent.classList.add("show");
        }
      });
    });

    // Close desktop dropdown on outside click
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#navbar-container .navbar-nav .dropdown")) {
        host.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
          m.classList.remove("show");
        });
        host.querySelectorAll("[data-nav-dropdown]").forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
          if (t.closest(".dropdown")) t.closest(".dropdown").classList.remove("show");
        });
      }
    });

    // Mobile submenu toggle
    host.querySelectorAll("[data-mobile-toggle]").forEach(function (btn) {
      var itemWrap = btn.closest(".mobile-dropdown-item");
      var sub = itemWrap ? itemWrap.querySelector(".mobile-sub-menu") : null;
      var icon = itemWrap ? itemWrap.querySelector(".mobile-chevron") : null;

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (sub) {
          var isShown = sub.style.display === "block";
          sub.style.display = isShown ? "none" : "block";
          if (icon) {
            icon.style.transform = isShown ? "rotate(0deg)" : "rotate(180deg)";
            icon.style.transition = "transform 0.25s ease";
          }
        }
      });
    });

    // Re-bind theme & RTL switches
    if (window.AtelierTheme) window.AtelierTheme.bind();
    if (window.AtelierRTL) window.AtelierRTL.bind();
  }
})();
