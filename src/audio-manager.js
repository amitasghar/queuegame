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
        this.wasPlayingBeforeMute = false; // Track music state before muting

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

            // Set up user interaction listeners for audio
            this.setupUserInteractionListeners();

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

            console.log('Background music configured:', {
                src: this.backgroundMusic.src,
                volume: this.backgroundMusic.volume,
                loop: this.backgroundMusic.loop
            });

            // Add error listeners for debugging
            this.backgroundMusic.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                console.error('Audio error details:', {
                    error: this.backgroundMusic.error,
                    networkState: this.backgroundMusic.networkState,
                    readyState: this.backgroundMusic.readyState
                });
            });

            this.backgroundMusic.addEventListener('canplaythrough', () => {
                console.log('Audio can play through');
            });

            this.backgroundMusic.addEventListener('loadstart', () => {
                console.log('Audio load started');
            });

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

            // Store that user has interacted and music can play
            localStorage.setItem('musicEnabled', 'true');
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                console.log('Music blocked by browser autoplay policy - user interaction required');
                localStorage.setItem('musicBlocked', 'true');
            } else {
                console.warn('Failed to play background music:', error);
            }
        }
    }

    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.isBackgroundMusicPlaying = false;

            // Update status display
            if (this.musicStatusIndicator) {
                this.updateMusicStatus(this.musicStatusIndicator);
            }
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
            // Store current music state before muting
            this.wasPlayingBeforeMute = this.isBackgroundMusicPlaying;

            // Stop all sounds
            Object.values(this.sounds).forEach(themeSounds => {
                Object.values(themeSounds).forEach(sound => {
                    sound.stop();
                });
            });
            // Pause background music
            this.pauseBackgroundMusic();

            console.log('Audio muted, was playing before:', this.wasPlayingBeforeMute);
        } else {
            // Resume background music for current theme
            if (this.sounds[this.currentTheme]?.background) {
                this.sounds[this.currentTheme].background.play();
            }

            // When unmuting, always try to start music (whether it was playing before or not)
            if (this.backgroundMusic) {
                console.log('Starting background music after unmute');
                // Clear any blocked state since this is user-initiated
                localStorage.removeItem('musicBlocked');
                this.playBackgroundMusic();
            } else {
                console.log('No background music available to start');
            }
        }

        // Update status display if it exists
        if (this.musicStatusIndicator) {
            this.updateMusicStatus(this.musicStatusIndicator);
        }

        console.log(`Audio ${this.isMuted ? 'muted' : 'unmuted'}`);
        return this.isMuted;
    }

    // Create enhanced audio controls UI
    createAudioControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: var(--secondary-bg);
            padding: 12px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            box-shadow: 0 0 10px rgba(0, 204, 255, 0.2);
            z-index: 100;
            min-width: 200px;
        `;

        // Music status indicator
        const statusIndicator = document.createElement('div');
        statusIndicator.id = 'music-status-indicator';
        statusIndicator.style.cssText = `
            font-size: 11px;
            color: var(--text-secondary);
            text-align: center;
            margin-bottom: 5px;
        `;
        this.updateMusicStatus(statusIndicator);

        // Controls row
        const controlsRow = document.createElement('div');
        controlsRow.style.cssText = `
            display: flex;
            gap: 10px;
            align-items: center;
        `;

        // Mute/unmute button
        const muteButton = document.createElement('button');
        muteButton.innerHTML = this.isMuted ? '🔇' : '🔊';
        muteButton.title = this.isMuted ? 'Unmute Audio' : 'Mute Audio';
        muteButton.style.cssText = `
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s ease;
        `;

        muteButton.addEventListener('click', () => {
            const muted = this.toggleMute();
            muteButton.innerHTML = muted ? '🔇' : '🔊';
            muteButton.title = muted ? 'Unmute Audio' : 'Mute Audio';
            this.updateMusicStatus(statusIndicator);

            // Update music button appearance too
            if (this.musicToggleButton) {
                this.musicToggleButton.style.opacity = this.isBackgroundMusicPlaying ? '1' : '0.5';
            }

            // Auto-hide controls after interaction
            setTimeout(() => {
                controlsContainer.style.display = 'none';
            }, 1500);
        });

        // Music toggle button
        const musicButton = document.createElement('button');
        musicButton.innerHTML = '🎵';
        musicButton.title = 'Toggle Background Music';
        musicButton.style.cssText = `
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s ease;
        `;

        musicButton.addEventListener('click', async () => {
            if (this.isBackgroundMusicPlaying) {
                this.pauseBackgroundMusic();
                musicButton.style.opacity = '0.5';
            } else {
                const success = await this.playBackgroundMusic();
                if (success) {
                    musicButton.style.opacity = '1';
                } else {
                    // Show user they need to interact first
                    musicButton.innerHTML = '🎵!';
                    setTimeout(() => {
                        musicButton.innerHTML = '🎵';
                    }, 2000);
                }
            }
            this.updateMusicStatus(statusIndicator);

            // Auto-hide controls after interaction
            setTimeout(() => {
                controlsContainer.style.display = 'none';
            }, 1500);
        });

        // Update music button appearance based on current state
        musicButton.style.opacity = this.isBackgroundMusicPlaying ? '1' : '0.5';

        // Volume slider
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '1';
        volumeSlider.step = '0.1';
        volumeSlider.value = this.volume;
        volumeSlider.title = 'Volume';
        volumeSlider.style.cssText = `
            width: 80px;
            accent-color: var(--accent-color);
        `;

        let volumeHideTimeout;
        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(parseFloat(e.target.value));

            // Clear existing timeout and set new one for auto-hide
            clearTimeout(volumeHideTimeout);
            volumeHideTimeout = setTimeout(() => {
                controlsContainer.style.display = 'none';
            }, 2000); // Auto-hide after 2 seconds of no volume changes
        });

        // Store references for later updates
        this.musicStatusIndicator = statusIndicator;
        this.musicToggleButton = musicButton;

        controlsRow.appendChild(muteButton);
        controlsRow.appendChild(musicButton);
        controlsRow.appendChild(volumeSlider);

        controlsContainer.appendChild(statusIndicator);
        controlsContainer.appendChild(controlsRow);

        document.body.appendChild(controlsContainer);

        return controlsContainer;
    }

    // Update music status display
    updateMusicStatus(statusElement) {
        if (!statusElement) return;

        let status = '';
        if (this.isMuted) {
            status = '🔇 Audio Muted';
        } else if (this.isBackgroundMusicPlaying) {
            status = '🎵 Music Playing';
        } else {
            const musicBlocked = localStorage.getItem('musicBlocked');
            if (musicBlocked === 'true') {
                status = '🎵 Click to Enable Music';
            } else {
                status = '🎵 Music Paused';
            }
        }

        console.log('Updating music status:', {
            isMuted: this.isMuted,
            isBackgroundMusicPlaying: this.isBackgroundMusicPlaying,
            musicBlocked: localStorage.getItem('musicBlocked'),
            finalStatus: status
        });

        statusElement.textContent = status;
    }

    // Set up listeners for user interaction to enable audio
    setupUserInteractionListeners() {
        const interactionEvents = ['click', 'touchstart', 'keydown'];

        const handleFirstInteraction = () => {
            console.log('User interaction detected - enabling audio');

            // Try to resume audio context if suspended
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    console.log('Audio context resumed');
                });
            }

            // Try to start background music if it was blocked
            const musicBlocked = localStorage.getItem('musicBlocked');
            if (musicBlocked === 'true' && !this.isBackgroundMusicPlaying) {
                console.log('Retrying background music after user interaction');
                this.playBackgroundMusic().then((success) => {
                    if (success) {
                        // Clear the blocked flag if successful
                        localStorage.removeItem('musicBlocked');
                        // Update UI if music controls exist
                        if (this.musicStatusIndicator) {
                            this.updateMusicStatus(this.musicStatusIndicator);
                        }
                        if (this.musicToggleButton) {
                            this.musicToggleButton.style.opacity = '1';
                        }
                    } else {
                        // Update status even if music didn't start
                        if (this.musicStatusIndicator) {
                            this.updateMusicStatus(this.musicStatusIndicator);
                        }
                    }
                }).catch(error => {
                    console.log('Music still blocked after interaction:', error);
                    // Update status on error too
                    if (this.musicStatusIndicator) {
                        this.updateMusicStatus(this.musicStatusIndicator);
                    }
                });
            }

            // Remove listeners after first interaction
            interactionEvents.forEach(event => {
                document.removeEventListener(event, handleFirstInteraction, true);
            });
        };

        // Add listeners for user interaction
        interactionEvents.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, true);
        });
    }

    // Enhanced play method with better retry logic
    async playBackgroundMusicWithRetry() {
        if (!this.backgroundMusic || this.isMuted) return false;

        // Check if we should attempt to play music
        const musicBlocked = localStorage.getItem('musicBlocked');
        if (musicBlocked === 'true') {
            console.log('Music playback previously blocked - waiting for user interaction');
            return false;
        }

        try {
            const loaded = await this.ensureMusicLoaded();
            if (!loaded) return false;

            await this.backgroundMusic.play();
            this.isBackgroundMusicPlaying = true;
            console.log('Background music started successfully');

            // Clear any previous blocked state
            localStorage.removeItem('musicBlocked');
            localStorage.setItem('musicEnabled', 'true');

            // Update status display
            if (this.musicStatusIndicator) {
                this.updateMusicStatus(this.musicStatusIndicator);
            }

            return true;
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                console.log('Music blocked by autoplay policy - will retry on user interaction');
                localStorage.setItem('musicBlocked', 'true');
            } else {
                console.warn('Failed to play background music:', error);
            }

            // Update status display even on failure
            if (this.musicStatusIndicator) {
                this.updateMusicStatus(this.musicStatusIndicator);
            }

            return false;
        }
    }

    // Update the existing play method to use retry logic
    async playBackgroundMusic() {
        console.log('playBackgroundMusic called');
        console.log('Current state:', {
            hasBackgroundMusic: !!this.backgroundMusic,
            isMuted: this.isMuted,
            isPlaying: this.isBackgroundMusicPlaying,
            musicSrc: this.backgroundMusic?.src,
            readyState: this.backgroundMusic?.readyState,
            volume: this.backgroundMusic?.volume
        });
        return this.playBackgroundMusicWithRetry();
    }

    // Cleanup
    destroy() {
        if (this.audioContext) {
            this.audioContext.close();
        }

        if (this.statusUpdateInterval) {
            clearInterval(this.statusUpdateInterval);
        }

        Object.values(this.sounds).forEach(themeSounds => {
            Object.values(themeSounds).forEach(sound => {
                sound.stop();
            });
        });
    }
}