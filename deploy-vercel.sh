#!/bin/bash

# Kagabhushundi - Vercel CLI Deployment Script
# This script deploys both backend and frontend to Vercel

echo "🚀 Starting Kagabhushundi deployment to Vercel..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the kagabhushundi root directory"
    exit 1
fi

# Check if user is logged in to Vercel
print_status "Checking Vercel authentication..."
if ! vercel whoami >/dev/null 2>&1; then
    print_warning "You need to login to Vercel first"
    print_status "Running: vercel login"
    vercel login
fi

print_success "Vercel authentication verified"

# Deploy Backend
print_status "Deploying backend..."
cd backend

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    print_error "vercel.json not found in backend directory"
    exit 1
fi

# Deploy backend
print_status "Running: vercel --prod"
vercel --prod --confirm

if [ $? -eq 0 ]; then
    print_success "Backend deployed successfully!"
    BACKEND_URL=$(vercel ls | grep kagabhushundi-backend | awk '{print $2}' | head -1)
    if [ -z "$BACKEND_URL" ]; then
        BACKEND_URL="https://kagabhushundi-backend.vercel.app"
    fi
    print_success "Backend URL: $BACKEND_URL"
else
    print_error "Backend deployment failed!"
    exit 1
fi

# Go back to root and deploy frontend
cd ..
print_status "Deploying frontend..."
cd frontend

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    print_error "vercel.json not found in frontend directory"
    exit 1
fi

# Update environment variables if needed
if [ -f ".env.production" ]; then
    print_status "Found .env.production file"
fi

# Deploy frontend
print_status "Running: vercel --prod"
vercel --prod --confirm

if [ $? -eq 0 ]; then
    print_success "Frontend deployed successfully!"
    FRONTEND_URL=$(vercel ls | grep kagabhushundi | grep -v backend | awk '{print $2}' | head -1)
    if [ -z "$FRONTEND_URL" ]; then
        FRONTEND_URL="https://kagabhushundi.vercel.app"
    fi
    print_success "Frontend URL: $FRONTEND_URL"
else
    print_error "Frontend deployment failed!"
    exit 1
fi

# Summary
cd ..
echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📱 Frontend: $FRONTEND_URL"
echo "🔧 Backend:  $BACKEND_URL"
echo "📚 API Docs: $BACKEND_URL/docs"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Set environment variables in Vercel dashboard"
echo "   2. Update CORS_ORIGINS in backend to include frontend URL"
echo "   3. Test all functionalities"
echo ""
print_success "All done! 🚀"
