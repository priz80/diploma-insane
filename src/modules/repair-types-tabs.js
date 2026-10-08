const repairTypesTabsModule = () => {
  const navItems = document.querySelectorAll(".repair-types-nav__item");
  const sliderContainer = document.querySelector(".repair-types-slider");
  const arrowLeft = document.querySelector("#repair-types-arrow_left");
  const arrowRight = document.querySelector("#repair-types-arrow_right");
  const navArrowLeft = document.querySelector("#nav-arrow-repair-left_base");
  const navArrowRight = document.querySelector("#nav-arrow-repair-right_base");
  const navList = document.querySelector(".nav-list-repair");
  const counterCurrent = document.querySelector(".slider-counter-content__current");
  const counterTotal = document.querySelector(".slider-counter-content__total");

  if (!sliderContainer || navItems.length === 0) return;

  // --- Навигация: слайдер nav-list ---
  let navScrollPos = 0;

  function scrollNavLeft() {
    navScrollPos = Math.max(0, navScrollPos - 259);
    navList.style.transform = `translateX(-${navScrollPos}px)`;
  }

  function scrollNavRight() {
    const maxScroll = navList.scrollWidth - navList.parentElement.offsetWidth;
    navScrollPos = Math.min(maxScroll, navScrollPos + 259);
    navList.style.transform = `translateX(-${navScrollPos}px)`;
  }

  if (navArrowLeft) {
    navArrowLeft.addEventListener("click", scrollNavLeft);
  }

  if (navArrowRight) {
    navArrowRight.addEventListener("click", scrollNavRight);
  }

  // Получаем все группы слайдов
  const slideGroups = [];
  for (let i = 1; i <= 5; i++) {
    const group = sliderContainer.querySelector(`.types-repair${i}`);
    if (group) slideGroups.push(group);
  }

  if (slideGroups.length === 0) return;

  // Текущий индекс слайда в активной группе
  let currentSlideIndex = 0;
  let currentGroupIndex = 0;

  // Функция переключения на группу по индексу
  function switchGroup(index) {
    // Сбрасываем все скрытые группы в начальное состояние
    slideGroups.forEach((group, i) => {
      if (i !== index) {
        resetGroup(i);
      }
    });

    // Сбрасываем индекс слайда на 0 при смене группы
    currentSlideIndex = 0;
    currentGroupIndex = index;

    // Добавляем active текущей кнопке
    navItems.forEach(navItem => navItem.classList.remove("active"));
    navItems[index].classList.add("active");

    // Показываем соответствующую группу слайдов
    slideGroups.forEach((group, i) => {
      if (i === index) {
        group.style.display = "block";
      } else {
        group.style.display = "none";
      }
    });

    // Обновляем счетчик
    updateCounter();
  }

  // Инициализация: позиционируем слайды абсолютно внутри каждой группы
  slideGroups.forEach((group, groupIndex) => {
    const slides = group.querySelectorAll(".repair-types-slider__slide");
    slides.forEach((slide, i) => {
      slide.style.position = "absolute";
      slide.style.top = "0";
      slide.style.left = "0";
      slide.style.width = "100%";
      slide.style.height = "100%";
      slide.style.opacity = i === 0 ? "1" : "0";
      slide.style.zIndex = i === 0 ? "1" : "0";
      slide.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      slide.style.transform = i === 0 ? "scale(1)" : "scale(1.1)";
      slide.style.pointerEvents = i === 0 ? "auto" : "none";
    });

    // Скрываем все группы, кроме первой (через display)
    if (groupIndex === 0) {
      group.style.display = "block";
    } else {
      group.style.display = "none";
    }
  });

  // Обновляем счетчик для активной группы
  function updateCounter() {
    const group = slideGroups[currentGroupIndex];
    if (!group) return;

    const slides = group.querySelectorAll(".repair-types-slider__slide");
    const total = slides.length;

    if (counterTotal) {
      counterTotal.textContent = total;
    }
    if (counterCurrent) {
      counterCurrent.textContent = currentSlideIndex + 1;
    }
  }

  // Сбросить группу в начальное состояние
  function resetGroup(groupIndex) {
    const group = slideGroups[groupIndex];
    if (!group) return;

    const slides = group.querySelectorAll(".repair-types-slider__slide");
    slides.forEach((slide, i) => {
      slide.style.opacity = i === 0 ? "1" : "0";
      slide.style.zIndex = i === 0 ? "1" : "0";
      slide.style.transform = i === 0 ? "scale(1)" : "scale(1.1)";
      slide.style.pointerEvents = i === 0 ? "auto" : "none";
    });
  }

  // Показать слайд по индексу
  function showSlide(index) {
    const group = slideGroups[currentGroupIndex];
    if (!group) return;

    const slides = group.querySelectorAll(".repair-types-slider__slide");
    if (slides.length === 0) return;

    // Проверяем границы (зацикливание)
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlideIndex = index;

    // Обновляем видимость слайдов
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = "1";
        slide.style.zIndex = "1";
        slide.style.transform = "scale(1)";
        slide.style.pointerEvents = "auto";
      } else {
        slide.style.opacity = "0";
        slide.style.zIndex = "0";
        slide.style.transform = "scale(1.1)";
        slide.style.pointerEvents = "none";
      }
    });

    // Обновляем счетчик
    if (counterCurrent) {
      counterCurrent.textContent = currentSlideIndex + 1;
    }
  }

  // Обработчик клика по кнопке навигации
  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      switchGroup(index);
    });
  });

  // Обработчик стрелок слайдера
  if (arrowLeft) {
    arrowLeft.addEventListener("click", () => {
      showSlide(currentSlideIndex - 1);
    });
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", () => {
      showSlide(currentSlideIndex + 1);
    });
  }

  // Обработчик стрелок навигации
  if (navArrowLeft) {
    navArrowLeft.addEventListener("click", () => {
      let newIndex = currentGroupIndex - 1;
      if (newIndex < 0) newIndex = navItems.length - 1;
      switchGroup(newIndex);
    });
  }

  if (navArrowRight) {
    navArrowRight.addEventListener("click", () => {
      let newIndex = currentGroupIndex + 1;
      if (newIndex >= navItems.length) newIndex = 0;
      switchGroup(newIndex);
    });
  }

  // Инициализация счетчика для первой группы
  updateCounter();
};

module.exports = repairTypesTabsModule;
