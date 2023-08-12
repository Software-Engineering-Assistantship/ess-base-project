from datetime import datetime
from fastapi import APIRouter, status
from pydantic import BaseModel
from src.db import database as db

router = APIRouter()

class Review(BaseModel):
    rating: int
    title: str
    description: str
    # author
    # song
    timestamp: datetime


@router.get(
    "/",
    response_model=list[Review],
    description="Retrieve all reviews",
    tags=["reviews"],
)
def get_reviews():
    """
    Get all reviews.

    Returns:
    - A list of all reviews.

    """

    reviews = db.get_all_items('reviews')

    return reviews
