from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from bson.objectid import ObjectId

class ReviewModel(BaseModel):
    id: str
    title: str
    description: str
    rating: int
    author: str
    song: str
    # created_at: Optional[datetime]

class ReviewGet(BaseModel):
    id: str
    title: str
    description: str
    rating: int
    author: str
    song: str

class ReviewList(BaseModel):
    reviews: list[ReviewGet]

class ReviewCreateModel(BaseModel):
    id: str
    title: str
    description: str
    rating: int
    author: str
    song: str

class ReviewDeleteModel(BaseModel):
    id: str
