from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.song import SongCreateModel
from src.db.__init__ import database as db
from src.service.impl.review_service import ReviewService
from unittest.mock import patch


class SongService:
    @staticmethod
    def get_songs():
        songs = db.get_all_items('songs')
        print(songs)
        return songs

    @staticmethod
    def get_song(song_id: str):
        song = db.get_item_by_id('songs', song_id)

        return song

    @staticmethod
    def add_song(song: SongCreateModel):
        added_song = db.add('songs', song)

        print("======== SONG SERVICE ========")
        print(added_song)
        print("======== SONG SERVICE ========")
        return added_song

    @staticmethod
    def edit_song(id: str, song: SongCreateModel):
        edited_song = db.edit('songs', id, song)

        return edited_song

    @staticmethod
    def delete_song(id: str):
        deleted_song = db.delete('songs', id)

        return deleted_song

    @staticmethod
    def get_highlighted():
        highlighted = db.get_all_items('songs')

        highlighted.sort(key=lambda x: x['popularity'], reverse=True)
        highlighted = highlighted[:10]

        return highlighted

    @staticmethod
    def get_by_year(year: int):
        songs = db.get_by_year('songs', year)

        return songs

    @staticmethod
    def get_by_genre(genre: str):
        songs = db.get_by_genre('songs', genre)

        return songs

    @staticmethod
    def get_songs_by_name(name: str):
        songs = db.get_by_name('songs', name)
        return songs

    @staticmethod
    def get_by_artist(artist: str):
        songs = db.get_by_artist('songs', artist)

        return songs

    @staticmethod
    def get_available_on_for_song(song_id: str):
        song = db.get_available_on_for_song('songs', song_id)

        return song['available_on']

    @staticmethod
    def get_top_rated_songs(limit: int):
        reviews = ReviewService.get_reviews()

        grouped_reviews = {}
        for review in reviews:
            if review['song'] not in grouped_reviews:
                grouped_reviews[review['song']] = {'avg_rating': 0, 'count': 0}

            grouped_reviews[review['song']]['avg_rating'] += review['rating']
            grouped_reviews[review['song']]['count'] += 1

        for song in grouped_reviews:
            grouped_reviews[song]['avg_rating'] = grouped_reviews[song]['avg_rating'] / \
                grouped_reviews[song]['count']

        # top_rated_songs = sorted(grouped_reviews, key=lambda x: x['avg_rating'], reverse=True)[:limit]
        top_rated_songs = sorted(grouped_reviews.items(
        ), key=lambda x: x[1]['avg_rating'], reverse=True)[:limit]
        # top_song_names = [song[0] for song in top_rated_songs]
        result = [{"song": song[0], "average_rating": song[1]['avg_rating']}
                  for song in top_rated_songs]
        print(result)

        return result

    @staticmethod
    def get_top_rated_songs_empty_database(limit: int):

        # Now when we call get_top_rated_songs, it will internally call the mocked get_reviews method
        # which will return an empty list instead of fetching real reviews
        with patch(ReviewService.get_reviews, return_value=[]):

            # when using get_top_rated_songs, it will internally call the mocked get_reviews method
            # and return an empty list instead of fetching real reviews
            result = SongService.get_top_rated_songs(limit=5)

            if not result:
                print("Nao achou musicas pois o banco esta vazio")
            else:
                print(f"Inesperado: Achou musicas: {result}")

            assert result == []  # expect result to be an empty list

            return result

    @staticmethod
    def get_reviews(song_id: str):

        reviews = db.get_reviews_by_song(song_id)

        return reviews
