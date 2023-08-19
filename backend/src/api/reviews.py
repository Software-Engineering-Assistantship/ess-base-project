from fastapi import APIRouter, status
from pydantic import BaseModel
from src.db import database as db
from datetime import datetime
from src.service.impl.review_service import ReviewService
from src.schemas.review import ReviewCreateModel, ReviewModel, ReviewList, ReviewDeleteModel
from starlette.responses import JSONResponse
from fastapi import HTTPException

router = APIRouter()


@router.get(
    "/",
    response_model=ReviewList,
    response_class=JSONResponse
)
def get_reviews():
    # review_list_response = ReviewService.get_reviews()
    # return {
    #     'reviews': review_list_response,
    # }

    review_list_response = db.get_all_items("reviews")
    return {
        'reviews': review_list_response,
    }


@router.get(
    "/{review_id}",
    response_model=ReviewModel,
    response_class=JSONResponse
)
def get_review(review_id: str):
    review_get_response = ReviewService.get_review(review_id)
    return review_get_response


@router.post(
    "/create",
    response_model=ReviewCreateModel,
    response_class=JSONResponse
)
def create_review(review: ReviewCreateModel):
    review_create_response = ReviewService.create_review(review)
    return review_create_response


@router.put(
    "/{review_id}",
    response_model=ReviewCreateModel,
    response_class=JSONResponse
)
def edit_review(review_id: str, review: ReviewCreateModel):
    review_edit_response = ReviewService.update_review(review_id, review)
    return review_edit_response


@router.delete(
    "/{review_id}",
    response_model=ReviewDeleteModel,
    response_class=JSONResponse
)
def delete_review(review_id: str):
    review_delete_response = ReviewService.delete_review(review_id)
    return {
        'review': review_delete_response
    }


def get_reviews_by_song_id(song_id: int): #PRECISA DE UMA FUNÇÃO DESSA AQUI? -> SERIA UM SERVICE
    """
    Get reviews by song ID.

    Args:
    - song_id (int): The ID of the song to retrieve reviews for.

    Returns:
    - A list of reviews for the specified song.

    Raises:
    - HTTPException(404) if the song is not found.
    """
    reviews = db.get_reviews_by_song_id(song_id) # fazer uma função dessa no db.py
    if not reviews:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Song not found")
    return reviews
