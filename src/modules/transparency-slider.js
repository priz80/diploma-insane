const transparencySliderModule = () => {
  const slider = document.querySelector(".transparency-slider");
  if (!slider) return;

  const items = [...slider.querySelectorAll(".transparency-item")];
  const arrowLeft = document.querySelector("#transparency-arrow_left");
  const arrowRight = document.querySelector("#transparency-arrow_right");

  if (items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;
  let initialized = false;

  // Позиционируем все элементы абсолютно друг над другом
  function initSlides() {
    items.forEach((item) => {
      item.style.position = "absolute";
      item.style.top = "0";
      item.style.left = "50%";
      item.style.transform = "translateX(-50%)";
      item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    });
    initialized = true;
  }

  function deinitSlides() {
    items.forEach((item) => {
      item.style.position = "";
      item.style.top = "";
      item.style.left = "";
      item.style.transform = "";
      item.style.transition = "";
    });
    initialized = false;
  }

  // Обновляем позиции всех элементов относительно активного
  function updatePositions() {
    items.forEach((item, i) => {
      if (i === currentIndex) {
        item.style.opacity = "1";
        item.style.transform = "translateX(-50%) scale(1)";
        item.style.zIndex = "2";
        item.style.pointerEvents = "auto";
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateX(-50%) scale(0.9)";
        item.style.zIndex = "0";
        item.style.pointerEvents = "none";
      }
    });

    // Обновляем стрелки
    if (arrowLeft) {
      arrowLeft.style.display = currentIndex > 0 ? "" : "none";
    }
    if (arrowRight) {
      arrowRight.style.display = currentIndex === totalItems - 1 ? "none" : "";
    }
  }

  // Переключение влево
  function slideLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      updatePositions();
    }
  }

  // Переключение вправо
  function slideRight() {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      updatePositions();
    }
  }

  // Обработчики кликов
  if (arrowLeft) {
    arrowLeft.addEventListener("click", slideLeft);
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", slideRight);
  }

  // Touch/swipe поддержка
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
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

  // Инициализация при resize
  function handleResize() {
    if (window.innerWidth <= 1090 && !initialized) {
      initSlides();
      updatePositions();
    } else if (window.innerWidth > 1090 && initialized) {
      deinitSlides();
    }
  }

  // Проверка при загрузке
  handleResize();

  // Слушаем resize
  window.addEventListener("resize", handleResize);

  // === Popup transparency ===
  const initPopupTransparency = () => {
    const popup = document.querySelector(".popup-transparency");
    if (!popup) return;

    const popupSlider = popup.querySelector(".popup-transparency-slider");
    const popupSlides = [...popupSlider.querySelectorAll(".popup-transparency-slider__slide")];
    const popupArrowLeft = popup.querySelector("#transparency_left");
    const popupArrowRight = popup.querySelector("#transparency_right");
    const popupCounterCurrent = popup.querySelector("#transparency-popup-counter .slider-counter-content__current");
    const popupCounterTotal = popup.querySelector("#transparency-popup-counter .slider-counter-content__total");
    const closeButtons = [...popup.querySelectorAll(".close")];

    if (popupSlides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = popupSlides.length;

    // Устанавливаем общее количество в счетчике
    if (popupCounterTotal) {
      popupCounterTotal.textContent = totalSlides;
    }

    // Позиционируем слайды абсолютно
    popupSlides.forEach((slide, i) => {
      slide.style.position = "absolute";
      slide.style.top = "0";
      slide.style.left = "0";
      slide.style.width = "100%";
      slide.style.opacity = i === 0 ? "1" : "0";
      slide.style.zIndex = i === 0 ? "1" : "0";
      slide.style.transition = "opacity 0.4s ease";
      slide.style.pointerEvents = i === 0 ? "auto" : "none";
    });

    function showPopupSlide(index) {
      if (index < 0) return;
      if (index >= totalSlides) return;

      currentSlide = index;

      popupSlides.forEach((slide, i) => {
        if (i === index) {
          slide.style.opacity = "1";
          slide.style.zIndex = "1";
          slide.style.pointerEvents = "auto";
        } else {
          slide.style.opacity = "0";
          slide.style.zIndex = "0";
          slide.style.pointerEvents = "none";
        }
      });

      if (popupCounterCurrent) {
        popupCounterCurrent.textContent = index + 1;
      }

      if (popupArrowLeft) {
        popupArrowLeft.style.display = index === 0 ? "none" : "block";
      }
      if (popupArrowRight) {
        popupArrowRight.style.display = index === totalSlides - 1 ? "none" : "block";
      }
    }

    if (popupArrowLeft) {
      popupArrowLeft.addEventListener("click", () => {
        showPopupSlide(currentSlide - 1);
      });
    }

    if (popupArrowRight) {
      popupArrowRight.addEventListener("click", () => {
        showPopupSlide(currentSlide + 1);
      });
    }

    // Закрытие popup
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        popup.style.visibility = "hidden";
      });
    });

    // Делаем функцию доступной глобально
    window.openTransparencyPopup = function(index) {
      showPopupSlide(index);
      popup.style.visibility = "visible";
    };
  };

  // === Click on item-hover ===
  const initItemHoverClick = () => {
    const itemHovers = [...document.querySelectorAll(".transparency-item .item-hover")];
    itemHovers.forEach((hover, index) => {
      hover.addEventListener("click", () => {
        if (window.openTransparencyPopup) {
          window.openTransparencyPopup(index);
        }
      });
    });
  };

  initPopupTransparency();
  initItemHoverClick();
};

module.exports = transparencySliderModule;
