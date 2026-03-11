// ============================================
// MAP — Leaflet map, routes, and driving animation
// ============================================

let map = null;
let routeLayer = null;
let markerLayer = null;
let vanMarker = null;
let animationId = null;
let currentRouteCoords = [];

// Austria bounds
const AUSTRIA_CENTER = [47.5, 14.0];
const AUSTRIA_ZOOM = 7;

function initMap() {
    map = L.map('map', {
        center: AUSTRIA_CENTER,
        zoom: AUSTRIA_ZOOM,
        zoomControl: true,
        attributionControl: true
    });

    // CartoDB Voyager tiles — colorful and friendly
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 18
    }).addTo(map);

    routeLayer = L.layerGroup().addTo(map);
    markerLayer = L.layerGroup().addTo(map);
}

// ---- Show overview of all routes ----
function showOverview() {
    clearMap();
    stopAnimation();

    const colors = TRIP.days.map(d => d.color);
    const allCoords = [];

    TRIP.days.forEach((day, i) => {
        if (day.route.length < 2) return;
        const coords = day.route.map(r => r.coords);
        allCoords.push(...coords);

        // Draw route polyline
        const polyline = L.polyline(coords, {
            color: colors[i],
            weight: 4,
            opacity: 0.75,
            dashArray: '8, 6',
            lineCap: 'round'
        }).addTo(routeLayer);

        // Start marker
        const startPoint = day.route[0];
        createMarker(startPoint, colors[i]).addTo(markerLayer);

        // End marker (only if different from next day's start)
        const endPoint = day.route[day.route.length - 1];
        createMarker(endPoint, colors[i]).addTo(markerLayer);
    });

    if (allCoords.length > 0) {
        map.invalidateSize();
        map.fitBounds(L.latLngBounds(allCoords).pad(0.15));
    }

    updateMapLabel('🗺️ TRIP OVERVIEW');
    document.getElementById('animate-btn').style.display = 'none';
}

// ---- Show a specific day's route ----
function showDayRoute(dayIndex) {
    clearMap();
    stopAnimation();

    const day = TRIP.days[dayIndex];
    if (!day || day.route.length === 0) return;

    const coords = day.route.map(r => r.coords);
    currentRouteCoords = coords;

    // Draw the route polyline
    const routeLine = L.polyline(coords, {
        color: day.color,
        weight: 5,
        opacity: 0.8,
        dashArray: '12, 8',
        lineCap: 'round'
    }).addTo(routeLayer);

    // Add markers for each stop
    day.route.forEach((point, idx) => {
        const marker = createMarker(point, day.color);
        marker.addTo(markerLayer);

        // Add popup
        marker.bindPopup(`
      <div class="marker-popup">
        <div class="popup-icon">${point.icon}</div>
        <div class="popup-name">${point.name}</div>
      </div>
    `, { closeButton: false, offset: [0, -10] });

        // Auto-open first and last
        if (idx === 0 || idx === day.route.length - 1) {
            marker.on('add', function () {
                setTimeout(() => this.openPopup(), 300 + idx * 200);
            });
        }
    });

    // Fit bounds
    map.invalidateSize();
    if (coords.length > 1) {
        map.fitBounds(L.latLngBounds(coords).pad(0.2));
    } else {
        map.setView(coords[0], 12);
    }

    updateMapLabel(`${day.icon} DAY ${day.id} — ${day.title}`);

    // Show drive button only for days with routes > 2 points
    const driveBtn = document.getElementById('animate-btn');
    driveBtn.style.display = coords.length > 2 ? 'block' : 'none';
}

// ---- Create an emoji marker ----
function createMarker(point, color) {
    const icon = L.divIcon({
        html: `<span>${point.icon}</span>`,
        className: 'emoji-marker',
        iconSize: [35, 35],
        iconAnchor: [17, 17]
    });

    return L.marker(point.coords, { icon: icon });
}

// ---- Animate van driving along route ----
function animateDriving() {
    if (currentRouteCoords.length < 2) return;

    stopAnimation();

    // Interpolate the route for smooth animation
    const path = interpolateRoute(currentRouteCoords, 300);

    // Create van marker
    const vanIcon = L.divIcon({
        html: '<div class="van-marker">🚐</div>',
        className: 'emoji-marker van-moving',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    vanMarker = L.marker(path[0], {
        icon: vanIcon,
        zIndexOffset: 1000
    }).addTo(markerLayer);

    // Create trail polyline
    const trail = L.polyline([], {
        color: '#e53935',
        weight: 4,
        opacity: 0.9
    }).addTo(routeLayer);

    const duration = 5000; // 5 seconds
    const startTime = performance.now();

    function step(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentIndex = Math.floor(progress * (path.length - 1));

        vanMarker.setLatLng(path[currentIndex]);
        trail.setLatLngs(path.slice(0, currentIndex + 1));

        // Keep van centered-ish (only pan when near edges)
        if (currentIndex % 30 === 0) {
            map.panTo(path[currentIndex], { animate: true, duration: 0.5 });
        }

        if (progress < 1) {
            animationId = requestAnimationFrame(step);
        } else {
            // Animation complete — remove van class
            if (vanMarker) {
                vanMarker.getElement()?.classList.remove('van-moving');
            }
        }
    }

    // Zoom in a bit for the animation
    map.setView(path[0], Math.min(map.getZoom() + 1, 11), { animate: true });

    setTimeout(() => {
        animationId = requestAnimationFrame(step);
    }, 500);
}

// ---- Interpolate between waypoints for smooth movement ----
function interpolateRoute(waypoints, totalPoints) {
    if (waypoints.length < 2) return waypoints;

    // Calculate segment distances
    const distances = [];
    let totalDistance = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
        const d = haversineDistance(waypoints[i], waypoints[i + 1]);
        distances.push(d);
        totalDistance += d;
    }

    const result = [];
    let pointsUsed = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
        const segmentRatio = distances[i] / totalDistance;
        const segmentPoints = Math.max(2, Math.round(segmentRatio * totalPoints));

        for (let j = 0; j < segmentPoints; j++) {
            const t = j / segmentPoints;
            const lat = waypoints[i][0] + (waypoints[i + 1][0] - waypoints[i][0]) * t;
            const lng = waypoints[i][1] + (waypoints[i + 1][1] - waypoints[i][1]) * t;
            result.push([lat, lng]);
        }
    }

    // Add final point
    result.push(waypoints[waypoints.length - 1]);
    return result;
}

// ---- Haversine distance (rough) ----
function haversineDistance(a, b) {
    const R = 6371;
    const dLat = (b[0] - a[0]) * Math.PI / 180;
    const dLng = (b[1] - a[1]) * Math.PI / 180;
    const lat1 = a[0] * Math.PI / 180;
    const lat2 = b[0] * Math.PI / 180;

    const x = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

// ---- Clear map layers ----
function clearMap() {
    if (routeLayer) routeLayer.clearLayers();
    if (markerLayer) markerLayer.clearLayers();
    vanMarker = null;
}

// ---- Stop animation ----
function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (vanMarker && markerLayer) {
        markerLayer.removeLayer(vanMarker);
        vanMarker = null;
    }
}

// ---- Update map day label ----
function updateMapLabel(text) {
    document.getElementById('map-day-label').textContent = text;
}

// ---- Trigger drive animation (called from button) ----
function triggerDriveAnimation() {
    showSpeedLines();
    animateDriving();
}
