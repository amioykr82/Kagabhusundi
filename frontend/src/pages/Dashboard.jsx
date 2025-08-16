/**
 * User Dashboard Component
 * Shows authenticated user's features and quick access to astrology services
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { 
  User, Star, Calendar, Heart, MessageCircle, ShoppingBag, 
  Sparkles, Eye, Moon, Sun, Settings, LogOut 
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  const quickActions = [
    {
      title: 'Daily Horoscope',
      description: 'Get your personalized daily predictions',
      icon: Sun,
      link: '/horoscope',
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'Kundali Reading',
      description: 'Generate your detailed birth chart',
      icon: Star,
      link: '/kundali',
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Tarot Cards',
      description: 'Discover insights through tarot',
      icon: Eye,
      link: '/tarot',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      title: 'Compatibility',
      description: 'Check relationship compatibility',
      icon: Heart,
      link: '/compatibility',
      color: 'from-pink-400 to-rose-500'
    },
    {
      title: 'Chat with Astrologer',
      description: 'Get personalized guidance',
      icon: MessageCircle,
      link: '/chat',
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Astro Store',
      description: 'Shop spiritual items',
      icon: ShoppingBag,
      link: '/store',
      color: 'from-blue-400 to-cyan-500'
    }
  ]

  const recentActivities = [
    {
      type: 'horoscope',
      title: 'Daily Horoscope Read',
      time: '2 hours ago',
      icon: Sun
    },
    {
      type: 'kundali',
      title: 'Kundali Generated',
      time: '1 day ago',
      icon: Star
    },
    {
      type: 'chat',
      title: 'Chat Session with Guru Ram',
      time: '3 days ago',
      icon: MessageCircle
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-mystic-pattern opacity-10"></div>
      
      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-purple-400 mr-3" />
              <h1 className="text-2xl font-bold text-white">Kagabhushundi</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                <User className="h-5 w-5 mr-2" />
                {user?.name || 'Profile'}
              </Link>
              
              <Link
                to="/profile"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5" />
              </Link>
              
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Seeker'}! 🌟
          </h2>
          <p className="text-purple-200">
            Your cosmic journey continues. What would you like to explore today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glassmorphism-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500/20 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Today's Energy</h3>
                <p className="text-purple-200">Highly Positive</p>
              </div>
            </div>
          </div>

          <div className="glassmorphism-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pink-500/20 rounded-lg mr-4">
                <Moon className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Moon Phase</h3>
                <p className="text-purple-200">Waxing Crescent</p>
              </div>
            </div>
          </div>

          <div className="glassmorphism-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500/20 rounded-lg mr-4">
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Lucky Number</h3>
                <p className="text-purple-200">7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="group glassmorphism-card p-6 hover:scale-105 transition-all duration-300"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-purple-200 text-sm">
                      {action.description}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Recent Activity & Profile */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="glassmorphism-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Profile Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-purple-200 text-sm">{user?.email}</span>
                </div>
                {user?.birth_date && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-purple-200 text-sm">
                      {new Date(user.birth_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {user?.phone && (
                  <div className="flex items-center">
                    <span className="text-purple-200 text-sm">{user.phone}</span>
                  </div>
                )}
              </div>
              <Link
                to="/profile"
                className="inline-block mt-4 text-purple-300 hover:text-white text-sm transition-colors"
              >
                Update Profile →
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="glassmorphism-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={index} className="flex items-center">
                      <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                        <IconComponent className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.title}</p>
                        <p className="text-purple-300 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Daily Tip */}
            <div className="glassmorphism-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Today's Cosmic Tip</h3>
              <p className="text-purple-200 text-sm">
                "The stars are aligned for new beginnings. Trust your intuition and take that first step towards your dreams."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
