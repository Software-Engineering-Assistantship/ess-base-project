from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.album import AlbumCreateModel
from src.db.__init__ import database as db

class AlbumService:

    @staticmethod
    def get_albums():
        albums = db.get_all_items('albuns')
        return albums

    @staticmethod
    def get_album(album_id: str):
        album = db.get_by_id('albuns', album_id)
        print('*******************')
        print(album)
        print('*******************')
        return album

    @staticmethod
    def add_album(album: AlbumCreateModel):
        added_album = db.add('albuns', album)
        return added_album

    @staticmethod
    def edit_album(id: str, album: AlbumCreateModel):
        edited_album = db.edit('albuns', id, album)
        print('*******************')
        print(edited_album)
        print('*******************')
        return edited_album

    @staticmethod
    def delete_album(id: str):
        deleted_album = db.delete('albuns', id)
        return deleted_album
