from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class AlbumModel(BaseModel):
    id: str
    title: str
    artist: str
    release_year: int
    image_url: Optional[str] = ''
    available_on: Optional[object] = {}
    genre: Optional[str] = ''


class AlbumGet(BaseModel):
    id: str
    title: str
    artist: str
    release_year: int
    image_url: Optional[str] = ''
    available_on: Optional[object] = {}
    genre: Optional[str] = ''


class AlbumCreateModel(BaseModel):
    # id: str
    title: str
    artist: str
    release_year: int
    image_url: Optional[str] = ''
    available_on: Optional[object] = {}
    genre: Optional[str] = ''


class AlbumList(BaseModel):
    albums: list[AlbumGet]


class AlbumDelete(BaseModel):
    id: str
