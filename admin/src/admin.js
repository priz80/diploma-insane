// ============================================
// API Service — обёртка над fetch
// ============================================
const API_BASE = "/api";

const ApiService = {
  async get(url) {
    const res = await fetch(`${API_BASE}${url}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async post(url, data) {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async patch(url, data) {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async delete(url) {
    const res = await fetch(`${API_BASE}${url}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
};

// ============================================
// Auth Service — авторизация через куки
// ============================================
const AuthService = {
  COOKIE_NAME: "admin_token",

  setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  },

  getCookie(name) {
    return document.cookie.split("; ").reduce((acc, c) => {
      const [k, v] = c.split("=");
      return k === name ? decodeURIComponent(v) : acc;
    }, "");
  },

  removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },

  async login(login, password) {
    const users = await ApiService.get("/users");
    const user = users.find((u) => u.login === login && u.password === password);
    if (user) {
      this.setCookie(this.COOKIE_NAME, user.login, 1);
      return true;
    }
    return false;
  },

  isAuthenticated() {
    return !!this.getCookie(this.COOKIE_NAME);
  },

  logout() {
    this.removeCookie(this.COOKIE_NAME);
  },
};

// ============================================
// Страница входа
// ============================================
function initLoginPage() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginInput = document.getElementById("name");
    const passwordInput = document.getElementById("type");
    const warnings = document.querySelectorAll(".text-warning");

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    warnings.forEach((w) => (w.style.display = "none"));

    const success = await AuthService.login(login, password);

    if (success) {
      window.location.href = "table.html";
    } else {
      warnings.forEach((w) => (w.style.display = "inline"));
      loginInput.value = "";
      passwordInput.value = "";
    }
  });
}

// ============================================
// Страница таблицы услуг
// ============================================
let allItems = [];
let currentSort = { field: null, asc: true };
let currentFilter = "Все услуги";
let searchQuery = "";

function initTablePage() {
  if (!AuthService.isAuthenticated()) {
    window.location.href = "index.html";
    return;
  }

  const tbody = document.getElementById("tbody");
  const typeSelect = document.getElementById("typeItem");
  const modal = document.getElementById("modal");
  const modalHeader = document.querySelector(".modal__header");
  const btnAddItem = document.querySelector(".btn-addItem");
  const btnCancel = document.querySelector(".cancel-button");
  const btnClose = document.querySelector(".button__close");
  const form = modal.querySelector("form");
  const searchInput = document.getElementById("searchInput");

  let editingId = null;

  async function loadItems() {
    allItems = await ApiService.get("/items");
    renderTable();
    populateTypeFilter();
  }

  function populateTypeFilter() {
    const types = [...new Set(allItems.map((item) => item.type))];
    typeSelect.innerHTML = '<option value="Все услуги">Все услуги</option>';
    types.forEach((type) => {
      const opt = document.createElement("option");
      opt.value = type;
      opt.textContent = type;
      typeSelect.appendChild(opt);
    });
  }

  function getFilteredItems() {
    let filtered = [...allItems];

    if (currentFilter !== "Все услуги") {
      filtered = filtered.filter((item) => item.type === currentFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.type.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q)
      );
    }

    if (currentSort.field) {
      filtered.sort((a, b) => {
        let valA = a[currentSort.field];
        let valB = b[currentSort.field];
        if (currentSort.field === "cost") {
          valA = Number(valA);
          valB = Number(valB);
        }
        if (valA < valB) return currentSort.asc ? -1 : 1;
        if (valA > valB) return currentSort.asc ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }

  function renderTable() {
    const items = getFilteredItems();
    tbody.innerHTML = "";

    items.forEach((item) => {
      const tr = document.createElement("tr");
      tr.className = "table__row";
      tr.innerHTML = `
        <td class="table__id table__cell">${item.id}</td>
        <td class="table-type table__cell">${item.type}</td>
        <td class="table-name table__cell">${item.name}</td>
        <td class="table-units table__cell">${item.units}</td>
        <td class="table-cost table__cell">${item.cost} руб</td>
        <td class="table__cell">
          <div class="table__actions">
            <button class="button action-change" data-id="${item.id}">
              <span class="svg_ui">
                <svg class="action-icon_change">
                  <use xlink:href="./img/sprite.svg#change"></use>
                </svg>
              </span>
              <span>Изменить</span>
            </button>
            <button class="button action-remove" data-id="${item.id}">
              <span class="svg_ui">
                <svg class="action-icon_remove">
                  <use xlink:href="./img/sprite.svg#remove"></use>
                </svg>
              </span>
              <span>Удалить</span>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".action-change").forEach((btn) => {
      btn.addEventListener("click", () => openEditModal(btn.dataset.id));
    });
    tbody.querySelectorAll(".action-remove").forEach((btn) => {
      btn.addEventListener("click", () => deleteItem(btn.dataset.id));
    });
  }

  async function openEditModal(id) {
    const item = await ApiService.get(`/items/${id}`);
    editingId = id;
    modalHeader.textContent = "Редактировать услугу";
    document.getElementById("type").value = item.type;
    document.getElementById("name").value = item.name;
    document.getElementById("units").value = item.units;
    document.getElementById("cost").value = item.cost;
    modal.classList.add("active");
  }

  function openAddModal() {
    editingId = null;
    modalHeader.textContent = "Добавление новой услуги";
    form.reset();
    modal.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");
    form.reset();
    editingId = null;
  }

  async function deleteItem(id) {
    if (!confirm("Удалить услугу?")) return;
    await ApiService.delete(`/items/${id}`);
    await loadItems();
  }

  typeSelect.addEventListener("change", (e) => {
    currentFilter = e.target.value;
    renderTable();
  });

  btnAddItem.addEventListener("click", openAddModal);
  btnCancel.addEventListener("click", closeModal);
  btnClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      type: document.getElementById("type").value.trim(),
      name: document.getElementById("name").value.trim(),
      units: document.getElementById("units").value.trim(),
      cost: Number(document.getElementById("cost").value),
    };

    if (!data.type || !data.name || !data.units || !data.cost) {
      alert("Заполните все поля");
      return;
    }

    if (editingId) {
      await ApiService.patch(`/items/${editingId}`, data);
    } else {
      await ApiService.post("/items", data);
    }
    closeModal();
    await loadItems();
  });

  document.querySelectorAll("th").forEach((th) => {
    th.addEventListener("click", () => {
      const field = th.classList.contains("th-id")
        ? "id"
        : th.classList.contains("th-type")
        ? "type"
        : th.classList.contains("th-name")
        ? "name"
        : th.classList.contains("th-units")
        ? "units"
        : th.classList.contains("th-cost")
        ? "cost"
        : null;

      if (!field) return;

      if (currentSort.field === field) {
        currentSort.asc = !currentSort.asc;
      } else {
        currentSort.field = field;
        currentSort.asc = true;
      }

      renderTable();
    });
  });

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderTable();
  });

  loadItems();
}

// ============================================
// Инициализация
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("table.html")) {
    initTablePage();
  } else {
    initLoginPage();
  }
});
