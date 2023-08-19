from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class AlbumModel(BaseModel):
    id: str
    title: str
    artist: str
    release_year: int

class AlbumGet(BaseModel):
    id: str
    title: str
    artist: str
    release_year: int

class AlbumCreateModel(BaseModel):
    id: str
    title: str
    artist: str
    release_year: int

class AlbumList(BaseModel):
    albums: list[AlbumGet]

class AlbumDelete(BaseModel):
    id: str
