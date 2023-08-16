from datetime import datetime
from fastapi import APIRouter, HTTPException, Path, status
from pydantic import BaseModel
from src.db import database as db
from src.schemas.song import SongGet, SongModel, SongDelete,SongList
from starlette.responses import JSONResponse
from src.service.impl.song_service import SongService
from src.schemas.song import SongCreateModel

router = APIRouter()

# class Song(BaseModel):
#     id: str
#     title: str
#     artist: str
#     release_year: int
#     genre: str

# Get a specific song
@router.get(
    "/{song_id}",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="Get a specific song",
)
def get_song(song_id: str):
    song_get_response = SongService.get_song(song_id)

    return song_get_response


@router.get(
    "/",
    response_model=SongList,
    response_class=JSONResponse,
    description="Retrieve all songs"
)
def get_songs():
    songs = db.get_all_items('songs')
    return {
        'songs': songs
    }


@router.put(
    "/{song_id}",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="update a song",
)
def edit_song(song_id: str, song: SongCreateModel):
    song_edit_response = SongService.edit_song(song_id, song)

    return song_edit_response


# Add a song
@router.post(
    "/create",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="create a song",
)
def add_song(song: SongCreateModel):
    song_add_response = SongService.add_song(song)

    return song_add_response

@router.get(
    "/songs",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get all songs",
)
def get_songs():
    songs_get_response = SongService.get_songs()
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    print(songs_get_response)
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    return {
        "musics": songs_get_response
    }



@router.delete(
    "/{song_id}",
    response_model=SongDelete,
    response_class=JSONResponse,
    summary="delete a song",
)
def delete_song(song_id: str):
    song_delete_response = SongService.delete_song(song_id)
    return song_delete_response

@router.get(
    "/higlighted",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get highlighted songs",
)
def get_highlighted():
    highlighted_response = SongService.get_highlighted()
    return {
        "musics": highlighted_response
    }

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
