import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { ProgressBar } from 'react-native-progress';

import { User, Achievement, SubscriptionType } from '@/types';
import { SPACE_THEME, SUBSCRIPTIONS } from '@/constants';
import { calculateUserLevel, calculateLevelProgress, createDefaultAvatar } from '@/utils';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Моковые данные пользователя
  useEffect(() => {
    const mockUser: User = {
      id: '1',
      username: 'SpaceFan2024',
      email: 'user@example.com',
      avatar: createDefaultAvatar('SpaceFan2024'),
      level: 15,
      experience: 14500,
      achievements: [
        {
          id: '1',
          title: 'Первый просмотр',
          description: 'Посмотрел первую трансляцию',
          icon: '👁️',
          rarity: 'common',
          unlockedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          progress: 1,
          maxProgress: 1,
        },
        {
          id: '2',
          title: 'Ночной сова',
          description: 'Посмотрел 10 трансляций после полуночи',
          icon: '🦉',
          rarity: 'rare',
          unlockedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          progress: 10,
          maxProgress: 10,
        },
        {
          id: '3',
          title: 'Эксперт футбола',
          description: 'Посмотрел 100 футбольных матчей',
          icon: '⚽',
          rarity: 'epic',
          unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          progress: 100,
          maxProgress: 100,
        },
        {
          id: '4',
          title: 'Социальный бабочка',
          description: 'Отправил 1000 сообщений в чате',
          icon: '💬',
          rarity: 'rare',
          unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          progress: 1000,
          maxProgress: 1000,
        },
        {
          id: '5',
          title: 'VR пионер',
          description: 'Посмотрел 50 VR трансляций',
          icon: '🥽',
          rarity: 'epic',
          unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          progress: 50,
          maxProgress: 50,
        },
      ],
      subscription: 'premium',
      preferences: {
        favoriteSports: ['football', 'basketball', 'tennis', 'mma'],
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
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      lastActive: new Date(),
    };

    setUser(mockUser);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Здесь будет загрузка данных с сервера
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleEditProfile = () => {
    Alert.alert('Редактирование профиля', 'Функция в разработке');
  };

  const handleSubscriptionUpgrade = () => {
    Alert.alert('Обновление подписки', 'Функция в разработке');
  };

  const handleAchievementPress = (achievement: Achievement) => {
    Alert.alert(
      achievement.title,
      achievement.description,
      [{ text: 'OK' }]
    );
  };

  const handleSettings = () => {
    Alert.alert('Настройки', 'Функция в разработке');
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти из аккаунта?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Загрузка профиля...</Text>
      </View>
    );
  }

  const level = calculateUserLevel(user.experience);
  const progress = calculateLevelProgress(user.experience);
  const nextLevelExp = level * 1000;
  const currentLevelExp = (level - 1) * 1000;
  const expToNext = nextLevelExp - user.experience;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '#9E9E9E';
      case 'rare':
        return '#4CAF50';
      case 'epic':
        return '#9C27B0';
      case 'legendary':
        return '#FFD700';
      default:
        return SPACE_THEME.colors.textSecondary;
    }
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <LinearGradient
        colors={SPACE_THEME.gradients.nebula}
        style={styles.profileGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileContent}>
          {/* Аватар */}
          <TouchableOpacity style={styles.avatarContainer} onPress={handleEditProfile}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              defaultSource={require('@/assets/default-avatar.png')}
            />
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={SPACE_THEME.colors.text} />
            </View>
          </TouchableOpacity>

          {/* Информация о пользователе */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
            
            {/* Подписка */}
            <TouchableOpacity
              style={[
                styles.subscriptionBadge,
                { backgroundColor: SUBSCRIPTIONS[user.subscription].color }
              ]}
              onPress={handleSubscriptionUpgrade}
            >
              <Ionicons name="diamond" size={16} color={SPACE_THEME.colors.text} />
              <Text style={styles.subscriptionText}>
                {SUBSCRIPTIONS[user.subscription].name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Кнопка редактирования */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create" size={20} color={SPACE_THEME.colors.text} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const renderLevelProgress = () => (
    <View style={styles.levelSection}>
      <View style={styles.levelHeader}>
        <Text style={styles.levelTitle}>Уровень {level}</Text>
        <Text style={styles.levelSubtitle}>
          {expToNext.toLocaleString()} XP до {level + 1} уровня
        </Text>
      </View>
      
      <ProgressBar
        progress={progress / 100}
        width={null}
        height={12}
        color={SPACE_THEME.colors.highlight}
        unfilledColor={SPACE_THEME.colors.border}
        borderWidth={0}
        borderRadius={6}
      />
      
      <View style={styles.levelStats}>
        <View style={styles.levelStat}>
          <Text style={styles.levelStatValue}>{user.experience.toLocaleString()}</Text>
          <Text style={styles.levelStatLabel}>Всего XP</Text>
        </View>
        <View style={styles.levelStat}>
          <Text style={styles.levelStatValue}>{user.achievements.length}</Text>
          <Text style={styles.levelStatLabel}>Достижений</Text>
        </View>
        <View style={styles.levelStat}>
          <Text style={styles.levelStatValue}>
            {Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24))}
          </Text>
          <Text style={styles.levelStatLabel}>Дней в игре</Text>
        </View>
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="trophy" size={20} color={SPACE_THEME.colors.highlight} />
        <Text style={styles.sectionTitle}>Достижения</Text>
        <Text style={styles.sectionSubtitle}>
          {user.achievements.length} из 50
        </Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.achievementsContainer}>
          {user.achievements.map((achievement, index) => (
            <TouchableOpacity
              key={achievement.id}
              style={styles.achievementCard}
              onPress={() => handleAchievementPress(achievement)}
              activeOpacity={0.7}
            >
              <Animatable.View
                animation="bounceIn"
                duration={500}
                delay={index * 100}
                style={styles.achievementContent}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View
                  style={[
                    styles.achievementRarity,
                    { backgroundColor: getRarityColor(achievement.rarity) }
                  ]}
                />
                <Text style={styles.achievementTitle} numberOfLines={2}>
                  {achievement.title}
                </Text>
              </Animatable.View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderPreferences = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="settings" size={20} color={SPACE_THEME.colors.info} />
        <Text style={styles.sectionTitle}>Предпочтения</Text>
      </View>
      
      <View style={styles.preferencesContainer}>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Любимые виды спорта</Text>
          <Text style={styles.preferenceValue}>
            {user.preferences.favoriteSports.length} выбрано
          </Text>
        </View>
        
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>VR трансляции</Text>
          <Text style={[
            styles.preferenceValue,
            { color: user.preferences.vrEnabled ? SPACE_THEME.colors.success : SPACE_THEME.colors.textSecondary }
          ]}>
            {user.preferences.vrEnabled ? 'Включено' : 'Отключено'}
          </Text>
        </View>
        
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Язык</Text>
          <Text style={styles.preferenceValue}>
            {user.preferences.language === 'ru' ? 'Русский' : 'English'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderActions = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="flash" size={20} color={SPACE_THEME.colors.warning} />
        <Text style={styles.sectionTitle}>Действия</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
          <Ionicons name="settings" size={24} color={SPACE_THEME.colors.info} />
          <Text style={styles.actionText}>Настройки</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleSubscriptionUpgrade}>
          <Ionicons name="diamond" size={24} color={SPACE_THEME.colors.highlight} />
          <Text style={styles.actionText}>Подписка</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color={SPACE_THEME.colors.error} />
          <Text style={styles.actionText}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      {renderProfileHeader()}
      {renderLevelProgress()}
      {renderAchievements()}
      {renderPreferences()}
      {renderActions()}
    </ScrollView>
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
  profileHeader: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 20,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: SPACE_THEME.colors.text,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: SPACE_THEME.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: SPACE_THEME.colors.background,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: SPACE_THEME.colors.textSecondary,
    marginBottom: 12,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscriptionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginLeft: 8,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SPACE_THEME.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelSection: {
    margin: 16,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  levelHeader: {
    marginBottom: 12,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  levelSubtitle: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    marginTop: 4,
  },
  levelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  levelStat: {
    alignItems: 'center',
  },
  levelStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.highlight,
  },
  levelStatLabel: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
    marginTop: 4,
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
    flex: 1,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
  },
  achievementsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  achievementCard: {
    width: 100,
    marginRight: 12,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    overflow: 'hidden',
  },
  achievementContent: {
    padding: 12,
    alignItems: 'center',
    position: 'relative',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementRarity: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
    textAlign: 'center',
  },
  preferencesContainer: {
    paddingHorizontal: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  preferenceLabel: {
    fontSize: 16,
    color: SPACE_THEME.colors.text,
  },
  preferenceValue: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    minWidth: 80,
  },
  actionText: {
    fontSize: 12,
    color: SPACE_THEME.colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ProfileScreen;
