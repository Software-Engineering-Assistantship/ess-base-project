from fastapi import APIRouter, status, HTTPException
from src.schemas.album import AlbumGet, AlbumModel, AlbumDelete, AlbumList
from starlette.responses import JSONResponse
from src.service.impl.album_service import AlbumService
from src.schemas.album import AlbumCreateModel
from datetime import datetime
from pydantic import BaseModel
from src.db import database as db

router = APIRouter()

@router.get(
    "/",
    response_model=AlbumList,
    response_class=JSONResponse,
    description="Retrieve all albums",
)
def get_albums():
    albums_get_response = AlbumService.get_albums()
    return { 'albums': albums_get_response }

# Get a specific album
@router.get(
    "/{album_id}",
    response_model=AlbumModel,
    response_class=JSONResponse,
    summary="Get a specific album",
)
def get_album(album_id: str):
    album_get_response = AlbumService.get_album(album_id)

    return album_get_response

@router.put(
    "/{album_id}",
    response_model=AlbumModel,
    response_class=JSONResponse,
    summary="update an album",
)
def edit_album(album_id: str, album: AlbumCreateModel):
    album_edit_response = AlbumService.edit_album(album_id, album)

    return album_edit_response

# Add an album
@router.post(
    "/create",
    response_model=AlbumModel,
    response_class=JSONResponse,
    summary="create an album",
)
def add_album(album: AlbumCreateModel):
    album_add_response = AlbumService.add_album(album)

    return album_add_response

@router.delete(
    "/{album_id}",
    response_model=AlbumDelete,
    response_class=JSONResponse,
    summary="delete an album",
)
def delete_album(album_id: str):
    album_delete_response = AlbumService.delete_album(album_id)
    return album_delete_response
