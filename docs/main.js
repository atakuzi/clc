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
    hline.style.cssText = 'position:absolute;top:0;height:2px;background:#475569;z-index:0;';
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

/* ═══════════════════════════════════════
   FEATURE 1: CLICKABLE PIPELINE DRAWERS
   ═══════════════════════════════════════ */
(function() {
  document.querySelectorAll('.step').forEach(function(step) {
    var drawer = step.querySelector('.step-drawer');
    if (!drawer) return;
    
    step.addEventListener('click', function(e) {
      // Don't trigger if clicking a link inside the drawer
      if (e.target.closest('.step-drawer')) return;
      
      var wasOpen = drawer.classList.contains('open');
      
      // Close all drawers first
      document.querySelectorAll('.step-drawer.open').forEach(function(d) {
        d.classList.remove('open');
        d.closest('.step').classList.remove('active-drawer');
      });
      
      // Toggle this one
      if (!wasOpen) {
        drawer.classList.add('open');
        step.classList.add('active-drawer');
      }
    });
  });
})();

/* ═══════════════════════════════════════
   FEATURE 2: INTERACTIVE SPRINT STEPPER
   ═══════════════════════════════════════ */
(function() {
  var sprintData = [
    {
      name: 'Discovery & Framing (Weeks 2–3)',
      meetings: ['Daily Standup (≤15 min)', 'Sprint kickoff planning'],
      deliverables: ['Technical discovery completed', 'Work estimates finalized', 'Prototypes if needed', 'Sprint-ready backlog']
    },
    {
      name: 'Dev Sprint 1 (Weeks 4–5)',
      meetings: ['Daily Standup (≤15 min)', 'AAR w/ DSD & Stakeholders', 'ART back-brief to boss'],
      deliverables: ['Sprint 1 increment', 'Updated milestone chart', 'Sprint boundary AAR']
    },
    {
      name: 'Dev Sprint 2 (Weeks 6–7)',
      meetings: ['Daily Standup (≤15 min)', 'Scrum of Scrums (~D+35)', 'Product Midpoint Check-in', 'AAR w/ DSD & Stakeholders'],
      deliverables: ['Sprint 2 increment', 'Midpoint assessment', 'Process adjustments documented']
    },
    {
      name: 'Dev Sprint 3 (Weeks 8–9)',
      meetings: ['Daily Standup (≤15 min)', 'AAR w/ DSD & Stakeholders'],
      deliverables: ['Sprint 3 increment', 'Integration testing', 'Updated milestone chart']
    },
    {
      name: 'Dev Sprint 4 (Weeks 10–11)',
      meetings: ['Daily Standup (≤15 min)', 'AAR w/ DSD & Stakeholders'],
      deliverables: ['Feature completion', 'Dev freeze before demo', 'Bug fixes only', 'Demo materials prepped']
    },
    {
      name: 'Demo / Retro (Week 12)',
      meetings: ['Product Demo (PMs lead)', 'Cycle Retro / AAR (all leads + DSD Director)'],
      deliverables: ['Working capability demonstrated', 'Feedback categorized: fix now / next cycle / backlog', 'Invest/divest/pivot decisions', 'Lessons learned documented']
    }
  ];

  var blocks = document.querySelectorAll('.sprint-bar .sprint-block');
  var panel = document.getElementById('sprintDetailPanel');
  if (!panel || blocks.length === 0) return;

  blocks.forEach(function(block, index) {
    block.addEventListener('click', function() {
      var wasActive = block.classList.contains('active-sprint');
      
      // Remove all active
      blocks.forEach(function(b) { b.classList.remove('active-sprint'); });
      
      if (wasActive) {
        panel.classList.remove('open');
        return;
      }
      
      block.classList.add('active-sprint');
      var data = sprintData[index];
      if (!data) return;
      
      document.getElementById('sprintDetailTitle').textContent = data.name;
      
      var meetingsUl = document.getElementById('sprintMeetingsList');
      meetingsUl.innerHTML = data.meetings.map(function(m) { return '<li>' + m + '</li>'; }).join('');
      
      var deliverablesUl = document.getElementById('sprintDeliverablesList');
      deliverablesUl.innerHTML = data.deliverables.map(function(d) { return '<li>' + d + '</li>'; }).join('');
      
      panel.classList.add('open');
    });
  });
})();

/* ═══════════════════════════════════════
   FEATURE 3: COLLAPSIBLE ORG CHART
   ═══════════════════════════════════════ */
(function() {
  // Find all org-wire-box elements in the division level (not DSD/CTO)
  var divisionBoxes = document.querySelectorAll('.org-wire-level.has-hline .org-wire-box');
  
  divisionBoxes.forEach(function(box) {
    var items = box.querySelector('.owb-items');
    var extraDivs = [];
    // Gather child elements after owb-sub that aren't owb-title or owb-sub
    var children = Array.from(box.children);
    var collapsible = [];
    var foundSub = false;
    children.forEach(function(child) {
      if (child.classList && child.classList.contains('owb-sub')) foundSub = true;
      else if (foundSub) collapsible.push(child);
    });
    
    if (collapsible.length === 0) return;
    
    // Create wrapper
    var body = document.createElement('div');
    body.className = 'org-division-body';
    collapsible.forEach(function(el) {
      body.appendChild(el);
    });
    box.appendChild(body);
    
    // Make the header clickable
    box.classList.add('org-division-toggle');
    box.addEventListener('click', function() {
      box.classList.toggle('expanded');
      body.classList.toggle('open');
    });
  });
})();

window.toggleAllOrg = function() {
  var boxes = document.querySelectorAll('.org-division-toggle');
  var btn = document.getElementById('orgExpandBtn');
  var anyCollapsed = false;
  boxes.forEach(function(b) {
    if (!b.classList.contains('expanded')) anyCollapsed = true;
  });
  
  boxes.forEach(function(b) {
    var body = b.querySelector('.org-division-body');
    if (anyCollapsed) {
      b.classList.add('expanded');
      if (body) body.classList.add('open');
    } else {
      b.classList.remove('expanded');
      if (body) body.classList.remove('open');
    }
  });
  
  if (btn) btn.textContent = anyCollapsed ? 'Collapse All' : 'Expand All';
};

/* ═══════════════════════════════════════
   FEATURE 4: MEETING TAB FILTERING
   ═══════════════════════════════════════ */
window.showMeetingTab = function(tab) {
  var table = document.getElementById('meetingTable');
  if (!table) return;
  var rows = table.querySelectorAll('tbody tr');
  
  // Update active tab
  document.querySelectorAll('.meeting-tab').forEach(function(t) {
    t.classList.toggle('active', t.getAttribute('data-tab') === tab);
  });
  
  // Phase mapping by row index
  var rowPhases = {
    0: 'psb', 1: 'psb', 2: 'psb', 3: 'psb', 4: 'psb',  // PSB week meetings
    5: 'sprint',  // Daily Standup
    6: 'midpoint', 7: 'midpoint',  // Scrum of Scrums, Midpoint Check-in
    8: 'sprint',  // Sprint Boundary AAR
    9: 'sprint',  // AAR w/ DSD
    10: 'sprint', // ART Back-Brief
    11: 'demo', 12: 'demo'  // Demo, Retro
  };
  
  rows.forEach(function(row, i) {
    var phase = rowPhases[i] || 'sprint';
    if (tab === 'all') {
      row.style.display = '';
    } else {
      row.style.display = (phase === tab) ? '' : 'none';
    }
  });
};

/* ═══════════════════════════════════════
   FEATURE 5: SYNC MATRIX ROLE FILTER
   ═══════════════════════════════════════ */
window.filterSyncRole = function(role) {
  var table = document.querySelector('.sync-table');
  if (!table) return;
  var rows = table.querySelectorAll('tbody tr');
  
  // Update active button
  document.querySelectorAll('.sync-filter-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-role') === role);
  });
  
  if (role === 'all') {
    rows.forEach(function(row) {
      row.classList.remove('dimmed', 'highlighted');
    });
    return;
  }
  
  var idx = parseInt(role);
  rows.forEach(function(row, i) {
    if (i === idx) {
      row.classList.remove('dimmed');
      row.classList.add('highlighted');
    } else {
      row.classList.add('dimmed');
      row.classList.remove('highlighted');
    }
  });
};

/* ═══════════════════════════════════════
   FEATURE 6: COLLAPSIBLE CONSIDERATIONS
   ═══════════════════════════════════════ */
(function() {
  var considerCols = document.querySelectorAll('.consider-col');
  
  considerCols.forEach(function(col) {
    var headings = col.querySelectorAll('h3');
    var groups = [];
    var current = null;
    
    Array.from(col.children).forEach(function(child) {
      if (child.tagName === 'H3') {
        if (current) groups.push(current);
        current = { heading: child, content: [] };
      } else if (current) {
        current.content.push(child);
      }
    });
    if (current) groups.push(current);
    
    // Clear the column and rebuild with accordions
    col.innerHTML = '';
    
    groups.forEach(function(group, idx) {
      var section = document.createElement('div');
      section.className = 'accordion-section' + (idx === 0 ? ' open' : '');
      
      var header = document.createElement('div');
      header.className = 'accordion-header';
      header.innerHTML = '<h3>' + group.heading.textContent + '</h3><span class="acc-chevron">▸</span>';
      
      var body = document.createElement('div');
      body.className = 'accordion-body';
      var inner = document.createElement('div');
      inner.className = 'accordion-body-inner';
      group.content.forEach(function(el) {
        inner.appendChild(el.cloneNode(true));
      });
      body.appendChild(inner);
      
      section.appendChild(header);
      section.appendChild(body);
      
      header.addEventListener('click', function() {
        section.classList.toggle('open');
      });
      
      col.appendChild(section);
    });
  });
})();
