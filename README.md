# Queue Game 🎮
*by Sagarika Games*

A satirical browser-based game where players wait in increasingly absurd queues that loop infinitely. The waiting IS the gameplay!

## 🎯 Game Concept

Players think they're waiting to play a game, but the waiting is the actual game. Each completed queue unlocks another queue with escalating themes, parody advertisements, and the ultimate revelation that the journey is the destination.

## 🎮 Queue Levels

1. **Queue Simulator** - Basic terminal-style waiting
2. **Queue Simulator 2: The Queuening** - Corporate premium experience
3. **Queue Simulator 3: Queue Hard** - Action movie theme
4. **Queue Simulator 4: Queue Wars** - Space/sci-fi theme
5. **Queue Simulator 5: Queue Royale** - Battle royale theme
6. **Queue Simulator 6: The Queue Awakens** - Mystical/zen theme
7. **Queue Simulator ∞** - Infinite loop with glitch effects

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:3000` to start waiting!

## 📁 Project Structure

```
queue-simulator/
├── index.html                 # Main HTML structure
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── src/
│   ├── main.js               # Entry point & game initialization
│   ├── queue-engine.js       # Core queue logic & algorithms
│   ├── ad-system.js          # Advertisement rotation system with preloading
│   ├── audio-manager.js      # Sound effects & music
│   ├── achievement-system.js # Progress tracking & unlocks
│   ├── theme-manager.js      # Visual theme switching
│   ├── news-system.js        # News feed rotation system
│   ├── news-feed.js          # News content database
│   └── config.js             # Game configuration settings
├── assets/
│   ├── styles/
│   │   ├── main.css          # Core styling (neon cyan theme)
│   │   ├── themes.css        # Queue level themes
│   │   └── animations.css    # Transitions & effects
│   ├── images/
│   │   ├── ads/              # JPG banner advertisements with manifest
│   │   ├── sagarika_games.png # Sagarika Games logo
│   │   └── sagarika_games_text.png # Sagarika Games text banner
│   └── sounds/               # Audio files (placeholder)
└── aimemory/
    └── advertisement-requirements.md # Ad system specs
```

## 🎨 Adding Custom Advertisements

1. Create satirical JPG banner ads (800x200px recommended)
2. Save them in `assets/images/ads/` with descriptive names:
   - `quetendo64.jpg`
   - `talk-show-charity.jpg`
   - `alienwarez-gaming-pc.jpg`
   - `queuelife-insurnace.jpg`
   - `wandering-queue-guild.jpg`
   - etc.
3. Update `manifest.json` in the ads folder with new filenames
4. The system preloads all images for instant switching
5. Falls back to text ads if no images found

### Performance Features
- **Image Preloading**: All ad images load in parallel during initialization
- **Instant Switching**: Preloaded images display immediately during rotation
- **Background Loading**: Loading happens asynchronously without blocking the UI
- **Loading Indicators**: Shows "Loading Ads..." message while images load

## 🏆 Achievement System

- **First Wait** - Complete your first queue
- **Patience is a Virtue** - Wait for 10 minutes straight
- **Queue Veteran** - Reach Queue Simulator 5
- **Stockholm Syndrome** - Restart from Queue 1 voluntarily
- **Eternal Waiter** - Spend 1 hour total in queues
- **Queue Evangelist** - Share the game with others
- And more!

## 🎭 Features

### Queue Mechanics
- Dynamic position updates with unpredictable algorithms
- Fake wait times that change wildly
- Random queue events (mass exodus: -200-1200 positions, VIP invasion: +1000-3000 positions)
- Special events with cooldowns and dramatic effects
- Fake premium features that backfire hilariously

### Visual & Audio
- **Neon Cyan Theme**: Beautiful cyan color scheme throughout
- 7 distinct visual themes with smooth transitions
- Progressive enhancement from basic to elaborate
- Particle effects for special themes
- Audio system with theme-appropriate sounds (placeholder)

### News System
- **Live News Feed**: Rotating satirical news about queue culture
- **42 News Articles**: From "Queue Game Reaches 1 Million Players" to "Queue Ghosts Sightings Increase"
- **Update Timer**: Shows "Next update in X seconds" for transparency
- **Categories**: Business, health, technology, lifestyle, gaming, science, and more
- **Random Rotation**: Avoids showing the same news twice in a row

### Branding & Contact
- **Sagarika Games Branding**: Professional logo and text banner throughout
- **Contact Integration**: Email contact (sagarikagames@protonmail.com) with fallback
- **Branded Elements**: Logo on start screen, footer branding in-game
- **Contact Popup**: Professional contact dialog with email copy functionality

### Progress & Stats
- localStorage persistence for progress
- Comprehensive statistics tracking
- Achievement unlock system
- Share functionality

## 🛠 Technical Details

- **Framework**: Vite + Vanilla JavaScript (ES6 modules)
- **Styling**: CSS3 with custom properties for theming (neon cyan theme)
- **Performance**: Image preloading, async loading, background processing
- **Audio**: Web Audio API (placeholder implementation)
- **Storage**: localStorage for persistence
- **Configuration**: Centralized config system in `config.js`
- **News System**: Dynamic content rotation with timestamp tracking
- **Contact System**: Email integration with clipboard fallback
- **Deployment**: Static hosting compatible

## 🎪 Parody Elements

The game satirizes:
- Digital queue frustrations
- Premium gaming features
- In-game advertisements
- Achievement addiction
- The modern gaming experience

All "premium" features are jokes that either don't work or make things worse!

## 🎯 Success Metrics

- Time spent waiting (average session duration)
- Queue completion rates
- Return visits and voluntary restarts
- Social sharing and meme potential

## 🚀 Deployment

Build the project:
```bash
npm run build
```

Deploy the `dist/` folder to any static hosting service:
- Netlify Drop
- Vercel
- Surge.sh
- GitHub Pages

## 🐛 Development Notes

- The development server includes hot module replacement
- All systems are modular and can be tested independently
- Console logging provides debugging information
- Progressive enhancement ensures core functionality works everywhere

## 📞 Contact & Support

**Developer**: Sagarika Games
**Email**: sagarikagames@protonmail.com
**Contact Method**: Use the "Contact Us" button in-game or email directly

For bug reports, feature requests, or general feedback, please reach out via email.

## 📈 Future Enhancements

- Enhanced special events and queue mechanics
- More news articles and dynamic content
- Seasonal queue themes
- Multiplayer queue leaderboards
- Mobile app with push notifications
- User-generated queue content
- Physical board game version

## 🎨 Current Visual Theme

**Neon Cyan**: The game features a beautiful neon cyan color scheme with:
- Bright cyan text (#00ffff)
- Cyan accent elements (#00ccff)
- Cyan glows and shadows throughout the UI
- Blue-cyan gradients on interactive elements
- Professional appearance with electric cyan aesthetics

---

**Remember**: The goal isn't to escape the queue—the queue IS the destination! 🎯

*© 2025 Sagarika Games*