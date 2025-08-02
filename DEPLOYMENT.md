# 🚀 Brainely Frontend - Production Deployment Guide

## 📋 Pre-deployment Checklist

### ✅ Environment Configuration
- [ ] Update `.env.production` with your production backend URL
- [ ] Verify all environment variables are set correctly
- [ ] Ensure no sensitive data is hardcoded

### ✅ Code Quality
- [ ] All console.log statements removed from production code
- [ ] Error handling implemented for all API calls
- [ ] Loading states implemented for better UX
- [ ] Dark mode support added to all components

### ✅ Performance Optimization
- [ ] Code splitting configured in Vite
- [ ] Images optimized and properly sized
- [ ] Unused dependencies removed

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_BACKEND_URL`: Your production backend URL
   - `VITE_APP_NAME`: Brainely
   - `VITE_APP_VERSION`: 1.0.0
   - `VITE_DEV_MODE`: false

### Option 2: Vercel
1. Connect your GitHub repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables in Vercel dashboard

### Option 3: Manual Deployment
1. Run the deployment script: `./deploy.sh`
2. Upload the `dist` folder to your web server
3. Configure your web server to serve the SPA correctly

## 🔧 Environment Variables

Create a `.env.production` file with:

```env
VITE_BACKEND_URL=https://your-backend-url.com/api/v1
VITE_APP_NAME=Brainely
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=false
```

## 🛡️ Security Considerations

- ✅ All sensitive data moved to environment variables
- ✅ HTTPS enforced for production
- ✅ CORS properly configured on backend
- ✅ JWT tokens stored securely in localStorage
- ✅ Error messages don't expose sensitive information

## 📊 Performance Monitoring

After deployment, monitor:
- Page load times
- Bundle size
- Core Web Vitals
- Error rates

## 🔄 CI/CD Pipeline

For automated deployments, create a GitHub Actions workflow:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (recommended: 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### Runtime Errors
- Check browser console for errors
- Verify backend URL is accessible
- Check CORS configuration on backend

### Dark Mode Issues
- Ensure Tailwind CSS is properly configured
- Check that `dark` class is being applied to `<html>` element
- Verify all components have dark mode styles

## 📞 Support

If you encounter issues during deployment, check:
1. Browser developer console
2. Network tab for failed requests
3. Backend server logs
4. Environment variable configuration