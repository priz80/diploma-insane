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
  

  // Устанавливаем активный
  function setActiveSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        slide.style.opacity = "1";
        slide.style.scale = "1";
        slider.style.transform = "translateX()";
      } else {
        slide.classList.remove("active");
        slide.style.opacity = "0.4";
        slide.style.scale = "0.9";
        slider.style.transform = "translateX()";
      }
    });
  }

  // Инициализация
  setActiveSlide(currentIndex);

  function slideLeft() {
    
    currentIndex = (currentIndex + 1) % totalSlides;
    setActiveSlide(currentIndex);
  }

  function slideRight() {

    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setActiveSlide(currentIndex);
  }

  // Обработчики кликов
  if (arrowLeft) {
    arrowLeft.addEventListener("click", slideLeft);
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", slideRight);
  }
};

module.exports = formulaSliderModule;
