// src/modules/phone-mask.js

const phoneMaskModule = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('input[type="text"][name="phone"], .feedback-block__form-input_phone');

    phoneInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Если начинается с 8, заменяем на 7
        if (value.startsWith('8')) {
          value = '7' + value.slice(1);
        }
        
        // Ограничиваем 11 цифрами (7 + 10 цифр номера)
        if (value.length > 11) {
          value = value.slice(0, 11);
        }
        
        let formatted = '';
        
        if (value.length > 0) {
          formatted = '+7';
        }
        
        if (value.length > 1) {
          formatted += ' (' + value.slice(1, 4);
        }
        
        if (value.length >= 4) {
          formatted += ') ';
        }
        
        if (value.length > 4) {
          formatted += value.slice(4, 7);
        }
        
        if (value.length > 7) {
          formatted += '-' + value.slice(7, 9);
        }
        
        if (value.length > 9) {
          formatted += '-' + value.slice(9, 11);
        }
        
        e.target.value = formatted;
      });

      // Запрет ввода нецифровых символов
      input.addEventListener('keydown', (e) => {
        // Разрешаем: Backspace, Delete, Tab, Escape, Enter, стрелки
        if ([8, 9, 13, 27, 46, 37, 38, 39, 40].includes(e.keyCode)) {
          return;
        }
        
        // Разрешаем только цифры
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      // Запрет вставки нецифровых символов
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasted.replace(/\D/g, '');
        
        document.execCommand('insertText', false, digits);
      });
    });
  });
};

module.exports = phoneMaskModule;