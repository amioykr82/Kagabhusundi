from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from models.schemas import CompatibilityRequest, CompatibilityResponse, CompatibilityScore, ZodiacSign
from utils.database import get_db
from services.gpt_service import get_compatibility_interpretation

router = APIRouter()

@router.post("/analyze", response_model=CompatibilityResponse)
async def analyze_compatibility(request: CompatibilityRequest, db: Session = Depends(get_db)):
    """
    Analyze astrological compatibility between two people
    """
    try:
        # Calculate zodiac signs
        person1_sign = calculate_sun_sign(request.person1.birth_date)
        person2_sign = calculate_sun_sign(request.person2.birth_date)
        
        # Calculate compatibility scores
        compatibility_scores = calculate_compatibility_scores(person1_sign, person2_sign)
        
        # Calculate overall score
        overall_score = sum(score.score for score in compatibility_scores) / len(compatibility_scores)
        
        # Get strengths and challenges
        strengths = get_relationship_strengths(person1_sign, person2_sign)
        challenges = get_relationship_challenges(person1_sign, person2_sign)
        
        # Get AI interpretation
        person1_data = {"sign": person1_sign.value, "birth_date": str(request.person1.birth_date)}
        person2_data = {"sign": person2_sign.value, "birth_date": str(request.person2.birth_date)}
        interpretation = await get_compatibility_interpretation(
            person1_data, person2_data, [score.__dict__ for score in compatibility_scores]
        )
        
        # Generate advice
        advice = generate_relationship_advice(person1_sign, person2_sign, overall_score)
        
        return CompatibilityResponse(
            person1_sign=person1_sign,
            person2_sign=person2_sign,
            overall_score=round(overall_score, 1),
            compatibility_scores=compatibility_scores,
            interpretation=interpretation,
            strengths=strengths,
            challenges=challenges,
            advice=advice
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing compatibility: {str(e)}")

@router.get("/sign-compatibility/{sign1}/{sign2}")
async def get_sign_compatibility(sign1: str, sign2: str):
    """
    Get basic compatibility between two zodiac signs
    """
    try:
        # Validate signs
        sign1_enum = ZodiacSign(sign1.title())
        sign2_enum = ZodiacSign(sign2.title())
        
        scores = calculate_compatibility_scores(sign1_enum, sign2_enum)
        overall = sum(score.score for score in scores) / len(scores)
        
        return {
            "sign1": sign1_enum.value,
            "sign2": sign2_enum.value,
            "overall_compatibility": round(overall, 1),
            "scores": [score.__dict__ for score in scores],
            "match_description": get_match_description(overall)
        }
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid zodiac sign")

def calculate_compatibility_scores(sign1: ZodiacSign, sign2: ZodiacSign) -> List[CompatibilityScore]:
    """
    Calculate detailed compatibility scores between two signs
    """
    # Element compatibility
    element_score = calculate_element_compatibility(sign1, sign2)
    
    # Modality compatibility
    modality_score = calculate_modality_compatibility(sign1, sign2)
    
    # Communication compatibility
    communication_score = calculate_communication_compatibility(sign1, sign2)
    
    # Emotional compatibility
    emotional_score = calculate_emotional_compatibility(sign1, sign2)
    
    # Value compatibility
    value_score = calculate_value_compatibility(sign1, sign2)
    
    # Physical compatibility
    physical_score = calculate_physical_compatibility(sign1, sign2)
    
    return [
        CompatibilityScore(
            category="Elemental Harmony",
            score=element_score,
            description="How well your fundamental energies blend together"
        ),
        CompatibilityScore(
            category="Communication Style",
            score=communication_score,
            description="How effectively you communicate and understand each other"
        ),
        CompatibilityScore(
            category="Emotional Connection",
            score=emotional_score,
            description="Your emotional compatibility and understanding"
        ),
        CompatibilityScore(
            category="Shared Values",
            score=value_score,
            description="Alignment in life goals and core values"
        ),
        CompatibilityScore(
            category="Physical Chemistry",
            score=physical_score,
            description="Physical attraction and romantic compatibility"
        ),
        CompatibilityScore(
            category="Lifestyle Compatibility",
            score=modality_score,
            description="How well your life approaches and rhythms match"
        )
    ]

def get_element(sign: ZodiacSign) -> str:
    """Get element for zodiac sign"""
    elements = {
        ZodiacSign.ARIES: "Fire", ZodiacSign.LEO: "Fire", ZodiacSign.SAGITTARIUS: "Fire",
        ZodiacSign.TAURUS: "Earth", ZodiacSign.VIRGO: "Earth", ZodiacSign.CAPRICORN: "Earth",
        ZodiacSign.GEMINI: "Air", ZodiacSign.LIBRA: "Air", ZodiacSign.AQUARIUS: "Air",
        ZodiacSign.CANCER: "Water", ZodiacSign.SCORPIO: "Water", ZodiacSign.PISCES: "Water"
    }
    return elements[sign]

def get_modality(sign: ZodiacSign) -> str:
    """Get modality for zodiac sign"""
    modalities = {
        ZodiacSign.ARIES: "Cardinal", ZodiacSign.CANCER: "Cardinal", 
        ZodiacSign.LIBRA: "Cardinal", ZodiacSign.CAPRICORN: "Cardinal",
        ZodiacSign.TAURUS: "Fixed", ZodiacSign.LEO: "Fixed", 
        ZodiacSign.SCORPIO: "Fixed", ZodiacSign.AQUARIUS: "Fixed",
        ZodiacSign.GEMINI: "Mutable", ZodiacSign.VIRGO: "Mutable", 
        ZodiacSign.SAGITTARIUS: "Mutable", ZodiacSign.PISCES: "Mutable"
    }
    return modalities[sign]

def calculate_element_compatibility(sign1: ZodiacSign, sign2: ZodiacSign) -> float:
    """Calculate compatibility based on elements"""
    element1 = get_element(sign1)
    element2 = get_element(sign2)
    
    compatibility_matrix = {
        ("Fire", "Fire"): 85, ("Fire", "Air"): 90, ("Fire", "Earth"): 60, ("Fire", "Water"): 55,
        ("Air", "Air"): 80, ("Air", "Earth"): 65, ("Air", "Water"): 70,
        ("Earth", "Earth"): 85, ("Earth", "Water"): 90,
        ("Water", "Water"): 85
    }
    
    key = (element1, element2) if (element1, element2) in compatibility_matrix else (element2, element1)
    return compatibility_matrix.get(key, 50)

def calculate_modality_compatibility(sign1: ZodiacSign, sign2: ZodiacSign) -> float:
    """Calculate compatibility based on modalities"""
    mod1 = get_modality(sign1)
    mod2 = get_modality(sign2)
    
    if mod1 == mod2:
        return 75  # Same modality - understanding but potential stubbornness
    elif (mod1 == "Cardinal" and mod2 == "Mutable") or (mod1 == "Mutable" and mod2 == "Cardinal"):
        return 85  # Complementary
    elif (mod1 == "Fixed" and mod2 == "Mutable") or (mod1 == "Mutable" and mod2 == "Fixed"):
        return 80  # Balancing
    else:
        return 70  # Cardinal + Fixed - potential power struggles

def calculate_communication_compatibility(sign1: ZodiacSign, sign2: ZodiacSign) -> float:
    """Calculate communication compatibility"""
    # Air signs are naturally communicative
    air_signs = [ZodiacSign.GEMINI, ZodiacSign.LIBRA, ZodiacSign.AQUARIUS]
    earth_signs = [ZodiacSign.TAURUS, ZodiacSign.VIRGO, ZodiacSign.CAPRICORN]
    fire_signs = [ZodiacSign.ARIES, ZodiacSign.LEO, ZodiacSign.SAGITTARIUS]
    water_signs = [ZodiacSign.CANCER, ZodiacSign.SCORPIO, ZodiacSign.PISCES]
    
    score = 50  # Base score
    
    # Both air signs
    if sign1 in air_signs and sign2 in air_signs:
        score += 35
    # One air sign
    elif sign1 in air_signs or sign2 in air_signs:
        score += 25
    # Fire signs are direct communicators
    elif sign1 in fire_signs and sign2 in fire_signs:
        score += 30
    # Earth signs are practical communicators
    elif sign1 in earth_signs and sign2 in earth_signs:
        score += 25
    # Water signs communicate emotionally
    elif sign1 in water_signs and sign2 in water_signs:
        score += 20
    
    return min(100, score)

def calculate_emotional_compatibility(sign1: ZodiacSign, sign2: ZodiacSign) -> float:
    """Calculate emotional compatibility"""
    water_signs = [ZodiacSign.CANCER, ZodiacSign.SCORPIO, ZodiacSign.PISCES]
    fire_signs = [ZodiacSign.ARIES, ZodiacSign.LEO, ZodiacSign.SAGITTARIUS]
    earth_signs = [ZodiacSign.TAURUS, ZodiacSign.VIRGO, ZodiacSign.CAPRICORN]
    air_signs = [ZodiacSign.GEMINI, ZodiacSign.LIBRA, ZodiacSign.AQUARIUS]
    
    score = 50  # Base score
    
    # Water signs are most emotionally intuitive
    if sign1 in water_signs and sign2 in water_signs:
        score += 40
    elif (sign1 in water_signs and sign2 in earth_signs) or (sign1 in earth_signs and sign2 in water_signs):
        score += 35  # Earth provides stability for water's emotions
    elif sign1 in water_signs or sign2 in water_signs:
        score += 20
    elif sign1 in fire_signs and sign2 in fire_signs:
        score += 25  # Passionate connection
    
    return min(100, score)

def calculate_value_compatibility(sign1: ZodiacSign, sign2: ZodiacSign) -> float:
    """Calculate value alignment compatibility"""
    # Simplified value alignment based on sign characteristics
    traditional_signs = [ZodiacSign.TAURUS, ZodiacSign.CANCER, ZodiacSign.VIRGO, ZodiacSign.CAPRICORN]
    progressive_signs = [ZodiacSign.ARIES, ZodiacSign.GEMINI, ZodiacSign.SAGITTARIUS, ZodiacSign.AQUARIUS]
    balanced_signs = [ZodiacSign.LEO, ZodiacSign.LIBRA, ZodiacSign.SCORPIO, ZodiacSign.PISCES]
    
    score = 60  # Base score
    
    if (sign1 in traditional_signs and sign2 in traditional_signs) or \
       (sign1 in progressive_signs and sign2 in progressive_signs):
        score += 30
    elif sign1 in balanced_signs or sign2 in balanced_signs:
        score += 20
    
    return min(100, score)

def calculate_physical_compatibility(sign1: ZodiacSign, sign2: ZodiacSign) -> float:
    """Calculate physical/romantic compatibility"""
    fire_signs = [ZodiacSign.ARIES, ZodiacSign.LEO, ZodiacSign.SAGITTARIUS]
    water_signs = [ZodiacSign.CANCER, ZodiacSign.SCORPIO, ZodiacSign.PISCES]
    earth_signs = [ZodiacSign.TAURUS, ZodiacSign.VIRGO, ZodiacSign.CAPRICORN]
    air_signs = [ZodiacSign.GEMINI, ZodiacSign.LIBRA, ZodiacSign.AQUARIUS]
    
    score = 50  # Base score
    
    # Fire and air create spark
    if (sign1 in fire_signs and sign2 in air_signs) or (sign1 in air_signs and sign2 in fire_signs):
        score += 35
    # Earth and water create sensuality
    elif (sign1 in earth_signs and sign2 in water_signs) or (sign1 in water_signs and sign2 in earth_signs):
        score += 35
    # Same element passion
    elif (sign1 in fire_signs and sign2 in fire_signs) or (sign1 in water_signs and sign2 in water_signs):
        score += 30
    
    return min(100, score)

def calculate_sun_sign(birth_date):
    """Calculate sun sign from birth date (simplified)"""
    month = birth_date.month
    day = birth_date.day
    
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

def get_relationship_strengths(sign1: ZodiacSign, sign2: ZodiacSign) -> List[str]:
    """Get relationship strengths based on signs"""
    strengths = []
    element1, element2 = get_element(sign1), get_element(sign2)
    
    if element1 == element2:
        strengths.append("Deep understanding of each other's motivations")
        strengths.append("Natural harmony in life approach")
    
    if element1 == "Fire" and element2 == "Air":
        strengths.append("Exciting and dynamic partnership")
        strengths.append("Mutual inspiration and growth")
    elif element1 == "Earth" and element2 == "Water":
        strengths.append("Stable and nurturing relationship")
        strengths.append("Practical and emotional balance")
    
    strengths.append("Complementary personality traits")
    strengths.append("Potential for personal growth through partnership")
    
    return strengths[:4]

def get_relationship_challenges(sign1: ZodiacSign, sign2: ZodiacSign) -> List[str]:
    """Get potential relationship challenges"""
    challenges = []
    element1, element2 = get_element(sign1), get_element(sign2)
    mod1, mod2 = get_modality(sign1), get_modality(sign2)
    
    if mod1 == "Fixed" and mod2 == "Fixed":
        challenges.append("Both partners may be stubborn and resistant to change")
    elif mod1 == "Cardinal" and mod2 == "Cardinal":
        challenges.append("Potential power struggles over leadership")
    
    if element1 == "Fire" and element2 == "Water":
        challenges.append("Different emotional expression styles")
    elif element1 == "Earth" and element2 == "Air":
        challenges.append("Different pace and approach to life")
    
    challenges.append("Need to work on understanding different perspectives")
    
    return challenges[:3]

def generate_relationship_advice(sign1: ZodiacSign, sign2: ZodiacSign, overall_score: float) -> str:
    """Generate relationship advice"""
    if overall_score >= 80:
        return "You have excellent compatibility! Focus on maintaining open communication and appreciating each other's unique qualities."
    elif overall_score >= 70:
        return "Good compatibility with room for growth. Work on understanding each other's differences and building on your strengths."
    elif overall_score >= 60:
        return "Moderate compatibility. Success will require effort, patience, and willingness to compromise from both partners."
    else:
        return "Challenging compatibility that will require significant work. Focus on finding common ground and respecting differences."

def get_match_description(score: float) -> str:
    """Get match description based on score"""
    if score >= 85:
        return "Excellent Match"
    elif score >= 75:
        return "Very Good Match"
    elif score >= 65:
        return "Good Match"
    elif score >= 55:
        return "Average Match"
    else:
        return "Challenging Match"
