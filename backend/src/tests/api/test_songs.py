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
            }
        ]

        print(mock_get_all_items.return_value)

        response = client.get("/songs")

    print(response)

    assert response.status_code == 200
    assert response.json() == { 'songs': [   
            {
                "id": "teste",
                "title": "Test Song",
                "genre": "Pop",
                "artist": "Test Artist",
                "release_year": 2023,
            }, 
        ]
    }
