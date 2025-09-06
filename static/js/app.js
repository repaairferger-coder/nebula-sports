// Nebula Sports - JavaScript для веб-версии

class NebulaSports {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.startAnimations();
    }

    setupEventListeners() {
        // Обработчики для навигации
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(item.getAttribute('href'));
            });
        });

        // Обработчики для спортивных карточек
        document.addEventListener('click', (e) => {
            if (e.target.closest('.sport-card')) {
                const card = e.target.closest('.sport-card');
                const sportId = card.dataset.sportId;
                if (sportId) {
                    this.openStream(sportId);
                }
            }
        });
    }

    loadInitialData() {
        this.loadSports();
        this.loadNews();
        this.loadChat();
    }

    async loadSports() {
        try {
            const response = await fetch('/api/sports');
            const sports = await response.json();
            this.renderSports(sports);
        } catch (error) {
            console.error('Error loading sports:', error);
        }
    }

    async loadNews() {
        try {
            const response = await fetch('/api/news');
            const news = await response.json();
            this.renderNews(news);
        } catch (error) {
            console.error('Error loading news:', error);
        }
    }

    async loadChat() {
        try {
            const response = await fetch('/api/chat');
            const messages = await response.json();
            this.renderChat(messages);
        } catch (error) {
            console.error('Error loading chat:', error);
        }
    }

    renderSports(sports) {
        const grid = document.getElementById('sportsGrid');
        if (!grid) return;

        grid.innerHTML = sports.map(sport => `
            <div class="sport-card" data-sport-id="${sport.id}">
                <div class="sport-icon">${sport.icon}</div>
                <h3 class="sport-name">${sport.name}</h3>
                <div class="sport-stats">
                    <span class="streams">${sport.streams} трансляций</span>
                    <span class="viewers">${sport.viewers.toLocaleString()} зрителей</span>
                </div>
                <div class="sport-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        `).join('');
    }

    renderNews(news) {
        const ticker = document.getElementById('newsTicker');
        if (!ticker) return;

        const newsText = news.map(item => item.title).join(' • ');
        ticker.textContent = newsText;
    }

    renderChat(messages) {
        const chatContainer = document.getElementById('chatMessages');
        if (!chatContainer) return;

        chatContainer.innerHTML = messages.map(message => `
            <div class="chat-message">
                <div class="message-header">
                    <span class="message-user">${message.user}</span>
                    <span class="message-time">${message.time}</span>
                </div>
                <div class="message-content">${message.message}</div>
            </div>
        `).join('');

        // Прокрутка вниз
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    openStream(sportId) {
        window.location.href = `/stream/${sportId}`;
    }

    navigateTo(url) {
        window.location.href = url;
    }

    startAnimations() {
        // Анимация звезд
        this.animateStars();
        
        // Анимация прогресс-бара
        this.animateProgressBar();
        
        // Анимация карточек
        this.animateCards();
    }

    animateStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.style.animationDelay = `${index * 0.5}s`;
        });
    }

    animateProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            setTimeout(() => {
                progressFill.style.width = '65%';
            }, 500);
        }
    }

    animateCards() {
        const cards = document.querySelectorAll('.sport-card, .feature-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Методы для чата
    sendMessage(message, user = 'Anonymous') {
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, user })
        })
        .then(response => response.json())
        .then(newMessage => {
            this.loadChat(); // Перезагружаем чат
        })
        .catch(error => console.error('Error sending message:', error));
    }

    // Методы для аналитики
    loadAnalytics() {
        // Заглушка для аналитики
        const analyticsData = {
            totalWatched: 45,
            favoriteSport: 'Футбол',
            level: 5,
            achievements: 12
        };
        
        this.renderAnalytics(analyticsData);
    }

    renderAnalytics(data) {
        const analyticsContainer = document.getElementById('analyticsContent');
        if (!analyticsContainer) return;

        analyticsContainer.innerHTML = `
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h3>Просмотрено матчей</h3>
                    <div class="analytics-number">${data.totalWatched}</div>
                </div>
                <div class="analytics-card">
                    <h3>Любимый спорт</h3>
                    <div class="analytics-text">${data.favoriteSport}</div>
                </div>
                <div class="analytics-card">
                    <h3>Уровень</h3>
                    <div class="analytics-number">${data.level}</div>
                </div>
                <div class="analytics-card">
                    <h3>Достижения</h3>
                    <div class="analytics-number">${data.achievements}</div>
                </div>
            </div>
        `;
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.nebulaSports = new NebulaSports();
});

// Глобальные функции для совместимости
function loadSports() {
    if (window.nebulaSports) {
        window.nebulaSports.loadSports();
    }
}

function loadNews() {
    if (window.nebulaSports) {
        window.nebulaSports.loadNews();
    }
}

function openStream(sportId) {
    if (window.nebulaSports) {
        window.nebulaSports.openStream(sportId);
    }
}
