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

  let currentRating = 0;
  let activePlaceId = null;
  let uploadedFiles = []; // { file, dataUrl } — dataUrl is just for local preview
  let reviewTags = [];

  const galleryGrid = document.getElementById('galleryGrid');
  const galleryEmptyMessage = document.getElementById('galleryEmptyMessage');

  // FETCH + RENDER REVIEWS FOR A PLACE (real backend)

  async function refreshPlaceReviews(placeId) {
    try {
      const res = await fetch(`/reviews/place/${placeId}`);
      const data = await res.json();
      if (!data.success) return;

      renderRating(data.summary);
      renderReviewList(data.reviews);
      renderGalleryFromReviews(data.reviews);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  }
  window.refreshPlaceReviews = refreshPlaceReviews;

  function renderRating(summary) {
    const starsEl = document.querySelector('.stars');
    const ratingTextEl = document.querySelector('.rating-text');
    if (!starsEl || !ratingTextEl) return;

    if (summary) {
      const rounded = Math.round(summary.average);
      starsEl.innerText = '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded);
      ratingTextEl.innerText = `${summary.average.toFixed(1)} (${summary.count} review${summary.count === 1 ? '' : 's'})`;
    } else {
      starsEl.innerText = '☆☆☆☆☆';
      ratingTextEl.innerText = 'No ratings yet';
    }
  }

  function renderReviewList(reviews) {
    const reviewList = document.getElementById('reviewList');
    const reviewEmptyMessage = document.getElementById('reviewEmptyMessage');
    if (!reviewList) return;

    reviewList.querySelectorAll('.review-card').forEach(card => card.remove());

    if (reviews.length === 0) {
      if (reviewEmptyMessage) reviewEmptyMessage.style.display = 'block';
      return;
    }
    if (reviewEmptyMessage) reviewEmptyMessage.style.display = 'none';

    reviews.forEach((review) => {
      const starsFilled = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-card-header">
          <div class="review-avatar">${review.username.slice(0, 2).toUpperCase()}</div>
          <div class="review-card-meta">
            <h4>${review.username}</h4>
            <span class="review-card-stars">${starsFilled}</span>
          </div>
        </div>
        <div class="review-card-tags">
          ${review.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <p class="review-card-text">
          ${review.reviewText || '(No written review provided.)'}
        </p>
      `;

      // Show a delete option only on the current user's own review
      if (window.CURRENT_USER_ID && review.ownerId === window.CURRENT_USER_ID) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'review-delete-btn';
        deleteBtn.textContent = 'Delete my review';
        deleteBtn.addEventListener('click', () => deleteReview(review.id));
        card.appendChild(deleteBtn);
      }

      reviewList.appendChild(card);
    });
  }

  async function deleteReview(reviewId) {
    if (!confirm('Delete this review? This cannot be undone.')) return;
    try {
      const res = await fetch(`/reviews/${reviewId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success && activePlaceId) {
        refreshPlaceReviews(activePlaceId);
      } else if (window.showToast) {
        window.showToast(data.message || 'Failed to delete review.');
      }
    } catch (err) {
      if (window.showToast) window.showToast('Network error — could not delete review.');
    }
  }

  function renderGalleryFromReviews(reviews) {
    if (!galleryGrid) return;
    galleryGrid.querySelectorAll('img').forEach(img => img.remove());

    const allImages = reviews.flatMap(r => r.images || []);
    if (allImages.length === 0) {
      if (galleryEmptyMessage) galleryEmptyMessage.style.display = 'block';
      return;
    }
    if (galleryEmptyMessage) galleryEmptyMessage.style.display = 'none';

    allImages.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'User-submitted review photo';
      img.addEventListener('click', () => openLightbox(url));
      galleryGrid.appendChild(img);
    });
  }

  const lightboxOverlay = document.getElementById('galleryLightboxOverlay');
  const lightboxImg = document.getElementById('galleryLightboxImg');
  const lightboxClose = document.getElementById('galleryLightboxClose');

  function openLightbox(src) {
    if (!lightboxOverlay || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxOverlay.classList.add('is-open');
  }
  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('is-open');
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => { if (e.target === lightboxOverlay) closeLightbox(); });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('is-open')) closeLightbox();
  });

  // REVIEW MODAL
  function openReviewModal(placeId) {
    activePlaceId = placeId;
    currentRating = 0;
    textarea.value = '';
    uploadedFiles = [];
    reviewTags = [];
    renderImagePreviews();
    renderTagChips();
    tagInput.value = '';
    updateStars(0);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  window.openReviewModal = openReviewModal;

  function closeReviewModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function renderImagePreviews() {
    previewGrid.innerHTML = '';
    uploadedFiles.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'review-image-preview-item';
      el.innerHTML = `
        <img src="${item.dataUrl}" alt="Review photo preview">
        <button type="button" class="review-image-remove-btn" data-index="${index}" aria-label="Remove photo">&times;</button>
      `;
      previewGrid.appendChild(el);
    });
  }

  imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedFiles.push({ file, dataUrl: event.target.result });
        renderImagePreviews();
      };
      reader.readAsDataURL(file);
    });
    imageInput.value = '';
  });

  previewGrid.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.review-image-remove-btn');
    if (!removeBtn) return;
    uploadedFiles.splice(parseInt(removeBtn.dataset.index, 10), 1);
    renderImagePreviews();
  });

  function renderTagChips() {
    tagChipsContainer.innerHTML = '';
    reviewTags.forEach((tag, index) => {
      const chip = document.createElement('span');
      chip.className = 'review-tag-chip';
      chip.innerHTML = `${tag} <button type="button" class="review-tag-remove-btn" data-index="${index}" aria-label="Remove tag">&times;</button>`;
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
    reviewTags.splice(parseInt(removeBtn.dataset.index, 10), 1);
    renderTagChips();
  });

  function updateStars(rating) {
    stars.forEach((star) => {
      star.classList.toggle('is-filled', parseInt(star.dataset.value, 10) <= rating);
    });
  }
  stars.forEach((star) => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.value, 10);
      updateStars(currentRating);
    });
    star.addEventListener('mouseenter', () => updateStars(parseInt(star.dataset.value, 10)));
  });
  starContainer.addEventListener('mouseleave', () => updateStars(currentRating));

  closeBtn.addEventListener('click', closeReviewModal);
  cancelBtn.addEventListener('click', closeReviewModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeReviewModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeReviewModal();
  });

  // SAVE — real upload + real review creation
  saveBtn.addEventListener('click', async () => {
    if (currentRating === 0) {
      if (window.showToast) window.showToast('Please select a star rating before saving.');
      return;
    }
    if (!activePlaceId) return;

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    try {
      // Upload any attached photos first, collecting their real server URLs
      const imageUrls = [];
      for (const item of uploadedFiles) {
        const formData = new FormData();
        formData.append('image', item.file);
        const uploadRes = await fetch('/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.success) imageUrls.push(uploadData.url);
      }

      const res = await fetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeId: activePlaceId,
          rating: currentRating,
          reviewText: textarea.value.trim(),
          tags: reviewTags,
          images: imageUrls
        })
      });
      const data = await res.json();

      if (!data.success) {
        if (window.showToast) window.showToast(data.message || 'Failed to save review.');
        return;
      }

      closeReviewModal();
      refreshPlaceReviews(activePlaceId);
    } catch (err) {
      if (window.showToast) window.showToast('Network error — could not save review.');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Review';
    }
  });
})();