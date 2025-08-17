"""
Pooja Models - Database models for pooja services and bookings
"""
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class PoojaService(Base):
    __tablename__ = "pooja_services"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    duration_minutes = Column(Integer, default=60)
    price = Column(Float, nullable=False)
    category = Column(String(100), nullable=False)  # e.g., "Health", "Wealth", "Spiritual", "Family"
    benefits = Column(JSON)  # List of benefits
    requirements = Column(JSON)  # List of requirements/items needed
    image_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    bookings = relationship("PoojaBooking", back_populates="service")

class PoojaBooking(Base):
    __tablename__ = "pooja_bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("pooja_services.id"), nullable=False)
    participant_name = Column(String(255), nullable=False)
    participant_phone = Column(String(20), nullable=False)
    participant_email = Column(String(255), nullable=False)
    booking_date = Column(DateTime, nullable=False)
    special_requests = Column(Text)
    address = Column(Text, nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String(50), default="confirmed")  # confirmed, completed, cancelled
    payment_status = Column(String(50), default="pending")  # pending, paid, refunded
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    service = relationship("PoojaService", back_populates="bookings")
