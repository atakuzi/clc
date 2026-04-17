
/* Draw org wire: connector + hline anchored under DSD box */
function drawOrgWires() {
  var dsd = document.getElementById('dsdBox');
  var conn = document.getElementById('dsdConnector');
  var level = document.querySelector('.org-wire-level.has-hline');
  var wire = document.querySelector('.org-wire');
  if (!dsd || !conn || !level || !wire) return;

  var wireRect = wire.getBoundingClientRect();
  var dsdRect = dsd.getBoundingClientRect();
  var dsdCenterX = dsdRect.left + dsdRect.width / 2 - wireRect.left;

  // 1. Position vertical connector under DSD center
  conn.style.alignSelf = 'flex-start';
  conn.style.position = 'relative';
  conn.style.left = dsdCenterX + 'px';
  conn.style.transform = 'translateX(-50%)';

  // 2. Center subordinate level under DSD
  var levelWidth = level.scrollWidth;
  var desiredLeft = dsdCenterX - levelWidth / 2;
  level.style.marginLeft = desiredLeft + 'px';
  level.style.marginRight = 'auto';

  // 3. Draw hline after repositioning (use requestAnimationFrame for layout settle)
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
    hline.style.cssText = 'position:absolute;top:0;height:2px;background:#1a2a3a;z-index:0;';
    hline.style.left = firstCenter + 'px';
    hline.style.width = (lastCenter - firstCenter) + 'px';
    level.appendChild(hline);
  });
}
window.addEventListener('load', drawOrgWires);
window.addEventListener('resize', drawOrgWires);

/* Draw dashed curved arrow from Exec/Sustain back to Concept */
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

  // Remove old elements
  svg.querySelectorAll('.iter-path,.iter-label').forEach(function(el) { el.remove(); });

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.classList.add('iter-path');
  path.setAttribute('d', 'M ' + sx + ' ' + sy + ' C ' + sx + ' ' + curveY + ', ' + tx + ' ' + curveY + ', ' + tx + ' ' + ty);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#2D6A8F');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-dasharray', '8,4');
  path.setAttribute('marker-end', 'url(#arrow-iter)');
  svg.appendChild(path);

  // "As Needed" label at the midpoint of the curve
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
  text.setAttribute('fill', '#2D6A8F');
  text.textContent = 'As Needed';
  svg.appendChild(text);
}
window.addEventListener('load', drawIterativeArrow);
window.addEventListener('resize', drawIterativeArrow);

function showImplView(view) {
  document.getElementById('implRole').classList.toggle('active', view === 'role');
  document.getElementById('implTimeline').classList.toggle('active', view === 'timeline');
  var btns = document.querySelectorAll('.impl-toggle button');
  btns[0].classList.toggle('active', view === 'role');
  btns[1].classList.toggle('active', view === 'timeline');
}




function drawMappingLines() {
  const svg = document.getElementById('mappingSvg');
  svg.querySelectorAll('.map-line').forEach(el => el.remove());

  const hermesSteps = document.querySelectorAll('#hermesPipeline > .step');
  const sdlcSteps = document.querySelectorAll('#sdlcPipeline > .step');

  // Simplified mapping lines:
  // Submit+Scope (0,1) → Concept (0)
  // Execute (3) → Dev (1)
  // Scale (4) → Maint (2) + EOL (3)
  const mappings = [
    [0, 0],  // Submit → Intake
    [1, 0],  // Scope & Review → Intake & Scoping
    [1, 1],  // Scope → Concept
    [3, 2],  // Execute → Dev
    [4, 3],  // Scale → Exec/Sustain
    [4, 4],  // Scale → Evolution/EOL
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
    line.setAttribute('stroke', '#7a8a9a');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-dasharray', '6,4');
    line.setAttribute('opacity', '0.75');
    line.setAttribute('marker-end', 'url(#arrow-map)');
    svg.appendChild(line);
  });

  // CG Priority → gate between Concept and Dev
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
    line.setAttribute('stroke', '#3C1361');
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('stroke-dasharray', '6,4');
    line.setAttribute('opacity', '0.85');
    line.setAttribute('marker-end', 'url(#arrow-map)');
    svg.appendChild(line);
  }
}

window.addEventListener('load', drawMappingLines);
window.addEventListener('resize', drawMappingLines);


(function() {
  var targets = ['psbCycle', 'orgChart', 'meetingOverview', 'considerations', 'syncMatrix', 'safeBackground', 'capLifecycle', 'implGuide'];
  var labels  = ['PSB Cycle', 'Org Chart', 'Meetings', 'Considerations', 'Sync Matrix', 'SAFe', 'Cap Lifecycle', 'Impl Guide'];
  var lbl = document.getElementById('scrollLabel');

  function isInView(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    var rect = el.getBoundingClientRect();
    // Consider "in view" if the top is within the upper half of the viewport
    return rect.top >= -50 && rect.top < window.innerHeight * 0.5;
  }

  function getNextIdx() {
    // Find the first target that is NOT currently in view
    for (var i = 0; i < targets.length; i++) {
      if (!isInView(targets[i])) {
        // Check if this one is below current scroll position
        var el = document.getElementById(targets[i]);
        if (el && el.getBoundingClientRect().top > 50) return i;
      }
    }
    // All in view or all above — wrap to first
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
    // Center the meeting overview in the viewport; others align to top
    if (targets[idx] === 'meetingOverview') {
      // Find the containing onepager div to center the whole table
      var container = el.closest('.onepager') || el;
      var rect = container.getBoundingClientRect();
      var offset = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(updateLabel, 400);
  };

  window.addEventListener('scroll', updateLabel);
  updateLabel();
})();

/* scripts from capability_lifecycle_process.html */

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

  // X: center of Development(SAFe) phase on PNG (~42% from left of image)
  var x = imgRect.left + imgRect.width * 0.42 - canvasRect.left;

  // Y start: bottom of the phase boxes (~93% down the PNG)
  var y1 = imgRect.top + imgRect.height * 0.90 - canvasRect.top;

  // Y end: top of the dashed box
  var y2 = boxRect.top - canvasRect.top;

  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', '#d4820a');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-dasharray', '8,4');
  svg.appendChild(line);
}
window.addEventListener('load', function() { setTimeout(drawZoomLine, 300); });
window.addEventListener('resize', drawZoomLine);
