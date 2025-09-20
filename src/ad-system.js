// Parody advertisement system with JPG banner rotation
import { gameConfig } from './config.js';

export class AdSystem {
    constructor() {
        this.ads = [];
        this.currentAdIndex = 0;
        this.adElement = null;
        this.rotationInterval = null;
        this.isLoading = false;
        this.currentAdData = null;
        this.shuffledAds = [];
        this.shuffleIndex = 0;
        this.preloadedImages = new Map(); // Cache for preloaded images

        // Fallback text ads for when no images are available
        this.textAds = [
            {
                title: "SkipLine Pro™",
                subtitle: "Jump 1000 positions instantly!",
                disclaimer: "(Results not guaranteed)",
                type: "queue-enhancement"
            },
            {
                title: "Queue Anxiety Pills",
                subtitle: "Feel better while waiting longer!",
                disclaimer: "Side effects may include more waiting",
                type: "wellness"
            },
            {
                title: "Premium Queue Pass",
                subtitle: "Skip the line to get into a premium line!",
                disclaimer: "Premium line may be longer",
                type: "queue-enhancement"
            },
            {
                title: "Gaming Chair Supreme",
                subtitle: "Now with built-in queue anxiety support!",
                disclaimer: "Chair does not reduce wait times",
                type: "gaming"
            },
            {
                title: "RGB Queue Lights",
                subtitle: "Your setup will look amazing while waiting!",
                disclaimer: "Lights do not affect queue position",
                type: "gaming"
            },
            {
                title: "TaxQueue Pro",
                subtitle: "Do your taxes while you wait!",
                disclaimer: "May increase total waiting time",
                type: "productivity"
            },
            {
                title: "Queue University",
                subtitle: "Get your degree during downtime!",
                disclaimer: "Diploma not recognized by employers",
                type: "productivity"
            },
            {
                title: "QueueSafe™",
                subtitle: "Protect against random position loss!",
                disclaimer: "Does not actually protect anything",
                type: "insurance"
            },
            {
                title: "Queue Dating App",
                subtitle: "Meet other singles in your queue!",
                disclaimer: "All profiles are bots",
                type: "lifestyle"
            },
            {
                title: "Premium Queue Snacks",
                subtitle: "Sustenance for the eternal wait!",
                disclaimer: "May cause queue position to increase",
                type: "food"
            }
        ];

        this.adFolder = gameConfig.ads.adFolder;
        this.supportedFormats = gameConfig.ads.supportedFormats;
    }

    async init() {
        this.adElement = document.getElementById('current-ad');
        if (!this.adElement) {
            console.warn('Ad display element not found');
            return;
        }

        // Make this instance globally accessible for click handlers
        window.gameAdSystem = this;

        // Show fallback content immediately while loading
        this.showLoadingAd();

        // Load image ads asynchronously without blocking
        this.loadImageAds().then(() => {
            // If no image ads found, use text ads
            if (this.ads.length === 0) {
                console.log('No image ads found, using text ads');
                this.ads = this.textAds;
            }

            // Initialize shuffle for random rotation
            this.shuffleAds();

            // Show first real ad immediately
            this.showCurrentAd();

            console.log(`Ad system initialized with ${this.ads.length} ads`);
        });

        this.startRotation();
        this.bindEvents();
    }

    shuffleAds() {
        // Create a shuffled copy of all ads
        this.shuffledAds = [...this.ads];

        // Fisher-Yates shuffle algorithm
        for (let i = this.shuffledAds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledAds[i], this.shuffledAds[j]] = [this.shuffledAds[j], this.shuffledAds[i]];
        }

        this.shuffleIndex = 0;
        console.log('Ads shuffled for random rotation');
    }

    async loadImageAds() {
        try {
            // Try to dynamically discover JPG files by testing common patterns
            // This is a workaround since browsers can't list directory contents
            const imageAds = [];

            // First, try to get a list from a manifest file if it exists
            try {
                const manifestResponse = await fetch(`${this.adFolder}manifest.json`);
                if (manifestResponse.ok) {
                    const manifest = await manifestResponse.json();
                    for (const filename of manifest.files) {
                        if (this.supportedFormats.some(ext => filename.toLowerCase().endsWith(ext))) {
                            const imagePath = `${this.adFolder}${filename}`;
                            imageAds.push({
                                type: 'image',
                                src: imagePath,
                                filename: filename,
                                alt: this.generateAltText(filename)
                            });
                        }
                    }
                    console.log('Loaded ads from manifest:', imageAds.map(ad => ad.filename));

                    // Preload all manifest images in background (don't await)
                    this.preloadManifestImages(manifest.files);
                }
            } catch (e) {
                // No manifest file, fall back to discovery method
                console.log('No manifest found, attempting to discover images...');

                // Try some common naming patterns and existing known files
                const potentialAds = [
                    'join-queue-premium-member.jpg',
                    'quetendo64.jpg',
                    'talk-show-charity.jpg',
                    'skipline-pro.jpg',
                    'queue-anxiety-pills.jpg',
                    'premium-queue-pass.jpg',
                    'gaming-chair-supreme.jpg',
                    'rgb-queue-lights.jpg',
                    'tax-queue-pro.jpg',
                    'queue-university.jpg',
                    'queue-safe.jpg',
                    'queue-dating-app.jpg',
                    'premium-queue-snacks.jpg',
                    'queue-insurance.jpg',
                    'position-recovery-service.jpg',
                    'queue-real-estate.jpg',
                    'meditation-queue.jpg',
                    'queue-mouse.jpg'
                ];

                for (const filename of potentialAds) {
                    try {
                        const imagePath = `${this.adFolder}${filename}`;
                        const exists = await this.checkImageExists(imagePath);

                        if (exists) {
                            imageAds.push({
                                type: 'image',
                                src: imagePath,
                                filename: filename,
                                alt: this.generateAltText(filename)
                            });
                        }
                    } catch (error) {
                        // Image doesn't exist, continue
                    }
                }
            }

            this.ads = imageAds;

            if (imageAds.length > 0) {
                console.log(`Loaded ${imageAds.length} image ads:`, imageAds.map(ad => ad.filename));
            } else {
                console.log('No image ads found, falling back to text ads');
            }

        } catch (error) {
            console.warn('Failed to load image ads:', error);
        }
    }

    checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                // Store preloaded image for instant access later
                this.preloadedImages.set(src, img);
                console.log(`✓ Ad image preloaded: ${src}`);
                resolve(true);
            };
            img.onerror = () => {
                console.log(`✗ Ad image not found: ${src}`);
                resolve(false);
            };
            img.src = src;
        });
    }

    async preloadManifestImages(filenames) {
        console.log('🔄 Preloading ad images...');
        const preloadPromises = filenames
            .filter(filename => this.supportedFormats.some(ext => filename.toLowerCase().endsWith(ext)))
            .map(filename => {
                const imagePath = `${this.adFolder}${filename}`;
                return this.preloadSingleImage(imagePath);
            });

        try {
            await Promise.all(preloadPromises);
            console.log(`✅ Successfully preloaded ${this.preloadedImages.size} ad images`);
        } catch (error) {
            console.warn('Some ad images failed to preload:', error);
        }
    }

    preloadSingleImage(src) {
        return new Promise((resolve) => {
            if (this.preloadedImages.has(src)) {
                resolve(true); // Already preloaded
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.preloadedImages.set(src, img);
                resolve(true);
            };
            img.onerror = () => {
                console.warn(`Failed to preload: ${src}`);
                resolve(false); // Don't reject, just continue
            };
            img.src = src;
        });
    }

    generateAltText(filename) {
        // Generate descriptive alt text from filename
        return filename
            .replace(/\.(jpg|jpeg)$/i, '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    showLoadingAd() {
        if (!this.adElement) return;

        // Show a simple loading message
        this.adElement.innerHTML = `
            <div class="text-ad" style="text-align: center; color: var(--text-secondary);">
                <h3 style="color: var(--accent-color); margin-bottom: 10px;">📺 Loading Ads...</h3>
                <p style="margin: 0; font-style: italic;">Please wait while we load amazing offers!</p>
            </div>
        `;
    }

    startRotation() {
        // Set up rotation interval even if no ads loaded yet
        this.rotationInterval = setInterval(() => {
            if (this.shuffledAds.length > 0) {
                this.nextAd();
            }
        }, gameConfig.ads.rotationIntervalMs);
    }

    showCurrentAd() {
        if (!this.adElement || this.shuffledAds.length === 0) return;

        const ad = this.shuffledAds[this.shuffleIndex];
        this.currentAdData = ad;

        // Add leaving animation to current ad
        this.adElement.classList.add('ad-leaving');

        setTimeout(() => {
            if (ad.type === 'image') {
                this.displayImageAd(ad);
            } else {
                this.displayTextAd(ad);
            }

            // Add entering animation
            this.adElement.classList.remove('ad-leaving');
            this.adElement.classList.add('ad-entering');

            setTimeout(() => {
                this.adElement.classList.remove('ad-entering');
            }, 500);

        }, 250); // Half of the transition time
    }

    displayImageAd(ad) {
        // Check if we have a preloaded version
        const preloadedImg = this.preloadedImages.get(ad.src);

        if (preloadedImg) {
            // Use preloaded image for instant display
            this.adElement.innerHTML = `
                <img src="${ad.src}"
                     alt="${ad.alt}"
                     style="max-width: 100%; height: auto; border-radius: 4px; cursor: pointer; opacity: 1; transition: opacity 0.3s ease; border: 2px solid var(--accent-color); box-shadow: 0 0 15px rgba(0, 204, 255, 0.4);"
                     onclick="window.gameAdSystem.handleAdClick()">
            `;
            console.log(`📸 Using preloaded image: ${ad.filename}`);
        } else {
            // Fallback to standard loading with loading indicator
            this.adElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; min-height: 100px; color: var(--text-secondary);">
                    <span>Loading ad...</span>
                </div>
            `;

            // Load image asynchronously
            setTimeout(() => {
                this.adElement.innerHTML = `
                    <img src="${ad.src}"
                         alt="${ad.alt}"
                         style="max-width: 100%; height: auto; border-radius: 4px; cursor: pointer; opacity: 0; transition: opacity 0.3s ease; border: 2px solid var(--accent-color); box-shadow: 0 0 15px rgba(0, 204, 255, 0.4);"
                         onload="this.style.opacity = 1;"
                         onerror="this.style.display='none'"
                         onclick="window.gameAdSystem.handleAdClick()">
                `;
            }, 100);
        }
    }

    displayTextAd(ad) {
        this.adElement.innerHTML = `
            <div class="text-ad" style="cursor: pointer;" onclick="window.gameAdSystem.handleAdClick()">
                <h3 style="color: var(--accent-color); margin-bottom: 5px;">${ad.title}</h3>
                <p style="margin-bottom: 8px;">${ad.subtitle}</p>
                <small style="color: var(--text-secondary); font-style: italic;">${ad.disclaimer}</small>
            </div>
        `;
    }

    nextAd() {
        this.shuffleIndex++;

        // If we've gone through all ads, reshuffle for next round
        if (this.shuffleIndex >= this.shuffledAds.length) {
            console.log('Completed full ad rotation, reshuffling...');
            this.shuffleAds(); // This resets shuffleIndex to 0
        }

        this.showCurrentAd();
    }

    bindEvents() {
        if (!this.adElement) return;

        this.adElement.addEventListener('click', () => {
            this.handleAdClick();
        });

        // Add hover effects for text ads
        this.adElement.addEventListener('mouseenter', () => {
            this.adElement.style.transform = 'scale(1.02)';
        });

        this.adElement.addEventListener('mouseleave', () => {
            this.adElement.style.transform = 'scale(1)';
        });
    }


    update() {
        // Called from main game loop - could add dynamic ad behavior here
        if (Math.random() < 0.001) { // Very rare
            this.adElement?.classList.add('ad-blinking');
            setTimeout(() => {
                this.adElement?.classList.remove('ad-blinking');
            }, 2000);
        }
    }

    // Method to manually add new image ads (for when JPGs are added to folder)
    async refreshAds() {
        console.log('Refreshing ad library...');
        await this.loadImageAds();

        if (this.ads.length === 0) {
            this.ads = this.textAds;
        }

        // Reshuffle with new ads
        this.shuffleAds();

        console.log(`Ad library refreshed: ${this.ads.length} ads available`);
    }

    handleAdClick() {
        if (!this.currentAdData) return;

        // Get the appropriate message for this ad
        let adConfig;
        if (this.currentAdData.type === 'image') {
            adConfig = gameConfig.ads.adMessages[this.currentAdData.filename] || gameConfig.ads.adMessages['default'];
        } else {
            // For text ads, use a default message
            adConfig = {
                title: this.currentAdData.title,
                message: this.currentAdData.subtitle + '\n\n' + this.currentAdData.disclaimer,
                buttonText: 'OK'
            };
        }

        this.showAdPopup(adConfig);

        // Trigger achievement for ad click
        if (window.gameAchievements) {
            window.gameAchievements.triggerAdClick();
        }
    }

    showAdPopup(adConfig) {
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
            <h2 style="color: var(--accent-color); margin-bottom: 20px; font-size: 1.4em;">${adConfig.title}</h2>
            <p style="color: var(--text-primary); margin-bottom: 25px; line-height: 1.6; white-space: pre-line;">${adConfig.message}</p>
            <button id="ad-popup-ok" style="
                padding: 12px 25px;
                background: var(--accent-color);
                color: var(--primary-bg);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: inherit;
                font-weight: bold;
                font-size: 1.1em;
                box-shadow: 0 4px 12px rgba(0, 204, 170, 0.4);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">${adConfig.buttonText}</button>
        `;

        document.body.appendChild(popup);

        // Single click anywhere on popup closes it
        popup.addEventListener('click', () => {
            popup.remove();
        });
    }


    destroy() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
    }
}