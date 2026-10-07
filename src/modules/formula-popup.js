const formulaPopupModule = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.formula-item__icon');

    icons.forEach(icon => {
      const popup = icon.querySelector('.formula-item-popup');
      const item = icon.closest('.formula-item');

      if (!popup || !item) return;

      icon.addEventListener('mouseenter', () => {
        const iconRect = icon.getBoundingClientRect();
        const popupHeight = popup.offsetHeight || 150;
        const spaceAbove = iconRect.top;

        if (spaceAbove < popupHeight + 20) {
          popup.style.bottom = 'auto';
          popup.style.top = 'auto';
          popup.style.transform = 'translate3d(0, 150px, 0)';
        }

        item.classList.add('active-item');
      });

      icon.addEventListener('mouseleave', () => {
        item.classList.remove('active-item');
        popup.style.bottom = '';
        popup.style.top = '';
        popup.style.transform = '';
      });
    });
  });
};

module.exports = formulaPopupModule;
