from datetime import datetime
from fastapi import APIRouter, status
from pydantic import BaseModel
from src.db import database as db
from fastapi import HTTPException

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

def get_reviews_by_song_id(song_id: int):
    """
    Get reviews by song ID.

    Args:
    - song_id (int): The ID of the song to retrieve reviews for.

    Returns:
    - A list of reviews for the specified song.

    Raises:
    - HTTPException(404) if the song is not found.
    """
    reviews = db.get_reviews_by_song_id(song_id) # fazer uma função dessa no db.py
    if not reviews:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Song not found")
    return reviews
