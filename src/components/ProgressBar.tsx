import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { ProgressBar } from 'react-native-progress';

import { User, Achievement } from '@/types';
import { SPACE_THEME } from '@/constants';
import { calculateUserLevel, calculateLevelProgress } from '@/utils';

const { width } = Dimensions.get('window');

interface ProgressBarProps {
  user?: User;
  onAchievementPress?: (achievement: Achievement) => void;
  onLevelPress?: () => void;
}

const UserProgressBar: React.FC<ProgressBarProps> = ({ 
  user, 
  onAchievementPress, 
  onLevelPress 
}) => {
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);
  const [showAchievements, setShowAchievements] = useState(false);

  // Моковые данные пользователя
  const mockUser: User = {
    id: '1',
    username: 'SpaceFan2024',
    email: 'user@example.com',
    level: 15,
    experience: 14500,
    achievements: [
      {
        id: '1',
        title: 'Первый просмотр',
        description: 'Посмотрел первую трансляцию',
        icon: '👁️',
        rarity: 'common',
        unlockedAt: new Date(),
        progress: 1,
        maxProgress: 1,
      },
      {
        id: '2',
        title: 'Ночной сова',
        description: 'Посмотрел 10 трансляций после полуночи',
        icon: '🦉',
        rarity: 'rare',
        unlockedAt: new Date(),
        progress: 10,
        maxProgress: 10,
      },
      {
        id: '3',
        title: 'Эксперт футбола',
        description: 'Посмотрел 100 футбольных матчей',
        icon: '⚽',
        rarity: 'epic',
        unlockedAt: new Date(),
        progress: 100,
        maxProgress: 100,
      },
    ],
    subscription: 'premium',
    preferences: {
      favoriteSports: ['football', 'basketball', 'tennis'],
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

  const currentUser = user || mockUser;
  const level = calculateUserLevel(currentUser.experience);
  const progress = calculateLevelProgress(currentUser.experience);
  const nextLevelExp = level * 1000;
  const currentLevelExp = (level - 1) * 1000;
  const expToNext = nextLevelExp - currentUser.experience;

  useEffect(() => {
    // Получаем последние разблокированные достижения
    const recent = currentUser.achievements
      .filter(ach => ach.unlockedAt)
      .sort((a, b) => b.unlockedAt!.getTime() - a.unlockedAt!.getTime())
      .slice(0, 3);
    setRecentAchievements(recent);
  }, [currentUser.achievements]);

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

  const handleAchievementPress = (achievement: Achievement) => {
    if (onAchievementPress) {
      onAchievementPress(achievement);
    }
  };

  const handleLevelPress = () => {
    if (onLevelPress) {
      onLevelPress();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={SPACE_THEME.gradients.primary}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.content}>
          {/* Уровень пользователя */}
          <TouchableOpacity
            style={styles.levelContainer}
            onPress={handleLevelPress}
            activeOpacity={0.7}
          >
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{level}</Text>
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.usernameText}>{currentUser.username}</Text>
              <Text style={styles.expText}>
                {currentUser.experience.toLocaleString()} XP
              </Text>
            </View>
          </TouchableOpacity>

          {/* Прогресс-бар */}
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progress / 100}
              width={width * 0.4}
              height={8}
              color={SPACE_THEME.colors.highlight}
              unfilledColor={SPACE_THEME.colors.border}
              borderWidth={0}
              borderRadius={4}
            />
            <Text style={styles.progressText}>
              {expToNext.toLocaleString()} до {level + 1} уровня
            </Text>
          </View>

          {/* Достижения */}
          <TouchableOpacity
            style={styles.achievementsContainer}
            onPress={() => setShowAchievements(!showAchievements)}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="trophy" 
              size={20} 
              color={SPACE_THEME.colors.highlight} 
            />
            {recentAchievements.length > 0 && (
              <View style={styles.achievementBadge}>
                <Text style={styles.achievementBadgeText}>
                  {recentAchievements.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Всплывающие достижения */}
        {showAchievements && recentAchievements.length > 0 && (
          <Animatable.View
            animation="slideInDown"
            duration={300}
            style={styles.achievementsPopup}
          >
            {recentAchievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={styles.achievementItem}
                onPress={() => handleAchievementPress(achievement)}
                activeOpacity={0.7}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
                <View
                  style={[
                    styles.achievementRarity,
                    { backgroundColor: getRarityColor(achievement.rarity) }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </Animatable.View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: SPACE_THEME.colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SPACE_THEME.colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  levelInfo: {
    flex: 1,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
  },
  expText: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
  },
  progressContainer: {
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  progressText: {
    fontSize: 10,
    color: SPACE_THEME.colors.textSecondary,
    marginTop: 4,
  },
  achievementsContainer: {
    position: 'relative',
    padding: 8,
  },
  achievementBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: SPACE_THEME.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  achievementsPopup: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: SPACE_THEME.colors.surface,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    borderRadius: 8,
    marginTop: 8,
    padding: 12,
    zIndex: 1000,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
  },
  achievementDescription: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
    marginTop: 2,
  },
  achievementRarity: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default UserProgressBar;
