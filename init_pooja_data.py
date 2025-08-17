"""
Initialize database with sample pooja services
"""
from sqlalchemy.orm import Session
from models.database import PoojaService
from utils.database import SessionLocal

def init_pooja_services():
    """Initialize database with sample pooja services"""
    db = SessionLocal()
    
    try:
        # Check if services already exist
        existing_services = db.query(PoojaService).count()
        if existing_services > 0:
            print(f"Pooja services already exist ({existing_services} services)")
            return
        
        sample_services = [
            {
                "name": "Ganesh Pooja",
                "description": "Traditional Ganesh Pooja for removing obstacles and bringing prosperity",
                "duration_minutes": 90,
                "price": 2100.0,
                "category": "Spiritual",
                "benefits": [
                    "Removes obstacles",
                    "Brings prosperity",
                    "Enhances wisdom",
                    "Provides divine blessings"
                ],
                "requirements": [
                    "Fresh flowers",
                    "Fruits",
                    "Incense sticks",
                    "Coconut",
                    "Sweets"
                ],
                "image_url": "/images/ganesh-pooja.jpg"
            },
            {
                "name": "Lakshmi Pooja",
                "description": "Sacred Lakshmi Pooja for wealth, prosperity and abundance",
                "duration_minutes": 120,
                "price": 3100.0,
                "category": "Wealth",
                "benefits": [
                    "Attracts wealth",
                    "Brings abundance",
                    "Removes financial obstacles",
                    "Blesses with prosperity"
                ],
                "requirements": [
                    "Lotus flowers",
                    "Gold coins",
                    "Rice",
                    "Turmeric",
                    "Red cloth"
                ],
                "image_url": "/images/lakshmi-pooja.jpg"
            },
            {
                "name": "Saraswati Pooja",
                "description": "Divine Saraswati Pooja for knowledge, education and wisdom",
                "duration_minutes": 75,
                "price": 1800.0,
                "category": "Education",
                "benefits": [
                    "Enhances knowledge",
                    "Improves learning",
                    "Brings wisdom",
                    "Academic success"
                ],
                "requirements": [
                    "White flowers",
                    "Books",
                    "Pen/Pencil",
                    "Yellow cloth",
                    "Fruits"
                ],
                "image_url": "/images/saraswati-pooja.jpg"
            },
            {
                "name": "Hanuman Pooja",
                "description": "Powerful Hanuman Pooja for strength, protection and courage",
                "duration_minutes": 60,
                "price": 1500.0,
                "category": "Protection",
                "benefits": [
                    "Provides protection",
                    "Increases strength",
                    "Removes fears",
                    "Brings courage"
                ],
                "requirements": [
                    "Red flowers",
                    "Sindoor",
                    "Coconut oil",
                    "Bananas",
                    "Red cloth"
                ],
                "image_url": "/images/hanuman-pooja.jpg"
            },
            {
                "name": "Navagraha Pooja",
                "description": "Complete Navagraha Pooja for planetary peace and harmony",
                "duration_minutes": 180,
                "price": 4500.0,
                "category": "Planetary",
                "benefits": [
                    "Planetary peace",
                    "Removes malefic effects",
                    "Brings harmony",
                    "Improves fortune"
                ],
                "requirements": [
                    "Nine types of flowers",
                    "Different colored cloths",
                    "Various grains",
                    "Specific gemstones",
                    "Special incense"
                ],
                "image_url": "/images/navagraha-pooja.jpg"
            },
            {
                "name": "Mahamrityunjaya Pooja",
                "description": "Sacred Mahamrityunjaya Pooja for health, healing and longevity",
                "duration_minutes": 150,
                "price": 3500.0,
                "category": "Health",
                "benefits": [
                    "Promotes health",
                    "Aids healing",
                    "Increases longevity",
                    "Removes illness"
                ],
                "requirements": [
                    "Bilva leaves",
                    "White flowers",
                    "Milk",
                    "Honey",
                    "Sacred thread"
                ],
                "image_url": "/images/mahamrityunjaya-pooja.jpg"
            }
        ]
        
        # Add services to database
        for service_data in sample_services:
            service = PoojaService(**service_data)
            db.add(service)
        
        db.commit()
        print(f"Successfully added {len(sample_services)} pooja services to database")
        
    except Exception as e:
        db.rollback()
        print(f"Error initializing pooja services: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    init_pooja_services()
