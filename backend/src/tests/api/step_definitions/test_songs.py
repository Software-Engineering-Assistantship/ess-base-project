from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.song_service import SongService

# Your existing test code...

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
    assert response.json() == { 'songs': [
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

def test_get_songs_empty_list(client: TestClient):
    SongService.get_songs = MagicMock(return_value=[])  # Simulate empty list
    response = client.get("/songs")

    assert response.status_code == 200
    assert response.json() == { "songs": [] }
