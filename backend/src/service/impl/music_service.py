from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.music import SongCreateModel
from src.db.__init__ import database as db


class MusicService:

    @staticmethod
    def get_song(song_id: str):
        song = db.get_by_id('musicas', song_id)
        print('*******************')
        print(song)
        print('*******************')
        return song


    @staticmethod
    def add_song(song: SongCreateModel):
        added_song = db.add('musicas', song)

        return added_song

    @staticmethod
    def edit_song(id: str, song: SongCreateModel):
        edited_song = db.edit('musicas', id, song)
        print('*******************')
        print(edited_song)
        print('*******************')

        return edited_song

    @staticmethod
    def delete_song(id: str):
        deleted_song = db.delete('musicas', id)

        return deleted_song
