# Diploma Project

## Запуск локально

### 1. Основной сайт

```bash
npm install
npm start
```

Webpack Dev Server на `localhost:8080`

Открыть: `http://localhost:8080`

**Для работы форм** (отправка через `server.php`) — запусти PHP-сервер в отдельном терминале:

```bash
npm run server
```

PHP-сервер запустится на `localhost:8081`, и форма будет работать.

### 2. Админка

```bash
# Терминал 1 — JSON Server
npm run json-server

# Терминал 2 — Админка
cd admin
npm start
```

Запустит:
- **JSON Server** на `localhost:4545`
- **Webpack Dev Server** на `localhost:3000`

Открыть: `http://localhost:3000/index.html`
Вход: `user` / `12345678`

### 3. Только JSON Server

```bash
npm run json-server
```

### 4. Сборка продакшен

```bash
npm run build
```

Все запросы к `/api/users`, `/api/items` автоматически перенаправляются на JSON Server через proxy.

## API

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/users` | Получить пользователей |
| GET | `/api/items` | Получить все услуги |
| GET | `/api/items/{id}` | Получить услугу по ID |
| POST | `/api/items` | Создать услугу |
| PATCH | `/api/items/{id}` | Обновить услугу |
| DELETE | `/api/items/{id}` | Удалить услугу |

## URL

- Основной сайт: `diploma-insane.pagelist.ru`
- Админка: `diploma-insane.pagelist.ru/admin/`
- API: `diploma-insane.pagelist.ru/api/`

## BEST HOSTING

[FastVPS](https://fastvps.ru/c_4295ba5d6a21fdd9e4d2b8a7fad98400)
