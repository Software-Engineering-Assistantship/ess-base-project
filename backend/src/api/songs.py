from datetime import datetime
from fastapi import APIRouter, HTTPException, Path, status
from pydantic import BaseModel
from src.db import database as db
from src.schemas.song import SongGet, SongModel, SongDelete
from starlette.responses import JSONResponse
from src.service.impl.song_service import SongService
from src.schemas.song import SongCreateModel

router = APIRouter()

class Song(BaseModel):
    id: int
    title: str
    artist: str
    release_year: int
    gender: str
    timestamp: datetime

# Get a specific song
@router.get(
    "/song/{song_id}",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="Get a specific song",
)
def get_song(song_id: str):
    song_get_response = SongService.get_song(song_id)

    return song_get_response


@router.get(
    "/",
    response_model=list[Song],
    description="Retrieve all songs",
    tags=["songs"],
)
def get_songs():
    songs = db.get_all_items('songs')
    return songs


@router.put(
    "/song/{song_id}",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="update a song",
)
def edit_song(song_id: str, song: SongCreateModel):
    song_edit_response = SongService.edit_song(song_id, song)

    return song_edit_response


# Add a song
@router.post(
    "/song",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="create a song",
)
def add_song(song: SongCreateModel):
    song_add_response = SongService.add_song(song)

    return song_add_response


@router.delete(
    "/song/{song_id}",
    response_model=SongDelete,
    response_class=JSONResponse,
    summary="delete a song",
)
def delete_song(song_id: str):
    song_delete_response = SongService.delete_song(song_id)
    return song_delete_response

# Edit a song's genre
# @router.put(
#     "/song/{song_id}/genre",
#     response_model=HttpResponseModel,
#     status_code=status.HTTP_200_OK,
#     responses={
#         status.HTTP_404_NOT_FOUND: {
#             "description": "Song not found",
#         }
#     },
# )
# def edit_genre(song_id: str, genre: str) -> HttpResponseModel:
#     edit_genre_response = MusicService.edit_genre(song_id, genre)
#     return edit_genre_response
