from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch
from src.service.impl.song_service import SongService
from unittest.mock import MagicMock
from src.main import app


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
