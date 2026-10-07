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
  let isAnimating = false;
  const animationDuration = 200;

  // Инициализация: все слайды opacity 0.4
  slides.forEach((slide, index) => {
    slide.style.transition = `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`;
    slide.classList.remove("active");
  });

  // Устанавливаем первый слайд как активный
  function setActiveSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        slide.style.opacity = "1";
        // slide.style.transform = "scale(1)";
      } else {
        slide.classList.remove("active");
        slide.style.opacity = "0.4";
        // slide.style.transform = "scale(0.95)";
      }
    });
  }

  // Инициализация
  setActiveSlide(currentIndex);

  // Стрелка влево — слайд уходит вниз, следующий становится активным
  function slideLeft() {
    if (isAnimating) return;
    isAnimating = true;

    // Текущий слайд уходит вниз
    // slides[currentIndex].style.opacity = "0";
    // slides[currentIndex].style.transform = "scale(0.5)";

    currentIndex = (currentIndex + 1) % totalSlides;

    setTimeout(() => {
      setActiveSlide(currentIndex);
      isAnimating = false;
    }, animationDuration);
  }

  // Стрелка вправо — слайд уходит вверх, предыдущий становится активным
  function slideRight() {
    if (isAnimating) return;
    isAnimating = true;

    // Текущий слайд уходит вверх
    // slides[currentIndex].style.opacity = "0";
    // slides[currentIndex].style.transform = "scale(0.5)";

    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;

    setTimeout(() => {
      setActiveSlide(currentIndex);
      isAnimating = false;
    }, animationDuration);
  }

  // Обработчики кликов
  if (arrowLeft) {
    arrowLeft.addEventListener("click", slideLeft);
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", slideRight);
  }

  // Свайп для мобильных
  let touchStartY = 0;
  let touchEndY = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slideLeft();  // свайп вверх — следующий слайд
      } else {
        slideRight(); // свайп вниз — предыдущий слайд
      }
    }
  }, { passive: true });
};

module.exports = formulaSliderModule;
