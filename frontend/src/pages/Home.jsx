import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Sun, Moon, Users, ArrowRight, Sparkles } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Star,
      title: 'Birth Chart Analysis',
      description: 'Get detailed Kundali with planetary positions, houses, nakshatras, and AI-powered interpretations.',
      link: '/kundali',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Sun,
      title: 'Daily Horoscope',
      description: 'Personalized predictions for your zodiac sign with career, love, health, and finance guidance.',
      link: '/horoscope',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Moon,
      title: 'Tarot Readings',
      description: 'Draw cards and receive intuitive guidance for life decisions with AI-enhanced interpretations.',
      link: '/tarot',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Compatibility Check',
      description: 'Analyze astrological compatibility between partners with detailed relationship insights.',
      link: '/compatibility',
      color: 'from-pink-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 mystic-bg"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="heading-1 mb-6">
              <span className="block">Discover Your</span>
              <span className="block gradient-text font-mystic">Cosmic Destiny</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Unlock the secrets of the universe with Kagabhushundi - your gateway to advanced Vedic and Western astrology, 
              AI-powered insights, and mystical guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kundali" className="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center">
                Generate Your Kundali
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/horoscope" className="btn-outline px-8 py-4 text-lg inline-flex items-center justify-center">
                Daily Horoscope
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Explore Your Astrological Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced platform combines traditional astrological wisdom with modern AI technology 
              to provide you with the most accurate and insightful readings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-mystic hover-lift hover-glow group cursor-pointer"
                onClick={() => window.location.href = feature.link}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform"
                >
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Unlock Your Cosmic Potential?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who trust Kagabhushundi for their astrological guidance. 
            Create your account and get personalized insights today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Get Started Free
              <Star className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Birth Charts Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Horoscope Readings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">25K+</div>
              <div className="text-gray-600">Tarot Readings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
