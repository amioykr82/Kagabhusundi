# Kagabhushundi Development Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### 1. Clone and Setup
```bash
git clone <repository-url>
cd kagabhushundi
chmod +x setup.sh
./setup.sh
```

### 2. Configure Environment
Edit `backend/.env` with your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET_KEY=your_super_secret_jwt_key_here
```

### 3. Start Development Servers

#### Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

#### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 🛠️ Development Workflow

### Backend Development
1. **Add new API endpoints** in `services/` directory
2. **Update database models** in `models/database_models.py`
3. **Add new schemas** in `models/schemas.py`
4. **Test endpoints** using FastAPI docs at `/docs`

### Frontend Development
1. **Add new components** in `src/components/`
2. **Create new pages** in `src/pages/`
3. **Update routing** in `src/App.jsx`
4. **Style with Tailwind CSS** classes

### Project Structure
```
kagabhushundi/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── models/
│   │   ├── schemas.py          # Pydantic models
│   │   └── database_models.py  # SQLAlchemy models
│   ├── services/               # API route handlers
│   │   ├── kundali_service.py
│   │   ├── horoscope_service.py
│   │   ├── tarot_service.py
│   │   ├── compatibility_service.py
│   │   ├── auth_service.py
│   │   └── gpt_service.py
│   ├── utils/
│   │   ├── database.py         # Database connection
│   │   └── astro_calculations.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API clients
│   │   └── utils/             # Utility functions
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

## 🔧 Key Technologies

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **Swiss Ephemeris**: Astronomical calculations
- **OpenAI GPT-4**: AI interpretations
- **JWT**: Authentication
- **PostgreSQL**: Database

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **Axios**: HTTP client
- **Framer Motion**: Animations

## 📡 API Endpoints

### Core Features
- `POST /api/kundali/generate` - Generate birth chart
- `POST /api/horoscope/daily` - Daily horoscope
- `POST /api/tarot/draw` - Tarot reading
- `POST /api/compatibility/analyze` - Compatibility analysis

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Current user info

## 🎨 Styling Guide

### Color Scheme
- **Primary**: Deep Indigo (#4B0082)
- **Secondary**: Golden (#FFD700)
- **Accent**: Purple tones

### Component Classes
- `btn-primary` - Primary button
- `btn-outline` - Outlined button
- `card` - Basic card
- `card-mystic` - Themed card
- `heading-1/2/3` - Typography

## 🚀 Deployment

### Local Docker
```bash
docker-compose up --build
```

### Production (Railway/Render)
1. Push to GitHub
2. Connect repository to hosting service
3. Set environment variables
4. Deploy

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 Next Development Phases

### Phase 2: Core Features Implementation
- Complete Kundali generation with Swiss Ephemeris
- Implement horoscope calculation algorithms
- Build tarot card system
- Add compatibility analysis

### Phase 3: Advanced Features
- User authentication and profiles
- Reading history and favorites
- Advanced chart interpretations
- Mobile PWA features

### Phase 4: Production Ready
- Performance optimization
- Comprehensive testing
- Security hardening
- Analytics and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Coding! ✨**
