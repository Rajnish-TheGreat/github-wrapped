# 🚀 Deployment Guide for GitHub Wrapped

This guide will help you deploy your GitHub Wrapped app to various platforms.

## Prerequisites

Before deploying, make sure your app works locally:
```bash
npm install
npm run dev
```

## Option 1: Deploy to Vercel (Recommended)

Vercel is perfect for React apps and provides automatic deployments.

### Steps:

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy from command line**:
```bash
cd github-wrapped
vercel
```

3. **Or use the Vercel website**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"

### Configuration:
Vercel will automatically detect the build settings:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Option 2: Deploy to Netlify

Netlify is another great option for static sites.

### Steps:

1. **Using Netlify CLI**:
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

2. **Or use Netlify website**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

## Option 3: Deploy to GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json scripts**:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**:
```javascript
export default defineConfig({
  base: '/github-wrapped/', // Replace with your repo name
  plugins: [react()],
})
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

Your site will be available at: `https://yourusername.github.io/github-wrapped/`

## Option 4: Deploy to Cloudflare Pages

Fast and free with global CDN.

### Steps:

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect your GitHub repository
4. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click "Save and Deploy"

## Building for Production

To build the app for production locally:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview the production build:

```bash
npm run preview
```

## Environment Variables

If you add a GitHub personal access token for higher API rate limits:

1. Create a `.env` file:
```
VITE_GITHUB_TOKEN=your_token_here
```

2. Update `src/services/github.js` to use it:
```javascript
const headers = import.meta.env.VITE_GITHUB_TOKEN 
  ? { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
  : {};

const response = await fetch(url, { headers });
```

3. **Important**: Add `.env` to `.gitignore` (already done)

4. Add the environment variable to your deployment platform:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Build & deploy → Environment
   - **Cloudflare**: Settings → Environment variables

## Custom Domain

### Vercel:
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS

## Performance Tips

1. **Enable compression** on your hosting platform (usually automatic)
2. **Add caching headers** for static assets
3. **Use CDN** - Most platforms provide this automatically
4. **Optimize images** if you add custom graphics

## Monitoring

### Check your deployment:
- Vercel: Automatic analytics included
- Netlify: Built-in analytics
- Add Google Analytics if needed

## Troubleshooting

### Build fails:
- Check Node.js version (16+ required for Vite 4)
- Run `npm install` to ensure all dependencies are installed
- Check for any console errors

### App works locally but not in production:
- Check that all environment variables are set
- Ensure `base` URL is correct in `vite.config.js`
- Check browser console for errors

### API rate limiting:
- GitHub API has a limit of 60 requests/hour without auth
- Add a GitHub token for 5000 requests/hour

## Updating Your Deployment

Most platforms auto-deploy when you push to your main branch:

```bash
git add .
git commit -m "Update app"
git push origin main
```

## Cost

All recommended platforms offer free tiers:
- ✅ Vercel: Free for personal projects
- ✅ Netlify: Free tier (100GB bandwidth)
- ✅ GitHub Pages: Free for public repos
- ✅ Cloudflare Pages: Free (unlimited bandwidth)

---

**Need help?** Open an issue on GitHub or check platform documentation.

