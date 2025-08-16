import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Functions
export const apiService = {
  // Authentication
  auth: {
    register: (userData) => api.post('/api/auth/register', userData),
    login: (credentials) => api.post('/api/auth/login', credentials),
    getProfile: () => api.get('/api/auth/profile'),
    updateProfile: (data) => api.put('/api/auth/profile', data),
  },

  // Kundali Services
  kundali: {
    generate: (birthDetails) => api.post('/api/kundali/generate', birthDetails),
    getSample: () => api.get('/api/kundali/sample'),
  },

  // Horoscope Services
  horoscope: {
    daily: (request) => api.post('/api/horoscope/daily', request),
    weekly: (request) => api.post('/api/horoscope/weekly', request),
    monthly: (request) => api.post('/api/horoscope/monthly', request),
    generate: (request) => api.post('/api/horoscope/generate', request),
  },

  // Tarot Services
  tarot: {
    draw: (request) => api.post('/api/tarot/draw', request),
    getCardMeanings: () => api.get('/api/tarot/card-meanings'),
    getSpreads: () => api.get('/api/tarot/spreads'),
  },

  // Compatibility Services
  compatibility: {
    analyze: (request) => api.post('/api/compatibility/analyze', request),
    getSignCompatibility: (sign1, sign2) => 
      api.get(`/api/compatibility/sign-compatibility/${sign1}/${sign2}`),
  },

  // Health check
  health: () => api.get('/health'),
};

// Helper functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export default api;
