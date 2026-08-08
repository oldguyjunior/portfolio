// Click a gallery photo to open it enlarged in an overlay with its data-caption.
// Close via the x button, clicking the backdrop, or Esc.
const overlay = document.createElement('div');
overlay.className = 'lightbox';
overlay.innerHTML = `
  <button class="lightbox-close" aria-label="Close">&times;</button>
  <figure>
    <img alt="">
    <figcaption></figcaption>
  </figure>
`;
document.body.appendChild(overlay);

const overlayImg = overlay.querySelector('img');
const overlayCaption = overlay.querySelector('figcaption');

function open(img) {
  overlayImg.src = img.src;
  overlayImg.alt = img.alt;
  overlayCaption.textContent = img.dataset.caption || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function close() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => open(img));
});

overlay.addEventListener('click', e => {
  if (e.target !== overlayImg) close();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});
