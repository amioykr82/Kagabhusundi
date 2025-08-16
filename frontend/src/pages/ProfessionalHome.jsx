import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, Sparkles, Phone, MessageCircle, ShoppingBag, Calendar, Users, Crown, Heart, Zap, ChevronRight, Play, CheckCircle, TrendingUp, Globe, Shield, Award } from 'lucide-react'
import ProfessionalNavbar from '../components/ProfessionalNavbar'
import '../styles/banner.css'

const ProfessionalHome = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    consultations: 50000,
    astrologers: 500,
    users: 100000,
    accuracy: 95
  })

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const heroServices = [
    {
      icon: MessageCircle,
      title: 'Chat with Astrologer',
      description: 'Get instant guidance from expert astrologers',
      color: 'bg-pink-500',
      link: '/chat'
    },
    {
      icon: Phone,
      title: 'Talk to Astrologer', 
      description: 'Voice consultation with certified experts',
      color: 'bg-teal-500',
      link: '/contact'
    },
    {
      icon: ShoppingBag,
      title: 'Astro Store',
      description: 'Sacred items and spiritual remedies',
      color: 'bg-blue-500',
      link: '/store'
    },
    {
      icon: Calendar,
      title: 'Book Pooja',
      description: 'Schedule personalized spiritual ceremonies',
      color: 'bg-orange-500',
      link: '/book-pooja'
    }
  ]

  const complimentaryServices = [
    {
      icon: Star,
      title: "Today's Horoscope",
      description: 'Discover what the stars have in store for your day with personalized predictions',
      link: '/get-free-horoscope',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Crown,
      title: 'Free Kundali',
      description: 'Generate your detailed birth chart and unlock cosmic insights about your destiny',
      link: '/kundali',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Compatibility',
      description: 'Find your perfect match and explore relationship compatibility through astrology',
      link: '/compatibility',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Tarot Reading',
      description: 'Reveal hidden truths and future possibilities through mystical tarot cards',
      link: '/tarot',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'Kagabhushundi predictions about my career change came true exactly as foretold. The accuracy is incredible!',
      avatar: 'PS'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      text: 'The marriage compatibility report helped us understand each other better. Highly recommended!',
      avatar: 'RK'
    },
    {
      name: 'Anita Desai',
      location: 'Bangalore',
      rating: 5,
      text: 'Daily horoscopes are so accurate. I plan my important meetings based on the guidance provided.',
      avatar: 'AD'
    }
  ]

  const features = [
    { icon: Shield, title: '100% Privacy', description: 'Your data is completely secure' },
    { icon: Award, title: 'Expert Astrologers', description: '500+ certified professionals' },
    { icon: Globe, title: '24/7 Available', description: 'Round the clock guidance' },
    { icon: CheckCircle, title: 'Accurate Predictions', description: '95% accuracy rate' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <ProfessionalNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen flex items-center cosmic-stars">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-mystic-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold shimmer cosmic-glow">
                    <Crown className="h-5 w-5 mr-2" />
                    Premium Astrology Platform
                  </div>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
                  <span className="gradient-text">KAGABHUSHUNDI</span>
                  <br />
                  <span className="text-3xl lg:text-4xl text-purple-200 font-normal animate-float">
                    Wisdom of the Cosmos, Enhanced by AI
                  </span>
                </h1>
                
                <p className="text-xl text-purple-200 leading-relaxed max-w-2xl">
                  Connect with India's most trusted astrologers for personalized guidance. 
                  Get instant predictions, birth chart analysis, and spiritual remedies powered by ancient wisdom and modern AI.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/get-free-horoscope"
                  className="btn-professional inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 cosmic-glow"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Get Free Horoscope
                </Link>
                <Link 
                  to="/kundali"
                  className="btn-professional inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-900 transition-all duration-300"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Generate Kundali
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.consultations.toLocaleString()}+</div>
                  <div className="text-purple-200 text-sm">Consultations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.astrologers}+</div>
                  <div className="text-purple-200 text-sm">Expert Astrologers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.users.toLocaleString()}+</div>
                  <div className="text-purple-200 text-sm">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.accuracy}%</div>
                  <div className="text-purple-200 text-sm">Accuracy Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Banner */}
            <div className="relative">
              {/* Cosmic Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
              
              {/* Main Banner Container */}
              <div className="relative z-10 professional-card bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-xl rounded-3xl p-2 border-2 border-yellow-400/40 cosmic-glow overflow-hidden">
                <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl overflow-hidden relative">
                  {/* Banner Image */}
                  <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-2xl">
                    {/* Try to load the actual banner image first */}
                    <img 
                      src="/kagabhushundi-banner.jpg" 
                      alt="Kagabhushundi - The Wise Cosmic Sage"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If image fails to load, show the CSS fallback
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback CSS design (hidden by default) */}
                    <div className="w-full h-full kagabhushundi-banner" style={{display: 'none'}}>
                      {/* Moon Crescent */}
                      <div className="moon-crescent"></div>
                      
                      {/* Central Crow Figure */}
                      <div className="cosmic-crow text-center">
                        <div className="cosmic-crown mb-6">
                          <Crown className="h-24 w-24 mx-auto text-yellow-400" />
                        </div>
                        <h3 className="text-5xl font-bold mb-4 text-white font-serif">KAGABHUSHUNDI</h3>
                        <p className="text-xl text-purple-200 mb-2">Wisdom of the Cosmos,</p>
                        <p className="text-xl text-purple-200">Enhanced by AI</p>
                      </div>
                      
                      {/* Zodiac Wheel */}
                      <div className="cosmic-wheel">
                        <div className="zodiac-symbol">♈</div>
                        <div className="zodiac-symbol">♉</div>
                        <div className="zodiac-symbol">♊</div>
                        <div className="zodiac-symbol">♋</div>
                        <div className="zodiac-symbol">♌</div>
                        <div className="zodiac-symbol">♍</div>
                        <div className="zodiac-symbol">♎</div>
                        <div className="zodiac-symbol">♏</div>
                        <div className="zodiac-symbol">♐</div>
                        <div className="zodiac-symbol">♑</div>
                        <div className="zodiac-symbol">♒</div>
                        <div className="zodiac-symbol">♓</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Banner Overlay Text */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 cosmic-glow-text">Discover Your Cosmic Destiny</h3>
                        <p className="text-purple-200">Ancient wisdom meets modern AI technology</p>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold text-lg">KAGABHUSHUNDI</div>
                        <div className="text-purple-200 text-sm">The Wise Cosmic Sage</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="h-8 w-8 text-purple-900" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroServices.map((service, index) => (
              <Link 
                key={index}
                to={service.link}
                className="professional-card bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
              >
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cosmic-glow`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700">{service.description}</p>
                <div className="mt-4 flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrity Recommendation Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30">
              <div className="flex items-center justify-center mb-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-12 h-12 bg-white rounded-full border-4 border-yellow-400 flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-500" />
                    </div>
                  ))}
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Trusted by 100,000+ Users Worldwide
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Celebrity astrologers and spiritual guides recommend Kagabhushundi for accurate predictions and life guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/get-free-horoscope"
                  className="btn-professional bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300"
                >
                  Start Your Journey
                </Link>
                <Link 
                  to="/about"
                  className="btn-professional border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complimentary Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="h-4 w-4 mr-2" />
              Complimentary Services
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 gradient-text">Premium Astrology Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore your cosmic blueprint with our free premium services powered by advanced AI and traditional wisdom
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complimentaryServices.map((service, index) => (
              <Link 
                key={index}
                to={service.link}
                className="group block"
              >
                <div className="professional-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 cosmic-glow">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shimmer`}>
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700">{service.description}</p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-800 transition-colors">
                    Get Started Free
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real experiences from our community</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="testimonial-card bg-white/70 rounded-3xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Discover Your Cosmic Path?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Join thousands who trust Kagabhushundi for their spiritual journey. Get your first reading free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="btn-professional bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 cosmic-glow"
              >
                Get Started Free
              </Link>
              <Link 
                to="/horoscope"
                className="btn-professional border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-900 transition-all duration-300"
              >
                Try Free Reading
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">KAGABHUSHUNDI</h3>
              <p className="text-gray-400">
                Your trusted companion for cosmic wisdom and spiritual guidance.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/get-free-horoscope" className="hover:text-white">Horoscope</Link></li>
                <li><Link to="/kundali" className="hover:text-white">Kundali</Link></li>
                <li><Link to="/tarot" className="hover:text-white">Tarot Reading</Link></li>
                <li><Link to="/compatibility" className="hover:text-white">Compatibility</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">Follow us for daily cosmic insights</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Star className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Crown className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Sparkles className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Kagabhushundi. All rights reserved. Made with cosmic love ✨</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProfessionalHome
