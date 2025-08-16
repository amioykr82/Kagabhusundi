from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Float, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=False)
    
    # Birth details (stored as JSON for flexibility)
    birth_details = Column(JSON, nullable=True)
    
    # User status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    kundali_readings = relationship("KundaliReading", back_populates="user")
    horoscope_readings = relationship("HoroscopeReading", back_populates="user")
    tarot_readings = relationship("TarotReading", back_populates="user")
    compatibility_readings = relationship("CompatibilityReading", back_populates="user")

class KundaliReading(Base):
    __tablename__ = "kundali_readings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Birth details for the reading
    name = Column(String(100), nullable=False)
    birth_date = Column(String(20), nullable=False)
    birth_time = Column(String(20), nullable=False)
    birth_location = Column(String(200), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    timezone = Column(String(50), nullable=True)
    
    # Kundali data (stored as JSON)
    planet_positions = Column(JSON, nullable=False)
    house_info = Column(JSON, nullable=False)
    ascendant = Column(String(20), nullable=False)
    moon_sign = Column(String(20), nullable=False)
    sun_sign = Column(String(20), nullable=False)
    birth_nakshatra = Column(String(50), nullable=False)
    birth_nakshatra_pada = Column(Integer, nullable=False)
    dasha_info = Column(JSON, nullable=True)
    
    # AI Interpretation
    interpretation = Column(Text, nullable=False)
    ai_insights = Column(Text, nullable=True)
    remedies = Column(JSON, nullable=True)
    lucky_numbers = Column(JSON, nullable=True)
    lucky_colors = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="kundali_readings")

class HoroscopeReading(Base):
    __tablename__ = "horoscope_readings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Horoscope details
    zodiac_sign = Column(String(20), nullable=False)
    horoscope_type = Column(String(20), nullable=False)  # daily, weekly, monthly, yearly
    prediction = Column(Text, nullable=False)
    
    # Additional insights
    lucky_number = Column(Integer, nullable=True)
    lucky_color = Column(String(30), nullable=True)
    career_advice = Column(Text, nullable=True)
    love_advice = Column(Text, nullable=True)
    health_advice = Column(Text, nullable=True)
    financial_advice = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    valid_until = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="horoscope_readings")

class TarotReading(Base):
    __tablename__ = "tarot_readings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Reading details
    spread_type = Column(String(30), nullable=False)
    question = Column(Text, nullable=True)
    focus_area = Column(String(100), nullable=True)
    
    # Cards and interpretation (stored as JSON)
    cards = Column(JSON, nullable=False)
    interpretation = Column(Text, nullable=False)
    advice = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="tarot_readings")

class CompatibilityReading(Base):
    __tablename__ = "compatibility_readings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Person 1 details
    person1_name = Column(String(100), nullable=False)
    person1_birth_details = Column(JSON, nullable=False)
    person1_sign = Column(String(20), nullable=False)
    
    # Person 2 details
    person2_name = Column(String(100), nullable=False)
    person2_birth_details = Column(JSON, nullable=False)
    person2_sign = Column(String(20), nullable=False)
    
    # Analysis details
    analysis_type = Column(String(20), nullable=False)
    overall_score = Column(Float, nullable=False)
    compatibility_scores = Column(JSON, nullable=False)
    interpretation = Column(Text, nullable=False)
    strengths = Column(JSON, nullable=True)
    challenges = Column(JSON, nullable=True)
    advice = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="compatibility_readings")

class APIUsage(Base):
    __tablename__ = "api_usage"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    endpoint = Column(String(100), nullable=False)
    method = Column(String(10), nullable=False)
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(500), nullable=True)
    response_status = Column(Integer, nullable=False)
    response_time_ms = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SystemSettings(Base):
    __tablename__ = "system_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
