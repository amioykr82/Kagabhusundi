import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, TrendingUp, ArrowLeft } from 'lucide-react';

const HoroscopeDetail = () => {
  const { signId } = useParams();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  console.log('HoroscopeDetail rendering with signId:', signId);

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  // Get current date with different formats for different periods
  const getCurrentDateInfo = () => {
    const today = new Date()
    
    // Yesterday
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayInfo = `${yesterday.getDate()}${getOrdinalSuffix(yesterday.getDate())} ${yesterday.toLocaleDateString('en-US', { month: 'short' })}`
    
    // Today
    const todayInfo = `${today.getDate()}${getOrdinalSuffix(today.getDate())} ${today.toLocaleDateString('en-US', { month: 'short' })}`
    
    // Tomorrow
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowInfo = `${tomorrow.getDate()}${getOrdinalSuffix(tomorrow.getDate())} ${tomorrow.toLocaleDateString('en-US', { month: 'short' })}`
    
    // Weekly (Sunday to Saturday)
    const day = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - day)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    const weeklyInfo = `${startOfWeek.toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })} – ${endOfWeek.toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })}`
    
    // Monthly
    const monthlyInfo = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
    
    return { yesterdayInfo, todayInfo, tomorrowInfo, weeklyInfo, monthlyInfo }
  }

  const { yesterdayInfo, todayInfo, tomorrowInfo, weeklyInfo, monthlyInfo } = getCurrentDateInfo()

  const zodiacData = {
    aries: {
      name: "Aries",
      dates: "Mar 21 - Apr 19",
      symbol: "♈",
      element: "Fire",
      ruling_planet: "Mars",
      today: {
        personal: "Single Aries will feel good about their single status today. Taken Aries may get the desire to be single again.",
        travel: "Traveling is sadly not recommended for you today. Maybe another day will bring you more adventure.",
        money: "Your lucky numbers are going to be 39, 3, 87, and 2. However, gambling with money that you don't have isn't the best decision.",
        career: "It would be great if you showed some initiative at work. Be loud (not literally) and be proud. Don't be afraid to speak up and to share your ideas.",
        health: "Your weak spot will be your feet, so make sure that you are warm and comfortable today. Cut down your consumption of alcohol.",
        emotions: "Spending time with friends and family will be good for you today. Emotionally, you are feeling like everything is finally going alright."
      }
    },
    cancer: {
      name: "Cancer",
      dates: "Jun 21 - Jul 22",
      symbol: "♋", 
      element: "Water",
      ruling_planet: "Moon",
      today: {
        personal: "Family relationships and emotional security take center stage today. Your nurturing nature attracts others seeking comfort and guidance.",
        travel: "Home-based activities are more favored than distant travel today. Create a sanctuary within your own space.",
        money: "Emotional spending could be tempting. Focus on family financial security and investments that provide long-term stability.",
        career: "Trust your intuition in professional matters. Your ability to read people and situations gives you a significant advantage.",
        health: "Listen to your body's signals carefully. Your digestive system may be sensitive to stress and emotional fluctuations.",
        emotions: "Deep emotional currents flow today. Connect with family and close friends who understand your sensitive nature."
      }
    }
  }

  // Get zodiac info
  const zodiacInfo = zodiacData[signId]
  
  console.log('Zodiac info for', signId, ':', zodiacInfo);

  // If no data found, show error
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
    )
  }
    aries: {
      name: "Aries",
      dates: "Mar 21 - Apr 19",
      symbol: "♈",
      element: "Fire",
      ruling_planet: "Mars",
      today: {
        personal: "Single Aries will feel good about their single status today. Taken Aries may get the desire to be single again.",
        travel: "Traveling is sadly not recommended for you today. Maybe another day will bring you more adventure.",
        money: "Your lucky numbers are going to be 39, 3, 87, and 2. However, gambling with money that you don't have isn't the best decision.",
        career: "It would be great if you showed some initiative at work. Be loud (not literally) and be proud. Don't be afraid to speak up and to share your ideas.",
        health: "Your weak spot will be your feet, so make sure that you are warm and comfortable today. Cut down your consumption of alcohol.",
        emotions: "Spending time with friends and family will be good for you today. Emotionally, you are feeling like everything is finally going alright."
      },
      yesterday: {
        personal: "Yesterday's bold moves in relationships set the stage for today's developments. Reflect on lessons learned from recent romantic decisions.",
        travel: "Previous travel plans may have been delayed, but this created opportunities for local discoveries and connections.",
        money: "Financial decisions made yesterday begin showing their impact. Review recent spending patterns for insights into current opportunities.",
        career: "Yesterday's leadership efforts start bearing fruit. Use the momentum from previous achievements to build professional success.",
        health: "Recovery from yesterday's high-energy activities. Your body needed that rest, and today you feel recharged and ready.",
        emotions: "Emotional intensity from yesterday has settled into a more balanced state. Relationships feel more harmonious and understanding."
      },
      tomorrow: {
        personal: "Tomorrow brings exciting romantic developments. Single Aries should be open to unexpected encounters and new connections.",
        travel: "Travel opportunities may present themselves tomorrow. Be ready for spontaneous adventures and last-minute plans.",
        money: "Financial opportunities are approaching. Prepare for potential investments or income sources that align with your goals.",
        career: "Tomorrow offers chances to showcase leadership skills. Prepare presentations and bold proposals tonight for maximum impact.",
        health: "Plan energizing activities for tomorrow. Your vitality will be at its peak for physical challenges and fitness goals.",
        emotions: "Emotional clarity arrives tomorrow. Relationships will benefit from honest communication and mutual understanding."
      },
      weekly: {
        overview: "This week brings powerful transformation and leadership opportunities for Aries. Your natural pioneering spirit is awakened, creating exciting new beginnings in multiple life areas.",
        detailed: `The stars are aligning to make this an exceptionally dynamic week for you, dear Aries. Your ruling planet Mars is charging ahead, filling you with an irresistible urge to take charge and make things happen.

Early in the week, you'll find yourself naturally stepping into leadership roles. Whether it's at work or in your personal relationships, others will look to you for direction. Don't shy away from this responsibility – your instincts are spot-on right now.

Mid-week brings a surge of creative energy that could revolutionize how you approach ongoing projects. Your innovative thinking will catch the attention of important people in your professional circle. If you've been waiting for the right moment to pitch that bold idea, this is it.

Romance takes an exciting turn as the week progresses. Single Aries may find themselves irresistibly drawn to someone with an equally fiery spirit, while coupled Rams discover new depths of passion with their partner. Your magnetic personality is absolutely captivating right now.

The weekend calls for balance. After a week of intense forward momentum, take time to recharge and reflect on the progress you've made. Spend time outdoors if possible – the fresh air will help you process all the exciting changes happening in your life.`
      },
      monthly: {
        overview: "March brings significant career developments and personal empowerment for Aries. Your ambitious nature aligns with cosmic energies, creating lasting opportunities for advancement and recognition.",
        detailed: `What a month March is shaping up to be for you, fiery Aries! The universe seems to be conspiring in your favor, opening doors you didn't even know existed.

The first week sets the tone beautifully – you'll find yourself naturally gravitating toward leadership positions and people will respond positively to your confident energy. There's something magnetic about your presence right now that draws opportunities and interesting people into your orbit.

Around mid-month, expect a significant breakthrough in your career or personal ambitions. This could manifest as a promotion, a new job offer, or even the green light for a project you've been passionate about. Your innovative ideas are finally being recognized for their true value.

Romance gets a cosmic boost during the third week. If you're single, someone equally dynamic and ambitious might catch your eye. For coupled Aries, this is a time to reignite the spark and perhaps make important commitments about your future together.

Financial opportunities flow more freely as the month progresses. Your quick decision-making and willingness to take calculated risks pay off handsomely. Just remember to balance your natural impulsiveness with practical wisdom.

The month wraps up with you feeling more confident and self-assured than you have in a long time. You've proven to yourself that you can turn dreams into reality when you commit fully to your vision.`
      },
      yearly: {
        overview: "2025 is a transformational year for Aries, marked by significant personal growth, career advancement, and spiritual awakening. Your pioneering nature leads you into uncharted territories that expand your influence and impact.",
        detailed: `Dear Aries, 2025 is destined to be one of those years you'll look back on as truly pivotal in your life story. The stars have aligned to support your boldest dreams and highest aspirations.

The year begins with a powerful surge of confidence and clarity about your direction. By spring, you'll find yourself in positions of leadership that feel both exciting and natural. Your innovative ideas aren't just welcomed – they're actively sought after by those who recognize your unique vision.

Summer brings the sweet taste of success as projects you've been nurturing finally bear fruit. This isn't just about career advancement, though that's certainly in the cards. It's about recognition of your authentic self and the value you bring to every situation.

Your relationships undergo a beautiful transformation throughout the year. You're attracting people who match your energy and ambition, whether in love or friendship. For coupled Aries, this is a year of deeper commitment and shared adventures. Single Rams may find their perfect match in the most unexpected circumstances.

Financially, your willingness to take calculated risks pays off handsomely. Multiple income streams develop as others seek your expertise and leadership. Your natural entrepreneurial spirit finds new outlets for expression.

Health and vitality reach new peaks as you discover the perfect balance between intense activity and restorative rest. Your body becomes a powerful ally in achieving your ambitious goals.

By year's end, you'll marvel at how much you've grown. The challenges that once seemed insurmountable now feel like stepping stones to even greater achievements. You're not just succeeding – you're thriving in ways that inspire others to follow their own bold dreams.`
      }
    },
    cancer: {
      name: "Cancer",
      dates: "Jun 21 - Jul 22", 
      symbol: "♋",
      element: "Water",
      ruling_planet: "Moon",
      today: {
        personal: "Family relationships and emotional security take center stage today. Your nurturing nature attracts others seeking comfort and guidance.",
        travel: "Home-based activities are more favored than distant travel today. Create a sanctuary within your own space.",
        money: "Emotional spending could be tempting. Focus on family financial security and investments that provide long-term stability.",
        career: "Trust your intuition in professional matters. Your ability to read people and situations gives you a significant advantage.",
        health: "Listen to your body's signals carefully. Your digestive system may be sensitive to stress and emotional fluctuations.",
        emotions: "Deep emotional currents flow today. Connect with family and close friends who understand your sensitive nature."
      },
      yesterday: {
        personal: "Yesterday's emotional experiences provided valuable insights into your relationships and family dynamics.",
        travel: "Previous plans may have been postponed, but this allowed for important family time and emotional processing.",
        money: "Financial decisions made yesterday were influenced by family considerations and long-term security needs.",
        career: "Workplace intuition proved accurate yesterday. Your emotional intelligence guided you well through professional challenges.",
        health: "Your body responded well to yesterday's nurturing self-care practices and attention to emotional needs.",
        emotions: "Emotional depths explored yesterday have led to greater self-understanding and family harmony."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for deeper family connections and emotional bonding with loved ones.",
        travel: "Home-related travel or visits from family members may feature prominently in tomorrow's plans.",
        money: "Financial opportunities related to home, family, or real estate may present themselves tomorrow.",
        career: "Your intuitive abilities will be particularly valuable in tomorrow's professional interactions and decisions.",
        health: "Tomorrow emphasizes emotional wellness and creating nurturing environments that support physical healing.",
        emotions: "Emotional clarity and family harmony increase significantly tomorrow through honest, caring communication."
      },
      weekly: {
        overview: "This week emphasizes emotional depth, family connections, and intuitive decision-making. Your nurturing leadership style creates positive environments wherever you go.",
        detailed: `What a beautifully enriching week awaits you, dear Cancer! The lunar energies are flowing in perfect harmony with your intuitive nature, creating opportunities for both emotional fulfillment and practical success.

The week begins with a powerful urge to strengthen your emotional foundations and reconnect with family members who matter most. Your intuitive abilities are remarkably sharp right now, making this an ideal time for important personal decisions. At work, colleagues and supervisors are drawn to your natural ability to create a warm, supportive team environment that brings out everyone's best.

By Tuesday, you'll find yourself applying your emotional intelligence to business and financial matters with remarkable success. Trust those gut feelings about investments, particularly anything related to home security or family wellbeing. Your nurturing approach to client relationships and team management leaves lasting positive impressions that open doors for future opportunities.

Mid-week brings a beautiful focus on honest emotional expression while maintaining your naturally diplomatic grace. Important heart-to-heart conversations with family members or cherished friends lead to deeper understanding and stronger bonds. Your gift for empathetic listening makes you everyone's trusted confidant.

Thursday channels your creative energies beautifully, especially in projects that enhance your home environment. Whether it's redecorating a special room, preparing an elaborate family meal, or simply creating more comfort and beauty in your personal space, your artistic touch transforms everything you touch.

Friday shines a spotlight on your nurturing leadership style in professional settings. Colleagues genuinely appreciate how you balance productivity with authentic care for everyone's wellbeing. New opportunities may emerge that perfectly combine career advancement with your family priorities.

The weekend wraps everything up perfectly with quality family time and activities that completely recharge your emotional batteries. Your home naturally becomes the gathering place where loved ones feel most comfortable, and your innate hosting abilities create those special memories that last a lifetime.`
      },
      monthly: {
        overview: "June emphasizes intuitive leadership, family bonding, and creating emotional security. Your natural wisdom guides important decisions about home, family, and long-term security.",
        detailed: `June is shaping up to be an absolutely magical month for you, sensitive Cancer! The universe seems to be orchestrating beautiful opportunities for both emotional fulfillment and practical success in ways that honor your deepest values.

The month opens with a powerful emphasis on creating emotional security and strengthening those precious family bonds that mean everything to you. Your intuitive abilities are remarkably heightened, providing crystal-clear guidance about important personal and professional decisions. Whether it's home improvement projects or intimate family gatherings, everything you touch brings lasting satisfaction and positive impact.

Your naturally nurturing presence attracts others who are seeking genuine guidance and comfort. This is a perfect time to establish yourself as a trusted advisor or mentor in your professional field. When it comes to financial decisions, your instincts strongly favor long-term security over quick profits – and this wisdom serves you beautifully.

Mid-month brings well-deserved recognition of your unique ability to combine professional competence with authentic care for others. Your leadership approach creates incredibly loyal teams and deeply satisfied clients. Advancement opportunities may require some careful balancing between career growth and family considerations, but your natural wisdom helps you find the perfect harmony.

The full moon during this period illuminates your path toward even greater emotional fulfillment and financial security. Trust those powerful instincts about major decisions, especially anything involving home investments or family wellbeing. Your intuition is remarkably accurate right now.

Your creative energies absolutely flourish during the third week, particularly in projects that enhance your home environment or support family happiness. Whether it's entertaining loved ones, redecorating cherished spaces, or simply creating more beauty and comfort in your personal sanctuary, your artistic touch transforms everything.

Relationships deepen beautifully through shared domestic activities and wonderfully honest emotional communication. Your gift for creating safe spaces where others can express their authentic feelings strengthens every connection in your life.

As June concludes, you'll find yourself integrating all the emotional lessons learned while making practical plans for enhanced family security. Your wisdom about balancing personal needs with family responsibilities guides important decisions about the future with remarkable clarity.

Use this powerful time to establish nurturing routines and supportive systems that honor both your career ambitions and your family's emotional needs. Your natural ability to care deeply while maintaining healthy boundaries creates the kind of lasting positive change that benefits everyone you love.`
      },
      yearly: {
        overview: "2025 brings deep emotional growth, family strengthening, and recognition of your unique nurturing leadership style. Your intuitive wisdom guides important decisions that create lasting security and happiness.",
        detailed: `Dear Cancer, 2025 is destined to be one of those remarkable years that transforms your life in the most beautiful and meaningful ways. The cosmic energies are aligning perfectly with your intuitive nature, creating opportunities for profound emotional growth and lasting happiness.

The year begins with an incredible awakening of your emotional awareness and crystal-clear intuitive guidance about your long-term direction. January focuses on strengthening those precious family bonds while creating the emotional security that supports your most ambitious goals. Your natural empathy becomes a magnet, attracting others who genuinely need your guidance and healing presence.

February brings remarkable clarity about balancing your personal dreams with family responsibilities. Professional opportunities may require thoughtful consideration of how they impact your loved ones, but your wisdom in making decisions that honor both ambition and family creates outcomes that satisfy your heart and your aspirations.

Spring emphasizes well-deserved recognition of your unique leadership style that beautifully combines professional competence with authentic care for others. March sees advancement opportunities that utilize your emotional intelligence as a strategic advantage, while April consolidates these gains while maintaining those strong family connections that ground you.

Home improvement projects or family celebrations bring deep joy and lasting satisfaction. Your gift for creating beautiful, nurturing environments attracts positive attention and may even open doors to related professional pursuits that perfectly align with your values.

Mid-year focuses on expanding your influence while deepening existing relationships in the most fulfilling ways. Your reputation as a trusted advisor and nurturing leader opens doors to opportunities that truly align with your values. May brings exciting possibilities for teaching, mentoring, or counseling roles that feed your soul.

June emphasizes the beautiful fruition of your earlier emotional and professional investments. Your patient, caring approach to building relationships pays remarkable dividends in both personal satisfaction and material success.

Summer represents your time of greatest influence and recognition. July brings the culmination of your nurturing efforts with both family harmony and professional success reaching beautiful peaks. Your ability to create safe, productive environments becomes highly valued and well-compensated in ways that honor your contributions.

August emphasizes enjoying the emotional and material fruits of your labor while maintaining the humility and grace that make you so beloved by everyone whose life you touch.

Autumn brings opportunities to transform your approach to balancing personal needs with care for others. September may require establishing stronger boundaries while maintaining your naturally giving nature. This apparent challenge actually strengthens your ability to help others more effectively than ever before.

October brings a renewed sense of purpose as you discover how your emotional gifts can create even greater positive impact in the world around you. Your influence expands in directions that feel both natural and deeply fulfilling.

As the year concludes, November and December focus on integration and legacy building. You're establishing systems and relationships that will continue nurturing others long into the future. Your reputation as someone who combines wisdom with compassion becomes a lasting gift to your community.

By year's end, you'll marvel at how much you've grown emotionally while creating the kind of security and happiness that benefits everyone you love. Your journey through 2025 proves that leading with love and intuition creates the most beautiful and lasting success.`
      }
    },
    taurus: {
      name: "Taurus",
      dates: "Apr 20 - May 20",
      symbol: "♉",
      element: "Earth",
      ruling_planet: "Venus",
      today: {
        personal: "Steady progress in relationships brings satisfaction. Your reliable nature attracts partners seeking stability and commitment.",
        travel: "Short local trips are favored over long-distance travel. Focus on comfortable, familiar destinations.",
        money: "Conservative financial strategies serve you well today. Review budgets and consider long-term savings goals.",
        career: "Your persistence and reliability earn recognition. Focus on practical solutions rather than rushed decisions.",
        health: "Your body craves routine and stability. Pay attention to throat and neck areas, maintain regular eating habits.",
        emotions: "Emotional security is your priority. Spend time with trusted friends and family for comfort."
      },
      yesterday: {
        personal: "Yesterday's relationship decisions were grounded in practical wisdom. Your patient approach paid off.",
        travel: "Previous travel plans may have been conservative, but this ensured comfort and safety.",
        money: "Financial choices made yesterday reflected your natural prudence and long-term thinking.",
        career: "Steady work efforts from yesterday continue building your professional reputation.",
        health: "Your body appreciated yesterday's consistent routines and healthy habits.",
        emotions: "Emotional stability from yesterday continues to provide a solid foundation for today."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities to deepen existing relationships through shared values and experiences.",
        travel: "Pleasant short trips or local adventures may present themselves tomorrow.",
        money: "Financial opportunities requiring patience and careful consideration arrive tomorrow.",
        career: "Steady professional progress continues tomorrow with recognition for your reliable contributions.",
        health: "Tomorrow favors maintaining established health routines that support your physical wellbeing.",
        emotions: "Emotional contentment grows tomorrow through simple pleasures and familiar comforts."
      },
      weekly: {
        overview: "This week emphasizes building lasting foundations in all areas of life. Your practical wisdom and patient approach create sustainable success.",
        detailed: `What a wonderfully grounding week lies ahead for you, steadfast Taurus! The universe is supporting your natural talent for creating lasting stability and beauty in everything you touch.

The week begins with perfect energy for establishing solid foundations for your most important goals. Your methodical approach to tasks doesn't go unnoticed – colleagues and supervisors are genuinely impressed by your thorough, reliable work style. In relationships, you'll find that building trust through consistent, dependable actions speaks much louder than grand romantic gestures. This is also an ideal time for financial planning and reviewing your investment strategies with your characteristic careful wisdom.

Tuesday brings a beautiful influence from Venus that enhances your appreciation for beauty and comfort. This is an absolutely perfect day for creative projects, home improvement, or any activity that brings aesthetic pleasure to your soul. Your natural eye for quality helps you make purchases that provide lasting value and deep satisfaction.

Mid-week flows with opportunities to share your practical wisdom with others who desperately need your grounded perspective. Your ability to provide stable solutions to complex problems makes you absolutely invaluable. Professional projects requiring patience and meticulous attention to detail benefit tremendously from your methodical approach.

Thursday strengthens existing relationships through shared values and beautiful mutual support. Financial opportunities may arise through partnerships or collaborative efforts that honor your conservative values. Your prudent approach to money management proves wise once again as steady growth becomes clearly apparent.

Friday allows your artistic and creative abilities to absolutely shine, bringing both recognition and deep personal fulfillment. Projects that combine beauty with functionality are particularly favored by the cosmic energies. All that patient effort you've invested throughout the week begins showing tangible, satisfying results.

The weekend emphasizes pure enjoyment of the fruits of your labor and spending quality time in comfortable, beautiful environments that restore your spirit. Your remarkable ability to create harmony and stability naturally attracts others who are seeking peace and grounding in their own lives.`
      },
      monthly: {
        overview: "April emphasizes building professional stability and material security. Your reliable nature attracts long-term opportunities and lasting success.",
        detailed: `April is shaping up to be an absolutely delightful month for you, practical Taurus! The spring energies are perfectly aligned with your earth sign nature, creating beautiful opportunities for both material growth and personal satisfaction.

The month opens with a wonderful focus on establishing financial security and professional stability that truly honors your methodical nature. Your practical approach to career decisions leads naturally to opportunities for steady advancement that feels both comfortable and rewarding. Home and family matters receive loving attention as you create even more comfortable living environments that reflect your exquisite taste.

Mid-month brings exciting opportunities to express your artistic nature while building stronger personal relationships that appreciate your authentic character. Your natural appreciation for beauty and quality guides important purchases or investments that provide lasting value. Professional projects combining creativity with practicality become particularly successful, showcasing your unique ability to blend aesthetics with functionality.

The third week sees your consistent efforts receiving well-deserved recognition and potentially material rewards that reflect your true worth. This is an absolutely excellent time for salary negotiations or seeking advancement based on your proven reliability and dedication. Relationships benefit enormously from your steady, nurturing approach that makes others feel genuinely secure and valued.

The month concludes beautifully with consolidation of all your gains and thoughtful planning for continued stability. Your patient approach to building both wealth and meaningful relationships creates the kind of lasting foundations that support future success in ways that feel completely natural to your grounded nature.

Throughout April, you'll discover that your conservative values and methodical approach aren't just old-fashioned wisdom – they're exactly what the world needs right now. Your ability to create beauty, stability, and lasting value becomes increasingly appreciated by everyone fortunate enough to be in your circle.`
      },
      yearly: {
        overview: "2025 brings steady material growth and deep relationship satisfaction for Taurus. Your patient, practical approach creates lasting security and happiness.",
        detailed: `Dear Taurus, 2025 is destined to be a year of beautiful, steady growth that perfectly honors your patient, practical nature while delivering the lasting rewards you've been working toward with such dedication.

Spring arrives with a wonderful focus on establishing solid financial foundations and stable career progress that feels both natural and rewarding. Your practical wisdom guides important decisions about investments, property, and long-term security with remarkable clarity. Relationships flourish under your reliable, nurturing nature as others increasingly appreciate your steady presence and authentic care.

The spring months see you making choices about investments and career moves that may seem conservative to others but prove to be brilliantly strategic as the year unfolds. Your ability to spot quality and lasting value over flashy trends becomes a significant financial advantage.

Summer emphasizes creative expression and building beautiful, comfortable environments that truly reflect your refined taste and love of quality. Your artistic abilities may become unexpected sources of income or recognition, validating your belief that beauty and functionality can coexist beautifully. Home and family receive special loving attention as you create lasting comfort and security that becomes a sanctuary for everyone you love.

During these warmer months, your talent for creating harmonious environments extends beyond your personal space into your professional life. Colleagues and clients are drawn to your ability to make everything feel more stable and beautiful.

Autumn brings material rewards for your patient efforts throughout the year, validating your methodical approach to success. Professional recognition and financial growth reflect your consistent, reliable contributions that others have come to depend upon. Relationships reach new levels of stability and mutual satisfaction as your steady approach to love and friendship proves its lasting value.

This is when all those careful investments – financial, professional, and personal – begin showing their true worth. Your patience with building slowly and sustainably pays off in ways that create genuine security and happiness.

Winter focuses on appreciating your achievements while thoughtfully planning for continued growth that honors your values. Your conservative approach to money and relationships proves wise as you build lasting foundations that support future prosperity without compromising your integrity or peace of mind.

By year's end, you'll see clearly how your commitment to quality, stability, and authentic relationships has created a life of genuine abundance that satisfies both your practical needs and your aesthetic soul. Your journey through 2025 demonstrates that true success comes from staying true to your values while patiently building something beautiful and lasting.`
      }
    },
    gemini: {
      name: "Gemini",
      dates: "May 21 - Jun 20",
      symbol: "♊",
      element: "Air",
      ruling_planet: "Mercury",
      today: {
        personal: "Communication flows freely in relationships today. Your wit and charm attract interesting conversations and potential romantic connections.",
        travel: "Short trips and multiple destinations appeal to your restless nature. Local adventures and spontaneous journeys are favored.",
        money: "Quick thinking leads to financial opportunities. Stay alert for information that could benefit your investments or income.",
        career: "Your networking abilities shine today. Multiple projects may demand attention - use your multitasking skills wisely.",
        health: "Mental stimulation is essential. Balance intellectual pursuits with physical movement, especially for hands and arms.",
        emotions: "Your mood fluctuates naturally today. Embrace this duality as it helps you understand different perspectives."
      },
      yesterday: {
        personal: "Yesterday's communications laid groundwork for today's relationship developments. Your intellectual approach was appreciated.",
        travel: "Previous short journeys or local activities provided mental stimulation and new information.",
        money: "Financial decisions made yesterday were influenced by research and multiple sources of information.",
        career: "Networking efforts from yesterday begin showing results in new opportunities and connections.",
        health: "Your mind was particularly active yesterday - today focus on balancing mental with physical activity.",
        emotions: "Emotional variety from yesterday provided valuable insights into your complex nature."
      },
      tomorrow: {
        personal: "Tomorrow brings exciting intellectual connections and stimulating conversations that could lead to romantic opportunities.",
        travel: "Multiple short trips or diverse activities may fill tomorrow's schedule with variety and interest.",
        money: "Financial information gathered tomorrow could lead to profitable short-term opportunities.",
        career: "Your communication skills will be in high demand tomorrow - prepare for important meetings or presentations.",
        health: "Tomorrow emphasizes hand, arm, and respiratory health through varied physical activities.",
        emotions: "Emotional versatility serves you well tomorrow in navigating complex social situations."
      },
      weekly: {
        overview: "This week emphasizes communication, learning, and networking. Your natural versatility opens multiple doors to new opportunities and connections.",
        detailed: `What an absolutely exhilarating week awaits you, brilliant Gemini! Your natural versatility and curiosity are about to open multiple doors to exciting new opportunities and fascinating connections.

The week begins with perfect energy for connecting with diverse groups of people and gathering information from multiple sources that feed your insatiable curiosity. Your quick wit and genuine interest in others leads to discoveries that benefit both your personal happiness and professional goals. Important conversations may spark new ideas or opportunities that you hadn't even considered before.

Tuesday showcases your communication skills at their absolute peak. Important presentations, negotiations, or social interactions flow with remarkable smoothness and success. Your ability to adapt quickly to changing situations genuinely impresses others and opens new doors that seemed impossible just days ago. Your mental agility becomes your greatest asset.

Mid-week brings wonderful chances to both learn fascinating new things and share your knowledge with others who genuinely appreciate your insights. Your intellectual gifts are recognized and celebrated by people who matter. Writing, speaking, or teaching activities are particularly favored and may lead to unexpected opportunities that align perfectly with your varied interests.

Thursday highlights your social butterfly nature as you attract interesting people and collaborative opportunities that stimulate your mind. Group projects or team efforts benefit enormously from your ability to communicate diverse viewpoints and find common ground among different personalities. Your networking skills become absolutely invaluable.

Friday beautifully combines your verbal abilities with creative expression in ways that feel natural and fulfilling. Writing, speaking, or artistic projects involving communication become highly successful. Your wit and charm make you incredibly popular in social settings, and you'll find yourself at the center of attention in the most delightful ways.

The weekend offers perfect opportunities to integrate all the week's diverse experiences while enjoying variety in activities and social connections. Your restless nature finds deep satisfaction in pursuing multiple interests and connecting with different groups of people who each appreciate a different facet of your multifaceted personality.`
      },
      monthly: {
        overview: "May brings expanded communication opportunities and intellectual growth. Your natural curiosity and networking abilities create diverse opportunities for advancement.",
        detailed: `May is shaping up to be an absolutely fascinating month for you, quick-witted Gemini! Your natural curiosity and networking abilities are creating diverse opportunities for advancement in ways that keep life exciting and mentally stimulating.

The month opens with remarkably heightened mental activity and information gathering from diverse sources that feed your intellectual appetite. Your communication skills are attracting attention from important people who may offer opportunities for growth or advancement. Your ability to connect seemingly unrelated ideas becomes a valuable professional asset.

The connections you make early in the month have a ripple effect that continues growing throughout May. Your genuine interest in others and your gift for making people feel heard creates a network of supporters and collaborators who genuinely want to help you succeed.

Mid-month emphasizes both learning new skills that challenge your mind and sharing your knowledge with others who appreciate your unique perspective. Writing, speaking, or educational activities may become unexpected sources of income or recognition. Your intellectual versatility is particularly valued in professional settings where others struggle with complex, multifaceted challenges.

Your social network expands significantly during the third week as your charm and wit attract diverse, interesting people who bring fresh perspectives to your life. Creative projects involving communication or collaboration show promising results and may lead to lasting opportunities that perfectly match your varied interests.

The month concludes with beautiful integration of diverse experiences and strategic planning for continued intellectual growth. Your remarkable ability to synthesize information from multiple sources guides important decisions about future directions that honor both your need for variety and your professional ambitions.

Throughout May, you'll discover that your natural curiosity isn't just a personality trait – it's a professional superpower that opens doors others don't even know exist. Your gift for communication and your ability to see connections others miss become increasingly valuable in a world that needs exactly your type of flexible, intelligent problem-solving.`
      },
      yearly: {
        overview: "2025 emphasizes intellectual expansion and communication mastery for Gemini. Your versatility and curiosity lead to diverse opportunities and exciting connections.",
        detailed: `Dear Gemini, 2025 is destined to be an absolutely thrilling year that perfectly matches your need for intellectual stimulation, variety, and meaningful connections. Your versatility and curiosity are about to lead you into diverse opportunities that keep life exciting and constantly evolving.

The year begins with explosive growth in communication skills and intellectual pursuits that open doors you never imagined possible. Your insatiable curiosity leads to diverse learning opportunities that become valuable career assets. Every new skill you acquire seems to connect with others in unexpected ways, creating a web of expertise that makes you incredibly valuable in multiple fields.

Spring brings networking efforts that create lasting professional and personal connections with fascinating people who appreciate your quick mind and genuine interest in their stories. Your ability to see patterns and connections others miss becomes increasingly recognized as a strategic advantage in professional settings.

Summer emphasizes expanded social circles and opportunities for creative communication that feel both fulfilling and profitable. Writing, speaking, or media work may feature prominently in your professional life. Your remarkable ability to connect diverse groups of people becomes a valuable skill that opens doors in unexpected directions.

During these warmer months, your natural versatility allows you to pursue multiple interests simultaneously without feeling scattered. Instead, you discover how different areas of knowledge and experience complement each other in beautiful, synergistic ways.

Autumn brings intellectual mastery and communication leadership in areas that truly interest you. Your quick learning ability and talent for explaining complex ideas in accessible ways make you a sought-after teacher, consultant, or collaborator. This is when all your varied interests and skills begin forming a cohesive professional identity that honors your multifaceted nature.

Your reputation for being both intellectually rigorous and genuinely personable creates opportunities to bridge different worlds – bringing together people, ideas, and resources in ways that create value for everyone involved.

Winter focuses on integration and strategic planning for continued intellectual growth and meaningful connection. Your ability to synthesize information from multiple sources guides important strategic decisions that shape your future in exciting directions. You're not just accumulating knowledge and connections – you're creating something entirely new from the combination.

By year's end, you'll see clearly how your natural curiosity, communication gifts, and ability to adapt quickly have created a life rich with intellectual stimulation and meaningful relationships. Your journey through 2025 proves that embracing your multifaceted nature leads to success that's both financially rewarding and personally fulfilling.`
      }
    },
    leo: {
      name: "Leo",
      dates: "Jul 23 - Aug 22",
      symbol: "♌",
      element: "Fire",
      ruling_planet: "Sun",
      today: {
        personal: "Your charisma and confidence shine brightly today, attracting positive attention in social and romantic settings.",
        travel: "Travel plans may take a backseat to social engagements. Enjoy the company of friends and loved ones.",
        money: "Financially, it's a day to focus on income-generating activities. Your creativity could lead to a profitable idea.",
        career: "At work, your leadership qualities are recognized. It's a good day to take charge of a project or propose new ideas.",
        health: "Your vitality is high, but remember to balance your energetic pursuits with moments of rest.",
        emotions: "Emotionally, you're in a good place. Your optimistic outlook is contagious, uplifting those around you."
      },
      yesterday: {
        personal: "Yesterday's interactions may have sparked new romantic interests or deepened existing relationships.",
        travel: "Any travel plans were likely enjoyable and filled with positive experiences.",
        money: "Financially, yesterday was stable. Your careful planning is paying off.",
        career: "Professional recognition may have come your way, boosting your confidence and motivating you to aim higher.",
        health: "Your health routine is benefiting from your recent commitment to self-care and fitness.",
        emotions: "Emotionally, you're riding high on the positive feedback and experiences from yesterday."
      },
      tomorrow: {
        personal: "Tomorrow holds the potential for exciting social or romantic opportunities. Be open to invitations and new connections.",
        travel: "Travel could be more prominent in tomorrow's agenda, possibly a short trip or an outing.",
        money: "Financially, tomorrow looks promising. Opportunities to increase your income or make beneficial investments may arise.",
        career: "At work, your ideas will gain traction. It's a favorable time for presentations or pitching new projects.",
        health: "Maintain your health regimen, as your physical well-being is closely tied to your energy levels and mood.",
        emotions: "Emotionally, you're in for a treat. Positive interactions and experiences are on the horizon."
      },
      weekly: {
        overview: "This week is all about embracing your inner strength and leadership qualities. Your natural charisma and confidence will open doors in both personal and professional realms.",
        detailed: `What a magnificently empowering week awaits you, radiant Leo! The universe is conspiring to highlight your natural strength and leadership qualities, opening doors in both personal and professional realms that honor your authentic brilliance.

The week begins with perfect energy for taking charge of your personal and professional life with the confident grace that's uniquely yours. Your confidence becomes your greatest asset, and you'll find that showcasing your talents and taking the lead feels both natural and deeply satisfying. Others are drawn to your authentic charisma and genuine leadership abilities.

Tuesday brings a beautiful spotlight on your creative side, encouraging you to express your artistic nature in ways that bring both joy and recognition. Romance receives a cosmic boost as your natural charm is heightened, making this an absolutely perfect day for dates, social outings, or simply connecting with people who appreciate your warm, generous spirit.

Mid-week brings wonderful opportunities for professional recognition that you've truly earned through your hard work and dedication. Those in positions of power finally notice and appreciate your contributions. Your networking abilities shine as you connect with colleagues or industry peers who recognize your potential and want to support your success.

Thursday focuses beautifully on personal growth and learning experiences that expand your knowledge and skills in directions that genuinely interest you. Whether through formal courses or self-directed exploration, you're embracing new experiences that challenge you in exactly the right ways and help you grow into an even more impressive version of yourself.

Friday prioritizes social connections and pure fun as the week winds down in the most delightful way. Spending time with friends or loved ones who truly appreciate your vibrant personality brings deep satisfaction. Your social life is absolutely highlighted, and engaging in activities that bring you joy feels both necessary and deeply nourishing.

The weekend offers perfect time for reflection on the week's achievements and planning for future success. You'll find yourself considering what you've learned and how to apply these insights moving forward. Setting aside time for relaxation and recharging your energy prepares you to shine even brighter in the week ahead.`
      },
      monthly: {
        overview: "July is a month of personal growth, creativity, and social connections for Leo. Your natural leadership qualities will shine, attracting positive attention and opportunities.",
        detailed: `July is absolutely destined to be your month to shine, magnificent Leo! Your natural leadership qualities are about to receive the cosmic spotlight, attracting positive attention and opportunities that perfectly align with your generous, creative spirit.

The month opens with a remarkable boost in your confidence, both personally and professionally, that feels completely natural and well-deserved. This is an excellent time to take on new challenges that have been calling to you and to assert your leadership qualities in situations where others genuinely need your guidance. People will be remarkably receptive to your ideas and direction because your authentic confidence is absolutely magnetic.

Your presence during these early July days has a transformative effect on group dynamics. Whether in professional meetings or personal gatherings, you naturally become the person others look to for inspiration and direction. Your ability to see the bigger picture while encouraging everyone's individual contributions creates an atmosphere where amazing things happen.

Mid-month emphasizes creativity and self-expression in ways that feel both personally fulfilling and professionally valuable. This is your time to showcase your unique talents and let your authentic personality shine through everything you do. In personal relationships, your natural ability to express affection and appreciation deepens bonds with those who matter most to you.

Your creative projects during this period have a special spark that others immediately recognize and appreciate. Whether it's artistic pursuits, innovative problem-solving at work, or simply bringing more beauty and joy into everyday situations, your touch makes everything better.

The third week brings well-deserved recognition for your hard work and achievements that validates everything you've been working toward. Be genuinely open to accepting praise and rewards – your Leo heart needs this acknowledgment to fuel even greater accomplishments. This is also a perfect time to evaluate your goals and consider any adjustments needed to align even more closely with your true desires and values.

As July draws to a close, take time to reflect on the month's experiences with gratitude and excitement for what's ahead. Consider what you've learned about your own capabilities and how you've grown in confidence and leadership. Use these insights to set intentions for the coming month that honor both your ambitious nature and your need for authentic self-expression.

Throughout July, you'll discover that your natural warmth and leadership abilities aren't just personality traits – they're gifts that the world genuinely needs. Your ability to inspire others while staying true to your authentic self becomes increasingly valuable in every area of your life.`
      },
      yearly: {
        overview: "2025 is a year of recognition, personal growth, and creative expression for Leo. Your natural leadership abilities will shine, attracting positive attention and opportunities for advancement.",
        detailed: `Dear Leo, 2025 is destined to be your year of magnificent recognition, personal growth, and creative expression that showcases your natural leadership abilities in ways that attract positive attention and advancement opportunities from every direction.

The year begins with exciting opportunities for growth and expansion that feel like the universe finally recognizing your true potential. Your past efforts start bearing beautiful fruit, leading to increased recognition and rewards that validate everything you've been working toward. This is an absolutely favorable time for both personal and professional development that honors your need to shine while contributing meaningfully to the world.

Spring brings a wonderful focus on stepping into leadership roles that feel completely natural and deeply satisfying. Your ability to inspire and motivate others becomes increasingly highlighted as colleagues, friends, and even strangers find themselves drawn to your authentic confidence and generous spirit. You'll discover that leading with both strength and heart creates the kind of positive impact you've always dreamed of making.

During these spring months, creative projects take on special significance as you find ways to express your unique vision through various mediums. Whether it's artistic pursuits, innovative workplace solutions, or simply bringing more joy and beauty into everyday interactions, your creative touch transforms everything it encounters.

Summer emphasizes creative expression and leadership in ways that feel both personally fulfilling and professionally rewarding. Your natural charisma reaches new heights as you step confidently into roles that showcase your talents and allow you to lead with genuine heart. Others are genuinely inspired by your combination of strength and warmth, creating opportunities for advancement that honor your authentic leadership style.

This is when all your creative efforts and leadership experiences begin forming a cohesive professional identity that perfectly balances your need for recognition with your desire to make a positive difference. Your reputation for being both competent and genuinely caring opens doors that lead to exactly the kind of success that feeds your soul.

Autumn brings time for reflection and strategic planning that helps you integrate all the lessons learned throughout your growth journey. You'll find yourself considering not just what you've accomplished, but how you want to use your expanded influence and recognition to create even greater positive impact. This period of thoughtful planning sets the stage for continued success that aligns with your highest values.

Winter concludes the year with consolidation of your achievements and excited preparation for continued accomplishments ahead. You'll spend time reviewing your goals and accomplishments with well-deserved pride, making any necessary adjustments to your plans that honor both your ambitious nature and your generous heart.

By year's end, you'll see clearly how your natural leadership abilities, creative talents, and genuine warmth have created a life where you're not just successful – you're genuinely respected and loved for who you authentically are. Your journey through 2025 proves that leading with both confidence and compassion creates the kind of lasting success that inspires others to follow their own dreams.`
      }
    },
    virgo: {
      name: "Virgo",
      dates: "Aug 23 - Sep 22",
      symbol: "♍",
      element: "Earth",
      ruling_planet: "Mercury",
      today: {
        personal: "Today is about finding balance and harmony in your relationships. Your attention to detail and practical approach are appreciated by loved ones.",
        travel: "Travel plans may require careful consideration and planning. Focus on destinations that offer both relaxation and intellectual stimulation.",
        money: "Financially, it's a day to focus on budgeting and practical investments. Avoid impulsive purchases.",
        career: "At work, your analytical skills shine. It's a good day for problem-solving and improving existing processes.",
        health: "Pay attention to your digestive health today. Consider incorporating more whole foods and fiber into your diet.",
        emotions: "Emotionally, you're in a reflective mood. Take time to journal or engage in activities that promote self-discovery."
      },
      yesterday: {
        personal: "Yesterday's focus on self-improvement and productivity laid a strong foundation for personal and professional growth.",
        travel: "Any travel undertaken was likely beneficial, providing new perspectives and experiences.",
        money: "Financially, yesterday was stable. Your careful planning and attention to detail are paying off.",
        career: "Professional relationships may have strengthened, and your contributions recognized and valued.",
        health: "Your health routine is benefiting from your recent commitment to self-care and balanced living.",
        emotions: "Emotionally, you're feeling more grounded and secure, thanks to yesterday's positive experiences."
      },
      tomorrow: {
        personal: "Tomorrow holds the potential for meaningful conversations and connections. Be open to sharing your thoughts and feelings.",
        travel: "Travel could be more prominent in tomorrow's agenda, possibly a short trip or an outing that stimulates your mind.",
        money: "Financially, tomorrow looks promising. Opportunities to increase your income or make beneficial investments may arise.",
        career: "At work, your ideas will gain traction. It's a favorable time for presentations or pitching new projects.",
        health: "Maintain your health regimen, as your physical well-being is closely tied to your energy levels and mood.",
        emotions: "Emotionally, you're in for a treat. Positive interactions and experiences are on the horizon."
      },
      weekly: {
        overview: "This week is all about embracing your analytical skills and attention to detail. Your ability to organize, plan, and execute will lead to success in both personal and professional realms.",
        detailed: `What a wonderfully productive week lies ahead for you, meticulous Virgo! The universe is perfectly aligned to support your analytical skills and attention to detail, leading to success in both personal and professional realms that truly honors your methodical nature.

The week begins with ideal energy for organizing your tasks and planning your schedule with the precision that brings you such satisfaction. Your remarkable attention to detail becomes your greatest asset, allowing you to create order out of chaos in ways that benefit everyone around you. Whether at work or in your personal life, your gift for seeing what needs improvement and implementing practical solutions makes you absolutely invaluable.

Tuesday brings perfect opportunities for reaching out to colleagues or friends with your characteristic thoughtfulness and genuine care. Your communication skills are remarkably sharp, making it effortless to connect and collaborate in meaningful ways. Consider attending networking events or engaging in group activities where your analytical perspective and helpful nature can shine.

Mid-week offers exciting opportunities to solve complex problems or improve existing processes that have been challenging others. Your analytical mind absolutely thrives on challenges that require innovative yet practical solutions. You'll find that your ability to break down complicated issues into manageable steps not only solves problems but also teaches others more effective approaches.

Thursday focuses beautifully on personal growth and learning experiences that expand your knowledge in directions that genuinely interest you. Whether through formal courses or self-directed exploration, you're embracing new experiences that challenge your mind while building skills that enhance your natural abilities.

Friday prioritizes social connections and well-deserved fun as the week winds down. Spending time with friends or loved ones who appreciate your thoughtful nature brings deep satisfaction. Your social life receives cosmic support, and engaging in activities that bring you joy feels both restorative and necessary for your overall wellbeing.

The weekend provides perfect opportunities for reflection on the week's accomplishments and planning for future success with your characteristic thoroughness. You'll find yourself considering what you've learned and how to apply these insights in practical ways that create lasting positive change.`
      },
      monthly: {
        overview: "August is a month of personal growth, creativity, and social connections for Virgo. Your natural analytical abilities will shine, attracting positive attention and opportunities.",
        detailed: `August is shaping up to be an absolutely transformative month for you, analytical Virgo! Your natural abilities for organization, problem-solving, and genuine helpfulness are about to receive the recognition and opportunities they truly deserve.

The month opens with a remarkable boost in your confidence, both personally and professionally, that feels completely earned through your consistent dedication to excellence. This is an ideal time to take on new challenges that showcase your analytical skills and your gift for creating practical solutions to complex problems. Others are finally recognizing that your methodical approach isn't just helpful – it's absolutely essential for lasting success.

Your presence during early August has a calming, organizing effect on everyone around you. Whether in professional meetings or personal gatherings, you naturally become the person others turn to when they need thoughtful analysis and practical guidance that actually works.

Mid-month emphasizes creativity and self-expression in ways that feel both personally fulfilling and professionally valuable. Your ability to combine artistic sensibility with practical application creates solutions that are not only effective but also genuinely beautiful. In personal relationships, your thoughtful way of expressing affection and appreciation deepens bonds with those who truly value your caring nature.

Your creative projects during this period have a special quality of usefulness combined with elegance that others immediately appreciate. Whether it's improving workplace systems, organizing community events, or simply making everyday life more beautiful and functional, your touch improves everything.

The third week brings well-deserved recognition for your hard work and achievements that validates your patient, methodical approach to success. Be genuinely open to accepting praise and rewards – your Virgo modesty is charming, but you deserve this acknowledgment. This is also a perfect time to evaluate your goals and consider any adjustments needed to align even more closely with your values and desire to be genuinely helpful.

As August concludes, take time to reflect on the month's experiences with your characteristic thoughtfulness and attention to meaningful detail. Consider what you've learned about your own capabilities and how you've grown in confidence while maintaining your authentic humility. Use these insights to plan for the future in ways that honor both your need for purposeful work and your desire to make a positive difference.

Throughout August, you'll discover that your natural analytical abilities and genuine desire to help others aren't just personality traits – they're exactly what the world needs. Your ability to see what needs improvement and create practical, beautiful solutions becomes increasingly valuable in every area of your life.`
      },
      yearly: {
        overview: "2025 is a year of recognition, personal growth, and creative expression for Virgo. Your natural analytical abilities will shine, attracting positive attention and opportunities for advancement.",
        detailed: `Dear Virgo, 2025 is destined to be your year of well-deserved recognition, meaningful personal growth, and the kind of practical success that comes from combining analytical excellence with genuine service to others.

The year begins with exciting opportunities for growth and expansion that perfectly honor your methodical approach to improvement. Your past efforts at creating better systems, solving problems, and helping others start bearing beautiful fruit, leading to increased recognition and rewards that validate your patient, thoughtful work style. This is an absolutely favorable time for both personal and professional development that allows you to contribute meaningfully while advancing your own goals.

Spring brings wonderful opportunities to step into advisory and organizational roles that feel completely natural to your analytical nature. Your ability to see what needs improvement and create practical solutions becomes increasingly highlighted as colleagues, friends, and community members recognize your unique gift for making everything work better.

During these spring months, your detailed approach to projects yields exceptional results that others finally recognize as invaluable. Whether it's workplace efficiency, community organization, or simply helping friends navigate complex decisions, your methodical wisdom becomes sought-after guidance.

Summer emphasizes creative expression and stepping into leadership roles that honor your preference for leading through service and expertise rather than ego. Your ability to inspire others through practical example and genuine helpfulness creates the kind of positive impact that feels deeply satisfying to your service-oriented heart.

This is when all your efforts at self-improvement and skill development begin forming a cohesive professional identity that perfectly balances your need for meaningful work with your desire to make a genuine difference. Your reputation for being both highly competent and genuinely caring opens doors to opportunities that feed your soul while advancing your career.

Autumn brings time for reflection and strategic planning that helps you integrate all the lessons learned throughout your growth journey. You'll find yourself considering not just what you've accomplished, but how you want to use your expanded skills and recognition to create even more positive impact in areas that truly matter to you.

Winter concludes the year with consolidation of your achievements and excited preparation for continued growth that aligns with your values. You'll spend time reviewing your goals and accomplishments with characteristic thoroughness, making any necessary adjustments to your plans that honor both your practical nature and your desire to be genuinely useful.

By year's end, you'll see clearly how your natural analytical abilities, attention to detail, and genuine desire to help have created a life where you're not just successful – you're making a real difference in ways that feel deeply meaningful. Your journey through 2025 proves that combining excellence with service creates the kind of lasting success that truly matters.`
      }
    },
    libra: {
      name: "Libra",
      dates: "Sep 23 - Oct 22",
      symbol: "♎",
      element: "Air",
      ruling_planet: "Venus",
      today: {
        personal: "Today is about finding balance and harmony in your relationships. Your diplomatic skills are highlighted, making it easy to resolve any conflicts.",
        travel: "Travel plans may require careful consideration and planning. Focus on destinations that offer both relaxation and cultural enrichment.",
        money: "Financially, it's a day to focus on budgeting and practical investments. Avoid impulsive purchases.",
        career: "At work, your collaborative skills shine. It's a good day for team projects and building professional relationships.",
        health: "Pay attention to your kidney and lower back health today. Consider incorporating more water and gentle exercises into your routine.",
        emotions: "Emotionally, you're in a reflective mood. Take time to journal or engage in activities that promote self-discovery."
      },
      yesterday: {
        personal: "Yesterday's focus on self-improvement and productivity laid a strong foundation for personal and professional growth.",
        travel: "Any travel undertaken was likely beneficial, providing new perspectives and experiences.",
        money: "Financially, yesterday was stable. Your careful planning and attention to detail are paying off.",
        career: "Professional relationships may have strengthened, and your contributions recognized and valued.",
        health: "Your health routine is benefiting from your recent commitment to self-care and balanced living.",
        emotions: "Emotionally, you're feeling more grounded and secure, thanks to yesterday's positive experiences."
      },
      tomorrow: {
        personal: "Tomorrow holds the potential for meaningful conversations and connections. Be open to sharing your thoughts and feelings.",
        travel: "Travel could be more prominent in tomorrow's agenda, possibly a short trip or an outing that stimulates your mind.",
        money: "Financially, tomorrow looks promising. Opportunities to increase your income or make beneficial investments may arise.",
        career: "At work, your ideas will gain traction. It's a favorable time for presentations or pitching new projects.",
        health: "Maintain your health regimen, as your physical well-being is closely tied to your energy levels and mood.",
        emotions: "Emotionally, you're in for a treat. Positive interactions and experiences are on the horizon."
      },
      weekly: {
        overview: "This week is all about embracing your diplomatic skills and ability to find balance. Your natural charm and social skills will open doors in both personal and professional realms.",
        detailed: `What a beautifully balanced week awaits you, harmonious Libra! The universe is aligning to support your natural gifts for creating harmony, beauty, and meaningful connections in ways that feel both personally fulfilling and professionally rewarding.

The week begins with perfect energy for focusing on your relationships and using your remarkable diplomatic skills to strengthen both personal and professional bonds. Your natural ability to see all sides of a situation and find fair solutions makes you absolutely invaluable in resolving conflicts and creating lasting harmony.

Tuesday brings wonderful opportunities for expressing your creative side and letting your imagination flourish in beautiful ways. In romance, your natural charm is absolutely heightened, making this an excellent day for dates, social outings, or simply connecting with people who appreciate your refined sensibilities.

Mid-week emphasizes professional recognition as your hard work and dedication finally receive the acknowledgment they deserve. Your graceful approach to challenges and your ability to maintain elegant relationships under pressure catch the attention of important people. This is also perfect for networking and connecting with colleagues or industry peers who appreciate your diplomatic talents.

Thursday focuses beautifully on personal growth and learning experiences that expand your knowledge in areas that genuinely interest you. Whether through formal courses or self-directed exploration, you're embracing new experiences that challenge you while honoring your need for balance and beauty.

Friday prioritizes social connections and well-deserved fun as the week concludes in the most delightful way. Spending time with friends or loved ones who appreciate your thoughtful nature brings deep satisfaction. Your social life receives cosmic support, and engaging in activities that bring joy feels both restorative and absolutely essential.

The weekend provides perfect opportunities for reflection on the week's accomplishments and planning for future success in environments that please your aesthetic sensibilities and restore your natural sense of balance and harmony.`
      },
      monthly: {
        overview: "September is a month of personal growth, creativity, and social connections for Libra. Your natural diplomatic abilities will shine, attracting positive attention and opportunities.",
        detailed: `September is shaping up to be an absolutely delightful month for you, charming Libra! Your natural diplomatic abilities and appreciation for beauty and balance are about to receive the cosmic spotlight in ways that bring both personal satisfaction and professional advancement.

The month opens with a wonderful boost in your confidence, both personally and professionally, that feels completely natural and well-deserved. This is an excellent time to take on new challenges and showcase your diplomatic skills in resolving conflicts and creating harmony wherever you go. Your ability to see all sides of a situation and find fair solutions makes you incredibly valuable.

Mid-month emphasizes creativity and self-expression in ways that feel both personally fulfilling and professionally beneficial. Your natural eye for beauty and your refined aesthetic sense guide you toward opportunities that combine artistry with practical success. In personal relationships, your graceful way of expressing affection and appreciation creates deeper, more meaningful bonds.

The third week brings well-deserved recognition for your hard work and achievements, particularly your unique ability to maintain elegance and fairness under pressure. Be genuinely open to accepting praise and rewards – your Libra nature appreciates acknowledgment when it's sincere and earned.

As September concludes, take time to reflect on the month's experiences with your characteristic thoughtfulness and desire for balance. Consider what you've learned about your own capabilities and how you've grown in both confidence and wisdom. Use these insights to plan for the future in ways that honor both your need for harmony and your ambitious goals.

Throughout September, you'll discover that your diplomatic nature and aesthetic sensibilities aren't just personality traits – they're valuable professional assets that create opportunities for success that feels both meaningful and beautiful.`
      },
      yearly: {
        overview: "2025 is a year of recognition, personal growth, and creative expression for Libra. Your natural diplomatic abilities will shine, attracting positive attention and opportunities for advancement.",
        detailed: `Dear Libra, 2025 is destined to be your year of beautiful recognition, harmonious relationships, and the kind of balanced success that honors both your aesthetic sensibilities and your genuine desire for fairness and justice.

The year begins with exciting opportunities for growth and expansion that perfectly align with your diplomatic nature and appreciation for beauty. Your past efforts at creating harmony, resolving conflicts, and building bridges between different people and perspectives start bearing wonderful fruit, leading to recognition and rewards that feel both earned and graceful.

Spring brings remarkable opportunities to step into roles where your diplomatic skills and natural sense of fairness become your greatest professional assets. Your ability to create win-win solutions and maintain elegant relationships under pressure becomes increasingly valued as colleagues, clients, and community members recognize your unique gift for bringing out the best in everyone.

During these spring months, your refined aesthetic sense opens doors to opportunities that combine beauty with purpose. Whether it's design projects, relationship counseling, or simply creating more harmonious work environments, your touch makes everything more beautiful and functional.

Summer emphasizes creative expression and stepping into leadership roles that honor your preference for collaboration over domination. Your ability to inspire others through your example of grace under pressure and your commitment to fairness creates the kind of positive impact that feels deeply satisfying to your justice-loving heart.

This is when all your efforts at building relationships and creating beauty begin forming a cohesive professional identity that perfectly balances your need for aesthetic fulfillment with your desire to make a genuine difference.

Autumn brings time for reflection and strategic planning that helps you integrate all the lessons learned about balancing competing interests and creating lasting harmony. You'll find yourself considering not just what you've accomplished, but how you want to use your expanded influence to create even more beauty and justice in the world.

Winter concludes the year with consolidation of your achievements and excited preparation for continued growth that aligns with your highest values. You'll spend time reviewing your goals with characteristic fairness to yourself, making adjustments that honor both your ambitious nature and your deep need for balance and beauty.

By year's end, you'll see clearly how your natural diplomatic abilities, aesthetic sense, and commitment to fairness have created a life where success feels beautiful, relationships are harmonious, and your contributions make the world a more balanced and just place.`
      }
    },
    scorpio: {
      name: "Scorpio",
      dates: "Oct 23 - Nov 21",
      symbol: "♏",
      element: "Water",
      ruling_planet: "Pluto",
      today: {
        personal: "Emotional intensity marks your interactions today. You may find yourself drawn to deep, meaningful conversations.",
        travel: "Travel plans could be transformative, offering new perspectives and experiences. Consider destinations that promote healing and self-discovery.",
        money: "Financially, it's a day to focus on long-term investments and savings. Avoid impulsive purchases.",
        career: "At work, your determination and focus are your greatest assets. It's a good day to tackle challenging projects or propose innovative ideas.",
        health: "Pay attention to your reproductive and urinary health today. Consider incorporating more water and gentle exercises into your routine.",
        emotions: "Emotionally, you're in a reflective mood. Take time to journal or engage in activities that promote self-discovery."
      },
      yesterday: {
        personal: "Yesterday's focus on self-improvement and productivity laid a strong foundation for personal and professional growth.",
        travel: "Any travel undertaken was likely beneficial, providing new perspectives and experiences.",
        money: "Financially, yesterday was stable. Your careful planning and attention to detail paid off.",
        career: "Work yesterday involved creative projects and collaborative efforts that strengthened professional relationships.",
        health: "Your health yesterday benefited from rest and relaxation. You listened to your body's needs effectively.",
        emotions: "Emotionally, yesterday brought clarity and inner peace. Meditation and reflection served you well."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for emotional connection and spiritual growth. Your intuitive gifts will guide you.",
        travel: "Travel plans for tomorrow should focus on peaceful, scenic destinations that nurture your soul.",
        money: "Financial intuition will be strong tomorrow. Trust your instincts when making monetary decisions.",
        career: "Creative projects and helping others will be highlighted in tomorrow's work activities.",
        health: "Tomorrow focuses on detoxification and regeneration. Consider activities that help cleanse and renew your energy.",
        emotions: "Emotional depth increases tomorrow. Use this intensity for therapeutic work and deep personal transformation."
      },
      weekly: {
        overview: "This week emphasizes transformation, deep emotional healing, and powerful insights for Scorpio. Your intensity and investigative nature lead to breakthrough discoveries.",
        detailed: `What an intensely powerful week awaits you, transformative Scorpio! The cosmic energies are aligning to support your natural gifts for deep investigation, emotional mastery, and profound transformation in ways that feel both empowering and deeply meaningful.

Early in the week, your investigative focus becomes your greatest asset as you dive beneath surface appearances to uncover hidden truths and opportunities that others completely miss. Your ability to see what's really happening beneath the superficial layers gives you a significant advantage in both personal and professional situations.

Mid-week brings beautiful opportunities for transformation and healing, both for yourself and others who benefit from your remarkable depth and emotional wisdom. Your natural ability to help others navigate their deepest challenges while maintaining your own strength becomes a source of genuine satisfaction and possibly professional opportunity.

The weekend emphasizes your personal power and capacity for regeneration in ways that feel both empowering and restorative. You'll find that your ability to transform challenging situations into opportunities for growth attracts the attention and respect of people who recognize your unique strength and wisdom.

Throughout the week, your intensity and depth of perception create opportunities for meaningful connections and transformative experiences that honor your need for authenticity and profound purpose.`
      },
      monthly: {
        overview: "January is a month of profound transformation, emotional depth, and powerful insights for Scorpio. Your investigative nature and emotional intensity lead to significant breakthroughs.",
        detailed: `January is destined to be a month of profound transformation and powerful insights for you, intense Scorpio! Your investigative nature and emotional depth are about to unlock significant breakthroughs that create lasting positive change in your life.

The month opens with remarkable opportunities for deep investigation and discovery that satisfy your need to understand what's really happening beneath surface appearances. Your natural ability to uncover hidden truths serves you exceptionally well in both personal and professional matters, often revealing opportunities that others completely overlook.

Mid-month emphasizes emotional healing and transformation in ways that feel both challenging and deeply rewarding. Your capacity to transform pain into wisdom and setbacks into comebacks becomes a source of genuine strength and possibly inspiration for others facing similar challenges.

The third week highlights your natural leadership abilities and growing influence in situations that matter to you. Your ability to guide others through difficult transformations while maintaining your own integrity creates opportunities for meaningful impact and recognition.

As January concludes, you'll find yourself in a powerful phase of regeneration and renewal that prepares you for exciting new beginnings. Your remarkable capacity for personal transformation and your ability to help others through their own changes becomes increasingly valuable and appreciated.

Throughout January, your depth and authenticity attract people and opportunities that honor your need for meaningful purpose and genuine connection.`
      },
      yearly: {
        overview: "2025 is a year of profound transformation, emotional mastery, and powerful achievements for Scorpio. Your intensity and investigative nature lead to significant breakthroughs.",
        detailed: `Dear Scorpio, 2025 is destined to be your year of profound transformation, emotional mastery, and the kind of powerful achievements that come from your unique ability to see beneath surfaces and transform challenges into triumphs.

The year begins with exciting opportunities for deep investigation and discovery that satisfy your need to understand the hidden mechanics of how things really work. Your ability to see beneath surface appearances reveals important truths and opportunities that others miss entirely, giving you significant advantages in both personal and professional endeavors.

Spring brings your investigative talents into full focus as you uncover opportunities and insights that create lasting positive change. Your reputation for getting to the heart of matters and finding real solutions to complex problems becomes increasingly valuable to others who recognize your unique gifts.

Summer emphasizes emotional healing and mastery as you demonstrate your remarkable ability to transform pain into wisdom and setbacks into comebacks. Your capacity to guide others through difficult transformations while maintaining your own strength becomes a source of both personal satisfaction and professional opportunity.

During these warmer months, your depth and authenticity attract people and situations that honor your need for meaningful purpose. You're not just succeeding – you're creating the kind of profound impact that aligns with your deepest values.

Autumn highlights your natural leadership abilities and growing influence in areas that genuinely matter to you. Your power comes not from domination but from your ability to see truth clearly and help others navigate their own transformations with courage and wisdom.

Your reputation for combining strength with genuine caring creates opportunities to guide, heal, and transform in ways that feel deeply meaningful and personally satisfying.

Winter concludes the year with regeneration and preparation for new cycles of growth and influence. Your remarkable capacity for renewal and transformation positions you perfectly for continued success that honors your authentic nature and profound purpose.

By year's end, you'll see clearly how your intensity, investigative abilities, and transformative power have created a life where you're not just successful – you're making a profound difference in ways that satisfy your deepest need for meaningful purpose and authentic connection.`
      }
    },
    sagittarius: {
      name: "Sagittarius",
      dates: "Nov 22 - Dec 21",
      symbol: "♐",
      element: "Fire",
      ruling_planet: "Jupiter",
      today: {
        personal: "Your adventurous spirit is highlighted today. Single Sagittarius should embrace new social opportunities, while committed ones may plan exciting adventures together.",
        travel: "Today is excellent for travel planning or taking spontaneous trips. Your wanderlust leads to meaningful experiences and cultural discoveries.",
        money: "Financial optimism guides your decisions today. Consider investments in education, travel, or experiences that broaden your horizons.",
        career: "At work, your enthusiasm and big-picture thinking inspire others. It's a great day to propose expansion ideas or international projects.",
        health: "Physical activity and outdoor adventures boost your energy today. Consider hiking, sports, or any activity that combines movement with exploration.",
        emotions: "Emotionally, you're feeling optimistic and freedom-loving. Your positive attitude attracts like-minded people and exciting opportunities."
      },
      yesterday: {
        personal: "Yesterday's focus on independence and exploration set the foundation for today's adventures and new connections.",
        travel: "Previous travel experiences or plans made yesterday continue to inspire and guide your current decisions.",
        money: "Financial decisions made yesterday with optimism and vision begin showing positive potential for growth.",
        career: "Yesterday's broad thinking and enthusiasm planted seeds that are starting to grow into concrete opportunities.",
        health: "Your active lifestyle yesterday recharged your energy and prepared you for today's adventures.",
        emotions: "The freedom and optimism you felt yesterday continue to influence your positive outlook today."
      },
      tomorrow: {
        personal: "Tomorrow brings exciting opportunities for adventure and new relationships. Your natural charm attracts interesting people.",
        travel: "Travel opportunities may arise suddenly tomorrow. Be ready for spontaneous adventures or important journey plans.",
        money: "Financial opportunities related to education, publishing, or international ventures may present themselves tomorrow.",
        career: "Tomorrow offers chances to expand your professional horizons. Consider opportunities that involve teaching, travel, or cultural exchange.",
        health: "Plan energizing outdoor activities for tomorrow. Your vitality will be high for sports, hiking, or adventure activities.",
        emotions: "Emotional freedom and joy peak tomorrow. Your optimistic nature inspires others and creates positive connections."
      },
      weekly: {
        overview: "This week emphasizes adventure, learning, and expansion for Sagittarius. Your optimistic nature and love of freedom lead to exciting opportunities and meaningful discoveries.",
        detailed: `What an exhilarating and expansive week awaits you, adventurous Sagittarius! The cosmic energies are perfectly aligned to support your natural love of freedom, learning, and exploration in ways that open doors to exciting new opportunities and meaningful discoveries.

Early in the week, your enthusiasm for new experiences and natural curiosity lead to interesting discoveries and valuable connections that broaden your horizons in unexpected ways. Your optimistic energy attracts people and opportunities that share your love of adventure and growth.

Mid-week brings wonderful opportunities for learning, teaching, or sharing your knowledge with others who genuinely appreciate your philosophical nature and broad perspective. Your ability to see the bigger picture and connect seemingly unrelated concepts makes you an invaluable resource for those seeking wisdom and guidance.

The weekend focuses beautifully on freedom, adventure, and exploration that satisfy your wanderlust and desire for new experiences. Whether it's planning future travels, exploring new philosophies, or simply enjoying activities that expand your understanding of the world, you'll find deep satisfaction in pursuing what makes you feel most alive and free.

Throughout the week, your optimistic nature and genuine love of learning create opportunities for growth and connection that honor your need for both adventure and meaning.`
      },
      monthly: {
        overview: "January is a month of adventure, learning, and philosophical growth for Sagittarius. Your optimistic nature and love of freedom attract exciting opportunities.",
        detailed: `January is shaping up to be an absolutely thrilling month for you, adventurous Sagittarius! Your optimistic nature and love of freedom are about to attract exciting opportunities that perfectly align with your desire for growth and meaningful exploration.

The month opens with wonderful opportunities for adventure and expansion that satisfy your wanderlust and intellectual curiosity. Your genuine enthusiasm for new experiences leads to exciting discoveries and valuable connections that broaden your understanding of the world in the most delightful ways.

Mid-month emphasizes learning, teaching, and sharing knowledge in ways that feel both personally fulfilling and professionally valuable. Your philosophical nature and broad perspective are particularly appreciated by others who benefit from your optimistic outlook and wisdom gained through diverse experiences.

The third week highlights opportunities for cultural exploration and international connections that feed your soul's need for diversity and adventure. Your natural love of different cultures and new experiences opens doors to possibilities you hadn't even imagined.

As January concludes, you'll find yourself focusing on freedom and adventure in ways that prepare you for exciting developments ahead. This is an ideal time for travel planning, exploring new philosophies, or simply expanding your horizons through learning and connection.

Throughout January, your optimistic energy and genuine enthusiasm for life attract people and opportunities that share your values of growth, freedom, and meaningful exploration.`
      },
      yearly: {
        overview: "2025 is a year of adventure, learning, and philosophical expansion for Sagittarius. Your optimistic nature and love of freedom lead to meaningful discoveries.",
        detailed: `Dear [Sign], 2025 is your year of tremendous growth and meaningful success!

Spring (March-May): Educational Renaissance
The year begins with opportunities for learning and teaching. Your enthusiasm for knowledge and new experiences leads to academic or philosophical breakthroughs.

Summer (June-August): Adventure and Exploration
Mid-year highlights travel, adventure, and cultural exploration. Your wanderlust leads to meaningful experiences and important connections.

Autumn (September-November): Wisdom and Teaching
Fall emphasizes sharing your accumulated wisdom and teaching others. Your philosophical insights and broad perspective inspire and guide others.

Winter (December-February): Vision and Planning
The year concludes with visionary planning and preparation for future adventures. Your optimistic outlook creates exciting possibilities for the year ahead.`
      }
    },
    capricorn: {
      name: "Capricorn",
      dates: "Dec 22 - Jan 19",
      symbol: "♑",
      element: "Earth",
      ruling_planet: "Saturn",
      today: {
        personal: "Stability and commitment guide your relationships today. Your responsible nature attracts partners who value reliability and long-term planning.",
        travel: "Travel plans should focus on practical destinations that serve business or career purposes. Consider combining work with pleasure.",
        money: "Financial discipline and long-term planning are favored today. Focus on investments that build wealth steadily over time.",
        career: "Your leadership abilities and practical approach make you indispensable at work today. It's an excellent time for strategic planning and goal setting.",
        health: "Focus on bone health, joints, and structural wellness today. Regular exercise and good posture support your physical foundation.",
        emotions: "Emotionally, you're feeling grounded and focused on practical matters. Your steady nature provides stability for others."
      },
      yesterday: {
        personal: "Yesterday's focus on responsibility and commitment strengthened your relationships and built trust with important people.",
        travel: "Previous business or practical travel experiences provide valuable insights for current planning and decision-making.",
        money: "Financial discipline exercised yesterday begins showing results. Your careful planning and conservative approach prove wise.",
        career: "Yesterday's hard work and strategic thinking set the foundation for today's leadership opportunities and recognition.",
        health: "Your commitment to health and fitness yesterday supports today's energy and physical capabilities.",
        emotions: "The emotional stability and maturity you demonstrated yesterday continue to benefit your relationships today."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities to demonstrate your reliability and commitment. Your steadfast nature deepens important relationships.",
        travel: "Business travel or practical journeys may be particularly beneficial tomorrow. Focus on trips that advance your goals.",
        money: "Financial opportunities requiring patience and long-term commitment may present themselves tomorrow. Trust your conservative instincts.",
        career: "Tomorrow offers chances to showcase your leadership and management skills. Prepare for increased responsibilities and recognition.",
        health: "Plan structured exercise and health routines for tomorrow. Your discipline in wellness matters will pay significant dividends.",
        emotions: "Emotional maturity and wisdom guide your interactions tomorrow. Your steady presence provides comfort and guidance to others."
      },
      weekly: {
        overview: "This week emphasizes leadership, responsibility, and practical achievement for Capricorn. Your disciplined approach and steady progress lead to significant accomplishments.",
        detailed: `The cosmic energies are beautifully aligned for you this week!

Monday-Tuesday: Strategic Planning
Start the week with careful planning and goal setting. Your practical approach and attention to detail ensure solid foundations for success.

Wednesday-Thursday: Leadership and Responsibility
Mid-week brings opportunities to demonstrate your leadership abilities and take on increased responsibilities. Your competence is recognized and rewarded.

Friday-Sunday: Achievement and Recognition
The weekend focuses on celebrating achievements and consolidating gains. Your hard work and perseverance begin showing tangible results.`
      },
      monthly: {
        overview: "January is a month of leadership, achievement, and practical progress for Capricorn. Your disciplined approach and steady determination lead to significant accomplishments.",
        detailed: `This month brings wonderful opportunities for growth and success!

First Week (January 1-7): Foundation Building
The month opens with opportunities to build solid foundations for future success. Your practical approach and attention to detail serve you well.

Second Week (January 8-14): Leadership Development
Mid-month emphasizes developing your leadership skills and taking on greater responsibilities. Your competence and reliability are increasingly recognized.

Third Week (January 15-21): Strategic Achievement
This week highlights significant achievements through strategic planning and persistent effort. Your disciplined approach yields tangible results.

Fourth Week (January 22-31): Consolidation and Planning
As January concludes, focus on consolidating your gains and planning for continued growth. Your methodical approach ensures sustainable success.`
      },
      yearly: {
        overview: "2025 is a year of leadership, achievement, and practical mastery for Capricorn. Your disciplined approach and steady determination lead to significant accomplishments.",
        detailed: `Dear [Sign], 2025 is your year of tremendous growth and meaningful success!

Spring (March-May): Strategic Foundation
The year begins with building solid foundations for long-term success. Your practical wisdom and careful planning create opportunities for sustainable growth.

Summer (June-August): Leadership and Authority
Mid-year highlights your growing authority and leadership capabilities. Your competence and reliability earn you increased respect and responsibility.

Autumn (September-November): Achievement and Recognition
Fall brings significant achievements and public recognition for your hard work and perseverance. Your disciplined approach yields impressive results.

Winter (December-February): Mastery and Wisdom
The year concludes with mastery of your chosen fields and the wisdom that comes from sustained effort. Your example inspires and guides others.`
      }
    },
    aquarius: {
      name: "Aquarius",
      dates: "Jan 20 - Feb 18",
      symbol: "♒",
      element: "Air",
      ruling_planet: "Uranus",
      today: {
        personal: "Your unique perspective and independent spirit attract interesting people today. Embrace your individuality in relationships.",
        travel: "Consider unconventional destinations or innovative travel methods. Your adventurous spirit leads to unique experiences.",
        money: "Financial innovation and technology may offer new opportunities today. Consider modern investment approaches and digital assets.",
        career: "Your creativity and forward-thinking approach set you apart at work today. It's an excellent time to propose innovative solutions.",
        health: "Focus on circulation, ankles, and nervous system health today. Consider alternative or cutting-edge wellness approaches.",
        emotions: "Emotionally, you're feeling independent and visionary. Your humanitarian instincts guide you toward meaningful connections."
      },
      yesterday: {
        personal: "Yesterday's focus on individuality and friendship strengthened your social connections and reinforced your unique identity.",
        travel: "Previous innovative or unconventional travel experiences provide inspiration for current plans and adventures.",
        money: "Financial experiments or innovative approaches tried yesterday begin showing their potential for future success.",
        career: "Yesterday's creative thinking and innovative solutions set the stage for today's recognition and opportunities.",
        health: "Your progressive approach to health and wellness yesterday supports today's energy and mental clarity.",
        emotions: "The emotional freedom and social consciousness you expressed yesterday continue to guide your humanitarian efforts."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities to express your uniqueness and connect with like-minded individuals. Your originality shines.",
        travel: "Innovative travel opportunities or technological advances in transportation may benefit you tomorrow.",
        money: "Tomorrow may bring opportunities related to technology, innovation, or humanitarian causes. Trust your progressive instincts.",
        career: "Cutting-edge projects and innovative collaborations may present themselves tomorrow. Your visionary thinking is especially valued.",
        health: "Tomorrow, explore new wellness technologies or alternative health approaches. Your openness to innovation benefits your wellbeing.",
        emotions: "Emotional independence and social awareness guide your interactions tomorrow. Your humanitarian nature attracts positive attention."
      },
      weekly: {
        overview: "This week emphasizes innovation, friendship, and humanitarian concerns for Aquarius. Your unique perspective and progressive thinking lead to meaningful connections and positive changes.",
        detailed: `The cosmic energies are beautifully aligned for you this week!

Monday-Tuesday: Innovative Thinking
Start the week with fresh, innovative approaches to challenges. Your unique perspective and progressive thinking open new possibilities.

Wednesday-Thursday: Social Connections
Mid-week brings opportunities to strengthen friendships and connect with like-minded individuals. Your humanitarian instincts guide you toward meaningful relationships.

Friday-Sunday: Freedom and Expression
The weekend focuses on expressing your individuality and embracing your freedom. Your originality and independence inspire others.`
      },
      monthly: {
        overview: "January is a month of innovation, friendship, and humanitarian growth for Aquarius. Your unique perspective and progressive thinking attract positive opportunities.",
        detailed: `This month brings wonderful opportunities for growth and success!

First Week (January 1-7): Progressive Innovation
The month opens with opportunities for innovation and progressive thinking. Your unique approach to problems leads to breakthrough solutions.

Second Week (January 8-14): Social Expansion
Mid-month emphasizes expanding your social circle and connecting with like-minded individuals. Your humanitarian instincts guide you toward meaningful relationships.

Third Week (January 15-21): Freedom and Independence
This week highlights your need for freedom and independence. Embrace your individuality and resist conformity pressures.

Fourth Week (January 22-31): Visionary Planning
As January concludes, focus on visionary planning and humanitarian goals. Your progressive thinking creates possibilities for positive change.`
      },
      yearly: {
        overview: "2025 is a year of innovation, friendship, and humanitarian achievement for Aquarius. Your unique perspective and progressive thinking lead to meaningful contributions.",
        detailed: `Dear [Sign], 2025 is your year of tremendous growth and meaningful success!

Spring (March-May): Technological Innovation
The year begins with opportunities in technology and innovation. Your progressive thinking and unique perspective lead to breakthrough discoveries.

Summer (June-August): Social Revolution
Mid-year highlights your role in social change and humanitarian causes. Your vision for a better world inspires others to join your efforts.

Autumn (September-November): Independence and Freedom
Fall emphasizes personal freedom and independence. Your originality and refusal to conform open new paths and opportunities.

Winter (December-February): Visionary Leadership
The year concludes with recognition of your visionary leadership and humanitarian contributions. Your progressive ideals begin manifesting in reality.`
      }
    },
    pisces: {
      name: "Pisces",
      dates: "Feb 19 - Mar 20",
      symbol: "♓",
      element: "Water",
      ruling_planet: "Neptune",
      today: {
        personal: "Your empathetic and intuitive nature deepens connections today. Trust your feelings when it comes to relationships.",
        travel: "Consider destinations that offer spiritual healing or artistic inspiration. Water-based locations particularly appeal to you.",
        money: "Financial intuition is strong today. Trust your instincts, but verify practical details before making major decisions.",
        career: "Your creativity and compassion are your greatest assets at work today. Consider careers in healing, arts, or helping others.",
        health: "Pay attention to your feet, lymphatic system, and emotional wellbeing today. Water-based activities and meditation are beneficial.",
        emotions: "Emotionally, you're highly sensitive and intuitive. Use this heightened awareness for creative expression and spiritual growth."
      },
      yesterday: {
        personal: "Yesterday's emotional depth and spiritual insights strengthened your connections and enhanced your understanding of others.",
        travel: "Previous journeys to peaceful or spiritual places continue to inspire and guide your current emotional and spiritual development.",
        money: "Financial decisions made yesterday with compassion and intuition prove to be wise and aligned with your values.",
        career: "Yesterday's creative work and compassionate actions set the foundation for today's opportunities in helping others.",
        health: "Your attention to emotional and spiritual health yesterday supports today's overall wellbeing and energy.",
        emotions: "The emotional healing and spiritual growth you experienced yesterday continue to benefit your relationships and self-understanding."
      },
      tomorrow: {
        personal: "Tomorrow brings opportunities for deep emotional connection and spiritual bonding. Your compassionate nature attracts soulful relationships.",
        travel: "Spiritual retreats or artistic destinations may call to you tomorrow. Consider journeys that nurture your soul.",
        money: "Tomorrow may bring opportunities through creative or healing work. Trust your intuition about financial partnerships.",
        career: "Creative projects and opportunities to help others are highlighted tomorrow. Your empathetic nature opens doors.",
        health: "Tomorrow, focus on emotional detox and spiritual cleansing. Water-based therapies and meditation are especially beneficial.",
        emotions: "Emotional and psychic sensitivity peaks tomorrow. Use this heightened awareness for artistic creation and spiritual insight."
      },
      weekly: {
        overview: "This week emphasizes creativity, intuition, and emotional healing for Pisces. Your compassionate nature and artistic gifts attract positive opportunities and meaningful connections.",
        detailed: `The cosmic energies are beautifully aligned for you this week!

Monday-Tuesday: Intuitive Insights
Start the week by trusting your intuition and emotional intelligence. Your psychic abilities are heightened, making this ideal for creative and spiritual pursuits.

Wednesday-Thursday: Creative Expression
Mid-week brings opportunities for artistic expression and emotional healing. Your ability to translate feelings into art inspires and heals others.

Friday-Sunday: Compassionate Service
The weekend focuses on helping others and practicing compassion. Your empathetic nature and healing abilities are particularly needed and appreciated.`
      },
      monthly: {
        overview: "January is a month of spiritual growth, artistic achievement, and emotional healing for Pisces. Your intuitive gifts and compassionate nature attract meaningful opportunities.",
        detailed: `This month brings wonderful opportunities for growth and success!

First Week (January 1-7): Spiritual Awakening
The month opens with heightened spiritual awareness and intuitive insights. Your connection to higher consciousness deepens and guides your decisions.

Second Week (January 8-14): Creative Inspiration
Mid-month emphasizes artistic inspiration and creative breakthroughs. Your imagination is vivid, and your ability to create beauty touches others deeply.

Third Week (January 15-21): Emotional Healing
This week highlights your natural healing abilities and emotional wisdom. Your compassionate presence helps others process and heal their pain.

Fourth Week (January 22-31): Integration and Flow
As January concludes, integrate your spiritual and creative experiences. Allow your intuition to guide you toward your highest purpose and most authentic expression.`
      },
      yearly: {
        overview: "2025 is a year of spiritual mastery, artistic recognition, and emotional wisdom for Pisces. Your intuitive gifts and compassionate nature lead to profound achievements.",
        detailed: `Dear [Sign], 2025 is your year of tremendous growth and meaningful success!

Spring (March-May): Spiritual Renaissance
The year begins with a profound spiritual awakening. Your connection to divine consciousness deepens, leading to mystical experiences and creative inspiration.

Summer (June-August): Artistic Achievement
Mid-year highlights artistic recognition and creative success. Your ability to channel higher consciousness into beautiful expressions receives widespread appreciation.

Autumn (September-November): Healing Mastery
Fall emphasizes your development as a healer and spiritual guide. Your emotional wisdom and intuitive abilities help many find peace and understanding.

Winter (December-February): Transcendent Wisdom
The year concludes with the integration of spiritual wisdom and earthly experience. Your compassionate understanding and transcendent perspective inspire and guide others.`
      }
    }
  };

  const periods = [
    { id: 'yesterday', label: `Yesterday (${yesterdayInfo})`, icon: ChevronLeft },
    { id: 'today', label: `Today (${todayInfo})`, icon: Calendar },
    { id: 'tomorrow', label: `Tomorrow (${tomorrowInfo})`, icon: TrendingUp },
    { id: 'weekly', label: `Weekly (${weeklyInfo})`, icon: Calendar },
    { id: 'monthly', label: `Monthly (${monthlyInfo})`, icon: Calendar },
    { id: 'yearly', label: 'Yearly', icon: Calendar }
  ];

  const currentSign = zodiacData[signId] || zodiacData.aries;
  const currentData = currentSign[selectedPeriod];

  const renderContent = () => {
    // Safety check for missing data
    if (!currentData) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Not Available</h3>
            <p className="text-gray-600">Horoscope data for this period is currently being updated. Please try again later.</p>
          </div>
        </div>
      );
    }

    if (selectedPeriod === 'today' || selectedPeriod === 'yesterday' || selectedPeriod === 'tomorrow') {
      return (
        <div className="space-y-6">
          {Object.entries(currentData).map(([category, content]) => (
            <div key={category} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize flex items-center">
                {category === 'personal' && '💝'} 
                {category === 'travel' && '✈️'} 
                {category === 'money' && '💰'} 
                {category === 'career' && '💼'} 
                {category === 'health' && '🏥'} 
                {category === 'emotions' && '😊'} 
                <span className="ml-2">{category}</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      );
    } else {
      // Safety check for overview and detailed data
      const overview = currentData.overview || "Overview data is being updated.";
      const detailed = currentData.detailed || "Detailed forecast is being updated.";
      
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
            <p className="text-gray-600 leading-relaxed">{overview}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Forecast</h3>
            <div className="prose prose-gray max-w-none">
              {detailed.split('\n\n').map((paragraph, index) => (
                <div key={index} className="mb-4">
                  {paragraph.startsWith('') && paragraph.endsWith('') ? (
                    <h4 className="text-lg font-semibold text-purple-700 mb-2">
                      {paragraph.replace(/\*\*/g, '')}
                    </h4>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{paragraph}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Breadcrumb */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span className="mx-2">•</span>
            <Link to="/horoscope" className="hover:text-purple-600 transition-colors">Horoscope</Link>
            <span className="mx-2">•</span>
            <span className="text-purple-600 font-medium capitalize">{zodiacInfo?.name || signId}</span>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              {/* Zodiac Sign Info */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{currentSign.symbol}</div>
                <h2 className="text-2xl font-bold text-gray-800">{currentSign.name}</h2>
                <p className="text-gray-600">{currentSign.dates}</p>
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-gray-500">Element: <span className="text-gray-700">{currentSign.element}</span></p>
                  <p className="text-sm text-gray-500">Ruling Planet: <span className="text-gray-700">{currentSign.ruling_planet}</span></p>
                </div>
              </div>

              {/* Period Selection */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Period</h3>
                {periods.map((period) => {
                  const Icon = period.icon;
                  return (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                        selectedPeriod === period.id
                          ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{period.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Zodiac Signs Quick Access */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Signs</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(zodiacData).map(([id, sign]) => (
                    <button
                      key={id}
                      onClick={() => window.location.href = `/horoscope/${id}`}
                      className={`p-2 rounded-lg text-center transition-all duration-200 ${
                        id === signId
                          ? 'bg-purple-100 text-purple-700'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                      title={sign.name}
                    >
                      <div className="text-lg">{sign.symbol}</div>
                      <div className="text-xs">{sign.name.substring(0, 3)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                      {currentSign.name} {periods.find(p => p.id === selectedPeriod)?.label} Horoscope
                    </h1>
                    <p className="text-gray-600 mt-1">{getCurrentDate()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Updated Daily</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {renderContent()}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg text-white p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Want a Personalized Reading?</h2>
              <p className="text-purple-100 mb-6">
                Connect with our expert astrologers for detailed, personalized insights tailored specifically to your birth chart and current planetary positions.
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
    </div>
  );
};

export default HoroscopeDetail;