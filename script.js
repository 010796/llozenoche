const shell = document.getElementById('imageShell');
const poster = document.getElementById('poster');
const animateBtn = document.getElementById('animateBtn');
const poemBtn = document.getElementById('poemBtn');
const dialog = document.getElementById('poemDialog');
const closePoem = document.getElementById('closePoem');

let zoomed = false;
let dragging = false;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;

shell.addEventListener('click', () => {
  zoomed = !zoomed;
  shell.classList.toggle('zoomed', zoomed);
  if (!zoomed) {
    offsetX = 0; offsetY = 0;
    poster.style.transform = '';
  }
});

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

animateBtn.addEventListener('click', () => {
  shell.classList.toggle('animate');
  animateBtn.textContent = shell.classList.contains('animate') ? 'Pausar movimiento' : 'Ver cielo en movimiento';
});

poemBtn.addEventListener('click', () => dialog.showModal());
closePoem.addEventListener('click', () => dialog.close());
