from fastapi.testclient import TestClient
from src.db import database as db
from src.api import albums
from src.service.impl.album_service import AlbumService

from datetime import datetime, timezone
from unittest.mock import patch

def test_get_albums(client: TestClient):
    with patch.object(AlbumService, "get_albums") as mock_get_all_items:
        mock_get_all_items.return_value = [
            {
                "id": "teste1",
                "title": "Album 1",
                "artist": "Artist 1",
                "release_year": 2019,
            }
        ]

        response = client.get("/albums")

    assert response.status_code == 200
    assert response.json() == { 'albums': [
        {
            "id": "teste1",
            "title": "Album 1",
            "artist": "Artist 1",
            "release_year": 2019,
        },
    ] }
