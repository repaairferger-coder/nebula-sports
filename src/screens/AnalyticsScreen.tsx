import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { ProgressBar } from 'react-native-progress';

import { AnalyticsData, SportType, Recommendation } from '@/types';
import { SPACE_THEME, SPORTS } from '@/constants';
import { formatWatchTime, getSportColor, getSportIcon } from '@/utils';

const { width } = Dimensions.get('window');

const AnalyticsScreen: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Моковые данные аналитики
  useEffect(() => {
    const mockAnalytics: AnalyticsData = {
      userId: '1',
      watchTime: 125400, // секунды
      favoriteSports: ['football', 'basketball', 'tennis', 'mma'],
      preferredStreamTimes: ['20:00', '21:00', '22:00', '23:00'],
      chatActivity: 85,
      achievementsUnlocked: 12,
      subscriptionUsage: {
        'vr_streams': 45,
        'analytics': 78,
        'premium_content': 23,
        'chat_rooms': 67,
      },
      recommendations: [
        {
          id: '1',
          type: 'stream',
          title: 'Рекомендуем посмотреть',
          description: 'Футбольный матч Барселона vs Реал Мадрид',
          confidence: 95,
          data: {
            sport: 'football',
            startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
            reason: 'Вы часто смотрите футбол в это время',
          },
        },
        {
          id: '2',
          type: 'food',
          title: 'Заказать еду',
          description: 'Пицца и напитки для просмотра матча',
          confidence: 80,
          data: {
            restaurant: 'Додо Пицца',
            estimatedTime: '30-45 минут',
            reason: 'Вы обычно заказываете еду во время трансляций',
          },
        },
        {
          id: '3',
          type: 'transport',
          title: 'Добраться до стадиона',
          description: 'Такси до стадиона Лужники',
          confidence: 70,
          data: {
            destination: 'Стадион Лужники',
            estimatedTime: '25 минут',
            cost: '450-600 руб',
            reason: 'У вас есть билеты на матч',
          },
        },
      ],
    };

    setAnalyticsData(mockAnalytics);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Здесь будет загрузка данных с сервера
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderWatchTimeStats = () => {
    if (!analyticsData) return null;

    const totalHours = Math.floor(analyticsData.watchTime / 3600);
    const totalDays = Math.floor(totalHours / 24);

    return (
      <View style={styles.statsCard}>
        <LinearGradient
          colors={SPACE_THEME.gradients.primary}
          style={styles.statsGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.statsHeader}>
            <Ionicons name="time" size={24} color={SPACE_THEME.colors.highlight} />
            <Text style={styles.statsTitle}>Время просмотра</Text>
          </View>
          
          <View style={styles.statsContent}>
            <Text style={styles.statsMainValue}>{totalDays}</Text>
            <Text style={styles.statsMainLabel}>дней</Text>
            <Text style={styles.statsSubValue}>
              {formatWatchTime(analyticsData.watchTime)}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const renderFavoriteSports = () => {
    if (!analyticsData) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="trophy" size={20} color={SPACE_THEME.colors.highlight} />
          <Text style={styles.sectionTitle}>Любимые виды спорта</Text>
        </View>
        
        <View style={styles.sportsGrid}>
          {analyticsData.favoriteSports.map((sport, index) => (
            <Animatable.View
              key={sport}
              animation="fadeInUp"
              duration={300}
              delay={index * 100}
              style={[
                styles.sportCard,
                { borderColor: getSportColor(sport) }
              ]}
            >
              <Text style={styles.sportIcon}>{getSportIcon(sport)}</Text>
              <Text style={styles.sportName}>{SPORTS[sport].name}</Text>
              <View style={styles.sportRank}>
                <Text style={styles.sportRankText}>#{index + 1}</Text>
              </View>
            </Animatable.View>
          ))}
        </View>
      </View>
    );
  };

  const renderPreferredTimes = () => {
    if (!analyticsData) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="clock" size={20} color={SPACE_THEME.colors.info} />
          <Text style={styles.sectionTitle}>Предпочтительное время</Text>
        </View>
        
        <View style={styles.timesContainer}>
          {analyticsData.preferredStreamTimes.map((time, index) => (
            <View key={time} style={styles.timeItem}>
              <Text style={styles.timeText}>{time}</Text>
              <ProgressBar
                progress={(4 - index) / 4}
                width={width * 0.6}
                height={6}
                color={SPACE_THEME.colors.info}
                unfilledColor={SPACE_THEME.colors.border}
                borderWidth={0}
                borderRadius={3}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderSubscriptionUsage = () => {
    if (!analyticsData) return null;

    const usageItems = [
      { key: 'vr_streams', label: 'VR трансляции', icon: 'glasses' },
      { key: 'analytics', label: 'Аналитика', icon: 'analytics' },
      { key: 'premium_content', label: 'Премиум контент', icon: 'star' },
      { key: 'chat_rooms', label: 'Чат комнаты', icon: 'chatbubbles' },
    ];

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bar-chart" size={20} color={SPACE_THEME.colors.warning} />
          <Text style={styles.sectionTitle}>Использование подписки</Text>
        </View>
        
        <View style={styles.usageContainer}>
          {usageItems.map((item, index) => {
            const usage = analyticsData.subscriptionUsage[item.key] || 0;
            return (
              <View key={item.key} style={styles.usageItem}>
                <View style={styles.usageHeader}>
                  <Ionicons name={item.icon as any} size={20} color={SPACE_THEME.colors.text} />
                  <Text style={styles.usageLabel}>{item.label}</Text>
                  <Text style={styles.usageValue}>{usage}%</Text>
                </View>
                <ProgressBar
                  progress={usage / 100}
                  width={width * 0.8}
                  height={8}
                  color={SPACE_THEME.colors.warning}
                  unfilledColor={SPACE_THEME.colors.border}
                  borderWidth={0}
                  borderRadius={4}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderRecommendations = () => {
    if (!analyticsData) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb" size={20} color={SPACE_THEME.colors.success} />
          <Text style={styles.sectionTitle}>Персональные рекомендации</Text>
        </View>
        
        <View style={styles.recommendationsContainer}>
          {analyticsData.recommendations.map((recommendation, index) => (
            <Animatable.View
              key={recommendation.id}
              animation="fadeInUp"
              duration={300}
              delay={index * 100}
              style={styles.recommendationCard}
            >
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{recommendation.confidence}%</Text>
                </View>
              </View>
              
              <Text style={styles.recommendationDescription}>
                {recommendation.description}
              </Text>
              
              <TouchableOpacity style={styles.recommendationButton}>
                <Text style={styles.recommendationButtonText}>Подробнее</Text>
                <Ionicons name="arrow-forward" size={16} color={SPACE_THEME.colors.highlight} />
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </View>
    );
  };

  const renderAchievements = () => {
    if (!analyticsData) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="medal" size={20} color={SPACE_THEME.colors.highlight} />
          <Text style={styles.sectionTitle}>Достижения</Text>
        </View>
        
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementItem}>
            <Ionicons name="trophy" size={32} color={SPACE_THEME.colors.warning} />
            <Text style={styles.achievementValue}>{analyticsData.achievementsUnlocked}</Text>
            <Text style={styles.achievementLabel}>Разблокировано</Text>
          </View>
          
          <View style={styles.achievementItem}>
            <Ionicons name="chatbubbles" size={32} color={SPACE_THEME.colors.info} />
            <Text style={styles.achievementValue}>{analyticsData.chatActivity}%</Text>
            <Text style={styles.achievementLabel}>Активность в чате</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={SPACE_THEME.colors.highlight}
        />
      }
    >
      {/* Статистика времени просмотра */}
      {renderWatchTimeStats()}

      {/* Любимые виды спорта */}
      {renderFavoriteSports()}

      {/* Предпочтительное время */}
      {renderPreferredTimes()}

      {/* Использование подписки */}
      {renderSubscriptionUsage()}

      {/* Достижения */}
      {renderAchievements()}

      {/* Рекомендации */}
      {renderRecommendations()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPACE_THEME.colors.background,
  },
  statsCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statsGradient: {
    padding: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginLeft: 12,
  },
  statsContent: {
    alignItems: 'center',
  },
  statsMainValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.highlight,
  },
  statsMainLabel: {
    fontSize: 16,
    color: SPACE_THEME.colors.textSecondary,
    marginBottom: 8,
  },
  statsSubValue: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginLeft: 8,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  sportCard: {
    width: (width - 48) / 2,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  sportIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  sportName: {
    fontSize: 14,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  sportRank: {
    backgroundColor: SPACE_THEME.colors.accent,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sportRankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  timesContainer: {
    paddingHorizontal: 16,
  },
  timeItem: {
    marginBottom: 12,
  },
  timeText: {
    fontSize: 14,
    color: SPACE_THEME.colors.text,
    marginBottom: 4,
  },
  usageContainer: {
    paddingHorizontal: 16,
  },
  usageItem: {
    marginBottom: 16,
  },
  usageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  usageLabel: {
    fontSize: 14,
    color: SPACE_THEME.colors.text,
    marginLeft: 8,
    flex: 1,
  },
  usageValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.warning,
  },
  achievementsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  achievementItem: {
    alignItems: 'center',
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    minWidth: 120,
  },
  achievementValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginTop: 8,
  },
  achievementLabel: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  recommendationsContainer: {
    paddingHorizontal: 16,
  },
  recommendationCard: {
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    padding: 16,
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    flex: 1,
  },
  confidenceBadge: {
    backgroundColor: SPACE_THEME.colors.success,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  recommendationDescription: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    marginBottom: 12,
  },
  recommendationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SPACE_THEME.colors.accent,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  recommendationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: SPACE_THEME.colors.highlight,
    marginRight: 8,
  },
});

export default AnalyticsScreen;
