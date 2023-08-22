from src.main import app
from unittest.mock import MagicMock
from unittest.mock import patch
from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.song_service import SongService


def test_add_song(client: TestClient):
    mock_song = {
        "id": "new-song",
        "title": "New Song",
        "genre": "Rock",
        "artist": "New Artist",
        "release_year": 2023,
        "popularity": 0,
        "available_on": {
            "Spotify": "https://spotify.com/new-song",
            "Apple Music": "https://apple.com/new-song",
        },
        "created_at": str(datetime(2023, 8, 20, 12, 0, 0, tzinfo=timezone.utc)),
    }

    body = mock_song.copy()

    SongService.add_song = MagicMock(return_value=mock_song)
    del body["id"]
    del body["created_at"]

    response = client.post("/songs/create", json=body)

    assert response.status_code == 200
    assert response.json() == {
        "id": "new-song",
        "title": "New Song",
        "genre": "Rock",
        "artist": "New Artist",
        "release_year": 2023,
        "popularity": 0,
        "available_on": {
            "Spotify": "https://spotify.com/new-song",
            "Apple Music": "https://apple.com/new-song",
        },
        "created_at": "2023-08-20T12:00:00Z",
    }


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


client = TestClient(app)


def test_get_highlights():
    SongService.get_songs = MagicMock(return_value={
        "songs": [
            {"_id": "1",
             "title": "Song 2",
             "artist": "Artist 2",
             "release_year": 2021,
             "genre": "Pop",
             "popularity": 101,
             },
            {
                "_id": "3",
                "title": "Song 3",
                "artist": "Artist 3",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 102,
            },
            {
                "_id": "4",
                "title": "Song 4",
                "artist": "Artist 4",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 103,
            },
            {
                "_id": "5",
                "title": "Song 5",
                "artist": "Artist 5",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 104,
            },
            {
                "_id": "6",
                "title": "Song 6",
                "artist": "Artist 6",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 105,
            },
            {
                "_id": "7",
                "title": "Song 7",
                "artist": "Artist 7",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 106,
            },
            {
                "_id": "8",
                "title": "Song 8",
                "artist": "Artist 8",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 107,
            },
            {
                "_id": "9",
                "title": "Song 9",
                "artist": "Artist 9",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 108,
            },
            {
                "_id": "10",
                "title": "Song 10",
                "artist": "Artist 10",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 109,
            },
            {
                "_id": "11",
                "title": "Song 11",
                "artist": "Artist 11",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 110,
            }
        ]
    }
    )
    response = client.get("songs/songs_h/highlighted")
    assert response.status_code == 200

    expected_json = {
        "songs": [
            {
                "id": "11",
                "title": "Song 11",
                "artist": "Artist 11",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 110,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "10",
                "title": "Song 10",
                "artist": "Artist 10",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 109,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "9",
                "title": "Song 9",
                "artist": "Artist 9",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 108,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "8",
                "title": "Song 8",
                "artist": "Artist 8",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 107,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "7",
                "title": "Song 7",
                "artist": "Artist 7",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 106,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "6",
                "title": "Song 6",
                "artist": "Artist 6",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 105,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "5",
                "title": "Song 5",
                "artist": "Artist 5",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 104,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "4",
                "title": "Song 4",
                "artist": "Artist 4",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 103,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "3",
                "title": "Song 3",
                "artist": "Artist 3",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 102,
                "available_on": {},
                "created_at": None
            },
            {
                "id": "1",
                "title": "Song 2",
                "artist": "Artist 2",
                "release_year": 2021,
                "genre": "Pop",
                "popularity": 101,
                "available_on": {},
                "created_at": None

            },
        ]

    }
    print("@#!@#@!#!@#!@#")
    print(response.json())
    print(expected_json)
    print("@#!@#@!#!@#!@#")

    assert response.json() == expected_json
