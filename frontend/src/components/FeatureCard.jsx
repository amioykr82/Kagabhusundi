import React from 'react'
import { Link } from 'react-router-dom'

const FeatureCard = ({ feature, index }) => {
  return (
    <Link
      to={feature.link}
      className="group block"
    >
      <div className="h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {feature.icon}
        </div>
        <h3 className="text-2xl font-display font-bold text-primary-800 mb-4 group-hover:text-primary-600 transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>
        <div className="mt-6 flex items-center text-primary-600 font-semibold group-hover:text-primary-500">
          Learn More 
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  )
}

export default FeatureCard
