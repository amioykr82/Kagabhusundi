# 🚀 Kagabhushundi - Vercel Deployment Guide

## ✅ Repository Successfully Pushed to GitHub
**Repository**: https://github.com/amioykr82/Kagabhusundi

## 📋 Next Steps for Vercel Deployment

### 1. Backend Deployment (API)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**: 
   - Click "New Project"
   - Import from GitHub: `amioykr82/Kagabhusundi`
   - Select `backend` folder as root directory
3. **Configure Environment Variables**:
   ```
   DEBUG=False
   DATABASE_URL=postgresql://user:password@host:port/database
   SECRET_KEY=your-super-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   JWT_ALGORITHM=HS256
   JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
   JWT_REFRESH_TOKEN_EXPIRE_DAYS=7
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```
4. **Deploy**: Click "Deploy"
5. **Note Backend URL**: e.g., `https://kagabhushundi-backend.vercel.app`

### 2. Database Setup (Supabase)

1. **Create Supabase Project**: https://supabase.com
2. **Get Connection String**: 
   - Go to Settings > Database
   - Copy the connection string
   - Use this as `DATABASE_URL` in Vercel
3. **Database Auto-Setup**: Tables will be created automatically on first API call

### 3. Frontend Deployment

1. **Deploy Frontend**:
   - Import same GitHub repo
   - Select `frontend` folder as root directory
2. **Configure Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-api.vercel.app
   VITE_APP_ENV=production
   ```
3. **Deploy**: Click "Deploy"
4. **Note Frontend URL**: e.g., `https://kagabhushundi.vercel.app`

### 4. Final Configuration Updates

1. **Update Backend CORS**:
   - Go to backend Vercel project settings
   - Update `CORS_ORIGINS` environment variable with your frontend URL
   
2. **Test the Application**:
   - Visit your frontend URL
   - Test registration and login
   - Verify all features work

## 🔗 Expected Final URLs

- **Frontend**: `https://kagabhushundi.vercel.app`
- **Backend API**: `https://kagabhushundi-backend.vercel.app`
- **API Docs**: `https://kagabhushundi-backend.vercel.app/docs`

## ⚙️ Environment Variables Reference

### Backend (.env for Vercel)
```env
DEBUG=False
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
SECRET_KEY=your-256-bit-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7
CORS_ORIGINS=https://kagabhushundi.vercel.app
ENVIRONMENT=production
```

### Frontend (.env for Vercel)
```env
VITE_API_URL=https://kagabhushundi-backend.vercel.app
VITE_APP_ENV=production
```

## 🔐 Security Checklist

- [ ] Set strong SECRET_KEY (256-bit random string)
- [ ] Set strong JWT_SECRET_KEY (different from SECRET_KEY)
- [ ] Configure CORS_ORIGINS to your frontend domain
- [ ] Use PostgreSQL for production (not SQLite)
- [ ] Never commit .env files with real secrets
- [ ] Use Vercel environment variables for all secrets

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure CORS_ORIGINS matches your frontend URL exactly
2. **Database Errors**: Verify DATABASE_URL is correct
3. **Authentication Issues**: Check JWT secret keys are set
4. **Import Errors**: Ensure all dependencies are in requirements-vercel.txt

### Testing:
- Test API at: `https://your-backend.vercel.app/docs`
- Test health endpoint: `https://your-backend.vercel.app/health`
- Check logs in Vercel dashboard for any errors

## 📁 Project Structure (Deployed)

```
Repository: amioykr82/Kagabhusundi
├── backend/                 # Deploy as separate Vercel project
│   ├── api/index.py        # Vercel entry point
│   ├── vercel.json         # Vercel config
│   ├── requirements-vercel.txt
│   └── .env.production     # Environment template
├── frontend/               # Deploy as separate Vercel project  
│   ├── vercel.json         # Vercel config
│   ├── .env.production     # Environment template
│   └── dist/              # Build output
└── DEPLOYMENT.md          # This guide
```

The project is now ready for deployment! Follow the steps above to deploy both frontend and backend to Vercel.
