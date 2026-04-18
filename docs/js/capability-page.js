/* Capability lifecycle process page */

function debounce(fn, delay) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

var scheduleLayoutRefresh = debounce(drawZoomLine, 60);

window.addEventListener('load', function() {
  setTimeout(drawZoomLine, prefersReducedMotion ? 0 : 300);
});
window.addEventListener('resize', debounce(drawZoomLine, 150));

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(function() {
    scheduleLayoutRefresh();
  });
}

if ('ResizeObserver' in window) {
  var resizeTarget = document.querySelector('.canvas') || document.body;
  var observer = new ResizeObserver(scheduleLayoutRefresh);
  observer.observe(resizeTarget);
}
