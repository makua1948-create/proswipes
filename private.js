const galleryTrack = document.querySelector('.gallery-track');
const galleryDots = [...document.querySelectorAll('.gallery-dot')];
let galleryIndex = 0;
function showSlide(index) {
  galleryIndex = (index + galleryDots.length) % galleryDots.length;
  galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
  galleryDots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === galleryIndex));
}
document.querySelector('.gallery-prev').addEventListener('click', () => showSlide(galleryIndex - 1));
document.querySelector('.gallery-next').addEventListener('click', () => showSlide(galleryIndex + 1));
galleryDots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));

let touchStart = 0;
galleryTrack.addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, { passive: true });
galleryTrack.addEventListener('touchend', event => {
  const difference = touchStart - event.changedTouches[0].clientX;
  if (Math.abs(difference) > 45) showSlide(galleryIndex + (difference > 0 ? 1 : -1));
}, { passive: true });

const articleSections = document.querySelectorAll('.content-nav, .detail-section');
articleSections.forEach(section => section.classList.add('article-reveal'));
const articleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      articleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
articleSections.forEach(section => articleObserver.observe(section));
