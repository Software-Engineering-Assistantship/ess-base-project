from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch

def test_get_song_by_id(client: TestClient):
    song_id = 1
    with patch.object(db, "get_item_by_id") as mock_get_item_by_id:
        mock_get_item_by_id.return_value = {
            "id": song_id,
            "title": "Test Song",
            "artist": "Test Artist",
            "release_year": 2023,
            "gender": "Pop",
            "timestamp": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),
        }

        response = client.get(f"/songs/{song_id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": song_id,
        "title": "Test Song",
        "artist": "Test Artist",
        "release_year": 2023,
        "gender": "Pop",
        "timestamp": "2023-08-15T12:00:00Z",
    }
