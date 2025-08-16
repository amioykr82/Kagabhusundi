import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="font-mystic text-xl font-semibold text-white">
                Kagabhushundi
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover your cosmic destiny with advanced astrology, AI-powered insights, 
              and mystical guidance. Your journey to self-discovery starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                {/* Add social media icons */}
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kundali" className="text-gray-300 hover:text-white transition-colors">
                  Birth Chart
                </Link>
              </li>
              <li>
                <Link to="/horoscope" className="text-gray-300 hover:text-white transition-colors">
                  Horoscope
                </Link>
              </li>
              <li>
                <Link to="/tarot" className="text-gray-300 hover:text-white transition-colors">
                  Tarot Reading
                </Link>
              </li>
              <li>
                <Link to="/compatibility" className="text-gray-300 hover:text-white transition-colors">
                  Compatibility
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Kagabhushundi. All rights reserved. Made with ✨ for cosmic seekers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
