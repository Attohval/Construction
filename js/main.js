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

if (menuToggle && menuClose && menuOverlay && mobileMenu) {
  menuToggle.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("click", (event) => {
    if (!mobileMenu.classList.contains("open")) return;
    if (!(event.target instanceof Element)) return;

    const clickedInsideMenu = mobileMenu.contains(event.target);
    const clickedMenuToggle = menuToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedMenuToggle) closeMenu();
  });
}

const slides = Array.from(document.querySelectorAll("[data-hero-slide]"));
const heroSlider = document.querySelector("[data-hero-slider]");
const prevBtn = document.querySelector("[data-hero-prev]");
const nextBtn = document.querySelector("[data-hero-next]");
let currentIndex = 0;
let slideTimer;

const syncHeroSliderHeight = () => {
  if (!heroSlider || !slides.length) return;

  if (window.matchMedia("(max-width: 460px)").matches) {
    const activeSlide = slides[currentIndex];
    const slideImage = activeSlide.querySelector("img");
    const slideContent = activeSlide.querySelector(".slide-content");
    const sliderWidth = heroSlider.clientWidth;
    let nextHeight = 0;
    let contentHeight = 0;

    if (slideImage && slideImage.naturalWidth > 0 && sliderWidth > 0) {
      nextHeight = Math.round((sliderWidth * slideImage.naturalHeight) / slideImage.naturalWidth);
    }

    if (slideContent) {
      contentHeight = slideContent.scrollHeight;
    }

    if (nextHeight <= 0) {
      nextHeight = Math.round(window.innerHeight * 0.62);
    }

    heroSlider.style.height = `${Math.max(360, nextHeight, contentHeight)}px`;
    return;
  }

  heroSlider.style.height = "";
};

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
  syncHeroSliderHeight();
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
  slideTimer = window.setInterval(nextSlide, 5000);
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
syncHeroSliderHeight();
window.addEventListener("resize", syncHeroSliderHeight);
window.addEventListener("load", syncHeroSliderHeight);
slides.forEach((slide) => {
  const slideImage = slide.querySelector("img");
  if (slideImage) slideImage.addEventListener("load", syncHeroSliderHeight);
});
