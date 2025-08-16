#!/bin/bash

# Kagabhushundi Project Setup Script
echo "🌟 Setting up Kagabhushundi - Advanced Astrology Application"

# Check if we're in the correct directory
if [ ! -f "README.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"

# Setup Backend
echo "🔧 Setting up Backend..."
cd backend

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Copy environment file
echo "⚙️ Setting up environment configuration..."
cp .env.example .env
echo "✅ Please edit backend/.env file with your OpenAI API key and other configurations"

cd ..

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd frontend

# Install Node.js dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Add missing Tailwind plugins
echo "🎨 Installing Tailwind CSS plugins..."
npm install @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio

cd ..

# Setup complete
echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit backend/.env file with your OpenAI API key"
echo "2. Start the backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "3. Start the frontend: cd frontend && npm run dev"
echo "4. Visit http://localhost:3000 to see your application"
echo ""
echo "🐳 Docker Setup (Optional):"
echo "docker-compose up --build"
echo ""
echo "✨ Happy coding with Kagabhushundi!"
