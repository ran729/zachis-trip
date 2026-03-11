// ============================================
// APP — Main SPA logic and rendering
// ============================================

let currentView = 'overview';

// ---- Initialize app ----
document.addEventListener('DOMContentLoaded', () => {
  buildNavTabs();
  initMap();

  // Check for hash on load
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    document.getElementById('hero').style.display = 'none';
    document.getElementById('app').classList.add('active');
    setTimeout(() => { if (map) map.invalidateSize(); }, 50);
    navigateTo(hash);
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) navigateTo(hash);
  });
});

// ---- Start adventure (hero button) ----
function startAdventure() {
  confettiBurst();
  setTimeout(() => {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('app').classList.add('active');
    setTimeout(() => { if (map) map.invalidateSize(); }, 50);
    navigateTo('overview');
    window.location.hash = 'overview';
  }, 400);
}

// ---- Build navigation tabs ----
function buildNavTabs() {
  const nav = document.getElementById('nav-tabs');
  const tabs = [
    { id: 'overview', label: '🗺️ Overview' },
    ...TRIP.days.map(d => ({ id: `day-${d.id}`, label: `${d.icon} Day ${d.id}` })),
    { id: 'crew', label: '👥 Crew' },
    { id: 'summary', label: '📋 Summary' }
  ];

  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab';
    btn.dataset.view = tab.id;
    btn.textContent = tab.label;
    btn.onclick = () => {
      window.location.hash = tab.id;
      navigateTo(tab.id);
    };
    nav.appendChild(btn);
  });
}

// ---- Navigate to a view ----
function navigateTo(viewId) {
  currentView = viewId;
  showSpeedLines();
  if (map) setTimeout(() => map.invalidateSize(), 50);

  // Update active tab
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === viewId);
  });

  // Scroll active tab into view
  const activeTab = document.querySelector(`.nav-tab[data-view="${viewId}"]`);
  if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

  // Render the view
  const content = document.getElementById('content');
  content.className = 'page-transition';

  if (viewId === 'overview') {
    renderOverview();
    showOverview();
  } else if (viewId === 'crew') {
    renderCrew();
    showOverview();
  } else if (viewId === 'summary') {
    renderSummary();
    showOverview();
  } else if (viewId.startsWith('day-')) {
    const dayIndex = parseInt(viewId.split('-')[1]);
    renderDay(dayIndex);
    showDayRoute(dayIndex);
  }

  // Scroll content to top
  window.scrollTo({ top: document.getElementById('map-section').offsetTop - 60, behavior: 'smooth' });
  setTimeout(animatePanels, 100);
}

// ---- Render OVERVIEW ----
function renderOverview() {
  const content = document.getElementById('content');
  let html = `
    <div class="day-header">
      <span class="day-icon">🗺️</span>
      <h2>THE TRIP OVERVIEW</h2>
      <p class="day-tagline">6 days of pure Austrian madness</p>
    </div>
    <div class="speech-bubble">
      ${TRIP.tagline} — From Vienna's streets to alpine peaks, lake ferries to mountain huts. Here's the full adventure, day by day. Click any day to dive in!
    </div>
    <div class="overview-grid">
  `;

  TRIP.days.forEach((day, i) => {
    html += `
      <div class="overview-day-card" onclick="window.location.hash='day-${day.id}'; navigateTo('day-${day.id}')" style="animation-delay:${i * 0.06}s; border-left: 5px solid ${day.color}">
        <div class="odc-icon" style="background:${day.color}15; border-color:${day.color}">${day.icon}</div>
        <div class="odc-content">
          <div class="odc-label">${day.weekday}, ${day.date}</div>
          <div class="odc-title">${day.title}</div>
          <div class="odc-tagline">${day.tagline}</div>
        </div>
        <div class="odc-arrow">→</div>
      </div>
    `;
  });

  html += '</div>';
  content.innerHTML = html;
}

// ---- Render DAY ----
function renderDay(dayIndex) {
  const day = TRIP.days[dayIndex];
  if (!day) return;

  const accom = day.accommodation ? TRIP.accommodations[day.accommodation] : null;
  const content = document.getElementById('content');

  let html = `
    <div class="day-header">
      <span class="day-icon">${day.icon}</span>
      <h2>${day.title}</h2>
      <p class="day-date">${day.weekday}, ${day.date} — Day ${day.id}</p>
      <p class="day-tagline">${day.tagline}</p>
    </div>
    <div class="speech-bubble">${day.summary}</div>
    <div class="stats-bar">
  `;

  if (day.driveTime) html += `<span class="stat-badge"><span class="stat-icon">🚐</span> ${day.driveTime}</span>`;
  if (day.hikeDistance) html += `<span class="stat-badge"><span class="stat-icon">🥾</span> ${day.hikeDistance}</span>`;
  if (accom) html += `<span class="stat-badge"><span class="stat-icon">${accom.icon}</span> ${accom.name}</span>`;

  html += `</div>`;

  // Activities
  html += `<h3 class="section-title"><span class="title-icon">📋</span> THE PLAN</h3><div class="activities-grid">`;
  day.activities.forEach((act, i) => {
    const linkHtml = act.link ? `<a href="${act.link}" target="_blank" class="panel-link" title="Open in Google Maps">📍 Map</a>` : '';
    html += `
      <div class="comic-panel" data-type="${act.type}" style="animation-delay:${i * 0.07}s">
        <div class="panel-header">
          <div class="panel-icon">${act.icon}</div>
          <div>
            <span class="panel-time">${act.time}</span>
            <h4 class="panel-title">${act.title}</h4>
          </div>
          ${linkHtml}
        </div>
        <p class="panel-desc">${act.description}</p>
      </div>
    `;
  });
  html += '</div>';

  // Accommodation
  if (accom) {
    const accomLinkHtml = accom.url ? `<a href="${accom.url}" target="_blank" class="accom-link">🔗 View Website</a>` : '';
    html += `
      <h3 class="section-title"><span class="title-icon">🛏️</span> WHERE WE SLEEP</h3>
      <div class="accommodation-card">
        <h4>${accom.icon} ${accom.name}</h4>
        <div class="accom-type">${accom.type} — ${accom.nights}</div>
        ${accomLinkHtml}
        <ul class="accom-features">
          ${accom.features.map(f => `<li>✦ ${f}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Packing
  if (day.packing && day.packing.length > 0) {
    html += `<h3 class="section-title"><span class="title-icon">🎒</span> PACK FOR TODAY</h3><div class="packing-grid">`;
    day.packing.forEach(item => {
      html += `<div class="packing-item">${item}</div>`;
    });
    html += '</div>';
  }

  // Day navigation
  html += '<div style="display:flex;justify-content:space-between;margin-top:40px;gap:12px;">';
  if (dayIndex > 0) {
    const prev = TRIP.days[dayIndex - 1];
    html += `<button class="comic-btn small" onclick="window.location.hash='day-${prev.id}';navigateTo('day-${prev.id}')">← Day ${prev.id}</button>`;
  } else {
    html += '<div></div>';
  }
  if (dayIndex < TRIP.days.length - 1) {
    const next = TRIP.days[dayIndex + 1];
    html += `<button class="comic-btn small" onclick="window.location.hash='day-${next.id}';navigateTo('day-${next.id}')">Day ${next.id} →</button>`;
  }
  html += '</div>';

  content.innerHTML = html;
}

// ---- Render CREW ----
function renderCrew() {
  const content = document.getElementById('content');
  let html = `
    <div class="day-header">
      <span class="day-icon">👥</span>
      <h2>THE CREW</h2>
      <p class="day-tagline">12 legends ready for Austria</p>
    </div>
    <div class="crew-grid">
  `;

  TRIP.participants.forEach((p, i) => {
    html += `
      <div class="crew-card" style="animation-delay:${i * 0.04}s">
        <span class="crew-emoji">${p.emoji}</span>
        <div class="crew-name">${p.name}</div>
        <div class="crew-nickname">"${p.nickname}"</div>
        <div class="crew-role">${p.role}</div>
      </div>
    `;
  });

  html += '</div>';
  content.innerHTML = html;
}

// ---- Render SUMMARY ----
function renderSummary() {
  const content = document.getElementById('content');
  const allPacking = [...new Set(TRIP.days.flatMap(d => d.packing || []))];

  let html = `
    <div class="day-header">
      <span class="day-icon">📋</span>
      <h2>TRIP ESSENTIALS</h2>
      <p class="day-tagline">Everything you need to know</p>
    </div>

    <div class="summary-section">
      <h3 class="section-title"><span class="title-icon">✈️</span> FLIGHTS</h3>
      <div class="summary-card">
        <h4>✈️ Outbound</h4>
        <div class="summary-row"><span class="summary-label">Route</span><span class="summary-value">${TRIP.flights.outbound.from} → ${TRIP.flights.outbound.to}</span></div>
        <div class="summary-row"><span class="summary-label">Date</span><span class="summary-value">${TRIP.flights.outbound.date}</span></div>
      </div>
      <div class="summary-card">
        <h4>✈️ Return</h4>
        <div class="summary-row"><span class="summary-label">Route</span><span class="summary-value">${TRIP.flights.return.from} → ${TRIP.flights.return.to}</span></div>
        <div class="summary-row"><span class="summary-label">Date</span><span class="summary-value">${TRIP.flights.return.date}</span></div>
        <div class="summary-row"><span class="summary-label">Departure</span><span class="summary-value">${TRIP.flights.return.departure}</span></div>
        <div class="summary-row"><span class="summary-label">Arrival</span><span class="summary-value">${TRIP.flights.return.arrival}</span></div>
      </div>
    </div>

    <div class="summary-section">
      <h3 class="section-title"><span class="title-icon">🏨</span> ACCOMMODATION</h3>
  `;

  Object.values(TRIP.accommodations).forEach(a => {
    const accomSummaryLink = a.url ? `<a href="${a.url}" target="_blank" class="accom-link">🔗 View Website</a>` : '';
    html += `
      <div class="accommodation-card" style="margin-bottom:16px">
        <h4>${a.icon} ${a.name}</h4>
        <div class="accom-type">${a.type} — ${a.nights}</div>
        ${accomSummaryLink}
        <ul class="accom-features">${a.features.map(f => `<li>✦ ${f}</li>`).join('')}</ul>
      </div>
    `;
  });

  html += `
    </div>
    <div class="summary-section">
      <h3 class="section-title"><span class="title-icon">🚐</span> TRANSPORTATION</h3>
      <div class="summary-card">
        <h4>🚗 Rental Cars</h4>
        <div class="summary-row"><span class="summary-label">Pick up</span><span class="summary-value">April 22, Vienna</span></div>
        <div class="summary-row"><span class="summary-label">Return</span><span class="summary-value">April 26, Vienna Airport</span></div>
        <div class="summary-row"><span class="summary-label">Vienna → Hallstatt</span><span class="summary-value">~4 hours</span></div>
        <div class="summary-row"><span class="summary-label">Airport → Vienna</span><span class="summary-value">40–50 min</span></div>
      </div>
    </div>

    <div class="summary-section">
      <h3 class="section-title"><span class="title-icon">🎒</span> FULL PACKING LIST</h3>
      <div class="summary-card">
        <ul class="full-packing-list">
          ${allPacking.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="summary-section">
      <h3 class="section-title"><span class="title-icon">🥾</span> HIKE SUMMARY</h3>
      <div class="summary-card">
  `;

  TRIP.days.filter(d => d.hikeDistance).forEach(d => {
    html += `<div class="summary-row"><span class="summary-label">Day ${d.id} — ${d.title}</span><span class="summary-value">${d.hikeDistance}</span></div>`;
  });

  html += `
        <div class="summary-row" style="border-top:2px solid #333;margin-top:8px;padding-top:8px"><span class="summary-label"><strong>Total hiking</strong></span><span class="summary-value"><strong>${TRIP.days.reduce((sum, d) => sum + (d.hikeDistance ? parseFloat(d.hikeDistance) : 0), 0).toFixed(1)} km</strong></span></div>
      </div>
    </div>
  `;

  content.innerHTML = html;
}
