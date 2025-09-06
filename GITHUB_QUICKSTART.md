# 🚀 Быстрый старт с GitHub

## ⚡ Подключение за 3 шага

### 1. Создайте репозиторий на GitHub
1. Перейдите на [github.com/new](https://github.com/new)
2. Название: `nebula-sports`
3. Описание: `Nebula Sports - спортивная экосистема с космической тематикой`
4. Сделайте **публичным**
5. **НЕ** инициализируйте с README (у нас уже есть файлы)
6. Нажмите **"Create repository"**

### 2. Подключите локальный репозиторий
```bash
# Замените YOUR_USERNAME на ваш GitHub username
git remote add origin https://github.com/YOUR_USERNAME/nebula-sports.git
git branch -M main
git push -u origin main
```

### 3. Готово! 🎉
Ваш проект теперь на GitHub: `https://github.com/YOUR_USERNAME/nebula-sports`

---

## 🤖 Автоматический способ (если установлен GitHub CLI)

```bash
# Установите GitHub CLI (если не установлен)
brew install gh

# Авторизуйтесь
gh auth login

# Запустите автоматический скрипт
./scripts/setup-github.sh YOUR_USERNAME
```

---

## 📋 Что у вас есть

### ✅ Git репозиторий
- Инициализирован и готов к работе
- Первый коммит создан
- .gitignore настроен

### ✅ GitHub интеграция
- CI/CD pipeline с GitHub Actions
- Автоматические тесты и сборка
- Шаблоны для Issues и Pull Requests
- Защита ветки main

### ✅ Документация
- Подробные инструкции в `GITHUB_SETUP.md`
- Автоматический скрипт `scripts/setup-github.sh`
- Шаблоны для багов и фич

---

## 🎯 Следующие шаги

### После подключения к GitHub
1. **Настройте Issues** - включите в настройках репозитория
2. **Создайте Project** - для отслеживания задач
3. **Настройте Branch Protection** - защитите ветку main
4. **Добавьте Collaborators** - пригласите команду

### Для разработки
1. **Создайте ветку** для новой функции
2. **Сделайте изменения** и коммит
3. **Создайте Pull Request** для ревью
4. **Слейте изменения** после одобрения

---

## 🛠️ Полезные команды

### Основные
```bash
# Проверить статус
git status

# Добавить изменения
git add .

# Сделать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push

# Получить изменения
git pull
```

### Работа с ветками
```bash
# Создать новую ветку
git checkout -b feature/new-feature

# Переключиться на ветку
git checkout main

# Слить ветку
git merge feature/new-feature
```

---

## 🆘 Решение проблем

### Ошибка "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/nebula-sports.git
```

### Ошибка аутентификации
```bash
# Используйте Personal Access Token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/nebula-sports.git
```

### Ошибка "fatal: refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
```

---

## 📚 Дополнительные ресурсы

- [GITHUB_SETUP.md](GITHUB_SETUP.md) - подробные инструкции
- [GitHub Documentation](https://docs.github.com/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)

---

**Теперь ваш проект Nebula Sports готов к работе с GitHub! 🚀**
