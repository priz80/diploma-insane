const portfolioSliderModule = () => {
  // === Desktop slider (fade) ===
  const initDesktopSlider = () => {
    const slider = document.querySelector(".portfolio-slider");
    if (!slider) return;

    const slides = [...slider.querySelectorAll(".portfolio-slider__slide")];
    const arrowLeft = document.querySelector("#portfolio-arrow_left");
    const arrowRight = document.querySelector("#portfolio-arrow_right");

    if (slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Скрываем все слайды кроме первого
    slides.forEach((slide, i) => {
      slide.style.display = i === 0 ? "flex" : "none";
      slide.style.opacity = i === 0 ? "1" : "0";
      slide.style.transition = "opacity 0.5s ease";
    });

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = "none";
        slide.style.opacity = "0";
      });

      slides[index].style.display = "flex";
      // Небольшая задержка для применения opacity
      requestAnimationFrame(() => {
        slides[index].style.opacity = "1";
      });
    }

    function updateArrows() {
      if (arrowLeft) {
        arrowLeft.style.display = currentIndex > 0 ? "flex" : "none";
      }
      if (arrowRight) {
        arrowRight.style.display = currentIndex === totalSlides - 1 ? "none" : "flex";
      }
    }

    if (arrowLeft) {
      arrowLeft.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          showSlide(currentIndex);
          updateArrows();
        }
      });
    }

    if (arrowRight) {
      arrowRight.addEventListener("click", () => {
        if (currentIndex < totalSlides - 1) {
          currentIndex++;
          showSlide(currentIndex);
          updateArrows();
        }
      });
    }

    updateArrows();
  };

  // === Mobile slider (horizontal) ===
  const initMobileSlider = () => {
    const slider = document.querySelector(".portfolio-slider-mobile");
    if (!slider) return;

    const frames = [...slider.querySelectorAll(".portfolio-slider__slide-frame")];
    const arrowLeft = document.querySelector("#portfolio-arrow-mobile_left");
    const arrowRight = document.querySelector("#portfolio-arrow-mobile_right");
    const counterCurrent = document.querySelector("#portfolio-counter .slider-counter-content__current");
    const counterTotal = document.querySelector("#portfolio-counter .slider-counter-content__total");

    if (frames.length === 0) return;

    // Устанавливаем общее количество в счетчике
    if (counterTotal) {
      counterTotal.textContent = frames.length;
    }

    let currentIndex = 0;

    // Позиционируем слайды абсолютно
    frames.forEach((frame, i) => {
      frame.style.position = "absolute";
      frame.style.top = "0";
      frame.style.left = "0";
      frame.style.width = "100%";
      frame.style.height = "100%";
      frame.style.opacity = i === 0 ? "1" : "0";
      frame.style.zIndex = i === 0 ? "1" : "0";
      frame.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      frame.style.pointerEvents = i === 0 ? "auto" : "none";
    });

    function showFrame(index) {
      if (index < 0) return;
      if (index >= frames.length) return;

      currentIndex = index;

      frames.forEach((frame, i) => {
        if (i === index) {
          frame.style.opacity = "1";
          frame.style.zIndex = "1";
          frame.style.transform = "scale(1)";
          frame.style.pointerEvents = "auto";
        } else {
          frame.style.opacity = "0";
          frame.style.zIndex = "0";
          frame.style.transform = "scale(1.05)";
          frame.style.pointerEvents = "none";
        }
      });

      if (counterCurrent) {
        counterCurrent.textContent = index + 1;
      }

      // Обновляем стрелки
      if (arrowLeft) {
        arrowLeft.style.display = index === 0 ? "none" : "flex";
      }
      if (arrowRight) {
        arrowRight.style.display = index === frames.length - 1 ? "none" : "flex";
      }
    }

    if (arrowLeft) {
      arrowLeft.addEventListener("click", () => {
        showFrame(currentIndex - 1);
      });
    }

    if (arrowRight) {
      arrowRight.addEventListener("click", () => {
        showFrame(currentIndex + 1);
      });
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
        if (diff > 0 && currentIndex < frames.length - 1) {
          showFrame(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          showFrame(currentIndex - 1);
        }
      }
    }, { passive: true });
  };

  // === Popup slider ===
  const initPopupSlider = () => {
    const popup = document.querySelector(".popup-portfolio");
    if (!popup) return;

    const popupSlider = popup.querySelector(".popup-portfolio-slider");
    const popupSlides = [...popupSlider.querySelectorAll(".popup-portfolio-slider__slide")];
    const popupTexts = [...popup.querySelectorAll(".popup-portfolio-text")];
    const popupArrowLeft = popup.querySelector("#popup_portfolio_left");
    const popupArrowRight = popup.querySelector("#popup_portfolio_right");
    const popupCounterCurrent = popup.querySelector("#popup-portfolio-counter .slider-counter-content__current");
    const popupCounterTotal = popup.querySelector("#popup-portfolio-counter .slider-counter-content__total");
    const closeButtons = [...popup.querySelectorAll(".close")];

    if (popupSlides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = popupSlides.length;
    const slidesPerText = Math.floor(totalSlides / popupTexts.length); // 10 / 5 = 2

    // Устанавливаем общее количество в счетчике
    if (popupCounterTotal) {
      popupCounterTotal.textContent = totalSlides;
    }

    // Позиционируем слайды абсолютно для fade-эффекта
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

    // Показываем первый текстовый блок
    if (popupTexts.length > 0) {
      popupTexts[0].style.display = "block";
    }

    function showPopupSlide(index) {
      if (index < 0) return;
      if (index >= totalSlides) return;

      currentSlide = index;

      // Обновляем слайды
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

      // Обновляем счетчик
      if (popupCounterCurrent) {
        popupCounterCurrent.textContent = index + 1;
      }

      // Обновляем текстовый блок
      const textIndex = Math.floor(index / slidesPerText);
      popupTexts.forEach((text, i) => {
        text.style.display = i === textIndex ? "block" : "none";
      });

      // Обновляем стрелки
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

    // Закрытие popup и сброс в начальное состояние
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        popup.style.visibility = "hidden";
        currentSlide = 0;
        showPopupSlide(0);
      });
    });

    // Делаем функцию доступной глобально
    window.openPopup = function(slideGroupIndex) {
      const popupIndex = slideGroupIndex * slidesPerText;
      showPopupSlide(popupIndex);
      popup.style.visibility = "visible";
    };

    window.showPopupSlide = showPopupSlide;
  };

  // === Open popup on frame click ===
  const initFrameClick = () => {
    // Desktop slider frames
    const desktopFrames = document.querySelectorAll(".portfolio-slider__slide-frame");
    desktopFrames.forEach((frame) => {
      frame.addEventListener("click", () => {
        const slide = frame.closest(".portfolio-slider__slide");
        const slides = [...document.querySelectorAll(".portfolio-slider__slide")];
        const index = slides.indexOf(slide);
        if (index !== -1 && window.openPopup) {
          window.openPopup(index);
        }
      });
    });

    // Mobile slider frames
    const mobileFrames = document.querySelectorAll(".portfolio-slider-mobile .portfolio-slider__slide-frame");
    mobileFrames.forEach((frame) => {
      frame.addEventListener("click", () => {
        if (window.openPopup) {
          // Находим индекс фрейма в общем списке
          const allFrames = [...document.querySelectorAll(".portfolio-slider__slide-frame")];
          const index = allFrames.indexOf(frame);
          const slideGroupIndex = Math.floor(index / 2);
          window.openPopup(slideGroupIndex);
        }
      });
    });
  };

  initDesktopSlider();
  initMobileSlider();
  initPopupSlider();
  initFrameClick();
};

module.exports = portfolioSliderModule;
