from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ReviewModel(BaseModel):
    title: str
    description: str
    rating: int
    author: str
    song: str
    # created_at: Optional[datetime]

class ReviewGet(BaseModel):
    title: str
    description: str
    rating: int
    author: str
    song: str
    # created_at: Optional[datetime]

class ReviewList(BaseModel):
    reviews: list[ReviewModel]

class ReviewCreateModel(BaseModel):
    title: str
    description: str
    rating: int
    author: str
    song: str

class ReviewDeleteModel(BaseModel):
    id: str