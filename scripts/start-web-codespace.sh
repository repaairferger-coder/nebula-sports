#!/bin/bash

# 🌐 Скрипт для запуска веб-версии Nebula Sports в Codespace

echo "🌟 Запуск веб-версии Nebula Sports в Codespace..."
echo ""

# Проверяем, что мы в Codespace
if [ -z "$CODESPACES" ]; then
    echo "⚠️  Этот скрипт предназначен для GitHub Codespace"
    echo "   Для локального запуска используйте: npm run web"
    exit 1
fi

echo "🚀 Запускаем Expo с настройками для Codespace..."
echo ""

# Устанавливаем переменные окружения для Codespace
export EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
export EXPO_DEVTOOLS_PORT=19000

# Запускаем Expo
echo "📱 Запуск Expo Dev Server..."
echo "🌐 Веб-версия будет доступна на порту 19000"
echo ""

# Запускаем в фоновом режиме
npx expo start --web --host 0.0.0.0 --port 19000 &

# Ждем запуска
sleep 5

echo ""
echo "✅ Expo запущен!"
echo ""
echo "🌐 Откройте в браузере:"
echo "   http://localhost:19000"
echo ""
echo "📱 Или используйте Expo Dev Tools:"
echo "   http://localhost:19000"
echo ""
echo "🔧 Полезные команды:"
echo "   - Остановить: Ctrl+C"
echo "   - Перезапустить: npm run start:codespace"
echo "   - Очистить кэш: npm run clear"
echo ""
echo "🎉 Готово к разработке!"
