#!/bin/bash

echo "🔐 Vercel Password Protection Solutions"
echo "====================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}ISSUE:${NC} Vercel deployments are password protected"
echo -e "${GREEN}SOLUTIONS:${NC} Multiple ways to make your app public"
echo ""

echo -e "${BLUE}� Your Current Protected URLs:${NC}"
echo "Frontend: https://frontend-dpg83op0b-amioys-projects.vercel.app"
echo "Backend:  https://kagabhushundi-api-m8syhr8h9-amioys-projects.vercel.app"
echo ""

echo -e "${BLUE}📝 Solution 1: Find Bypass Secret${NC}"
echo "Look in these locations on Vercel Dashboard:"
echo "• Settings → Functions → System Environment Variables"
echo "• Settings → General → look for any bypass tokens"
echo "• Deployments tab → click on a deployment → look for protection settings"
echo ""

echo -e "${BLUE}🔗 Your Current URLs:${NC}"
echo "Frontend: https://frontend-dpg83op0b-amioys-projects.vercel.app"
echo "Backend:  https://kagabhushundi-api-m8syhr8h9-amioys-projects.vercel.app"
echo ""

echo -e "${YELLOW}⚠️  Enter your bypass secret to generate public URLs:${NC}"
read -p "Bypass Secret: " SECRET

if [ -z "$SECRET" ]; then
    echo "No secret provided. Manual URLs:"
    echo ""
    echo -e "${GREEN}📱 Share These URLs With Friends:${NC}"
    echo "Frontend: https://frontend-dpg83op0b-amioys-projects.vercel.app?x-vercel-protection-bypass=YOUR_SECRET"
    echo "Backend:  https://kagabhushundi-api-m8syhr8h9-amioys-projects.vercel.app?x-vercel-protection-bypass=YOUR_SECRET"
    echo ""
    echo "Replace 'YOUR_SECRET' with the actual secret from Vercel dashboard"
else
    echo ""
    echo -e "${GREEN}🎉 PUBLIC URLs (Share these with friends):${NC}"
    echo ""
    echo -e "${BLUE}Frontend App:${NC}"
    echo "https://frontend-dpg83op0b-amioys-projects.vercel.app?x-vercel-protection-bypass=$SECRET"
    echo ""
    echo -e "${BLUE}Backend API:${NC}"
    echo "https://kagabhushundi-api-m8syhr8h9-amioys-projects.vercel.app?x-vercel-protection-bypass=$SECRET"
    echo ""
    echo -e "${BLUE}API Documentation:${NC}"
    echo "https://kagabhushundi-api-m8syhr8h9-amioys-projects.vercel.app/docs?x-vercel-protection-bypass=$SECRET"
    echo ""
    
    # Test the URLs
    echo -e "${YELLOW}🧪 Testing Frontend URL...${NC}"
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://frontend-dpg83op0b-amioys-projects.vercel.app?x-vercel-protection-bypass=$SECRET")
    
    if [ "$STATUS" = "200" ]; then
        echo -e "${GREEN}✅ Frontend is accessible!${NC}"
    else
        echo -e "${YELLOW}⚠️  Frontend returned HTTP $STATUS (might still work in browser)${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}🌍 These URLs work worldwide!${NC}"
    echo "• Friends from any country can access"
    echo "• Fast loading via Vercel's global CDN"
    echo "• Mobile and desktop compatible"
    echo ""
    echo -e "${BLUE}📋 Features Available:${NC}"
    echo "✅ User Registration & Login"
    echo "✅ Horoscope Generation"
    echo "✅ Kundali (Birth Chart)"
    echo "✅ Compatibility Analysis"
    echo "✅ Tarot Card Reading"
    echo "✅ Chat with Astrologer"
    echo "✅ Astro Store"
    echo "✅ Book Pooja Services"
fi

echo ""
echo -e "${YELLOW}💡 Alternative: Deploy Fresh Projects${NC}"
echo "If you want clean URLs without secrets:"
echo "1. Delete current Vercel projects"
echo "2. Redeploy with new names"
echo "3. Some new projects don't have protection by default"
