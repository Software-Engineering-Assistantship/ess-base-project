from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.db import database as db

router = APIRouter()

class Album(BaseModel):
    id: int
    title: str
    artist: str
    release_date: datetime
    created_date: datetime

@router.get(
    "/",
    response_model=list[Album],
    description="Retrieve all albums",
    tags=["albums"],
)
def get_albums():
    """
    Get all albums.

    Returns:
    - A list of all albums.
    """
    albums = db.get_all_items('albums')
    return albums
