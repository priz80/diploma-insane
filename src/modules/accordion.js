const accordionModule = () => {
  const accordion = document.querySelector(".accordion");
  if (!accordion) return;

  const items = [...accordion.querySelectorAll(".accordion > ul > li")];
  const moreButton = document.querySelector(".accordion-more");

  if (items.length === 0) return;

  // Закрытие всех открытых аккордеонов
  function closeAll(exceptIndex) {
    items.forEach((item, index) => {
      if (index !== exceptIndex) {
        const title = item.querySelector(".title_block");
        const msg = item.querySelector(".msg");
        if (title) title.classList.remove("msg-active");
        if (msg) {
          msg.style.maxHeight = "0";
          msg.style.opacity = "0";
          msg.style.transform = "translate(0, 50%)";
        }
      }
    });
  }

  // Открытие/закрытие аккордеона
  items.forEach((item, index) => {
    const title = item.querySelector(".title_block");
    const msg = item.querySelector(".msg");

    if (!title || !msg) return;

    title.addEventListener("click", () => {
      const isOpen = title.classList.contains("msg-active");

      // Закрываем все
      closeAll();

      // Если не был открыт — открываем
      if (!isOpen) {
        title.classList.add("msg-active");

        // Устанавливаем max-height для анимации
        msg.style.maxHeight = msg.scrollHeight + "px";
        msg.style.opacity = "1";
        msg.style.transform = "translate(0, 0)";

        // После завершения анимации устанавливаем auto
        msg.addEventListener("transitionend", () => {
          if (title.classList.contains("msg-active")) {
            msg.style.maxHeight = "none";
          }
        }, { once: true });
      } else {
        // Закрываем с анимацией
        msg.style.maxHeight = msg.scrollHeight + "px";
        // Принудительный reflow
        msg.offsetHeight;
        msg.style.maxHeight = "0";
        msg.style.opacity = "0";
        msg.style.transform = "translate(0, 50%)";
      }
    });
  });

  // Кнопка "Показать ещё"
  if (moreButton) {
    let allOpened = false;

    moreButton.addEventListener("click", () => {
      if (!allOpened) {
        // Открываем все
        items.forEach((item, index) => {
          const title = item.querySelector(".title_block");
          const msg = item.querySelector(".msg");
          if (title) title.classList.add("msg-active");
          if (msg) {
            msg.style.maxHeight = "none";
            msg.style.opacity = "1";
            msg.style.transform = "translate(0, 0)";
          }
        });
        allOpened = true;
      } else {
        // Закрываем все
        closeAll();
        allOpened = false;
      }
    });
  }

  // Первый элемент открыт по умолчанию
  const firstTitle = items[0]?.querySelector(".title_block");
  const firstMsg = items[0]?.querySelector(".msg");
  if (firstTitle && firstMsg) {
    firstTitle.classList.add("msg-active");
    firstMsg.style.maxHeight = "none";
    firstMsg.style.opacity = "1";
    firstMsg.style.transform = "translate(0, 0)";
  }
};

module.exports = accordionModule;
