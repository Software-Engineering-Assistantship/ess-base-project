from fastapi import APIRouter, status, HTTPException
from src.schemas.album import AlbumGet, AlbumModel, AlbumDelete
from starlette.responses import JSONResponse
from src.service.impl.search_service import FiltersService
from src.schemas.search import SearchModel

router = APIRouter()


@router.get(
    "/search",
    response_model=SearchModel,
    response_class=JSONResponse,
    summary="Get all albums or musics by filters",
)
def get_all(name: str = None, year: int = None, genre: str = None):

    if len(name) == 1:
        name = None
    if len(genre) == 1:
        genre = None
    if year == 199:
        year = None

    album_get_response = FiltersService.get_filters(name, year, genre)

    return album_get_response
