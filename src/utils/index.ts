import { SportType, User, Achievement, Stream } from '@/types';
import { SPORTS, SPACE_THEME } from '@/constants';

// Форматирование времени
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

// Форматирование чисел
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Форматирование времени просмотра
export const formatWatchTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  }
  if (minutes > 0) {
    return `${minutes}м ${secs}с`;
  }
  return `${secs}с`;
};

// Генерация случайного ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Валидация email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация пароля
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

// Получение цвета спорта
export const getSportColor = (sport: SportType): string => {
  return SPORTS[sport]?.color || SPACE_THEME.colors.primary;
};

// Получение иконки спорта
export const getSportIcon = (sport: SportType): string => {
  return SPORTS[sport]?.icon || '🏆';
};

// Получение названия спорта
export const getSportName = (sport: SportType): string => {
  return SPORTS[sport]?.name || 'Спорт';
};

// Расчет уровня пользователя
export const calculateUserLevel = (experience: number): number => {
  return Math.floor(experience / 1000) + 1;
};

// Расчет прогресса до следующего уровня
export const calculateLevelProgress = (experience: number): number => {
  const currentLevel = calculateUserLevel(experience);
  const currentLevelExp = (currentLevel - 1) * 1000;
  const nextLevelExp = currentLevel * 1000;
  const progress = ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
  return Math.min(100, Math.max(0, progress));
};

// Генерация градиента
export const generateGradient = (colors: string[]): string => {
  return `linear-gradient(135deg, ${colors.join(', ')})`;
};

// Создание космического градиента
export const createSpaceGradient = (type: 'primary' | 'accent' | 'space' | 'nebula' = 'primary'): string => {
  const colors = SPACE_THEME.gradients[type];
  return generateGradient(colors);
};

// Анимация появления
export const createFadeInAnimation = (duration: number = 300) => ({
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration
});

// Анимация скольжения
export const createSlideAnimation = (direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: number = 300) => {
  const translateY = direction === 'up' ? -50 : direction === 'down' ? 50 : 0;
  const translateX = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
  
  return {
    from: { 
      opacity: 0, 
      transform: [{ translateY }, { translateX }] 
    },
    to: { 
      opacity: 1, 
      transform: [{ translateY: 0 }, { translateX: 0 }] 
    },
    duration
  };
};

// Проверка статуса трансляции
export const getStreamStatus = (stream: Stream): 'upcoming' | 'live' | 'ended' => {
  const now = new Date();
  if (now < stream.startTime) return 'upcoming';
  if (stream.endTime && now > stream.endTime) return 'ended';
  return 'live';
};

// Получение времени до начала трансляции
export const getTimeUntilStream = (startTime: Date): string => {
  const now = new Date();
  const diff = startTime.getTime() - now.getTime();
  
  if (diff <= 0) return 'Началось';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}д ${hours}ч`;
  if (hours > 0) return `${hours}ч ${minutes}м`;
  return `${minutes}м`;
};

// Создание аватара по умолчанию
export const createDefaultAvatar = (username: string): string => {
  const colors = ['#e94560', '#f27121', '#667eea', '#764ba2', '#f093fb'];
  const color = colors[username.length % colors.length];
  const initial = username.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${initial}&background=${color.replace('#', '')}&color=fff&size=200`;
};

// Шифрование данных
export const encryptData = async (data: string, key: string): Promise<string> => {
  // В реальном приложении используйте библиотеку для шифрования
  // Например, expo-crypto или react-native-crypto-js
  return btoa(data + key);
};

// Расшифровка данных
export const decryptData = async (encryptedData: string, key: string): Promise<string> => {
  // В реальном приложении используйте библиотеку для расшифровки
  const decoded = atob(encryptedData);
  return decoded.replace(key, '');
};

// Генерация QR кода для админов
export const generateAdminQR = (adminId: string, accessLevel: number): string => {
  const data = {
    id: adminId,
    level: accessLevel,
    timestamp: Date.now()
  };
  return btoa(JSON.stringify(data));
};

// Проверка QR кода админа
export const validateAdminQR = (qrData: string): { id: string; level: number } | null => {
  try {
    const data = JSON.parse(atob(qrData));
    if (data.id && data.level && data.timestamp) {
      // Проверяем, что QR код не старше 24 часов
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        return { id: data.id, level: data.level };
      }
    }
    return null;
  } catch {
    return null;
  }
};

// Создание персонализированных рекомендаций
export const generateRecommendations = (user: User, streams: Stream[]): Stream[] => {
  const favoriteSports = user.preferences.favoriteSports;
  const userLevel = calculateUserLevel(user.experience);
  
  return streams
    .filter(stream => favoriteSports.includes(stream.sport))
    .sort((a, b) => {
      // Приоритет: любимые виды спорта, затем по времени начала
      const aScore = favoriteSports.indexOf(a.sport) + (a.status === 'live' ? 10 : 0);
      const bScore = favoriteSports.indexOf(b.sport) + (b.status === 'live' ? 10 : 0);
      return bScore - aScore;
    })
    .slice(0, 10);
};

// Форматирование размера файла
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Создание уникального имени файла
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  const extension = originalName.split('.').pop();
  return `${timestamp}_${random}.${extension}`;
};
