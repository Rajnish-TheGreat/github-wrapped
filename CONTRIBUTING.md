# 🤝 Contributing to GitHub Wrapped

First off, thanks for taking the time to contribute! 🎉

## Code of Conduct

Be respectful, inclusive, and considerate of others. This is a Hack Club project - let's keep it fun and welcoming!

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected vs actual** behavior
- **Screenshots** if applicable
- **Environment**: Browser, OS, Node version

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Clear use case** for the feature
- **Why it's useful** to most users
- **Possible implementation** if you have ideas

### 🔀 Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Create a pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/github-wrapped.git
cd github-wrapped

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/       # React components (Slides)
├── services/        # API services (GitHub API)
├── utils/           # Utility functions (data processing)
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Coding Guidelines

### JavaScript/React
- Use functional components with hooks
- Keep components focused and reusable
- Use meaningful variable names
- Add comments for complex logic

### Styling
- Use Tailwind CSS utility classes
- Keep custom CSS in `index.css`
- Follow existing color scheme
- Maintain responsive design

### Git Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Reference issues when applicable

Examples:
```
feat: Add new personality type for Python developers
fix: Resolve animation timing issue on Safari
docs: Update README with deployment instructions
style: Improve slide transition animations
```

## Adding New Features

### Adding a New Slide

1. Create slide component in `src/components/Slides.jsx`:
```javascript
export const SlideNewFeature = ({ data }) => {
  return (
    <motion.div className="h-screen flex items-center justify-center gradient-blue-purple p-8">
      {/* Your slide content */}
    </motion.div>
  );
};
```

2. Add to slides array in `src/App.jsx`:
```javascript
const slides = wrappedData ? [
  <SlideIntro key="intro" user={wrappedData.user} />,
  // ... existing slides
  <SlideNewFeature key="new" data={wrappedData.yourData} />,
] : [];
```

### Adding New Data Insights

1. Update `src/utils/dataProcessor.js`:
```javascript
export const processGitHubData = (data) => {
  // ... existing processing
  
  const newInsight = calculateNewInsight(data);
  
  return {
    // ... existing return
    insights: {
      // ... existing insights
      newInsight,
    },
  };
};
```

2. Use in your slide component

### Adding New GitHub Data

1. Add fetch function to `src/services/github.js`:
```javascript
export const fetchNewData = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/new-endpoint`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};
```

2. Update `fetchAllUserData` to include it

## Testing

Before submitting:

1. **Manual testing**:
   - Test with multiple GitHub usernames
   - Test all slide navigation
   - Test download feature
   - Test on different browsers
   - Test responsive design

2. **Check for errors**:
   - No console errors
   - All images load
   - Animations are smooth

3. **Verify builds**:
```bash
npm run build
npm run preview
```

## Areas We'd Love Help With

- 🎨 New slide designs
- 📊 Additional GitHub insights
- 🌍 Internationalization
- ♿ Accessibility improvements
- 🎭 More personality types
- 📱 Mobile experience
- ⚡ Performance optimizations
- 🧪 Testing infrastructure
- 📝 Documentation

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## Recognition

Contributors will be:
- Listed in the README
- Celebrated in release notes
- Part of the Hack Club community! 🎉

---

**Happy coding! Let's make GitHub Wrapped awesome together! 🚀**
