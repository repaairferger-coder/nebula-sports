# 🌐 Исправление веб-версии в Codespace

## 🚀 Правильный запуск веб-версии:

### Вариант 1: Простой запуск (Рекомендуется)
```bash
npm run start:web:codespace
```

### Вариант 2: Через скрипт
```bash
./scripts/start-web.sh
```

### Вариант 3: Прямая команда
```bash
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 expo start --web --host 0.0.0.0 --port 3000
```

## 📱 Открытие в браузере:

### 1. Откройте порты в VS Code:
- Нажмите на вкладку **"Ports"** (слева в панели)
- Или `Ctrl+Shift+P` → "Ports: Focus on Ports View"

### 2. Добавьте порты:
- **3000** - Nebula Sports Web App (основной)
- **19000** - Expo Dev Tools
- **8081** - Metro Bundler

### 3. Откройте в браузере:
- Нажмите на порт **3000**
- Выберите **"Open in Browser"**
- Или нажмите на иконку 🌐

## 🎯 Что изменилось:

### Новые порты:
- **3000** - Веб-версия приложения (основной)
- **19000** - Expo Dev Tools
- **8081** - Metro Bundler

### Новые скрипты:
- `npm run start:web:codespace` - запуск веб-версии
- `npm run start:devtools` - запуск Dev Tools
- `./scripts/start-web.sh` - простой скрипт

### Конфигурация:
- `app.config.js` - настройки Expo
- `metro.config.js` - настройки Metro для Codespace
- Обновлен `devcontainer.json`

## 🔧 Полезные команды:

```bash
# Запуск веб-версии
npm run start:web:codespace

# Запуск Dev Tools
npm run start:devtools

# Очистка кэша
npm run clear

# Проверка конфигурации
npm run doctor
```

## 🆘 Решение проблем:

### Веб-версия не загружается:
1. Убедитесь, что используете порт **3000**
2. Выполните: `npm run clear`
3. Перезапустите: `npm run start:web:codespace`

### Порты не открываются:
1. Проверьте панель "Ports" в VS Code
2. Убедитесь, что приложение запущено
3. Попробуйте перезапустить Codespace

### Медленная загрузка:
1. Дождитесь полной загрузки Metro
2. Проверьте консоль на ошибки
3. Используйте порт **3000** для веб-версии

## 🎉 Готово!

Теперь веб-версия Nebula Sports будет работать на порту **3000**!

**Ссылка на репозиторий**: https://github.com/repaairferger-coder/nebula-sports
