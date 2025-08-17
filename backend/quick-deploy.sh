#!/bin/bash

echo "🚀 Kagabhushundi Backend Quick Deploy Script"
echo "============================================="

# Check if we're in the right directory
if [ ! -f "main.py" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    echo "   cd backend && ./quick-deploy.sh"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "✅ Found main.py - we're in the right place!"

echo ""
echo "🔧 Deployment Options:"
echo "1. Railway.app (Recommended)"
echo "2. Render.com"
echo "3. Fly.io"
echo ""

read -p "🤔 Which service would you like to use? (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚂 Railway Deployment Instructions:"
        echo "===================================="
        echo "1. Visit: https://railway.app"
        echo "2. Login with GitHub"
        echo "3. Create New Project → Deploy from GitHub repo"
        echo "4. Select: amioykr82/Kagabhusundi"
        echo "5. Root Directory: backend"
        echo "6. Build Command: pip install -r requirements.txt"
        echo "7. Start Command: uvicorn main:app --host 0.0.0.0 --port \$PORT"
        echo ""
        echo "🔑 Environment Variables to set:"
        echo "OPENAI_API_KEY=your_openai_api_key"
        echo "SECRET_KEY=$(openssl rand -hex 16)"
        echo "CORS_ORIGINS=https://kagabhushundi-astrology.netlify.app"
        echo "DEBUG=False"
        ;;
    2)
        echo ""
        echo "🎨 Render.com Deployment Instructions:"
        echo "======================================"
        echo "1. Visit: https://render.com"
        echo "2. Create account and connect GitHub"
        echo "3. New Web Service → Select repo"
        echo "4. Root Directory: backend"
        echo "5. Build Command: pip install -r requirements.txt"
        echo "6. Start Command: uvicorn main:app --host 0.0.0.0 --port \$PORT"
        echo ""
        echo "🔑 Environment Variables to set:"
        echo "OPENAI_API_KEY=your_openai_api_key"
        echo "SECRET_KEY=$(openssl rand -hex 16)"
        echo "CORS_ORIGINS=https://kagabhushundi-astrology.netlify.app"
        echo "DEBUG=False"
        ;;
    3)
        echo ""
        echo "🪂 Fly.io Deployment (CLI Required):"
        echo "===================================="
        echo "Installing Fly CLI..."
        if ! command -v fly &> /dev/null; then
            echo "📥 Installing Fly CLI..."
            curl -L https://fly.io/install.sh | sh
            export PATH="$HOME/.fly/bin:$PATH"
        fi
        
        echo "🔐 Login to Fly.io..."
        fly auth login
        
        echo "🚀 Launching app..."
        fly launch
        
        echo "🔑 Setting secrets..."
        echo "Please set your OpenAI API key:"
        read -p "Enter OPENAI_API_KEY: " openai_key
        fly secrets set OPENAI_API_KEY="$openai_key"
        fly secrets set SECRET_KEY="$(openssl rand -hex 16)"
        fly secrets set CORS_ORIGINS="https://kagabhushundi-astrology.netlify.app"
        fly secrets set DEBUG="False"
        
        echo "🚀 Deploying..."
        fly deploy
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "📝 After deployment:"
echo "==================="
echo "1. Note your backend URL (e.g., https://your-app.railway.app)"
echo "2. Update frontend environment:"
echo "   cd ../frontend"
echo "   echo 'REACT_APP_API_URL=https://your-backend-url' > .env.production"
echo "   npm run build"
echo "   netlify deploy --prod"
echo ""
echo "🎉 Your full-stack app will be live!"
echo "Frontend: https://kagabhushundi-astrology.netlify.app"
echo "Backend: [Your deployed URL]"
