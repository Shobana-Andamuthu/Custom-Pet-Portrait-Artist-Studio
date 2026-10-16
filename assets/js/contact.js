/**
 * PawTrait Atelier — Contact & Commission Request Script
 * Manages URL query pre-fills, interactive medium selectors,
 * drag-and-drop photo previews, validation, and demo success states.
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('commissionForm');
  if (!form) return;

  const dropzone = document.getElementById('photoDropzone');
  const fileInput = document.getElementById('referencePhotos');
  const previewContainer = document.getElementById('uploadPreviewContainer');
  const successContainer = document.getElementById('successReceiptContainer');
  const formCard = document.getElementById('commissionFormCard');
  const resetBtn = document.getElementById('btnResetInquiry');

  // Track uploaded files in memory
  let attachedFiles = [];

  // =========================================================================
  // 1. URL Query Parameter Initialization
  // =========================================================================
  function initFromQueryParams() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      
      // Inquiry Type (?type=consultation, etc.)
      const qType = urlParams.get('type');
      if (qType) {
        const inquirySelect = document.getElementById('inquiryType');
        if (inquirySelect) {
          if (qType.toLowerCase().includes('consult')) {
            inquirySelect.value = 'consultation';
          } else if (qType.toLowerCase().includes('memorial')) {
            inquirySelect.value = 'memorial';
          } else if (qType.toLowerCase().includes('gift')) {
            inquirySelect.value = 'gift';
          }
        }
      }

      // Medium Selector (?medium=watercolor, oil, charcoal, acrylic)
      const qMedium = urlParams.get('medium');
      if (qMedium) {
        const mediumInput = document.querySelector(`input[name="preferredMedium"][value="${qMedium.toLowerCase()}"]`);
        if (mediumInput) {
          mediumInput.checked = true;
          updateMediumCardUI();
        }
      }

      // Plan / Tier (?plan=heirloom, signature, miniature)
      const qPlan = urlParams.get('plan');
      if (qPlan) {
        const sizeSelect = document.getElementById('portraitSize');
        if (sizeSelect) {
          if (qPlan.toLowerCase().includes('mini')) {
            sizeSelect.value = '8x10';
          } else if (qPlan.toLowerCase().includes('heirloom')) {
            sizeSelect.value = '20x24';
            // Also select oil
            const oilRadio = document.querySelector('input[name="preferredMedium"][value="oil"]');
            if (oilRadio) {
              oilRadio.checked = true;
              updateMediumCardUI();
            }
          } else {
            sizeSelect.value = '16x20';
          }
        }
      }
    } catch (e) {
      console.warn('Error reading query params:', e);
    }
  }

  // =========================================================================
  // 2. Medium Option Radio Card Behavior & Keyboard Navigation
  // =========================================================================
  const mediumCards = document.querySelectorAll('.medium-option-card');

  function updateMediumCardUI() {
    mediumCards.forEach((card) => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
      } else {
        card.classList.remove('selected');
        card.setAttribute('aria-checked', 'false');
      }
    });
  }

  mediumCards.forEach((card) => {
    card.addEventListener('click', function (e) {
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        updateMediumCardUI();
        clearValidationState(radio);
      }
    });

    // Keyboard accessibility: Enter or Space
    card.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          updateMediumCardUI();
          clearValidationState(radio);
        }
      }
    });
  });

  // =========================================================================
  // 3. Reference Photo Drag & Drop with Live Thumbnails
  // =========================================================================
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length) {
        handleFiles(dt.files);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length) {
        handleFiles(e.target.files);
      }
    });
  }

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`File "${file.name}" is not an image.`);
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 15MB limit.`);
        return;
      }
      if (attachedFiles.length >= 8) {
        alert('You have reached the maximum of 8 reference photos.');
        return;
      }

      attachedFiles.push(file);
      renderPreview(file, attachedFiles.length - 1);
    });
  }

  function renderPreview(file, index) {
    if (!previewContainer) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const card = document.createElement('div');
      card.className = 'upload-preview-card';
      card.setAttribute('data-index', index);

      const sizeKb = (file.size / 1024).toFixed(0);
      card.innerHTML = `
        <img src="${e.target.result}" alt="Uploaded reference preview">
        <button type="button" class="btn-remove" aria-label="Remove image" title="Remove image">
          <i class="bi bi-x"></i>
        </button>
      `;

      card.querySelector('.btn-remove').addEventListener('click', function (evt) {
        evt.stopPropagation();
        removeFile(index);
      });

      previewContainer.appendChild(card);
    };
    reader.readAsDataURL(file);
  }

  function removeFile(index) {
    attachedFiles.splice(index, 1);
    rebuildPreviews();
  }

  function rebuildPreviews() {
    if (!previewContainer) return;
    previewContainer.innerHTML = '';
    const tempFiles = [...attachedFiles];
    attachedFiles = [];
    handleFiles(tempFiles);
  }

  // =========================================================================
  // 4. Client-side Form Validation
  // =========================================================================
  function clearValidationState(el) {
    if (!el) return;
    el.classList.remove('is-invalid');
    el.classList.remove('is-valid');
  }

  // Realtime clear on input
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      clearValidationState(input);
    });
    input.addEventListener('change', () => {
      clearValidationState(input);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    let isValid = true;
    let firstInvalid = null;

    function markInvalid(element, msg) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      isValid = false;
      if (!firstInvalid) firstInvalid = element;
    }

    function markValid(element) {
      element.classList.remove('is-invalid');
      element.classList.add('is-valid');
    }

    // Customer Name
    const customerName = document.getElementById('customerName');
    if (!customerName.value.trim()) {
      markInvalid(customerName);
    } else {
      markValid(customerName);
    }

    // Customer Email
    const customerEmail = document.getElementById('customerEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.value.trim() || !emailRegex.test(customerEmail.value.trim())) {
      markInvalid(customerEmail);
    } else {
      markValid(customerEmail);
    }

    // Pet Name
    const petName = document.getElementById('petName');
    if (!petName.value.trim()) {
      markInvalid(petName);
    } else {
      markValid(petName);
    }

    // Pet Species
    const petType = document.getElementById('petType');
    if (!petType.value) {
      markInvalid(petType);
    } else {
      markValid(petType);
    }

    // Number of Pets
    const petCount = document.getElementById('petCount');
    if (!petCount.value) {
      markInvalid(petCount);
    } else {
      markValid(petCount);
    }

    // Preferred Medium (Radio group)
    const selectedMedium = form.querySelector('input[name="preferredMedium"]:checked');
    const mediumContainer = document.getElementById('mediumSelectorContainer');
    if (!selectedMedium) {
      if (mediumContainer) {
        mediumContainer.classList.add('border', 'border-danger', 'rounded-3', 'p-2');
      }
      isValid = false;
      if (!firstInvalid) firstInvalid = mediumContainer;
    } else if (mediumContainer) {
      mediumContainer.classList.remove('border', 'border-danger', 'rounded-3', 'p-2');
    }

    // Portrait Size
    const portraitSize = document.getElementById('portraitSize');
    if (!portraitSize.value) {
      markInvalid(portraitSize);
    } else {
      markValid(portraitSize);
    }

    // Budget Range
    const budgetRange = document.getElementById('budgetRange');
    if (!budgetRange.value) {
      markInvalid(budgetRange);
    } else {
      markValid(budgetRange);
    }

    // Desired Timeframe
    const timeframe = document.getElementById('timeframe');
    if (!timeframe.value) {
      markInvalid(timeframe);
    } else {
      markValid(timeframe);
    }

    if (!isValid) {
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof firstInvalid.focus === 'function') {
          firstInvalid.focus();
        }
      }
      return;
    }

    // =========================================================================
    // 5. Success State Display (Demo Simulation)
    // =========================================================================
    const submitBtn = document.getElementById('btnSubmitInquiry');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Validating & Preparing Consultation...`;

    setTimeout(() => {
      // Generate clean simulated inquiry ID
      const inquiryId = 'ATELIER-' + Math.floor(1000 + Math.random() * 9000);
      const mediumLabelMap = {
        watercolor: 'Botanical Watercolor on Arches Rag',
        oil: 'Classical Oil on Belgian Linen',
        charcoal: 'Charcoal & Graphite on Fabriano',
        acrylic: 'Acrylic & Gouache on Canvas',
        recommendation: "Artist's Curated Recommendation"
      };

      const mediumText = mediumLabelMap[selectedMedium.value] || selectedMedium.value;
      const sizeText = portraitSize.options[portraitSize.selectedIndex].text;
      const budgetText = budgetRange.options[budgetRange.selectedIndex].text;
      const timeframeText = timeframe.options[timeframe.selectedIndex].text;
      const petTypeText = petType.options[petType.selectedIndex].text;
      const petCountText = petCount.options[petCount.selectedIndex].text;

      // Fill success receipt
      document.getElementById('receiptInquiryId').textContent = '#' + inquiryId;
      document.getElementById('receiptCustomerName').textContent = customerName.value.trim();
      document.getElementById('receiptCustomerEmail').textContent = customerEmail.value.trim();
      document.getElementById('receiptPetSummary').textContent = `${petName.value.trim()} (${petTypeText}, ${petCountText})`;
      document.getElementById('receiptMedium').textContent = mediumText;
      document.getElementById('receiptSize').textContent = sizeText;
      document.getElementById('receiptBudget').textContent = budgetText;
      document.getElementById('receiptTimeframe').textContent = timeframeText;
      document.getElementById('receiptPhotosCount').textContent = `${attachedFiles.length} photo(s) selected`;

      // Hide form card and display success receipt
      formCard.style.display = 'none';
      successContainer.style.display = 'block';
      successContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 600);
  });

  // Reset Inquiry / New Submission
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      attachedFiles = [];
      if (previewContainer) previewContainer.innerHTML = '';
      form.querySelectorAll('.is-valid, .is-invalid').forEach(el => clearValidationState(el));
      updateMediumCardUI();

      successContainer.style.display = 'none';
      formCard.style.display = 'block';
      formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Initialize query parameters & default state
  initFromQueryParams();
  updateMediumCardUI();
});
