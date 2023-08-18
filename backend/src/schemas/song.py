from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class SongModel(BaseModel):
    title: str
    genre: str
    artist: str
    release_year: int

class SongGet(BaseModel):
    name: str
    genre: str
    artist: str

class SongCreateModel(BaseModel):
    title: str
    artist: str
    genre: str
    release_year: int

class SongList(BaseModel):
    songs: list[SongGet]

class SongDelete(BaseModel):
    id: str
