/* ============================================================
   CORTEX SCROLL REVEAL — Neural network canvas + letter reveal
   ============================================================ */

(function () {
  const section = document.querySelector('.cortex-reveal');
  if (!section) return;

  const canvas = document.getElementById('cortexCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const letters = section.querySelectorAll('.cortex-letter');
  const subLetters = section.querySelectorAll('.cortex-sub-letter');
  const tagline = section.querySelector('.cortex-tagline');

  let revealed = false;
  let animationId = null;
  let nodes = [];
  let edges = [];
  let progress = 0; // 0 to 1, drives the network animation

  // --- Canvas sizing ---
  function resizeCanvas() {
    canvas.width = section.offsetWidth * window.devicePixelRatio;
    canvas.height = section.offsetHeight * window.devicePixelRatio;
    canvas.style.width = section.offsetWidth + 'px';
    canvas.style.height = section.offsetHeight + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    generateNodes();
  }

  // --- Generate random neural network nodes ---
  function generateNodes() {
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    const count = Math.floor((w * h) / 12000); // density based on area
    nodes = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2.5 + 1,
        baseAlpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        drift: Math.random() * 20 + 5
      });
    }

    // Build edges (connect nearby nodes)
    edges = [];
    const maxDist = Math.min(w, h) * 0.15;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          edges.push({ a: i, b: j, dist: dist, maxDist: maxDist });
        }
      }
    }
  }

  // --- Draw frame ---
  function draw(time) {
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    if (progress <= 0) {
      animationId = requestAnimationFrame(draw);
      return;
    }

    const t = time * 0.001;
    const goldR = 201, goldG = 168, goldB = 76;
    const blueR = 59, blueG = 130, blueB = 246;

    // Draw edges
    for (let e = 0; e < edges.length; e++) {
      const edge = edges[e];
      const na = nodes[edge.a];
      const nb = nodes[edge.b];

      const ax = na.x + Math.sin(t * na.speed + na.angle) * na.drift;
      const ay = na.y + Math.cos(t * na.speed + na.angle) * na.drift;
      const bx = nb.x + Math.sin(t * nb.speed + nb.angle) * nb.drift;
      const by = nb.y + Math.cos(t * nb.speed + nb.angle) * nb.drift;

      const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
      const alpha = (1 - dist / edge.maxDist) * 0.25 * progress;

      if (alpha > 0.01) {
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(${goldR}, ${goldG}, ${goldB}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const nx = n.x + Math.sin(t * n.speed + n.angle) * n.drift;
      const ny = n.y + Math.cos(t * n.speed + n.angle) * n.drift;
      const alpha = n.baseAlpha * progress;

      // Alternate gold and blue nodes
      const isGold = i % 3 !== 0;
      const r = isGold ? goldR : blueR;
      const g = isGold ? goldG : blueG;
      const b = isGold ? goldB : blueB;

      // Glow
      ctx.beginPath();
      ctx.arc(nx, ny, n.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  // --- Scroll-triggered reveal ---
  function onScroll() {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Section visibility: how much of it is in view
    const sectionTop = rect.top;
    const sectionH = rect.height;

    // Start revealing when top of section enters bottom 80% of viewport
    // Full reveal when section center is at viewport center
    const enterPoint = windowH * 0.8;
    const scrolledInto = enterPoint - sectionTop;
    const revealRange = sectionH * 0.5;

    progress = Math.max(0, Math.min(1, scrolledInto / revealRange));

    if (progress > 0.15 && !revealed) {
      revealed = true;
      letters.forEach(l => l.classList.add('revealed'));
      subLetters.forEach(l => l.classList.add('revealed'));
      if (tagline) tagline.classList.add('revealed');

      // Start glow after reveal animation completes
      setTimeout(() => {
        letters.forEach(l => l.classList.add('glowing'));
      }, 1200);
    }

    if (progress <= 0 && revealed) {
      revealed = false;
      letters.forEach(l => {
        l.classList.remove('revealed', 'glowing');
      });
      subLetters.forEach(l => l.classList.remove('revealed'));
      if (tagline) tagline.classList.remove('revealed');
    }
  }

  // --- Init ---
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // check initial state
  animationId = requestAnimationFrame(draw);
})();
