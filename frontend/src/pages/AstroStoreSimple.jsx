import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Star, Filter, Heart, Eye } from 'lucide-react';

const AstroStoreSimple = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Simple mock products for testing
  const products = [
    {
      id: 1,
      name: 'VIP E-Pooja',
      description: 'Almost everything runs on Internet today and in order to stay connected with divinity...',
      price: 100,
      originalPrice: 120,
      discount: '17% OFF',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      category: 'pooja',
      rating: 4.9,
      reviews: 189,
      isPopular: true,
      tags: ['JAI KANHAIYA', 'BALKI']
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Astro Store - Test</h1>
              <p className="text-gray-600 mt-1">Spiritual products and remedies for your cosmic journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.discount}
                  </div>
                )}

                {/* Popular Badge */}
                {product.isPopular && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    🔥 POPULAR
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AstroStoreSimple;
