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
    songCover: Optional[str]
    songTitle: Optional[str]
    artistName: Optional[str]
    created_at: Optional[datetime]


class ReviewList(BaseModel):
    reviews: Optional[list[ReviewGet]]


class ReviewCreateModel(BaseModel):
    id: str
    title: str
    description: str
    rating: int
    author: str
    song: str
    created_at: Optional[datetime]


class ReviewDeleteModel(BaseModel):
    id: str
