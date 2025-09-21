// Entry point for Queue Game
import { QueueSimulator } from './queue-engine.js';
import { AdSystem } from './ad-system.js';
import { AudioManager } from './audio-manager.js';
import { AchievementSystem } from './achievement-system.js';
import { ThemeManager } from './theme-manager.js';
import { NewsSystem } from './news-system.js';
import { gameConfig } from './config.js';

class Game {
    constructor() {
        this.queueSimulator = new QueueSimulator();
        this.adSystem = new AdSystem();
        this.audioManager = new AudioManager();
        this.achievementSystem = new AchievementSystem();
        this.themeManager = new ThemeManager();
        this.newsSystem = new NewsSystem();

        this.isInitialized = false;

        // Cheat code system
        this.cheatBuffer = '';
        this.cheatCodes = {
            'iddqd': () => this.activateCheat()
        };

        // Game state for focus/blur handling
        this.isPaused = false;
        this.wasPlayingMusic = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // Initialize all systems
            await this.audioManager.init();
            await this.adSystem.init();
            await this.newsSystem.init();
            this.achievementSystem.init();
            this.themeManager.init();

            // Bind start screen
            this.bindStartScreen();

            // Set up window focus/blur handling
            this.setupFocusHandling();

            this.isInitialized = true;
            console.log('Queue Game initialized successfully - waiting for user to start');
        } catch (error) {
            console.error('Failed to initialize Queue Game:', error);
        }
    }

    bindStartScreen() {
        const playButton = document.getElementById('play-button');
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.startGame();
            });
        }

        // Contact button on start screen
        document.getElementById('contact-button')?.addEventListener('click', () => {
            this.openContactEmail();
        });
    }

    startGame() {
        // Hide start screen
        const startScreen = document.getElementById('start-screen');
        const queueContainer = document.getElementById('queue-container');

        if (startScreen && queueContainer) {
            startScreen.style.display = 'none';
            queueContainer.style.display = 'block';
        }

        // Start background music if loaded
        this.audioManager.playBackgroundMusic();

        // Create enhanced audio controls
        this.audioControls = this.audioManager.createAudioControls();

        // Initialize queue simulator
        this.queueSimulator.init();

        // Bind events
        this.bindEvents();

        // Start the game loop
        this.startGameLoop();

        // Initialize displays
        this.updatePositionDisplay(this.queueSimulator.state.position);
        this.updateWaitTimeDisplay(this.queueSimulator.state.waitTime);
        this.updateAchievementDisplay();

        // Bind cheat codes after game starts
        this.bindCheatCodes();

        console.log('Game started!');
    }

    bindEvents() {
        // Handle queue progression
        this.queueSimulator.on('positionChanged', (position) => {
            this.updatePositionDisplay(position);
        });

        this.queueSimulator.on('waitTimeChanged', (waitTime) => {
            this.updateWaitTimeDisplay(waitTime);
        });

        this.queueSimulator.on('queueCompleted', (nextQueue) => {
            this.handleQueueCompletion(nextQueue);
        });

        this.queueSimulator.on('queueEvent', (eventData) => {
            this.handleQueueEvent(eventData);
        });

        this.queueSimulator.on('showCompletionScreen', (completedQueue) => {
            this.showQueueCompletionScreen(completedQueue);
        });


        // Handle achievements
        this.achievementSystem.on('achievementUnlocked', (achievement) => {
            this.updateAchievementDisplay();
        });

        // Bind UI controls
        this.bindUIControls();

        // Make achievement system globally accessible for ad clicks
        window.gameAchievements = this.achievementSystem;
    }

    bindUIControls() {
        // Share button
        document.getElementById('share-button')?.addEventListener('click', () => {
            this.achievementSystem.triggerShare();
        });

        // Premium button (fake purchase)
        document.getElementById('premium-button')?.addEventListener('click', () => {
            const result = this.queueSimulator.buyQueueSkip();
            this.showPremiumResult(result);
        });


        // Config button - show enhanced audio controls
        document.getElementById('config-button')?.addEventListener('click', () => {
            this.toggleAudioControls();
        });

        // Reset button
        document.getElementById('reset-button')?.addEventListener('click', () => {
            this.showResetConfirmation();
        });

        // Contact button in game
        document.getElementById('contact-button-game')?.addEventListener('click', () => {
            this.openContactEmail();
        });
    }

    startGameLoop() {
        // Main game loop - updates position, ads, etc.
        const gameLoop = () => {
            this.queueSimulator.update();
            this.adSystem.update();

            requestAnimationFrame(gameLoop);
        };

        gameLoop();
    }

    updatePositionDisplay(position) {
        const positionElement = document.getElementById('current-position');
        if (positionElement) {
            positionElement.textContent = position.toLocaleString();
        }
    }

    updateWaitTimeDisplay(waitTime) {
        const waitTimeElement = document.getElementById('current-wait-time');
        if (waitTimeElement) {
            waitTimeElement.textContent = waitTime;
        }
    }


    handleQueueCompletion(nextQueue) {
        console.log(`Queue completed! Moving to: ${nextQueue.name}`);
        this.themeManager.setTheme(nextQueue.theme);
        this.achievementSystem.checkAchievements('queueCompleted', nextQueue);
    }

    handleQueueEvent(eventData) {
        console.log('Queue event:', eventData);
        this.achievementSystem.checkAchievements('queueEvent', eventData);
    }


    updateAchievementDisplay() {
        const unlockedCount = this.achievementSystem.getUnlockedAchievements().length;
        const totalCount = Object.keys(this.achievementSystem.achievements).length;

        const countElement = document.getElementById('achievement-count');
        if (countElement) {
            countElement.textContent = `(${unlockedCount}/${totalCount})`;
        }

        // Display all achievements with their status
        const achievementsList = document.getElementById('achievements-list');
        if (achievementsList) {
            achievementsList.innerHTML = ''; // Clear existing

            Object.values(this.achievementSystem.achievements).forEach(achievement => {
                const achievementElement = document.createElement('div');
                achievementElement.className = achievement.unlocked ? 'achievement-item unlocked' : 'achievement-item locked';
                achievementElement.title = achievement.description;
                achievementElement.textContent = achievement.unlocked ? `✓ ${achievement.name}` : `○ ${achievement.name}`;
                achievementsList.appendChild(achievementElement);
            });
        }

        // Update statistics
        this.updateStatistics();
    }

    updateStatistics() {
        const stats = this.achievementSystem.stats;

        document.getElementById('stat-queues').textContent = stats.queuesCompleted;
        document.getElementById('stat-events').textContent = stats.queueEvents;
        document.getElementById('stat-clicks').textContent = stats.adClicks;

        // Format total wait time
        const totalMinutes = Math.floor(stats.totalWaitTime / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        let timeText = '';
        if (hours > 0) {
            timeText = `${hours}h ${minutes}m`;
        } else {
            timeText = `${minutes}m`;
        }

        document.getElementById('stat-time').textContent = timeText;
    }

    showPremiumResult(result) {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffd700, #ffaa00);
            color: #000;
            border: 3px solid #ffaa00;
            padding: 25px;
            border-radius: 12px;
            z-index: 1000;
            text-align: center;
            max-width: 350px;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
            font-weight: bold;
        `;

        popup.innerHTML = `
            <h3 style="margin-bottom: 15px; color: #000;">💎 Queue Skip Pro™</h3>
            <p style="margin-bottom: 15px;">${result.message}</p>
            <p style="font-size: 0.8em; font-style: italic; margin-bottom: 20px;">
                Processing payment... Optimizing queue position...
            </p>
            <button style="
                padding: 10px 20px;
                background: #000;
                color: #ffd700;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-family: inherit;
                font-weight: bold;
            ">OK</button>
        `;

        document.body.appendChild(popup);

        const closePopup = () => popup.remove();
        popup.querySelector('button').addEventListener('click', closePopup);
        setTimeout(closePopup, 5000);
    }

    showResetConfirmation() {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 2px solid #ff4444;
            padding: 25px;
            border-radius: 8px;
            z-index: 1000;
            text-align: center;
            max-width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `;

        popup.innerHTML = `
            <h3 style="color: #ff4444; margin-bottom: 15px;">⚠️ Reset Progress</h3>
            <p style="margin-bottom: 20px;">Are you sure you want to reset all progress? This will:</p>
            <ul style="text-align: left; margin-bottom: 20px; color: var(--text-secondary);">
                <li>Reset your queue position</li>
                <li>Clear all achievements</li>
                <li>Reset statistics</li>
                <li>Clear saved progress</li>
            </ul>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="confirm-reset" style="
                    padding: 8px 16px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: inherit;
                ">Reset</button>
                <button id="cancel-reset" style="
                    padding: 8px 16px;
                    background: var(--border-color);
                    color: var(--text-primary);
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: inherit;
                ">Cancel</button>
            </div>
        `;

        document.body.appendChild(popup);

        const closePopup = () => popup.remove();

        popup.querySelector('#confirm-reset').addEventListener('click', () => {
            this.resetAllProgress();
            closePopup();
        });

        popup.querySelector('#cancel-reset').addEventListener('click', closePopup);
    }

    async resetAllProgress() {
        // First destroy the current queue simulator
        this.queueSimulator.destroy();

        // Clear all localStorage data BEFORE creating new instances
        localStorage.removeItem('queueSimulatorState');
        localStorage.removeItem('queueSimulatorAchievements');

        // Also clear any other potential queue-related localStorage items
        Object.keys(localStorage).forEach(key => {
            if (key.toLowerCase().includes('queue')) {
                localStorage.removeItem(key);
            }
        });

        // Reset achievement system
        this.achievementSystem.resetProgress();

        // Create fresh queue simulator (which will now load clean state)
        const { QueueSimulator } = await import('./queue-engine.js');
        this.queueSimulator = new QueueSimulator();

        // Force queue to start at level 1
        this.queueSimulator.state.currentQueue = 1;
        this.queueSimulator.state.position = Math.floor(Math.random() * (gameConfig.queue.initialPositionMax - gameConfig.queue.initialPositionMin)) + gameConfig.queue.initialPositionMin;
        this.queueSimulator.state.waitTime = this.queueSimulator.calculateFakeWaitTime();

        this.queueSimulator.init();

        console.log('Reset complete - Queue level:', this.queueSimulator.state.currentQueue, 'Position:', this.queueSimulator.state.position);

        // Reset theme
        this.themeManager.setTheme('basic');

        // Clear achievements display
        const achievementsList = document.getElementById('achievements-list');
        if (achievementsList) {
            achievementsList.innerHTML = '';
        }

        // Update displays
        this.updateAchievementDisplay();
        this.updatePositionDisplay(this.queueSimulator.state.position);
        this.updateWaitTimeDisplay(this.queueSimulator.state.waitTime);

        // Re-bind events
        this.bindEvents();

        console.log('All progress reset');
    }

    showConfigPanel() {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 2px solid var(--accent-color);
            padding: 25px;
            border-radius: 12px;
            z-index: 1000;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `;

        const musicStatus = this.audioManager.isBackgroundMusicPlaying ? 'ON' : 'OFF';
        const musicStatusColor = this.audioManager.isBackgroundMusicPlaying ? 'var(--accent-color)' : 'var(--text-secondary)';
        const musicBlocked = localStorage.getItem('musicBlocked') === 'true';

        popup.innerHTML = `
            <h3 style="color: var(--accent-color); margin-bottom: 20px; text-align: center;">🎵 Music Settings</h3>

            <div style="margin-bottom: 25px; text-align: center;">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 10px; color: var(--text-primary); font-size: 1.1em;">Background Music:</label>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px;">
                        <button id="music-toggle" style="
                            padding: 10px 20px;
                            background: ${this.audioManager.isBackgroundMusicPlaying ? 'var(--accent-color)' : 'transparent'};
                            color: ${this.audioManager.isBackgroundMusicPlaying ? 'var(--primary-bg)' : 'var(--accent-color)'};
                            border: 2px solid var(--accent-color);
                            border-radius: 6px;
                            cursor: pointer;
                            font-family: inherit;
                            font-weight: bold;
                            font-size: 16px;
                            transition: all 0.2s ease;
                        ">${this.audioManager.isBackgroundMusicPlaying ? '🎵 ON' : '🔇 OFF'}</button>
                    </div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">
                        Status: <span style="color: ${musicStatusColor}; font-weight: bold;">${musicStatus}</span>
                        ${musicBlocked ? '<br><span style="color: #ff6b6b;">⚠️ Click button to enable music</span>' : ''}
                    </div>
                </div>

                <div>
                    <label style="display: block; margin-bottom: 10px; color: var(--text-primary); font-size: 1.1em;">Volume:</label>
                    <input type="range" id="config-music-volume" value="${window.gameConfig.audio.backgroundMusicVolume}"
                           min="0" max="1" step="0.1" style="width: 100%; margin-bottom: 10px;">
                    <span style="color: var(--accent-color); font-size: 1.2em; font-weight: bold;">${Math.round(window.gameConfig.audio.backgroundMusicVolume * 100)}%</span>
                </div>
            </div>

            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="close-config" style="
                    padding: 10px 25px;
                    background: var(--accent-color);
                    color: var(--primary-bg);
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: inherit;
                    font-weight: bold;
                ">Close</button>
            </div>
        `;

        document.body.appendChild(popup);

        // Music toggle functionality
        const musicToggleButton = popup.querySelector('#music-toggle');
        musicToggleButton.addEventListener('click', async () => {
            if (this.audioManager.isBackgroundMusicPlaying) {
                // Turn music OFF
                this.audioManager.pauseBackgroundMusic();
                musicToggleButton.innerHTML = '🔇 OFF';
                musicToggleButton.style.background = 'transparent';
                musicToggleButton.style.color = 'var(--accent-color)';

                // Update status text
                const statusSpan = popup.querySelector('span[style*="font-weight: bold"]');
                if (statusSpan) {
                    statusSpan.textContent = 'OFF';
                    statusSpan.style.color = 'var(--text-secondary)';
                }
            } else {
                // Turn music ON
                console.log('User manually requested music - attempting to play');

                // Clear any blocked state since this is user-initiated
                localStorage.removeItem('musicBlocked');

                const success = await this.audioManager.playBackgroundMusic();

                if (success) {
                    musicToggleButton.innerHTML = '🎵 ON';
                    musicToggleButton.style.background = 'var(--accent-color)';
                    musicToggleButton.style.color = 'var(--primary-bg)';

                    // Update status text
                    const statusSpan = popup.querySelector('span[style*="font-weight: bold"]');
                    if (statusSpan) {
                        statusSpan.textContent = 'ON';
                        statusSpan.style.color = 'var(--accent-color)';
                    }

                    // Remove any warning message
                    const warningSpan = popup.querySelector('span[style*="#ff6b6b"]');
                    if (warningSpan) {
                        warningSpan.remove();
                    }
                } else {
                    // Show feedback that it failed
                    musicToggleButton.innerHTML = '❌ Blocked';
                    setTimeout(() => {
                        musicToggleButton.innerHTML = '🔇 OFF';
                    }, 2000);
                }
            }

            // Update enhanced audio controls if they exist
            if (this.audioManager.musicStatusIndicator) {
                this.audioManager.updateMusicStatus(this.audioManager.musicStatusIndicator);
            }
            if (this.audioManager.musicToggleButton) {
                this.audioManager.musicToggleButton.style.opacity = this.audioManager.isBackgroundMusicPlaying ? '1' : '0.5';
            }
        });

        // Update volume display in real-time and apply changes immediately
        const musicVolumeSlider = popup.querySelector('#config-music-volume');

        musicVolumeSlider.addEventListener('input', (e) => {
            const span = e.target.nextElementSibling;
            span.textContent = Math.round(e.target.value * 100) + '%';

            // Apply volume change immediately
            window.updateConfig('audio', 'backgroundMusicVolume', parseFloat(e.target.value));
            if (this.audioManager.backgroundMusic) {
                this.audioManager.backgroundMusic.volume = parseFloat(e.target.value);
            }
        });

        const closePopup = () => popup.remove();
        popup.querySelector('#close-config').addEventListener('click', closePopup);
    }

    bindCheatCodes() {
        document.addEventListener('keydown', (e) => {
            // Add the pressed key to the buffer
            this.cheatBuffer += e.key.toLowerCase();

            // Keep only the last 10 characters to prevent memory issues
            if (this.cheatBuffer.length > 10) {
                this.cheatBuffer = this.cheatBuffer.slice(-10);
            }

            // Check for cheat codes
            for (const [code, action] of Object.entries(this.cheatCodes)) {
                if (this.cheatBuffer.includes(code)) {
                    this.cheatBuffer = ''; // Clear buffer after activation
                    action();
                    break;
                }
            }
        });
    }

    activateCheat() {
        // Get current queue info before completing
        const currentQueueData = this.queueSimulator.getCurrentQueue();

        // Set position to 0 to trigger natural completion
        this.queueSimulator.state.position = 0;

        // Update the display immediately
        this.updatePositionDisplay(0);

        // Trigger the natural completion sequence (this will call completeQueue)
        this.queueSimulator.updateQueuePosition();

        // Show a brief cheat notification
        this.showCheatMessage();

        console.log(`🎮 CHEAT ACTIVATED: Completed ${currentQueueData.name} instantly`);
    }

    showCheatMessage() {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff0000, #ff6600);
            color: white;
            border: 3px solid #ffaa00;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 3000;
            text-align: center;
            max-width: 250px;
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
            font-weight: bold;
            animation: pulse 0.5s ease-in-out;
        `;

        popup.innerHTML = `
            <div style="font-size: 1em;">🎮 IDDQD ACTIVATED!</div>
            <div style="font-size: 0.8em; margin-top: 5px;">Skipping queue...</div>
        `;

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 2000);
    }

    showQueueCompletionScreen(completedQueue) {
        // Create fullscreen completion overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: var(--text-primary);
            animation: fadeIn 0.5s ease-in;
        `;

        overlay.innerHTML = `
            <div style="max-width: 600px; padding: 40px;">
                <h1 style="color: var(--accent-color); font-size: 3em; margin-bottom: 20px; text-shadow: 0 0 20px var(--accent-color);">
                    🎉 Congratulations!
                </h1>

                <h2 style="font-size: 1.8em; margin-bottom: 30px; color: var(--text-primary);">
                    Thank you for waiting in ${completedQueue.name}!
                </h2>

                <div style="background: var(--secondary-bg); padding: 30px; border-radius: 12px; border: 2px solid var(--accent-color); margin: 30px 0;">
                    <p style="font-size: 1.3em; margin-bottom: 20px; color: var(--accent-color);">
                        🎮 Your patience has been rewarded!
                    </p>
                    <p style="font-size: 1.1em; margin-bottom: 15px;">
                        The game is now loading...
                    </p>
                    <div style="margin: 20px 0;">
                        <div id="loading-bar" style="width: 100%; height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden;">
                            <div id="loading-fill" style="height: 100%; background: var(--accent-color); width: 0%; transition: width 8s ease;"></div>
                        </div>
                    </div>
                    <p style="font-size: 0.9em; color: var(--text-secondary);">
                        Please wait while we prepare your experience...
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Animate loading bar
        setTimeout(() => {
            const loadingFill = overlay.querySelector('#loading-fill');
            loadingFill.style.width = '100%';
        }, 100);

        // After 9 seconds, advance to next queue and remove overlay
        setTimeout(() => {
            this.advanceToNextQueueManual(completedQueue);
            overlay.remove();
        }, 9000);
    }


    advanceToNextQueueManual(completedQueue) {
        // Determine next queue (same logic as queue-engine.js)
        const currentQueueId = this.queueSimulator.state.currentQueue;
        let nextQueueId;

        if (currentQueueId < 6) {
            nextQueueId = currentQueueId + 1;
        } else if (currentQueueId === 6) {
            nextQueueId = 999; // Jump to infinite queue
        } else {
            nextQueueId = 1; // Reset to beginning
        }

        // Update queue simulator state
        this.queueSimulator.state.currentQueue = nextQueueId;
        this.queueSimulator.state.position = Math.floor(Math.random() * (gameConfig.queue.initialPositionMax - gameConfig.queue.initialPositionMin)) + gameConfig.queue.initialPositionMin;
        this.queueSimulator.state.waitTime = this.queueSimulator.calculateFakeWaitTime();
        this.queueSimulator.state.queueTheme = this.queueSimulator.getCurrentQueue().theme;
        this.queueSimulator.state.isActive = true;
        this.queueSimulator.state.isCompleting = false; // Reset completion flag

        // Update displays
        this.updatePositionDisplay(this.queueSimulator.state.position);
        this.updateWaitTimeDisplay(this.queueSimulator.state.waitTime);

        // Update theme
        const newQueueData = this.queueSimulator.getCurrentQueue();
        this.themeManager.setTheme(newQueueData.theme);

        // Check achievements
        this.achievementSystem.checkAchievements('queueLevel', nextQueueId);

        // Save state
        this.queueSimulator.saveState();

        console.log(`Advanced to ${newQueueData.name}`);
    }

    openContactEmail() {
        const email = 'sagarikagames@protonmail.com';
        const subject = 'Queue Game - Contact';
        const body = 'Hello Sagarika Games,\n\nI wanted to reach out about Queue Game.\n\n';

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        try {
            window.open(mailtoLink, '_blank');
        } catch (error) {
            // Fallback - copy email to clipboard
            navigator.clipboard.writeText(email).then(() => {
                this.showContactInfo(email);
            }).catch(() => {
                this.showContactInfo(email);
            });
        }
    }

    showContactInfo(email) {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 3px solid var(--accent-color);
            padding: 30px;
            border-radius: 15px;
            z-index: 1000;
            max-width: 450px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.7);
            text-align: center;
        `;

        popup.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px;">
                <img src="./assets/images/sagarika_games_text.png" alt="Sagarika Games" style="height: 30px; width: auto; filter: drop-shadow(0 0 5px rgba(0, 204, 255, 0.4));">
                <h2 style="color: var(--accent-color); margin: 0; font-size: 1.2em;">Contact Us</h2>
            </div>
            <p style="color: var(--text-primary); margin-bottom: 20px; line-height: 1.6;">
                📧 Email: <strong style="color: var(--accent-color);">${email}</strong><br>
                <small style="color: var(--text-secondary);">Email address copied to clipboard!</small>
            </p>
            <button id="contact-popup-ok" style="
                padding: 12px 25px;
                background: var(--accent-color);
                color: var(--primary-bg);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: inherit;
                font-weight: bold;
                font-size: 1.1em;
                box-shadow: 0 4px 12px rgba(0, 204, 255, 0.4);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">Got it!</button>
        `;

        document.body.appendChild(popup);

        // Close popup when clicking the button or anywhere on popup
        popup.addEventListener('click', () => {
            popup.remove();
        });
    }

    toggleAudioControls() {
        if (this.audioControls) {
            // Toggle visibility of existing controls
            const isVisible = this.audioControls.style.display !== 'none';
            this.audioControls.style.display = isVisible ? 'none' : 'flex';
        } else {
            // Create controls if they don't exist
            this.audioControls = this.audioManager.createAudioControls();
        }
    }

    setupFocusHandling() {
        // Handle window focus/blur for automatic pausing
        window.addEventListener('blur', () => {
            if (!this.isPaused && this.queueSimulator?.state?.isActive) {
                console.log('Window lost focus - pausing game');
                this.pauseGame();
            }
        });

        window.addEventListener('focus', () => {
            if (this.isPaused) {
                console.log('Window gained focus - resuming game');
                this.resumeGame();
            }
        });

        // Also handle document visibility change (more reliable for some browsers)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (!this.isPaused && this.queueSimulator?.state?.isActive) {
                    console.log('Tab hidden - pausing game');
                    this.pauseGame();
                }
            } else {
                if (this.isPaused) {
                    console.log('Tab visible - resuming game');
                    this.resumeGame();
                }
            }
        });
    }

    pauseGame() {
        this.isPaused = true;

        // Pause background music
        this.wasPlayingMusic = this.audioManager.isBackgroundMusicPlaying;
        if (this.wasPlayingMusic) {
            this.audioManager.pauseBackgroundMusic();
        }

        // Pause queue simulator
        if (this.queueSimulator) {
            this.queueSimulator.pause();
        }

        // Pause news system
        if (this.newsSystem) {
            this.newsSystem.pause();
        }

        // Pause ad system
        if (this.adSystem) {
            this.adSystem.pause();
        }

        // Show pause indicator
        this.showPauseIndicator();

        console.log('Game paused');
    }

    resumeGame() {
        this.isPaused = false;

        // Resume background music if it was playing
        if (this.wasPlayingMusic) {
            this.audioManager.playBackgroundMusic();
        }

        // Resume queue simulator
        if (this.queueSimulator) {
            this.queueSimulator.resume();
        }

        // Resume news system
        if (this.newsSystem) {
            this.newsSystem.resume();
        }

        // Resume ad system
        if (this.adSystem) {
            this.adSystem.resume();
        }

        // Hide pause indicator
        this.hidePauseIndicator();

        console.log('Game resumed');
    }

    showPauseIndicator() {
        // Remove existing indicator if present
        this.hidePauseIndicator();

        const indicator = document.createElement('div');
        indicator.id = 'pause-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: var(--accent-color);
            padding: 20px 40px;
            border-radius: 12px;
            border: 2px solid var(--accent-color);
            font-size: 24px;
            font-weight: bold;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 20px rgba(0, 204, 255, 0.5);
        `;
        indicator.innerHTML = `
            ⏸️ Game Paused<br>
            <small style="font-size: 14px; opacity: 0.8;">Switch back to continue waiting</small>
        `;

        document.body.appendChild(indicator);
    }

    hidePauseIndicator() {
        const indicator = document.getElementById('pause-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.gameInstance = game; // Make available globally for debugging
    game.init();
});

// Export for debugging
window.QueueGame = Game;

// Add debugging functions
window.debugAudio = () => {
    const game = window.gameInstance;
    if (game && game.audioManager) {
        console.log('=== Audio Debug Info ===');
        console.log('Audio Manager:', game.audioManager);
        console.log('Background Music:', game.audioManager.backgroundMusic);
        console.log('Is Playing:', game.audioManager.isBackgroundMusicPlaying);
        console.log('Is Muted:', game.audioManager.isMuted);
        console.log('Volume:', game.audioManager.volume);

        if (game.audioManager.backgroundMusic) {
            console.log('Audio Element State:', {
                src: game.audioManager.backgroundMusic.src,
                volume: game.audioManager.backgroundMusic.volume,
                paused: game.audioManager.backgroundMusic.paused,
                readyState: game.audioManager.backgroundMusic.readyState,
                networkState: game.audioManager.backgroundMusic.networkState,
                error: game.audioManager.backgroundMusic.error
            });
        }
    }
};

window.forcePlayMusic = async () => {
    const game = window.gameInstance;
    if (game && game.audioManager) {
        console.log('=== Force Playing Music ===');
        localStorage.removeItem('musicBlocked');
        const result = await game.audioManager.playBackgroundMusic();
        console.log('Play result:', result);
        return result;
    }
};