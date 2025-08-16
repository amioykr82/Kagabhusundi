# 🔐 Environment Variables Reference

## Backend Environment Variables (Vercel)

### Required Variables

| Variable | Description | Example/Source |
|----------|-------------|----------------|
| `DATABASE_URL` | Supabase PostgreSQL connection string | `postgresql://postgres:password@db.xyz.supabase.co:5432/postgres` |
| `SECRET_KEY` | Application secret key | Generate with: `openssl rand -hex 32` |
| `JWT_SECRET_KEY` | JWT token signing key | Generate with: `openssl rand -hex 32` (different from SECRET_KEY) |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Get from: https://platform.openai.com/api-keys |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DEBUG` | `False` | Enable debug mode |
| `ENVIRONMENT` | `production` | Environment identifier |
| `JWT_ALGORITHM` | `HS256` | JWT signing algorithm |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Access token expiry |
| `JWT_REFRESH_TOKEN_EXPIRE_DAYS` | `7` | Refresh token expiry |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | OpenAI model to use |
| `OPENAI_MAX_TOKENS` | `1000` | Max tokens per AI response |
| `CORS_ORIGINS` | `*` | Allowed CORS origins |

## Frontend Environment Variables (Vercel)

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://kagabhushundi-backend.vercel.app` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_APP_NAME` | `Kagabhushundi` | Application name |
| `VITE_APP_VERSION` | `1.0.0` | Application version |

## How to Get Keys

### 1. Database URL (Supabase)
1. Visit https://supabase.com/dashboard
2. Create new project or select existing
3. Go to Settings → Database
4. Copy connection string
5. Replace password with your actual password

### 2. Secret Keys
```bash
# Generate SECRET_KEY
openssl rand -hex 32

# Generate JWT_SECRET_KEY (different key)
openssl rand -hex 32
```

### 3. OpenAI API Key
1. Visit https://platform.openai.com/
2. Sign up/login
3. Go to API Keys
4. Create new secret key
5. Copy the key (starts with `sk-...`)

## Security Notes

- ⚠️ **Never commit real environment variables to version control**
- ⚠️ **Use different values for SECRET_KEY and JWT_SECRET_KEY**
- ⚠️ **Keep OpenAI API key secure and monitor usage**
- ⚠️ **Set CORS_ORIGINS to specific domains in production**
- ⚠️ **Regularly rotate secrets and API keys**

## Vercel Setup Steps

1. Deploy backend first with all backend environment variables
2. Note the backend URL
3. Deploy frontend with `VITE_API_URL` pointing to backend
4. Update backend `CORS_ORIGINS` with frontend URL
5. Test all features including AI functionality
