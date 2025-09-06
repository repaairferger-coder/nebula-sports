# 🐍 Исправление Python в Codespace

## 🚨 Проблемы: "python: command not found", "pip: command not found"

### ✅ **Быстрое решение:**

Выполните эти команды в терминале Codespace:

```bash
# 1. Обновите репозиторий
git pull origin main

# 2. Установите Python
sudo apt update
sudo apt install python3 python3-pip -y

# 3. Создайте симлинк
sudo ln -s /usr/bin/python3 /usr/bin/python

# 4. Установите зависимости
pip3 install -r requirements.txt

# 5. Запустите приложение
python3 app.py
```

### 🚀 **Или используйте автоматический скрипт:**

```bash
chmod +x install-python.sh
./install-python.sh
```

## 📱 **После установки:**

1. **Запустите проект**:
```bash
python3 app.py
```

2. **Откройте порты**:
   - В Codespace нажмите на вкладку **"Ports"** (слева)
   - Найдите порт **5000** - "Nebula Sports Python Web"
   - Нажмите на иконку 🌐 или "Open in Browser"

## 🎯 **Что происходит:**

- **sudo apt update** - обновляет список пакетов
- **sudo apt install python3 python3-pip** - устанавливает Python и pip
- **sudo ln -s /usr/bin/python3 /usr/bin/python** - создает симлинк
- **pip3 install -r requirements.txt** - устанавливает зависимости Flask
- **python3 app.py** - запускает веб-приложение

## 🆘 **Если что-то не работает:**

### Очистите кэш:
```bash
sudo apt clean
sudo apt autoremove
```

### Переустановите Python:
```bash
sudo apt remove python3 python3-pip
sudo apt install python3 python3-pip -y
```

### Проверьте версию:
```bash
python3 --version
pip3 --version
```

### Альтернативный запуск:
```bash
# Если python3 не работает
python app.py

# Если pip3 не работает
pip install -r requirements.txt
```

## 🔧 **Проверка установки:**

```bash
# Проверьте Python
python3 --version

# Проверьте pip
pip3 --version

# Проверьте зависимости
pip3 list | grep Flask
```

## 🎉 **Готово!**

Теперь веб-версия Nebula Sports на Python будет работать на порту 5000!

**Ссылка на репозиторий**: https://github.com/repaairferger-coder/nebula-sports
