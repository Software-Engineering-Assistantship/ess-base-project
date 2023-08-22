from fastapi import APIRouter, HTTPException, Path, status
from starlette.responses import JSONResponse
from src.schemas.song import SongGet, SongModel, SongDelete, SongList, SongNameList, SongCreateModel, GetSongsTopRated, SongCreate
from src.db import database as db
from src.service.impl.song_service import SongService

router = APIRouter()

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
    songs = SongService.get_songs()
    return {'songs': songs, }


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
def add_song(song: SongCreate):
    song_add_response = SongService.add_song(song)
    print("####################")
    print(song_add_response)

    return song_add_response


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
    "/songs_h/highlighted",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get highlighted songs",
)
def get_highlighted():
    highlighted_response = SongService.get_highlighted()

    return highlighted_response


@router.get(
    "/songs_by_year/{year}",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get all songs",
)
def get_by_year(year):
    song_get_response = SongService.get_by_year(year)
    return song_get_response


@router.get(
    "/songs_by_album/{album}",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get all songs",
)
def get_by_album(album):
    song_get_response = SongService.get_by_album(album)

    return song_get_response

# WHICH ROUTE HERE???


def get_songs_with_links():
    songs = db.get_all_items('songs')

    # Fetch music links for each song and add them to the response
    songs_with_links = []
    for song in songs:
        song_links = db.get_available_on_for_song(song.id)
        song_with_links = song.dict()
        song_with_links['available_on'] = song_links
        songs_with_links.append(song_with_links)

    return songs_with_links


@router.get(
    "/songs_by_genre/{genre}",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get all songs",
)
def get_by_genre(genre):
    song_get_response = SongService.get_by_genre(genre)

    return song_get_response


@router.get(
    "/songs_by_artist/{artist}",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get all songs",
)
def get_by_artist(artist):
    song_get_response = SongService.get_by_artist(artist)

    return song_get_response


@router.get(
    "/songs_r/top-rated",
    # Assuming Song model has a field for average rating
    response_model=GetSongsTopRated,
    description="Retrieve top-rated songs"
)
def get_top_rated_songs(limit: int = 5):
    """
    Get the top-rated songs based on average rating.
    Args:
    - limit (int): How many top-rated songs to retrieve. Default is 10.
    Returns:
    - A list of top-rated songs.
    """
    songs = SongService.get_top_rated_songs(limit)
    print(songs)
    response = {
        "songs": songs
    }
    return response
