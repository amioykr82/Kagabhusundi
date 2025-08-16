# Kagabhushundi - Advanced Astrology Application

## 🌟 Overview
Kagabhushundi is a comprehensive astrology application that combines traditional Vedic and Western astrology with modern AI-powered interpretations. Named after the mythological crow sage, this app provides personalized horoscopes, birth chart analysis, tarot readings, and compatibility checks.

## � Live Demo
- **Frontend**: [https://kagabhushundi.vercel.app](https://kagabhushundi.vercel.app)
- **Backend API**: [https://kagabhushundi-backend.vercel.app](https://kagabhushundi-backend.vercel.app)

## �🚀 Features

### Core Features
- **Professional Authentication System**: Secure user registration and login with JWT tokens
- **Horoscope Generation**: Daily/weekly personalized Vedic & Western astrology predictions
- **Birth Chart (Kundali)**: Detailed natal charts with planetary positions, houses, nakshatras
- **Compatibility Check**: Astrological compatibility based on birth charts
- **Tarot Card Reading**: Daily tarot draw, multi-card spreads with AI interpretation
- **Astro Store**: Professional e-commerce for astrology products and services
- **Book Pooja**: Online pooja booking system with detailed service descriptions
- **Chat with Astrologer**: Live consultation system with phone verification

### Technical Features
- Modern React frontend with Tailwind CSS and Vite
- FastAPI backend with Python 3.13
- PostgreSQL database (production) / SQLite (development)
- Swiss Ephemeris for accurate astronomical calculations
- JWT authentication with refresh tokens
- Hot toast notifications for user feedback
- Responsive design for all devices
- CORS configured for secure cross-origin requests

## 🛠️ Tech Stack

### Frontend
- **Framework**: ReactJS (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (Python 3.13)
- **Database**: PostgreSQL (Supabase) / SQLite
- **ORM**: SQLAlchemy
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt
- **Astrology Calculations**: Swiss Ephemeris (pyswisseph)
- **Deployment**: Vercel

### DevOps & Deployment
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Version Control**: Git & GitHub
- **Environment Management**: Environment variables

## 🏗️ Project Structure

```
kagabhushundi/
├── backend/
│   ├── main.py
│   ├── services/
│   ├── models/
│   ├── utils/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker (optional)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your OpenAI API key to .env
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up --build
```

## 🔑 Environment Variables

Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://user:password@localhost/kagabhushundi
JWT_SECRET_KEY=your_jwt_secret_key
```

## 📱 Branding

- **App Name**: Kagabhushundi
- **Primary Colors**: Deep Indigo (#4B0082), Golden Accent (#FFD700)
- **Logo**: Mythological crow (Kaga) motif with mystical elements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Swiss Ephemeris for astronomical calculations
- OpenAI for AI-powered interpretations
- The Vedic astrology community for traditional knowledge
