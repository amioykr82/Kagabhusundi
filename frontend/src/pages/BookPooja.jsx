import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Users, MapPin, Phone, Mail, Filter, Search } from 'lucide-react';
import '../styles/book-pooja.css';

const BookPooja = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get pooja items from the store API
  useEffect(() => {
    fetchPoojas();
  }, []);

  const fetchPoojas = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/store/products/category/pooja');
      if (response.ok) {
        const data = await response.json();
        setPoojas(data);
      } else {
        // Fallback to mock data
        setPoojas(mockPoojas);
      }
    } catch (err) {
      setPoojas(mockPoojas);
    } finally {
      setLoading(false);
    }
  };

  // Mock pooja data with enhanced details
  const mockPoojas = [
    {
      id: 1,
      name: 'VIP E-Pooja',
      description: 'Almost everything runs on Internet today and in order to stay connected with divinity, we bring you VIP E-Pooja services with live streaming and personalized rituals',
      price: 100,
      originalPrice: 120,
      discount: '17% OFF',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
      duration: '30-45 mins',
      priests: 2,
      benefits: ['Convenience of home worship', 'Live streaming available', 'Personalized mantras', 'Digital prasad delivery'],
      includes: ['Sankalp with your name', 'Live video of pooja', 'Prasad courier', 'Pooja certificate'],
      rating: 4.8,
      reviews: 245,
      category: 'Modern Pooja'
    },
    {
      id: 2,
      name: 'Shri Krishna Janmashtami Pooja',
      description: 'Strengthen Divine Connection | Attract Abundance & Prosperity | Fulfill Childbirth Wishes | Remove Life Obstacles | Bring Peace & Harmony | Receive Krishna\'s Eternal Blessings',
      price: 1100,
      originalPrice: 2100,
      discount: '48% OFF',
      image: 'https://images.unsplash.com/photo-1574947149429-7ad0f8b78bd9?w=400&h=300&fit=crop',
      duration: '2-3 hours',
      priests: 3,
      benefits: ['Strengthen Divine Connection', 'Attract Abundance & Prosperity', 'Fulfill Childbirth Wishes', 'Remove Life Obstacles', 'Bring Peace & Harmony', 'Receive Krishna\'s Eternal Blessings'],
      includes: ['Krishna idol decoration', 'Bhog offering', 'Bhajan and kirtan', 'Prasad distribution', 'Online Live Streaming', 'Personalized Sankalp'],
      rating: 4.9,
      reviews: 189,
      category: 'Festival Pooja',
      features: [
        'Online Live Streaming',
        'Personalized Sankalp', 
        'Prasadam Delivery',
        'Recording Available',
        'Expert Priests',
        'Certificate Provided'
      ]
    },
    {
      id: 9,
      name: 'Mahamrityunjaya Mantra Jaap',
      description: 'Powerful chanting session for health, longevity and protection from diseases and negative energies with 108 repetitions',
      price: 250,
      originalPrice: 350,
      discount: '29% OFF',
      image: 'https://images.unsplash.com/photo-1571979195097-59d223315e92?w=400&h=300&fit=crop',
      duration: '1-2 hours',
      priests: 1,
      benefits: ['Health improvement', 'Protection from diseases', 'Longevity', 'Peace of mind'],
      includes: ['108 mantra repetitions', 'Rudraksha energization', 'Healing prayers', 'Protection blessing'],
      rating: 4.7,
      reviews: 198,
      category: 'Health Pooja'
    },
    {
      id: 10,
      name: 'Navgraha Shanti Pooja',
      description: 'Complete planetary peace ritual for cosmic harmony, balance and removing planetary obstacles from your horoscope',
      price: 500,
      originalPrice: 750,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
      duration: '3-4 hours',
      priests: 5,
      benefits: ['Planetary peace', 'Obstacle removal', 'Career growth', 'Mental peace'],
      includes: ['9 planet worship', 'Havan ceremony', 'Gemstone blessing', 'Yantra activation'],
      rating: 4.8,
      reviews: 287,
      category: 'Astrological Pooja'
    },
    {
      id: 13,
      name: 'Ganesh Puja Kit',
      description: 'Complete puja kit for Lord Ganesha worship with all necessary traditional items and detailed mantras for home worship',
      price: 199,
      originalPrice: 299,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1636063005516-9ef4f68096a4?w=400&h=300&fit=crop',
      duration: '45-60 mins',
      priests: 1,
      benefits: ['Obstacle removal', 'New beginnings', 'Success in ventures', 'Wisdom enhancement'],
      includes: ['Ganesh idol', 'Pooja samagri', 'Modak offering', 'Detailed instructions'],
      rating: 4.5,
      reviews: 312,
      category: 'Deity Worship'
    },
    {
      id: 17,
      name: 'Lakshmi Puja Samagri',
      description: 'Complete samagri kit for Goddess Lakshmi worship, prosperity rituals and wealth attraction with traditional offerings',
      price: 149,
      originalPrice: 199,
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1533568288007-ac10cd9b3ef3?w=400&h=300&fit=crop',
      duration: '1-1.5 hours',
      priests: 2,
      benefits: ['Wealth attraction', 'Financial stability', 'Business growth', 'Prosperity'],
      includes: ['Lotus flowers', 'Gold coins', 'Sweets offering', 'Prosperity mantras'],
      rating: 4.6,
      reviews: 234,
      category: 'Prosperity Pooja'
    },
    {
      id: 22,
      name: 'Hanuman Chalisa Path',
      description: 'Special Hanuman Chalisa recitation service for strength, protection and overcoming obstacles with powerful devotional chanting',
      price: 99,
      originalPrice: 149,
      discount: '34% OFF',
      image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&h=300&fit=crop',
      duration: '30-45 mins',
      priests: 1,
      benefits: ['Physical strength', 'Mental courage', 'Protection', 'Obstacle removal'],
      includes: ['Chalisa recitation', 'Hanuman worship', 'Strength blessing', 'Protection amulet'],
      rating: 4.8,
      reviews: 456,
      category: 'Devotional Pooja'
    },
    {
      id: 27,
      name: 'Shiva Linga Worship Set',
      description: 'Complete worship set for Lord Shiva with authentic Narmada Shiva Linga and ceremonial items for powerful spiritual practice',
      price: 699,
      originalPrice: 999,
      discount: '30% OFF',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      duration: '1-2 hours',
      priests: 3,
      benefits: ['Spiritual elevation', 'Meditation enhancement', 'Inner peace', 'Divine consciousness'],
      includes: ['Narmada Shiva Linga', 'Abhishek materials', 'Sacred water', 'Meditation guidance'],
      rating: 4.9,
      reviews: 278,
      category: 'Spiritual Pooja'
    }
  ];

  const categories = [
    'all',
    'Modern Pooja',
    'Festival Pooja',
    'Health Pooja',
    'Astrological Pooja',
    'Deity Worship',
    'Prosperity Pooja',
    'Devotional Pooja',
    'Spiritual Pooja'
  ];

  const filteredPoojas = poojas.filter(pooja => {
    const matchesCategory = selectedCategory === 'all' || pooja.category === selectedCategory;
    const matchesSearch = pooja.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pooja.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookPooja = (pooja) => {
    navigate(`/book-pooja/${pooja.id}`, { state: { pooja } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pooja services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Book Pooja Services</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sacred Pooja Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with divine energies through our authentic pooja services performed by experienced priests
            with traditional rituals and modern convenience
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search pooja services..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white min-w-48"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pooja Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPoojas.map((pooja) => (
            <div key={pooja.id} className="pooja-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={pooja.image}
                  alt={pooja.name}
                  className="w-full h-48 object-cover"
                />
                {pooja.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    {pooja.discount}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-md px-2 py-1 flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-semibold">{pooja.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {pooja.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {pooja.description}
                </p>

                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {pooja.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {pooja.priests} Priest{pooja.priests > 1 ? 's' : ''}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-600">₹{pooja.price}</span>
                    {pooja.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">₹{pooja.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{pooja.reviews} reviews</span>
                </div>

                <button
                  onClick={() => handleBookPooja(pooja)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPoojas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No pooja services found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPooja;
