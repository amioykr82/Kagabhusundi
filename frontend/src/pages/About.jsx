import React from 'react'
import { Star, Clock, Brain, Heart, Shield, Globe, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  const features = [
    {
      icon: Star,
      title: 'Ancient Wisdom',
      description: 'Traditional Vedic astrology principles combined with Swiss Ephemeris precision for the most accurate calculations.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Advanced artificial intelligence enhances traditional interpretations with personalized guidance and modern context.'
    },
    {
      icon: Clock,
      title: 'Real-Time Calculations',
      description: 'Live planetary positions and transits calculated using the most advanced astronomical algorithms available.'
    },
    {
      icon: Heart,
      title: 'Personalized Experience',
      description: 'Each reading is tailored to your unique birth chart and personal circumstances for maximum relevance.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your personal information and birth details are protected with enterprise-grade security measures.'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Available worldwide with support for multiple time zones and location-based accurate calculations.'
    }
  ]

  const team = [
    {
      name: 'Master Astrologer',
      role: 'Vedic Astrology Expert',
      description: 'Over 20 years of experience in traditional Jyotish and birth chart analysis.'
    },
    {
      name: 'AI Specialist',
      role: 'Machine Learning Engineer',
      description: 'Developing cutting-edge AI models for astrological interpretation and guidance.'
    },
    {
      name: 'Spiritual Guide',
      role: 'Tarot & Divination Expert',
      description: 'Bringing intuitive wisdom and ancient divination practices to the digital age.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="heading-1 text-primary-800 font-display mb-6">About Kagabhushundi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where ancient wisdom meets modern technology to illuminate your spiritual journey
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card-mystic p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Kagabhushundi is named after the legendary wise crow sage from ancient Indian mythology, 
                known for his profound knowledge of time, space, and cosmic events. According to the Ramayana 
                and other sacred texts, Kagabhushundi witnessed multiple cosmic cycles and possessed the 
                divine gift of seeing across all dimensions of time.
              </p>
              <p>
                Just like our mythological namesake, we bridge the gap between timeless spiritual wisdom 
                and the infinite possibilities of the future. Our platform represents the perfect synthesis 
                of traditional Vedic astrology, Western astrological insights, and cutting-edge artificial intelligence.
              </p>
              <p>
                Founded by a team of passionate astrologers, technologists, and spiritual guides, 
                Kagabhushundi was born from the vision of making authentic astrological guidance 
                accessible to seekers worldwide while preserving the sanctity and accuracy of ancient traditions.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Makes Us Special</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Our Mission</h3>
            <p className="text-purple-700 leading-relaxed">
              To democratize access to authentic astrological wisdom by combining traditional 
              knowledge with modern technology, empowering individuals to make informed decisions 
              and navigate their life journey with cosmic guidance.
            </p>
          </div>
          <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg p-8 border border-rose-200">
            <h3 className="text-2xl font-bold text-rose-800 mb-4">Our Vision</h3>
            <p className="text-rose-700 leading-relaxed">
              To become the world's most trusted platform for astrological guidance, 
              where ancient wisdom and cutting-edge AI work together to illuminate 
              the path toward personal growth, relationships, and spiritual fulfillment.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Expert Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accuracy Notice */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Accuracy & Precision</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Our calculations are powered by the Swiss Ephemeris, the most accurate astronomical 
                  computation library available. We use precise birth time and location data to ensure 
                  your charts and readings reflect the exact planetary positions at your moment of birth. 
                  For the most accurate results, please provide precise birth time and location information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
