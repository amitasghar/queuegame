// Game Configuration
// Easily modify these settings to change game behavior

export const gameConfig = {
    // Ad System Settings
    ads: {
        rotationIntervalMs: 20000,  // How long each ad stays (milliseconds)
        textAdFallback: true,      // Use text ads if no images found
        adFolder: './assets/images/ads/',
        supportedFormats: ['.jpg', '.jpeg', '.png', '.webp'],

        // Custom popup messages for each ad
        adMessages: {
            'join-queue-premium-member.jpg': {
                title: '🎯 Premium Queue Membership',
                message: 'Congratulations! You\'ve discovered the secret to queue enlightenment.\n\nPremium members get:\n• Exclusive waiting experiences\n• Advanced queue anxiety management\n• Priority access to... more queues!',
                buttonText: 'Join Now!'
            },
            'quetendo64.jpg': {
                title: '🎮 Quetendo 64',
                message: 'Experience the revolutionary new gaming console!\n\nNow with:\n• 64-bit queue processing\n• Ultra-realistic waiting graphics\n• Backwards compatibility with all your favorite queues\n\nComing Soon: 2069!',
                buttonText: 'Pre-Order'
            },
            'talk-show-charity.jpg': {
                title: 'Charity for Kimmel',
                message: 'Save the talk show hosts!\n\nThey have been fired for being naughty but they deserve a second chance.\n\nDonate now, every penny counts\n\n',
                buttonText: 'Donate'
            },            
            'default': {
                title: '📢 Special Offer!',
                message: 'Thanks for clicking on our ad!\n\nWhile you\'re waiting in queue, why not wait in another queue?\n\nOur premium queue experience offers:\n• Longer wait times\n• More uncertainty\n• Enhanced frustration levels',
                buttonText: 'Learn More'
            }
        }
    },

    // Queue Position Settings
    queue: {
        initialPositionMin: 15,     // Minimum starting position
        initialPositionMax: 20,     // Maximum starting position
        updateIntervalMin: 500,        // Min time between position updates (ms)
        updateIntervalMax: 1500,       // Max time between position updates (ms)
        waitTimeUpdateChance: 0.01,    // Chance to update wait time each frame (0-1)
        maxCountdownJump: 100,         // Maximum jump up for countdown timer

        // Position change events (chances should add up to 1.0)
        positionEvents: {
            normalProgress: 0.7,       // Move forward 1-3 positions (increased)
            smallJump: 0.15,          // Move forward 5-15 positions (reduced)
            positionJump: 0.03,       // Queue event - move backward (rare)
            premiumCut: 0.02,         // Premium members cut in line (rare)
            maintenance: 0.02,        // System maintenance (rare)
            stall: 0.08              // No movement (reduced frustration)
        }
    },

    // Audio Settings
    audio: {
        backgroundMusicVolume: 0.4,    // Background music volume (0-1)
        soundEffectsVolume: 0.3,       // Sound effects volume (0-1)
        backgroundMusicFile: './assets/sounds/lofi_seville.mp3'
    },

    // Achievement Settings
    achievements: {
        displayAnimations: true,       // Show unlock animations
        saveProgress: true,           // Save achievement progress to localStorage
        checkFrequencyMs: 1000        // How often to check for achievement unlocks
    },

    // UI Settings
    ui: {
        positionGlowIntensity: 0.5,   // Glow effect intensity (0-1)
        animationSpeed: 300,          // UI animation speed (ms)
        themeTransitionSpeed: 1000,   // Theme change animation speed (ms)
        showDebugLogs: true           // Show debug information in console
    },

    // News System Settings
    news: {
        rotationIntervalMs: 10000,     // How long each news item stays (milliseconds)
        showTimestamp: true,           // Show "time ago" for each news item
        maxItems: 20,                  // Maximum number of news items to load
        fadeTransition: true,          // Use fade transition between items
        autoStart: true                // Start news rotation automatically
    },

    // Theme Settings
    themes: {
        defaultTheme: 'basic',
        availableThemes: ['basic', 'fancy', 'action', 'space', 'battle', 'mystical', 'infinite']
    }
};

// Helper function to update config values
export function updateConfig(section, key, value) {
    if (gameConfig[section] && gameConfig[section].hasOwnProperty(key)) {
        gameConfig[section][key] = value;
        console.log(`Config updated: ${section}.${key} = ${value}`);
        return true;
    } else {
        console.warn(`Invalid config key: ${section}.${key}`);
        return false;
    }
}

// Helper function to get config values
export function getConfig(section, key = null) {
    if (key === null) {
        return gameConfig[section];
    }
    return gameConfig[section]?.[key];
}

// Make config available globally for easy console access
if (typeof window !== 'undefined') {
    window.gameConfig = gameConfig;
    window.updateConfig = updateConfig;
    window.getConfig = getConfig;
}