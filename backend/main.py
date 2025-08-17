from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers and services
from services.kundali_service import router as kundali_router
from services.horoscope_service import router as horoscope_router
from services.tarot_service import router as tarot_router
from services.compatibility_service import router as compatibility_router
from services.auth_service import router as auth_router
from services.chat_service import router as chat_router
from services.store_service import router as store_router
from services.pooja_service import router as pooja_router
from utils.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup - Initialize database
    init_db()
    yield
    # Shutdown - nothing to cleanup for now

# Initialize FastAPI app
app = FastAPI(
    title="Kagabhushundi API",
    description="Advanced Astrology Application with AI-powered interpretations",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS
if os.getenv("DEBUG", "True").lower() == "true":
    # Development - allow all origins
    cors_origins = ["*"]
else:
    # Production - specific origins only
    cors_origins = os.getenv("CORS_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Health check endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Kagabhushundi - Advanced Astrology API",
        "version": "1.0.0",
        "status": "active",
        "features": [
            "Kundali Generation",
            "Horoscope Predictions", 
            "Tarot Readings",
            "Compatibility Analysis",
            "Pooja Booking System",
            "Astro Store",
            "AI-powered Interpretations"
        ]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Kagabhushundi API"}

# Include routers with updated auth prefix
app.include_router(auth_router, tags=["Authentication"])  # auth_router already has prefix="/auth"
app.include_router(kundali_router, prefix="/api/kundali", tags=["Kundali"])
app.include_router(horoscope_router, prefix="/api/horoscope", tags=["Horoscope"])
app.include_router(tarot_router, prefix="/api/tarot", tags=["Tarot"])
app.include_router(compatibility_router, prefix="/api/compatibility", tags=["Compatibility"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(store_router, prefix="/api/store", tags=["Store"])
app.include_router(pooja_router, prefix="/api/pooja", tags=["Pooja"])

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {"error": "Endpoint not found", "detail": "The requested resource does not exist"}

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return {"error": "Internal server error", "detail": "An unexpected error occurred"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "False").lower() == "true"
    )
