from fastapi import APIRouter, HTTPException
from starlette.responses import JSONResponse
from src.schemas.song import SongGet, SongModel, SongDelete, SongList, SongNameList, SongCreateModel, GetSongsTopRated, SongCreate
from src.service.impl.song_service import SongService
from src.schemas.review import ReviewModel, ReviewList

router = APIRouter()


@router.get(
    "/{song_id}",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="Get a specific song",
)
def get_song(song_id: str):
    song_get_response = SongService.get_song(song_id)

    if not song_get_response:
        raise HTTPException(status_code=404, detail="Song not found")

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

    if not song_edit_response:
        raise HTTPException(status_code=400, detail="Invalid data")
    else:
        return song_edit_response


@router.post(
    "/create",
    response_model=SongModel,
    response_class=JSONResponse,
    summary="create a song",
)
def add_song(song: SongCreate):
    song_add_response = SongService.add_song(song)

    return song_add_response


@router.delete(
    "/{song_id}",
    response_model=SongDelete,
    response_class=JSONResponse,
    summary="delete a song",
)
def delete_song(song_id: str):
    song_delete_response = SongService.delete_song(song_id)

    if not song_delete_response:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return song_delete_response


@router.get(
    "/songs_h/highlighted",
    response_model=SongList,
    response_class=JSONResponse,
    summary="get highlighted songs",
)
def get_highlighted():
    songs = SongService.get_highlighted()
    songs_rating = SongService.get_top_rated_songs(-1)
    for song in songs:
        song['id'] = str(song['_id'])
        found = False
        for song_rating in songs_rating:
            if song_rating['song'] == song['id']:
                print(song_rating)
                song['average_rating'] = song_rating['average_rating']
                found = True
                break
        if not found:
            song['average_rating'] = 0
        del song['_id']

    songs = sorted(songs, key=lambda x: x['popularity'], reverse=True)

    return {
        "songs": songs
    }


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
    response_model=dict,
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
    for song in songs:

        real_data_songs = SongService.get_song(song['song'])
        song['title'] = real_data_songs['title']
        song['artist'] = real_data_songs['artist']
        song['image_url'] = real_data_songs['image_url']
        song["id"] = song["song"]
    print(songs)
    response = {
        "songs": songs
    }
    return response


@router.get(
    "/{song_id}/reviews",
    response_model=dict,
    response_class=JSONResponse,
    summary="Get reviews of a specific song",
)
def get_reviews(song_id: str):

    reviews = SongService.get_reviews(song_id)

    print('-------------')

    print(reviews)
    print('-------------')
    # if not reviews:
    #     raise HTTPException(status_code=404, detail="Reviews not found")

    return {"reviews": reviews}
