import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, User, Star } from 'lucide-react';

const ChatWaiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, astrologer } = location.state || {};

  const [waitTime, setWaitTime] = useState(8); // 8 seconds wait time
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!formData || !astrologer) {
      navigate('/chat');
      return;
    }

    const timer = setInterval(() => {
      setWaitTime(prev => {
        if (prev <= 1) {
          setIsConnecting(true);
          clearInterval(timer);
          
          // Navigate to chat session after brief connecting animation
          setTimeout(() => {
            navigate('/chat/session', {
              state: {
                formData,
                astrologer
              }
            });
          }, 2000);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [formData, astrologer, navigate]);

  if (!formData || !astrologer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Astrologer Info */}
        <div className="mb-8">
          <div className="relative inline-block">
            <img
              src={astrologer.image}
              alt={astrologer.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">{astrologer.name}</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(astrologer.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">{astrologer.rating} ({astrologer.reviews} reviews)</span>
          </div>
          <p className="text-sm text-gray-600">{astrologer.specialties.join(', ')}</p>
          <p className="text-xs text-gray-500 mt-1">{astrologer.experience} experience</p>
        </div>

        {/* Status */}
        <div className="mb-8">
          {!isConnecting ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="text-blue-500 animate-spin" size={24} />
                <span className="text-lg font-semibold text-gray-900">Connecting...</span>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 font-medium">Please wait while we connect you</p>
                <p className="text-blue-600 text-sm mt-1">
                  Estimated wait time: <span className="font-bold">{waitTime} seconds</span>
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((8 - waitTime) / 8) * 100}%` }}
                ></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-4">
                <User className="text-green-500" size={24} />
                <span className="text-lg font-semibold text-green-700">Connected!</span>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-medium">Successfully connected to {astrologer.name}</p>
                <p className="text-green-600 text-sm mt-1">Redirecting to chat...</p>
              </div>

              {/* Success Animation */}
              <div className="flex justify-center">
                <div className="animate-bounce">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-1 inline-block"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-1 inline-block animation-delay-75"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-1 inline-block animation-delay-150"></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Info Summary */}
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Your Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span className="font-medium">{new Date(formData.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{formData.timeOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Place:</span>
              <span className="font-medium">{formData.birthPlace}</span>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mt-6">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWaiting;
