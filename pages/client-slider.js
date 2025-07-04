document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector("#clientSlider .swiper-wrapper");
  const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
  const nextBtns = document.querySelectorAll(".client__button-next");
  const prevBtns = document.querySelectorAll(".client__button-prev");

  let currentIndex = 0;

  const slideWidth = slides[0].offsetWidth;
  wrapper.style.position = "relative";
  wrapper.style.height = `${slides[0].offsetHeight}px`;
  wrapper.style.overflow = "visible";

  // Position slides absolutely in horizontal stack
  slides.forEach((slide, i) => {
    slide.style.position = "absolute";
    slide.style.top = "0";
    slide.style.left = "0";
    slide.style.width = "100%";
    slide.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  });

  function updateSlides() {
    const total = slides.length;

    slides.forEach((slide, i) => {
      const offset = (i - currentIndex + total) % total;

      if (offset === 0) {
        // Current card (top center)
        slide.style.opacity = "1";
        slide.style.zIndex = "100";
        slide.style.pointerEvents = "auto";
        slide.style.transform = `translateX(0px) scale(1)`;
      } else if (offset <= 3) {
        // Cards to the right (visible stack)
        slide.style.opacity = "1";
        slide.style.zIndex = `${100 - offset}`;
        slide.style.pointerEvents = "none";
        slide.style.transform = `translateX(${offset * 40}px) scale(${1 - offset * 0.05})`;
      } else if (offset >= total - 2) {
        // Cards to the left (wrap-around)
        const wrapOffset = offset - total;
        slide.style.opacity = "1";
        slide.style.zIndex = `${100 + wrapOffset}`;
        slide.style.pointerEvents = "none";
        slide.style.transform = `translateX(${wrapOffset * 40}px) scale(${1 + wrapOffset * 0.05})`;
      } else {
        // Hidden cards
        slide.style.opacity = "0";
        slide.style.zIndex = "0";
        slide.style.pointerEvents = "none";
        slide.style.transform = "translateX(0) scale(0.9)";
      }
    });
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  nextBtns.forEach(btn => btn.addEventListener("click", showNext));
  prevBtns.forEach(btn => btn.addEventListener("click", showPrev));

  updateSlides();
});
