from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from bson.objectid import ObjectId

class ReviewModel(BaseModel):
    id: str
    title: str
    author: str
    description: str
    song: str
    rating: int
    created_at: Optional[datetime]

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
