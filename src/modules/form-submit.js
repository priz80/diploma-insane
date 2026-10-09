// src/modules/form-submit.js

const formSubmitModule = () => {
  // Открытие popup consultation по кнопкам
  const consultationButtons = document.querySelectorAll(".btn-consultation");
  const popupConsultation = document.querySelector(".popup-consultation");

  consultationButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (popupConsultation) {
        popupConsultation.style.visibility = "visible";
      }
    });
  });

  const forms = document.querySelectorAll("[id^=\x27feedback\x27]");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const checkbox = form.querySelector(".checkbox__input");

      // Проверка галочки согласия
      if (!checkbox || !checkbox.checked) {
        return;
      }

      // Сбор данных формы
      const formData = new FormData(form);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Отправка на JSON Server
      fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          // Закрываем popup consultation если открыт
          const popupConsultation = document.querySelector(".popup-consultation");
          if (popupConsultation) {
            popupConsultation.style.visibility = "hidden";
          }

          // Показываем popup благодарности
          const popupThank = document.querySelector(".popup-thank");
          if (popupThank) {
            popupThank.style.visibility = "visible";
          }

          // Очищаем форму
          form.reset();
        })
        .catch((error) => {
          console.error("Ошибка отправки формы:", error);
        });
    });
  });

  // Закрытие popup consultation
  const closeConsultation = document.querySelector(".close-consultation");
  if (closeConsultation && popupConsultation) {
    closeConsultation.addEventListener("click", () => {
      popupConsultation.style.visibility = "hidden";
    });
  }

  // Закрытие popup благодарности
  const closeThank = document.querySelector(".close-thank");
  const popupThank = document.querySelector(".popup-thank");

  if (closeThank && popupThank) {
    closeThank.addEventListener("click", () => {
      popupThank.style.visibility = "hidden";
    });
  }

  // Открытие popup конфиденциальности
  const privacyLinks = document.querySelectorAll(".link-privacy[id=\x27privacy\x27]");
  const popupPrivacy = document.querySelector(".popup-privacy");
  const closePrivacy = document.querySelector(".popup-privacy .close");

  privacyLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (popupPrivacy) {
        popupPrivacy.style.visibility = "visible";
      }
    });
  });

  if (closePrivacy && popupPrivacy) {
    closePrivacy.addEventListener("click", () => {
      popupPrivacy.style.visibility = "hidden";
    });
  }
};

module.exports = formSubmitModule;
