import os
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv
import json

from models.schemas import KundaliData, HoroscopeRequest, TarotReadingResponse, CompatibilityResponse

load_dotenv()

# Check if OpenAI is available and configured
OPENAI_AVAILABLE = False
client = None

try:
    import openai
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key and api_key != "your-openai-api-key-here":
        client = openai.OpenAI(api_key=api_key)
        OPENAI_AVAILABLE = True
except ImportError:
    pass

class GPTService:
    def __init__(self):
        self.model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
        self.max_tokens = int(os.getenv("OPENAI_MAX_TOKENS", "1000"))
        
    async def get_completion(self, prompt: str, max_tokens: Optional[int] = None) -> str:
        """
        Get completion from OpenAI GPT model or fallback to placeholder
        """
        if not OPENAI_AVAILABLE or not client:
            return self._get_fallback_response(prompt)
            
        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a master Vedic astrologer with 25+ years of experience, renowned for accurate predictions and profound spiritual insights. You combine traditional Sanskrit astrological wisdom with modern psychological understanding. Your guidance has helped thousands find clarity and purpose. Write with authority, compassion, and practical wisdom."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens or self.max_tokens,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._get_fallback_response(prompt)
    
    def _get_fallback_response(self, prompt: str) -> str:
        """
        Provide fallback responses when OpenAI is not available
        """
        if "kundali" in prompt.lower() or "birth chart" in prompt.lower():
            return """
🌟 **Kundali Insights from Kagabhushundi**

Your birth chart reveals a unique cosmic blueprint that influences your life's journey. The planetary positions at your birth create a beautiful symphony of energies that guide your destiny.

📜 **Cosmic Overview**
The celestial bodies at the time of your birth have woven a special pattern of influences that shape your personality, strengths, and life path.

🌙 **Life Path & Purpose**
Your spiritual journey is illuminated by ancient wisdom. The stars suggest a path of growth, learning, and cosmic alignment.

⭐ **Strengths & Gifts**
Natural talents and abilities are indicated by your planetary positions. Trust your intuition and inner wisdom.

🔮 **Guidance for Growth**
Focus on spiritual development, maintain balance in all aspects of life, and trust the cosmic flow.

*Note: This is a simplified interpretation. For detailed AI-powered insights, please configure the OpenAI integration in your environment settings.*
"""
        elif "horoscope" in prompt.lower():
            return """
🌟 **Daily Cosmic Guidance from Kagabhushundi**

Today brings positive cosmic energy your way. The planetary alignments suggest opportunities for growth and wisdom.

💫 **General Outlook**: A day of potential and spiritual growth awaits you.
🌙 **Emotional Sphere**: Trust your intuition and inner guidance.
💝 **Relationships**: Show compassion and understanding to those around you.
⭐ **Opportunities**: Keep your heart and mind open to new possibilities.
🔮 **Spiritual Guidance**: Meditate and connect with your higher self.

*This is a simplified horoscope. For personalized AI-powered predictions, please configure the OpenAI integration.*
"""
        elif "compatibility" in prompt.lower():
            return """
💕 **Cosmic Compatibility Wisdom from Kagabhushundi**

🌟 **Harmony Assessment**: The cosmic energies between you show potential for meaningful connection.

💫 **Strengths**: 
- Complementary spiritual energies
- Shared potential for growth and understanding
- Natural empathy and connection

🌙 **Areas for Growth**:
- Open communication and patience
- Balancing individual needs with togetherness
- Understanding different perspectives

🔮 **Cosmic Guidance**:
Build your relationship on trust, mutual respect, and spiritual growth. The universe favors connections that elevate both souls.

*This is a simplified analysis. For detailed AI-powered compatibility insights, please configure the OpenAI integration.*
"""
        elif "tarot" in prompt.lower():
            return """
🔮 **Tarot Wisdom from Kagabhushundi**

The cards carry ancient messages of guidance and insight. Each card represents different energies and possibilities on your spiritual journey.

🃏 **The Cards Speak**:
Your reading reveals themes of transformation, growth, and cosmic alignment. The universe is communicating important messages for your path forward.

✨ **Key Messages**:
- Trust your inner wisdom and intuitive guidance
- Embrace change as a sacred opportunity for evolution
- Stay open to signs and synchronicities
- Balance is essential in all aspects of life

🌟 **Sacred Guidance**:
The cosmos supports your highest good. Pay attention to the subtle messages around you and trust your spiritual journey.

*This is a simplified interpretation. For detailed AI-powered tarot readings, please configure the OpenAI integration.*
"""
        else:
            return """
🌟 **Cosmic Wisdom from Kagabhushundi**

The universe speaks through many channels - the stars, planets, cards, and your own inner wisdom. Trust in the cosmic flow and know that you are guided and supported on your spiritual journey.

May the light of cosmic consciousness illuminate your path.

*For detailed AI-powered insights, please configure the OpenAI integration in your environment settings.*
"""

gpt_service = GPTService()

async def get_kundali_interpretation(kundali_data: KundaliData) -> str:
    """
    Generate AI interpretation for Kundali data
    """
    prompt = f"""
    You are a renowned Vedic astrologer providing a premium birth chart analysis. Create a comprehensive, professional interpretation that matches the quality of top astrology consultations.

    **Birth Details:**
    • Name: {kundali_data.birth_details.name}
    • Birth: {kundali_data.birth_details.birth_date} at {kundali_data.birth_details.birth_time}
    • Location: {kundali_data.birth_details.birth_location}

    **Core Astrological Signatures:**
    • Ascendant (Lagna): {kundali_data.ascendant}
    • Moon Sign (Rashi): {kundali_data.moon_sign} 
    • Sun Sign: {kundali_data.sun_sign}
    • Birth Star: {kundali_data.birth_nakshatra} - Pada {kundali_data.birth_nakshatra_pada}

    **Planetary Positions:**
    """
    
    for planet in kundali_data.planet_positions:
        prompt += f"• {planet.planet}: {planet.degree:.1f}° {planet.sign} (House {planet.house})"
        if planet.retrograde:
            prompt += " [R]"
        if planet.nakshatra:
            prompt += f" | {planet.nakshatra}"
        prompt += "\n"
    
    prompt += f"""
    **Current Dasha Period:** {kundali_data.dasha_info.get('current_dasha_lord', 'Unknown') if kundali_data.dasha_info else 'Unknown'} ({kundali_data.dasha_info.get('remaining_years', 0) if kundali_data.dasha_info else 0:.1f} years remaining)

    Structure your analysis professionally:

    🌟 **PERSONALITY & NATURE**
    [Detailed character analysis based on Ascendant, Moon, and key planetary positions - 3-4 sentences]

    💼 **CAREER & PROFESSION**
    [Specific career guidance, suitable professions, and professional growth patterns - 3-4 sentences]

    💝 **RELATIONSHIPS & MARRIAGE**
    [Marriage timing, partner characteristics, and relationship patterns - 3-4 sentences]

    💰 **WEALTH & FINANCES** 
    [Financial prospects, earning potential, and money management advice - 3-4 sentences]

    🏥 **HEALTH & VITALITY**
    [Health considerations, vulnerable areas, and wellness recommendations - 3-4 sentences]

    🎯 **LIFE PURPOSE & SPIRITUALITY**
    [Spiritual path, dharma, and higher purpose based on chart - 3-4 sentences]

    ⏰ **CURRENT PLANETARY PERIOD**
    [Effects of current Dasha and immediate planetary influences - 3-4 sentences]

    🔮 **KEY PREDICTIONS**
    [3-4 specific predictions for the next 1-2 years with approximate timing]

    Requirements:
    - Use authentic Vedic astrological terminology
    - Be specific and detailed, not generic
    - Include both opportunities and challenges
    - Provide practical, actionable guidance
    - Maintain a professional, insightful tone
    - Total length: 400-500 words
    - Use exact format with emojis and bold headings
    """
    
    return await gpt_service.get_completion(prompt, 1200)

async def get_horoscope_interpretation(horoscope_request: HoroscopeRequest) -> str:
    """
    Generate AI interpretation for daily/weekly/monthly horoscope
    """
    sign = horoscope_request.zodiac_sign
    horoscope_type = horoscope_request.horoscope_type
    
    prompt = f"""
    You are a renowned Vedic astrologer writing for a professional astrology platform. Create a detailed {horoscope_type} horoscope for {sign} that matches the quality and style of premium astrology websites.

    Structure your response exactly as follows with clear sections and emojis:

    🌟 **OVERALL PREDICTION**
    [Write 2-3 sentences about the general cosmic energy and mood for {sign} today. Be specific about planetary influences.]

    💼 **CAREER & WORK**
    [Provide specific guidance about professional matters, meetings, projects, and workplace dynamics. Mention timing if relevant.]

    💝 **LOVE & RELATIONSHIPS** 
    [Give detailed advice for singles and couples separately. Include communication tips and romantic opportunities.]

    💰 **MONEY & FINANCE**
    [Specific guidance about spending, investments, and financial decisions. Include cautions if needed.]

    🏥 **HEALTH & WELLNESS**
    [Address physical health, energy levels, and wellness practices. Be practical and specific.]

    🔮 **SPIRITUAL INSIGHTS**
    [Brief spiritual guidance and meditation/prayer recommendations for the day.]

    ⭐ **LUCKY FACTORS**
    - Lucky Color: [Choose one specific color]
    - Lucky Number: [Choose 1-2 numbers]
    - Lucky Time: [Specific time range like "2:00 PM - 4:00 PM"]
    - Lucky Direction: [Cardinal direction]

    📝 **KEY ADVICE**
    [One powerful, actionable piece of advice for the day in 1-2 sentences.]

    Requirements:
    - Use professional astrological language but keep it accessible
    - Be specific rather than vague
    - Include practical, actionable advice
    - Maintain an encouraging yet realistic tone
    - Each section should be 2-3 sentences maximum
    - Total length: approximately 200-250 words
    - Use the exact format with emojis and bold headings
    """
    
    return await gpt_service.get_completion(prompt, 600)

async def get_tarot_interpretation(cards: List[Dict], spread_type: str, question: Optional[str] = None) -> str:
    """
    Generate AI interpretation for tarot reading
    """
    prompt = f"""
    You are a master tarot reader providing a professional reading for a premium spiritual guidance platform. Create a sophisticated interpretation for this {spread_type} spread.

    Cards drawn:
    """
    
    for i, card in enumerate(cards):
        position = get_spread_position_meaning(spread_type, i)
        prompt += f"• **{card['name']}** ({'Reversed' if card.get('reversed') else 'Upright'}) - *{position}*\n"
    
    if question:
        prompt += f"\n**Your Question:** {question}\n"
    
    prompt += f"""
    Structure your response professionally:

    🔮 **CENTRAL MESSAGE**
    [Provide the core insight from this reading in 2-3 powerful sentences]

    📚 **CARD INSIGHTS**
    [For each card, explain its meaning in context - be specific and insightful]

    ⚡ **SPIRITUAL GUIDANCE**
    [Deeper spiritual wisdom and life lessons from this reading]

    🎯 **PRACTICAL ADVICE**
    [Concrete actions and decisions to make based on this guidance]

    ⏰ **TIMING & ENERGY**
    [When to act, what energy patterns to expect]

    Requirements:
    - Use elegant, mystical yet professional language
    - Be specific and insightful, not generic
    - Connect the cards to create a cohesive narrative
    - Provide actionable guidance
    - Maintain an empowering, wise tone
    - Total length: 250-300 words
    - Use the exact format with emojis and bold sections
    """
    
    return await gpt_service.get_completion(prompt, 700)

async def get_compatibility_interpretation(person1_data: Dict, person2_data: Dict, compatibility_scores: List[Dict]) -> str:
    """
    Generate AI interpretation for compatibility analysis
    """
    prompt = f"""
    You are a master relationship astrologer providing a premium compatibility analysis. Create a sophisticated, professional assessment that matches the quality of elite astrology consultations.

    **Cosmic Partnership Analysis**
    • Partner 1: {person1_data['sign']} 
    • Partner 2: {person2_data['sign']}

    **Compatibility Metrics:**
    """
    
    for score in compatibility_scores:
        prompt += f"• {score['category']}: {score['score']:.0f}% - {score['description']}\n"
    
    prompt += """
    Structure your analysis professionally:

    💫 **RELATIONSHIP ESSENCE**
    [Describe the core dynamic and soul connection between these signs - 3-4 sentences]

    💪 **NATURAL STRENGTHS**
    [Highlight the inherent positive aspects and gifts of this pairing - 3-4 sentences]

    ⚡ **GROWTH OPPORTUNITIES**
    [Address challenges as opportunities for growth, not obstacles - 3-4 sentences]

    💬 **COMMUNICATION DYNAMICS**
    [How these signs naturally communicate and connect - 3-4 sentences]

    ❤️ **EMOTIONAL HARMONY**
    [Emotional compatibility and how to nurture deeper intimacy - 3-4 sentences]

    🔮 **LONG-TERM POTENTIAL**
    [Future prospects and how this relationship can evolve - 3-4 sentences]

    🎯 **RELATIONSHIP GUIDANCE**
    [Specific, actionable advice for strengthening the bond - 3-4 sentences]

    Requirements:
    - Use sophisticated astrological language
    - Be encouraging yet realistic
    - Focus on growth and understanding
    - Provide specific, actionable insights
    - Maintain a wise, supportive tone
    - Total length: 350-400 words
    - Use exact format with emojis and bold headings
    """
    
    return await gpt_service.get_completion(prompt, 1000)

def get_spread_position_meaning(spread_type: str, position: int) -> str:
    """
    Get the meaning of each position in different tarot spreads
    """
    spreads = {
        "single": ["Your guidance"],
        "three_card": ["Past/Situation", "Present/Challenge", "Future/Outcome"],
        "celtic_cross": [
            "Present situation", "Challenge/Cross", "Distant past/Foundation", 
            "Recent past", "Possible outcome", "Immediate future",
            "Your approach", "External influences", "Hopes and fears", "Final outcome"
        ],
        "five_card": [
            "Present situation", "Past influences", "Future possibility",
            "What you can control", "Final outcome"
        ]
    }
    
    positions = spreads.get(spread_type, ["Card position"])
    return positions[position] if position < len(positions) else f"Position {position + 1}"

async def generate_remedial_suggestions(planetary_issues: List[str]) -> List[str]:
    """
    Generate AI-powered remedial suggestions for planetary afflictions
    """
    prompt = f"""
    As a Vedic astrology expert, suggest practical remedies for the following planetary challenges:
    
    Issues identified:
    {chr(10).join(f"- {issue}" for issue in planetary_issues)}
    
    Please provide:
    1. Traditional Vedic remedies (mantras, gemstones, donations)
    2. Modern lifestyle adjustments
    3. Meditation and spiritual practices
    4. Dietary recommendations
    5. Color therapy suggestions
    
    Keep remedies practical, affordable, and suitable for modern life.
    """
    
    response = await gpt_service.get_completion(prompt, 600)
    
    # Parse response into list format
    remedies = []
    for line in response.split('\n'):
        line = line.strip()
        if line and (line.startswith('-') or line.startswith('•') or line[0].isdigit()):
            remedies.append(line.lstrip('-•0123456789. '))
    
    return remedies[:10]  # Return top 10 remedies
