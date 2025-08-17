#!/bin/bash

echo "🚀 Alternative Deployment - No Password Protection"
echo "==============================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo -e "${YELLOW}PROBLEM:${NC} Current deployments are password protected"
echo -e "${GREEN}SOLUTION:${NC} Deploy with new project names to avoid protection"
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the kagabhushundi root directory"
    exit 1
fi

# Deploy Backend with new name
echo -e "${BLUE}📦 Deploying Backend (Fresh)...${NC}"
echo "================================"

cd backend
rm -rf .vercel 2>/dev/null

# Create a minimal vercel.json to ensure no protection
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ]
}
EOF

print_info "Deploying backend with name 'kagabhushundi-api-public'..."

# Deploy with a specific project name that's less likely to trigger protection
echo -e "\n${YELLOW}When prompted:${NC}"
echo "1. Choose 'Amioy's projects'"
echo "2. Choose 'No' for linking to existing project"
echo "3. Use project name: 'kagabhushundi-api-public'"
echo ""

read -p "Press Enter to start backend deployment..."

vercel --prod

BACKEND_DEPLOY_STATUS=$?

if [ $BACKEND_DEPLOY_STATUS -eq 0 ]; then
    # Get the deployed URL
    BACKEND_URL=$(vercel ls | grep kagabhushundi | head -1 | awk '{print $2}')
    print_status "Backend deployed successfully!"
    print_info "Backend URL: $BACKEND_URL"
else
    print_error "Backend deployment failed"
    cd ..
    exit 1
fi

cd ..

# Deploy Frontend with new name
echo ""
echo -e "${BLUE}🖥️  Deploying Frontend (Fresh)...${NC}"
echo "================================"

cd frontend
rm -rf .vercel 2>/dev/null

# Update environment with backend URL
if [ ! -z "$BACKEND_URL" ]; then
    cat > .env.local << EOF
VITE_API_URL=$BACKEND_URL
VITE_APP_NAME=Kagabhushundi
VITE_APP_ENV=production
EOF
    print_status "Updated frontend environment with backend URL"
fi

print_info "Deploying frontend with name 'kagabhushundi-app-public'..."

echo -e "\n${YELLOW}When prompted:${NC}"
echo "1. Choose 'Amioy's projects'"
echo "2. Choose 'No' for linking to existing project"  
echo "3. Use project name: 'kagabhushundi-app-public'"
echo ""

read -p "Press Enter to start frontend deployment..."

vercel --prod

FRONTEND_DEPLOY_STATUS=$?

if [ $FRONTEND_DEPLOY_STATUS -eq 0 ]; then
    # Get the deployed URL
    FRONTEND_URL=$(vercel ls | grep kagabhushundi | tail -1 | awk '{print $2}')
    print_status "Frontend deployed successfully!"
    print_info "Frontend URL: $FRONTEND_URL"
else
    print_error "Frontend deployment failed"
    cd ..
    exit 1
fi

cd ..

# Display results
echo ""
echo -e "${GREEN}🎉 Fresh Deployment Complete!${NC}"
echo "============================="
echo ""
echo -e "${BLUE}📱 Your Public URLs (Share these):${NC}"
echo ""
echo -e "${GREEN}Frontend App:${NC}"
echo "$FRONTEND_URL"
echo ""
echo -e "${GREEN}Backend API:${NC}"  
echo "$BACKEND_URL"
echo ""
echo -e "${GREEN}API Documentation:${NC}"
echo "$BACKEND_URL/docs"
echo ""

# Test the URLs
echo -e "${YELLOW}🧪 Testing Accessibility...${NC}"

if [ ! -z "$FRONTEND_URL" ]; then
    FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
    if [ "$FRONTEND_STATUS" = "200" ]; then
        print_status "Frontend is publicly accessible!"
    elif [ "$FRONTEND_STATUS" = "401" ]; then
        print_warning "Frontend still password protected"
    else
        print_info "Frontend returned HTTP $FRONTEND_STATUS"
    fi
fi

if [ ! -z "$BACKEND_URL" ]; then
    BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL")
    if [ "$BACKEND_STATUS" = "200" ]; then
        print_status "Backend is publicly accessible!"
    elif [ "$BACKEND_STATUS" = "401" ]; then
        print_warning "Backend still password protected"
    else
        print_info "Backend returned HTTP $BACKEND_STATUS"
    fi
fi

echo ""
echo -e "${GREEN}🌍 Ready to Share Worldwide!${NC}"
echo ""
echo -e "${BLUE}📋 What Your Friends Can Do:${NC}"
echo "✅ Create accounts and login"
echo "✅ Generate horoscopes"
echo "✅ Create birth charts (Kundali)"
echo "✅ Check compatibility"
echo "✅ Get tarot readings"
echo "✅ Browse astro store"
echo "✅ Book pooja services"
echo "✅ Chat with astrologers"
echo ""
echo -e "${YELLOW}💡 If still password protected:${NC}"
echo "1. Wait 5-10 minutes for propagation"
echo "2. Try incognito/private browsing"
echo "3. Delete and redeploy again with different names"
