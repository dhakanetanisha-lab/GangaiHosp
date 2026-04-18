let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

// Initialize first slide
if (totalSlides > 0) {
  slides[currentIndex].classList.add('active');
}
dots[currentIndex]?.classList.add('active');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
}

// Start auto slide (3 seconds)
function startAutoSlide() {
  if (totalSlides > 1) {
    const autoSlideTime = 6000; // 6 seconds
    autoSlideInterval = setInterval(nextSlide, autoSlideTime);
  }
}


// Reset auto slide when manually clicked
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Button events
document.querySelector('.next')?.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

document.querySelector('.prev')?.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Start on load
startAutoSlide();

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showSlide(currentIndex);
    resetAutoSlide();
  });
});
