from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class AlbumModel(BaseModel):
    title: str
    artist: str
    year_released: int

class AlbumGet(BaseModel):
    name: str
    artist: str

class AlbumCreateModel(BaseModel):
    title: str
    artist: str
    year_released: int

class AlbumList(BaseModel):
    albums: list[AlbumGet]

class AlbumDelete(BaseModel):
    id: str
