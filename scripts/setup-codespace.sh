#!/bin/bash

# 🚀 Установка всех зависимостей для Codespace

echo "🌟 Установка зависимостей для Nebula Sports в Codespace..."
echo ""

# Проверяем, что мы в Codespace
if [ -z "$CODESPACES" ]; then
    echo "⚠️  Этот скрипт предназначен для GitHub Codespace"
    echo "   Для локального запуска используйте: npm install"
    exit 1
fi

echo "📦 Устанавливаем npm зависимости..."
npm install

echo ""
echo "🔧 Устанавливаем Expo CLI глобально..."
npm install -g @expo/cli@latest

echo ""
echo "🛠️ Исправляем зависимости Expo..."
npx expo install --fix

echo ""
echo "✅ Все зависимости установлены!"
echo ""
echo "🚀 Теперь можете запустить:"
echo "   npm run start:browser"
echo ""
echo "🎉 Готово к разработке!"
