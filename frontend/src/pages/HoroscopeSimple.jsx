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
      color: 'from-red-500 to-orange-500',
      emoji: '♈',
      description: {
        today: {
          personal: "Your fiery energy ignites new possibilities today. Bold moves in relationships are favored.",
          career: "Leadership opportunities beckon. Your initiative will be recognized by superiors.",
          luck: "Lucky numbers: 7, 14, 21. Red colors enhance your natural magnetism today."
        }
      }
    },
    {
      id: 'taurus',
      name: 'Taurus',
      dateRange: 'Apr 20 - May 20',
      element: 'Earth',
      color: 'from-green-500 to-emerald-500',
      emoji: '♉',
      description: {
        today: {
          personal: "Stability and comfort guide your relationships today. Your loyal nature strengthens bonds.",
          career: "Steady progress in professional matters. Your reliability impresses colleagues.",
          luck: "Lucky numbers: 6, 15, 24. Green and earth tones bring harmony today."
        }
      }
    },
    {
      id: 'gemini',
      name: 'Gemini',
      dateRange: 'May 21 - Jun 20',
      element: 'Air',
      color: 'from-yellow-500 to-amber-500',
      emoji: '♊',
      description: {
        today: {
          personal: "Communication flows beautifully today. Express your thoughts clearly in relationships.",
          career: "Multiple opportunities present themselves. Your adaptability helps navigate situations.",
          luck: "Lucky numbers: 3, 12, 18. Yellow and silver enhance your communication abilities."
        }
      }
    },
    {
      id: 'cancer',
      name: 'Cancer',
      dateRange: 'Jun 21 - Jul 22',
      element: 'Water',
      color: 'from-blue-500 to-teal-500',
      emoji: '♋',
      description: {
        today: {
          personal: "Family relationships and emotional security take center stage today.",
          career: "Trust your intuition in professional matters. Your emotional intelligence gives you advantage.",
          luck: "Lucky numbers: 2, 9, 16. Silver and blue enhance your intuitive powers."
        }
      }
    },
    {
      id: 'leo',
      name: 'Leo',
      dateRange: 'Jul 23 - Aug 22',
      element: 'Fire',
      color: 'from-yellow-400 to-orange-600',
      emoji: '♌',
      description: {
        today: {
          personal: "Your natural charisma shines brightly today. Romantic opportunities abound.",
          career: "Take center stage in professional matters. Your leadership abilities impress decision-makers.",
          luck: "Lucky numbers: 1, 10, 19. Gold and bright colors amplify your magnetism."
        }
      }
    },
    {
      id: 'virgo',
      name: 'Virgo',
      dateRange: 'Aug 23 - Sep 22',
      element: 'Earth',
      color: 'from-green-600 to-teal-600',
      emoji: '♍',
      description: {
        today: {
          personal: "Attention to detail in relationships pays off today. Your caring approach helps.",
          career: "Your analytical skills lead to breakthrough solutions. Colleagues appreciate your thoroughness.",
          luck: "Lucky numbers: 6, 15, 24. Earth tones support your precision."
        }
      }
    },
    {
      id: 'libra',
      name: 'Libra',
      dateRange: 'Sep 23 - Oct 22',
      element: 'Air',
      color: 'from-pink-500 to-rose-500',
      emoji: '♎',
      description: {
        today: {
          personal: "Harmony and balance guide your relationships today. Your diplomatic nature resolves conflicts.",
          career: "Partnership opportunities flourish. Your ability to see all sides creates solutions.",
          luck: "Lucky numbers: 7, 16, 25. Pink and pastels enhance your charm."
        }
      }
    },
    {
      id: 'scorpio',
      name: 'Scorpio',
      dateRange: 'Oct 23 - Nov 21',
      element: 'Water',
      color: 'from-red-800 to-purple-800',
      emoji: '♏',
      description: {
        today: {
          personal: "Intense emotions and deep connections characterize your relationships today.",
          career: "Your investigative abilities lead to important discoveries. Dive deep into problems.",
          luck: "Lucky numbers: 8, 17, 26. Deep reds enhance your transformative power."
        }
      }
    },
    {
      id: 'sagittarius',
      name: 'Sagittarius',
      dateRange: 'Nov 22 - Dec 21',
      element: 'Fire',
      color: 'from-purple-600 to-indigo-600',
      emoji: '♐',
      description: {
        today: {
          personal: "Adventure and philosophical connection inspire your relationships today.",
          career: "International opportunities favor you. Your broad perspective opens doors.",
          luck: "Lucky numbers: 9, 18, 27. Purple enhances your wisdom and spirit."
        }
      }
    },
    {
      id: 'capricorn',
      name: 'Capricorn',
      dateRange: 'Dec 22 - Jan 19',
      element: 'Earth',
      color: 'from-gray-700 to-slate-800',
      emoji: '♑',
      description: {
        today: {
          personal: "Commitment and long-term planning guide your relationships today.",
          career: "Authority and leadership opportunities present themselves. Your discipline leads to advancement.",
          luck: "Lucky numbers: 10, 19, 28. Earth tones enhance your authority."
        }
      }
    },
    {
      id: 'aquarius',
      name: 'Aquarius',
      dateRange: 'Jan 20 - Feb 18',
      element: 'Air',
      color: 'from-blue-600 to-cyan-600',
      emoji: '♒',
      description: {
        today: {
          personal: "Friendship and intellectual connection inspire your relationships today.",
          career: "Innovation and technology opportunities favor you. Your original thinking leads to breakthroughs.",
          luck: "Lucky numbers: 11, 20, 29. Electric blue enhances your innovation."
        }
      }
    },
    {
      id: 'pisces',
      name: 'Pisces',
      dateRange: 'Feb 19 - Mar 20',
      element: 'Water',
      color: 'from-purple-500 to-blue-500',
      emoji: '♓',
      description: {
        today: {
          personal: "Intuition and compassion guide your relationships today. Your empathetic nature attracts connections.",
          career: "Creative and healing professions favor you. Your intuitive understanding leads to fulfillment.",
          luck: "Lucky numbers: 12, 21, 30. Sea greens enhance your intuition."
        }
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 p-2 rounded-lg hover:bg-white/50 transition-colors flex items-center text-purple-600"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </button>
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
                    className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedPeriod === period.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
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

          {/* Zodiac Signs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {zodiacSigns.map((sign) => (
              <Link
                key={sign.id}
                to={`/horoscope/${sign.id}`}
                className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-purple-200"
              >
                {/* Sign Header */}
                <div className={`bg-gradient-to-r ${sign.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 text-6xl opacity-20 font-bold">
                    {sign.emoji}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-1">{sign.name}</h3>
                    <p className="text-sm opacity-90">{sign.dateRange}</p>
                    <div className="flex items-center mt-2 text-sm opacity-80">
                      <span className="mr-3">Element: {sign.element}</span>
                    </div>
                  </div>
                </div>

                {/* Sign Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">💝 Personal Life</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {sign.description.today?.personal?.substring(0, 80)}...
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">💼 Career</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {sign.description.today?.career?.substring(0, 80)}...
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">🍀 Lucky Numbers</h4>
                      <p className="text-gray-600 text-sm">
                        {sign.description.today?.luck?.split('.')[0]?.replace('Lucky numbers: ', '') || 'View details'}
                      </p>
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center text-purple-600 font-medium">
                      <span className="mr-2">👆 Click to Read Full Horoscope</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Horoscope
