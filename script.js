document.getElementById('year').textContent = new Date().getFullYear();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===============================
// SOCIAL & PORTFOLIO LINKS
// Edit the URLs below — every element with data-link reads from here.
// ===============================
const LINKS = {
  github: 'https://github.com/shang7307',
  linkedin: 'https://www.linkedin.com/in/shanmugapriyan-j-772257330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  instagram: 'https://www.instagram.com/heyy_shang_7307_?stkn=MnRvdjFrZGdnZDlu',
  email: 'mailto:shanmugapriyan.j.ciet@gmail.com',
  phone: 'tel:+918667676440'
};

document.querySelectorAll('[data-link]').forEach(el => {
  const key = el.dataset.link;
  const url = LINKS[key];
  if (!url) return;
  el.href = url;
  el.addEventListener('click', function (e) {
    e.preventDefault();
    window.open(url, '_blank');
  });
});

// ===============================
// THEME CONFIGURATION
// Each key maps directly onto a CSS custom property in :root
// (see THEME_VAR_MAP). Add a new theme by adding an object here
// and a matching button in the .theme-bar markup.
// ===============================
const THEMES = {
  cyber: {
    label: 'Dark / Cyber',
    bgVoid: '#05070a', bgVoidRgb: '5,7,10', bgPanel: 'rgba(14,22,30,.58)', bgPanelSolid: '#0b131a', bgPanel2: '#090e13',
    lineGlass: 'rgba(130,220,255,.22)', lineGlassSoft: 'rgba(130,220,255,.1)',
    accentCyan: '#00e5ff', accentCyanRgb: '0,229,255', accentViolet: '#b14bff', accentVioletRgb: '177,75,255',
    onAccent: '#031014', textPrimary: '#eaf6ff', textMuted: '#85a2b0', textFaint: '#4d6670'
  },
  blue: {
    label: 'Blue Technology',
    bgVoid: '#030810', bgVoidRgb: '3,8,16', bgPanel: 'rgba(10,24,38,.58)', bgPanelSolid: '#081220', bgPanel2: '#060e18',
    lineGlass: 'rgba(100,180,255,.24)', lineGlassSoft: 'rgba(100,180,255,.1)',
    accentCyan: '#2f9bff', accentCyanRgb: '47,155,255', accentViolet: '#00d4b8', accentVioletRgb: '0,212,184',
    onAccent: '#02111f', textPrimary: '#e8f3ff', textMuted: '#7fa3c2', textFaint: '#49657d'
  },
  purple: {
    label: 'Purple Neon',
    bgVoid: '#09040f', bgVoidRgb: '9,4,15', bgPanel: 'rgba(24,12,34,.58)', bgPanelSolid: '#120a1c', bgPanel2: '#0d0716',
    lineGlass: 'rgba(216,130,255,.24)', lineGlassSoft: 'rgba(216,130,255,.1)',
    accentCyan: '#d946ef', accentCyanRgb: '217,70,239', accentViolet: '#ff6bd6', accentVioletRgb: '255,107,214',
    onAccent: '#ffffff', textPrimary: '#f6ebff', textMuted: '#ab8fc4', textFaint: '#63507a'
  },
  light: {
    label: 'Minimal Light',
    bgVoid: '#f3f5f8', bgVoidRgb: '243,245,248', bgPanel: 'rgba(255,255,255,.72)', bgPanelSolid: '#ffffff', bgPanel2: '#eceff3',
    lineGlass: 'rgba(37,99,235,.22)', lineGlassSoft: 'rgba(37,99,235,.1)',
    accentCyan: '#2563eb', accentCyanRgb: '37,99,235', accentViolet: '#7c3aed', accentVioletRgb: '124,58,237',
    onAccent: '#ffffff', textPrimary: '#161a22', textMuted: '#57626f', textFaint: '#8b96a3'
  }
};

const THEME_VAR_MAP = {
  bgVoid: '--bg-void', bgVoidRgb: '--bg-void-rgb', bgPanel: '--bg-panel', bgPanelSolid: '--bg-panel-solid', bgPanel2: '--bg-panel-2',
  lineGlass: '--line-glass', lineGlassSoft: '--line-glass-soft',
  accentCyan: '--accent-cyan', accentCyanRgb: '--accent-cyan-rgb', accentViolet: '--accent-violet', accentVioletRgb: '--accent-violet-rgb',
  onAccent: '--on-accent', textPrimary: '--text-primary', textMuted: '--text-muted', textFaint: '--text-faint'
};

const rootEl = document.documentElement;
let currentTheme = 'cyber';
let heroThreeRefs = null;  // populated once the Three.js HUD scene finishes initializing
let skillsChart = null;    // populated once the Chart.js radar chart finishes initializing

function applyTheme(name) {
  const theme = THEMES[name];
  if (!theme) return;
  currentTheme = name;

  Object.keys(THEME_VAR_MAP).forEach(key => {
    rootEl.style.setProperty(THEME_VAR_MAP[key], theme[key]);
  });

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === name);
  });

  // live-recolor the 3D HUD scene (rings + particles) to match the active theme
  if (heroThreeRefs) {
    heroThreeRefs.rings[0].mesh.material.color.set(theme.accentCyan);
    heroThreeRefs.rings[1].mesh.material.color.set(theme.accentViolet);
    heroThreeRefs.rings[2].mesh.material.color.set(theme.accentCyan);
    heroThreeRefs.particles.material.color.set(theme.accentCyan);
    heroThreeRefs.renderer.render(heroThreeRefs.scene, heroThreeRefs.camera);
  }

  // live-recolor the skills radar chart
  if (skillsChart) {
    skillsChart.data.datasets[0].backgroundColor = 'rgba(' + theme.accentCyanRgb + ',0.12)';
    skillsChart.data.datasets[0].borderColor = theme.accentCyan;
    skillsChart.data.datasets[0].pointBackgroundColor = theme.accentViolet;
    skillsChart.options.scales.r.angleLines.color = theme.lineGlass;
    skillsChart.options.scales.r.grid.color = theme.lineGlass;
    skillsChart.options.scales.r.pointLabels.color = theme.textMuted;
    skillsChart.update();
  }

  try { localStorage.setItem('sj_portfolio_hud_theme', name); } catch (e) { /* storage unavailable — non‑critical */ }
}

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

let initialTheme = 'cyber';
try { initialTheme = localStorage.getItem('sj_portfolio_hud_theme') || 'cyber'; } catch (e) { /* storage unavailable */ }
applyTheme(initialTheme);

/* ---------- Custom cursor (mouse/trackpad devices only) ---------- */
(function initCustomCursor() {
  const supportsCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsCustomCursor) return;
  document.documentElement.classList.add('has-custom-cursor');
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my, active = false;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    if (!active) { active = true; dot.style.opacity = '1'; ring.style.opacity = '.65'; }
  });
  window.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  function ringLoop() {
    rx += (mx - rx) * (reducedMotion ? 1 : 0.18); ry += (my - ry) * (reducedMotion ? 1 : 0.18);
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(ringLoop);
  }
  ringLoop();
  const HOVER_SEL = 'a, button, .tilt-card, .flip-card, .back-top, .nav-toggle, .skill-bar-row, [data-link]';
  document.addEventListener('mouseover', (e) => {
    const t = e.target;
    if (t.closest && t.closest(HOVER_SEL)) ring.classList.add('hovering');
    if (t.matches && t.matches('input, textarea')) { dot.style.opacity = '0'; ring.style.opacity = '0'; }
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target;
    if (t.closest && t.closest(HOVER_SEL)) ring.classList.remove('hovering');
    if (t.matches && t.matches('input, textarea')) { dot.style.opacity = '1'; ring.style.opacity = '.65'; }
  });
  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup', () => ring.classList.remove('clicking'));
})();

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---------- Scrollspy ---------- */
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-a');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    if (entry.isIntersecting) {
      navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(sec => spyObserver.observe(sec));

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Skill bar fill on scroll ---------- */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.style.width = entry.target.dataset.fill + '%'; barObserver.unobserve(entry.target); }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-bar-fill').forEach(el => barObserver.observe(el));

/* ---------- Typewriter role rotator ---------- */
const roles = ['Robotics', 'Automation', 'Embedded Systems', 'Artificial Intelligence', 'RPA', 'Software Development'];
const roleFill = document.getElementById('roleFill');
let rIndex = 0, cIndex = 0, deleting = false;
function typeRole() {
  const word = roles[rIndex];
  if (!deleting) {
    cIndex++; roleFill.textContent = word.slice(0, cIndex);
    if (cIndex === word.length) { deleting = true; setTimeout(typeRole, 1400); return; }
  } else {
    cIndex--; roleFill.textContent = word.slice(0, cIndex);
    if (cIndex === 0) { deleting = false; rIndex = (rIndex + 1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 45 : 85);
}
if (reducedMotion) { roleFill.textContent = roles[0]; } else { setTimeout(typeRole, 600); }

/* ---------- Radar chart ---------- */
window.addEventListener('load', () => {
  const ctx = document.getElementById('skillsRadar');
  if (ctx && window.Chart) {
    skillsChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Robotics & Embedded', 'Software Dev', 'AI / ML', 'Automation & RPA', 'Mechanical & CAD', 'Problem Solving'],
        datasets: [{
          label: 'Self-assessed proficiency',
          data: [65, 70, 52, 62, 61, 78],
          backgroundColor: 'rgba(0,229,255,0.12)',
          borderColor: '#00e5ff',
          pointBackgroundColor: '#b14bff',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            angleLines: { color: 'rgba(130,220,255,.25)' },
            grid: { color: 'rgba(130,220,255,.2)' },
            pointLabels: { color: '#85a2b0', font: { family: 'Share Tech Mono', size: 10 } },
            ticks: { display: false, backdropColor: 'transparent', maxTicksLimit: 4 },
            suggestedMin: 0, suggestedMax: 100
          }
        }
      }
    });
  }

  /* ---------- THREE.JS HUD SCENE: concentric rings + particle field ---------- */
  const heroWrap = document.getElementById('hero3d');
  if (heroWrap && window.THREE) {
    const w = heroWrap.clientWidth, h = heroWrap.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroWrap.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // concentric HUD rings, each tilted on a different axis
    const ringDefs = [
      { r: 1.55, tube: 0.012, color: 0x00e5ff, rot: [Math.PI / 2.2, 0, 0], speed: 0.006 },
      { r: 1.95, tube: 0.009, color: 0xb14bff, rot: [Math.PI / 2.6, 0.35, 0], speed: -0.0045 },
      { r: 2.35, tube: 0.006, color: 0x00e5ff, rot: [Math.PI / 2, 0.6, 0.25], speed: 0.003 }
    ];
    const rings = [];
    ringDefs.forEach(def => {
      const geo = new THREE.TorusGeometry(def.r, def.tube, 8, 110);
      const mat = new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.55 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(def.rot[0], def.rot[1], def.rot[2]);
      group.add(mesh);
      rings.push({ mesh, speed: def.speed });
    });

    // drifting particle field
    const particleCount = 170;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.7 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.035, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // expose refs so the theme engine can live-recolor this scene, then sync to current theme
    heroThreeRefs = { rings, particles, renderer, scene, camera };
    applyTheme(currentTheme);

    let mouseX = 0, mouseY = 0;
    heroWrap.addEventListener('mousemove', (e) => {
      const rect = heroWrap.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    function resize() {
      const nw = heroWrap.clientWidth, nh = heroWrap.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener('resize', resize);

    if (reducedMotion) {
      group.rotation.set(0.2, 0.3, 0);
      renderer.render(scene, camera);
    } else {
      function animate() {
        requestAnimationFrame(animate);
        rings.forEach(r => { r.mesh.rotation.z += r.speed; });
        particles.rotation.y += 0.0015;
        group.rotation.y += 0.0012;
        camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }
      animate();
    }
  }
});

/* ---------- 3D tilt on project cards ---------- */
if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ---------- Certificate flip (tap support for touch) ---------- */
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    if (window.matchMedia('(hover: none)').matches) { card.classList.toggle('flipped'); }
  });
});

/* ---------- Contact form -> mailto ---------- */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const msg = document.getElementById('cf-msg').value;
  const subject = encodeURIComponent('Internship Inquiry from ' + name);
  const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = 'mailto:shanmugapriyan.j.ciet@gmail.com?subject=' + subject + '&body=' + body;
});

/* ---------- Back to top ---------- */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 600), { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
