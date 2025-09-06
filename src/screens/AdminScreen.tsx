import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { AdminUser, AdminPermission } from '@/types';
import { SPACE_THEME, ADMIN_LEVELS } from '@/constants';
import { validateAdminQR } from '@/utils';

const AdminScreen: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Моковые данные админа
  const mockAdmin: AdminUser = {
    id: 'admin_1',
    username: 'SuperAdmin',
    email: 'admin@nebula-sports.com',
    accessLevel: 5,
    qrCode: 'admin_qr_code_123',
    permissions: [
      { module: 'users', actions: ['read', 'write', 'delete', 'moderate'] },
      { module: 'streams', actions: ['read', 'write', 'delete', 'moderate'] },
      { module: 'analytics', actions: ['read', 'write', 'delete'] },
      { module: 'admin', actions: ['read', 'write', 'delete', 'moderate'] },
    ],
    lastLogin: new Date(),
  };

  useEffect(() => {
    // Проверяем разрешения на камеру
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleQRScan = ({ data }: { data: string }) => {
    const adminData = validateAdminQR(data);
    if (adminData) {
      setCurrentAdmin({
        ...mockAdmin,
        accessLevel: adminData.level,
      });
      setShowQRScanner(false);
      setIsAuthenticated(true);
    } else {
      Alert.alert('Ошибка', 'Недействительный QR код');
    }
  };

  const handlePasswordAuth = () => {
    // В реальном приложении здесь будет проверка пароля
    if (password === 'admin123') {
      setCurrentAdmin(mockAdmin);
      setShowPasswordModal(false);
      setIsAuthenticated(true);
      setPassword('');
    } else {
      Alert.alert('Ошибка', 'Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentAdmin(null);
  };

  const renderAuthScreen = () => (
    <View style={styles.authContainer}>
      <LinearGradient
        colors={SPACE_THEME.gradients.space}
        style={styles.authGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.authContent}>
          <Ionicons name="shield" size={64} color={SPACE_THEME.colors.highlight} />
          <Text style={styles.authTitle}>Админ-панель</Text>
          <Text style={styles.authSubtitle}>
            Войдите с помощью QR кода или пароля
          </Text>

          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => setShowQRScanner(true)}
              disabled={hasPermission === false}
            >
              <Ionicons name="qr-code" size={24} color={SPACE_THEME.colors.text} />
              <Text style={styles.authButtonText}>QR код</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.authButton}
              onPress={() => setShowPasswordModal(true)}
            >
              <Ionicons name="key" size={24} color={SPACE_THEME.colors.text} />
              <Text style={styles.authButtonText}>Пароль</Text>
            </TouchableOpacity>
          </View>

          {hasPermission === false && (
            <Text style={styles.permissionText}>
              Разрешение на камеру не предоставлено
            </Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  const renderAdminDashboard = () => {
    if (!currentAdmin) return null;

    const adminLevel = ADMIN_LEVELS[currentAdmin.accessLevel];

    return (
      <ScrollView style={styles.dashboardContainer}>
        {/* Заголовок */}
        <View style={styles.dashboardHeader}>
          <LinearGradient
            colors={SPACE_THEME.gradients.primary}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.headerContent}>
              <View style={styles.adminInfo}>
                <Text style={styles.adminName}>{currentAdmin.username}</Text>
                <Text style={styles.adminLevel}>{adminLevel.name}</Text>
                <Text style={styles.adminEmail}>{currentAdmin.email}</Text>
              </View>
              
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out" size={20} color={SPACE_THEME.colors.text} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Статистика */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Статистика</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="people" size={24} color={SPACE_THEME.colors.info} />
              <Text style={styles.statValue}>12,543</Text>
              <Text style={styles.statLabel}>Пользователей</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="play-circle" size={24} color={SPACE_THEME.colors.success} />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Активных трансляций</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="chatbubbles" size={24} color={SPACE_THEME.colors.warning} />
              <Text style={styles.statValue}>8,432</Text>
              <Text style={styles.statLabel}>Сообщений в чате</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="analytics" size={24} color={SPACE_THEME.colors.highlight} />
              <Text style={styles.statValue}>98.5%</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
          </View>
        </View>

        {/* Управление */}
        <View style={styles.managementSection}>
          <Text style={styles.sectionTitle}>Управление</Text>
          
          <View style={styles.managementGrid}>
            <TouchableOpacity style={styles.managementCard}>
              <Ionicons name="people" size={32} color={SPACE_THEME.colors.info} />
              <Text style={styles.managementTitle}>Пользователи</Text>
              <Text style={styles.managementSubtitle}>Управление пользователями</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.managementCard}>
              <Ionicons name="play-circle" size={32} color={SPACE_THEME.colors.success} />
              <Text style={styles.managementTitle}>Трансляции</Text>
              <Text style={styles.managementSubtitle}>Управление трансляциями</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.managementCard}>
              <Ionicons name="chatbubbles" size={32} color={SPACE_THEME.colors.warning} />
              <Text style={styles.managementTitle}>Модерация</Text>
              <Text style={styles.managementSubtitle}>Модерация контента</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.managementCard}>
              <Ionicons name="analytics" size={32} color={SPACE_THEME.colors.highlight} />
              <Text style={styles.managementTitle}>Аналитика</Text>
              <Text style={styles.managementSubtitle}>Системная аналитика</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.managementCard}>
              <Ionicons name="settings" size={32} color={SPACE_THEME.colors.textSecondary} />
              <Text style={styles.managementTitle}>Настройки</Text>
              <Text style={styles.managementSubtitle}>Системные настройки</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.managementCard}>
              <Ionicons name="robot" size={32} color={SPACE_THEME.colors.accent} />
              <Text style={styles.managementTitle}>AI Помощник</Text>
              <Text style={styles.managementSubtitle}>Помощник разработчика</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Разрешения */}
        <View style={styles.permissionsSection}>
          <Text style={styles.sectionTitle}>Разрешения</Text>
          
          <View style={styles.permissionsList}>
            {currentAdmin.permissions.map((permission, index) => (
              <View key={index} style={styles.permissionItem}>
                <Text style={styles.permissionModule}>{permission.module}</Text>
                <View style={styles.permissionActions}>
                  {permission.actions.map((action, actionIndex) => (
                    <View key={actionIndex} style={styles.permissionAction}>
                      <Text style={styles.permissionActionText}>{action}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? renderAdminDashboard() : renderAuthScreen()}

      {/* QR Сканер */}
      <Modal
        visible={showQRScanner}
        animationType="slide"
        onRequestClose={() => setShowQRScanner(false)}
      >
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleQRScan}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.scannerOverlay}>
            <View style={styles.scannerFrame} />
            <Text style={styles.scannerText}>Наведите камеру на QR код</Text>
            <TouchableOpacity
              style={styles.scannerCloseButton}
              onPress={() => setShowQRScanner(false)}
            >
              <Ionicons name="close" size={24} color={SPACE_THEME.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модальное окно пароля */}
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.passwordModalOverlay}>
          <View style={styles.passwordModal}>
            <Text style={styles.passwordModalTitle}>Введите пароль</Text>
            <TextInput
              style={styles.passwordInput}
              placeholder="Пароль"
              placeholderTextColor={SPACE_THEME.colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.passwordModalButtons}>
              <TouchableOpacity
                style={styles.passwordModalButton}
                onPress={() => setShowPasswordModal(false)}
              >
                <Text style={styles.passwordModalButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.passwordModalButton, styles.passwordModalButtonPrimary]}
                onPress={handlePasswordAuth}
              >
                <Text style={styles.passwordModalButtonText}>Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPACE_THEME.colors.background,
  },
  authContainer: {
    flex: 1,
  },
  authGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: SPACE_THEME.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
    marginLeft: 8,
  },
  permissionText: {
    fontSize: 14,
    color: SPACE_THEME.colors.error,
    textAlign: 'center',
    marginTop: 16,
  },
  dashboardContainer: {
    flex: 1,
  },
  dashboardHeader: {
    marginBottom: 24,
  },
  headerGradient: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
  },
  adminLevel: {
    fontSize: 16,
    color: SPACE_THEME.colors.highlight,
    marginTop: 4,
  },
  adminEmail: {
    fontSize: 14,
    color: SPACE_THEME.colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  statsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  managementSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  managementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  managementCard: {
    width: '48%',
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    alignItems: 'center',
  },
  managementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  managementSubtitle: {
    fontSize: 12,
    color: SPACE_THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  permissionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  permissionsList: {
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    padding: 16,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: SPACE_THEME.colors.border,
  },
  permissionModule: {
    fontSize: 16,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
    textTransform: 'capitalize',
  },
  permissionActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  permissionAction: {
    backgroundColor: SPACE_THEME.colors.accent,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 4,
    marginBottom: 4,
  },
  permissionActionText: {
    fontSize: 12,
    color: SPACE_THEME.colors.text,
    textTransform: 'capitalize',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: SPACE_THEME.colors.highlight,
    borderRadius: 12,
  },
  scannerText: {
    fontSize: 16,
    color: SPACE_THEME.colors.text,
    marginTop: 32,
    textAlign: 'center',
  },
  scannerCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordModal: {
    backgroundColor: SPACE_THEME.colors.surface,
    borderRadius: 12,
    padding: 24,
    width: '80%',
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
  },
  passwordModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SPACE_THEME.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: SPACE_THEME.colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: SPACE_THEME.colors.text,
    borderWidth: 1,
    borderColor: SPACE_THEME.colors.border,
    marginBottom: 16,
  },
  passwordModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  passwordModalButtonPrimary: {
    backgroundColor: SPACE_THEME.colors.highlight,
  },
  passwordModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: SPACE_THEME.colors.text,
  },
});

export default AdminScreen;
