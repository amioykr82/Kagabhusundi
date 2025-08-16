import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Star, Filter, Heart, Eye } from 'lucide-react';
import '../styles/store.css';

const AstroStore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/store/products');
      if (response.ok) {
        const data = await response.json();
        // Convert snake_case to camelCase for compatibility
        const normalizedProducts = data.map(product => ({
          ...product,
          originalPrice: product.original_price,
          isPopular: product.is_popular,
          inStock: product.in_stock
        }));
        setProducts(normalizedProducts);
      } else {
        setError('Failed to fetch products');
        // Fallback to local data if API fails
        setProducts(mockProducts);
      }
    } catch (err) {
      setError('Error connecting to server');
      // Fallback to local data if API fails
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/store/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(['all', ...data.categories]);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  // Fallback mock data with 20+ products
  const mockProducts = [
    {
      id: 1,
      name: 'VIP E-Pooja',
      description: 'Almost everything runs on Internet today and in order to stay connected with divinity...',
      price: 100,
      originalPrice: 120,
      discount: '17% OFF',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.8,
      reviews: 245,
      isPopular: true,
      tags: ['STARTS AT INR', '100']
    },
    {
      id: 2,
      name: 'Janmashtami Special Pooja',
      description: 'Special ritualistic ceremony for Lord Krishna\'s birthday celebration',
      price: 100,
      originalPrice: 150,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1574947149429-7ad0f8b78bd9?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.9,
      reviews: 189,
      isPopular: true,
      tags: ['JAI KANHAIYA', 'BALKI']
    },
    {
      id: 3,
      name: 'Problem Solving Remedy Combos',
      description: 'Comprehensive solution packages for various life challenges and obstacles',
      price: 100,
      originalPrice: 200,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
      category: 'remedies',
      rating: 4.7,
      reviews: 356,
      isPopular: true,
      tags: ['DEEP DAAN', '100']
    },
    {
      id: 4,
      name: 'Kashi Siddh Rudraksha',
      description: 'Blessed at Kedareshwar Mahadev Mandir, Kashi. Authentic and spiritually charged.',
      price: 299,
      originalPrice: 399,
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1544912322-a5f1e18f7d10?w=300&h=200&fit=crop',
      category: 'rudraksha',
      rating: 4.9,
      reviews: 156,
      isPopular: true,
      tags: ['Flat 10% OFF', 'SHOP NOW']
    },
    {
      id: 5,
      name: 'Gold Plated Bracelets',
      description: 'Authentic gold plated spiritual bracelets for protection and prosperity',
      price: 499,
      originalPrice: 699,
      discount: '29% OFF',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop',
      category: 'jewelry',
      rating: 4.6,
      reviews: 432,
      isPopular: false,
      tags: ['STARTS AT INR', '499']
    },
    {
      id: 6,
      name: 'Spiritual Spell Casting',
      description: 'Ancient spell casting services for various life improvements and manifestations',
      price: 100,
      originalPrice: 150,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      category: 'spells',
      rating: 4.5,
      reviews: 89,
      isPopular: false,
      tags: ['STARTS AT INR', '100']
    },
    {
      id: 7,
      name: 'Premium Gemstones',
      description: 'Certified gemstones for planetary peace and positive energy enhancement',
      price: 799,
      originalPrice: 999,
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop',
      category: 'gemstones',
      rating: 4.8,
      reviews: 267,
      isPopular: true,
      tags: ['EMI AVAILABLE']
    },
    {
      id: 8,
      name: 'Exclusive Blue Sapphire',
      description: 'Premium quality certified blue sapphire with maximum astrological benefits',
      price: 1299,
      originalPrice: 1599,
      discount: '19% OFF',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      category: 'exclusive',
      rating: 4.9,
      reviews: 134,
      isPopular: true,
      tags: ['EMI AVAILABLE']
    },
    {
      id: 9,
      name: 'Mahamrityunjaya Mantra Jaap',
      description: 'Powerful chanting session for health, longevity and protection from diseases',
      price: 250,
      originalPrice: 350,
      discount: '29% OFF',
      image: 'https://images.unsplash.com/photo-1571979195097-59d223315e92?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.7,
      reviews: 198,
      isPopular: false,
      tags: ['HIGHLY RECOMMENDED']
    },
    {
      id: 10,
      name: 'Navgraha Shanti Pooja',
      description: 'Complete planetary peace ritual for cosmic harmony and balance',
      price: 500,
      originalPrice: 750,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.8,
      reviews: 287,
      isPopular: true,
      tags: ['STARTS AT INR', '500']
    },
    {
      id: 11,
      name: 'Premium Rudraksha Mala 108 Beads',
      description: 'Authentic 108 beads rudraksha mala for meditation and spiritual practices',
      price: 899,
      originalPrice: 1199,
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      category: 'rudraksha',
      rating: 4.9,
      reviews: 156,
      isPopular: true,
      tags: ['STARTS AT INR', '899']
    },
    {
      id: 12,
      name: 'Crystal Healing Set - 7 Chakras',
      description: 'Complete set of 7 chakra healing crystals for energy cleansing and balance',
      price: 699,
      originalPrice: 899,
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1633292587830-8db8b7c4be8b?w=300&h=200&fit=crop',
      category: 'gemstones',
      rating: 4.6,
      reviews: 203,
      isPopular: false,
      tags: ['EMI AVAILABLE']
    },
    {
      id: 13,
      name: 'Ganesh Puja Kit',
      description: 'Complete puja kit for Lord Ganesha worship with all necessary items',
      price: 199,
      originalPrice: 299,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1636063005516-9ef4f68096a4?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.5,
      reviews: 312,
      isPopular: true,
      tags: ['FESTIVAL SPECIAL']
    },
    {
      id: 14,
      name: 'Silver Pendant Collection',
      description: 'Handcrafted silver pendants with spiritual symbols and mantras',
      price: 799,
      originalPrice: 999,
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=200&fit=crop',
      category: 'jewelry',
      rating: 4.7,
      reviews: 198,
      isPopular: false,
      tags: ['HANDCRAFTED']
    },
    {
      id: 15,
      name: 'Vashikaran Spell Services',
      description: 'Ancient vashikaran spells for love, relationship and attraction purposes',
      price: 299,
      originalPrice: 499,
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1565798715310-a53a90ba05bf?w=300&h=200&fit=crop',
      category: 'spells',
      rating: 4.3,
      reviews: 67,
      isPopular: false,
      tags: ['POWERFUL RESULTS']
    },
    {
      id: 16,
      name: 'Red Coral (Moonga) Ring',
      description: 'Natural red coral ring for Mars energy enhancement and courage',
      price: 1199,
      originalPrice: 1499,
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=200&fit=crop',
      category: 'gemstones',
      rating: 4.8,
      reviews: 145,
      isPopular: true,
      tags: ['CERTIFIED NATURAL']
    },
    {
      id: 17,
      name: 'Lakshmi Puja Samagri',
      description: 'Complete samagri kit for Goddess Lakshmi worship and prosperity rituals',
      price: 149,
      originalPrice: 199,
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1533568288007-ac10cd9b3ef3?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.6,
      reviews: 234,
      isPopular: true,
      tags: ['PROSPERITY RITUAL']
    },
    {
      id: 18,
      name: '5 Face Rudraksha Bead',
      description: 'Authentic 5 Mukhi Rudraksha for general well-being and peace of mind',
      price: 199,
      originalPrice: 299,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1635252743388-73cbbb5e1a62?w=300&h=200&fit=crop',
      category: 'rudraksha',
      rating: 4.7,
      reviews: 189,
      isPopular: true,
      tags: ['MOST POPULAR']
    },
    {
      id: 19,
      name: 'Brass Spiritual Jewelry Set',
      description: 'Traditional brass jewelry set with spiritual symbols and motifs',
      price: 399,
      originalPrice: 599,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=200&fit=crop',
      category: 'jewelry',
      rating: 4.4,
      reviews: 156,
      isPopular: false,
      tags: ['TRADITIONAL DESIGN']
    },
    {
      id: 20,
      name: 'Black Magic Removal Spell',
      description: 'Powerful spell casting for removing black magic and negative energy',
      price: 499,
      originalPrice: 799,
      discount: '38% OFF',
      image: 'https://images.unsplash.com/photo-1608648112879-6cabfb0dda14?w=300&h=200&fit=crop',
      category: 'spells',
      rating: 4.6,
      reviews: 78,
      isPopular: true,
      tags: ['PROTECTION SPELL']
    },
    {
      id: 21,
      name: 'Yellow Sapphire (Pukhraj)',
      description: 'Natural yellow sapphire for Jupiter energy and wisdom enhancement',
      price: 2199,
      originalPrice: 2799,
      discount: '21% OFF',
      image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=300&h=200&fit=crop',
      category: 'exclusive',
      rating: 4.9,
      reviews: 89,
      isPopular: true,
      tags: ['PREMIUM QUALITY']
    },
    {
      id: 22,
      name: 'Hanuman Chalisa Path',
      description: 'Special Hanuman Chalisa recitation service for strength and protection',
      price: 99,
      originalPrice: 149,
      discount: '34% OFF',
      image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.8,
      reviews: 456,
      isPopular: true,
      tags: ['DIVINE PROTECTION']
    },
    {
      id: 23,
      name: 'Healing Crystal Bracelet',
      description: 'Multi-stone healing crystal bracelet for chakra balancing and energy',
      price: 349,
      originalPrice: 499,
      discount: '30% OFF',
      image: 'https://images.unsplash.com/photo-1601924357840-8c56e842bbb0?w=300&h=200&fit=crop',
      category: 'jewelry',
      rating: 4.5,
      reviews: 267,
      isPopular: false,
      tags: ['CHAKRA HEALING']
    },
    {
      id: 24,
      name: 'Love Attraction Spell Kit',
      description: 'Complete spell kit for attracting love and enhancing romantic relationships',
      price: 199,
      originalPrice: 299,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=300&h=200&fit=crop',
      category: 'spells',
      rating: 4.2,
      reviews: 145,
      isPopular: false,
      tags: ['LOVE MAGIC']
    },
    {
      id: 25,
      name: 'Emerald (Panna) Pendant',
      description: 'Natural emerald pendant for Mercury energy and communication skills',
      price: 1899,
      originalPrice: 2299,
      discount: '17% OFF',
      image: 'https://images.unsplash.com/photo-1607272805814-7c5600c35e37?w=300&h=200&fit=crop',
      category: 'exclusive',
      rating: 4.7,
      reviews: 123,
      isPopular: true,
      tags: ['MERCURY STONE']
    },
    {
      id: 26,
      name: 'Vastu Shastra Consultation',
      description: 'Professional Vastu consultation for home, office and business harmony',
      price: 999,
      originalPrice: 1499,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=300&h=200&fit=crop',
      category: 'consultation',
      rating: 4.8,
      reviews: 342,
      isPopular: true,
      tags: ['VASTU EXPERT']
    },
    {
      id: 27,
      name: 'Shiva Linga Worship Set',
      description: 'Complete worship set for Lord Shiva with authentic Narmada Shiva Linga',
      price: 699,
      originalPrice: 999,
      discount: '30% OFF',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.9,
      reviews: 278,
      isPopular: true,
      tags: ['NARMADA STONE']
    },
    {
      id: 28,
      name: 'Crystal Pyramids Set',
      description: 'Set of 3 crystal pyramids for energy amplification and meditation',
      price: 449,
      originalPrice: 649,
      discount: '31% OFF',
      image: 'https://images.unsplash.com/photo-1628778138749-2da995a065c9?w=300&h=200&fit=crop',
      category: 'gemstones',
      rating: 4.4,
      reviews: 167,
      isPopular: false,
      tags: ['ENERGY AMPLIFIER']
    },
    {
      id: 29,
      name: 'Personalized Name Numerology Report',
      description: 'Detailed numerology analysis of your name with lucky numbers and colors',
      price: 299,
      originalPrice: 499,
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      category: 'consultation',
      rating: 4.6,
      reviews: 234,
      isPopular: false,
      tags: ['NUMEROLOGY']
    },
    {
      id: 30,
      name: 'Copper Spiritual Water Bottle',
      description: 'Handcrafted copper water bottle with spiritual symbols for health',
      price: 399,
      originalPrice: 599,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop',
      category: 'wellness',
      rating: 4.5,
      reviews: 189,
      isPopular: false,
      tags: ['AYURVEDIC']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const updated = prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        showSuccessMessage(`Updated ${product.name} quantity in cart`);
        return updated;
      }
      showSuccessMessage(`Added ${product.name} to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const showSuccessMessage = (message) => {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const handleProductClick = (product) => {
    navigate(`/store/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Astro Store</h1>
              <p className="text-gray-600 mt-1">Spiritual products and remedies for your cosmic journey</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="text-gray-600" size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Let's find what you're looking for..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-medium">
              Search
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto">
            <Filter className="text-gray-500" size={20} />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 product-grid-animation">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow store-card">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleProductClick(product)}
                />
                
                {/* Tags/Badges */}
                <div className="absolute top-2 left-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded mb-1 mr-1 product-badge ${
                        tag.includes('OFF') || tag.includes('AVAILABLE')
                          ? 'bg-red-500 text-white'
                          : tag.includes('RECOMMENDED')
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-400 text-gray-900'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-2 right-2 discount-badge">
                    {product.discount}
                  </div>
                )}

                {/* Popular Badge */}
                {product.isPopular && (
                  <div className="absolute top-2 left-2 popular-badge">
                    🔥 POPULAR
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleProductClick(product)}
                    className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100"
                  >
                    <Eye size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Category Chip */}
                <div className="category-chip">
                  {product.category}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-purple-600"
                    onClick={() => handleProductClick(product)}>
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3 rating-stars">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current star-filled'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="price-container">
                  <div className="flex items-center gap-2">
                    <span className="current-price">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded product-badge ${
                        tag.includes('OFF') || tag.includes('AVAILABLE')
                          ? 'bg-red-500 text-white'
                          : tag.includes('RECOMMENDED') || tag.includes('EXPERT')
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-400 text-gray-900'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors cart-bounce"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No products found</div>
            <div className="text-gray-400 mt-2">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroStore;
