const popupMenuModule = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // === Меню ===
    const menuIcon = document.querySelector('.menu__icon');
    const popupMenu = document.querySelector('.popup-menu');
    const popupDialogMenu = document.querySelector('.popup-dialog-menu');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Открытие/закрытие меню
    if (menuIcon && popupDialogMenu) {
      menuIcon.addEventListener('click', () => {
        popupDialogMenu.classList.toggle('showHide-menu');
      });
    }

    // Закрытие меню по кнопке
    if (closeMenu && popupDialogMenu) {
      closeMenu.addEventListener('click', () => {
        popupDialogMenu.classList.remove('showHide-menu');
      });
    }

    // Плавная прокрутка и закрытие меню при клике на пункт
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Ссылка на "Полный список услуг и цен"
        if (link.classList.contains('no-overflow') && href === '#') {
          e.preventDefault();
          openRepairTypesPopup();
          popupDialogMenu.classList.remove('showHide-menu');
          return;
        }

        // Плавная прокрутка к якорю
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }

        // Закрытие меню после клика
        popupDialogMenu.classList.remove('showHide-menu');
      });
    });

    // === Кнопка "Вверх" ===
    const buttonUp = document.querySelector('.button-footer a');
    if (buttonUp) {
      buttonUp.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // === Popup "Полный список услуг и цен" ===
    const repairTypesLinks = document.querySelectorAll('.link-list-repair a, .link-list-menu a');
    const popupRepairTypes = document.querySelector('.popup-repair-types');
    const closeRepairTypes = document.querySelector('.popup-repair-types .close');

    repairTypesLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openRepairTypesPopup();
      });
    });

    function openRepairTypesPopup() {
      if (popupRepairTypes) {
        popupRepairTypes.style.visibility = 'visible';
      }
      // Закрываем меню если открыто
      if (popupDialogMenu) {
        popupDialogMenu.classList.remove('showHide-menu');
      }
    }

    if (closeRepairTypes && popupRepairTypes) {
      closeRepairTypes.addEventListener('click', () => {
        popupRepairTypes.style.visibility = 'hidden';
      });
    }
  });
};

module.exports = popupMenuModule;