const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  expo: {
    name: IS_DEV ? 'Nebula Sports (Dev)' : 'Nebula Sports',
    slug: 'nebula-sports',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#1a1a2e'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'com.nebulasports.dev' : 'com.nebulasports.app'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#1a1a2e'
      },
      package: IS_DEV ? 'com.nebulasports.dev' : 'com.nebulasports.app'
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro'
    },
    plugins: [
      'expo-router',
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          color: '#1a1a2e'
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    // Настройки для Codespace
    packagerOpts: {
      config: 'metro.config.js'
    },
    // Настройки для веб-версии
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png'
    }
  }
};
