from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    birth_date = Column(DateTime, nullable=True)
    birth_time = Column(String, nullable=True)
    birth_place = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    kundalis = relationship("Kundali", back_populates="user")
    bookings = relationship("PoojaBooking", back_populates="user")
    chat_sessions = relationship("ChatSession", back_populates="user")
    orders = relationship("Order", back_populates="user")

class Kundali(Base):
    __tablename__ = "kundalis"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    birth_date = Column(DateTime, nullable=False)
    birth_time = Column(String, nullable=False)
    birth_place = Column(String, nullable=False)
    chart_data = Column(Text, nullable=True)  # JSON string
    predictions = Column(Text, nullable=True)  # JSON string
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="kundalis")

class PoojaBooking(Base):
    __tablename__ = "pooja_bookings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    pooja_name = Column(String, nullable=False)
    pooja_id = Column(Integer, nullable=False)
    booking_date = Column(DateTime, nullable=False)
    booking_time = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String, default="pending")  # pending, confirmed, completed, cancelled
    special_requirements = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="bookings")

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    astrologer_name = Column(String, nullable=False)
    session_type = Column(String, nullable=False)  # chat, call, video
    duration = Column(Integer, nullable=True)  # in minutes
    price = Column(Float, nullable=False)
    status = Column(String, default="pending")  # pending, active, completed, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="chat_sessions")

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    order_type = Column(String, nullable=False)  # store, pooja, chat
    total_amount = Column(Float, nullable=False)
    status = Column(String, default="pending")  # pending, paid, failed, refunded
    payment_method = Column(String, nullable=True)
    order_data = Column(Text, nullable=True)  # JSON string with order details
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
