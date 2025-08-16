import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProfessionalNavbar from '../components/ProfessionalNavbar'

const ProfessionalHoroscope = () => {
  const navigate = useNavigate()
  const [selectedSign, setSelectedSign] = useState('')
  const [horoscopeType, setHoroscopeType] = useState('daily')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  const getCurrentDateInfo = () => {
    const today = new Date()
    
    // Today
    const todayInfo = `${today.getDate()}${getOrdinalSuffix(today.getDate())} ${today.toLocaleDateString('en-US', { month: 'short' })}`
    
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
    
    return { todayInfo, weeklyInfo, monthlyInfo }
  }

  const { todayInfo, weeklyInfo, monthlyInfo } = getCurrentDateInfo()

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', emoji: '🐏' },
    { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', emoji: '🐂' },
    { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', emoji: '👥' },
    { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', emoji: '🦀' },
    { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', emoji: '🦁' },
    { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', emoji: '👧' },
    { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', emoji: '⚖️' },
    { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', emoji: '🦂' },
    { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', emoji: '🏹' },
    { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', emoji: '🐐' },
    { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', emoji: '🏺' },
    { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', emoji: '🐟' }
  ]

  const horoscopeTypes = [
    { value: 'daily', label: 'Daily', description: `Today (${todayInfo})` },
    { value: 'weekly', label: 'Weekly', description: `This week (${weeklyInfo})` },
    { value: 'monthly', label: 'Monthly', description: `This month (${monthlyInfo})` },
    { value: 'yearly', label: 'Yearly', description: 'Annual cosmic forecast' }
  ]

  const handleGenerateHoroscope = async () => {
    if (!selectedSign) {
      setError('Please select your zodiac sign')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:8000/api/horoscope/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zodiac_sign: selectedSign,
          horoscope_type: horoscopeType
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate horoscope')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900">
      <ProfessionalNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 animate-fade-in">
              Horoscope Predictions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover what the stars have in store for you with personalized astrological insights and cosmic guidance.
            </p>
          </div>

          {!result && (
            <>
              {/* Horoscope Type Selection */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">
                  Choose Your Reading Type
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {horoscopeTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setHoroscopeType(type.value)}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        horoscopeType === type.value
                          ? 'bg-secondary-400 text-primary-800 shadow-lg scale-105'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <h3 className="font-semibold text-lg mb-1">{type.label}</h3>
                      <p className="text-sm opacity-90">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zodiac Sign Selection */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">
                  Select Your Zodiac Sign
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {zodiacSigns.map((sign) => (
                    <button
                      key={sign.name}
                      onClick={() => setSelectedSign(sign.name)}
                      className={`group p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        selectedSign === sign.name
                          ? 'bg-secondary-400 text-primary-800 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {sign.emoji}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{sign.name}</h3>
                      <p className="text-sm opacity-90">{sign.dates}</p>
                      <div className="text-2xl mt-2 opacity-70">{sign.symbol}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-white px-6 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                
                <button
                  onClick={handleGenerateHoroscope}
                  disabled={loading || !selectedSign}
                  className="px-10 py-4 bg-secondary-400 text-primary-800 font-bold text-lg rounded-lg shadow-lg hover:bg-secondary-300 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <div className="animate-spin w-5 h-5 border-2 border-primary-800 border-t-transparent rounded-full mr-2"></div>
                      Generating...
                    </span>
                  ) : (
                    `Generate ${horoscopeTypes.find(t => t.value === horoscopeType)?.label} Horoscope`
                  )}
                </button>
              </div>
            </>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <button
                  onClick={() => setResult(null)}
                  className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 mb-8"
                >
                  ← Generate New Horoscope
                </button>
              </div>

              {/* Horoscope Header */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl mr-4">
                    {zodiacSigns.find(s => s.name === result.zodiac_sign)?.emoji}
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white">
                      {result.zodiac_sign} {horoscopeTypes.find(t => t.value === result.horoscope_type)?.label}
                    </h2>
                    <p className="text-white/80">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Prediction */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h3 className="text-2xl font-display font-bold text-secondary-400 mb-4">
                  Cosmic Guidance
                </h3>
                <div className="prose max-w-none">
                  <p className="text-white/90 leading-relaxed text-lg">
                    {result.prediction}
                  </p>
                </div>
              </div>

              {/* Detailed Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.career_advice && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-secondary-400 mb-3 flex items-center">
                      💼 Career & Work
                    </h4>
                    <p className="text-white/90">{result.career_advice}</p>
                  </div>
                )}

                {result.love_advice && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-secondary-400 mb-3 flex items-center">
                      💖 Love & Relationships
                    </h4>
                    <p className="text-white/90">{result.love_advice}</p>
                  </div>
                )}

                {result.health_advice && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-secondary-400 mb-3 flex items-center">
                      🌿 Health & Wellness
                    </h4>
                    <p className="text-white/90">{result.health_advice}</p>
                  </div>
                )}

                {result.financial_advice && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-secondary-400 mb-3 flex items-center">
                      💰 Financial Outlook
                    </h4>
                    <p className="text-white/90">{result.financial_advice}</p>
                  </div>
                )}
              </div>

              {/* Lucky Numbers and Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.lucky_number && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                    <h4 className="text-xl font-semibold text-secondary-400 mb-3">🍀 Lucky Number</h4>
                    <div className="text-4xl font-bold text-white mb-2">{result.lucky_number}</div>
                    <p className="text-white/80">Carry this number with you today</p>
                  </div>
                )}

                {result.lucky_color && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                    <h4 className="text-xl font-semibold text-secondary-400 mb-3">🎨 Lucky Color</h4>
                    <div className="text-2xl font-bold text-white mb-2">{result.lucky_color}</div>
                    <p className="text-white/80">Enhance your aura with this color</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalHoroscope
