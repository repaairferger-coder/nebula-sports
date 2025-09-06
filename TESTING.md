# 🧪 Тестирование Nebula Sports

## 📋 Обзор

Этот документ описывает стратегию тестирования для приложения Nebula Sports, включая unit тесты, integration тесты, E2E тесты и performance тесты.

---

## 🎯 Стратегия тестирования

### Пирамида тестирования
```
        /\
       /  \
      / E2E \     <- Меньше тестов, больше покрытия
     /______\
    /        \
   /Integration\ <- Среднее количество тестов
  /____________\
 /              \
/    Unit Tests   \ <- Много тестов, быстрое выполнение
/__________________\
```

### Приоритеты тестирования
1. **Unit тесты** - 70% покрытия
2. **Integration тесты** - 20% покрытия  
3. **E2E тесты** - 10% покрытия

---

## 🛠️ Инструменты тестирования

### Unit тесты
- **Jest** - основной фреймворк
- **React Native Testing Library** - тестирование компонентов
- **@testing-library/jest-native** - дополнительные матчеры

### Integration тесты
- **Jest** - тестирование сервисов
- **Supertest** - тестирование API
- **MSW** - мокирование HTTP запросов

### E2E тесты
- **Detox** - для React Native
- **Cypress** - для веб-версии
- **Appium** - кроссплатформенное тестирование

### Performance тесты
- **Lighthouse** - веб-производительность
- **Flipper** - профилирование React Native
- **React Native Performance** - метрики производительности

---

## 📁 Структура тестов

```
__tests__/
├── components/          # Тесты компонентов
│   ├── NewsTicker.test.tsx
│   ├── ProgressBar.test.tsx
│   └── UserProfileButton.test.tsx
├── screens/            # Тесты экранов
│   ├── HomeScreen.test.tsx
│   ├── ChatScreen.test.tsx
│   └── ProfileScreen.test.tsx
├── services/           # Тесты сервисов
│   ├── api.test.ts
│   ├── auth.test.ts
│   └── storage.test.ts
├── utils/              # Тесты утилит
│   ├── formatters.test.ts
│   ├── validators.test.ts
│   └── helpers.test.ts
├── integration/        # Integration тесты
│   ├── auth-flow.test.ts
│   ├── chat-flow.test.ts
│   └── streaming-flow.test.ts
└── e2e/               # E2E тесты
    ├── user-journey.test.ts
    ├── chat-functionality.test.ts
    └── streaming-functionality.test.ts
```

---

## 🧪 Unit тесты

### Настройка Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-native-vector-icons|react-native-gifted-chat|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### Пример теста компонента

```typescript
// __tests__/components/NewsTicker.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewsTicker from '@/components/NewsTicker';
import { NewsItem } from '@/types';

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Test News',
    content: 'Test content',
    sport: 'football',
    priority: 'high',
    isAd: false,
    publishedAt: new Date(),
  },
];

describe('NewsTicker', () => {
  it('renders news items correctly', () => {
    const { getByText } = render(<NewsTicker />);
    
    expect(getByText('Test News')).toBeTruthy();
  });

  it('handles news press correctly', () => {
    const onNewsPress = jest.fn();
    const { getByText } = render(
      <NewsTicker onNewsPress={onNewsPress} />
    );
    
    fireEvent.press(getByText('Test News'));
    expect(onNewsPress).toHaveBeenCalledWith(mockNews[0]);
  });

  it('shows priority indicator', () => {
    const { getByTestId } = render(<NewsTicker />);
    
    const priorityIndicator = getByTestId('priority-indicator');
    expect(priorityIndicator).toBeTruthy();
  });
});
```

### Пример теста утилиты

```typescript
// __tests__/utils/formatters.test.ts
import { formatTime, formatNumber, calculateUserLevel } from '@/utils';

describe('formatters', () => {
  describe('formatTime', () => {
    it('formats time correctly', () => {
      const date = new Date('2024-01-01T20:30:00Z');
      expect(formatTime(date)).toBe('20:30');
    });
  });

  describe('formatNumber', () => {
    it('formats large numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1000000)).toBe('1.0M');
    });
  });

  describe('calculateUserLevel', () => {
    it('calculates level correctly', () => {
      expect(calculateUserLevel(0)).toBe(1);
      expect(calculateUserLevel(1000)).toBe(2);
      expect(calculateUserLevel(5000)).toBe(6);
    });
  });
});
```

---

## 🔗 Integration тесты

### Настройка MSW

```typescript
// __tests__/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/streams', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          streams: [
            {
              id: '1',
              title: 'Test Stream',
              sport: 'football',
              status: 'live',
            },
          ],
        },
      })
    );
  }),

  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          user: {
            id: '1',
            username: 'testuser',
            email: 'test@example.com',
          },
          tokens: {
            accessToken: 'mock-token',
            refreshToken: 'mock-refresh-token',
          },
        },
      })
    );
  }),
];
```

### Пример integration теста

```typescript
// __tests__/integration/auth-flow.test.ts
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import LoginScreen from '@/screens/LoginScreen';
import { handlers } from '../mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Auth Flow', () => {
  it('should login user successfully', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(getByText('Welcome, testuser!')).toBeTruthy();
    });
  });

  it('should handle login error', async () => {
    server.use(
      rest.post('/api/v1/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            success: false,
            error: {
              code: 'INVALID_CREDENTIALS',
              message: 'Invalid email or password',
            },
          })
        );
      })
    );

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    fireEvent.changeText(emailInput, 'wrong@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(getByText('Invalid email or password')).toBeTruthy();
    });
  });
});
```

---

## 🎭 E2E тесты

### Настройка Detox

```javascript
// .detoxrc.js
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  configurations: {
    'ios.sim.debug': {
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/NebulaSports.app',
      build: 'xcodebuild -workspace ios/NebulaSports.xcworkspace -scheme NebulaSports -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14',
      },
    },
    'android.emu.debug': {
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_4_API_30',
      },
    },
  },
};
```

### Пример E2E теста

```typescript
// e2e/user-journey.test.ts
import { device, expect, element, by } from 'detox';

describe('User Journey', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete user registration flow', async () => {
    // Открыть экран регистрации
    await element(by.id('register-button')).tap();
    
    // Заполнить форму
    await element(by.id('username-input')).typeText('testuser');
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    
    // Нажать кнопку регистрации
    await element(by.id('register-submit')).tap();
    
    // Проверить успешную регистрацию
    await expect(element(by.text('Welcome to Nebula Sports!'))).toBeVisible();
  });

  it('should navigate through main screens', async () => {
    // Перейти на экран трансляций
    await element(by.id('streams-tab')).tap();
    await expect(element(by.id('streams-screen'))).toBeVisible();
    
    // Перейти на экран чата
    await element(by.id('chat-tab')).tap();
    await expect(element(by.id('chat-screen'))).toBeVisible();
    
    // Перейти на экран аналитики
    await element(by.id('analytics-tab')).tap();
    await expect(element(by.id('analytics-screen'))).toBeVisible();
    
    // Перейти на экран профиля
    await element(by.id('profile-tab')).tap();
    await expect(element(by.id('profile-screen'))).toBeVisible();
  });

  it('should send chat message', async () => {
    // Открыть чат
    await element(by.id('chat-tab')).tap();
    
    // Выбрать чат
    await element(by.id('chat-room-1')).tap();
    
    // Ввести сообщение
    await element(by.id('message-input')).typeText('Hello, world!');
    
    // Отправить сообщение
    await element(by.id('send-button')).tap();
    
    // Проверить, что сообщение появилось
    await expect(element(by.text('Hello, world!'))).toBeVisible();
  });
});
```

---

## ⚡ Performance тесты

### Настройка Lighthouse

```javascript
// __tests__/performance/lighthouse.test.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

describe('Performance Tests', () => {
  it('should have good performance metrics', async () => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port,
    };
    
    const runnerResult = await lighthouse('http://localhost:3000', options);
    
    // Проверяем метрики производительности
    expect(runnerResult.lhr.categories.performance.score).toBeGreaterThan(0.9);
    expect(runnerResult.lhr.audits['first-contentful-paint'].score).toBeGreaterThan(0.9);
    expect(runnerResult.lhr.audits['largest-contentful-paint'].score).toBeGreaterThan(0.9);
    
    await chrome.kill();
  });
});
```

### React Native Performance тесты

```typescript
// __tests__/performance/react-native.test.ts
import { performance } from 'react-native-performance';

describe('React Native Performance', () => {
  it('should load screens quickly', async () => {
    const startTime = performance.now();
    
    // Навигация к экрану
    await navigation.navigate('HomeScreen');
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    expect(loadTime).toBeLessThan(1000); // Менее 1 секунды
  });

  it('should handle large lists efficiently', async () => {
    const startTime = performance.now();
    
    // Загрузка большого списка
    await loadStreamsList(1000);
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    expect(loadTime).toBeLessThan(2000); // Менее 2 секунд
  });
});
```

---

## 📊 Покрытие кода

### Настройка покрытия

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    './src/components/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/utils/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
```

### Генерация отчета покрытия

```bash
# Запуск тестов с покрытием
npm run test:coverage

# Просмотр отчета в браузере
npm run test:coverage:open
```

---

## 🚀 CI/CD интеграция

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Generate coverage report
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

---

## 📝 Тестовые данные

### Моки данных

```typescript
// __tests__/mocks/data.ts
export const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  level: 15,
  experience: 14500,
  achievements: [],
  subscription: 'premium',
  preferences: {
    favoriteSports: ['football', 'basketball'],
    notifications: {
      push: true,
      email: true,
      sms: false,
      matchReminders: true,
      chatMessages: true,
      achievements: true,
    },
    language: 'ru',
    theme: 'dark',
    vrEnabled: true,
  },
  createdAt: new Date(),
  lastActive: new Date(),
};

export const mockStream: Stream = {
  id: '1',
  title: 'Test Stream',
  sport: 'football',
  startTime: new Date(),
  status: 'live',
  viewers: 125000,
  thumbnail: 'https://example.com/thumbnail.jpg',
  streamUrl: 'https://example.com/stream.m3u8',
  vrEnabled: true,
  chatEnabled: true,
  analytics: {
    totalViewers: 125000,
    peakViewers: 150000,
    averageWatchTime: 45,
    engagement: 85,
    reactions: [],
  },
};
```

---

## 🔧 Команды тестирования

### Package.json скрипты

```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=__tests__/(components|utils|services)",
    "test:integration": "jest --testPathPattern=__tests__/integration",
    "test:e2e": "detox test",
    "test:coverage": "jest --coverage",
    "test:coverage:open": "open coverage/lcov-report/index.html",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:performance": "lighthouse http://localhost:3000 --output=json --output-path=./performance-report.json"
  }
}
```

### Запуск тестов

```bash
# Все тесты
npm test

# Только unit тесты
npm run test:unit

# Только integration тесты
npm run test:integration

# E2E тесты
npm run test:e2e

# Тесты с покрытием
npm run test:coverage

# Тесты в режиме наблюдения
npm run test:watch

# Performance тесты
npm run test:performance
```

---

## 📋 Чек-лист тестирования

### Перед релизом
- [ ] Все unit тесты проходят
- [ ] Все integration тесты проходят
- [ ] Все E2E тесты проходят
- [ ] Покрытие кода > 70%
- [ ] Performance тесты проходят
- [ ] Accessibility тесты проходят
- [ ] Security тесты проходят

### Регрессионное тестирование
- [ ] Основные пользовательские сценарии
- [ ] Критические функции
- [ ] Интеграции с внешними сервисами
- [ ] Производительность
- [ ] Безопасность

---

**Этот документ будет обновляться по мере развития тестовой стратегии! 🚀**
