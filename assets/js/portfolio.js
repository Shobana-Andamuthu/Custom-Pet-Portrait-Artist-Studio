/* ==========================================================================
   PAWTRAIT ATELIER — Portfolio Gallery & Lightbox Controller
   --------------------------------------------------------------------------
   File   : assets/js/portfolio.js
   Notes  : Powers interactive medium filters (All, Watercolor, Pencil, Acrylic,
            Digital), active counts, URL param pre-selection (?medium=...),
            and accessible high-res artwork lightbox with keyboard navigation.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     1. Gallery Dataset (16 Masterworks across 4 mediums)
     ------------------------------------------------------------ */
  var ARTWORKS = [
    {
      id: "art-1",
      name: "Barnaby the Corgi",
      breed: "Pembroke Welsh Corgi",
      medium: "watercolor",
      mediumLabel: "Botanical Watercolor",
      dimensions: "16\" × 20\"",
      price: "$240",
      turnaround: "10–14 Days",
      image: "assets/images/gallery/port_wc_corgi.jpg",
      alt: "Barnaby the Corgi Botanical Watercolor Portrait",
      desc: "Luminous watercolor washes capturing a joyous smile and amber coat undertones."
    },
    {
      id: "art-2",
      name: "Cleo & Cotton",
      breed: "Calico Kitten",
      medium: "watercolor",
      mediumLabel: "Botanical Watercolor",
      dimensions: "12\" × 16\"",
      price: "$220",
      turnaround: "10–12 Days",
      image: "assets/images/gallery/port_wc_kitten.jpg",
      alt: "Cleo the Calico Kitten Watercolor Artwork",
      desc: "Delicate washes recreating soft kitten fur and bright green eyes."
    },
    {
      id: "art-3",
      name: "Sir Jasper",
      breed: "Cavalier King Charles Spaniel",
      medium: "watercolor",
      mediumLabel: "Botanical Watercolor",
      dimensions: "18\" × 24\"",
      price: "$290",
      turnaround: "12–14 Days",
      image: "assets/images/gallery/port_wc_spaniel.jpg",
      alt: "Sir Jasper Cavalier Spaniel in Watercolor Blossom",
      desc: "Rich chestnut washes nestled among soft English floral botanicals."
    },
    {
      id: "art-4",
      name: "Pip the Syrian",
      breed: "Golden Syrian Companion",
      medium: "watercolor",
      mediumLabel: "Botanical Watercolor",
      dimensions: "10\" × 12\"",
      price: "$180",
      turnaround: "7–10 Days",
      image: "assets/images/gallery/port_wc_hamster.jpg",
      alt: "Pip Golden Syrian Pet Watercolor Study",
      desc: "Miniature botanical study with fine fur strokes and bright eyes."
    },
    {
      id: "art-5",
      name: "Ghost the Husky",
      breed: "Siberian Husky",
      medium: "pencil",
      mediumLabel: "Charcoal & Pencil",
      dimensions: "20\" × 24\"",
      price: "$260",
      turnaround: "8–12 Days",
      image: "assets/images/gallery/port_pencil_husky.jpg",
      alt: "Ghost Siberian Husky Charcoal and Graphite Portrait",
      desc: "Charcoal and pencil study highlighting striking icy blue eyes."
    },
    {
      id: "art-6",
      name: "Maximilian",
      breed: "Maine Coon Cat",
      medium: "pencil",
      mediumLabel: "Charcoal & Pencil",
      dimensions: "18\" × 24\"",
      price: "$250",
      turnaround: "8–10 Days",
      image: "assets/images/gallery/port_pencil_mainecoon.jpg",
      alt: "Maximilian Maine Coon Cat Graphite Pencil Study",
      desc: "Detailed graphite hatching celebrating majestic ear tufts and ruff."
    },
    {
      id: "art-7",
      name: "Duchess Luna",
      breed: "Italian Greyhound",
      medium: "pencil",
      mediumLabel: "Charcoal & Pencil",
      dimensions: "16\" × 20\"",
      price: "$220",
      turnaround: "7–10 Days",
      image: "assets/images/gallery/port_pencil_greyhound.jpg",
      alt: "Duchess Luna Italian Greyhound Classical Charcoal",
      desc: "Graceful graphite study emphasizing elegant contours and dark eyes."
    },
    {
      id: "art-8",
      name: "Rio the Scarlet",
      breed: "Scarlet Macaw Avian",
      medium: "pencil",
      mediumLabel: "Charcoal & Pencil",
      dimensions: "16\" × 20\"",
      price: "$240",
      turnaround: "8–12 Days",
      image: "assets/images/gallery/port_pencil_parrot.jpg",
      alt: "Rio Scarlet Macaw Detailed Graphite Drawing",
      desc: "Intricate feather barb hatching executed on archival smooth paper."
    },
    {
      id: "art-9",
      name: "Winston the Pug",
      breed: "Fawn Pug",
      medium: "acrylic",
      mediumLabel: "Modern Acrylic",
      dimensions: "16\" × 16\"",
      price: "$260",
      turnaround: "12–16 Days",
      image: "assets/images/gallery/port_acrylic_pug.jpg",
      alt: "Winston Fawn Pug Modern Acrylic Portrait",
      desc: "Expressive acrylic brushwork bringing out a velvety dark mask."
    },
    {
      id: "art-10",
      name: "Suki the Siamese",
      breed: "Seal Point Siamese",
      medium: "acrylic",
      mediumLabel: "Modern Acrylic",
      dimensions: "18\" × 24\"",
      price: "$280",
      turnaround: "12–16 Days",
      image: "assets/images/gallery/port_acrylic_siamese.jpg",
      alt: "Suki Seal Point Siamese Acrylic Painting",
      desc: "Sapphire blue eyes rendered with satin acrylic layers on linen."
    },
    {
      id: "art-11",
      name: "Copper Meadow",
      breed: "Golden Retriever",
      medium: "acrylic",
      mediumLabel: "Modern Acrylic",
      dimensions: "24\" × 30\"",
      price: "$340",
      turnaround: "14–18 Days",
      image: "assets/images/gallery/port_acrylic_golden.jpg",
      alt: "Copper Golden Retriever Autumn Acrylic Painting",
      desc: "Warm impasto brushwork capturing radiant coat tones and warmth."
    },
    {
      id: "art-12",
      name: "Bramble",
      breed: "Holland Lop Rabbit",
      medium: "acrylic",
      mediumLabel: "Modern Acrylic",
      dimensions: "14\" × 18\"",
      price: "$230",
      turnaround: "10–14 Days",
      image: "assets/images/gallery/port_acrylic_bunny.jpg",
      alt: "Bramble Holland Lop Bunny Acrylic Painting",
      desc: "Textured acrylic palette celebrating gentle flopped ears and meadow greens."
    },
    {
      id: "art-13",
      name: "Kaiser the Royal",
      breed: "Doberman Pinscher",
      medium: "digital",
      mediumLabel: "Digital Fine Art",
      dimensions: "20\" × 24\" Giclée",
      price: "$190",
      turnaround: "5–7 Days",
      image: "assets/images/gallery/port_digital_doberman.jpg",
      alt: "Kaiser Doberman Pinscher Digital Fine Art Portrait",
      desc: "Hand-painted fine art portrait with classical studio lighting."
    },
    {
      id: "art-14",
      name: "Zara the Bengal",
      breed: "Bengal Leopard Companion",
      medium: "digital",
      mediumLabel: "Digital Fine Art",
      dimensions: "18\" × 24\" Giclée",
      price: "$210",
      turnaround: "5–7 Days",
      image: "assets/images/gallery/port_digital_bengal.jpg",
      alt: "Zara Bengal Leopard Cat Digital Art Painting",
      desc: "Vibrant leopard rosettes and emerald eyes in rich jewel tones."
    },
    {
      id: "art-15",
      name: "Koji of Tokyo",
      breed: "Red Shiba Inu",
      medium: "digital",
      mediumLabel: "Digital Fine Art",
      dimensions: "16\" × 20\" Giclée",
      price: "$180",
      turnaround: "5–7 Days",
      image: "assets/images/gallery/port_digital_shiba.jpg",
      alt: "Koji Red Shiba Inu Digital Pet Portrait",
      desc: "Warm sunset palette highlighting alert fox-like poise."
    },
    {
      id: "art-16",
      name: "Shadowfax",
      breed: "Friesian Stallion",
      medium: "digital",
      mediumLabel: "Digital Fine Art",
      dimensions: "24\" × 36\" Giclée",
      price: "$320",
      turnaround: "7–10 Days",
      image: "assets/images/gallery/port_digital_horse.jpg",
      alt: "Shadowfax Friesian Stallion Celestial Digital Painting",
      desc: "Monumental equestrian study with flowing mane and atmospheric tones."
    }
  ];

  var currentFilteredList = ARTWORKS.slice();
  var currentLightboxIndex = 0;

  /* ------------------------------------------------------------
     2. Render Gallery Cards
     ------------------------------------------------------------ */
  function renderGallery(items) {
    var grid = document.getElementById("galleryGrid");
    var counter = document.getElementById("galleryCount");
    var emptyMsg = document.getElementById("galleryEmpty");
    if (!grid) return;

    if (counter) {
      counter.textContent = items.length;
    }

    if (items.length === 0) {
      grid.innerHTML = "";
      if (emptyMsg) emptyMsg.classList.remove("d-none");
      return;
    }

    if (emptyMsg) emptyMsg.classList.add("d-none");

    var html = items.map(function (art, index) {
      return (
        '<div class="col-12 col-sm-6 col-lg-3 gallery-item" data-medium="' + art.medium + '" data-id="' + art.id + '">' +
          '<div class="gallery-card">' +
            '<div class="gallery-thumb">' +
              '<img src="' + art.image + '" alt="' + art.alt + '" loading="lazy" width="300" height="300">' +
              '<span class="gallery-badge-medium">' + art.medium.toUpperCase() + '</span>' +
              '<span class="gallery-badge-dim">' + art.dimensions + '</span>' +
              '<div class="gallery-thumb-overlay">' +
                '<button type="button" class="gallery-zoom-btn" data-zoom-index="' + index + '" aria-label="Open high-res view of ' + art.name + '">' +
                  '<i class="bi bi-arrows-fullscreen"></i>' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<div class="gallery-body">' +
              '<div class="gallery-breed">' + art.breed + '</div>' +
              '<h3 class="gallery-title h5 mb-2">' + art.name + '</h3>' +
              '<p class="gallery-desc">' + art.desc + '</p>' +
              '<div class="gallery-footer">' +
                '<div class="gallery-price">' + art.price + '</div>' +
                '<div class="d-flex align-items-center gap-2">' +
                  '<button type="button" class="btn btn-sm btn-outline-secondary" data-zoom-index="' + index + '" aria-label="Quick view ' + art.name + '">' +
                    '<i class="bi bi-eye"></i>' +
                  '</button>' +
                  '<a href="commission-process.html?medium=' + art.medium + '&portrait=' + encodeURIComponent(art.name) + '" class="btn btn-sm btn-brand">' +
                    'Commission' +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    grid.innerHTML = html;
    bindZoomButtons();
  }

  /* ------------------------------------------------------------
     3. Filter Handlers
     ------------------------------------------------------------ */
  function applyFilter(medium) {
    var pills = document.querySelectorAll(".filter-pill[data-filter]");
    pills.forEach(function (pill) {
      var f = pill.getAttribute("data-filter");
      if (f === medium) {
        pill.classList.add("active");
        pill.setAttribute("aria-pressed", "true");
      } else {
        pill.classList.remove("active");
        pill.setAttribute("aria-pressed", "false");
      }
    });

    if (medium === "all") {
      currentFilteredList = ARTWORKS.slice();
    } else {
      currentFilteredList = ARTWORKS.filter(function (art) {
        return art.medium === medium;
      });
    }

    renderGallery(currentFilteredList);
  }

  function initFilterPills() {
    var pills = document.querySelectorAll(".filter-pill[data-filter]");
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        var m = this.getAttribute("data-filter");
        applyFilter(m);
      });
    });

    // Check URL search param (?medium=...)
    var params = new URLSearchParams(window.location.search);
    var mediumParam = params.get("medium");
    if (mediumParam && ["watercolor", "pencil", "acrylic", "digital"].indexOf(mediumParam.toLowerCase()) !== -1) {
      applyFilter(mediumParam.toLowerCase());
    } else {
      applyFilter("all");
    }
  }

  /* ------------------------------------------------------------
     4. Accessible Lightbox Modal
     ------------------------------------------------------------ */
  var lightboxModal = null;

  function bindZoomButtons() {
    var btns = document.querySelectorAll("[data-zoom-index]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var idx = parseInt(this.getAttribute("data-zoom-index"), 10);
        openLightbox(idx);
      });
    });
  }

  function openLightbox(index) {
    if (index < 0 || index >= currentFilteredList.length) return;
    currentLightboxIndex = index;
    var art = currentFilteredList[index];

    var img = document.getElementById("lightboxImg");
    var title = document.getElementById("lightboxTitle");
    var breed = document.getElementById("lightboxBreed");
    var medium = document.getElementById("lightboxMedium");
    var dim = document.getElementById("lightboxDim");
    var price = document.getElementById("lightboxPrice");
    var turnaround = document.getElementById("lightboxTurnaround");
    var desc = document.getElementById("lightboxDesc");
    var cta = document.getElementById("lightboxCta");
    var counter = document.getElementById("lightboxCounter");

    if (img) {
      img.src = art.image;
      img.alt = art.alt;
    }
    if (title) title.textContent = art.name;
    if (breed) breed.textContent = art.breed;
    if (medium) medium.textContent = art.mediumLabel;
    if (dim) dim.textContent = art.dimensions;
    if (price) price.textContent = art.price;
    if (turnaround) turnaround.textContent = art.turnaround;
    if (desc) desc.textContent = art.desc;
    if (counter) counter.textContent = (currentLightboxIndex + 1) + " / " + currentFilteredList.length;

    if (cta) {
      cta.href = "commission-process.html?medium=" + art.medium + "&portrait=" + encodeURIComponent(art.name);
    }

    var modalEl = document.getElementById("artworkLightbox");
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      if (!lightboxModal) {
        lightboxModal = new bootstrap.Modal(modalEl);
      }
      lightboxModal.show();
    }
  }

  function prevArtwork() {
    if (currentFilteredList.length <= 1) return;
    var prev = (currentLightboxIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
    openLightbox(prev);
  }

  function nextArtwork() {
    if (currentFilteredList.length <= 1) return;
    var next = (currentLightboxIndex + 1) % currentFilteredList.length;
    openLightbox(next);
  }

  function initLightboxKeyboard() {
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");

    if (prevBtn) prevBtn.addEventListener("click", prevArtwork);
    if (nextBtn) nextBtn.addEventListener("click", nextArtwork);

    document.addEventListener("keydown", function (e) {
      var modalEl = document.getElementById("artworkLightbox");
      if (modalEl && modalEl.classList.contains("show")) {
        if (e.key === "ArrowLeft") {
          prevArtwork();
        } else if (e.key === "ArrowRight") {
          nextArtwork();
        }
      }
    });
  }

  /* ------------------------------------------------------------
     5. Initialization on DOMContentLoaded
     ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    initFilterPills();
    initLightboxKeyboard();
  });
})();
