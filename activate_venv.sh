#!/bin/bash

# Virtual Environment Activation Helper
# Usage: source activate_venv.sh

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_PATH="$PROJECT_DIR/venv"

if [ -d "$VENV_PATH" ]; then
    echo "🔧 Activating virtual environment..."
    source "$VENV_PATH/bin/activate"
    echo "✅ Virtual environment activated"
    echo "📍 Python: $(which python)"
    echo "📍 Project: $PROJECT_DIR"
    echo ""
    echo "💡 Quick commands:"
    echo "  Backend: cd backend && uvicorn main:app --reload"
    echo "  Frontend: cd frontend && npm run dev"
    echo "  Both: ./start_servers.sh"
else
    echo "❌ Virtual environment not found at $VENV_PATH"
    echo "💡 Create it with: python3 -m venv venv"
fi
