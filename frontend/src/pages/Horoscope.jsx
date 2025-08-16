import React, { useState } from 'react'
import { ArrowLeft, Star, Calendar, Users, Sparkles } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

const Horoscope = () => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  
  const periods = [
    { id: 'today', label: "Today's Horoscope", icon: Star },
    { id: 'yesterday', label: "Yesterday's Horoscope", icon: Calendar },
    { id: 'tomorrow', label: "Tomorrow's Horoscope", icon: Calendar },
    { id: 'weekly', label: 'Weekly Horoscope', icon: Users },
    { id: 'monthly', label: 'Monthly Horoscope', icon: Sparkles },
    { id: 'yearly', label: 'Annual Horoscope', icon: Calendar }
  ]

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  const getCurrentDate = (period) => {
    const today = new Date()
    
    switch(period) {
      case 'yesterday':
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        return {
          display: yesterday.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          short: `${yesterday.getDate()}${getOrdinalSuffix(yesterday.getDate())} ${yesterday.toLocaleDateString('en-US', { month: 'short' })}`
        }
      case 'tomorrow':
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return {
          display: tomorrow.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          short: `${tomorrow.getDate()}${getOrdinalSuffix(tomorrow.getDate())} ${tomorrow.toLocaleDateString('en-US', { month: 'short' })}`
        }
      case 'weekly':
        // Get current week range (Sunday to Saturday)
        const startOfWeek = new Date(today)
        const day = today.getDay()
        // Calculate days since Sunday (0 = Sunday, 1 = Monday, etc.)
        startOfWeek.setDate(today.getDate() - day)
        
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        
        return {
          display: `${startOfWeek.toLocaleDateString('en-GB', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })} – ${endOfWeek.toLocaleDateString('en-GB', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}`,
          short: `Week of ${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        }
      case 'monthly':
        return {
          display: today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }),
          short: today.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          })
        }
      case 'yearly':
        return {
          display: today.toLocaleDateString('en-US', { 
            year: 'numeric' 
          }),
          short: today.toLocaleDateString('en-US', { 
            year: 'numeric' 
          })
        }
      default: // today
        return {
          display: today.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          short: `${today.getDate()}${getOrdinalSuffix(today.getDate())} ${today.toLocaleDateString('en-US', { month: 'short' })}`
        }
    }
  }

  const zodiacSigns = [
    {
      id: 'aries',
      name: 'Aries',
      dateRange: 'Mar 21 - Apr 19',
      element: 'Fire',
      rulingPlanet: 'Mars',
      color: 'from-red-500 to-orange-500',
      emoji: '♈',
      description: {
        today: {
          personal: "Your fiery energy ignites new possibilities today. Single Aries may feel confident about new romantic ventures, while coupled Aries should channel passion constructively.",
          career: "Leadership opportunities beckon. Your initiative and bold decision-making will be recognized by superiors. Perfect day for presenting new ideas.",
          health: "High energy levels make this ideal for physical activities. Focus on cardiovascular exercises but avoid overexertion.",
          luck: "Lucky numbers: 7, 14, 21. Red and orange colors enhance your natural magnetism today."
        },
        yesterday: {
          personal: "Yesterday's bold moves in relationships set the stage for today's developments. Reflect on lessons learned from recent romantic decisions.",
          career: "Previous work efforts begin showing results. Use yesterday's momentum to build upon professional achievements.",
          health: "Recovery from yesterday's high-energy activities. Focus on rest and gentle movement to maintain balance.",
          luck: "Numbers 5, 12, 28 carried significance. Review recent decisions for insights into current opportunities."
        },
        tomorrow: {
          personal: "Prepare for exciting romantic developments ahead. Single Aries should be open to unexpected encounters tomorrow.",
          career: "Tomorrow brings chances to showcase leadership skills. Prepare presentations and bold proposals tonight.",
          health: "Plan energizing activities for tomorrow. Your vitality will be at its peak for physical challenges.",
          luck: "Numbers 9, 16, 23 will be favorable tomorrow. Wear red for enhanced confidence and attraction."
        },
        weekly: {
          personal: "This week stirs your inner fire. Venus and Mars energize your love life and ambition, with Mercury retrograde bringing surprises. Bold romantic moves are favored mid-week.",
          career: "Professional breakthrough expected. Your pioneering ideas gain recognition. Thursday through Friday are particularly favorable for negotiations and leadership opportunities.",
          health: "Energy levels fluctuate throughout the week. Monday and Tuesday require rest, while Wednesday onwards brings vitality and strength for ambitious goals.",
          luck: "Week's lucky numbers: 7, 14, 21, 28. Wearing red and orange enhances natural magnetism and leadership presence."
        },
        monthly: {
          personal: "July marks a significant period of romantic growth. Single Aries may meet someone special around mid-month, while couples experience deeper commitment and passion.",
          career: "Career advancement reaches new heights with potential promotion or leadership role. Your innovative approach impresses influential industry figures throughout the month.",
          health: "Overall vitality increases significantly. Focus on building muscle strength and cardiovascular health while managing stress through physical activities.",
          luck: "Month's power numbers: 1, 8, 15, 22. Mars energy peaks around the 20th, bringing exceptional opportunities for success."
        },
        yearly: {
          personal: "2025 brings transformational relationships and deep personal growth. Marriage, family expansion, or life-changing romantic connections feature prominently throughout the year.",
          career: "Professional recognition reaches new heights with leadership roles, industry awards, and international opportunities. Income increases 25-40% through advancement.",
          health: "Year of physical transformation and vitality. Athletic achievements, fitness milestones, and holistic wellness integration create lasting health improvements.",
          luck: "Annual power numbers: 1, 9, 17, 25. April, July, October, and December bring life-changing opportunities and breakthrough moments."
        }
      }
    },
    {
      id: 'taurus',
      name: 'Taurus',
      dateRange: 'Apr 20 - May 20',
      element: 'Earth',
      rulingPlanet: 'Venus',
      color: 'from-green-500 to-emerald-500',
      emoji: '♉',
      description: {
        today: {
          personal: "Venus bestows harmony in relationships. Practical gestures of love resonate more than grand romantic gestures today.",
          career: "Steady progress in ongoing projects. Your reliability and attention to detail will be appreciated. Avoid rushing important decisions.",
          health: "Focus on nutrition and comfort. Your body craves wholesome foods. Take time for relaxation and self-care rituals.",
          luck: "Lucky numbers: 6, 15, 24. Green and pink colors align with your Venus energy."
        },
        yesterday: {
          personal: "Yesterday's steady approach to relationships builds stronger foundations today. Patience in love proves rewarding.",
          career: "Previous methodical work efforts show tangible results. Continue building on established professional relationships.",
          health: "Yesterday's self-care routine sets positive tone. Maintain consistent healthy habits for optimal well-being.",
          luck: "Numbers 4, 11, 20 held significance yesterday. Material gains from patient investments become apparent."
        },
        tomorrow: {
          personal: "Tomorrow favors commitment and stability in relationships. Practical romantic gestures will be deeply appreciated.",
          career: "Prepare for steady professional advancement tomorrow. Your reliability opens doors to new responsibilities.",
          health: "Plan nourishing meals and comfortable activities. Your body will crave consistency and quality nutrition.",
          luck: "Numbers 8, 17, 26 will bring material benefits tomorrow. Green clothing enhances Venus-ruled prosperity."
        },
        weekly: {
          personal: "Relationships stabilize through consistent care and practical support. Mid-week brings romantic opportunities through work or shared interests.",
          career: "Methodical approach yields excellent results. Your reputation for reliability makes you indispensable. Friday brings recognition for past efforts.",
          health: "Consistent health routines show positive results. Focus on building sustainable habits rather than dramatic lifestyle changes.",
          luck: "Week's fortunate numbers: 6, 13, 20, 27. Thursday onwards particularly favors financial and romantic decisions."
        },
        monthly: {
          personal: "July brings material prosperity and relationship stability. Love life stabilizes with potential for engagement or long-term commitment decisions.",
          career: "Professional security increases through hard work and dedication. Long-term projects reach successful completion with recognition.",
          health: "Physical strength and endurance improve steadily. Focus on building muscle tone and flexibility through consistent exercise routines.",
          luck: "Month's prosperity numbers: 2, 9, 16, 23. Venus blesses financial growth and luxury purchases without compromising security."
        },
        yearly: {
          personal: "2025 emphasizes building lasting relationships and material security. Marriage, property acquisition, and family stability feature prominently.",
          career: "Steady professional advancement through expertise and reliability. Industry recognition and salary increases reward consistent performance.",
          health: "Year-long focus on sustainable wellness practices. Beauty, nutrition, and physical strength reach new levels through patient effort.",
          luck: "Annual stability numbers: 6, 14, 22, 30. May, August, November bring significant material and romantic opportunities."
        }
      }
    },
    {
      id: 'gemini',
      name: 'Gemini',
      dateRange: 'May 21 - Jun 20',
      element: 'Air',
      rulingPlanet: 'Mercury',
      color: 'from-yellow-500 to-amber-500',
      emoji: '♊',
      description: {
        today: {
          personal: "Communication flows beautifully. Express your thoughts clearly in relationships. Intellectual connections deepen bonds.",
          career: "Multiple opportunities may present themselves. Your adaptability and quick thinking will help you navigate complex situations.",
          health: "Mental stimulation is crucial. Engage in puzzles, reading, or learning something new. Avoid information overload.",
          luck: "Lucky numbers: 3, 12, 18. Yellow and silver enhance your Mercury-ruled nature."
        },
        yesterday: {
          personal: "Yesterday's conversations laid groundwork for deeper understanding. Review communication patterns for relationship insights.",
          career: "Multiple small tasks from yesterday combine into significant progress. Your versatility proves professionally valuable.",
          health: "Mental activity from yesterday requires balance today. Alternate intellectual pursuits with physical movement.",
          luck: "Numbers 5, 14, 21 brought communication opportunities. Quick decisions from yesterday now show positive results."
        },
        tomorrow: {
          personal: "Prepare for important conversations tomorrow. Your wit and charm will open doors to new romantic connections.",
          career: "Tomorrow brings diverse opportunities requiring mental agility. Prepare to showcase your communication skills.",
          health: "Plan varied activities to keep your restless mind engaged. Mental stimulation will boost overall energy levels.",
          luck: "Numbers 7, 16, 25 will facilitate communication tomorrow. Wear yellow or silver for enhanced mental clarity."
        },
        weekly: {
          personal: "Varied social interactions bring new romantic possibilities. Communication skills strengthen existing relationships significantly throughout the week.",
          career: "Multiple projects and diverse responsibilities keep you engaged. Your versatility becomes valuable asset. Wednesday through Friday favor important communications.",
          health: "Mental energy high but physical energy fluctuates. Balance intellectual activities with movement. Breathing exercises and fresh air boost vitality.",
          luck: "Week's dynamic numbers: 3, 10, 17, 24. Mercury enhances communication and learning opportunities throughout the period."
        },
        monthly: {
          personal: "Social circle expands significantly with potential romantic connections through friends or online platforms. Your wit and charm attract diverse partners.",
          career: "Multiple career opportunities requiring diverse skills emerge. Your multitasking ability becomes highly valued. Teaching, writing, or media work features prominently.",
          health: "Nervous system requires attention due to high mental activity. Regular breaks and varied physical activities maintain optimal balance.",
          luck: "Month's versatility numbers: 5, 12, 19, 26. Technology and communication investments prove profitable throughout July."
        },
        yearly: {
          personal: "2025 brings intellectual growth and diverse romantic connections. Communication mastery enhances all relationships. Travel romance and online connections flourish.",
          career: "Year of professional diversification and skill expansion. Multiple income streams through writing, teaching, or digital platforms. Network grows internationally.",
          health: "Mental agility peaks while physical coordination improves. Hand-eye coordination activities like tennis or music benefit overall wellness.",
          luck: "Annual communication numbers: 3, 11, 19, 27. June, September, December bring breakthrough communication and learning opportunities."
        }
      }
    },
    {
      id: 'cancer',
      name: 'Cancer',
      dateRange: 'Jun 21 - Jul 22',
      element: 'Water',
      rulingPlanet: 'Moon',
      color: 'from-blue-500 to-cyan-500',
      emoji: '♋',
      description: {
        today: {
          personal: "Emotional intuition guides you to deeper connections. Family relationships bring comfort and support.",
          career: "Trust your instincts in professional matters. Your nurturing leadership style creates positive team dynamics.",
          health: "Pay attention to digestive health. Comfort foods in moderation. Emotional well-being affects physical health.",
          luck: "Lucky numbers: 2, 11, 29. Silver and white colors harmonize with lunar energy."
        },
        yesterday: {
          personal: "Yesterday's family interactions provided emotional insight and strengthened bonds with loved ones.",
          career: "Previous intuitive decisions in work matters prove to be correct. Your empathetic approach builds trust.",
          health: "Yesterday's attention to emotional needs positively impacts your physical well-being today.",
          luck: "Numbers 4, 13, 22 carried emotional significance. Moon-influenced choices bring lasting comfort."
        },
        tomorrow: {
          personal: "Tomorrow emphasizes nurturing relationships and creating emotional security for those you love.",
          career: "Your protective instincts and team-building skills will be especially valuable in tomorrow's projects.",
          health: "Focus on hydration and foods that nourish both body and soul. Listen to your body's needs.",
          luck: "Numbers 7, 16, 25 bring emotional fulfillment tomorrow. Silver jewelry enhances lunar connections."
        },
        weekly: {
          personal: "This week deepens family bonds and emotional connections. Mid-week brings opportunities for meaningful conversations and shared experiences.",
          career: "Your intuitive leadership and caring approach create positive work environments. Team projects flourish under your guidance.",
          health: "Emotional balance directly impacts physical health. Focus on stress management and nurturing activities that restore your energy.",
          luck: "Week's protective numbers: 2, 9, 16, 23. Thursday and Friday particularly favor family and career harmony."
        },
        monthly: {
          personal: "July brings deep emotional satisfaction through family achievements and relationship milestones. Home life becomes source of strength.",
          career: "Professional growth through your natural ability to create supportive team environments. Leadership roles may be offered.",
          health: "Digestive health improves through mindful eating and stress reduction. Water-based activities enhance overall well-being.",
          luck: "Month's nurturing numbers: 6, 13, 20, 27. Full moon periods bring heightened intuition and emotional clarity."
        },
        yearly: {
          personal: "2025 emphasizes family growth, emotional maturity, and creating lasting security for loved ones. Home-based achievements feature prominently.",
          career: "Career advancement through emotional intelligence and team-building skills. Management positions and mentoring opportunities increase income significantly.",
          health: "Year of emotional healing and digestive health improvement. Water-based exercise and mindful nutrition create lasting wellness habits.",
          luck: "Annual family numbers: 2, 11, 20, 29. Summer months bring exceptional opportunities for home and family security."
        }
      }
    },
    {
      id: 'leo',
      name: 'Leo',
      dateRange: 'Jul 23 - Aug 22',
      element: 'Fire',
      rulingPlanet: 'Sun',
      color: 'from-orange-500 to-yellow-500',
      emoji: '♌',
      description: {
        today: {
          personal: "Your natural charisma attracts positive attention. Confidence in relationships leads to deeper intimacy and understanding.",
          career: "Creative projects flourish under your leadership. Your enthusiasm inspires others and opens doors to new collaborations.",
          health: "Heart health is paramount. Engage in activities that bring joy. Your positive attitude boosts overall vitality.",
          luck: "Lucky numbers: 1, 8, 19. Gold and orange amplify your solar radiance."
        },
        yesterday: {
          personal: "Yesterday's confident approach to relationships created positive momentum. Your warmth drew others closer.",
          career: "Previous creative efforts begin gaining recognition. Your leadership style inspires team loyalty and productivity.",
          health: "Yesterday's joyful activities recharged your energy. Continue engaging in heart-opening experiences.",
          luck: "Numbers 3, 12, 21 brought creative inspiration. Golden opportunities from recent bold decisions unfold."
        },
        tomorrow: {
          personal: "Tomorrow brings spotlight moments in love. Your magnetic personality attracts exciting romantic opportunities.",
          career: "Prepare for leadership opportunities tomorrow. Your creative vision will be highly valued and supported.",
          health: "Plan heart-healthy activities that bring joy. Your enthusiasm tomorrow will be contagious and energizing.",
          luck: "Numbers 5, 14, 23 shine favorably tomorrow. Wear gold or orange to amplify your natural radiance."
        },
        weekly: {
          personal: "This week places you at center stage in love and creativity. Mid-week brings passionate encounters and artistic inspiration.",
          career: "Professional recognition peaks with potential for promotion or creative leadership roles. Your vision guides important projects.",
          health: "High energy week requiring balance between activity and rest. Heart-opening exercises enhance both health and happiness.",
          luck: "Week's power numbers: 1, 8, 15, 22. Sunday through Tuesday particularly favor creative and romantic ventures."
        },
        monthly: {
          personal: "July illuminates your love life with potential for engagement, marriage, or passionate new romance. Creative expression deepens connections.",
          career: "Professional peak with major recognition, leadership appointments, or creative breakthroughs. Income increases through innovative projects.",
          health: "Vitality reaches new heights through joyful activities and heart-centered wellness practices. Energy levels remain consistently high.",
          luck: "Month's radiant numbers: 1, 10, 19, 28. Leo season brings exceptional opportunities for personal and professional glory."
        },
        yearly: {
          personal: "2025 brings creative fulfillment and recognition in love. Marriage, artistic achievement, and personal magnetism reach new peaks.",
          career: "Year of professional stardom with awards, leadership roles, and creative breakthroughs. Income doubles through innovative ventures.",
          health: "Heart-centered wellness creates lasting vitality. Creative hobbies and joyful activities become foundation of excellent health.",
          luck: "Annual glory numbers: 1, 9, 18, 27. Summer and early fall bring life-changing opportunities for recognition and success."
        }
      }
    },
    {
      id: 'virgo',
      name: 'Virgo',
      dateRange: 'Aug 23 - Sep 22',
      element: 'Earth',
      rulingPlanet: 'Mercury',
      color: 'from-green-600 to-blue-600',
      emoji: '♍',
      description: {
        today: {
          personal: "Practical expressions of care strengthen relationships. Your attention to detail shows loved ones how much you care.",
          career: "Organization and efficiency lead to breakthrough moments. Your methodical approach solves complex problems.",
          health: "Focus on routine and systematic self-care. Small, consistent healthy habits yield significant results.",
          luck: "Lucky numbers: 6, 13, 27. Navy blue and earth tones support your grounded energy."
        },
        yesterday: {
          personal: "Yesterday's careful attention to relationship details created deeper understanding and appreciation.",
          career: "Previous methodical work efforts show excellent results. Your systematic approach gains management recognition.",
          health: "Yesterday's healthy routines set positive foundation. Continue building on established wellness practices.",
          luck: "Numbers 4, 15, 26 brought practical benefits. Detailed planning from yesterday opens new opportunities."
        },
        tomorrow: {
          personal: "Tomorrow favors practical relationship improvements. Small, thoughtful gestures will be deeply appreciated.",
          career: "Prepare detailed plans for tomorrow's projects. Your analytical skills will solve important professional challenges.",
          health: "Plan systematic wellness activities. Your body responds well to consistent, methodical self-care approaches.",
          luck: "Numbers 8, 17, 28 support practical success tomorrow. Earth tones enhance your natural efficiency."
        },
        weekly: {
          personal: "This week emphasizes perfecting relationship dynamics through careful attention and practical support for loved ones.",
          career: "Professional excellence through detailed work and systematic problem-solving. Recognition comes for your reliability and precision.",
          health: "Consistent health routines show measurable improvement. Focus on digestive health and stress management through organization.",
          luck: "Week's precision numbers: 6, 13, 20, 27. Wednesday through Friday particularly favor detailed work and practical decisions."
        },
        monthly: {
          personal: "July brings relationship harmony through your natural ability to improve and perfect connections with practical care.",
          career: "Professional advancement through expertise and attention to detail. Analytical skills lead to significant workplace improvements.",
          health: "Health optimization through systematic approach to nutrition, exercise, and stress management. Measurable wellness improvements.",
          luck: "Month's improvement numbers: 3, 12, 21, 30. Late July brings recognition for your meticulous work and practical solutions."
        },
        yearly: {
          personal: "2025 emphasizes perfecting relationships through service, practical care, and attention to partners' real needs.",
          career: "Career excellence through expertise, efficiency, and problem-solving skills. Potential for specialization and expert recognition.",
          health: "Year of health mastery through systematic wellness approach. Diet, exercise, and stress management create optimal well-being.",
          luck: "Annual efficiency numbers: 6, 15, 24, 33. September and December bring major recognition for your practical expertise."
        }
      }
    },
    {
      id: 'libra',
      name: 'Libra',
      dateRange: 'Sep 23 - Oct 22',
      element: 'Air',
      rulingPlanet: 'Venus',
      color: 'from-pink-500 to-purple-500',
      emoji: '♎',
      description: {
        today: {
          personal: "Balance and harmony characterize your relationships. Diplomatic communication resolves any lingering conflicts.",
          career: "Collaboration and partnership opportunities arise. Your ability to see all sides makes you an invaluable mediator.",
          health: "Kidney and skin health deserve attention. Beauty treatments and aesthetic pleasures enhance well-being.",
          luck: "Lucky numbers: 7, 16, 25. Pink and light blue create harmonious vibrations."
        },
        yesterday: {
          personal: "Yesterday's diplomatic approach created better understanding between conflicting parties. Harmony restored through fairness.",
          career: "Previous collaborative efforts show positive results. Your balanced perspective solved important workplace tensions.",
          health: "Yesterday's attention to beauty and aesthetics improved your sense of well-being and confidence.",
          luck: "Numbers 5, 14, 23 brought aesthetic pleasure. Harmonious choices from yesterday continue benefiting relationships."
        },
        tomorrow: {
          personal: "Tomorrow emphasizes partnership and cooperation. Your natural diplomacy will be especially valuable in negotiations.",
          career: "Prepare for collaborative projects tomorrow. Your ability to balance different viewpoints will be highly appreciated.",
          health: "Focus on activities that promote inner and outer beauty. Your aesthetic sense guides healthy lifestyle choices.",
          luck: "Numbers 9, 18, 27 bring partnership success tomorrow. Pink or pastel colors enhance your natural diplomatic charm."
        },
        weekly: {
          personal: "This week highlights relationship balance and partnership opportunities. Mid-week brings harmony through compromise and understanding.",
          career: "Professional partnerships flourish through your diplomatic skills. Collaborative projects lead to mutual success and recognition.",
          health: "Balance in all areas creates optimal health. Focus on kidney health, skin care, and activities that promote inner peace.",
          luck: "Week's harmony numbers: 7, 14, 21, 28. Tuesday and Friday particularly favor partnerships and aesthetic endeavors."
        },
        monthly: {
          personal: "July brings partnership opportunities and relationship balance. Potential for engagement, business partnerships, or diplomatic success.",
          career: "Professional harmony through collaborative leadership. Your mediation skills resolve conflicts and create team unity.",
          health: "Aesthetic wellness approach balances inner health with outer beauty. Spa treatments and artistic activities enhance well-being.",
          luck: "Month's partnership numbers: 2, 11, 20, 29. Mid-July particularly favors love, beauty, and collaborative ventures."
        },
        yearly: {
          personal: "2025 emphasizes partnerships, marriage, and diplomatic achievements. Relationship balance creates lasting happiness and mutual success.",
          career: "Career advancement through partnerships, legal success, and mediation skills. Collaborative leadership brings recognition and prosperity.",
          health: "Year of aesthetic health focusing on beauty, balance, and harmony. Kidney health and skin radiance improve significantly.",
          luck: "Annual partnership numbers: 7, 16, 25, 34. October and December bring exceptional opportunities for love and collaboration."
        }
      }
    },
    {
      id: 'scorpio',
      name: 'Scorpio',
      dateRange: 'Oct 23 - Nov 21',
      element: 'Water',
      rulingPlanet: 'Mars/Pluto',
      color: 'from-red-800 to-purple-800',
      emoji: '♏',
      description: {
        today: {
          personal: "Intense emotional connections deepen. Your psychological insight helps heal relationships and build trust.",
          career: "Research and investigation lead to valuable discoveries. Your determination overcomes seemingly impossible obstacles.",
          health: "Regenerative practices benefit you most. Focus on detoxification and renewal of body systems.",
          luck: "Lucky numbers: 4, 13, 22. Deep red and black enhance your transformative power."
        },
        yesterday: {
          personal: "Yesterday's emotional intensity created deeper understanding and stronger bonds with those who matter most.",
          career: "Previous investigative work reveals important insights. Your persistence in difficult projects starts paying off.",
          health: "Yesterday's focus on regeneration and detox shows positive results. Continue supporting your body's renewal processes.",
          luck: "Numbers 8, 17, 26 brought transformative experiences. Hidden opportunities from yesterday begin emerging."
        },
        tomorrow: {
          personal: "Tomorrow brings opportunities for emotional transformation and deeper intimacy. Trust your psychological insights.",
          career: "Prepare for breakthrough discoveries tomorrow. Your research and analytical skills will uncover valuable information.",
          health: "Focus on regenerative activities tomorrow. Your body's natural healing abilities will be particularly strong.",
          luck: "Numbers 11, 20, 29 support transformation tomorrow. Dark colors enhance your natural magnetic power."
        },
        weekly: {
          personal: "This week emphasizes emotional depth and psychological transformation. Intense connections lead to personal growth and healing.",
          career: "Professional breakthroughs through research, investigation, and determination. Hidden opportunities surface through persistent effort.",
          health: "Regenerative health practices show powerful results. Focus on detoxification, renewal, and strengthening your immune system.",
          luck: "Week's power numbers: 4, 13, 22, 31. Thursday and Saturday particularly favor transformation and discovery."
        },
        monthly: {
          personal: "July brings profound emotional transformation and deeper intimate connections. Healing past wounds creates stronger relationships.",
          career: "Professional metamorphosis through research excellence and investigative breakthroughs. Hidden talents emerge with recognition.",
          health: "Regenerative health reaches new levels through detox, renewal practices, and systematic body strengthening.",
          luck: "Month's transformation numbers: 1, 10, 19, 28. Late July brings powerful opportunities for personal and professional rebirth."
        },
        yearly: {
          personal: "2025 emphasizes profound transformation, psychological growth, and intensely meaningful relationships. Healing becomes a source of power.",
          career: "Career transformation through research excellence, investigative skills, and ability to uncover hidden opportunities.",
          health: "Year of regenerative health mastery. Detoxification, renewal, and immune system strengthening create extraordinary vitality.",
          luck: "Annual transformation numbers: 4, 13, 22, 31. November and February bring life-changing opportunities for rebirth and power."
        }
      }
    },
    {
      id: 'sagittarius',
      name: 'Sagittarius',
      dateRange: 'Nov 22 - Dec 21',
      element: 'Fire',
      rulingPlanet: 'Jupiter',
      color: 'from-purple-600 to-indigo-600',
      emoji: '♐',
      description: {
        today: {
          personal: "Adventure and exploration bring excitement to relationships. International or cultural connections prove beneficial.",
          career: "Higher learning and expansion opportunities present themselves. Your philosophical approach inspires innovative solutions.",
          health: "Hip and thigh areas need attention. Outdoor activities and exploration feed your adventurous spirit.",
          luck: "Lucky numbers: 9, 18, 26. Purple and turquoise align with Jupiter's expansive energy."
        },
        yesterday: {
          personal: "Yesterday's adventurous spirit opened new relationship possibilities. International or cultural connections proved meaningful.",
          career: "Previous expansion efforts begin showing positive results. Your philosophical approach gained recognition and support.",
          health: "Yesterday's outdoor activities and adventures boosted your energy and optimism significantly.",
          luck: "Numbers 6, 15, 24 brought educational or travel opportunities. Expansive decisions from yesterday create future benefits."
        },
        tomorrow: {
          personal: "Tomorrow brings opportunities for adventure and cultural exploration. International relationships may develop significantly.",
          career: "Prepare for expansion opportunities tomorrow. Your vision and philosophical insights will open new professional doors.",
          health: "Plan outdoor adventures that challenge and inspire. Your optimistic energy tomorrow will be particularly infectious.",
          luck: "Numbers 12, 21, 30 support expansion tomorrow. Purple or royal blue enhances your natural wisdom and luck."
        },
        weekly: {
          personal: "This week emphasizes adventure, learning, and international connections. Cultural exchanges deepen relationships and broaden perspectives.",
          career: "Professional expansion through education, publishing, or international business. Your philosophical insights inspire innovative projects.",
          health: "High-energy activities and outdoor adventures optimize health. Focus on hip flexibility and maintaining your adventurous spirit.",
          luck: "Week's expansion numbers: 9, 18, 27, 36. Wednesday and Thursday particularly favor travel, learning, and philosophical pursuits."
        },
        monthly: {
          personal: "July brings international romance and adventurous relationship experiences. Travel or higher education creates meaningful connections.",
          career: "Professional growth through expansion, higher learning, or international opportunities. Teaching or publishing may feature prominently.",
          health: "Adventure-based fitness reaches new heights. Outdoor activities and sports create optimal health and boundless energy.",
          luck: "Month's adventure numbers: 3, 12, 21, 30. Late July brings exceptional opportunities for travel and expansion."
        },
        yearly: {
          personal: "2025 emphasizes international love, adventure, and cultural expansion. Marriage or relationships with foreign connections feature prominently.",
          career: "Career expansion through higher education, international business, or philosophical work. Income increases through wisdom-based endeavors.",
          health: "Year of adventurous health through travel, outdoor activities, and exploration. Hip and leg strength improve significantly.",
          luck: "Annual expansion numbers: 9, 18, 27, 36. December and March bring life-changing opportunities for adventure and growth."
        }
      }
    },
    {
      id: 'capricorn',
      name: 'Capricorn',
      dateRange: 'Dec 22 - Jan 19',
      element: 'Earth',
      rulingPlanet: 'Saturn',
      color: 'from-gray-700 to-blue-800',
      emoji: '♑',
      description: {
        today: {
          personal: "Commitment and stability strengthen bonds. Your responsible nature creates security in relationships.",
          career: "Long-term planning and strategic thinking yield tangible results. Authority figures recognize your dedication.",
          health: "Bone and joint health require attention. Structured exercise routines provide lasting benefits.",
          luck: "Lucky numbers: 10, 17, 28. Dark green and brown support your earthy determination."
        },
        yesterday: {
          personal: "Yesterday's commitment to responsibility strengthened trust and security in important relationships.",
          career: "Previous strategic planning and hard work begin showing concrete results. Your dedication gained authority recognition.",
          health: "Yesterday's structured approach to fitness laid foundation for improved bone and joint health.",
          luck: "Numbers 8, 19, 28 brought achievement recognition. Disciplined efforts from yesterday create lasting benefits."
        },
        tomorrow: {
          personal: "Tomorrow emphasizes building lasting foundations in relationships. Your reliability will be especially valued.",
          career: "Prepare for advancement opportunities tomorrow. Your strategic planning and dedication will be rewarded.",
          health: "Focus on strengthening bone density and joint flexibility. Structured wellness routines show excellent results.",
          luck: "Numbers 12, 21, 30 support achievement tomorrow. Earth tones enhance your natural authority and success."
        },
        weekly: {
          personal: "This week builds long-term relationship security through commitment, reliability, and practical support for loved ones.",
          career: "Professional advancement through strategic planning, hard work, and demonstration of leadership capabilities.",
          health: "Consistent health routines strengthen bones, joints, and overall physical foundation. Discipline creates lasting vitality.",
          luck: "Week's achievement numbers: 10, 19, 28, 37. Monday and Friday particularly favor career advancement and recognition."
        },
        monthly: {
          personal: "July brings relationship milestones through commitment and practical demonstration of love and reliability.",
          career: "Professional peak with promotion, recognition, or achievement of long-term career goals. Authority increases significantly.",
          health: "Structural health reaches new strength through consistent exercise and attention to bone and joint wellness.",
          luck: "Month's success numbers: 1, 10, 19, 28. Late July brings major recognition for past dedication and hard work."
        },
        yearly: {
          personal: "2025 emphasizes lasting relationship commitments, marriage, and building family security through responsible partnership.",
          career: "Career mastery through strategic achievement, leadership recognition, and authority in chosen field. Income doubles through advancement.",
          health: "Year of structural health mastery. Bone density, joint flexibility, and physical endurance reach optimal levels.",
          luck: "Annual achievement numbers: 10, 19, 28, 37. January and October bring life-changing opportunities for lasting success."
        }
      }
    },
    {
      id: 'aquarius',
      name: 'Aquarius',
      dateRange: 'Jan 20 - Feb 18',
      element: 'Air',
      rulingPlanet: 'Uranus/Saturn',
      color: 'from-cyan-500 to-blue-500',
      emoji: '♒',
      description: {
        today: {
          personal: "Unique perspectives bring refreshing energy to relationships. Friendship forms the foundation of lasting love.",
          career: "Innovation and technology open new pathways. Your unconventional approach solves traditional problems.",
          health: "Circulation and nervous system benefit from electrical stimulation. Try new wellness technologies.",
          luck: "Lucky numbers: 11, 20, 31. Electric blue and silver amplify your Uranian frequency."
        },
        yesterday: {
          personal: "Yesterday's innovative approach to relationships created exciting new connections and deeper friendships.",
          career: "Previous technological or unconventional solutions begin showing revolutionary results in your professional life.",
          health: "Yesterday's experimentation with new wellness technologies or approaches proved beneficial for your unique constitution.",
          luck: "Numbers 7, 16, 25 brought unexpected innovations. Progressive choices from yesterday create future breakthroughs."
        },
        tomorrow: {
          personal: "Tomorrow brings opportunities for unique relationship experiences. Your originality attracts like-minded individuals.",
          career: "Prepare for innovative breakthroughs tomorrow. Your unconventional ideas will be recognized and implemented.",
          health: "Experiment with cutting-edge wellness approaches tomorrow. Your body responds well to electrical and technological healing.",
          luck: "Numbers 13, 22, 31 support innovation tomorrow. Electric blue or silver enhances your natural inventive abilities."
        },
        weekly: {
          personal: "This week emphasizes friendship, innovation, and humanitarian connections. Unique relationships form through shared ideals.",
          career: "Professional breakthroughs through technology, innovation, and unconventional problem-solving. Revolutionary ideas gain support.",
          health: "Circulation and nervous system optimization through innovative wellness approaches. Technology enhances your health significantly.",
          luck: "Week's innovation numbers: 11, 22, 33, 44. Saturday and Sunday particularly favor humanitarian and technological endeavors."
        },
        monthly: {
          personal: "July brings revolutionary relationship experiences and connections with humanitarian or technological communities.",
          career: "Professional innovation peaks with technological breakthroughs or unconventional success. Future-oriented projects flourish.",
          health: "Health revolution through innovative technologies and alternative approaches. Circulation and nervous system reach optimal function.",
          luck: "Month's revolution numbers: 4, 13, 22, 31. Mid-July brings exceptional opportunities for innovation and humanitarian work."
        },
        yearly: {
          personal: "2025 emphasizes friendship evolution, humanitarian love, and revolutionary relationship approaches. Technology connects soulmates.",
          career: "Career revolution through innovation, technology, and humanitarian work. Unconventional success brings recognition and prosperity.",
          health: "Year of health innovation through technology, alternative methods, and circulation optimization. Nervous system reaches peak function.",
          luck: "Annual revolution numbers: 11, 22, 33, 44. February and August bring life-changing opportunities for innovation and progress."
        }
      }
    },
    {
      id: 'pisces',
      name: 'Pisces',
      dateRange: 'Feb 19 - Mar 20',
      element: 'Water',
      rulingPlanet: 'Neptune/Jupiter',
      color: 'from-blue-400 to-purple-400',
      emoji: '♓',
      description: {
        today: {
          personal: "Intuitive understanding deepens emotional connections. Your compassionate nature heals and nurtures others.",
          career: "Creative and spiritual pursuits flourish. Your imagination provides innovative solutions to complex challenges.",
          health: "Feet and lymphatic system need attention. Water-based therapies and meditation enhance well-being.",
          luck: "Lucky numbers: 12, 21, 30. Sea green and lavender enhance your psychic sensitivity."
        },
        yesterday: {
          personal: "Yesterday's intuitive insights created deeper emotional bonds and understanding with those you care about most.",
          career: "Previous creative or spiritual work begins manifesting positive results. Your imagination proved professionally valuable.",
          health: "Yesterday's attention to lymphatic health and feet care shows positive results in overall energy and well-being.",
          luck: "Numbers 9, 18, 27 brought spiritual insights. Compassionate choices from yesterday create healing opportunities."
        },
        tomorrow: {
          personal: "Tomorrow brings opportunities for deep spiritual and emotional connections. Trust your psychic insights about relationships.",
          career: "Prepare for creative breakthroughs tomorrow. Your artistic vision and spiritual insights will be especially valuable.",
          health: "Focus on water-based healing and feet care tomorrow. Your body's natural healing abilities will be particularly strong.",
          luck: "Numbers 15, 24, 33 support spiritual growth tomorrow. Water colors enhance your natural psychic abilities."
        },
        weekly: {
          personal: "This week emphasizes spiritual growth, emotional healing, and psychic connection with loved ones. Intuition guides relationships.",
          career: "Creative and spiritual work reaches new heights. Your imagination and compassion create innovative solutions.",
          health: "Water-based healing and lymphatic care optimize health. Meditation and spiritual practices enhance physical well-being.",
          luck: "Week's spiritual numbers: 12, 21, 30, 39. Tuesday and Thursday particularly favor creative and healing activities."
        },
        monthly: {
          personal: "July brings profound spiritual and emotional growth through compassionate relationships and intuitive understanding.",
          career: "Creative peak with artistic recognition or spiritual work success. Your imagination becomes a valuable professional asset.",
          health: "Lymphatic and feet health optimization through water therapy and spiritual healing practices. Energy reaches new heights.",
          luck: "Month's healing numbers: 6, 15, 24, 33. Late July brings exceptional opportunities for creative and spiritual success."
        },
        yearly: {
          personal: "2025 emphasizes spiritual love, psychic connections, and compassionate relationships. Healing becomes a source of deep connection.",
          career: "Career success through creativity, healing arts, and spiritual work. Artistic or therapeutic talents bring recognition and prosperity.",
          health: "Year of lymphatic mastery and spiritual healing. Water-based therapies and meditation create extraordinary well-being.",
          luck: "Annual healing numbers: 12, 21, 30, 39. March and September bring life-changing opportunities for spiritual and creative growth."
        }
      }
    }
  ]

  const handleSignClick = (signId) => {
    navigate(`/horoscope/${signId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Breadcrumb */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span className="mx-2">•</span>
            <span className="text-purple-600 font-medium">Free Horoscope</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors flex items-center text-purple-600 hover:text-purple-700"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </button>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 font-display mb-4">
              ✨ Free Daily Horoscope ✨
            </h1>
            <p className="text-xl text-purple-600 mb-2">Discover what the stars have in store for you</p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              🔮 Simply click on your zodiac sign below to get your personalized horoscope reading instantly
            </p>
          </div>

          {/* Period Selection */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {periods.map((period) => {
                const IconComponent = period.icon
                return (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedPeriod === period.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-purple-50 shadow-md'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {period.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Current Date */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white rounded-lg px-6 py-3 shadow-md">
              <p className="text-lg font-semibold text-gray-800">
                {getCurrentDate(selectedPeriod).display}
              </p>
            </div>
          </div>

          {/* Test Navigation */}
          <div className="mb-8 text-center">
            <p className="text-gray-600 mb-4">If clicking on cards doesn't work, try these direct links:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo'].map(sign => (
                <Link 
                  key={sign}
                  to={`/horoscope/${sign}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  {sign}
                </Link>
              ))}
            </div>
          </div>

          {/* Zodiac Signs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {zodiacSigns.map((sign) => (
              <div key={sign.id} className="relative">
                <Link
                  to={`/horoscope/${sign.id}`}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-purple-200 group"
                >
                {/* Sign Header */}
                <div className={`bg-gradient-to-r ${sign.color} p-6 text-white relative overflow-hidden group-hover:shadow-inner transition-all`}>
                  <div className="absolute top-0 right-0 text-6xl opacity-20 font-bold group-hover:opacity-30 transition-opacity">
                    {sign.emoji}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-1">{sign.name}</h3>
                    <p className="text-sm opacity-90">{sign.dateRange}</p>
                    <div className="flex items-center mt-2 text-sm opacity-80">
                      <span className="mr-3">Element: {sign.element}</span>
                    </div>
                  </div>
                  
                  {/* Click indicator */}
                  <div className="absolute bottom-2 right-2 bg-white/20 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Sign Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Personal
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {sign.description[selectedPeriod]?.personal?.substring(0, 100)}...
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Career</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {sign.description[selectedPeriod]?.career?.substring(0, 80)}...
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Lucky Numbers</h4>
                      <p className="text-gray-600 text-sm">
                        {sign.description[selectedPeriod]?.luck?.split('.')[0]?.replace('Lucky numbers: ', '').replace('Numbers ', '').replace('Week\'s lucky numbers: ', '').replace('Month\'s power numbers: ', '').replace('Week\'s fortunate numbers: ', '').replace('Month\'s prosperity numbers: ', '').replace('Week\'s dynamic numbers: ', '').replace('Month\'s versatility numbers: ', '') || 'View details'}
                      </p>
                    </div>
                  </div>

                  {/* Click to read indicator */}
                  <div className="mt-6 pt-4 border-t border-gray-200 group-hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                      <span className="mr-2">👆 Click to Read Full Horoscope</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Want More Personalized Insights?</h2>
              <p className="text-lg mb-6 opacity-90">
                Connect with our expert astrologers for detailed, personalized readings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/chat')}
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Chat with Astrologer
                </button>
                <button 
                  onClick={() => navigate('/kundali')}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Get Detailed Kundali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Horoscope
