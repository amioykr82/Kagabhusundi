import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, Phone } from 'lucide-react';

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    navigate('/store');
    return null;
  }

  // Mock additional product images
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1601123068719-2b0b6bb32b9c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571979195097-59d223315e92?w=600&h=400&fit=crop'
  ];

  const handlePurchase = () => {
    // Navigate to checkout or payment page
    navigate('/store/checkout', {
      state: {
        items: [{ ...product, quantity }],
        total: product.price * quantity
      }
    });
  };

  const addToCart = () => {
    // Add to cart logic
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/store')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Store
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  This premium quality {product.name.toLowerCase()} is carefully curated by our expert astrologers 
                  to provide maximum spiritual benefits. Each item is blessed and energized according to ancient 
                  Vedic traditions to ensure authenticity and effectiveness.
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Enhanced spiritual energy and protection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Removes negative influences and obstacles
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Promotes peace, prosperity, and well-being
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Authentic and blessed by qualified priests
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handlePurchase}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                >
                  Buy Now - ₹{product.price * quantity}
                </button>
                <button
                  onClick={addToCart}
                  className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Add to Wishlist
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Truck className="text-green-500" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Free Delivery</div>
                    <div className="text-sm text-gray-600">On orders above ₹500</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-blue-500" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Authentic</div>
                    <div className="text-sm text-gray-600">100% genuine products</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="text-orange-500" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Easy Returns</div>
                    <div className="text-sm text-gray-600">7 days return policy</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-purple-500" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Support</div>
                    <div className="text-sm text-gray-600">24/7 customer care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span className="font-medium">Authentic & Natural</span>
                </div>
                <div className="flex justify-between">
                  <span>Origin:</span>
                  <span className="font-medium">India</span>
                </div>
                <div className="flex justify-between">
                  <span>Certification:</span>
                  <span className="font-medium">Astrologically Verified</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Care Instructions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Keep in a clean and sacred place</li>
                <li>• Regular cleansing with Ganga Jal</li>
                <li>• Avoid exposure to negative environments</li>
                <li>• Handle with devotion and respect</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map(review => (
              <div key={review} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    U{review}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Customer {review}</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Excellent quality product! Very authentic and I can feel the positive energy. 
                  Fast delivery and secure packaging. Highly recommended for spiritual practices.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
