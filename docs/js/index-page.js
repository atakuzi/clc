/* ODT Capability Lifecycle - Main JavaScript */

function debounce(fn, delay) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getScrollBehavior() {
  return prefersReducedMotion ? 'auto' : 'smooth';
}

function setExpandedState(trigger, content, isOpen) {
  if (!trigger || !content) return;

  trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  content.hidden = false;
  content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';

  if (!isOpen) {
    window.setTimeout(function() {
      if (trigger.getAttribute('aria-expanded') === 'false') {
        content.hidden = true;
      }
    }, prefersReducedMotion ? 0 : 400);
  }
}

function fillList(list, items) {
  if (!list) return;
  list.replaceChildren();

  items.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

function buildAccordionHeader(titleText) {
  var header = document.createElement('button');
  header.type = 'button';
  header.className = 'accordion-header';

  var title = document.createElement('h3');
  title.textContent = titleText;

  var chevron = document.createElement('span');
  chevron.className = 'acc-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.textContent = '\u25b8';

  header.appendChild(title);
  header.appendChild(chevron);
  return header;
}

function getAppData() {
  return window.APP_DATA || { sprintBlocks: [], meetings: [], syncMatrix: [], syncFilterRoles: [] };
}

function appendHtmlCell(row, cellData) {
  var cell = document.createElement('td');
  cell.innerHTML = cellData.html;

  if (cellData.className) cell.className = cellData.className;
  if (cellData.colspan) cell.colSpan = cellData.colspan;
  if (cellData.style) cell.style.cssText = cellData.style;

  row.appendChild(cell);
}

function renderSprintBlocks() {
  var sprintBar = document.getElementById('sprintBar');
  if (!sprintBar) return;

  var data = getAppData().sprintBlocks || [];
  var markerNodes = Array.from(sprintBar.children);
  sprintBar.replaceChildren();

  data.forEach(function(blockData) {
    var block = document.createElement('button');
    var subtitle = document.createElement('span');

    block.type = 'button';
    block.className = 'sprint-block ' + blockData.className;
    block.style.flex = String(blockData.flex);
    block.innerHTML = blockData.label;

    subtitle.className = 'sp-sub';
    subtitle.innerHTML = blockData.subtitle;
    block.appendChild(subtitle);
    sprintBar.appendChild(block);
  });

  markerNodes.forEach(function(node) {
    sprintBar.appendChild(node);
  });
}

function renderMeetingRows() {
  var body = document.getElementById('meetingTableBody');
  if (!body) return;

  body.replaceChildren();

  (getAppData().meetings || []).forEach(function(rowData) {
    var row = document.createElement('tr');
    row.setAttribute('data-phase', rowData.phase);
    if (rowData.style) row.style.cssText = rowData.style;

    rowData.cells.forEach(function(cellHtml) {
      appendHtmlCell(row, { html: cellHtml });
    });

    body.appendChild(row);
  });
}

function renderSyncMatrixRows() {
  var body = document.getElementById('syncTableBody');
  if (!body) return;

  body.replaceChildren();

  (getAppData().syncMatrix || []).forEach(function(rowData) {
    var row = document.createElement('tr');

    if (rowData.role) row.setAttribute('data-role', rowData.role);

    rowData.cells.forEach(function(cellData) {
      appendHtmlCell(row, cellData);
    });

    body.appendChild(row);
  });
}

function renderSyncFilterButtons() {
  var filterBar = document.getElementById('syncFilterBar');
  if (!filterBar) return;

  filterBar.replaceChildren();

  var allButton = document.createElement('button');
  allButton.type = 'button';
  allButton.className = 'sync-filter-btn active';
  allButton.setAttribute('data-role', 'all');
  allButton.textContent = 'All Roles';
  filterBar.appendChild(allButton);

  (getAppData().syncFilterRoles || []).forEach(function(filterData) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'sync-filter-btn';
    button.setAttribute('data-role', filterData.role);
    button.innerHTML = filterData.label;
    filterBar.appendChild(button);
  });
}

function renderAppData() {
  renderSprintBlocks();
  renderMeetingRows();
  renderSyncFilterButtons();
  renderSyncMatrixRows();
}

renderAppData();

function drawIterativeArrow() {
  var svg = document.getElementById('iterativeArrowSvg');
  if (!svg) return;

  var steps = document.querySelectorAll('#sdlcPipeline > .step');
  var concept = steps[1];
  var execSust = steps[3];
  if (!concept || !execSust) return;

  var svgRect = svg.getBoundingClientRect();
  var cRect = concept.querySelector('.circle-wrap').getBoundingClientRect();
  var eRect = execSust.querySelector('.circle-wrap').getBoundingClientRect();

  var sx = eRect.left + eRect.width / 2 - svgRect.left;
  var sy = 8;
  var tx = cRect.left + cRect.width / 2 - svgRect.left;
  var ty = 8;
  var curveY = 50;

  svg.querySelectorAll('.iter-path,.iter-label').forEach(function(el) {
    el.remove();
  });

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.classList.add('iter-path');
  path.setAttribute('d', 'M ' + sx + ' ' + sy + ' C ' + sx + ' ' + curveY + ', ' + tx + ' ' + curveY + ', ' + tx + ' ' + ty);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#2563eb');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-dasharray', '8,4');
  path.setAttribute('marker-end', 'url(#arrow-iter)');
  svg.appendChild(path);

  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.classList.add('iter-label');
  text.setAttribute('x', (sx + tx) / 2);
  text.setAttribute('y', curveY + 2);
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('font-size', '11');
  text.setAttribute('font-weight', '600');
  text.setAttribute('font-style', 'italic');
  text.setAttribute('fill', '#2563eb');
  text.setAttribute('font-family', 'Inter, sans-serif');
  text.textContent = 'As Needed';
  svg.appendChild(text);
}

function showImplView(view) {
  var roleView = document.getElementById('implRole');
  var timelineView = document.getElementById('implTimeline');
  if (!roleView || !timelineView) return;

  roleView.classList.toggle('active', view === 'role');
  timelineView.classList.toggle('active', view === 'timeline');

  document.querySelectorAll('.impl-toggle button[data-view]').forEach(function(btn) {
    var isActive = btn.getAttribute('data-view') === view;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  scheduleLayoutRefresh();
}

function drawMappingLines() {
  var svg = document.getElementById('mappingSvg');
  if (!svg) return;

  svg.querySelectorAll('.map-line').forEach(function(el) {
    el.remove();
  });

  var hermesSteps = document.querySelectorAll('#hermesPipeline > .step');
  var sdlcSteps = document.querySelectorAll('#sdlcPipeline > .step');
  var mappings = [[0, 0], [1, 0], [1, 1], [3, 2], [4, 3], [4, 4]];

  mappings.forEach(function(pair) {
    var hStep = hermesSteps[pair[0]];
    var sStep = sdlcSteps[pair[1]];
    if (!hStep || !sStep) return;

    var hRect = hStep.querySelector('.circle-wrap').getBoundingClientRect();
    var sRect = sStep.querySelector('.circle-wrap').getBoundingClientRect();
    var sx = hRect.left + hRect.width / 2;
    var sy = hRect.bottom;
    var tx = sRect.left + sRect.width / 2;
    var ty = sRect.top;
    var midY = (sy + ty) / 2 + 10;

    var line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.classList.add('map-line');
    line.setAttribute('d', 'M ' + sx + ' ' + sy + ' C ' + sx + ' ' + midY + ', ' + tx + ' ' + midY + ', ' + tx + ' ' + ty);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#94a3b8');
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-dasharray', '6,4');
    line.setAttribute('opacity', '0.6');
    line.setAttribute('marker-end', 'url(#arrow-map)');
    svg.appendChild(line);
  });

  var cgStep = hermesSteps[2];
  var conceptStep = sdlcSteps[0];
  var devStep = sdlcSteps[1];
  if (!cgStep || !conceptStep || !devStep) return;

  var hRect = cgStep.querySelector('.circle-wrap').getBoundingClientRect();
  var cRect = conceptStep.querySelector('.circle-wrap').getBoundingClientRect();
  var dRect = devStep.querySelector('.circle-wrap').getBoundingClientRect();
  var sx = hRect.left + hRect.width / 2;
  var sy = hRect.bottom;
  var tx = (cRect.right + dRect.left) / 2;
  var ty = (cRect.top + dRect.top) / 2;
  var midY = (sy + ty) / 2 + 10;

  var line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.classList.add('map-line');
  line.setAttribute('d', 'M ' + sx + ' ' + sy + ' C ' + sx + ' ' + midY + ', ' + tx + ' ' + midY + ', ' + tx + ' ' + ty);
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', '#7c3aed');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-dasharray', '6,4');
  line.setAttribute('opacity', '0.7');
  line.setAttribute('marker-end', 'url(#arrow-map)');
  svg.appendChild(line);
}

function drawZoomLine() {
  var svg = document.getElementById('zoomLine');
  var canvas = document.querySelector('.canvas');
  var img = document.querySelector('.graphic-frame img');
  var box = document.querySelector('.zoom-dashed-box');
  if (!svg || !canvas || !img || !box) return;

  svg.replaceChildren();

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

function redrawDynamicLayouts() {
  drawIterativeArrow();
  drawMappingLines();
  drawZoomLine();
}

var scheduleLayoutRefresh = debounce(redrawDynamicLayouts, 60);

/* Scroll-spy navigation */
(function() {
  var navLinks = document.querySelectorAll('#navLinks a[data-section]');
  var navJump = document.getElementById('navJump');
  var sections = [];

  navLinks.forEach(function(link) {
    var id = link.getAttribute('data-section');
    var el = document.getElementById(id);
    if (el) sections.push({ el: el, link: link });
  });

  function updateActiveNav() {
    var navHeight = 80;
    var current = null;

    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].el.getBoundingClientRect().top <= navHeight + 60) {
        current = sections[i];
        break;
      }
    }

    navLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    if (current) {
      current.link.classList.add('active');
      if (navJump) navJump.value = current.link.getAttribute('data-section');
    }
  }

  if (navJump) {
    navJump.addEventListener('change', function() {
      var target = document.getElementById(navJump.value);
      if (!target) return;
      target.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
    });
  }

  window.addEventListener('scroll', debounce(updateActiveNav, 50));
  updateActiveNav();
})();

/* Scroll animations */
(function() {
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

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }

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
})();

window.addEventListener('load', drawIterativeArrow);
window.addEventListener('load', drawMappingLines);
window.addEventListener('load', function() {
  setTimeout(drawZoomLine, 300);
});
window.addEventListener('resize', debounce(redrawDynamicLayouts, 150));

/* Mobile scroll helper */
(function() {
  var targets = ['psbCycle', 'orgChart', 'meetingOverview', 'considerations', 'syncMatrix', 'safeBackground', 'capLifecycle', 'implGuide'];
  var labels = ['PSB Cycle', 'Org Chart', 'Meetings', 'Considerations', 'Sync Matrix', 'SAFe', 'Cap Lifecycle', 'Impl Guide'];
  var label = document.getElementById('scrollLabel');
  if (!label) return;

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
    label.textContent = labels[getNextIdx()];
  }

  window.scrollNext = function() {
    var idx = getNextIdx();
    var el = document.getElementById(targets[idx]);
    if (!el) return;
    el.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
    setTimeout(updateLabel, 400);
  };

  window.addEventListener('scroll', updateLabel);
  updateLabel();
})();

/* Pipeline drawers */
(function() {
  document.querySelectorAll('.step').forEach(function(step, index) {
    var trigger = step.querySelector('.step-trigger');
    var drawer = step.querySelector('.step-drawer');
    if (!trigger || !drawer) return;

    if (!drawer.id) drawer.id = 'step-drawer-' + index;
    drawer.hidden = true;
    trigger.setAttribute('aria-controls', drawer.id);
    trigger.setAttribute('aria-expanded', 'false');

    function toggleStepDrawer() {
      var wasOpen = drawer.classList.contains('open');

      document.querySelectorAll('.step-drawer.open').forEach(function(openDrawer) {
        var openStep = openDrawer.closest('.step');
        var openTrigger = openStep ? openStep.querySelector('.step-trigger') : null;
        openDrawer.classList.remove('open');
        if (openStep) {
          openStep.classList.remove('active-drawer');
          setExpandedState(openTrigger, openDrawer, false);
        }
      });

      if (!wasOpen) {
        drawer.classList.add('open');
        step.classList.add('active-drawer');
        setExpandedState(trigger, drawer, true);
      }

      scheduleLayoutRefresh();
    }

    trigger.addEventListener('click', function() {
      toggleStepDrawer();
    });
  });
})();

/* Sprint stepper */
(function() {
  var sprintData = getAppData().sprintBlocks || [];
  var blocks = document.querySelectorAll('.sprint-bar .sprint-block');
  var panel = document.getElementById('sprintDetailPanel');
  if (!panel || blocks.length === 0) return;

  blocks.forEach(function(block, index) {
    block.setAttribute('aria-expanded', 'false');

    function toggleSprintPanel() {
      var wasActive = block.classList.contains('active-sprint');

      blocks.forEach(function(other) {
        other.classList.remove('active-sprint');
        other.setAttribute('aria-expanded', 'false');
      });

      if (wasActive) {
        panel.classList.remove('open');
        panel.style.maxHeight = '0px';
        scheduleLayoutRefresh();
        return;
      }

      var data = sprintData[index];
      if (!data) return;

      block.classList.add('active-sprint');
      block.setAttribute('aria-expanded', 'true');
      document.getElementById('sprintDetailTitle').textContent = data.name;
      fillList(document.getElementById('sprintMeetingsList'), data.meetings);
      fillList(document.getElementById('sprintDeliverablesList'), data.deliverables);

      panel.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      scheduleLayoutRefresh();
    }

    block.addEventListener('click', toggleSprintPanel);
  });
})();

/* Collapsible org chart */
(function() {
  var divisionBoxes = document.querySelectorAll('.org-wire-level.has-hline .org-wire-box');

  divisionBoxes.forEach(function(box, index) {
    var children = Array.from(box.children);
    var collapsible = [];
    var foundSub = false;

    children.forEach(function(child) {
      if (child.classList && child.classList.contains('owb-sub')) {
        foundSub = true;
      } else if (foundSub) {
        collapsible.push(child);
      }
    });

    if (collapsible.length === 0) return;

    var body = document.createElement('div');
    body.className = 'org-division-body';
    body.id = 'org-division-body-' + index;
    body.hidden = true;

    collapsible.forEach(function(el) {
      body.appendChild(el);
    });
    box.appendChild(body);

    box.classList.add('org-division-toggle');
    box.setAttribute('role', 'button');
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-controls', body.id);
    box.setAttribute('aria-expanded', 'false');

    function toggleOrgBox(forceOpen) {
      var shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !box.classList.contains('expanded');
      box.classList.toggle('expanded', shouldOpen);
      body.classList.toggle('open', shouldOpen);
      setExpandedState(box, body, shouldOpen);
      scheduleLayoutRefresh();
    }

    box.addEventListener('click', function() {
      toggleOrgBox();
    });

    box.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleOrgBox();
      }
    });

    box._toggleOrgBox = toggleOrgBox;
  });
})();

window.toggleAllOrg = function() {
  var boxes = document.querySelectorAll('.org-division-toggle');
  var btn = document.getElementById('orgExpandBtn');
  var anyCollapsed = false;

  boxes.forEach(function(box) {
    if (!box.classList.contains('expanded')) anyCollapsed = true;
  });

  boxes.forEach(function(box) {
    if (typeof box._toggleOrgBox === 'function') {
      box._toggleOrgBox(anyCollapsed);
    }
  });

  if (btn) btn.textContent = anyCollapsed ? 'Collapse All' : 'Expand All';
};

window.showMeetingTab = function(tab) {
  var table = document.getElementById('meetingTable');
  if (!table) return;

  document.querySelectorAll('.meeting-tab').forEach(function(t) {
    var isActive = t.getAttribute('data-tab') === tab;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  table.querySelectorAll('tbody tr').forEach(function(row) {
    var phase = row.getAttribute('data-phase');
    row.style.display = (tab === 'all' || phase === tab) ? '' : 'none';
  });
};

window.filterSyncRole = function(role) {
  var table = document.querySelector('.sync-table');
  if (!table) return;

  document.querySelectorAll('.sync-filter-btn').forEach(function(btn) {
    var isActive = btn.getAttribute('data-role') === role;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  table.querySelectorAll('tbody tr').forEach(function(row) {
    if (role === 'all') {
      row.classList.remove('dimmed', 'highlighted');
      return;
    }

    if (row.getAttribute('data-role') === role) {
      row.classList.remove('dimmed');
      row.classList.add('highlighted');
    } else {
      row.classList.add('dimmed');
      row.classList.remove('highlighted');
    }
  });
};

/* Collapsible considerations */
(function() {
  var considerCols = document.querySelectorAll('.consider-col');

  considerCols.forEach(function(col, colIndex) {
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

    col.replaceChildren();

    groups.forEach(function(group, idx) {
      var isOpen = idx === 0;
      var section = document.createElement('div');
      section.className = 'accordion-section' + (isOpen ? ' open' : '');

      var header = buildAccordionHeader(group.heading.textContent);
      var body = document.createElement('div');
      body.className = 'accordion-body';
      body.id = 'accordion-body-' + colIndex + '-' + idx;
      body.hidden = !isOpen;

      var inner = document.createElement('div');
      inner.className = 'accordion-body-inner';
      group.content.forEach(function(el) {
        inner.appendChild(el.cloneNode(true));
      });
      body.appendChild(inner);

      header.setAttribute('aria-controls', body.id);
      section.appendChild(header);
      section.appendChild(body);
      setExpandedState(header, body, isOpen);

      header.addEventListener('click', function() {
        var nextOpen = !section.classList.contains('open');
        section.classList.toggle('open', nextOpen);
        setExpandedState(header, body, nextOpen);
        scheduleLayoutRefresh();
      });

      col.appendChild(section);
    });
  });
})();

/* Wiring for buttons without inline handlers */
(function() {
  var navBrand = document.getElementById('navBrand');
  if (navBrand) {
    navBrand.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
    });
  }

  var orgExpandBtn = document.getElementById('orgExpandBtn');
  if (orgExpandBtn) {
    orgExpandBtn.addEventListener('click', function() {
      window.toggleAllOrg();
    });
  }

  var meetingTabs = document.getElementById('meetingTabs');
  if (meetingTabs) {
    var tabs = Array.from(meetingTabs.querySelectorAll('.meeting-tab'));
    tabs.forEach(function(tab, index) {
      tab.setAttribute('aria-pressed', tab.classList.contains('active') ? 'true' : 'false');
      tab.addEventListener('click', function() {
        window.showMeetingTab(tab.getAttribute('data-tab'));
      });
      tab.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var delta = e.key === 'ArrowRight' ? 1 : -1;
          tabs[(index + delta + tabs.length) % tabs.length].focus();
        }
      });
    });
  }

  var syncFilterBar = document.getElementById('syncFilterBar');
  if (syncFilterBar) {
    syncFilterBar.querySelectorAll('.sync-filter-btn').forEach(function(btn) {
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
      btn.addEventListener('click', function() {
        window.filterSyncRole(btn.getAttribute('data-role'));
      });
    });
  }

  document.querySelectorAll('.impl-toggle button[data-view]').forEach(function(btn) {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', function() {
      showImplView(btn.getAttribute('data-view'));
    });
  });

  var scrollBtn = document.getElementById('scrollBtn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function() {
      window.scrollNext();
    });
  }
})();

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(function() {
    scheduleLayoutRefresh();
  });
}

if ('ResizeObserver' in window) {
  var resizeTarget = document.querySelector('.main-content') || document.body;
  var observer = new ResizeObserver(scheduleLayoutRefresh);
  observer.observe(resizeTarget);
}
