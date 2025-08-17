from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
import random
import asyncio
import time
import uuid
from datetime import datetime, timedelta
import json
import os
from services.gpt_service import GPTService

router = APIRouter()

# Mock astrologer data
ASTROLOGERS = [
    {
        "id": "ast_001",
        "name": "Pandit Rajesh Sharma",
        "avatar": "/api/placeholder/100/100",
        "rating": 4.8,
        "orders": 5240,
        "expertise": ["Vedic", "Numerology", "Vastu"],
        "languages": ["Hindi", "English", "Sanskrit"],
        "experience": 12,
        "rate_per_minute": 25,
        "is_online": True,
        "wait_time": "2-5 min"
    },
    {
        "id": "ast_002", 
        "name": "Dr. Priya Mishra",
        "avatar": "/api/placeholder/100/100",
        "rating": 4.9,
        "orders": 3842,
        "expertise": ["Tarot", "Psychic", "Love & Relationships"],
        "languages": ["Hindi", "English", "Bengali"],
        "experience": 8,
        "rate_per_minute": 22,
        "is_online": True,
        "wait_time": "1-3 min"
    },
    {
        "id": "ast_003",
        "name": "Acharya Vikash Joshi",
        "avatar": "/api/placeholder/100/100", 
        "rating": 4.7,
        "orders": 6150,
        "expertise": ["Vedic", "Career", "Finance"],
        "languages": ["Hindi", "English", "Gujarati"],
        "experience": 15,
        "rate_per_minute": 30,
        "is_online": True,
        "wait_time": "5-8 min"
    },
    {
        "id": "ast_004",
        "name": "Guru Sunita Devi",
        "avatar": "/api/placeholder/100/100",
        "rating": 4.6,
        "orders": 4560,
        "expertise": ["Palmistry", "Face Reading", "Remedies"],
        "languages": ["Hindi", "English", "Punjabi"],
        "experience": 10,
        "rate_per_minute": 20,
        "is_online": True,
        "wait_time": "3-6 min"
    },
    {
        "id": "ast_005",
        "name": "Pandit Arvind Kumar",
        "avatar": "/api/placeholder/100/100",
        "rating": 4.8,
        "orders": 7230,
        "expertise": ["Vedic", "Gemstones", "Health"],
        "languages": ["Hindi", "English", "Marathi"],
        "experience": 18,
        "rate_per_minute": 35,
        "is_online": True,
        "wait_time": "4-7 min"
    },
    {
        "id": "ast_006",
        "name": "Shri Meera Sharma",
        "avatar": "/api/placeholder/100/100",
        "rating": 4.9,
        "orders": 2890,
        "expertise": ["Tarot", "Angel Cards", "Spiritual Healing"],
        "languages": ["Hindi", "English", "Tamil"],
        "experience": 6,
        "rate_per_minute": 18,
        "is_online": True,
        "wait_time": "1-2 min"
    }
]

# In-memory storage for demo (in production, use database)
active_sessions = {}
pending_verifications = {}

# Data Models
class PhoneVerificationRequest(BaseModel):
    phone: str = Field(..., description="Phone number with country code")
    
class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str

class UserInfoRequest(BaseModel):
    name: str
    date_of_birth: str
    time_of_birth: str
    place_of_birth: str
    gender: str
    concerns: List[str] = []

class StartChatRequest(BaseModel):
    astrologer_id: str
    phone: str
    user_info: UserInfoRequest

class ChatMessage(BaseModel):
    message: str
    session_id: str

class ChatResponse(BaseModel):
    message: str
    timestamp: datetime
    sender: str  # 'user' or 'astrologer'

# API Endpoints

@router.get("/astrologers")
async def get_astrologers(
    sort_by: str = "rating",  # rating, price, experience, wait_time
    expertise: Optional[str] = None,
    online_only: bool = True
):
    """Get list of available astrologers"""
    try:
        astrologers = ASTROLOGERS.copy()
        
        # Filter by online status
        if online_only:
            astrologers = [a for a in astrologers if a["is_online"]]
        
        # Filter by expertise
        if expertise:
            astrologers = [a for a in astrologers if expertise.lower() in [e.lower() for e in a["expertise"]]]
        
        # Sort astrologers
        if sort_by == "rating":
            astrologers.sort(key=lambda x: x["rating"], reverse=True)
        elif sort_by == "price":
            astrologers.sort(key=lambda x: x["rate_per_minute"])
        elif sort_by == "experience":
            astrologers.sort(key=lambda x: x["experience"], reverse=True)
        elif sort_by == "wait_time":
            astrologers.sort(key=lambda x: int(x["wait_time"].split("-")[0]))
        
        # Add some randomization to make it feel more dynamic
        random.shuffle(astrologers[:3])  # Shuffle top 3 to simulate availability changes
        
        return {
            "success": True,
            "astrologers": astrologers,
            "total": len(astrologers)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching astrologers: {str(e)}")

@router.post("/send-otp")
async def send_otp(request: PhoneVerificationRequest):
    """Send OTP for phone verification"""
    try:
        # Generate a random 6-digit OTP
        otp = str(random.randint(100000, 999999))
        
        # Store OTP temporarily (in production, send via SMS service)
        pending_verifications[request.phone] = {
            "otp": otp,
            "timestamp": datetime.now(),
            "attempts": 0
        }
        
        # For demo purposes, return the OTP (in production, this would be sent via SMS)
        return {
            "success": True,
            "message": "OTP sent successfully",
            "demo_otp": otp  # Remove this in production
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending OTP: {str(e)}")

@router.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest):
    """Verify OTP"""
    try:
        if request.phone not in pending_verifications:
            raise HTTPException(status_code=400, detail="No OTP found for this phone number")
        
        verification_data = pending_verifications[request.phone]
        
        # Check if OTP is expired (5 minutes)
        if datetime.now() - verification_data["timestamp"] > timedelta(minutes=5):
            del pending_verifications[request.phone]
            raise HTTPException(status_code=400, detail="OTP expired")
        
        # Check attempts
        if verification_data["attempts"] >= 3:
            del pending_verifications[request.phone]
            raise HTTPException(status_code=400, detail="Too many attempts")
        
        # Verify OTP
        if request.otp != verification_data["otp"]:
            pending_verifications[request.phone]["attempts"] += 1
            raise HTTPException(status_code=400, detail="Invalid OTP")
        
        # OTP verified successfully
        del pending_verifications[request.phone]
        
        return {
            "success": True,
            "message": "Phone verified successfully",
            "verified": True
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error verifying OTP: {str(e)}")

@router.post("/start-chat")
async def start_chat(request: StartChatRequest):
    """Start a chat session with an astrologer"""
    try:
        # Find the astrologer
        astrologer = next((a for a in ASTROLOGERS if a["id"] == request.astrologer_id), None)
        if not astrologer:
            raise HTTPException(status_code=404, detail="Astrologer not found")
        
        # Generate session ID
        session_id = str(uuid.uuid4())
        
        # Create session
        session_data = {
            "session_id": session_id,
            "astrologer": astrologer,
            "user_info": request.user_info.dict(),
            "phone": request.phone,
            "start_time": datetime.now(),
            "status": "in_queue",
            "messages": [],
            "queue_position": random.randint(1, 5)  # Simulate queue
        }
        
        active_sessions[session_id] = session_data
        
        return {
            "success": True,
            "session_id": session_id,
            "queue_position": session_data["queue_position"],
            "estimated_wait": f"{session_data['queue_position'] * 2}-{session_data['queue_position'] * 3} minutes",
            "astrologer": astrologer
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error starting chat: {str(e)}")

@router.get("/session/{session_id}/status")
async def get_session_status(session_id: str):
    """Get current session status"""
    try:
        if session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session = active_sessions[session_id]
        
        # Simulate queue progression
        if session["status"] == "in_queue" and session["queue_position"] > 0:
            # Randomly progress queue
            if random.random() < 0.3:  # 30% chance to progress
                session["queue_position"] -= 1
                if session["queue_position"] <= 0:
                    session["status"] = "connected"
                    session["queue_position"] = 0
        
        return {
            "success": True,
            "status": session["status"],
            "queue_position": session["queue_position"],
            "astrologer": session["astrologer"],
            "session_duration": str(datetime.now() - session["start_time"]).split(".")[0]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting session status: {str(e)}")

@router.post("/chat/send")
async def send_message(request: ChatMessage):
    """Send a message in chat"""
    try:
        if request.session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session = active_sessions[request.session_id]
        
        if session["status"] != "connected":
            raise HTTPException(status_code=400, detail="Chat session not active")
        
        # Add user message
        user_message = {
            "message": request.message,
            "timestamp": datetime.now(),
            "sender": "user"
        }
        session["messages"].append(user_message)
        
        # Generate AI response (simulate astrologer)
        try:
            user_info = session["user_info"]
            astrologer_name = session["astrologer"]["name"]
            
            # Create context for AI response
            context = f"""
            You are {astrologer_name}, an expert astrologer with {session['astrologer']['experience']} years of experience.
            Your expertise includes: {', '.join(session['astrologer']['expertise'])}.
            
            User Information:
            - Name: {user_info['name']}
            - Date of Birth: {user_info['date_of_birth']}
            - Time of Birth: {user_info['time_of_birth']}
            - Place of Birth: {user_info['place_of_birth']}
            - Gender: {user_info['gender']}
            - Concerns: {', '.join(user_info.get('concerns', []))}
            
            Respond as a wise, compassionate astrologer. Keep responses under 200 words.
            Be insightful but not overly specific. Provide guidance and hope.
            """
            
            # Create GPT service instance
            gpt_service = GPTService()
            
            ai_response = await gpt_service.get_completion(f"{context}\n\nUser question: {request.message}")
            
            # Add AI response
            astrologer_message = {
                "message": ai_response,
                "timestamp": datetime.now(),
                "sender": "astrologer"
            }
            session["messages"].append(astrologer_message)
            
            return {
                "success": True,
                "response": astrologer_message
            }
            
        except Exception as ai_error:
            # Fallback response if AI fails
            fallback_responses = [
                "I sense positive energy around you. Could you tell me more about your specific concerns?",
                "The stars suggest important changes are coming in your life. What aspect would you like to explore?",
                "Your birth chart indicates strong potential. What particular area of life are you seeking guidance on?",
                "I see interesting planetary influences. Please share more details about your current situation."
            ]
            
            fallback_message = {
                "message": random.choice(fallback_responses),
                "timestamp": datetime.now(),
                "sender": "astrologer"
            }
            session["messages"].append(fallback_message)
            
            return {
                "success": True,
                "response": fallback_message
            }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending message: {str(e)}")

@router.get("/chat/{session_id}/messages")
async def get_messages(session_id: str, last_message_count: int = 0):
    """Get chat messages"""
    try:
        if session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session = active_sessions[session_id]
        messages = session["messages"]
        
        # Return new messages only
        new_messages = messages[last_message_count:]
        
        return {
            "success": True,
            "messages": new_messages,
            "total_messages": len(messages)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting messages: {str(e)}")

@router.post("/chat/{session_id}/end")
async def end_chat(session_id: str):
    """End chat session"""
    try:
        if session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session = active_sessions[session_id]
        session["status"] = "ended"
        session["end_time"] = datetime.now()
        
        return {
            "success": True,
            "message": "Chat session ended",
            "duration": str(session["end_time"] - session["start_time"]).split(".")[0]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ending chat: {str(e)}")
