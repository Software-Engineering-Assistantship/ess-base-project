from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.album import AlbumCreateModel
from src.db.__init__ import database as db

class FiltersService:

    @staticmethod
    def get_filters(name: str):
        albuns = db.get_by_album('albuns', name)
        songs = db.get_by_album('songs', name)
        artists = [
        ]

        for album in albuns:
            artists.append(album['artist'])
        
        for song in songs:
            artists.append(song['artist'])
        
        artists = list(set(artists))

        albuns.extend(songs.extend(artists))
        return albuns

    @staticmethod
    def add_album(album: AlbumCreateModel):
        added_album = db.add('albuns', album)
        return added_album