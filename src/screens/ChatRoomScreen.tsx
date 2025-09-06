import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { ChatRoom, ChatMessage } from '@/types';
import { SPACE_THEME } from '@/constants';
import { formatTime, createDefaultAvatar } from '@/utils';

const ChatRoomScreen: React.FC = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Моковые данные чата
  useEffect(() => {
    const mockChatRoom: ChatRoom = {
      id: '1',
      name: 'Футбольные фанаты',
      type: 'group',
      participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
      unreadCount: 0,
      isMuted: false,
    };

    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        userId: 'user2',
        username: 'FootballFan',
        avatar: createDefaultAvatar('FootballFan'),
        content: 'Привет всем! Готовы к матчу?',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        reactions: [
          { userId: 'user1', type: 'like' },
          { userId: 'user3', type: 'love' },
        ],
        isPinned: false,
      },
      {
        id: '2',
        userId: 'user3',
        username: 'SoccerPro',
        avatar: createDefaultAvatar('SoccerPro'),
        content: 'Да! Очень жду начала трансляции 🔥',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
        reactions: [],
        isPinned: false,
      },
      {
        id: '3',
        userId: 'user4',
        username: 'GoalKeeper',
        avatar: createDefaultAvatar('GoalKeeper'),
        content: 'Кто думает, что Барселона выиграет?',
        type: 'text',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        reactions: [
          { userId: 'user2', type: 'like' },
          { userId: 'user5', type: 'wow' },
        ],
        isPinned: false,
      },
      {
        id: '4',
        userId: 'user5',
        username: 'RealMadridFan',
        avatar: createDefaultAvatar('RealMadridFan'),
        content: 'Реал Мадрид точно победит! 💪',
        type: 'text',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000 + 2 * 60 * 1000),
        reactions: [
          { userId: 'user1', type: 'angry' },
          { userId: 'user3', type: 'sad' },
        ],
        isPinned: false,
      },
      {
        id: '5',
        userId: 'user2',
        username: 'FootballFan',
        avatar: createDefaultAvatar('FootballFan'),
        content: 'Трансляция начинается через 10 минут!',
        type: 'text',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        reactions: [
          { userId: 'user1', type: 'like' },
          { userId: 'user3', type: 'like' },
          { userId: 'user4', type: 'love' },
          { userId: 'user5', type: 'wow' },
        ],
        isPinned: true,
      },
    ];

    setChatRoom(mockChatRoom);
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: 'current_user',
        username: 'Вы',
        avatar: createDefaultAvatar('Вы'),
        content: newMessage.trim(),
        type: 'text',
        timestamp: new Date(),
        reactions: [],
        isPinned: false,
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Прокрутка к последнему сообщению
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleReaction = (messageId: string, reactionType: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.userId === 'current_user');
        if (existingReaction) {
          // Удаляем существующую реакцию
          return {
            ...msg,
            reactions: msg.reactions.filter(r => r.userId !== 'current_user')
          };
        } else {
          // Добавляем новую реакцию
          return {
            ...msg,
            reactions: [...msg.reactions, { userId: 'current_user', type: reactionType as any }]
          };
        }
      }
      return msg;
    }));
  };

  const handlePinMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, isPinned: !msg.isPinned };
      }
      return msg;
    }));
  };

  const handleReply = (message: ChatMessage) => {
    Alert.alert('Ответить', `Ответить на сообщение от ${message.username}`);
  };

  const renderMessage = (message: ChatMessage) => {
    const isCurrentUser = message.userId === 'current_user';
    const reactionCounts = message.reactions.reduce((acc, reaction) => {
      acc[reaction.type] = (acc[reaction.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <Animatable.View
        key={message.id}
        animation="fadeInUp"
        duration={300}
        style={[
          styles.messageContainer,
          isCurrentUser && styles.currentUserMessage
        ]}
      >
        {/* Закрепленное сообщение */}
        {message.isPinned && (
          <View style={styles.pinnedIndicator}>
            <Ionicons name="pin" size={12} color={SPACE_THEME.colors.highlight} />
            <Text style={styles.pinnedText}>Закреплено</Text>
          </View>
        )}

        <View style={styles.messageContent}>
          {/* Аватар и информация */}
          {!isCurrentUser && (
            <View style={styles.messageHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {message.username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.username}>{message.username}</Text>
              <Text style={styles.timestamp}>
                {formatTime(message.timestamp)}
              </Text>
            </View>
          )}

          {/* Содержимое сообщения */}
          <View style={[
            styles.messageBubble,
            isCurrentUser && styles.currentUserBubble
          ]}>
            <Text style={[
              styles.messageText,
              isCurrentUser && styles.currentUserText
            ]}>
              {message.content}
            </Text>
          </View>

          {/* Реакции */}
          {Object.keys(reactionCounts).length > 0 && (
            <View style={styles.reactionsContainer}>
              {Object.entries(reactionCounts).map(([type, count]) => (
                <TouchableOpacity
                  key={type}
                  style={styles.reactionButton}
                  onPress={() => handleReaction(message.id, type)}
                >
                  <Text style={styles.reactionEmoji}>
                    {type === 'like' ? '👍' : 
                     type === 'love' ? '❤️' : 
                     type === 'laugh' ? '😂' : 
                     type === 'wow' ? '😮' : 
                     type === 'sad' ? '😢' : '😠'}
                  </Text>
                  <Text style={styles.reactionCount}>{count}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Действия с сообщением */}
          <View style={styles.messageActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleReaction(message.id, 'like')}
            >
              <Ionicons name="thumbs-up" size={16} color={SPACE_THEME.colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleReply(message)}
            >
              <Ionicons name="arrow-undo" size={16} color={SPACE_THEME.colors.textSecondary} />
            </TouchableOpacity>
            
            {!isCurrentUser && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handlePinMessage(message.id)}
              >
                <Ionicons 
                  name={message.isPinned ? "pin" : "pin-outline"} 
                  size={16} 
                  color={message.isPinned ? SPACE_THEME.colors.highlight : SPACE_THEME.colors.textSecondary} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animatable.View>
    );
  };

  if (!chatRoom) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Загрузка чата...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Заголовок чата */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.chatName}>{chatRoom.name}</Text>
          <Text style={styles.participantsCount}>
            {chatRoom.participants.length} участников
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call" size={20} color={SPACE_THEME.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam" size={20} color={SPACE_THEME.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={20} color={SPACE_THEME.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Список сообщений */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(message => renderMessage(message))}
      </ScrollView>

      {/* Индикатор набора текста */}
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>Кто-то печатает...</Text>
        </View>
      )}

      {/* Поле ввода */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Написать сообщение..."
            placeholderTextColor={SPACE_THEME.colors.textSecondary}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={1000}
          />
          
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.inputButton}>
              <Ionicons name="happy" size={20} color={SPACE_THEME.colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.inputButton}>
              <Ionicons name="camera" size={20} color={SPACE_THEME.colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.inputButton}>
              <Ionicons name="mic" size={20} color={SPACE_THEME.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.sendButton,
            newMessage.trim() && styles.sendButtonActive
          ]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={newMessage.trim() ? SPACE_THEME.colors.text : SPACE_THEME.colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: SPACE_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  headerInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  participantsCount: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  pinnedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  pinnedText: {
    fontSize: 12,
    color: SPACE_THEME.colors.highlight,
    marginLeft: 4,
  },
  messageContent: {
    maxWidth: '80%',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: SPACE_THEME.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
  },
  messageBubble: {
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  currentUserBubble: {
    backgroundColor: SPACE_THEME.colors.highlight,
    borderColor: SPACE_THEME.colors.highlight,
  },
  messageText: {
    fontSize: 16,
    color: SPACE_THEME.colors.text,
    lineHeight: 20,
  },
  currentUserText: {
    color: SPACE_THEME.colors.text,
  },
  reactionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SPACE_THEME.colors.accent,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  reactionEmoji: {
    fontSize: 14,
  },
  reactionCount: {
    fontSize: 12,
    color: SPACE_THEME.colors.text,
    marginLeft: 4,
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    padding: 4,
    marginRight: 12,
  },
  typingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: SPACE_THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: SPACE_THEME.colors.border,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: SPACE_THEME.colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: SPACE_THEME.colors.text,
    maxHeight: 100,
    paddingVertical: 4,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SPACE_THEME.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: SPACE_THEME.colors.highlight,
  },
});

export default ChatRoomScreen;
