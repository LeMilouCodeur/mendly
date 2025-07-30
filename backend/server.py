from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Email Subscription Models
class EmailSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: Optional[str] = "unknown"  # 'hero' | 'final-cta' | 'unknown'
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class EmailSubscriptionCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "unknown"

class EmailSubscriptionResponse(BaseModel):
    success: bool
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Email Subscription Endpoints
@api_router.post("/email-subscription", response_model=EmailSubscriptionResponse)
async def create_email_subscription(input: EmailSubscriptionCreate, request: Request):
    try:
        # Check if email already exists
        existing_subscription = await db.email_subscriptions.find_one({"email": input.email})
        if existing_subscription:
            raise HTTPException(status_code=400, detail="Cet email est déjà enregistré !")
        
        # Get client info
        client_ip = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent", "")
        
        # Create subscription object
        subscription_dict = input.dict()
        subscription_obj = EmailSubscription(
            **subscription_dict,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        # Insert into database
        result = await db.email_subscriptions.insert_one(subscription_obj.dict())
        
        if result.inserted_id:
            logger.info(f"New email subscription: {input.email} from source: {input.source}")
            return EmailSubscriptionResponse(
                success=True, 
                message="Email enregistré avec succès !"
            )
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating email subscription: {str(e)}")
        raise HTTPException(status_code=500, detail="Une erreur est survenue. Réessaie plus tard.")

@api_router.get("/email-subscriptions")
async def get_email_subscriptions():
    """Admin endpoint to get all email subscriptions"""
    try:
        subscriptions = await db.email_subscriptions.find().sort("timestamp", -1).to_list(1000)
        total = len(subscriptions)
        
        return {
            "subscriptions": [EmailSubscription(**sub) for sub in subscriptions],
            "total": total
        }
    except Exception as e:
        logger.error(f"Error fetching email subscriptions: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des données")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
