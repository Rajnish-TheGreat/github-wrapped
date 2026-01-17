# 🚀 Quick Start Guide

Get GitHub Wrapped running in 2 minutes!

## Prerequisites

- Node.js 16+ (Check with: `node --version`)
- npm (comes with Node.js)

## Installation & Running

```bash
# 1. Navigate to the project
cd github-wrapped

# 2. Install dependencies (first time only)
npm install

# 3. Start the development server
npm run dev
```

The app will open at **http://localhost:5173**

## Using the App

1. **Enter a GitHub Username**
   - Try: `torvalds`, `gaearon`, `octocat`, or your own!
   
2. **Wait for Loading**
   - The app fetches data from GitHub's public API
   - Takes 2-5 seconds depending on user activity
   
3. **Navigate Through Slides**
   - **Buttons**: Click Previous/Next
   - **Keyboard**: Use ← → arrow keys
   - **Dots**: Click any dot to jump to that slide
   
4. **Download & Share**
   - Click the **📸 Save Image** button
   - Each slide saves as a high-quality PNG
   - Perfect for sharing on social media!

## Slides Overview

1. **Intro** - Welcome with profile picture
2. **Stats** - Key numbers (repos, stars, commits)
3. **Languages** - Top programming languages
4. **Activity** - Most active day & top repo
5. **Personality** - Fun developer traits

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

The production files will be in the `dist/` folder.

## Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing
Try cleaning and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

### GitHub API Rate Limit
- Without authentication: 60 requests/hour
- The app uses 3 requests per username
- Rate limit resets every hour

### Build Errors
Make sure you're using Node 16+:
```bash
node --version  # Should be v16.x.x or higher
```

## Tech Stack Quick Reference

- **React 18** - UI framework
- **Vite 4** - Build tool (super fast!)
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations
- **html2canvas** - Screenshot feature

## Development Tips

### Hot Reload
Vite provides instant hot module replacement. Just save any file and see changes immediately!

### Console Warnings
Some dependency warnings about Node.js version are normal and won't affect functionality.

### Testing Different Users
Try these to see varied results:
- `torvalds` - Lots of C code
- `gaearon` - React maintainer
- `tj` - Node.js pioneer
- `sindresorhus` - Prolific OSS contributor

## File Structure

```
src/
├── App.jsx              # Main application
├── components/
│   └── Slides.jsx       # All slide components
├── services/
│   └── github.js        # GitHub API calls
└── utils/
    └── dataProcessor.js # Data analysis
```

## Next Steps

- 📖 Read [README.md](README.md) for full documentation
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- ✨ See [FEATURES.md](FEATURES.md) for complete feature list
- 🤝 Read [CONTRIBUTING.md](CONTRIBUTING.md) to add features

## Need Help?

Open an issue or check the documentation files!

---

**That's it! You're ready to explore GitHub Wrapped! 🎉**
