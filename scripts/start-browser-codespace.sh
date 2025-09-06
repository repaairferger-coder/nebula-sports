#!/bin/bash

# 🌐 Запуск Nebula Sports в браузере GitHub Codespace

echo "🌟 Запуск Nebula Sports в браузере GitHub Codespace..."
echo ""

# Проверяем, что мы в Codespace
if [ -z "$CODESPACES" ]; then
    echo "⚠️  Этот скрипт предназначен для GitHub Codespace"
    echo "   Для локального запуска используйте: npm run web"
    exit 1
fi

echo "🚀 Запускаем Expo для веб-версии..."
echo "📱 Веб-версия будет доступна на порту 3000"
echo ""

# Устанавливаем переменные окружения
export EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
export EXPO_DEVTOOLS_PORT=19000

# Запускаем Expo
echo "⏳ Запуск Expo Dev Server..."
npx expo start --web --host 0.0.0.0 --port 3000 &

# Ждем запуска
sleep 10

echo ""
echo "✅ Expo запущен!"
echo ""
echo "🌐 Откройте в браузере:"
echo "   http://localhost:3000"
echo ""
echo "📋 Инструкции:"
echo "1. В Codespace нажмите на вкладку 'Ports' (слева)"
echo "2. Найдите порт 3000 - 'Nebula Sports Web App'"
echo "3. Нажмите на иконку 🌐 или 'Open in Browser'"
echo ""
echo "🔧 Полезные команды:"
echo "   - Остановить: Ctrl+C"
echo "   - Перезапустить: npm run start:web:codespace"
echo "   - Очистить кэш: npm run clear"
echo ""
echo "🎉 Готово к разработке в браузере!"
