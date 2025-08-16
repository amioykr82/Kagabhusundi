#!/bin/bash

# Chat Feature API Test Script
echo "🌟 Testing Kagabhushundi Chat Feature APIs"
echo "=========================================="

BASE_URL="http://localhost:8000/api/chat"

echo ""
echo "1. Testing Astrologers List..."
curl -s "$BASE_URL/astrologers" | python -c "
import sys, json
data = json.load(sys.stdin)
print(f'✅ Found {data[\"total\"]} astrologers')
print(f'First astrologer: {data[\"astrologers\"][0][\"name\"]}')
"

echo ""
echo "2. Testing OTP Send..."
OTP_RESPONSE=$(curl -s -X POST "$BASE_URL/send-otp" \
     -H "Content-Type: application/json" \
     -d '{"phone": "+919876543210"}')

DEMO_OTP=$(echo $OTP_RESPONSE | python -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data['success']:
        print('✅ OTP sent successfully')
        print(f'Demo OTP: {data[\"demo_otp\"]}')
        print(data['demo_otp'])
    else:
        print('❌ OTP sending failed')
        print('')
except:
    print('❌ Invalid response')
    print('')
")

if [ ! -z "$DEMO_OTP" ]; then
    echo ""
    echo "3. Testing OTP Verification..."
    curl -s -X POST "$BASE_URL/verify-otp" \
         -H "Content-Type: application/json" \
         -d "{\"phone\": \"+919876543210\", \"otp\": \"$DEMO_OTP\"}" | python -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data['success']:
        print('✅ OTP verified successfully')
    else:
        print('❌ OTP verification failed')
except:
    print('❌ Invalid response')
"

    echo ""
    echo "4. Testing Chat Session Creation..."
    SESSION_RESPONSE=$(curl -s -X POST "$BASE_URL/start-chat" \
         -H "Content-Type: application/json" \
         -d '{
           "astrologer_id": "ast_001",
           "phone": "+919876543210",
           "user_info": {
             "name": "Test User",
             "date_of_birth": "1990-01-01",
             "time_of_birth": "10:30",
             "place_of_birth": "Mumbai, India",
             "gender": "Male",
             "concerns": ["Career & Finance"]
           }
         }')

    SESSION_ID=$(echo $SESSION_RESPONSE | python -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data['success']:
        print('✅ Chat session created')
        print(f'Session ID: {data[\"session_id\"]}')
        print(f'Queue Position: {data[\"queue_position\"]}')
        print(data['session_id'])
    else:
        print('❌ Chat session creation failed')
        print('')
except:
    print('❌ Invalid response')
    print('')
")

    if [ ! -z "$SESSION_ID" ]; then
        echo ""
        echo "5. Testing Session Status..."
        curl -s "$BASE_URL/session/$SESSION_ID/status" | python -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data['success']:
        print('✅ Session status retrieved')
        print(f'Status: {data[\"status\"]}')
        print(f'Queue Position: {data[\"queue_position\"]}')
    else:
        print('❌ Session status failed')
except:
    print('❌ Invalid response')
"
    fi
fi

echo ""
echo "=========================================="
echo "🎉 Chat Feature API Testing Complete!"
echo ""
echo "To test the full flow:"
echo "1. Visit: http://localhost:3000"
echo "2. Click 'Chat with Astrologer' card"
echo "3. Follow the complete flow"
echo ""
