#!/usr/bin/env python3
"""
Nebula Sports - Веб-версия на Python Flask
Спортивная экосистема с космической тематикой
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Конфигурация
app.config['SECRET_KEY'] = 'nebula-sports-secret-key'

# Данные для демонстрации
SPORTS_DATA = [
    {"id": 1, "name": "Футбол", "icon": "⚽", "streams": 15, "viewers": 12500},
    {"id": 2, "name": "Баскетбол", "icon": "🏀", "streams": 12, "viewers": 8900},
    {"id": 3, "name": "Теннис", "icon": "🎾", "streams": 8, "viewers": 5600},
    {"id": 4, "name": "Хоккей", "icon": "🏒", "streams": 10, "viewers": 7200},
    {"id": 5, "name": "Формула 1", "icon": "🏎️", "streams": 5, "viewers": 15000},
    {"id": 6, "name": "Бокс", "icon": "🥊", "streams": 6, "viewers": 9800},
    {"id": 7, "name": "MMA", "icon": "🥋", "streams": 4, "viewers": 11200},
    {"id": 8, "name": "Плавание", "icon": "🏊", "streams": 7, "viewers": 3400},
    {"id": 9, "name": "Легкая атлетика", "icon": "🏃", "streams": 9, "viewers": 4800},
    {"id": 10, "name": "Волейбол", "icon": "🏐", "streams": 11, "viewers": 6100}
]

NEWS_DATA = [
    {"id": 1, "title": "Чемпионат мира по футболу 2024", "time": "2 часа назад"},
    {"id": 2, "title": "Новый рекорд в плавании", "time": "4 часа назад"},
    {"id": 3, "title": "Формула 1: Гран-при Монако", "time": "6 часов назад"},
    {"id": 4, "title": "Боксерский поединок века", "time": "8 часов назад"},
    {"id": 5, "title": "Олимпийские игры 2024", "time": "10 часов назад"}
]

CHAT_MESSAGES = [
    {"id": 1, "user": "Fan123", "message": "Отличный матч!", "time": "2 мин назад"},
    {"id": 2, "user": "SportsLover", "message": "Кто выиграет?", "time": "5 мин назад"},
    {"id": 3, "user": "NebulaUser", "message": "Космическая игра! 🚀", "time": "8 мин назад"}
]

@app.route('/')
def index():
    """Главная страница"""
    return render_template('index.html')

@app.route('/api/sports')
def get_sports():
    """API для получения списка спорта"""
    return jsonify(SPORTS_DATA)

@app.route('/api/news')
def get_news():
    """API для получения новостей"""
    return jsonify(NEWS_DATA)

@app.route('/api/chat')
def get_chat():
    """API для получения сообщений чата"""
    return jsonify(CHAT_MESSAGES)

@app.route('/api/chat', methods=['POST'])
def send_message():
    """API для отправки сообщения в чат"""
    data = request.get_json()
    new_message = {
        "id": len(CHAT_MESSAGES) + 1,
        "user": data.get('user', 'Anonymous'),
        "message": data.get('message', ''),
        "time": "только что"
    }
    CHAT_MESSAGES.append(new_message)
    return jsonify(new_message)

@app.route('/stream/<int:sport_id>')
def stream_page(sport_id):
    """Страница трансляции"""
    sport = next((s for s in SPORTS_DATA if s['id'] == sport_id), None)
    if not sport:
        return "Спорт не найден", 404
    return render_template('stream.html', sport=sport)

@app.route('/chat')
def chat_page():
    """Страница чата"""
    return render_template('chat.html')

@app.route('/analytics')
def analytics_page():
    """Страница аналитики"""
    return render_template('analytics.html')

@app.route('/profile')
def profile_page():
    """Страница профиля"""
    return render_template('profile.html')

if __name__ == '__main__':
    # Запуск для Codespace
    port = int(os.environ.get('PORT', 5000))
    host = '0.0.0.0' if os.environ.get('CODESPACES') else '127.0.0.1'
    
    print(f"🚀 Запуск Nebula Sports на {host}:{port}")
    print(f"🌐 Веб-версия: http://localhost:{port}")
    
    app.run(host=host, port=port, debug=True)
