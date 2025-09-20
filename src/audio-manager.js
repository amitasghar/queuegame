// Audio management for different queue themes
import { gameConfig } from './config.js';

export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.currentTheme = 'basic';
        this.isMuted = false;
        this.volume = gameConfig.audio.soundEffectsVolume;
        this.backgroundMusic = null;
        this.isBackgroundMusicPlaying = false;

        // Audio file mappings (placeholder - actual files would need to be added)
        this.themeAudio = {
            basic: {
                background: './assets/sounds/basic-ambient.mp3',
                beep: './assets/sounds/basic-beep.mp3',
                notification: './assets/sounds/basic-notification.mp3'
            },
            fancy: {
                background: './assets/sounds/elevator-music.mp3',
                beep: './assets/sounds/fancy-chime.mp3',
                notification: './assets/sounds/reception-bell.mp3'
            },
            action: {
                background: './assets/sounds/action-music.mp3',
                beep: './assets/sounds/military-beep.mp3',
                notification: './assets/sounds/explosion.mp3'
            },
            space: {
                background: './assets/sounds/space-ambient.mp3',
                beep: './assets/sounds/space-beep.mp3',
                notification: './assets/sounds/alien-sound.mp3'
            },
            battle: {
                background: './assets/sounds/battle-music.mp3',
                beep: './assets/sounds/battle-horn.mp3',
                notification: './assets/sounds/victory-sound.mp3'
            },
            mystical: {
                background: './assets/sounds/mystical-ambient.mp3',
                beep: './assets/sounds/meditation-bell.mp3',
                notification: './assets/sounds/mystical-chime.mp3'
            },
            infinite: {
                background: './assets/sounds/matrix-ambient.mp3',
                beep: './assets/sounds/glitch-beep.mp3',
                notification: './assets/sounds/digital-noise.mp3'
            }
        };
    }

    async init() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Load initial theme sounds
            await this.loadThemeSounds('basic');

            // Start loading background music asynchronously (non-blocking)
            this.loadDefaultBackgroundMusic().catch(error => {
                console.warn('Background music failed to load:', error);
            });

            console.log('Audio Manager initialized');
            return true;
        } catch (error) {
            console.warn('Audio initialization failed:', error);
            return false;
        }
    }

    async loadThemeSounds(theme) {
        if (!this.themeAudio[theme]) return;

        const themeData = this.themeAudio[theme];

        try {
            // For now, we'll create placeholder audio objects
            // In a real implementation, you'd load actual audio files
            this.sounds[theme] = {
                background: this.createPlaceholderAudio('background', theme),
                beep: this.createPlaceholderAudio('beep', theme),
                notification: this.createPlaceholderAudio('notification', theme)
            };

            console.log(`Audio loaded for theme: ${theme}`);
        } catch (error) {
            console.warn(`Failed to load audio for theme ${theme}:`, error);
        }
    }

    createPlaceholderAudio(type, theme) {
        // Create a placeholder audio object that won't crash if files don't exist
        return {
            play: () => {
                console.log(`[Audio] Playing ${type} sound for ${theme} theme`);
                // In a real implementation, this would play actual audio
            },
            stop: () => {
                console.log(`[Audio] Stopping ${type} sound for ${theme} theme`);
            },
            setVolume: (vol) => {
                console.log(`[Audio] Setting ${type} volume to ${vol}`);
            }
        };
    }

    async setTheme(theme) {
        if (theme === this.currentTheme) return;

        console.log(`Switching audio theme from ${this.currentTheme} to ${theme}`);

        // Stop current background music
        if (this.sounds[this.currentTheme]?.background) {
            this.sounds[this.currentTheme].background.stop();
        }

        this.currentTheme = theme;

        // Load new theme if not already loaded
        if (!this.sounds[theme]) {
            await this.loadThemeSounds(theme);
        }

        // Start new background music
        if (!this.isMuted && this.sounds[theme]?.background) {
            this.sounds[theme].background.play();
        }
    }

    playSound(soundType) {
        if (this.isMuted) return;

        const themeSound = this.sounds[this.currentTheme]?.[soundType];
        if (themeSound) {
            themeSound.setVolume(this.volume);
            themeSound.play();
        }
    }

    // Specific sound triggers
    playPositionUpdate() {
        this.playSound('beep');
    }

    playQueueEvent() {
        this.playSound('notification');
    }

    playQueueComplete() {
        // Play a special completion sound
        this.playSound('notification');
        setTimeout(() => {
            this.playSound('beep');
        }, 500);
    }

    playAchievement() {
        // Achievement unlock sound
        this.playSound('notification');
    }

    // Background music controls
    async loadDefaultBackgroundMusic() {
        try {
            if (this.backgroundMusic) {
                this.backgroundMusic.pause();
                this.backgroundMusic = null;
            }

            // Create audio element for background music with lazy loading
            this.backgroundMusic = new Audio();
            this.backgroundMusic.preload = 'none'; // Don't preload - faster initial load
            this.backgroundMusic.loop = true;
            this.backgroundMusic.volume = gameConfig.audio.backgroundMusicVolume;
            this.backgroundMusic.src = gameConfig.audio.backgroundMusicFile;

            console.log('Background music configured (will load when played)');
            return true;
        } catch (error) {
            console.warn('Failed to configure background music:', error);
            return false;
        }
    }

    // Enhanced play method that loads music on demand
    async ensureMusicLoaded() {
        if (!this.backgroundMusic) return false;

        // If music isn't loaded yet, load it now
        if (this.backgroundMusic.readyState === 0) {
            console.log('Loading background music...');
            try {
                await new Promise((resolve, reject) => {
                    this.backgroundMusic.oncanplaythrough = resolve;
                    this.backgroundMusic.onerror = reject;
                    this.backgroundMusic.load();
                });
                console.log('Background music loaded successfully');
            } catch (error) {
                console.warn('Failed to load background music:', error);
                return false;
            }
        }
        return true;
    }

    async playBackgroundMusic() {
        if (!this.backgroundMusic || this.isMuted) return;

        // Ensure music is loaded before playing
        const loaded = await this.ensureMusicLoaded();
        if (!loaded) return;

        try {
            await this.backgroundMusic.play();
            this.isBackgroundMusicPlaying = true;
            console.log('Background music started');
        } catch (error) {
            console.warn('Failed to play background music:', error);
        }
    }

    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.isBackgroundMusicPlaying = false;
        }
    }

    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
            this.isBackgroundMusicPlaying = false;
        }
    }

    // Volume and mute controls
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));

        // Update all current sounds
        Object.values(this.sounds).forEach(themeSounds => {
            Object.values(themeSounds).forEach(sound => {
                sound.setVolume(this.volume);
            });
        });

        // Update background music volume
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = gameConfig.audio.backgroundMusicVolume;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;

        if (this.isMuted) {
            // Stop all sounds
            Object.values(this.sounds).forEach(themeSounds => {
                Object.values(themeSounds).forEach(sound => {
                    sound.stop();
                });
            });
            // Pause background music
            this.pauseBackgroundMusic();
        } else {
            // Resume background music for current theme
            if (this.sounds[this.currentTheme]?.background) {
                this.sounds[this.currentTheme].background.play();
            }
            // Resume background music if it was playing
            if (this.backgroundMusic && this.isBackgroundMusicPlaying) {
                this.playBackgroundMusic();
            }
        }

        console.log(`Audio ${this.isMuted ? 'muted' : 'unmuted'}`);
        return this.isMuted;
    }

    // Create audio controls UI
    createAudioControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            background: var(--secondary-bg);
            padding: 10px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            z-index: 100;
        `;

        // Mute button
        const muteButton = document.createElement('button');
        muteButton.innerHTML = this.isMuted ? '🔇' : '🔊';
        muteButton.style.cssText = `
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        `;

        muteButton.addEventListener('click', () => {
            const muted = this.toggleMute();
            muteButton.innerHTML = muted ? '🔇' : '🔊';
        });

        // Volume slider
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '1';
        volumeSlider.step = '0.1';
        volumeSlider.value = this.volume;
        volumeSlider.style.cssText = `
            width: 80px;
            accent-color: var(--accent-color);
        `;

        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(parseFloat(e.target.value));
        });

        controlsContainer.appendChild(muteButton);
        controlsContainer.appendChild(volumeSlider);

        document.body.appendChild(controlsContainer);

        return controlsContainer;
    }

    // Cleanup
    destroy() {
        if (this.audioContext) {
            this.audioContext.close();
        }

        Object.values(this.sounds).forEach(themeSounds => {
            Object.values(themeSounds).forEach(sound => {
                sound.stop();
            });
        });
    }
}