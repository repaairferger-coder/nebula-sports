# 🚀 Инструкция по запуску Nebula Sports

## 📋 Предварительные требования

### Установка Node.js
```bash
# Установите Node.js версии 18 или выше
# Скачайте с https://nodejs.org/
node --version  # Должно быть v18.0.0 или выше
npm --version   # Должно быть 8.0.0 или выше
```

### Установка Expo CLI
```bash
npm install -g @expo/cli
# или
yarn global add @expo/cli
```

### Для iOS разработки (только macOS)
```bash
# Установите Xcode из App Store
# Установите Xcode Command Line Tools
xcode-select --install
```

### Для Android разработки
```bash
# Установите Android Studio
# Настройте Android SDK
# Добавьте ANDROID_HOME в переменные окружения
```

## 🛠️ Установка и запуск

### 1. Клонирование и установка зависимостей
```bash
# Перейдите в папку проекта
cd nebula

# Установите зависимости
npm install
# или
yarn install
```

### 2. Запуск в режиме разработки
```bash
# Запустите Expo Dev Server
npm start
# или
yarn start
```

### 3. Запуск на устройствах

#### iOS Simulator (только macOS)
```bash
npm run ios
# или
yarn ios
```

#### Android Emulator
```bash
npm run android
# или
yarn android
```

#### Веб-браузер
```bash
npm run web
# или
yarn web
```

#### На физическом устройстве
1. Установите приложение **Expo Go** из App Store/Google Play
2. Отсканируйте QR код из терминала
3. Приложение откроется на вашем устройстве

## 📱 Тестирование функций

### Основные экраны
- **Главная** - обзор трансляций и быстрые действия
- **Трансляции** - список всех спортивных трансляций
- **Чат** - список чатов и сообщений
- **Аналитика** - персональная статистика
- **Профиль** - настройки пользователя

### Админ-панель
1. Нажмите на кнопку профиля в правом верхнем углу
2. Выберите "Админ-панель"
3. Войдите с паролем: `admin123`
4. Или используйте QR код (функция в разработке)

### Чат-функции
- Отправка текстовых сообщений
- Реакции на сообщения (👍, ❤️, 😂, 😮, 😢, 😠)
- Ответы на сообщения
- Закрепление сообщений
- Индикатор набора текста

### Система достижений
- Просмотр достижений в профиле
- Прогресс-бар опыта
- Уровни пользователя
- Редкость достижений (common, rare, epic, legendary)

## 🎨 Кастомизация

### Изменение цветовой схемы
Отредактируйте файл `src/constants/index.ts`:

```typescript
export const SPACE_THEME = {
  colors: {
    primary: '#1a1a2e',      // Основной цвет
    highlight: '#e94560',    // Акцентный цвет
    // ... другие цвета
  }
}
```

### Добавление новых видов спорта
В файле `src/constants/index.ts` добавьте новый спорт:

```typescript
export const SPORTS: Record<SportType, { name: string; icon: string; color: string }> = {
  // ... существующие виды спорта
  new_sport: { name: 'Новый спорт', icon: '🏆', color: '#FF0000' }
}
```

### Настройка подписок
В файле `src/constants/index.ts` измените подписки:

```typescript
export const SUBSCRIPTIONS: Record<SubscriptionType, { 
  name: string; 
  price: number; 
  features: string[]; 
  color: string;
}> = {
  // ... существующие подписки
}
```

## 🐛 Решение проблем

### Ошибка "Metro bundler"
```bash
# Очистите кэш
npx expo start --clear
# или
npm start -- --clear
```

### Ошибка "Unable to resolve module"
```bash
# Переустановите зависимости
rm -rf node_modules
npm install
```

### Проблемы с iOS Simulator
```bash
# Перезапустите симулятор
# Или используйте другой симулятор
npx expo run:ios --device
```

### Проблемы с Android Emulator
```bash
# Убедитесь, что эмулятор запущен
adb devices
# Перезапустите Metro
npx expo start --clear
```

### Ошибки TypeScript
```bash
# Проверьте типы
npx tsc --noEmit
```

## 📊 Структура данных

### Пользователь
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  achievements: Achievement[];
  subscription: SubscriptionType;
  preferences: UserPreferences;
}
```

### Трансляция
```typescript
interface Stream {
  id: string;
  title: string;
  sport: SportType;
  startTime: Date;
  status: 'upcoming' | 'live' | 'ended';
  viewers: number;
  vrEnabled: boolean;
  chatEnabled: boolean;
}
```

### Чат
```typescript
interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio';
  timestamp: Date;
  reactions: MessageReaction[];
}
```

## 🔧 Разработка

### Добавление нового экрана
1. Создайте файл в `src/screens/NewScreen.tsx`
2. Добавьте экран в навигацию в `App.tsx`
3. Добавьте иконку в нижнюю панель

### Добавление нового компонента
1. Создайте файл в `src/components/NewComponent.tsx`
2. Экспортируйте компонент
3. Импортируйте в нужном экране

### Работа с API
1. Создайте сервис в `src/services/`
2. Добавьте типы в `src/types/`
3. Используйте в компонентах

## 📱 Сборка для продакшена

### Android APK
```bash
# Создайте аккаунт на expo.dev
npx expo login

# Соберите APK
npx expo build:android
```

### iOS IPA
```bash
# Соберите для iOS
npx expo build:ios
```

### Веб-версия
```bash
# Соберите веб-версию
npx expo build:web
```

## 🚀 Деплой

### Expo Updates
```bash
# Опубликуйте обновление
npx expo publish
```

### App Store / Google Play
1. Соберите приложение
2. Загрузите в соответствующие магазины
3. Настройте метаданные и скриншоты

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте [документацию Expo](https://docs.expo.dev/)
2. Посмотрите [React Native документацию](https://reactnative.dev/)
3. Создайте issue в репозитории
4. Обратитесь к команде разработки

---

**Удачной разработки! 🚀**
