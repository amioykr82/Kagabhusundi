"""
Pooja Service - Handles pooja booking and management
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from utils.database import get_db
from models.database import PoojaService as PoojaModel, PoojaBooking
from pydantic import BaseModel

router = APIRouter()

# Pydantic models for request/response
class PoojaServiceResponse(BaseModel):
    id: int
    name: str
    description: str
    duration_minutes: int
    price: float
    category: str
    benefits: List[str]
    requirements: List[str]
    image_url: Optional[str] = None
    
    class Config:
        from_attributes = True

class PoojaBookingRequest(BaseModel):
    service_id: int
    preferred_date: str
    preferred_time: str
    participant_name: str
    participant_phone: str
    participant_email: str
    special_requests: Optional[str] = None
    address: str

class PoojaBookingResponse(BaseModel):
    id: int
    service_name: str
    booking_date: datetime
    status: str
    participant_name: str
    total_amount: float
    
    class Config:
        from_attributes = True

@router.get("/services", response_model=List[PoojaServiceResponse])
async def get_pooja_services(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all available pooja services"""
    try:
        query = db.query(PoojaModel)
        if category:
            query = query.filter(PoojaModel.category == category)
        
        services = query.filter(PoojaModel.is_active == True).all()
        return services
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch services: {str(e)}")

@router.get("/services/{service_id}", response_model=PoojaServiceResponse)
async def get_pooja_service(service_id: int, db: Session = Depends(get_db)):
    """Get specific pooja service details"""
    try:
        service = db.query(PoojaModel).filter(
            PoojaModel.id == service_id,
            PoojaModel.is_active == True
        ).first()
        
        if not service:
            raise HTTPException(status_code=404, detail="Pooja service not found")
        
        return service
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch service: {str(e)}")

@router.post("/book", response_model=PoojaBookingResponse)
async def book_pooja(booking: PoojaBookingRequest, db: Session = Depends(get_db)):
    """Book a pooja service"""
    try:
        # Validate service exists
        service = db.query(PoojaModel).filter(
            PoojaModel.id == booking.service_id,
            PoojaModel.is_active == True
        ).first()
        
        if not service:
            raise HTTPException(status_code=404, detail="Pooja service not found")
        
        # Parse booking date and time
        booking_datetime = datetime.fromisoformat(f"{booking.preferred_date}T{booking.preferred_time}")
        
        # Create booking
        new_booking = PoojaBooking(
            service_id=booking.service_id,
            participant_name=booking.participant_name,
            participant_phone=booking.participant_phone,
            participant_email=booking.participant_email,
            booking_date=booking_datetime,
            special_requests=booking.special_requests,
            address=booking.address,
            total_amount=service.price,
            status="confirmed",
            created_at=datetime.utcnow()
        )
        
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
        
        return {
            "id": new_booking.id,
            "service_name": service.name,
            "booking_date": new_booking.booking_date,
            "status": new_booking.status,
            "participant_name": new_booking.participant_name,
            "total_amount": new_booking.total_amount
        }
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to book pooja: {str(e)}")

@router.get("/bookings/{booking_id}", response_model=PoojaBookingResponse)
async def get_booking(booking_id: int, db: Session = Depends(get_db)):
    """Get booking details"""
    try:
        booking = db.query(PoojaBooking).filter(PoojaBooking.id == booking_id).first()
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        service = db.query(PoojaModel).filter(PoojaModel.id == booking.service_id).first()
        
        return {
            "id": booking.id,
            "service_name": service.name if service else "Unknown Service",
            "booking_date": booking.booking_date,
            "status": booking.status,
            "participant_name": booking.participant_name,
            "total_amount": booking.total_amount
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch booking: {str(e)}")

@router.get("/categories")
async def get_pooja_categories(db: Session = Depends(get_db)):
    """Get all pooja categories"""
    try:
        categories = db.query(PoojaModel.category).filter(
            PoojaModel.is_active == True
        ).distinct().all()
        
        return [{"name": cat[0]} for cat in categories]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch categories: {str(e)}")
