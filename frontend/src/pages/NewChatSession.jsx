import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, Phone, VideoIcon, MoreVertical, Star, ArrowLeft, Paperclip, Smile } from 'lucide-react';

const ChatSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, astrologer } = location.state || {};
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (!formData || !astrologer) {
      navigate('/chat');
      return;
    }

    // Welcome message from astrologer
    const welcomeMessage = {
      id: Date.now(),
      text: `🙏 Namaste ${formData.name}! I'm ${astrologer.name}, and I'm delighted to connect with you for this astrological consultation. 

I've reviewed your birth details:
📅 Born: ${new Date(formData.dateOfBirth).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏰ Time: ${formData.timeOfBirth}
📍 Place: ${formData.birthPlace}

Based on these cosmic coordinates, I can already sense some beautiful planetary influences in your chart. I'm here to provide you with personalized insights about your life path, relationships, career, health, and spiritual journey.

How may I guide you today? Feel free to ask about any aspect of your life - I'm here to help! ✨`,
      sender: 'astrologer',
      timestamp: new Date(),
      isWelcome: true
    };

    setMessages([welcomeMessage]);
  }, [formData, astrologer, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateAstrologicalResponse = async (userMessage) => {
    try {
      const response = await generateMockAstrologicalResponse(userMessage);
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble connecting right now. Could you please repeat your question? I'm here to help you with your astrological insights.";
    }
  };

  // Professional astrological response generator
  const generateMockAstrologicalResponse = async (userMessage) => {
    const responses = {
      career: [
        `🌟 Looking at your birth chart, I can see strong planetary influences in your career sector. Based on your birth time of ${formData.timeOfBirth}, your professional life is entering a very promising phase. Jupiter's current position suggests excellent opportunities ahead, especially in the next 3-6 months. Your birth in ${formData.birthPlace} gives you natural leadership qualities. What specific career challenges are you currently facing?`,
        `💼 Your birth details reveal exceptional potential for professional success. The planetary alignment at ${formData.timeOfBirth} shows Mars in a favorable position, indicating success through determination and hard work. I see you have natural entrepreneurial abilities and strong communication skills. Are you considering any major career changes or new ventures?`,
        `🏆 The stars are aligning beautifully for your professional growth! Your birth chart shows a strong 10th house influence, which governs career and public recognition. The current Mercury transit suggests excellent opportunities for networking and partnerships. Born on ${new Date(formData.dateOfBirth).toLocaleDateString()}, you have the cosmic support for significant career advancement. I recommend taking bold steps during the next lunar cycle.`
      ],
      love: [
        `💕 In matters of the heart, your birth chart reveals beautiful romantic potential! Venus was in a highly favorable position when you were born at ${formData.timeOfBirth}. Your natural charm and magnetic energy are gifts from the cosmos. The current planetary transits suggest that love and relationships will flourish, especially during favorable moon phases. Your birth place ${formData.birthPlace} adds a special romantic energy to your chart. Are you currently in a relationship, or are you seeking your soulmate?`,
        `❤️ Your romantic sector shows incredible cosmic activity! The planetary combinations from your birth in ${formData.birthPlace} indicate you're destined for deep, meaningful connections. I see potential for a life-changing romantic encounter. Born on ${new Date(formData.dateOfBirth).toLocaleDateString()}, you carry the energy of love and compassion. What specific relationship guidance are you seeking today?`,
        `💖 The cosmic energies around love are extremely positive for you right now! Your 7th house of partnerships shows strong influence from Venus and Jupiter - this is a highly auspicious combination. If you're single, I see someone very special entering your life within the next few months. If you're in a relationship, expect deeper emotional bonding and possibly a major commitment. Your birth time indicates you're entering your most romantic period!`
      ],
      money: [
        `💰 Financially, your chart shows promising indicators. The position of Mercury at your birth time suggests good business acumen. I see gradual wealth accumulation and stability. The next lunar cycle looks particularly favorable for investments. What are your main financial concerns?`,
        `🌕 Your wealth sector is blessed by Jupiter's influence. Born on ${formData.dateOfBirth}, you have natural prosperity indicators. However, I advise caution with large investments until after the next Mercury retrograde. Are you planning any major financial decisions?`,
        `💸 Your 2nd house of wealth shows strong planetary support. The current Saturn transit is teaching you financial discipline, which will pay off tremendously. I see steady income growth and potential for a significant financial opportunity within the next 6 months.`
      ],
      health: [
        `🌿 Your health chart shows generally positive indicators. However, based on your birth details, I recommend paying attention to stress management. The planetary positions suggest the need for better work-life balance. Regular meditation and yoga would be highly beneficial. Are you experiencing any specific health concerns?`,
        `⚕️ Healthwise, your constitution is strong, but the stars advise moderation in diet and lifestyle. Your birth time indicates sensitivity to environmental changes. Focus on building immunity naturally. What aspects of your health would you like me to examine more closely?`,
        `🧘‍♀️ Your health sector shows the influence of moon and mercury, indicating that mental health and stress management are key for you. I recommend incorporating breathing exercises and maintaining regular sleep patterns. Your body responds well to natural healing methods.`
      ],
      family: [
        `👨‍👩‍👧‍👦 Your family relationships are governed by the moon's position in your chart. Born in ${formData.birthPlace}, you carry strong family values and deep emotional connections. The current planetary transit suggests some important family decisions ahead. Communication and understanding will be key to maintaining harmony. I see you playing an important role in bringing your family together.`,
        `🏠 I see beautiful family connections in your chart! Your 4th house shows strong influences that indicate a supportive family environment. However, Jupiter's current position suggests you may need to take on more responsibility within the family soon. Born at ${formData.timeOfBirth}, you have natural wisdom that your family looks up to.`
      ],
      future: [
        `🔮 Your future is written in the stars, and I can see beautiful possibilities ahead! Based on your birth details, the next 12 months will bring significant positive changes. The planetary transits indicate new opportunities in multiple areas of your life. Born on ${new Date(formData.dateOfBirth).toLocaleDateString()}, you're entering a highly favorable period. What specific aspect of your future would you like me to explore?`,
        `✨ The cosmic timeline shows exciting developments coming your way! Your birth chart indicates that you're about to enter a transformational phase. The next few months will be particularly significant for personal growth and new beginnings. Trust the process and remain open to the universe's guidance.`,
        `🌟 I can see the beautiful tapestry of your destiny unfolding! Your birth in ${formData.birthPlace} at ${formData.timeOfBirth} has set you on a path of great potential. The stars indicate that your biggest dreams are closer to reality than you think. Major positive changes are coming within the next 6-8 months.`
      ],
      education: [
        `📚 Your educational journey is blessed by Mercury's favorable position! Born at ${formData.timeOfBirth}, you have natural learning abilities and intellectual curiosity. The current planetary alignments suggest this is an excellent time for studies, exams, or learning new skills. Your birth place ${formData.birthPlace} adds analytical strength to your chart. What educational goals are you working towards?`,
        `🎓 I see great academic success in your chart! Jupiter's influence on your 5th house of education is particularly strong. Born on ${new Date(formData.dateOfBirth).toLocaleDateString()}, you have the cosmic support for intellectual achievements. Any exams or educational pursuits you're planning will likely go very well.`,
        `📖 Your learning sector shows beautiful planetary support! Mercury and Jupiter are working together to enhance your knowledge and wisdom. This is an ideal time for higher education, professional courses, or skill development. The stars encourage you to pursue your educational dreams with confidence.`
      ],
      general: [
        `🔮 Thank you for sharing that with me, ${formData.name}. Based on your birth chart, I can sense you're going through an important transformational phase. The cosmic energies are aligning to bring positive changes in your life. Born in ${formData.birthPlace}, you carry special spiritual energy. The key is to remain patient and trust the divine process. What specific area of your life feels most challenging right now?`,
        `✨ I understand your concern, and the stars have guided you to ask this question at exactly the right time. Your birth details reveal that you're entering a period of spiritual growth and self-discovery. The planetary transits suggest that this is an excellent time for introspection and making important life decisions. Born at ${formData.timeOfBirth}, you have natural intuition - trust it. Would you like me to focus on any particular aspect of your life?`,
        `🌙 Your question resonates deeply with the current planetary influences affecting your chart. Born in ${formData.birthPlace} on ${new Date(formData.dateOfBirth).toLocaleDateString()}, you carry the energy of that cosmic moment in your spiritual DNA. The stars are encouraging you to embrace change with confidence and trust your inner wisdom. What specific guidance are you seeking today?`,
        `🌟 I can sense the cosmic energies around your question, and they're very positive! Your birth chart reveals that you're naturally intuitive and have strong spiritual inclinations. The current lunar phase is particularly favorable for making important decisions and new beginnings. Trust your inner wisdom - it's cosmically aligned right now.`,
        `💫 The universe has brought us together for this conversation at a very auspicious time! Your birth details show that you're entering a period of great opportunity and growth. The planetary alignments are supporting you in achieving your deepest desires. What dreams or goals would you like cosmic guidance about?`
      ]
    };

    // Simple keyword matching for response selection
    const message = userMessage.toLowerCase();
    let category = 'general';
    
    if (message.includes('career') || message.includes('job') || message.includes('work') || message.includes('profession') || message.includes('business') || message.includes('employment')) {
      category = 'career';
    } else if (message.includes('love') || message.includes('relationship') || message.includes('marriage') || message.includes('partner') || message.includes('dating') || message.includes('romance')) {
      category = 'love';
    } else if (message.includes('money') || message.includes('finance') || message.includes('wealth') || message.includes('income') || message.includes('investment') || message.includes('financial')) {
      category = 'money';
    } else if (message.includes('health') || message.includes('illness') || message.includes('medical') || message.includes('body') || message.includes('wellness') || message.includes('disease')) {
      category = 'health';
    } else if (message.includes('family') || message.includes('mother') || message.includes('father') || message.includes('parents') || message.includes('children') || message.includes('sibling')) {
      category = 'family';
    } else if (message.includes('future') || message.includes('prediction') || message.includes('what will happen') || message.includes('destiny') || message.includes('fate')) {
      category = 'future';
    } else if (message.includes('education') || message.includes('study') || message.includes('exam') || message.includes('student') || message.includes('learning')) {
      category = 'education';
    }

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Generate astrologer response
    try {
      const response = await generateAstrologicalResponse(newMessage);
      
      const astrologerMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'astrologer',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, astrologerMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!formData || !astrologer) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/chat')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={astrologer.image}
                  alt={astrologer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">{astrologer.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < Math.floor(astrologer.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span>{astrologer.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">
              {formatTime(sessionDuration)}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <VideoIcon size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'astrologer' && (
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={astrologer.image}
                    alt={astrologer.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium text-gray-600">{astrologer.name}</span>
                </div>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                } ${message.isWelcome ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200' : ''}`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[70%]">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={astrologer.image}
                  alt={astrologer.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs font-medium text-gray-600">{astrologer.name} is typing...</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip size={20} className="text-gray-500" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question about astrology, career, relationships, or life guidance..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32"
              rows="1"
              style={{ minHeight: '44px' }}
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile size={20} className="text-gray-500" />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTyping}
            className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          Rate: ₹{astrologer.price}/{astrologer.priceUnit} • Session time: {formatTime(sessionDuration)}
        </p>
      </div>
    </div>
  );
};

export default ChatSession;
