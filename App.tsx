import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

// Импорт экранов
import HomeScreen from '@/screens/HomeScreen';
import StreamsScreen from '@/screens/StreamsScreen';
import ChatScreen from '@/screens/ChatScreen';
import AnalyticsScreen from '@/screens/AnalyticsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import StreamDetailScreen from '@/screens/StreamDetailScreen';
import ChatRoomScreen from '@/screens/ChatRoomScreen';
import AdminScreen from '@/screens/AdminScreen';

// Импорт компонентов
import NewsTicker from '@/components/NewsTicker';
import ProgressBar from '@/components/ProgressBar';
import UserProfileButton from '@/components/UserProfileButton';

// Импорт констант
import { SPACE_THEME } from '@/constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Главный стек навигации
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: SPACE_THEME.colors.primary,
        },
        headerTintColor: SPACE_THEME.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="StreamDetail" 
        component={StreamDetailScreen}
        options={{ title: 'Трансляция' }}
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen}
        options={{ title: 'Чат' }}
      />
      <Stack.Screen 
        name="Admin" 
        component={AdminScreen}
        options={{ title: 'Админ-панель' }}
      />
    </Stack.Navigator>
  );
}

// Нижние вкладки
function MainTabs() {
  return (
    <View style={styles.container}>
      {/* Бегущая строка новостей */}
      <NewsTicker />
      
      {/* Прогресс-бар пользователя */}
      <ProgressBar />
      
      {/* Основная навигация */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Streams':
                iconName = focused ? 'play-circle' : 'play-circle-outline';
                break;
              case 'Chat':
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                break;
              case 'Analytics':
                iconName = focused ? 'analytics' : 'analytics-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: SPACE_THEME.colors.highlight,
          tabBarInactiveTintColor: SPACE_THEME.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: SPACE_THEME.colors.surface,
            borderTopColor: SPACE_THEME.colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: SPACE_THEME.colors.primary,
          },
          headerTintColor: SPACE_THEME.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => <UserProfileButton />,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'Главная',
            headerTitle: 'Nebula Sports'
          }}
        />
        <Tab.Screen 
          name="Streams" 
          component={StreamsScreen}
          options={{ 
            title: 'Трансляции',
            headerTitle: 'Спортивные трансляции'
          }}
        />
        <Tab.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{ 
            title: 'Чат',
            headerTitle: 'Сообщения'
          }}
        />
        <Tab.Screen 
          name="Analytics" 
          component={AnalyticsScreen}
          options={{ 
            title: 'Аналитика',
            headerTitle: 'Персональная аналитика'
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ 
            title: 'Профиль',
            headerTitle: 'Мой профиль'
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={SPACE_THEME.colors.primary} />
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPACE_THEME.colors.background,
  },
});
