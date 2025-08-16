import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Star, Phone, Video, MessageCircle, Wallet, Plus } from 'lucide-react';

const ChatWithAstrologer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');

  // Mock astrologer data with authentic images - 50+ astrologers
  const astrologers = [
    {
      id: 1,
      name: 'Arijit',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'KP'],
      languages: ['English', 'Hindi'],
      experience: '20 Years',
      rating: 4.9,
      reviews: 1726,
      price: 5,
      priceUnit: '18/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    },
    {
      id: 2,
      name: 'Bhavik',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Palmistry'],
      languages: ['English', 'Hindi'],
      experience: '4 Years',
      rating: 4.8,
      reviews: 19848,
      price: 5,
      priceUnit: '14/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 3,
      name: 'Virendra07',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic'],
      languages: ['Hindi'],
      experience: '11 Years',
      rating: 4.7,
      reviews: 26750,
      price: 5,
      priceUnit: '26/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 4,
      name: 'Madhur2',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Life Coach'],
      languages: ['English', 'Hindi'],
      experience: '11 Years',
      rating: 4.9,
      reviews: 34874,
      price: 5,
      priceUnit: '20/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 5,
      name: 'Dipen',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Face Reading'],
      languages: ['Hindi'],
      experience: '5 Years',
      rating: 4.8,
      reviews: 17413,
      price: 5,
      priceUnit: '20/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 6,
      name: 'Rajwir',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Palmistry', 'Face Reading'],
      languages: ['English', 'Hindi', 'Marwari'],
      experience: '8 Years',
      rating: 4.6,
      reviews: 9206,
      price: 13,
      priceUnit: '36/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 7,
      name: 'Nadarajan',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Nadi', 'Numerology'],
      languages: ['Tamil'],
      experience: '3 Years',
      rating: 4.9,
      reviews: 1346,
      price: 16,
      priceUnit: '26/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 8,
      name: 'Bramarambika',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a7?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Prashana', 'Palmistry'],
      languages: ['English', 'Kannada'],
      experience: '5 Years',
      rating: 4.8,
      reviews: 0,
      price: 33,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true,
      isNew: true
    },
    {
      id: 9,
      name: 'Sarabjeet',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      specialties: ['Numerology', 'Tarot', 'Loshi Grid'],
      languages: ['Hindi', 'English', 'Punjabi'],
      experience: '3 Years',
      rating: 4.7,
      reviews: 23210,
      price: 32,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 10,
      name: 'Muneesh',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic'],
      languages: ['English', 'Tamil'],
      experience: '5 Years',
      rating: 4.9,
      reviews: 0,
      price: 25,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true,
      isNew: true
    },
    {
      id: 11,
      name: 'Ridhyank',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Life Coach', 'Face Reading'],
      languages: ['Hindi'],
      experience: '4 Years',
      rating: 4.8,
      reviews: 7828,
      price: 20,
      priceUnit: '22/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 12,
      name: 'Ramadip',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic'],
      languages: ['Hindi', 'English', 'Rajasthani'],
      experience: '4 Years',
      rating: 4.6,
      reviews: 3970,
      price: 20,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 13,
      name: 'Seeman',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Palmistry', 'Face Reading'],
      languages: ['Hindi'],
      experience: '2 Years',
      rating: 4.7,
      reviews: 0,
      price: 24,
      priceUnit: '30/min',
      status: 'online',
      orders: 0,
      isOnline: true,
      isNew: true
    },
    {
      id: 14,
      name: 'Sobhana',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Nadi', 'Prashana'],
      languages: ['Tamil'],
      experience: '6 Years',
      rating: 4.8,
      reviews: 39232,
      price: 14,
      priceUnit: '27/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 15,
      name: 'Tarunikani',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic'],
      languages: ['Tamil'],
      experience: '3 Years',
      rating: 4.9,
      reviews: 1140,
      price: 10,
      priceUnit: '20/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    // Adding more astrologers to reach 50+
    {
      id: 16,
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Tarot'],
      languages: ['Hindi', 'English'],
      experience: '7 Years',
      rating: 4.6,
      reviews: 2150,
      price: 18,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 17,
      name: 'Dr. Rajesh Kumar',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Medical Astrology'],
      languages: ['Hindi', 'English', 'Bengali'],
      experience: '15 Years',
      rating: 4.9,
      reviews: 8900,
      price: 35,
      priceUnit: '/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    },
    {
      id: 18,
      name: 'Sunita Devi',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      specialties: ['Palmistry', 'Face Reading'],
      languages: ['Hindi'],
      experience: '12 Years',
      rating: 4.7,
      reviews: 5670,
      price: 22,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 19,
      name: 'Ganesh Pandit',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Numerology'],
      languages: ['Hindi', 'Marathi'],
      experience: '9 Years',
      rating: 4.8,
      reviews: 3420,
      price: 28,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 20,
      name: 'Kavya Menon',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      specialties: ['Tarot', 'Crystal Healing'],
      languages: ['English', 'Malayalam'],
      experience: '4 Years',
      rating: 4.5,
      reviews: 1890,
      price: 30,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    // Continue with more astrologers...
    {
      id: 21,
      name: 'Anand Joshi',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face',
      specialties: ['KP System', 'Horary'],
      languages: ['Hindi', 'Gujarati'],
      experience: '16 Years',
      rating: 4.9,
      reviews: 12500,
      price: 40,
      priceUnit: '/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    },
    {
      id: 22,
      name: 'Meera Tripathi',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Vastu'],
      languages: ['Hindi', 'English'],
      experience: '8 Years',
      rating: 4.6,
      reviews: 4300,
      price: 25,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 23,
      name: 'Suresh Acharya',
      image: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Gemstone Therapy'],
      languages: ['Hindi', 'Sanskrit'],
      experience: '20 Years',
      rating: 4.8,
      reviews: 15600,
      price: 45,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 24,
      name: 'Lakshmi Nair',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      specialties: ['Palmistry', 'Numerology'],
      languages: ['English', 'Malayalam', 'Tamil'],
      experience: '6 Years',
      rating: 4.7,
      reviews: 2890,
      price: 20,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 25,
      name: 'Vikram Singh',
      image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Career Guidance'],
      languages: ['Hindi', 'Punjabi'],
      experience: '10 Years',
      rating: 4.8,
      reviews: 6750,
      price: 32,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 26,
      name: 'Sanjay Gupta',
      image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Horary'],
      languages: ['Hindi', 'English'],
      experience: '18 Years',
      rating: 4.9,
      reviews: 11200,
      price: 38,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 27,
      name: 'Asha Patel',
      image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&h=100&fit=crop&crop=face',
      specialties: ['Palmistry', 'Vastu'],
      languages: ['Hindi', 'Gujarati'],
      experience: '14 Years',
      rating: 4.7,
      reviews: 7850,
      price: 30,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 28,
      name: 'Ramesh Iyer',
      image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Gemology'],
      languages: ['Tamil', 'English'],
      experience: '22 Years',
      rating: 4.8,
      reviews: 16400,
      price: 42,
      priceUnit: '/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    },
    {
      id: 29,
      name: 'Deepika Rao',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=face',
      specialties: ['Tarot', 'Angel Cards'],
      languages: ['English', 'Kannada'],
      experience: '6 Years',
      rating: 4.6,
      reviews: 3450,
      price: 25,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 30,
      name: 'Harish Chandra',
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Muhurat'],
      languages: ['Hindi', 'Sanskrit'],
      experience: '25 Years',
      rating: 4.9,
      reviews: 20100,
      price: 50,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 31,
      name: 'Kavita Singh',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face',
      specialties: ['Numerology', 'Name Analysis'],
      languages: ['Hindi', 'English'],
      experience: '9 Years',
      rating: 4.7,
      reviews: 5620,
      price: 28,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 32,
      name: 'Manoj Sharma',
      image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&h=100&fit=crop&crop=face',
      specialties: ['KP System', 'Stock Market'],
      languages: ['Hindi', 'English'],
      experience: '12 Years',
      rating: 4.8,
      reviews: 8900,
      price: 35,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 33,
      name: 'Nirmala Devi',
      image: 'https://images.unsplash.com/photo-1629467057571-42d22d8f0cbd?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Child Astrology'],
      languages: ['Hindi', 'Marathi'],
      experience: '16 Years',
      rating: 4.9,
      reviews: 12800,
      price: 40,
      priceUnit: '/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    },
    {
      id: 34,
      name: 'Arjun Reddy',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Prashna'],
      languages: ['Telugu', 'English'],
      experience: '8 Years',
      rating: 4.6,
      reviews: 4320,
      price: 26,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 35,
      name: 'Shweta Agarwal',
      image: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=100&h=100&fit=crop&crop=face',
      specialties: ['Tarot', 'Relationship Counseling'],
      languages: ['Hindi', 'English'],
      experience: '7 Years',
      rating: 4.7,
      reviews: 6780,
      price: 30,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 36,
      name: 'Ravi Kumar',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Medical Astrology'],
      languages: ['Hindi', 'Bengali'],
      experience: '20 Years',
      rating: 4.8,
      reviews: 14500,
      price: 45,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 37,
      name: 'Usha Jain',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&h=100&fit=crop&crop=face',
      specialties: ['Palmistry', 'Face Reading'],
      languages: ['Hindi', 'Rajasthani'],
      experience: '13 Years',
      rating: 4.7,
      reviews: 9240,
      price: 32,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 38,
      name: 'Ashwin Mehta',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Business Astrology'],
      languages: ['Gujarati', 'English'],
      experience: '17 Years',
      rating: 4.9,
      reviews: 13600,
      price: 42,
      priceUnit: '/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    },
    {
      id: 39,
      name: 'Pooja Verma',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      specialties: ['Numerology', 'Crystal Healing'],
      languages: ['Hindi', 'English'],
      experience: '5 Years',
      rating: 4.5,
      reviews: 2890,
      price: 22,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 40,
      name: 'Satish Tiwari',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Mundane Astrology'],
      languages: ['Hindi', 'Sanskrit'],
      experience: '24 Years',
      rating: 4.8,
      reviews: 18700,
      price: 48,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 41,
      name: 'Rekha Pandey',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      specialties: ['Tarot', 'Past Life Regression'],
      languages: ['Hindi', 'English'],
      experience: '11 Years',
      rating: 4.6,
      reviews: 7450,
      price: 34,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 42,
      name: 'Dilip Joshi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      specialties: ['KP System', 'Sports Astrology'],
      languages: ['Gujarati', 'Hindi'],
      experience: '15 Years',
      rating: 4.7,
      reviews: 10200,
      price: 36,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 43,
      name: 'Smita Roy',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Feng Shui'],
      languages: ['Bengali', 'English'],
      experience: '10 Years',
      rating: 4.8,
      reviews: 6890,
      price: 29,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 44,
      name: 'Kiran Bedi',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      specialties: ['Palmistry', 'Career Guidance'],
      languages: ['Hindi', 'Punjabi'],
      experience: '19 Years',
      rating: 4.9,
      reviews: 15300,
      price: 44,
      priceUnit: '/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    },
    {
      id: 45,
      name: 'Mohit Sinha',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Electional Astrology'],
      languages: ['Hindi', 'English'],
      experience: '13 Years',
      rating: 4.7,
      reviews: 8760,
      price: 33,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 46,
      name: 'Anita Kapoor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      specialties: ['Numerology', 'Vastu'],
      languages: ['Hindi', 'Punjabi'],
      experience: '12 Years',
      rating: 4.6,
      reviews: 7120,
      price: 31,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 47,
      name: 'Yogesh Bhatt',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Spiritual Guidance'],
      languages: ['Gujarati', 'Hindi'],
      experience: '21 Years',
      rating: 4.8,
      reviews: 16800,
      price: 46,
      priceUnit: '/min',
      status: 'busy',
      orders: 0,
      isOnline: true
    },
    {
      id: 48,
      name: 'Sudha Mishra',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face',
      specialties: ['Tarot', 'Energy Healing'],
      languages: ['Hindi', 'English'],
      experience: '8 Years',
      rating: 4.5,
      reviews: 4590,
      price: 27,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 49,
      name: 'Rajesh Agarwal',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      specialties: ['KP System', 'Financial Astrology'],
      languages: ['Hindi', 'English'],
      experience: '16 Years',
      rating: 4.9,
      reviews: 12400,
      price: 39,
      priceUnit: '/min',
      status: 'online',
      orders: 0,
      isOnline: true
    },
    {
      id: 50,
      name: 'Neeraj Kumar',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      specialties: ['Vedic', 'Remedial Astrology'],
      languages: ['Hindi', 'English'],
      experience: '14 Years',
      rating: 4.8,
      reviews: 9850,
      price: 35,
      priceUnit: '/min',
      status: 'offline',
      orders: 0,
      isOnline: false
    }
  ];

  const filteredAstrologers = astrologers.filter(astrologer => {
    const matchesSearch = astrologer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      astrologer.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'online' && astrologer.isOnline) ||
      (filterBy === 'offline' && !astrologer.isOnline);
    
    return matchesSearch && matchesFilter;
  });

  const sortedAstrologers = [...filteredAstrologers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  // Function to start chat with astrologer
  const startChatWithAstrologer = (astrologer) => {
    if (astrologer.status === 'offline') return;
    
    navigate('/chat/intake', {
      state: { astrologer }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Currently offline';
      default:
        return 'Offline';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-yellow-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Chat with Astrologer</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
              <span>Available balance:</span>
              <span className="font-semibold">₹ 0</span>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Plus size={16} />
              Recharge
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAstrologers.map((astrologer) => (
            <div key={astrologer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {/* Status Indicator */}
              <div className="flex justify-end mb-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(astrologer.status)}`}></div>
              </div>

              {/* Astrologer Info */}
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <img
                    src={astrologer.image}
                    alt={astrologer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {astrologer.isNew && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded">
                      New!
                    </span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{astrologer.name}</h3>
                  <div className="text-sm text-gray-600 mb-1">
                    {astrologer.specialties.join(', ')}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {astrologer.languages.join(', ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    Exp: {astrologer.experience}
                  </div>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(astrologer.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{astrologer.rating}</span>
                <span className="text-sm text-gray-600">
                  {astrologer.reviews} orders
                </span>
              </div>

              {/* Status and Price */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">
                  {getStatusText(astrologer.status)}
                </span>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ₹ {astrologer.price}
                    <span className="text-sm font-normal text-gray-600">
                      {astrologer.priceUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => startChatWithAstrologer(astrologer)}
                disabled={astrologer.status === 'offline'}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  astrologer.status === 'offline'
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : astrologer.status === 'busy'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {astrologer.status === 'offline' ? 'Offline' : 'Chat'}
              </button>

              {/* Wait time for busy astrologers */}
              {astrologer.status === 'busy' && (
                <div className="text-center text-sm text-red-600 mt-2">
                  Wait ~ 10m
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAstrologers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No astrologers found</div>
            <div className="text-gray-400">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWithAstrologer;
