#!/bin/bash

# Copy all backend files to root for Railway detection
echo "📁 Setting up Railway deployment structure..."

# Copy Python files
cp backend/requirements.txt ./
cp backend/main.py ./
cp backend/Procfile ./

# Copy all backend directories
cp -r backend/services ./
cp -r backend/models ./
cp -r backend/utils ./
cp -r backend/api ./

# Copy other necessary files
cp backend/.env.example ./
cp backend/init_pooja_data.py ./

echo "✅ Files copied to root directory"
echo "🚀 Railway should now detect this as a Python app"

# Show structure
echo ""
echo "📋 Root directory now contains:"
ls -la *.py *.txt Procfile 2>/dev/null || echo "Some files may not exist"
