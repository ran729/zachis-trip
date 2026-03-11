// ============================================
// ANIMATIONS — Comic book visual effects
// ============================================

function showSpeedLines() {
    const container = document.createElement('div');
    container.className = 'speed-lines';
    document.body.appendChild(container);

    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.top = (Math.random() * 100) + '%';
        line.style.animationDelay = (Math.random() * 0.15) + 's';
        line.style.height = (1 + Math.random() * 3) + 'px';
        line.style.opacity = 0.3 + Math.random() * 0.5;
        container.appendChild(line);
    }

    setTimeout(() => container.remove(), 600);
}

function animatePanels() {
    const panels = document.querySelectorAll('.comic-panel, .overview-day-card, .crew-card');
    panels.forEach((panel, i) => {
        panel.style.animation = 'none';
        panel.offsetHeight;
        panel.style.animation = '';
        panel.style.animationDelay = (i * 0.06) + 's';
    });
}

function confettiBurst() {
    const colors = ['#e53935', '#fdd835', '#1e88e5', '#43a047', '#fb8c00', '#8e24aa'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10000;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const c = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 8 + Math.random() * 10;
        const x = Math.random() * window.innerWidth;
        const dur = 1.5 + Math.random() * 2;

        c.style.cssText = `position:absolute;left:${x}px;top:-20px;width:${size}px;height:${size * 0.6}px;background:${color};border-radius:2px;transform:rotate(${Math.random() * 360}deg);animation:confetti-fall ${dur}s ease ${Math.random() * 0.3}s forwards;`;
        container.appendChild(c);
    }

    const s = document.createElement('style');
    s.textContent = `@keyframes confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(${window.innerHeight + 50}px) rotate(720deg);opacity:0}}`;
    document.head.appendChild(s);

    setTimeout(() => { container.remove(); s.remove(); }, 4000);
}
