from fastapi.testclient import TestClient
from src.db import database as db
from src.api import albums
from unittest.mock import patch, MagicMock

from src.service.impl.album_service import AlbumService

from datetime import datetime, timezone


def test_add_album(client: TestClient):
    album_create_data = {
        "id": "new-album",
        "title": "New Album",
        "artist": "New Artist",
        "release_year": 2023,
    }

    body = album_create_data.copy()
    del body["id"]
    AlbumService.add_album = MagicMock(return_value=album_create_data)

    # Adjust the endpoint as needed
    response = client.post("/albums/create", json=body)

    assert response.status_code == 200
    assert response.json() == album_create_data


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
    assert response.json() == {'albums': [
        {
            "id": "teste1",
            "title": "Album 1",
            "artist": "Artist 1",
            "release_year": 2019,
        },
    ]}
