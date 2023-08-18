from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.song import SongCreateModel
from src.db.__init__ import database as db


class SongService:

    @staticmethod
    def get_song(song_id: str):
        song = db.get_by_id('songs', song_id)
        print('*******************')
        print(song)
        print('*******************')
        return song


    @staticmethod
    def add_song(song: SongCreateModel):
        added_song = db.add('songs', song)

        return added_song

    @staticmethod
    def edit_song(id: str, song: SongCreateModel):
        edited_song = db.edit('songs', id, song)
        print('*******************')
        print(edited_song)
        print('*******************')

        return edited_song

    @staticmethod
    def delete_song(id: str):
        deleted_song = db.delete('songs', id)

        return deleted_song
