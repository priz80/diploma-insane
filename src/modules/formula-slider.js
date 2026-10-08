const formulaSliderModule = () => {
  const sliderWrap = document.querySelector(".formula-slider-wrap");

  if (!sliderWrap) return;

  const slider = sliderWrap.querySelector(".formula-slider");
  const slides = [...sliderWrap.querySelectorAll(".formula-slider__slide")];
  const arrowLeft = sliderWrap.querySelector("#formula-arrow_left");
  const arrowRight = sliderWrap.querySelector("#formula-arrow_right");

  if (!slider || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Позиционируем все слайды абсолютно друг над другом
  slides.forEach((slide) => {
    slide.style.position = "absolute";
    slide.style.top = "0";
    slide.style.left = "0";
    slide.style.width = "100%";
    slide.style.height = "100%";
    slide.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Обновляем позиции всех слайдов относительно активного
  function updateSlidePositions() {
    slides.forEach((slide, i) => {
      // Вычисляем расстояние от активного слайда с учетом зацикливания
      let diff = i - currentIndex;

      // Корректируем для бесконечной карусели
      if (diff > totalSlides / 2) diff -= totalSlides;
      if (diff < -totalSlides / 2) diff += totalSlides;

      if (diff === 0) {
        // Активный слайд по центру
        slide.style.transform = "translateX(0)";
        slide.style.opacity = "1";
        slide.style.scale = "1";
        slide.style.zIndex = "2";
        slide.style.pointerEvents = "auto";
      } else if (diff === -1) {
        // Предыдущий слайд слева
        const isMobile = window.innerWidth <= 767;
        slide.style.transform = isMobile ? "translateX(-100%)" : "translateX(-30%)";
        slide.style.opacity = "0.4";
        slide.style.scale = "0.9";
        slide.style.zIndex = "1";
        slide.style.pointerEvents = "none";
      } else if (diff === 1) {
        // Следующий слайд справа
        const isMobile = window.innerWidth <= 767;
        slide.style.transform = isMobile ? "translateX(100%)" : "translateX(30%)";
        slide.style.opacity = "0.4";
        slide.style.scale = "0.9";
        slide.style.zIndex = "1";
        slide.style.pointerEvents = "none";
      } else {
        // Все остальные скрыты
        slide.style.transform = "translateX(0)";
        slide.style.opacity = "0";
        slide.style.scale = "0.9";
        slide.style.zIndex = "0";
        slide.style.pointerEvents = "none";
      }
    });
  }

  // Переключение влево (показываем предыдущий)
  function slideLeft() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePositions();
  }

  // Переключение вправо (показываем следующий)
  function slideRight() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePositions();
  }

  // Инициализация
  updateSlidePositions();

  // Обработчики кликов
  if (arrowLeft) {
    arrowLeft.addEventListener("click", slideLeft);
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", slideRight);
  }
};

module.exports = formulaSliderModule;
