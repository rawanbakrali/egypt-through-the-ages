document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. TAB SWITCHING LOGIC
    // ==========================================
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-tab');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // 2. MAP INITIALIZATION
    // ==========================================
    // Crucial: This must exactly match the ID in your HTML (<div id="era-map"></div>)
    const map = L.map('era-map', {
        center: window.ERA_DATA.mapCenter,
        zoom: window.ERA_DATA.mapZoom,
        zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    // ==========================================
    // 3. MAP DATA (now sourced from window.ERA_DATA)
    // ==========================================
    const markersData = window.ERA_DATA.markersData;

    let currentMarkers = [];
    let activeCity = null;
    let activeCategory = 'All Sites';

    // ==========================================
    // 4. RENDER MARKERS & UPDATE PANEL
    // ==========================================
    function renderMarkers() {
        // Clear existing map pins
        currentMarkers.forEach(m => map.removeLayer(m));
        currentMarkers = [];

        markersData.forEach(loc => {
            // Check if this location matches our active filters
            if (activeCity && loc.city !== activeCity) return;
            if (activeCategory !== 'All Sites' && loc.category !== activeCategory) return;

            const markerColor = window.ERA_DATA.markerColor;
            const icon = L.divIcon({
                className: 'custom-map-marker',
                html: `<div class="marker-pin" style="background-color: ${markerColor}; box-shadow: 0 0 10px ${markerColor}99; width: 16px; height: 16px; border-radius: 50%; border: 2px solid #050505;"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            const marker = L.marker(loc.coords, { icon }).addTo(map);
            
            // WHEN A PIN IS CLICKED: Swap out the drawer content dynamically
            marker.on('click', () => {
                const allItems = Object.values(categoryData).flat();
                const fullData = allItems.find(d => d.name === loc.name);
                if (fullData) {
                    populateDrawer(fullData);
                } else {
                    document.getElementById('drawerTitle').innerText = loc.name;
                    document.getElementById('drawerLocation').innerText = loc.location;
                    document.getElementById('drawerDesc').innerText = loc.desc;
                }
                openDrawer();
            });

            currentMarkers.push(marker);
        });
    }

    renderMarkers(); // Render on load

    // ==========================================
    // 5. FILTER & CITY CLICK BEHAVIOR
    // ==========================================
    // Category Filters (Mosques, Citadels, etc.)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Change which button is highlighted
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update the map
            activeCategory = e.target.innerText.trim();
            renderMarkers();
        });
    });

    // Top Cities Sidebar (now sourced from window.ERA_DATA)
    const cityCoords = {};
    (window.ERA_DATA.cities || []).forEach(city => {
        cityCoords[city.key] = city.coords;
    });

    document.querySelectorAll('.city-item').forEach(item => {
        item.addEventListener('click', () => {
            const city = item.getAttribute('data-city');
            if (cityCoords[city]) {
                map.flyTo(cityCoords[city], 13, { duration: 1.5 });
                activeCity = city; // Set city filter
                renderMarkers();
            }
        });
    });

    // ==========================================
    // 6. DRAWER LOGIC
    // ==========================================
    const drawer = document.getElementById('monumentDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('closeDrawerBtn');

    // Click a thumbnail to swap it into the main image
    const thumbsContainerEl = document.querySelector('.drawer-thumbnails');
    if (thumbsContainerEl) {
        thumbsContainerEl.addEventListener('click', (e) => {
            const clickedThumb = e.target.closest('img');
            if (!clickedThumb) return;
            const mainImageEl = document.querySelector('.drawer-main-img');
            if (mainImageEl) mainImageEl.src = clickedThumb.src;
        });
    }

    function openDrawer() {
        if (!drawer || !overlay) return;
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeDrawer() {
        if (!drawer || !overlay) return;
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Mini Tab switching inside the drawer
    const drawerTabs = document.querySelectorAll('.drawer-nav-btn');
    const drawerPanelOverview = document.getElementById('drawerPanelOverview');
    const drawerPanelReviews = document.getElementById('drawerPanelReviews');
    const drawerPanelGallery = document.getElementById('drawerPanelGallery');
    const drawerPanelHistory = document.getElementById('drawerPanelHistory');
    const allDrawerPanels = [drawerPanelOverview, drawerPanelReviews, drawerPanelGallery, drawerPanelHistory];

    drawerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            drawerTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabName = tab.innerText.trim();

            // Only Overview, Reviews, and Gallery have real panels built so far.
            // Other tabs (History, Architecture, 3D Tour, Nearby)
            // just visually activate for now, matching current partial build.
            const panelMap = {
                'Overview': drawerPanelOverview,
                'Reviews': drawerPanelReviews,
                'Gallery': drawerPanelGallery,
                'History': drawerPanelHistory
            };

            const targetPanel = panelMap[tabName];
            if (targetPanel) {
                allDrawerPanels.forEach(p => p && p.classList.remove('active'));
                targetPanel.classList.add('active');
            }
        });
    });
    // ==========================================
    // 7. CATEGORY SWITCHER (Single Active State)
    // ==========================================
    const categoryCards = document.querySelectorAll('.feature-card-vertical');
    const dynamicGridContainer = document.getElementById('dynamic-grid-container');
    const dynamicGrid = document.getElementById('dynamicGrid');
    const dynamicGridTitle = document.getElementById('dynamicGridTitle');

    let activeGridCategory = null;

    // ==========================================
    // 7b. CATEGORY DATA (now sourced from window.ERA_DATA)
    // ==========================================
    const categoryData = window.ERA_DATA.categoryData;
    const locationFilterStrip = document.getElementById('locationFilterStrip');
    let activeLocationFilter = 'All';

    function renderLocationFilters(category) {
        const items = categoryData[category] || [];
        const uniqueLocations = new Set(items.map(item => item.location));

        // Only show the filter strip if this category actually has more than one location
        if (uniqueLocations.size <= 1) {
            locationFilterStrip.classList.remove('active');
            locationFilterStrip.innerHTML = '';
            return;
        }

        const locations = ['All', ...uniqueLocations];
        activeLocationFilter = 'All';

        locationFilterStrip.innerHTML = '';
        locations.forEach(loc => {
            const btn = document.createElement('button');
            btn.className = 'location-filter-btn' + (loc === 'All' ? ' active' : '');
            btn.innerText = loc;
            btn.addEventListener('click', () => {
                activeLocationFilter = loc;
                document.querySelectorAll('.location-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderFilteredCards(category);
            });
            locationFilterStrip.appendChild(btn);
        });

        locationFilterStrip.classList.add('active');
    }

    function renderFilteredCards(category) {
        const items = categoryData[category] || [];
        const filtered = activeLocationFilter === 'All'
            ? items
            : items.filter(item => item.location === activeLocationFilter);
        renderCardsIntoGrid(filtered);
        dynamicGridContainer.style.maxHeight = dynamicGridContainer.scrollHeight + 'px';
    }
    // ==========================================
    // 7c. INJECT CATEGORY CARDS
    // ==========================================
    function renderCardsIntoGrid(items) {
        dynamicGrid.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'dynamic-card';
            card.innerHTML = `
                <div class="dynamic-card-image" style="background-image: url('${item.image}');"></div>
                <div class="dynamic-card-info">
                    <h4>${item.name}</h4>
                    <div class="dynamic-card-meta">
                        <span>${item.location}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                populateDrawer(item);
                openDrawer();
            });

            dynamicGrid.appendChild(card);
        });
    }

    function updateDrawerRating(item) {
        const ratingRow = document.getElementById('drawerRatingRow');
        const starsEl = document.querySelector('.stars');
        const ratingTextEl = document.querySelector('.rating-text');
        if (!ratingRow) return;

        const isInteractive = item.interactive !== false;
        if (!isInteractive) {
            ratingRow.style.display = 'none';
            return;
        }
        ratingRow.style.display = 'flex';

        const summary = window.getRatingSummary ? window.getRatingSummary(item.name) : null;
        if (summary) {
            const rounded = Math.round(summary.average);
            if (starsEl) starsEl.innerText = '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded);
            if (ratingTextEl) ratingTextEl.innerText = `${summary.average.toFixed(1)} (${summary.count} review${summary.count === 1 ? '' : 's'})`;
        } else {
            if (starsEl) starsEl.innerText = '☆☆☆☆☆';
            if (ratingTextEl) ratingTextEl.innerText = 'No ratings yet';
        }
    }
    window.updateDrawerRating = updateDrawerRating;
    window.refreshDrawerRating = function () {
        if (window.currentDrawerItem) updateDrawerRating(window.currentDrawerItem);
    };

    function populateDrawer(item) {
        window.currentDrawerItem = item; // tracks which place is currently open, for the Review button + rating refresh

        document.getElementById('drawerTitle').innerText = item.name;
        document.getElementById('drawerLocation').innerText = item.fullLocation;
        document.getElementById('drawerDesc').innerText = item.desc;

        const mainImageEl = document.querySelector('.drawer-main-img');
        if (mainImageEl && item.image) mainImageEl.src = item.image;

        updateDrawerRating(item);
        if (window.renderReviewsForPlace) window.renderReviewsForPlace(item.name);
        if (window.renderGalleryForPlace) window.renderGalleryForPlace(item.name);

        const tagsContainer = document.querySelector('.drawer-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        }

        const thumbsContainer = document.querySelector('.drawer-thumbnails');
        if (thumbsContainer && item.thumbnails) {
            thumbsContainer.innerHTML = item.thumbnails.map(t => `<img src="${t}" alt="Thumb">`).join('');
        }

        const aboutTitle = document.querySelector('.content-col .content-title');
        if (aboutTitle) aboutTitle.innerText = `About ${item.name}`;

        const aboutText = document.querySelector('.content-col .content-text');
        if (aboutText) aboutText.innerText = item.desc;
        const historyTextEl = document.getElementById('drawerHistoryText');
        if (historyTextEl) {
            historyTextEl.innerText = (item.history) || window.ERA_DATA.history || item.desc;
        }

        const quickFactsList = document.querySelector('.quick-facts');
        if (quickFactsList && item.quickFacts) {
            quickFactsList.innerHTML = `
                <li><span class="fact-icon">⏱</span> <strong>Built:</strong> ${item.quickFacts.built}</li>
                <li><span class="fact-icon">👤</span> <strong>Founder:</strong> ${item.quickFacts.founder}</li>
                <li><span class="fact-icon">🏛</span> <strong>Architectural Style:</strong> ${item.quickFacts.style}</li>
                <li><span class="fact-icon">🕌</span> <strong>Function:</strong> ${item.quickFacts.function}</li>
            `;
        }

        const infoGroups = document.querySelectorAll('.info-group p');
        if (infoGroups.length >= 4 && item.visitorInfo) {
            infoGroups[0].innerText = item.visitorInfo.hours;
            infoGroups[1].innerText = item.visitorInfo.bestTime;
            infoGroups[2].innerText = item.visitorInfo.dressCode;
            infoGroups[3].innerText = item.visitorInfo.entryFee;
        }
        const actionsRow = document.getElementById('drawerActionsRow');
        if (actionsRow) {
            const isInteractive = item.interactive !== false; // default true unless explicitly set false
            actionsRow.style.display = isInteractive ? 'flex' : 'none';
        }
        
        const tourThumbnailWrapper = document.getElementById('tourThumbnailWrapper');
        const tourPlayOverlay = document.getElementById('tourPlayOverlay');
        const tour3DFrame = document.getElementById('tour3DFrame');
        const tourComingSoon = document.getElementById('tourComingSoon');

        if (tourThumbnailWrapper && tour3DFrame) {
            // Reset to initial state each time a new place is opened
            tour3DFrame.style.display = 'none';
            tour3DFrame.src = '';

            if (item.embed3D) {
                tourPlayOverlay.style.display = 'flex';
                if (tourComingSoon) tourComingSoon.style.display = 'none';

                tourPlayOverlay.onclick = () => {
                    tour3DFrame.src = item.embed3D;
                    tour3DFrame.style.display = 'block';
                    tourPlayOverlay.style.display = 'none';
                };
            } else {
                tourPlayOverlay.style.display = 'none';
                if (tourComingSoon) tourComingSoon.style.display = 'flex';
            }
        }

        const miniMapFrame = document.getElementById('drawerMiniMapFrame');
        const miniMapLink = document.getElementById('drawerMiniMapLink');
        if (miniMapFrame && miniMapLink) {
            const query = encodeURIComponent(`${item.name}, ${item.fullLocation}`);
            miniMapFrame.src = `https://maps.google.com/maps?q=${query}&output=embed`;
            miniMapLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
        }
    }

    function injectCategory(category) {
        renderLocationFilters(category);
        renderFilteredCards(category);
    }

    function switchCategory(category, cardEl) {
        if (activeGridCategory === category) return;

        categoryCards.forEach(c => c.classList.remove('active-category'));
        cardEl.classList.add('active-category');

        const isFirstOpen = activeGridCategory === null;
        activeGridCategory = category;

        const categoryInfo = (window.ERA_DATA.categories || []).find(c => c.key === category);
        dynamicGridTitle.innerText = categoryInfo ? categoryInfo.label : '';

        if (isFirstOpen) {
            injectCategory(category);
            dynamicGridContainer.classList.add('visible');
            dynamicGridContainer.style.maxHeight = dynamicGridContainer.scrollHeight + 'px';
            scrollToGrid();
        } else {
            dynamicGrid.classList.add('swapping');
            setTimeout(() => {
                injectCategory(category);
                dynamicGrid.classList.remove('swapping');
                dynamicGridContainer.style.maxHeight = dynamicGridContainer.scrollHeight + 'px';
                scrollToGrid();
            }, 150); // Match the CSS transition duration for smoothness
        }
    }

    function scrollToGrid() {
        // Wait a tick for max-height transition to start expanding before scrolling
        setTimeout(() => {
            dynamicGridContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 380);
    }

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category) {
                switchCategory(category, card);
            }
        });
    });
});

