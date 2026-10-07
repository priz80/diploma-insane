// src/modules/form-submit.js

const formSubmitModule = () => {
  const forms = document.querySelectorAll('[id^="feedback"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const checkbox = form.querySelector('.checkbox__input');

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

      // Отправка на сервер
      fetch('/server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          // Закрываем popup consultation если открыт
          const popupConsultation = document.querySelector('.popup-consultation');
          if (popupConsultation) {
            popupConsultation.style.visibility = 'hidden';
          }

          // Показываем popup благодарности
          const popupThank = document.querySelector('.popup-thank');
          if (popupThank) {
            popupThank.style.visibility = 'visible';
          }

          // Очищаем форму
          form.reset();
        })
        .catch(error => {
          console.error('Ошибка отправки формы:', error);
        });
    });
  });

  // Закрытие popup благодарности
  const closeThank = document.querySelector('.close-thank');
  const popupThank = document.querySelector('.popup-thank');

  if (closeThank && popupThank) {
    closeThank.addEventListener('click', () => {
      popupThank.style.visibility = 'hidden';
    });
  }

  // Открытие popup конфиденциальности
  const privacyLinks = document.querySelectorAll('.link-privacy[id="privacy"]');
  const popupPrivacy = document.querySelector('.popup-privacy');
  const closePrivacy = document.querySelector('.popup-privacy .close');

  privacyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (popupPrivacy) {
        popupPrivacy.style.visibility = 'visible';
      }
    });
  });

  if (closePrivacy && popupPrivacy) {
    closePrivacy.addEventListener('click', () => {
      popupPrivacy.style.visibility = 'hidden';
    });
  }
};

module.exports = formSubmitModule;
