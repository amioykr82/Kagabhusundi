// Date and time utilities
export const formatDate = (date) => {
  if (!date) return '';
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatTime = (time) => {
  if (!time) return '';
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Zodiac sign utilities
export const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio', 
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const zodiacDates = {
  'Aries': 'Mar 21 - Apr 19',
  'Taurus': 'Apr 20 - May 20',
  'Gemini': 'May 21 - Jun 20',
  'Cancer': 'Jun 21 - Jul 22',
  'Leo': 'Jul 23 - Aug 22',
  'Virgo': 'Aug 23 - Sep 22',
  'Libra': 'Sep 23 - Oct 22',
  'Scorpio': 'Oct 23 - Nov 21',
  'Sagittarius': 'Nov 22 - Dec 21',
  'Capricorn': 'Dec 22 - Jan 19',
  'Aquarius': 'Jan 20 - Feb 18',
  'Pisces': 'Feb 19 - Mar 20'
};

export const getZodiacFromDate = (birthDate) => {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  
  return 'Unknown';
};

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateBirthDate = (date) => {
  const birthDate = new Date(date);
  const today = new Date();
  const minDate = new Date(1900, 0, 1);
  
  return birthDate <= today && birthDate >= minDate;
};

// Storage utilities
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (error.response?.data?.detail) {
    return typeof error.response.data.detail === 'string' 
      ? error.response.data.detail 
      : 'An error occurred';
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Loading state management
export const createLoadingState = () => {
  const state = {
    isLoading: false,
    error: null,
    data: null
  };
  
  return {
    ...state,
    setLoading: (loading) => ({ ...state, isLoading: loading, error: null }),
    setData: (data) => ({ ...state, data, isLoading: false, error: null }),
    setError: (error) => ({ ...state, error, isLoading: false })
  };
};

// Planet and house information
export const planetInfo = {
  'Sun': { symbol: '☉', color: '#FFD700', element: 'Fire' },
  'Moon': { symbol: '☽', color: '#C0C0C0', element: 'Water' },
  'Mars': { symbol: '♂', color: '#FF4500', element: 'Fire' },
  'Mercury': { symbol: '☿', color: '#32CD32', element: 'Earth' },
  'Jupiter': { symbol: '♃', color: '#FF8C00', element: 'Fire' },
  'Venus': { symbol: '♀', color: '#FFC0CB', element: 'Earth' },
  'Saturn': { symbol: '♄', color: '#800080', element: 'Air' },
  'Rahu': { symbol: '☊', color: '#8B4513', element: 'Air' },
  'Ketu': { symbol: '☋', color: '#696969', element: 'Fire' }
};

export const houseInfo = {
  1: { name: 'Ascendant', theme: 'Self, Personality, Appearance' },
  2: { name: 'Wealth', theme: 'Money, Values, Possessions' },
  3: { name: 'Communication', theme: 'Siblings, Short Trips, Skills' },
  4: { name: 'Home', theme: 'Family, Mother, Property' },
  5: { name: 'Creativity', theme: 'Children, Romance, Creativity' },
  6: { name: 'Health', theme: 'Health, Work, Service' },
  7: { name: 'Partnership', theme: 'Marriage, Business Partners' },
  8: { name: 'Transformation', theme: 'Death, Rebirth, Hidden Things' },
  9: { name: 'Fortune', theme: 'Religion, Higher Learning, Luck' },
  10: { name: 'Career', theme: 'Profession, Status, Father' },
  11: { name: 'Gains', theme: 'Friends, Income, Hopes' },
  12: { name: 'Spirituality', theme: 'Loss, Foreign, Moksha' }
};
