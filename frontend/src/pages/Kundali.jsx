import React, { useState } from 'react'
import { ArrowLeft, Calendar, MapPin, Clock, User, Star, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Kundali = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birth_date: '',
    birth_time: '',
    birth_period: 'AM',
    birth_location: '',
    latitude: '',
    longitude: '',
    timezone: 'Asia/Kolkata'
  })
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState('basic')
  
  // Sub-tab states
  const [kundaliChartStyle, setKundaliChartStyle] = useState('north')
  const [chartsStyle, setChartsStyle] = useState('north')
  const [dashaType, setDashaType] = useState('vimshottari')
  const [reportCategory, setReportCategory] = useState('general')

  // Popular cities with coordinates for easy selection
  const popularCities = [
    { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
    { name: 'Delhi, India', lat: 28.7041, lng: 77.1025 },
    { name: 'Bangalore, India', lat: 12.9716, lng: 77.5946 },
    { name: 'Kolkata, India', lat: 22.5726, lng: 88.3639 },
    { name: 'Chennai, India', lat: 13.0827, lng: 80.2707 },
    { name: 'Pune, India', lat: 18.5204, lng: 73.8567 },
    { name: 'Hyderabad, India', lat: 17.3850, lng: 78.4867 },
    { name: 'Ahmedabad, India', lat: 23.0225, lng: 72.5714 }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCitySelect = (city) => {
    setFormData(prev => ({
      ...prev,
      birth_location: city.name,
      latitude: city.lat.toString(),
      longitude: city.lng.toString()
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:8000/api/kundali/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude)
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate Kundali')
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button
              onClick={() => navigate('/')}
              className="hover:text-purple-600 transition-colors flex items-center mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Home
            </button>
            <span className="mx-2">•</span>
            <span className="text-purple-600 font-medium">Free Kundali</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              ✨ Free Kundali Online ✨
            </h1>
            <p className="text-xl text-purple-600 mb-2">Get Your Detailed Birth Chart with Predictions</p>
            <p className="text-gray-600 max-w-3xl mx-auto">
              🔮 Generate your accurate Janam Kundali instantly. Get detailed planetary positions, 
              future predictions, and personalized remedies based on Vedic astrology.
            </p>
          </div>

          {!result && (
            <div className="max-w-4xl mx-auto">
              {/* Form Header */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Enter Your Birth Details</h2>
                  <p className="text-gray-600">All fields are required for accurate Kundali generation</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <User className="h-5 w-5 mr-2 text-purple-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Birth Date & Time */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Birth Date & Time
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Birth Date *</label>
                        <input
                          type="date"
                          name="birth_date"
                          value={formData.birth_date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Birth Time *</label>
                        <div className="flex gap-3">
                          <div className="flex-1 relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="time"
                              name="birth_time"
                              value={formData.birth_time}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                          <select
                            name="birth_period"
                            value={formData.birth_period}
                            onChange={handleInputChange}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Exact time is crucial for accurate predictions</p>
                      </div>
                    </div>
                  </div>

                  {/* Birth Location */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-green-600" />
                      Birth Location
                    </h3>
                    
                    {/* Popular Cities */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-3 text-gray-700">Quick Select Popular Cities</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {popularCities.map((city, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleCitySelect(city)}
                            className="text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-green-50 hover:border-green-300 transition-all"
                          >
                            {city.name.split(',')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Birth Location *</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="birth_location"
                            value={formData.birth_location}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="City, Country"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Latitude *</label>
                        <input
                          type="number"
                          step="any"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="e.g., 19.0760"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Longitude *</label>
                        <input
                          type="number"
                          step="any"
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="e.g., 72.8777"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timezone */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-orange-600" />
                      Timezone Settings
                    </h3>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Timezone</label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST) - India Standard Time</option>
                        <option value="America/New_York">America/New_York (EST) - Eastern Time</option>
                        <option value="Europe/London">Europe/London (GMT) - Greenwich Mean Time</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PST) - Pacific Time</option>
                        <option value="Asia/Dubai">Asia/Dubai (GST) - Gulf Standard Time</option>
                        <option value="Asia/Singapore">Asia/Singapore (SGT) - Singapore Time</option>
                        <option value="Australia/Sydney">Australia/Sydney (AEST) - Australian Eastern Time</option>
                      </select>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
                      <strong>Error:</strong> {error}
                    </div>
                  )}
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Generating Your Kundali...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Star className="h-5 w-5 mr-2" />
                          Generate Free Kundali
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Header with Generate New Button */}
              <div className="text-center bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  🎯 Complete Kundali Report
                </h2>
                <p className="text-gray-600 mb-6">Generated for {formData.name} • {formData.birth_date} • {formData.birth_time} {formData.birth_period}</p>
                <button
                  onClick={() => setResult(null)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Generate New Kundali
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex flex-wrap">
                    {[
                      { id: 'basic', label: 'Basic', icon: '📊' },
                      { id: 'kundali', label: 'Kundali', icon: '🔮' },
                      { id: 'kp', label: 'KP', icon: '🎯' },
                      { id: 'ashtakvarga', label: 'Ashtakvarga', icon: '📈' },
                      { id: 'charts', label: 'Charts', icon: '📋' },
                      { id: 'dasha', label: 'Dasha', icon: '⏰' },
                      { id: 'report', label: 'Free Report', icon: '📝' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-4 text-sm font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {/* Basic Tab */}
                  {activeTab === 'basic' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Basic Details</h3>
                      
                      {/* Personal Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium">{formData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium">{formData.birth_date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Time:</span>
                              <span className="font-medium">{formData.birth_time} {formData.birth_period}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Place:</span>
                              <span className="font-medium">{formData.birth_location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Latitude:</span>
                              <span className="font-medium">{formData.latitude}°</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Longitude:</span>
                              <span className="font-medium">{formData.longitude}°</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Timezone:</span>
                              <span className="font-medium">{formData.timezone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Avakhada Details</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Varna:</span>
                              <span className="font-medium">Brahmin</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vashya:</span>
                              <span className="font-medium">Jalchar</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Yoni:</span>
                              <span className="font-medium">Gaja</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Gan:</span>
                              <span className="font-medium">Dev</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Nadi:</span>
                              <span className="font-medium">Antya</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sign:</span>
                              <span className="font-medium">{result.kundali_data.sun_sign}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sign Lord:</span>
                              <span className="font-medium">Jupiter</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Panchang Details */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Panchang Details</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <span className="text-gray-600 block">Tithi</span>
                            <span className="font-medium">Shukla Ashtami</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block">Karan</span>
                            <span className="font-medium">Bav</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block">Yog</span>
                            <span className="font-medium">Parigha</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block">Nakshatra</span>
                            <span className="font-medium">{result.kundali_data.birth_nakshatra}</span>
                          </div>
                        </div>
                      </div>

                      {/* Essential Signs */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border-2 border-red-200 rounded-xl p-6 text-center">
                          <div className="text-3xl mb-3">♈</div>
                          <h4 className="text-lg font-semibold text-gray-800">Ascendant</h4>
                          <p className="text-xl font-bold text-red-600">{result.kundali_data.ascendant}</p>
                        </div>
                        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 text-center">
                          <div className="text-3xl mb-3">🌙</div>
                          <h4 className="text-lg font-semibold text-gray-800">Moon Sign</h4>
                          <p className="text-xl font-bold text-blue-600">{result.kundali_data.moon_sign}</p>
                        </div>
                        <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 text-center">
                          <div className="text-3xl mb-3">☀️</div>
                          <h4 className="text-lg font-semibold text-gray-800">Sun Sign</h4>
                          <p className="text-xl font-bold text-yellow-600">{result.kundali_data.sun_sign}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Kundali Tab */}
                  {activeTab === 'kundali' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Birth Charts & Planetary Positions</h3>
                      
                      {/* Chart Style Selection */}
                      <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-lg p-1 flex">
                          <button 
                            onClick={() => setKundaliChartStyle('north')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${
                              kundaliChartStyle === 'north' 
                                ? 'bg-yellow-400 text-black' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            North Indian
                          </button>
                          <button 
                            onClick={() => setKundaliChartStyle('south')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${
                              kundaliChartStyle === 'south' 
                                ? 'bg-yellow-400 text-black' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            South Indian
                          </button>
                        </div>
                      </div>

                      {/* Birth Charts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-center mb-4">Lagna / Ascendant / Basic Birth Chart</h4>
                          <div className="bg-yellow-50 border-2 border-yellow-200 w-80 h-80 mx-auto relative">
                            {kundaliChartStyle === 'north' ? (
                              /* North Indian Chart Layout */
                              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">12</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">1</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">2</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">3</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">11</div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">4</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">10</div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">5</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">9</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">8</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">7</div>
                                <div className="border border-gray-300 flex items-center justify-center text-sm font-medium">6</div>
                              </div>
                            ) : (
                              /* South Indian Chart Layout */
                              <div className="absolute inset-0">
                                {/* Top row */}
                                <div className="absolute top-0 left-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">12</div>
                                <div className="absolute top-0 left-1/4 w-1/2 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">1</div>
                                <div className="absolute top-0 right-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">2</div>
                                
                                {/* Middle row */}
                                <div className="absolute top-1/4 left-0 w-1/4 h-1/2 border border-gray-300 flex items-center justify-center text-sm font-medium">11</div>
                                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-500">Chart Center</div>
                                <div className="absolute top-1/4 right-0 w-1/4 h-1/2 border border-gray-300 flex items-center justify-center text-sm font-medium">3</div>
                                
                                {/* Bottom row */}
                                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">10</div>
                                <div className="absolute bottom-0 left-1/4 w-1/2 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">9</div>
                                <div className="absolute bottom-0 right-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">4</div>
                                
                                {/* Side houses */}
                                <div className="absolute left-0 top-3/4 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">8</div>
                                <div className="absolute left-1/4 bottom-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">7</div>
                                <div className="absolute left-1/2 bottom-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">6</div>
                                <div className="absolute right-0 bottom-1/4 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-sm font-medium">5</div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-center mb-4">Navamsa (D9 Chart)</h4>
                          <div className="bg-blue-50 border-2 border-blue-200 w-80 h-80 mx-auto relative">
                            {kundaliChartStyle === 'north' ? (
                              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                                <div className="border border-gray-300 flex items-center justify-center text-xs">12</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">1</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">2</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">3</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">11</div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">4</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">10</div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 bg-gray-100"></div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">5</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">9</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">8</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">7</div>
                                <div className="border border-gray-300 flex items-center justify-center text-xs">6</div>
                              </div>
                            ) : (
                              <div className="absolute inset-0">
                                <div className="absolute top-0 left-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">12</div>
                                <div className="absolute top-0 left-1/4 w-1/2 h-1/4 border border-gray-300 flex items-center justify-center text-xs">1</div>
                                <div className="absolute top-0 right-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">2</div>
                                <div className="absolute top-1/4 left-0 w-1/4 h-1/2 border border-gray-300 flex items-center justify-center text-xs">11</div>
                                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-500">D9</div>
                                <div className="absolute top-1/4 right-0 w-1/4 h-1/2 border border-gray-300 flex items-center justify-center text-xs">3</div>
                                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">10</div>
                                <div className="absolute bottom-0 left-1/4 w-1/2 h-1/4 border border-gray-300 flex items-center justify-center text-xs">9</div>
                                <div className="absolute bottom-0 right-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">4</div>
                                <div className="absolute left-0 top-3/4 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">8</div>
                                <div className="absolute left-1/4 bottom-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">7</div>
                                <div className="absolute left-1/2 bottom-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">6</div>
                                <div className="absolute right-0 bottom-1/4 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs">5</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Planetary Positions Table */}
                      <div className="bg-white rounded-lg border shadow-sm">
                        <h4 className="text-lg font-semibold p-6 border-b">Planetary Positions</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Planet</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Sign</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Sign Lord</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Nakshatra</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Naksh Lord</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Degree</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Retro(R)</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">House</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-800">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.kundali_data.planet_positions.map((planet, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                  <td className="px-4 py-3 font-medium">{planet.planet}</td>
                                  <td className="px-4 py-3">{planet.sign}</td>
                                  <td className="px-4 py-3">Jupiter</td>
                                  <td className="px-4 py-3">{planet.nakshatra}</td>
                                  <td className="px-4 py-3">Mercury</td>
                                  <td className="px-4 py-3">{planet.degree.toFixed(2)}°</td>
                                  <td className="px-4 py-3">
                                    {planet.retrograde ? (
                                      <span className="text-red-600 font-medium">Yes</span>
                                    ) : (
                                      <span className="text-green-600">No</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">{planet.house}</td>
                                  <td className="px-4 py-3">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                      Friendly
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* KP Tab */}
                  {activeTab === 'kp' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">KP System Analysis</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-center mb-4">Bhav Chalit Chart</h4>
                          <div className="bg-orange-50 border-2 border-orange-200 w-80 h-80 mx-auto relative">
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                              <div className="border border-gray-300 flex items-center justify-center text-sm">12</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">1</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">2</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">3</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">11</div>
                              <div className="border border-gray-300 bg-gray-100"></div>
                              <div className="border border-gray-300 bg-gray-100"></div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">4</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">10</div>
                              <div className="border border-gray-300 bg-gray-100"></div>
                              <div className="border border-gray-300 bg-gray-100"></div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">5</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">9</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">8</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">7</div>
                              <div className="border border-gray-300 flex items-center justify-center text-sm">6</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-white border rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4">Ruling Planets</h4>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <span className="text-gray-600 block text-sm">Sign Lord</span>
                                <span className="font-medium">Mars</span>
                              </div>
                              <div>
                                <span className="text-gray-600 block text-sm">Star Lord</span>
                                <span className="font-medium">Venus</span>
                              </div>
                              <div>
                                <span className="text-gray-600 block text-sm">Sub Lord</span>
                                <span className="font-medium">Rahu</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4">Day Lord</h4>
                            <div className="text-center">
                              <span className="text-2xl font-bold text-purple-600">Venus</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* KP Planetary Positions */}
                      <div className="bg-white rounded-lg border shadow-sm">
                        <h4 className="text-lg font-semibold p-6 border-b">KP Planetary Analysis</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-yellow-50">
                              <tr>
                                <th className="px-4 py-3 text-left">Planets</th>
                                <th className="px-4 py-3 text-left">Cusp</th>
                                <th className="px-4 py-3 text-left">Sign</th>
                                <th className="px-4 py-3 text-left">Sign Lord</th>
                                <th className="px-4 py-3 text-left">Star Lord</th>
                                <th className="px-4 py-3 text-left">Sub Lord</th>
                              </tr>
                            </thead>
                            <tbody>
                              {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'].map((planet, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                  <td className="px-4 py-3 font-medium">{planet}</td>
                                  <td className="px-4 py-3">{index + 1}</td>
                                  <td className="px-4 py-3">Sagittarius</td>
                                  <td className="px-4 py-3">Ju</td>
                                  <td className="px-4 py-3">Ve</td>
                                  <td className="px-4 py-3">Ra</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ashtakvarga Tab */}
                  {activeTab === 'ashtakvarga' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Ashtakvarga Analysis</h3>
                      <p className="text-gray-600 mb-6">
                        Ashtakvarga is used to assess the strength and patterns present in a birth chart. It provides numerical 
                        scores for each planet's influence in different houses.
                      </p>

                      {/* Ashtakvarga Charts Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Ascendant', 'SAV'].map((planet, index) => (
                          <div key={index} className="bg-white border rounded-lg p-4">
                            <h4 className="text-center font-semibold mb-3">{planet}</h4>
                            <div className="w-40 h-40 mx-auto border-2 border-gray-300 relative">
                              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 text-xs">
                                {/* Ashtakvarga numerical grid */}
                                {Array.from({length: 16}, (_, i) => {
                                  const isCorner = [0,1,2,3,4,7,8,11,12,13,14,15].includes(i);
                                  const score = isCorner ? Math.floor(Math.random() * 8) + 1 : '';
                                  return (
                                    <div key={i} className={`border border-gray-200 flex items-center justify-center ${isCorner ? 'bg-yellow-50' : 'bg-gray-100'}`}>
                                      {score}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Ashtakvarga Summary */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Ashtakvarga Summary</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <span className="text-gray-600 block">Total SAV Score</span>
                            <span className="text-2xl font-bold text-purple-600">337</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block">Strongest House</span>
                            <span className="text-xl font-bold text-green-600">7th</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block">Weakest House</span>
                            <span className="text-xl font-bold text-red-600">12th</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block">Average Score</span>
                            <span className="text-xl font-bold text-blue-600">4.2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Charts Tab */}
                  {activeTab === 'charts' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Divisional Charts (Vargas)</h3>
                      
                      {/* Chart Style Selection */}
                      <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-lg p-1 flex">
                          <button 
                            onClick={() => setChartsStyle('north')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${
                              chartsStyle === 'north' 
                                ? 'bg-yellow-400 text-black' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            North Indian
                          </button>
                          <button 
                            onClick={() => setChartsStyle('south')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${
                              chartsStyle === 'south' 
                                ? 'bg-yellow-400 text-black' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            South Indian
                          </button>
                        </div>
                      </div>

                      {/* Divisional Charts Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                          { name: 'Lagna / Ascendant / Basic Birth Chart', desc: 'D1 - Overall Life' },
                          { name: 'Hora (Wealth / Income Chart)', desc: 'D2 - Wealth & Finance' },
                          { name: 'Drekkana (Relationship with siblings)', desc: 'D3 - Siblings & Courage' },
                          { name: 'Chaturthamsa (Assets)', desc: 'D4 - Property & Assets' },
                          { name: 'Saptamsa (Progeny)', desc: 'D7 - Children' },
                          { name: 'Navamsa (Prospects of marriage)', desc: 'D9 - Marriage & Spirituality' },
                          { name: 'Dasamsa (Career)', desc: 'D10 - Career & Profession' },
                          { name: 'Dwadasamsa (Parents)', desc: 'D12 - Parents' },
                          { name: 'Shodasamsa (Vehicles)', desc: 'D16 - Vehicles & Happiness' }
                        ].map((chart, index) => (
                          <div key={index} className="bg-white border rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-center mb-2">{chart.name}</h4>
                            <p className="text-xs text-gray-600 text-center mb-3">{chart.desc}</p>
                            <div className="w-48 h-48 mx-auto border-2 border-gray-300 bg-yellow-50 relative">
                              {chartsStyle === 'north' ? (
                                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                                  {Array.from({length: 16}, (_, i) => {
                                    const isActive = [0,1,2,3,4,7,8,11,12,13,14,15].includes(i);
                                    return (
                                      <div key={i} className={`border border-gray-200 flex items-center justify-center text-xs ${
                                        isActive ? 'bg-white' : 'bg-gray-100'
                                      }`}>
                                        {isActive && (i + 1)}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="absolute inset-0">
                                  {/* South Indian Style */}
                                  <div className="absolute top-0 left-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">12</div>
                                  <div className="absolute top-0 left-1/4 w-1/2 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">1</div>
                                  <div className="absolute top-0 right-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">2</div>
                                  <div className="absolute top-1/4 left-0 w-1/4 h-1/2 border border-gray-300 flex items-center justify-center text-xs bg-white">11</div>
                                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-500">{chart.desc.split(' - ')[0]}</div>
                                  <div className="absolute top-1/4 right-0 w-1/4 h-1/2 border border-gray-300 flex items-center justify-center text-xs bg-white">3</div>
                                  <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">10</div>
                                  <div className="absolute bottom-0 left-1/4 w-1/2 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">9</div>
                                  <div className="absolute bottom-0 right-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">4</div>
                                  <div className="absolute left-0 top-3/4 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">8</div>
                                  <div className="absolute left-1/4 bottom-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">7</div>
                                  <div className="absolute left-1/2 bottom-0 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">6</div>
                                  <div className="absolute right-0 bottom-1/4 w-1/4 h-1/4 border border-gray-300 flex items-center justify-center text-xs bg-white">5</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dasha Tab */}
                  {activeTab === 'dasha' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Dasha Periods (Vimshottari)</h3>
                      
                      {/* Dasha Type Selection */}
                      <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-lg p-1 flex">
                          <button 
                            onClick={() => setDashaType('vimshottari')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${
                              dashaType === 'vimshottari' 
                                ? 'bg-yellow-400 text-black' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            Vimshottari
                          </button>
                          <button 
                            onClick={() => setDashaType('yogini')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${
                              dashaType === 'yogini' 
                                ? 'bg-yellow-400 text-black' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            Yogini
                          </button>
                        </div>
                      </div>

                      {/* Current Dasha */}
                      {dashaType === 'vimshottari' ? (
                        <div>
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4">Understanding Your Vimshottari Dasha</h4>
                            <p className="text-gray-700 mb-4">
                              Vimshottari Dasha system divides your life into planetary periods totaling 120 years. Each planet rules for a specific duration, 
                              influencing major life events and opportunities during that time.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white rounded-lg p-4">
                                <h5 className="font-semibold text-gray-800 mb-2">Current Mahadasha</h5>
                                <p className="text-2xl font-bold text-blue-600">{result.kundali_data.dasha_info.current_dasha_lord}</p>
                                <p className="text-sm text-gray-600">Remaining: {result.kundali_data.dasha_info.remaining_years} years</p>
                              </div>
                              <div className="bg-white rounded-lg p-4">
                                <h5 className="font-semibold text-gray-800 mb-2">Period</h5>
                                <p className="text-lg text-gray-700">16-05-1975 - 16-05-1992</p>
                                <p className="text-sm text-gray-600">17 year period</p>
                              </div>
                            </div>
                          </div>

                          {/* Vimshottari Dasha Timeline */}
                          <div className="bg-white rounded-lg border shadow-sm">
                            <h4 className="text-lg font-semibold p-6 border-b">Complete Vimshottari Dasha Timeline</h4>
                            <div className="p-6 space-y-6">
                              {[
                                { planet: 'Mercury Mahadasha', period: '16-05-1975 - 16-05-1992', years: '17 years', status: 'completed' },
                                { planet: 'Ketu Mahadasha', period: '16-05-1992 - 16-05-1999', years: '7 years', status: 'completed' },
                                { planet: 'Venus Mahadasha', period: '16-05-1999 - 16-05-2019', years: '20 years', status: 'current' },
                                { planet: 'Sun Mahadasha', period: '16-05-2019 - 16-05-2025', years: '6 years', status: 'upcoming' },
                                { planet: 'Moon Mahadasha', period: '16-05-2025 - 16-05-2035', years: '10 years', status: 'upcoming' },
                                { planet: 'Mars Mahadasha', period: '16-05-2035 - 16-05-2042', years: '7 years', status: 'upcoming' },
                                { planet: 'Rahu Mahadasha', period: '16-05-2042 - 16-05-2060', years: '18 years', status: 'upcoming' },
                                { planet: 'Jupiter Mahadasha', period: '16-05-2060 - 16-05-2076', years: '16 years', status: 'upcoming' },
                                { planet: 'Saturn Mahadasha', period: '16-05-2076 - 16-05-2095', years: '19 years', status: 'upcoming' }
                              ].map((dasha, index) => (
                                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                                  dasha.status === 'current' ? 'border-green-500 bg-green-50' :
                                  dasha.status === 'completed' ? 'border-gray-400 bg-gray-50' :
                                  'border-blue-500 bg-blue-50'
                                }`}>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h5 className="font-semibold text-gray-800">{dasha.planet}</h5>
                                      <p className="text-sm text-gray-600">{dasha.period}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-gray-800">{dasha.years}</p>
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        dasha.status === 'current' ? 'bg-green-200 text-green-800' :
                                        dasha.status === 'completed' ? 'bg-gray-200 text-gray-800' :
                                        'bg-blue-200 text-blue-800'
                                      }`}>
                                        {dasha.status.charAt(0).toUpperCase() + dasha.status.slice(1)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Yogini Dasha Content */
                        <div>
                          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4">Understanding Your Yogini Dasha</h4>
                            <p className="text-gray-700 mb-4">
                              Yogini Dasha system is based on 8 Yoginis (divine feminine powers) and covers a cycle of 36 years. 
                              Each Yogini rules for a specific duration based on Nakshatra calculations.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white rounded-lg p-4">
                                <h5 className="font-semibold text-gray-800 mb-2">Current Yogini</h5>
                                <p className="text-2xl font-bold text-purple-600">Mangala</p>
                                <p className="text-sm text-gray-600">Remaining: 2.5 years</p>
                              </div>
                              <div className="bg-white rounded-lg p-4">
                                <h5 className="font-semibold text-gray-800 mb-2">Period</h5>
                                <p className="text-lg text-gray-700">12-08-2023 - 12-08-2026</p>
                                <p className="text-sm text-gray-600">3 year period</p>
                              </div>
                            </div>
                          </div>

                          {/* Yogini Dasha Timeline */}
                          <div className="bg-white rounded-lg border shadow-sm">
                            <h4 className="text-lg font-semibold p-6 border-b">Complete Yogini Dasha Timeline</h4>
                            <div className="p-6 space-y-6">
                              {[
                                { yogini: 'Mangala', period: '12-08-2020 - 12-08-2021', years: '1 year', status: 'completed', quality: 'Action & Energy' },
                                { yogini: 'Pingala', period: '12-08-2021 - 12-08-2023', years: '2 years', status: 'completed', quality: 'Leadership & Fire' },
                                { yogini: 'Dhanya', period: '12-08-2023 - 12-08-2026', years: '3 years', status: 'current', quality: 'Prosperity & Growth' },
                                { yogini: 'Bhramari', period: '12-08-2026 - 12-08-2030', years: '4 years', status: 'upcoming', quality: 'Transformation' },
                                { yogini: 'Bhadrika', period: '12-08-2030 - 12-08-2035', years: '5 years', status: 'upcoming', quality: 'Protection & Strength' },
                                { yogini: 'Ulka', period: '12-08-2035 - 12-08-2041', years: '6 years', status: 'upcoming', quality: 'Illumination' },
                                { yogini: 'Siddha', period: '12-08-2041 - 12-08-2048', years: '7 years', status: 'upcoming', quality: 'Spiritual Attainment' },
                                { yogini: 'Sankata', period: '12-08-2048 - 12-08-2056', years: '8 years', status: 'upcoming', quality: 'Challenges & Growth' }
                              ].map((dasha, index) => (
                                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                                  dasha.status === 'current' ? 'border-purple-500 bg-purple-50' :
                                  dasha.status === 'completed' ? 'border-gray-400 bg-gray-50' :
                                  'border-pink-500 bg-pink-50'
                                }`}>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h5 className="font-semibold text-gray-800">{dasha.yogini} Yogini</h5>
                                      <p className="text-sm text-gray-600">{dasha.period}</p>
                                      <p className="text-xs text-purple-600 font-medium">{dasha.quality}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-gray-800">{dasha.years}</p>
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        dasha.status === 'current' ? 'bg-purple-200 text-purple-800' :
                                        dasha.status === 'completed' ? 'bg-gray-200 text-gray-800' :
                                        'bg-pink-200 text-pink-800'
                                      }`}>
                                        {dasha.status.charAt(0).toUpperCase() + dasha.status.slice(1)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Free Report Tab */}
                  {activeTab === 'report' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Comprehensive Life Analysis</h3>
                      
                      {/* Report Categories */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {[
                          { id: 'general', label: 'General' },
                          { id: 'planetary', label: 'Planetary' },
                          { id: 'vimshottari-dasha', label: 'Vimshottari Dasha' },
                          { id: 'yoga', label: 'Yoga' }
                        ].map((category, index) => (
                          <button 
                            key={index} 
                            onClick={() => setReportCategory(category.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              reportCategory === category.id ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>

                      {/* Report Content */}
                      <div className="space-y-8">
                        {reportCategory === 'general' && (
                          <>
                            {/* Personality Analysis */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Personality Analysis</h4>
                              <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p className="mb-4">
                                  <strong>Your Ascendant is {result.kundali_data.ascendant}:</strong> Ascendant is one of the most 
                                  important concepts in astrology for predicting life events. At birth, the sign rising in the sky 
                                  represents your ascendant, influencing your personality and life approach.
                                </p>
                                <p className="mb-4">
                                  People with {result.kundali_data.ascendant} ascendant are known for their determined and practical 
                                  nature. They prefer stability and security in life, often showing remarkable patience and persistence 
                                  in achieving their goals. Your methodical approach to life situations makes you reliable and trustworthy.
                                </p>
                              </div>
                            </div>

                            {/* Physical Characteristics */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Physical Characteristics</h4>
                              <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p>
                                  Based on your ascendant and planetary positions, you likely possess a well-proportioned physique 
                                  with strong bone structure. {result.kundali_data.ascendant} ascendants typically have expressive 
                                  eyes and a pleasant demeanor. Your physical constitution suggests good stamina and endurance, 
                                  though you should pay attention to maintaining regular exercise routines.
                                </p>
                              </div>
                            </div>

                            {/* Health Analysis */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Health Predictions</h4>
                              <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p className="mb-4">
                                  Your health profile shows generally good vitality, but certain areas require attention. The 
                                  planetary positions suggest potential sensitivity in the throat and neck region. Regular care 
                                  and preventive measures can help maintain optimal health.
                                </p>
                                <p>
                                  <strong>Health Recommendations:</strong> Maintain a balanced diet, practice stress management 
                                  techniques, and ensure adequate rest. Your constitution responds well to natural remedies and 
                                  moderate physical activities.
                                </p>
                              </div>
                            </div>

                            {/* Career Analysis */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Career & Professional Life</h4>
                              <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p className="mb-4">
                                  Your career path is influenced by practical and methodical approaches. You excel in fields 
                                  requiring patience, attention to detail, and systematic thinking. Leadership roles suit you 
                                  well, especially in stable, established organizations.
                                </p>
                                <p>
                                  <strong>Suitable Career Fields:</strong> Finance, real estate, agriculture, construction, 
                                  banking, government service, and any field requiring methodical planning and execution. 
                                  Your natural business acumen can lead to entrepreneurial success.
                                </p>
                              </div>
                            </div>

                            {/* Relationship Analysis */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Marriage & Relationships</h4>
                              <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p>
                                  In relationships, you value loyalty, stability, and mutual respect. Your practical approach 
                                  to love ensures lasting partnerships built on solid foundations. You seek partners who 
                                  appreciate your dependable nature and share your values of commitment and security.
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        {reportCategory === 'planetary' && (
                          <>
                            {/* Planetary Influences */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Planetary Influences</h4>
                              <div className="space-y-6">
                                {result.kundali_data.planet_positions.slice(0, 7).map((planet, index) => (
                                  <div key={index} className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                                    <h5 className="font-semibold text-gray-800 mb-2">{planet.planet} in {planet.sign}</h5>
                                    <p className="text-sm text-gray-700 mb-2">
                                      <strong>House:</strong> {planet.house} | <strong>Degree:</strong> {planet.degree.toFixed(2)}° | 
                                      <strong>Nakshatra:</strong> {planet.nakshatra} ({planet.nakshatra_pada})
                                    </p>
                                    <p className="text-gray-600">
                                      {planet.planet === 'Sun' && 'The Sun represents your core identity, ego, and vital force. Its position influences your leadership qualities and self-expression.'}
                                      {planet.planet === 'Moon' && 'The Moon governs your emotions, intuition, and subconscious mind. It affects your emotional responses and mental peace.'}
                                      {planet.planet === 'Mercury' && 'Mercury rules communication, intellect, and analytical abilities. It influences your learning style and verbal skills.'}
                                      {planet.planet === 'Venus' && 'Venus represents love, beauty, creativity, and material comforts. It affects relationships and artistic inclinations.'}
                                      {planet.planet === 'Mars' && 'Mars signifies energy, courage, and action. It influences your drive, ambition, and physical strength.'}
                                      {planet.planet === 'Jupiter' && 'Jupiter is the planet of wisdom, spirituality, and expansion. It brings good fortune and higher knowledge.'}
                                      {planet.planet === 'Saturn' && 'Saturn represents discipline, restrictions, and life lessons. It teaches patience and brings delayed but lasting results.'}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {reportCategory === 'vimshottari-dasha' && (
                          <>
                            {/* Dasha Analysis */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Current Dasha Analysis</h4>
                              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">Current Mahadasha</h5>
                                    <p className="text-3xl font-bold text-blue-600 mb-2">{result.kundali_data.dasha_info.current_dasha_lord}</p>
                                    <p className="text-sm text-gray-600">Remaining: {result.kundali_data.dasha_info.remaining_years} years</p>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">Dasha Effects</h5>
                                    <p className="text-gray-700">
                                      The current {result.kundali_data.dasha_info.current_dasha_lord} Mahadasha period brings specific 
                                      influences based on this planet's position and strength in your birth chart.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p className="mb-4">
                                  <strong>Dasha System Overview:</strong> The Vimshottari Dasha system divides life into 120-year cycles, 
                                  with each planet ruling for specific periods. The sequence follows the natural order starting from 
                                  your birth nakshatra.
                                </p>
                                <p>
                                  Your current planetary period influences major life themes, opportunities, and challenges. 
                                  Understanding your dasha helps in timing important decisions and preparing for upcoming phases.
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        {reportCategory === 'yoga' && (
                          <>
                            {/* Yoga Analysis */}
                            <div className="bg-white rounded-lg border shadow-sm p-8">
                              <h4 className="text-xl font-semibold text-gray-800 mb-6">Astrological Yogas</h4>
                              <div className="space-y-6">
                                <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                                  <h5 className="font-semibold text-gray-800 mb-2">Gaja Kesari Yoga</h5>
                                  <p className="text-sm text-green-600 mb-2">Status: Present</p>
                                  <p className="text-gray-700">
                                    This auspicious yoga is formed when Jupiter and Moon are in favorable positions. 
                                    It bestows wisdom, prosperity, and good reputation. You may experience success 
                                    in educational pursuits and gain respect in society.
                                  </p>
                                </div>
                                
                                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                                  <h5 className="font-semibold text-gray-800 mb-2">Budha Aditya Yoga</h5>
                                  <p className="text-sm text-blue-600 mb-2">Status: Present</p>
                                  <p className="text-gray-700">
                                    Formed by the conjunction of Sun and Mercury, this yoga enhances intelligence, 
                                    communication skills, and analytical abilities. You possess sharp intellect and 
                                    excel in fields requiring mental agility.
                                  </p>
                                </div>
                                
                                <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                                  <h5 className="font-semibold text-gray-800 mb-2">Dharma Karma Adhipati Yoga</h5>
                                  <p className="text-sm text-purple-600 mb-2">Status: Partial</p>
                                  <p className="text-gray-700">
                                    This yoga relates to spiritual growth and righteous action. When active, it brings 
                                    opportunities for spiritual advancement and success through ethical means.
                                  </p>
                                </div>
                                
                                <div className="border-l-4 border-yellow-500 pl-6 py-4 bg-yellow-50 rounded-r-lg">
                                  <h5 className="font-semibold text-gray-800 mb-2">Raj Yoga</h5>
                                  <p className="text-sm text-yellow-600 mb-2">Status: Forming</p>
                                  <p className="text-gray-700">
                                    Multiple combinations suggest potential for leadership roles and recognition. 
                                    Your chart shows promise for achieving positions of authority and influence 
                                    during favorable planetary periods.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Kundali
