// Core queue engine with fake position algorithms
import { gameConfig } from './config.js';

export class QueueSimulator {
    constructor() {
        this.state = {
            currentQueue: 1,
            position: Math.floor(Math.random() * (gameConfig.queue.initialPositionMax - gameConfig.queue.initialPositionMin)) + gameConfig.queue.initialPositionMin,
            waitTime: '',
            isActive: false,
            achievements: [],
            currentAd: 0,
            queueTheme: 'basic',
            startTime: Date.now(),
            totalWaitTime: 0,
            queueEvents: [],
            lastUpdate: Date.now(),
            isCompleting: false  // Flag to prevent multiple completions
        };

        // Initialize wait time after state is created
        this.state.waitTime = this.calculateFakeWaitTime();

        this.queues = {
            1: {
                name: "Queue Game",
                theme: "basic",
                description: "Welcome to the queue!",
                targetPosition: 0,
                eventChance: 0.3
            },
            2: {
                name: "Queue Game 2: The Queuening",
                theme: "fancy",
                description: "Premium waiting experience",
                targetPosition: 0,
                eventChance: 0.4
            },
            3: {
                name: "Queue Game 3: Queue Hard",
                theme: "action",
                description: "Extreme queue combat",
                targetPosition: 0,
                eventChance: 0.5
            },
            4: {
                name: "Queue Game 4: Queue Wars",
                theme: "space",
                description: "Intergalactic waiting",
                targetPosition: 0,
                eventChance: 0.6
            },
            5: {
                name: "Queue Game 5: Queue Royale",
                theme: "battle",
                description: "Battle for position supremacy",
                targetPosition: 0,
                eventChance: 0.7
            },
            6: {
                name: "Queue Game 6: The Queue Awakens",
                theme: "mystical",
                description: "Achieve enlightenment through waiting",
                targetPosition: 0,
                eventChance: 0.8
            },
            999: {
                name: "Queue Game ∞",
                theme: "infinite",
                description: "The eternal queue",
                targetPosition: 0,
                eventChance: 1.0
            }
        };

        this.eventListeners = {};
        this.updateInterval = null;
        this.isPaused = false;
        this.countdownInterval = null;
        this.eventCooldown = 0;
        this.nextUpdateTime = 0;
        this.countdownSeconds = 0;
        this.pauseAtZero = false;
        this.pauseStartTime = 0;
        this.inPredictableMode = false;
        this.stickCount = 0; // Track consecutive sticks to force progression
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

    init() {
        this.loadState();
        this.state.isActive = true;
        this.startQueue();
        console.log('Queue Game initialized:', this.getCurrentQueue().name);
    }

    startQueue() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.countdownInterval) {
            clearTimeout(this.countdownInterval);
        }

        // Reset pause flags
        this.pauseAtZero = false;
        this.pauseStartTime = 0;
        this.inPredictableMode = false;
        this.stickCount = 0;

        // Set next update time (1-3 seconds with some randomness)
        this.scheduleNextUpdate();

        // Start countdown timer
        this.startCountdown();

        this.emit('queueStarted', this.getCurrentQueue());
    }

    scheduleNextUpdate() {
        // Don't schedule updates if paused
        if (this.isPaused) {
            console.log('Skipping update scheduling - game is paused');
            return;
        }

        const delay = Math.random() * (gameConfig.queue.updateIntervalMax - gameConfig.queue.updateIntervalMin) + gameConfig.queue.updateIntervalMin;
        this.nextUpdateTime = Date.now() + delay;
        // REMOVED: this.countdownSeconds = Math.ceil(delay / 1000); - This was interfering with countdown timer!

        this.updateInterval = setTimeout(() => {
            // Check if still not paused when timeout fires
            if (!this.isPaused) {
                this.updateQueuePosition();
                this.scheduleNextUpdate(); // Schedule the next update
            }
        }, delay);
    }

    startCountdown() {
        // Set initial countdown to a reasonable value if it's 0
        if (this.countdownSeconds === 0) {
            this.countdownSeconds = Math.floor(Math.random() * 30) + 15; // 15-45 seconds initial
        }

        const updateCountdown = () => {
            if (!this.state.isActive) return; // Stop if queue is not active

            // ABSOLUTE SAFETY CHECK: Never allow countdown above 100
            if (this.countdownSeconds > 100) {
                const oldValue = this.countdownSeconds;
                this.countdownSeconds = 100;
                console.log(`SAFETY: Countdown capped at 100 (was ${oldValue})`);
            }

            // Handle pause at zero first
            if (this.countdownSeconds === 0 && this.pauseAtZero) {
                const pauseDuration = Date.now() - this.pauseStartTime;
                if (pauseDuration < 2000) {
                    // Still in pause, don't change countdown
                    this.emit('countdownUpdate', this.countdownSeconds);
                    this.countdownInterval = setTimeout(updateCountdown, 100); // Check every 100ms during pause
                    return;
                } else {
                    // Pause is over, exit pause mode and continue with erratic behavior
                    this.pauseAtZero = false;
                }
            }

            // IMPROVED TWO-ZONE SYSTEM
            if (this.countdownSeconds > 10) {
                // ERRATIC ZONE: > 10 (with reasonable limits)
                this.inPredictableMode = false;

                // Prevent countdown from going too high (absolute max: 100 seconds)
                if (this.countdownSeconds > 100) {
                    this.countdownSeconds = 50; // Reset to 50 seconds if too high
                    console.log(`ERRATIC MODE: Countdown too high (was ${this.countdownSeconds}), reset to 50`);
                }

                console.log(`ERRATIC MODE: Starting at ${this.countdownSeconds}`);
                const updateChance = Math.random();

                // Force progression if stuck too many times
                if (this.stickCount >= 3) {
                    // Force move to 10 after 3 consecutive sticks
                    this.countdownSeconds = 10;
                    this.inPredictableMode = true;
                    this.stickCount = 0;
                    console.log(`ERRATIC MODE: FORCED progression after ${this.stickCount} sticks - ENTERING PREDICTABLE MODE at 10`);
                } else if (updateChance < 0.15) {
                    // 15% chance: Don't update countdown (timer "sticks") - reduced from 30%
                    this.stickCount++;
                    console.log(`ERRATIC MODE: Timer stuck at ${this.countdownSeconds} (stick #${this.stickCount})`);
                } else if (updateChance < 0.30) {
                    // 15% chance: Small jump (1-3 seconds)
                    this.stickCount = 0; // Reset stick count when moving
                    const jumpDirection = Math.random() < 0.95 ? -1 : 1; // 95% down, 5% up - heavily favor downward
                    let jumpAmount = Math.floor(Math.random() * 3) + 1;

                    if (jumpDirection > 0) {
                        // STRICT upward jump limits
                        jumpAmount = Math.min(jumpAmount, gameConfig.queue.maxCountdownJump, 100);
                        const newValue = this.countdownSeconds + jumpAmount;

                        // Hard cap: never go above 100 regardless of config or calculation
                        this.countdownSeconds = Math.min(newValue, 100);
                        console.log(`ERRATIC MODE: Small jump UP by ${jumpAmount} from ${this.countdownSeconds - jumpAmount} to ${this.countdownSeconds} (max 100)`);
                    } else {
                        // ANY downward movement from >10 ALWAYS lands on 10
                        this.countdownSeconds = 10;
                        this.inPredictableMode = true;
                        console.log(`ERRATIC MODE: Jump down - ENTERING PREDICTABLE MODE at 10`);
                    }
                } else {
                    // 75% chance: Normal countdown - ANY decrement from >10 lands on 10 - increased from 55%
                    this.stickCount = 0; // Reset stick count when moving
                    this.countdownSeconds = 10;
                    this.inPredictableMode = true;
                    console.log(`ERRATIC MODE: Normal countdown - ENTERING PREDICTABLE MODE at 10`);
                }
                console.log(`ERRATIC MODE: Ended at ${this.countdownSeconds}`);

            } else if (this.countdownSeconds <= 10 && this.countdownSeconds > 0) {
                // PREDICTABLE ZONE: Simple countdown 10→9→8→7→6→5→4→3→2→1→0
                if (!this.inPredictableMode) {
                    this.inPredictableMode = true;
                    console.log(`ENTERING PREDICTABLE MODE at ${this.countdownSeconds}`);
                }

                console.log(`PREDICTABLE MODE: ${this.countdownSeconds} -> ${this.countdownSeconds - 1}`);
                this.countdownSeconds = this.countdownSeconds - 1;

                // If we just reached zero, start the pause
                if (this.countdownSeconds === 0) {
                    this.inPredictableMode = false;
                    this.pauseAtZero = true;
                    this.pauseStartTime = Date.now();
                    console.log('STARTING 2-SECOND PAUSE AT ZERO');
                }

            } else if (this.countdownSeconds === 0 && !this.pauseAtZero) {
                // RESET ZONE: At zero but not in pause
                this.inPredictableMode = false;
                this.stickCount = 0;
                if (Math.random() < 0.02) { // 2% chance - very rare
                    // Reset to a very reasonable range (15-35 seconds max)
                    this.countdownSeconds = Math.floor(Math.random() * 20) + 15; // 15-35 range
                    console.log(`RESET: Jumped to ${this.countdownSeconds}`);
                }
            }

            this.emit('countdownUpdate', this.countdownSeconds);

            // Schedule next countdown update with appropriate interval
            let nextInterval;
            if (this.inPredictableMode || (this.countdownSeconds <= 10 && this.countdownSeconds >= 0 && !this.pauseAtZero)) {
                // STRICT: Exact 1 second intervals during predictable countdown
                nextInterval = 1000;
                console.log(`TIMING: Predictable mode - next update in 1000ms`);
            } else if (this.pauseAtZero) {
                // Already handled above with 100ms checks during pause
                return;
            } else {
                // Erratic timing when > 10
                nextInterval = Math.random() * 400 + 200; // 200-600ms random interval
                console.log(`TIMING: Erratic mode - next update in ${nextInterval}ms`);
            }
            this.countdownInterval = setTimeout(updateCountdown, nextInterval);
        };

        // Start the countdown
        updateCountdown();
    }

    update() {
        const now = Date.now();
        const deltaTime = now - this.state.lastUpdate;
        this.state.totalWaitTime += deltaTime;
        this.state.lastUpdate = now;

        // Update wait time display occasionally (configurable frequency)
        if (Math.random() < gameConfig.queue.waitTimeUpdateChance) {
            this.state.waitTime = this.calculateFakeWaitTime();
            this.emit('waitTimeChanged', this.state.waitTime);
        }

        // Reduce event cooldown
        if (this.eventCooldown > 0) {
            this.eventCooldown -= deltaTime;
        }
    }

    updateQueuePosition() {
        if (!this.state.isActive) return;

        const currentQueue = this.getCurrentQueue();
        const events = this.getPositionUpdateEvents(currentQueue);

        // Roll for which event happens
        const roll = Math.random();
        let cumulativeChance = 0;

        for (const event of events) {
            cumulativeChance += event.chance;
            if (roll <= cumulativeChance) {
                event.action();
                break;
            }
        }

        // Check if queue is completed (only if not already completing)
        if (this.state.position <= 0 && !this.state.isCompleting) {
            this.state.isCompleting = true;
            this.completeQueue();
        }

        this.emit('positionChanged', this.state.position);
        this.saveState();
    }

    getPositionUpdateEvents(queue) {
        const events = gameConfig.queue.positionEvents;
        return [
            // Normal progression (most common)
            {
                chance: events.normalProgress,
                action: () => {
                    this.state.position = Math.max(0, this.state.position - Math.floor(Math.random() * 3) - 1);
                }
            },
            // Small jump forward
            {
                chance: events.smallJump,
                action: () => {
                    this.state.position = Math.max(0, this.state.position - Math.floor(Math.random() * 10) - 5);
                }
            },
            // Position jump backward (queue event)
            {
                chance: events.positionJump,
                action: () => {
                    if (this.eventCooldown <= 0) {
                        this.triggerQueueEvent('position_jump');
                    }
                }
            },
            // Premium member cuts in line
            {
                chance: events.premiumCut,
                action: () => {
                    if (this.eventCooldown <= 0) {
                        this.triggerQueueEvent('premium_cut');
                    }
                }
            },
            // System maintenance
            {
                chance: events.maintenance,
                action: () => {
                    if (this.eventCooldown <= 0) {
                        this.triggerQueueEvent('maintenance');
                    }
                }
            },
            // Do nothing (stall)
            {
                chance: events.stall,
                action: () => {
                    // Intentional stall - builds frustration
                }
            }
        ];
    }

    triggerQueueEvent(eventType) {
        const events = {
            position_jump: {
                message: "Queue system error! You've been moved back due to suspicious activity.",
                action: () => {
                    const jump = Math.floor(Math.random() * 500) + 100;
                    this.state.position += jump;
                },
                duration: 3000
            },
            premium_cut: {
                message: "1,247 Premium Queue™ members have joined ahead of you!",
                action: () => {
                    const cuts = Math.floor(Math.random() * 1500) + 500;
                    this.state.position += cuts;
                },
                duration: 4000
            },
            maintenance: {
                message: "Queue maintenance in progress... Please remain patient.",
                action: () => {
                    // Freeze for a moment, then small jump back
                    setTimeout(() => {
                        this.state.position += Math.floor(Math.random() * 50) + 10;
                    }, 2000);
                },
                duration: 5000
            },
            mass_exodus: {
                message: "Lucky you! Mass exodus detected ahead of you.",
                action: () => {
                    const reduction = Math.floor(Math.random() * 1000) + 200;
                    this.state.position = Math.max(0, this.state.position - reduction);
                },
                duration: 2000
            },
            vip_invasion: {
                message: "VIP event attendees are joining the queue...",
                action: () => {
                    const vips = Math.floor(Math.random() * 2000) + 1000;
                    this.state.position += vips;
                },
                duration: 4000
            }
        };

        const event = events[eventType];
        if (event) {
            event.action();
            this.emit('queueEvent', {
                type: eventType,
                message: event.message,
                duration: event.duration
            });

            // Set cooldown to prevent spam
            this.eventCooldown = event.duration + Math.random() * 10000;
        }
    }

    calculateFakeWaitTime() {
        const baseTime = this.state.position;
        const randomMultiplier = Math.random() * 5 + 0.5; // 0.5x to 5.5x
        const estimatedSeconds = (baseTime * randomMultiplier) / 10;

        // Convert to ridiculous time formats
        if (estimatedSeconds < 60) {
            return `${Math.floor(estimatedSeconds)} seconds`;
        } else if (estimatedSeconds < 3600) {
            const minutes = Math.floor(estimatedSeconds / 60);
            return `${minutes} minutes`;
        } else if (estimatedSeconds < 86400) {
            const hours = Math.floor(estimatedSeconds / 3600);
            const minutes = Math.floor((estimatedSeconds % 3600) / 60);
            return `${hours}h ${minutes}m`;
        } else {
            const days = Math.floor(estimatedSeconds / 86400);
            const hours = Math.floor((estimatedSeconds % 86400) / 3600);
            return `${days} days, ${hours} hours`;
        }
    }

    completeQueue() {
        const currentQueue = this.getCurrentQueue();
        console.log(`Queue ${this.state.currentQueue} completed!`);

        // Stop the queue updates
        this.state.isActive = false;

        // Show completion screen first - main.js will handle the advancement timing
        this.emit('showCompletionScreen', currentQueue);
    }

    advanceToNextQueue() {
        // Determine next queue
        let nextQueueId;
        if (this.state.currentQueue < 6) {
            nextQueueId = this.state.currentQueue + 1;
        } else if (this.state.currentQueue === 6) {
            nextQueueId = 999; // Jump to infinite queue
        } else {
            nextQueueId = 1; // Reset to beginning (the ultimate joke)
        }

        this.state.currentQueue = nextQueueId;
        this.state.position = Math.floor(Math.random() * (gameConfig.queue.initialPositionMax - gameConfig.queue.initialPositionMin)) + gameConfig.queue.initialPositionMin; // New random position
        this.state.waitTime = this.calculateFakeWaitTime();
        this.state.queueTheme = this.getCurrentQueue().theme;

        // Restart the queue
        this.state.isActive = true;
        this.state.isCompleting = false; // Reset completion flag

        this.emit('queueCompleted', this.getCurrentQueue());
        this.saveState();

        // Restart queue with new settings
        this.startQueue();
    }

    getCurrentQueue() {
        return this.queues[this.state.currentQueue] || this.queues[1];
    }

    getState() {
        return { ...this.state };
    }

    saveState() {
        try {
            localStorage.setItem('queueSimulatorState', JSON.stringify({
                currentQueue: this.state.currentQueue,
                totalWaitTime: this.state.totalWaitTime,
                achievements: this.state.achievements
            }));
        } catch (error) {
            console.warn('Failed to save state:', error);
        }
    }

    loadState() {
        try {
            const saved = localStorage.getItem('queueSimulatorState');
            if (saved) {
                const state = JSON.parse(saved);
                // Always start from queue 1 on page refresh, but keep achievements and stats
                this.state.currentQueue = 1; // Force start from queue 1
                this.state.totalWaitTime = state.totalWaitTime || 0;
                this.state.achievements = state.achievements || [];
                this.state.queueTheme = this.getCurrentQueue().theme;
                console.log('State loaded: Starting from Queue 1, preserving achievements/stats');
            }
        } catch (error) {
            console.warn('Failed to load state:', error);
        }
    }

    // Fake premium features (parody)
    buyQueueSkip() {
        const reduction = Math.floor(Math.random() * 100) + 50;
        const addition = Math.floor(Math.random() * 500) + 200;

        // Pretend to reduce position, then add more
        this.state.position = Math.max(0, this.state.position - reduction);

        setTimeout(() => {
            this.state.position += addition;
            this.emit('queueEvent', {
                type: 'premium_backfire',
                message: 'Queue Skip Pro™ activated! You moved forward... wait, what? System error detected.',
                duration: 5000
            });
        }, 1000);

        return { success: true, message: 'Purchase successful! Processing...' };
    }

    pause() {
        this.isPaused = true;
        console.log('Queue simulator paused');
    }

    resume() {
        this.isPaused = false;
        console.log('Queue simulator resumed');

        // Resume the update cycle if the game is active
        if (this.state.isActive) {
            this.scheduleNextUpdate();
        }
    }

    destroy() {
        if (this.updateInterval) {
            clearTimeout(this.updateInterval);
        }
        if (this.countdownInterval) {
            clearTimeout(this.countdownInterval);
        }
        this.state.isActive = false;
        this.saveState();
    }
}