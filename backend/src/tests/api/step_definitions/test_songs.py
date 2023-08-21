from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.song_service import SongService


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


def test_song_not_found(client: TestClient):
    song_id = 2  # Use a different song_id here
    with patch.object(db, "get_item_by_id") as mock_get_item_by_id:
        # Mock the response indicating that the song is not found
        mock_get_item_by_id.return_value = None

        response = client.get(f"/music/details/{song_id}")

    assert response.status_code == 404
    assert "detail: Not Found"


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
