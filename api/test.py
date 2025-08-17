import json

def handler(event, context):
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "message": "Hello from Kagabhushundi API",
            "event": str(event)[:200] if event else "No event data",
            "method": event.get("httpMethod", "unknown") if event else "No method"
        })
    }
