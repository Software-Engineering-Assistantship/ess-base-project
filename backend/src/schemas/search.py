from src.schemas.album import AlbumModel, AlbumGet, AlbumDelete
from src.schemas.song import SongModel, SongGet, SongDelete
from pydantic import BaseModel

from typing import Optional, List

class SearchModel(BaseModel):
    albums: Optional[List[AlbumModel]]
    songs: List[SongModel]