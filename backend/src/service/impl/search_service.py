from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.album import AlbumCreateModel
from src.db.__init__ import database as db

class FiltersService:

    @staticmethod
    def get_filters(name: str = None, year: int = None, genre: str = None):
        albums_titles = set()
        songs_titles = set()

        if name:
            albums_titles |= {album['_id'] for album in db.get_by_album('albums', name)['songs']}
            songs_titles |= {song['_id'] for song in db.get_by_album('songs', name)['songs']}

        if year:
            albums_by_year_titles = {album['_id'] for album in db.get_by_year('albums', year)['songs']}
            songs_by_year_titles = {song['_id'] for song in db.get_by_year('songs', year)['songs']}
            print(albums_by_year_titles)
            print(songs_by_year_titles)


            if name:  # Se o nome for fornecido, fazemos a interseção com os álbuns filtrados por nome
                albums_titles &= albums_by_year_titles
                songs_titles &= songs_by_year_titles
            else:
                albums_titles = albums_by_year_titles
                songs_titles = songs_by_year_titles

        if genre:
            albums_by_genre_titles = {album['_id'] for album in db.get_by_genre('albums', genre)['songs']}
            songs_by_genre_titles = {song['_id'] for song in db.get_by_genre('songs', genre)['songs']}

            if name or year:  # Se o nome ou ano forem fornecidos, fazemos a interseção com os álbuns já filtrados
                albums_titles &= albums_by_genre_titles
                songs_titles &= songs_by_genre_titles
            else:
                albums_titles = albums_by_genre_titles
                songs_titles = songs_by_genre_titles

        # Obtendo os álbuns e músicas completos com os títulos filtrados
        albums = [album for album in db.get_all_items('albums') if album['_id'] in albums_titles]
        songs = [song for song in db.get_all_items('songs') if song['_id'] in songs_titles]

        # delete the _id key from the response
        for album in albums:
            del album['_id']
        for song in songs:
            del song['_id']

            response = {
                'albums': albums,
                'songs': songs,
            }

            return response