import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { Stream, SportType } from '@/types';
import { SPACE_THEME, SPORTS } from '@/constants';
import { getSportColor, getSportIcon, getTimeUntilStream, getStreamStatus } from '@/utils';

const { width } = Dimensions.get('window');

const StreamsScreen: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [filteredStreams, setFilteredStreams] = useState<Stream[]>([]);
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Моковые данные трансляций
  useEffect(() => {
    const mockStreams: Stream[] = [
      {
        id: '1',
        title: 'Чемпионат мира по футболу - Финал',
        sport: 'football',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: 'upcoming',
        viewers: 0,
        thumbnail: 'https://via.placeholder.com/400x200/4CAF50/ffffff?text=Football+Final',
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
        startTime: new Date(Date.now() - 30 * 60 * 1000),
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
        startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
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
      {
        id: '4',
        title: 'Формула 1: Гран-при Монако',
        sport: 'formula1',
        startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        status: 'upcoming',
        viewers: 0,
        thumbnail: 'https://via.placeholder.com/400x200/FF5722/ffffff?text=F1+Monaco',
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
        id: '5',
        title: 'Теннис: Уимблдон - Финал',
        sport: 'tennis',
        startTime: new Date(Date.now() - 60 * 60 * 1000),
        status: 'live',
        viewers: 89000,
        thumbnail: 'https://via.placeholder.com/400x200/8BC34A/ffffff?text=Wimbledon+Final',
        streamUrl: '',
        vrEnabled: false,
        chatEnabled: true,
        analytics: {
          totalViewers: 89000,
          peakViewers: 120000,
          averageWatchTime: 60,
          engagement: 75,
          reactions: [
            { type: 'like', count: 890 },
            { type: 'love', count: 450 },
          ],
        },
      },
    ];

    setStreams(mockStreams);
    setFilteredStreams(mockStreams);
  }, []);

  // Фильтрация трансляций
  useEffect(() => {
    let filtered = streams;

    // Фильтр по виду спорта
    if (selectedSport !== 'all') {
      filtered = filtered.filter(stream => stream.sport === selectedSport);
    }

    // Фильтр по поисковому запросу
    if (searchQuery.trim()) {
      filtered = filtered.filter(stream =>
        stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        SPORTS[stream.sport].name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStreams(filtered);
  }, [streams, selectedSport, searchQuery]);

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

  const handleSportFilter = (sport: SportType | 'all') => {
    setSelectedSport(sport);
  };

  const renderSportFilter = () => {
    const sportsList: (SportType | 'all')[] = ['all', ...Object.keys(SPORTS) as SportType[]];

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sportFilter}
        contentContainerStyle={styles.sportFilterContent}
      >
        {sportsList.map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[
              styles.sportFilterItem,
              selectedSport === sport && styles.sportFilterItemActive,
              { borderColor: sport === 'all' ? SPACE_THEME.colors.border : getSportColor(sport as SportType) }
            ]}
            onPress={() => handleSportFilter(sport)}
            activeOpacity={0.7}
          >
            <Text style={styles.sportFilterIcon}>
              {sport === 'all' ? '🏆' : getSportIcon(sport as SportType)}
            </Text>
            <Text style={[
              styles.sportFilterText,
              selectedSport === sport && styles.sportFilterTextActive
            ]}>
              {sport === 'all' ? 'Все' : SPORTS[sport as SportType].name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderStreamCard = (stream: Stream) => {
    const sportColor = getSportColor(stream.sport);
    const sportIcon = getSportIcon(stream.sport);
    const status = getStreamStatus(stream);
    const timeUntil = getTimeUntilStream(stream.startTime);

    return (
      <TouchableOpacity
        key={stream.id}
        style={[styles.streamCard, { borderColor: sportColor }]}
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
    <View style={styles.container}>
      {/* Поиск */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={SPACE_THEME.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск трансляций..."
            placeholderTextColor={SPACE_THEME.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={SPACE_THEME.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Фильтр по видам спорта */}
      {renderSportFilter()}

      {/* Список трансляций */}
      <ScrollView
        style={styles.streamsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={SPACE_THEME.colors.highlight}
          />
        }
      >
        {filteredStreams.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="tv-outline" size={64} color={SPACE_THEME.colors.textSecondary} />
            <Text style={styles.emptyStateTitle}>Трансляции не найдены</Text>
            <Text style={styles.emptyStateSubtitle}>
              Попробуйте изменить фильтры или поисковый запрос
            </Text>
          </View>
        ) : (
          filteredStreams.map(stream => renderStreamCard(stream))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPACE_THEME.colors.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: SPACE_THEME.colors.text,
    marginLeft: 12,
  },
  sportFilter: {
    marginBottom: 16,
  },
  sportFilterContent: {
    paddingHorizontal: 16,
  },
  sportFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  sportFilterItemActive: {
    backgroundColor: SPACE_THEME.colors.accent,
  },
  sportFilterIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sportFilterText: {
    fontSize: 14,
    color: SPACE_THEME.colors.text,
    fontWeight: '500',
  },
  sportFilterTextActive: {
    color: SPACE_THEME.colors.text,
    fontWeight: 'bold',
  },
  streamsList: {
    flex: 1,
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default StreamsScreen;
