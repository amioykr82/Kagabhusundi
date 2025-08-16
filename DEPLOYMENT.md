# Kagabhushundi - Deployment Guide

## Vercel Deployment Instructions

### Backend Deployment

1. **Deploy Backend to Vercel**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Set Environment Variables in Vercel Dashboard**
   - `DATABASE_URL`: Your PostgreSQL connection string (from Supabase)
   - `SECRET_KEY`: A secure random string for app security
   - `JWT_SECRET_KEY`: A secure random string for JWT tokens
   - `JWT_ALGORITHM`: HS256
   - `JWT_ACCESS_TOKEN_EXPIRE_MINUTES`: 30
   - `JWT_REFRESH_TOKEN_EXPIRE_DAYS`: 7
   - `CORS_ORIGINS`: Your frontend domain (e.g., https://kagabhushundi.vercel.app)
   - `DEBUG`: False

3. **Note your backend URL** (e.g., https://kagabhushundi-backend.vercel.app)

### Frontend Deployment

1. **Update Frontend Environment Variables**
   - Update `VITE_API_URL` in `.env.production` with your backend URL

2. **Deploy Frontend to Vercel**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - `VITE_API_URL`: Your backend URL from step 1

### Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note the database connection string

2. **Database Schema**
   - The database tables will be created automatically on first run
   - Tables: users, kundalis, pooja_bookings, chat_sessions, orders

### Security Notes

- Never commit `.env` files with real secrets
- Use Vercel environment variables for all sensitive data
- Update CORS origins to match your deployed domains

### Domain Configuration

After deployment, update:
- Backend CORS_ORIGINS environment variable
- Frontend VITE_API_URL environment variable
- Both should point to the actual deployed URLs

## File Structure for Deployment

```
kagabhushundi/
├── backend/
│   ├── api/
│   │   └── index.py          # Vercel entry point
│   ├── vercel.json           # Vercel backend config
│   ├── requirements-vercel.txt  # Production dependencies
│   └── .env.production       # Production env template
├── frontend/
│   ├── vercel.json           # Vercel frontend config
│   └── .env.production       # Production env template
└── README.md
```
