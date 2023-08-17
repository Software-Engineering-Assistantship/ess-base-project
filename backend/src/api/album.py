from fastapi import APIRouter, status, HTTPException
from src.schemas.album import AlbumGet, AlbumModel, AlbumDelete
from starlette.responses import JSONResponse

from src.service.impl.album_service import AlbumService
from src.schemas.album import AlbumCreateModel

router = APIRouter()

# Get a specific album
@router.get(
    "/album/{album_id}",
    response_model=AlbumModel,
    response_class=JSONResponse,
    summary="Get a specific album",
)
def get_album(album_id: str):
    album_get_response = AlbumService.get_album(album_id)

    return album_get_response

@router.put(
    "/album/{album_id}",
    response_model=AlbumModel,
    response_class=JSONResponse,
    summary="update an album",
)
def edit_album(album_id: str, album: AlbumCreateModel):
    album_edit_response = AlbumService.edit_album(album_id, album)

    return album_edit_response

# Add an album
@router.post(
    "/album",
    response_model=AlbumModel,
    response_class=JSONResponse,
    summary="create an album",
)
def add_album(album: AlbumCreateModel):
    album_add_response = AlbumService.add_album(album)

    return album_add_response

@router.delete(
    "/album/{album_id}",
    response_model=AlbumDelete,
    response_class=JSONResponse,
    summary="delete an album",
)
def delete_album(album_id: str):
    album_delete_response = AlbumService.delete_album(album_id)
    return album_delete_response
