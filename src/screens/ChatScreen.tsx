import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { ChatRoom, ChatMessage } from '@/types';
import { SPACE_THEME } from '@/constants';
import { formatTime, createDefaultAvatar } from '@/utils';

const ChatScreen: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Моковые данные чатов
  useEffect(() => {
    const mockChatRooms: ChatRoom[] = [
      {
        id: '1',
        name: 'Футбольные фанаты',
        type: 'group',
        participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
        unreadCount: 5,
        isMuted: false,
        lastMessage: {
          id: '1',
          userId: 'user2',
          username: 'FootballFan',
          avatar: createDefaultAvatar('FootballFan'),
          content: 'Отличный гол! 🔥',
          type: 'text',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          reactions: [],
          isPinned: false,
        },
      },
      {
        id: '2',
        name: 'Баскетбольная лига',
        type: 'group',
        participants: ['user1', 'user6', 'user7', 'user8'],
        unreadCount: 0,
        isMuted: true,
        lastMessage: {
          id: '2',
          userId: 'user6',
          username: 'BasketballPro',
          avatar: createDefaultAvatar('BasketballPro'),
          content: 'Лейкерс играют сегодня в 22:00',
          type: 'text',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          reactions: [],
          isPinned: false,
        },
      },
      {
        id: '3',
        name: 'Алексей Петров',
        type: 'private',
        participants: ['user1', 'user9'],
        unreadCount: 2,
        isMuted: false,
        lastMessage: {
          id: '3',
          userId: 'user9',
          username: 'Алексей Петров',
          avatar: createDefaultAvatar('Алексей Петров'),
          content: 'Привет! Смотришь матч?',
          type: 'text',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          reactions: [],
          isPinned: false,
        },
      },
      {
        id: '4',
        name: 'UFC Бойцы',
        type: 'group',
        participants: ['user1', 'user10', 'user11', 'user12', 'user13', 'user14'],
        unreadCount: 12,
        isMuted: false,
        lastMessage: {
          id: '4',
          userId: 'user10',
          username: 'FightNight',
          avatar: createDefaultAvatar('FightNight'),
          content: 'Джонс vs Миочич - кто победит?',
          type: 'text',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          reactions: [],
          isPinned: false,
        },
      },
      {
        id: '5',
        name: 'Трансляция: Лейкерс vs Уорриорз',
        type: 'stream',
        participants: ['user1', 'user15', 'user16', 'user17'],
        unreadCount: 0,
        isMuted: false,
        streamId: 'stream_2',
        lastMessage: {
          id: '5',
          userId: 'user15',
          username: 'LakersFan',
          avatar: createDefaultAvatar('LakersFan'),
          content: 'Отличная игра! 🏀',
          type: 'text',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          reactions: [],
          isPinned: false,
        },
      },
    ];

    setChatRooms(mockChatRooms);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Здесь будет загрузка данных с сервера
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleChatPress = (chatRoom: ChatRoom) => {
    // Навигация к чату
    console.log('Chat pressed:', chatRoom.name);
  };

  const handleNewChat = () => {
    // Создание нового чата
    console.log('New chat pressed');
  };

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatRoom = (chatRoom: ChatRoom) => {
    const isGroup = chatRoom.type === 'group';
    const isStream = chatRoom.type === 'stream';
    const avatarUri = isGroup || isStream 
      ? createDefaultAvatar(chatRoom.name)
      : chatRoom.lastMessage?.avatar || createDefaultAvatar(chatRoom.name);

    return (
      <TouchableOpacity
        key={chatRoom.id}
        style={styles.chatRoomItem}
        onPress={() => handleChatPress(chatRoom)}
        activeOpacity={0.7}
      >
        <Animatable.View
          animation="fadeInUp"
          duration={300}
          style={styles.chatRoomContent}
        >
          {/* Аватар */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {isGroup ? '👥' : isStream ? '📺' : '👤'}
              </Text>
            </View>
            
            {/* Индикатор онлайн */}
            <View style={styles.onlineIndicator} />
          </View>

          {/* Информация о чате */}
          <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName} numberOfLines={1}>
                {chatRoom.name}
              </Text>
              
              {chatRoom.lastMessage && (
                <Text style={styles.lastMessageTime}>
                  {formatTime(chatRoom.lastMessage.timestamp)}
                </Text>
              )}
            </View>

            <View style={styles.chatFooter}>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {chatRoom.lastMessage?.content || 'Нет сообщений'}
              </Text>
              
              <View style={styles.chatMeta}>
                {chatRoom.isMuted && (
                  <Ionicons 
                    name="volume-mute" 
                    size={16} 
                    color={SPACE_THEME.colors.textSecondary} 
                  />
                )}
                
                {chatRoom.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>
                      {chatRoom.unreadCount > 99 ? '99+' : chatRoom.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
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
            placeholder="Поиск чатов..."
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

      {/* Кнопка нового чата */}
      <View style={styles.newChatContainer}>
        <TouchableOpacity
          style={styles.newChatButton}
          onPress={handleNewChat}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={SPACE_THEME.colors.text} />
          <Text style={styles.newChatText}>Новый чат</Text>
        </TouchableOpacity>
      </View>

      {/* Список чатов */}
      <ScrollView
        style={styles.chatList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={SPACE_THEME.colors.highlight}
          />
        }
      >
        {filteredChatRooms.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={SPACE_THEME.colors.textSecondary} />
            <Text style={styles.emptyStateTitle}>Чаты не найдены</Text>
            <Text style={styles.emptyStateSubtitle}>
              Попробуйте изменить поисковый запрос или создайте новый чат
            </Text>
          </View>
        ) : (
          filteredChatRooms.map(chatRoom => renderChatRoom(chatRoom))
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
  newChatContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SPACE_THEME.colors.highlight,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  newChatText: {
    fontSize: 16,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
    marginLeft: 8,
  },
  chatList: {
    flex: 1,
  },
  chatRoomItem: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  chatRoomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: SPACE_THEME.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: SPACE_THEME.colors.success,
    borderWidth: 2,
    borderColor: SPACE_THEME.colors.surface,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
    flex: 1,
  },
  lastMessageTime: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    flex: 1,
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: SPACE_THEME.colors.highlight,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
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

export default ChatScreen;
