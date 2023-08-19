from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch

def test_get_song(client: TestClient):
    with patch.object(db, "get_all_items") as mock_get_all_items:
        mock_get_all_items.return_value = [
            {
                "id": "teste",
                "title": "Test Song",
                "genre": "Pop",
                "artist": "Test Artist",
                "release_year": 2023,
                "popularity": 10,
            }
        ]

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
            }, 
        ]
    }
def test_get_song_by_id(client: TestClient):
    song_id = 1
    with patch.object(db, "get_item_by_id") as mock_get_item_by_id:
        # Mock the response from the database
        mock_get_item_by_id.return_value = {
            "id": song_id,
            "title": "Test Song",
            "artist": "Test Artist",
            "release_year": 2023,
            "gender": "Pop",
            "available_on": {
                "Spotify": "https://spotify.com/test",
                "Apple Music": "https://apple.com/test",
            },
            "timestamp": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),
        }

        # Mock the available_on links for the song
        with patch.object(db, "get_available_on_for_song") as mock_get_available_on:
            mock_get_available_on.return_value = {
                "Spotify": "https://spotify.com/test",
                "Apple Music": "https://apple.com/test",
            }

            response = client.get(f"/songs/{song_id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": song_id,
        "title": "Test Song",
        "artist": "Test Artist",
        "release_year": 2023,
        "gender": "Pop",
        "available_on": {
            "Spotify": "https://spotify.com/test",
            "Apple Music": "https://apple.com/test",
        },
        "timestamp": "2023-08-15T12:00:00Z",
    }
