const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const mobileMenu = document.querySelector(".nav-mobile");

const openMenu = () => {
  mobileMenu.classList.add("open");
  menuOverlay.classList.add("show");
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
};

const closeMenu = () => {
  mobileMenu.classList.remove("open");
  menuOverlay.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
};

if (menuToggle && menuClose && menuOverlay) {
  menuToggle.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
}

const slides = Array.from(document.querySelectorAll("[data-hero-slide]"));
const prevBtn = document.querySelector("[data-hero-prev]");
const nextBtn = document.querySelector("[data-hero-next]");
let currentIndex = 0;
let slideTimer;

const showSlide = (nextIndex) => {
  if (!slides.length) return;
  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];
  if (currentSlide === nextSlide) return;

  currentSlide.classList.remove("active");
  currentSlide.classList.add("exit-left");

  nextSlide.classList.remove("exit-left");
  nextSlide.classList.add("active");

  window.setTimeout(() => {
    currentSlide.classList.remove("exit-left");
  }, 700);

  currentIndex = nextIndex;
};

const nextSlide = () => {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
};

const prevSlide = () => {
  const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(nextIndex);
};

const startSlider = () => {
  if (!slides.length) return;
  slideTimer = window.setInterval(nextSlide, 3000);
};

const resetSlider = () => {
  if (!slides.length) return;
  window.clearInterval(slideTimer);
  startSlider();
};

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetSlider();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetSlider();
  });
}

startSlider();
