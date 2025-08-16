import React, { useState } from 'react'
import { Heart, Users, Star, TrendingUp, MessageCircle, Home, Zap, Target, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const Compatibility = () => {
  const navigate = useNavigate()
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [person1, setPerson1] = useState({
    name: '',
    birth_date: '',
    birth_time: '',
    birth_location: ''
  })
  const [person2, setPerson2] = useState({
    name: '',
    birth_date: '',
    birth_time: '',
    birth_location: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!person1.name || !person1.birth_date || !person1.birth_time || !person1.birth_location ||
        !person2.name || !person2.birth_date || !person2.birth_time || !person2.birth_location) {
      alert('Please fill in all fields for both people.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/compatibility/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person1: {
            ...person1,
            birth_time: person1.birth_time.includes(':') ? `${person1.birth_time}:00` : person1.birth_time
          },
          person2: {
            ...person2,
            birth_time: person2.birth_time.includes(':') ? `${person2.birth_time}:00` : person2.birth_time
          },
          analysis_type: 'comprehensive'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysisResult(data)
      } else {
        throw new Error('Failed to analyze compatibility')
      }
    } catch (error) {
      console.error('Error analyzing compatibility:', error)
      alert('Error analyzing compatibility. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setPerson1({ name: '', birth_date: '', birth_time: '', birth_location: '' })
    setPerson2({ name: '', birth_date: '', birth_time: '', birth_location: '' })
    setAnalysisResult(null)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    if (score >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreBackground = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    if (score >= 40) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-pink-600'
  }

  const categoryIcons = {
    'Elemental Harmony': Zap,
    'Communication Style': MessageCircle,
    'Emotional Connection': Heart,
    'Shared Values': Target,
    'Physical Chemistry': Star,
    'Lifestyle Compatibility': Home
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Back Button */}
          <div className="flex justify-start mb-6">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-rose-500 mr-3 animate-pulse" />
            <h1 className="heading-1 text-primary-800 font-display">Compatibility Analysis</h1>
            <Heart className="h-8 w-8 text-rose-500 ml-3 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the cosmic compatibility between two souls through detailed astrological analysis 
            of birth charts, planetary positions, and zodiac harmony.
          </p>
        </div>

        {!analysisResult ? (
          /* Input Form */
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="card-mystic p-8">
              <div className="text-center mb-8">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Birth Details</h2>
                <p className="text-gray-600">Provide accurate birth information for both people</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Person 1 */}
                <div className="bg-white/70 rounded-lg p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                    First Person
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        value={person1.name}
                        onChange={(e) => setPerson1({...person1, name: e.target.value})}
                        className="input-field"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Birth Date</label>
                      <input
                        type="date"
                        value={person1.birth_date}
                        onChange={(e) => setPerson1({...person1, birth_date: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Birth Time</label>
                      <input
                        type="time"
                        value={person1.birth_time}
                        onChange={(e) => setPerson1({...person1, birth_time: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Birth Place</label>
                      <input
                        type="text"
                        value={person1.birth_location}
                        onChange={(e) => setPerson1({...person1, birth_location: e.target.value})}
                        className="input-field"
                        placeholder="City, State/Country"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Person 2 */}
                <div className="bg-white/70 rounded-lg p-6 border border-rose-200">
                  <h3 className="text-lg font-semibold text-rose-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                    Second Person
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        value={person2.name}
                        onChange={(e) => setPerson2({...person2, name: e.target.value})}
                        className="input-field"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Birth Date</label>
                      <input
                        type="date"
                        value={person2.birth_date}
                        onChange={(e) => setPerson2({...person2, birth_date: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Birth Time</label>
                      <input
                        type="time"
                        value={person2.birth_time}
                        onChange={(e) => setPerson2({...person2, birth_time: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Birth Place</label>
                      <input
                        type="text"
                        value={person2.birth_location}
                        onChange={(e) => setPerson2({...person2, birth_location: e.target.value})}
                        className="input-field"
                        placeholder="City, State/Country"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="small" className="mr-3" />
                      Analyzing Compatibility...
                    </div>
                  ) : (
                    'Analyze Compatibility'
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Results */
          <div className="max-w-6xl mx-auto">
            {/* Overall Score */}
            <div className="card-mystic p-8 mb-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">
                      {person1.name.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-purple-800">{person1.name}</p>
                    <p className="text-xs text-purple-600">{analysisResult.person1_sign}</p>
                  </div>
                  <Heart className="h-8 w-8 text-rose-500 animate-pulse" />
                  <div className="text-center">
                    <div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">
                      {person2.name.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-rose-800">{person2.name}</p>
                    <p className="text-xs text-rose-600">{analysisResult.person2_sign}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysisResult.overall_score)}`}>
                  {Math.round(analysisResult.overall_score)}%
                </div>
                <p className="text-xl text-gray-700 font-medium">Overall Compatibility</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className={`bg-gradient-to-r ${getScoreBackground(analysisResult.overall_score)} h-4 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${analysisResult.overall_score}%` }}
                ></div>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {analysisResult.compatibility_scores.map((score, index) => {
                const IconComponent = categoryIcons[score.category] || Star
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                      <span className={`text-2xl font-bold ${getScoreColor(score.score)}`}>
                        {Math.round(score.score)}%
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{score.category}</h3>
                    <p className="text-gray-600 text-sm">{score.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className={`bg-gradient-to-r ${getScoreBackground(score.score)} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${score.score}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Interpretation */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span className="text-green-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Areas to Work On
                </h3>
                <ul className="space-y-2">
                  {analysisResult.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mr-2 mt-2"></div>
                      <span className="text-orange-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advice */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-rose-500" />
                Relationship Guidance
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">{analysisResult.interpretation}</p>
              {analysisResult.advice && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-purple-800 font-medium">{analysisResult.advice}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="text-center">
              <button
                onClick={resetForm}
                className="btn-outline px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                New Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Compatibility
