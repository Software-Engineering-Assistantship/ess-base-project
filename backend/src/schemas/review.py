from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ReviewModel(BaseModel):
    id: str
    title: str
    author: str
    description: str
    song: str
    rating: int
    created_at: Optional[datetime]

class ReviewGet(BaseModel):
    title: str
    description: str
    rating: int
    author: str
    song: str

class ReviewList(BaseModel):
    reviews: list[ReviewGet]

class ReviewCreateModel(BaseModel):
    title: str
    description: str
    rating: int
    author: str
    song: str

class ReviewDeleteModel(BaseModel):
    id: str
