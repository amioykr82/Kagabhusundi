import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Users, MapPin, Phone, Mail, CheckCircle, Heart, Share2, Gift, Shield, Award } from 'lucide-react';
import '../styles/book-pooja.css';

const PoojaDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [pooja, setPooja] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    // Get pooja data from navigation state or fetch based on ID
    if (location.state?.pooja) {
      setPooja(location.state.pooja);
      setLoading(false);
    } else {
      // Fallback - in real app, fetch from API
      const defaultPooja = {
        id: parseInt(id) || 2,
        name: "Shri Krishna Janmashtami Pooja",
        description: "Strengthen Divine Connection | Attract Abundance & Prosperity | Fulfill Childbirth Wishes | Remove Life Obstacles | Bring Peace & Harmony | Receive Krishna's Eternal Blessings",
        price: 1100,
        originalPrice: 2100,
        discount: "48% OFF",
        image: "https://images.unsplash.com/photo-1574947149429-7ad0f8b78bd9?w=600&h=400&fit=crop",
        duration: "120 mins",
        participants: "Family",
        category: "festival",
        benefits: [
          "Strengthen Divine Connection",
          "Attract Abundance & Prosperity", 
          "Fulfill Childbirth Wishes",
          "Remove Life Obstacles",
          "Bring Peace & Harmony",
          "Receive Krishna's Eternal Blessings"
        ],
        isPopular: true,
        features: [
          "Online Live Streaming",
          "Personalized Sankalp",
          "Prasadam Delivery",
          "Recording Available",
          "Expert Priests",
          "Certificate Provided"
        ]
      };
      setPooja(defaultPooja);
      setLoading(false);
    }
  }, [id, location.state]);

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pooja details...</p>
        </div>
      </div>
    );
  }

  if (!pooja) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Pooja not found</p>
          <button 
            onClick={() => navigate('/book-pooja')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Poojas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/book-pooja')}
            className="flex items-center text-gray-600 hover:text-orange-500 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Poojas
          </button>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image */}
            <div className="lg:w-1/2">
              <div className="relative h-96 lg:h-full">
                <img 
                  src={pooja.image} 
                  alt={pooja.name}
                  className="w-full h-full object-cover"
                />
                {pooja.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {pooja.discount}
                  </div>
                )}
                {pooja.isPopular && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Popular
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-1/2 p-8">
              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                {pooja.name}
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                {pooja.description}
              </p>

              {/* Price Section */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl lg:text-3xl font-bold text-gray-800">
                    ₹ {pooja.price}
                  </span>
                  {pooja.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹ {pooja.originalPrice}
                    </span>
                  )}
                  {pooja.discount && (
                    <span className="text-red-500 font-semibold">
                      {pooja.discount}
                    </span>
                  )}
                </div>
              </div>

              {/* Benefits/Features */}
              {pooja.benefits && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Benefits:</h3>
                  <div className="space-y-2">
                    {pooja.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {pooja.duration && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="text-sm">{pooja.duration}</span>
                  </div>
                )}
                {pooja.participants && (
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="text-sm">{pooja.participants}</span>
                  </div>
                )}
              </div>

              {/* Book Now Button */}
              <button 
                onClick={handleBookNow}
                className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors duration-300 shadow-lg"
              >
                Book Now
              </button>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5 mr-1" />
                  <span className="text-sm">Save</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-orange-500 transition-colors">
                  <Share2 className="w-5 h-5 mr-1" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        {pooja.features && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">What's Included:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pooja.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Gift className="w-5 h-5 text-orange-500 mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Book {pooja.name}</h2>
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select time</option>
                    <option value="06:00">06:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Any special requirements or notes..."
                  ></textarea>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-orange-600">₹ {pooja.price}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoojaDetail;
