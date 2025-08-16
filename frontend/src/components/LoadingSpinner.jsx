import React from 'react'

const LoadingSpinner = ({ size = 'md', color = 'primary-800' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-2 border-${color} border-t-transparent rounded-full animate-spin`}></div>
    </div>
  )
}

export default LoadingSpinner
