#!/usr/bin/env python3
"""
Simple test script to verify Kagabhushundi API functionality
"""

import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def test_endpoint(method, endpoint, data=None, params=None):
    """Test an API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, params=params)
        elif method.upper() == "POST":
            response = requests.post(url, json=data)
        else:
            return f"❌ Unsupported method: {method}"
        
        if response.status_code == 200:
            try:
                result = response.json()
                return f"✅ {endpoint} - SUCCESS"
            except:
                return f"✅ {endpoint} - SUCCESS (non-JSON response)"
        else:
            return f"❌ {endpoint} - FAILED ({response.status_code}): {response.text[:100]}"
            
    except requests.exceptions.ConnectionError:
        return f"❌ {endpoint} - CONNECTION FAILED (Is the server running?)"
    except Exception as e:
        return f"❌ {endpoint} - ERROR: {str(e)}"

def main():
    print("🔮 Testing Kagabhushundi API Endpoints...")
    print("=" * 50)
    
    # Test basic health check
    print(test_endpoint("GET", "/health"))
    
    # Test registration
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword",
        "full_name": "Test User"
    }
    print(test_endpoint("POST", "/auth/register", data=user_data))
    
    # Test kundali generation
    kundali_data = {
        "name": "Test Person",
        "birth_date": "1990-01-01",
        "birth_time": "12:00",
        "birth_place": "New York"
    }
    print(test_endpoint("POST", "/kundali/generate", data=kundali_data))
    
    # Test horoscope
    print(test_endpoint("GET", "/horoscope/daily", params={"sign": "aries"}))
    
    # Test compatibility
    compatibility_data = {
        "person1": {
            "name": "Person 1",
            "birth_date": "1990-01-01",
            "birth_time": "12:00",
            "birth_place": "New York"
        },
        "person2": {
            "name": "Person 2", 
            "birth_date": "1991-02-02",
            "birth_time": "14:00",
            "birth_place": "Los Angeles"
        }
    }
    print(test_endpoint("POST", "/compatibility/analyze", data=compatibility_data))
    
    # Test tarot reading
    tarot_data = {
        "question": "What should I focus on today?",
        "cards": ["The Fool", "The Magician", "The High Priestess"]
    }
    print(test_endpoint("POST", "/tarot/reading", data=tarot_data))
    
    print("=" * 50)
    print("🌟 Testing complete! Check results above.")
    print(f"📊 Frontend URL: http://localhost:3001")
    print(f"📚 API Docs: http://localhost:8000/docs")

if __name__ == "__main__":
    main()
