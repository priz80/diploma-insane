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

## Архитектура

- `src/` — исходники основного сайта
- `dist/` — собранная статика
- `admin/` — админка
- `db/` — база данных JSON Server
- `server.js` — JSON Server для продакшена

## Деплой на FastVPS

При пуше в `main` автоматически:
1. Собирается `dist/` — основной сайт
2. Копируется `admin/` — админка
3. Копируется `db/` и `server.js` — база и сервер
4. Запускается JSON Server через PM2
5. Перезапускается nginx

### Настройка сервера

```bash
# Установка nginx
sudo apt update && sudo apt install nginx

# Установка PM2
npm install -g pm2

# Размещение nginx.conf (nginx работает на порту 8080)
sudo cp nginx.conf /etc/nginx/sites-available/diploma.conf
sudo chmod +x /etc/nginx/sites-available/diploma.conf
sudo rm -f /etc/nginx/sites-enabled/*
sudo ln -s /etc/nginx/sites-available/diploma.conf /etc/nginx/sites-enabled/diploma.conf
sudo nginx -t && sudo systemctl reload nginx

# Создание директорий
sudo mkdir -p /var/www/pagelist_ru_usr/data/www/pagelist.ru/diploma/{dist,admin,db,logs}
```

### Настройка FastPanel (reverse proxy)

Так как FastPanel использует Apache на порту 80, nginx работает на порту 8080.

1. Зайди в панель FastPanel
2. Перейди в раздел **Домены** → **diploma-insane.pagelist.ru**
3. В настройках домена найди **Reverse Proxy** или **Прокси**
4. Настрой прокси:
   - **Host:** `127.0.0.1`
   - **Port:** `8080`
   - **Протокол:** `http`
5. Сохрани и перезапусти домен

Или через SSH:

```bash
# Проверь что nginx работает
curl -H "Host: diploma-insane.pagelist.ru" http://localhost:8080

# Проверь API
curl -H "Host: diploma-insane.pagelist.ru" http://localhost:8080/api/users
```

### GitHub Secrets

| Secret | Значение |
|--------|----------|
| `FASTVPS_HOST` | IP сервера |
| `FASTVPS_USER` | Пользователь |
| `FASTVPS_SSH_KEY` | Приватный SSH ключ |

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
