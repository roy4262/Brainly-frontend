#!/bin/bash

# Production deployment script for Brainely Frontend

echo "🚀 Starting production deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Copy production environment variables
if [ -f ".env.production" ]; then
    echo "🔧 Using production environment variables..."
    cp .env.production .env
else
    echo "⚠️  Warning: .env.production not found. Using default configuration."
fi

# Build the application
echo "🏗️  Building application for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Built files are in the 'dist' directory"
    echo "🌐 Ready for deployment to your hosting platform"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Production deployment preparation complete!"