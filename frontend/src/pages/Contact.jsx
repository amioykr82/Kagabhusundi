import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Star, MessageCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here (could integrate with backend)
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@kagabhushundi.com',
      description: 'Send us your questions anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-STAR',
      description: 'Speak with our astrology experts'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Cosmic Plaza, Universe City',
      description: 'Our spiritual headquarters'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: '24/7 Cosmic Time',
      description: 'The universe never sleeps'
    }
  ]

  const faqs = [
    {
      question: 'How accurate are your birth chart calculations?',
      answer: 'We use the Swiss Ephemeris, the most precise astronomical calculation system available, ensuring accuracy within seconds of arc for planetary positions.'
    },
    {
      question: 'Do you offer personalized consultations?',
      answer: 'Yes! Our expert astrologers are available for one-on-one consultations to provide deeper insights into your cosmic blueprint.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and never share your birth details or personal information with third parties.'
    },
    {
      question: 'Can I get readings in languages other than English?',
      answer: 'We currently support multiple languages and are continuously expanding our offerings to serve our global community.'
    }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="h-10 w-10 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-4">Message Sent!</h2>
          <p className="text-green-700 text-lg">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="heading-1 text-primary-800 font-display mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about your cosmic journey? Our team of experts is here to guide you 
            through the mysteries of the universe.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-mystic p-8">
              <div className="text-center mb-8">
                <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">We'd love to hear from you</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="reading-questions">Questions about Readings</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="consultation">Personal Consultation Request</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    rows="5"
                    placeholder="Tell us how we can help you on your cosmic journey..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{info.title}</h3>
                        <p className="text-purple-600 font-medium mb-1">{info.details}</p>
                        <p className="text-gray-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-6 border border-purple-200 text-center">
                <Star className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Need Immediate Guidance?</h3>
                <p className="text-purple-700 text-sm mb-4">
                  Get instant insights with our AI-powered readings available 24/7
                </p>
                <button className="btn-secondary px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                  Start Reading Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
