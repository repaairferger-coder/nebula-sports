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

import { Stream, SportType } from '@/types';
import { SPACE_THEME, SPORTS } from '@/constants';
import { getSportColor, getSportIcon, getTimeUntilStream, getStreamStatus } from '@/utils';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [featuredStreams, setFeaturedStreams] = useState<Stream[]>([]);
  const [liveStreams, setLiveStreams] = useState<Stream[]>([]);
  const [upcomingStreams, setUpcomingStreams] = useState<Stream[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Моковые данные трансляций
  useEffect(() => {
    const mockStreams: Stream[] = [
      {
        id: '1',
        title: 'Чемпионат мира по футболу - Финал',
        sport: 'football',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Через 2 часа
        status: 'upcoming',
        viewers: 0,
        thumbnail: 'https://via.placeholder.com/400x200/1a1a2e/ffffff?text=Football+Final',
        streamUrl: '',
        vrEnabled: true,
        chatEnabled: true,
        analytics: {
          totalViewers: 0,
          peakViewers: 0,
          averageWatchTime: 0,
          engagement: 0,
          reactions: [],
        },
      },
      {
        id: '2',
        title: 'NBA: Лейкерс vs Уорриорз',
        sport: 'basketball',
        startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 минут назад
        status: 'live',
        viewers: 125000,
        thumbnail: 'https://via.placeholder.com/400x200/FF9800/ffffff?text=Lakers+vs+Warriors',
        streamUrl: '',
        vrEnabled: true,
        chatEnabled: true,
        analytics: {
          totalViewers: 125000,
          peakViewers: 150000,
          averageWatchTime: 45,
          engagement: 85,
          reactions: [
            { type: 'like', count: 1250 },
            { type: 'love', count: 890 },
            { type: 'wow', count: 340 },
          ],
        },
      },
      {
        id: '3',
        title: 'UFC: Джонс vs Миочич',
        sport: 'mma',
        startTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // Через 4 часа
        status: 'upcoming',
        viewers: 0,
        thumbnail: 'https://via.placeholder.com/400x200/F44336/ffffff?text=UFC+Main+Event',
        streamUrl: '',
        vrEnabled: false,
        chatEnabled: true,
        analytics: {
          totalViewers: 0,
          peakViewers: 0,
          averageWatchTime: 0,
          engagement: 0,
          reactions: [],
        },
      },
    ];

    setFeaturedStreams(mockStreams.slice(0, 1));
    setLiveStreams(mockStreams.filter(s => s.status === 'live'));
    setUpcomingStreams(mockStreams.filter(s => s.status === 'upcoming'));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Здесь будет загрузка данных с сервера
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleStreamPress = (stream: Stream) => {
    // Навигация к детальной странице трансляции
    console.log('Stream pressed:', stream.title);
  };

  const renderStreamCard = (stream: Stream, isFeatured: boolean = false) => {
    const sportColor = getSportColor(stream.sport);
    const sportIcon = getSportIcon(stream.sport);
    const status = getStreamStatus(stream);
    const timeUntil = getTimeUntilStream(stream.startTime);

    return (
      <TouchableOpacity
        key={stream.id}
        style={[
          styles.streamCard,
          isFeatured && styles.featuredCard,
          { borderColor: sportColor }
        ]}
        onPress={() => handleStreamPress(stream)}
        activeOpacity={0.8}
      >
        <Animatable.View
          animation="fadeInUp"
          duration={500}
          style={styles.cardContent}
        >
          {/* Миниатюра */}
          <View style={styles.thumbnailContainer}>
            <View style={[styles.thumbnail, { backgroundColor: sportColor }]}>
              <Text style={styles.sportIcon}>{sportIcon}</Text>
            </View>
            
            {/* Статус трансляции */}
            <View style={[
              styles.statusBadge,
              { backgroundColor: status === 'live' ? SPACE_THEME.colors.error : SPACE_THEME.colors.info }
            ]}>
              <Text style={styles.statusText}>
                {status === 'live' ? 'LIVE' : status === 'upcoming' ? 'СКОРО' : 'ЗАВЕРШЕНО'}
              </Text>
            </View>

            {/* VR индикатор */}
            {stream.vrEnabled && (
              <View style={styles.vrBadge}>
                <Ionicons name="glasses" size={12} color={SPACE_THEME.colors.text} />
              </View>
            )}

            {/* Зрители */}
            {stream.viewers > 0 && (
              <View style={styles.viewersBadge}>
                <Ionicons name="eye" size={12} color={SPACE_THEME.colors.text} />
                <Text style={styles.viewersText}>
                  {stream.viewers.toLocaleString()}
                </Text>
              </View>
            )}
          </View>

          {/* Информация о трансляции */}
          <View style={styles.streamInfo}>
            <Text style={styles.streamTitle} numberOfLines={2}>
              {stream.title}
            </Text>
            
            <View style={styles.streamMeta}>
              <Text style={styles.sportName}>
                {SPORTS[stream.sport].name}
              </Text>
              
              {status === 'upcoming' && (
                <Text style={styles.timeText}>
                  {timeUntil}
                </Text>
              )}
              
              {status === 'live' && (
                <Text style={styles.liveText}>
                  🔴 В эфире
                </Text>
              )}
            </View>

            {/* Индикаторы */}
            <View style={styles.indicators}>
              {stream.chatEnabled && (
                <View style={styles.indicator}>
                  <Ionicons name="chatbubbles" size={14} color={SPACE_THEME.colors.textSecondary} />
                </View>
              )}
              
              {stream.vrEnabled && (
                <View style={styles.indicator}>
                  <Ionicons name="glasses" size={14} color={SPACE_THEME.colors.textSecondary} />
                </View>
              )}
            </View>
          </View>
        </Animatable.View>
      </TouchableOpacity>
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
      {/* Приветствие */}
      <View style={styles.welcomeSection}>
        <LinearGradient
          colors={SPACE_THEME.gradients.nebula}
          style={styles.welcomeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.welcomeTitle}>
            Добро пожаловать в Nebula! 🚀
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Откройте для себя мир спорта в новом измерении
          </Text>
        </LinearGradient>
      </View>

      {/* Рекомендуемые трансляции */}
      {featuredStreams.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={20} color={SPACE_THEME.colors.highlight} />
            <Text style={styles.sectionTitle}>Рекомендуем</Text>
          </View>
          {featuredStreams.map(stream => renderStreamCard(stream, true))}
        </View>
      )}

      {/* Прямые трансляции */}
      {liveStreams.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="radio" size={20} color={SPACE_THEME.colors.error} />
            <Text style={styles.sectionTitle}>В эфире</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {liveStreams.map(stream => (
              <View key={stream.id} style={styles.horizontalCard}>
                {renderStreamCard(stream)}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Предстоящие трансляции */}
      {upcomingStreams.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time" size={20} color={SPACE_THEME.colors.info} />
            <Text style={styles.sectionTitle}>Скоро</Text>
          </View>
          {upcomingStreams.map(stream => renderStreamCard(stream))}
        </View>
      )}

      {/* Быстрые действия */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="flash" size={20} color={SPACE_THEME.colors.warning} />
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
        </View>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="search" size={24} color={SPACE_THEME.colors.highlight} />
            <Text style={styles.quickActionText}>Поиск</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="calendar" size={24} color={SPACE_THEME.colors.info} />
            <Text style={styles.quickActionText}>Расписание</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="trophy" size={24} color={SPACE_THEME.colors.warning} />
            <Text style={styles.quickActionText}>Достижения</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="people" size={24} color={SPACE_THEME.colors.success} />
            <Text style={styles.quickActionText}>Сообщества</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPACE_THEME.colors.background,
  },
  welcomeSection: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  welcomeGradient: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: SPACE_THEME.colors.textSecondary,
    textAlign: 'center',
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
  streamCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    overflow: 'hidden',
  },
  featuredCard: {
    borderWidth: 2,
    shadowColor: SPACE_THEME.colors.highlight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  horizontalCard: {
    width: width * 0.7,
    marginRight: 12,
  },
  cardContent: {
    padding: 16,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportIcon: {
    fontSize: 48,
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  vrBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: SPACE_THEME.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewersBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewersText: {
    fontSize: 10,
    color: SPACE_THEME.colors.text,
    marginLeft: 4,
  },
  streamInfo: {
    flex: 1,
  },
  streamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginBottom: 8,
  },
  streamMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sportName: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: SPACE_THEME.colors.info,
    fontWeight: '600',
  },
  liveText: {
    fontSize: 12,
    color: SPACE_THEME.colors.error,
    fontWeight: '600',
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    marginRight: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    minWidth: 80,
  },
  quickActionText: {
    fontSize: 12,
    color: SPACE_THEME.colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
