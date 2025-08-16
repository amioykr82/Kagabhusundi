import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProfessionalHome from './pages/ProfessionalHome'
import ProfessionalHoroscope from './pages/ProfessionalHoroscope'
import Kundali from './pages/Kundali'
import Horoscope from './pages/HoroscopeSimple'
import HoroscopeDetail from './pages/HoroscopeDetailSimple'
import Tarot from './pages/Tarot'
import Compatibility from './pages/Compatibility'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import ChatWithAstrologer from './pages/ChatWithAstrologer'
import PhoneVerification from './pages/PhoneVerification'
import UserInfo from './pages/UserInfo'
import ChatSession from './pages/ChatSession'
import NewChatSession from './pages/NewChatSession'
import ChatIntakeForm from './pages/ChatIntakeForm'
import ChatWaiting from './pages/ChatWaiting'
import AstroStore from './pages/AstroStore'
import AstroStoreSimple from './pages/AstroStoreSimple'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import BookPooja from './pages/BookPooja'
import PoojaDetail from './pages/PoojaDetail'
import './App.css'
import './styles/cosmic.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex flex-col">
          <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes - no authentication required */}
            <Route path="/" element={<ProfessionalHome />} />
            <Route path="/original" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/kundali" element={<Kundali />} />
            <Route path="/horoscope" element={<Horoscope />} />
            <Route path="/horoscope-professional" element={<ProfessionalHoroscope />} />
            <Route path="/horoscope/:signId" element={<HoroscopeDetail />} />
            <Route path="/get-free-horoscope" element={<Horoscope />} />
            <Route path="/get-free-horoscope/:signId" element={<HoroscopeDetail />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/store" element={<AstroStore />} />
            <Route path="/store/product/:id" element={<ProductDetail />} />
            <Route path="/store/checkout" element={<Checkout />} />
            <Route path="/book-pooja" element={<BookPooja />} />
            <Route path="/book-pooja/:id" element={<PoojaDetail />} />
            <Route path="/chat" element={<ChatWithAstrologer />} />
            <Route path="/chat/intake" element={<ChatIntakeForm />} />
            <Route path="/chat/waiting" element={<ChatWaiting />} />
            <Route path="/chat/session" element={<NewChatSession />} />
            <Route path="/chat/verification" element={<PhoneVerification />} />
            <Route path="/chat/user-info" element={<UserInfo />} />
            
            {/* Auth Routes (redirect if logged in) */}
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            } />

            {/* Protected Routes (require authentication for personalized features) */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                  <p className="text-gray-600 mb-6">The cosmic path you seek does not exist.</p>
                  <a href="/" className="btn-primary px-6 py-3">
                    Return Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </div>
    </Router>
    </AuthProvider>
  )
}

export default App
