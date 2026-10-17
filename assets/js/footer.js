/* ==========================================================================
   PAWTRAIT ATELIER — Reusable Shared Footer
   --------------------------------------------------------------------------
   File   : assets/js/footer.js
   Usage  : Include <div id="footer-container"></div> in the page body, then
            load this script at the end of the body.
   ========================================================================== */
(function () {
  "use strict";

  var CONTACT = {
    phone: "+1 (800) 584-PAWS",
    phoneHref: "tel:+18005847297",
    email: "atelier@pawtraitstudio.art",
    emailHref: "mailto:atelier@pawtraitstudio.art",
    address: "Atelier 4B, 184 Artisan Square, Portland, OR 97209",
    hours: "Tue – Sat: 10:00 – 18:00 (Private Consultations by Appointment)"
  };

  var SOCIALS = [
    { icon: "bi-instagram", href: "https://www.instagram.com/", label: "Instagram" },
    { icon: "bi-pinterest", href: "https://www.pinterest.com/", label: "Pinterest" },
    { icon: "bi-youtube", href: "https://www.youtube.com/", label: "YouTube" },
    { icon: "bi-facebook", href: "https://www.facebook.com/", label: "Facebook" }
  ];

  var footerHTML =
    '<footer class="site-footer" id="siteFooter">' +
      /* -------- Studio Trust Perks Bar -------- */
      '<div class="footer-perks-bar py-4">' +
        '<div class="container">' +
          '<div class="row g-3 g-md-4 text-start">' +
            '<div class="col-12 col-sm-6 col-xl-3">' +
              '<div class="perk-item d-flex align-items-center gap-3 p-3 bg-surface rounded-3 border border-soft shadow-xs h-100">' +
                '<span class="perk-icon flex-shrink-0"><i class="bi bi-brush"></i></span>' +
                '<div class="perk-text">' +
                  '<strong class="d-block text-ink perk-title">100% Hand-Painted</strong>' +
                  '<span class="d-block text-muted small perk-desc">No AI or digital filters</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="col-12 col-sm-6 col-xl-3">' +
              '<div class="perk-item d-flex align-items-center gap-3 p-3 bg-surface rounded-3 border border-soft shadow-xs h-100">' +
                '<span class="perk-icon flex-shrink-0"><i class="bi bi-award"></i></span>' +
                '<div class="perk-text">' +
                  '<strong class="d-block text-ink perk-title">Museum-Grade Pigments</strong>' +
                  '<span class="d-block text-muted small perk-desc">100+ year archival guarantee</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="col-12 col-sm-6 col-xl-3">' +
              '<div class="perk-item d-flex align-items-center gap-3 p-3 bg-surface rounded-3 border border-soft shadow-xs h-100">' +
                '<span class="perk-icon flex-shrink-0"><i class="bi bi-box-seam"></i></span>' +
                '<div class="perk-text">' +
                  '<strong class="d-block text-ink perk-title">Insured Global Shipping</strong>' +
                  '<span class="d-block text-muted small perk-desc">Custom wood art crates</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="col-12 col-sm-6 col-xl-3">' +
              '<div class="perk-item d-flex align-items-center gap-3 p-3 bg-surface rounded-3 border border-soft shadow-xs h-100">' +
                '<span class="perk-icon flex-shrink-0"><i class="bi bi-eye"></i></span>' +
                '<div class="perk-text">' +
                  '<strong class="d-block text-ink perk-title">Progress Previews</strong>' +
                  '<span class="d-block text-muted small perk-desc">Sneak peeks before varnish</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* -------- Main Footer Columns -------- */
      '<div class="footer-main">' +
        '<div class="container">' +
          '<div class="row g-4">' +
            /* Atelier Identity */
            '<div class="col-lg-4 col-md-6 pe-lg-4">' +
              '<a href="index.html" class="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none navbar-brand" aria-label="Paw & Brush — Custom Pet Portrait Studio">' +
                '<span class="brand-logo-wrap">' +
                  '<img src="assets/images/logo/logo.png" alt="Paw & Brush Custom Pet Portrait Studio" class="brand-logo-img logo-light-only" width="48" height="48">' +
                  '<img src="assets/images/logo/logo-dark.png" alt="Paw & Brush Custom Pet Portrait Studio" class="brand-logo-img logo-dark-only" width="48" height="48">' +
                '</span>' +
                '<span class="brand-name">' +
                  '<span class="brand-name-top" style="font-size:1.35rem">PAW &<span class="brand-name-accent"> BRUSH</span></span>' +
                  '<span class="brand-name-sub">Custom Pet Portrait Studio</span>' +
                '</span>' +
              '</a>' +
              '<p class="small text-muted mb-4">Your Pet\'s Story, Beautifully Painted — Honoring companion animals through timeless handcrafted fine art on museum-grade canvas.</p>' +
              '<div class="footer-social">' +
                SOCIALS.map(function (s) {
                  return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '"><i class="bi ' + s.icon + '"></i></a>';
                }).join("") +
              '</div>' +
            '</div>' +

            /* Mediums & Portfolio */
            '<div class="col-lg-2 col-md-6 col-6">' +
              '<h5 class="footer-col-title">Artistic Mediums</h5>' +
              '<ul class="footer-links">' +
                '<li><a href="portfolio.html?medium=oil"><i class="bi bi-chevron-right"></i>Oil on Linen</a></li>' +
                '<li><a href="portfolio.html?medium=watercolor"><i class="bi bi-chevron-right"></i>Botanical Watercolor</a></li>' +
                '<li><a href="portfolio.html?medium=charcoal"><i class="bi bi-chevron-right"></i>Classic Charcoal</a></li>' +
                '<li><a href="portfolio.html?medium=acrylic"><i class="bi bi-chevron-right"></i>Modern Acrylic</a></li>' +
                '<li><a href="portfolio.html?medium=pastels"><i class="bi bi-chevron-right"></i>Soft Pastel Velvet</a></li>' +
              '</ul>' +
            '</div>' +

            /* Commission Services */
            '<div class="col-lg-2 col-md-6 col-6">' +
              '<h5 class="footer-col-title">Collector Care</h5>' +
              '<ul class="footer-links">' +
                '<li><a href="commission-process.html"><i class="bi bi-chevron-right"></i>Commission Guide</a></li>' +
                '<li><a href="commission-process.html#pricing"><i class="bi bi-chevron-right"></i>Pricing & Sizing</a></li>' +
                '<li><a href="about.html#studio"><i class="bi bi-chevron-right"></i>Our Atelier Story</a></li>' +
                '<li><a href="about.html#materials"><i class="bi bi-chevron-right"></i>Museum Materials</a></li>' +
                '<li><a href="contact.html"><i class="bi bi-chevron-right"></i>Inquire Commission</a></li>' +
              '</ul>' +
            '</div>' +

            /* Studio Contact & Newsletter */
            '<div class="col-lg-4 col-md-6">' +
              '<h5 class="footer-col-title">Atelier Newsletter</h5>' +
              '<p class="small text-muted mb-2">Subscribe for studio release dates and quarterly commission availability.</p>' +
              '<form class="footer-newsletter mb-3" id="atelierNewsletterForm" novalidate>' +
                '<div class="input-group">' +
                  '<input type="email" class="form-control" id="atelierEmail" placeholder="Enter your email address..." aria-label="Email address" required>' +
                  '<button class="btn btn-brand px-3" type="submit" aria-label="Subscribe to newsletter"><i class="bi bi-send me-1"></i>Join</button>' +
                '</div>' +
                '<div class="form-text small mt-1" id="atelierNewsletterMsg"></div>' +
              '</form>' +
              '<div class="contact-info-list small text-muted">' +
                '<div class="mb-1"><i class="bi bi-telephone text-brand me-2"></i><a href="' + CONTACT.phoneHref + '" class="text-muted">' + CONTACT.phone + '</a></div>' +
                '<div class="mb-1"><i class="bi bi-envelope text-brand me-2"></i><a href="' + CONTACT.emailHref + '" class="text-muted">' + CONTACT.email + '</a></div>' +
                '<div><i class="bi bi-geo-alt text-brand me-2"></i><span>' + CONTACT.address + '</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* -------- Bottom Provenance Bar -------- */
      '<div class="footer-bottom">' +
        '<div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">' +
          '<div class="text-muted small">&copy; <span class="year">2026</span> PawTrait Atelier. Handcrafted Custom Pet Portraits. All rights reserved.</div>' +
          '<div class="d-flex gap-3 small text-muted">' +
            '<span>Certificate of Authenticity Included</span> &bull; ' +
            '<span>100% Archival Guarantee</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var host = document.getElementById("footer-container");
  if (host) {
    host.innerHTML = footerHTML;

    // Newsletter submit handler
    var form = host.querySelector("#atelierNewsletterForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var emailInput = host.querySelector("#atelierEmail");
        var msg = host.querySelector("#atelierNewsletterMsg");
        if (emailInput && emailInput.value.trim() && emailInput.checkValidity()) {
          msg.textContent = "Thank you for joining our collector circle! Welcome to the Atelier.";
          msg.className = "form-text small mt-1 text-success";
          emailInput.value = "";
        } else {
          msg.textContent = "Please enter a valid email address.";
          msg.className = "form-text small mt-1 text-danger";
        }
      });
    }
  }
})();
