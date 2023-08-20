from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.song import SongCreateModel
from src.db.__init__ import database as db


class SongService:
    @staticmethod
    def get_songs():
        songs = db.get_all_items('songs')
        return songs
    
    @staticmethod
    def get_song(song_id: str):
        song = db.get_by_id('songs', song_id)
<<<<<<< HEAD
        print("#########222222###########")
=======
        print('*******************')
        print(song)
        print('*******************')
>>>>>>> 3f13de1 (merging changes from other devs)
        return song

    @staticmethod
    def add_song(song: SongCreateModel):
        added_song = db.add('songs', song)
<<<<<<< HEAD
=======
        # song['popularity'] = 0
        added_song = db.add('musicas', song)
>>>>>>> 3f13de1 (merging changes from other devs)

        return added_song

    @staticmethod
    def edit_song(id: str, song: SongCreateModel):
        edited_song = db.edit('songs', id, song)
<<<<<<< HEAD
=======
        print('*******************')
        print(edited_song)
        print('*******************')
>>>>>>> 3f13de1 (merging changes from other devs)

        return edited_song

    @staticmethod
    def delete_song(id: str):
        deleted_song = db.delete('songs', id)

        return deleted_song

    @staticmethod
    def get_highlighted():
        highlighted = db.get_all_items('songs')

        for song in highlighted:
            song['id'] = str(song['_id'])
            del song['_id']
        highlighted.sort(key=lambda x: x['popularity'], reverse=True)[:10]

        return highlighted
<<<<<<< HEAD
    
    @staticmethod
    def get_by_year(year: int):
        songs = db.get_by_year('songs', year)
        
        return songs
    
    @staticmethod
    def get_by_genre(genre: str):
        songs = db.get_by_genre('songs', genre)
        
        return songs
    
    @staticmethod
    def get_by_artist(artist: str):
        songs = db.get_by_artist('songs', artist)
        
        return songs
    
    @staticmethod
    def get_available_on_for_song(song_id: str):
        song = db.get_available_on_for_song('songs', song_id)
        
        return song['available_on']
    
    # @staticmethod
    # def get_by_album(album: str):
    #     songs = db.get_by_album('musicas', album)
        
    #     return songs
    
    
    @staticmethod
    def delete_song(id: str):
        deleted_song = db.delete('musicas', id)

        return deleted_song
=======
>>>>>>> 3f13de1 (merging changes from other devs)
