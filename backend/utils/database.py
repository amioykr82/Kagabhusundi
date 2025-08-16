from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Import Base from models to avoid circular import
from models.database_models import Base

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./kagabhushundi.db")

# Create engine
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False}  # Only for SQLite
    )
else:
    engine = create_engine(DATABASE_URL)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for models
# Base = declarative_base() - moved to database_models.py to avoid circular imports

# Metadata for migrations
metadata = MetaData()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initialize database
def init_db():
    """Initialize database tables"""
    try:
        # Import all models here to ensure they are registered with SQLAlchemy
        from models.database import Base
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("Database initialized successfully")
        print(f"Tables created: {list(Base.metadata.tables.keys())}")
    except Exception as e:
        print(f"Error initializing database: {e}")

# Close database connections  
def close_db():
    """Close database connections"""
    try:
        engine.dispose()
        print("Database connections closed")
    except Exception as e:
        print(f"Error closing database: {e}")

# Test database connection
def test_connection():
    """Test database connection"""
    try:
        with engine.connect() as connection:
            print("Database connection successful")
            return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False
