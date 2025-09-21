# Queue Game - Operations Support Guide

*Technical documentation for operations team members*

## 🎯 Project Overview

**Queue Game** is a satirical browser-based game where players wait in increasingly absurd queues. The waiting IS the gameplay. Built by Sagarika Games, it features 7 progressive queue levels with escalating themes and the ultimate revelation that the journey is the destination.

## 🏗️ Tech Stack

### Frontend
- **Framework**: Vanilla JavaScript (ES6 modules) with Vite build system
- **Styling**: CSS3 with custom properties, neon cyan theme
- **Audio**: Web Audio API with background music and sound effects
- **Storage**: localStorage for game state persistence
- **Analytics**: Google Analytics (gtag.js) tracking

### Build & Development
- **Build Tool**: Vite v5.4.20
- **Package Manager**: npm
- **Node.js**: Compatible with modern Node versions
- **Hot Reload**: Vite dev server with HMR

### Hosting & Deployment
- **Production**: Netlify (automatic deployment)
- **Domain**: [Your Netlify domain]
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/`

## 📁 Repository Structure

```
queuegame/
├── index.html                 # Main HTML entry point
├── package.json              # Dependencies and build scripts
├── vite.config.js            # Vite build configuration
├── README.md                 # Project documentation
├── OPERATIONS_GUIDE.md       # This document
├── src/                      # Source code
│   ├── main.js               # Game initialization and core logic
│   ├── queue-engine.js       # Queue progression algorithms
│   ├── ad-system.js          # Advertisement rotation system
│   ├── audio-manager.js      # Music and sound effects
│   ├── achievement-system.js # Progress tracking and unlocks
│   ├── theme-manager.js      # Visual theme switching
│   ├── news-system.js        # News feed rotation
│   ├── news-feed.js          # News content database
│   └── config.js             # Game configuration settings
├── assets/                   # Static assets
│   ├── styles/               # CSS files
│   │   ├── main.css          # Core styling (neon cyan theme)
│   │   ├── themes.css        # Queue level themes
│   │   └── animations.css    # Transitions and effects
│   ├── images/               # Images and branding
│   │   ├── ads/              # Banner advertisements (JPG)
│   │   ├── sagarika_games.png # Company logo
│   │   └── sagarika_games_text.png # Text banner
│   └── sounds/               # Audio files
│       └── lofi_seville.mp3  # Background music
└── dist/                     # Built files (generated)
```

## 🔗 Repository Information

- **GitHub Repository**: https://github.com/amitasghar/queuegame
- **Branch**: `master` (main production branch)
- **Owner**: amitasghar
- **Visibility**: Public repository

## 🚀 Deployment Pipeline

### Automatic Deployment (Netlify)
1. **Trigger**: Push to `master` branch on GitHub
2. **Build Process**:
   - Netlify automatically detects changes
   - Runs `npm install` to install dependencies
   - Executes `npm run build` to create production build
   - Deploys `dist/` folder contents
3. **Deploy Time**: ~2-3 minutes
4. **Status**: Check Netlify dashboard for build status

### Manual Deployment (if needed)
```bash
# Clone repository
git clone https://github.com/amitasghar/queuegame.git
cd queuegame

# Install dependencies
npm install

# Build for production
npm run build

# Deploy dist/ folder to any static hosting
```

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🔧 Configuration Files

### package.json
- **Dependencies**: Vite and build tools
- **Scripts**: dev, build, preview commands
- **Version**: Tracks project version

### vite.config.js
- **Asset Copying**: Custom plugin copies ads/ and sounds/ folders
- **Base Path**: Configured for static hosting
- **Build Settings**: Output directory and optimization

### src/config.js
- **Game Settings**: All configurable game parameters
- **Audio Settings**: Volume levels and music file paths
- **News Rotation**: Timing and content settings
- **Ad System**: Rotation intervals and image paths

## 📊 Monitoring & Analytics

### Google Analytics
- **Tracking ID**: G-WMHDNYWQ3P
- **Events Tracked**: Page views, game sessions, user interactions
- **Access**: Check Google Analytics dashboard

### Console Logging
- **Development**: Extensive console logging for debugging
- **Production**: Key events and errors logged
- **Audio Debug**: `debugAudio()` and `forcePlayMusic()` functions available

## 🎵 Audio System

### Background Music
- **File**: `./assets/sounds/lofi_seville.mp3`
- **Volume**: Configurable in settings (default 40%)
- **Autoplay Handling**: Automatic retry on user interaction
- **Browser Compatibility**: Handles autoplay restrictions

### Music Controls
- **Mute/Unmute**: Full audio control
- **Music Toggle**: Separate background music control
- **Status Indicators**: Real-time playback status
- **Settings Popup**: Volume control and force play options

## 🎨 Branding & Assets

### Company Branding
- **Company**: Sagarika Games
- **Contact**: sagarikagames@protonmail.com
- **Logo**: `./assets/images/sagarika_games.png`
- **Text Banner**: `./assets/images/sagarika_games_text.png`

### Advertisement System
- **Location**: `./assets/images/ads/`
- **Format**: JPG banner ads (800x200px recommended)
- **Rotation**: Automatic rotation every 20 seconds
- **Fallback**: Text ads if images unavailable

## 🐛 Troubleshooting

### Common Issues

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies installed: `npm install`
- Check for TypeScript/syntax errors in source files

**Asset Loading Issues**
- Ensure Vite config copies assets correctly
- Check file paths in `src/config.js`
- Verify assets exist in correct directories

**Music Not Playing**
- Browser autoplay restrictions (expected)
- Use debugging functions: `debugAudio()`, `forcePlayMusic()`
- Check console for audio errors
- Verify music file exists and is accessible

**Netlify Deployment Issues**
- Check build logs in Netlify dashboard
- Verify build command and publish directory
- Ensure all dependencies in package.json

### Debug Tools
```javascript
// Available in browser console
debugAudio()      // Show audio system status
forcePlayMusic()  // Force attempt music playback
gameConfig        // View current configuration
window.gameInstance // Access game instance
```

## 📞 Support Contacts

### Development
- **Primary Contact**: Sagarika Games
- **Email**: sagarikagames@protonmail.com
- **Response Time**: 24-48 hours

### Infrastructure
- **GitHub**: Repository issues and pull requests
- **Netlify**: Deployment and hosting dashboard
- **Analytics**: Google Analytics for usage metrics

## 🔄 Update Process

### Content Updates
1. **News Articles**: Edit `src/news-feed.js`
2. **Game Settings**: Modify `src/config.js`
3. **Advertisements**: Add JPG files to `assets/images/ads/`

### Code Updates
1. Make changes to source files
2. Test locally with `npm run dev`
3. Commit and push to `master` branch
4. Automatic deployment to Netlify

### Emergency Rollback
1. Identify last working commit in GitHub
2. Revert to that commit: `git revert <commit-hash>`
3. Push revert commit to trigger new deployment

## 📋 Maintenance Checklist

### Weekly
- [ ] Check Netlify deployment status
- [ ] Monitor Google Analytics for traffic
- [ ] Verify game functionality on live site

### Monthly
- [ ] Review error logs in browser console
- [ ] Check for npm security updates
- [ ] Verify all assets loading correctly
- [ ] Test audio functionality across browsers

### As Needed
- [ ] Update news articles for freshness
- [ ] Add new advertisement banners
- [ ] Review and update game configuration
- [ ] Monitor repository for issues/feedback

---

*Last Updated: September 2025*
*Document Version: 1.0*