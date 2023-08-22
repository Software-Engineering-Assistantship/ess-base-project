from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.song_service import SongService, ReviewService
from src.main import app

client = TestClient(app)

def test_get_song(client: TestClient):
    mock_get_all_items = [
        {
            "id": "teste",
            "title": "Test Song",
            "genre": "Pop",
            "artist": "Test Artist",
            "release_year": 2023,
            "popularity": 10,
            "available_on": {},
            "created_at": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),
        }
    ]

    SongService.get_songs = MagicMock(return_value=mock_get_all_items)
    response = client.get("/songs")

    assert response.status_code == 200
    assert response.json() == {'songs': [
            {
                "id": "teste",
                "title": "Test Song",
                "genre": "Pop",
                "artist": "Test Artist",
                "release_year": 2023,
                "popularity": 10,
                "available_on": {},
                "created_at": "2023-08-15T12:00:00Z",
            },
        ]
    }


def test_get_song_by_id(client: TestClient):
    song_id = "64e03abb59d8ca2bdee4b3c8"

    mock_get_item_by_id = {
        "id": song_id,
        "title": "Test Song",
        "artist": "Test Artist",
        "release_year": 2023,
        "genre": "Pop",
        "available_on": {
            "Spotify": "https://spotify.com/test",
            "Apple Music": "https://apple.com/test",
        },
        "popularity": 10,
        "created_at": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),
    }

    SongService.get_song = MagicMock(return_value=mock_get_item_by_id)
    response = client.get(f"/songs/{song_id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": song_id,
        "title": "Test Song",
        "artist": "Test Artist",
        "release_year": 2023,
        "genre": "Pop",
        "available_on": {
            "Spotify": "https://spotify.com/test",
            "Apple Music": "https://apple.com/test",
        },
        "popularity": 10,
        "created_at": "2023-08-15T12:00:00Z",
    }

def test_get_top_rated_songs(client: TestClient):
    mock_reviews = [
        {
            "title": "Review 1",
            "description": "Description 1",
            "rating": 5,
            "author": "Author 1",
            "song": "Song 1",
        },
        {
            "title": "Review 2",
            "description": "Description 2",
            "rating": 4,
            "author": "Author 2",
            "song": "Song 1",
        },
        {
            "title": "Review 3",
            "description": "Description 3",
            "rating": 3,
            "author": "Author 3",
            "song": "Song 2",
        },
    ]

    expected_top_rated_songs = [
        {"song": "Song 1", "average_rating": 4.5},
        {"song": "Song 2", "average_rating": 3}
    ]
    client = TestClient(app)
    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)

    response = client.get("songs/songs_r/top-rated")

    assert response.status_code == 200
    assert response.json() == {'songs': expected_top_rated_songs}

def test_get_top_rated_songs_empty_database(client: TestClient):
    mock_reviews = []
    expected_response = []

    client = TestClient(app)

    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)
    response = client.get("songs/songs_r/top-rated")

    assert response.status_code == 200
    assert response.json() == {'songs': expected_response}


# TESTE ERRADO
def test_song_not_found(client: TestClient):
    song_id = 2  # Use a different song_id here
    with patch.object(db, "get_item_by_id") as mock_get_item_by_id:
        mock_get_item_by_id.return_value = None

        response = client.get(f"/music/details/{song_id}")

    assert response.status_code == 404
    assert "detail: Not Found"


# TESTE ERRADO
def test_unavailable_external_service(client: TestClient):
    song_id = 3
    with patch.object(db, "get_item_by_id") as mock_get_item_by_id:
        # Mock the response from the database
        mock_get_item_by_id.return_value = {
            "id": song_id,
            "title": "Test Song",
            "artist": "Test Artist",
            "release_year": 2023,
            "gender": "Pop",
            "available_on": {

            },
            "timestamp": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),
        }

        # Mock the available_on links for the song
        with patch.object(db, "get_available_on_for_song") as mock_get_available_on:
            mock_get_available_on.return_value = None

            response = client.get(f"/songs/{song_id}")

        assert response.status_code == 200
        assert response.json() == {
            "id": song_id,
            "title": "Test Song",
            "artist": "Test Artist",
            "release_year": 2023,
            "gender": "Pop",
            "available_on": {

            },
            "timestamp": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),
            "msg": f"A música '{song_id}' não está disponível em nenhum serviço externo no momento"
        }


def test_get_highlights():
    SongService.get_songs = MagicMock(
        return_value = {
            "songs": [
                {
                    "id": "1",
                    "title": "Song 2",
                    "artist": "Artist 2",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 101,
                },
                {
                    "id": "3",
                    "title": "Song 3",
                    "artist": "Artist 3",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 102,
                },
                {
                    "id": "4",
                    "title": "Song 4",
                    "artist": "Artist 4",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 103,
                },
                {
                    "id": "5",
                    "title": "Song 5",
                    "artist": "Artist 5",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 104,
                },
                {
                    "id": "6",
                    "title": "Song 6",
                    "artist": "Artist 6",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 105,
                },
                {
                    "id": "7",
                    "title": "Song 7",
                    "artist": "Artist 7",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 106,
                },
                {
                    "id": "8",
                    "title": "Song 8",
                    "artist": "Artist 8",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 107,
                },
                {
                    "id": "9",
                    "title": "Song 9",
                    "artist": "Artist 9",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 108,
                },
                {
                    "id": "10",
                    "title": "Song 10",
                    "artist": "Artist 10",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 109,
                },
                {
                    "id": "11",
                    "title": "Song 11",
                    "artist": "Artist 11",
                    "release_year": 2021,
                    "genre": "Pop",
                    "popularity": 110,
                },
            ]
        }
    )

    response = client.get("songs/songs_h/highlighted")

    expected_json = {
        "songs": [
            {
                "id": "11",
                "title": "Song 11",
                "artist": "Artist 11",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 110,
            },
            {
                "id": "10",
                "title": "Song 10",
                "artist": "Artist 10",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 109,
            },
            {
                "id": "9",
                "title": "Song 9",
                "artist": "Artist 9",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 108,
            },
            {
                "id": "8",
                "title": "Song 8",
                "artist": "Artist 8",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 107,
            },
            {
                "id": "7",
                "title": "Song 7",
                "artist": "Artist 7",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 106,
            },
            {
                "id": "6",
                "title": "Song 6",
                "artist": "Artist 6",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 105,
            },
            {
                "id": "5",
                "title": "Song 5",
                "artist": "Artist 5",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 104,
            },
            {
                "id": "4",
                "title": "Song 4",
                "artist": "Artist 4",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 103,
            },
            {
                "id": "3",
                "title": "Song 3",
                "artist": "Artist 3",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 102,
            },
            {
                "id": "1",
                "title": "Song 2",
                "artist": "Artist 2",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 101,

            },
        ]
    }

    assert response.json() == expected_json
    assert response.status_code == 200