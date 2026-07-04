const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.product-card');
const search = document.querySelector('#product-search');
const empty = document.querySelector('.empty-state');
let activeGame = 'all';

function filterProducts() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const gameMatch = activeGame === 'all' || card.dataset.game === activeGame;
    const searchMatch = card.dataset.name.includes(query);
    const show = gameMatch && searchMatch;
    card.classList.toggle('hide', !show);
    if (show) visible++;
  });
  empty.style.display = visible ? 'none' : 'block';
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  activeGame = tab.dataset.game;
  filterProducts();
}));
search.addEventListener('input', filterProducts);

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
document.querySelectorAll('.buy-button[data-product]').forEach(button => button.addEventListener('click', () => {
  modalTitle.textContent = button.dataset.product;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}));
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menuButton.innerHTML = `<svg><use href="#${open ? 'i-x' : 'i-menu'}"/></svg>`;
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true');
  menuButton.innerHTML = '<svg><use href="#i-menu"/></svg>';
}));

// スクロールに合わせてコンテンツを自然に表示
const revealTargets = document.querySelectorAll('.section-heading, .product-card, .benefit-strip > div, .trust-heading, .trust-items > article, .trust-alert, .guide-copy, .steps > div, .cta > *');
revealTargets.forEach(target => target.classList.add('reveal'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(target => revealObserver.observe(target));
