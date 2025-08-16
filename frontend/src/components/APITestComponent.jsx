import React, { useState } from 'react'

const APITestComponent = () => {
  const [testResult, setTestResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    setTestResult('Testing...')
    
    try {
      // Test basic health endpoint first
      console.log('Testing health endpoint...')
      const healthResponse = await fetch('http://localhost:8000/health')
      console.log('Health response status:', healthResponse.status)
      
      if (!healthResponse.ok) {
        throw new Error(`Health check failed: ${healthResponse.status}`)
      }
      
      const healthData = await healthResponse.json()
      console.log('Health data:', healthData)
      
      // Test astrologers endpoint with proxy
      console.log('Testing astrologers endpoint with proxy...')
      const astrologersResponse = await fetch('/api/chat/astrologers')
      console.log('Astrologers response status:', astrologersResponse.status)
      
      if (!astrologersResponse.ok) {
        throw new Error(`Astrologers API failed: ${astrologersResponse.status}`)
      }
      
      const astrologersData = await astrologersResponse.json()
      console.log('Astrologers data:', astrologersData)
      
      setTestResult(`✅ Success! Health: ${healthData.status}, Astrologers: ${astrologersData.total} found`)
      
    } catch (error) {
      console.error('API Test Error:', error)
      setTestResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', backgroundColor: '#f9f9f9' }}>
      <h3>API Connection Test</h3>
      <button onClick={testAPI} disabled={loading} style={{ padding: '10px 20px', marginBottom: '10px' }}>
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ddd' }}>
        {testResult || 'Click button to test API connection'}
      </div>
    </div>
  )
}

export default APITestComponent
