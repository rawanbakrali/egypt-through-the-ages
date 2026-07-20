// public/js/reviews.js

(function () {
  const overlay = document.getElementById('reviewModalOverlay');
  const closeBtn = document.getElementById('reviewModalClose');
  const cancelBtn = document.getElementById('reviewCancelBtn');
  const saveBtn = document.getElementById('reviewSaveBtn');
  const stars = document.querySelectorAll('.review-star');
  const starContainer = document.getElementById('reviewStarRating');
  const textarea = document.getElementById('reviewTextarea');
  const imageInput = document.getElementById('reviewImageInput');
  const previewGrid = document.getElementById('reviewImagePreviewGrid');
  const tagInput = document.getElementById('reviewTagInput');
  const tagChipsContainer = document.getElementById('reviewTagChips');
  const listSelect = document.getElementById('reviewListSelect');

  let currentRating = 0;
  let activePlaceSlug = null;
  let uploadedImages = []; // { file, dataUrl }
  let reviewTags = []; // string[]

  const galleryGrid = document.getElementById('galleryGrid');
  const galleryEmptyMessage = document.getElementById('galleryEmptyMessage');
  let galleryImages = []; // dataUrls from all submitted reviews, in-session only
  const reviewList = document.querySelector('.review-list');

  function renderNewReviewCard(reviewData) {
    if (!reviewList) return;

    const starsFilled = '★'.repeat(reviewData.rating) + '☆'.repeat(5 - reviewData.rating);

    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-card-header">
        <div class="review-avatar">YOU</div>
        <div class="review-card-meta">
          <h4>You</h4>
          <span class="review-card-stars">${starsFilled}</span>
        </div>
      </div>
      <div class="review-card-tags">
        ${reviewData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <p class="review-card-text">
        ${reviewData.review || '(No written review provided.)'}
      </p>
    `;

    // Insert new reviews at the top, above existing/example reviews
    reviewList.insertBefore(card, reviewList.firstChild);
  }

  function addImagesToGallery(dataUrls) {
    if (!galleryGrid || dataUrls.length === 0) return;
    galleryImages.push(...dataUrls);
    renderGallery();
  }

  function renderGallery() {
    if (!galleryGrid) return;
    if (galleryImages.length === 0) {
      if (galleryEmptyMessage) galleryEmptyMessage.style.display = 'block';
      return;
    }
    if (galleryEmptyMessage) galleryEmptyMessage.style.display = 'none';

    galleryGrid.querySelectorAll('img').forEach(img => img.remove());
    galleryImages.forEach(dataUrl => {
      const img = document.createElement('img');
      img.src = dataUrl;
      img.alt = 'User-submitted review photo';
      img.addEventListener('click', () => openLightbox(dataUrl));
      galleryGrid.appendChild(img);
    });
  }

  const lightboxOverlay = document.getElementById('galleryLightboxOverlay');
  const lightboxImg = document.getElementById('galleryLightboxImg');
  const lightboxClose = document.getElementById('galleryLightboxClose');

  function openLightbox(dataUrl) {
    if (!lightboxOverlay || !lightboxImg) return;
    lightboxImg.src = dataUrl;
    lightboxOverlay.classList.add('is-open');
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('is-open');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  function openReviewModal(placeSlug) {
    activePlaceSlug = placeSlug || null;
    currentRating = 0;
    textarea.value = '';
    uploadedImages = [];
    reviewTags = [];
    renderImagePreviews();
    renderTagChips();
    tagInput.value = '';
    listSelect.value = '';
    updateStars(0);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function renderImagePreviews() {
    previewGrid.innerHTML = '';
    uploadedImages.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'review-image-preview-item';
      item.innerHTML = `
        <img src="${img.dataUrl}" alt="Review photo preview">
        <button type="button" class="review-image-remove-btn" data-index="${index}" aria-label="Remove photo">&times;</button>
      `;
      previewGrid.appendChild(item);
    });
  }

  imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedImages.push({ file, dataUrl: event.target.result });
        renderImagePreviews();
      };
      reader.readAsDataURL(file);
    });
    imageInput.value = ''; // allow re-selecting the same file
  });

  previewGrid.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.review-image-remove-btn');
    if (!removeBtn) return;
    const index = parseInt(removeBtn.dataset.index, 10);
    uploadedImages.splice(index, 1);
    renderImagePreviews();
  });

  function renderTagChips() {
    tagChipsContainer.innerHTML = '';
    reviewTags.forEach((tag, index) => {
      const chip = document.createElement('span');
      chip.className = 'review-tag-chip';
      chip.innerHTML = `
        ${tag}
        <button type="button" class="review-tag-remove-btn" data-index="${index}" aria-label="Remove tag">&times;</button>
      `;
      tagChipsContainer.appendChild(chip);
    });
  }

  function addTagFromInput() {
    const value = tagInput.value.trim().replace(/,$/, '');
    if (value && !reviewTags.includes(value)) {
      reviewTags.push(value);
      renderTagChips();
    }
    tagInput.value = '';
  }

  tagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTagFromInput();
    } else if (e.key === 'Backspace' && tagInput.value === '' && reviewTags.length > 0) {
      reviewTags.pop();
      renderTagChips();
    }
  });

  tagChipsContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.review-tag-remove-btn');
    if (!removeBtn) return;
    const index = parseInt(removeBtn.dataset.index, 10);
    reviewTags.splice(index, 1);
    renderTagChips();
  });

  function closeReviewModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateStars(rating) {
    stars.forEach((star) => {
      const value = parseInt(star.dataset.value, 10);
      star.classList.toggle('is-filled', value <= rating);
    });
  }

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.value, 10);
      updateStars(currentRating);
    });
    star.addEventListener('mouseenter', () => {
      updateStars(parseInt(star.dataset.value, 10));
    });
  });

  starContainer.addEventListener('mouseleave', () => {
    updateStars(currentRating);
  });

  closeBtn.addEventListener('click', closeReviewModal);
  cancelBtn.addEventListener('click', closeReviewModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeReviewModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeReviewModal();
    }
  });

  saveBtn.addEventListener('click', () => {
    if (currentRating === 0) {
      alert('Please select a star rating before saving.');
      return;
    }

    const reviewData = {
      placeSlug: activePlaceSlug,
      rating: currentRating,
      review: textarea.value.trim(),
      images: uploadedImages.map((img) => img.file.name),
      tags: reviewTags,
      listName: listSelect.value || null, // placeholder source — will come from user's real lists once profile/backend exist
    };

    // Frontend-only phase: no backend/API yet, per roadmap Point 16.
    console.log('Review saved (local only):', reviewData);

    // Feed this review's photos into the in-session Gallery tab
    addImagesToGallery(uploadedImages.map((img) => img.dataUrl));

    // Feed this review itself into the in-session Reviews tab
    renderNewReviewCard(reviewData);

    closeReviewModal();
  });

  window.openReviewModal = openReviewModal;
})();