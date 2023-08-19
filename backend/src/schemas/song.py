from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class SongModel(BaseModel):
    id: str

class SongModel(BaseModel):
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: int
    available_on: object
    created_at: datetime

class SongGet(BaseModel):
    id: str
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: int
    available_on: object
    created_at: datetime

class SongCreateModel(BaseModel):
    id: str
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: int
    available_on: object
    created_at: datetime

class SongList(BaseModel):
    songs: list[SongModel]

class SongDelete(BaseModel):
    id: str

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
    songs: list[SongGet]      # Mudando de musics para songs

class SongDelete(BaseModel):
    id: str
    
class SongNameList(BaseModel):
    songs: list[str]            # Mudando de musics para songs
