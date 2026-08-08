document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map', {
        center: [26.8206, 30.8025],
        zoom: 6,
        zoomControl: false, // Disabling defaults to style and reposition them cleanly
        minZoom: 5,
        maxZoom: 12
    });

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // 3. Tile Layer: Using CartoDB Positron (light monochrome) for a perfect editorial base
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    // Maps each landmark's short era code to the real era route slug used by /era/:slug
    // (see data/eras.js keys / views/partials/era-strip.ejs for the canonical slugs).
    const ERA_ROUTE_SLUGS = {
        ancient: 'ancient-egypt',
        greco: 'greco-roman',
        coptic: 'coptic',
        islamic: 'islamic',
        modern: 'modern-egypt'
    };

    // 4. Data Set for Era Landmarks
    const locations = [
        {
            name: "Giza Pyramids",
            era: "ancient",
            color: "#F59E0B", // Orange
            coords: [29.9792, 31.1342]
        },
        {
            name: "Lighthouse of Alexandria",
            era: "greco",
            color: "#2563EB", // Blue
            coords: [31.2139, 29.8850]
        },
        {
            name: "The Hanging Church",
            era: "coptic",
            color: "#7C3AED", // Purple
            coords: [30.0053, 31.2301]
        },
        {
            name: "Al-Azhar Mosque",
            era: "islamic",
            color: "#16A34A", // Green
            coords: [30.0457, 31.2627]
        },
        {
            name: "Cairo Tower",
            era: "modern",
            color: "#64748B", // Gray
            coords: [30.0459, 31.2243]
        }
    ];

    // 5. Generate and Add Markers
    locations.forEach(loc => {
        // Create custom HTML markers to avoid loading heavy image assets
        const markerIcon = L.divIcon({
            className: 'custom-map-marker',
            html: `<div class="marker-pin" style="background-color: ${loc.color}; box-shadow: 0 0 10px ${loc.color}80;"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        // There's no standalone /place/:slug page in this app — individual places only
        // open inside the era page's drawer — so the marker links to that place's era
        // page, and passes ?openPlace=<name> so era.js auto-opens that place's drawer
        // (instead of just landing on the era page with nothing open).
        const eraHref = `/era/${ERA_ROUTE_SLUGS[loc.era] || loc.era}?openPlace=${encodeURIComponent(loc.name)}`;

        const popupContent = `
            <div class="map-popup-card">
                <span class="popup-era-tag" style="color: ${loc.color};">${loc.era.toUpperCase()} EGYPT</span>
                <h4 class="popup-title">${loc.name}</h4>
                <a href="${eraHref}" class="popup-btn">Explore Site &rarr;</a>
            </div>
        `;

        L.marker(loc.coords, { icon: markerIcon })
            .addTo(map)
            .bindPopup(popupContent, {
                closeButton: false,
                offset: [0, -5]
            });
    });
});