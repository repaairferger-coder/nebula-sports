#!/bin/bash

# 🐍 Установка Python для Nebula Sports

echo "🌟 Установка Python для Nebula Sports..."
echo ""

echo "📦 Обновляем пакеты..."
sudo apt update

echo ""
echo "🐍 Устанавливаем Python и pip..."
sudo apt install python3 python3-pip -y

echo ""
echo "🔗 Создаем симлинк для python..."
sudo ln -sf /usr/bin/python3 /usr/bin/python

echo ""
echo "📚 Устанавливаем зависимости..."
pip3 install -r requirements.txt

echo ""
echo "✅ Python установлен!"
echo ""
echo "🚀 Теперь можете запустить:"
echo "   python3 app.py"
echo ""
echo "🎉 Готово к разработке!"
