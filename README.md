# 🎉 GitHub Wrapped

> **A beautiful, interactive web app that generates a Spotify Wrapped-style visualization of your GitHub activity.**

Perfect for Hack Club challenges and showcasing your coding journey! ✨

![GitHub Wrapped Demo](https://img.shields.io/badge/Status-Live-success)
![Node Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

[Quick Start](#-quick-start) • [Features](#-features) • [Demo](#-how-to-use) • [Deploy](#-deployment)

## ✨ Features

- 🎨 **Beautiful Animations**: Smooth, engaging transitions using Framer Motion
- 📊 **Comprehensive Stats**: Total repos, stars, commits, and more
- 🌈 **Language Breakdown**: See your most-used programming languages
- 📅 **Activity Insights**: Discover your most active day and starred repos
- 🎭 **Developer Personality**: Get fun personality traits based on your coding style
- 📸 **Share Your Results**: Download any slide as an image to share on social media
- ⌨️ **Keyboard Navigation**: Use arrow keys to navigate through slides
- 🚀 **Fast & Responsive**: Built with React + Vite for lightning-fast performance

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd github-wrapped
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Use

1. Enter any GitHub username in the input field
2. Click "Generate My Wrapped 🎉"
3. Navigate through the beautiful slides using:
   - Arrow buttons at the bottom
   - Keyboard arrow keys (← →)
   - Dot indicators
4. Download any slide as an image using the "📸 Save Image" button
5. Share your results on social media!

## 🛠️ Built With

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **html2canvas** - Screenshot functionality
- **GitHub API** - Data source

## 📁 Project Structure

```
github-wrapped/
├── src/
│   ├── components/
│   │   └── Slides.jsx          # Slide components
│   ├── services/
│   │   └── github.js           # GitHub API service
│   ├── utils/
│   │   └── dataProcessor.js    # Data analysis logic
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Slides Overview

1. **Intro Slide** - Welcome screen with user profile
2. **Stats Slide** - Key metrics (repos, stars, commits, etc.)
3. **Languages Slide** - Top programming languages with percentages
4. **Activity Slide** - Most active day and most starred repository
5. **Personality Slide** - Developer personality traits

## 🔧 Customization

### Adding New Slides

1. Create a new slide component in `src/components/Slides.jsx`
2. Add it to the slides array in `src/App.jsx`

### Changing Colors

Edit the gradient classes in `src/index.css` or modify the Tailwind config in `tailwind.config.js`

### Adding More Insights

Extend the `processGitHubData` function in `src/utils/dataProcessor.js` to calculate additional metrics

## 🌟 Features for Hack Club Judges

- ✅ **Unique & Engaging**: Visual storytelling of developer activity
- ✅ **Immediately Useful**: Works with any GitHub username
- ✅ **Shareable**: Download feature encourages viral spread
- ✅ **Well-Coded**: Clean, modular architecture
- ✅ **Great UX**: Smooth animations and intuitive navigation
- ✅ **No Backend Required**: Pure frontend app using public GitHub API

## 🚧 Future Enhancements

- [ ] Year selection (2023, 2024, 2025)
- [ ] Contribution graph visualization
- [ ] Compare with previous years
- [ ] Social share buttons (Twitter, Discord)
- [ ] Custom themes
- [ ] Animation speed controls
- [ ] More personality types
- [ ] GitHub login for private repo stats

## 📝 API Rate Limits

The app uses the GitHub REST API without authentication, which has a rate limit of 60 requests per hour per IP. For higher limits, you can add a GitHub personal access token.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📄 License

MIT License - feel free to use this for your own projects!

## 👨‍💻 Made for Hack Club

This project was created as a submission for a Hack Club challenge. It demonstrates:
- Modern web development practices
- Creative data visualization
- User engagement through interactivity
- Clean, maintainable code

## 🙏 Acknowledgments

- Inspired by Spotify Wrapped
- Built for the awesome Hack Club community
- Thanks to GitHub for their public API

---

**Happy Coding! 🚀**

Try it with your own GitHub username and share your results!
