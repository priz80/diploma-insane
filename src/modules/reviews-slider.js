const reviewsSliderModule = () => {
  const slider = document.querySelector(".reviews-slider");
  if (!slider) return;

  const wrap = document.querySelector(".reviews-slider-wrap");
  const slides = [...slider.querySelectorAll(".reviews-slider__slide")];
  const arrowLeft = document.querySelector("#reviews-arrow_left");
  const arrowRight = document.querySelector("#reviews-arrow_right");
  const dots = [...document.querySelectorAll(".dot-reviews")];

  if (slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Позиционируем все слайды абсолютно друг над другом
  slides.forEach((slide) => {
    slide.style.position = "absolute";
    slide.style.top = "0";
    slide.style.left = "0";
    slide.style.width = "100%";
    slide.style.transition = "opacity 0.4s ease";
  });

  // Обновляем позиции и точки
  function updateSlides() {
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.style.opacity = "1";
        slide.style.zIndex = "2";
        slide.style.pointerEvents = "auto";
      } else {
        slide.style.opacity = "0";
        slide.style.zIndex = "0";
        slide.style.pointerEvents = "none";
      }
    });

    // Обновляем точки
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add("dot_active");
      } else {
        dot.classList.remove("dot_active");
      }
    });

    // Обновляем стрелки
    if (arrowLeft) {
      arrowLeft.style.display = currentIndex > 0 ? "" : "none";
    }
    if (arrowRight) {
      arrowRight.style.display = currentIndex === totalSlides - 1 ? "none" : "";
    }
  }

  // Переключение влево
  function slideLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlides();
    }
  }

  // Переключение вправо
  function slideRight() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlides();
    }
  }

  // Обработчики кликов по стрелкам
  if (arrowLeft) {
    arrowLeft.addEventListener("click", slideLeft);
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", slideRight);
  }

  // Обработчики кликов по точкам
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlides();
    });
  });

  // Touch/swipe поддержка
  let touchStartX = 0;
  let touchEndX = 0;

  wrap.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  wrap.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slideRight();
      } else {
        slideLeft();
      }
    }
  }, { passive: true });

  // Инициализация
  updateSlides();
};

module.exports = reviewsSliderModule;
