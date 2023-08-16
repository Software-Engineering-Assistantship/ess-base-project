from datetime import datetime
from fastapi import APIRouter, HTTPException, Path
from pydantic import BaseModel
from src.db import database as db
from fastapi import status

router = APIRouter()

class Song(BaseModel):
    id: int
    title: str
    artist: str
    release_year: int
    gender: str
    timestamp: datetime


@router.get(
    "/",
    response_model=list[Song],
    description="Retrieve all songs",
    tags=["songs"],
)
def get_songs():
    """
    Get all songs.

    Returns:
    - A list of all songs.

    """

    songs = db.get_all_items('songs')
    return songs


@router.get(
    "/{song_id}",
    response_model=Song,
    description="Retrieve a song by ID",
    tags=["songs"],
)
def get_song_by_id(song_id: int = Path(..., description="The ID of the song to retrieve")):
    """
    Get a song by its ID.

    Args:
    - song_id (int): The ID of the song to retrieve.

    Returns:
    - The requested song.

    Raises:
    - HTTPException(404) if the song is not found.
    """

    song = db.get_item_by_id('songs', song_id)
    if song is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Song not found")
    return song
