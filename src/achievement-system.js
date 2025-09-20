// Achievement system with localStorage persistence
export class AchievementSystem {
    constructor() {
        this.achievements = {
            first_wait: {
                id: 'first_wait',
                name: 'First Wait',
                description: 'Complete your first queue',
                unlocked: false,
                condition: 'queueCompleted',
                requirement: 1
            },
            patience_virtue: {
                id: 'patience_virtue',
                name: 'Patience is a Virtue',
                description: 'Wait for 10 minutes straight',
                unlocked: false,
                condition: 'waitTime',
                requirement: 600000 // 10 minutes in milliseconds
            },
            queue_veteran: {
                id: 'queue_veteran',
                name: 'Queue Veteran',
                description: 'Reach Queue Game 5',
                unlocked: false,
                condition: 'queueLevel',
                requirement: 5
            },
            stockholm_syndrome: {
                id: 'stockholm_syndrome',
                name: 'Stockholm Syndrome',
                description: 'Restart from Queue 1 voluntarily',
                unlocked: false,
                condition: 'queueReset',
                requirement: 1
            },
            queue_master: {
                id: 'queue_master',
                name: 'Queue Master',
                description: 'Unlock all queue themes',
                unlocked: false,
                condition: 'allQueues',
                requirement: 6
            },
            eternal_waiter: {
                id: 'eternal_waiter',
                name: 'Eternal Waiter',
                description: 'Spend 1 hour total in queues',
                unlocked: false,
                condition: 'totalWaitTime',
                requirement: 3600000 // 1 hour in milliseconds
            },
            queue_evangelist: {
                id: 'queue_evangelist',
                name: 'Queue Evangelist',
                description: 'Share the game with others',
                unlocked: false,
                condition: 'share',
                requirement: 1
            },
            position_jumper: {
                id: 'position_jumper',
                name: 'Position Jumper',
                description: 'Experience 10 queue events',
                unlocked: false,
                condition: 'queueEvents',
                requirement: 10
            },
            premium_victim: {
                id: 'premium_victim',
                name: 'Premium Victim',
                description: 'Get cut by premium members 5 times',
                unlocked: false,
                condition: 'premiumCuts',
                requirement: 5
            },
            infinite_loop: {
                id: 'infinite_loop',
                name: 'Infinite Loop',
                description: 'Reach the infinite queue',
                unlocked: false,
                condition: 'infiniteQueue',
                requirement: 1
            },
            click_master: {
                id: 'click_master',
                name: 'Click Master',
                description: 'Click on 20 advertisements',
                unlocked: false,
                condition: 'adClicks',
                requirement: 20
            },
            zen_master: {
                id: 'zen_master',
                name: 'Zen Master',
                description: 'Remain calm during 50 position jumps',
                unlocked: false,
                condition: 'positionJumps',
                requirement: 50
            }
        };

        this.stats = {
            queuesCompleted: 0,
            totalWaitTime: 0,
            queueEvents: 0,
            premiumCuts: 0,
            adClicks: 0,
            positionJumps: 0,
            maxQueueReached: 1,
            sessionStartTime: Date.now(),
            visitedQueues: new Set([1])
        };

        this.eventListeners = {};
    }

    init() {
        this.loadProgress();
        console.log('Achievement System initialized');
        console.log('Unlocked achievements:', this.getUnlockedAchievements().length);
    }

    // Event system
    on(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    emit(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => callback(data));
        }
    }

    checkAchievements(eventType, data) {
        let newUnlocks = [];

        switch (eventType) {
            case 'queueCompleted':
                this.stats.queuesCompleted++;
                this.stats.visitedQueues.add(data.theme);
                this.stats.maxQueueReached = Math.max(this.stats.maxQueueReached, data.level || 1);

                // Check various queue-related achievements
                newUnlocks.push(...this.checkQueueAchievements(data));
                break;

            case 'queueEvent':
                this.stats.queueEvents++;

                if (data.type === 'premium_cut') {
                    this.stats.premiumCuts++;
                }
                if (data.type === 'position_jump') {
                    this.stats.positionJumps++;
                }

                newUnlocks.push(...this.checkEventAchievements());
                break;

            case 'adClick':
                this.stats.adClicks++;
                newUnlocks.push(...this.checkAdAchievements());
                break;

            case 'waitTime':
                this.stats.totalWaitTime = data.totalTime;
                newUnlocks.push(...this.checkTimeAchievements());
                break;

            case 'share':
                newUnlocks.push(...this.checkShareAchievements());
                break;
        }

        // Process new unlocks
        newUnlocks.forEach(achievement => {
            this.unlockAchievement(achievement.id);
        });

        this.saveProgress();
    }

    checkQueueAchievements(queueData) {
        const unlocks = [];

        // First Wait
        if (!this.achievements.first_wait.unlocked && this.stats.queuesCompleted >= 1) {
            unlocks.push(this.achievements.first_wait);
        }

        // Queue Veteran - reach level 5
        if (!this.achievements.queue_veteran.unlocked && this.stats.maxQueueReached >= 5) {
            unlocks.push(this.achievements.queue_veteran);
        }

        // Queue Master - visit all queue themes
        if (!this.achievements.queue_master.unlocked && this.stats.visitedQueues.size >= 6) {
            unlocks.push(this.achievements.queue_master);
        }

        // Infinite Loop - reach infinite queue
        if (!this.achievements.infinite_loop.unlocked && queueData.theme === 'infinite') {
            unlocks.push(this.achievements.infinite_loop);
        }

        // Stockholm Syndrome - restart from queue 1 after reaching higher levels
        if (!this.achievements.stockholm_syndrome.unlocked &&
            queueData.level === 1 && this.stats.maxQueueReached > 3) {
            unlocks.push(this.achievements.stockholm_syndrome);
        }

        return unlocks;
    }

    checkEventAchievements() {
        const unlocks = [];

        // Position Jumper
        if (!this.achievements.position_jumper.unlocked && this.stats.queueEvents >= 10) {
            unlocks.push(this.achievements.position_jumper);
        }

        // Premium Victim
        if (!this.achievements.premium_victim.unlocked && this.stats.premiumCuts >= 5) {
            unlocks.push(this.achievements.premium_victim);
        }

        // Zen Master
        if (!this.achievements.zen_master.unlocked && this.stats.positionJumps >= 50) {
            unlocks.push(this.achievements.zen_master);
        }

        return unlocks;
    }

    checkTimeAchievements() {
        const unlocks = [];

        // Patience is a Virtue - 10 minutes
        const sessionTime = Date.now() - this.stats.sessionStartTime;
        if (!this.achievements.patience_virtue.unlocked && sessionTime >= 600000) {
            unlocks.push(this.achievements.patience_virtue);
        }

        // Eternal Waiter - 1 hour total
        if (!this.achievements.eternal_waiter.unlocked && this.stats.totalWaitTime >= 3600000) {
            unlocks.push(this.achievements.eternal_waiter);
        }

        return unlocks;
    }

    checkAdAchievements() {
        const unlocks = [];

        // Click Master
        if (!this.achievements.click_master.unlocked && this.stats.adClicks >= 20) {
            unlocks.push(this.achievements.click_master);
        }

        return unlocks;
    }

    checkShareAchievements() {
        const unlocks = [];

        // Queue Evangelist
        if (!this.achievements.queue_evangelist.unlocked) {
            unlocks.push(this.achievements.queue_evangelist);
        }

        return unlocks;
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        achievement.unlocked = true;
        console.log(`Achievement unlocked: ${achievement.name}`);

        // Show achievement notification
        this.showAchievementNotification(achievement);

        // Emit event
        this.emit('achievementUnlocked', achievement);

        this.saveProgress();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">🏆 Achievement Unlocked!</div>
            <div style="font-size: 1.1em;">${achievement.name}</div>
            <div style="font-size: 0.9em; opacity: 0.8;">${achievement.description}</div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    getUnlockedAchievements() {
        return Object.values(this.achievements).filter(a => a.unlocked);
    }

    getLockedAchievements() {
        return Object.values(this.achievements).filter(a => !a.unlocked);
    }

    getAchievementProgress(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return 0;

        if (achievement.unlocked) return 100;

        // Calculate progress based on achievement type
        switch (achievement.condition) {
            case 'queueCompleted':
                return (this.stats.queuesCompleted / achievement.requirement) * 100;
            case 'queueEvents':
                return (this.stats.queueEvents / achievement.requirement) * 100;
            case 'premiumCuts':
                return (this.stats.premiumCuts / achievement.requirement) * 100;
            case 'adClicks':
                return (this.stats.adClicks / achievement.requirement) * 100;
            case 'totalWaitTime':
                return (this.stats.totalWaitTime / achievement.requirement) * 100;
            case 'waitTime':
                const sessionTime = Date.now() - this.stats.sessionStartTime;
                return (sessionTime / achievement.requirement) * 100;
            default:
                return 0;
        }
    }

    // Manual trigger methods for UI
    triggerShare() {
        this.checkAchievements('share');

        // Create a simple share URL
        const shareText = "I'm stuck in an infinite queue! Help me by joining Queue Game: ";
        const shareUrl = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: 'Queue Game',
                text: shareText,
                url: shareUrl
            }).catch(error => {
                console.log('Share cancelled or failed:', error);
                this.fallbackShare(shareText + shareUrl);
            });
        } else {
            this.fallbackShare(shareText + shareUrl);
        }
    }

    fallbackShare(shareText) {
        // Try clipboard first, with fallback to manual copy
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Share link copied to clipboard!');
            }).catch(error => {
                console.log('Clipboard access denied:', error);
                this.manualShare(shareText);
            });
        } else {
            this.manualShare(shareText);
        }
    }

    manualShare(shareText) {
        // Create a temporary text area for manual copying
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            alert('Share link copied! Paste it wherever you want to share.');
        } catch (error) {
            console.log('Manual copy failed:', error);
            // Final fallback - just show the text
            prompt('Copy this share link:', shareText);
        }

        document.body.removeChild(textarea);
    }

    triggerAdClick() {
        this.checkAchievements('adClick');
    }

    // Save/Load progress
    saveProgress() {
        try {
            const saveData = {
                achievements: this.achievements,
                stats: {
                    ...this.stats,
                    visitedQueues: Array.from(this.stats.visitedQueues)
                }
            };

            localStorage.setItem('queueSimulatorAchievements', JSON.stringify(saveData));
        } catch (error) {
            console.warn('Failed to save achievements:', error);
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('queueSimulatorAchievements');
            if (saved) {
                const data = JSON.parse(saved);

                // Merge achievements (in case new ones were added)
                if (data.achievements) {
                    Object.keys(data.achievements).forEach(id => {
                        if (this.achievements[id]) {
                            this.achievements[id].unlocked = data.achievements[id].unlocked;
                        }
                    });
                }

                // Load stats
                if (data.stats) {
                    this.stats = {
                        ...this.stats,
                        ...data.stats,
                        visitedQueues: new Set(data.stats.visitedQueues || [1]),
                        sessionStartTime: Date.now() // Reset session timer
                    };
                }
            }
        } catch (error) {
            console.warn('Failed to load achievements:', error);
        }
    }

    // Reset all progress (for testing or user request)
    resetProgress() {
        Object.values(this.achievements).forEach(achievement => {
            achievement.unlocked = false;
        });

        this.stats = {
            queuesCompleted: 0,
            totalWaitTime: 0,
            queueEvents: 0,
            premiumCuts: 0,
            adClicks: 0,
            positionJumps: 0,
            maxQueueReached: 1,
            sessionStartTime: Date.now(),
            visitedQueues: new Set([1])
        };

        this.saveProgress();
        console.log('Achievement progress reset');
    }
}