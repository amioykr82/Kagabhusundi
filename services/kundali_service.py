from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import swisseph as swe
from datetime import datetime, timezone
import math
import os
from typing import Dict, List, Any

from models.schemas import BirthDetails, KundaliData, KundaliResponse, PlanetPosition, HouseInfo, ZodiacSign, PlanetName
from utils.database import get_db
from services.gpt_service import get_kundali_interpretation
from utils.astro_calculations import (
    calculate_planet_positions, 
    calculate_houses, 
    get_zodiac_sign, 
    get_nakshatra,
    calculate_dasha
)

router = APIRouter()

@router.post("/generate", response_model=KundaliResponse)
async def generate_kundali(birth_details: BirthDetails, db: Session = Depends(get_db)):
    """
    Generate detailed Kundali (Birth Chart) with planetary positions, houses, and AI interpretation
    """
    try:
        # Validate birth details
        if not all([birth_details.name, birth_details.birth_date, birth_details.birth_time, birth_details.birth_location]):
            raise HTTPException(status_code=400, detail="All birth details are required")

        # Calculate astronomical data
        kundali_data = await calculate_kundali_data(birth_details)
        
        # Get AI interpretation
        interpretation = await get_kundali_interpretation(kundali_data)
        
        # Store reading in database (optional - for registered users)
        # await store_kundali_reading(db, kundali_data, interpretation)
        
        # Generate additional insights
        remedies = generate_remedies(kundali_data)
        lucky_numbers = generate_lucky_numbers(kundali_data)
        lucky_colors = generate_lucky_colors(kundali_data)
        
        return KundaliResponse(
            kundali_data=kundali_data,
            interpretation=interpretation,
            ai_insights=f"Based on your birth chart analysis for {birth_details.name}",
            remedies=remedies,
            lucky_numbers=lucky_numbers,
            lucky_colors=lucky_colors
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating Kundali: {str(e)}")

@router.get("/sample")
async def get_sample_kundali():
    """
    Get a sample Kundali for demonstration purposes
    """
    sample_birth_details = BirthDetails(
        name="Sample User",
        birth_date="1990-01-01",
        birth_time="12:00:00",
        birth_location="New Delhi, India",
        latitude=28.6139,
        longitude=77.2090,
        timezone="Asia/Kolkata"
    )
    
    return await generate_kundali(sample_birth_details)

async def calculate_kundali_data(birth_details: BirthDetails) -> KundaliData:
    """
    Calculate complete Kundali data including planets, houses, and other astrological factors
    """
    try:
        # Convert birth details to Julian Day Number
        birth_datetime = datetime.combine(birth_details.birth_date, birth_details.birth_time)
        jd = swe.julday(
            birth_datetime.year,
            birth_datetime.month,
            birth_datetime.day,
            birth_datetime.hour + birth_datetime.minute/60.0 + birth_datetime.second/3600.0
        )
        
        # Set geographic coordinates
        lat = birth_details.latitude or 0.0
        lon = birth_details.longitude or 0.0
        
        # Calculate planetary positions
        planet_positions = calculate_planet_positions(jd, lat, lon)
        
        # Calculate house cusps
        house_info = calculate_houses(jd, lat, lon)
        
        # Get main signs
        ascendant = get_zodiac_sign(house_info[0].cusp_degree)
        
        # Find Moon and Sun positions
        moon_pos = next((p for p in planet_positions if p.planet == PlanetName.MOON), None)
        sun_pos = next((p for p in planet_positions if p.planet == PlanetName.SUN), None)
        
        moon_sign = moon_pos.sign if moon_pos else ZodiacSign.ARIES
        sun_sign = sun_pos.sign if sun_pos else ZodiacSign.ARIES
        
        # Calculate birth nakshatra
        birth_nakshatra, nakshatra_pada = get_nakshatra(moon_pos.longitude if moon_pos else 0)
        
        # Calculate Dasha information
        dasha_info = calculate_dasha(moon_pos.longitude if moon_pos else 0, birth_datetime)
        
        return KundaliData(
            birth_details=birth_details,
            planet_positions=planet_positions,
            house_info=house_info,
            ascendant=ascendant,
            moon_sign=moon_sign,
            sun_sign=sun_sign,
            birth_nakshatra=birth_nakshatra,
            birth_nakshatra_pada=nakshatra_pada,
            dasha_info=dasha_info
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating Kundali data: {str(e)}")

def generate_remedies(kundali_data: KundaliData) -> List[str]:
    """
    Generate astrological remedies based on planetary positions
    """
    remedies = []
    
    # Basic remedies based on planetary positions
    for planet_pos in kundali_data.planet_positions:
        if planet_pos.planet == PlanetName.SUN and planet_pos.house in [6, 8, 12]:
            remedies.append("Offer water to Sun every morning")
            remedies.append("Donate wheat or jaggery on Sundays")
            
        elif planet_pos.planet == PlanetName.MOON and planet_pos.house in [6, 8, 12]:
            remedies.append("Wear silver or pearl jewelry")
            remedies.append("Donate white items on Mondays")
            
        elif planet_pos.planet == PlanetName.MARS and planet_pos.house in [6, 8, 12]:
            remedies.append("Recite Hanuman Chalisa daily")
            remedies.append("Donate red items on Tuesdays")
    
    # Nakshatra-based remedies
    nakshatra_remedies = {
        "Ashwini": ["Chant Om Gam Ganapataye Namaha", "Wear white or golden colors"],
        "Bharani": ["Worship Lord Yama", "Avoid unnecessary conflicts"],
        "Krittika": ["Worship Agni (Fire God)", "Practice meditation daily"]
    }
    
    if kundali_data.birth_nakshatra in nakshatra_remedies:
        remedies.extend(nakshatra_remedies[kundali_data.birth_nakshatra])
    
    return remedies[:5]  # Return top 5 remedies

def generate_lucky_numbers(kundali_data: KundaliData) -> List[int]:
    """
    Generate lucky numbers based on planetary positions
    """
    lucky_numbers = []
    
    # Numbers based on birth nakshatra pada
    lucky_numbers.append(kundali_data.birth_nakshatra_pada)
    
    # Numbers based on planetary positions
    for planet_pos in kundali_data.planet_positions:
        if planet_pos.planet == PlanetName.SUN:
            lucky_numbers.extend([1, 10, 19, 28])
        elif planet_pos.planet == PlanetName.MOON:
            lucky_numbers.extend([2, 11, 20, 29])
        elif planet_pos.planet == PlanetName.JUPITER:
            lucky_numbers.extend([3, 12, 21, 30])
    
    # Remove duplicates and return top 7
    return list(set(lucky_numbers))[:7]

def generate_lucky_colors(kundali_data: KundaliData) -> List[str]:
    """
    Generate lucky colors based on planetary positions and signs
    """
    colors = []
    
    # Colors based on ascendant sign
    sign_colors = {
        ZodiacSign.ARIES: ["Red", "Orange", "Yellow"],
        ZodiacSign.TAURUS: ["Green", "Pink", "White"],
        ZodiacSign.GEMINI: ["Yellow", "Green", "Orange"],
        ZodiacSign.CANCER: ["White", "Silver", "Sea Green"],
        ZodiacSign.LEO: ["Gold", "Orange", "Red"],
        ZodiacSign.VIRGO: ["Green", "Brown", "Navy Blue"],
        ZodiacSign.LIBRA: ["Pink", "White", "Light Blue"],
        ZodiacSign.SCORPIO: ["Red", "Maroon", "Black"],
        ZodiacSign.SAGITTARIUS: ["Yellow", "Orange", "Purple"],
        ZodiacSign.CAPRICORN: ["Black", "Brown", "Dark Green"],
        ZodiacSign.AQUARIUS: ["Blue", "Turquoise", "Electric Blue"],
        ZodiacSign.PISCES: ["Sea Green", "Purple", "Yellow"]
    }
    
    colors.extend(sign_colors.get(kundali_data.ascendant, ["White", "Gold"]))
    
    return colors[:5]
