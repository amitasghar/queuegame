// Theme management for different queue levels
export class ThemeManager {
    constructor() {
        this.currentTheme = 'basic';
        this.themes = {
            basic: {
                name: 'Basic Terminal',
                description: 'Classic green-on-black queue experience',
                className: 'theme-basic'
            },
            fancy: {
                name: 'Corporate Premium',
                description: 'Sophisticated waiting for sophisticated people',
                className: 'theme-fancy'
            },
            action: {
                name: 'Military Operation',
                description: 'High-stakes queue combat zone',
                className: 'theme-action'
            },
            space: {
                name: 'Galactic Queue',
                description: 'Waiting among the stars',
                className: 'theme-space'
            },
            battle: {
                name: 'Queue Royale',
                description: 'Battle for queue supremacy',
                className: 'theme-battle'
            },
            mystical: {
                name: 'Zen Enlightenment',
                description: 'Find peace through infinite waiting',
                className: 'theme-mystical'
            },
            infinite: {
                name: 'Matrix Protocol',
                description: 'Welcome to the infinite loop',
                className: 'theme-infinite'
            }
        };

        this.transitionDuration = 1000; // 1 second
    }

    init() {
        // Apply default theme
        this.applyTheme('basic');
        console.log('Theme Manager initialized');
    }

    setTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`Theme '${themeName}' not found`);
            return;
        }

        if (themeName === this.currentTheme) {
            return; // Already using this theme
        }

        console.log(`Switching theme from '${this.currentTheme}' to '${themeName}'`);

        // Add transition class
        document.body.classList.add('theme-transition');

        // Apply new theme after a brief delay for transition effect
        setTimeout(() => {
            this.applyTheme(themeName);

            // Remove transition class after transition completes
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, this.transitionDuration);

        }, this.transitionDuration / 4);
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        // Remove all existing theme classes
        Object.values(this.themes).forEach(t => {
            document.body.classList.remove(t.className);
        });

        // Apply new theme class
        document.body.classList.add(theme.className);

        // Update queue title and description if elements exist
        this.updateQueueTitle(themeName);

        this.currentTheme = themeName;
    }

    updateQueueTitle(themeName) {
        const titleElement = document.getElementById('queue-title');
        const messageElement = document.getElementById('queue-message');

        if (titleElement && messageElement) {
            const theme = this.themes[themeName];

            // Update title based on theme
            switch (themeName) {
                case 'basic':
                    titleElement.textContent = 'Queue Game';
                    messageElement.textContent = 'Welcome to the queue! Please wait patiently.';
                    break;
                case 'fancy':
                    titleElement.textContent = 'Queue Game 2: The Queuening';
                    messageElement.textContent = 'Thank you for choosing our premium waiting experience.';
                    break;
                case 'action':
                    titleElement.textContent = 'QUEUE GAME 3: QUEUE HARD';
                    messageElement.textContent = 'PREPARE FOR EXTREME QUEUE COMBAT!';
                    break;
                case 'space':
                    titleElement.textContent = 'Queue Game 4: Queue Wars';
                    messageElement.textContent = 'Intergalactic queue protocols engaged...';
                    break;
                case 'battle':
                    titleElement.textContent = 'Queue Game 5: Queue Royale';
                    messageElement.textContent = 'Battle for position supremacy has begun!';
                    break;
                case 'mystical':
                    titleElement.textContent = 'Queue Game 6: The Queue Awakens';
                    messageElement.textContent = 'Find enlightenment through the art of waiting...';
                    break;
                case 'infinite':
                    titleElement.textContent = 'Queue Game ∞';
                    messageElement.textContent = 'W3LC0M3 T0 TH3 1NF1N1T3 L00P...';
                    break;
            }
        }
    }

    getCurrentTheme() {
        return this.themes[this.currentTheme];
    }

    getThemeInfo(themeName) {
        return this.themes[themeName] || null;
    }

    getAllThemes() {
        return { ...this.themes };
    }

    // Add particle effects for certain themes
    addParticleEffects(themeName) {
        this.clearParticleEffects();

        switch (themeName) {
            case 'space':
                this.createStarField();
                break;
            case 'mystical':
                this.createFloatingOrbs();
                break;
            case 'infinite':
                this.createMatrixRain();
                break;
        }
    }

    clearParticleEffects() {
        const existingParticles = document.querySelectorAll('.particle');
        existingParticles.forEach(particle => particle.remove());

        // Clear any existing particle intervals
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
        }
    }

    createStarField() {
        const createStar = () => {
            const star = document.createElement('div');
            star.className = 'particle star';
            star.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: #ffffff;
                border-radius: 50%;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                animation: twinkle 2s infinite;
                pointer-events: none;
                z-index: -1;
            `;
            document.body.appendChild(star);

            // Remove after animation
            setTimeout(() => star.remove(), 4000);
        };

        // Create initial stars
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createStar(), i * 100);
        }

        // Continue creating stars
        this.particleInterval = setInterval(createStar, 500);
    }

    createFloatingOrbs() {
        const createOrb = () => {
            const orb = document.createElement('div');
            orb.className = 'particle orb';
            orb.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #daa520, transparent);
                border-radius: 50%;
                bottom: -10px;
                left: ${Math.random() * 100}vw;
                animation: floatUp 8s linear infinite;
                pointer-events: none;
                z-index: -1;
                opacity: 0.7;
            `;
            document.body.appendChild(orb);

            setTimeout(() => orb.remove(), 8000);
        };

        this.particleInterval = setInterval(createOrb, 1000);
    }

    createMatrixRain() {
        const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        const createCharacter = () => {
            const char = document.createElement('div');
            char.className = 'particle matrix-char';
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.cssText = `
                position: fixed;
                color: #00ff41;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                top: -20px;
                left: ${Math.random() * 100}vw;
                animation: matrixFall 3s linear infinite;
                pointer-events: none;
                z-index: -1;
                opacity: 0.8;
            `;
            document.body.appendChild(char);

            setTimeout(() => char.remove(), 3000);
        };

        this.particleInterval = setInterval(createCharacter, 100);
    }

    // CSS animation keyframes (these would be better in CSS, but for completeness)
    addAnimationStyles() {
        if (document.getElementById('theme-animations')) return;

        const style = document.createElement('style');
        style.id = 'theme-animations';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }

            @keyframes floatUp {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.7; }
                90% { opacity: 0.7; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }

            @keyframes matrixFall {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;

        document.head.appendChild(style);
    }

    // Initialize particle effects when setting theme
    setThemeWithEffects(themeName) {
        this.setTheme(themeName);

        // Add particle effects after theme transition
        setTimeout(() => {
            this.addParticleEffects(themeName);
        }, this.transitionDuration);
    }

    destroy() {
        this.clearParticleEffects();

        // Remove animation styles
        const animationStyles = document.getElementById('theme-animations');
        if (animationStyles) {
            animationStyles.remove();
        }
    }
}