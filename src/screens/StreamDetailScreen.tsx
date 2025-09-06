import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { ProgressBar } from 'react-native-progress';

import { Stream, SportType } from '@/types';
import { SPACE_THEME, SPORTS } from '@/constants';
import { getSportColor, getSportIcon, getTimeUntilStream, getStreamStatus } from '@/utils';

const { width, height } = Dimensions.get('window');

const StreamDetailScreen: React.FC = () => {
  const [stream, setStream] = useState<Stream | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Моковые данные трансляции
  useEffect(() => {
    const mockStream: Stream = {
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
    };

    setStream(mockStream);
  }, []);

  const handlePlayPause = () => {
    if (stream?.status === 'live') {
      setIsPlaying(!isPlaying);
    } else {
      Alert.alert('Трансляция', 'Трансляция еще не началась');
    }
  };

  const handleVRToggle = () => {
    if (stream?.vrEnabled) {
      setIsVRMode(!isVRMode);
    } else {
      Alert.alert('VR недоступно', 'VR режим не поддерживается для этой трансляции');
    }
  };

  const handleChatToggle = () => {
    if (stream?.chatEnabled) {
      setIsChatOpen(!isChatOpen);
    } else {
      Alert.alert('Чат недоступен', 'Чат отключен для этой трансляции');
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleShare = () => {
    Alert.alert('Поделиться', 'Функция в разработке');
  };

  const handleFavorite = () => {
    Alert.alert('Избранное', 'Функция в разработке');
  };

  if (!stream) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Загрузка трансляции...</Text>
      </View>
    );
  }

  const sportColor = getSportColor(stream.sport);
  const sportIcon = getSportIcon(stream.sport);
  const status = getStreamStatus(stream);
  const timeUntil = getTimeUntilStream(stream.startTime);

  const renderVideoPlayer = () => (
    <View style={styles.videoContainer}>
      <LinearGradient
        colors={[sportColor, SPACE_THEME.colors.primary]}
        style={styles.videoGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Видео плеер */}
        <View style={styles.videoPlayer}>
          <Text style={styles.sportIcon}>{sportIcon}</Text>
          
          {/* Статус трансляции */}
          <View style={[
            styles.statusBadge,
            { backgroundColor: status === 'live' ? SPACE_THEME.colors.error : SPACE_THEME.colors.info }
          ]}>
            <Text style={styles.statusText}>
              {status === 'live' ? 'LIVE' : status === 'upcoming' ? 'СКОРО' : 'ЗАВЕРШЕНО'}
            </Text>
          </View>

          {/* Зрители */}
          {stream.viewers > 0 && (
            <View style={styles.viewersBadge}>
              <Ionicons name="eye" size={16} color={SPACE_THEME.colors.text} />
              <Text style={styles.viewersText}>
                {stream.viewers.toLocaleString()}
              </Text>
            </View>
          )}

          {/* Кнопки управления */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handlePlayPause}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={32}
                color={SPACE_THEME.colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* Кнопки функций */}
          <View style={styles.functionButtons}>
            <TouchableOpacity
              style={[
                styles.functionButton,
                isVRMode && styles.functionButtonActive
              ]}
              onPress={handleVRToggle}
            >
              <Ionicons name="glasses" size={20} color={SPACE_THEME.colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.functionButton,
                isChatOpen && styles.functionButtonActive
              ]}
              onPress={handleChatToggle}
            >
              <Ionicons name="chatbubbles" size={20} color={SPACE_THEME.colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.functionButton}
              onPress={handleFullscreen}
            >
              <Ionicons name="expand" size={20} color={SPACE_THEME.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderStreamInfo = () => (
    <View style={styles.streamInfo}>
      <Text style={styles.streamTitle}>{stream.title}</Text>
      
      <View style={styles.streamMeta}>
        <View style={styles.sportInfo}>
          <Text style={styles.sportIcon}>{sportIcon}</Text>
          <Text style={styles.sportName}>{SPORTS[stream.sport].name}</Text>
        </View>
        
        {status === 'upcoming' && (
          <Text style={styles.timeText}>
            Начало через {timeUntil}
          </Text>
        )}
        
        {status === 'live' && (
          <Text style={styles.liveText}>
            🔴 В эфире
          </Text>
        )}
      </View>

      {/* Действия */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share" size={20} color={SPACE_THEME.colors.text} />
          <Text style={styles.actionText}>Поделиться</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleFavorite}>
          <Ionicons name="heart" size={20} color={SPACE_THEME.colors.text} />
          <Text style={styles.actionText}>В избранное</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.analyticsSection}>
      <View style={styles.sectionHeader}>
        <Ionicons name="analytics" size={20} color={SPACE_THEME.colors.highlight} />
        <Text style={styles.sectionTitle}>Аналитика</Text>
      </View>
      
      <View style={styles.analyticsGrid}>
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsValue}>
            {stream.analytics.totalViewers.toLocaleString()}
          </Text>
          <Text style={styles.analyticsLabel}>Всего зрителей</Text>
        </View>
        
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsValue}>
            {stream.analytics.peakViewers.toLocaleString()}
          </Text>
          <Text style={styles.analyticsLabel}>Пик зрителей</Text>
        </View>
        
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsValue}>
            {stream.analytics.averageWatchTime}м
          </Text>
          <Text style={styles.analyticsLabel}>Среднее время</Text>
        </View>
        
        <View style={styles.analyticsItem}>
          <Text style={styles.analyticsValue}>
            {stream.analytics.engagement}%
          </Text>
          <Text style={styles.analyticsLabel}>Вовлеченность</Text>
        </View>
      </View>
    </View>
  );

  const renderReactions = () => (
    <View style={styles.reactionsSection}>
      <View style={styles.sectionHeader}>
        <Ionicons name="heart" size={20} color={SPACE_THEME.colors.error} />
        <Text style={styles.sectionTitle}>Реакции</Text>
      </View>
      
      <View style={styles.reactionsContainer}>
        {stream.analytics.reactions.map((reaction, index) => (
          <TouchableOpacity key={index} style={styles.reactionButton}>
            <Text style={styles.reactionEmoji}>
              {reaction.type === 'like' ? '👍' : 
               reaction.type === 'love' ? '❤️' : 
               reaction.type === 'wow' ? '😮' : 
               reaction.type === 'angry' ? '😠' : '😢'}
            </Text>
            <Text style={styles.reactionCount}>{reaction.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderVideoPlayer()}
        {renderStreamInfo()}
        {renderAnalytics()}
        {renderReactions()}
      </ScrollView>
      
      {/* Чат (если открыт) */}
      {isChatOpen && (
        <Animatable.View
          animation="slideInUp"
          duration={300}
          style={styles.chatContainer}
        >
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Чат трансляции</Text>
            <TouchableOpacity onPress={handleChatToggle}>
              <Ionicons name="close" size={24} color={SPACE_THEME.colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.chatContent}>
            <Text style={styles.chatPlaceholder}>
              Чат будет доступен во время трансляции
            </Text>
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPACE_THEME.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SPACE_THEME.colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: SPACE_THEME.colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    height: height * 0.3,
  },
  videoGradient: {
    flex: 1,
  },
  videoPlayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  sportIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  viewersBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewersText: {
    fontSize: 14,
    color: SPACE_THEME.colors.text,
    marginLeft: 6,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
  },
  functionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  functionButtonActive: {
    backgroundColor: SPACE_THEME.colors.highlight,
  },
  streamInfo: {
    padding: 16,
    backgroundColor: SPACE_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  streamTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginBottom: 12,
  },
  streamMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sportName: {
    fontSize: 16,
    color: SPACE_THEME.colors.textSecondary,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: SPACE_THEME.colors.info,
    fontWeight: '600',
  },
  liveText: {
    fontSize: 14,
    color: SPACE_THEME.colors.error,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: SPACE_THEME.colors.accent,
    borderRadius: 20,
  },
  actionText: {
    fontSize: 14,
    color: SPACE_THEME.colors.text,
    marginLeft: 8,
    fontWeight: '500',
  },
  analyticsSection: {
    padding: 16,
    backgroundColor: SPACE_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginLeft: 8,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsItem: {
    width: (width - 48) / 2,
    alignItems: 'center',
    marginBottom: 16,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.highlight,
  },
  analyticsLabel: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  reactionsSection: {
    padding: 16,
    backgroundColor: SPACE_THEME.colors.surface,
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reactionButton: {
    alignItems: 'center',
    padding: 12,
  },
  reactionEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  reactionCount: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
  },
  chatContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: SPACE_THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: SPACE_THEME.colors.border,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatPlaceholder: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
  },
});

export default StreamDetailScreen;
