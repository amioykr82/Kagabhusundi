from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List, Dict, Any
from datetime import datetime, date, time
from enum import Enum

# Enums for validation
class ZodiacSign(str, Enum):
    ARIES = "Aries"
    TAURUS = "Taurus"
    GEMINI = "Gemini"
    CANCER = "Cancer"
    LEO = "Leo"
    VIRGO = "Virgo"
    LIBRA = "Libra"
    SCORPIO = "Scorpio"
    SAGITTARIUS = "Sagittarius"
    CAPRICORN = "Capricorn"
    AQUARIUS = "Aquarius"
    PISCES = "Pisces"

class PlanetName(str, Enum):
    SUN = "Sun"
    MOON = "Moon"
    MARS = "Mars"
    MERCURY = "Mercury"
    JUPITER = "Jupiter"
    VENUS = "Venus"
    SATURN = "Saturn"
    RAHU = "Rahu"
    KETU = "Ketu"
    URANUS = "Uranus"
    NEPTUNE = "Neptune"
    PLUTO = "Pluto"

class HouseName(str, Enum):
    FIRST = "1st House"
    SECOND = "2nd House"
    THIRD = "3rd House"
    FOURTH = "4th House"
    FIFTH = "5th House"
    SIXTH = "6th House"
    SEVENTH = "7th House"
    EIGHTH = "8th House"
    NINTH = "9th House"
    TENTH = "10th House"
    ELEVENTH = "11th House"
    TWELFTH = "12th House"

# Base Models
class BirthDetails(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    birth_date: date = Field(..., description="Birth date in YYYY-MM-DD format")
    birth_time: time = Field(..., description="Birth time in HH:MM:SS format")
    birth_location: str = Field(..., min_length=1, max_length=200)
    latitude: Optional[float] = Field(None, ge=-90, le=90)
    longitude: Optional[float] = Field(None, ge=-180, le=180)
    timezone: Optional[str] = Field(None, description="Timezone identifier")

    @validator('birth_date')
    def validate_birth_date(cls, v):
        if v > date.today():
            raise ValueError('Birth date cannot be in the future')
        return v

class Location(BaseModel):
    city: str
    country: str
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    timezone: str

# Astrology Models
class PlanetPosition(BaseModel):
    planet: PlanetName
    longitude: float = Field(..., ge=0, le=360)
    latitude: Optional[float] = None
    sign: ZodiacSign
    degree: float = Field(..., ge=0, lt=30)
    house: int = Field(..., ge=1, le=12)
    retrograde: bool = False
    nakshatra: Optional[str] = None
    nakshatra_pada: Optional[int] = Field(None, ge=1, le=4)

class HouseInfo(BaseModel):
    house_number: int = Field(..., ge=1, le=12)
    sign: ZodiacSign
    lord: PlanetName
    cusp_degree: float = Field(..., ge=0, le=360)
    planets: List[PlanetName] = []

class KundaliData(BaseModel):
    birth_details: BirthDetails
    planet_positions: List[PlanetPosition]
    house_info: List[HouseInfo]
    ascendant: ZodiacSign
    moon_sign: ZodiacSign
    sun_sign: ZodiacSign
    birth_nakshatra: str
    birth_nakshatra_pada: int = Field(..., ge=1, le=4)
    dasha_info: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.now)

class KundaliResponse(BaseModel):
    kundali_data: KundaliData
    interpretation: str
    ai_insights: Optional[str] = None
    remedies: Optional[List[str]] = None
    lucky_numbers: Optional[List[int]] = None
    lucky_colors: Optional[List[str]] = None

# Horoscope Models
class HoroscopeRequest(BaseModel):
    zodiac_sign: Optional[ZodiacSign] = None
    birth_details: Optional[BirthDetails] = None
    horoscope_type: str = Field(default="daily", pattern="^(daily|weekly|monthly|yearly)$")

class HoroscopeResponse(BaseModel):
    zodiac_sign: ZodiacSign
    horoscope_type: str
    prediction: str
    lucky_number: Optional[int] = None
    lucky_color: Optional[str] = None
    career_advice: Optional[str] = None
    love_advice: Optional[str] = None
    health_advice: Optional[str] = None
    financial_advice: Optional[str] = None
    date_generated: datetime = Field(default_factory=datetime.now)

# Tarot Models
class TarotCard(BaseModel):
    name: str
    suit: Optional[str] = None
    number: Optional[int] = None
    reversed: bool = False
    meaning: str
    keywords: List[str] = []
    image_url: Optional[str] = None

class TarotSpreadType(str, Enum):
    SINGLE = "single"
    THREE_CARD = "three_card"
    CELTIC_CROSS = "celtic_cross"
    FIVE_CARD = "five_card"

class TarotReadingRequest(BaseModel):
    spread_type: TarotSpreadType = TarotSpreadType.SINGLE
    question: Optional[str] = None
    focus_area: Optional[str] = None

class TarotReadingResponse(BaseModel):
    spread_type: TarotSpreadType
    cards: List[TarotCard]
    interpretation: str
    advice: Optional[str] = None
    question: Optional[str] = None
    date_generated: datetime = Field(default_factory=datetime.now)

# Compatibility Models
class CompatibilityRequest(BaseModel):
    person1: BirthDetails
    person2: BirthDetails
    analysis_type: str = Field(default="comprehensive", pattern="^(basic|comprehensive|detailed)$")

class CompatibilityScore(BaseModel):
    category: str
    score: float = Field(..., ge=0, le=100)
    description: str

class CompatibilityResponse(BaseModel):
    person1_sign: ZodiacSign
    person2_sign: ZodiacSign
    overall_score: float = Field(..., ge=0, le=100)
    compatibility_scores: List[CompatibilityScore]
    interpretation: str
    strengths: List[str] = []
    challenges: List[str] = []
    advice: Optional[str] = None
    date_generated: datetime = Field(default_factory=datetime.now)

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=1, max_length=100)
    birth_details: Optional[BirthDetails] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    birth_details: Optional[BirthDetails] = None
    is_active: bool = True
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

class TokenData(BaseModel):
    email: Optional[str] = None

# API Response Models
class APIResponse(BaseModel):
    success: bool = True
    message: str = "Request processed successfully"
    data: Optional[Any] = None
    error: Optional[str] = None

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error: str
    status_code: int
