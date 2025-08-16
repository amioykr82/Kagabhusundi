import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Horoscope', path: '/horoscope' },
    { name: 'Kundali', path: '/kundali' },
    { name: 'Tarot', path: '/tarot' },
    { name: 'Compatibility', path: '/compatibility' },
    { name: 'Store', path: '/store' },
    { name: 'Chat', path: '/chat' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-primary-800 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-primary-800 font-bold text-lg">🐦</span>
            </div>
            <span className="text-2xl font-display font-bold text-white group-hover:text-secondary-400 transition-colors duration-300">
              Kagabhushundi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-all duration-300 hover:text-secondary-400 ${
                  isActive(item.path) 
                    ? 'text-secondary-400' 
                    : 'text-white hover:scale-105'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary-400 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              <Link
                to="/login"
                className="px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-secondary-400 text-primary-800 rounded-lg font-semibold hover:bg-secondary-300 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center items-center space-y-1"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-secondary-400 text-primary-800 font-semibold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-white/20">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-center text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-center bg-secondary-400 text-primary-800 rounded-lg font-semibold hover:bg-secondary-300 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default ProfessionalNavbar
