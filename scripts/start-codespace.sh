#!/bin/bash

# 🚀 Скрипт для запуска GitHub Codespace для Nebula Sports

echo "🌟 Запуск GitHub Codespace для Nebula Sports..."
echo ""

# Проверяем, установлен ли GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI не установлен. Устанавливаем..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install gh
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh
    else
        echo "❌ Неподдерживаемая операционная система. Установите GitHub CLI вручную."
        exit 1
    fi
fi

# Проверяем авторизацию
if ! gh auth status &> /dev/null; then
    echo "🔐 Авторизуемся в GitHub..."
    gh auth login
fi

echo "🚀 Создаем Codespace..."
echo "📁 Репозиторий: repaairferger-coder/nebula-sports"
echo "⏳ Это может занять 2-3 минуты..."
echo ""

# Создаем Codespace
gh codespace create \
    --repo repaairferger-coder/nebula-sports \
    --branch main \
    --machine standardLinux32gb

echo ""
echo "✅ Codespace создан!"
echo "🌐 Откройте его в браузере или используйте VS Code"
echo ""
echo "📋 Следующие шаги:"
echo "1. Откройте Codespace в браузере"
echo "2. Выполните: npm start"
echo "3. Откройте Expo Dev Tools"
echo "4. Начните разработку!"
echo ""
echo "🔗 Полезные ссылки:"
echo "- Репозиторий: https://github.com/repaairferger-coder/nebula-sports"
echo "- Codespaces: https://github.com/codespaces"
echo ""
echo "🎉 Готово к разработке Nebula Sports!"
