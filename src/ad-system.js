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

        // Try to load image ads first
        await this.loadImageAds();

        // If no image ads found, use text ads
        if (this.ads.length === 0) {
            console.log('No image ads found, using text ads');
            this.ads = this.textAds;
        }

        this.startRotation();
        this.bindEvents();

        console.log(`Ad system initialized with ${this.ads.length} ads`);
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
                console.log(`✓ Ad image found: ${src}`);
                resolve(true);
            };
            img.onerror = () => {
                console.log(`✗ Ad image not found: ${src}`);
                resolve(false);
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

    startRotation() {
        if (this.ads.length === 0) return;

        // Show first ad immediately
        this.showCurrentAd();

        // Set up rotation based on config
        this.rotationInterval = setInterval(() => {
            this.nextAd();
        }, gameConfig.ads.rotationIntervalMs);
    }

    showCurrentAd() {
        if (!this.adElement || this.ads.length === 0) return;

        const ad = this.ads[this.currentAdIndex];
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
        this.adElement.innerHTML = `
            <img src="${ad.src}"
                 alt="${ad.alt}"
                 style="max-width: 100%; height: auto; border-radius: 4px; cursor: pointer;"
                 onerror="this.style.display='none'"
                 onclick="window.gameAdSystem.handleAdClick()">
        `;
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
        this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
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

    refreshAds() {
        // Stop current rotation
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }

        // Reload ads and restart rotation
        this.init();
        console.log('Ads refreshed');
    }

    destroy() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
    }
}