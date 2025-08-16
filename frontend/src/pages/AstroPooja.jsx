import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, Users, Filter, ArrowRight, Sparkles, Calendar, Gift } from 'lucide-react';
import '../styles/astro-pooja.css';

const AstroPooja = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch poojas from store API (filtering by pooja category)
  useEffect(() => {
    fetchPoojas();
  }, []);

  const fetchPoojas = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/store/products/category/pooja');
      if (response.ok) {
        const data = await response.json();
        // Transform store products to pooja format
        const transformedPoojas = data.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.original_price,
          discount: product.discount,
          image: product.image,
          duration: getDurationByType(product.name),
          participants: getParticipantsByType(product.name),
          category: getCategoryByType(product.name),
          benefits: getBenefitsByType(product.name),
          isPopular: product.is_popular,
          rating: product.rating,
          reviews: product.reviews,
          features: getFeaturesByType(product.name)
        }));
        setPoojas(transformedPoojas);
      } else {
        setError('Failed to fetch poojas');
        // Fallback to mock data
        setPoojas(mockPoojas);
      }
    } catch (err) {
      setError('Error connecting to server');
      setPoojas(mockPoojas);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to transform store products to pooja data
  const getDurationByType = (name) => {
    if (name.includes('VIP') || name.includes('Special')) return '90 mins';
    if (name.includes('Navgraha') || name.includes('Shanti')) return '120 mins';
    if (name.includes('Ganesh') || name.includes('Lakshmi')) return '60 mins';
    if (name.includes('Mahamrityunjaya')) return '45 mins';
    if (name.includes('Hanuman')) return '30 mins';
    if (name.includes('Shiva')) return '75 mins';
    return '60 mins';
  };

  const getParticipantsByType = (name) => {
    if (name.includes('VIP') || name.includes('Special')) return 'Individual';
    if (name.includes('Navgraha') || name.includes('Shanti')) return 'Family';
    return 'Individual/Family';
  };

  const getCategoryByType = (name) => {
    if (name.includes('Janmashtami') || name.includes('Ganesh')) return 'festival';
    if (name.includes('Navgraha') || name.includes('Shanti')) return 'planetary';
    if (name.includes('Mahamrityunjaya') || name.includes('Hanuman')) return 'health';
    if (name.includes('Lakshmi')) return 'prosperity';
    if (name.includes('Shiva')) return 'spiritual';
    return 'general';
  };

  const getBenefitsByType = (name) => {
    if (name.includes('VIP')) return ['Divine Connection', 'Spiritual Cleansing', 'Positive Energy', 'Peace of Mind'];
    if (name.includes('Janmashtami')) return ['Krishna\'s Blessings', 'Prosperity', 'Happiness', 'Child Welfare'];
    if (name.includes('Navgraha')) return ['Planetary Peace', 'Remove Obstacles', 'Success', 'Harmony'];
    if (name.includes('Ganesh')) return ['Remove Obstacles', 'New Beginnings', 'Success', 'Wisdom'];
    if (name.includes('Lakshmi')) return ['Wealth', 'Prosperity', 'Abundance', 'Financial Success'];
    if (name.includes('Mahamrityunjaya')) return ['Health', 'Longevity', 'Protection', 'Healing'];
    if (name.includes('Hanuman')) return ['Strength', 'Courage', 'Protection', 'Devotion'];
    if (name.includes('Shiva')) return ['Spiritual Growth', 'Inner Peace', 'Transformation', 'Enlightenment'];
    return ['Blessings', 'Peace', 'Prosperity', 'Protection'];
  };

  const getFeaturesByType = (name) => {
    return [
      'Online Live Streaming',
      'Personalized Sankalp', 
      'Expert Priests',
      'Prasadam Delivery',
      'Digital Certificate',
      'Recording Available'
    ];
  };

  // Mock data for fallback
  const mockPoojas = [
    {
      id: 1,
      name: "VIP E-Pooja",
      description: "Almost everything runs on Internet today and in order to stay connected with divinity, we bring you VIP E-Pooja services",
      price: 100,
      originalPrice: 120,
      discount: "17% OFF",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop",
      duration: "90 mins",
      participants: "Individual",
      category: "general",
      benefits: ["Divine Connection", "Spiritual Cleansing", "Positive Energy", "Peace of Mind"],
      isPopular: true,
  const filteredPoojas = poojas.filter(pooja => {
    const matchesSearch = pooja.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pooja.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pooja.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'festival', 'planetary', 'health', 'prosperity', 'spiritual', 'general'];

  const handleBookPooja = (pooja) => {
    navigate(`/pooja/${pooja.id}`, { state: { pooja } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sacred poojas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Astro Pooja Services</h1>
            <Sparkles className="w-8 h-8 ml-3" />
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect with Divine Energy through Sacred Rituals
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              Online Live Streaming
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Expert Priests
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Gift className="w-4 h-4 mr-2" />
              Prasadam Delivery
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search poojas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white min-w-[150px]"
              >
                <option value="all">All Categories</option>
                <option value="festival">Festival</option>
                <option value="planetary">Planetary</option>
                <option value="health">Health</option>
                <option value="prosperity">Prosperity</option>
                <option value="spiritual">Spiritual</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-600">
            {filteredPoojas.length} {filteredPoojas.length === 1 ? 'pooja' : 'poojas'} available
          </p>
        </div>

        {/* Poojas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoojas.map((pooja) => (
            <div
              key={pooja.id}
              className="pooja-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-orange-100"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={pooja.image}
                  alt={pooja.name}
                  className="w-full h-48 object-cover"
                />
                {pooja.isPopular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3 inline mr-1" />
                    Popular
                  </div>
                )}
                {pooja.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {pooja.discount}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{pooja.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pooja.description}</p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {pooja.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {pooja.participants}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Key Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {pooja.benefits.slice(0, 3).map((benefit, index) => (
                      <span
                        key={index}
                        className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                    {pooja.benefits.length > 3 && (
                      <span className="text-xs text-gray-500">+{pooja.benefits.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(pooja.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {pooja.rating} ({pooja.reviews} reviews)
                  </span>
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-600">₹{pooja.price}</span>
                    {pooja.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">₹{pooja.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleBookPooja(pooja)}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredPoojas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No poojas found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroPooja;
