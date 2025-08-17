"""
Netlify Functions entry point for the Kagabhushundi API
"""

import sys
import os
import json

# Add the parent directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def handler(event, context):
    """
    Netlify Functions handler
    """
    try:
        # Import here to avoid issues with module loading
        from main import app
        from mangum import Mangum
        
        # Create a Mangum adapter for the FastAPI app
        asgi_handler = Mangum(app, lifespan="off")
        
        # Process the event and return the response
        return asgi_handler(event, context)
        
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
            },
            "body": json.dumps({
                "error": "Internal server error", 
                "detail": str(e),
                "event": str(event)[:200] if event else "No event"
            })
        }