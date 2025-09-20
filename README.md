# Queue Simulator 🎮

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
│   ├── ad-system.js          # Advertisement rotation system
│   ├── audio-manager.js      # Sound effects & music
│   ├── achievement-system.js # Progress tracking & unlocks
│   └── theme-manager.js      # Visual theme switching
├── assets/
│   ├── styles/
│   │   ├── main.css          # Core styling
│   │   ├── themes.css        # Queue level themes
│   │   └── animations.css    # Transitions & effects
│   ├── images/
│   │   └── ads/              # JPG banner advertisements
│   └── sounds/               # Audio files (placeholder)
└── aimemory/
    └── advertisement-requirements.md # Ad system specs
```

## 🎨 Adding Custom Advertisements

1. Create satirical JPG banner ads (800x200px recommended)
2. Save them in `assets/images/ads/` with descriptive names:
   - `skipline-pro.jpg`
   - `queue-anxiety-pills.jpg`
   - `gaming-chair-supreme.jpg`
   - etc.
3. The system automatically detects and rotates through JPG files
4. Falls back to text ads if no images found

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
- Random queue events (position jumps, premium cuts, maintenance)
- Fake premium features that backfire hilariously

### Visual & Audio
- 7 distinct visual themes with smooth transitions
- Progressive enhancement from basic to elaborate
- Particle effects for special themes
- Audio system with theme-appropriate sounds (placeholder)

### Progress & Stats
- localStorage persistence for progress
- Comprehensive statistics tracking
- Achievement unlock system
- Share functionality

## 🛠 Technical Details

- **Framework**: Vite + Vanilla JavaScript
- **Styling**: CSS3 with custom properties for theming
- **Audio**: Web Audio API (placeholder implementation)
- **Storage**: localStorage for persistence
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

## 📈 Future Enhancements

- Seasonal queue themes
- Multiplayer queue leaderboards
- Mobile app with push notifications
- User-generated queue content
- Physical board game version

---

**Remember**: The goal isn't to escape the queue—the queue IS the destination! 🎯