import swisseph as swe
import math
from datetime import datetime, timedelta
from typing import List, Tuple, Dict, Any

from models.schemas import PlanetPosition, HouseInfo, ZodiacSign, PlanetName

# Swiss Ephemeris planet constants
PLANET_CONSTANTS = {
    PlanetName.SUN: swe.SUN,
    PlanetName.MOON: swe.MOON,
    PlanetName.MERCURY: swe.MERCURY,
    PlanetName.VENUS: swe.VENUS,
    PlanetName.MARS: swe.MARS,
    PlanetName.JUPITER: swe.JUPITER,
    PlanetName.SATURN: swe.SATURN,
    PlanetName.URANUS: swe.URANUS,
    PlanetName.NEPTUNE: swe.NEPTUNE,
    PlanetName.PLUTO: swe.PLUTO,
    PlanetName.RAHU: swe.MEAN_NODE,  # North Node
    PlanetName.KETU: swe.MEAN_NODE   # South Node (calculated as opposite of Rahu)
}

# Zodiac signs
ZODIAC_SIGNS = [
    ZodiacSign.ARIES, ZodiacSign.TAURUS, ZodiacSign.GEMINI, ZodiacSign.CANCER,
    ZodiacSign.LEO, ZodiacSign.VIRGO, ZodiacSign.LIBRA, ZodiacSign.SCORPIO,
    ZodiacSign.SAGITTARIUS, ZodiacSign.CAPRICORN, ZodiacSign.AQUARIUS, ZodiacSign.PISCES
]

# Nakshatras (27 lunar mansions)
NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
    "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
    "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
    "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada",
    "Uttara Bhadrapada", "Revati"
]

def calculate_planet_positions(jd: float, lat: float, lon: float) -> List[PlanetPosition]:
    """
    Calculate positions of all planets for given Julian Day and location
    """
    positions = []
    
    # Set topocentric flag
    swe.set_topo(lon, lat, 0)
    
    for planet_name, planet_const in PLANET_CONSTANTS.items():
        try:
            # Calculate planet position
            if planet_name == PlanetName.KETU:
                # Ketu is opposite to Rahu (180 degrees)
                rahu_pos = swe.calc_ut(jd, swe.MEAN_NODE, swe.FLG_SWIEPH)[0][0]
                longitude = (rahu_pos + 180) % 360
                latitude = 0
                distance = 0
                speed = 0
            else:
                result = swe.calc_ut(jd, planet_const, swe.FLG_SWIEPH)
                longitude, latitude, distance, speed, _, _ = result[0]
            
            # Determine zodiac sign and degree within sign
            sign_index = int(longitude // 30)
            degree_in_sign = longitude % 30
            zodiac_sign = ZODIAC_SIGNS[sign_index]
            
            # Calculate house position (simplified - using equal house system)
            # This should be improved with actual house calculation
            house = ((int(longitude) // 30) + 1) % 12
            if house == 0:
                house = 12
            
            # Determine if planet is retrograde (negative speed)
            is_retrograde = speed < 0
            
            # Get nakshatra
            nakshatra, nakshatra_pada = get_nakshatra(longitude)
            
            position = PlanetPosition(
                planet=planet_name,
                longitude=longitude,
                latitude=latitude,
                sign=zodiac_sign,
                degree=degree_in_sign,
                house=house,
                retrograde=is_retrograde,
                nakshatra=nakshatra,
                nakshatra_pada=nakshatra_pada
            )
            
            positions.append(position)
            
        except Exception as e:
            print(f"Error calculating position for {planet_name}: {e}")
            continue
    
    return positions

def calculate_houses(jd: float, lat: float, lon: float) -> List[HouseInfo]:
    """
    Calculate house cusps using Placidus house system
    """
    houses = []
    
    try:
        # Calculate house cusps using Placidus system
        house_cusps = swe.houses(jd, lat, lon, b'P')[0]  # 'P' for Placidus
        
        for i, cusp_degree in enumerate(house_cusps[1:13]):  # Houses 1-12
            house_number = i + 1
            
            # Determine sign of the cusp
            sign_index = int(cusp_degree // 30)
            zodiac_sign = ZODIAC_SIGNS[sign_index]
            
            # Determine house lord (simplified)
            lord = get_house_lord(zodiac_sign)
            
            house_info = HouseInfo(
                house_number=house_number,
                sign=zodiac_sign,
                lord=lord,
                cusp_degree=cusp_degree,
                planets=[]  # Will be populated later
            )
            
            houses.append(house_info)
            
    except Exception as e:
        print(f"Error calculating houses: {e}")
        # Return default houses if calculation fails
        for i in range(12):
            houses.append(HouseInfo(
                house_number=i + 1,
                sign=ZODIAC_SIGNS[i % 12],
                lord=PlanetName.SUN,
                cusp_degree=i * 30,
                planets=[]
            ))
    
    return houses

def get_zodiac_sign(longitude: float) -> ZodiacSign:
    """
    Get zodiac sign for given longitude
    """
    sign_index = int(longitude // 30) % 12
    return ZODIAC_SIGNS[sign_index]

def get_house_lord(sign: ZodiacSign) -> PlanetName:
    """
    Get traditional ruler of zodiac sign
    """
    lords = {
        ZodiacSign.ARIES: PlanetName.MARS,
        ZodiacSign.TAURUS: PlanetName.VENUS,
        ZodiacSign.GEMINI: PlanetName.MERCURY,
        ZodiacSign.CANCER: PlanetName.MOON,
        ZodiacSign.LEO: PlanetName.SUN,
        ZodiacSign.VIRGO: PlanetName.MERCURY,
        ZodiacSign.LIBRA: PlanetName.VENUS,
        ZodiacSign.SCORPIO: PlanetName.MARS,
        ZodiacSign.SAGITTARIUS: PlanetName.JUPITER,
        ZodiacSign.CAPRICORN: PlanetName.SATURN,
        ZodiacSign.AQUARIUS: PlanetName.SATURN,
        ZodiacSign.PISCES: PlanetName.JUPITER
    }
    return lords.get(sign, PlanetName.SUN)

def get_nakshatra(longitude: float) -> Tuple[str, int]:
    """
    Get nakshatra and pada for given longitude
    """
    # Each nakshatra spans 13°20' (800 minutes of arc)
    nakshatra_span = 360 / 27  # 13.333... degrees
    
    # Calculate nakshatra index
    nakshatra_index = int(longitude / nakshatra_span)
    
    # Calculate pada (quarter within nakshatra)
    pada_span = nakshatra_span / 4  # 3.333... degrees
    pada = int((longitude % nakshatra_span) / pada_span) + 1
    
    # Ensure pada is between 1-4
    pada = max(1, min(4, pada))
    
    return NAKSHATRAS[nakshatra_index % 27], pada

def calculate_dasha(moon_longitude: float, birth_datetime: datetime) -> Dict[str, Any]:
    """
    Calculate Vimshottari Dasha system
    """
    # Dasha periods in years
    dasha_periods = {
        "Ketu": 7, "Venus": 20, "Sun": 6, "Moon": 10, "Mars": 7,
        "Rahu": 18, "Jupiter": 16, "Saturn": 19, "Mercury": 17
    }
    
    # Nakshatra lords
    nakshatra_lords = [
        "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"
    ] * 3  # Repeat pattern for 27 nakshatras
    
    # Get current nakshatra
    nakshatra, _ = get_nakshatra(moon_longitude)
    nakshatra_index = NAKSHATRAS.index(nakshatra)
    
    # Get dasha lord
    dasha_lord = nakshatra_lords[nakshatra_index]
    
    # Calculate elapsed time in current nakshatra
    nakshatra_span = 360 / 27
    progress_in_nakshatra = (moon_longitude % nakshatra_span) / nakshatra_span
    
    # Calculate remaining time in current dasha
    total_dasha_years = dasha_periods[dasha_lord]
    elapsed_years = total_dasha_years * progress_in_nakshatra
    remaining_years = total_dasha_years - elapsed_years
    
    # Calculate dasha end date
    dasha_end_date = birth_datetime + timedelta(days=remaining_years * 365.25)
    
    return {
        "current_dasha_lord": dasha_lord,
        "dasha_started": birth_datetime,
        "dasha_ends": dasha_end_date,
        "remaining_years": round(remaining_years, 2),
        "total_years": total_dasha_years,
        "progress_percentage": round(progress_in_nakshatra * 100, 2)
    }

def calculate_planetary_strength(planet_positions: List[PlanetPosition]) -> Dict[str, float]:
    """
    Calculate basic planetary strength (Shadbala simplified)
    """
    strengths = {}
    
    for planet_pos in planet_positions:
        strength = 0.0
        
        # Exaltation/Debilitation points
        exaltation_signs = {
            PlanetName.SUN: ZodiacSign.ARIES,
            PlanetName.MOON: ZodiacSign.TAURUS,
            PlanetName.MARS: ZodiacSign.CAPRICORN,
            PlanetName.MERCURY: ZodiacSign.VIRGO,
            PlanetName.JUPITER: ZodiacSign.CANCER,
            PlanetName.VENUS: ZodiacSign.PISCES,
            PlanetName.SATURN: ZodiacSign.LIBRA
        }
        
        if planet_pos.planet in exaltation_signs:
            if planet_pos.sign == exaltation_signs[planet_pos.planet]:
                strength += 20  # Exalted
            elif planet_pos.sign == get_opposite_sign(exaltation_signs[planet_pos.planet]):
                strength -= 20  # Debilitated
        
        # Own sign strength
        own_signs = {
            PlanetName.SUN: [ZodiacSign.LEO],
            PlanetName.MOON: [ZodiacSign.CANCER],
            PlanetName.MARS: [ZodiacSign.ARIES, ZodiacSign.SCORPIO],
            PlanetName.MERCURY: [ZodiacSign.GEMINI, ZodiacSign.VIRGO],
            PlanetName.JUPITER: [ZodiacSign.SAGITTARIUS, ZodiacSign.PISCES],
            PlanetName.VENUS: [ZodiacSign.TAURUS, ZodiacSign.LIBRA],
            PlanetName.SATURN: [ZodiacSign.CAPRICORN, ZodiacSign.AQUARIUS]
        }
        
        if planet_pos.planet in own_signs and planet_pos.sign in own_signs[planet_pos.planet]:
            strength += 15
        
        # Retrograde strength (only for outer planets)
        if planet_pos.retrograde and planet_pos.planet in [PlanetName.MARS, PlanetName.JUPITER, PlanetName.SATURN]:
            strength += 10
        
        # House position strength (simplified)
        strong_houses = [1, 4, 7, 10]  # Angular houses
        if planet_pos.house in strong_houses:
            strength += 10
        
        strengths[planet_pos.planet.value] = max(0, min(100, strength + 50))  # Normalize to 0-100
    
    return strengths

def get_opposite_sign(sign: ZodiacSign) -> ZodiacSign:
    """
    Get opposite zodiac sign
    """
    sign_index = ZODIAC_SIGNS.index(sign)
    opposite_index = (sign_index + 6) % 12
    return ZODIAC_SIGNS[opposite_index]
