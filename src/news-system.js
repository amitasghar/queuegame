// News System - Rotating news feed display
import { gameConfig } from './config.js';
import { newsFeed, getRecentNews } from './news-feed.js';

export class NewsSystem {
    constructor() {
        this.newsItems = [];
        this.currentNewsIndex = 0;
        this.newsElement = null;
        this.rotationInterval = null;
        this.isActive = false;
    }

    async init() {
        this.newsElement = document.getElementById('news-ticker');
        if (!this.newsElement) {
            console.warn('News ticker element not found');
            return;
        }

        // Load news items
        this.loadNews();

        if (this.newsItems.length > 0) {
            this.showCurrentNews();

            if (gameConfig.news.autoStart) {
                this.startRotation();
            }
        } else {
            console.log('No news items available');
        }

        console.log(`News system initialized with ${this.newsItems.length} items`);
    }

    loadNews() {
        // Load recent news items up to the configured maximum
        this.newsItems = getRecentNews(gameConfig.news.maxItems);

        if (gameConfig.ui.showDebugLogs) {
            console.log(`Loaded ${this.newsItems.length} news items`);
        }
    }

    showCurrentNews() {
        if (!this.newsElement || this.newsItems.length === 0) return;

        const newsItem = this.newsItems[this.currentNewsIndex];

        // Add fade out animation if enabled
        if (gameConfig.news.fadeTransition) {
            this.newsElement.classList.add('news-fading-out');
        }

        setTimeout(() => {
            this.displayNewsItem(newsItem);

            // Add fade in animation
            if (gameConfig.news.fadeTransition) {
                this.newsElement.classList.remove('news-fading-out');
                this.newsElement.classList.add('news-fading-in');

                setTimeout(() => {
                    this.newsElement.classList.remove('news-fading-in');
                }, 300);
            }
        }, gameConfig.news.fadeTransition ? 200 : 0);
    }

    displayNewsItem(newsItem) {
        if (!newsItem) return;

        const timeAgo = this.getTimeAgo(newsItem.timestamp);
        const categoryIcon = this.getCategoryIcon(newsItem.category);

        this.newsElement.innerHTML = `
            <div class="news-item" style="
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 15px;
                background: rgba(42, 42, 42, 0.8);
                border-left: 4px solid var(--accent-color);
                border-radius: 6px;
            ">
                <div class="news-icon" style="
                    font-size: 1.2em;
                    margin-top: 2px;
                    min-width: 20px;
                ">${categoryIcon}</div>

                <div class="news-content" style="flex: 1;">
                    <div class="news-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 8px;
                        gap: 10px;
                    ">
                        <h4 class="news-title" style="
                            color: var(--accent-color);
                            margin: 0;
                            font-size: 1em;
                            font-weight: bold;
                            line-height: 1.3;
                            flex: 1;
                        ">${newsItem.title}</h4>

                        ${gameConfig.news.showTimestamp ? `
                            <span class="news-time" style="
                                color: var(--text-secondary);
                                font-size: 0.8em;
                                white-space: nowrap;
                                margin-top: 2px;
                            ">${timeAgo}</span>
                        ` : ''}
                    </div>

                    <p class="news-text" style="
                        color: var(--text-primary);
                        margin: 0;
                        line-height: 1.4;
                        font-size: 0.9em;
                    ">${newsItem.content}</p>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            milestone: '🏆',
            product: '📦',
            community: '👥',
            health: '💊',
            technology: '⚙️',
            lifestyle: '💝',
            science: '🔬',
            business: '💼',
            education: '🎓',
            wellness: '🧘',
            politics: '🏛️',
            gaming: '🎮',
            general: '📰'
        };
        return icons[category] || icons.general;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const newsDate = new Date(timestamp);
        const diffMs = now - newsDate;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffDays > 0) {
            return `${diffDays}d ago`;
        } else if (diffHours > 0) {
            return `${diffHours}h ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes}m ago`;
        } else {
            return 'Just now';
        }
    }

    nextNews() {
        this.currentNewsIndex = (this.currentNewsIndex + 1) % this.newsItems.length;
        this.showCurrentNews();
    }

    previousNews() {
        this.currentNewsIndex = (this.currentNewsIndex - 1 + this.newsItems.length) % this.newsItems.length;
        this.showCurrentNews();
    }

    startRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }

        this.isActive = true;
        this.rotationInterval = setInterval(() => {
            this.nextNews();
        }, gameConfig.news.rotationIntervalMs);

        if (gameConfig.ui.showDebugLogs) {
            console.log(`News rotation started (${gameConfig.news.rotationIntervalMs}ms interval)`);
        }
    }

    stopRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        this.isActive = false;

        if (gameConfig.ui.showDebugLogs) {
            console.log('News rotation stopped');
        }
    }

    refreshNews() {
        this.stopRotation();
        this.loadNews();

        if (this.newsItems.length > 0) {
            this.currentNewsIndex = 0;
            this.showCurrentNews();
            this.startRotation();
        }

        console.log('News feed refreshed');
    }

    destroy() {
        this.stopRotation();
        if (this.newsElement) {
            this.newsElement.innerHTML = '';
        }
    }
}