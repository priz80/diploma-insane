# Diploma Project

## Запуск локально

### 1. Основной сайт
```bash
npm install
npm start          # Webpack Dev Server
npm run build      # Сборка в dist/
```

### 2. Админка с JSON Server
```bash
npm install
npm run dev        # JSON Server + Webpack Dev Server
```

Открыть: `http://localhost:3000/admin/index.html`
Вход: `user` / `12345678`

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

# Размещение nginx.conf
sudo cp nginx.conf /etc/nginx/sites-available/diploma
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/diploma /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Создание директорий
sudo mkdir -p /var/www/pagelist_ru_usr/data/www/pagelist.ru/diploma/{dist,admin,db,logs}
```

### GitHub Secrets

| Secret | Значение |
|--------|----------|
| `FASTVPS_HOST` | IP сервера |
| `FASTVPS_USER` | `root` |
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
