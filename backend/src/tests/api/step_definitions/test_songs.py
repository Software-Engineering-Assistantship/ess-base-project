from src.main import app
from unittest.mock import MagicMock
from unittest.mock import patch
from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.song_service import SongService
from src.service.impl.review_service import ReviewService
from src.schemas.review import ReviewModel



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

def test_song_not_found():
    song_id = '2'
    SongService.get_song = MagicMock(return_value=None)
    response = client.get(f"/songs/{song_id}")
    assert response.status_code == 404
    assert response.json() == {
        "detail": "Song not found"
    }


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


def test_get_songs_empty_list(client: TestClient):
    SongService.get_songs = MagicMock(return_value=[])  # Simulate empty list
    response = client.get("/songs")

    assert response.status_code == 200
    assert response.json() == {"songs": []}


def test_unavailable_external_service(client: TestClient):
    song_id = '3'
    SongService.get_song = MagicMock(return_value={
        "id": song_id,
        "title": "Test Song",
        "artist": "Test Artist",
        "release_year": 2023,
        "genre": "Pop",
        "popularity": 10,
        "available_on": {},
        "created_at": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),

    })

    response = client.get(f"/songs/{song_id}")

    assert response.status_code == 200
    expected_json = {
        "id": song_id,
        "title": "Test Song",
        "artist": "Test Artist",
        "release_year": 2023,
        "genre": "Pop",
        "popularity": 10,
        "available_on": {},
        "created_at": "2023-08-15T12:00:00Z",
    }
    print("#########")
    print(response.json())
    print(expected_json)
    assert response.json() == expected_json


def test_get_top_rated_songs(client: TestClient):
    mock_reviews = [
        {
            "title": "Review 1",
            "description": "Description 1",
            "rating": 5,
            "author": "Author 1",
            "song": "Song 1",
        },
        {
            "title": "Review 2",
            "description": "Description 2",
            "rating": 4,
            "author": "Author 2",
            "song": "Song 1",
        },
        {
            "title": "Review 3",
            "description": "Description 3",
            "rating": 3,
            "author": "Author 3",
            "song": "Song 2",
        },
    ]

    expected_top_rated_songs = [
        {"song": "Song 1", "average_rating": 4.5},
        {"song": "Song 2", "average_rating": 3}
    ]
    client = TestClient(app)
    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)

    response = client.get("songs/songs_r/top-rated")

    assert response.status_code == 200
    assert response.json() == {'songs': expected_top_rated_songs}


def test_get_top_rated_songs_empty_database(client: TestClient):
    mock_reviews = []
    expected_response = []

    client = TestClient(app)

    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)
    response = client.get("songs/songs_r/top-rated")

    assert response.status_code == 200
    assert response.json() == {'songs': expected_response}


def test_get_top_rated_songs_with_limit(client: TestClient):
    # Mock data for reviews
    mock_reviews = [
        {
            "title": "Review 1",
            "description": "Description 1",
            "rating": 5,
            "author": "Author 1",
            "song": "Song 1",
        },
        {
            "title": "Review 2",
            "description": "Description 2",
            "rating": 4,
            "author": "Author 2",
            "song": "Song 1",
        },
        {
            "title": "Review 3",
            "description": "Description 3",
            "rating": 3,
            "author": "Author 3",
            "song": "Song 2",
        },
        {
            "title": "Review 4",
            "description": "Description 4",
            "rating": 2,
            "author": "Author 4",
            "song": "Song 3",
        }
    ]

    # Mock data for songs
    mock_songs = ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]

    # Mock expected top-rated songs based on the mock_reviews
    expected_top_rated_songs = [
        {"song": "Song 1", "average_rating": 4.5},
        {"song": "Song 2", "average_rating": 3},
        {"song": "Song 3", "average_rating": 2}
    ]
    client = TestClient(app)
    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)
    SongService.get_songs = MagicMock(return_value=mock_songs)

    # Making a request to the API endpoint that fetches top rated songs with a limit
    response = client.get("songs/songs_r/top-rated?limit=5")

    assert response.status_code == 200
    assert response.json() == {'songs': expected_top_rated_songs}


def test_edit_song(client: TestClient):
    song_id = "new-song"
    mock_song = {
        "id": song_id,
        "title": "New Song",
        "genre": "Rock",
        "artist": "New Artist",
        "release_year": 2023,
        "popularity": 0,
        "available_on": {},
        "created_at": str(datetime(2023, 8, 20, 12, 0, 0, tzinfo=timezone.utc)),
    }

    body = mock_song.copy()

    SongService.edit_song = MagicMock(return_value=mock_song)

    response = client.put(f"/songs/{song_id}", json=body)

    assert response.status_code == 200
    assert response.json() == {
        "id": "new-song",
        "title": "New Song",
        "genre": "Rock",
        "artist": "New Artist",
        "release_year": 2023,
        "popularity": 0,
        "available_on": {},
        "created_at": "2023-08-20T12:00:00Z",
    }

def test_delete_song(client: TestClient):
    song_id = "new-song"
    mock_song = {
        "id": song_id,
    }

    SongService.delete_song = MagicMock(return_value=mock_song)

    response = client.delete(f"/songs/{song_id}")

    assert response.status_code == 200
    assert response.json() == mock_song


def test_delete_song_not_found(client: TestClient):
    song_id = "new-song"

    SongService.delete_song = MagicMock(return_value=None)

    response = client.delete(f"/songs/{song_id}")

    assert response.status_code == 404
    assert response.json() == {"detail": "Item not found"}

def test_edit_song_invalid_data(client: TestClient):
    song_id = "new-song"
    mock_song = {
        "id": song_id,
        "title": "New Song",
        "genre": "Rock",
        "artist": "New Artist",
        "release_year": 2023,
        "popularity": 0,
        "available_on": {},
        "created_at": "2023-08-20T12:00:00Z",
    }

    body = mock_song.copy()

    SongService.edit_song = MagicMock(return_value=None)

    response = client.put(f"/songs/{song_id}", json=body)

    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid data"}


def test_get_reviews_by_song(client: TestClient):

    mock_reviews = [
        {
            "title": "Review 1",
            "description": "Great song!",
            "rating": 4,
            "author": "John Doe",
            "song": "teste",
        },
        {
            "title": "Review 2",
            "description": "Awesome song!",
            "rating": 5,
            "author": "Jane Smith",
            "song": "teste",
        },
        {
            "title": "Review 3",
            "description": "Good song.",
            "rating": 3,
            "author": "Alice Johnson",
            "song": "teste",
        },
    ]

    song_id = "teste"
    SongService.get_reviews = MagicMock(return_value=mock_reviews)
    response = client.get(f"/songs/{song_id}]/reviews")

    assert response.status_code == 200
    assert response.json() == { "reviews": mock_reviews }

def test_get_top_rated_songs_with_limit(client: TestClient):
    # Mock data for reviews
    mock_reviews = [
        {
            "title": "Review 1",
            "description": "Description 1",
            "rating": 5,
            "author": "Author 1",
            "song": "Song 1",
        },
        {
            "title": "Review 2",
            "description": "Description 2",
            "rating": 4,
            "author": "Author 2",
            "song": "Song 1",
        },
        {
            "title": "Review 3",
            "description": "Description 3",
            "rating": 3,
            "author": "Author 3",
            "song": "Song 2",
        },
        {
            "title": "Review 4",
            "description": "Description 4",
            "rating": 2,
            "author": "Author 4",
            "song": "Song 3",
        }
    ]

    # Mock data for songs
    mock_songs = ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]

    # Mock expected top-rated songs based on the mock_reviews
    expected_top_rated_songs = [
        {"song": "Song 1", "average_rating": 4.5},
        {"song": "Song 2", "average_rating": 3},
        {"song": "Song 3", "average_rating": 2}  
    ]
    client = TestClient(app)
    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)
    SongService.get_all_songs = MagicMock(return_value=mock_songs)  # Assuming you have a service to get all songs
    
    # Making a request to the API endpoint that fetches top rated songs with a limit
    response = client.get("songs/songs_r/top-rated?limit=5")  # adjust the endpoint if it's different

    # Assert that the response status is 200 (OK) and the returned data matches the expected top rated songs
    assert response.status_code == 200
    assert response.json() == {'songs': expected_top_rated_songs}
