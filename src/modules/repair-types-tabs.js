const repairTypesTabsModule = () => {
  const navItems = document.querySelectorAll(".repair-types-nav__item");
  const sliderContainer = document.querySelector(".repair-types-slider");
  const counterCurrent = document.querySelector(".slider-counter-content__current");
  const counterTotal = document.querySelector(".slider-counter-content__total");

  if (!sliderContainer || navItems.length === 0) return;

  // Получаем все группы слайдов
  const slideGroups = [];
  for (let i = 1; i <= 5; i++) {
    const group = sliderContainer.querySelector(`.types-repair${i}`);
    if (group) slideGroups.push(group);
  }

  if (slideGroups.length === 0) return;

  // Скрываем все группы, кроме первой
  slideGroups.forEach((group, index) => {
    if (index === 0) {
      group.style.opacity = "1";
      group.style.zIndex = "1";
    } else {
      group.style.opacity = "0";
      group.style.zIndex = "0";
      group.style.pointerEvents = "none";
    }
  });

  // Обновляем счетчик для активной группы
  function updateCounter(groupIndex) {
    const group = slideGroups[groupIndex];
    if (!group) return;

    const slides = group.querySelectorAll(".repair-types-slider__slide");
    const total = slides.length;

    if (counterTotal) {
      counterTotal.textContent = total;
    }
    if (counterCurrent) {
      counterCurrent.textContent = "1";
    }
  }

  // Обработчик клика по кнопке навигации
  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Добавляем active текущей кнопке
      navItems.forEach(navItem => navItem.classList.remove("active"));
      item.classList.add("active");

      // Показываем соответствующую группу слайдов
      slideGroups.forEach((group, i) => {
        if (i === index) {
          group.style.opacity = "1";
          group.style.zIndex = "1";
          group.style.pointerEvents = "auto";
        } else {
          group.style.opacity = "0";
          group.style.zIndex = "0";
          group.style.pointerEvents = "none";
        }
      });

      // Обновляем счетчик
      updateCounter(index);
    });
  });

  // Инициализация счетчика для первой группы
  updateCounter(0);
};

module.exports = repairTypesTabsModule;
