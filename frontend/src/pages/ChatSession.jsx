import React, { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  Send, 
  Clock, 
  Users, 
  Star,
  Phone,
  ArrowLeft,
  CheckCircle,
  Loader,
  MoreVertical,
  Paperclip,
  Smile
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const ChatSession = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { sessionId, astrologer, queuePosition: initialQueuePosition, estimatedWait } = location.state || {}
  
  const [sessionStatus, setSessionStatus] = useState('in_queue')
  const [queuePosition, setQueuePosition] = useState(initialQueuePosition || 0)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionDuration, setSessionDuration] = useState('00:00:00')
  
  const messagesEndRef = useRef(null)
  const statusCheckInterval = useRef(null)
  const messageCheckInterval = useRef(null)

  useEffect(() => {
    if (!sessionId || !astrologer) {
      navigate('/chat')
      return
    }

    // Start checking session status
    checkSessionStatus()
    statusCheckInterval.current = setInterval(checkSessionStatus, 3000)

    return () => {
      if (statusCheckInterval.current) {
        clearInterval(statusCheckInterval.current)
      }
      if (messageCheckInterval.current) {
        clearInterval(messageCheckInterval.current)
      }
    }
  }, [sessionId, astrologer, navigate])

  useEffect(() => {
    // Start checking for new messages when connected
    if (sessionStatus === 'connected') {
      checkForNewMessages()
      messageCheckInterval.current = setInterval(checkForNewMessages, 2000)
    } else if (messageCheckInterval.current) {
      clearInterval(messageCheckInterval.current)
    }

    return () => {
      if (messageCheckInterval.current) {
        clearInterval(messageCheckInterval.current)
      }
    }
  }, [sessionStatus])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const checkSessionStatus = async () => {
    try {
      const response = await fetch(`/api/chat/session/${sessionId}/status`)
      const data = await response.json()
      
      if (data.success) {
        setSessionStatus(data.status)
        setQueuePosition(data.queue_position)
        setSessionDuration(data.session_duration)
        
        if (data.status === 'connected' && sessionStatus !== 'connected') {
          toast.success('Connected to astrologer!')
          // Add welcome message
          setMessages([{
            message: `Namaste! I'm ${astrologer.name}. I'm here to guide you with my ${astrologer.experience} years of experience in ${astrologer.expertise.join(', ')}. How can I help you today?`,
            timestamp: new Date(),
            sender: 'astrologer'
          }])
        }
      }
    } catch (error) {
      console.error('Error checking session status:', error)
    }
  }

  const checkForNewMessages = async () => {
    try {
      const response = await fetch(`/api/chat/chat/${sessionId}/messages?last_message_count=${messages.length}`)
      const data = await response.json()
      
      if (data.success && data.messages.length > 0) {
        setMessages(prev => [...prev, ...data.messages])
      }
    } catch (error) {
      console.error('Error checking for new messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || loading) return

    const messageToSend = newMessage.trim()
    setNewMessage('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          session_id: sessionId
        }),
      })

      const data = await response.json()
      if (data.success) {
        // Update messages with both user message and astrologer response
        setMessages(prev => [
          ...prev,
          {
            message: messageToSend,
            timestamp: new Date(),
            sender: 'user'
          },
          data.response
        ])
      } else {
        toast.error('Failed to send message')
        setNewMessage(messageToSend) // Restore message on error
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      setNewMessage(messageToSend) // Restore message on error
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const endChat = async () => {
    try {
      await fetch(`/api/chat/chat/${sessionId}/end`, {
        method: 'POST'
      })
      toast.success('Chat session ended')
      navigate('/chat')
    } catch (error) {
      console.error('Error ending chat:', error)
      navigate('/chat')
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  if (!sessionId || !astrologer) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Professional Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/chat')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Astrologer Info */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="/kagabhushundi-hero.jpg" 
                    alt={astrologer.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                  />
                  {sessionStatus === 'connected' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{astrologer.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{astrologer.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{astrologer.experience} years exp</span>
                    <span>•</span>
                    <span className={sessionStatus === 'connected' ? 'text-green-600' : 'text-gray-500'}>
                      {sessionStatus === 'connected' ? 'Online' : 'In Queue'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Info & Actions */}
            <div className="flex items-center space-x-4">
              {sessionStatus === 'connected' && (
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Session Time</div>
                  <div className="font-mono text-sm font-semibold text-gray-900">{sessionDuration}</div>
                </div>
              )}
              
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={endChat}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                End Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {sessionStatus === 'in_queue' ? (
          /* Enhanced Queue Screen */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-md border border-gray-100">
              <div className="relative mb-6">
                <img 
                  src="/kagabhushundi-hero.jpg" 
                  alt={astrologer.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-100"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Preparing...
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connecting to {astrologer.name}</h2>
              <p className="text-gray-600 mb-6">Setting up your personalized session</p>
              
              {queuePosition > 0 ? (
                <div className="mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{queuePosition}</div>
                  <p className="text-gray-600">
                    {queuePosition === 1 ? 'person ahead of you' : 'people ahead of you'}
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-gray-600">Almost ready...</p>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
                <div className="flex items-center justify-center text-blue-700 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">Expected Wait Time</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">{estimatedWait}</div>
              </div>
              
              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                <p>💫 Your session will begin automatically</p>
                <p className="mt-1">Please keep this page open</p>
              </div>
            </div>
          </div>
        ) : (
          /* Professional Chat Interface */
          <>
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              <div className="max-w-4xl mx-auto p-4">
                {/* Welcome Message */}
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <img 
                      src="/kagabhushundi-hero.jpg" 
                      alt={astrologer.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-blue-100"
                    />
                    <h3 className="font-semibold text-gray-900 mb-2">Welcome to your session!</h3>
                    <p className="text-gray-600 text-sm">
                      {astrologer.name} is here to guide you with {astrologer.experience} years of expertise in {astrologer.expertise.join(', ')}.
                    </p>
                  </div>
                )}

                {/* Messages */}
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
                    >
                      {message.sender === 'astrologer' && (
                        <img 
                          src="/kagabhushundi-hero.jpg" 
                          alt={astrologer.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                      )}
                      
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                        }`}
                      >
                        <div className="break-words whitespace-pre-wrap">{message.message}</div>
                        <div
                          className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                          {message.sender === 'user' && (
                            <CheckCircle className="inline-block w-3 h-3 ml-1" />
                          )}
                        </div>
                      </div>

                      {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                          U
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Enhanced Message Input */}
            <div className="bg-white border-t border-gray-200">
              <div className="max-w-4xl mx-auto p-4">
                <div className="flex items-end space-x-3">
                  {/* Message Input Container */}
                  <div className="flex-1 relative">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                      <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="flex-1 px-2 py-3 bg-transparent border-none outline-none resize-none max-h-32 text-gray-900 placeholder-gray-500"
                        rows={1}
                        disabled={loading}
                        style={{
                          minHeight: '20px',
                          height: 'auto',
                        }}
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                      />
                      
                      <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                        <Smile className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Typing indicator could go here */}
                    <div className="absolute -top-6 left-4 text-xs text-gray-500">
                      {/* Typing indicator */}
                    </div>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || loading}
                    className={`p-3 rounded-2xl transition-all duration-200 ${
                      newMessage.trim() && !loading
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Professional Footer */}
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>🔐 End-to-end encrypted</span>
                    <span>•</span>
                    <span>✨ AI-enhanced insights</span>
                  </div>
                  <div>
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatSession
