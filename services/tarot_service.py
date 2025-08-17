from fastapi import APIRouter, HTTPException
import random
from typing import List, Optional
from datetime import datetime

from models.schemas import TarotReadingRequest, TarotReadingResponse, TarotCard, TarotSpreadType

router = APIRouter()

# Enhanced Tarot deck with detailed meanings and professional interpretations
TAROT_DECK = [
    # Major Arcana with detailed professional meanings
    {
        "name": "The Fool", 
        "number": 0,
        "meaning": "New beginnings, innocence, spontaneity, free spirit",
        "upright_meaning": "New beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe",
        "reversed_meaning": "Recklessness, carelessness, negligence, stupidity, distraction, apathy, irrationality and lack of fun",
        "keywords": ["journey", "potential", "freedom", "adventure", "innocence", "faith"],
        "element": "Air",
        "zodiac": "Uranus",
        "yes_no": "Yes"
    },
    {
        "name": "The Magician", 
        "number": 1,
        "meaning": "Manifestation, resourcefulness, power, inspired action",
        "upright_meaning": "Having the power to manifest your desires, being resourceful, having the skills and abilities you need to succeed, being confident, being focused and having a strong will",
        "reversed_meaning": "Manipulation, cunning, trickery, wasted talent, illusion, deception and lack of self-confidence",
        "keywords": ["manifestation", "creation", "willpower", "skill", "concentration", "action"],
        "element": "Air",
        "zodiac": "Mercury",
        "yes_no": "Yes"
    },
    {
        "name": "The High Priestess", 
        "number": 2,
        "meaning": "Intuition, sacred knowledge, divine feminine, the subconscious",
        "upright_meaning": "Being in touch with your intuition, being mysterious, being passive, having hidden knowledge, being calm and serene and being wise beyond your years",
        "reversed_meaning": "Blocked intuition, hidden agendas, superficiality, confusion, cognitive dissonance and information overload",
        "keywords": ["intuition", "mystery", "wisdom", "spirituality", "inner voice", "unconscious"],
        "element": "Water",
        "zodiac": "Moon",
        "yes_no": "Maybe"
    },
    {
        "name": "The Empress", 
        "number": 3,
        "meaning": "Femininity, beauty, nature, abundance, motherhood",
        "upright_meaning": "Being a mother or maternal figure, being creative, being abundant, being beautiful, being connected to nature and being fertile",
        "reversed_meaning": "Smothering, dependence, empty nest syndrome, lack of growth and stagnation",
        "keywords": ["fertility", "creation", "abundance", "nature", "nurturing", "sensuality"],
        "element": "Earth",
        "zodiac": "Venus",
        "yes_no": "Yes"
    },
    {
        "name": "The Emperor", 
        "number": 4,
        "meaning": "Authority, establishment, structure, father figure",
        "upright_meaning": "Being a leader, being authoritative, being structured, being powerful, being disciplined and being protective",
        "reversed_meaning": "Tyranny, rigidity, coldness, being overly demanding, inflexibility and losing sight of what is important",
        "keywords": ["authority", "leadership", "structure", "control", "discipline", "power"],
        "element": "Fire",
        "zodiac": "Aries",
        "yes_no": "Yes"
    },
    {
        "name": "The Hierophant", 
        "number": 5,
        "meaning": "Spiritual wisdom, religious beliefs, conformity, tradition",
        "upright_meaning": "Following traditions, being conservative, being part of an institution, being a teacher or student, seeking guidance and conforming",
        "reversed_meaning": "Rebellion, challenging traditions, freedom, unconventional approaches and finding your own way",
        "keywords": ["tradition", "conformity", "teaching", "guidance", "beliefs", "institutions"],
        "element": "Earth",
        "zodiac": "Taurus",
        "yes_no": "Maybe"
    },
    {
        "name": "The Lovers", 
        "number": 6,
        "meaning": "Love, harmony, relationships, values alignment, choices",
        "upright_meaning": "Being in love, making relationships work, being attractive, being harminous, making good choices and being sexually desirable",
        "reversed_meaning": "Disharmony, trust issues, imbalance, conflict, detachment and bad choices",
        "keywords": ["love", "relationships", "choice", "harmony", "attraction", "values"],
        "element": "Air",
        "zodiac": "Gemini",
        "yes_no": "Yes"
    },
    {
        "name": "The Chariot", 
        "number": 7,
        "meaning": "Control, willpower, success, determination, direction",
        "upright_meaning": "Having determination, being successful, having control, being focused, being disciplined and overcoming obstacles",
        "reversed_meaning": "Losing control, lack of direction, aggression, being forceful and lacking self-discipline",
        "keywords": ["control", "determination", "success", "focus", "willpower", "victory"],
        "element": "Water",
        "zodiac": "Cancer",
        "yes_no": "Yes"
    },
    {
        "name": "Strength", 
        "number": 8,
        "meaning": "Strength, courage, patience, control, compassion",
        "upright_meaning": "Having inner strength, being brave, being patient, having self-control, being gentle and being compassionate",
        "reversed_meaning": "Weakness, lack of courage, lack of self-discipline, being forceful and being aggressive",
        "keywords": ["courage", "inner strength", "patience", "self-control", "compassion", "gentleness"],
        "element": "Fire",
        "zodiac": "Leo",
        "yes_no": "Yes"
    },
    {
        "name": "The Hermit", 
        "number": 9,
        "meaning": "Soul searching, introspection, inner guidance, solitude",
        "upright_meaning": "Searching for truth, becoming wise, being introspective, being patient, receiving guidance and being alone",
        "reversed_meaning": "Loneliness, isolation, being anti-social, rejection, returning to society and seeking false guidance",
        "keywords": ["introspection", "wisdom", "guidance", "solitude", "reflection", "enlightenment"],
        "element": "Earth",
        "zodiac": "Virgo",
        "yes_no": "Maybe"
    },
    {
        "name": "Wheel of Fortune", 
        "number": 10,
        "meaning": "Good luck, karma, life cycles, destiny, turning point",
        "upright_meaning": "Having good luck, being at a turning point, having things go your way, being optimistic, having good karma and having fate on your side",
        "reversed_meaning": "Bad luck, being unlucky, things not going your way, being pessimistic, having bad karma and lacking control",
        "keywords": ["luck", "destiny", "change", "cycles", "karma", "fate"],
        "element": "Fire",
        "zodiac": "Jupiter",
        "yes_no": "Yes"
    },
    {
        "name": "Justice", 
        "number": 11,
        "meaning": "Justice, fairness, truth, cause and effect, law",
        "upright_meaning": "Making fair decisions, being impartial, seeking truth, taking responsibility, being accountable and having legal matters resolved",
        "reversed_meaning": "Injustice, lack of accountability, being biased, being unfair, avoiding responsibility and legal complications",
        "keywords": ["fairness", "truth", "balance", "accountability", "legal matters", "karma"],
        "element": "Air",
        "zodiac": "Libra",
        "yes_no": "Yes"
    },
    {
        "name": "The Hanged Man", 
        "number": 12,
        "meaning": "Suspension, restriction, letting go, sacrifice",
        "upright_meaning": "Being patient, letting go, being suspended, making sacrifices, gaining new perspectives and being restricted",
        "reversed_meaning": "Stalling, needless sacrifice, fear of sacrifice, being stuck, missing opportunities and being impatient",
        "keywords": ["sacrifice", "letting go", "patience", "perspective", "suspension", "surrender"],
        "element": "Water",
        "zodiac": "Neptune",
        "yes_no": "Maybe"
    },
    {
        "name": "Death", 
        "number": 13,
        "meaning": "Endings, beginnings, change, transformation, transition",
        "upright_meaning": "Major life changes, transformation, new beginnings, letting go of the past, moving forward and spiritual transformation",
        "reversed_meaning": "Resisting change, fear of change, repeating negative patterns, stagnation, decay and being stuck",
        "keywords": ["transformation", "endings", "new beginnings", "rebirth", "transition", "release"],
        "element": "Water",
        "zodiac": "Scorpio",
        "yes_no": "Maybe"
    },
    {
        "name": "Temperance", 
        "number": 14,
        "meaning": "Balance, moderation, patience, purpose, meaning",
        "upright_meaning": "Finding balance, being patient, being moderate, finding meaning, having a higher purpose and being guided by a higher power",
        "reversed_meaning": "Imbalance, excess, extremes, discord, recklessness and lack of long-term vision",
        "keywords": ["balance", "moderation", "patience", "harmony", "healing", "integration"],
        "element": "Fire",
        "zodiac": "Sagittarius",
        "yes_no": "Yes"
    },
    {
        "name": "The Devil", 
        "number": 15,
        "meaning": "Bondage, addiction, sexuality, materialism, ignorance",
        "upright_meaning": "Being trapped, feeling hopeless, being addicted, being materialistic, being in an unhealthy relationship and being ignorant",
        "reversed_meaning": "Breaking free, overcoming addiction, freedom, release, reclaiming power and independence",
        "keywords": ["bondage", "materialism", "temptation", "addiction", "restriction", "illusion"],
        "element": "Earth",
        "zodiac": "Capricorn",
        "yes_no": "No"
    },
    {
        "name": "The Tower", 
        "number": 16,
        "meaning": "Sudden change, upheaval, chaos, revelation, awakening",
        "upright_meaning": "Sudden change, upheaval, awakening, revelation, being shaken up and having your foundations rocked",
        "reversed_meaning": "Avoiding disaster, delaying the inevitable, resisting change, averting crisis and clinging to the past",
        "keywords": ["upheaval", "sudden change", "revelation", "awakening", "disruption", "breakthrough"],
        "element": "Fire",
        "zodiac": "Mars",
        "yes_no": "No"
    },
    {
        "name": "The Star", 
        "number": 17,
        "meaning": "Hope, faith, purpose, renewal, spirituality",
        "upright_meaning": "Having hope, being optimistic, having faith, finding your purpose, being spiritual and finding peace",
        "reversed_meaning": "Despair, lack of faith, disconnection, discouragement, lack of inspiration and being overwhelmed",
        "keywords": ["hope", "inspiration", "spirituality", "guidance", "wishes", "dreams"],
        "element": "Air",
        "zodiac": "Aquarius",
        "yes_no": "Yes"
    },
    {
        "name": "The Moon", 
        "number": 18,
        "meaning": "Illusion, fear, anxiety, subconscious, intuition",
        "upright_meaning": "Having illusions, being fearful, being anxious, being confused, having dreams and being guided by intuition",
        "reversed_meaning": "Overcoming fear, finding clarity, overcoming illusions, gaining insight and conquering anxiety",
        "keywords": ["illusion", "intuition", "dreams", "subconscious", "fear", "mystery"],
        "element": "Water",
        "zodiac": "Pisces",
        "yes_no": "Maybe"
    },
    {
        "name": "The Sun", 
        "number": 19,
        "meaning": "Positivity, fun, warmth, success, vitality, joy",
        "upright_meaning": "Being successful, being positive, having fun, being warm, being vital, being joyful and being optimistic",
        "reversed_meaning": "Temporary setbacks, lack of success, being pessimistic, lack of joy, being gloomy and delayed gratification",
        "keywords": ["success", "joy", "celebration", "positivity", "vitality", "enlightenment"],
        "element": "Fire",
        "zodiac": "Sun",
        "yes_no": "Yes"
    },
    {
        "name": "Judgement", 
        "number": 20,
        "meaning": "Judgement, rebirth, inner calling, absolution",
        "upright_meaning": "Making important decisions, being judged, being called to a higher purpose, being forgiven, having a spiritual awakening and being reborn",
        "reversed_meaning": "Self-doubt, harsh judgment, lack of forgiveness, missing the call and being unforgiving",
        "keywords": ["rebirth", "awakening", "judgment", "forgiveness", "calling", "transformation"],
        "element": "Fire",
        "zodiac": "Pluto",
        "yes_no": "Yes"
    },
    {
        "name": "The World", 
        "number": 21,
        "meaning": "Completion, accomplishment, travel, fulfillment",
        "upright_meaning": "Completing a journey, accomplishing goals, being successful, traveling, feeling fulfilled and reaching your potential",
        "reversed_meaning": "Incomplete, lack of closure, stagnation, lack of achievement and seeking shortcuts",
        "keywords": ["completion", "fulfillment", "achievement", "success", "wholeness", "travel"],
        "element": "Earth",
        "zodiac": "Saturn",
        "yes_no": "Yes"
    }
]

@router.post("/draw", response_model=TarotReadingResponse)
async def draw_tarot_cards(request: TarotReadingRequest):
    """
    Draw tarot cards and provide professional interpretation
    """
    try:
        # Determine number of cards based on spread type
        num_cards = get_spread_card_count(request.spread_type)
        
        # Draw random cards
        drawn_cards = draw_random_cards(num_cards)
        
        # Generate professional interpretation
        interpretation = generate_professional_interpretation(
            drawn_cards, 
            request.question, 
            request.spread_type.value
        )
        
        # Generate practical advice
        advice = generate_tarot_advice(drawn_cards, request.question)
        
        return TarotReadingResponse(
            spread_type=request.spread_type,
            cards=drawn_cards,
            interpretation=interpretation,
            advice=advice,
            question=request.question
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error drawing tarot cards: {str(e)}")

@router.get("/card-meanings")
async def get_card_meanings():
    """
    Get meanings of all tarot cards
    """
    return {"cards": TAROT_DECK}

@router.get("/spreads")
async def get_spread_types():
    """
    Get available tarot spread types
    """
    return {
        "spreads": [
            {
                "type": "single",
                "name": "Single Card Draw",
                "description": "One card for general guidance",
                "cards": 1
            },
            {
                "type": "three_card",
                "name": "Three Card Spread",
                "description": "Past, Present, Future or Situation, Action, Outcome",
                "cards": 3
            },
            {
                "type": "five_card",
                "name": "Five Card Spread",
                "description": "Comprehensive reading covering multiple aspects",
                "cards": 5
            },
            {
                "type": "celtic_cross",
                "name": "Celtic Cross",
                "description": "Traditional 10-card spread for deep insight",
                "cards": 10
            }
        ]
    }

def get_spread_card_count(spread_type: TarotSpreadType) -> int:
    """
    Get number of cards for spread type
    """
    counts = {
        TarotSpreadType.SINGLE: 1,
        TarotSpreadType.THREE_CARD: 3,
        TarotSpreadType.FIVE_CARD: 5,
        TarotSpreadType.CELTIC_CROSS: 10
    }
    return counts.get(spread_type, 1)

def draw_random_cards(num_cards: int) -> List[TarotCard]:
    """
    Draw random cards from the tarot deck
    """
    drawn_cards = []
    available_cards = TAROT_DECK.copy()
    
    for _ in range(min(num_cards, len(available_cards))):
        # Select random card
        card_data = random.choice(available_cards)
        available_cards.remove(card_data)
        
        # Determine if reversed (30% chance)
        reversed = random.random() < 0.3
        
        # Create TarotCard object
        card = TarotCard(
            name=card_data["name"],
            reversed=reversed,
            meaning=card_data["meaning"],
            keywords=card_data["keywords"]
        )
        
        drawn_cards.append(card)
    
    return drawn_cards

def generate_professional_interpretation(cards: List[TarotCard], question: Optional[str], spread_type: str) -> str:
    """
    Generate professional, detailed interpretation based on cards, question, and spread type
    """
    # Enhanced card meanings for interpretation
    card_interpretations = []
    
    for i, card in enumerate(cards):
        card_data = next((c for c in TAROT_DECK if c["name"] == card.name), None)
        if card_data:
            position_meaning = get_position_meaning(spread_type, i)
            card_meaning = card_data["reversed_meaning"] if card.reversed else card_data["upright_meaning"]
            
            interpretation = f"**{position_meaning}**: The {card.name}"
            if card.reversed:
                interpretation += " (Reversed)"
            interpretation += f" suggests {card_meaning.lower()}. "
            
            # Add contextual interpretation based on question
            if question:
                context_interpretation = generate_contextual_meaning(card_data, question, card.reversed)
                interpretation += context_interpretation
            
            card_interpretations.append(interpretation)
    
    # Create comprehensive reading
    base_interpretation = " ".join(card_interpretations)
    
    # Add overall reading summary
    overall_summary = generate_reading_summary(cards, question, spread_type)
    
    return f"{base_interpretation}\n\n**Overall Message**: {overall_summary}"

def get_position_meaning(spread_type: str, position: int) -> str:
    """
    Get the meaning of card position based on spread type
    """
    position_meanings = {
        "single": ["Your Guidance"],
        "three_card": ["Past/Foundation", "Present/Current Situation", "Future/Potential Outcome"],
        "five_card": ["Past Influences", "Present Situation", "Hidden Influences", "Advice", "Potential Outcome"],
        "celtic_cross": [
            "Present Situation", "Challenge/Cross", "Distant Past/Foundation", "Recent Past",
            "Possible Outcome", "Immediate Future", "Your Approach", "External Influences",
            "Inner Emotions", "Final Outcome"
        ]
    }
    
    meanings = position_meanings.get(spread_type, ["Card"])
    return meanings[min(position, len(meanings) - 1)]

def generate_contextual_meaning(card_data: dict, question: str, reversed: bool) -> str:
    """
    Generate contextual interpretation based on question theme
    """
    question_lower = question.lower()
    
    # Identify question theme
    if any(word in question_lower for word in ["love", "relationship", "romance", "partner", "marriage"]):
        return generate_love_context(card_data, reversed)
    elif any(word in question_lower for word in ["career", "job", "work", "profession", "business"]):
        return generate_career_context(card_data, reversed)
    elif any(word in question_lower for word in ["money", "financial", "wealth", "income", "finance"]):
        return generate_finance_context(card_data, reversed)
    elif any(word in question_lower for word in ["health", "wellness", "healing", "medical"]):
        return generate_health_context(card_data, reversed)
    else:
        return generate_general_context(card_data, reversed)

def generate_love_context(card_data: dict, reversed: bool) -> str:
    """Generate love-specific interpretation"""
    love_meanings = {
        "The Lovers": "This indicates a strong romantic connection and important choices in love." if not reversed else "There may be disharmony or difficult decisions in your relationship.",
        "Two of Cups": "A beautiful partnership and emotional connection is highlighted." if not reversed else "Communication issues or emotional distance may be present.",
        "The Empress": "Fertility, nurturing love, and creative partnerships are favored." if not reversed else "Codependency or smothering tendencies may need attention.",
        "Ten of Cups": "Family happiness and emotional fulfillment are strongly indicated." if not reversed else "Family conflicts or unrealistic expectations may cause discord."
    }
    
    return love_meanings.get(card_data["name"], "In matters of the heart, trust your intuition while remaining grounded in reality.")

def generate_career_context(card_data: dict, reversed: bool) -> str:
    """Generate career-specific interpretation"""
    career_meanings = {
        "The Magician": "You have all the skills needed to manifest your professional goals." if not reversed else "Beware of manipulation or lack of confidence in your abilities.",
        "Three of Pentacles": "Teamwork and collaboration will lead to career success." if not reversed else "Conflicts with colleagues or lack of recognition may arise.",
        "The Emperor": "Leadership opportunities and career advancement are indicated." if not reversed else "Authoritarian behavior or rigid thinking may hinder progress.",
        "Eight of Pentacles": "Dedication to skill development will pay off professionally." if not reversed else "Perfectionism or repetitive work may be draining your energy."
    }
    
    return career_meanings.get(card_data["name"], "Professional growth comes through balanced effort and strategic thinking.")

def generate_finance_context(card_data: dict, reversed: bool) -> str:
    """Generate finance-specific interpretation"""
    finance_meanings = {
        "Ten of Pentacles": "Long-term financial security and generational wealth are possible." if not reversed else "Financial instability or family money issues may arise.",
        "Ace of Pentacles": "New financial opportunities and material beginnings are indicated." if not reversed else "Missed opportunities or poor financial planning may occur.",
        "Four of Pentacles": "Financial security through careful saving and investment." if not reversed else "Greed or excessive penny-pinching may limit growth.",
        "The Devil": "Beware of financial temptations or debt traps." if not reversed else "Breaking free from financial constraints or addictive spending."
    }
    
    return finance_meanings.get(card_data["name"], "Financial stability comes through wise decisions and balanced spending.")

def generate_health_context(card_data: dict, reversed: bool) -> str:
    """Generate health-specific interpretation"""
    health_meanings = {
        "The Star": "Healing and renewed vitality are strongly indicated." if not reversed else "Health setbacks or loss of hope may need attention.",
        "Temperance": "Balance and moderation will improve your wellbeing." if not reversed else "Excess or imbalance may be affecting your health.",
        "The Sun": "Radiant health and positive energy are highlighted." if not reversed else "Vitamin D deficiency or seasonal depression may be factors.",
        "Nine of Swords": "Stress and anxiety may be impacting your physical health." if not reversed else "Recovery from mental health challenges is possible."
    }
    
    return health_meanings.get(card_data["name"], "Your physical and mental wellbeing are interconnected - care for both.")

def generate_general_context(card_data: dict, reversed: bool) -> str:
    """Generate general life guidance"""
    element = card_data.get("element", "")
    
    if element == "Fire":
        return "Take inspired action and trust your passion to guide you." if not reversed else "Avoid impulsive decisions and channel your energy constructively."
    elif element == "Water":
        return "Trust your intuition and emotional wisdom." if not reversed else "Don't let emotions cloud your judgment - seek clarity."
    elif element == "Air":
        return "Clear communication and logical thinking will serve you well." if not reversed else "Avoid overthinking and trust your inner knowing."
    elif element == "Earth":
        return "Practical steps and grounded action will bring results." if not reversed else "Don't get stuck in routine - embrace necessary changes."
    
    return "This card encourages you to find balance between action and reflection."

def generate_reading_summary(cards: List[TarotCard], question: Optional[str], spread_type: str) -> str:
    """
    Generate an overall summary of the reading
    """
    # Analyze card themes
    themes = []
    reversed_count = sum(1 for card in cards if card.reversed)
    
    # Major vs Minor Arcana analysis
    major_arcana_count = sum(1 for card in cards if any(c["name"] == card.name and c.get("number", 100) <= 21 for c in TAROT_DECK))
    
    if major_arcana_count > len(cards) // 2:
        themes.append("major life themes and spiritual lessons")
    else:
        themes.append("practical, day-to-day matters")
    
    # Reversed cards analysis
    if reversed_count > len(cards) // 2:
        themes.append("internal reflection and releasing old patterns")
    elif reversed_count == 0:
        themes.append("forward momentum and external manifestation")
    
    # Element analysis
    elements = {}
    for card in cards:
        card_data = next((c for c in TAROT_DECK if c["name"] == card.name), None)
        if card_data:
            element = card_data.get("element", "Unknown")
            elements[element] = elements.get(element, 0) + 1
    
    dominant_element = max(elements, key=lambda x: elements[x]) if elements else None
    
    element_meanings = {
        "Fire": "passion, creativity, and taking action",
        "Water": "emotions, intuition, and spiritual growth",
        "Air": "communication, intellect, and new ideas",
        "Earth": "practical matters, material success, and stability"
    }
    
    if dominant_element and dominant_element in element_meanings:
        themes.append(element_meanings[dominant_element])
    
    # Create summary
    theme_text = ", ".join(themes[:3])  # Limit to 3 main themes
    
    summary = f"Your reading reveals a focus on {theme_text}. "
    
    # Add spread-specific guidance
    if spread_type == "three_card":
        summary += "The cards show how your past experiences are shaping your present situation and guiding you toward your future potential."
    elif spread_type == "celtic_cross":
        summary += "This comprehensive reading reveals the complex web of influences affecting your situation and the path forward."
    elif spread_type == "five_card":
        summary += "The cards provide detailed guidance on your current path and the steps needed for positive transformation."
    else:
        summary += "Trust the guidance offered and take inspired action aligned with your highest good."
    
    return summary

def generate_tarot_advice(cards: List[TarotCard], question: Optional[str] = None) -> str:
    """
    Generate practical, actionable advice based on drawn cards
    """
    advice_parts = []
    
    # Analyze card patterns for specific advice
    for card in cards:
        card_data = next((c for c in TAROT_DECK if c["name"] == card.name), None)
        if card_data:
            advice_parts.extend(generate_card_advice(card_data, card.reversed, question))
    
    # Add question-specific guidance
    if question:
        advice_parts.append(generate_question_specific_advice(question, cards))
    
    # Add general wisdom
    advice_parts.append("Remember, the future is not fixed - your choices and actions can influence the outcome.")
    
    # Remove duplicates and join
    unique_advice = list(dict.fromkeys(advice_parts))  # Removes duplicates while preserving order
    return " ".join(unique_advice[:5])  # Limit to 5 key pieces of advice

def generate_card_advice(card_data: dict, reversed: bool, question: Optional[str]) -> List[str]:
    """Generate specific advice based on individual card"""
    advice = []
    
    card_name = card_data["name"]
    keywords = card_data["keywords"]
    
    # Specific advice for major arcana cards
    major_advice = {
        "The Fool": ["Take calculated risks and trust in new beginnings."] if not reversed else ["Think before you leap and avoid reckless decisions."],
        "The Magician": ["Use your skills and resources to manifest your goals."] if not reversed else ["Avoid manipulation and focus on authentic self-expression."],
        "The High Priestess": ["Trust your intuition and look beyond surface appearances."] if not reversed else ["Don't ignore your inner voice - seek quiet reflection."],
        "The Empress": ["Nurture your creative projects and relationships."] if not reversed else ["Avoid being overly controlling or dependent on others."],
        "The Emperor": ["Take leadership and create structure in your life."] if not reversed else ["Balance authority with compassion and flexibility."]
    }
    
    if card_name in major_advice:
        advice.extend(major_advice[card_name])
    
    # Keyword-based advice
    if "change" in keywords:
        advice.append("Embrace necessary changes rather than resisting them.")
    if "love" in keywords:
        advice.append("Lead with your heart while maintaining healthy boundaries.")
    if "success" in keywords:
        advice.append("Success comes through consistent effort and clear intentions.")
    
    return advice

def generate_question_specific_advice(question: str, cards: List[TarotCard]) -> str:
    """Generate advice tailored to the specific question asked"""
    question_lower = question.lower()
    
    if any(word in question_lower for word in ["should i", "what should"]):
        return "The cards suggest following your authentic path while considering practical consequences."
    elif any(word in question_lower for word in ["will i", "when will"]):
        return "Focus on what you can control today rather than trying to predict exact timing."
    elif any(word in question_lower for word in ["how can i", "how do i"]):
        return "The answer lies in combining practical action with spiritual alignment."
    elif any(word in question_lower for word in ["why", "what is the reason"]):
        return "Look for the deeper lessons and growth opportunities in your situation."
    else:
        return "Trust the process and remain open to unexpected solutions."
