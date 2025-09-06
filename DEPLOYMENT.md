# 🚀 Развертывание Nebula Sports

## 📋 Обзор

Этот документ описывает процесс развертывания приложения Nebula Sports на различных платформах и окружениях.

---

## 🌍 Окружения

### Development (Разработка)
- **URL**: `http://localhost:3000`
- **API**: `http://localhost:3000/api/v1`
- **База данных**: SQLite (локальная)
- **Назначение**: Локальная разработка

### Staging (Тестирование)
- **URL**: `https://staging.nebula-sports.com`
- **API**: `https://staging-api.nebula-sports.com/v1`
- **База данных**: PostgreSQL (staging)
- **Назначение**: Тестирование перед релизом

### Production (Продакшен)
- **URL**: `https://nebula-sports.com`
- **API**: `https://api.nebula-sports.com/v1`
- **База данных**: PostgreSQL (production)
- **Назначение**: Рабочая версия для пользователей

---

## 📱 Мобильные приложения

### iOS App Store

#### Подготовка
```bash
# Установка зависимостей
npm install

# Сборка для iOS
npx expo build:ios --type archive

# Или через EAS Build
npx eas build --platform ios --profile production
```

#### Конфигурация
```json
// eas.json
{
  "cli": {
    "version": ">= 5.4.0"
  },
  "build": {
    "production": {
      "ios": {
        "distribution": "store",
        "bundleIdentifier": "com.nebula.sports"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD123456"
      }
    }
  }
}
```

#### Процесс развертывания
1. **Сборка приложения**
   ```bash
   npx eas build --platform ios --profile production
   ```

2. **Загрузка в App Store Connect**
   ```bash
   npx eas submit --platform ios --profile production
   ```

3. **Настройка метаданных**
   - Название: "Nebula Sports"
   - Описание: "Спортивная экосистема с трансляциями и чатом"
   - Ключевые слова: "спорт, трансляции, чат, VR"
   - Скриншоты для всех размеров устройств

4. **Релиз**
   - Внутреннее тестирование
   - Внешнее тестирование (TestFlight)
   - Публикация в App Store

### Google Play Store

#### Подготовка
```bash
# Сборка для Android
npx expo build:android --type app-bundle

# Или через EAS Build
npx eas build --platform android --profile production
```

#### Конфигурация
```json
// eas.json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle",
        "packageName": "com.nebula.sports"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

#### Процесс развертывания
1. **Сборка приложения**
   ```bash
   npx eas build --platform android --profile production
   ```

2. **Загрузка в Google Play Console**
   ```bash
   npx eas submit --platform android --profile production
   ```

3. **Настройка метаданных**
   - Название: "Nebula Sports"
   - Краткое описание: "Спортивная экосистема"
   - Полное описание: "Nebula Sports - это..."
   - Скриншоты для телефонов и планшетов

4. **Релиз**
   - Внутреннее тестирование
   - Закрытое тестирование
   - Открытое тестирование
   - Публикация в Google Play

---

## 🌐 Веб-приложение (PWA)

### Сборка
```bash
# Сборка для веб
npx expo build:web

# Или через EAS Build
npx eas build --platform web --profile production
```

### Развертывание на Vercel

#### Конфигурация
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "web-build/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/web-build/$1"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

#### Процесс развертывания
1. **Подключение к Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel link
   ```

2. **Развертывание**
   ```bash
   vercel --prod
   ```

3. **Настройка домена**
   - Добавление кастомного домена
   - Настройка SSL сертификата
   - Настройка CDN

### Развертывание на Netlify

#### Конфигурация
```toml
# netlify.toml
[build]
  publish = "web-build"
  command = "npm run build:web"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Процесс развертывания
1. **Подключение к Netlify**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   ```

2. **Развертывание**
   ```bash
   netlify deploy --prod
   ```

---

## 🖥️ Backend API

### Docker контейнеризация

#### Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Создание пользователя
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Изменение владельца файлов
RUN chown -R nodejs:nodejs /app
USER nodejs

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/nebula
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=nebula
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Развертывание на AWS

#### Elastic Beanstalk
```yaml
# .ebextensions/01-packages.config
packages:
  yum:
    git: []

option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
    NodeVersion: "18.x"
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: "production"
```

#### Процесс развертывания
1. **Установка EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Инициализация**
   ```bash
   eb init
   eb create production
   ```

3. **Развертывание**
   ```bash
   eb deploy
   ```

### Развертывание на Google Cloud

#### Cloud Run
```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/nebula-api', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/nebula-api']
  - name: 'gcr.io/cloud-builders/gcloud'
    args: [
      'run', 'deploy', 'nebula-api',
      '--image', 'gcr.io/$PROJECT_ID/nebula-api',
      '--region', 'us-central1',
      '--platform', 'managed'
    ]
```

#### Процесс развертывания
1. **Сборка и развертывание**
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

2. **Настройка домена**
   ```bash
   gcloud run domain-mappings create --service nebula-api --domain api.nebula-sports.com
   ```

---

## 🗄️ База данных

### PostgreSQL

#### Миграции
```sql
-- migrations/001_initial_schema.sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  sport VARCHAR(50) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Процесс развертывания
1. **Создание базы данных**
   ```bash
   createdb nebula_production
   ```

2. **Применение миграций**
   ```bash
   npm run migrate:up
   ```

3. **Настройка репликации**
   ```bash
   # Настройка master-slave репликации
   # Настройка автоматических бэкапов
   ```

### Redis

#### Конфигурация
```conf
# redis.conf
bind 0.0.0.0
port 6379
timeout 300
tcp-keepalive 60
maxmemory 2gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

#### Процесс развертывания
1. **Установка Redis**
   ```bash
   sudo apt-get install redis-server
   ```

2. **Настройка конфигурации**
   ```bash
   sudo cp redis.conf /etc/redis/redis.conf
   sudo systemctl restart redis
   ```

3. **Настройка кластера**
   ```bash
   # Настройка Redis Cluster для высокой доступности
   ```

---

## 🔒 SSL и безопасность

### SSL сертификаты

#### Let's Encrypt
```bash
# Установка Certbot
sudo apt-get install certbot

# Получение сертификата
sudo certbot certonly --standalone -d nebula-sports.com -d www.nebula-sports.com

# Автоматическое обновление
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Cloudflare
1. **Настройка DNS**
   - Добавление A-записей
   - Включение проксирования

2. **Настройка SSL**
   - Включение Full SSL
   - Настройка HSTS

### Безопасность

#### Firewall
```bash
# UFW настройка
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 3000/tcp
```

#### Мониторинг
```bash
# Установка Fail2Ban
sudo apt-get install fail2ban

# Настройка конфигурации
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

---

## 📊 Мониторинг и логирование

### Application Monitoring

#### New Relic
```javascript
// newrelic.js
'use strict'

exports.config = {
  app_name: ['Nebula Sports'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  distributed_tracing: {
    enabled: true
  },
  logging: {
    level: 'info'
  }
}
```

#### DataDog
```yaml
# datadog.yaml
api_key: ${DD_API_KEY}
site: datadoghq.com
logs_enabled: true
apm_config:
  enabled: true
```

### Логирование

#### Winston
```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test:ci
      - name: Run linting
        run: npm run lint
      - name: Type check
        run: npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build application
        run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: build/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: build/
      - name: Deploy to production
        run: |
          # Команды развертывания
          echo "Deploying to production..."
```

---

## 📋 Чек-лист развертывания

### Перед развертыванием
- [ ] Все тесты проходят
- [ ] Код прошел code review
- [ ] Документация обновлена
- [ ] Миграции базы данных готовы
- [ ] Переменные окружения настроены
- [ ] SSL сертификаты действительны
- [ ] Бэкапы созданы

### После развертывания
- [ ] Приложение доступно
- [ ] API отвечает корректно
- [ ] База данных подключена
- [ ] Кэш работает
- [ ] Мониторинг настроен
- [ ] Логирование работает
- [ ] Уведомления отправляются
- [ ] Производительность в норме

### Откат (Rollback)
- [ ] План отката готов
- [ ] Предыдущая версия доступна
- [ ] База данных совместима
- [ ] Пользователи уведомлены
- [ ] Мониторинг показывает улучшения

---

## 🚨 Аварийное восстановление

### План восстановления
1. **Оценка ситуации**
   - Определение масштаба проблемы
   - Проверка доступности сервисов
   - Анализ логов

2. **Быстрое восстановление**
   - Откат к предыдущей версии
   - Восстановление из бэкапа
   - Переключение на резервные серверы

3. **Пост-мортем**
   - Анализ причин инцидента
   - Документирование урока
   - Улучшение процессов

### Контакты
- **Техническая поддержка**: support@nebula-sports.com
- **Экстренные случаи**: +7 (XXX) XXX-XX-XX
- **Slack канал**: #incidents

---

**Этот документ будет обновляться по мере развития процессов развертывания! 🚀**
