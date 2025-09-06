#!/bin/bash

# 🌐 Простой запуск веб-версии Nebula Sports

echo "🌟 Запуск веб-версии Nebula Sports..."
echo ""

# Устанавливаем переменные окружения
export EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
export EXPO_DEVTOOLS_PORT=19000

echo "🚀 Запускаем Expo для веб-версии..."
echo "📱 Веб-версия будет доступна на порту 3000"
echo "🔧 Expo Dev Tools на порту 19000"
echo ""

# Запускаем Expo
npx expo start --web --host 0.0.0.0 --port 3000

echo ""
echo "✅ Веб-версия запущена!"
echo "🌐 Откройте: http://localhost:3000"
echo "🔧 Dev Tools: http://localhost:19000"
