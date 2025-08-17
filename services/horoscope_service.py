from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime, date
import random

from models.schemas import HoroscopeRequest, HoroscopeResponse, ZodiacSign
from utils.database import get_db
from services.gpt_service import get_horoscope_interpretation

router = APIRouter()

@router.post("/daily", response_model=HoroscopeResponse)
async def get_daily_horoscope(request: HoroscopeRequest, db: Session = Depends(get_db)):
    """
    Get daily horoscope for a zodiac sign
    """
    try:
        # Determine zodiac sign
        if request.zodiac_sign:
            sign = request.zodiac_sign
        elif request.birth_details:
            # Calculate zodiac sign from birth details
            sign = calculate_sun_sign(request.birth_details.birth_date)
        else:
            raise HTTPException(status_code=400, detail="Either zodiac_sign or birth_details required")
        
        # Get AI interpretation
        interpretation = await get_horoscope_interpretation(request)
        
        # Generate additional insights
        lucky_number = generate_lucky_number(sign)
        lucky_color = generate_lucky_color(sign)
        
        return HoroscopeResponse(
            zodiac_sign=sign,
            horoscope_type="daily",
            prediction=interpretation,
            lucky_number=lucky_number,
            lucky_color=lucky_color,
            career_advice=f"Focus on {get_career_focus(sign)} today",
            love_advice=f"{get_love_advice(sign)}",
            health_advice=f"{get_health_advice(sign)}",
            financial_advice=f"{get_financial_advice(sign)}"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating horoscope: {str(e)}")

@router.post("/weekly", response_model=HoroscopeResponse)
async def get_weekly_horoscope(request: HoroscopeRequest, db: Session = Depends(get_db)):
    """
    Get weekly horoscope for a zodiac sign
    """
    request.horoscope_type = "weekly"
    return await get_daily_horoscope(request, db)

@router.post("/monthly", response_model=HoroscopeResponse)
async def get_monthly_horoscope(request: HoroscopeRequest, db: Session = Depends(get_db)):
    """
    Get monthly horoscope for a zodiac sign
    """
    request.horoscope_type = "monthly"
    return await get_daily_horoscope(request, db)

@router.post("/generate", response_model=HoroscopeResponse)
async def generate_horoscope(request: HoroscopeRequest, db: Session = Depends(get_db)):
    """
    Generate horoscope for any type (daily, weekly, monthly, yearly)
    """
    try:
        # Determine zodiac sign
        if request.zodiac_sign:
            sign = request.zodiac_sign
        elif request.birth_details:
            # Calculate zodiac sign from birth details
            sign = calculate_sun_sign(request.birth_details.birth_date)
        else:
            raise HTTPException(status_code=400, detail="Either zodiac_sign or birth_details required")
        
        # Get AI interpretation based on horoscope type
        interpretation = await get_horoscope_interpretation(request)
        
        # Generate additional insights
        lucky_number = generate_lucky_number(sign)
        lucky_color = generate_lucky_color(sign)
        
        return HoroscopeResponse(
            zodiac_sign=sign,
            horoscope_type=request.horoscope_type,
            prediction=interpretation,
            lucky_number=lucky_number,
            lucky_color=lucky_color,
            career_advice=f"Focus on {get_career_focus(sign)} this {request.horoscope_type.replace('ly', '')}",
            love_advice=f"{get_love_advice(sign)}",
            health_advice=f"{get_health_advice(sign)}",
            financial_advice=f"{get_financial_advice(sign)}"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating horoscope: {str(e)}")

@router.get("/all-signs/{horoscope_type}")
async def get_all_signs_horoscope(horoscope_type: str):
    """
    Get horoscope for all zodiac signs
    """
    if horoscope_type not in ["daily", "weekly", "monthly"]:
        raise HTTPException(status_code=400, detail="Invalid horoscope type")
    
    horoscopes = {}
    for sign in ZodiacSign:
        request = HoroscopeRequest(zodiac_sign=sign, horoscope_type=horoscope_type)
        try:
            horoscope = await get_daily_horoscope(request)
            horoscopes[sign.value] = horoscope
        except:
            continue
    
    return horoscopes

@router.get("/{horoscope_type}/{sign}")
async def get_horoscope_by_sign(horoscope_type: str, sign: str, db: Session = Depends(get_db)):
    """
    Get horoscope for a specific zodiac sign (GET endpoint)
    """
    try:
        # Validate horoscope type
        if horoscope_type not in ["daily", "weekly", "monthly"]:
            raise HTTPException(status_code=400, detail="Invalid horoscope type. Must be 'daily', 'weekly', or 'monthly'")
        
        # Convert string to ZodiacSign enum (case-insensitive)
        try:
            # First try exact match with proper case
            zodiac_sign = ZodiacSign(sign.capitalize())
        except ValueError:
            # Try to match by value (case-insensitive)
            try:
                zodiac_sign = next(z for z in ZodiacSign if z.value.lower() == sign.lower())
            except StopIteration:
                raise HTTPException(status_code=400, detail=f"Invalid zodiac sign: {sign}. Valid signs: {[z.value.lower() for z in ZodiacSign]}")
        
        # Create request object
        request = HoroscopeRequest(zodiac_sign=zodiac_sign, horoscope_type=horoscope_type)
        
        # Get appropriate horoscope based on type
        if horoscope_type == "daily":
            return await get_daily_horoscope(request, db)
        elif horoscope_type == "weekly":
            return await get_weekly_horoscope(request, db)
        elif horoscope_type == "monthly":
            return await get_monthly_horoscope(request, db)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating horoscope: {str(e)}")

def calculate_sun_sign(birth_date: date) -> ZodiacSign:
    """
    Calculate sun sign from birth date (simplified)
    """
    month = birth_date.month
    day = birth_date.day
    
    # Simplified zodiac date ranges
    if (month == 3 and day >= 21) or (month == 4 and day <= 19):
        return ZodiacSign.ARIES
    elif (month == 4 and day >= 20) or (month == 5 and day <= 20):
        return ZodiacSign.TAURUS
    elif (month == 5 and day >= 21) or (month == 6 and day <= 20):
        return ZodiacSign.GEMINI
    elif (month == 6 and day >= 21) or (month == 7 and day <= 22):
        return ZodiacSign.CANCER
    elif (month == 7 and day >= 23) or (month == 8 and day <= 22):
        return ZodiacSign.LEO
    elif (month == 8 and day >= 23) or (month == 9 and day <= 22):
        return ZodiacSign.VIRGO
    elif (month == 9 and day >= 23) or (month == 10 and day <= 22):
        return ZodiacSign.LIBRA
    elif (month == 10 and day >= 23) or (month == 11 and day <= 21):
        return ZodiacSign.SCORPIO
    elif (month == 11 and day >= 22) or (month == 12 and day <= 21):
        return ZodiacSign.SAGITTARIUS
    elif (month == 12 and day >= 22) or (month == 1 and day <= 19):
        return ZodiacSign.CAPRICORN
    elif (month == 1 and day >= 20) or (month == 2 and day <= 18):
        return ZodiacSign.AQUARIUS
    else:
        return ZodiacSign.PISCES

def generate_lucky_number(sign: ZodiacSign) -> int:
    """
    Generate lucky number based on zodiac sign
    """
    sign_numbers = {
        ZodiacSign.ARIES: [1, 8, 17],
        ZodiacSign.TAURUS: [2, 6, 9, 12, 24],
        ZodiacSign.GEMINI: [5, 7, 14, 23],
        ZodiacSign.CANCER: [2, 7, 11, 16, 20, 25],
        ZodiacSign.LEO: [1, 3, 10, 19],
        ZodiacSign.VIRGO: [3, 15, 6, 21],
        ZodiacSign.LIBRA: [4, 6, 13, 15, 24],
        ZodiacSign.SCORPIO: [8, 13, 21, 27],
        ZodiacSign.SAGITTARIUS: [3, 9, 22, 30],
        ZodiacSign.CAPRICORN: [6, 8, 26, 35],
        ZodiacSign.AQUARIUS: [4, 7, 11, 22, 29],
        ZodiacSign.PISCES: [3, 9, 12, 15, 18, 24]
    }
    return random.choice(sign_numbers.get(sign, [7, 14, 21]))

def generate_lucky_color(sign: ZodiacSign) -> str:
    """
    Generate lucky color based on zodiac sign
    """
    sign_colors = {
        ZodiacSign.ARIES: ["Red", "Orange", "Yellow"],
        ZodiacSign.TAURUS: ["Green", "Pink", "White"],
        ZodiacSign.GEMINI: ["Yellow", "Silver", "Grey"],
        ZodiacSign.CANCER: ["White", "Silver", "Sea Green"],
        ZodiacSign.LEO: ["Gold", "Orange", "Red"],
        ZodiacSign.VIRGO: ["Green", "Brown", "Navy"],
        ZodiacSign.LIBRA: ["Pink", "Blue", "White"],
        ZodiacSign.SCORPIO: ["Red", "Maroon", "Black"],
        ZodiacSign.SAGITTARIUS: ["Purple", "Orange", "Yellow"],
        ZodiacSign.CAPRICORN: ["Black", "Brown", "Grey"],
        ZodiacSign.AQUARIUS: ["Blue", "Turquoise", "Silver"],
        ZodiacSign.PISCES: ["Sea Green", "Purple", "Yellow"]
    }
    return random.choice(sign_colors.get(sign, ["White", "Gold"]))

def get_career_focus(sign: ZodiacSign) -> str:
    """
    Get career focus for zodiac sign
    """
    focuses = {
        ZodiacSign.ARIES: "leadership and new initiatives",
        ZodiacSign.TAURUS: "steady progress and financial planning",
        ZodiacSign.GEMINI: "communication and networking",
        ZodiacSign.CANCER: "team collaboration and support",
        ZodiacSign.LEO: "creative projects and recognition",
        ZodiacSign.VIRGO: "details and organization",
        ZodiacSign.LIBRA: "partnerships and balance",
        ZodiacSign.SCORPIO: "research and transformation",
        ZodiacSign.SAGITTARIUS: "learning and expansion",
        ZodiacSign.CAPRICORN: "structure and long-term goals",
        ZodiacSign.AQUARIUS: "innovation and technology",
        ZodiacSign.PISCES: "creativity and intuition"
    }
    return focuses.get(sign, "professional development")

def get_love_advice(sign: ZodiacSign) -> str:
    """
    Get love advice for zodiac sign
    """
    advice = {
        ZodiacSign.ARIES: "Take initiative but be patient with your partner",
        ZodiacSign.TAURUS: "Express your feelings through actions and gestures",
        ZodiacSign.GEMINI: "Communicate openly and listen actively",
        ZodiacSign.CANCER: "Trust your intuition in matters of the heart",
        ZodiacSign.LEO: "Show appreciation and give space for mutual admiration",
        ZodiacSign.VIRGO: "Focus on practical ways to show you care",
        ZodiacSign.LIBRA: "Seek harmony and avoid unnecessary conflicts",
        ZodiacSign.SCORPIO: "Be vulnerable and open to deeper connections",
        ZodiacSign.SAGITTARIUS: "Give your partner freedom while sharing adventures",
        ZodiacSign.CAPRICORN: "Build trust through consistency and reliability",
        ZodiacSign.AQUARIUS: "Embrace uniqueness and intellectual connections",
        ZodiacSign.PISCES: "Follow your heart but keep your feet on the ground"
    }
    return advice.get(sign, "Be authentic and open in your relationships")

def get_health_advice(sign: ZodiacSign) -> str:
    """
    Get health advice for zodiac sign
    """
    advice = {
        ZodiacSign.ARIES: "Channel your energy through physical exercise",
        ZodiacSign.TAURUS: "Focus on neck and throat care, eat mindfully",
        ZodiacSign.GEMINI: "Practice breathing exercises and hand care",
        ZodiacSign.CANCER: "Pay attention to digestion and emotional wellness",
        ZodiacSign.LEO: "Protect your heart health and maintain good posture",
        ZodiacSign.VIRGO: "Focus on digestive health and stress management",
        ZodiacSign.LIBRA: "Balance is key - avoid extremes in diet and lifestyle",
        ZodiacSign.SCORPIO: "Stay hydrated and focus on reproductive health",
        ZodiacSign.SAGITTARIUS: "Protect your hips and thighs, stay active",
        ZodiacSign.CAPRICORN: "Care for your bones and joints, avoid overwork",
        ZodiacSign.AQUARIUS: "Pay attention to circulation and ankle health",
        ZodiacSign.PISCES: "Take care of your feet and practice meditation"
    }
    return advice.get(sign, "Maintain balance in all aspects of health")

def get_financial_advice(sign: ZodiacSign) -> str:
    """
    Get financial advice for zodiac sign
    """
    advice = {
        ZodiacSign.ARIES: "Avoid impulsive purchases, plan before investing",
        ZodiacSign.TAURUS: "Continue your steady saving approach",
        ZodiacSign.GEMINI: "Diversify your investments and stay informed",
        ZodiacSign.CANCER: "Focus on home and family-related expenses",
        ZodiacSign.LEO: "Budget for entertainment but avoid overspending",
        ZodiacSign.VIRGO: "Your analytical skills will help in financial planning",
        ZodiacSign.LIBRA: "Seek balance between spending and saving",
        ZodiacSign.SCORPIO: "Research investments thoroughly before committing",
        ZodiacSign.SAGITTARIUS: "Set aside funds for travel and education",
        ZodiacSign.CAPRICORN: "Your disciplined approach will pay off",
        ZodiacSign.AQUARIUS: "Consider innovative investment opportunities",
        ZodiacSign.PISCES: "Trust your intuition but verify with facts"
    }
    return advice.get(sign, "Make informed financial decisions")
