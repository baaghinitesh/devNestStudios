// Assuming Swiper is already included via CDN or NPM

document.addEventListener('DOMContentLoaded', () => {
  const pr1Slider = new Swiper('.pr1Slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop:true,
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },

    speed: 600,
    navigation: {
      nextEl: '.pr__button-next',
      prevEl: '.pr__button-prev',
    },
    on: {
      slideChange: function () {
        updateSlideZIndex(this);
      },
    },
  });

  const pr2Slider = new Swiper('.pr2Slider', {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });

  // Sync the sliders
  pr1Slider.on('slideChange', function () {
    pr2Slider.slideTo(pr1Slider.activeIndex);
  });

  function updateSlideZIndex(swiperInstance) {
    swiperInstance.slides.forEach((slide, index) => {
      slide.style.zIndex = index === swiperInstance.activeIndex ? 5 : 3;
      slide.querySelector('.pr__num')?.style.setProperty('opacity', index === swiperInstance.activeIndex ? '1' : '0');
    });
  }

  // Initial z-index setup
  updateSlideZIndex(pr1Slider);
});
