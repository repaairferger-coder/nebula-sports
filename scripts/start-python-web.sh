#!/bin/bash

# 🐍 Запуск веб-версии Nebula Sports на Python

echo "🌟 Запуск веб-версии Nebula Sports на Python..."
echo ""

# Проверяем, что мы в Codespace
if [ -z "$CODESPACES" ]; then
    echo "⚠️  Этот скрипт предназначен для GitHub Codespace"
    echo "   Для локального запуска используйте: python app.py"
    exit 1
fi

echo "📦 Устанавливаем Python зависимости..."
pip install -r requirements.txt

echo ""
echo "🚀 Запускаем Flask приложение..."
echo "📱 Веб-версия будет доступна на порту 5000"
echo ""

# Устанавливаем переменные окружения
export FLASK_ENV=development
export FLASK_DEBUG=1

# Запускаем Flask
python app.py

echo ""
echo "✅ Flask приложение запущено!"
echo "🌐 Откройте: http://localhost:5000"
echo ""
echo "🎉 Готово к разработке!"
