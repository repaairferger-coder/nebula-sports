# 🔧 Быстрое исправление Codespace

## 🚨 Проблема: "expo: not found"

### ✅ **Быстрое решение:**

Выполните эти команды в терминале Codespace:

```bash
# 1. Установите зависимости
npm install

# 2. Установите Expo CLI глобально
npm install -g @expo/cli@latest

# 3. Исправьте зависимости Expo
npx expo install --fix

# 4. Запустите веб-версию
npm run start:browser
```

### 🚀 **Или используйте автоматический скрипт:**

```bash
./scripts/setup-codespace.sh
```

## 📱 **После установки:**

1. **Запустите проект**:
```bash
npm run start:browser
```

2. **Откройте порты**:
   - В Codespace нажмите на вкладку **"Ports"** (слева)
   - Найдите порт **3000** - "Nebula Sports Web App"
   - Нажмите на иконку 🌐 или "Open in Browser"

## 🎯 **Что происходит:**

- **npm install** - устанавливает все зависимости из package.json
- **npm install -g @expo/cli@latest** - устанавливает Expo CLI глобально
- **npx expo install --fix** - исправляет версии зависимостей Expo
- **npm run start:browser** - запускает веб-версию

## 🆘 **Если что-то не работает:**

### Очистите кэш:
```bash
npm run clear
```

### Переустановите зависимости:
```bash
rm -rf node_modules package-lock.json
npm install
npm install -g @expo/cli@latest
npx expo install --fix
```

### Проверьте конфигурацию:
```bash
npm run doctor
```

## 🎉 **Готово!**

Теперь веб-версия Nebula Sports будет работать на порту 3000!

**Ссылка на репозиторий**: https://github.com/repaairferger-coder/nebula-sports
