# 🚀 GitHub Codespace Setup для Nebula Sports

## 📋 Что такое Codespace?

GitHub Codespace - это облачная среда разработки, которая позволяет разрабатывать прямо в браузере с полной настройкой для React Native/Expo.

## 🎯 Преимущества для Nebula Sports:

- ✅ **Готовая среда** - Node.js, Expo CLI, все зависимости
- ✅ **Автоматические порты** - Metro Bundler, Expo Dev Tools
- ✅ **VS Code в браузере** - полный функционал IDE
- ✅ **Синхронизация** - все изменения сохраняются в GitHub
- ✅ **Доступ везде** - работайте с любого устройства

## 🚀 Как запустить Codespace:

### Вариант 1: Через GitHub (Рекомендуется)
1. Откройте репозиторий: https://github.com/repaairferger-coder/nebula-sports
2. Нажмите зеленую кнопку **"Code"**
3. Выберите вкладку **"Codespaces"**
4. Нажмите **"Create codespace on main"**
5. Дождитесь загрузки (2-3 минуты)

### Вариант 2: Через GitHub CLI
```bash
gh codespace create --repo repaairferger-coder/nebula-sports
```

## ⚙️ Что происходит при запуске:

1. **Создается контейнер** с Node.js 18
2. **Устанавливаются зависимости**:
   - Expo CLI
   - React Native CLI
   - EAS CLI
   - Watchman
3. **Настраивается VS Code** с расширениями:
   - TypeScript
   - React Native Tools
   - Expo Tools
   - Prettier
   - ESLint
4. **Открываются порты**:
   - 8081 - Metro Bundler
   - 19000 - Expo Dev Tools
   - 19001 - Expo Dev Server
   - 19002 - Expo Dev Server (Tunnel)

## 🎮 Первые шаги в Codespace:

### 1. Запуск проекта:
```bash
npm start
```

### 2. Открытие в браузере:
- Codespace автоматически откроет Expo Dev Tools
- Нажмите "Open in web browser" для веб-версии
- Или отсканируйте QR-код в Expo Go

### 3. Разработка:
- Редактируйте код в VS Code
- Изменения автоматически применяются
- Используйте встроенный терминал

## 📱 Тестирование:

### Веб-версия:
- Откройте порт 19000 в браузере
- Выберите "Open in web browser"

### Мобильное приложение:
- Установите Expo Go на телефон
- Отсканируйте QR-код
- Или используйте эмулятор

## 🔧 Полезные команды:

```bash
# Запуск проекта
npm start

# Сборка для продакшена
npx expo build

# Установка новых зависимостей
npm install package-name
npx expo install package-name

# Очистка кэша
npx expo start --clear

# Проверка конфигурации
npx expo doctor
```

## 🌐 Доступ к портам:

- **Metro Bundler**: http://localhost:8081
- **Expo Dev Tools**: http://localhost:19000
- **Expo Dev Server**: http://localhost:19001
- **Expo Dev Server (Tunnel)**: http://localhost:19002

## 💡 Советы:

1. **Сохраняйте часто** - изменения автоматически синхронизируются
2. **Используйте терминал** - встроенный в VS Code
3. **Проверяйте порты** - Codespace автоматически их открывает
4. **Работайте в команде** - несколько разработчиков могут использовать один Codespace

## 🆘 Решение проблем:

### Codespace не запускается:
- Проверьте, что у вас есть доступ к Codespaces
- Попробуйте перезапустить

### Порты не открываются:
- Проверьте настройки портов в VS Code
- Убедитесь, что приложение запущено

### Зависимости не устанавливаются:
- Выполните `npm install` в терминале
- Проверьте package.json

## 🎉 Готово!

Теперь вы можете разрабатывать Nebula Sports прямо в браузере с полной средой разработки!

**Ссылка на репозиторий**: https://github.com/repaairferger-coder/nebula-sports
