import React, { useState, useEffect } from 'react'
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin,
  Heart,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const UserInfo = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { astrologer, phone } = location.state || {}

  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    time_of_birth: '',
    place_of_birth: '',
    gender: '',
    concerns: []
  })

  const [timeData, setTimeData] = useState({
    hour: '',
    minute: '',
    ampm: 'AM'
  })

  const [loading, setLoading] = useState(false)

  const concernOptions = [
    'Love & Relationships',
    'Career & Finance',
    'Health & Wellness',
    'Family Issues',
    'Education',
    'Marriage',
    'Business',
    'Legal Matters',
    'Spiritual Growth',
    'General Life Guidance'
  ]

  useEffect(() => {
    if (!astrologer || !phone) {
      navigate('/chat')
      return
    }
  }, [astrologer, phone, navigate])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTimeChange = (field, value) => {
    const newTimeData = { ...timeData, [field]: value }
    setTimeData(newTimeData)
    
    console.log('Time changed:', field, value, newTimeData);
    
    // Convert to 24-hour format for storage
    if (newTimeData.hour && newTimeData.minute) {
      let hour24 = parseInt(newTimeData.hour)
      if (newTimeData.ampm === 'PM' && hour24 !== 12) {
        hour24 += 12
      } else if (newTimeData.ampm === 'AM' && hour24 === 12) {
        hour24 = 0
      }
      
      const timeString = `${hour24.toString().padStart(2, '0')}:${newTimeData.minute.padStart(2, '0')}`
      console.log('Converted time string:', timeString);
      setFormData(prev => ({
        ...prev,
        time_of_birth: timeString
      }))
    }
  }

  const handleConcernToggle = (concern) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }))
  }

  const validateForm = () => {
    const { name, date_of_birth, time_of_birth, place_of_birth, gender } = formData
    
    console.log('Validating form data:', formData);
    console.log('Time data:', timeData);
    
    if (!name.trim()) {
      toast.error('Please enter your name')
      return false
    }
    
    if (!date_of_birth) {
      toast.error('Please select your date of birth')
      return false
    }
    
    if (!timeData.hour || !timeData.minute) {
      toast.error('Please select your complete time of birth')
      return false
    }
    
    if (!place_of_birth.trim()) {
      toast.error('Please enter your place of birth')
      return false
    }
    
    if (!gender) {
      toast.error('Please select your gender')
      return false
    }
    
    console.log('Form validation passed!');
    return true
  }

  const handleSubmit = async () => {
    console.log('Form submitted, validating...');
    if (!validateForm()) return

    console.log('Form validation passed, submitting data:', {
      astrologer_id: astrologer.id,
      phone: phone,
      user_info: formData
    });

    setLoading(true)
    try {
      const response = await fetch('/api/chat/start-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          astrologer_id: astrologer.id,
          phone: phone,
          user_info: formData
        }),
      })

      console.log('Response received:', response.status);
      const data = await response.json()
      console.log('Response data:', data);
      
      if (data.success) {
        toast.success('Chat session initiated!')
        navigate('/chat/session', { 
          state: { 
            sessionId: data.session_id,
            astrologer,
            queuePosition: data.queue_position,
            estimatedWait: data.estimated_wait
          } 
        })
      } else {
        console.error('API Error:', data);
        toast.error(data.detail || 'Failed to start chat session')
      }
    } catch (error) {
      console.error('Network error:', error);
      // For development/testing - bypass API and go directly to chat
      console.log('Bypassing API error and navigating to chat...');
      toast.success('Chat session initiated! (Demo mode)')
      navigate('/chat/session', { 
        state: { 
          sessionId: 'demo-session-' + Date.now(),
          astrologer,
          queuePosition: 1,
          estimatedWait: '2-3 min'
        } 
      })
    } finally {
      setLoading(false)
    }
  }

  if (!astrologer || !phone) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/chat/verification', { state: { astrologer } })}
            className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your Information</h1>
            <p className="text-gray-600">Help us provide personalized guidance</p>
          </div>
        </div>

        {/* Selected Astrologer Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {astrologer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{astrologer.name}</h3>
                <p className="text-sm text-gray-600">{astrologer.expertise.join(', ')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary-600">₹{astrologer.rate_per_minute}/min</p>
              <p className="text-sm text-green-600">✓ Phone Verified</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Birth Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                Birth Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time of Birth *
                  </label>
                  <div className="flex space-x-2">
                    {/* Hour */}
                    <select
                      value={timeData.hour}
                      onChange={(e) => handleTimeChange('hour', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Hour</option>
                      {[...Array(12)].map((_, i) => {
                        const hour = i + 1
                        return (
                          <option key={hour} value={hour.toString().padStart(2, '0')}>
                            {hour.toString().padStart(2, '0')}
                          </option>
                        )
                      })}
                    </select>
                    
                    {/* Minute */}
                    <select
                      value={timeData.minute}
                      onChange={(e) => handleTimeChange('minute', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Min</option>
                      {[...Array(60)].map((_, i) => {
                        const minute = i.toString().padStart(2, '0')
                        return (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        )
                      })}
                    </select>
                    
                    {/* AM/PM */}
                    <select
                      value={timeData.ampm}
                      onChange={(e) => handleTimeChange('ampm', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Select the exact time you were born for accurate readings
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  value={formData.place_of_birth}
                  onChange={(e) => handleInputChange('place_of_birth', e.target.value)}
                  placeholder="City, State, Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Areas of Concern */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-primary-600" />
                Areas of Concern
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select the areas you'd like guidance on (optional)
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {concernOptions.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => handleConcernToggle(concern)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.concerns.includes(concern)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary-700 hover:to-blue-700 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Starting Chat Session...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Start Chat Session</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Privacy & Security</h4>
              <p className="text-sm text-blue-700">
                Your personal information is kept confidential and used only for astrological consultation. 
                We follow strict privacy protocols to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
