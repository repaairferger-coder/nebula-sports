# 🌐 Настройка портов в GitHub Codespace

## 🚀 Быстрый запуск веб-версии:

### 1. Запустите проект:
```bash
npm run start:web:codespace
```

### 2. Откройте порты в VS Code:
- Нажмите на вкладку **"Ports"** (слева в панели)
- Или `Ctrl+Shift+P` → "Ports: Focus on Ports View"

### 3. Добавьте порты:
- **19000** - Expo Dev Tools (основной)
- **19001** - Expo Dev Server
- **19002** - Expo Dev Server (Tunnel)
- **8081** - Metro Bundler

### 4. Откройте в браузере:
- Нажмите на порт **19000**
- Выберите **"Open in Browser"**
- Или нажмите на иконку 🌐

## 📱 Альтернативные способы:

### Через Expo Dev Tools:
1. Запустите: `npm run start:codespace`
2. Откройте порт **19000**
3. Нажмите **"Open in web browser"**

### Прямой запуск веб-версии:
```bash
npm run start:web:codespace
```

## 🔧 Настройка портов:

### Автоматическое открытие:
Порты настроены для автоматического открытия в браузере:
- **19000** - Expo Dev Tools
- **19001** - Expo Dev Server
- **19002** - Expo Dev Server (Tunnel)
- **8081** - Metro Bundler
- **3000** - Web App

### Ручное добавление портов:
1. В панели "Ports" нажмите **"+"**
2. Введите номер порта (например, 19000)
3. Нажмите **Enter**
4. Нажмите на иконку 🌐 для открытия в браузере

## 🎯 Полезные команды:

```bash
# Запуск для Codespace
npm run start:codespace

# Запуск веб-версии
npm run start:web:codespace

# Очистка кэша
npm run clear

# Проверка конфигурации
npm run doctor
```

## 🆘 Решение проблем:

### Порты не открываются:
1. Проверьте, что приложение запущено
2. Убедитесь, что порты добавлены в панели "Ports"
3. Попробуйте перезапустить Codespace

### Веб-версия не загружается:
1. Выполните: `npm run clear`
2. Перезапустите: `npm run start:web:codespace`
3. Проверьте консоль на ошибки

### Медленная загрузка:
1. Используйте порт **19000** (Expo Dev Tools)
2. Нажмите **"Open in web browser"**
3. Дождитесь полной загрузки

## 🎉 Готово!

Теперь вы можете разрабатывать Nebula Sports в веб-версии прямо в Codespace!

**Ссылка на репозиторий**: https://github.com/repaairferger-coder/nebula-sports
