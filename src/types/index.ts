// Основные типы для приложения Nebula

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  achievements: Achievement[];
  subscription: SubscriptionType;
  preferences: UserPreferences;
  createdAt: Date;
  lastActive: Date;
}

export interface UserPreferences {
  favoriteSports: SportType[];
  notifications: NotificationSettings;
  language: string;
  theme: 'dark' | 'light';
  vrEnabled: boolean;
}

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
  matchReminders: boolean;
  chatMessages: boolean;
  achievements: boolean;
}

export type SportType = 
  | 'football' | 'basketball' | 'baseball' | 'american_football' 
  | 'hockey' | 'volleyball' | 'tennis' | 'table_tennis' 
  | 'boxing' | 'mma' | 'athletics' | 'swimming' 
  | 'formula1' | 'cycling' | 'rugby' | 'handball' 
  | 'badminton' | 'cricket' | 'skiing' | 'gymnastics';

export type SubscriptionType = 'free' | 'basic' | 'premium' | 'pro' | 'enterprise';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  nftId?: string;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface Stream {
  id: string;
  title: string;
  sport: SportType;
  startTime: Date;
  endTime?: Date;
  status: 'upcoming' | 'live' | 'ended';
  viewers: number;
  thumbnail: string;
  streamUrl: string;
  vrEnabled: boolean;
  chatEnabled: boolean;
  analytics: StreamAnalytics;
}

export interface StreamAnalytics {
  totalViewers: number;
  peakViewers: number;
  averageWatchTime: number;
  engagement: number;
  reactions: ReactionCount[];
}

export interface ReactionCount {
  type: 'like' | 'love' | 'wow' | 'angry' | 'sad';
  count: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'sticker' | 'emoji';
  timestamp: Date;
  reactions: MessageReaction[];
  replyTo?: string;
  isPinned: boolean;
}

export interface MessageReaction {
  userId: string;
  type: 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry';
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'private' | 'group' | 'stream';
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isMuted: boolean;
  streamId?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  sport: SportType;
  priority: 'low' | 'medium' | 'high';
  isAd: boolean;
  adUrl?: string;
  publishedAt: Date;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  accessLevel: 1 | 2 | 3 | 4 | 5;
  qrCode: string;
  permissions: AdminPermission[];
  lastLogin: Date;
}

export interface AdminPermission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'moderate')[];
}

export interface AnalyticsData {
  userId: string;
  watchTime: number;
  favoriteSports: SportType[];
  preferredStreamTimes: string[];
  chatActivity: number;
  achievementsUnlocked: number;
  subscriptionUsage: Record<string, number>;
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  type: 'stream' | 'food' | 'transport' | 'training' | 'product';
  title: string;
  description: string;
  confidence: number;
  data: any;
}
