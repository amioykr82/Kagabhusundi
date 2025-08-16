import React, { useState, useEffect } from 'react'
import { 
  Phone, 
  Shield, 
  ArrowLeft, 
  Clock,
  CheckCircle
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const PhoneVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const astrologer = location.state?.astrologer

  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(0)
  const [demoOtp, setDemoOtp] = useState('')

  useEffect(() => {
    if (!astrologer) {
      navigate('/chat')
      return
    }
  }, [astrologer, navigate])

  useEffect(() => {
    let interval = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/chat/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: `+91${phone}` }),
      })

      const data = await response.json()
      if (data.success) {
        setDemoOtp(data.demo_otp) // For demo purposes
        setStep('otp')
        setTimer(300) // 5 minutes
        toast.success('OTP sent successfully!')
      } else {
        toast.error(data.detail || 'Failed to send OTP')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/chat/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: `+91${phone}`, 
          otp: otp 
        }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Phone verified successfully!')
        navigate('/chat/user-info', { 
          state: { 
            astrologer, 
            phone: `+91${phone}` 
          } 
        })
      } else {
        toast.error(data.detail || 'Invalid OTP')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = () => {
    if (timer > 0) return
    handleSendOTP()
  }

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!astrologer) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/chat')}
            className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Phone Verification</h1>
            <p className="text-gray-600">Secure your consultation</p>
          </div>
        </div>

        {/* Selected Astrologer Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              {astrologer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{astrologer.name}</h3>
              <p className="text-sm text-gray-600">{astrologer.expertise.join(', ')}</p>
              <p className="text-sm text-primary-600 font-medium">₹{astrologer.rate_per_minute}/min</p>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          {step === 'phone' ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Enter Your Phone Number</h2>
                <p className="text-gray-600">We'll send you an OTP for verification</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                      placeholder="9876543210"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={loading || phone.length < 10}
                  className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary-700 hover:to-blue-700 transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Enter OTP</h2>
                <p className="text-gray-600">
                  We've sent a 6-digit code to +91{phone}
                </p>
                {demoOtp && (
                  <div className="mt-2 p-2 bg-yellow-100 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Demo OTP:</strong> {demoOtp}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    6-Digit OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                    placeholder="123456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary-700 hover:to-blue-700 transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Verify & Continue
                    </div>
                  )}
                </button>

                {/* Timer and Resend */}
                <div className="text-center">
                  {timer > 0 ? (
                    <div className="flex items-center justify-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Resend OTP in {formatTimer(timer)}</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                {/* Change Phone */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setStep('phone')
                      setOtp('')
                      setTimer(0)
                    }}
                    className="text-gray-600 hover:text-gray-700 text-sm"
                  >
                    Change phone number
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Secure & Private</h4>
              <p className="text-sm text-blue-700">
                Your phone number is encrypted and never shared with astrologers. 
                We use it only for verification and service communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneVerification
