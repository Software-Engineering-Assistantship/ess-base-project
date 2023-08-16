from fastapi import APIRouter, status, HTTPException
from src.schemas.album import AlbumGet, AlbumModel, AlbumDelete
from starlette.responses import JSONResponse

from src.service.impl.search import FiltersService


router = APIRouter()

@router.get(
    "/search/{all_filters}",
    response_model=AlbumModel,
    response_class=JSONResponse,
    summary="Get all albums or musics by filters",
)
def get_all(all_filters: str):
    album_get_response = FiltersService.get_filters(all_filters)

    return album_get_response