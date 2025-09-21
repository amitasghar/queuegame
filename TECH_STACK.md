# Queue Game - Tech Stack Documentation

## Overview
Queue Game is a satirical browser-based idle game built with modern web technologies. This document outlines the complete tech stack and architecture for creating similar games.

## Core Technologies

### Frontend Framework
- **Vanilla JavaScript (ES6+ Modules)** - Pure JavaScript with modern module system
- **No external frameworks** - Lightweight, dependency-free approach
- **Module-based architecture** - Clean separation of concerns

### Build Tool
- **Vite 5.0** - Modern, fast build tool and development server
  - Hot module replacement during development
  - Optimized production builds
  - Asset bundling and optimization
  - Custom plugins for asset copying

### Development Environment
- **Node.js** - For build tooling and development server
- **NPM** - Package management
- **ES6 Modules** - Native browser module system

## Project Structure

```
queuegame/
├── src/                          # JavaScript modules
│   ├── main.js                   # Entry point and game orchestration
│   ├── config.js                 # Game configuration and settings
│   ├── queue-engine.js           # Core game logic and state management
│   ├── ad-system.js              # Advertisement rotation system
│   ├── audio-manager.js          # Audio playback and controls
│   ├── achievement-system.js     # Achievement tracking and unlocks
│   ├── theme-manager.js          # Dynamic theming system
│   └── news-system.js            # News ticker functionality
├── assets/
│   ├── styles/                   # CSS stylesheets
│   │   ├── main.css              # Core styling
│   │   ├── themes.css            # Theme-specific styles
│   │   └── animations.css        # Animation definitions
│   ├── images/                   # Game assets
│   │   ├── ads/                  # Advertisement images
│   │   └── branding/             # Logo and branding assets
│   └── sounds/                   # Audio files
├── index.html                    # Main HTML entry point
├── package.json                  # Project dependencies and scripts
├── vite.config.js                # Build configuration
└── dist/                         # Production build output
```

## Architecture Patterns

### Modular Design
- **Separation of Concerns** - Each system handled by dedicated modules
- **Event-Driven Architecture** - Systems communicate via custom events
- **Configuration-Driven** - Game behavior controlled through config files

### Core Systems

#### 1. Game Engine (`queue-engine.js`)
- State management with localStorage persistence
- Timer-based progression system
- Event emission for state changes
- Queue progression logic and completion handling

#### 2. Audio System (`audio-manager.js`)
- Background music playback
- Volume controls and muting
- Browser autoplay policy handling
- User interaction-based audio enablement

#### 3. Achievement System (`achievement-system.js`)
- Progress tracking and unlocking
- Event-based trigger system
- Statistics collection
- Persistent storage

#### 4. Theming System (`theme-manager.js`)
- Dynamic CSS custom property manipulation
- Theme switching with smooth transitions
- Queue-specific visual themes

#### 5. Content Systems
- **Ad System** - Image rotation with click tracking
- **News System** - Dynamic content with rotation
- **UI Controls** - Popup dialogs and user interactions

## Key Technologies & Techniques

### CSS Architecture
- **CSS Custom Properties (Variables)** - Dynamic theming
- **Flexbox/Grid Layouts** - Responsive design
- **CSS Animations** - Smooth transitions and effects
- **Media Queries** - Mobile responsiveness

### JavaScript Features
- **ES6+ Modules** - Modern import/export syntax
- **Classes** - Object-oriented design patterns
- **Async/Await** - Asynchronous operations
- **LocalStorage API** - Client-side data persistence
- **Custom Events** - Inter-system communication
- **RequestAnimationFrame** - Smooth game loop

### Browser APIs Used
- **Web Audio API** - Sound playback
- **LocalStorage** - Save game data
- **Visibility API** - Pause when tab hidden
- **Clipboard API** - Copy functionality
- **Google Analytics** - User tracking

## Build Configuration

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      plugins: [
        // Custom asset copying plugin
      ]
    }
  },
  server: {
    port: 3000,
    open: true
  },
  base: './'
})
```

### Asset Management
- Automatic asset copying for images and sounds
- Dynamic asset loading with fallbacks
- Optimized bundling for production

## Game Mechanics Architecture

### Core Loop
1. **Initialization** - Load saved state or create new game
2. **Game Loop** - RequestAnimationFrame-based updates
3. **State Updates** - Position changes, timer updates
4. **Event Handling** - User interactions and system events
5. **Persistence** - Automatic save to localStorage

### State Management
- Central game state object
- Automatic serialization/deserialization
- Event-driven state updates
- Rollback capabilities for errors

### Content Management
- JSON-based configuration
- Dynamic content loading
- Extensible system for new features

## Performance Considerations

### Optimization Techniques
- **Efficient DOM Updates** - Minimal reflows and repaints
- **Event Delegation** - Reduced event listener overhead
- **Lazy Loading** - Assets loaded as needed
- **Memory Management** - Proper cleanup of timers and events

### Browser Compatibility
- Modern browser features with graceful degradation
- ES6+ with no transpilation (modern browsers only)
- CSS fallbacks for older browser support

## Deployment Strategy

### Development
```bash
npm run dev    # Start development server
```

### Production Build
```bash
npm run build  # Create optimized production build
npm run preview # Preview production build locally
```

### Hosting Requirements
- Static file hosting (GitHub Pages, Netlify, Vercel)
- HTTPS required for audio autoplay
- No server-side requirements

## Extensibility & Customization

### Adding New Features
1. Create new module in `src/`
2. Import and initialize in `main.js`
3. Add configuration options to `config.js`
4. Implement event-based communication

### Customization Points
- **Themes** - Add new CSS theme definitions
- **Content** - Modify news items, ads, achievements
- **Game Logic** - Adjust timing, progression, events
- **Audio** - Replace background music and sound effects

## Best Practices

### Code Organization
- One class per module
- Clear naming conventions
- Comprehensive error handling
- Extensive configuration options

### User Experience
- Progressive enhancement
- Accessibility considerations
- Mobile-first responsive design
- Performance monitoring

### Development Workflow
- Hot module replacement for fast iteration
- Source maps for debugging
- Linting and code formatting
- Version control with meaningful commits

## Dependencies

### Production Dependencies
- **None** - Zero runtime dependencies

### Development Dependencies
- **Vite ^5.0.0** - Build tool and dev server

## Getting Started with Similar Projects

### 1. Initial Setup
```bash
npm init
npm install --save-dev vite
```

### 2. Basic Structure
- Create `index.html` with basic markup
- Set up `src/main.js` as entry point
- Configure `vite.config.js` for build settings

### 3. Core Systems
- Implement game state management
- Add event-driven architecture
- Create modular system design
- Set up persistence layer

### 4. Content & Polish
- Add audio system with user controls
- Implement theming capabilities
- Create responsive design
- Add analytics and tracking

This tech stack provides a solid foundation for creating browser-based games with modern web technologies while maintaining simplicity and performance.