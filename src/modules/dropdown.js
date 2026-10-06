const dropDownModule = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const arrow = document.querySelector(".header-contacts__arrow");
    const accord = document.querySelector(
      ".header-contacts__phone-number-accord",
    );

    if (arrow && accord) {
      arrow.addEventListener("click", () => {
        accord.classList.toggle("active");
      });
    }
  });
};

module.exports = dropDownModule
