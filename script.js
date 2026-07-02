const shell = document.getElementById('imageShell');
const poster = document.getElementById('poster');
const enterBtn = document.getElementById('enterBtn');
const animateBtn = document.getElementById('animateBtn');
const poemBtn = document.getElementById('poemBtn');
const dialog = document.getElementById('poemDialog');
const closePoem = document.getElementById('closePoem');

let zoomed = false;
let dragging = false;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;

function resetZoom() {
  zoomed = false;
  shell.classList.remove('zoomed');
  offsetX = 0; offsetY = 0;
  poster.style.transform = '';
}

function toggleZoom() {
  zoomed = !zoomed;
  shell.classList.toggle('zoomed', zoomed);
  if (!zoomed) resetZoom();
}

shell.addEventListener('click', toggleZoom);

shell.addEventListener('pointerdown', (e) => {
  if (!zoomed) return;
  dragging = true;
  shell.setPointerCapture(e.pointerId);
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
});

shell.addEventListener('pointermove', (e) => {
  if (!dragging || !zoomed) return;
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  poster.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.8)`;
});

shell.addEventListener('pointerup', () => { dragging = false; });

function toggleMotion() {
  resetZoom();
  shell.classList.toggle('animate');
  animateBtn.textContent = shell.classList.contains('animate') ? 'Still' : 'Explore';
}

enterBtn.addEventListener('click', () => {
  shell.classList.add('animate');
  animateBtn.textContent = 'Still';
  document.querySelector('.poster-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

animateBtn.addEventListener('click', toggleMotion);
poemBtn.addEventListener('click', () => dialog.showModal());
closePoem.addEventListener('click', () => dialog.close());
