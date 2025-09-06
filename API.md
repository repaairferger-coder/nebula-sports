# 🔌 API Документация Nebula Sports

## 📋 Обзор

Nebula Sports API предоставляет RESTful интерфейс для взаимодействия с приложением. API поддерживает аутентификацию через JWT токены и предоставляет доступ ко всем основным функциям приложения.

### Базовый URL
```
Production: https://api.nebula-sports.com/v1
Staging: https://staging-api.nebula-sports.com/v1
Development: http://localhost:3000/api/v1
```

### Аутентификация
Все запросы к API требуют аутентификации через JWT токен в заголовке:
```
Authorization: Bearer <jwt_token>
```

---

## 🔐 Аутентификация

### POST /auth/register
Регистрация нового пользователя

**Запрос:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "preferences": {
    "favoriteSports": ["football", "basketball"],
    "language": "ru",
    "theme": "dark"
  }
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "level": 1,
      "experience": 0,
      "subscription": "free"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "jwt_token"
    }
  }
}
```

### POST /auth/login
Вход в систему

**Запрос:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "level": 15,
      "experience": 14500,
      "subscription": "premium"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "jwt_token"
    }
  }
}
```

### POST /auth/refresh
Обновление токена

**Запрос:**
```json
{
  "refreshToken": "jwt_token"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token"
  }
}
```

### POST /auth/logout
Выход из системы

**Запрос:**
```json
{
  "refreshToken": "jwt_token"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

---

## 👤 Пользователи

### GET /users/profile
Получение профиля текущего пользователя

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "avatar": "string",
    "level": 15,
    "experience": 14500,
    "achievements": [
      {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "icon": "string",
        "rarity": "rare",
        "unlockedAt": "2024-01-01T00:00:00Z",
        "progress": 10,
        "maxProgress": 10
      }
    ],
    "subscription": "premium",
    "preferences": {
      "favoriteSports": ["football", "basketball"],
      "notifications": {
        "push": true,
        "email": true,
        "sms": false
      },
      "language": "ru",
      "theme": "dark",
      "vrEnabled": true
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "lastActive": "2024-01-01T00:00:00Z"
  }
}
```

### PUT /users/profile
Обновление профиля пользователя

**Запрос:**
```json
{
  "username": "string",
  "preferences": {
    "favoriteSports": ["football", "basketball", "tennis"],
    "language": "en",
    "theme": "light"
  }
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "preferences": {
        "favoriteSports": ["football", "basketball", "tennis"],
        "language": "en",
        "theme": "light"
      }
    }
  }
}
```

### POST /users/avatar
Загрузка аватара

**Запрос:** Multipart form data
```
avatar: file
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "avatarUrl": "https://cdn.nebula-sports.com/avatars/user_123.jpg"
  }
}
```

---

## 🏆 Трансляции

### GET /streams
Получение списка трансляций

**Параметры запроса:**
- `sport` (optional): Фильтр по виду спорта
- `status` (optional): Фильтр по статусу (upcoming, live, ended)
- `limit` (optional): Количество результатов (по умолчанию 20)
- `offset` (optional): Смещение для пагинации (по умолчанию 0)

**Ответ:**
```json
{
  "success": true,
  "data": {
    "streams": [
      {
        "id": "uuid",
        "title": "string",
        "sport": "football",
        "startTime": "2024-01-01T20:00:00Z",
        "endTime": "2024-01-01T22:00:00Z",
        "status": "live",
        "viewers": 125000,
        "thumbnail": "string",
        "streamUrl": "string",
        "vrEnabled": true,
        "chatEnabled": true,
        "analytics": {
          "totalViewers": 125000,
          "peakViewers": 150000,
          "averageWatchTime": 45,
          "engagement": 85,
          "reactions": [
            {
              "type": "like",
              "count": 1250
            }
          ]
        }
      }
    ],
    "pagination": {
      "total": 100,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### GET /streams/:id
Получение детальной информации о трансляции

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    "sport": "football",
    "startTime": "2024-01-01T20:00:00Z",
    "endTime": "2024-01-01T22:00:00Z",
    "status": "live",
    "viewers": 125000,
    "thumbnail": "string",
    "streamUrl": "string",
    "vrEnabled": true,
    "chatEnabled": true,
    "analytics": {
      "totalViewers": 125000,
      "peakViewers": 150000,
      "averageWatchTime": 45,
      "engagement": 85,
      "reactions": [
        {
          "type": "like",
          "count": 1250
        }
      ]
    }
  }
}
```

### POST /streams/:id/watch
Начало просмотра трансляции

**Запрос:**
```json
{
  "startTime": "2024-01-01T20:00:00Z"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "viewId": "uuid",
    "startTime": "2024-01-01T20:00:00Z"
  }
}
```

### PUT /streams/:id/watch/:viewId
Обновление времени просмотра

**Запрос:**
```json
{
  "endTime": "2024-01-01T21:30:00Z",
  "watchDuration": 5400
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "viewId": "uuid",
    "watchDuration": 5400,
    "experienceGained": 100
  }
}
```

---

## 💬 Чат

### GET /chat/rooms
Получение списка чатов

**Ответ:**
```json
{
  "success": true,
  "data": {
    "rooms": [
      {
        "id": "uuid",
        "name": "string",
        "type": "group",
        "participants": ["uuid1", "uuid2"],
        "unreadCount": 5,
        "isMuted": false,
        "lastMessage": {
          "id": "uuid",
          "userId": "uuid",
          "username": "string",
          "content": "string",
          "timestamp": "2024-01-01T20:00:00Z"
        }
      }
    ]
  }
}
```

### GET /chat/rooms/:id/messages
Получение сообщений чата

**Параметры запроса:**
- `limit` (optional): Количество сообщений (по умолчанию 50)
- `offset` (optional): Смещение для пагинации (по умолчанию 0)

**Ответ:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "userId": "uuid",
        "username": "string",
        "avatar": "string",
        "content": "string",
        "type": "text",
        "timestamp": "2024-01-01T20:00:00Z",
        "reactions": [
          {
            "userId": "uuid",
            "type": "like"
          }
        ],
        "replyTo": "uuid",
        "isPinned": false
      }
    ],
    "pagination": {
      "total": 100,
      "limit": 50,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### POST /chat/rooms/:id/messages
Отправка сообщения

**Запрос:**
```json
{
  "content": "string",
  "type": "text",
  "replyTo": "uuid"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "message": {
      "id": "uuid",
      "userId": "uuid",
      "username": "string",
      "content": "string",
      "type": "text",
      "timestamp": "2024-01-01T20:00:00Z",
      "reactions": [],
      "replyTo": "uuid",
      "isPinned": false
    }
  }
}
```

### POST /chat/messages/:id/reactions
Добавление реакции на сообщение

**Запрос:**
```json
{
  "type": "like"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "reaction": {
      "userId": "uuid",
      "type": "like"
    }
  }
}
```

### DELETE /chat/messages/:id/reactions
Удаление реакции

**Ответ:**
```json
{
  "success": true,
  "message": "Reaction removed"
}
```

---

## 📊 Аналитика

### GET /analytics/user
Получение персональной аналитики

**Ответ:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "watchTime": 125400,
    "favoriteSports": ["football", "basketball", "tennis"],
    "preferredStreamTimes": ["20:00", "21:00", "22:00"],
    "chatActivity": 85,
    "achievementsUnlocked": 12,
    "subscriptionUsage": {
      "vr_streams": 45,
      "analytics": 78,
      "premium_content": 23,
      "chat_rooms": 67
    },
    "recommendations": [
      {
        "id": "uuid",
        "type": "stream",
        "title": "string",
        "description": "string",
        "confidence": 95,
        "data": {
          "sport": "football",
          "startTime": "2024-01-01T20:00:00Z",
          "reason": "string"
        }
      }
    ]
  }
}
```

### GET /analytics/streams/:id
Получение аналитики трансляции

**Ответ:**
```json
{
  "success": true,
  "data": {
    "streamId": "uuid",
    "totalViewers": 125000,
    "peakViewers": 150000,
    "averageWatchTime": 45,
    "engagement": 85,
    "reactions": [
      {
        "type": "like",
        "count": 1250
      }
    ],
    "demographics": {
      "ageGroups": {
        "18-24": 25,
        "25-34": 35,
        "35-44": 25,
        "45+": 15
      },
      "countries": {
        "RU": 40,
        "US": 25,
        "DE": 15,
        "FR": 10,
        "Other": 10
      }
    }
  }
}
```

---

## 🎮 Достижения

### GET /achievements
Получение списка достижений

**Ответ:**
```json
{
  "success": true,
  "data": {
    "achievements": [
      {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "icon": "string",
        "rarity": "rare",
        "nftId": "string",
        "unlockedAt": "2024-01-01T20:00:00Z",
        "progress": 10,
        "maxProgress": 10
      }
    ]
  }
}
```

### POST /achievements/:id/unlock
Разблокировка достижения

**Ответ:**
```json
{
  "success": true,
  "data": {
    "achievement": {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "icon": "string",
      "rarity": "rare",
      "unlockedAt": "2024-01-01T20:00:00Z",
      "progress": 10,
      "maxProgress": 10
    },
    "experienceGained": 100
  }
}
```

---

## 💳 Подписки

### GET /subscriptions
Получение информации о подписках

**Ответ:**
```json
{
  "success": true,
  "data": {
    "subscriptions": [
      {
        "type": "free",
        "name": "Бесплатно",
        "price": 0,
        "features": ["Базовые трансляции", "Чат", "Профиль"],
        "color": "#9E9E9E"
      },
      {
        "type": "premium",
        "name": "Премиум",
        "price": 2990,
        "features": ["4K трансляции", "VR/AR", "Персональные рекомендации"],
        "color": "#2196F3"
      }
    ]
  }
}
```

### POST /subscriptions/purchase
Покупка подписки

**Запрос:**
```json
{
  "subscriptionType": "premium",
  "paymentMethod": "apple_pay",
  "paymentData": {
    "token": "string"
  }
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "type": "premium",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-02-01T00:00:00Z",
      "status": "active"
    },
    "payment": {
      "id": "uuid",
      "amount": 2990,
      "currency": "RUB",
      "status": "completed"
    }
  }
}
```

---

## 👨‍💼 Администрирование

### POST /admin/auth
Аутентификация администратора

**Запрос:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "admin": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "accessLevel": 5,
      "permissions": [
        {
          "module": "users",
          "actions": ["read", "write", "delete", "moderate"]
        }
      ]
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "jwt_token"
    }
  }
}
```

### GET /admin/stats
Получение статистики системы

**Ответ:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 12543,
      "active": 8932,
      "newToday": 156
    },
    "streams": {
      "total": 156,
      "live": 23,
      "upcoming": 45
    },
    "chat": {
      "totalMessages": 8432,
      "activeRooms": 234
    },
    "system": {
      "uptime": 99.5,
      "responseTime": 120
    }
  }
}
```

### GET /admin/users
Получение списка пользователей

**Параметры запроса:**
- `limit` (optional): Количество результатов (по умолчанию 50)
- `offset` (optional): Смещение для пагинации (по умолчанию 0)
- `search` (optional): Поиск по имени или email

**Ответ:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "username": "string",
        "email": "string",
        "level": 15,
        "subscription": "premium",
        "createdAt": "2024-01-01T00:00:00Z",
        "lastActive": "2024-01-01T20:00:00Z"
      }
    ],
    "pagination": {
      "total": 12543,
      "limit": 50,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### PUT /admin/users/:id
Обновление пользователя

**Запрос:**
```json
{
  "subscription": "premium",
  "level": 20,
  "experience": 20000
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "subscription": "premium",
      "level": 20,
      "experience": 20000
    }
  }
}
```

---

## 🔔 Уведомления

### GET /notifications
Получение уведомлений

**Ответ:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "match_start",
        "title": "string",
        "message": "string",
        "data": {
          "streamId": "uuid",
          "sport": "football"
        },
        "read": false,
        "createdAt": "2024-01-01T20:00:00Z"
      }
    ]
  }
}
```

### PUT /notifications/:id/read
Отметка уведомления как прочитанного

**Ответ:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## 📱 WebSocket

### Подключение
```javascript
const socket = io('wss://api.nebula-sports.com', {
  auth: {
    token: 'jwt_token'
  }
});
```

### События чата
```javascript
// Отправка сообщения
socket.emit('chat:message', {
  roomId: 'uuid',
  content: 'string',
  type: 'text'
});

// Получение сообщения
socket.on('chat:message', (message) => {
  console.log('New message:', message);
});

// Индикатор набора текста
socket.emit('chat:typing', {
  roomId: 'uuid',
  isTyping: true
});

socket.on('chat:typing', (data) => {
  console.log('User typing:', data);
});
```

### События трансляций
```javascript
// Подписка на трансляцию
socket.emit('stream:join', {
  streamId: 'uuid'
});

// Получение обновлений трансляции
socket.on('stream:update', (data) => {
  console.log('Stream update:', data);
});

// Реакции на трансляцию
socket.emit('stream:reaction', {
  streamId: 'uuid',
  type: 'like'
});
```

---

## ❌ Обработка ошибок

### Стандартный формат ошибки
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

### Коды ошибок
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

---

## 🔒 Rate Limiting

### Лимиты запросов
- **Аутентификация**: 5 запросов в минуту
- **API**: 100 запросов в минуту
- **Загрузка файлов**: 10 запросов в минуту
- **WebSocket**: 1000 сообщений в минуту

### Заголовки ответа
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

**Эта документация будет обновляться по мере развития API! 🚀**
