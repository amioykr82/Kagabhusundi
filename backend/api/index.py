"""
Vercel entry point for the Kagabhushundi API
This file serves as the entry point for Vercel serverless deployment
"""

import sys
import os

# Add the parent directory to the Python path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app

# Vercel expects the app to be available as a module-level variable
# The handler function is called by Vercel for each request
def handler(request, context):
    return app(request, context)

# For Vercel, we need to export the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
else:
    # When imported by Vercel, just expose the app
    pass