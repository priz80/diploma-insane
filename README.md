# Запуск JSON Server для админки

## 1. Установить зависимости

```bash
cd admin
npm install
```

## 2. Запустить JSON Server

```bash
npx json-server --watch ../db/db.json --port 4545
```

Сервер запустится на `http://localhost:4545`

## 3. Запустить админку

В **отдельном терминале**:

```bash
cd admin
npm start
```

Webpack Dev Server запустится на `http://localhost:3000`

## 4. Открыть админку

Перейди по адресу: `http://localhost:3000/index.html`

Вход:
- Логин: `user`
- Пароль: `12345678`

## API эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `http://localhost:4545/users` | Получить пользователей |
| GET | `http://localhost:4545/items` | Получить все услуги |
| GET | `http://localhost:4545/items/{id}` | Получить услугу по ID |
| POST | `http://localhost:4545/items` | Создать новую услугу |
| PATCH | `http://localhost:4545/items/{id}` | Обновить услугу |
| DELETE | `http://localhost:4545/items/{id}` | Удалить услугу |

## Структура данных

### Пользователь
```json
{
  "id": "user1",
  "login": "user",
  "password": "12345678"
}
```

### Услуга
```json
{
  "id": "1614040106349",
  "type": "Муж на час",
  "name": "Навес сушилки для белья",
  "units": "шт",
  "cost": 300
}
```
