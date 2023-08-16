from fastapi import APIRouter
from src.api import items, reviews

api_router = APIRouter()
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])