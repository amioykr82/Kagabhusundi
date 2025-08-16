from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

router = APIRouter()

# Pydantic models
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    discount: Optional[str] = None
    image: str
    category: str
    rating: float
    reviews: int
    is_popular: bool
    tags: List[str]
    in_stock: bool = True

class CartItem(BaseModel):
    product_id: int
    quantity: int

class OrderItem(BaseModel):
    product_id: int
    product_name: str
    price: float
    quantity: int

class Order(BaseModel):
    id: str
    user_email: str
    items: List[OrderItem]
    total_amount: float
    delivery_address: dict
    payment_method: str
    status: str
    created_at: datetime

class OrderRequest(BaseModel):
    user_email: str
    items: List[CartItem]
    delivery_address: dict
    payment_method: str

# Mock products database with 25+ products
PRODUCTS = [
    {
        "id": 1,
        "name": "VIP E-Pooja",
        "description": "Almost everything runs on Internet today and in order to stay connected with divinity, we bring you VIP E-Pooja services",
        "price": 100.0,
        "original_price": 120.0,
        "discount": "17% OFF",
        "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.8,
        "reviews": 245,
        "is_popular": True,
        "tags": ["STARTS AT INR", "100"],
        "in_stock": True
    },
    {
        "id": 2,
        "name": "Janmashtami Special Pooja",
        "description": "Special ritualistic ceremony for Lord Krishna's birthday celebration with all traditional rituals",
        "price": 100.0,
        "original_price": 150.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1574947149429-7ad0f8b78bd9?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.9,
        "reviews": 189,
        "is_popular": True,
        "tags": ["JAI KANHAIYA", "BALKI"],
        "in_stock": True
    },
    {
        "id": 3,
        "name": "Problem Solving Remedy Combos",
        "description": "Comprehensive solution packages for various life challenges, obstacles, and spiritual problems",
        "price": 100.0,
        "original_price": 200.0,
        "discount": "50% OFF",
        "image": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
        "category": "remedies",
        "rating": 4.7,
        "reviews": 356,
        "is_popular": True,
        "tags": ["DEEP DAAN", "100"],
        "in_stock": True
    },
    {
        "id": 4,
        "name": "Kashi Siddh Rudraksha",
        "description": "Blessed at Kedareshwar Mahadev Mandir, Kashi. Authentic and spiritually charged rudraksha beads",
        "price": 299.0,
        "original_price": 399.0,
        "discount": "25% OFF",
        "image": "https://images.unsplash.com/photo-1544912322-a5f1e18f7d10?w=300&h=200&fit=crop",
        "category": "rudraksha",
        "rating": 4.9,
        "reviews": 156,
        "is_popular": True,
        "tags": ["Flat 10% OFF", "SHOP NOW"],
        "in_stock": True
    },
    {
        "id": 5,
        "name": "Gold Plated Bracelets",
        "description": "Authentic gold plated spiritual bracelets for protection, prosperity and positive energy",
        "price": 499.0,
        "original_price": 699.0,
        "discount": "29% OFF",
        "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop",
        "category": "jewelry",
        "rating": 4.6,
        "reviews": 432,
        "is_popular": False,
        "tags": ["STARTS AT INR", "499"],
        "in_stock": True
    },
    {
        "id": 6,
        "name": "Spiritual Spell Casting",
        "description": "Ancient spell casting services for various life improvements, manifestations and spiritual goals",
        "price": 100.0,
        "original_price": 150.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        "category": "spells",
        "rating": 4.5,
        "reviews": 89,
        "is_popular": False,
        "tags": ["STARTS AT INR", "100"],
        "in_stock": True
    },
    {
        "id": 7,
        "name": "Premium Gemstones",
        "description": "Certified gemstones for planetary peace, positive energy enhancement and astrological benefits",
        "price": 799.0,
        "original_price": 999.0,
        "discount": "20% OFF",
        "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop",
        "category": "gemstones",
        "rating": 4.8,
        "reviews": 267,
        "is_popular": True,
        "tags": ["EMI AVAILABLE"],
        "in_stock": True
    },
    {
        "id": 8,
        "name": "Exclusive Blue Sapphire",
        "description": "Premium quality certified blue sapphire with maximum astrological benefits and spiritual power",
        "price": 1299.0,
        "original_price": 1599.0,
        "discount": "19% OFF",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "category": "exclusive",
        "rating": 4.9,
        "reviews": 134,
        "is_popular": True,
        "tags": ["EMI AVAILABLE"],
        "in_stock": True
    },
    {
        "id": 9,
        "name": "Mahamrityunjaya Mantra Jaap",
        "description": "Powerful chanting session for health, longevity and protection from diseases and negative energies",
        "price": 250.0,
        "original_price": 350.0,
        "discount": "29% OFF",
        "image": "https://images.unsplash.com/photo-1571979195097-59d223315e92?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.7,
        "reviews": 198,
        "is_popular": False,
        "tags": ["HIGHLY RECOMMENDED"],
        "in_stock": True
    },
    {
        "id": 10,
        "name": "Navgraha Shanti Pooja",
        "description": "Complete planetary peace ritual for cosmic harmony, balance and removing planetary obstacles",
        "price": 500.0,
        "original_price": 750.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.8,
        "reviews": 287,
        "is_popular": True,
        "tags": ["STARTS AT INR", "500"],
        "in_stock": True
    },
    {
        "id": 11,
        "name": "Premium Rudraksha Mala 108 Beads",
        "description": "Authentic 108 beads rudraksha mala for meditation, spiritual practices and divine connection",
        "price": 899.0,
        "original_price": 1199.0,
        "discount": "25% OFF",
        "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        "category": "rudraksha",
        "rating": 4.9,
        "reviews": 156,
        "is_popular": True,
        "tags": ["STARTS AT INR", "899"],
        "in_stock": True
    },
    {
        "id": 12,
        "name": "Crystal Healing Set - 7 Chakras",
        "description": "Complete set of 7 chakra healing crystals for energy cleansing, balance and spiritual healing",
        "price": 699.0,
        "original_price": 899.0,
        "discount": "22% OFF",
        "image": "https://images.unsplash.com/photo-1633292587830-8db8b7c4be8b?w=300&h=200&fit=crop",
        "category": "gemstones",
        "rating": 4.6,
        "reviews": 203,
        "is_popular": False,
        "tags": ["EMI AVAILABLE"],
        "in_stock": True
    },
    {
        "id": 13,
        "name": "Ganesh Puja Kit",
        "description": "Complete puja kit for Lord Ganesha worship with all necessary traditional items and mantras",
        "price": 199.0,
        "original_price": 299.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1636063005516-9ef4f68096a4?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.5,
        "reviews": 312,
        "is_popular": True,
        "tags": ["FESTIVAL SPECIAL"],
        "in_stock": True
    },
    {
        "id": 14,
        "name": "Silver Pendant Collection",
        "description": "Handcrafted silver pendants with spiritual symbols, mantras and protective energies",
        "price": 799.0,
        "original_price": 999.0,
        "discount": "20% OFF",
        "image": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=200&fit=crop",
        "category": "jewelry",
        "rating": 4.7,
        "reviews": 198,
        "is_popular": False,
        "tags": ["HANDCRAFTED"],
        "in_stock": True
    },
    {
        "id": 15,
        "name": "Vashikaran Spell Services",
        "description": "Ancient vashikaran spells for love, relationship harmony and attraction purposes",
        "price": 299.0,
        "original_price": 499.0,
        "discount": "40% OFF",
        "image": "https://images.unsplash.com/photo-1565798715310-a53a90ba05bf?w=300&h=200&fit=crop",
        "category": "spells",
        "rating": 4.3,
        "reviews": 67,
        "is_popular": False,
        "tags": ["POWERFUL RESULTS"],
        "in_stock": True
    },
    {
        "id": 16,
        "name": "Red Coral (Moonga) Ring",
        "description": "Natural red coral ring for Mars energy enhancement, courage and protection from enemies",
        "price": 1199.0,
        "original_price": 1499.0,
        "discount": "20% OFF",
        "image": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=200&fit=crop",
        "category": "gemstones",
        "rating": 4.8,
        "reviews": 145,
        "is_popular": True,
        "tags": ["CERTIFIED NATURAL"],
        "in_stock": True
    },
    {
        "id": 17,
        "name": "Lakshmi Puja Samagri",
        "description": "Complete samagri kit for Goddess Lakshmi worship, prosperity rituals and wealth attraction",
        "price": 149.0,
        "original_price": 199.0,
        "discount": "25% OFF",
        "image": "https://images.unsplash.com/photo-1533568288007-ac10cd9b3ef3?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.6,
        "reviews": 234,
        "is_popular": True,
        "tags": ["PROSPERITY RITUAL"],
        "in_stock": True
    },
    {
        "id": 18,
        "name": "5 Face Rudraksha Bead",
        "description": "Authentic 5 Mukhi Rudraksha for general well-being, peace of mind and spiritual growth",
        "price": 199.0,
        "original_price": 299.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1635252743388-73cbbb5e1a62?w=300&h=200&fit=crop",
        "category": "rudraksha",
        "rating": 4.7,
        "reviews": 189,
        "is_popular": True,
        "tags": ["MOST POPULAR"],
        "in_stock": True
    },
    {
        "id": 19,
        "name": "Brass Spiritual Jewelry Set",
        "description": "Traditional brass jewelry set with spiritual symbols, motifs and protective energies",
        "price": 399.0,
        "original_price": 599.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=200&fit=crop",
        "category": "jewelry",
        "rating": 4.4,
        "reviews": 156,
        "is_popular": False,
        "tags": ["TRADITIONAL DESIGN"],
        "in_stock": True
    },
    {
        "id": 20,
        "name": "Black Magic Removal Spell",
        "description": "Powerful spell casting for removing black magic, evil eye and negative energy influences",
        "price": 499.0,
        "original_price": 799.0,
        "discount": "38% OFF",
        "image": "https://images.unsplash.com/photo-1608648112879-6cabfb0dda14?w=300&h=200&fit=crop",
        "category": "spells",
        "rating": 4.6,
        "reviews": 78,
        "is_popular": True,
        "tags": ["PROTECTION SPELL"],
        "in_stock": True
    },
    {
        "id": 21,
        "name": "Yellow Sapphire (Pukhraj)",
        "description": "Natural yellow sapphire for Jupiter energy, wisdom enhancement and financial prosperity",
        "price": 2199.0,
        "original_price": 2799.0,
        "discount": "21% OFF",
        "image": "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=300&h=200&fit=crop",
        "category": "exclusive",
        "rating": 4.9,
        "reviews": 89,
        "is_popular": True,
        "tags": ["PREMIUM QUALITY"],
        "in_stock": True
    },
    {
        "id": 22,
        "name": "Hanuman Chalisa Path",
        "description": "Special Hanuman Chalisa recitation service for strength, protection and overcoming obstacles",
        "price": 99.0,
        "original_price": 149.0,
        "discount": "34% OFF",
        "image": "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.8,
        "reviews": 456,
        "is_popular": True,
        "tags": ["DIVINE PROTECTION"],
        "in_stock": True
    },
    {
        "id": 23,
        "name": "Healing Crystal Bracelet",
        "description": "Multi-stone healing crystal bracelet for chakra balancing, energy healing and protection",
        "price": 349.0,
        "original_price": 499.0,
        "discount": "30% OFF",
        "image": "https://images.unsplash.com/photo-1601924357840-8c56e842bbb0?w=300&h=200&fit=crop",
        "category": "jewelry",
        "rating": 4.5,
        "reviews": 267,
        "is_popular": False,
        "tags": ["CHAKRA HEALING"],
        "in_stock": True
    },
    {
        "id": 24,
        "name": "Love Attraction Spell Kit",
        "description": "Complete spell kit for attracting love, enhancing romantic relationships and finding soulmate",
        "price": 199.0,
        "original_price": 299.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=300&h=200&fit=crop",
        "category": "spells",
        "rating": 4.2,
        "reviews": 145,
        "is_popular": False,
        "tags": ["LOVE MAGIC"],
        "in_stock": True
    },
    {
        "id": 25,
        "name": "Emerald (Panna) Pendant",
        "description": "Natural emerald pendant for Mercury energy, communication skills and intellectual growth",
        "price": 1899.0,
        "original_price": 2299.0,
        "discount": "17% OFF",
        "image": "https://images.unsplash.com/photo-1607272805814-7c5600c35e37?w=300&h=200&fit=crop",
        "category": "exclusive",
        "rating": 4.7,
        "reviews": 123,
        "is_popular": True,
        "tags": ["MERCURY STONE"],
        "in_stock": True
    },
    {
        "id": 26,
        "name": "Vastu Shastra Consultation",
        "description": "Professional Vastu consultation for home, office and business harmony and prosperity",
        "price": 999.0,
        "original_price": 1499.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?w=300&h=200&fit=crop",
        "category": "consultation",
        "rating": 4.8,
        "reviews": 342,
        "is_popular": True,
        "tags": ["VASTU EXPERT"],
        "in_stock": True
    },
    {
        "id": 27,
        "name": "Shiva Linga Worship Set",
        "description": "Complete worship set for Lord Shiva with authentic Narmada Shiva Linga and ceremonial items",
        "price": 699.0,
        "original_price": 999.0,
        "discount": "30% OFF",
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
        "category": "pooja",
        "rating": 4.9,
        "reviews": 278,
        "is_popular": True,
        "tags": ["NARMADA STONE"],
        "in_stock": True
    },
    {
        "id": 28,
        "name": "Crystal Pyramids Set",
        "description": "Set of 3 crystal pyramids for energy amplification, meditation and space clearing",
        "price": 449.0,
        "original_price": 649.0,
        "discount": "31% OFF",
        "image": "https://images.unsplash.com/photo-1628778138749-2da995a065c9?w=300&h=200&fit=crop",
        "category": "gemstones",
        "rating": 4.4,
        "reviews": 167,
        "is_popular": False,
        "tags": ["ENERGY AMPLIFIER"],
        "in_stock": True
    },
    {
        "id": 29,
        "name": "Personalized Name Numerology Report",
        "description": "Detailed numerology analysis of your name with lucky numbers, colors and gemstones",
        "price": 299.0,
        "original_price": 499.0,
        "discount": "40% OFF",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?w=300&h=200&fit=crop",
        "category": "consultation",
        "rating": 4.6,
        "reviews": 234,
        "is_popular": False,
        "tags": ["NUMEROLOGY"],
        "in_stock": True
    },
    {
        "id": 30,
        "name": "Copper Spiritual Water Bottle",
        "description": "Handcrafted copper water bottle with spiritual symbols for health and positive energy",
        "price": 399.0,
        "original_price": 599.0,
        "discount": "33% OFF",
        "image": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
        "category": "wellness",
        "rating": 4.5,
        "reviews": 189,
        "is_popular": False,
        "tags": ["AYURVEDIC"],
        "in_stock": True
    }
]

# Mock orders database
ORDERS = []

@router.get("/products", response_model=List[Product])
async def get_all_products():
    """Get all products in the store"""
    return PRODUCTS

@router.get("/products/category/{category}", response_model=List[Product])
async def get_products_by_category(category: str):
    """Get products by category"""
    filtered_products = [p for p in PRODUCTS if p["category"] == category]
    if not filtered_products:
        raise HTTPException(status_code=404, detail="No products found in this category")
    return filtered_products

@router.get("/products/{product_id}", response_model=Product)
async def get_product_by_id(product_id: int):
    """Get a specific product by ID"""
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/products/search/{query}", response_model=List[Product])
async def search_products(query: str):
    """Search products by name or description"""
    query_lower = query.lower()
    filtered_products = [
        p for p in PRODUCTS 
        if query_lower in p["name"].lower() or query_lower in p["description"].lower()
    ]
    return filtered_products

@router.get("/categories")
async def get_categories():
    """Get all available product categories"""
    categories = list(set(p["category"] for p in PRODUCTS))
    return {"categories": categories}

@router.post("/orders", response_model=dict)
async def create_order(order_request: OrderRequest):
    """Create a new order"""
    try:
        # Validate products exist and calculate total
        order_items = []
        total_amount = 0.0
        
        for cart_item in order_request.items:
            product = next((p for p in PRODUCTS if p["id"] == cart_item.product_id), None)
            if not product:
                raise HTTPException(status_code=404, detail=f"Product {cart_item.product_id} not found")
            
            if not product["in_stock"]:
                raise HTTPException(status_code=400, detail=f"Product {product['name']} is out of stock")
            
            order_item = OrderItem(
                product_id=product["id"],
                product_name=product["name"],
                price=product["price"],
                quantity=cart_item.quantity
            )
            order_items.append(order_item)
            total_amount += product["price"] * cart_item.quantity
        
        # Add delivery charges if total < 500
        delivery_charge = 0.0 if total_amount >= 500 else 50.0
        total_amount += delivery_charge
        
        # Create order
        order_id = f"ORD{uuid.uuid4().hex[:8].upper()}"
        order = Order(
            id=order_id,
            user_email=order_request.user_email,
            items=order_items,
            total_amount=total_amount,
            delivery_address=order_request.delivery_address,
            payment_method=order_request.payment_method,
            status="pending",
            created_at=datetime.now()
        )
        
        # Store order (in real app, this would go to database)
        ORDERS.append(order.dict())
        
        return {
            "success": True,
            "order_id": order_id,
            "total_amount": total_amount,
            "delivery_charge": delivery_charge,
            "message": "Order placed successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get order details by ID"""
    order = next((o for o in ORDERS if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/orders/user/{user_email}")
async def get_user_orders(user_email: str):
    """Get all orders for a user"""
    user_orders = [o for o in ORDERS if o["user_email"] == user_email]
    return {"orders": user_orders}

@router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    """Update order status"""
    order = next((o for o in ORDERS if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    valid_statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    order["status"] = status
    return {"success": True, "message": f"Order status updated to {status}"}

@router.get("/stats")
async def get_store_stats():
    """Get store statistics"""
    total_products = len(PRODUCTS)
    total_orders = len(ORDERS)
    total_revenue = sum(o["total_amount"] for o in ORDERS)
    popular_products = [p for p in PRODUCTS if p["is_popular"]]
    
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "popular_products_count": len(popular_products),
        "categories_count": len(set(p["category"] for p in PRODUCTS))
    }
