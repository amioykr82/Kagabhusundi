import React, { useState, useEffect } from 'react'
import { Sparkles, Star, Moon, Sun, Shuffle, RefreshCw, BookOpen, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const Tarot = () => {
  const navigate = useNavigate()
  const [currentReading, setCurrentReading] = useState(null)
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState('')
  const [spreadType, setSpreadType] = useState('single')
  const [showCardMeanings, setShowCardMeanings] = useState(false)
  const [cardMeanings, setCardMeanings] = useState([])
  const [spreads, setSpreads] = useState([])

  useEffect(() => {
    fetchSpreadTypes()
    fetchCardMeanings()
  }, [])

  const fetchSpreadTypes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tarot/spreads')
      const data = await response.json()
      setSpreads(data.spreads || [])
    } catch (error) {
      console.error('Error fetching spread types:', error)
    }
  }

  const fetchCardMeanings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tarot/card-meanings')
      const data = await response.json()
      setCardMeanings(data.cards || [])
    } catch (error) {
      console.error('Error fetching card meanings:', error)
    }
  }

  const drawCards = async () => {
    if (!question.trim()) {
      alert('Please enter a question for your reading.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/tarot/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          spread_type: spreadType,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentReading(data)
      } else {
        throw new Error('Failed to draw cards')
      }
    } catch (error) {
      console.error('Error drawing cards:', error)
      alert('Error drawing cards. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const newReading = () => {
    setCurrentReading(null)
    setQuestion('')
  }

  const formatSpreadName = (spread) => {
    return spread.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getCardGridLayout = (cardCount) => {
    if (cardCount === 1) return 'grid-cols-1 max-w-xs mx-auto'
    if (cardCount === 3) return 'grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto'
    if (cardCount === 5) return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto'
    if (cardCount === 10) return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto gap-4'
    return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto'
  }

  const getPositionLabel = (spreadType, index) => {
    const labels = {
      'three_card': ['Past', 'Present', 'Future'],
      'five_card': ['Past', 'Present', 'Hidden', 'Advice', 'Outcome'],
      'celtic_cross': [
        'Present', 'Challenge', 'Past', 'Recent Past', 
        'Possible Outcome', 'Near Future', 'Your Approach', 
        'External Influences', 'Inner Emotions', 'Final Outcome'
      ]
    }
    
    const spreadLabels = labels[spreadType] || [`Card ${index + 1}`]
    return spreadLabels[index] || `Card ${index + 1}`
  }

  const formatInterpretation = (interpretation) => {
    // Format the interpretation with better typography
    return interpretation
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-yellow-300">$1</strong>')
      .replace(/\n\n/g, '\n\n')
  }

  const getSpreadDescription = (spreadType) => {
    const descriptions = {
      'single': 'A single card reading provides focused insight into your current situation and immediate guidance for your path forward.',
      'three_card': 'The three-card spread reveals the connection between your past experiences, present circumstances, and future potential. Each card builds upon the others to tell your complete story.',
      'five_card': 'This comprehensive five-card spread examines multiple dimensions of your situation, offering deep insights into hidden influences and practical guidance for achieving your goals.',
      'celtic_cross': 'The Celtic Cross is the most detailed tarot spread, providing a complete analysis of your situation from multiple angles including challenges, influences, and potential outcomes.'
    }
    
    return descriptions[spreadType] || 'This reading provides insight into your question through the wisdom of the tarot.'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Mystic background pattern */}
      <div className="absolute inset-0 bg-mystic-pattern opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Back Button */}
          <div className="flex justify-start mb-6">
            <button
              onClick={() => navigate('/')}
              className="p-3 rounded-lg hover:bg-white/20 transition-colors border border-purple-300/30"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-10 w-10 text-yellow-400 mr-4 animate-pulse" />
            <h1 className="heading-1 text-white font-display text-4xl lg:text-5xl">Sacred Tarot Reading</h1>
            <Sparkles className="h-10 w-10 text-yellow-400 ml-4 animate-pulse" />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-purple-200 leading-relaxed mb-6">
              Journey into the ancient wisdom of tarot cards, where sacred symbols reveal 
              profound insights about your life's path, relationships, and spiritual growth.
            </p>
            
            {/* Welcome Message */}
            <div className="glassmorphism-card p-6 mb-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-300/30">
              <h2 className="text-lg font-semibold text-white mb-3">🔮 Welcome to Your Sacred Journey</h2>
              <p className="text-purple-200 text-sm leading-relaxed">
                Each tarot reading is a sacred conversation between you and the universe. 
                Approach with respect, an open heart, and genuine intention for guidance. 
                The cards reflect energies and possibilities—your choices shape your destiny.
              </p>
            </div>
          </div>
        </div>

        {!currentReading ? (
          /* Question Form */
          <div className="max-w-2xl mx-auto">
            <div className="glassmorphism-card p-8 mb-8">
              <div className="text-center mb-8">
                <Moon className="h-16 w-16 text-purple-300 mx-auto mb-4 animate-float" />
                <h2 className="text-3xl font-bold text-white mb-4">Seek Divine Guidance</h2>
                <p className="text-purple-200 text-lg">Connect with ancient wisdom through the sacred art of tarot</p>
              </div>

              <div className="space-y-8">
                {/* Question Guidelines */}
                <div className="bg-white/5 rounded-lg p-6 border border-purple-300/20">
                  <h3 className="text-lg font-semibold text-white mb-3">How to Ask Powerful Questions</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-200">
                    <div>
                      <h4 className="font-medium text-purple-100 mb-2">✨ Good Questions:</h4>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>"What do I need to know about..."</li>
                        <li>"How can I improve my..."</li>
                        <li>"What energy surrounds my..."</li>
                        <li>"What should I focus on for..."</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-100 mb-2">🚫 Avoid:</h4>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Yes/No questions</li>
                        <li>Timing predictions</li>
                        <li>Third-party questions</li>
                        <li>Negative assumptions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3 text-lg">Your Sacred Question</label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What guidance does the universe have for my career path? What do I need to know about my relationship? How can I align with my highest purpose?"
                    className="w-full px-6 py-4 rounded-lg border border-purple-300/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-300 text-lg"
                    rows="4"
                  />
                  <p className="text-purple-300 text-sm mt-2">Take a moment to center yourself and ask what truly matters to you.</p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3 text-lg">Choose Your Sacred Spread</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { value: 'single', name: 'Single Card', desc: 'Quick guidance and daily insight', cards: '1 card' },
                      { value: 'three_card', name: 'Three Card', desc: 'Past, Present, Future journey', cards: '3 cards' },
                      { value: 'five_card', name: 'Five Card', desc: 'Comprehensive life guidance', cards: '5 cards' },
                      { value: 'celtic_cross', name: 'Celtic Cross', desc: 'Deep spiritual exploration', cards: '10 cards' }
                    ].map((spread) => (
                      <label key={spread.value} className={`
                        cursor-pointer rounded-lg border-2 p-4 transition-all duration-300
                        ${spreadType === spread.value 
                          ? 'border-purple-400 bg-purple-500/20' 
                          : 'border-purple-300/30 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
                        }
                      `}>
                        <input
                          type="radio"
                          name="spreadType"
                          value={spread.value}
                          checked={spreadType === spread.value}
                          onChange={(e) => setSpreadType(e.target.value)}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <h4 className="font-semibold text-white text-lg">{spread.name}</h4>
                          <p className="text-purple-200 text-sm mt-1">{spread.desc}</p>
                          <span className="inline-block bg-purple-500/40 text-purple-100 px-2 py-1 rounded text-xs mt-2">
                            {spread.cards}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={drawCards}
                  disabled={loading || !question.trim()}
                  className="w-full btn-primary py-6 text-xl font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <RefreshCw className="h-6 w-6 mr-3 animate-spin" />
                      The Cards are Speaking...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="h-6 w-6 mr-3" />
                      Reveal Sacred Wisdom
                      <Sparkles className="h-6 w-6 ml-3" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Professional Disclaimer & Educational Content */}
            <div className="text-center">
              <button
                onClick={() => setShowCardMeanings(!showCardMeanings)}
                className="inline-flex items-center text-purple-200 hover:text-white transition-colors mb-6"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                {showCardMeanings ? 'Hide' : 'Learn About'} Tarot Card Meanings
              </button>
            </div>

            {/* Educational Content */}
            {showCardMeanings && (
              <div className="glassmorphism-card p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Ancient Wisdom of Tarot</h3>
                
                {/* Quick Tarot Guide */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-400" />
                      Understanding Your Reading
                    </h4>
                    <div className="space-y-3 text-purple-200">
                      <p><strong className="text-purple-100">Upright Cards:</strong> Positive energy, external manifestation, conscious awareness</p>
                      <p><strong className="text-purple-100">Reversed Cards:</strong> Internal work, blocked energy, shadow aspects to explore</p>
                      <p><strong className="text-purple-100">Major Arcana:</strong> Life lessons, spiritual growth, karmic influences</p>
                      <p><strong className="text-purple-100">Minor Arcana:</strong> Daily situations, practical matters, emotional states</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                      The Four Elements
                    </h4>
                    <div className="space-y-3 text-purple-200">
                      <p><strong className="text-purple-100">🔥 Fire (Wands):</strong> Passion, creativity, career, inspiration</p>
                      <p><strong className="text-purple-100">💧 Water (Cups):</strong> Emotions, relationships, intuition, spirituality</p>
                      <p><strong className="text-purple-100">🌪️ Air (Swords):</strong> Thoughts, communication, challenges, clarity</p>
                      <p><strong className="text-purple-100">🌱 Earth (Pentacles):</strong> Material world, money, health, practical matters</p>
                    </div>
                  </div>
                </div>

                {/* Card Meanings Grid */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Card Reference Guide</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {cardMeanings.map((card, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4 border border-purple-300/20">
                        <h5 className="font-semibold text-white text-sm">{card.name}</h5>
                        <p className="text-purple-200 text-xs mt-1 leading-relaxed">{card.meaning}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {card.keywords.slice(0, 3).map((keyword, idx) => (
                            <span key={idx} className="bg-purple-500/30 text-purple-100 px-2 py-1 rounded text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Professional Disclaimer */}
                <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6 border border-purple-300/30">
                  <h4 className="text-lg font-semibold text-white mb-3">Professional Guidance & Disclaimer</h4>
                  <div className="text-purple-200 text-sm space-y-2">
                    <p>Tarot readings are for entertainment and spiritual guidance purposes. They reflect potential energies and possibilities, not predetermined fate.</p>
                    <p>Your free will and choices are the most powerful forces in shaping your future. Use tarot insights as a tool for self-reflection and personal growth.</p>
                    <p>For serious life decisions, please consult with qualified professionals in relevant fields (medical, legal, financial, etc.).</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Reading Results */
          <div className="max-w-6xl mx-auto">
            {/* Reading Header */}
            <div className="glassmorphism-card p-8 mb-8">
              <div className="text-center mb-8">
                <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold text-white mb-3">Your Sacred Reading</h2>
                <div className="bg-white/10 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-purple-200 text-lg italic">"{currentReading.question}"</p>
                  <div className="flex items-center justify-center mt-3 text-sm text-purple-300">
                    <span className="bg-purple-500/30 px-3 py-1 rounded-full mr-3">
                      {formatSpreadName(currentReading.spread_type)}
                    </span>
                    <span>{new Date(currentReading.date_generated).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Layout */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <Sparkles className="h-6 w-6 mr-2 text-yellow-400" />
                The Cards Speak
                <Sparkles className="h-6 w-6 ml-2 text-yellow-400" />
              </h3>
              
              <div className={`grid gap-6 ${getCardGridLayout(currentReading.cards.length)}`}>
                {currentReading.cards.map((card, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* Position Label for multi-card spreads */}
                    {currentReading.cards.length > 1 && (
                      <div className="mb-3">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {getPositionLabel(currentReading.spread_type, index)}
                        </span>
                      </div>
                    )}
                    
                    {/* Card */}
                    <div className={`
                      relative bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 
                      rounded-xl p-6 shadow-2xl transform transition-all duration-500 
                      hover:scale-105 hover:shadow-3xl border border-purple-300/20
                      hover:border-yellow-400/50 group
                      ${card.reversed ? 'rotate-180' : ''}
                      w-full max-w-xs
                    `}>
                      {/* Mystical glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Reversed indicator */}
                      {card.reversed && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-2 py-1 rounded text-xs font-bold shadow-lg">
                          REVERSED
                        </div>
                      )}
                      
                      <div className={`${card.reversed ? 'rotate-180' : ''} text-center relative z-10`}>
                        {/* Card Symbol/Number if available */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400/30 to-purple-500/30 rounded-full flex items-center justify-center border border-yellow-400/50">
                          <Star className="h-8 w-8 text-yellow-300 animate-pulse" />
                        </div>
                        
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">
                          {card.name}
                        </h4>
                        <p className="text-purple-100 text-sm leading-relaxed">{card.meaning}</p>
                      </div>
                    </div>
                    
                    {/* Keywords */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-xs">
                      {card.keywords.map((keyword, idx) => (
                        <span key={idx} className="bg-purple-500/40 text-purple-100 px-3 py-1 rounded-full text-xs font-medium border border-purple-300/30">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Interpretation */}
            <div className="glassmorphism-card p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-3 text-yellow-400" />
                Professional Interpretation
              </h3>
              <div className="prose prose-lg prose-invert max-w-none">
                <div 
                  className="text-purple-100 leading-relaxed whitespace-pre-line text-base"
                  dangerouslySetInnerHTML={{ __html: formatInterpretation(currentReading.interpretation) }}
                />
              </div>
            </div>

            {/* Sacred Guidance */}
            <div className="glassmorphism-card p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Sun className="h-6 w-6 mr-3 text-yellow-400" />
                Sacred Guidance & Action Steps
              </h3>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-300/30">
                <p className="text-purple-100 leading-relaxed text-base">{currentReading.advice}</p>
              </div>
            </div>

            {/* Spread Information */}
            <div className="glassmorphism-card p-6 mb-8">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <Moon className="h-5 w-5 mr-2 text-purple-300" />
                About Your {formatSpreadName(currentReading.spread_type)} Reading
              </h4>
              <p className="text-purple-200 text-sm leading-relaxed">
                {getSpreadDescription(currentReading.spread_type)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={newReading}
                className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Shuffle className="h-5 w-5 mr-2" />
                New Reading
              </button>
              <button
                onClick={() => window.print()}
                className="btn-outline px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Save Reading
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tarot
