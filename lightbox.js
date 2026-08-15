// Click a gallery photo to open it enlarged. Destination covers open a
// navigable collection; individual portfolio images open on their own.
const galleries = {
  marfa: [
    { src: 'photos/marfa/marfa-01.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-02.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-09.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-13.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-10.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-04.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-11.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-05.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-03.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-06.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-12.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' },
    { src: 'photos/marfa/marfa-07.jpeg', alt: 'Marfa, Texas, photographed by Joseph Maya' }
  ]
};

const overlay = document.createElement('div');
overlay.className = 'lightbox';
overlay.innerHTML = `
  <button class="lightbox-close" aria-label="Close">&times;</button>
  <button class="lightbox-nav lightbox-prev" aria-label="Previous photograph">&#8592;</button>
  <figure>
    <img alt="">
    <figcaption></figcaption>
  </figure>
  <button class="lightbox-nav lightbox-next" aria-label="Next photograph">&#8594;</button>
`;
document.body.appendChild(overlay);

const overlayImg = overlay.querySelector('img');
const overlayCaption = overlay.querySelector('figcaption');
const previousButton = overlay.querySelector('.lightbox-prev');
const nextButton = overlay.querySelector('.lightbox-next');
let activeItems = [];
let activeIndex = 0;

function showActiveItem() {
  const item = activeItems[activeIndex];
  overlayImg.src = item.src;
  overlayImg.alt = item.alt || '';
  overlayCaption.textContent = item.caption || '';
  const hasMultipleItems = activeItems.length > 1;
  previousButton.hidden = !hasMultipleItems;
  nextButton.hidden = !hasMultipleItems;
}

function open(items, index = 0) {
  activeItems = items;
  activeIndex = index;
  showActiveItem();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function move(direction) {
  activeIndex = (activeIndex + direction + activeItems.length) % activeItems.length;
  showActiveItem();
}

function close() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const collection = galleries[img.dataset.gallery];
    if (collection) {
      open(collection);
      return;
    }

    open([{ src: img.src, alt: img.alt, caption: img.dataset.caption || '' }]);
  });
});

overlay.querySelector('.lightbox-close').addEventListener('click', close);
previousButton.addEventListener('click', () => move(-1));
nextButton.addEventListener('click', () => move(1));
overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
  if (overlay.classList.contains('open') && e.key === 'ArrowLeft') move(-1);
  if (overlay.classList.contains('open') && e.key === 'ArrowRight') move(1);
});
