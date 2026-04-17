/* ═══════════════════════════════════════════════
   ODT Capability Lifecycle — Main JavaScript
   Navigation, Scroll-Spy, Animations, SVG Drawing
   ═══════════════════════════════════════════════ */

/* ── Debounce utility ── */
function debounce(fn, delay) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

/* ═══════════════════════════════════════
   SCROLL-SPY NAVIGATION
   ═══════════════════════════════════════ */
(function() {
  var navLinks = document.querySelectorAll('#navLinks a[data-section]');
  var sections = [];

  navLinks.forEach(function(link) {
    var id = link.getAttribute('data-section');
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: link });
  });

  function updateActiveNav() {
    var scrollY = window.scrollY;
    var navHeight = 80; // nav height + offset
    var current = null;

    for (var i = sections.length - 1; i >= 0; i--) {
      var rect = sections[i].el.getBoundingClientRect();
      if (rect.top <= navHeight + 60) {
        current = sections[i];
        break;
      }
    }

    navLinks.forEach(function(link) { link.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', debounce(updateActiveNav, 50));
  updateActiveNav();
})();

/* ═══════════════════════════════════════
   SCROLL ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════ */
(function() {
  // Add fade-in class to major sections
  var selectors = [
    '.row', '.psb-section', '.onepager', '.considerations',
    '.tbd-section', '.sync-section', '.impl-guide',
    '.role-card', '.impl-section'
  ];

  selectors.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.classList.add('fade-in');
    });
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    document.querySelectorAll('.fade-in').forEach(function(el) {
      el.classList.add('visible');
    });
  }
})();

/* ═══════════════════════════════════════
   ORG WIRE DIAGRAM
   ═══════════════════════════════════════ */
function drawOrgWires() {
  var dsd = document.getElementById('dsdBox');
  var conn = document.getElementById('dsdConnector');
  var level = document.querySelector('.org-wire-level.has-hline');
  var wire = document.querySelector('.org-wire');
  if (!dsd || !conn || !level || !wire) return;

  var wireRect = wire.getBoundingClientRect();
  var dsdRect = dsd.getBoundingClientRect();
  var dsdCenterX = dsdRect.left + dsdRect.width / 2 - wireRect.left;

  conn.style.alignSelf = 'flex-start';
  conn.style.position = 'relative';
  conn.style.left = dsdCenterX + 'px';
  conn.style.transform = 'translateX(-50%)';

  var levelWidth = level.scrollWidth;
  var desiredLeft = dsdCenterX - levelWidth / 2;
  level.style.marginLeft = desiredLeft + 'px';
  level.style.marginRight = 'auto';

  requestAnimationFrame(function() {
    var boxes = level.querySelectorAll('.org-wire-box');
    if (boxes.length < 2) return;
    var first = boxes[0], last = boxes[boxes.length - 1];
    var levelRect = level.getBoundingClientRect();
    var firstCenter = first.getBoundingClientRect().left + first.getBoundingClientRect().width / 2 - levelRect.left;
    var lastCenter = last.getBoundingClientRect().left + last.getBoundingClientRect().width / 2 - levelRect.left;
    var old = level.querySelector('.org-hline-dynamic');
    if (old) old.remove();
    var hline = document.createElement('div');
    hline.className = 'org-hline-dynamic';
    hline.style.cssText = 'position:absolute;top:0;height:2px;background:#0f172a;z-index:0;';
    hline.style.left = firstCenter + 'px';
    hline.style.width = (lastCenter - firstCenter) + 'px';
    level.appendChild(hline);
  });
}
window.addEventListener('load', drawOrgWires);
window.addEventListener('resize', debounce(drawOrgWires, 150));

/* ═══════════════════════════════════════
   ITERATIVE ARROW (Concept ← Exec/Sustain)
   ═══════════════════════════════════════ */
function drawIterativeArrow() {
  var svg = document.getElementById('iterativeArrowSvg');
  if (!svg) return;
  var steps = document.querySelectorAll('#sdlcPipeline > .step');
  var concept = steps[1], execSust = steps[3];
  if (!concept || !execSust) return;

  var svgRect = svg.getBoundingClientRect();
  var cRect = concept.querySelector('.circle-wrap').getBoundingClientRect();
  var eRect = execSust.querySelector('.circle-wrap').getBoundingClientRect();

  var sx = eRect.left + eRect.width / 2 - svgRect.left;
  var sy = 8;
  var tx = cRect.left + cRect.width / 2 - svgRect.left;
  var ty = 8;
  var curveY = 50;

  svg.querySelectorAll('.iter-path,.iter-label').forEach(function(el) { el.remove(); });

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.classList.add('iter-path');
  path.setAttribute('d', 'M ' + sx + ' ' + sy + ' C ' + sx + ' ' + curveY + ', ' + tx + ' ' + curveY + ', ' + tx + ' ' + ty);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#2563eb');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-dasharray', '8,4');
  path.setAttribute('marker-end', 'url(#arrow-iter)');
  svg.appendChild(path);

  var labelX = (sx + tx) / 2;
  var labelY = curveY + 2;
  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.classList.add('iter-label');
  text.setAttribute('x', labelX);
  text.setAttribute('y', labelY);
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('font-size', '11');
  text.setAttribute('font-weight', '600');
  text.setAttribute('font-style', 'italic');
  text.setAttribute('fill', '#2563eb');
  text.setAttribute('font-family', 'Inter, sans-serif');
  text.textContent = 'As Needed';
  svg.appendChild(text);
}
window.addEventListener('load', drawIterativeArrow);
window.addEventListener('resize', debounce(drawIterativeArrow, 150));

/* ═══════════════════════════════════════
   IMPL GUIDE VIEW TOGGLE
   ═══════════════════════════════════════ */
function showImplView(view) {
  document.getElementById('implRole').classList.toggle('active', view === 'role');
  document.getElementById('implTimeline').classList.toggle('active', view === 'timeline');
  var btns = document.querySelectorAll('.impl-toggle button');
  btns[0].classList.toggle('active', view === 'role');
  btns[1].classList.toggle('active', view === 'timeline');
}

/* ═══════════════════════════════════════
   MAPPING LINES (HERMES → Lifecycle)
   ═══════════════════════════════════════ */
function drawMappingLines() {
  const svg = document.getElementById('mappingSvg');
  if (!svg) return;
  svg.querySelectorAll('.map-line').forEach(el => el.remove());

  const hermesSteps = document.querySelectorAll('#hermesPipeline > .step');
  const sdlcSteps = document.querySelectorAll('#sdlcPipeline > .step');

  const mappings = [
    [0, 0], [1, 0], [1, 1], [3, 2], [4, 3], [4, 4],
  ];

  mappings.forEach(([hi, si]) => {
    const hStep = hermesSteps[hi];
    const sStep = sdlcSteps[si];
    if (!hStep || !sStep) return;

    const hRect = hStep.querySelector('.circle-wrap').getBoundingClientRect();
    const sRect = sStep.querySelector('.circle-wrap').getBoundingClientRect();

    const sx = hRect.left + hRect.width / 2;
    const sy = hRect.bottom;
    const tx = sRect.left + sRect.width / 2;
    const ty = sRect.top;
    const midY = (sy + ty) / 2 + 10;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.classList.add('map-line');
    line.setAttribute('d', `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#94a3b8');
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-dasharray', '6,4');
    line.setAttribute('opacity', '0.6');
    line.setAttribute('marker-end', 'url(#arrow-map)');
    svg.appendChild(line);
  });

  const cgStep = hermesSteps[2];
  const conceptStep = sdlcSteps[0];
  const devStep = sdlcSteps[1];
  if (cgStep && conceptStep && devStep) {
    const hRect = cgStep.querySelector('.circle-wrap').getBoundingClientRect();
    const cRect = conceptStep.querySelector('.circle-wrap').getBoundingClientRect();
    const dRect = devStep.querySelector('.circle-wrap').getBoundingClientRect();

    const sx = hRect.left + hRect.width / 2;
    const sy = hRect.bottom;
    const tx = (cRect.right + dRect.left) / 2;
    const ty = (cRect.top + dRect.top) / 2;
    const midY = (sy + ty) / 2 + 10;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.classList.add('map-line');
    line.setAttribute('d', `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#7c3aed');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-dasharray', '6,4');
    line.setAttribute('opacity', '0.7');
    line.setAttribute('marker-end', 'url(#arrow-map)');
    svg.appendChild(line);
  }
}

window.addEventListener('load', drawMappingLines);
window.addEventListener('resize', debounce(drawMappingLines, 150));

/* ═══════════════════════════════════════
   SCROLL-DOWN BUTTON (for mobile)
   ═══════════════════════════════════════ */
(function() {
  var targets = ['psbCycle', 'orgChart', 'meetingOverview', 'considerations', 'syncMatrix', 'safeBackground', 'capLifecycle', 'implGuide'];
  var labels  = ['PSB Cycle', 'Org Chart', 'Meetings', 'Considerations', 'Sync Matrix', 'SAFe', 'Cap Lifecycle', 'Impl Guide'];
  var lbl = document.getElementById('scrollLabel');
  if (!lbl) return;

  function isInView(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    var rect = el.getBoundingClientRect();
    return rect.top >= -50 && rect.top < window.innerHeight * 0.5;
  }

  function getNextIdx() {
    for (var i = 0; i < targets.length; i++) {
      if (!isInView(targets[i])) {
        var el = document.getElementById(targets[i]);
        if (el && el.getBoundingClientRect().top > 50) return i;
      }
    }
    return 0;
  }

  function updateLabel() {
    var next = getNextIdx();
    lbl.textContent = labels[next];
  }

  window.scrollNext = function() {
    var idx = getNextIdx();
    var el = document.getElementById(targets[idx]);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(updateLabel, 400);
  };

  window.addEventListener('scroll', updateLabel);
  updateLabel();
})();

/* ═══════════════════════════════════════
   ZOOM LINE (capability_lifecycle_process.html)
   ═══════════════════════════════════════ */
function drawZoomLine() {
  var svg = document.getElementById('zoomLine');
  var canvas = document.querySelector('.canvas');
  var img = document.querySelector('.graphic-frame img');
  var box = document.querySelector('.zoom-dashed-box');
  if (!svg || !canvas || !img || !box) return;

  svg.innerHTML = '';
  var canvasRect = canvas.getBoundingClientRect();
  var imgRect = img.getBoundingClientRect();
  var boxRect = box.getBoundingClientRect();

  var x = imgRect.left + imgRect.width * 0.42 - canvasRect.left;
  var y1 = imgRect.top + imgRect.height * 0.90 - canvasRect.top;
  var y2 = boxRect.top - canvasRect.top;

  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', '#d97706');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-dasharray', '8,4');
  svg.appendChild(line);
}
window.addEventListener('load', function() { setTimeout(drawZoomLine, 300); });
window.addEventListener('resize', debounce(drawZoomLine, 150));
