import { SportType, SubscriptionType } from '@/types';

// Спортивные константы
export const SPORTS: Record<SportType, { name: string; icon: string; color: string }> = {
  football: { name: 'Футбол', icon: '⚽', color: '#4CAF50' },
  basketball: { name: 'Баскетбол', icon: '🏀', color: '#FF9800' },
  baseball: { name: 'Бейсбол', icon: '⚾', color: '#2196F3' },
  american_football: { name: 'Американский футбол', icon: '🏈', color: '#9C27B0' },
  hockey: { name: 'Хоккей', icon: '🏒', color: '#00BCD4' },
  volleyball: { name: 'Волейбол', icon: '🏐', color: '#E91E63' },
  tennis: { name: 'Теннис', icon: '🎾', color: '#8BC34A' },
  table_tennis: { name: 'Настольный теннис', icon: '🏓', color: '#FFC107' },
  boxing: { name: 'Бокс', icon: '🥊', color: '#F44336' },
  mma: { name: 'ММА', icon: '🥋', color: '#795548' },
  athletics: { name: 'Легкая атлетика', icon: '🏃', color: '#607D8B' },
  swimming: { name: 'Плавание', icon: '🏊', color: '#00BCD4' },
  formula1: { name: 'Формула 1', icon: '🏎️', color: '#FF5722' },
  cycling: { name: 'Велоспорт', icon: '🚴', color: '#3F51B5' },
  rugby: { name: 'Регби', icon: '🏉', color: '#4CAF50' },
  handball: { name: 'Гандбол', icon: '🤾', color: '#FF9800' },
  badminton: { name: 'Бадминтон', icon: '🏸', color: '#9C27B0' },
  cricket: { name: 'Крикет', icon: '🏏', color: '#795548' },
  skiing: { name: 'Лыжи', icon: '🎿', color: '#00BCD4' },
  gymnastics: { name: 'Гимнастика', icon: '🤸', color: '#E91E63' }
};

// Подписки
export const SUBSCRIPTIONS: Record<SubscriptionType, { 
  name: string; 
  price: number; 
  features: string[]; 
  color: string;
}> = {
  free: { 
    name: 'Бесплатно', 
    price: 0, 
    features: ['Базовые трансляции', 'Чат', 'Профиль'], 
    color: '#9E9E9E' 
  },
  basic: { 
    name: 'Базовый', 
    price: 990, 
    features: ['HD трансляции', 'Аналитика', 'Уведомления'], 
    color: '#4CAF50' 
  },
  premium: { 
    name: 'Премиум', 
    price: 2990, 
    features: ['4K трансляции', 'VR/AR', 'Персональные рекомендации'], 
    color: '#2196F3' 
  },
  pro: { 
    name: 'Про', 
    price: 7990, 
    features: ['Все функции', 'Приоритетная поддержка', 'Эксклюзивный контент'], 
    color: '#9C27B0' 
  },
  enterprise: { 
    name: 'Корпоративный', 
    price: 16990, 
    features: ['Корпоративные функции', 'API доступ', 'Персональный менеджер'], 
    color: '#FF5722' 
  }
};

// Космическая тематика - цвета
export const SPACE_THEME = {
  colors: {
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#0f3460',
    highlight: '#e94560',
    text: '#ffffff',
    textSecondary: '#b8b8b8',
    background: '#0a0a0a',
    surface: '#1a1a2e',
    border: '#2a2a3e',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  },
  gradients: {
    primary: ['#1a1a2e', '#16213e', '#0f3460'],
    accent: ['#e94560', '#f27121'],
    space: ['#0a0a0a', '#1a1a2e', '#16213e'],
    nebula: ['#667eea', '#764ba2', '#f093fb']
  }
};

// Анимации
export const ANIMATIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
};

// API endpoints
export const API_ENDPOINTS = {
  base: 'https://api.nebula-sports.com',
  auth: '/auth',
  users: '/users',
  streams: '/streams',
  chat: '/chat',
  analytics: '/analytics',
  admin: '/admin',
  payments: '/payments'
};

// Уровни доступа админов
export const ADMIN_LEVELS = {
  1: { name: 'Модератор', permissions: ['read', 'moderate'] },
  2: { name: 'Контент-менеджер', permissions: ['read', 'write', 'moderate'] },
  3: { name: 'Аналитик', permissions: ['read', 'write', 'delete', 'moderate'] },
  4: { name: 'Администратор', permissions: ['read', 'write', 'delete', 'moderate'] },
  5: { name: 'Супер-админ', permissions: ['read', 'write', 'delete', 'moderate'] }
};

// Настройки уведомлений
export const NOTIFICATION_TYPES = {
  MATCH_START: 'match_start',
  MATCH_END: 'match_end',
  ACHIEVEMENT: 'achievement',
  CHAT_MESSAGE: 'chat_message',
  FRIEND_REQUEST: 'friend_request',
  SUBSCRIPTION_EXPIRY: 'subscription_expiry'
};

// Размеры экрана
export const SCREEN_SIZES = {
  small: 320,
  medium: 375,
  large: 414,
  xlarge: 768
};

// Лимиты
export const LIMITS = {
  MAX_CHAT_MESSAGE_LENGTH: 1000,
  MAX_GROUP_PARTICIPANTS: 200,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_DURATION: 60, // 60 секунд
  MAX_AUDIO_DURATION: 120 // 2 минуты
};
