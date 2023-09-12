from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.album import AlbumCreateModel
from src.db.__init__ import database as db
from src.service.impl.song_service import SongService
from src.service.impl.album_service import AlbumService


class FiltersService:

    @staticmethod
    def get_filters(name: str = None, year: int = None, genre: str = None):
        albums_titles = set()
        songs_titles = set()

        if name:
            res1 = AlbumService.gey_album_by_name(name)
            res2 = SongService.gey_songs_by_name(name)
            res3 = SongService.get_by_artist(name)
            res4 = AlbumService.get_by_artist(name)

            if res1 is None:
                res1 = []
            if res2 is None:
                res2 = []
            if res3 is None:
                res3 = []
            if type(res1) is dict:
                res1 = [res1]
            if type(res2) is dict:
                res2 = [res2]
            if type(res3) is dict:
                res3 = [res3]

            albums_titles |= {album['id'] for album in res1}
            albums_titles |= {album['id'] for album in res4}

            songs_titles |= {song['id']
                             for song in res2}
            songs_titles |= {song['id']
                             for song in res3}
        if year:

            res1 = AlbumService.get_by_year(year)[
                'songs']
            res2 = SongService.get_by_year(year)[
                'songs']

            albums_by_year_titles = {album['id'] for album in res1}
            songs_by_year_titles = {song['id'] for song in res2}

            print(albums_by_year_titles)
            print(songs_by_year_titles)

            # Se o nome for fornecido, fazemos a interseção com os álbuns filtrados por nome
            if name:
                albums_titles &= albums_by_year_titles
                songs_titles &= songs_by_year_titles

            else:
                albums_titles = albums_by_year_titles
                songs_titles = songs_by_year_titles

        if genre:
            print("procurando por genero")

            res1 = AlbumService.get_by_genre(genre)['songs']
            res2 = SongService.get_by_genre(genre)['songs']

            albums_by_genre_titles = {
                album['id'] for album in res1}
            songs_by_genre_titles = {song['id']
                                     for song in res2}

            # Se o nome ou ano forem fornecidos, fazemos a interseção com os álbuns já filtrados
            if name or year:
                albums_titles &= albums_by_genre_titles
                songs_titles &= songs_by_genre_titles

            else:
                albums_titles = albums_by_genre_titles
                songs_titles = songs_by_genre_titles

        # Obtendo os álbuns e músicas completos com os títulos filtrados
        all_albums = AlbumService.get_albums()
        all_songs = SongService.get_songs()

        albums = [album for album in all_albums if album['id'] in albums_titles]
        songs = [song for song in all_songs if song['id'] in songs_titles]

        # delete the id key from the response
        # for album in albums:
        #     del album['id']
        # for song in songs:
        #     del song['id']

        response = {
            'albums': albums,
            'songs': songs,
        }

        return response
