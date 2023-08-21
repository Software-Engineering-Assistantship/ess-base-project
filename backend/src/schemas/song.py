from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class SongModel(BaseModel):
    id: str
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: Optional[int] = 0
    available_on: Optional[object] = {}
    created_at: Optional[datetime] = None


class SongGet(BaseModel):
    id: str
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: Optional[int] = 0
    available_on: Optional[object] = {}
    created_at: Optional[datetime] = None


class SongCreateModel(BaseModel):
    id: str
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: Optional[int] = 0
    available_on: Optional[object] = {}
    created_at: Optional[datetime] = None


class SongList(BaseModel):
    songs: list[SongModel]


class SongDelete(BaseModel):
    id: str
