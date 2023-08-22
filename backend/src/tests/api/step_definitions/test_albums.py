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


def test_get_multiple_albums(client: TestClient):
    with patch.object(AlbumService, "get_albums") as mock_get_all_items:
        mock_get_all_items.return_value = [
            {
                "id": "album1",
                "title": "Album 1",
                "artist": "Artist 1",
                "release_year": 2019,
            },
            {
                "id": "album2",
                "title": "Album 2",
                "artist": "Artist 2",
                "release_year": 2020,
            },
        ]

        response = client.get("/albums")

    assert response.status_code == 200
    assert len(response.json()['albums']) == 2


def test_get_albums_empty_list(client: TestClient):
    with patch.object(AlbumService, "get_albums") as mock_get_all_items:
        mock_get_all_items.return_value = []  # Simulate empty list

        response = client.get("/albums")

    assert response.status_code == 200
    assert response.json() == {'albums': []}

def test_update_album(client: TestClient):
    album_id = "new-album"
    album_update_data = {
        "title": "New Album",
        "artist": "New Artist",
        "release_year": 2023,
    }

    body = album_update_data.copy()
    AlbumService.edit_album = MagicMock(return_value=album_update_data)

    response = client.put(f"/albums/{album_id}", json=body)

    assert response.status_code == 200
    assert response.json() == album_update_data

def test_delete_album(client: TestClient):
    album_id = "new-album"
    album_delete_data = {
        "id": album_id,
    }

    AlbumService.delete_album = MagicMock(return_value=album_delete_data)

    response = client.delete(f"/albums/{album_id}")

    assert response.status_code == 200
    assert response.json() == album_delete_data

def test_delete_album_not_found(client: TestClient):
    album_id = "new-album"

    AlbumService.delete_album = MagicMock(return_value=None)

    response = client.delete(f"/albums/{album_id}")

    assert response.status_code == 404
    assert response.json() == {"detail": "Item not found"}


def test_edit_album_invalid_data(client: TestClient):
    album_id = "new-album"
    album_update_data = {
        "title": "",
        "artist": "",
        "release_year": 0,
    }

    body = album_update_data.copy()
    AlbumService.edit_album = MagicMock(return_value=None)

    response = client.put(f"/albums/{album_id}", json=body)

    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid data"}
