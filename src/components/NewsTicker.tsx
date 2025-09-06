import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { NewsItem } from '@/types';
import { SPACE_THEME } from '@/constants';
import { formatTime } from '@/utils';

const { width } = Dimensions.get('window');

interface NewsTickerProps {
  onNewsPress?: (news: NewsItem) => void;
}

const NewsTicker: React.FC<NewsTickerProps> = ({ onNewsPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  // Моковые данные новостей
  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: '1',
        title: '🏆 Чемпионат мира по футболу: финал сегодня в 21:00',
        content: 'Бразилия против Аргентины в финале чемпионата мира',
        sport: 'football',
        priority: 'high',
        isAd: false,
        publishedAt: new Date(),
      },
      {
        id: '2',
        title: '🥊 Бой за титул чемпиона UFC: Джонс против Миочича',
        content: 'Главный бой вечера в 23:00 по московскому времени',
        sport: 'mma',
        priority: 'high',
        isAd: false,
        publishedAt: new Date(),
      },
      {
        id: '3',
        title: '🎯 Специальное предложение: Premium подписка со скидкой 50%',
        content: 'Получите доступ ко всем VR трансляциям и аналитике',
        sport: 'football',
        priority: 'medium',
        isAd: true,
        adUrl: 'https://nebula-sports.com/premium',
        publishedAt: new Date(),
      },
      {
        id: '4',
        title: '🏀 NBA: Лейкерс против Уорриорз в прямом эфире',
        content: 'Смотрите матч с AI-аналитикой и VR режимом',
        sport: 'basketball',
        priority: 'medium',
        isAd: false,
        publishedAt: new Date(),
      },
    ];
    setNewsItems(mockNews);
  }, []);

  // Автоматическая смена новостей
  useEffect(() => {
    if (newsItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000); // Смена каждые 5 секунд

    return () => clearInterval(interval);
  }, [newsItems.length]);

  const handleNewsPress = (news: NewsItem) => {
    if (onNewsPress) {
      onNewsPress(news);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return SPACE_THEME.colors.error;
      case 'medium':
        return SPACE_THEME.colors.warning;
      default:
        return SPACE_THEME.colors.info;
    }
  };

  if (newsItems.length === 0) {
    return null;
  }

  const currentNews = newsItems[currentIndex];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={SPACE_THEME.gradients.space}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.content}>
          {/* Иконка новостей */}
          <View style={styles.iconContainer}>
            <Ionicons 
              name="newspaper" 
              size={16} 
              color={SPACE_THEME.colors.highlight} 
            />
          </View>

          {/* Текст новости */}
          <TouchableOpacity
            style={styles.newsContainer}
            onPress={() => handleNewsPress(currentNews)}
            activeOpacity={0.7}
          >
            <Animatable.Text
              animation="fadeIn"
              duration={500}
              key={currentNews.id}
              style={[
                styles.newsText,
                { color: currentNews.isAd ? SPACE_THEME.colors.highlight : SPACE_THEME.colors.text }
              ]}
              numberOfLines={1}
            >
              {currentNews.title}
            </Animatable.Text>
          </TouchableOpacity>

          {/* Индикатор приоритета */}
          <View
            style={[
              styles.priorityIndicator,
              { backgroundColor: getPriorityColor(currentNews.priority) }
            ]}
          />

          {/* Время публикации */}
          <Text style={styles.timeText}>
            {formatTime(currentNews.publishedAt)}
          </Text>

          {/* Индикаторы новостей */}
          <View style={styles.indicators}>
            {newsItems.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentIndex 
                      ? SPACE_THEME.colors.highlight 
                      : SPACE_THEME.colors.textSecondary
                  }
                ]}
              />
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: SPACE_THEME.colors.primary,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsContainer: {
    flex: 1,
    marginRight: 12,
  },
  newsText: {
    fontSize: 14,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
  },
  priorityIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  timeText: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
    marginRight: 12,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

export default NewsTicker;
