from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.album import AlbumCreateModel
from src.db.__init__ import database as db
from fastapi import HTTPException


class AlbumService:

    @staticmethod
    def get_albums():
        albums = db.get_all_items('albums')
        return albums

    @staticmethod
    def get_album(album_id: str):
        album = db.get_item_by_id('albums', album_id)
        return album

    @staticmethod
    def add_album(album: AlbumCreateModel):
        added_album = db.add('albums', album)
        return added_album

    @staticmethod
    def edit_album(id: str, album: AlbumCreateModel):
        edited_album = db.edit('albums', id, album)
        return edited_album

    @staticmethod
    def get_by_artist(artist: str):
        songs = db.get_by_artist('albums', artist)

        return songs

    @staticmethod
    def delete_album(id: str):
        deleted_album = db.delete('albums', id)
        return deleted_album

    @staticmethod
    def get_by_album(album: str):
        albums = db.get_by_album('albums', album)

        return albums

    def get_by_year(year: int):
        songs = db.get_by_year('albums', year)

        return songs

    @staticmethod
    def get_by_genre(genre: str):
        albums = db.get_by_genre('albums', genre)

        return albums

    @staticmethod
    def get_album_by_name(album: str):
        album = db.get_by_name('albums', album)
        return album
