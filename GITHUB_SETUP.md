# 🔗 Подключение к GitHub

## 📋 Пошаговая инструкция

### 1. ✅ Git репозиторий инициализирован
```bash
git init
git add .
git commit -m "🚀 Initial commit: Nebula Sports"
```

### 2. 🌐 Создание репозитория на GitHub

#### Вариант A: Через веб-интерфейс GitHub
1. Перейдите на [github.com](https://github.com)
2. Нажмите кнопку **"New"** или **"+"** → **"New repository"**
3. Заполните форму:
   - **Repository name**: `nebula-sports`
   - **Description**: `Nebula Sports - спортивная экосистема с космической тематикой`
   - **Visibility**: Public (или Private)
   - **Initialize**: НЕ ставьте галочки (у нас уже есть файлы)
4. Нажмите **"Create repository"**

#### Вариант B: Через GitHub CLI
```bash
# Установите GitHub CLI (если не установлен)
brew install gh

# Авторизуйтесь
gh auth login

# Создайте репозиторий
gh repo create nebula-sports --public --description "Nebula Sports - спортивная экосистема с космической тематикой"
```

### 3. 🔗 Подключение локального репозитория к GitHub

После создания репозитория на GitHub, выполните команды:

```bash
# Добавьте remote origin (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nebula-sports.git

# Переименуйте ветку в main (если нужно)
git branch -M main

# Отправьте код на GitHub
git push -u origin main
```

### 4. 🎉 Готово!

Ваш проект теперь доступен на GitHub по адресу:
`https://github.com/YOUR_USERNAME/nebula-sports`

---

## 🛠️ Дополнительные настройки

### Настройка GitHub Actions (CI/CD)

Создайте файл `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Type check
      run: npx tsc --noEmit

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js 18.x
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for web
      run: npx expo build:web
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: web-build
        path: web-build/
```

### Настройка Issues и Projects

1. **Issues**: Включите Issues в настройках репозитория
2. **Projects**: Создайте Project для отслеживания задач
3. **Milestones**: Создайте Milestones для версий

### Настройка Branch Protection

1. Перейдите в **Settings** → **Branches**
2. Нажмите **"Add rule"**
3. Настройте правила для ветки `main`:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

---

## 📚 Полезные команды Git

### Основные команды
```bash
# Проверить статус
git status

# Добавить изменения
git add .

# Сделать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push

# Получить изменения с GitHub
git pull

# Создать новую ветку
git checkout -b feature/new-feature

# Переключиться на ветку
git checkout main

# Слить ветку
git merge feature/new-feature
```

### Работа с ветками
```bash
# Посмотреть все ветки
git branch -a

# Создать и переключиться на новую ветку
git checkout -b feature/chat-improvements

# Отправить новую ветку на GitHub
git push -u origin feature/chat-improvements

# Удалить локальную ветку
git branch -d feature/chat-improvements

# Удалить удаленную ветку
git push origin --delete feature/chat-improvements
```

### Откат изменений
```bash
# Отменить последний коммит (сохранить изменения)
git reset --soft HEAD~1

# Отменить последний коммит (удалить изменения)
git reset --hard HEAD~1

# Отменить изменения в файле
git checkout -- filename

# Отменить все изменения
git checkout -- .
```

---

## 🏷️ Теги и релизы

### Создание тега
```bash
# Создать тег
git tag -a v1.0.0 -m "Release version 1.0.0"

# Отправить тег на GitHub
git push origin v1.0.0
```

### Создание релиза на GitHub
1. Перейдите в **Releases** на странице репозитория
2. Нажмите **"Create a new release"**
3. Выберите тег или создайте новый
4. Заполните описание релиза
5. Прикрепите файлы сборки (если есть)
6. Нажмите **"Publish release"**

---

## 🔧 Настройка SSH ключей

### Генерация SSH ключа
```bash
# Создать SSH ключ
ssh-keygen -t ed25519 -C "your_email@example.com"

# Добавить ключ в ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Скопировать публичный ключ
cat ~/.ssh/id_ed25519.pub
```

### Добавление ключа в GitHub
1. Перейдите в **Settings** → **SSH and GPG keys**
2. Нажмите **"New SSH key"**
3. Вставьте публичный ключ
4. Нажмите **"Add SSH key"**

### Использование SSH вместо HTTPS
```bash
# Изменить remote URL на SSH
git remote set-url origin git@github.com:YOUR_USERNAME/nebula-sports.git
```

---

## 📋 Чек-лист

### Перед первым push
- [ ] Создан репозиторий на GitHub
- [ ] Настроен .gitignore
- [ ] Сделан первый коммит
- [ ] Добавлен remote origin
- [ ] Код отправлен на GitHub

### После подключения
- [ ] Настроены GitHub Actions
- [ ] Создан Project для задач
- [ ] Настроена защита ветки main
- [ ] Созданы Issues для багов
- [ ] Настроены SSH ключи

---

## 🆘 Решение проблем

### Ошибка "remote origin already exists"
```bash
# Удалить существующий remote
git remote remove origin

# Добавить новый remote
git remote add origin https://github.com/YOUR_USERNAME/nebula-sports.git
```

### Ошибка "fatal: refusing to merge unrelated histories"
```bash
# Принудительно объединить истории
git pull origin main --allow-unrelated-histories
```

### Ошибка аутентификации
```bash
# Настроить GitHub CLI
gh auth login

# Или использовать Personal Access Token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/nebula-sports.git
```

---

**Теперь ваш проект Nebula Sports подключен к GitHub! 🚀**

*Следуйте инструкциям выше для полной настройки*
