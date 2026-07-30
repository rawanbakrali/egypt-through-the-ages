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

    // 4. Data Set for Era Landmarks
    const locations = [
        {
            name: "Giza Pyramids",
            era: "ancient",
            color: "#F59E0B", // Orange
            coords: [29.9792, 31.1342],
            slug: "giza-pyramids"
        },
        {
            name: "Lighthouse of Alexandria",
            era: "greco",
            color: "#2563EB", // Blue
            coords: [31.2139, 29.8850],
            slug: "lighthouse-alexandria"
        },
        {
            name: "The Hanging Church",
            era: "coptic",
            color: "#7C3AED", // Purple
            coords: [30.0053, 31.2301],
            slug: "hanging-church"
        },
        {
            name: "Al-Azhar Mosque",
            era: "islamic",
            color: "#16A34A", // Green
            coords: [30.0457, 31.2627],
            slug: "al-azhar-mosque"
        },
        {
            name: "Cairo Tower",
            era: "modern",
            color: "#64748B", // Gray
            coords: [30.0459, 31.2243],
            slug: "cairo-tower"
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

        const popupContent = `
            <div class="map-popup-card">
                <span class="popup-era-tag" style="color: ${loc.color};">${loc.era.toUpperCase()} EGYPT</span>
                <h4 class="popup-title">${loc.name}</h4>
                <a href="/place/${loc.slug}" class="popup-btn">Explore Site →</a>
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