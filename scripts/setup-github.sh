#!/bin/bash

# 🚀 Скрипт для автоматического подключения к GitHub
# Использование: ./scripts/setup-github.sh YOUR_USERNAME

set -e

# Проверяем, что передан username
if [ -z "$1" ]; then
    echo "❌ Ошибка: Укажите ваш GitHub username"
    echo "Использование: ./scripts/setup-github.sh YOUR_USERNAME"
    exit 1
fi

USERNAME=$1
REPO_NAME="nebula-sports"
REPO_URL="https://github.com/$USERNAME/$REPO_NAME.git"

echo "🚀 Настройка GitHub репозитория для Nebula Sports"
echo "👤 Username: $USERNAME"
echo "📁 Repository: $REPO_NAME"
echo ""

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: Запустите скрипт из корневой директории проекта"
    exit 1
fi

# Проверяем, что git инициализирован
if [ ! -d ".git" ]; then
    echo "❌ Ошибка: Git не инициализирован. Запустите 'git init' сначала"
    exit 1
fi

# Проверяем, что есть коммиты
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo "❌ Ошибка: Нет коммитов. Сделайте первый коммит сначала"
    exit 1
fi

echo "✅ Git репозиторий готов"
echo ""

# Проверяем, установлен ли GitHub CLI
if command -v gh &> /dev/null; then
    echo "🔧 GitHub CLI найден"
    
    # Проверяем авторизацию
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI авторизован"
        
        # Создаем репозиторий через GitHub CLI
        echo "📦 Создание репозитория на GitHub..."
        gh repo create $REPO_NAME --public --description "Nebula Sports - спортивная экосистема с космической тематикой" --source=. --remote=origin --push
        
        echo "✅ Репозиторий создан и код отправлен на GitHub!"
        echo "🌐 URL: https://github.com/$USERNAME/$REPO_NAME"
        
    else
        echo "❌ GitHub CLI не авторизован"
        echo "🔑 Запустите: gh auth login"
        exit 1
    fi
    
else
    echo "⚠️  GitHub CLI не найден"
    echo "📝 Создайте репозиторий вручную на GitHub.com:"
    echo "   1. Перейдите на https://github.com/new"
    echo "   2. Название: $REPO_NAME"
    echo "   3. Описание: Nebula Sports - спортивная экосистема с космической тематикой"
    echo "   4. Сделайте публичным"
    echo "   5. НЕ инициализируйте с README (у нас уже есть файлы)"
    echo ""
    echo "🔗 Затем выполните команды:"
    echo "   git remote add origin $REPO_URL"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 Готово! Ваш проект Nebula Sports теперь на GitHub!"
echo "📚 Дополнительные настройки см. в GITHUB_SETUP.md"
