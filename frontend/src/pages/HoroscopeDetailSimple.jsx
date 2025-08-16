import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const HoroscopeDetailSimple = () => {
  const { signId } = useParams();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  
  console.log('HoroscopeDetail rendering with signId:', signId);

  const periods = [
    { id: 'today', label: "Today", icon: '🌟' },
    { id: 'yesterday', label: "Yesterday", icon: '⏮️' },
    { id: 'tomorrow', label: "Tomorrow", icon: '⏭️' },
    { id: 'weekly', label: 'Weekly', icon: '📅' },
    { id: 'monthly', label: 'Monthly', icon: '🗓️' },
    { id: 'yearly', label: 'Yearly', icon: '📆' }
  ];

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
        return `${yesterday.getDate()}${getOrdinalSuffix(yesterday.getDate())} ${yesterday.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
      case 'tomorrow':
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return `${tomorrow.getDate()}${getOrdinalSuffix(tomorrow.getDate())} ${tomorrow.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
      case 'weekly':
        const day = today.getDay()
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - day)
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        return `${startOfWeek.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} – ${endOfWeek.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`
      case 'monthly':
        return today.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
      case 'yearly':
        return today.toLocaleDateString('en-US', { year: 'numeric' })
      default: // today
        return `${today.getDate()}${getOrdinalSuffix(today.getDate())} ${today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    }
  }

  const zodiacData = {
    aries: {
      name: "Aries", dates: "Mar 21 - Apr 19", symbol: "♈", element: "Fire", color: "from-red-500 to-orange-500",
      today: {
        personal: "Your fiery energy ignites new possibilities today. Bold moves in relationships are favored, and your confidence attracts others.",
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
        personal: "This week stirs your inner fire across seven transformative days. Monday brings unexpected romantic messages or encounters that set the tone for passionate developments. Tuesday-Wednesday see your natural charisma attracting multiple admirers, making it crucial to trust your instincts about genuine connections. Thursday marks a turning point in existing relationships, where honest communication deepens bonds significantly. Friday and the weekend bring opportunities for grand romantic gestures and memorable dates. Venus energizes your love life mid-week, encouraging bold moves that typically pay off handsomely. Single Aries should particularly watch for connections through sports, outdoor activities, or leadership roles.",
        career: "Professional breakthrough expected through seven days of dynamic energy. Monday starts with recognition for past initiatives, setting a positive momentum for the week. Tuesday-Wednesday present multiple leadership opportunities requiring quick decision-making and strategic thinking. Thursday brings crucial negotiations or presentations where your pioneering ideas gain significant recognition from influential industry figures. Friday showcases your project management skills as you successfully coordinate team efforts. Weekend networking events or professional socializing opens doors to future collaborations. Your innovative approach and willingness to take calculated risks especially impress superiors around mid-week, potentially leading to promotions or new responsibilities.",
        health: "Energy levels fluctuate dramatically across the week, requiring strategic management. Monday-Tuesday demand rest and recovery from previous week's activities, with gentle stretching and meditation proving beneficial. Wednesday onwards brings surging vitality perfect for ambitious fitness goals and challenging physical activities. Your cardiovascular system responds excellently to interval training and competitive sports. Avoid overexertion on high-energy days while embracing movement when your body craves it. Head and face area may require extra attention - stay hydrated and protect from sun exposure. Weekend activities should balance excitement with adequate recovery time.",
        luck: "Week's lucky numbers: 7, 14, 21, 28. Mars energy peaks around Wednesday-Thursday, bringing exceptional opportunities for leadership and success. Red and orange colors enhance natural magnetism and decision-making abilities throughout the week. Tuesday and Friday are particularly favorable for important decisions and new beginnings. Weekend brings unexpected financial opportunities or gifts from influential connections."
      },
      monthly: {
        personal: "August marks significant romantic growth spanning four transformative weeks. First week (1st-7th) focuses on clearing past relationship patterns and preparing for new love adventures. Second week (8th-15th) brings the most romantic period, with single Aries likely meeting someone special around the full moon. Third week (16th-23rd) deepens existing relationships through shared adventures and honest communication about future plans. Final week (24th-31st) solidifies romantic commitments and may bring engagement or moving-in discussions. Venus aspects throughout the month enhance your natural attractiveness and magnetic personality. Family relationships also strengthen, with increased harmony and understanding among relatives.",
        career: "Career advancement reaches new heights through four weeks of progressive growth. Week one establishes your expertise and reliability in current projects. Week two (your birthday season) brings major recognition and potential promotion discussions with management. Week three focuses on expanding your professional network and exploring new industry connections. Final week consolidates gains and sets foundations for autumn success. Your innovative approach consistently impresses throughout the month, leading to increased responsibilities and leadership roles. International connections or travel opportunities may present themselves around mid-month. Financial rewards and better compensation packages likely emerge from your professional achievements.",
        health: "Overall vitality increases significantly through four weeks of health optimization. Early August requires attention to stress management and establishing sustainable routines. Mid-month brings peak energy levels perfect for starting new fitness programs or athletic challenges. Your body responds excellently to strength training and competitive activities throughout this period. Late August focuses on building endurance and preparing for autumn activities. Digestive system benefits from clean eating and regular meal times. Head, face, and muscular system require attention - consider professional massages or physiotherapy if needed.",
        luck: "Month's power numbers: 1, 8, 15, 22. Mars energy peaks around the 20th, bringing exceptional opportunities for success and recognition. Fire signs particularly benefit from your leadership energy this month. Financial opportunities increase significantly, especially through career advancement or new business ventures. Lucky days: 3rd, 12th, 21st, 30th bring important decisions and beneficial outcomes."
      },
      yearly: {
        personal: "2025 transforms your romantic landscape through twelve months of passionate growth and deep self-discovery. Spring (Mar-May) clears old relationship patterns and attracts soul-level connections. Summer (Jun-Aug) brings your most romantic period with potential marriage or serious commitment decisions. Autumn (Sep-Nov) deepens emotional bonds and may introduce family expansion or home-related romantic developments. Winter (Dec-Feb 2026) solidifies lasting partnerships and creates foundations for future happiness. Jupiter's influence throughout 2025 expands your capacity for love and attracts partners who match your evolving spiritual and personal growth.",
        career: "Professional metamorphosis unfolds across twelve months of unprecedented opportunity and achievement. Q1 establishes expertise and industry recognition. Q2 brings major advancement and leadership roles that utilize your pioneering nature. Q3 focuses on expansion, possibly international opportunities or advanced education that enhances your qualifications. Q4 consolidates achievements and positions you for even greater success in 2026. Your natural leadership abilities and innovative thinking consistently open doors throughout the year. Multiple industries may court your talents, giving you choices about your professional direction.",
        health: "Complete health transformation spans twelve months of vitality building and wellness optimization. First quarter focuses on establishing sustainable fitness routines and nutritional habits. Second quarter brings peak energy levels and athletic achievements that surprise even you. Third quarter emphasizes preventive care and building long-term health foundations. Final quarter prepares your body for winter wellness and sets intentions for continued growth. Your muscular system and cardiovascular health show remarkable improvement throughout the year when you commit to consistent activity.",
        luck: "Annual power numbers: 1, 9, 17, 25. Mars-Jupiter conjunction brings exceptional opportunities for material success and spiritual growth. Lucky months: April, July, October, December. Your natural leadership abilities attract influential mentors and beneficial partnerships throughout 2025. Financial growth accelerates significantly, especially through career advancement and strategic investments made during favorable planetary periods."
      }
    },
    taurus: {
      name: "Taurus", dates: "Apr 20 - May 20", symbol: "♉", element: "Earth", color: "from-green-500 to-emerald-500",
      today: {
        personal: "Stability and comfort guide your relationships today. Your loyal nature strengthens existing bonds and attracts genuine connections.",
        career: "Steady progress in professional matters. Your reliability and attention to detail impress colleagues and superiors.",
        health: "Focus on nutrition and physical comfort. Your body responds well to natural remedies and gentle exercise routines.",
        luck: "Lucky numbers: 6, 15, 24. Green and earth tones bring harmony and financial stability today."
      },
      yesterday: {
        personal: "Yesterday's practical approach to relationships pays off. Building trust and security remains your relationship strength.",
        career: "Consistent efforts from yesterday create solid foundations. Your methodical approach yields reliable results.",
        health: "Maintain the steady health routine you established. Your body appreciates consistency and gradual improvements.",
        luck: "Numbers 4, 13, 22 brought stability. Continue building on yesterday's practical decisions for lasting success."
      },
      tomorrow: {
        personal: "Tomorrow favors deepening commitments and creating security in relationships. Plan romantic activities at home.",
        career: "Solid opportunities for advancement present themselves. Your patience and persistence will be rewarded tomorrow.",
        health: "Focus on building strength and endurance. Tomorrow is perfect for establishing healthy, sustainable routines.",
        luck: "Numbers 8, 17, 26 will bring material benefits tomorrow. Invest in quality over quantity for lasting value."
      },
      weekly: {
        personal: "Week brings relationship stability and growth. Your nurturing nature creates a safe haven for loved ones to flourish.",
        career: "Steady professional advancement through expertise and reliability. Industry recognition and potential salary increases reward consistent performance.",
        health: "Focus on sustainable wellness practices. Beauty treatments, nutrition planning, and physical strength building show excellent results.",
        luck: "Week's fortunate numbers: 6, 14, 22, 30. Venus enhances your natural charm and brings opportunities for material abundance."
      },
      monthly: {
        personal: "August emphasizes long-term relationship security and domestic happiness. Home improvements and family time bring deep satisfaction.",
        career: "Month of solid professional growth and financial stability. Your expertise becomes highly valued, leading to better opportunities.",
        health: "Excellent time for establishing lasting health improvements. Focus on nutrition, sleep quality, and building physical strength.",
        luck: "Month's prosperity numbers: 2, 9, 16, 23. Late August brings significant opportunities for financial growth and material security."
      },
      yearly: {
        personal: "2025 builds lasting relationship foundations through twelve months of steady romantic growth and material security. Your practical approach to love creates stable, nurturing partnerships that stand the test of time. Home and family life flourish with possible property investments or domestic improvements that enhance your quality of life.",
        career: "Professional stability and financial growth unfold through consistent effort and reliable performance. Your expertise becomes increasingly valuable, leading to better compensation and recognition. Material success builds steadily throughout the year.",
        health: "Physical strength and endurance improve significantly through sustained wellness practices. Your body responds excellently to consistent routines and natural approaches to health. Building lasting vitality becomes a key focus.",
        luck: "Annual prosperity numbers: 2, 6, 14, 22. Venus cycles favor financial investments and material acquisitions. Your patient approach to goals yields substantial rewards by year's end."
      }
    },
    gemini: {
      name: "Gemini", dates: "May 21 - Jun 20", symbol: "♊", element: "Air", color: "from-yellow-500 to-amber-500",
      today: {
        personal: "Communication flows beautifully today. Express your thoughts clearly in relationships, and intellectual connections deepen bonds.",
        career: "Multiple opportunities may present themselves. Your adaptability and quick thinking help navigate complex situations successfully.",
        health: "Mental stimulation is crucial today. Engage in puzzles, reading, or learning something new, but avoid information overload.",
        luck: "Lucky numbers: 3, 12, 18. Yellow and silver enhance your Mercury-ruled nature and communication abilities."
      },
      yesterday: {
        personal: "Yesterday's conversations laid groundwork for deeper understanding. Review communication patterns for valuable relationship insights.",
        career: "Multiple small tasks from yesterday combine into significant progress. Your versatility proves professionally valuable.",
        health: "Mental activity from yesterday requires balance today. Alternate intellectual pursuits with physical movement for optimal energy.",
        luck: "Numbers 5, 14, 21 brought communication opportunities. Quick decisions from yesterday now show positive results."
      },
      tomorrow: {
        personal: "Prepare for important conversations tomorrow. Your wit and charm will open doors to new romantic connections.",
        career: "Tomorrow brings diverse opportunities requiring mental agility. Prepare to showcase your excellent communication skills.",
        health: "Plan varied activities to keep your restless mind engaged. Mental stimulation will boost overall energy levels.",
        luck: "Numbers 7, 16, 25 will facilitate communication tomorrow. Wear yellow or silver for enhanced mental clarity."
      },
      weekly: {
        personal: "Varied social interactions bring new romantic possibilities. Communication skills strengthen existing relationships significantly throughout the week.",
        career: "Multiple projects and diverse responsibilities keep you engaged. Your versatility becomes a valuable professional asset.",
        health: "Mental energy high but physical energy fluctuates. Balance intellectual activities with movement and breathing exercises.",
        luck: "Week's dynamic numbers: 3, 10, 17, 24. Mercury enhances communication and learning opportunities throughout the period."
      },
      monthly: {
        personal: "Social circle expands significantly with potential romantic connections through friends or online platforms. Your wit attracts diverse partners.",
        career: "Multiple career opportunities requiring diverse skills emerge. Your multitasking ability becomes highly valued in various projects.",
        health: "Nervous system requires attention due to high mental activity. Regular breaks and varied physical activities maintain optimal balance.",
        luck: "Month's versatility numbers: 5, 12, 19, 26. Technology and communication investments prove profitable throughout August."
      }
    },
    cancer: {
      name: "Cancer", dates: "Jun 21 - Jul 22", symbol: "♋", element: "Water", color: "from-blue-500 to-teal-500",
      today: {
        personal: "Family relationships and emotional security take center stage today. Your nurturing nature attracts others seeking comfort and guidance.",
        career: "Trust your intuition in professional matters. Your ability to read people and situations gives you a significant advantage.",
        health: "Listen to your body's signals carefully. Your digestive system may be sensitive to stress and emotional fluctuations.",
        luck: "Lucky numbers: 2, 9, 16. Silver and blue enhance your intuitive powers and emotional healing abilities."
      },
      yesterday: {
        personal: "Yesterday's emotional investments in relationships begin showing returns. Your caring nature created deeper bonds with loved ones.",
        career: "Intuitive decisions from yesterday prove correct. Trust your emotional intelligence in current professional situations.",
        health: "Your body responded well to yesterday's nurturing self-care. Continue prioritizing emotional and physical comfort.",
        luck: "Numbers 4, 11, 18 brought emotional clarity. Family connections from yesterday strengthen current opportunities."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for deeper emotional connections. Create a nurturing environment for meaningful conversations.",
        career: "Your protective instincts and care for others will be professionally recognized tomorrow. Team harmony improves under your influence.",
        health: "Focus on emotional well-being tomorrow. Your mood significantly affects your physical health and energy levels.",
        luck: "Numbers 6, 13, 20 will bring family blessings tomorrow. Moon energy enhances your natural psychic abilities."
      },
      weekly: {
        personal: "Week emphasizes home, family, and emotional security across seven meaningful days. Monday brings important family conversations that may reveal hidden feelings or resolve long-standing issues. Tuesday-Wednesday focus on creating comfortable domestic environments and strengthening bonds with loved ones through shared meals and intimate conversations. Thursday marks an emotional turning point where your nurturing nature helps others overcome personal challenges. Friday and weekend bring opportunities for family gatherings, home improvements, or real estate decisions. Your protective instincts and intuitive understanding create safe spaces for relationships to flourish naturally. Single Cancers may find love through family connections or in familiar, comfortable settings.",
        career: "Professional recognition for your caring approach and emotional intelligence spans seven progressive days. Monday establishes your reputation as a supportive team member who others trust with sensitive matters. Tuesday-Wednesday see your conflict resolution skills helping workplace harmony and productivity. Thursday brings leadership opportunities where your ability to motivate through encouragement rather than pressure proves invaluable. Friday showcases your project nurturing abilities as you guide initiatives to successful completion. Weekend networking in comfortable, informal settings opens doors to future collaborations. Your emotional intelligence becomes increasingly valued as a leadership quality throughout the week.",
        health: "Focus on digestive health and emotional balance through seven days of gentle wellness practices. Monday-Tuesday require extra attention to stress management and comfort eating patterns that may affect your stomach. Wednesday onwards brings improved energy when you align activities with your natural rhythms. Your digestive system responds excellently to home-cooked meals, herbal teas, and foods that provide emotional comfort. Water-based activities like swimming or relaxing baths support overall well-being. Weekend self-care rituals help process the week's emotional experiences and prepare for coming challenges.",
        luck: "Week's nurturing numbers: 2, 9, 16, 23. Moon phases particularly favor family matters, emotional healing, and intuitive decision-making. Silver and pearl colors enhance your natural psychic abilities throughout the week. Tuesday and Friday bring significant emotional breakthroughs or family blessings. Weekend activities near water or in domestic settings prove especially fortunate."
      },
      monthly: {
        personal: "August brings deep emotional fulfillment through four weeks of family-centered growth and domestic happiness. First week (1st-7th) focuses on strengthening family bonds and resolving any lingering emotional issues with relatives. Second week (8th-15th) emphasizes creating beautiful, comfortable home environments that nurture both yourself and loved ones. Third week (16th-23rd) brings opportunities for family expansion, home purchases, or significant domestic improvements. Final week (24th-31st) solidifies emotional security and may introduce new family traditions or living arrangements. Relationships reach new levels of intimacy and trust as your nurturing nature creates safe spaces for authentic emotional expression.",
        career: "Month of professional growth through four weeks of caring leadership and emotional intelligence development. Week one establishes your reputation as someone others confide in and seek guidance from during difficult times. Week two brings recognition for your ability to create harmonious work environments and support struggling team members. Week three focuses on expanding your professional family through mentoring relationships and collaborative partnerships. Final week consolidates your leadership approach and may bring opportunities to manage teams or departments. Your ability to support others consistently leads to advancement and increased responsibilities.",
        health: "Excellent time for emotional healing and establishing four weeks of comforting wellness routines. Early August requires attention to digestive sensitivities and stress-related stomach issues. Mid-month brings improved energy when you prioritize emotional well-being alongside physical health. Your body responds beautifully to nurturing practices like massage, warm baths, and comfort foods in moderation. Late August focuses on creating sustainable routines that support both emotional and physical wellness. Activities that bring joy and comfort prove most beneficial for overall health.",
        luck: "Month's protective numbers: 4, 11, 18, 25. Cancer season enhances your natural intuitive abilities and emotional intelligence. Late August brings significant opportunities for creating lasting security, happiness, and family prosperity. Property investments or home-related decisions prove particularly fortunate. Lucky days: 2nd, 9th, 16th, 25th favor family matters and emotional decisions."
      },
      yearly: {
        personal: "2025 nurtures your emotional growth through twelve months of family-centered happiness and domestic fulfillment. Spring (Mar-May) strengthens family bonds and may bring new additions through birth, marriage, or adoption. Summer (Jun-Aug) focuses on creating your ideal home environment and deepening intimate relationships. Autumn (Sep-Nov) brings opportunities for real estate investments, home renovations, or relocating to better serve family needs. Winter (Dec-Feb 2026) consolidates emotional security and creates traditions that will nurture your family for years to come. Your intuitive abilities and caring nature consistently attract people seeking emotional healing and support.",
        career: "Professional transformation through twelve months of emotional leadership and caring management. Q1 establishes your reputation as a supportive, trustworthy colleague who others turn to during crises. Q2 brings leadership roles that utilize your natural ability to create harmonious, productive work environments. Q3 focuses on expanding your influence through mentoring programs or human resources positions. Q4 consolidates your emotional intelligence expertise and positions you for senior leadership roles. Your ability to understand and support others consistently opens doors throughout the year.",
        health: "Complete wellness transformation spans twelve months of emotional and physical healing. First quarter focuses on addressing stress-related digestive issues and establishing nurturing self-care routines. Second quarter brings improved energy and vitality through activities that provide emotional satisfaction. Third quarter emphasizes preventive care and building strong support systems for long-term wellness. Final quarter creates sustainable habits that honor your need for comfort while maintaining optimal health. Your body responds beautifully to gentle, consistent care throughout the year.",
        luck: "Annual protective numbers: 2, 11, 20, 29. Moon cycles consistently favor family decisions, emotional investments, and intuitive choices throughout 2025. Lucky months: June, August, November, February bring significant opportunities for family growth and emotional fulfillment. Your caring nature attracts beneficial relationships and support systems that enhance both personal and professional success."
      }
    },
    leo: {
      name: "Leo", dates: "Jul 23 - Aug 22", symbol: "♌", element: "Fire", color: "from-yellow-400 to-orange-600",
      today: {
        personal: "Your natural charisma shines brightly today. Romantic opportunities abound, and your confidence attracts admiration from others.",
        career: "Take center stage in professional matters. Your leadership abilities and creative solutions impress important decision-makers.",
        health: "Vitality runs high today. Engage in activities that make you feel strong and confident, but don't neglect rest.",
        luck: "Lucky numbers: 1, 10, 19. Gold and bright colors amplify your natural magnetism and leadership presence."
      },
      yesterday: {
        personal: "Yesterday's bold romantic gestures set positive momentum. Your generous spirit and loyalty strengthened important relationships.",
        career: "Previous creative efforts gain recognition. Your enthusiastic leadership from yesterday continues to inspire your team.",
        health: "High energy from yesterday needs balance today. Maintain your vitality while ensuring adequate rest and recovery.",
        luck: "Numbers 3, 12, 21 brought recognition. Yesterday's generous actions create goodwill that benefits current endeavors."
      },
      tomorrow: {
        personal: "Tomorrow offers opportunities to shine in love. Plan grand romantic gestures that showcase your generous and passionate nature.",
        career: "Prepare for a moment in the spotlight tomorrow. Your creative talents and leadership skills will be publicly recognized.",
        health: "Tomorrow favors activities that boost confidence and vitality. Exercise routines that make you feel powerful work best.",
        luck: "Numbers 5, 14, 23 will bring acclaim tomorrow. Sun energy peaks, enhancing your natural ability to inspire others."
      },
      weekly: {
        personal: "Week puts you in the romantic spotlight. Your warmth and generosity attract multiple admirers and strengthen existing partnerships.",
        career: "Professional recognition and creative breakthroughs highlight the week. Your leadership inspires others to achieve greater heights.",
        health: "Maintain high energy while balancing activity with rest. Heart health and back strength benefit from targeted attention.",
        luck: "Week's regal numbers: 1, 8, 15, 22. Sun aspects favor public recognition and opportunities to lead important projects."
      },
      monthly: {
        personal: "August celebrates your romantic and creative nature. Love relationships flourish under your generous attention and passionate expression.",
        career: "Month of significant professional achievement and public recognition. Your creative leadership opens doors to prestigious opportunities.",
        health: "Vitality peaks this month. Focus on maintaining strength and confidence through activities that celebrate your physical capabilities.",
        luck: "Month's solar numbers: 3, 10, 17, 24. Late August brings major opportunities for creative expression and leadership advancement."
      },
      yearly: {
        personal: "2025 illuminates your romantic and creative potential through twelve months of magnificent self-expression and passionate love. Your natural charisma attracts multiple admirers and opportunities for grand romantic adventures throughout the year.",
        career: "Professional stardom unfolds as your creative talents and leadership abilities gain widespread recognition. Public speaking, entertainment, and leadership roles bring significant advancement and financial rewards.",
        health: "Vitality and confidence soar to new heights through activities that celebrate your physical capabilities and creative energy. Your heart and spine benefit from strength-building exercises and confidence-boosting activities.",
        luck: "Annual solar numbers: 1, 8, 15, 22. Sun-ruled periods bring exceptional opportunities for creative expression, leadership roles, and public recognition throughout 2025."
      }
    },
    virgo: {
      name: "Virgo", dates: "Aug 23 - Sep 22", symbol: "♍", element: "Earth", color: "from-green-600 to-teal-600",
      today: {
        personal: "Attention to detail in relationships pays off today. Your caring, practical approach helps solve problems and strengthens bonds.",
        career: "Your analytical skills and perfectionist nature lead to breakthrough solutions. Colleagues appreciate your thorough, methodical approach.",
        health: "Focus on purification and optimization of your routine. Your body responds well to clean eating and organized wellness practices.",
        luck: "Lucky numbers: 6, 15, 24. Earth tones and navy blue support your natural precision and analytical abilities."
      },
      yesterday: {
        personal: "Yesterday's helpful actions in relationships create lasting gratitude. Your practical support provided exactly what was needed.",
        career: "Meticulous work from yesterday receives recognition. Your attention to detail prevents problems and improves efficiency.",
        health: "Yesterday's health improvements continue benefiting you. Your systematic approach to wellness shows measurable progress.",
        luck: "Numbers 4, 13, 22 brought order and improvement. Yesterday's organized efforts create foundations for continued success."
      },
      tomorrow: {
        personal: "Tomorrow favors practical expressions of love. Helping others and solving problems together strengthens relationship bonds.",
        career: "Prepare detailed analyses and organized presentations. Tomorrow rewards your methodical approach with significant professional advancement.",
        health: "Plan systematic health improvements for tomorrow. Your body responds exceptionally well to organized, gradual lifestyle changes.",
        luck: "Numbers 8, 17, 26 will bring practical benefits tomorrow. Mercury enhances your analytical abilities and attention to detail."
      },
      weekly: {
        personal: "Week emphasizes service and practical support in relationships. Your helpful nature and problem-solving skills strengthen partnerships.",
        career: "Professional excellence through precision and reliability. Your systematic approach to complex problems leads to valuable innovations.",
        health: "Perfect week for optimizing health routines and establishing beneficial habits. Your methodical approach yields excellent results.",
        luck: "Week's precise numbers: 6, 13, 20, 27. Mercury aspects favor detailed work and systematic improvements in all life areas."
      },
      monthly: {
        personal: "August focuses on improving relationships through practical service and attention to details. Your caring precision deepens emotional bonds.",
        career: "Month of professional refinement and systematic advancement. Your analytical skills lead to efficiency improvements and recognition.",
        health: "Excellent time for comprehensive health optimization. Focus on diet, exercise routines, and systematic wellness improvements.",
        luck: "Month's improvement numbers: 7, 14, 21, 28. Late August brings opportunities to showcase your expertise and precision."
      }
    },
    libra: {
      name: "Libra", dates: "Sep 23 - Oct 22", symbol: "♎", element: "Air", color: "from-pink-500 to-rose-500",
      today: {
        personal: "Harmony and balance guide your relationships today. Your diplomatic nature helps resolve conflicts and creates beautiful connections.",
        career: "Partnership opportunities and collaborative projects flourish. Your ability to see all sides helps mediate and create win-win solutions.",
        health: "Focus on balance in all aspects of wellness. Your kidneys and skin benefit from hydration and balanced nutrition today.",
        luck: "Lucky numbers: 7, 16, 25. Pink and pastels enhance your natural charm and diplomatic abilities."
      },
      yesterday: {
        personal: "Yesterday's efforts to create harmony in relationships show positive results. Your fair-minded approach built trust and understanding.",
        career: "Collaborative efforts from yesterday gain momentum. Your ability to balance different perspectives proves professionally valuable.",
        health: "Yesterday's balanced approach to health continues benefiting you. Maintain the equilibrium you've established in your routines.",
        luck: "Numbers 2, 11, 20 brought partnership opportunities. Yesterday's diplomatic actions create goodwill for current endeavors."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for romantic partnerships and beautiful connections. Your charm and grace attract harmonious relationships.",
        career: "Prepare for important partnerships and collaborative opportunities. Your diplomatic skills will be essential for tomorrow's negotiations.",
        health: "Focus on creating balance and beauty in your wellness routine. Your body responds well to aesthetic and harmonious environments.",
        luck: "Numbers 9, 18, 27 will bring partnership benefits tomorrow. Venus energy enhances your natural ability to create harmony."
      },
      weekly: {
        personal: "Week emphasizes partnership, romance, and social harmony. Your natural charm and diplomatic skills attract beautiful relationships.",
        career: "Professional partnerships and team collaborations flourish. Your ability to create balance and fairness leads to successful joint ventures.",
        health: "Focus on maintaining equilibrium in all health aspects. Balance work and rest, nutrition and pleasure for optimal well-being.",
        luck: "Week's harmonious numbers: 7, 14, 21, 28. Venus aspects favor artistic pursuits, partnerships, and aesthetic appreciation."
      },
      monthly: {
        personal: "August celebrates partnership and romantic harmony. Your diplomatic nature attracts lasting love and strengthens existing relationships.",
        career: "Month of successful collaborations and partnership opportunities. Your ability to create balance leads to mutually beneficial agreements.",
        health: "Excellent time for achieving health balance and beauty enhancement. Focus on activities that make you feel attractive and harmonious.",
        luck: "Month's partnership numbers: 6, 13, 20, 27. Late August brings significant opportunities for beautiful collaborations and romantic fulfillment."
      }
    },
    scorpio: {
      name: "Scorpio", dates: "Oct 23 - Nov 21", symbol: "♏", element: "Water", color: "from-red-800 to-purple-800",
      today: {
        personal: "Intense emotions and deep connections characterize your relationships today. Your passionate nature attracts profound, transformative experiences.",
        career: "Your investigative abilities and determination lead to important discoveries. Dive deep into complex problems for breakthrough solutions.",
        health: "Focus on detoxification and regeneration. Your body benefits from elimination diets, deep breathing, and transformative healing practices.",
        luck: "Lucky numbers: 8, 17, 26. Deep reds and black enhance your natural magnetism and transformative power."
      },
      yesterday: {
        personal: "Yesterday's emotional intensity created deeper bonds or necessary endings. Your ability to face truth strengthened important relationships.",
        career: "Penetrating insights from yesterday reveal hidden opportunities. Your detective work and persistence begin showing significant results.",
        health: "Yesterday's focus on deep healing continues benefiting you. Your body's regenerative processes are working efficiently.",
        luck: "Numbers 4, 13, 22 brought hidden revelations. Yesterday's courage to face truth creates power for current transformations."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for profound emotional connections. Be prepared for intense but transformative relationship experiences.",
        career: "Your research and investigative work will uncover valuable secrets tomorrow. Hidden opportunities reveal themselves to your penetrating gaze.",
        health: "Focus on powerful healing and regeneration tomorrow. Your body's ability to transform and renew itself will be particularly strong.",
        luck: "Numbers 9, 18, 27 will bring transformative power tomorrow. Pluto energy enhances your natural ability to regenerate and transform."
      },
      weekly: {
        personal: "Week brings emotional transformation and deep psychological insights. Your ability to heal and regenerate attracts powerful connections.",
        career: "Professional transformation through research, investigation, and strategic planning. Your intensity and focus lead to significant breakthroughs.",
        health: "Powerful week for healing and regeneration. Focus on detoxification, deep rest, and transformative health practices.",
        luck: "Week's transformative numbers: 8, 15, 22, 29. Pluto aspects favor deep healing, investigation, and psychological insight."
      },
      monthly: {
        personal: "August brings profound emotional transformation and regeneration. Your passionate intensity attracts deep, lasting connections.",
        career: "Month of professional metamorphosis and strategic advancement. Your investigative skills and determination lead to powerful discoveries.",
        health: "Excellent time for deep healing and bodily transformation. Focus on regenerative practices and powerful detoxification methods.",
        luck: "Month's power numbers: 1, 8, 15, 22. Late August brings opportunities for complete transformation and renewal."
      }
    },
    sagittarius: {
      name: "Sagittarius", dates: "Nov 22 - Dec 21", symbol: "♐", element: "Fire", color: "from-purple-600 to-indigo-600",
      today: {
        personal: "Adventure and philosophical connection inspire your relationships today. Your optimistic nature and love of learning attract like-minded souls.",
        career: "International opportunities and higher education pursuits favor you. Your broad perspective and enthusiasm open doors to expansion.",
        health: "Focus on activities that expand your physical horizons. Outdoor adventures, travel fitness, and activities that challenge limits benefit you.",
        luck: "Lucky numbers: 9, 18, 27. Purple and royal blue enhance your natural wisdom and adventurous spirit."
      },
      yesterday: {
        personal: "Yesterday's adventurous spirit in relationships created exciting memories. Your philosophical approach deepened understanding with others.",
        career: "Expansive thinking from yesterday opens new professional horizons. Your enthusiasm and broad perspective gain recognition.",
        health: "Yesterday's physical adventures energized your system. Continue building on the momentum of expanded activity and exploration.",
        luck: "Numbers 3, 12, 21 brought expansion opportunities. Yesterday's optimistic actions create foundations for continued growth."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for adventurous romance and philosophical connections. Plan activities that expand consciousness together.",
        career: "Prepare for expansion opportunities tomorrow. Your teaching abilities and broad perspective will be recognized and rewarded.",
        health: "Plan adventurous physical activities for tomorrow. Your body craves movement, exploration, and activities that challenge boundaries.",
        luck: "Numbers 6, 15, 24 will bring adventure tomorrow. Jupiter energy expands your opportunities for growth and exploration."
      },
      weekly: {
        personal: "Week emphasizes adventure, learning, and philosophical growth in relationships. Your optimistic nature attracts inspiring connections.",
        career: "Professional expansion through education, travel, or international connections. Your broad perspective becomes a valuable asset.",
        health: "Focus on activities that expand physical capabilities and explore new fitness frontiers. Adventure sports and outdoor activities thrive.",
        luck: "Week's expansive numbers: 9, 16, 23, 30. Jupiter aspects favor travel, learning, and philosophical advancement."
      },
      monthly: {
        personal: "August celebrates adventure, learning, and cultural expansion in relationships. Your wisdom and optimism attract international connections.",
        career: "Month of significant professional expansion through education, travel, or cultural exchange. Your teaching abilities gain recognition.",
        health: "Excellent time for expanding physical adventures and exploring new wellness philosophies. Travel fitness and outdoor activities flourish.",
        luck: "Month's adventure numbers: 3, 10, 17, 24. Late August brings major opportunities for expansion and philosophical growth."
      }
    },
    capricorn: {
      name: "Capricorn", dates: "Dec 22 - Jan 19", symbol: "♑", element: "Earth", color: "from-gray-700 to-slate-800",
      today: {
        personal: "Commitment and long-term planning guide your relationships today. Your responsible nature attracts partners seeking stability and growth.",
        career: "Authority and leadership opportunities present themselves. Your disciplined approach and strategic thinking lead to advancement.",
        health: "Focus on building long-term health foundations. Your bones, teeth, and structural systems benefit from strengthening activities.",
        luck: "Lucky numbers: 10, 19, 28. Deep earth tones and classic colors enhance your natural authority and determination."
      },
      yesterday: {
        personal: "Yesterday's responsible actions in relationships build lasting trust. Your commitment and reliability strengthen important partnerships.",
        career: "Strategic planning from yesterday begins showing results. Your methodical approach and persistence create solid professional foundations.",
        health: "Yesterday's disciplined health choices continue benefiting your long-term wellness. Your systematic approach shows measurable progress.",
        luck: "Numbers 8, 17, 26 brought structural improvements. Yesterday's disciplined efforts create stepping stones for continued success."
      },
      tomorrow: {
        personal: "Tomorrow favors serious commitment and long-term relationship planning. Your mature approach attracts lasting partnerships.",
        career: "Prepare for important leadership opportunities tomorrow. Your strategic vision and disciplined execution will be recognized and rewarded.",
        health: "Focus on building endurance and structural strength tomorrow. Your body responds well to challenging, goal-oriented fitness routines.",
        luck: "Numbers 1, 10, 19 will bring authority tomorrow. Saturn energy enhances your natural leadership abilities and strategic thinking."
      },
      weekly: {
        personal: "Week emphasizes commitment, responsibility, and long-term relationship building. Your mature approach creates lasting bonds.",
        career: "Professional advancement through strategic planning and disciplined execution. Your leadership abilities gain recognition from authorities.",
        health: "Focus on building lasting health foundations and structural strength. Consistent, challenging routines yield excellent long-term results.",
        luck: "Week's achievement numbers: 10, 17, 24, 31. Saturn aspects favor long-term planning and strategic advancement."
      },
      monthly: {
        personal: "August focuses on commitment, responsibility, and building lasting relationship foundations. Your mature approach attracts serious partnerships.",
        career: "Month of significant professional achievement and authority advancement. Your strategic vision and discipline lead to leadership recognition.",
        health: "Excellent time for establishing lasting health foundations and structural improvements. Focus on building endurance and strength.",
        luck: "Month's success numbers: 8, 15, 22, 29. Late August brings major opportunities for achieving long-term goals and recognition."
      }
    },
    aquarius: {
      name: "Aquarius", dates: "Jan 20 - Feb 18", symbol: "♒", element: "Air", color: "from-blue-600 to-cyan-600",
      today: {
        personal: "Friendship and intellectual connection inspire your relationships today. Your unique perspective and humanitarian nature attract progressive partners.",
        career: "Innovation and technology opportunities favor you. Your original thinking and humanitarian approach lead to breakthrough solutions.",
        health: "Focus on activities that benefit both individual and collective well-being. Group fitness and innovative wellness approaches work best.",
        luck: "Lucky numbers: 11, 20, 29. Electric blue and silver enhance your natural innovation and humanitarian spirit."
      },
      yesterday: {
        personal: "Yesterday's unique approach to relationships created interesting connections. Your intellectual honesty and friendship focus deepened bonds.",
        career: "Innovative ideas from yesterday gain momentum and support. Your humanitarian perspective and original thinking attract backing.",
        health: "Yesterday's experimental approach to wellness shows promising results. Continue exploring innovative health and fitness methods.",
        luck: "Numbers 2, 11, 20 brought innovative opportunities. Yesterday's progressive actions create foundations for technological advancement."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for unique connections and friendship-based romance. Your intellectual approach attracts like-minded souls.",
        career: "Prepare for innovative opportunities tomorrow. Your original thinking and technological insight will lead to breakthrough developments.",
        health: "Experiment with cutting-edge wellness approaches tomorrow. Your body responds well to innovative and technologically advanced methods.",
        luck: "Numbers 7, 16, 25 will bring innovation tomorrow. Uranus energy enhances your natural ability to revolutionize and progress."
      },
      weekly: {
        personal: "Week emphasizes friendship, intellectual connection, and progressive relationship approaches. Your unique perspective attracts innovative partnerships.",
        career: "Professional breakthrough through innovation, technology, and humanitarian applications. Your original thinking leads to significant advancement.",
        health: "Focus on innovative wellness approaches and group activities. Technology-assisted fitness and progressive health methods flourish.",
        luck: "Week's progressive numbers: 11, 18, 25, 32. Uranus aspects favor technological innovation and humanitarian advancement."
      },
      monthly: {
        personal: "August celebrates friendship, innovation, and progressive relationship approaches. Your humanitarian nature attracts lasting, meaningful connections.",
        career: "Month of technological breakthrough and humanitarian achievement. Your innovative thinking leads to solutions that benefit many.",
        health: "Excellent time for exploring innovative wellness technologies and group fitness approaches. Progressive health methods show remarkable results.",
        luck: "Month's innovation numbers: 4, 11, 18, 25. Late August brings major opportunities for technological advancement and humanitarian impact."
      }
    },
    pisces: {
      name: "Pisces", dates: "Feb 19 - Mar 20", symbol: "♓", element: "Water", color: "from-purple-500 to-blue-500",
      today: {
        personal: "Intuition and compassion guide your relationships today. Your empathetic nature and artistic soul attract deeply spiritual connections.",
        career: "Creative and healing professions favor you. Your intuitive understanding and compassionate approach lead to meaningful professional fulfillment.",
        health: "Focus on emotional and spiritual healing alongside physical wellness. Your sensitive system benefits from gentle, holistic approaches.",
        luck: "Lucky numbers: 12, 21, 30. Sea greens and soft purples enhance your natural intuition and spiritual connection."
      },
      yesterday: {
        personal: "Yesterday's compassionate actions in relationships created deep emotional bonds. Your intuitive understanding touched others profoundly.",
        career: "Creative or healing work from yesterday receives recognition. Your empathetic approach and artistic vision gain appreciation.",
        health: "Yesterday's focus on emotional healing continues benefiting your overall wellness. Your intuitive self-care choices prove excellent.",
        luck: "Numbers 7, 16, 25 brought spiritual insights. Yesterday's compassionate actions create karmic benefits for current endeavors."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for deeply spiritual and artistic connections. Your intuitive nature attracts soulmate-level relationships.",
        career: "Prepare for creative or healing opportunities tomorrow. Your artistic vision and compassionate approach will be recognized and valued.",
        health: "Focus on gentle, holistic healing approaches tomorrow. Your sensitive system responds beautifully to intuitive wellness practices.",
        luck: "Numbers 3, 12, 21 will bring spiritual blessings tomorrow. Neptune energy enhances your natural psychic abilities and artistic inspiration."
      },
      weekly: {
        personal: "Week emphasizes spiritual connection, artistic expression, and compassionate love. Your empathetic nature creates profound emotional bonds.",
        career: "Professional fulfillment through creative expression and healing arts. Your intuitive understanding leads to meaningful career advancement.",
        health: "Focus on holistic healing approaches and emotional wellness. Water-based activities and artistic expression support overall health.",
        luck: "Week's spiritual numbers: 12, 19, 26, 33. Neptune aspects favor artistic inspiration, spiritual growth, and compassionate service."
      },
      monthly: {
        personal: "August celebrates spiritual love, artistic expression, and emotional depth. Your compassionate nature attracts profound, lasting connections.",
        career: "Month of creative breakthrough and healing profession advancement. Your artistic vision and empathetic approach gain significant recognition.",
        health: "Excellent time for emotional healing and holistic wellness approaches. Focus on activities that nurture both body and soul.",
        luck: "Month's mystical numbers: 6, 13, 20, 27. Late August brings major opportunities for artistic expression and spiritual advancement."
      }
    }
  }

  const zodiacInfo = zodiacData[signId];

  if (!zodiacInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we don't have data for "{signId}"</p>
          <Link to="/horoscope" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Back to Horoscope
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span className="mx-2">•</span>
            <Link to="/horoscope" className="hover:text-purple-600 transition-colors">Horoscope</Link>
            <span className="mx-2">•</span>
            <span className="text-purple-600 font-medium capitalize">{zodiacInfo.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Horoscope
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Sign Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{zodiacInfo.symbol}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{zodiacInfo.name}</h1>
          <p className="text-lg text-gray-600">{zodiacInfo.dates} • {zodiacInfo.element}</p>
          <p className="text-sm text-gray-500 mt-2">
            {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Horoscope - {getCurrentDate(selectedPeriod)}
          </p>
        </div>

        {/* Period Selection */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Choose Your Time Period</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedPeriod === period.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <span className="text-lg">{period.icon}</span>
                  <span>{period.label}</span>
                </button>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {getCurrentDate(selectedPeriod)}
              </p>
            </div>
          </div>
        </div>

        {/* Horoscope Content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                  💝 Personal Life
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {zodiacInfo[selectedPeriod]?.personal || "This detailed forecast will be available soon. Please check back later or explore other time periods."}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                  💼 Career & Work
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {zodiacInfo[selectedPeriod]?.career || "This detailed forecast will be available soon. Please check back later or explore other time periods."}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                  🏥 Health & Wellness
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {zodiacInfo[selectedPeriod]?.health || "This detailed forecast will be available soon. Please check back later or explore other time periods."}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                  🍀 Lucky Numbers & Colors
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {zodiacInfo[selectedPeriod]?.luck || "This detailed forecast will be available soon. Please check back later or explore other time periods."}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Want a Personalized Reading?</h2>
            <p className="text-purple-100 mb-6">
              Connect with our expert astrologers for detailed, personalized insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/chat')}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200"
              >
                Get Personal Reading
              </button>
              <button 
                onClick={() => navigate('/horoscope')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                View Other Signs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeDetailSimple;
