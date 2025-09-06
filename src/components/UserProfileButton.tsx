import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { User } from '@/types';
import { SPACE_THEME } from '@/constants';
import { createDefaultAvatar } from '@/utils';

interface UserProfileButtonProps {
  user?: User;
  onPress?: () => void;
  onLogout?: () => void;
  onSettings?: () => void;
  onAdminAccess?: () => void;
}

const UserProfileButton: React.FC<UserProfileButtonProps> = ({
  user,
  onPress,
  onLogout,
  onSettings,
  onAdminAccess,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  // Моковые данные пользователя
  const mockUser: User = {
    id: '1',
    username: 'SpaceFan2024',
    email: 'user@example.com',
    avatar: createDefaultAvatar('SpaceFan2024'),
    level: 15,
    experience: 14500,
    achievements: [],
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
  const avatarUri = currentUser.avatar || createDefaultAvatar(currentUser.username);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setShowMenu(!showMenu);
    }
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    
    switch (action) {
      case 'profile':
        // Навигация к профилю
        break;
      case 'settings':
        if (onSettings) onSettings();
        break;
      case 'admin':
        if (onAdminAccess) onAdminAccess();
        break;
      case 'logout':
        Alert.alert(
          'Выход',
          'Вы уверены, что хотите выйти из аккаунта?',
          [
            { text: 'Отмена', style: 'cancel' },
            { 
              text: 'Выйти', 
              style: 'destructive',
              onPress: () => onLogout && onLogout()
            },
          ]
        );
        break;
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'premium':
        return SPACE_THEME.colors.highlight;
      case 'pro':
        return SPACE_THEME.colors.warning;
      case 'enterprise':
        return SPACE_THEME.colors.error;
      default:
        return SPACE_THEME.colors.textSecondary;
    }
  };

  const getSubscriptionIcon = (subscription: string) => {
    switch (subscription) {
      case 'premium':
        return 'diamond';
      case 'pro':
        return 'star';
      case 'enterprise':
        return 'business';
      default:
        return 'person';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {/* Аватар */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatar}
            defaultSource={require('@/assets/default-avatar.png')}
          />
          
          {/* Индикатор подписки */}
          <View
            style={[
              styles.subscriptionIndicator,
              { backgroundColor: getSubscriptionColor(currentUser.subscription) }
            ]}
          >
            <Ionicons
              name={getSubscriptionIcon(currentUser.subscription) as any}
              size={8}
              color={SPACE_THEME.colors.text}
            />
          </View>

          {/* Индикатор онлайн статуса */}
          <View style={styles.onlineIndicator} />
        </View>

        {/* Имя пользователя (только на больших экранах) */}
        <View style={styles.userInfo}>
          <Text style={styles.usernameText} numberOfLines={1}>
            {currentUser.username}
          </Text>
          <Text style={styles.subscriptionText}>
            {currentUser.subscription.toUpperCase()}
          </Text>
        </View>

        {/* Стрелка меню */}
        <Ionicons
          name={showMenu ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={SPACE_THEME.colors.textSecondary}
        />
      </TouchableOpacity>

      {/* Выпадающее меню */}
      {showMenu && (
        <Animatable.View
          animation="fadeInDown"
          duration={200}
          style={styles.menu}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuAction('profile')}
          >
            <Ionicons name="person" size={20} color={SPACE_THEME.colors.text} />
            <Text style={styles.menuItemText}>Профиль</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuAction('settings')}
          >
            <Ionicons name="settings" size={20} color={SPACE_THEME.colors.text} />
            <Text style={styles.menuItemText}>Настройки</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuAction('admin')}
          >
            <Ionicons name="shield" size={20} color={SPACE_THEME.colors.warning} />
            <Text style={[styles.menuItemText, { color: SPACE_THEME.colors.warning }]}>
              Админ-панель
            </Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuAction('logout')}
          >
            <Ionicons name="log-out" size={20} color={SPACE_THEME.colors.error} />
            <Text style={[styles.menuItemText, { color: SPACE_THEME.colors.error }]}>
              Выйти
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: SPACE_THEME.colors.surface,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: SPACE_THEME.colors.border,
  },
  subscriptionIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: SPACE_THEME.colors.surface,
  },
  onlineIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SPACE_THEME.colors.success,
    borderWidth: 2,
    borderColor: SPACE_THEME.colors.surface,
  },
  userInfo: {
    marginRight: 8,
    maxWidth: 100,
  },
  usernameText: {
    fontSize: 14,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
  },
  subscriptionText: {
    fontSize: 10,
    color: SPACE_THEME.colors.textSecondary,
    fontWeight: '500',
  },
  menu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    marginTop: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: SPACE_THEME.colors.text,
    marginLeft: 12,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: SPACE_THEME.colors.border,
    marginHorizontal: 16,
  },
});

export default UserProfileButton;
