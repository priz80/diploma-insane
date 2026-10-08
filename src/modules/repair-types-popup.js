const repairTypesPopupModule = () => {
  const popup = document.querySelector(".popup-repair-types");
  if (!popup) return;

  const navList = popup.querySelector(".nav-list-popup-repair");
  const contentTable = popup.querySelector(".popup-repair-types-content-table");
  const headTitle = popup.querySelector("#switch-inner");
  const closeButtons = [...popup.querySelectorAll(".close")];
  const navArrowLeft = popup.querySelector("#nav-arrow-popup-repair_left");
  const navArrowRight = popup.querySelector("#nav-arrow-popup-repair_right");
  const navListPopup = popup.querySelector(".nav-list-popup-repair");

  if (!navList || !contentTable) return;

  let allData = [];
  let categories = [];

  // Загрузка данных из JSON
  async function loadData() {
    try {
      const response = await fetch("./db/db.json");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      
      // Проверяем структуру данных
      if (Array.isArray(jsonData)) {
        allData = jsonData;
      } else if (jsonData.data && Array.isArray(jsonData.data)) {
        allData = jsonData.data;
      } else {
        allData = Array.isArray(jsonData) ? jsonData : [];
      }
      
      generateCategories();
      renderNav();
      if (categories.length > 0) {
        renderContent(categories[0][0]);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      contentTable.innerHTML = '<div class="empty-message">Ошибка загрузки данных</div>';
    }
  }

  // Генерация уникальных категорий
  function generateCategories() {
    const categoryMap = new Map();
    allData.forEach(item => {
      if (item && item.type) {
        if (!categoryMap.has(item.type)) {
          categoryMap.set(item.type, []);
        }
        categoryMap.get(item.type).push(item);
      }
    });

    categories = Array.from(categoryMap.entries());
  }

  // Рендер навигации
  function renderNav() {
    navList.innerHTML = "";
    categories.forEach(([category], index) => {
      const button = document.createElement("button");
      button.className = "button_o popup-repair-types-nav__item";
      if (index === 0) button.classList.add("active");
      button.textContent = category;
      button.addEventListener("click", () => {
        document.querySelectorAll(".popup-repair-types-nav__item").forEach(btn => {
          btn.classList.remove("active");
        });
        button.classList.add("active");
        renderContent(category);
      });
      navList.appendChild(button);
    });
  }

  // Рендер контента
  function renderContent(category) {
    const items = categories.find(([cat]) => cat === category)?.[1] || [];

    if (!headTitle) return;
    headTitle.textContent = category;

    contentTable.innerHTML = "";

    if (items.length === 0) {
      contentTable.innerHTML = '<div class="empty-message">Нет данных</div>';
      return;
    }

    const table = document.createElement("table");
    table.className = "popup-repair-types-content-table__list";

    const tbody = document.createElement("tbody");

    items.forEach(item => {
      const tr = document.createElement("tr");
      tr.className = "mobile-row showHide";

      // Название работы
      const tdName = document.createElement("td");
      tdName.className = "repair-types-name";
      tdName.textContent = item.name || "";
      tr.appendChild(tdName);

      // Единица измерения
      const tdUnits = document.createElement("td");
      tdUnits.className = "mobile-col-title tablet-hide desktop-hide";
      tdUnits.textContent = "Ед.измерения";
      tr.appendChild(tdUnits);

      // Цена за ед.
      const tdPrice = document.createElement("td");
      tdPrice.className = "mobile-col-title tablet-hide desktop-hide";
      tdPrice.textContent = "Цена за ед.";
      tr.appendChild(tdPrice);

      // Значение единиц
      const tdValue1 = document.createElement("td");
      tdValue1.className = "repair-types-value";
      tdValue1.textContent = item.units || "";
      tr.appendChild(tdValue1);

      // Значение цены
      const tdValue2 = document.createElement("td");
      tdValue2.className = "repair-types-value";
      tdValue2.textContent = (item.cost || "0") + " руб.";
      tr.appendChild(tdValue2);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    contentTable.appendChild(table);
  }

  // Навигация по навигации (скролл)
  let navScrollPos = 0;

  function scrollNavLeft() {
    navScrollPos = Math.max(0, navScrollPos - 200);
    if (navListPopup) {
      navListPopup.style.transform = `translateX(-${navScrollPos}px)`;
    }
  }

  function scrollNavRight() {
    if (navListPopup) {
      const maxScroll = navListPopup.scrollWidth - navListPopup.parentElement.offsetWidth;
      navScrollPos = Math.min(maxScroll, navScrollPos + 200);
      navListPopup.style.transform = `translateX(-${navScrollPos}px)`;
    }
  }

  if (navArrowLeft) {
    navArrowLeft.addEventListener("click", scrollNavLeft);
  }

  if (navArrowRight) {
    navArrowRight.addEventListener("click", scrollNavRight);
  }

  // Закрытие popup
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      popup.style.visibility = "hidden";
    });
  });

  // Инициализация
  loadData();
};

module.exports = repairTypesPopupModule;
