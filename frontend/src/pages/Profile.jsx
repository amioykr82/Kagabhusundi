import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Profile = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        
        <h1 className="heading-2 text-center mb-8">User Profile</h1>
        <div className="card text-center">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            Manage your profile, birth details, and reading history.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
