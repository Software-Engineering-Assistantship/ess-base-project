from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.song_service import SongService, ReviewService
from src.main import app

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
    assert response.json() == { 'songs': [   
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

def test_get_top_rated_songs(client: TestClient):
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
    ]

    # Mock expected top-rated songs based on the mock_reviews
    expected_top_rated_songs = [
        {"song": "Song 1", "average_rating": 4.5},
        {"song": "Song 2", "average_rating": 3}
    ]
    client = TestClient(app)
    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)  # Patch the method used to fetch reviews
    # Patch the method used to fetch reviews (assuming `get_all_items` fetches reviews)
        
    # Making a request to the API endpoint that fetches top rated songs
    response = client.get("songs/songs_r/top-rated")

    # Assert that the response status is 200 (OK) and the returned data matches the expected top rated songs
    print(response.json())
    print("-----------------------------------------")
    assert response.status_code == 200
    assert response.json() == {'songs': expected_top_rated_songs}

def test_get_top_rated_songs_empty_database(client: TestClient):
    # Mock an empty review data
    mock_reviews = []

    # Expected return when there are no reviews
    expected_response = []

    client = TestClient(app)
    # Patch the method used to fetch reviews to return the mock_reviews
    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)

    # Making a request to the API endpoint that fetches top rated songs
    response = client.get("songs/songs_r/top-rated")

    # Debugging prints
    print("===== START OF DEBUGGING OUTPUT =====")
    print("Expected:", expected_response)
    print("Received:", response.json())
    print("===== END OF DEBUGGING OUTPUT =====")

    # Assert that the response status is 200 (OK) and the returned data matches the expected top rated songs
    assert response.status_code == 200
    assert response.json() == {'songs': expected_response}
