#!/bin/bash

echo "🚀 Starting Kagabhushundi Deployment to Vercel"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the kagabhushundi root directory"
    exit 1
fi

print_status "Found backend and frontend directories"

# Deploy Backend
echo ""
echo "📦 Deploying Backend..."
echo "======================"

cd backend

# Remove existing vercel config to start fresh
rm -rf .vercel 2>/dev/null

# Create a fresh deployment
echo "Creating fresh backend deployment..."
vercel --prod --yes --confirm

if [ $? -eq 0 ]; then
    print_status "Backend deployed successfully!"
    BACKEND_URL=$(vercel list | grep -o 'https://[^ ]*' | head -1)
    echo "Backend URL: $BACKEND_URL"
else
    print_error "Backend deployment failed"
    exit 1
fi

cd ..

# Deploy Frontend
echo ""
echo "🖥️  Deploying Frontend..."
echo "========================"

cd frontend

# Remove existing vercel config to start fresh  
rm -rf .vercel 2>/dev/null

# Update environment variables if backend URL is available
if [ ! -z "$BACKEND_URL" ]; then
    echo "VITE_API_URL=$BACKEND_URL" > .env.production
    echo "VITE_APP_NAME=Kagabhushundi" >> .env.production
    print_status "Updated frontend environment variables"
fi

# Create a fresh deployment
echo "Creating fresh frontend deployment..."
vercel --prod --yes --confirm

if [ $? -eq 0 ]; then
    print_status "Frontend deployed successfully!"
    FRONTEND_URL=$(vercel list | grep -o 'https://[^ ]*' | head -1)
    echo "Frontend URL: $FRONTEND_URL"
else
    print_error "Frontend deployment failed"
    exit 1
fi

cd ..

# Display final results
echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Frontend: $FRONTEND_URL"
echo "Backend:  $BACKEND_URL"
echo "API Docs: $BACKEND_URL/docs"
echo ""
echo "📝 Next Steps:"
echo "1. Visit your frontend URL to test the application"
echo "2. Check API documentation at backend/docs"
echo "3. Configure environment variables if needed"
echo "4. Test all features: horoscope, kundali, chat, store, pooja"
echo ""
print_status "Ready to share with friends worldwide! 🌍"
